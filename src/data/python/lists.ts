import type { Challenge } from '../../types';

export const listChallenges: Challenge[] = [
  {
    id: 'list-001',
    title: 'Sum the even numbers',
    topic: 'list',
    difficulty: 'easy',
    prompt:
      'Write `sum_even(numbers)` that returns the sum of every even value in the list.\n\nAn empty list sums to 0.',
    starter: 'def sum_even(numbers):\n    ...\n',
    tests: [
      { call: 'sum_even([1, 2, 3, 4, 5, 6])', expected: '12' },
      { call: 'sum_even([1, 3, 5])', expected: '0' },
      { call: 'sum_even([])', expected: '0' },
      { call: 'sum_even([-2, -3, 0])', expected: '-2' },
    ],
    solution: 'def sum_even(numbers):\n    return sum(n for n in numbers if n % 2 == 0)\n',
    explanation:
      '`sum()` accepts any iterable, so a generator expression avoids building a throwaway list. `n % 2 == 0` is true for negative evens and for 0 as well. Passing a generator instead of a list comprehension keeps memory constant, which matters once the input is large.',
    hints: [
      'You only want some of the values, then a total.',
      '`sum()` takes any iterable, not just a list.',
      'A generator expression `(n for n in numbers if ...)` can go straight inside `sum()`.',
    ],
  },
  {
    id: 'list-002',
    title: 'Second largest value',
    topic: 'list',
    difficulty: 'easy',
    prompt:
      'Write `second_largest(numbers)` that returns the second largest **distinct** value.\n\nReturn `None` when there are fewer than two distinct values.',
    starter: 'def second_largest(numbers):\n    ...\n',
    tests: [
      { call: 'second_largest([4, 1, 9, 7])', expected: '7' },
      { call: 'second_largest([5, 5, 5])', expected: 'None' },
      { call: 'second_largest([2, 2, 8])', expected: '2' },
      { call: 'second_largest([])', expected: 'None' },
    ],
    solution:
      'def second_largest(numbers):\n    unique = sorted(set(numbers), reverse=True)\n    return unique[1] if len(unique) > 1 else None\n',
    explanation:
      '`set()` collapses duplicates so "second largest" means second *distinct*. Sorting is O(n log n); a single pass tracking the top two values would be O(n) and is the answer an interviewer usually wants next. The length guard covers both the empty list and the all-duplicates case.',
    hints: [
      '"Distinct" is doing a lot of work in that sentence.',
      'Deduplicate first, then sort descending.',
      '`sorted(set(numbers), reverse=True)` — then guard the length before indexing `[1]`.',
    ],
  },
  {
    id: 'list-003',
    title: 'Flatten one level',
    topic: 'list',
    difficulty: 'easy',
    prompt:
      'Write `flatten(rows)` that flattens a list of lists into a single list, preserving order.',
    starter: 'def flatten(rows):\n    ...\n',
    tests: [
      { call: 'flatten([[1, 2], [3], [], [4, 5]])', expected: '[1, 2, 3, 4, 5]' },
      { call: 'flatten([])', expected: '[]' },
      { call: "flatten([['a'], ['b', 'c']])", expected: "['a', 'b', 'c']" },
    ],
    solution: 'def flatten(rows):\n    return [item for row in rows for item in row]\n',
    explanation:
      'In a nested comprehension the `for` clauses read left to right in the same order you would write nested loops: outer loop first, inner loop second. `itertools.chain.from_iterable(rows)` is the idiomatic alternative and is lazy.',
    hints: [
      'Think about the nested loop you would write, then compress it.',
      'A comprehension can carry two `for` clauses.',
      'The clauses read in the same order as the nested loops: outer first, inner second.',
    ],
  },
  {
    id: 'list-004',
    title: 'Chunk a list',
    topic: 'list',
    difficulty: 'medium',
    prompt:
      'Write `chunk(items, size)` that splits a list into consecutive chunks of length `size`.\n\nThe final chunk may be shorter. Return `[]` for an empty input.',
    starter: 'def chunk(items, size):\n    ...\n',
    tests: [
      { call: 'chunk([1, 2, 3, 4, 5], 2)', expected: '[[1, 2], [3, 4], [5]]' },
      { call: 'chunk([1, 2, 3], 3)', expected: '[[1, 2, 3]]' },
      { call: 'chunk([], 4)', expected: '[]' },
      { call: 'chunk([1, 2], 5)', expected: '[[1, 2]]' },
    ],
    solution:
      'def chunk(items, size):\n    return [items[i : i + size] for i in range(0, len(items), size)]\n',
    explanation:
      'The trick is stepping `range` by `size` and letting slicing clamp the final chunk — `items[4:6]` on a 5-element list simply returns one element instead of raising. That clamping behaviour is why slicing beats manual index arithmetic here.',
    hints: [
      'Generate the start index of each chunk, not the elements.',
      '`range(start, stop, step)` can step by more than 1.',
      'Slices never raise IndexError, so `items[i : i + size]` clamps the last chunk for you.',
    ],
  },
  {
    id: 'list-005',
    title: 'Remove duplicates, keep order',
    topic: 'list',
    difficulty: 'medium',
    prompt:
      'Write `dedupe(items)` that removes duplicates while preserving the order of first appearance.',
    starter: 'def dedupe(items):\n    ...\n',
    tests: [
      { call: 'dedupe([3, 1, 3, 2, 1])', expected: '[3, 1, 2]' },
      { call: "dedupe(['a', 'a', 'a'])", expected: "['a']" },
      { call: 'dedupe([])', expected: '[]' },
    ],
    solution:
      'def dedupe(items):\n    seen = set()\n    result = []\n    for item in items:\n        if item not in seen:\n            seen.add(item)\n            result.append(item)\n    return result\n',
    explanation:
      '`list(set(items))` loses order, so you need a `seen` set for O(1) membership plus a result list for order. On Python 3.7+ `list(dict.fromkeys(items))` is a one-line equivalent, because dicts preserve insertion order.',
    hints: [
      '`list(set(items))` is close, but it throws away the thing you need to keep.',
      'Track what you have already emitted in a set, append to a list.',
      'Or in one line: `list(dict.fromkeys(items))`, since dicts keep insertion order.',
    ],
  },
  {
    id: 'list-006',
    title: 'Rotate a list',
    topic: 'list',
    difficulty: 'medium',
    prompt:
      'Write `rotate(items, k)` that rotates the list right by `k` positions and returns a **new** list.\n\n`k` may be larger than the list or negative (rotate left).',
    starter: 'def rotate(items, k):\n    ...\n',
    tests: [
      { call: 'rotate([1, 2, 3, 4, 5], 2)', expected: '[4, 5, 1, 2, 3]' },
      { call: 'rotate([1, 2, 3], 3)', expected: '[1, 2, 3]' },
      { call: 'rotate([1, 2, 3], -1)', expected: '[2, 3, 1]' },
      { call: 'rotate([], 3)', expected: '[]' },
      {
        setup: 'original = [1, 2, 3]',
        call: 'rotate(original, 1)\noriginal',
        expected: '[1, 2, 3]',
      },
    ],
    solution:
      'def rotate(items, k):\n    if not items:\n        return []\n    k %= len(items)\n    return items[-k:] + items[:-k]\n',
    explanation:
      "`k %= len(items)` normalises oversized and negative shifts in one step, because Python's `%` always returns a non-negative result for a positive modulus. The empty-list guard matters: `k % 0` raises ZeroDivisionError. The last test checks you returned a new list rather than mutating the caller's.",
    hints: [
      'A rotation by `len(items)` changes nothing — use that.',
      'Normalise `k` with the modulo operator first, but guard the empty list.',
      'Then it is two slices concatenated: `items[-k:] + items[:-k]`.',
    ],
  },
  {
    id: 'list-007',
    title: 'Running totals',
    topic: 'list',
    difficulty: 'easy',
    prompt:
      'Write `running_totals(numbers)` returning a list where each element is the cumulative sum up to that index.',
    starter: 'def running_totals(numbers):\n    ...\n',
    tests: [
      { call: 'running_totals([1, 2, 3, 4])', expected: '[1, 3, 6, 10]' },
      { call: 'running_totals([])', expected: '[]' },
      { call: 'running_totals([5])', expected: '[5]' },
      { call: 'running_totals([2, -2, 2])', expected: '[2, 0, 2]' },
    ],
    solution:
      'def running_totals(numbers):\n    total = 0\n    result = []\n    for n in numbers:\n        total += n\n        result.append(total)\n    return result\n',
    explanation:
      'The stdlib answer is `list(itertools.accumulate(numbers))`. Writing the loop by hand is still worth knowing because interviewers often ask you to generalise it to any binary operation — which is exactly what `accumulate(numbers, func)` does.',
    hints: [
      'Each output element depends on the one before it.',
      'Keep a running variable outside the loop and append after each update.',
      '`itertools.accumulate(numbers)` does exactly this in one call.',
    ],
  },
  {
    id: 'list-008',
    title: 'Pairwise differences',
    topic: 'list',
    difficulty: 'medium',
    prompt:
      'Write `deltas(numbers)` returning the difference between each pair of adjacent elements.\n\nA list of n elements produces n-1 deltas.',
    starter: 'def deltas(numbers):\n    ...\n',
    tests: [
      { call: 'deltas([1, 4, 9, 16])', expected: '[3, 5, 7]' },
      { call: 'deltas([5])', expected: '[]' },
      { call: 'deltas([])', expected: '[]' },
      { call: 'deltas([3, 1])', expected: '[-2]' },
    ],
    solution:
      'def deltas(numbers):\n    return [b - a for a, b in zip(numbers, numbers[1:])]\n',
    explanation:
      '`zip(numbers, numbers[1:])` is the standard "sliding window of 2" idiom: `zip` stops at the shorter input, so the off-by-one handles itself and single/empty lists return `[]` without a special case. In 3.10+ `itertools.pairwise(numbers)` does the same without the slice copy.',
    hints: [
      'You need every element paired with its neighbour.',
      'Zip the list with itself, offset by one.',
      '`zip(numbers, numbers[1:])` stops at the shorter side, so the off-by-one handles itself.',
    ],
  },
  {
    id: 'list-009',
    title: 'Sort by multiple keys',
    topic: 'list',
    difficulty: 'medium',
    prompt:
      'Each employee is a tuple `(name, department, salary)`.\n\nWrite `by_dept_then_salary(rows)` that sorts by department ascending, then by salary **descending**, then by name ascending.',
    starter: 'def by_dept_then_salary(rows):\n    ...\n',
    tests: [
      {
        call: "by_dept_then_salary([('ann', 'ops', 90), ('bob', 'dev', 80), ('cy', 'dev', 95)])",
        expected: "[('cy', 'dev', 95), ('bob', 'dev', 80), ('ann', 'ops', 90)]",
      },
      {
        call: "by_dept_then_salary([('zoe', 'dev', 70), ('amy', 'dev', 70)])",
        expected: "[('amy', 'dev', 70), ('zoe', 'dev', 70)]",
      },
      { call: 'by_dept_then_salary([])', expected: '[]' },
    ],
    solution:
      'def by_dept_then_salary(rows):\n    return sorted(rows, key=lambda row: (row[1], -row[2], row[0]))\n',
    explanation:
      'A tuple key sorts by each component in turn. Mixing ascending and descending is the classic trap: `reverse=True` flips *every* key, so instead negate the numeric field. When a field is not numeric you cannot negate it — then you rely on sort stability and sort twice, least significant key first.',
    hints: [
      'One `sorted()` call can express all three orderings.',
      'Return a tuple from the key function — it compares component by component.',
      '`reverse=True` would flip every key, so negate the numeric one instead: `(row[1], -row[2], row[0])`.',
    ],
  },
  {
    id: 'list-010',
    title: 'Filter in place',
    topic: 'list',
    difficulty: 'medium',
    prompt:
      'Write `drop_negatives(numbers)` that removes every negative number from the list **in place** (the caller must see the change) and returns `None`.',
    starter: 'def drop_negatives(numbers):\n    ...\n',
    tests: [
      {
        setup: 'data = [1, -2, 3, -4]',
        call: 'drop_negatives(data)\ndata',
        expected: '[1, 3]',
      },
      {
        setup: 'data = [-1, -2]',
        call: 'drop_negatives(data)\ndata',
        expected: '[]',
      },
      {
        setup: 'data = [1, 2]',
        call: 'drop_negatives(data)',
        expected: 'None',
      },
    ],
    solution:
      'def drop_negatives(numbers):\n    numbers[:] = [n for n in numbers if n >= 0]\n',
    explanation:
      'Slice assignment `numbers[:] = ...` replaces the contents of the existing object, so every reference to that list sees the update. `numbers = [...]` would only rebind the local name and the caller would see nothing. Removing items while iterating forward is the other classic bug — the index skips elements.',
    hints: [
      'Rebinding the parameter does not affect the caller.',
      'You need to change the contents of the existing object, not make a new one.',
      'Try assigning to `numbers[:]` from a filtered comprehension.',
    ],
  },
  {
    id: 'list-011',
    title: 'The mutable default argument',
    topic: 'list',
    difficulty: 'medium',
    prompt:
      'This function is buggy: the second call returns `[1, 2]` instead of `[2]`.\n\nFix `append_to(value, bucket=None)` so each call without a bucket starts fresh, while an explicitly passed bucket is still appended to and returned.',
    starter: 'def append_to(value, bucket=[]):\n    bucket.append(value)\n    return bucket\n',
    tests: [
      { call: 'append_to(1)', expected: '[1]' },
      { call: 'append_to(1)\nappend_to(2)', expected: '[2]' },
      {
        setup: 'shared = [0]',
        call: 'append_to(9, shared)\nshared',
        expected: '[0, 9]',
      },
    ],
    solution:
      'def append_to(value, bucket=None):\n    if bucket is None:\n        bucket = []\n    bucket.append(value)\n    return bucket\n',
    explanation:
      'Default arguments are evaluated **once**, when the `def` statement runs — not per call. A mutable default therefore becomes shared state across calls. The `None` sentinel is the standard fix. Use `is None` rather than `if not bucket:`, otherwise an explicitly passed empty list would be silently replaced.',
    hints: [
      'When exactly is the default value created — at definition or at call time?',
      'Use a sentinel default and build the real value inside the body.',
      '`bucket=None`, then `if bucket is None: bucket = []` — `is None`, not `if not bucket`.',
    ],
  },
  {
    id: 'list-012',
    title: 'Shallow copy trap',
    topic: 'list',
    difficulty: 'hard',
    prompt:
      'Write `make_grid(rows, cols)` returning a `rows x cols` grid of zeros where writing to `grid[0][0]` changes **only** that cell.',
    starter: 'def make_grid(rows, cols):\n    return [[0] * cols] * rows\n',
    tests: [
      { call: 'make_grid(2, 3)', expected: '[[0, 0, 0], [0, 0, 0]]' },
      {
        setup: 'g = None',
        call: 'g = make_grid(2, 2)\ng[0][0] = 7\ng',
        expected: '[[7, 0], [0, 0]]',
      },
      { call: 'make_grid(0, 3)', expected: '[]' },
    ],
    solution:
      'def make_grid(rows, cols):\n    return [[0] * cols for _ in range(rows)]\n',
    explanation:
      '`[inner] * rows` copies the *reference* `rows` times, so all rows are the same object and one write appears in every row. A comprehension evaluates `[0] * cols` on each iteration, producing distinct row objects. `[0] * cols` itself is safe only because integers are immutable.',
    hints: [
      'Print `id()` of two rows of the broken grid and compare them.',
      'What does `*` copy — the object, or the reference to it?',
      'A comprehension re-evaluates its expression each iteration: `[[0] * cols for _ in range(rows)]`.',
    ],
  },
  {
    id: 'list-013',
    title: 'Interleave two lists',
    topic: 'list',
    difficulty: 'medium',
    prompt:
      'Write `interleave(a, b)` alternating elements from both lists.\n\nWhen one runs out, append the remainder of the other.',
    starter: 'def interleave(a, b):\n    ...\n',
    tests: [
      { call: 'interleave([1, 3], [2, 4])', expected: '[1, 2, 3, 4]' },
      { call: 'interleave([1], [2, 3, 4])', expected: '[1, 2, 3, 4]' },
      { call: 'interleave([], [1])', expected: '[1]' },
      { call: 'interleave([], [])', expected: '[]' },
    ],
    solution:
      'def interleave(a, b):\n    result = []\n    for x, y in zip(a, b):\n        result.append(x)\n        result.append(y)\n    shorter = min(len(a), len(b))\n    result.extend(a[shorter:])\n    result.extend(b[shorter:])\n    return result\n',
    explanation:
      '`zip` handles the overlapping part, then the leftovers of whichever list is longer are appended — slicing past the end returns `[]`, so only one of the two `extend` calls actually does anything.',
    hints: [
      'Split the problem into the overlapping part and the leftover part.',
      'Zip handles the overlap; the tail is whatever the longer list has left.',
      'Slice from `min(len(a), len(b))` onwards — one of the two slices will be empty.',
    ],
  },
  {
    id: 'list-014',
    title: 'Partition by predicate',
    topic: 'list',
    difficulty: 'medium',
    prompt:
      'Write `partition(numbers)` returning a tuple `(evens, odds)`, each preserving the original order.',
    starter: 'def partition(numbers):\n    ...\n',
    tests: [
      { call: 'partition([1, 2, 3, 4])', expected: '([2, 4], [1, 3])' },
      { call: 'partition([])', expected: '([], [])' },
      { call: 'partition([1])', expected: '([], [1])' },
    ],
    solution:
      'def partition(numbers):\n    evens = []\n    odds = []\n    for n in numbers:\n        (evens if n % 2 == 0 else odds).append(n)\n    return evens, odds\n',
    explanation:
      'One pass filling two lists beats two comprehensions when the predicate is expensive or the input is an iterator that can only be consumed once. Selecting the target list with a conditional expression keeps the loop body to a single line.',
    hints: [
      'Two comprehensions work, but they walk the list twice.',
      'One pass, two output lists.',
      'Pick the target with a conditional expression: `(evens if ... else odds).append(n)`.',
    ],
  },
  {
    id: 'list-015',
    title: 'Index of all matches',
    topic: 'list',
    difficulty: 'easy',
    prompt: 'Write `positions(items, value)` returning every index at which `value` occurs.',
    starter: 'def positions(items, value):\n    ...\n',
    tests: [
      { call: 'positions([1, 2, 1, 3, 1], 1)', expected: '[0, 2, 4]' },
      { call: 'positions([1, 2], 9)', expected: '[]' },
      { call: 'positions([], 1)', expected: '[]' },
    ],
    solution:
      'def positions(items, value):\n    return [index for index, item in enumerate(items) if item == value]\n',
    explanation:
      '`list.index()` only finds the first match, so `enumerate` is the tool for "all of them". Pairing `enumerate` with a comprehension avoids maintaining a manual counter.',
    hints: [
      '`list.index()` only ever finds the first one.',
      '`enumerate` gives you index and value together.',
      'Filter on the value, collect the index: `[i for i, item in enumerate(items) if item == value]`.',
    ],
  },
  {
    id: 'list-016',
    title: 'Slice assignment',
    topic: 'list',
    difficulty: 'hard',
    prompt:
      'Write `replace_range(items, start, stop, replacement)` that swaps the slice `[start:stop]` for the `replacement` list **in place**, returning `None`.\n\nThe replacement may be a different length.',
    starter: 'def replace_range(items, start, stop, replacement):\n    ...\n',
    tests: [
      {
        setup: 'data = [1, 2, 3, 4]',
        call: 'replace_range(data, 1, 3, [9])\ndata',
        expected: '[1, 9, 4]',
      },
      {
        setup: 'data = [1, 2]',
        call: 'replace_range(data, 1, 1, [7, 8])\ndata',
        expected: '[1, 7, 8, 2]',
      },
      {
        setup: 'data = [1, 2]',
        call: 'replace_range(data, 0, 2, [])\ndata',
        expected: '[]',
      },
    ],
    solution:
      'def replace_range(items, start, stop, replacement):\n    items[start:stop] = replacement\n',
    explanation:
      'Slice assignment with a contiguous slice can change the list length, so it covers insert, replace and delete in one operation — `items[1:1] = [...]` inserts, `items[a:b] = []` deletes. Extended slices with a step are the exception: those require matching lengths.',
    hints: [
      'You are replacing a whole region, not individual elements.',
      'Assigning to a contiguous slice can change the list length.',
      'It is a single statement: `items[start:stop] = replacement`.',
    ],
  },
  {
    id: 'list-017',
    title: 'Sort without mutating',
    topic: 'list',
    difficulty: 'easy',
    prompt:
      'Write `ordered(items)` returning a sorted copy while leaving the caller’s list untouched.',
    starter: 'def ordered(items):\n    ...\n',
    tests: [
      { call: 'ordered([3, 1, 2])', expected: '[1, 2, 3]' },
      {
        setup: 'data = [3, 1]',
        call: 'ordered(data)\ndata',
        expected: '[3, 1]',
      },
      { call: 'ordered([])', expected: '[]' },
    ],
    solution: 'def ordered(items):\n    return sorted(items)\n',
    explanation:
      '`sorted()` returns a new list; `list.sort()` sorts in place and returns `None`. Returning `items.sort()` is a very common bug — the caller silently receives `None` *and* their list is reordered.',
    hints: [
      'One of the two obvious options mutates its input.',
      '`sorted()` returns a new list; `.sort()` returns `None`.',
      'So `return sorted(items)` — never `return items.sort()`.',
    ],
  },
  {
    id: 'list-018',
    title: 'Merge two sorted lists',
    topic: 'list',
    difficulty: 'hard',
    prompt:
      'Write `merge_sorted(a, b)` merging two already-sorted lists into one sorted list, without calling `sorted`.',
    starter: 'def merge_sorted(a, b):\n    ...\n',
    tests: [
      { call: 'merge_sorted([1, 3, 5], [2, 4])', expected: '[1, 2, 3, 4, 5]' },
      { call: 'merge_sorted([], [1])', expected: '[1]' },
      { call: 'merge_sorted([1, 1], [1])', expected: '[1, 1, 1]' },
      { call: 'merge_sorted([], [])', expected: '[]' },
    ],
    solution:
      'def merge_sorted(a, b):\n    result = []\n    i = j = 0\n    while i < len(a) and j < len(b):\n        if a[i] <= b[j]:\n            result.append(a[i])\n            i += 1\n        else:\n            result.append(b[j])\n            j += 1\n    result.extend(a[i:])\n    result.extend(b[j:])\n    return result\n',
    explanation:
      'This is the merge step of merge sort: O(n+m) instead of the O(n log n) you would pay by concatenating and re-sorting. Using `<=` rather than `<` keeps the merge *stable*, preserving the relative order of equal elements. `heapq.merge` does this lazily in the stdlib.',
    hints: [
      'Both inputs are already sorted — exploit that instead of re-sorting.',
      'Two index cursors, one comparison per step.',
      'When one side runs out, `extend` the rest of the other; use `<=` to stay stable.',
    ],
  },
  {
    id: 'list-019',
    title: 'Move zeros to the end',
    topic: 'list',
    difficulty: 'medium',
    prompt:
      'Write `move_zeros(numbers)` returning a new list with all zeros at the end, other values keeping their relative order.',
    starter: 'def move_zeros(numbers):\n    ...\n',
    tests: [
      { call: 'move_zeros([0, 1, 0, 3])', expected: '[1, 3, 0, 0]' },
      { call: 'move_zeros([1, 2])', expected: '[1, 2]' },
      { call: 'move_zeros([0, 0])', expected: '[0, 0]' },
      { call: 'move_zeros([])', expected: '[]' },
    ],
    solution:
      'def move_zeros(numbers):\n    nonzero = [n for n in numbers if n != 0]\n    return nonzero + [0] * (len(numbers) - len(nonzero))\n',
    explanation:
      'Rather than shuffling elements around, count how many zeros there were and rebuild. Careful with `if n != 0` versus `if n`: the latter would also strip `False` and `0.0`, and `False == 0` is true in Python.',
    hints: [
      'You do not have to move anything — you can rebuild.',
      'Filter out the zeros, then pad the result back to the original length.',
      'Careful: `if n` also drops `False` and `0.0`, so test `n != 0` explicitly.',
    ],
  },
  {
    id: 'list-020',
    title: 'Sort by a computed key',
    topic: 'list',
    difficulty: 'easy',
    prompt: 'Write `by_length(words)` sorting words by length, ties broken alphabetically.',
    starter: 'def by_length(words):\n    ...\n',
    tests: [
      { call: "by_length(['ccc', 'a', 'bb', 'b'])", expected: "['a', 'b', 'bb', 'ccc']" },
      { call: 'by_length([])', expected: '[]' },
    ],
    solution: 'def by_length(words):\n    return sorted(words, key=lambda word: (len(word), word))\n',
    explanation:
      'A tuple key expresses "primary then secondary" ordering directly. Relying on sort stability with two separate `sorted` calls also works — sort by the *least* significant key first — but the tuple version is one pass and clearer.',
    hints: [
      'Two orderings, one `sorted()` call.',
      'Return a tuple from `key` — primary first, tie-breaker second.',
      '`key=lambda word: (len(word), word)`.',
    ],
  },
  {
    id: 'list-021',
    title: 'Reverse in place',
    topic: 'list',
    difficulty: 'easy',
    prompt: 'Write `flip(items)` reversing the list **in place** and returning `None`.',
    starter: 'def flip(items):\n    ...\n',
    tests: [
      {
        setup: 'data = [1, 2, 3]',
        call: 'flip(data)\ndata',
        expected: '[3, 2, 1]',
      },
      {
        setup: 'data = []',
        call: 'flip(data)',
        expected: 'None',
      },
    ],
    solution: 'def flip(items):\n    items.reverse()\n',
    explanation:
      '`list.reverse()` mutates and returns `None`; `reversed(items)` returns a lazy iterator; `items[::-1]` returns a new list. Choosing the wrong one of the three is a frequent slip.',
    hints: [
      'Three ways to reverse a list — only one of them mutates.',
      '`reversed()` is lazy and `[::-1]` builds a copy; neither is what you want.',
      '`items.reverse()` mutates in place and returns `None`.',
    ],
  },
  {
    id: 'list-022',
    title: 'Remove by value safely',
    topic: 'list',
    difficulty: 'medium',
    prompt:
      'Write `remove_all(items, value)` deleting every occurrence **in place**, returning `None`.',
    starter: 'def remove_all(items, value):\n    ...\n',
    tests: [
      {
        setup: 'data = [1, 2, 1, 3]',
        call: 'remove_all(data, 1)\ndata',
        expected: '[2, 3]',
      },
      {
        setup: 'data = [1, 1]',
        call: 'remove_all(data, 1)\ndata',
        expected: '[]',
      },
      {
        setup: 'data = [1]',
        call: 'remove_all(data, 9)\ndata',
        expected: '[1]',
      },
    ],
    solution:
      'def remove_all(items, value):\n    items[:] = [item for item in items if item != value]\n',
    explanation:
      '`list.remove()` deletes only the first match and raises `ValueError` when there is none. Looping with `remove` while iterating also skips elements. Rebuilding into `items[:]` is both correct and O(n).',
    hints: [
      '`.remove()` only removes one occurrence, and raises when there are none.',
      'Looping with `.remove()` also skips elements as the list shifts.',
      'Rebuild with a comprehension and assign it back into `items[:]`.',
    ],
  },
  {
    id: 'list-023',
    title: 'Transpose a matrix',
    topic: 'list',
    difficulty: 'medium',
    prompt: 'Write `transpose(matrix)` swapping rows and columns of a rectangular list of lists.',
    starter: 'def transpose(matrix):\n    ...\n',
    tests: [
      { call: 'transpose([[1, 2, 3], [4, 5, 6]])', expected: '[[1, 4], [2, 5], [3, 6]]' },
      { call: 'transpose([[1]])', expected: '[[1]]' },
      { call: 'transpose([])', expected: '[]' },
    ],
    solution:
      'def transpose(matrix):\n    return [list(row) for row in zip(*matrix)]\n',
    explanation:
      '`zip(*matrix)` spreads each row as an argument, so `zip` pairs up the columns. It yields tuples, so `list(row)` is needed to match the expected type — and `zip(*[])` yields nothing, giving `[]` for free.',
    hints: [
      'Spreading the rows as separate arguments lines the columns up.',
      '`zip(*matrix)` does the work.',
      'It yields tuples, so wrap each one: `[list(row) for row in zip(*matrix)]`.',
    ],
  },
  {
    id: 'list-024',
    title: 'Take every nth element',
    topic: 'list',
    difficulty: 'easy',
    prompt: 'Write `every_nth(items, n)` returning elements at index 0, n, 2n, and so on.',
    starter: 'def every_nth(items, n):\n    ...\n',
    tests: [
      { call: 'every_nth([1, 2, 3, 4, 5], 2)', expected: '[1, 3, 5]' },
      { call: 'every_nth([1, 2], 1)', expected: '[1, 2]' },
      { call: 'every_nth([], 3)', expected: '[]' },
    ],
    solution: 'def every_nth(items, n):\n    return items[::n]\n',
    explanation:
      'The third part of a slice is the step. `items[::n]` starts at 0 and skips forward by `n`. A step of 0 raises `ValueError`, and a negative step walks backwards — which is why `[::-1]` reverses.',
    hints: [
      'No loop is needed at all.',
      'A slice has three parts, and you have only been using two.',
      '`items[::n]`.',
    ],
  },
  {
    id: 'list-025',
    title: 'Copy versus reference',
    topic: 'list',
    difficulty: 'hard',
    prompt:
      'Write `safe_copy(rows)` returning a copy of a list of lists such that mutating an inner list of the copy does not affect the original.',
    starter: 'def safe_copy(rows):\n    return rows[:]\n',
    tests: [
      {
        setup: 'original = [[1], [2]]',
        call: 'copy = safe_copy(original)\ncopy[0].append(9)\noriginal',
        expected: '[[1], [2]]',
      },
      { call: 'safe_copy([[1], [2]])', expected: '[[1], [2]]' },
      { call: 'safe_copy([])', expected: '[]' },
    ],
    solution: 'def safe_copy(rows):\n    return [row[:] for row in rows]\n',
    explanation:
      '`rows[:]`, `list(rows)` and `copy.copy(rows)` are all *shallow*: the outer list is new but the inner lists are shared. Copying each row gives one more level of independence. `copy.deepcopy` recurses all the way down, at a much higher cost.',
    hints: [
      'The starter copies the outer list — check what the inner lists point at.',
      'A shallow copy shares the inner objects.',
      'Copy each row too: `[row[:] for row in rows]`.',
    ],
  },
  {
    id: 'list-026',
    title: 'All and any',
    topic: 'list',
    difficulty: 'easy',
    prompt:
      'Write `all_positive(numbers)` returning `True` when every number is greater than zero.\n\nAn empty list counts as `True`.',
    starter: 'def all_positive(numbers):\n    ...\n',
    tests: [
      { call: 'all_positive([1, 2])', expected: 'True' },
      { call: 'all_positive([1, -1])', expected: 'False' },
      { call: 'all_positive([])', expected: 'True' },
    ],
    solution: 'def all_positive(numbers):\n    return all(n > 0 for n in numbers)\n',
    explanation:
      '`all()` short-circuits on the first false value and returns `True` for an empty iterable (vacuous truth) — the mirror of `any()`, which returns `False` when empty. Both accept a generator, so nothing extra is built.',
    hints: [
      'There is a built-in for "every element satisfies this".',
      'What does `all([])` return, and does that match the spec?',
      '`all(n > 0 for n in numbers)` — and `all([])` is `True`, which is what you want.',
    ],
  },
  {
    id: 'list-027',
    title: 'Find the first match',
    topic: 'list',
    difficulty: 'medium',
    prompt:
      'Write `first_even(numbers)` returning the first even number, or `None` when there is none.',
    starter: 'def first_even(numbers):\n    ...\n',
    tests: [
      { call: 'first_even([1, 3, 4, 6])', expected: '4' },
      { call: 'first_even([1, 3])', expected: 'None' },
      { call: 'first_even([])', expected: 'None' },
    ],
    solution:
      'def first_even(numbers):\n    return next((n for n in numbers if n % 2 == 0), None)\n',
    explanation:
      '`next(generator, default)` stops at the first match instead of filtering the whole list — the difference matters on a long list or an infinite iterator. Without the default argument, `next` raises `StopIteration`.',
    hints: [
      'You want to stop at the first match, not filter everything.',
      '`next()` pulls one value from a generator.',
      'Pass a default so it does not raise: `next((n for n in numbers if n % 2 == 0), None)`.',
    ],
  },
  {
    id: 'list-028',
    title: 'Comprehension with a condition on both sides',
    topic: 'list',
    difficulty: 'medium',
    prompt:
      'Write `clamp_all(numbers, limit)` returning each number capped at `limit`, and drop any negative numbers entirely.',
    starter: 'def clamp_all(numbers, limit):\n    ...\n',
    tests: [
      { call: 'clamp_all([1, 5, -2, 9], 4)', expected: '[1, 4, 4]' },
      { call: 'clamp_all([], 3)', expected: '[]' },
      { call: 'clamp_all([-1], 3)', expected: '[]' },
    ],
    solution:
      'def clamp_all(numbers, limit):\n    return [min(n, limit) for n in numbers if n >= 0]\n',
    explanation:
      'The two conditional positions in a comprehension do different jobs: a trailing `if` **filters**, while a leading `x if cond else y` **transforms**. Mixing them up is one of the most common comprehension errors.',
    hints: [
      'Two different jobs here: dropping elements, and changing elements.',
      'A trailing `if` filters; a leading `x if cond else y` transforms.',
      'You only need the filtering form plus `min(n, limit)`.',
    ],
  },
  {
    id: 'list-029',
    title: 'Sum of a sublist',
    topic: 'list',
    difficulty: 'medium',
    prompt:
      'Write `best_window(numbers, size)` returning the largest sum of any `size` consecutive elements.\n\nReturn 0 when the list is shorter than the window.',
    starter: 'def best_window(numbers, size):\n    ...\n',
    tests: [
      { call: 'best_window([1, 2, 3, 4], 2)', expected: '7' },
      { call: 'best_window([5, -1, 5], 3)', expected: '9' },
      { call: 'best_window([1], 2)', expected: '0' },
    ],
    solution:
      'def best_window(numbers, size):\n    if size <= 0 or len(numbers) < size:\n        return 0\n    total = sum(numbers[:size])\n    best = total\n    for index in range(size, len(numbers)):\n        total += numbers[index] - numbers[index - size]\n        best = max(best, total)\n    return best\n',
    explanation:
      'The sliding-window technique: maintain one running total, adding the entering element and subtracting the leaving one. That turns an O(n*size) nested loop into a single O(n) pass.',
    hints: [
      'Consecutive windows overlap almost entirely.',
      'Do not recompute the sum for every window.',
      'Add the element entering the window, subtract the one leaving it.',
    ],
  },
  {
    id: 'list-030',
    title: 'Stable sort by two passes',
    topic: 'list',
    difficulty: 'hard',
    prompt:
      'Each row is `(name, team)`. Write `by_team_then_name(rows)` sorting by team ascending and name descending, using sort stability rather than a single tuple key.',
    starter: 'def by_team_then_name(rows):\n    ...\n',
    tests: [
      {
        call: "by_team_then_name([('ann', 'b'), ('cy', 'a'), ('bob', 'a')])",
        expected: "[('cy', 'a'), ('bob', 'a'), ('ann', 'b')]",
      },
      { call: 'by_team_then_name([])', expected: '[]' },
    ],
    solution:
      'def by_team_then_name(rows):\n    result = sorted(rows, key=lambda row: row[0], reverse=True)\n    result.sort(key=lambda row: row[1])\n    return result\n',
    explanation:
      "Python's sort is stable, so equal elements keep their relative order. Sorting by the least significant key first and the most significant last therefore produces a correct multi-key ordering. This is the technique to reach for when one key must be descending and it is not a number you can negate.",
    hints: [
      'You are allowed to sort more than once.',
      'Sort by the least significant key first, the most significant last.',
      'Python\u2019s sort is stable, so the earlier ordering survives the later sort.',
    ],
  },
  {
    id: 'list-031',
    title: 'Insert at the right position',
    topic: 'list',
    difficulty: 'easy',
    prompt:
      'Write `insert_after(items, target, value)` inserting `value` immediately after the first occurrence of `target`, **in place**.\n\nAppend to the end when `target` is absent. Return `None`.',
    starter: 'def insert_after(items, target, value):\n    ...\n',
    tests: [
      {
        setup: 'data = [1, 2, 3]',
        call: 'insert_after(data, 2, 9)\ndata',
        expected: '[1, 2, 9, 3]',
      },
      {
        setup: 'data = [1]',
        call: 'insert_after(data, 5, 9)\ndata',
        expected: '[1, 9]',
      },
      {
        setup: 'data = []',
        call: 'insert_after(data, 1, 9)\ndata',
        expected: '[9]',
      },
    ],
    solution:
      'def insert_after(items, target, value):\n    if target in items:\n        items.insert(items.index(target) + 1, value)\n    else:\n        items.append(value)\n',
    explanation:
      '`list.insert(index, value)` shifts everything from `index` rightwards, so inserting at `index(target) + 1` lands directly after the match. Note that `insert` clamps an out-of-range index rather than raising, so `insert(999, v)` behaves like `append`.',
    hints: [
      '`list.index` finds the position; you want the one after it.',
      '`list.insert(index, value)` inserts before `index`.',
      'Handle the missing case separately with `append`.',
    ],
  },
  {
    id: 'list-032',
    title: 'Count without count()',
    topic: 'list',
    difficulty: 'easy',
    prompt:
      'Write `count_matching(numbers, threshold)` returning how many numbers are strictly greater than `threshold`.',
    starter: 'def count_matching(numbers, threshold):\n    ...\n',
    tests: [
      { call: 'count_matching([1, 5, 9], 4)', expected: '2' },
      { call: 'count_matching([1, 2], 9)', expected: '0' },
      { call: 'count_matching([], 0)', expected: '0' },
    ],
    solution:
      'def count_matching(numbers, threshold):\n    return sum(1 for n in numbers if n > threshold)\n',
    explanation:
      '`sum` over a generator of `1`s is the standard "count things matching a predicate" idiom. `sum(n > threshold for n in numbers)` also works because `True` is `1`, though it is slightly more cryptic.',
    hints: [
      'You are counting, and counting is just adding ones.',
      '`sum()` accepts a generator with an `if` filter.',
      '`sum(1 for n in numbers if n > threshold)`.',
    ],
  },
  {
    id: 'list-033',
    title: 'Flatten with a depth limit',
    topic: 'list',
    difficulty: 'hard',
    prompt:
      'Write `flatten_depth(data, depth)` flattening nested lists at most `depth` levels.\n\n`depth=0` returns a shallow copy.',
    starter: 'def flatten_depth(data, depth):\n    ...\n',
    tests: [
      { call: 'flatten_depth([1, [2, [3]]], 1)', expected: '[1, 2, [3]]' },
      { call: 'flatten_depth([1, [2, [3]]], 2)', expected: '[1, 2, 3]' },
      { call: 'flatten_depth([1, [2]], 0)', expected: '[1, [2]]' },
      { call: 'flatten_depth([], 5)', expected: '[]' },
    ],
    solution:
      'def flatten_depth(data, depth):\n    if depth <= 0:\n        return list(data)\n    result = []\n    for item in data:\n        if isinstance(item, list):\n            result.extend(flatten_depth(item, depth - 1))\n        else:\n            result.append(item)\n    return result\n',
    explanation:
      'Decrementing `depth` on the way down turns unbounded recursion into a bounded one, and the `depth <= 0` base case doubles as the shallow-copy branch. Returning `list(data)` rather than `data` keeps the caller\u2019s list safe from later mutation.',
    hints: [
      'Recursion again, but this time it has to stop early.',
      'Pass `depth - 1` into the recursive call.',
      'The base case `depth <= 0` should return a copy, not the original.',
    ],
  },
  {
    id: 'list-034',
    title: 'Longest increasing run',
    topic: 'list',
    difficulty: 'hard',
    prompt:
      'Write `longest_run(numbers)` returning the length of the longest strictly increasing consecutive run.\n\nAn empty list gives 0.',
    starter: 'def longest_run(numbers):\n    ...\n',
    tests: [
      { call: 'longest_run([1, 2, 3, 1, 2])', expected: '3' },
      { call: 'longest_run([3, 2, 1])', expected: '1' },
      { call: 'longest_run([5])', expected: '1' },
      { call: 'longest_run([])', expected: '0' },
    ],
    solution:
      'def longest_run(numbers):\n    if not numbers:\n        return 0\n    best = current = 1\n    for previous, value in zip(numbers, numbers[1:]):\n        current = current + 1 if value > previous else 1\n        best = max(best, current)\n    return best\n',
    explanation:
      'Track the run ending at the current position and the best seen so far. Resetting `current` to 1 rather than 0 is the detail people get wrong \u2014 a single element is already a run of length one.',
    hints: [
      'Two counters: the current run, and the best run so far.',
      'Compare each element with its predecessor using the zip-offset trick.',
      'Reset to 1, not 0, when the run breaks.',
    ],
  },
  {
    id: 'list-035',
    title: 'Sum of two indices',
    topic: 'list',
    difficulty: 'hard',
    prompt:
      'Write `two_sum(numbers, target)` returning the `(i, j)` index pair with `i < j` whose values add to `target`, or `None`.\n\nReturn the pair with the smallest `j`.',
    starter: 'def two_sum(numbers, target):\n    ...\n',
    tests: [
      { call: 'two_sum([2, 7, 11], 9)', expected: '(0, 1)' },
      { call: 'two_sum([3, 2, 4], 6)', expected: '(1, 2)' },
      { call: 'two_sum([1, 2], 99)', expected: 'None' },
      { call: 'two_sum([], 0)', expected: 'None' },
    ],
    solution:
      'def two_sum(numbers, target):\n    seen = {}\n    for index, value in enumerate(numbers):\n        if target - value in seen:\n            return seen[target - value], index\n        seen[value] = index\n    return None\n',
    explanation:
      'The nested-loop answer is O(n\u00b2). Storing each value\u2019s index in a dict as you go lets you ask "have I already seen the complement?" in O(1), giving one pass. Recording the value *after* the check prevents an element pairing with itself.',
    hints: [
      'The brute-force double loop is O(n\u00b2) \u2014 you can do one pass.',
      'For each value, you know exactly which partner you need.',
      'Keep a dict of value to index, and check for the complement before inserting.',
    ],
  },
  {
    id: 'list-036',
    title: 'Rank the values',
    topic: 'list',
    difficulty: 'medium',
    prompt:
      'Write `ranks(scores)` returning, for each score, its 1-based rank when sorted descending.\n\nEqual scores share the same rank.',
    starter: 'def ranks(scores):\n    ...\n',
    tests: [
      { call: 'ranks([10, 30, 20])', expected: '[3, 1, 2]' },
      { call: 'ranks([5, 5])', expected: '[1, 1]' },
      { call: 'ranks([])', expected: '[]' },
    ],
    solution:
      'def ranks(scores):\n    ordered = sorted(set(scores), reverse=True)\n    position = {score: index + 1 for index, score in enumerate(ordered)}\n    return [position[score] for score in scores]\n',
    explanation:
      'Building a lookup table once turns an O(n\u00b2) "count how many are bigger" into two linear passes. Deduplicating with `set` before ranking is what makes tied scores share a rank instead of consuming two positions.',
    hints: [
      'Do not recompute the rank for every element.',
      'Build a lookup of score to rank first.',
      'Deduplicate before ranking so ties collapse to one position.',
    ],
  },
  {
    id: 'list-037',
    title: 'Batch with a running total',
    topic: 'list',
    difficulty: 'hard',
    prompt:
      'Write `batch_by_weight(weights, limit)` splitting the list into consecutive groups whose sums stay at or below `limit`.\n\nAssume no single weight exceeds `limit`.',
    starter: 'def batch_by_weight(weights, limit):\n    ...\n',
    tests: [
      { call: 'batch_by_weight([3, 4, 2, 5], 7)', expected: '[[3, 4], [2, 5]]' },
      { call: 'batch_by_weight([1, 1, 1], 10)', expected: '[[1, 1, 1]]' },
      { call: 'batch_by_weight([], 5)', expected: '[]' },
    ],
    solution:
      'def batch_by_weight(weights, limit):\n    batches = []\n    current = []\n    total = 0\n    for weight in weights:\n        if current and total + weight > limit:\n            batches.append(current)\n            current = []\n            total = 0\n        current.append(weight)\n        total += weight\n    if current:\n        batches.append(current)\n    return batches\n',
    explanation:
      'The same greedy shape as word wrapping: flush the buffer when the next item would overflow, then start a fresh one. The `if current` guard stops an empty batch being emitted, and the trailing flush after the loop is the step most people forget.',
    hints: [
      'Greedy: keep adding until the next item would overflow.',
      'Track the running total alongside the current batch.',
      'Do not forget to append the final partial batch after the loop.',
    ],
  },
  {
    id: 'list-038',
    title: 'Zip three lists',
    topic: 'list',
    difficulty: 'easy',
    prompt:
      'Write `combine(names, ages, cities)` returning a list of `(name, age, city)` tuples.',
    starter: 'def combine(names, ages, cities):\n    ...\n',
    tests: [
      {
        call: "combine(['a', 'b'], [1, 2], ['x', 'y'])",
        expected: "[('a', 1, 'x'), ('b', 2, 'y')]",
      },
      { call: "combine(['a'], [1], [])", expected: '[]' },
      { call: 'combine([], [], [])', expected: '[]' },
    ],
    solution:
      'def combine(names, ages, cities):\n    return list(zip(names, ages, cities))\n',
    explanation:
      '`zip` takes any number of iterables and stops at the shortest, which is why the second test yields `[]`. If a length mismatch should be an error rather than silent truncation, use `zip(..., strict=True)` on 3.10+.',
    hints: [
      '`zip` is not limited to two arguments.',
      'It stops at the shortest input.',
      '`list(zip(names, ages, cities))`.',
    ],
  },
  {
    id: 'list-039',
    title: 'Remove the nth element',
    topic: 'list',
    difficulty: 'medium',
    prompt:
      'Write `without(items, index)` returning a new list with the element at `index` removed.\n\nReturn a copy unchanged when `index` is out of range.',
    starter: 'def without(items, index):\n    ...\n',
    tests: [
      { call: 'without([1, 2, 3], 1)', expected: '[1, 3]' },
      { call: 'without([1, 2], 9)', expected: '[1, 2]' },
      {
        setup: 'data = [1, 2]',
        call: 'without(data, 0)\ndata',
        expected: '[1, 2]',
      },
    ],
    solution:
      'def without(items, index):\n    if not 0 <= index < len(items):\n        return list(items)\n    return items[:index] + items[index + 1 :]\n',
    explanation:
      'Two slices concatenated build a new list without touching the original, unlike `del items[index]` or `.pop()` which mutate. The chained comparison also rejects negative indices, which slicing would otherwise interpret as counting from the end.',
    hints: [
      '`del` and `.pop()` both mutate \u2014 you need a copy.',
      'Two slices, one before and one after the index.',
      'Guard with `0 <= index < len(items)` so negatives are rejected too.',
    ],
  },
  {
    id: 'list-040',
    title: 'Alternate signs',
    topic: 'list',
    difficulty: 'medium',
    prompt:
      'Write `alternate(numbers)` negating every element at an odd index, returning a new list.',
    starter: 'def alternate(numbers):\n    ...\n',
    tests: [
      { call: 'alternate([1, 2, 3, 4])', expected: '[1, -2, 3, -4]' },
      { call: 'alternate([5])', expected: '[5]' },
      { call: 'alternate([])', expected: '[]' },
    ],
    solution:
      'def alternate(numbers):\n    return [-n if index % 2 else n for index, n in enumerate(numbers)]\n',
    explanation:
      'This needs the *transforming* conditional (`x if cond else y` before the `for`), not the filtering one. `if index % 2` reads as "if the index is odd" because `0` is falsy \u2014 a small idiom worth recognising.',
    hints: [
      'You need the index as well as the value.',
      'This is a transform, not a filter \u2014 the conditional goes at the front.',
      '`[-n if index % 2 else n for index, n in enumerate(numbers)]`.',
    ],
  },
  {
    id: 'list-041',
    title: 'Chunk into n groups',
    topic: 'list',
    difficulty: 'hard',
    prompt:
      'Write `split_into(items, groups)` distributing elements round-robin into `groups` lists.\n\nElement 0 goes to group 0, element 1 to group 1, and so on.',
    starter: 'def split_into(items, groups):\n    ...\n',
    tests: [
      { call: 'split_into([1, 2, 3, 4, 5], 2)', expected: '[[1, 3, 5], [2, 4]]' },
      { call: 'split_into([1], 3)', expected: '[[1], [], []]' },
      { call: 'split_into([], 2)', expected: '[[], []]' },
    ],
    solution:
      'def split_into(items, groups):\n    buckets = [[] for _ in range(groups)]\n    for index, item in enumerate(items):\n        buckets[index % groups].append(item)\n    return buckets\n',
    explanation:
      'Round-robin distribution is just `index % groups`. Note the buckets must be created with a comprehension \u2014 `[[]] * groups` would make every bucket the same list, so all items would land in all of them.',
    hints: [
      'The destination is a simple function of the index.',
      '`index % groups` cycles through the buckets.',
      'Create the buckets with a comprehension, not `[[]] * groups`.',
    ],
  },
  {
    id: 'list-042',
    title: 'Deduplicate by a key',
    topic: 'list',
    difficulty: 'medium',
    prompt:
      'Write `unique_by(records, field)` where each record is a dict, keeping the first record for each value of `record[field]`.',
    starter: 'def unique_by(records, field):\n    ...\n',
    tests: [
      {
        call: "unique_by([{'id': 1}, {'id': 2}, {'id': 1}], 'id')",
        expected: "[{'id': 1}, {'id': 2}]",
      },
      { call: "unique_by([], 'id')", expected: '[]' },
    ],
    solution:
      'def unique_by(records, field):\n    seen = set()\n    result = []\n    for record in records:\n        key = record[field]\n        if key not in seen:\n            seen.add(key)\n            result.append(record)\n    return result\n',
    explanation:
      'The same seen-set pattern as plain deduplication, except the set holds the *key* rather than the item \u2014 which matters here because dicts are unhashable and could not go into a set at all.',
    hints: [
      'The usual seen-set pattern, with one twist.',
      'Dicts are unhashable, so the set cannot hold the records themselves.',
      'Store `record[field]` in the set instead.',
    ],
  },
  {
    id: 'list-043',
    title: 'Clamp a list to a length',
    topic: 'list',
    difficulty: 'easy',
    prompt:
      'Write `fit(items, size, filler)` returning a list of exactly `size` elements \u2014 truncated, or padded with `filler`.',
    starter: 'def fit(items, size, filler):\n    ...\n',
    tests: [
      { call: 'fit([1, 2, 3], 2, 0)', expected: '[1, 2]' },
      { call: 'fit([1], 3, 0)', expected: '[1, 0, 0]' },
      { call: 'fit([], 2, None)', expected: '[None, None]' },
      { call: 'fit([1, 2], 2, 0)', expected: '[1, 2]' },
    ],
    solution:
      'def fit(items, size, filler):\n    return (list(items) + [filler] * size)[:size]\n',
    explanation:
      'Padding generously and then truncating handles both directions with no branch. `[filler] * size` is safe here only because the filler is expected to be immutable \u2014 with a mutable filler every padded slot would be the same object.',
    hints: [
      'Both cases can be handled without an `if`.',
      'Pad first, then truncate.',
      '`(list(items) + [filler] * size)[:size]`.',
    ],
  },
  {
    id: 'list-044',
    title: 'Sum nested numbers',
    topic: 'list',
    difficulty: 'medium',
    prompt: 'Write `deep_sum(data)` summing every number in arbitrarily nested lists.',
    starter: 'def deep_sum(data):\n    ...\n',
    tests: [
      { call: 'deep_sum([1, [2, [3, 4]], 5])', expected: '15' },
      { call: 'deep_sum([])', expected: '0' },
      { call: 'deep_sum([[], [[]]])', expected: '0' },
    ],
    solution:
      'def deep_sum(data):\n    total = 0\n    for item in data:\n        total += deep_sum(item) if isinstance(item, list) else item\n    return total\n',
    explanation:
      'The recursive branch returns a number, so both branches contribute the same way to the running total. An empty list naturally returns 0, which is why the deeply-nested-empty case needs no special handling.',
    hints: [
      'Each element is either a number or another list.',
      'Recurse on the list case, add on the number case.',
      'An empty list already sums to 0, so no extra base case is needed.',
    ],
  },
  {
    id: 'list-045',
    title: 'Rotate in place',
    topic: 'list',
    difficulty: 'hard',
    prompt:
      'Write `rotate_inplace(items, k)` rotating the list right by `k` **in place**, returning `None`.',
    starter: 'def rotate_inplace(items, k):\n    ...\n',
    tests: [
      {
        setup: 'data = [1, 2, 3, 4, 5]',
        call: 'rotate_inplace(data, 2)\ndata',
        expected: '[4, 5, 1, 2, 3]',
      },
      {
        setup: 'data = []',
        call: 'rotate_inplace(data, 3)\ndata',
        expected: '[]',
      },
      {
        setup: 'data = [1, 2]',
        call: 'rotate_inplace(data, 5)\ndata',
        expected: '[2, 1]',
      },
    ],
    solution:
      'def rotate_inplace(items, k):\n    if not items:\n        return\n    k %= len(items)\n    items[:] = items[-k:] + items[:-k]\n',
    explanation:
      'Same arithmetic as the copying version, but the result is written back through `items[:]` so the caller sees it. A bare `return` exits early with `None`, which is what the empty-list case needs before `% 0` can raise.',
    hints: [
      'You already know how to build the rotated list.',
      'The difference is how you give it back to the caller.',
      'Assign it into `items[:]`, and guard the empty list before the modulo.',
    ],
  },
  {
    id: 'list-046',
    title: 'Group consecutive duplicates',
    topic: 'list',
    difficulty: 'medium',
    prompt:
      'Write `pack(items)` grouping consecutive equal elements into sublists, without importing anything.',
    starter: 'def pack(items):\n    ...\n',
    tests: [
      { call: "pack(['a', 'a', 'b', 'a'])", expected: "[['a', 'a'], ['b'], ['a']]" },
      { call: 'pack([1])', expected: '[[1]]' },
      { call: 'pack([])', expected: '[]' },
    ],
    solution:
      'def pack(items):\n    groups = []\n    for item in items:\n        if groups and groups[-1][0] == item:\n            groups[-1].append(item)\n        else:\n            groups.append([item])\n    return groups\n',
    explanation:
      'Comparing against `groups[-1][0]` avoids tracking a separate "previous" variable. The `groups and ...` short-circuit is what makes the first iteration safe \u2014 without it, `groups[-1]` would raise `IndexError`.',
    hints: [
      'You only ever need to look at the group you are currently building.',
      '`groups[-1]` is that group \u2014 but guard the first iteration.',
      '`if groups and groups[-1][0] == item: groups[-1].append(item)`.',
    ],
  },
  {
    id: 'list-047',
    title: 'Median of a list',
    topic: 'list',
    difficulty: 'medium',
    prompt:
      'Write `median(numbers)` returning the middle value, or the mean of the two middle values for an even count.\n\nReturn `None` when empty.',
    starter: 'def median(numbers):\n    ...\n',
    tests: [
      { call: 'median([3, 1, 2])', expected: '2' },
      { call: 'median([4, 1, 2, 3])', expected: '2.5' },
      { call: 'median([])', expected: 'None' },
      { call: 'median([7])', expected: '7' },
    ],
    solution:
      'def median(numbers):\n    if not numbers:\n        return None\n    ordered = sorted(numbers)\n    middle = len(ordered) // 2\n    if len(ordered) % 2:\n        return ordered[middle]\n    return (ordered[middle - 1] + ordered[middle]) / 2\n',
    explanation:
      'Sorting a *copy* via `sorted` leaves the caller\u2019s list alone. Integer division `//` gives the middle index directly, and the even case must use `/` rather than `//` so `[1, 2]` yields `1.5` and not `1`.',
    hints: [
      'Sort a copy first \u2014 do not mutate the input.',
      '`len // 2` gives the middle index.',
      'The even case averages two values, so use `/` not `//`.',
    ],
  },
];
