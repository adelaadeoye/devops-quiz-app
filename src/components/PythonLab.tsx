import { useCallback, useState } from 'react';
import { challenges, getChallenge } from '../data/python';
import { useLocalStorage } from '../lib/useLocalStorage';
import ChallengeList from './ChallengeList';
import ChallengeWorkspace from './ChallengeWorkspace';

const DRAFTS_KEY = 'devops-quiz-app:python-drafts:v1';
const SOLVED_KEY = 'devops-quiz-app:python-solved:v1';

export default function PythonLab({ onExit }: { onExit: () => void }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [drafts, setDrafts] = useLocalStorage<Record<string, string>>(DRAFTS_KEY, {});
  const [solved, setSolved] = useLocalStorage<Record<string, boolean>>(SOLVED_KEY, {});

  const markSolved = useCallback(
    (id: string) => setSolved((current) => (current[id] ? current : { ...current, [id]: true })),
    [setSolved],
  );

  const markUnsolved = useCallback(
    (id: string) =>
      setSolved((current) => {
        if (!current[id]) return current;
        const next = { ...current };
        delete next[id];
        return next;
      }),
    [setSolved],
  );

  const challenge = openId ? getChallenge(openId) : undefined;

  if (!challenge) {
    return (
      <ChallengeList
        challenges={challenges}
        solved={solved}
        onOpen={(id) => {
          setOpenId(id);
          window.scrollTo({ top: 0 });
        }}
        onBack={onExit}
        onResetProgress={() => setSolved({})}
      />
    );
  }

  const index = challenges.findIndex((c) => c.id === challenge.id);
  const go = (target: number) => {
    setOpenId(challenges[target].id);
    window.scrollTo({ top: 0 });
  };

  return (
    <ChallengeWorkspace
      challenge={challenge}
      index={index}
      total={challenges.length}
      code={drafts[challenge.id] ?? challenge.starter}
      onCodeChange={(code) => setDrafts((current) => ({ ...current, [challenge.id]: code }))}
      solved={Boolean(solved[challenge.id])}
      onSolved={() => markSolved(challenge.id)}
      onUnsolved={() => markUnsolved(challenge.id)}
      onBack={() => setOpenId(null)}
      onPrev={index > 0 ? () => go(index - 1) : undefined}
      onNext={index < challenges.length - 1 ? () => go(index + 1) : undefined}
    />
  );
}
