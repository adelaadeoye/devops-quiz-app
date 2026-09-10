import type { AttemptResult, AttemptState, Question, TopicScore } from '../types';

export const PASS_MARK = 75;

export function isMultiSelect(question: Question): boolean {
  return question.answers.length > 1;
}

export function isCorrect(question: Question, selected: number[] | undefined): boolean {
  if (!selected || selected.length !== question.answers.length) return false;
  const expected = [...question.answers].sort((a, b) => a - b);
  const actual = [...selected].sort((a, b) => a - b);
  return expected.every((value, index) => value === actual[index]);
}

export function shuffle<T>(items: readonly T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Returns a copy of the question with options reordered and `answers` remapped.
 */
export function withShuffledOptions(question: Question): Question {
  const order = shuffle(question.options.map((_, index) => index));
  return {
    ...question,
    options: order.map((index) => question.options[index]),
    answers: question.answers
      .map((answer) => order.indexOf(answer))
      .sort((a, b) => a - b),
  };
}

export function pickQuestions(
  pool: Question[],
  size: number | 'all',
  topics: string[],
): Question[] {
  const filtered = topics.length ? pool.filter((q) => topics.includes(q.topic)) : pool;
  const shuffled = shuffle(filtered);
  if (size === 'all') return shuffled;
  return shuffled.slice(0, Math.min(size, shuffled.length));
}

export function scoreAttempt(attempt: AttemptState, questions: Question[]): AttemptResult {
  const byTopic = new Map<string, TopicScore>();
  let correct = 0;

  for (const question of questions) {
    const entry = byTopic.get(question.topic) ?? { topic: question.topic, correct: 0, total: 0 };
    entry.total += 1;
    if (isCorrect(question, attempt.selections[question.id])) {
      entry.correct += 1;
      correct += 1;
    }
    byTopic.set(question.topic, entry);
  }

  const total = questions.length;
  const percentage = total === 0 ? 0 : Math.round((correct / total) * 100);

  return {
    correct,
    total,
    percentage,
    passed: percentage >= PASS_MARK,
    durationMs: (attempt.finishedAt ?? Date.now()) - attempt.startedAt,
    byTopic: [...byTopic.values()].sort((a, b) => a.topic.localeCompare(b.topic)),
  };
}

export function formatDuration(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}
