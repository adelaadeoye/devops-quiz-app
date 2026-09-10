import type { Question, TrackId } from '../types';
import { accents } from '../lib/theme';
import { isMultiSelect } from '../lib/quiz';

interface QuestionCardProps {
  question: Question;
  index: number;
  total: number;
  selected: number[];
  revealed: boolean;
  trackId: TrackId;
  flagged: boolean;
  onToggleOption: (optionIndex: number) => void;
  onToggleFlag: () => void;
}

const LETTERS = 'ABCDEFGH';

export default function QuestionCard({
  question,
  index,
  total,
  selected,
  revealed,
  trackId,
  flagged,
  onToggleOption,
  onToggleFlag,
}: QuestionCardProps) {
  const accent = accents[trackId];
  const multi = isMultiSelect(question);

  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-7">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Question {index + 1} of {total}
        </span>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${accent.bg} ${accent.text}`}>
          {question.topic}
        </span>
        <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium capitalize text-slate-300">
          {question.difficulty}
        </span>
        {multi && (
          <span className="rounded-full bg-amber-400/15 px-2.5 py-0.5 text-xs font-medium text-amber-200">
            Select {question.answers.length}
          </span>
        )}
        <button
          type="button"
          onClick={onToggleFlag}
          aria-pressed={flagged}
          className={`ml-auto rounded-lg border px-2.5 py-1 text-xs font-medium transition ${
            flagged
              ? 'border-amber-400/40 bg-amber-400/15 text-amber-200'
              : 'border-white/10 text-slate-400 hover:bg-white/5'
          }`}
        >
          {flagged ? 'Flagged' : 'Flag for review'}
        </button>
      </div>

      <h2 className="text-lg font-semibold leading-relaxed text-slate-100 sm:text-xl">
        {question.question}
      </h2>

      <ul className="mt-5 space-y-2.5" role={multi ? 'group' : 'radiogroup'}>
        {question.options.map((option, optionIndex) => {
          const isSelected = selected.includes(optionIndex);
          const isAnswer = question.answers.includes(optionIndex);

          let stateClass =
            'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.07]';
          if (revealed) {
            if (isAnswer) stateClass = 'border-emerald-400/50 bg-emerald-400/10';
            else if (isSelected) stateClass = 'border-rose-400/50 bg-rose-400/10';
            else stateClass = 'border-white/5 bg-transparent opacity-60';
          } else if (isSelected) {
            stateClass = `${accent.border} ${accent.bg}`;
          }

          return (
            <li key={optionIndex}>
              <button
                type="button"
                disabled={revealed}
                aria-pressed={isSelected}
                onClick={() => onToggleOption(optionIndex)}
                className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition disabled:cursor-default ${stateClass}`}
              >
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-xs font-bold ${
                    multi ? 'rounded-md' : 'rounded-full'
                  } ${
                    isSelected || (revealed && isAnswer)
                      ? 'bg-white/90 text-slate-900'
                      : 'bg-white/10 text-slate-300'
                  }`}
                >
                  {LETTERS[optionIndex]}
                </span>
                <span className="text-sm leading-relaxed text-slate-200">{option}</span>
                {revealed && isAnswer && (
                  <span className="ml-auto shrink-0 text-xs font-semibold text-emerald-300">
                    Correct
                  </span>
                )}
                {revealed && isSelected && !isAnswer && (
                  <span className="ml-auto shrink-0 text-xs font-semibold text-rose-300">
                    Your answer
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {revealed && (
        <div className="mt-5 rounded-xl border border-white/10 bg-ink-900/60 p-4">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Explanation
          </p>
          <p className="text-sm leading-relaxed text-slate-300">{question.explanation}</p>
        </div>
      )}
    </article>
  );
}
