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
    hints: [
      'No temporary variable is needed anywhere.',
      'Unpack, then rebuild in the other order.',
      '`a, b = pair` then `return b, a` — the comma is what builds the tuple.',
    ],
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
    hints: [
      'Check `len((value))` in your head — the starter is not returning a tuple.',
      'What actually makes something a tuple in Python? It is not the parentheses.',
      '`return (value,)` — the trailing comma.',
    ],
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
    hints: [
      'Starred unpacking splits a sequence into head and remainder.',
      '`first, *rest = items` — but what type is `rest`?',
      '`rest` is always a list, and unpacking an empty sequence raises, so guard first.',
    ],
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
    hints: [
      'You need the first, the last, and everything in between.',
      'The star does not have to be last in the pattern.',
      '`first, *middle, last = items`.',
    ],
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
    hints: [
      'The coordinate itself can be the key.',
      'Why can a tuple be a key but a list cannot? Hashability.',
      '`counts[pair] = counts.get(pair, 0) + 1`.',
    ],
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
    hints: [
      'A tuple\u2019s immutability is shallower than you might expect.',
      'You cannot reassign `pair[1]`, but you can call methods on it.',
      '`pair[1].append(value)` then `return pair` — the same object comes back.',
    ],
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
    hints: [
      'Sorting only cares about relative order, not the actual distances.',
      'Do you actually need the square root? It is monotonic.',
      '`key=lambda p: p[0] ** 2 + p[1] ** 2`.',
    ],
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
    hints: [
      '`row[0]` and `row[1]` work, but they read badly.',
      'Unpack in the `for` clause of the comprehension.',
      "`[f'{name}: {count}' for name, count in rows]`.",
    ],
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
    hints: [
      'No manual counter and no `i + 1` arithmetic is needed.',
      '`enumerate` has a second parameter.',
      '`list(enumerate(items, start=1))`.',
    ],
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
    hints: [
      'This is a transpose — the same trick as flipping a matrix.',
      '`zip(*rows)` transposes, but it yields tuples, not lists.',
      'What happens when the input is empty? `zip(*[])` yields nothing, so guard it.',
    ],
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
    hints: [
      '`namedtuple(name, fields)` returns a class, not an instance.',
      'Create that class once at module level, outside the function.',
      "`Point = namedtuple('Point', ['x', 'y'])`, then `return Point(x, y)`.",
    ],
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
    hints: [
      '`max` already knows how to compare tuples, element by element.',
      'That lexicographic order is exactly semantic-version order.',
      '`max` takes a `default` keyword for the empty case.',
    ],
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
    hints: [
      'Returning "two values" in Python means returning one tuple.',
      '`return a, b` builds a tuple without parentheses.',
      'Guard the empty list first, then `return min(numbers), max(numbers)`.',
    ],
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
    hints: [
      'Lists cannot go in a set — they are unhashable.',
      'Order matters here, so `frozenset` is the wrong conversion.',
      '`len({tuple(row) for row in rows})`.',
    ],
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
    hints: [
      'You can unpack a record even when you want only one field.',
      '`_` is a normal variable name used by convention for "do not care".',
      '`[name for _, name, *_rest in records]` — only one star is allowed per pattern.',
    ],
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
    hints: [
      'Every element except the last needs its successor.',
      'Zip the sequence with a shifted copy of itself.',
      '`list(zip(items, items[1:]))` — short inputs give `[]` for free.',
    ],
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
    hints: [
      'String sorting is not numeric sorting — check where "v1.10.0" lands.',
      'Turn each tag into a tuple of ints and sort on that.',
      "`key=lambda tag: tuple(int(p) for p in tag[1:].split('.'))`.",
    ],
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
    hints: [
      'Tuples have no `append`, so you must build a new one.',
      '`+` concatenates two tuples — both operands must be tuples.',
      'Remember the trailing comma: `record + (tag,)`.',
    ],
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
    hints: [
      '`.index()` raises `ValueError` rather than returning -1.',
      'Either check membership first, or catch the exception.',
      '`if value not in items: return -1`, then `return items.index(value)`.',
    ],
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
    hints: [
      '`.items()` already yields tuples of `(key, value)`.',
      'What does tuple comparison do first? It compares element 0.',
      'So no `key=` is needed at all: `sorted(mapping.items())`.',
    ],
  },
  {
    id: 'tuple-021',
    title: 'Unpack in a function signature',
    topic: 'tuple',
    difficulty: 'medium',
    prompt:
      'Write `total(items)` where each item is `(name, price, quantity)`, returning the summed `price * quantity`.',
    starter: 'def total(items):\n    ...\n',
    tests: [
      { call: "total([('a', 2, 3), ('b', 5, 1)])", expected: '11' },
      { call: 'total([])', expected: '0' },
    ],
    solution:
      'def total(items):\n    return sum(price * quantity for _, price, quantity in items)\n',
    explanation:
      'Unpacking inside the generator expression keeps the arithmetic readable and lets `_` mark the field you are ignoring. `sum` returns `0` for an empty iterable, so the empty case needs no guard.',
    hints: [
      'Each row has three fields but you only need two.',
      'Unpack directly in the `for` clause, using `_` for the name.',
      '`sum(price * qty for _, price, qty in items)`.',
    ],
  },
  {
    id: 'tuple-022',
    title: 'Tuples are hashable, lists are not',
    topic: 'tuple',
    difficulty: 'medium',
    prompt:
      'Write `memo_key(args)` converting a list of arguments into something usable as a dict key.\n\nNested lists must be converted too.',
    starter: 'def memo_key(args):\n    ...\n',
    tests: [
      { call: 'memo_key([1, 2])', expected: '(1, 2)' },
      { call: 'memo_key([1, [2, 3]])', expected: '(1, (2, 3))' },
      { call: 'memo_key([])', expected: '()' },
      { call: 'memo_key([1, [2, [3]]])', expected: '(1, (2, (3,)))' },
      { call: 'isinstance(hash(memo_key([1, [2]])), int)', expected: 'True' },
    ],
    solution:
      'def memo_key(args):\n    return tuple(memo_key(arg) if isinstance(arg, list) else arg for arg in args)\n',
    explanation:
      '`tuple(args)` alone is not enough: a tuple containing a list is still unhashable, because hashability is recursive. Converting nested lists as you go is what makes the whole structure a valid key.',
    hints: [
      '`tuple(args)` is close, but check `hash((1, [2]))`.',
      'Hashability is recursive \u2014 the inner lists matter too.',
      'Recurse on the elements that are themselves lists.',
    ],
  },
  {
    id: 'tuple-023',
    title: 'Swap without a temporary',
    topic: 'tuple',
    difficulty: 'easy',
    prompt:
      'Write `swap_ends(items)` exchanging the first and last elements of a list **in place**, returning `None`.\n\nLists shorter than two elements are left alone.',
    starter: 'def swap_ends(items):\n    ...\n',
    tests: [
      {
        setup: 'data = [1, 2, 3]',
        call: 'swap_ends(data)\ndata',
        expected: '[3, 2, 1]',
      },
      {
        setup: 'data = [1]',
        call: 'swap_ends(data)\ndata',
        expected: '[1]',
      },
      {
        setup: 'data = []',
        call: 'swap_ends(data)\ndata',
        expected: '[]',
      },
    ],
    solution:
      'def swap_ends(items):\n    if len(items) >= 2:\n        items[0], items[-1] = items[-1], items[0]\n',
    explanation:
      'The right-hand side is packed into a tuple *before* any assignment happens, which is why no temporary variable is needed and why the order of the targets does not matter.',
    hints: [
      'No temporary variable is required.',
      'The right-hand side is evaluated into a tuple first.',
      '`items[0], items[-1] = items[-1], items[0]`.',
    ],
  },
  {
    id: 'tuple-024',
    title: 'Sort tuples by the second field',
    topic: 'tuple',
    difficulty: 'easy',
    prompt:
      'Write `by_second(pairs)` sorting `(name, count)` tuples by count ascending.',
    starter: 'def by_second(pairs):\n    ...\n',
    tests: [
      {
        call: "by_second([('a', 3), ('b', 1), ('c', 2)])",
        expected: "[('b', 1), ('c', 2), ('a', 3)]",
      },
      { call: 'by_second([])', expected: '[]' },
    ],
    solution:
      'def by_second(pairs):\n    return sorted(pairs, key=lambda pair: pair[1])\n',
    explanation:
      'Without a `key`, tuples sort by their first element. `operator.itemgetter(1)` is the faster, more declarative alternative to the lambda and is worth knowing by name.',
    hints: [
      'The default tuple ordering uses element 0 \u2014 you want element 1.',
      'Pass a `key` function that pulls out that field.',
      '`key=lambda p: p[1]`, or `key=itemgetter(1)`.',
    ],
  },
  {
    id: 'tuple-025',
    title: 'Convert between tuple and list',
    topic: 'tuple',
    difficulty: 'easy',
    prompt:
      'Write `sorted_tuple(values)` returning a **tuple** of the values in ascending order.',
    starter: 'def sorted_tuple(values):\n    ...\n',
    tests: [
      { call: 'sorted_tuple((3, 1, 2))', expected: '(1, 2, 3)' },
      { call: 'sorted_tuple(())', expected: '()' },
      { call: 'sorted_tuple([2, 1])', expected: '(1, 2)' },
    ],
    solution: 'def sorted_tuple(values):\n    return tuple(sorted(values))\n',
    explanation:
      'Tuples have no `.sort()` because they are immutable, so you sort into a list and convert back. `sorted()` accepts any iterable and always returns a list, which is why the `tuple()` wrapper is required.',
    hints: [
      'Tuples have no `.sort()` \u2014 they are immutable.',
      '`sorted()` always returns a list, whatever you give it.',
      'So wrap it: `tuple(sorted(values))`.',
    ],
  },
  {
    id: 'tuple-026',
    title: 'namedtuple _replace',
    topic: 'tuple',
    difficulty: 'medium',
    prompt:
      'Define `Config` with fields `host` and `port`, then write `with_port(config, port)` returning a **new** config with the port changed.',
    starter: 'from collections import namedtuple\n\n\ndef with_port(config, port):\n    ...\n',
    tests: [
      { call: "with_port(Config('h', 1), 2)", expected: "('h', 2)" },
      { call: "with_port(Config('h', 1), 2).port", expected: '2' },
      {
        setup: "base = Config('h', 1)",
        call: 'with_port(base, 2)\nbase',
        expected: "('h', 1)",
      },
    ],
    solution:
      "from collections import namedtuple\n\nConfig = namedtuple('Config', ['host', 'port'])\n\n\ndef with_port(config, port):\n    return config._replace(port=port)\n",
    explanation:
      '`_replace` returns a copy with the named fields changed \u2014 it cannot mutate, because a namedtuple is a tuple. The leading underscore avoids clashing with a user-defined field name, so despite appearances it is public API.',
    hints: [
      'A namedtuple is immutable, so you need a copy.',
      'There is a built-in method for "copy with changes".',
      '`config._replace(port=port)` \u2014 the underscore avoids clashing with field names.',
    ],
  },
  {
    id: 'tuple-027',
    title: 'Compare tuples of different lengths',
    topic: 'tuple',
    difficulty: 'medium',
    prompt:
      'Write `is_prefix(short, long)` returning `True` when `short` is a leading slice of `long`.',
    starter: 'def is_prefix(short, long):\n    ...\n',
    tests: [
      { call: 'is_prefix((1, 2), (1, 2, 3))', expected: 'True' },
      { call: 'is_prefix((1, 3), (1, 2, 3))', expected: 'False' },
      { call: 'is_prefix((), (1,))', expected: 'True' },
      { call: 'is_prefix((1, 2), (1,))', expected: 'False' },
    ],
    solution:
      'def is_prefix(short, long):\n    return long[: len(short)] == short\n',
    explanation:
      'Slicing to `len(short)` and comparing is exact: if `short` is longer than `long`, the slice is shorter and the comparison fails. Note `short < long` would be wrong \u2014 that is lexicographic ordering, not a prefix test, and `(1, 3) < (1, 2, 3)` is `False` for a different reason entirely.',
    hints: [
      'Slice the longer tuple down to the length of the shorter one.',
      'Then a plain `==` answers the question.',
      'Do not use `<` \u2014 that is ordering, not a prefix test.',
    ],
  },
  {
    id: 'tuple-028',
    title: 'Chunk into fixed-size tuples',
    topic: 'tuple',
    difficulty: 'hard',
    prompt:
      'Write `triples(items)` returning consecutive 3-element tuples, discarding any incomplete tail group.',
    starter: 'def triples(items):\n    ...\n',
    tests: [
      { call: 'triples([1, 2, 3, 4, 5, 6, 7])', expected: '[(1, 2, 3), (4, 5, 6)]' },
      { call: 'triples([1, 2])', expected: '[]' },
      { call: 'triples([])', expected: '[]' },
    ],
    solution:
      'def triples(items):\n    return list(zip(items[0::3], items[1::3], items[2::3]))\n',
    explanation:
      'Three strided slices zipped together give fixed-size groups, and `zip` truncating at the shortest is exactly what discards the incomplete tail. The classic equivalent is `zip(*[iter(items)] * 3)`, which relies on all three names referring to the *same* iterator.',
    hints: [
      'You want to drop the remainder, which is what `zip` does naturally.',
      'Three strided slices, offset by 0, 1 and 2.',
      '`zip(items[0::3], items[1::3], items[2::3])`.',
    ],
  },
  {
    id: 'tuple-029',
    title: 'Tuple as a lightweight record',
    topic: 'tuple',
    difficulty: 'medium',
    prompt:
      'Write `oldest(people)` where each person is `(name, age)`, returning the name of the oldest.\n\nOn a tie return the alphabetically first name; return `None` when empty.',
    starter: 'def oldest(people):\n    ...\n',
    tests: [
      { call: "oldest([('ann', 30), ('bob', 45)])", expected: "'bob'" },
      { call: "oldest([('zoe', 40), ('amy', 40)])", expected: "'amy'" },
      { call: 'oldest([])', expected: 'None' },
    ],
    solution:
      'def oldest(people):\n    if not people:\n        return None\n    return min(people, key=lambda person: (-person[1], person[0]))[0]\n',
    explanation:
      '`max` would break the age tie by picking whichever name is alphabetically last, so `min` with a negated age is used instead. Indexing `[0]` at the end extracts the name from the winning tuple.',
    hints: [
      'Two orderings: age descending, then name ascending.',
      '`max` would break the tie the wrong way \u2014 use `min` with a negated age.',
      'Remember to pull the name out of the winning tuple with `[0]`.',
    ],
  },
  {
    id: 'tuple-030',
    title: 'Star-unpack a function call',
    topic: 'tuple',
    difficulty: 'medium',
    prompt:
      'Write `apply_all(func, arg_tuples)` calling `func` once per tuple, spreading each tuple as positional arguments.',
    starter: 'def apply_all(func, arg_tuples):\n    ...\n',
    tests: [
      { call: 'apply_all(max, [(1, 5), (9, 2)])', expected: '[5, 9]' },
      { call: 'apply_all(pow, [(2, 3)])', expected: '[8]' },
      { call: 'apply_all(max, [])', expected: '[]' },
    ],
    solution:
      'def apply_all(func, arg_tuples):\n    return [func(*args) for args in arg_tuples]\n',
    explanation:
      '`func(*args)` spreads the tuple into separate positional arguments, whereas `func(args)` would pass the tuple itself as a single argument. `itertools.starmap` is the stdlib version of exactly this.',
    hints: [
      '`func(args)` would pass the tuple as one argument.',
      'The star spreads it into separate positional arguments.',
      '`[func(*args) for args in arg_tuples]`, or `itertools.starmap`.',
    ],
  },
  {
    id: 'tuple-031',
    title: 'Immutable means safe to share',
    topic: 'tuple',
    difficulty: 'medium',
    prompt:
      'Write `freeze(rows)` converting a list of lists into a tuple of tuples.',
    starter: 'def freeze(rows):\n    ...\n',
    tests: [
      { call: 'freeze([[1, 2], [3]])', expected: '((1, 2), (3,))' },
      { call: 'freeze([])', expected: '()' },
      { call: 'freeze([[]])', expected: '((),)' },
    ],
    solution: 'def freeze(rows):\n    return tuple(tuple(row) for row in rows)\n',
    explanation:
      'Both levels must be converted \u2014 `tuple(rows)` alone would leave mutable lists inside, so the result would neither be hashable nor safe to share. The expected values also show the one-element tuple syntax at two levels.',
    hints: [
      '`tuple(rows)` only converts the outer level.',
      'The inner lists must be converted too.',
      '`tuple(tuple(row) for row in rows)`.',
    ],
  },
  {
    id: 'tuple-032',
    title: 'Index of the maximum',
    topic: 'tuple',
    difficulty: 'medium',
    prompt:
      'Write `argmax(numbers)` returning the index of the largest value.\n\nOn a tie return the lowest index; return `None` when empty.',
    starter: 'def argmax(numbers):\n    ...\n',
    tests: [
      { call: 'argmax([1, 9, 3])', expected: '1' },
      { call: 'argmax([5, 5])', expected: '0' },
      { call: 'argmax([])', expected: 'None' },
    ],
    solution:
      'def argmax(numbers):\n    if not numbers:\n        return None\n    return max(enumerate(numbers), key=lambda pair: pair[1])[0]\n',
    explanation:
      '`enumerate` pairs each value with its index, and `max` on those tuples with a value-only key returns the *first* maximal pair \u2014 which satisfies the lowest-index tie-break. `numbers.index(max(numbers))` also works but scans the list twice.',
    hints: [
      'You need the index, so pair each value with one.',
      '`max` over `enumerate(numbers)` \u2014 but tell it to compare on the value.',
      '`max` returns the first maximal element, which handles the tie-break.',
    ],
  },
  {
    id: 'tuple-033',
    title: 'Return a tuple, unpack at the call site',
    topic: 'tuple',
    difficulty: 'medium',
    prompt:
      'Write `divide(a, b)` returning `(quotient, remainder)` using integer division.\n\nReturn `(None, None)` when `b` is zero.',
    starter: 'def divide(a, b):\n    ...\n',
    tests: [
      { call: 'divide(17, 5)', expected: '(3, 2)' },
      { call: 'divide(10, 2)', expected: '(5, 0)' },
      { call: 'divide(1, 0)', expected: '(None, None)' },
    ],
    solution:
      'def divide(a, b):\n    if b == 0:\n        return None, None\n    return divmod(a, b)\n',
    explanation:
      '`divmod(a, b)` returns the quotient and remainder as a tuple in one operation, which is cheaper than computing `a // b` and `a % b` separately. The zero guard is required because `divmod` raises `ZeroDivisionError`.',
    hints: [
      'There is a single built-in that returns both results.',
      'It is `divmod`.',
      'Guard `b == 0` first, since `divmod` would raise.',
    ],
  },
];
