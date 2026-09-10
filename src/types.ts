export type Difficulty = 'easy' | 'medium' | 'hard';

export type TrackId = 'devops' | 'build-release';

export interface Question {
  id: string;
  topic: string;
  difficulty: Difficulty;
  question: string;
  options: string[];
  /** Indices into `options`. More than one entry means the question is multi-select. */
  answers: number[];
  explanation: string;
}

export interface Track {
  id: TrackId;
  name: string;
  shortName: string;
  tagline: string;
  accent: string;
  questions: Question[];
}

export type QuizMode = 'practice' | 'exam';

export interface QuizConfig {
  trackId: TrackId;
  mode: QuizMode;
  /** Question count, or 'all'. */
  size: number | 'all';
  topics: string[];
  shuffleOptions: boolean;
}

export interface AttemptState {
  config: QuizConfig;
  questionIds: string[];
  /** questionId -> selected option indices */
  selections: Record<string, number[]>;
  /** questionId -> true once the answer was revealed (practice mode) */
  revealed: Record<string, boolean>;
  flagged: string[];
  current: number;
  startedAt: number;
  finishedAt?: number;
}

export interface TopicScore {
  topic: string;
  correct: number;
  total: number;
}

export interface AttemptResult {
  correct: number;
  total: number;
  percentage: number;
  passed: boolean;
  durationMs: number;
  byTopic: TopicScore[];
}
