import { useMemo, useState } from 'react';
import type { Challenge, ChallengeTopic, Difficulty } from '../types';
import { challengeTopics } from '../data/python';

interface ChallengeListProps {
  challenges: Challenge[];
  solved: Record<string, boolean>;
  onOpen: (id: string) => void;
  onBack: () => void;
  onResetProgress: () => void;
}

const DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard'];

const difficultyDot: Record<Difficulty, string> = {
  easy: 'bg-emerald-400',
  medium: 'bg-amber-400',
  hard: 'bg-rose-400',
};

export default function ChallengeList({
  challenges,
  solved,
  onOpen,
  onBack,
  onResetProgress,
}: ChallengeListProps) {
  const [topics, setTopics] = useState<ChallengeTopic[]>([]);
  const [difficulties, setDifficulties] = useState<Difficulty[]>([]);
  const [hideSolved, setHideSolved] = useState(false);
  const [query, setQuery] = useState('');

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return challenges.filter((challenge) => {
      if (topics.length && !topics.includes(challenge.topic)) return false;
      if (difficulties.length && !difficulties.includes(challenge.difficulty)) return false;
      if (hideSolved && solved[challenge.id]) return false;
      if (needle && !challenge.title.toLowerCase().includes(needle)) return false;
      return true;
    });
  }, [challenges, topics, difficulties, hideSolved, query, solved]);

  const solvedCount = challenges.filter((challenge) => solved[challenge.id]).length;
  const available = challengeTopics.filter((topic) =>
    challenges.some((challenge) => challenge.topic === topic.id),
  );

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <button
        type="button"
        onClick={onBack}
        className="mb-6 rounded-lg border border-white/10 px-3 py-1.5 text-sm text-slate-300 transition hover:bg-white/5"
      >
        ← Home
      </button>

      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Python interview prep
        </p>
        <h1 className="mt-3 bg-gradient-to-r from-emerald-300 via-slate-100 to-sky-300 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
          Data structure coding challenges
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
          {challenges.length} exercises on lists, dicts, sets and friends. Write real Python in the
          browser and run the test suite against it — nothing is uploaded, the interpreter runs
          locally via WebAssembly.
        </p>
        <div className="mt-4 flex items-center gap-3">
          <div className="h-1.5 w-48 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-emerald-400 transition-all"
              style={{ width: `${challenges.length ? (solvedCount / challenges.length) * 100 : 0}%` }}
            />
          </div>
          <span className="text-xs text-slate-400">
            {solvedCount} / {challenges.length} solved
          </span>
          {solvedCount > 0 && (
            <button
              type="button"
              onClick={onResetProgress}
              className="text-xs text-slate-500 underline-offset-2 hover:text-slate-300 hover:underline"
            >
              Reset progress
            </button>
          )}
        </div>
      </header>

      <section className="mb-6 space-y-3">
        <div className="flex flex-wrap gap-2">
          {available.map((topic) => {
            const active = topics.includes(topic.id);
            const count = challenges.filter((c) => c.topic === topic.id).length;
            return (
              <button
                key={topic.id}
                type="button"
                aria-pressed={active}
                title={topic.blurb}
                onClick={() =>
                  setTopics((current) =>
                    current.includes(topic.id)
                      ? current.filter((t) => t !== topic.id)
                      : [...current, topic.id],
                  )
                }
                className={`rounded-full border px-3 py-1.5 font-mono text-xs transition ${
                  active
                    ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300'
                    : 'border-white/10 bg-white/[0.03] text-slate-400 hover:bg-white/[0.07]'
                }`}
              >
                {topic.label} <span className="opacity-60">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {DIFFICULTIES.map((level) => {
            const active = difficulties.includes(level);
            return (
              <button
                key={level}
                type="button"
                aria-pressed={active}
                onClick={() =>
                  setDifficulties((current) =>
                    current.includes(level)
                      ? current.filter((d) => d !== level)
                      : [...current, level],
                  )
                }
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium capitalize transition ${
                  active
                    ? 'border-white/25 bg-white/[0.08] text-slate-100'
                    : 'border-white/10 bg-white/[0.03] text-slate-400 hover:bg-white/[0.07]'
                }`}
              >
                {level}
              </button>
            );
          })}
          <label className="ml-1 flex cursor-pointer items-center gap-2 text-xs text-slate-400">
            <input
              type="checkbox"
              checked={hideSolved}
              onChange={(event) => setHideSolved(event.target.checked)}
              className="h-3.5 w-3.5 rounded border-white/20 bg-white/10 accent-emerald-500"
            />
            Hide solved
          </label>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search titles…"
            className="ml-auto w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-600 focus:border-white/25 focus:outline-none sm:w-56"
          />
        </div>
      </section>

      {visible.length === 0 ? (
        <p className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-10 text-center text-sm text-slate-500">
          No challenges match these filters.
        </p>
      ) : (
        <ul className="space-y-2">
          {visible.map((challenge) => (
            <li key={challenge.id}>
              <button
                type="button"
                onClick={() => onOpen(challenge.id)}
                className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left transition hover:border-white/20 hover:bg-white/[0.07]"
              >
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${difficultyDot[challenge.difficulty]}`}
                  title={challenge.difficulty}
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-slate-100">
                    {challenge.title}
                  </span>
                  <span className="mt-0.5 block font-mono text-xs text-slate-500">
                    {challenge.topic} · {challenge.tests.length} tests
                  </span>
                </span>
                {solved[challenge.id] && (
                  <span className="shrink-0 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-xs font-medium text-emerald-300">
                    solved
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
