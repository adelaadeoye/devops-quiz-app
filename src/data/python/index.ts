import type { Challenge, ChallengeTopic } from '../../types';
import { listChallenges } from './lists';
import { dictChallenges } from './dicts';
import { setChallenges } from './sets';
import { tupleChallenges } from './tuples';
import { stringChallenges } from './strings';
import { collectionsChallenges } from './collections';

export const challenges: Challenge[] = [
  ...listChallenges,
  ...dictChallenges,
  ...setChallenges,
  ...tupleChallenges,
  ...stringChallenges,
  ...collectionsChallenges,
];

export const challengeTopics: { id: ChallengeTopic; label: string; blurb: string }[] = [
  { id: 'list', label: 'list', blurb: 'Slicing, sorting, comprehensions, aliasing and mutation.' },
  { id: 'dict', label: 'dict', blurb: 'Grouping, counting, merging, nesting and sorting by value.' },
  { id: 'set', label: 'set', blurb: 'Deduplication, membership, set algebra and frozenset.' },
  { id: 'tuple', label: 'tuple', blurb: 'Unpacking, immutability and namedtuple.' },
  { id: 'str', label: 'str', blurb: 'Parsing, splitting, joining and formatting.' },
  {
    id: 'collections',
    label: 'collections & itertools',
    blurb: 'Counter, defaultdict, deque, groupby and friends.',
  },
];

export function getChallenge(id: string): Challenge | undefined {
  return challenges.find((challenge) => challenge.id === id);
}

export function countByTopic(topic: ChallengeTopic): number {
  return challenges.filter((challenge) => challenge.topic === topic).length;
}
