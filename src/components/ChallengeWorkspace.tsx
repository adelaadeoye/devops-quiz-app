import { useEffect, useMemo, useState } from 'react';
import type { Challenge, RunResult } from '../types';
import { onPythonStatus, runPython } from '../lib/python';
import CodeEditor from './CodeEditor';

interface ChallengeWorkspaceProps {
  challenge: Challenge;
  code: string;
  onCodeChange: (code: string) => void;
  solved: boolean;
  onSolved: () => void;
  onBack: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  index: number;
  total: number;
}

const difficultyStyles: Record<Challenge['difficulty'], string> = {
  easy: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/30',
  medium: 'bg-amber-400/10 text-amber-300 border-amber-400/30',
  hard: 'bg-rose-400/10 text-rose-300 border-rose-400/30',
};

export default function ChallengeWorkspace({
  challenge,
  code,
  onCodeChange,
  solved,
  onSolved,
  onBack,
  onPrev,
  onNext,
  index,
  total,
}: ChallengeWorkspaceProps) {
  const [result, setResult] = useState<RunResult | null>(null);
  const [failure, setFailure] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [hintsShown, setHintsShown] = useState(0);
  const [resetToken, setResetToken] = useState(0);

  useEffect(() => {
    setResult(null);
    setFailure(null);
    setShowSolution(false);
    setHintsShown(0);
  }, [challenge.id]);

  useEffect(() => {
    onPythonStatus(setStatus);
    return () => onPythonStatus(null);
  }, []);

  const passed = result ? result.outcomes.length > 0 && result.outcomes.every((o) => o.ok) : false;

  useEffect(() => {
    if (passed) onSolved();
    // `onSolved` is stable enough for this one-shot signal.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passed, challenge.id]);

  async function run() {
    setRunning(true);
    setFailure(null);
    try {
      setResult(await runPython(code, challenge.tests));
    } catch (error) {
      setResult(null);
      setFailure(error instanceof Error ? error.message : String(error));
    } finally {
      setRunning(false);
      setStatus(null);
    }
  }

  const paragraphs = useMemo(() => challenge.prompt.split('\n\n'), [challenge.prompt]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-slate-300 transition hover:bg-white/5"
        >
          ← All challenges
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">
            {index + 1} of {total}
          </span>
          <button
            type="button"
            onClick={onPrev}
            disabled={!onPrev}
            className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-slate-300 transition hover:bg-white/5 disabled:opacity-30"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!onNext}
            className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-slate-300 transition hover:bg-white/5 disabled:opacity-30"
          >
            Next
          </button>
        </div>
      </div>

      <header className="mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-0.5 font-mono text-xs text-emerald-300">
            {challenge.topic}
          </span>
          <span
            className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${difficultyStyles[challenge.difficulty]}`}
          >
            {challenge.difficulty}
          </span>
          {solved && (
            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-xs font-medium text-emerald-300">
              solved
            </span>
          )}
        </div>
        <h1 className="mt-3 text-2xl font-bold text-slate-100">{challenge.title}</h1>
        <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-300">
          {paragraphs.map((paragraph, i) => (
            <Prose key={i} text={paragraph} />
          ))}
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              solution.py
            </h2>
            <button
              type="button"
              onClick={() => {
                onCodeChange(challenge.starter);
                setResetToken((n) => n + 1);
              }}
              className="text-xs text-slate-400 underline-offset-2 hover:text-slate-200 hover:underline"
            >
              Reset code
            </button>
          </div>
          <CodeEditor
            value={code}
            onChange={onCodeChange}
            resetKey={`${challenge.id}:${resetToken}`}
          />

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={run}
              disabled={running}
              className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-emerald-950 shadow-lg shadow-black/30 transition hover:bg-emerald-400 disabled:opacity-60"
            >
              {running ? 'Running…' : 'Run tests'}
            </button>
            {hintsShown < challenge.hints.length && (
              <button
                type="button"
                onClick={() => setHintsShown((n) => n + 1)}
                className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/5"
              >
                Hint ({challenge.hints.length - hintsShown} left)
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowSolution((v) => !v)}
              className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/5"
            >
              {showSolution ? 'Hide solution' : 'Show solution'}
            </button>
            {running && status && <span className="text-xs text-slate-500">{status}</span>}
          </div>

          {hintsShown > 0 && (
            <ul className="mt-4 space-y-2">
              {challenge.hints.slice(0, hintsShown).map((hint) => (
                <li
                  key={hint}
                  className="rounded-lg border border-amber-400/20 bg-amber-400/[0.07] px-3 py-2 text-sm text-amber-100"
                >
                  {inline(hint)}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="space-y-4">
          <section>
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Tests
            </h2>
            {failure && (
              <p className="rounded-lg border border-rose-400/30 bg-rose-400/10 px-3 py-2 text-sm text-rose-200">
                {failure}
              </p>
            )}
            {!result && !failure && (
              <p className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-6 text-center text-sm text-slate-500">
                Run the tests to see results. The Python runtime downloads once, on first run.
              </p>
            )}
            {result?.error && (
              <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg border border-rose-400/30 bg-rose-400/10 px-3 py-2 font-mono text-xs text-rose-200">
                {result.error}
              </pre>
            )}
            {result && !result.error && (
              <ul className="space-y-2">
                {result.outcomes.map((outcome, i) => (
                  <li
                    key={i}
                    className={`rounded-lg border px-3 py-2 font-mono text-xs ${
                      outcome.ok
                        ? 'border-emerald-400/25 bg-emerald-400/[0.07] text-emerald-200'
                        : 'border-rose-400/25 bg-rose-400/[0.07] text-rose-200'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span aria-hidden>{outcome.ok ? '✓' : '✗'}</span>
                      <span className="min-w-0">
                        {challenge.tests[i]?.setup && (
                          <span className="block whitespace-pre-wrap break-all opacity-50">
                            {challenge.tests[i].setup}
                          </span>
                        )}
                        <span className="block whitespace-pre-wrap break-all">{outcome.call}</span>
                      </span>
                    </div>
                    {!outcome.ok && (
                      <div className="mt-1.5 space-y-0.5 pl-5 text-[11px] text-slate-400">
                        <div className="whitespace-pre-wrap break-all">
                          expected: {outcome.expected}
                        </div>
                        <div className="whitespace-pre-wrap break-all">got: {outcome.got}</div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
            {passed && (
              <p className="mt-3 rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-sm font-medium text-emerald-200">
                All tests passed. Compare your approach with the explanation below.
              </p>
            )}
          </section>

          {result?.stdout && (
            <section>
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Output
              </h2>
              <pre className="max-h-48 overflow-auto whitespace-pre-wrap rounded-lg border border-white/10 bg-ink-900/80 px-3 py-2 font-mono text-xs text-slate-300">
                {result.stdout}
              </pre>
            </section>
          )}

          {showSolution && (
            <section className="space-y-3">
              <div>
                <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Reference solution
                </h2>
                <pre className="overflow-x-auto rounded-lg border border-white/10 bg-ink-900/80 px-3 py-2 font-mono text-xs text-slate-200">
                  {challenge.solution.trimEnd()}
                </pre>
              </div>
              <div>
                <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Why it works
                </h2>
                <p className="rounded-lg border border-sky-400/20 bg-sky-400/[0.06] px-3 py-2 text-sm leading-relaxed text-slate-200">
                  {inline(challenge.explanation)}
                </p>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

/** Renders `- ` lines as bullets and `\`code\`` spans as monospace. */
function Prose({ text }: { text: string }) {
  const lines = text.split('\n');
  const bulleted = lines.every((line) => line.startsWith('- '));
  if (bulleted) {
    return (
      <ul className="list-disc space-y-1 pl-5">
        {lines.map((line, i) => (
          <li key={i}>{inline(line.slice(2))}</li>
        ))}
      </ul>
    );
  }
  return <p>{inline(text)}</p>;
}

function inline(text: string) {
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 1) {
      return (
        <code key={i} className="rounded bg-white/10 px-1 py-0.5 font-mono text-[0.85em] text-sky-200">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('**') && part.endsWith('**') && part.length > 3) {
      return (
        <strong key={i} className="font-semibold text-slate-100">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
