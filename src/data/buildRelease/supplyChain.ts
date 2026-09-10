import type { Question } from '../../types';

export const supplyChainQuestions: Question[] = [
  {
    id: 'br-sup-001',
    topic: 'Supply Chain & Packaging',
    difficulty: 'medium',
    question: 'What is software supply chain security concerned with?',
    options: [
      'Integrity and provenance of everything that goes into and comes out of the build — source, dependencies, tools, and artifacts',
      'Encrypting network traffic between services',
      'Physical security of data centres',
      'Vendor contract management',
    ],
    answers: [0],
    explanation:
      'Attacks such as SolarWinds and Codecov targeted the build system rather than the running application, which is why build integrity is now a first-class security concern.',
  },
  {
    id: 'br-sup-002',
    topic: 'Supply Chain & Packaging',
    difficulty: 'medium',
    question: 'What does SLSA define?',
    options: [
      'A tiered framework of build integrity requirements, including provenance generation and build platform isolation',
      'A vulnerability scoring system',
      'A container image format',
      'A licence compatibility matrix',
    ],
    answers: [0],
    explanation:
      'SLSA levels progressively require signed provenance, hardened build platforms, and non-falsifiable attestations about how an artifact was produced.',
  },
  {
    id: 'br-sup-003',
    topic: 'Supply Chain & Packaging',
    difficulty: 'medium',
    question: 'What is build provenance (an attestation)?',
    options: [
      'Signed metadata stating what source, dependencies, builder, and parameters produced a specific artifact',
      'The artifact\'s checksum',
      'The list of tests that ran',
      'The changelog for a release',
    ],
    answers: [0],
    explanation:
      'In-toto/SLSA provenance lets a verifier confirm an artifact came from the expected repository and pipeline, not from someone\'s laptop or a compromised runner.',
  },
  {
    id: 'br-sup-004',
    topic: 'Supply Chain & Packaging',
    difficulty: 'hard',
    question: 'What is keyless signing with Sigstore (cosign) based on?',
    options: [
      'A short-lived certificate issued against an OIDC identity, with the signing event recorded in a public transparency log',
      'A shared symmetric key stored in CI secrets',
      'A hardware token per developer',
      'The artifact\'s own hash used as a key',
    ],
    answers: [0],
    explanation:
      'Keyless signing removes long-lived private key management. Verification checks the certificate\'s identity claims (repo, workflow) and the Rekor transparency log entry.',
  },
  {
    id: 'br-sup-005',
    topic: 'Supply Chain & Packaging',
    difficulty: 'medium',
    question: 'Why should artifact signature verification happen at deploy time and not only at build time?',
    options: [
      'It ensures the artifact was not swapped or tampered with in the registry or in transit between build and deployment',
      'Verification is faster at deploy time',
      'Build-time verification is impossible',
      'Deploy-time verification updates the signature',
    ],
    answers: [0],
    explanation:
      'Admission controllers (Kyverno, Gatekeeper, Connaisseur) enforce this in Kubernetes by rejecting images without a valid signature from an expected identity.',
  },
  {
    id: 'br-sup-006',
    topic: 'Supply Chain & Packaging',
    difficulty: 'medium',
    question: 'Which formats are common for SBOMs?',
    options: ['SPDX and CycloneDX', 'YAML and TOML', 'JAR and WAR', 'PEM and DER'],
    answers: [0],
    explanation:
      'SPDX (ISO standard, strong licence focus) and CycloneDX (OWASP, strong security focus) are the two dominant SBOM formats, and most tooling supports both.',
  },
  {
    id: 'br-sup-007',
    topic: 'Supply Chain & Packaging',
    difficulty: 'hard',
    question: 'What does VEX add on top of an SBOM?',
    options: [
      'A statement about whether a listed vulnerability is actually exploitable in this product, reducing false-positive noise',
      'A list of all vulnerabilities',
      'The build provenance',
      'The artifact signature',
    ],
    answers: [0],
    explanation:
      'A Vulnerability Exploitability eXchange document lets a vendor assert "present but not affected — the vulnerable code path is unreachable", which is essential at scale.',
  },
  {
    id: 'br-sup-008',
    topic: 'Supply Chain & Packaging',
    difficulty: 'medium',
    question: 'What is typosquatting in a package registry?',
    options: [
      'Publishing a malicious package under a name similar to a popular one to catch installation typos',
      'Renaming a package after publication',
      'Registering a package name without publishing content',
      'Using misleading version numbers',
    ],
    answers: [0],
    explanation:
      'Defences include internal proxies with allow-lists, lock files with integrity hashes, and automated review of newly introduced dependency names.',
  },
  {
    id: 'br-sup-009',
    topic: 'Supply Chain & Packaging',
    difficulty: 'medium',
    question: 'Why are post-install scripts in package managers a supply chain risk?',
    options: [
      'They execute arbitrary code on the developer or CI machine at install time, before any code review of the package content',
      'They slow down installation',
      'They cannot be disabled',
      'They modify the lock file',
    ],
    answers: [0],
    explanation:
      'Running installs with `--ignore-scripts` where feasible, and installing in isolated containers, substantially reduces this exposure.',
  },
  {
    id: 'br-sup-010',
    topic: 'Supply Chain & Packaging',
    difficulty: 'hard',
    question: 'Which controls address a compromised maintainer account publishing a malicious version? (Select all that apply)',
    options: [
      'Pinned versions with integrity hashes so existing builds are unaffected',
      'A cooldown period before newly published versions are eligible for automatic updates',
      'Reviewing dependency update pull requests rather than auto-merging them blindly',
      'Always resolving to the newest available version',
    ],
    answers: [0, 1, 2],
    explanation:
      'Pinning, delay, and review each break the automatic path from a malicious publish to your production build. Always taking the newest version maximises exposure.',
  },
  {
    id: 'br-sup-011',
    topic: 'Supply Chain & Packaging',
    difficulty: 'medium',
    question: 'What is the difference between SAST, DAST, and SCA?',
    options: [
      'SAST analyses source code statically, DAST tests a running application, SCA analyses third-party dependency composition',
      'They are three names for dependency scanning',
      'SAST tests running apps; DAST analyses source',
      'SCA is a type of penetration test',
    ],
    answers: [0],
    explanation:
      'A mature pipeline uses all three at different stages, because each detects a class of issue the others structurally cannot.',
  },
  {
    id: 'br-sup-012',
    topic: 'Supply Chain & Packaging',
    difficulty: 'medium',
    question: 'Why is secret scanning valuable in both pre-commit hooks and CI?',
    options: [
      'The hook prevents most leaks cheaply, while CI catches what bypassed the hook and enforces the policy server-side',
      'CI scanning is faster',
      'Hooks can revoke credentials automatically',
      'Only CI can detect base64-encoded secrets',
    ],
    answers: [0],
    explanation:
      'Defence in depth: developer-side prevention plus server-side enforcement, ideally combined with push protection at the forge and automatic revocation workflows.',
  },
  {
    id: 'br-sup-013',
    topic: 'Supply Chain & Packaging',
    difficulty: 'hard',
    question: 'What is a "trusted publisher" configuration in package registries such as PyPI or npm?',
    options: [
      'The registry accepts uploads authenticated by a CI workflow\'s OIDC identity instead of a long-lived API token',
      'A manually maintained list of approved maintainers',
      'A registry mirror inside the corporate network',
      'A signature verification service',
    ],
    answers: [0],
    explanation:
      'Trusted publishing removes the most commonly stolen credential — the publish token — and ties every release to a specific repository and workflow.',
  },
  {
    id: 'br-sup-014',
    topic: 'Supply Chain & Packaging',
    difficulty: 'medium',
    question: 'What does packaging an application as an OS package (deb/rpm) provide that a bare tarball does not? (Select all that apply)',
    options: [
      'Declared dependencies resolved by the system package manager',
      'Standard install/upgrade/remove lifecycle with scriptlets',
      'A file manifest enabling verification and clean removal',
      'Guaranteed cross-distribution portability',
    ],
    answers: [0, 1, 2],
    explanation:
      'Native packages integrate with system management, but each distribution family has its own format and conventions, so portability is not automatic.',
  },
  {
    id: 'br-sup-015',
    topic: 'Supply Chain & Packaging',
    difficulty: 'medium',
    question: 'Why should a release pipeline record the exact toolchain versions used?',
    options: [
      'Compiler and tool versions materially affect the output, so they are part of the artifact\'s provenance and reproducibility story',
      'It speeds up subsequent builds',
      'Registries require it',
      'It reduces the artifact size',
    ],
    answers: [0],
    explanation:
      'Without recorded toolchain versions you cannot reproduce an old release to investigate a defect or verify a reported binary.',
  },
  {
    id: 'br-sup-016',
    topic: 'Supply Chain & Packaging',
    difficulty: 'hard',
    question: 'What was the core lesson of the Codecov bash-uploader incident for build engineers?',
    options: [
      'Piping a remotely fetched script directly into a shell in CI gives the remote party arbitrary access to the build environment and its secrets',
      'Code coverage tools should not be used',
      'CI logs should be public',
      'Bash is unsuitable for automation',
    ],
    answers: [0],
    explanation:
      '`curl | bash` in CI is an unverified, mutable dependency executed with full pipeline privileges. Pin and checksum-verify any fetched tooling instead.',
  },
  {
    id: 'br-sup-017',
    topic: 'Supply Chain & Packaging',
    difficulty: 'medium',
    question: 'Why is minimising the number of writers to a production registry important?',
    options: [
      'Every writer is a potential source of unverified artifacts, so restricting publication to the release pipeline preserves provenance guarantees',
      'Registries limit concurrent writers',
      'It reduces storage costs',
      'It improves pull performance',
    ],
    answers: [0],
    explanation:
      'If any engineer can push to the production registry, signature and provenance checks become the only real control — and they only help if they are enforced at deploy time.',
  },
  {
    id: 'br-sup-018',
    topic: 'Supply Chain & Packaging',
    difficulty: 'medium',
    question: 'What is the purpose of a transparency log such as Rekor?',
    options: [
      'It provides a tamper-evident public record of signing events, so a signature cannot be created secretly and later denied or hidden',
      'It stores the artifacts themselves',
      'It scans for vulnerabilities',
      'It hosts public keys only',
    ],
    answers: [0],
    explanation:
      'Append-only, auditable logs let consumers detect unexpected signing activity for a project — a key defence against silently issued malicious releases.',
  },
  {
    id: 'br-sup-019',
    topic: 'Supply Chain & Packaging',
    difficulty: 'hard',
    question: 'Which measures reduce the risk of a build-time backdoor being injected without detection? (Select all that apply)',
    options: [
      'Reproducible builds verified independently by a second builder',
      'Hermetic builds with no network access during compilation',
      'Signed provenance tying the artifact to a reviewed source commit',
      'Trusting the artifact because CI produced it',
    ],
    answers: [0, 1, 2],
    explanation:
      'Independent reproduction, hermeticity, and provenance provide verifiable evidence. "CI built it" is an assumption, and CI itself is a target.',
  },
  {
    id: 'br-sup-020',
    topic: 'Supply Chain & Packaging',
    difficulty: 'medium',
    question: 'Why should base images and build tool images be mirrored internally?',
    options: [
      'It removes dependence on upstream availability and rate limits, and gives a point to scan and approve images before use',
      'Mirrored images build faster',
      'It avoids the need for signatures',
      'Upstream registries do not support pinning',
    ],
    answers: [0],
    explanation:
      'An internal mirror also creates an inventory of exactly which base images are in use, which is invaluable during a base-image CVE response.',
  },
  {
    id: 'br-sup-021',
    topic: 'Supply Chain & Packaging',
    difficulty: 'medium',
    question: 'What is the practical purpose of a "golden path" or paved road in platform engineering?',
    options: [
      'A supported, opinionated default toolchain and pipeline that makes the secure, compliant option the easiest one',
      'A mandatory process with no exceptions',
      'A migration plan for legacy systems',
      'A high-priority build queue',
    ],
    answers: [0],
    explanation:
      'Paved roads scale governance through convenience rather than enforcement: most teams adopt them because they are faster, and controls come along for free.',
  },
  {
    id: 'br-sup-022',
    topic: 'Supply Chain & Packaging',
    difficulty: 'medium',
    question: 'Why is it important to distinguish direct from transitive dependencies in vulnerability reports?',
    options: [
      'The remediation differs: direct dependencies you upgrade yourself, transitive ones may need an upstream fix, an override, or a pin',
      'Transitive dependencies are never exploitable',
      'Direct dependencies do not need patching',
      'Scanners cannot detect transitive dependencies',
    ],
    answers: [0],
    explanation:
      'Package managers offer override/resolution mechanisms (npm `overrides`, Gradle `resolutionStrategy`, Maven `dependencyManagement`) for the transitive case.',
  },
  {
    id: 'br-sup-023',
    topic: 'Supply Chain & Packaging',
    difficulty: 'hard',
    question: 'What risk does allowing pipelines to run arbitrary code from a pull request branch on a self-hosted runner create?',
    options: [
      'Attacker-controlled code executes inside your network with the runner\'s identity and any ambient cloud credentials',
      'The pull request cannot be merged',
      'The build cache is invalidated',
      'Only increased build cost',
    ],
    answers: [0],
    explanation:
      'This is one of the most exploited CI misconfigurations. Require approval for first-time contributors, use ephemeral runners, and keep credentials out of PR-triggered jobs.',
  },
  {
    id: 'br-sup-024',
    topic: 'Supply Chain & Packaging',
    difficulty: 'medium',
    question: 'What should a release artifact\'s retention policy consider for regulated products?',
    options: [
      'Artifacts, SBOMs, provenance, and build logs may need retention for the supported lifetime of the release plus any statutory period',
      'Only the latest release needs retention',
      'Retention is unnecessary if the source is retained',
      'Artifacts should be deleted after deployment',
    ],
    answers: [0],
    explanation:
      'Source alone is insufficient without a reproducible build; retaining the artifact plus its metadata is what lets you answer questions about a shipped version years later.',
  },
  {
    id: 'br-sup-025',
    topic: 'Supply Chain & Packaging',
    difficulty: 'medium',
    question: 'Why should the build/release team own an inventory mapping "version deployed" to "environment"?',
    options: [
      'It is the prerequisite for answering impact questions during incidents, CVE response, and audits',
      'It reduces deployment time',
      'It is required by SemVer',
      'It replaces the need for monitoring',
    ],
    answers: [0],
    explanation:
      'Without this mapping, every security or reliability question turns into a manual investigation across environments. GitOps repositories provide it naturally.',
  },
];
