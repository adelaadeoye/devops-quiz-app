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
    hints: ['`sum()` takes an iterable, not just a list.'],
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
    hints: ['Deduplicate first, then sort descending.'],
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
    hints: ['A comprehension can carry two `for` clauses.'],
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
    hints: ['`range(start, stop, step)` can step by more than 1.', 'Slices never raise IndexError.'],
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
    hints: ['Track what you have already emitted in a set.', 'Look up `dict.fromkeys`.'],
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
    hints: ['Normalise `k` with the modulo operator first.', 'Two slices concatenated do the job.'],
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
    hints: ['Keep a running variable outside the loop.', '`itertools.accumulate` exists.'],
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
    hints: ['Zip the list with itself, offset by one.'],
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
    hints: ['Return a tuple from the key function.', 'How do you reverse only one of the keys?'],
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
    hints: ['Rebinding the parameter does not affect the caller.', 'Try assigning to `numbers[:]`.'],
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
    hints: ['When exactly is the default value created?', 'Use a sentinel.'],
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
    hints: ['What does `*` copy — the object or the reference?'],
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
    hints: ['Zip the overlap, then append the tail.'],
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
    hints: ['One pass, two output lists.'],
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
    hints: ['`enumerate` gives index and value together.'],
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
    hints: ['Assigning to a slice can change the length.'],
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
    hints: ['`sorted()` versus `.sort()`.'],
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
    hints: ['Two index cursors, one comparison.', 'Do not forget the leftover tail.'],
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
    hints: ['Filter, then pad.', 'Is `if n` the same as `if n != 0`?'],
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
    hints: ['Return a tuple from `key`.'],
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
    hints: ['Three ways to reverse — only one mutates.'],
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
    hints: ['`.remove()` only removes one.', 'Slice assignment mutates in place.'],
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
    hints: ['`zip(*matrix)` does the work.', 'Watch the tuple-versus-list type.'],
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
    hints: ['A slice has three parts.'],
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
    hints: ['A shallow copy shares the inner objects.'],
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
    hints: ['What does `all([])` return?'],
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
    hints: ['`next()` accepts a default value.'],
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
    hints: ['Filtering `if` goes at the end; transforming `if/else` goes at the front.'],
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
    hints: ['Do not recompute the sum for every window.'],
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
    hints: ['Sort by the least significant key first.', 'Stability is what makes this work.'],
  },
];
