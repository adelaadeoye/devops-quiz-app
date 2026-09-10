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

export type ChallengeTopic = 'list' | 'dict' | 'set' | 'tuple' | 'str' | 'collections';

export interface ChallengeTest {
  /** Statements run before `call`, e.g. to build a mutable fixture. */
  setup?: string;
  /** Python expression evaluated against the submitted code. */
  call: string;
  /** Python expression producing the expected value. */
  expected: string;
}

export interface Challenge {
  id: string;
  title: string;
  topic: ChallengeTopic;
  difficulty: Difficulty;
  /** Task description. Blank lines separate paragraphs; lines starting with `- ` render as bullets. */
  prompt: string;
  starter: string;
  tests: ChallengeTest[];
  solution: string;
  explanation: string;
  hints?: string[];
}

export interface TestOutcome {
  call: string;
  expected: string;
  got: string;
  ok: boolean;
}

export interface RunResult {
  stdout: string;
  /** Set when the submitted code failed to import/execute at all. */
  error?: string;
  outcomes: TestOutcome[];
}

export interface AttemptResult {
  correct: number;
  total: number;
  percentage: number;
  passed: boolean;
  durationMs: number;
  byTopic: TopicScore[];
}
