import type { Question } from '../../types';

export const buildSystemQuestions: Question[] = [
  {
    id: 'br-bld-001',
    topic: 'Build Systems',
    difficulty: 'easy',
    question: 'What is an incremental build?',
    options: [
      'A build that only recompiles targets whose inputs have changed since the last build',
      'A build that runs in stages across multiple machines',
      'A build that increments the version number',
      'A build that appends to the previous artifact',
    ],
    answers: [0],
    explanation:
      'Incremental builds rely on accurate dependency graphs and change detection (timestamps or content hashes). Incorrect dependency declarations cause stale outputs — the classic "clean build fixes it" symptom.',
  },
  {
    id: 'br-bld-002',
    topic: 'Build Systems',
    difficulty: 'medium',
    question: 'What makes a build hermetic?',
    options: [
      'It depends only on explicitly declared inputs and a pinned toolchain, isolated from ambient system state',
      'It runs inside a container',
      'It produces a single output file',
      'It never accesses the network',
    ],
    answers: [0],
    explanation:
      'Hermeticity is about declared, complete inputs. Containers and network isolation are common enforcement mechanisms, but a containerised build that reads an undeclared host tool is still not hermetic.',
  },
  {
    id: 'br-bld-003',
    topic: 'Build Systems',
    difficulty: 'medium',
    question: 'What is a reproducible (deterministic) build?',
    options: [
      'Building the same source with the same inputs produces bit-for-bit identical artifacts',
      'A build that can be re-run without errors',
      'A build whose logs are archived',
      'A build that always uses the latest dependencies',
    ],
    answers: [0],
    explanation:
      'Reproducibility lets independent parties verify that a binary corresponds to the claimed source, which is the foundation of supply-chain trust.',
  },
  {
    id: 'br-bld-004',
    topic: 'Build Systems',
    difficulty: 'hard',
    question: 'Which factors commonly break bit-for-bit reproducibility? (Select all that apply)',
    options: [
      'Embedded build timestamps',
      'Absolute paths baked into debug information',
      'Non-deterministic file ordering when creating archives',
      'Using the same compiler version on every machine',
    ],
    answers: [0, 1, 2],
    explanation:
      'Fixes include SOURCE_DATE_EPOCH, path remapping flags (`-fdebug-prefix-map`, `-trimpath`), and sorting archive entries with normalised metadata. A pinned compiler helps reproducibility rather than harming it.',
  },
  {
    id: 'br-bld-005',
    topic: 'Build Systems',
    difficulty: 'medium',
    question: 'How does a content-addressed build cache decide whether it can reuse a previous result?',
    options: [
      'It hashes all declared inputs — sources, tool versions, flags, and dependency outputs — and looks up that key',
      'It compares file modification times only',
      'It checks whether the branch name matches',
      'It reuses results from the last 24 hours',
    ],
    answers: [0],
    explanation:
      'Input hashing is what makes remote caching safe and shareable across machines and users, unlike timestamp-based staleness checks that are machine-local and easily fooled.',
  },
  {
    id: 'br-bld-006',
    topic: 'Build Systems',
    difficulty: 'hard',
    question: 'Why is an underdeclared dependency in a build graph dangerous even when the build succeeds?',
    options: [
      'The cache key omits a real input, so a change to that input can serve a stale cached artifact',
      'It slows the build down',
      'It causes the linker to emit warnings',
      'It has no practical consequence',
    ],
    answers: [0],
    explanation:
      'Correctness of a caching build system rests entirely on complete input declarations. Sandboxed execution is used to detect undeclared reads at build time.',
  },
  {
    id: 'br-bld-007',
    topic: 'Build Systems',
    difficulty: 'medium',
    question: 'What advantage does remote execution offer over remote caching alone?',
    options: [
      'Build actions themselves run on a scalable worker pool, so a large graph is built in parallel far beyond one machine\'s cores',
      'It compresses artifacts better',
      'It removes the need for a dependency graph',
      'It guarantees reproducibility',
    ],
    answers: [0],
    explanation:
      'Remote execution (Bazel/Buck2/RE API) distributes actions and returns outputs, while remote caching only avoids repeating work already done somewhere.',
  },
  {
    id: 'br-bld-008',
    topic: 'Build Systems',
    difficulty: 'medium',
    question: 'What problem does a build tool wrapper (e.g. Gradle wrapper, Maven wrapper) solve?',
    options: [
      'It pins and auto-downloads the exact build tool version, so every developer and CI agent uses the same one',
      'It compresses the build output',
      'It caches dependencies locally',
      'It generates the project scaffolding',
    ],
    answers: [0],
    explanation:
      'Removing "which version of the build tool do you have installed?" from the equation eliminates a whole class of works-on-my-machine failures.',
  },
  {
    id: 'br-bld-009',
    topic: 'Build Systems',
    difficulty: 'easy',
    question: 'In Make, what does a phony target such as `.PHONY: clean` declare?',
    options: [
      'That the target name does not correspond to a file, so the recipe always runs',
      'That the target should be skipped',
      'That the target is deprecated',
      'That the target runs in parallel',
    ],
    answers: [0],
    explanation:
      'Without .PHONY, a file named `clean` in the directory would make Make consider the target up to date and skip the recipe.',
  },
  {
    id: 'br-bld-010',
    topic: 'Build Systems',
    difficulty: 'medium',
    question: 'Why can `make -j` (parallel make) intermittently fail on a project that builds fine serially?',
    options: [
      'Missing prerequisite declarations mean targets are built before their real dependencies are ready',
      'Parallel make disables the compiler cache',
      'Make cannot run recipes concurrently',
      'The linker is single-threaded',
    ],
    answers: [0],
    explanation:
      'Serial builds accidentally satisfy ordering by luck. Parallelism exposes every missing edge in the dependency graph as a race.',
  },
  {
    id: 'br-bld-011',
    topic: 'Build Systems',
    difficulty: 'medium',
    question: 'What is the difference between compile-time, link-time, and runtime dependencies?',
    options: [
      'Compile-time is needed to produce object code, link-time to resolve symbols into a binary, and runtime to actually execute',
      'They are the same set at different times',
      'Runtime dependencies are always a superset of compile-time ones',
      'Link-time dependencies only exist in interpreted languages',
    ],
    answers: [0],
    explanation:
      'Distinguishing them keeps deployment artifacts lean (no compilers shipped) and makes vulnerability impact analysis accurate.',
  },
  {
    id: 'br-bld-012',
    topic: 'Build Systems',
    difficulty: 'hard',
    question: 'Which techniques reduce compile time on a large C/C++ codebase? (Select all that apply)',
    options: [
      'A compiler cache such as ccache or sccache',
      'Distributed compilation across many hosts',
      'Reducing header inclusion coupling and using forward declarations',
      'Increasing the optimisation level',
    ],
    answers: [0, 1, 2],
    explanation:
      'Caching, distribution, and cutting the transitive header graph all help. Higher optimisation levels increase compile time.',
  },
  {
    id: 'br-bld-013',
    topic: 'Build Systems',
    difficulty: 'medium',
    question: 'What is cross-compilation?',
    options: [
      'Building on one platform to produce binaries that run on a different target architecture or OS',
      'Compiling two projects at once',
      'Compiling with two different compilers for comparison',
      'Building both debug and release variants',
    ],
    answers: [0],
    explanation:
      'Cross-compiling avoids maintaining native builders for every target, but requires a matching sysroot and toolchain, and complicates running tests on the target.',
  },
  {
    id: 'br-bld-014',
    topic: 'Build Systems',
    difficulty: 'medium',
    question: 'What is the trade-off between static and dynamic linking?',
    options: [
      'Static linking gives self-contained, portable binaries but requires a rebuild to pick up library fixes; dynamic linking shares libraries and patches centrally but adds runtime dependency risk',
      'Static linking always produces smaller binaries',
      'Dynamic linking is always faster at runtime',
      'Static linking is not supported on Linux',
    ],
    answers: [0],
    explanation:
      'For containers, static linking is often preferred because the image already provides isolation, and it enables tiny scratch/distroless base images.',
  },
  {
    id: 'br-bld-015',
    topic: 'Build Systems',
    difficulty: 'medium',
    question: 'Why should build output directories be excluded from version control?',
    options: [
      'They are derived artifacts that bloat history, cause merge conflicts, and can diverge from the source they claim to represent',
      'Git cannot store binary files',
      'They exceed the file size limit',
      'They are automatically regenerated by the IDE',
    ],
    answers: [0],
    explanation:
      'Anything derivable from source belongs in an artifact repository keyed by version, not in the source repository.',
  },
  {
    id: 'br-bld-016',
    topic: 'Build Systems',
    difficulty: 'hard',
    question: 'A monorepo build system reports a cache hit but produces the wrong binary. What is the most likely root cause?',
    options: [
      'A non-hermetic action read an undeclared input (system library, env var, or absolute path) that is not part of the cache key',
      'The cache server ran out of disk',
      'The build ran with too many parallel jobs',
      'The artifact was compressed with a different algorithm',
    ],
    answers: [0],
    explanation:
      'Cache poisoning from non-hermetic actions is the classic failure. Sandboxing and explicitly declaring the toolchain and environment fix it.',
  },
  {
    id: 'br-bld-017',
    topic: 'Build Systems',
    difficulty: 'medium',
    question: 'What is the purpose of a build matrix?',
    options: [
      'To run the same build/test job across combinations of language versions, OSes, and architectures',
      'To visualise build dependencies',
      'To allocate build agents by priority',
      'To store build metadata',
    ],
    answers: [0],
    explanation:
      'Matrices catch platform-specific regressions early. They also multiply cost quickly, so most teams run a reduced matrix per PR and the full matrix nightly.',
  },
  {
    id: 'br-bld-018',
    topic: 'Build Systems',
    difficulty: 'medium',
    question: 'Why should a release build be produced from a clean workspace?',
    options: [
      'Leftover artifacts from previous builds can silently contaminate the output, breaking traceability to source',
      'Clean builds are faster',
      'Incremental builds cannot produce optimised code',
      'The compiler requires it',
    ],
    answers: [0],
    explanation:
      'For day-to-day development, incremental builds are worth the risk. For a release artifact you are going to sign and ship, provenance matters more than speed.',
  },
  {
    id: 'br-bld-019',
    topic: 'Build Systems',
    difficulty: 'easy',
    question: 'What information should be embedded in a build artifact for traceability? (Select all that apply)',
    options: [
      'The exact commit SHA it was built from',
      'The build number or pipeline run ID',
      'The build timestamp and toolchain version',
      'The developer\'s local hostname',
    ],
    answers: [0, 1, 2],
    explanation:
      'Commit, build ID, and toolchain let you reconstruct exactly how an artifact was produced. A developer hostname is noise and can even harm reproducibility.',
  },
  {
    id: 'br-bld-020',
    topic: 'Build Systems',
    difficulty: 'hard',
    question: 'Why is a "clean build passes, incremental build fails" bug worth fixing rather than working around?',
    options: [
      'It indicates a missing or incorrect dependency edge that will eventually produce a silently wrong artifact',
      'It only affects developer laptops',
      'It is caused by disk fragmentation',
      'Incremental builds are deprecated',
    ],
    answers: [0],
    explanation:
      'The visible failure is the lucky case. The same missing edge can just as easily yield a stale-but-successful build that ships broken code.',
  },
  {
    id: 'br-bld-021',
    topic: 'Build Systems',
    difficulty: 'medium',
    question: 'What does a "vendored dependency" mean?',
    options: [
      'The dependency\'s source is copied into the repository so builds do not fetch it from an external network',
      'The dependency is purchased from a vendor',
      'The dependency is loaded at runtime',
      'The dependency is mirrored in a proxy registry',
    ],
    answers: [0],
    explanation:
      'Vendoring maximises build availability and reproducibility but shifts the maintenance and patching burden onto the consuming team.',
  },
  {
    id: 'br-bld-022',
    topic: 'Build Systems',
    difficulty: 'medium',
    question: 'What is the benefit of splitting a build into separate compile, test, and package stages?',
    options: [
      'Failures are localised and each stage can be cached, parallelised, and retried independently',
      'It reduces total CPU usage',
      'It removes the need for a dependency graph',
      'It guarantees hermeticity',
    ],
    answers: [0],
    explanation:
      'Stage separation improves feedback granularity and lets expensive stages be skipped when their inputs have not changed.',
  },
  {
    id: 'br-bld-023',
    topic: 'Build Systems',
    difficulty: 'hard',
    question: 'Which are legitimate ways to speed up a slow test stage without weakening the signal? (Select all that apply)',
    options: [
      'Shard tests across parallel agents by historical duration',
      'Run only tests affected by the change, with a full run on the mainline',
      'Replace slow end-to-end tests with contract tests where the coverage is equivalent',
      'Reduce the assertion count in each test',
    ],
    answers: [0, 1, 2],
    explanation:
      'Sharding, test impact analysis, and moving down the test pyramid preserve confidence. Removing assertions just reduces what the tests detect.',
  },
  {
    id: 'br-bld-024',
    topic: 'Build Systems',
    difficulty: 'medium',
    question: 'Why do many teams separate "build" agents from "deploy" agents with different credentials?',
    options: [
      'Build agents run untrusted code from pull requests; deploy agents hold production credentials, so the roles must not share a trust boundary',
      'Deploy agents need more CPU',
      'It reduces licence costs',
      'Build agents cannot reach the internet',
    ],
    answers: [0],
    explanation:
      'Separating the two prevents a malicious or compromised build from directly acquiring deployment authority.',
  },
  {
    id: 'br-bld-025',
    topic: 'Build Systems',
    difficulty: 'medium',
    question: 'What is a "golden" or reference build image for CI agents?',
    options: [
      'A versioned, pre-baked machine or container image containing the pinned toolchain, so all agents are identical',
      'The fastest available agent type',
      'An image containing the last successful build output',
      'A backup of the CI server',
    ],
    answers: [0],
    explanation:
      'Versioning the agent image makes toolchain upgrades an explicit, reviewable, and revertible change instead of ambient drift across the fleet.',
  },
  {
    id: 'br-bld-026',
    topic: 'Build Systems',
    difficulty: 'hard',
    question: 'A Java build works locally but fails in CI with a `NoSuchMethodError` at runtime. What is the most likely cause?',
    options: [
      'A dependency version conflict — the classpath resolved a different version than the one compiled against',
      'The JVM heap is too small',
      'The source was compiled with the wrong encoding',
      'The test runner is misconfigured',
    ],
    answers: [0],
    explanation:
      'This is classic diamond-dependency/JAR-hell behaviour. Dependency locking, a `dependencyManagement` BOM, or shading resolves the mismatch between compile-time and runtime classpaths.',
  },
];
