import type { Question, Track } from '../types';
import { cicdQuestions } from './devops/cicd';
import { containerQuestions } from './devops/containers';
import { kubernetesQuestions } from './devops/kubernetes';
import { iacQuestions } from './devops/iac';
import { cloudNetworkingQuestions } from './devops/cloud';
import { observabilityQuestions } from './devops/observability';
import { linuxQuestions } from './devops/linux';
import { buildSystemQuestions } from './buildRelease/buildSystems';
import { versionControlQuestions } from './buildRelease/versionControl';
import { artifactQuestions } from './buildRelease/artifacts';
import { releaseManagementQuestions } from './buildRelease/releaseManagement';
import { pipelineAutomationQuestions } from './buildRelease/pipelineAutomation';
import { supplyChainQuestions } from './buildRelease/supplyChain';

const devopsQuestions: Question[] = [
  ...cicdQuestions,
  ...containerQuestions,
  ...kubernetesQuestions,
  ...iacQuestions,
  ...cloudNetworkingQuestions,
  ...observabilityQuestions,
  ...linuxQuestions,
];

const buildReleaseQuestions: Question[] = [
  ...buildSystemQuestions,
  ...versionControlQuestions,
  ...artifactQuestions,
  ...releaseManagementQuestions,
  ...pipelineAutomationQuestions,
  ...supplyChainQuestions,
];

export const tracks: Track[] = [
  {
    id: 'devops',
    name: 'DevOps Engineer',
    shortName: 'DevOps',
    tagline: 'CI/CD, containers, Kubernetes, IaC, cloud networking, observability and Linux.',
    accent: 'sky',
    questions: devopsQuestions,
  },
  {
    id: 'build-release',
    name: 'Build & Release Engineer',
    shortName: 'Build & Release',
    tagline:
      'Build systems, branching strategy, artifacts and dependencies, release management, pipeline automation and supply chain security.',
    accent: 'violet',
    questions: buildReleaseQuestions,
  },
];

export function getTrack(id: string): Track | undefined {
  return tracks.find((track) => track.id === id);
}

export function topicsOf(track: Track): string[] {
  return [...new Set(track.questions.map((question) => question.topic))];
}

export function questionById(track: Track, id: string): Question | undefined {
  return track.questions.find((question) => question.id === id);
}
