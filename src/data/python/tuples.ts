import type { Challenge } from '../../types';

export const tupleChallenges: Challenge[] = [
  {
    id: 'tuple-001',
    title: 'Swap two values',
    topic: 'tuple',
    difficulty: 'easy',
    prompt: 'Write `swap(pair)` that returns the two-element tuple with its elements exchanged.',
    starter: 'def swap(pair):\n    ...\n',
    tests: [
      { call: 'swap((1, 2))', expected: '(2, 1)' },
      { call: "swap(('a', 'b'))", expected: "('b', 'a')" },
    ],
    solution: 'def swap(pair):\n    a, b = pair\n    return b, a\n',
    explanation:
      'Unpacking on the left and building a tuple on the right is the same mechanism behind `a, b = b, a`: the right-hand side is evaluated into a tuple first, so no temporary variable is needed. The parentheses around `b, a` are optional — it is the comma that makes a tuple.',
    hints: ['Unpack, then rebuild.'],
  },
  {
    id: 'tuple-002',
    title: 'The one-element tuple',
    topic: 'tuple',
    difficulty: 'easy',
    prompt:
      'Write `wrap(value)` that returns a tuple containing exactly one element: `value`.\n\nWatch out — this is the classic syntax trap.',
    starter: 'def wrap(value):\n    return (value)\n',
    tests: [
      { call: 'wrap(1)', expected: '(1,)' },
      { call: 'len(wrap(1))', expected: '1' },
      { call: "wrap('ab')", expected: "('ab',)" },
    ],
    solution: 'def wrap(value):\n    return (value,)\n',
    explanation:
      'Parentheses do not create a tuple — the comma does. `(value)` is just a parenthesised expression, so it returns the value unchanged. The trailing comma in `(value,)` is what makes it a one-element tuple. The empty tuple `()` is the one exception to the rule.',
    hints: ['What actually makes something a tuple in Python?'],
  },
  {
    id: 'tuple-003',
    title: 'Split head and tail',
    topic: 'tuple',
    difficulty: 'medium',
    prompt:
      'Write `head_tail(items)` returning a tuple `(first, rest)` where `rest` is a **list** of the remaining items.\n\nReturn `(None, [])` for an empty input.',
    starter: 'def head_tail(items):\n    ...\n',
    tests: [
      { call: 'head_tail([1, 2, 3])', expected: '(1, [2, 3])' },
      { call: 'head_tail([1])', expected: '(1, [])' },
      { call: 'head_tail([])', expected: '(None, [])' },
    ],
    solution:
      'def head_tail(items):\n    if not items:\n        return None, []\n    first, *rest = items\n    return first, rest\n',
    explanation:
      'Starred unpacking `first, *rest = items` binds the leftovers as a **list**, never a tuple, regardless of the input type. It raises `ValueError` on an empty sequence, which is why the guard comes first.',
    hints: ['`first, *rest = items`.', 'What type is `rest`?'],
  },
  {
    id: 'tuple-004',
    title: 'Middle out',
    topic: 'tuple',
    difficulty: 'medium',
    prompt:
      'Write `ends(items)` returning `(first, middle, last)` where `middle` is a list of everything between the ends.\n\nAssume at least two elements.',
    starter: 'def ends(items):\n    ...\n',
    tests: [
      { call: 'ends([1, 2, 3, 4])', expected: '(1, [2, 3], 4)' },
      { call: 'ends([1, 2])', expected: '(1, [], 2)' },
      { call: "ends('abc')", expected: "('a', ['b'], 'c')" },
    ],
    solution: 'def ends(items):\n    first, *middle, last = items\n    return first, middle, last\n',
    explanation:
      'A starred target can sit anywhere in the pattern, and Python assigns the fixed positions first before handing the remainder to the star. At most one star is allowed, otherwise the split would be ambiguous.',
    hints: ['The star does not have to be last.'],
  },
  {
    id: 'tuple-005',
    title: 'Tuples as dict keys',
    topic: 'tuple',
    difficulty: 'medium',
    prompt:
      'Write `count_pairs(pairs)` that counts how often each `(x, y)` coordinate appears, returning a dict keyed by the tuple.',
    starter: 'def count_pairs(pairs):\n    ...\n',
    tests: [
      {
        call: 'count_pairs([(0, 0), (1, 2), (0, 0)])',
        expected: '{(0, 0): 2, (1, 2): 1}',
      },
      { call: 'count_pairs([])', expected: '{}' },
    ],
    solution:
      'def count_pairs(pairs):\n    counts = {}\n    for pair in pairs:\n        counts[pair] = counts.get(pair, 0) + 1\n    return counts\n',
    explanation:
      'Tuples are hashable as long as everything inside them is, which is exactly why they work as composite dict keys and lists do not. A list `[0, 0]` would raise `TypeError: unhashable type: list`.',
    hints: ['Why can a tuple be a key but a list cannot?'],
  },
  {
    id: 'tuple-006',
    title: 'Immutable — but not deeply',
    topic: 'tuple',
    difficulty: 'hard',
    prompt:
      'Write `append_inside(pair, value)` where `pair` is a tuple `(name, items)` and `items` is a list.\n\nAppend `value` to that inner list in place and return the same tuple object.',
    starter: 'def append_inside(pair, value):\n    ...\n',
    tests: [
      {
        setup: "data = ('a', [1])",
        call: 'append_inside(data, 2)\ndata',
        expected: "('a', [1, 2])",
      },
      {
        setup: "data = ('a', [])",
        call: 'append_inside(data, 1) is data',
        expected: 'True',
      },
    ],
    solution:
      'def append_inside(pair, value):\n    pair[1].append(value)\n    return pair\n',
    explanation:
      "A tuple's immutability is shallow: it freezes which objects it references, not the state of those objects. So a tuple containing a list is mutable in practice — and also unhashable, which is why `hash(('a', [1]))` raises TypeError.",
    hints: ['You cannot reassign `pair[1]`, but you can call methods on it.'],
  },
  {
    id: 'tuple-007',
    title: 'Sort points by distance',
    topic: 'tuple',
    difficulty: 'medium',
    prompt:
      'Write `by_distance(points)` sorting a list of `(x, y)` tuples by distance from the origin, nearest first.',
    starter: 'def by_distance(points):\n    ...\n',
    tests: [
      { call: 'by_distance([(3, 4), (1, 1), (0, 2)])', expected: '[(1, 1), (0, 2), (3, 4)]' },
      { call: 'by_distance([])', expected: '[]' },
    ],
    solution:
      'def by_distance(points):\n    return sorted(points, key=lambda p: p[0] ** 2 + p[1] ** 2)\n',
    explanation:
      'Skipping the square root is a deliberate optimisation: `sqrt` is monotonic, so ordering by squared distance gives the identical result without the floating-point cost or rounding. `key=` computes the value once per element, unlike a comparison function.',
    hints: ['Do you actually need the square root?'],
  },
  {
    id: 'tuple-008',
    title: 'Unpack in a loop',
    topic: 'tuple',
    difficulty: 'easy',
    prompt:
      'Write `format_rows(rows)` where each row is `(name, count)`, returning a list of `"name: count"` strings.',
    starter: 'def format_rows(rows):\n    ...\n',
    tests: [
      { call: "format_rows([('a', 1), ('b', 22)])", expected: "['a: 1', 'b: 22']" },
      { call: 'format_rows([])', expected: '[]' },
    ],
    solution:
      "def format_rows(rows):\n    return [f'{name}: {count}' for name, count in rows]\n",
    explanation:
      'A comprehension can unpack the tuple straight into two names, which is far clearer than `row[0]` and `row[1]`. If a row had the wrong arity you would get `ValueError: not enough values to unpack` — a useful, loud failure.',
    hints: ['Unpack in the `for` clause of the comprehension.'],
  },
  {
    id: 'tuple-009',
    title: 'Enumerate with an offset',
    topic: 'tuple',
    difficulty: 'easy',
    prompt: 'Write `numbered(items)` returning a list of `(position, item)` tuples starting at 1.',
    starter: 'def numbered(items):\n    ...\n',
    tests: [
      { call: "numbered(['a', 'b'])", expected: "[(1, 'a'), (2, 'b')]" },
      { call: 'numbered([])', expected: '[]' },
    ],
    solution: 'def numbered(items):\n    return list(enumerate(items, start=1))\n',
    explanation:
      '`enumerate` takes a `start` argument, which removes the need for `i + 1` arithmetic. It returns an iterator of tuples, so `list()` materialises them. Manually maintaining a counter is the thing interviewers are looking to see you avoid.',
    hints: ['`enumerate` has a second parameter.'],
  },
  {
    id: 'tuple-010',
    title: 'Zip into pairs and back',
    topic: 'tuple',
    difficulty: 'medium',
    prompt:
      'Write `unzip(pairs)` that turns a list of `(a, b)` tuples into a tuple of two lists `([a...], [b...])`.\n\nAn empty input gives `([], [])`.',
    starter: 'def unzip(pairs):\n    ...\n',
    tests: [
      { call: "unzip([(1, 'a'), (2, 'b')])", expected: "([1, 2], ['a', 'b'])" },
      { call: 'unzip([])', expected: '([], [])' },
    ],
    solution:
      'def unzip(pairs):\n    if not pairs:\n        return [], []\n    left, right = zip(*pairs)\n    return list(left), list(right)\n',
    explanation:
      '`zip(*pairs)` transposes the data: the star spreads each tuple as a separate argument to `zip`. Two gotchas — `zip` yields *tuples* so you must convert to lists, and `zip(*[])` yields nothing at all, so unpacking into two names raises ValueError without the guard.',
    hints: ['`zip(*rows)` transposes.', 'What happens when the input is empty?'],
  },
  {
    id: 'tuple-011',
    title: 'Named tuple basics',
    topic: 'tuple',
    difficulty: 'medium',
    prompt:
      'Using `collections.namedtuple`, define `Point` with fields `x` and `y`, then write `make_point(x, y)` returning a `Point`.\n\nIt must still behave like a plain tuple.',
    starter: 'from collections import namedtuple\n\n\ndef make_point(x, y):\n    ...\n',
    tests: [
      { call: 'make_point(1, 2).x', expected: '1' },
      { call: 'make_point(1, 2)', expected: '(1, 2)' },
      { call: 'tuple(make_point(3, 4))', expected: '(3, 4)' },
    ],
    solution:
      "from collections import namedtuple\n\nPoint = namedtuple('Point', ['x', 'y'])\n\n\ndef make_point(x, y):\n    return Point(x, y)\n",
    explanation:
      'A namedtuple *is* a tuple subclass, so it unpacks, indexes and compares equal to a plain tuple with the same values — while also giving readable attribute access. The class is created once at module level, not per call, because building it is not free.',
    hints: ['`namedtuple(name, fields)` returns a class.'],
  },
  {
    id: 'tuple-012',
    title: 'Tuple comparison order',
    topic: 'tuple',
    difficulty: 'medium',
    prompt:
      'Write `max_version(versions)` where each version is a `(major, minor, patch)` tuple, returning the highest one.\n\nReturn `None` for an empty list.',
    starter: 'def max_version(versions):\n    ...\n',
    tests: [
      { call: 'max_version([(1, 2, 3), (1, 10, 0)])', expected: '(1, 10, 0)' },
      { call: 'max_version([(2, 0, 0), (1, 99, 99)])', expected: '(2, 0, 0)' },
      { call: 'max_version([])', expected: 'None' },
    ],
    solution:
      'def max_version(versions):\n    return max(versions, default=None)\n',
    explanation:
      'Tuples compare lexicographically — element by element, stopping at the first difference — which is exactly semantic version ordering. That is why `(1, 10, 0) > (1, 2, 3)`, whereas the *strings* "1.10.0" and "1.2.3" would compare the other way. `max(..., default=None)` handles the empty case without a branch.',
    hints: ['`max` already knows how to compare tuples.', '`max` takes a `default` keyword.'],
  },
  {
    id: 'tuple-013',
    title: 'Return multiple values',
    topic: 'tuple',
    difficulty: 'easy',
    prompt:
      'Write `min_max(numbers)` returning a `(minimum, maximum)` tuple.\n\nReturn `(None, None)` for an empty list.',
    starter: 'def min_max(numbers):\n    ...\n',
    tests: [
      { call: 'min_max([3, 1, 4])', expected: '(1, 4)' },
      { call: 'min_max([7])', expected: '(7, 7)' },
      { call: 'min_max([])', expected: '(None, None)' },
    ],
    solution:
      'def min_max(numbers):\n    if not numbers:\n        return None, None\n    return min(numbers), max(numbers)\n',
    explanation:
      'Returning multiple values in Python is just returning a tuple, which the caller can unpack with `low, high = min_max(xs)`. Calling `min` and `max` walks the list twice; a single manual pass is faster but rarely worth the extra code.',
    hints: ['`return a, b` builds a tuple.'],
  },
  {
    id: 'tuple-014',
    title: 'Frozen record deduplication',
    topic: 'tuple',
    difficulty: 'medium',
    prompt:
      'Write `unique_rows(rows)` where each row is a list, returning the number of distinct rows (order within a row matters).',
    starter: 'def unique_rows(rows):\n    ...\n',
    tests: [
      { call: 'unique_rows([[1, 2], [1, 2], [2, 1]])', expected: '2' },
      { call: 'unique_rows([])', expected: '0' },
    ],
    solution: 'def unique_rows(rows):\n    return len({tuple(row) for row in rows})\n',
    explanation:
      'Lists are unhashable, so converting each row to a tuple is what makes set-based deduplication possible. Unlike `frozenset`, a tuple preserves order and duplicates, so `[1, 2]` and `[2, 1]` stay distinct — which is what this problem asks for.',
    hints: ['Lists cannot go in a set.', 'Order matters, so not `frozenset`.'],
  },
  {
    id: 'tuple-015',
    title: 'Ignore values while unpacking',
    topic: 'tuple',
    difficulty: 'easy',
    prompt:
      'Each record is `(id, name, email, created_at)`.\n\nWrite `names(records)` returning just the names.',
    starter: 'def names(records):\n    ...\n',
    tests: [
      {
        call: "names([(1, 'ann', 'a@x', 'jan'), (2, 'bob', 'b@x', 'feb')])",
        expected: "['ann', 'bob']",
      },
      { call: 'names([])', expected: '[]' },
    ],
    solution: 'def names(records):\n    return [name for _, name, *_rest in records]\n',
    explanation:
      'Using `_` for values you do not care about is a strong convention that signals intent to the reader. Note you cannot repeat `*_` twice in one pattern; a single starred name absorbs everything that remains.',
    hints: ['`_` is a normal variable name used by convention.'],
  },
  {
    id: 'tuple-016',
    title: 'Group consecutive pairs',
    topic: 'tuple',
    difficulty: 'medium',
    prompt:
      'Write `pairwise(items)` returning a list of `(current, next)` tuples for adjacent elements.',
    starter: 'def pairwise(items):\n    ...\n',
    tests: [
      { call: 'pairwise([1, 2, 3])', expected: '[(1, 2), (2, 3)]' },
      { call: 'pairwise([1])', expected: '[]' },
      { call: 'pairwise([])', expected: '[]' },
    ],
    solution: 'def pairwise(items):\n    return list(zip(items, items[1:]))\n',
    explanation:
      '`zip` stops at the shorter argument, so the last element correctly has no partner and short inputs return `[]` for free. `itertools.pairwise` (3.10+) does the same without copying via the slice.',
    hints: ['Zip the sequence with a shifted copy of itself.'],
  },
  {
    id: 'tuple-017',
    title: 'Sort with a decorated tuple',
    topic: 'tuple',
    difficulty: 'hard',
    prompt:
      'Write `sort_versions(tags)` where each tag looks like `"v1.10.2"`.\n\nSort them by numeric version, ascending.',
    starter: 'def sort_versions(tags):\n    ...\n',
    tests: [
      {
        call: "sort_versions(['v1.2.0', 'v1.10.0', 'v1.9.9'])",
        expected: "['v1.2.0', 'v1.9.9', 'v1.10.0']",
      },
      { call: "sort_versions([])", expected: '[]' },
    ],
    solution:
      "def sort_versions(tags):\n    return sorted(tags, key=lambda tag: tuple(int(part) for part in tag[1:].split('.')))\n",
    explanation:
      'Sorting the raw strings puts "v1.10.0" before "v1.2.0" because `1` sorts before `2` character by character. Building a tuple of ints as the sort key restores numeric ordering, and tuple comparison then handles the major/minor/patch precedence automatically.',
    hints: ['String sorting is not numeric sorting.', 'Turn each tag into a tuple of ints.'],
  },
  {
    id: 'tuple-018',
    title: 'Tuple concatenation creates a new object',
    topic: 'tuple',
    difficulty: 'medium',
    prompt:
      'Write `add_tag(record, tag)` that returns a new tuple with `tag` appended, leaving the original untouched.',
    starter: 'def add_tag(record, tag):\n    ...\n',
    tests: [
      { call: "add_tag((1, 'a'), 'new')", expected: "(1, 'a', 'new')" },
      {
        setup: 'original = (1,)',
        call: "add_tag(original, 'x')\noriginal",
        expected: '(1,)',
      },
    ],
    solution: "def add_tag(record, tag):\n    return record + (tag,)\n",
    explanation:
      'Tuples have no `append`, so `+` builds a whole new tuple. The right-hand operand must itself be a tuple — `record + tag` raises TypeError, and forgetting the trailing comma in `(tag,)` is the usual cause.',
    hints: ['`+` concatenates two tuples.', 'Remember the trailing comma.'],
  },
  {
    id: 'tuple-019',
    title: 'Count occurrences and find index',
    topic: 'tuple',
    difficulty: 'easy',
    prompt:
      'Write `first_index(items, value)` returning the index of the first occurrence, or `-1` when absent.',
    starter: 'def first_index(items, value):\n    ...\n',
    tests: [
      { call: 'first_index((1, 2, 3, 2), 2)', expected: '1' },
      { call: 'first_index((1, 2), 9)', expected: '-1' },
      { call: 'first_index((), 1)', expected: '-1' },
    ],
    solution:
      'def first_index(items, value):\n    if value not in items:\n        return -1\n    return items.index(value)\n',
    explanation:
      '`.index()` raises `ValueError` when the value is missing rather than returning -1 like some other languages. Guarding with `in` is readable; catching the `ValueError` in a `try` block is the faster single-scan alternative when the value is usually present.',
    hints: ['`.index()` raises rather than returning -1.'],
  },
  {
    id: 'tuple-020',
    title: 'Dict items are tuples',
    topic: 'tuple',
    difficulty: 'medium',
    prompt:
      'Write `sorted_items(mapping)` returning `.items()` as a list of tuples sorted by key.',
    starter: 'def sorted_items(mapping):\n    ...\n',
    tests: [
      { call: "sorted_items({'b': 2, 'a': 1})", expected: "[('a', 1), ('b', 2)]" },
      { call: 'sorted_items({})', expected: '[]' },
    ],
    solution: 'def sorted_items(mapping):\n    return sorted(mapping.items())\n',
    explanation:
      '`.items()` yields `(key, value)` tuples, and tuples compare on their first element first — so plain `sorted()` already sorts by key, falling back to the value only on ties. No `key=` function is required.',
    hints: ['What does tuple comparison do first?'],
  },
];
