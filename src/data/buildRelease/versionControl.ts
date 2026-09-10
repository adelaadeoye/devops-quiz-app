import type { Question } from '../../types';

export const versionControlQuestions: Question[] = [
  {
    id: 'br-vcs-001',
    topic: 'Version Control & Branching',
    difficulty: 'easy',
    question: 'What is the main characteristic of GitFlow?',
    options: [
      'Long-lived develop and master branches plus feature, release, and hotfix branches',
      'A single trunk with no branches',
      'One branch per developer, merged monthly',
      'Branches named after tickets only',
    ],
    answers: [0],
    explanation:
      'GitFlow suits versioned, scheduled releases of installed software. Its branch overhead and merge complexity make it a poor fit for continuously delivered web services.',
  },
  {
    id: 'br-vcs-002',
    topic: 'Version Control & Branching',
    difficulty: 'medium',
    question: 'Why does trunk-based development reduce integration risk?',
    options: [
      'Small, frequent merges keep divergence — and therefore conflict size and semantic drift — minimal',
      'It prevents merge conflicts entirely',
      'It removes the need for code review',
      'It requires fewer builds',
    ],
    answers: [0],
    explanation:
      'Merge pain grows superlinearly with branch age. Integrating daily bounds it, and feature flags let incomplete work ship dormant.',
  },
  {
    id: 'br-vcs-003',
    topic: 'Version Control & Branching',
    difficulty: 'medium',
    question: 'What is a release branch used for?',
    options: [
      'Stabilising a specific release line, accepting only targeted fixes while the mainline continues forward',
      'Holding all in-progress features',
      'Storing build artifacts',
      'Tracking a single developer\'s work',
    ],
    answers: [0],
    explanation:
      'Release branches decouple stabilisation from ongoing development. Fixes should land on the mainline first and then be cherry-picked to avoid regressions in the next release.',
  },
  {
    id: 'br-vcs-004',
    topic: 'Version Control & Branching',
    difficulty: 'medium',
    question: 'Why should a hotfix be applied to the mainline as well as the release branch?',
    options: [
      'Otherwise the next release regresses, reintroducing the bug the hotfix repaired',
      'Git requires it',
      'To keep commit counts equal',
      'To reduce repository size',
    ],
    answers: [0],
    explanation:
      'Forward-porting every hotfix is a non-negotiable discipline in any branch-per-release model; teams usually automate a reminder or an auto-merge to enforce it.',
  },
  {
    id: 'br-vcs-005',
    topic: 'Version Control & Branching',
    difficulty: 'hard',
    question: 'What does `git cherry-pick` do and what is its main hazard?',
    options: [
      'It applies a commit\'s changes as a new commit elsewhere; the duplicate content can cause conflicts or double-application when branches are later merged',
      'It merges two branches',
      'It moves a commit, deleting the original',
      'It reverts a commit',
    ],
    answers: [0],
    explanation:
      'The cherry-picked commit has a different SHA, so Git does not automatically know the change already exists. `git cherry` and patch-id matching help detect duplicates.',
  },
  {
    id: 'br-vcs-006',
    topic: 'Version Control & Branching',
    difficulty: 'medium',
    question: 'What is the difference between an annotated tag and a lightweight tag in Git?',
    options: [
      'An annotated tag is a full object with tagger, date, message, and optional signature; a lightweight tag is just a pointer to a commit',
      'Lightweight tags cannot be pushed',
      'Annotated tags are mutable',
      'Lightweight tags support signing',
    ],
    answers: [0],
    explanation:
      'Releases should use annotated (and ideally signed) tags so there is a verifiable record of who cut the release and when.',
  },
  {
    id: 'br-vcs-007',
    topic: 'Version Control & Branching',
    difficulty: 'medium',
    question: 'Why should release tags be immutable?',
    options: [
      'A moved tag makes "version 1.4.2" ambiguous, breaking reproducibility, audit trails, and downstream consumers who pinned it',
      'Git performance degrades with mutable tags',
      'Registries reject moved tags',
      'Tags cannot be deleted anyway',
    ],
    answers: [0],
    explanation:
      'Many forges support tag protection rules to enforce this. If a release is bad, publish a new version rather than redefining an existing one.',
  },
  {
    id: 'br-vcs-008',
    topic: 'Version Control & Branching',
    difficulty: 'medium',
    question: 'Which branch protection rules meaningfully improve release integrity? (Select all that apply)',
    options: [
      'Require pull request review before merge',
      'Require status checks to pass and branches to be up to date',
      'Disallow force pushes and branch deletion',
      'Allow administrators to bypass all rules routinely',
    ],
    answers: [0, 1, 2],
    explanation:
      'Routine admin bypass defeats the control and, worse, hides that it is being defeated. Break-glass should be rare, logged, and reviewed.',
  },
  {
    id: 'br-vcs-009',
    topic: 'Version Control & Branching',
    difficulty: 'hard',
    question: 'What problem does a merge queue (merge train) solve?',
    options: [
      'It re-tests each PR against the actual post-merge state of the mainline in order, preventing semantically conflicting but individually green PRs from breaking trunk',
      'It speeds up code review',
      'It reduces the number of builds',
      'It rebases all open branches automatically',
    ],
    answers: [0],
    explanation:
      'Two PRs can each pass against an older base and still break when combined. The queue serialises and validates the real merge result before landing.',
  },
  {
    id: 'br-vcs-010',
    topic: 'Version Control & Branching',
    difficulty: 'medium',
    question: 'What does a squash merge do?',
    options: [
      'Combines all commits from a branch into one commit on the target branch',
      'Deletes the branch history from the repository entirely',
      'Rebases the branch without merging',
      'Merges without creating any commit',
    ],
    answers: [0],
    explanation:
      'Squashing gives a clean, bisectable mainline where each commit is one logical change, at the cost of losing intermediate development history.',
  },
  {
    id: 'br-vcs-011',
    topic: 'Version Control & Branching',
    difficulty: 'medium',
    question: 'How does `git bisect` help a release engineer?',
    options: [
      'It binary-searches commit history to find the commit that introduced a regression',
      'It splits a large commit into smaller ones',
      'It compares two branches',
      'It removes merge commits',
    ],
    answers: [0],
    explanation:
      'Bisect is dramatically more effective when the mainline is always green and each commit is small and self-contained — another argument for a merge queue and squashed logical commits.',
  },
  {
    id: 'br-vcs-012',
    topic: 'Version Control & Branching',
    difficulty: 'hard',
    question: 'Which are genuine trade-offs of a monorepo compared with many small repos? (Select all that apply)',
    options: [
      'Atomic cross-project changes become possible',
      'Tooling must scale to repository size (sparse checkout, partial clone, build graph awareness)',
      'Access control granularity is harder to express',
      'Each project automatically gets an independent release cadence',
    ],
    answers: [0, 1, 2],
    explanation:
      'Monorepos give atomic refactors and one dependency version, but need investment in scaling tooling and access control. Independent cadence requires deliberate release tooling either way.',
  },
  {
    id: 'br-vcs-013',
    topic: 'Version Control & Branching',
    difficulty: 'medium',
    question: 'What is a Git submodule and why is it often problematic?',
    options: [
      'A pinned pointer to a commit in another repository; it is easy to forget to update or initialise, producing inconsistent checkouts',
      'A branch inside a branch',
      'A compressed copy of dependencies',
      'A hook that runs on commit',
    ],
    answers: [0],
    explanation:
      'Submodules are precise but ergonomically hostile. Package managers or subtree/vendoring approaches are usually less error-prone for dependency sharing.',
  },
  {
    id: 'br-vcs-014',
    topic: 'Version Control & Branching',
    difficulty: 'medium',
    question: 'Why is Git LFS used for large binary assets?',
    options: [
      'Git stores full snapshots of every version; large binaries bloat clone size permanently, while LFS keeps pointers and fetches blobs on demand',
      'Git cannot store files over 1 MB',
      'LFS compresses binaries better',
      'LFS provides file locking only',
    ],
    answers: [0],
    explanation:
      'Because history is immutable, a large binary committed once inflates every future clone. LFS (or an artifact repository) keeps the source repo lean.',
  },
  {
    id: 'br-vcs-015',
    topic: 'Version Control & Branching',
    difficulty: 'hard',
    question: 'A secret was committed and pushed, then removed in a follow-up commit. What must happen?',
    options: [
      'Rotate the secret immediately; history rewriting alone cannot guarantee no one already fetched it',
      'Nothing, the removal commit is sufficient',
      'Only force-push the rewritten history',
      'Mark the repository private',
    ],
    answers: [0],
    explanation:
      'Assume compromise. Rotate first, then optionally purge history with filter-repo/BFG and invalidate caches, forks, and CI artifacts.',
  },
  {
    id: 'br-vcs-016',
    topic: 'Version Control & Branching',
    difficulty: 'medium',
    question: 'What is the purpose of a CODEOWNERS file?',
    options: [
      'It automatically requests (and can require) review from the responsible owners of the changed paths',
      'It lists repository administrators',
      'It defines the licence holders',
      'It restricts who can clone the repository',
    ],
    answers: [0],
    explanation:
      'Combined with branch protection requiring code-owner review, it enforces that changes to sensitive paths (pipelines, IaC, crypto) get expert eyes.',
  },
  {
    id: 'br-vcs-017',
    topic: 'Version Control & Branching',
    difficulty: 'medium',
    question: 'What does a signed commit or tag prove?',
    options: [
      'That the object was created by the holder of a specific key, giving verifiable authorship provenance',
      'That the code compiles',
      'That the change was reviewed',
      'That the commit cannot be reverted',
    ],
    answers: [0],
    explanation:
      'Git author fields are trivially forgeable. Signatures (GPG, SSH, or Sigstore/gitsign) let pipelines verify who really produced the release commit.',
  },
  {
    id: 'br-vcs-018',
    topic: 'Version Control & Branching',
    difficulty: 'easy',
    question: 'What does the `.gitattributes` setting `* text=auto` control?',
    options: [
      'Line-ending normalisation between the working tree and the repository',
      'File permissions',
      'Which files are ignored',
      'Merge strategy per file',
    ],
    answers: [0],
    explanation:
      'Without normalisation, mixed CRLF/LF across Windows and Linux contributors causes noisy diffs and can break shell scripts and shebang lines in builds.',
  },
  {
    id: 'br-vcs-019',
    topic: 'Version Control & Branching',
    difficulty: 'hard',
    question: 'What does `git merge --no-ff` guarantee and why might a release process want it?',
    options: [
      'It always creates a merge commit, preserving an explicit, revertible record of the integration',
      'It skips conflict resolution',
      'It merges without running hooks',
      'It rebases instead of merging',
    ],
    answers: [0],
    explanation:
      'A merge commit makes the feature\'s integration point visible and lets the whole feature be reverted with a single `git revert -m 1`.',
  },
  {
    id: 'br-vcs-020',
    topic: 'Version Control & Branching',
    difficulty: 'medium',
    question: 'What is a shallow clone (`--depth 1`) useful for in CI?',
    options: [
      'It fetches only recent history, greatly reducing checkout time and bandwidth for large repositories',
      'It removes untracked files',
      'It disables hooks',
      'It clones only one branch\'s files without history metadata at all',
    ],
    answers: [0],
    explanation:
      'Beware: shallow clones break operations needing history, such as `git describe` for versioning or computing a diff against a base commit — fetch the needed depth in that case.',
  },
  {
    id: 'br-vcs-021',
    topic: 'Version Control & Branching',
    difficulty: 'medium',
    question: 'Which branching model best supports supporting several customer versions simultaneously?',
    options: [
      'Maintenance branches per supported major/minor version with fixes forward-ported to the mainline',
      'Trunk-only with no branches',
      'A branch per developer',
      'Rebasing all history onto one branch weekly',
    ],
    answers: [0],
    explanation:
      'Long-term-support lines require dedicated maintenance branches, an explicit support policy, and disciplined backport/forward-port rules.',
  },
  {
    id: 'br-vcs-022',
    topic: 'Version Control & Branching',
    difficulty: 'hard',
    question: 'Why can a green CI status on a pull request still be misleading? (Select all that apply)',
    options: [
      'The PR may have been tested against a stale base commit',
      'Required checks might not cover the changed area',
      'Flaky tests may have passed by chance',
      'CI status is cryptographically unverifiable',
    ],
    answers: [0, 1, 2],
    explanation:
      'Stale bases, coverage gaps, and flakes all weaken the signal. Merge queues, coverage requirements, and flake tracking are the countermeasures.',
  },
  {
    id: 'br-vcs-023',
    topic: 'Version Control & Branching',
    difficulty: 'medium',
    question: 'What is the purpose of conventional commit messages (feat:, fix:, BREAKING CHANGE:)?',
    options: [
      'They allow tooling to derive the next semantic version and generate changelogs automatically',
      'They enforce a maximum message length',
      'They speed up Git operations',
      'They are required by Git',
    ],
    answers: [0],
    explanation:
      'A machine-readable commit convention is what makes fully automated semantic versioning and release notes possible.',
  },
  {
    id: 'br-vcs-024',
    topic: 'Version Control & Branching',
    difficulty: 'medium',
    question: 'What does `git describe --tags` produce and why is it useful in builds?',
    options: [
      'A human-readable version derived from the nearest tag plus commit distance and SHA, ideal for stamping non-release builds',
      'A list of all tags in the repository',
      'The commit message of the latest tag',
      'The diff since the last tag',
    ],
    answers: [0],
    explanation:
      'Something like `v1.4.2-7-g3af1c9d` tells you exactly which release the artifact is based on and how far it has drifted.',
  },
  {
    id: 'br-vcs-025',
    topic: 'Version Control & Branching',
    difficulty: 'medium',
    question: 'Why are pre-commit hooks alone insufficient as a policy control?',
    options: [
      'They run on the developer\'s machine and can be bypassed with `--no-verify`, so the same checks must also run server-side in CI',
      'They cannot run linters',
      'They only work on Linux',
      'They slow down cloning',
    ],
    answers: [0],
    explanation:
      'Treat local hooks as a fast convenience for developers and CI as the authoritative gate.',
  },
  {
    id: 'br-vcs-026',
    topic: 'Version Control & Branching',
    difficulty: 'hard',
    question: 'A team wants to revert an entire feature that was merged as a merge commit. What is the correct command?',
    options: [
      '`git revert -m 1 <merge-sha>` to revert relative to the first parent (the mainline)',
      '`git reset --hard <merge-sha>`',
      '`git revert <merge-sha>` with no options',
      '`git checkout <merge-sha>`',
    ],
    answers: [0],
    explanation:
      'Reverting a merge requires specifying which parent is the mainline. Note that re-merging the branch later needs the revert itself to be reverted first.',
  },
];
