/// <reference lib="webworker" />
import type { ChallengeTest, RunResult } from '../types';

const PYODIDE_VERSION = '0.26.4';
const PYODIDE_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/pyodide.mjs`;

interface PyodideApi {
  globals: { set(name: string, value: unknown): void };
  runPython(code: string): string;
}

/**
 * Runs the submitted code once, then evaluates every test case against a copy of the
 * resulting namespace so that mutating cases cannot leak into each other.
 */
const HARNESS = `
import ast, contextlib, io, json, sys, traceback

def _short_exc():
    etype, value, tb = sys.exc_info()
    frames = [f for f in traceback.extract_tb(tb) if f.filename in ('solution.py', '<test>')]
    parts = traceback.format_list(frames) if frames else []
    parts += traceback.format_exception_only(etype, value)
    return ''.join(parts).strip()

def _fmt(value):
    try:
        text = repr(value)
    except Exception:
        text = '<unrepresentable value>'
    return text if len(text) <= 400 else text[:400] + ' ...'

def _eq(actual, expected):
    # A tuple is not a list and 1 is not True, even though Python's == says otherwise.
    if isinstance(expected, bool) != isinstance(actual, bool):
        return False
    if isinstance(expected, (list, tuple, set, frozenset)) and not isinstance(actual, type(expected)):
        return False
    return actual == expected

def _eval_block(source, scope):
    tree = ast.parse(source.strip(), '<test>', 'exec')
    tail = None
    if tree.body and isinstance(tree.body[-1], ast.Expr):
        tail = tree.body.pop()
    if tree.body:
        exec(compile(tree, '<test>', 'exec'), scope)
    if tail is None:
        return None
    return eval(compile(ast.Expression(tail.value), '<test>', 'eval'), scope)

def _harness(user_code, cases_json):
    cases = json.loads(cases_json)
    result = {'stdout': '', 'outcomes': []}
    namespace = {'__name__': '__main__'}
    buffer = io.StringIO()
    try:
        with contextlib.redirect_stdout(buffer):
            exec(compile(user_code, 'solution.py', 'exec'), namespace)
    except BaseException:
        result['stdout'] = buffer.getvalue()
        result['error'] = _short_exc()
        return json.dumps(result)

    for case in cases:
        entry = {'call': case['call'], 'expected': case['expected'], 'got': '', 'ok': False}
        scope = dict(namespace)
        try:
            with contextlib.redirect_stdout(buffer):
                if case.get('setup'):
                    exec(compile(case['setup'], '<test>', 'exec'), scope)
                expected = _eval_block(case['expected'], dict(scope))
                actual = _eval_block(case['call'], scope)
            entry['expected'] = _fmt(expected)
            entry['got'] = _fmt(actual)
            entry['ok'] = bool(_eq(actual, expected))
        except BaseException:
            entry['got'] = _short_exc()
        result['outcomes'].append(entry)

    result['stdout'] = buffer.getvalue()
    return json.dumps(result)
`;

type Incoming = { type: 'run'; id: number; code: string; tests: ChallengeTest[] };

type Outgoing =
  | { type: 'status'; message: string }
  | { type: 'result'; id: number; result: RunResult }
  | { type: 'failure'; id: number; message: string };

const ctx = self as unknown as {
  postMessage(message: Outgoing): void;
  onmessage: ((event: MessageEvent<Incoming>) => void) | null;
};

let runtime: Promise<PyodideApi> | null = null;

function bootstrap(): Promise<PyodideApi> {
  if (!runtime) {
    ctx.postMessage({ type: 'status', message: 'Downloading the Python runtime…' });
    runtime = import(/* @vite-ignore */ PYODIDE_URL)
      .then((module: { loadPyodide: (options: { indexURL: string }) => Promise<PyodideApi> }) =>
        module.loadPyodide({
          indexURL: `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`,
        }),
      )
      .then((pyodide) => {
        pyodide.runPython(HARNESS);
        ctx.postMessage({ type: 'status', message: 'Python ready.' });
        return pyodide;
      })
      .catch((error: unknown) => {
        runtime = null;
        throw error;
      });
  }
  return runtime;
}

ctx.onmessage = async (event) => {
  const { id, code, tests } = event.data;
  try {
    const pyodide = await bootstrap();
    pyodide.globals.set('_user_code', code);
    pyodide.globals.set('_cases_json', JSON.stringify(tests));
    const raw = pyodide.runPython('_harness(_user_code, _cases_json)');
    ctx.postMessage({ type: 'result', id, result: JSON.parse(raw) as RunResult });
  } catch (error) {
    ctx.postMessage({
      type: 'failure',
      id,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};
