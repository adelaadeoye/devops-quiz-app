import { Suspense, lazy, useCallback, useState } from 'react';
import type { AttemptState, Question, QuizConfig } from './types';
import { getTrack, tracks } from './data';
import { pickQuestions, shuffle, withShuffledOptions } from './lib/quiz';
import { useLocalStorage } from './lib/useLocalStorage';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Results from './components/Results';

const PythonLab = lazy(() => import('./components/PythonLab'));

interface Session {
  stage: 'quiz' | 'results';
  attempt: AttemptState;
  questions: Question[];
}

const STORAGE_KEY = 'devops-quiz-app:session:v1';

function newAttempt(config: QuizConfig, questions: Question[]): AttemptState {
  return {
    config,
    questionIds: questions.map((q) => q.id),
    selections: {},
    revealed: {},
    flagged: [],
    current: 0,
    startedAt: Date.now(),
  };
}

export default function App() {
  const [session, setSession, clearSession] = useLocalStorage<Session | null>(STORAGE_KEY, null);
  const [atHome, setAtHome] = useState(true);
  const [inPythonLab, setInPythonLab] = useState(false);

  const start = useCallback(
    (config: QuizConfig) => {
      const track = getTrack(config.trackId);
      if (!track) return;
      const picked = pickQuestions(track.questions, config.size, config.topics);
      const prepared = config.shuffleOptions ? picked.map(withShuffledOptions) : picked;
      setSession({ stage: 'quiz', attempt: newAttempt(config, prepared), questions: prepared });
      setAtHome(false);
      window.scrollTo({ top: 0 });
    },
    [setSession],
  );

  const startWith = useCallback(
    (config: QuizConfig, questions: Question[]) => {
      const prepared = shuffle(questions);
      setSession({ stage: 'quiz', attempt: newAttempt(config, prepared), questions: prepared });
      setAtHome(false);
      window.scrollTo({ top: 0 });
    },
    [setSession],
  );

  const goHome = useCallback(() => {
    setAtHome(true);
    window.scrollTo({ top: 0 });
  }, []);

  if (inPythonLab) {
    return (
      <Shell>
        <Suspense
          fallback={
            <p className="px-4 py-20 text-center text-sm text-slate-500">Loading the editor…</p>
          }
        >
          <PythonLab
            onExit={() => {
              setInPythonLab(false);
              window.scrollTo({ top: 0 });
            }}
          />
        </Suspense>
      </Shell>
    );
  }

  if (atHome || !session) {
    const savedTrack = session ? getTrack(session.attempt.config.trackId) : undefined;
    const resumable = Boolean(session && session.stage === 'quiz');

    return (
      <Shell>
        <Home
          tracks={tracks}
          hasSavedAttempt={resumable}
          savedLabel={
            session && savedTrack
              ? `${savedTrack.shortName}, question ${session.attempt.current + 1} of ${session.questions.length}`
              : undefined
          }
          onResume={() => setAtHome(false)}
          onDiscard={() => clearSession()}
          onStart={start}
          onOpenPythonLab={() => {
            setInPythonLab(true);
            window.scrollTo({ top: 0 });
          }}
        />
      </Shell>
    );
  }

  const track = getTrack(session.attempt.config.trackId);
  if (!track) {
    clearSession();
    return null;
  }

  if (session.stage === 'results') {
    return (
      <Shell>
        <Results
          track={track}
          attempt={session.attempt}
          questions={session.questions}
          onRetryMissed={(missed) => startWith(session.attempt.config, missed)}
          onRestart={() => start(session.attempt.config)}
          onHome={() => {
            clearSession();
            setAtHome(true);
            window.scrollTo({ top: 0 });
          }}
        />
      </Shell>
    );
  }

  return (
    <Shell>
      <Quiz
        track={track}
        attempt={session.attempt}
        questions={session.questions}
        onChange={(attempt) => setSession({ ...session, attempt })}
        onFinish={() => {
          setSession({
            ...session,
            stage: 'results',
            attempt: { ...session.attempt, finishedAt: Date.now() },
          });
          window.scrollTo({ top: 0 });
        }}
        onExit={goHome}
      />
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <main className="flex-1">{children}</main>
      <footer className="border-t border-white/5 px-4 py-6 text-center text-xs text-slate-600">
        Open-source practice quiz · answers and explanations are study aids, not official
        certification material.
      </footer>
    </div>
  );
}
