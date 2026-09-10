import type { Question } from '../../types';

export const linuxQuestions: Question[] = [
  {
    id: 'do-lnx-001',
    topic: 'Linux & Scripting',
    difficulty: 'easy',
    question: 'What does the load average reported by `uptime` represent on Linux?',
    options: [
      'CPU utilisation percentage',
      'The average number of processes runnable or in uninterruptible sleep over 1, 5, and 15 minutes',
      'The number of logged-in users',
      'Memory pressure',
    ],
    answers: [1],
    explanation:
      'Because Linux includes uninterruptible (usually disk I/O) waits, a high load average can indicate an I/O bottleneck even when CPUs are mostly idle.',
  },
  {
    id: 'do-lnx-002',
    topic: 'Linux & Scripting',
    difficulty: 'medium',
    question: 'A disk shows plenty of free space in `df -h` but writes fail with "No space left on device". What should you check?',
    options: [
      'Inode exhaustion with `df -i`',
      'CPU steal time',
      'The swap partition size',
      'The DNS resolver configuration',
    ],
    answers: [0],
    explanation:
      'Filesystems have a fixed inode count. Millions of tiny files (session data, cache entries, log fragments) can exhaust inodes while blocks remain free.',
  },
  {
    id: 'do-lnx-003',
    topic: 'Linux & Scripting',
    difficulty: 'medium',
    question: 'You deleted a large log file but disk usage did not drop. Why?',
    options: [
      'A process still holds the file open, so the inode is not released until that file descriptor is closed',
      'The filesystem needs a reboot to update',
      '`df` caches results for an hour',
      'The file was on a read-only mount',
    ],
    answers: [0],
    explanation:
      'Use `lsof +L1` to find deleted-but-open files. Truncating (`: > file`) or signalling the process to reopen its log is the proper fix; log rotation with copytruncate or reopen signals avoids this.',
  },
  {
    id: 'do-lnx-004',
    topic: 'Linux & Scripting',
    difficulty: 'medium',
    question: 'Which commands help identify what is consuming CPU on a Linux host? (Select all that apply)',
    options: ['top / htop', 'pidstat', 'perf top', 'ifconfig'],
    answers: [0, 1, 2],
    explanation:
      '`top`/`htop` show per-process usage, `pidstat` gives per-task breakdowns over intervals, and `perf top` samples down to the function level. `ifconfig` reports network interfaces.',
  },
  {
    id: 'do-lnx-005',
    topic: 'Linux & Scripting',
    difficulty: 'easy',
    question: 'What do the permission bits `755` on a directory mean?',
    options: [
      'Owner may read, write, and traverse; group and others may read and traverse',
      'Everyone has full access',
      'Only root may access it',
      'The directory is immutable',
    ],
    answers: [0],
    explanation:
      'On directories the execute bit means "may traverse into", and the read bit means "may list contents". Without execute, you cannot access files inside even if you know their names.',
  },
  {
    id: 'do-lnx-006',
    topic: 'Linux & Scripting',
    difficulty: 'medium',
    question: 'What does `set -euo pipefail` do at the top of a bash script?',
    options: [
      'Exit on error, treat unset variables as errors, and make a pipeline fail if any stage fails',
      'Enable verbose tracing',
      'Run the script in a subshell',
      'Disable globbing',
    ],
    answers: [0],
    explanation:
      'Without these, a failing command mid-script is silently ignored, a typo in a variable expands to empty (dangerously, e.g. `rm -rf "$DIR"/`), and only the last command in a pipeline determines the exit status.',
  },
  {
    id: 'do-lnx-007',
    topic: 'Linux & Scripting',
    difficulty: 'medium',
    question: 'Why should shell variables be quoted as `"$var"` rather than `$var`?',
    options: [
      'Unquoted expansion undergoes word splitting and globbing, which breaks on spaces, tabs, and wildcard characters',
      'Quoting makes scripts run faster',
      'Unquoted variables are not exported',
      'Quoting is required for numeric values',
    ],
    answers: [0],
    explanation:
      'Unquoted variables are the most common source of shell bugs and injection issues, especially with filenames containing spaces or user-supplied input.',
  },
  {
    id: 'do-lnx-008',
    topic: 'Linux & Scripting',
    difficulty: 'medium',
    question: 'What is the difference between a hard link and a symbolic link?',
    options: [
      'A hard link is another directory entry pointing at the same inode; a symlink is a separate file containing a path',
      'A symlink shares the inode; a hard link stores a path',
      'Hard links can cross filesystems; symlinks cannot',
      'They behave identically',
    ],
    answers: [0],
    explanation:
      'Hard links cannot cross filesystem boundaries and keep data alive until the last link is removed. Symlinks can dangle if the target moves or is deleted.',
  },
  {
    id: 'do-lnx-009',
    topic: 'Linux & Scripting',
    difficulty: 'hard',
    question: 'A process is stuck in state `D` in `ps`. What does that indicate?',
    options: [
      'Uninterruptible sleep — usually blocked on I/O, and it cannot be killed with SIGKILL until the I/O completes',
      'Defunct/zombie',
      'Debugging mode',
      'Detached from the terminal',
    ],
    answers: [0],
    explanation:
      'D-state processes typically point at storage or network filesystem problems (NFS hangs, failing disks). The fix is at the I/O layer, not the process.',
  },
  {
    id: 'do-lnx-010',
    topic: 'Linux & Scripting',
    difficulty: 'medium',
    question: 'Which tools help diagnose a connectivity problem between two hosts? (Select all that apply)',
    options: ['ss / netstat to inspect sockets and listening ports', 'tcpdump to capture packets', 'dig to verify DNS resolution', 'chmod to fix permissions'],
    answers: [0, 1, 2],
    explanation:
      'Work down the stack: does the name resolve (dig), is anything listening and are connections established (ss), and do packets actually arrive (tcpdump)?',
  },
  {
    id: 'do-lnx-011',
    topic: 'Linux & Scripting',
    difficulty: 'medium',
    question: 'What does `systemctl` `Restart=on-failure` combined with `RestartSec` provide?',
    options: [
      'Automatic restart of the unit after non-zero exits, with a delay to avoid tight restart loops',
      'A one-time restart at boot',
      'Restart only on manual command',
      'Restart when memory limits are reached',
    ],
    answers: [0],
    explanation:
      'systemd also has `StartLimitBurst`/`StartLimitIntervalSec` so a persistently failing service enters a failed state rather than looping forever.',
  },
  {
    id: 'do-lnx-012',
    topic: 'Linux & Scripting',
    difficulty: 'medium',
    question: 'In Git, what does `git rebase` do compared with `git merge`?',
    options: [
      'Rebase replays commits onto a new base, producing a linear history and new commit SHAs; merge creates a commit joining two histories',
      'Rebase deletes the source branch',
      'Merge rewrites history; rebase does not',
      'They produce identical commit graphs',
    ],
    answers: [0],
    explanation:
      'Rebasing rewrites history, so it should not be done to commits others have already pulled. Merge preserves the true history at the cost of a more complex graph.',
  },
  {
    id: 'do-lnx-013',
    topic: 'Linux & Scripting',
    difficulty: 'medium',
    question: 'Why is `git revert` usually preferred over `git reset --hard` for undoing a change on a shared branch?',
    options: [
      'Revert adds a new commit that undoes the change, preserving history for everyone; reset rewrites history that others have already pulled',
      'Revert is faster',
      'Reset does not work on merge commits',
      'Revert automatically redeploys',
    ],
    answers: [0],
    explanation:
      'Force-pushing a rewritten shared branch breaks every other clone. Revert is a forward-only, auditable correction.',
  },
  {
    id: 'do-lnx-014',
    topic: 'Linux & Scripting',
    difficulty: 'hard',
    question: 'Which approaches safely handle secrets in shell scripts? (Select all that apply)',
    options: [
      'Read the secret from a file descriptor or environment injected by a secrets manager at runtime',
      'Avoid passing secrets as command-line arguments, which are visible in the process table',
      'Disable `set -x` tracing around the secret handling',
      'Echo the secret to the log for debugging',
    ],
    answers: [0, 1, 2],
    explanation:
      'Command-line arguments are world-readable via /proc, and `set -x` prints expanded values into logs. Never log the value itself.',
  },
  {
    id: 'do-lnx-015',
    topic: 'Linux & Scripting',
    difficulty: 'medium',
    question: 'What is the difference between `>` and `>>` in shell redirection?',
    options: [
      '`>` truncates the target file before writing; `>>` appends to it',
      '`>` writes to stderr; `>>` writes to stdout',
      '`>>` is a syntax error in bash',
      'They are equivalent',
    ],
    answers: [0],
    explanation:
      'Use `2>&1` to also redirect stderr, and note that `cmd > file 2>&1` differs from `cmd 2>&1 > file` — order matters because redirections are applied left to right.',
  },
  {
    id: 'do-lnx-016',
    topic: 'Linux & Scripting',
    difficulty: 'easy',
    question: 'What is the purpose of a cron expression\'s five fields?',
    options: [
      'Minute, hour, day of month, month, and day of week',
      'Second, minute, hour, day, and month',
      'Year, month, day, hour, and minute',
      'Priority, minute, hour, day, and user',
    ],
    answers: [0],
    explanation:
      'Note that day-of-month and day-of-week are OR-ed when both are restricted, which surprises people writing "the 1st and only on Mondays".',
  },
  {
    id: 'do-lnx-017',
    topic: 'Linux & Scripting',
    difficulty: 'hard',
    question: 'A cron job runs fine manually but fails under cron. What is the most common cause?',
    options: [
      'Cron runs with a minimal environment — different PATH, no shell profile sourced, and a different working directory',
      'Cron cannot execute shell scripts',
      'Cron requires root',
      'Cron limits scripts to 60 seconds',
    ],
    answers: [0],
    explanation:
      'Use absolute paths, set PATH explicitly in the crontab, and do not rely on variables from .bashrc/.profile, which cron never sources.',
  },
  {
    id: 'do-lnx-018',
    topic: 'Linux & Scripting',
    difficulty: 'medium',
    question: 'What does `ulimit -n` control and why does it matter for servers?',
    options: [
      'The maximum number of open file descriptors, which caps concurrent connections and open files',
      'The maximum number of processes',
      'Network bandwidth',
      'Maximum file size',
    ],
    answers: [0],
    explanation:
      'Every socket is a file descriptor. A default limit of 1024 will cause "too many open files" errors under load; production services usually raise it via systemd `LimitNOFILE`.',
  },
  {
    id: 'do-lnx-019',
    topic: 'Linux & Scripting',
    difficulty: 'medium',
    question: 'Why is `curl -f` (or `--fail`) useful in scripts that download artifacts?',
    options: [
      'It makes curl return a non-zero exit code on HTTP error responses instead of silently saving an error page',
      'It forces HTTPS',
      'It follows redirects',
      'It retries automatically',
    ],
    answers: [0],
    explanation:
      'Without `-f`, a 404 body is written to the output file and the script happily continues with a corrupt "artifact". Pair it with `-sS`, `-L`, and `--retry` in pipelines.',
  },
  {
    id: 'do-lnx-020',
    topic: 'Linux & Scripting',
    difficulty: 'hard',
    question: 'Which practices make an automation script safe to re-run? (Select all that apply)',
    options: [
      'Make operations idempotent — check current state before acting',
      'Use a lock file or flock to prevent concurrent executions',
      'Trap signals to clean up temporary files and partial work',
      'Assume the previous run completed successfully',
    ],
    answers: [0, 1, 2],
    explanation:
      'Automation must survive interruption. Idempotency, mutual exclusion, and cleanup traps let a script be retried safely after any failure.',
  },
];
