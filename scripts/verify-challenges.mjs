// Checks every challenge's reference solution against its own tests, using the same
// harness semantics as the in-browser runner. Run with `npm run verify:challenges`.
import { build } from 'esbuild';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const bundle = await build({
  entryPoints: ['src/data/python/index.ts'],
  bundle: true,
  format: 'esm',
  write: false,
  platform: 'node',
});

const dir = mkdtempSync(join(tmpdir(), 'challenges-'));
const modulePath = join(dir, 'challenges.mjs');
writeFileSync(modulePath, bundle.outputFiles[0].text);
const { challenges } = await import(modulePath);

const PY = `
import ast, json, sys

def eval_block(source, scope):
    tree = ast.parse(source.strip(), '<test>', 'exec')
    tail = tree.body.pop() if tree.body and isinstance(tree.body[-1], ast.Expr) else None
    if tree.body:
        exec(compile(tree, '<test>', 'exec'), scope)
    if tail is None:
        return None
    return eval(compile(ast.Expression(tail.value), '<test>', 'eval'), scope)

def eq(actual, expected):
    if isinstance(expected, bool) != isinstance(actual, bool):
        return False
    if isinstance(expected, (list, tuple, set, frozenset)) and not isinstance(actual, type(expected)):
        return False
    return actual == expected

failures = []
for challenge in json.load(sys.stdin):
    for source, must_pass in ((challenge['solution'], True), (challenge['starter'], False)):
        namespace = {'__name__': '__main__'}
        label = 'solution' if must_pass else 'starter'
        try:
            exec(compile(source, 'solution.py', 'exec'), namespace)
        except BaseException as error:
            if must_pass:
                failures.append((challenge['id'], 'solution did not run', repr(error)))
            continue
        if must_pass and not challenge['tests']:
            failures.append((challenge['id'], 'no tests', ''))
        passed = True
        for case in challenge['tests']:
            scope = dict(namespace)
            try:
                if case.get('setup'):
                    exec(compile(case['setup'], '<test>', 'exec'), scope)
                expected = eval_block(case['expected'], dict(scope))
                actual = eval_block(case['call'], scope)
            except BaseException as error:
                passed = False
                if must_pass:
                    failures.append((challenge['id'], case['call'], repr(error)))
                continue
            if not eq(actual, expected):
                passed = False
                if must_pass:
                    failures.append(
                        (challenge['id'], case['call'], f'expected {expected!r}, got {actual!r}')
                    )
        if passed and not must_pass:
            failures.append((challenge['id'], label, 'starter already passes every test'))

for challenge_id, call, detail in failures:
    print(f'{challenge_id}: {call} -> {detail}')
print(f'--- {len(failures)} failing checks')
sys.exit(1 if failures else 0)
`;

const ids = challenges.map((c) => c.id);
const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
if (duplicates.length) {
  console.error(`Duplicate challenge ids: ${[...new Set(duplicates)].join(', ')}`);
  process.exit(1);
}

const badHints = challenges.filter((c) => (c.hints ?? []).length !== 3);
if (badHints.length) {
  for (const c of badHints) console.error(`${c.id}: has ${(c.hints ?? []).length} hints, needs 3`);
  process.exit(1);
}

const result = spawnSync('python3', ['-c', PY], {
  input: JSON.stringify(challenges),
  encoding: 'utf8',
});
process.stdout.write(result.stdout ?? '');
process.stderr.write(result.stderr ?? '');
console.log(`Checked ${challenges.length} challenges.`);
process.exit(result.status ?? 1);
