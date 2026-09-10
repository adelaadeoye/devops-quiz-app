import { useMemo, useState } from 'react';
import type { AttemptState, Question, Track } from '../types';
import { PASS_MARK, formatDuration, isCorrect, scoreAttempt } from '../lib/quiz';
import { accents } from '../lib/theme';

interface ResultsProps {
  track: Track;
  attempt: AttemptState;
  questions: Question[];
  onRetryMissed: (missed: Question[]) => void;
  onRestart: () => void;
  onHome: () => void;
}

type Filter = 'all' | 'incorrect' | 'flagged';

const LETTERS = 'ABCDEFGH';

export default function Results({
  track,
  attempt,
  questions,
  onRetryMissed,
  onRestart,
  onHome,
}: ResultsProps) {
  const accent = accents[track.id];
  const [filter, setFilter] = useState<Filter>('incorrect');
  const result = useMemo(() => scoreAttempt(attempt, questions), [attempt, questions]);

  const missed = useMemo(
    () => questions.filter((q) => !isCorrect(q, attempt.selections[q.id])),
    [questions, attempt.selections],
  );

  const visible = useMemo(() => {
    if (filter === 'incorrect') return missed;
    if (filter === 'flagged') return questions.filter((q) => attempt.flagged.includes(q.id));
    return questions;
  }, [filter, missed, questions, attempt.flagged]);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
        <p className={`text-sm font-semibold ${accent.text}`}>{track.name}</p>
        <div className="mt-4 flex flex-wrap items-end gap-x-8 gap-y-4">
          <div>
            <p className="text-5xl font-bold tabular-nums text-slate-100">{result.percentage}%</p>
            <p className="mt-1 text-sm text-slate-400">
              {result.correct} of {result.total} correct
            </p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${
              result.passed
                ? 'bg-emerald-400/15 text-emerald-300'
                : 'bg-amber-400/15 text-amber-300'
            }`}
          >
            {result.passed ? `Pass (≥ ${PASS_MARK}%)` : `Below ${PASS_MARK}% target`}
          </span>
          <span className="text-sm text-slate-400">Time {formatDuration(result.durationMs)}</span>
        </div>

        <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${accent.gradient}`}
            style={{ width: `${result.percentage}%` }}
          />
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          {missed.length > 0 && (
            <button
              type="button"
              onClick={() => onRetryMissed(missed)}
              className={`rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition ${accent.solid} ${accent.solidHover}`}
            >
              Retry {missed.length} missed
            </button>
          )}
          <button
            type="button"
            onClick={onRestart}
            className="rounded-lg border border-white/15 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/5"
          >
            New attempt, same settings
          </button>
          <button
            type="button"
            onClick={onHome}
            className="rounded-lg border border-white/15 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/5"
          >
            Back to start
          </button>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
          By topic
        </h2>
        <ul className="space-y-2">
          {result.byTopic.map((topic) => {
            const pct = Math.round((topic.correct / topic.total) * 100);
            return (
              <li
                key={topic.topic}
                className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
              >
                <span className="w-44 shrink-0 truncate text-sm text-slate-200">{topic.topic}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full ${
                      pct >= PASS_MARK ? 'bg-emerald-400' : pct >= 50 ? 'bg-amber-400' : 'bg-rose-400'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-20 shrink-0 text-right text-sm tabular-nums text-slate-400">
                  {topic.correct}/{topic.total}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-10">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <h2 className="mr-auto text-sm font-semibold uppercase tracking-wider text-slate-400">
            Review
          </h2>
          {(
            [
              ['incorrect', `Incorrect (${missed.length})`],
              ['flagged', `Flagged (${attempt.flagged.length})`],
              ['all', `All (${questions.length})`],
            ] as [Filter, string][]
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                filter === value
                  ? `${accent.border} ${accent.bg} ${accent.text}`
                  : 'border-white/10 text-slate-400 hover:bg-white/5'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-center text-sm text-slate-400">
            Nothing to show here.
          </p>
        ) : (
          <ol className="space-y-4">
            {visible.map((question) => {
              const selected = attempt.selections[question.id] ?? [];
              const correct = isCorrect(question, selected);
              return (
                <li
                  key={question.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        correct
                          ? 'bg-emerald-400/15 text-emerald-300'
                          : 'bg-rose-400/15 text-rose-300'
                      }`}
                    >
                      {correct ? 'Correct' : 'Incorrect'}
                    </span>
                    <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-slate-300">
                      {question.topic}
                    </span>
                  </div>
                  <p className="text-base font-medium leading-relaxed text-slate-100">
                    {question.question}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {question.options.map((option, index) => {
                      const isAnswer = question.answers.includes(index);
                      const wasChosen = selected.includes(index);
                      if (!isAnswer && !wasChosen) return null;
                      return (
                        <li
                          key={index}
                          className={`flex gap-2.5 rounded-lg border px-3 py-2 text-sm ${
                            isAnswer
                              ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-100'
                              : 'border-rose-400/40 bg-rose-400/10 text-rose-100'
                          }`}
                        >
                          <span className="font-bold">{LETTERS[index]}</span>
                          <span className="leading-relaxed">{option}</span>
                          <span className="ml-auto shrink-0 text-xs opacity-70">
                            {isAnswer ? (wasChosen ? 'correct · chosen' : 'correct') : 'your answer'}
                          </span>
                        </li>
                      );
                    })}
                    {selected.length === 0 && (
                      <li className="text-sm italic text-slate-500">Not answered</li>
                    )}
                  </ul>
                  <p className="mt-3 rounded-lg bg-ink-900/60 p-3 text-sm leading-relaxed text-slate-300">
                    {question.explanation}
                  </p>
                </li>
              );
            })}
          </ol>
        )}
      </section>
    </div>
  );
}
