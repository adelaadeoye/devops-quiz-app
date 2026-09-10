import { useEffect, useMemo, useState } from 'react';
import type { AttemptState, Question, Track } from '../types';
import { formatDuration, isCorrect, isMultiSelect } from '../lib/quiz';
import { accents } from '../lib/theme';
import QuestionCard from './QuestionCard';

interface QuizProps {
  track: Track;
  attempt: AttemptState;
  questions: Question[];
  onChange: (next: AttemptState) => void;
  onFinish: () => void;
  onExit: () => void;
}

export default function Quiz({ track, attempt, questions, onChange, onFinish, onExit }: QuizProps) {
  const accent = accents[track.id];
  const practice = attempt.config.mode === 'practice';
  const question = questions[attempt.current];
  const selected = attempt.selections[question.id] ?? [];
  const revealed = Boolean(attempt.revealed[question.id]);
  const [elapsed, setElapsed] = useState(() => Date.now() - attempt.startedAt);
  const [confirmSubmit, setConfirmSubmit] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => setElapsed(Date.now() - attempt.startedAt), 1000);
    return () => window.clearInterval(timer);
  }, [attempt.startedAt]);

  const answeredCount = useMemo(
    () => questions.filter((q) => (attempt.selections[q.id]?.length ?? 0) > 0).length,
    [questions, attempt.selections],
  );

  function goTo(index: number) {
    if (index < 0 || index >= questions.length) return;
    onChange({ ...attempt, current: index });
  }

  function toggleOption(optionIndex: number) {
    if (revealed) return;
    const multi = isMultiSelect(question);
    const next = multi
      ? selected.includes(optionIndex)
        ? selected.filter((i) => i !== optionIndex)
        : [...selected, optionIndex]
      : [optionIndex];
    onChange({ ...attempt, selections: { ...attempt.selections, [question.id]: next } });
  }

  function toggleFlag() {
    const flagged = attempt.flagged.includes(question.id)
      ? attempt.flagged.filter((id) => id !== question.id)
      : [...attempt.flagged, question.id];
    onChange({ ...attempt, flagged });
  }

  function check() {
    onChange({ ...attempt, revealed: { ...attempt.revealed, [question.id]: true } });
  }

  const canCheck = practice && !revealed && selected.length === question.answers.length;
  const isLast = attempt.current === questions.length - 1;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <header className="mb-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onExit}
          className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-white/5"
        >
          ← Exit
        </button>
        <div className="min-w-0">
          <p className={`truncate text-sm font-semibold ${accent.text}`}>{track.name}</p>
          <p className="text-xs text-slate-500">
            {practice ? 'Practice mode' : 'Exam mode'} · {answeredCount}/{questions.length} answered
          </p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <span className="rounded-lg bg-white/[0.06] px-3 py-1.5 font-mono text-sm tabular-nums text-slate-300">
            {formatDuration(elapsed)}
          </span>
          <button
            type="button"
            onClick={() => setConfirmSubmit(true)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold text-white transition ${accent.solid} ${accent.solidHover}`}
          >
            Submit
          </button>
        </div>
      </header>

      <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${accent.gradient} transition-[width] duration-300`}
          style={{ width: `${((attempt.current + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_16rem]">
        <div>
          <QuestionCard
            question={question}
            index={attempt.current}
            total={questions.length}
            selected={selected}
            revealed={revealed}
            trackId={track.id}
            flagged={attempt.flagged.includes(question.id)}
            onToggleOption={toggleOption}
            onToggleFlag={toggleFlag}
          />

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => goTo(attempt.current - 1)}
              disabled={attempt.current === 0}
              className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            {canCheck && (
              <button
                type="button"
                onClick={check}
                className="rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-400/20"
              >
                Check answer
              </button>
            )}

            {practice && revealed && (
              <span
                className={`text-sm font-semibold ${
                  isCorrect(question, selected) ? 'text-emerald-300' : 'text-rose-300'
                }`}
              >
                {isCorrect(question, selected) ? 'Correct' : 'Incorrect'}
              </span>
            )}

            <button
              type="button"
              onClick={() => (isLast ? setConfirmSubmit(true) : goTo(attempt.current + 1))}
              className={`ml-auto rounded-lg px-5 py-2 text-sm font-semibold text-white transition ${accent.solid} ${accent.solidHover}`}
            >
              {isLast ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>

        <aside className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Questions
          </p>
          <div className="grid grid-cols-8 gap-1.5 lg:grid-cols-6">
            {questions.map((q, index) => {
              const answered = (attempt.selections[q.id]?.length ?? 0) > 0;
              const flagged = attempt.flagged.includes(q.id);
              const current = index === attempt.current;
              const wasRevealed = Boolean(attempt.revealed[q.id]);

              let cls = 'bg-white/[0.06] text-slate-400 hover:bg-white/15';
              if (answered) cls = 'bg-white/20 text-slate-100';
              if (practice && wasRevealed) {
                cls = isCorrect(q, attempt.selections[q.id])
                  ? 'bg-emerald-500/25 text-emerald-200'
                  : 'bg-rose-500/25 text-rose-200';
              }

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Go to question ${index + 1}`}
                  aria-current={current ? 'true' : undefined}
                  className={`relative aspect-square rounded-md text-xs font-semibold transition ${cls} ${
                    current ? `ring-2 ${accent.ring}` : ''
                  }`}
                >
                  {index + 1}
                  {flagged && (
                    <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-amber-400" />
                  )}
                </button>
              );
            })}
          </div>
          <dl className="mt-4 space-y-1 text-xs text-slate-500">
            <div className="flex justify-between">
              <dt>Answered</dt>
              <dd className="text-slate-300">
                {answeredCount}/{questions.length}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt>Flagged</dt>
              <dd className="text-slate-300">{attempt.flagged.length}</dd>
            </div>
          </dl>
        </aside>
      </div>

      {confirmSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-ink-900 p-6">
            <h2 className="text-lg font-semibold text-slate-100">Submit this attempt?</h2>
            <p className="mt-2 text-sm text-slate-400">
              {answeredCount === questions.length
                ? 'All questions are answered.'
                : `${questions.length - answeredCount} question(s) are unanswered and will be marked incorrect.`}
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmSubmit(false)}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/5"
              >
                Keep going
              </button>
              <button
                type="button"
                onClick={onFinish}
                className={`rounded-lg px-4 py-2 text-sm font-semibold text-white transition ${accent.solid} ${accent.solidHover}`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
