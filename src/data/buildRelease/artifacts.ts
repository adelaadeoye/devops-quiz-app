import type { Question } from '../../types';

export const artifactQuestions: Question[] = [
  {
    id: 'br-art-001',
    topic: 'Artifacts & Dependencies',
    difficulty: 'easy',
    question: 'In semantic versioning MAJOR.MINOR.PATCH, when must MAJOR be incremented?',
    options: [
      'When a backward-incompatible API change is introduced',
      'When any new feature is added',
      'On every release',
      'When dependencies are updated',
    ],
    answers: [0],
    explanation:
      'MINOR is for backward-compatible additions, PATCH for backward-compatible fixes. The contract is about the public API, not the size of the change.',
  },
  {
    id: 'br-art-002',
    topic: 'Artifacts & Dependencies',
    difficulty: 'medium',
    question: 'What is the role of a lock file (package-lock.json, poetry.lock, Cargo.lock, go.sum)?',
    options: [
      'It records the exact resolved versions and integrity hashes of the full dependency tree so installs are reproducible',
      'It prevents other developers from editing dependencies',
      'It caches downloaded packages',
      'It lists only direct dependencies',
    ],
    answers: [0],
    explanation:
      'Manifests express ranges; lock files pin the resolution. Committing the lock file is what makes CI and local installs identical, and hashes protect against tampered packages.',
  },
  {
    id: 'br-art-003',
    topic: 'Artifacts & Dependencies',
    difficulty: 'medium',
    question: 'What is the difference between a snapshot/pre-release version and a release version?',
    options: [
      'Snapshots are mutable, frequently republished development builds; release versions are immutable and permanent',
      'Snapshots are smaller',
      'Release versions cannot be deleted',
      'Snapshots skip testing',
    ],
    answers: [0],
    explanation:
      'Never ship a snapshot to production: the same coordinate can resolve to different bytes over time, destroying reproducibility and rollback certainty.',
  },
  {
    id: 'br-art-004',
    topic: 'Artifacts & Dependencies',
    difficulty: 'medium',
    question: 'Why should published artifact versions be immutable in the repository?',
    options: [
      'Consumers who pinned a version must always get the same bytes; republishing breaks reproducibility and enables a subtle attack vector',
      'It saves storage',
      'Mutable versions are slower to download',
      'Repositories cannot technically support overwriting',
    ],
    answers: [0],
    explanation:
      'Most artifact repositories can enforce this per-repository. The npm left-pad and various "unpublish" incidents illustrate the consumer impact of mutability.',
  },
  {
    id: 'br-art-005',
    topic: 'Artifacts & Dependencies',
    difficulty: 'hard',
    question: 'What is a dependency confusion attack?',
    options: [
      'An attacker publishes a public package with the same name as an internal one and a higher version, so a misconfigured resolver pulls the attacker\'s package',
      'Two dependencies require conflicting versions of a third',
      'A package changes its licence',
      'A transitive dependency is removed upstream',
    ],
    answers: [0],
    explanation:
      'Mitigations: scoped/namespaced internal packages, explicit registry pinning per scope, and a proxy configured to never fall through to public registries for internal names.',
  },
  {
    id: 'br-art-006',
    topic: 'Artifacts & Dependencies',
    difficulty: 'medium',
    question: 'What benefits does an internal repository proxy (Artifactory, Nexus, Verdaccio) provide? (Select all that apply)',
    options: [
      'Caching to survive upstream outages and reduce build time',
      'A control point for blocking known-malicious or non-compliant packages',
      'An audit trail of what was consumed and when',
      'Automatic upgrade of all dependencies to latest',
    ],
    answers: [0, 1, 2],
    explanation:
      'A proxy provides availability, policy enforcement, and traceability. It does not decide your version policy for you.',
  },
  {
    id: 'br-art-007',
    topic: 'Artifacts & Dependencies',
    difficulty: 'medium',
    question: 'What does artifact "promotion" mean?',
    options: [
      'Moving or re-labelling the exact same artifact from a lower-trust repository to a higher-trust one as it passes each gate',
      'Rebuilding the artifact for each environment',
      'Increasing the version number',
      'Publicising the release',
    ],
    answers: [0],
    explanation:
      'Promotion preserves the build-once principle: dev → staging → production repositories hold the identical binary, with metadata recording which gates it passed.',
  },
  {
    id: 'br-art-008',
    topic: 'Artifacts & Dependencies',
    difficulty: 'hard',
    question: 'Why is a floating version range like `^1.2.0` risky for production builds?',
    options: [
      'A new upstream publish can change the resolved code between builds without any change in your repository',
      'Ranges are slower to resolve',
      'Ranges are not supported by most package managers',
      'Ranges always resolve to the oldest version',
    ],
    answers: [0],
    explanation:
      'Use ranges in the manifest for upgrade flexibility, but always commit a lock file and build from it (`npm ci`, `pip install -r` with hashes) so the resolution is frozen.',
  },
  {
    id: 'br-art-009',
    topic: 'Artifacts & Dependencies',
    difficulty: 'medium',
    question: 'What is a transitive dependency?',
    options: [
      'A dependency pulled in indirectly by one of your direct dependencies',
      'A dependency needed only at build time',
      'A dependency that changes frequently',
      'A dependency shared between two projects',
    ],
    answers: [0],
    explanation:
      'Transitive dependencies typically dominate the tree by count and are where most vulnerabilities live, which is why SBOMs and lock files matter.',
  },
  {
    id: 'br-art-010',
    topic: 'Artifacts & Dependencies',
    difficulty: 'medium',
    question: 'What is a retention policy in an artifact repository for?',
    options: [
      'Automatically cleaning up old snapshots and untagged builds to control storage cost while preserving released versions',
      'Controlling who can download artifacts',
      'Limiting the download rate',
      'Encrypting artifacts at rest',
    ],
    answers: [0],
    explanation:
      'A good policy keeps all releases (and anything deployed anywhere) indefinitely while aggressively expiring per-commit CI builds.',
  },
  {
    id: 'br-art-011',
    topic: 'Artifacts & Dependencies',
    difficulty: 'hard',
    question: 'Which strategies handle a diamond dependency conflict (two libraries needing incompatible versions of a third)? (Select all that apply)',
    options: [
      'Upgrade one consumer so both agree on a compatible version',
      'Shade/relocate one copy so both versions can coexist under different namespaces',
      'Introduce an isolated classloader or module boundary where the platform supports it',
      'Delete the lock file so the resolver picks randomly',
    ],
    answers: [0, 1, 2],
    explanation:
      'Alignment, shading, and isolation are real solutions. Removing the lock file just makes the failure nondeterministic.',
  },
  {
    id: 'br-art-012',
    topic: 'Artifacts & Dependencies',
    difficulty: 'medium',
    question: 'Why should CI use `npm ci` rather than `npm install`?',
    options: [
      '`npm ci` installs exactly from the lock file and fails if the manifest and lock disagree, giving deterministic installs',
      '`npm ci` is a newer alias for the same behaviour',
      '`npm ci` skips devDependencies by default',
      '`npm ci` updates the lock file automatically',
    ],
    answers: [0],
    explanation:
      '`npm install` may mutate the lock file and resolve new versions, which is exactly the nondeterminism a build pipeline must avoid.',
  },
  {
    id: 'br-art-013',
    topic: 'Artifacts & Dependencies',
    difficulty: 'medium',
    question: 'What does automated dependency update tooling (Dependabot, Renovate) contribute to release engineering?',
    options: [
      'It converts large, risky, infrequent upgrades into small, continuously tested pull requests',
      'It removes the need for a lock file',
      'It guarantees no breaking changes',
      'It scans for secrets',
    ],
    answers: [0],
    explanation:
      'Continuous small upgrades keep the codebase close to upstream, so an urgent security patch is a one-version bump rather than a multi-major migration.',
  },
  {
    id: 'br-art-014',
    topic: 'Artifacts & Dependencies',
    difficulty: 'medium',
    question: 'What licence-related risk should a release pipeline check for?',
    options: [
      'Dependencies carrying licences incompatible with how the product is distributed (e.g. strong copyleft in proprietary shipped software)',
      'Dependencies without a README',
      'Dependencies with too few stars',
      'Dependencies larger than 10 MB',
    ],
    answers: [0],
    explanation:
      'Automated licence scanning against an allow/deny list catches obligations early, when swapping a library is still cheap.',
  },
  {
    id: 'br-art-015',
    topic: 'Artifacts & Dependencies',
    difficulty: 'hard',
    question: 'What are the risks of pinning every dependency to an exact version and never updating? (Select all that apply)',
    options: [
      'Accumulated security debt as unpatched vulnerabilities pile up',
      'Increasingly expensive upgrade paths when a jump becomes unavoidable',
      'Possible loss of upstream support for very old versions',
      'Nondeterministic builds',
    ],
    answers: [0, 1, 2],
    explanation:
      'Pinning gives determinism, which is good — the failure mode is never moving the pin. Pinning plus automated update PRs gives both determinism and currency.',
  },
  {
    id: 'br-art-016',
    topic: 'Artifacts & Dependencies',
    difficulty: 'medium',
    question: 'What does a checksum/integrity hash published alongside an artifact allow a consumer to do?',
    options: [
      'Verify the downloaded bytes were not corrupted or substituted in transit or at rest',
      'Decrypt the artifact',
      'Determine the artifact version',
      'Confirm the build passed tests',
    ],
    answers: [0],
    explanation:
      'Checksums detect corruption and naive tampering. They only prove authenticity when the checksum itself is delivered over a trusted channel — which is why signatures are stronger.',
  },
  {
    id: 'br-art-017',
    topic: 'Artifacts & Dependencies',
    difficulty: 'medium',
    question: 'Why should build artifacts be named and versioned deterministically rather than "latest.zip"?',
    options: [
      'A unique, immutable coordinate makes deployments traceable and rollbacks unambiguous',
      'It reduces storage cost',
      'It speeds up uploads',
      'It is required by HTTP',
    ],
    answers: [0],
    explanation:
      'You cannot answer "what exactly is running in production?" or "roll back to what?" if artifact names are reused.',
  },
  {
    id: 'br-art-018',
    topic: 'Artifacts & Dependencies',
    difficulty: 'hard',
    question: 'A build suddenly fails because an upstream package was unpublished. What controls would have prevented this? (Select all that apply)',
    options: [
      'A caching proxy repository that retains previously fetched versions',
      'Vendoring critical dependencies into the repository',
      'Building from a lock file with integrity hashes against the internal mirror',
      'Using floating version ranges',
    ],
    answers: [0, 1, 2],
    explanation:
      'Mirrors, vendoring, and locked resolution against an internal source insulate you from upstream availability. Floating ranges make the problem worse.',
  },
  {
    id: 'br-art-019',
    topic: 'Artifacts & Dependencies',
    difficulty: 'medium',
    question: 'What is a BOM (bill of materials) file in Maven or a constraints file in Python for?',
    options: [
      'Centrally declaring a consistent, curated set of dependency versions that many projects import',
      'Listing the physical hardware requirements',
      'Recording the build machine specification',
      'Generating documentation',
    ],
    answers: [0],
    explanation:
      'A shared BOM keeps a fleet of services aligned on the same library versions, which simplifies both upgrades and vulnerability response.',
  },
  {
    id: 'br-art-020',
    topic: 'Artifacts & Dependencies',
    difficulty: 'medium',
    question: 'Why is it useful to store test reports and coverage data as build artifacts?',
    options: [
      'They provide durable evidence for audits and let you analyse trends and flakiness over time',
      'They are required for the build to pass',
      'They reduce build time',
      'They replace logging',
    ],
    answers: [0],
    explanation:
      'Retained reports also make post-incident questions like "was this path tested at the time of release?" answerable.',
  },
  {
    id: 'br-art-021',
    topic: 'Artifacts & Dependencies',
    difficulty: 'medium',
    question: 'What should determine the version number of a build in a fully automated release pipeline?',
    options: [
      'A deterministic rule derived from commit metadata or conventional commits, so the same input always yields the same version',
      'A number a human types at deploy time',
      'The current date only',
      'The CI agent hostname',
    ],
    answers: [0],
    explanation:
      'Automated, rule-based versioning removes human error and makes the version a reliable key into source, artifacts, and change logs.',
  },
  {
    id: 'br-art-022',
    topic: 'Artifacts & Dependencies',
    difficulty: 'hard',
    question: 'What is the "0ver"/pre-1.0 versioning caveat in SemVer?',
    options: [
      'For versions below 1.0.0 the API is explicitly unstable, and minor bumps may contain breaking changes',
      'Version 0 packages cannot be published',
      'Version 0 means the package is deprecated',
      'Pre-1.0 packages must use date-based versions',
    ],
    answers: [0],
    explanation:
      'Many caret-range resolvers treat `^0.x` more conservatively for this reason. Depending on pre-1.0 libraries in production warrants tighter pinning.',
  },
  {
    id: 'br-art-023',
    topic: 'Artifacts & Dependencies',
    difficulty: 'medium',
    question: 'Why should a release pipeline publish artifacts before deploying them?',
    options: [
      'The published, immutable artifact becomes the single source deployed to every environment, and remains available for rollback',
      'Publishing is faster than deploying',
      'It satisfies SemVer',
      'It reduces registry costs',
    ],
    answers: [0],
    explanation:
      'Deploying from a workspace directory rather than a published artifact means the deployed bits may not exist anywhere afterwards.',
  },
  {
    id: 'br-art-024',
    topic: 'Artifacts & Dependencies',
    difficulty: 'medium',
    question: 'What does "yanking" a package version mean in registries that support it?',
    options: [
      'Marking a version as unsuitable for new resolutions while keeping it downloadable for existing lock files',
      'Permanently deleting it',
      'Renaming it',
      'Moving it to a private registry',
    ],
    answers: [0],
    explanation:
      'Yanking balances stopping new adoption of a bad release against not breaking existing reproducible builds — a much better default than hard deletion.',
  },
  {
    id: 'br-art-025',
    topic: 'Artifacts & Dependencies',
    difficulty: 'hard',
    question: 'Your organisation must respond to a newly announced critical CVE in a widely used library. What makes this fast? (Select all that apply)',
    options: [
      'SBOMs generated and stored for every released artifact',
      'A searchable inventory mapping deployed versions to artifacts and their components',
      'Automated dependency update tooling to open the bump PRs',
      'A policy of never recording dependency metadata to reduce noise',
    ],
    answers: [0, 1, 2],
    explanation:
      'Knowing where a component is deployed is the slow part of CVE response. SBOMs plus a deployment inventory turn days of investigation into a query.',
  },
  {
    id: 'br-art-026',
    topic: 'Artifacts & Dependencies',
    difficulty: 'medium',
    question: 'Why is publishing an artifact from a developer machine discouraged?',
    options: [
      'It bypasses the pipeline\'s tests, provenance, and approval gates, and the artifact cannot be tied to a verified source revision',
      'Developer machines are too slow',
      'Registries block non-CI uploads',
      'It corrupts the lock file',
    ],
    answers: [0],
    explanation:
      'Publishing rights should belong to the pipeline identity alone, so every artifact in the registry has verifiable provenance.',
  },
];
