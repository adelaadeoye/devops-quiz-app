import type { Question } from '../../types';

export const cicdQuestions: Question[] = [
  {
    id: 'do-cicd-001',
    topic: 'CI/CD',
    difficulty: 'easy',
    question: 'What is the primary goal of continuous integration?',
    options: [
      'To deploy every commit straight to production',
      'To merge developer changes into a shared mainline frequently and verify them with an automated build and test run',
      'To replace code review with automated linting',
      'To keep long-lived feature branches isolated until a release date',
    ],
    answers: [1],
    explanation:
      'CI is about integrating work into the mainline often (at least daily) and proving each integration with an automated build and test suite, so integration defects surface within minutes instead of at release time.',
  },
  {
    id: 'do-cicd-002',
    topic: 'CI/CD',
    difficulty: 'easy',
    question: 'What distinguishes continuous delivery from continuous deployment?',
    options: [
      'Continuous delivery keeps every change releasable but requires a manual approval to ship; continuous deployment ships automatically',
      'Continuous delivery only runs unit tests; continuous deployment runs integration tests',
      'Continuous delivery applies to libraries; continuous deployment applies to services',
      'They are two names for the same practice',
    ],
    answers: [0],
    explanation:
      'Both keep the mainline in a deployable state. Continuous delivery stops at a human gate before production; continuous deployment removes that gate so every green build reaches production.',
  },
  {
    id: 'do-cicd-003',
    topic: 'CI/CD',
    difficulty: 'medium',
    question: 'Which practices reduce the risk of flaky tests destabilising a pipeline? (Select all that apply)',
    options: [
      'Quarantine known-flaky tests into a separate non-blocking suite while they are fixed',
      'Remove all shared mutable state and time dependencies from tests',
      'Automatically retry the whole pipeline until it passes and ignore the failures',
      'Track flake rate per test so the worst offenders can be prioritised',
    ],
    answers: [0, 1, 3],
    explanation:
      'Quarantining, removing nondeterminism, and measuring flake rates all help. Blind retries hide real defects and erode trust in the pipeline signal.',
  },
  {
    id: 'do-cicd-004',
    topic: 'CI/CD',
    difficulty: 'medium',
    question: 'In a deployment pipeline, what is the purpose of a "fan-in" stage?',
    options: [
      'To run the same job on many agents in parallel',
      'To collect the outputs of several parallel jobs and gate on all of them succeeding before continuing',
      'To duplicate artifacts into multiple registries',
      'To split a monolithic test suite into shards',
    ],
    answers: [1],
    explanation:
      'Fan-out splits work across parallel jobs; fan-in joins them back, waiting on all results so a single downstream stage sees one aggregated pass/fail signal.',
  },
  {
    id: 'do-cicd-005',
    topic: 'CI/CD',
    difficulty: 'medium',
    question: 'Why should a CI pipeline build an artifact once and promote the same artifact through environments?',
    options: [
      'It reduces storage costs in the artifact registry',
      'It guarantees that what was tested is bit-for-bit what is released, eliminating rebuild drift',
      'It is required by SemVer',
      'It allows environment-specific source code branches',
    ],
    answers: [1],
    explanation:
      'The build-once/promote-many rule means environment differences come only from configuration, not from a re-compilation that might pick up different dependencies, compilers, or source state.',
  },
  {
    id: 'do-cicd-006',
    topic: 'CI/CD',
    difficulty: 'easy',
    question: 'What is a "pipeline as code" approach?',
    options: [
      'Storing the CI/CD definition in the application repository under version control',
      'Writing the CI server itself in the same language as the application',
      'Generating code automatically from a pipeline UI',
      'Using shell scripts instead of a CI tool',
    ],
    answers: [0],
    explanation:
      'Pipeline as code keeps the workflow definition (e.g. a YAML or Groovy file) beside the source so it is reviewed, versioned, and branched along with the code it builds.',
  },
  {
    id: 'do-cicd-007',
    topic: 'CI/CD',
    difficulty: 'hard',
    question: 'A monorepo pipeline takes 90 minutes because every commit rebuilds everything. Which techniques directly address this? (Select all that apply)',
    options: [
      'Affected-target detection so only changed projects and their dependents build',
      'Remote build caching keyed by input hashes',
      'Increasing the CI agent disk size',
      'Test sharding across parallel agents',
    ],
    answers: [0, 1, 3],
    explanation:
      'Change-based target selection, content-addressed remote caches, and parallel sharding all cut wall-clock time. Larger disks do not reduce the amount of work performed.',
  },
  {
    id: 'do-cicd-008',
    topic: 'CI/CD',
    difficulty: 'medium',
    question: 'What is trunk-based development?',
    options: [
      'Developers integrate small changes into a single main branch at least daily, using short-lived branches or none at all',
      'Each team owns a permanent long-lived branch merged quarterly',
      'A branching model where release branches never merge back',
      'A model that forbids code review',
    ],
    answers: [0],
    explanation:
      'Trunk-based development minimises branch lifetime so merge conflicts and integration risk stay small; incomplete work is hidden behind feature flags rather than in branches.',
  },
  {
    id: 'do-cicd-009',
    topic: 'CI/CD',
    difficulty: 'medium',
    question: 'Which of these are the four DORA metrics?',
    options: [
      'Deployment frequency, lead time for changes, change failure rate, and time to restore service',
      'Uptime, latency, throughput, and saturation',
      'Cost, coverage, complexity, and churn',
      'Build time, test count, defect count, and story points',
    ],
    answers: [0],
    explanation:
      'DORA measures throughput (deployment frequency, lead time for changes) and stability (change failure rate, failed-deployment recovery time / time to restore service).',
  },
  {
    id: 'do-cicd-010',
    topic: 'CI/CD',
    difficulty: 'medium',
    question: 'What problem does a feature flag solve in a CI/CD context?',
    options: [
      'It lets unfinished or risky code be merged and deployed while remaining inactive, decoupling deploy from release',
      'It compresses build artifacts',
      'It automatically rolls back failed deployments',
      'It replaces the need for integration tests',
    ],
    answers: [0],
    explanation:
      'Feature flags separate deployment (shipping the binary) from release (exposing behaviour), enabling trunk-based development, dark launches, and instant kill switches.',
  },
  {
    id: 'do-cicd-011',
    topic: 'CI/CD',
    difficulty: 'hard',
    question: 'Why is it risky for a CI job triggered by a fork pull request to have access to repository secrets?',
    options: [
      'Secrets increase job start-up time',
      'Untrusted contributors can modify the workflow or build scripts to exfiltrate the secrets',
      'Secrets cannot be encrypted at rest in CI systems',
      'Forks cannot read secrets under any configuration, so the question is moot',
    ],
    answers: [1],
    explanation:
      'A pull request from a fork carries attacker-controlled code. If the workflow runs that code with secrets in the environment, the attacker can print or ship them elsewhere. Fork PRs should run in a restricted, secretless context.',
  },
  {
    id: 'do-cicd-012',
    topic: 'CI/CD',
    difficulty: 'easy',
    question: 'What is a "smoke test" in a deployment pipeline?',
    options: [
      'A load test that pushes the system to failure',
      'A small, fast set of checks run right after deployment to confirm the system is fundamentally working',
      'A static analysis pass over the source',
      'A test that intentionally introduces faults',
    ],
    answers: [1],
    explanation:
      'Smoke tests answer "is it alive and serving?" within seconds — health endpoints, a login, one core transaction — so a broken deploy is caught before traffic is fully shifted.',
  },
  {
    id: 'do-cicd-013',
    topic: 'CI/CD',
    difficulty: 'medium',
    question: 'Which statements about ephemeral CI build agents are true? (Select all that apply)',
    options: [
      'They reduce state leakage between builds',
      'They make builds more reproducible by starting from a known image',
      'They eliminate the need for dependency caching',
      'They limit the blast radius if a build is compromised',
    ],
    answers: [0, 1, 3],
    explanation:
      'Fresh agents per build avoid contaminated workspaces and contain compromise. They usually make caching more important, not less, because nothing survives locally between runs.',
  },
  {
    id: 'do-cicd-014',
    topic: 'CI/CD',
    difficulty: 'medium',
    question: 'What is the main advantage of OIDC-based workload identity federation over long-lived cloud access keys in CI?',
    options: [
      'It is faster to authenticate',
      'The CI job exchanges a short-lived, scoped identity token for temporary credentials, so no static secret needs to be stored',
      'It removes the need for IAM policies',
      'It encrypts build logs automatically',
    ],
    answers: [1],
    explanation:
      'With OIDC federation the CI provider signs a token describing the repo/branch/workflow; the cloud trusts that issuer and returns short-lived credentials. There is no long-lived key to leak or rotate.',
  },
  {
    id: 'do-cicd-015',
    topic: 'CI/CD',
    difficulty: 'hard',
    question: 'A pipeline passes in CI but the same commit fails when built on a developer laptop. Which causes are most likely? (Select all that apply)',
    options: [
      'Undeclared dependency on a tool version present only on the CI image',
      'Environment variables set in CI but absent locally',
      'Case-sensitivity differences between the CI filesystem and the laptop filesystem',
      'The CI provider randomly reorders source files',
    ],
    answers: [0, 1, 2],
    explanation:
      'Hidden toolchain versions, implicit env vars, and case-insensitive macOS/Windows filesystems versus case-sensitive Linux are classic "works in CI only" causes. CI does not reorder your sources.',
  },
  {
    id: 'do-cicd-016',
    topic: 'CI/CD',
    difficulty: 'medium',
    question: 'In a canary deployment, what determines whether the rollout proceeds?',
    options: [
      'A fixed timer only',
      'Comparison of health and business metrics between the canary and the baseline population',
      'The number of pods that started successfully',
      'Whether the container image scan passed',
    ],
    answers: [1],
    explanation:
      'A canary sends a small slice of traffic to the new version and compares error rate, latency, and key business signals against the stable baseline before widening or aborting the rollout.',
  },
  {
    id: 'do-cicd-017',
    topic: 'CI/CD',
    difficulty: 'medium',
    question: 'What is the key operational trade-off of blue/green deployment?',
    options: [
      'It requires running two full production environments, roughly doubling capacity cost during the switch',
      'It cannot be rolled back',
      'It only works for stateless HTTP services',
      'It requires downtime during the cutover',
    ],
    answers: [0],
    explanation:
      'Blue/green gives near-instant cutover and rollback by keeping the old environment warm, but you pay for two environments simultaneously and must handle shared state such as databases carefully.',
  },
  {
    id: 'do-cicd-018',
    topic: 'CI/CD',
    difficulty: 'easy',
    question: 'What does "shift left" mean in a DevOps pipeline?',
    options: [
      'Moving quality, security, and testing activities earlier in the delivery lifecycle',
      'Moving workloads to a left-hand data centre region',
      'Reordering pipeline stages alphabetically',
      'Delegating testing to the operations team',
    ],
    answers: [0],
    explanation:
      'Shifting left puts feedback — linting, unit tests, SAST, dependency scanning, policy checks — as close to the developer as possible, where defects are cheapest to fix.',
  },
  {
    id: 'do-cicd-019',
    topic: 'CI/CD',
    difficulty: 'hard',
    question: 'Which controls best enforce that only reviewed code reaches production? (Select all that apply)',
    options: [
      'Protected branches requiring approving reviews and passing status checks',
      'Signed commits or signed tags verified by the pipeline',
      'Deployment jobs that only trigger from the protected branch, never from arbitrary refs',
      'A nightly job that emails a diff report to the team',
    ],
    answers: [0, 1, 2],
    explanation:
      'Branch protection, provenance via signatures, and restricting deploy triggers to the protected ref are enforcement mechanisms. An informational email is detective, not preventive.',
  },
  {
    id: 'do-cicd-020',
    topic: 'CI/CD',
    difficulty: 'medium',
    question: 'What is the purpose of a "quality gate" in a pipeline?',
    options: [
      'To block promotion when measurable criteria (coverage, vulnerabilities, performance budget) are not met',
      'To document the release notes',
      'To rate-limit deployments',
      'To assign code reviewers automatically',
    ],
    answers: [0],
    explanation:
      'A quality gate encodes an objective threshold so the pipeline, not a person, prevents regressions from being promoted.',
  },
  {
    id: 'do-cicd-021',
    topic: 'CI/CD',
    difficulty: 'medium',
    question: 'Why is a pipeline that deploys directly from a developer workstation considered an anti-pattern?',
    options: [
      'It is slower than CI',
      'The deployment is unauditable, unreproducible, and depends on one machine\'s unversioned state and credentials',
      'Workstations cannot reach production networks',
      'It violates SemVer',
    ],
    answers: [1],
    explanation:
      'Workstation deploys leave no audit trail, cannot be reproduced by anyone else, and require production credentials on a general-purpose machine — all significant governance and security problems.',
  },
  {
    id: 'do-cicd-022',
    topic: 'CI/CD',
    difficulty: 'hard',
    question: 'In GitOps, what is the reconciliation loop responsible for?',
    options: [
      'Pushing changes from CI to the cluster via kubectl',
      'Continuously comparing the cluster\'s live state to the declared state in Git and correcting drift',
      'Merging pull requests automatically',
      'Rebuilding images when base images change',
    ],
    answers: [1],
    explanation:
      'A GitOps agent (Argo CD, Flux) pulls the desired state from Git and continually converges the cluster toward it, so manual changes are detected as drift and reverted or reported.',
  },
  {
    id: 'do-cicd-023',
    topic: 'CI/CD',
    difficulty: 'medium',
    question: 'Which of the following make a CI pipeline\'s failure signal more actionable? (Select all that apply)',
    options: [
      'Failing fast on the cheapest checks before running long ones',
      'Publishing structured test reports and artifacts on failure',
      'Combining all steps into one shell script so there is a single log',
      'Annotating failures on the exact changed lines in the pull request',
    ],
    answers: [0, 1, 3],
    explanation:
      'Fast-failing cheap checks, machine-readable reports, and inline PR annotations shorten the feedback loop. One giant opaque script makes diagnosis harder.',
  },
  {
    id: 'do-cicd-024',
    topic: 'CI/CD',
    difficulty: 'easy',
    question: 'What is an "artifact" in CI/CD terminology?',
    options: [
      'Any leftover temporary file on the build agent',
      'A versioned, immutable output of a build — such as a container image, JAR, or wheel — that later stages consume',
      'A log line emitted by the build tool',
      'The commit SHA of the build',
    ],
    answers: [1],
    explanation:
      'Artifacts are the deliverables the pipeline produces and promotes. They should be immutable and uniquely versioned so they can be traced back to the exact source commit.',
  },
  {
    id: 'do-cicd-025',
    topic: 'CI/CD',
    difficulty: 'hard',
    question: 'A team wants zero-downtime database schema changes alongside rolling deploys. Which approach fits?',
    options: [
      'Deploy the schema change and application change in the same atomic step',
      'Use expand/contract: add backward-compatible schema first, deploy code that works with both shapes, then remove the old shape in a later release',
      'Take a maintenance window for every migration',
      'Have the application create tables lazily at runtime',
    ],
    answers: [1],
    explanation:
      'The expand/contract (parallel change) pattern keeps old and new code compatible with the same schema at every point in the rollout, which is essential when two versions run simultaneously.',
  },
  {
    id: 'do-cicd-026',
    topic: 'CI/CD',
    difficulty: 'medium',
    question: 'What does "idempotent deployment" mean?',
    options: [
      'Running the same deployment repeatedly converges to the same end state without additional side effects',
      'The deployment can be rolled back',
      'The deployment never touches the database',
      'Each deployment creates a new environment',
    ],
    answers: [0],
    explanation:
      'Idempotency lets you safely retry a partially failed deploy: re-applying the same declarative desired state produces the same result rather than compounding changes.',
  },
];
