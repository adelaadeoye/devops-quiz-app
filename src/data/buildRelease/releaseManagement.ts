import type { Question } from '../../types';

export const releaseManagementQuestions: Question[] = [
  {
    id: 'br-rel-001',
    topic: 'Release Management',
    difficulty: 'easy',
    question: 'What is a release candidate (RC)?',
    options: [
      'A build believed to be ready for release, published for final validation and promoted unchanged if it passes',
      'The first build of a sprint',
      'A branch used for hotfixes',
      'A build with debug symbols enabled',
    ],
    answers: [0],
    explanation:
      'The key property is that the RC bits are the release bits. If a fix is needed, a new RC is cut and revalidated rather than patching the existing one.',
  },
  {
    id: 'br-rel-002',
    topic: 'Release Management',
    difficulty: 'medium',
    question: 'What is a code freeze and what is its main drawback?',
    options: [
      'A period where only critical fixes are merged; it batches change, increasing the size and risk of the eventual release',
      'A period where the repository is read-only for everyone permanently',
      'A technique for locking dependency versions',
      'A build cache invalidation strategy',
    ],
    answers: [0],
    explanation:
      'Freezes trade continuous small risk for a large one-off risk. Mature teams replace them with feature flags, progressive delivery, and always-releasable trunk.',
  },
  {
    id: 'br-rel-003',
    topic: 'Release Management',
    difficulty: 'medium',
    question: 'What distinguishes a "deployment" from a "release"?',
    options: [
      'Deployment puts code into an environment; release exposes the functionality to users',
      'They are synonyms',
      'Release happens before deployment',
      'Deployment applies only to infrastructure',
    ],
    answers: [0],
    explanation:
      'Separating them with feature flags lets you deploy frequently and safely while controlling user-facing exposure independently.',
  },
  {
    id: 'br-rel-004',
    topic: 'Release Management',
    difficulty: 'medium',
    question: 'What is a dark launch?',
    options: [
      'Deploying and exercising new code paths in production without exposing results to users, to validate behaviour and load',
      'Deploying during off-hours',
      'A deployment without logging',
      'Releasing to a private beta group',
    ],
    answers: [0],
    explanation:
      'Dark launches (including shadow traffic mirroring) reveal performance and correctness problems under real production load with zero user impact.',
  },
  {
    id: 'br-rel-005',
    topic: 'Release Management',
    difficulty: 'hard',
    question: 'Which conditions must hold for a rolling deployment to be safe? (Select all that apply)',
    options: [
      'Old and new versions can run simultaneously against the same data and APIs',
      'The application drains in-flight requests on SIGTERM',
      'Sufficient capacity exists to serve traffic while instances cycle',
      'The database schema change is applied atomically with the code',
    ],
    answers: [0, 1, 2],
    explanation:
      'Backward/forward compatibility, graceful shutdown, and headroom are prerequisites. Coupling a breaking schema change to the code deploy is precisely what breaks rolling updates.',
  },
  {
    id: 'br-rel-006',
    topic: 'Release Management',
    difficulty: 'medium',
    question: 'What is the rollback advantage of blue/green over rolling deployment?',
    options: [
      'Rollback is an instant traffic switch back to the untouched previous environment',
      'Blue/green needs no health checks',
      'Blue/green uses less capacity',
      'Blue/green avoids database migrations',
    ],
    answers: [0],
    explanation:
      'Because the old environment is still running and unmodified, recovery time is a router change rather than a redeploy cycle.',
  },
  {
    id: 'br-rel-007',
    topic: 'Release Management',
    difficulty: 'medium',
    question: 'What does a progressive delivery controller (Argo Rollouts, Flagger) automate?',
    options: [
      'Stepwise traffic shifting with automated metric analysis and automatic rollback when the analysis fails',
      'Building container images',
      'Provisioning clusters',
      'Managing feature flag values',
    ],
    answers: [0],
    explanation:
      'Encoding the canary analysis in the controller replaces an engineer watching dashboards with a deterministic, repeatable promotion policy.',
  },
  {
    id: 'br-rel-008',
    topic: 'Release Management',
    difficulty: 'hard',
    question: 'Why is "roll forward" sometimes preferred over rollback?',
    options: [
      'When a database migration or irreversible side effect has occurred, going back may be impossible or more dangerous than shipping a fix',
      'Rollbacks are always slower',
      'Roll forward requires no testing',
      'Rollback is not supported by container orchestrators',
    ],
    answers: [0],
    explanation:
      'This is why teams invest in fast pipelines: if you can ship a verified fix in minutes, roll-forward becomes a viable primary strategy alongside rollback.',
  },
  {
    id: 'br-rel-009',
    topic: 'Release Management',
    difficulty: 'medium',
    question: 'What belongs in a release checklist or runbook? (Select all that apply)',
    options: [
      'Pre-deployment verification steps and required approvals',
      'Explicit rollback procedure and its trigger conditions',
      'Communication plan and owner for the release window',
      'The individual to blame if it fails',
    ],
    answers: [0, 1, 2],
    explanation:
      'A useful runbook is about verification, reversibility, and communication. Naming a scapegoat in advance suppresses honest reporting.',
  },
  {
    id: 'br-rel-010',
    topic: 'Release Management',
    difficulty: 'medium',
    question: 'Why do change advisory boards often correlate with worse delivery performance in DORA research?',
    options: [
      'Heavyweight external approval adds latency without reliably catching defects, encouraging larger, riskier batches',
      'They require additional tooling licences',
      'They prevent the use of feature flags',
      'They mandate manual testing',
    ],
    answers: [0],
    explanation:
      'Peer review plus automated verification close to the change consistently outperforms distant approval boards on both speed and stability.',
  },
  {
    id: 'br-rel-011',
    topic: 'Release Management',
    difficulty: 'hard',
    question: 'A release needs a breaking API change consumed by clients you do not control. What is the right approach?',
    options: [
      'Version the API, run old and new in parallel, publish a deprecation timeline, and retire the old version once usage drops',
      'Ship the breaking change and notify clients afterwards',
      'Silently translate old requests with best-effort guesses',
      'Freeze the API permanently',
    ],
    answers: [0],
    explanation:
      'Parallel versions plus measured deprecation give consumers a migration window, and usage telemetry tells you when retirement is actually safe.',
  },
  {
    id: 'br-rel-012',
    topic: 'Release Management',
    difficulty: 'medium',
    question: 'What is the purpose of a staging environment that mirrors production?',
    options: [
      'To validate the release under production-like configuration, data shape, and integrations before real user exposure',
      'To give developers a place to test locally',
      'To store backups',
      'To run load tests only',
    ],
    answers: [0],
    explanation:
      'Staging value is proportional to its fidelity. A staging environment that differs materially from production produces false confidence, which is why canaries in production complement it.',
  },
  {
    id: 'br-rel-013',
    topic: 'Release Management',
    difficulty: 'medium',
    question: 'What are release notes for, from an engineering operations perspective?',
    options: [
      'Communicating what changed so operators, support, and users can correlate behaviour changes with the release',
      'Marketing only',
      'Legal compliance only',
      'Recording who approved the release',
    ],
    answers: [0],
    explanation:
      'During an incident, "what changed and when?" is the highest-value question. Automatically generated, commit-linked release notes answer it immediately.',
  },
  {
    id: 'br-rel-014',
    topic: 'Release Management',
    difficulty: 'hard',
    question: 'Which database migration practices are compatible with zero-downtime releases? (Select all that apply)',
    options: [
      'Adding nullable columns or new tables before the code that uses them',
      'Backfilling data in batches outside the deployment transaction',
      'Dropping unused columns only after all running versions have stopped referencing them',
      'Renaming a column in place during the deploy',
    ],
    answers: [0, 1, 2],
    explanation:
      'Additive-first, backfill-separately, drop-last is the expand/contract pattern. An in-place rename breaks whichever version is not yet updated.',
  },
  {
    id: 'br-rel-015',
    topic: 'Release Management',
    difficulty: 'medium',
    question: 'Why should feature flags have a defined lifecycle and removal plan?',
    options: [
      'Stale flags accumulate as untested combinatorial code paths and become a source of outages',
      'Flags consume significant memory',
      'Flag systems charge per flag',
      'Flags prevent code review',
    ],
    answers: [0],
    explanation:
      'With N live flags there are up to 2^N configurations, most never tested. Treat flag cleanup as part of the definition of done.',
  },
  {
    id: 'br-rel-016',
    topic: 'Release Management',
    difficulty: 'medium',
    question: 'What is a kill switch in release engineering?',
    options: [
      'A flag that can immediately disable a risky feature or dependency without a deployment',
      'A command that stops the CI server',
      'A network ACL blocking external traffic',
      'A way to terminate long-running builds',
    ],
    answers: [0],
    explanation:
      'A kill switch turns mitigation into a configuration change measured in seconds, which is far faster than any redeploy or rollback.',
  },
  {
    id: 'br-rel-017',
    topic: 'Release Management',
    difficulty: 'hard',
    question: 'Why is deploying on Friday afternoon traditionally discouraged, and what makes it safe?',
    options: [
      'The risk is reduced staffing for response; small batches, automated rollback, strong monitoring, and progressive delivery are what actually make timing irrelevant',
      'Systems are inherently less stable on Fridays',
      'Cloud providers throttle weekend traffic',
      'It is a regulatory requirement',
    ],
    answers: [0],
    explanation:
      'The underlying problem is slow, risky recovery. Fix recovery capability and the calendar restriction becomes unnecessary.',
  },
  {
    id: 'br-rel-018',
    topic: 'Release Management',
    difficulty: 'medium',
    question: 'What is the value of a deployment audit trail?',
    options: [
      'It records who deployed what version, when, where, and with what approval — essential for incident analysis and compliance',
      'It speeds up deployments',
      'It replaces monitoring',
      'It stores the artifacts themselves',
    ],
    answers: [0],
    explanation:
      'Many compliance regimes (SOC 2, ISO 27001, PCI DSS) require demonstrable change control; a pipeline-generated audit trail satisfies it without manual paperwork.',
  },
  {
    id: 'br-rel-019',
    topic: 'Release Management',
    difficulty: 'medium',
    question: 'What is the purpose of a "soak" or bake time between rollout stages?',
    options: [
      'To let slow-manifesting problems such as memory leaks, cache effects, and periodic jobs surface before wider exposure',
      'To let caches warm up for performance benchmarks',
      'To satisfy a mandatory waiting policy',
      'To allow manual testing',
    ],
    answers: [0],
    explanation:
      'Some failure modes only appear after hours of traffic. Bake time is the difference between catching them at 5% of users and at 100%.',
  },
  {
    id: 'br-rel-020',
    topic: 'Release Management',
    difficulty: 'hard',
    question: 'A canary shows a 0.4% error rate versus 0.35% for the baseline. What is the responsible interpretation?',
    options: [
      'Check statistical significance given the sample size before concluding anything; the difference may be noise',
      'Immediately roll back — any increase is a failure',
      'Promote to 100% — the difference is tiny',
      'Ignore error rate and use latency only',
    ],
    answers: [0],
    explanation:
      'Canary analysis needs enough traffic and a defined significance threshold. Reacting to noise causes both false rollbacks and, over time, ignored signals.',
  },
  {
    id: 'br-rel-021',
    topic: 'Release Management',
    difficulty: 'medium',
    question: 'Why should configuration be externalised from the artifact?',
    options: [
      'So the same immutable artifact can be promoted across environments with only its configuration differing',
      'To reduce artifact size',
      'Because configuration files cannot be versioned',
      'To allow the application to start faster',
    ],
    answers: [0],
    explanation:
      'Baking environment-specific config into the build forces a rebuild per environment, breaking build-once/promote-many and the guarantee that you shipped what you tested.',
  },
  {
    id: 'br-rel-022',
    topic: 'Release Management',
    difficulty: 'medium',
    question: 'What risk does treating configuration changes as "not a deployment" create?',
    options: [
      'Config changes can break production just as easily as code, so skipping review, staging, and rollback for them removes a major safety net',
      'Configuration changes are always safe',
      'Config changes cannot be audited',
      'Config changes require downtime',
    ],
    answers: [0],
    explanation:
      'A large share of major outages trace to configuration pushes. Config should flow through the same review, progressive rollout, and rollback machinery as code.',
  },
  {
    id: 'br-rel-023',
    topic: 'Release Management',
    difficulty: 'medium',
    question: 'What is the purpose of segregation of duties in a regulated release process?',
    options: [
      'No single individual can author, approve, and deploy a change unilaterally',
      'Developers and testers must sit in different teams',
      'Only managers may merge code',
      'Deployments must be manual',
    ],
    answers: [0],
    explanation:
      'This can be satisfied automatically: peer-reviewed PRs plus a pipeline identity performing the deployment means no human has end-to-end unilateral control.',
  },
  {
    id: 'br-rel-024',
    topic: 'Release Management',
    difficulty: 'hard',
    question: 'What is a "release train" model?',
    options: [
      'Releases depart on a fixed schedule with whatever is ready and merged; unfinished work waits for the next departure',
      'All teams must release simultaneously after full integration testing',
      'Each commit triggers an independent release',
      'Releases are queued behind a manual approval',
    ],
    answers: [0],
    explanation:
      'Trains give predictability and remove per-release negotiation, which suits multi-team products and mobile app store cadences.',
  },
  {
    id: 'br-rel-025',
    topic: 'Release Management',
    difficulty: 'medium',
    question: 'Why should mobile app releases use staged rollout percentages in the app stores?',
    options: [
      'Client updates cannot be rolled back from users\' devices, so limiting exposure and halting the rollout is the primary safety mechanism',
      'Stores charge less for staged rollouts',
      'It speeds up review',
      'It avoids the need for testing',
    ],
    answers: [0],
    explanation:
      'Once a user has installed a build you cannot recall it — you can only halt the rollout and ship a fixed version, which is why server-side kill switches matter for mobile too.',
  },
  {
    id: 'br-rel-026',
    topic: 'Release Management',
    difficulty: 'medium',
    question: 'What is the main purpose of measuring change failure rate?',
    options: [
      'It quantifies release quality — what fraction of deployments cause degraded service requiring remediation',
      'It counts failed builds',
      'It tracks reverted pull requests',
      'It measures test flakiness',
    ],
    answers: [0],
    explanation:
      'Paired with deployment frequency it prevents optimising speed at the expense of stability, or vice versa.',
  },
];
