import type { Question } from '../../types';

export const pipelineAutomationQuestions: Question[] = [
  {
    id: 'br-pip-001',
    topic: 'Pipeline Automation',
    difficulty: 'easy',
    question: 'What is a pipeline stage gate?',
    options: [
      'A condition that must be satisfied before the pipeline may progress to the next stage',
      'A queue for build agents',
      'A parallel execution block',
      'A cache boundary',
    ],
    answers: [0],
    explanation:
      'Gates can be automated (tests, scans, policy checks) or manual (approvals). Encoding them in the pipeline makes the release process explicit and repeatable.',
  },
  {
    id: 'br-pip-002',
    topic: 'Pipeline Automation',
    difficulty: 'medium',
    question: 'Why should CI pipelines be defined as reusable templates or shared libraries in a large organisation?',
    options: [
      'Common standards and security controls are applied consistently and can be improved centrally rather than copy-pasted per repo',
      'Templates execute faster',
      'It reduces the number of build agents needed',
      'It is required by most CI systems',
    ],
    answers: [0],
    explanation:
      'Shared, versioned pipeline templates are how platform teams roll out a new mandatory check across hundreds of repositories without hundreds of pull requests.',
  },
  {
    id: 'br-pip-003',
    topic: 'Pipeline Automation',
    difficulty: 'medium',
    question: 'What is the risk of referencing a third-party CI action or plugin by a mutable tag?',
    options: [
      'The tag can be repointed to malicious code that then runs with your pipeline\'s permissions and secrets',
      'It slows the pipeline',
      'The action may be rate limited',
      'Tags cannot be used in CI',
    ],
    answers: [0],
    explanation:
      'Pin third-party actions to a full commit SHA and review updates. A compromised action is a direct path to your build environment and credentials.',
  },
  {
    id: 'br-pip-004',
    topic: 'Pipeline Automation',
    difficulty: 'hard',
    question: 'Which practices limit the blast radius of a compromised CI job? (Select all that apply)',
    options: [
      'Scope credentials to the minimum permissions and shortest lifetime',
      'Run each job in an ephemeral, isolated environment',
      'Separate jobs that handle untrusted input from jobs holding deploy credentials',
      'Store all secrets in a single shared organisation-wide variable group for convenience',
    ],
    answers: [0, 1, 2],
    explanation:
      'A single shared secret store means one compromised pipeline exposes everything. Least privilege, isolation, and trust separation are the controls that matter.',
  },
  {
    id: 'br-pip-005',
    topic: 'Pipeline Automation',
    difficulty: 'medium',
    question: 'What is a self-hosted runner\'s main security consideration?',
    options: [
      'Persistent runners retain state between jobs, so a malicious job can poison the environment for later jobs and reach internal networks',
      'They cannot use secrets',
      'They only support Linux',
      'They cannot be autoscaled',
    ],
    answers: [0],
    explanation:
      'Use ephemeral, single-use runners — especially for public repositories — and place them in a network segment with restricted egress and no ambient cloud credentials.',
  },
  {
    id: 'br-pip-006',
    topic: 'Pipeline Automation',
    difficulty: 'medium',
    question: 'What does pipeline "fail fast" mean in practice?',
    options: [
      'Order stages so the cheapest, most likely-to-fail checks run first and abort the run immediately',
      'Reduce the timeout on all jobs',
      'Skip tests on the mainline',
      'Cancel jobs after the first warning',
    ],
    answers: [0],
    explanation:
      'Lint and unit tests in the first minute save both engineer waiting time and compute cost compared with discovering the same failure after a 30-minute integration suite.',
  },
  {
    id: 'br-pip-007',
    topic: 'Pipeline Automation',
    difficulty: 'medium',
    question: 'Why should long-running pipeline jobs have explicit timeouts?',
    options: [
      'A hung job otherwise occupies an agent indefinitely, blocking the queue and hiding the real failure',
      'Timeouts improve test coverage',
      'CI systems require them',
      'Timeouts reduce artifact size',
    ],
    answers: [0],
    explanation:
      'Timeouts convert an invisible hang into an actionable failure and protect shared capacity, which matters most when the whole team shares an agent pool.',
  },
  {
    id: 'br-pip-008',
    topic: 'Pipeline Automation',
    difficulty: 'hard',
    question: 'Which are valid reasons to keep deployment logic in the repository rather than in CI-server UI configuration? (Select all that apply)',
    options: [
      'Changes are reviewable, versioned, and revertible',
      'The logic can be tested and reused across branches',
      'Disaster recovery of the CI server does not lose the process',
      'UI configuration executes faster',
    ],
    answers: [0, 1, 2],
    explanation:
      'Click-configured pipelines are unreviewable, undiffable, and lost if the server is rebuilt. Execution speed is unaffected.',
  },
  {
    id: 'br-pip-009',
    topic: 'Pipeline Automation',
    difficulty: 'medium',
    question: 'What is the purpose of caching dependencies in CI, and what is the main correctness risk?',
    options: [
      'It avoids re-downloading between runs; the risk is a stale or poisoned cache producing wrong results, so keys must include a hash of the lock file',
      'It compresses artifacts; the risk is disk usage',
      'It parallelises jobs; the risk is race conditions',
      'It stores test results; the risk is data loss',
    ],
    answers: [0],
    explanation:
      'Cache keys derived from the lock file hash make cache reuse safe and automatically invalidated when dependencies change.',
  },
  {
    id: 'br-pip-010',
    topic: 'Pipeline Automation',
    difficulty: 'medium',
    question: 'What is the difference between a pipeline trigger on push versus on pull request?',
    options: [
      'A push trigger validates the branch state as committed; a PR trigger typically validates the merge result against the target branch',
      'PR triggers cannot access secrets under any configuration',
      'Push triggers only run on the default branch',
      'They are identical',
    ],
    answers: [0],
    explanation:
      'Understanding which commit is actually being tested (the head commit or a merge commit) matters when interpreting results and configuring required checks.',
  },
  {
    id: 'br-pip-011',
    topic: 'Pipeline Automation',
    difficulty: 'hard',
    question: 'What is the "confused deputy" risk in a pipeline that deploys on behalf of many teams?',
    options: [
      'The shared pipeline identity has union-of-all permissions, so any team that can influence it can act on another team\'s resources',
      'The pipeline cannot distinguish branches',
      'Deployments become slower',
      'Logs become too large',
    ],
    answers: [0],
    explanation:
      'Give each team\'s deployment its own scoped identity, and derive that identity from verified attributes (repository, environment) rather than a shared super-role.',
  },
  {
    id: 'br-pip-012',
    topic: 'Pipeline Automation',
    difficulty: 'medium',
    question: 'Why is masking secrets in CI logs necessary but not sufficient?',
    options: [
      'Masking only matches exact known values; transformed, encoded, or partially printed secrets still leak',
      'Masking slows down log ingestion',
      'Masking corrupts log formatting',
      'Masking is sufficient on its own',
    ],
    answers: [0],
    explanation:
      'Base64-encoded, JSON-escaped, or substring-printed secrets bypass masking. Minimise secret exposure in the first place and prefer short-lived credentials.',
  },
  {
    id: 'br-pip-013',
    topic: 'Pipeline Automation',
    difficulty: 'medium',
    question: 'What does an environment protection rule typically enforce?',
    options: [
      'Required reviewers, wait timers, and branch restrictions before a job may deploy to that environment',
      'The compute size of the runner',
      'The retention period of artifacts',
      'Which tests must exist',
    ],
    answers: [0],
    explanation:
      'Environment-scoped protection is where deployment credentials and approvals belong, keeping production access out of ordinary build jobs.',
  },
  {
    id: 'br-pip-014',
    topic: 'Pipeline Automation',
    difficulty: 'hard',
    question: 'A pipeline intermittently fails when several jobs deploy to the same environment simultaneously. What is the fix?',
    options: [
      'Serialise deployments to that environment using a concurrency group or lock',
      'Increase the job timeout',
      'Add more runners',
      'Disable the failing job',
    ],
    answers: [0],
    explanation:
      'Concurrency controls (with cancel-in-progress where appropriate) make the environment a mutually exclusive resource, preventing interleaved and out-of-order deployments.',
  },
  {
    id: 'br-pip-015',
    topic: 'Pipeline Automation',
    difficulty: 'medium',
    question: 'Which metrics best indicate CI/CD platform health for a build engineering team? (Select all that apply)',
    options: [
      'Pipeline duration percentiles (p50/p95)',
      'Mainline build success rate and time-to-green after a break',
      'Queue wait time for agents',
      'Total number of pipeline definitions',
    ],
    answers: [0, 1, 2],
    explanation:
      'Duration, reliability, and queueing directly affect developer throughput. Counting pipeline definitions measures inventory, not health.',
  },
  {
    id: 'br-pip-016',
    topic: 'Pipeline Automation',
    difficulty: 'medium',
    question: 'What is the purpose of a nightly or scheduled full build when PRs run a reduced set of checks?',
    options: [
      'To run the expensive full matrix, long-running tests, and drift checks that are impractical on every commit',
      'To warm the build cache only',
      'To rotate credentials',
      'To reduce agent idle time',
    ],
    answers: [0],
    explanation:
      'This gives fast PR feedback without losing coverage, provided the nightly failures are triaged with the same urgency as mainline breaks.',
  },
  {
    id: 'br-pip-017',
    topic: 'Pipeline Automation',
    difficulty: 'hard',
    question: 'Why is it problematic for a pipeline to `git push` back to the branch it was triggered from?',
    options: [
      'It can create infinite trigger loops and races with concurrent developer pushes',
      'CI systems forbid write access',
      'It corrupts the commit graph',
      'It invalidates the build cache',
    ],
    answers: [0],
    explanation:
      'If automation must commit (version bumps, generated files), use a `[skip ci]` convention or a dedicated bot with loop-prevention, and prefer generating artifacts over committing them.',
  },
  {
    id: 'br-pip-018',
    topic: 'Pipeline Automation',
    difficulty: 'medium',
    question: 'What does "infrastructure for CI as cattle, not pets" imply?',
    options: [
      'Build agents are disposable, reproducibly provisioned from code, and replaced rather than repaired',
      'Agents are manually tuned by specialists',
      'Agents run only containers',
      'Agents are shared between teams',
    ],
    answers: [0],
    explanation:
      'Hand-maintained build servers accumulate undocumented state that silently becomes a build dependency — the root of many unreproducible builds.',
  },
  {
    id: 'br-pip-019',
    topic: 'Pipeline Automation',
    difficulty: 'medium',
    question: 'Why should a build engineering team track and publish the mainline build status prominently?',
    options: [
      'A broken mainline blocks everyone, so visibility creates shared urgency to restore it quickly',
      'It is required for compliance',
      'It improves test coverage',
      'It reduces the number of builds',
    ],
    answers: [0],
    explanation:
      '"Stop the line" culture — where fixing the mainline outranks new work — is what keeps trunk continuously releasable.',
  },
  {
    id: 'br-pip-020',
    topic: 'Pipeline Automation',
    difficulty: 'hard',
    question: 'Which approaches make pipeline changes themselves safe to roll out? (Select all that apply)',
    options: [
      'Version shared pipeline templates and let consumers pin a version',
      'Test template changes against a canary set of repositories first',
      'Provide a deprecation window before removing template behaviour',
      'Update all repositories immediately with no version pinning',
    ],
    answers: [0, 1, 2],
    explanation:
      'Pipeline templates are production software for the whole engineering organisation and deserve versioning, canarying, and deprecation policy.',
  },
  {
    id: 'br-pip-021',
    topic: 'Pipeline Automation',
    difficulty: 'medium',
    question: 'What is the benefit of generating pipeline configuration dynamically for a monorepo?',
    options: [
      'The set of jobs can be derived from which projects actually changed, avoiding a hand-maintained combinatorial config',
      'Dynamic configuration runs on faster agents',
      'It removes the need for caching',
      'It guarantees hermetic builds',
    ],
    answers: [0],
    explanation:
      'Many CI systems support a setup job that emits the child pipeline definition, letting the build graph decide the workload.',
  },
  {
    id: 'br-pip-022',
    topic: 'Pipeline Automation',
    difficulty: 'medium',
    question: 'What should happen to a pipeline when a required security scan finds a critical, exploitable vulnerability in a release candidate?',
    options: [
      'The promotion is blocked and the finding is triaged; exceptions require explicit, time-bound, recorded approval',
      'A warning is logged and the release proceeds',
      'The scan is disabled to unblock the release',
      'The pipeline retries the scan until it passes',
    ],
    answers: [0],
    explanation:
      'Gates only work if failing them is meaningful. A documented, expiring exception process handles genuine emergencies without normalising bypass.',
  },
  {
    id: 'br-pip-023',
    topic: 'Pipeline Automation',
    difficulty: 'hard',
    question: 'Why is retry-on-failure a dangerous default for deployment steps specifically?',
    options: [
      'A non-idempotent deployment step can apply a partial change twice, producing inconsistent state',
      'Retries always exceed the job timeout',
      'Deployment APIs do not support retries',
      'Retries invalidate the artifact signature',
    ],
    answers: [0],
    explanation:
      'Retries are safe only for idempotent operations. For anything with side effects, use a resumable, state-aware deployment mechanism instead.',
  },
  {
    id: 'br-pip-024',
    topic: 'Pipeline Automation',
    difficulty: 'medium',
    question: 'What is the value of "pipeline as a product" thinking for a build/release team?',
    options: [
      'Treating internal developers as customers, with SLOs, documentation, support, and roadmap for the delivery platform',
      'Charging teams for build minutes',
      'Selling the pipeline externally',
      'Outsourcing CI maintenance',
    ],
    answers: [0],
    explanation:
      'Platform teams that measure developer experience and set reliability targets for the pipeline get far better adoption than those that impose tooling.',
  },
  {
    id: 'br-pip-025',
    topic: 'Pipeline Automation',
    difficulty: 'medium',
    question: 'Why should the pipeline, not a person, perform the version bump and tag for a release?',
    options: [
      'It eliminates manual error and guarantees the tag, artifact, and changelog are consistent with what was actually built',
      'Humans cannot create tags in protected repositories',
      'Tags created by CI are cryptographically stronger',
      'It reduces repository size',
    ],
    answers: [0],
    explanation:
      'Automating the release ceremony removes the most common source of release defects: inconsistent manual steps performed under time pressure.',
  },
];
