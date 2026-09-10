import { useMemo, useState } from 'react';
import type { QuizConfig, QuizMode, Track, TrackId } from '../types';
import { accents } from '../lib/theme';
import { topicsOf } from '../data';

interface HomeProps {
  tracks: Track[];
  hasSavedAttempt: boolean;
  savedLabel?: string;
  onResume: () => void;
  onDiscard: () => void;
  onStart: (config: QuizConfig) => void;
  onOpenPythonLab: () => void;
}

const SIZE_OPTIONS: (number | 'all')[] = [10, 25, 50, 75, 'all'];

export default function Home({
  tracks,
  hasSavedAttempt,
  savedLabel,
  onResume,
  onDiscard,
  onStart,
  onOpenPythonLab,
}: HomeProps) {
  const [trackId, setTrackId] = useState<TrackId>(tracks[0].id);
  const [mode, setMode] = useState<QuizMode>('practice');
  const [size, setSize] = useState<number | 'all'>(25);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [shuffleOptions, setShuffleOptions] = useState(true);

  const track = tracks.find((t) => t.id === trackId)!;
  const accent = accents[trackId];
  const topics = useMemo(() => topicsOf(track), [track]);

  const availableCount = selectedTopics.length
    ? track.questions.filter((q) => selectedTopics.includes(q.topic)).length
    : track.questions.length;

  function selectTrack(id: TrackId) {
    setTrackId(id);
    setSelectedTopics([]);
  }

  function toggleTopic(topic: string) {
    setSelectedTopics((current) =>
      current.includes(topic) ? current.filter((t) => t !== topic) : [...current, topic],
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Interview &amp; certification practice
        </p>
        <h1 className="mt-3 bg-gradient-to-r from-sky-300 via-slate-100 to-violet-300 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
          DevOps &amp; Build/Release Engineering Quiz
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
          {tracks.reduce((sum, t) => sum + t.questions.length, 0)} questions across two role tracks.
          Every question includes an explanation, and multi-select questions are marked. Progress is
          saved in your browser.
        </p>
      </header>

      {hasSavedAttempt && (
        <div className="mb-8 flex flex-col gap-3 rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-amber-100">
            You have an unfinished attempt{savedLabel ? ` — ${savedLabel}` : ''}.
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onResume}
              className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-amber-950 transition hover:bg-amber-300"
            >
              Resume
            </button>
            <button
              type="button"
              onClick={onDiscard}
              className="rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/5"
            >
              Discard
            </button>
          </div>
        </div>
      )}

      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
          Or write some code
        </h2>
        <button
          type="button"
          onClick={onOpenPythonLab}
          className="flex w-full items-center justify-between gap-4 rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.07] p-5 text-left transition hover:border-emerald-400/50 hover:bg-emerald-400/[0.12]"
        >
          <span>
            <span className="block text-lg font-semibold text-emerald-300">
              Python data structures lab
            </span>
            <span className="mt-2 block text-sm leading-relaxed text-slate-400">
              150+ hands-on challenges on lists, dicts, sets, tuples and strings. Real Python runs
              in your browser and grades your solution against a test suite.
            </span>
          </span>
          <span className="shrink-0 rounded-full bg-emerald-400/15 px-3 py-1 font-mono text-xs text-emerald-300">
            python
          </span>
        </button>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
          1. Choose a track
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {tracks.map((t) => {
            const a = accents[t.id];
            const active = t.id === trackId;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => selectTrack(t.id)}
                aria-pressed={active}
                className={`rounded-2xl border p-5 text-left transition ${
                  active
                    ? `${a.border} ${a.bg} ring-2 ${a.ring}`
                    : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]'
                }`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className={`text-lg font-semibold ${active ? a.text : 'text-slate-100'}`}>
                    {t.name}
                  </h3>
                  <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-slate-300">
                    {t.questions.length}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{t.tagline}</p>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
          2. Mode
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <ModeCard
            title="Practice"
            description="Check each answer immediately and read the explanation as you go."
            active={mode === 'practice'}
            onSelect={() => setMode('practice')}
          />
          <ModeCard
            title="Exam"
            description="Timed run with answers hidden until you submit the whole paper."
            active={mode === 'exam'}
            onSelect={() => setMode('exam')}
          />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
          3. Length
        </h2>
        <div className="flex flex-wrap gap-2">
          {SIZE_OPTIONS.map((option) => {
            const active = option === size;
            const label = option === 'all' ? `All (${availableCount})` : `${option} questions`;
            const disabled = option !== 'all' && option > availableCount;
            return (
              <button
                key={String(option)}
                type="button"
                disabled={disabled}
                onClick={() => setSize(option)}
                className={`rounded-lg border px-3.5 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-35 ${
                  active
                    ? `${accent.border} ${accent.bg} ${accent.text}`
                    : 'border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.07]'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            4. Topics <span className="normal-case text-slate-500">(optional)</span>
          </h2>
          {selectedTopics.length > 0 && (
            <button
              type="button"
              onClick={() => setSelectedTopics([])}
              className="text-xs font-medium text-slate-400 underline-offset-2 hover:text-slate-200 hover:underline"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => {
            const active = selectedTopics.includes(topic);
            const count = track.questions.filter((q) => q.topic === topic).length;
            return (
              <button
                key={topic}
                type="button"
                onClick={() => toggleTopic(topic)}
                aria-pressed={active}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  active
                    ? `${accent.border} ${accent.bg} ${accent.text}`
                    : 'border-white/10 bg-white/[0.03] text-slate-400 hover:bg-white/[0.07]'
                }`}
              >
                {topic} <span className="opacity-60">{count}</span>
              </button>
            );
          })}
        </div>
      </section>

      <label className="mb-8 flex w-fit cursor-pointer items-center gap-3 text-sm text-slate-300">
        <input
          type="checkbox"
          checked={shuffleOptions}
          onChange={(event) => setShuffleOptions(event.target.checked)}
          className="h-4 w-4 rounded border-white/20 bg-white/10 accent-sky-500"
        />
        Shuffle answer options
      </label>

      <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-400">
          {size === 'all' ? availableCount : Math.min(size, availableCount)} questions ·{' '}
          {mode === 'exam' ? 'exam mode' : 'practice mode'}
          {selectedTopics.length > 0 && ` · ${selectedTopics.length} topic filter(s)`}
        </p>
        <button
          type="button"
          onClick={() => onStart({ trackId, mode, size, topics: selectedTopics, shuffleOptions })}
          className={`rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/30 transition ${accent.solid} ${accent.solidHover}`}
        >
          Start quiz
        </button>
      </div>
    </div>
  );
}

function ModeCard({
  title,
  description,
  active,
  onSelect,
}: {
  title: string;
  description: string;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`rounded-xl border p-4 text-left transition ${
        active
          ? 'border-white/25 bg-white/[0.08]'
          : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.06]'
      }`}
    >
      <h3 className="text-sm font-semibold text-slate-100">{title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-slate-400">{description}</p>
    </button>
  );
}
