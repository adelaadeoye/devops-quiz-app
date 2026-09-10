import type { Question } from '../../types';

export const iacQuestions: Question[] = [
  {
    id: 'do-iac-001',
    topic: 'Infrastructure as Code',
    difficulty: 'easy',
    question: 'What is the core difference between declarative and imperative infrastructure tooling?',
    options: [
      'Declarative describes the desired end state and lets the tool compute the changes; imperative specifies the exact ordered steps to perform',
      'Declarative uses YAML; imperative uses JSON',
      'Declarative runs locally; imperative runs in the cloud',
      'Declarative cannot manage stateful resources',
    ],
    answers: [0],
    explanation:
      'Declarative tools (Terraform, CloudFormation, Kubernetes manifests) diff desired vs actual state, which makes runs idempotent and repeatable. Imperative scripts must handle every ordering and re-run case themselves.',
  },
  {
    id: 'do-iac-002',
    topic: 'Infrastructure as Code',
    difficulty: 'easy',
    question: 'What is the purpose of Terraform state?',
    options: [
      'To cache provider binaries',
      'To map resources declared in configuration to the real-world objects that were created, enabling diffing and deletion',
      'To store credentials',
      'To record the command history',
    ],
    answers: [1],
    explanation:
      'Without state Terraform cannot know which real resource corresponds to which config block, so it could not compute a plan or destroy resources cleanly.',
  },
  {
    id: 'do-iac-003',
    topic: 'Infrastructure as Code',
    difficulty: 'medium',
    question: 'Why must Terraform state be stored remotely with locking in a team setting? (Select all that apply)',
    options: [
      'To prevent two concurrent applies from corrupting state or duplicating resources',
      'To give all engineers and CI the same authoritative view of what exists',
      'To make plans run faster',
      'To allow state to be encrypted and versioned centrally',
    ],
    answers: [0, 1, 3],
    explanation:
      'Remote backends (S3+DynamoDB, GCS, Terraform Cloud) provide locking, sharing, encryption, and version history. They do not inherently speed up planning.',
  },
  {
    id: 'do-iac-004',
    topic: 'Infrastructure as Code',
    difficulty: 'medium',
    question: 'What is configuration drift?',
    options: [
      'When live infrastructure diverges from the state described in code, usually via manual changes',
      'When the config file grows too large',
      'When provider versions become outdated',
      'When Terraform modules are nested too deeply',
    ],
    answers: [0],
    explanation:
      'Drift breaks the guarantee that code is the source of truth. Regular `plan` runs in CI (drift detection) surface it before it causes a surprising change during the next apply.',
  },
  {
    id: 'do-iac-005',
    topic: 'Infrastructure as Code',
    difficulty: 'medium',
    question: 'Why is `terraform plan` reviewed before `terraform apply` in a pipeline?',
    options: [
      'It shows the exact create/update/destroy actions so destructive changes can be caught before execution',
      'It validates syntax only',
      'It refreshes provider plugins',
      'It is required to generate documentation',
    ],
    answers: [0],
    explanation:
      'The plan is the change proposal. Saving it to a file and applying that exact plan removes the risk that state changed between review and execution.',
  },
  {
    id: 'do-iac-006',
    topic: 'Infrastructure as Code',
    difficulty: 'hard',
    question: 'A Terraform change would replace a production database because an immutable attribute changed. Which are safe responses? (Select all that apply)',
    options: [
      'Revert the attribute change and find a non-destructive path',
      'Use `lifecycle { prevent_destroy = true }` on critical resources as a guardrail',
      'Create the replacement out-of-band, migrate data, then import and reconcile state',
      'Run `terraform apply -auto-approve` to move quickly',
    ],
    answers: [0, 1, 2],
    explanation:
      'Immutable-attribute changes force replacement. Reverting, guarding with prevent_destroy, or doing a controlled migration with `import` are all valid. Auto-approving destroys the database.',
  },
  {
    id: 'do-iac-007',
    topic: 'Infrastructure as Code',
    difficulty: 'medium',
    question: 'What does `terraform import` do?',
    options: [
      'Brings an existing real resource under Terraform management by recording it in state',
      'Downloads modules from the registry',
      'Copies state between workspaces',
      'Imports variables from a file',
    ],
    answers: [0],
    explanation:
      'Import binds a real resource to a config address. You still have to write matching configuration, otherwise the next plan will show a large diff.',
  },
  {
    id: 'do-iac-008',
    topic: 'Infrastructure as Code',
    difficulty: 'medium',
    question: 'Which are good reasons to split infrastructure into multiple Terraform states? (Select all that apply)',
    options: [
      'Reduce blast radius so a mistake affects a smaller scope',
      'Shorten plan/apply times on large estates',
      'Allow different teams to own and permission their own components',
      'Guarantee that all resources are always updated together atomically',
    ],
    answers: [0, 1, 2],
    explanation:
      'Splitting improves safety, speed, and ownership, but explicitly gives up cross-component atomicity — coordination then happens through remote state outputs or data sources.',
  },
  {
    id: 'do-iac-009',
    topic: 'Infrastructure as Code',
    difficulty: 'easy',
    question: 'What is an immutable infrastructure approach?',
    options: [
      'Servers are never modified in place; changes are made by building a new image and replacing instances',
      'Servers are patched continuously with a config management agent',
      'Infrastructure code is stored in a read-only repository',
      'Resources are tagged as immutable in the cloud console',
    ],
    answers: [0],
    explanation:
      'Immutable infrastructure eliminates snowflake servers and configuration drift: the deployed unit is a versioned artifact (AMI, container image) that is replaced rather than mutated.',
  },
  {
    id: 'do-iac-010',
    topic: 'Infrastructure as Code',
    difficulty: 'medium',
    question: 'How does Ansible differ architecturally from Puppet or Chef in their traditional modes?',
    options: [
      'Ansible is agentless and pushes over SSH/WinRM; Puppet and Chef traditionally use an agent that pulls from a central server',
      'Ansible requires a database; the others do not',
      'Ansible is declarative while the others are purely imperative',
      'Ansible only manages containers',
    ],
    answers: [0],
    explanation:
      'The agentless push model lowers the barrier to entry, while agent-based pull models continuously enforce state and scale differently.',
  },
  {
    id: 'do-iac-011',
    topic: 'Infrastructure as Code',
    difficulty: 'medium',
    question: 'What does idempotency mean for a configuration management task?',
    options: [
      'Running it once or many times yields the same final system state, and it reports "changed" only when it actually changed something',
      'It can be undone',
      'It runs faster on subsequent executions',
      'It requires root privileges',
    ],
    answers: [0],
    explanation:
      'Idempotent modules let you re-run playbooks safely and make the "changed" count a meaningful drift signal. Raw `shell`/`command` tasks break this unless guarded with `creates`/`changed_when`.',
  },
  {
    id: 'do-iac-012',
    topic: 'Infrastructure as Code',
    difficulty: 'hard',
    question: 'Why is storing secrets in plain text inside IaC repositories a serious problem? (Select all that apply)',
    options: [
      'Git history retains the secret even after it is removed in a later commit',
      'Anyone with read access to the repo — including CI caches and forks — gains the credential',
      'Rotation becomes a code change with a deploy cycle rather than a fast operation',
      'It increases repository size beyond limits',
    ],
    answers: [0, 1, 2],
    explanation:
      'Use a secrets manager or sealed/encrypted secrets with references in code. Once committed, a secret must be considered compromised and rotated — removing the commit is not enough.',
  },
  {
    id: 'do-iac-013',
    topic: 'Infrastructure as Code',
    difficulty: 'medium',
    question: 'What is policy as code in the IaC context?',
    options: [
      'Machine-readable rules (OPA/Rego, Sentinel, Conftest) evaluated against plans or manifests to enforce organisational standards automatically',
      'Documentation of company policy in Markdown',
      'IAM policies written in JSON',
      'A checklist reviewers follow manually',
    ],
    answers: [0],
    explanation:
      'Policy as code turns "no public S3 buckets" or "all resources must be tagged" into an automated gate in the pipeline instead of a review convention.',
  },
  {
    id: 'do-iac-014',
    topic: 'Infrastructure as Code',
    difficulty: 'medium',
    question: 'Why should provider and module versions be pinned in Terraform?',
    options: [
      'To make runs reproducible and prevent an upstream release from silently changing plan behaviour',
      'To reduce state file size',
      'To enable remote backends',
      'To allow parallel applies',
    ],
    answers: [0],
    explanation:
      'Unpinned versions mean the same code can produce different plans on different days. The lock file plus explicit version constraints make upgrades an intentional, reviewable change.',
  },
  {
    id: 'do-iac-015',
    topic: 'Infrastructure as Code',
    difficulty: 'hard',
    question: 'What is the main risk of using `count` instead of `for_each` for a list of resources in Terraform?',
    options: [
      'Removing an item from the middle of the list shifts indices, causing unrelated resources to be destroyed and recreated',
      '`count` cannot be used with modules',
      '`count` does not support variables',
      '`count` disables the plan output',
    ],
    answers: [0],
    explanation:
      '`count` addresses resources positionally. `for_each` keys them by a stable string, so adding or removing entries only affects the corresponding resource.',
  },
  {
    id: 'do-iac-016',
    topic: 'Infrastructure as Code',
    difficulty: 'medium',
    question: 'What is the purpose of a Terraform module?',
    options: [
      'To package a reusable, parameterised group of resources with defined inputs and outputs',
      'To store state remotely',
      'To authenticate to providers',
      'To generate documentation',
    ],
    answers: [0],
    explanation:
      'Modules encapsulate patterns (a standard VPC, a standard service) so teams consume a reviewed abstraction instead of copying raw resource blocks.',
  },
  {
    id: 'do-iac-017',
    topic: 'Infrastructure as Code',
    difficulty: 'medium',
    question: 'Which practices help make an IaC pipeline safe? (Select all that apply)',
    options: [
      'Run `fmt`, `validate`, and static security scanning on every pull request',
      'Post the plan output as a PR comment for review',
      'Require approval before apply on production workspaces',
      'Grant the CI role wildcard admin permissions to avoid permission errors',
    ],
    answers: [0, 1, 2],
    explanation:
      'Linting, visible plans, and gated applies build confidence. Wildcard admin credentials in CI turn any pipeline compromise into full account compromise — scope them least-privilege instead.',
  },
  {
    id: 'do-iac-018',
    topic: 'Infrastructure as Code',
    difficulty: 'easy',
    question: 'What does Packer do?',
    options: [
      'Builds identical machine images for multiple platforms from a single source template',
      'Provisions Kubernetes clusters',
      'Manages DNS records',
      'Compresses container layers',
    ],
    answers: [0],
    explanation:
      'Packer bakes golden images (AMI, VM templates, Docker images), which is the foundation of immutable infrastructure — the image is built and tested once, then deployed unchanged.',
  },
  {
    id: 'do-iac-019',
    topic: 'Infrastructure as Code',
    difficulty: 'hard',
    question: 'A `terraform apply` fails halfway through. What is the state of the world?',
    options: [
      'All changes are rolled back automatically',
      'Resources created before the failure exist and are recorded in state; the configuration is partially applied and re-running will continue from there',
      'The state file is deleted',
      'Terraform locks the workspace permanently',
    ],
    answers: [1],
    explanation:
      'Terraform has no transaction rollback. It records what succeeded, so a re-run reconciles the remainder. This is why idempotent, retry-safe configurations matter.',
  },
  {
    id: 'do-iac-020',
    topic: 'Infrastructure as Code',
    difficulty: 'medium',
    question: 'What is the difference between Terraform workspaces and separate state backends per environment?',
    options: [
      'Workspaces give multiple states within one backend and configuration; separate backends give stronger isolation of credentials, permissions, and blast radius',
      'Workspaces are only for local development',
      'Separate backends cannot be used with modules',
      'They are functionally identical',
    ],
    answers: [0],
    explanation:
      'Workspaces are lightweight but share one configuration and backend permission boundary. Most teams prefer separate backends/accounts per environment for real isolation.',
  },
  {
    id: 'do-iac-021',
    topic: 'Infrastructure as Code',
    difficulty: 'medium',
    question: 'Why is tagging cloud resources through IaC important? (Select all that apply)',
    options: [
      'It enables cost allocation and showback by team or service',
      'It supports automated lifecycle policies and cleanup of orphaned resources',
      'It provides ownership context during incidents',
      'It improves API throughput',
    ],
    answers: [0, 1, 2],
    explanation:
      'Consistent tags (owner, service, environment, cost-centre) power FinOps reporting, automation, and incident routing. They have no effect on API performance.',
  },
  {
    id: 'do-iac-022',
    topic: 'Infrastructure as Code',
    difficulty: 'hard',
    question: 'What is the "expand then contract" pattern applied to infrastructure changes?',
    options: [
      'Add the new resource alongside the old one, shift traffic or references, verify, then remove the old resource in a separate change',
      'Scale up then scale down nodes daily',
      'Increase then decrease the state file size',
      'Duplicate the entire account before any change',
    ],
    answers: [0],
    explanation:
      'Splitting a risky replacement into additive and subtractive steps keeps every intermediate state working and makes rollback a matter of shifting references back.',
  },
  {
    id: 'do-iac-023',
    topic: 'Infrastructure as Code',
    difficulty: 'medium',
    question: 'What does Helm provide for Kubernetes deployments?',
    options: [
      'Templated, versioned, parameterised packages (charts) with release tracking and rollback',
      'A container runtime',
      'A CNI implementation',
      'A replacement for the API server',
    ],
    answers: [0],
    explanation:
      'Helm renders templates with values into manifests and records each install/upgrade as a release, enabling `helm rollback` to a previous revision.',
  },
  {
    id: 'do-iac-024',
    topic: 'Infrastructure as Code',
    difficulty: 'medium',
    question: 'How does Kustomize differ from Helm?',
    options: [
      'Kustomize overlays patches onto plain YAML bases without a templating language; Helm renders templates from values',
      'Kustomize requires a server-side component',
      'Helm cannot produce plain YAML',
      'Kustomize only works with CRDs',
    ],
    answers: [0],
    explanation:
      'Kustomize keeps manifests valid YAML at every step and composes them with strategic-merge and JSON patches, which many teams find easier to reason about than Go templates.',
  },
  {
    id: 'do-iac-025',
    topic: 'Infrastructure as Code',
    difficulty: 'hard',
    question: 'Why can running IaC applies from multiple pipelines against the same state cause outages even with locking?',
    options: [
      'Locking prevents concurrent writes but not logically conflicting changes applied in sequence, so one pipeline can revert the other\'s intent',
      'Locking corrupts the state file',
      'Locks expire after one second',
      'State locking is only advisory in all backends',
    ],
    answers: [0],
    explanation:
      'If two pipelines hold different configuration versions, they will each converge the world to their own view, flip-flopping resources. One owner per state is the safe rule.',
  },
];
