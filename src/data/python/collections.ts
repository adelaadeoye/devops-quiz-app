import type { Challenge } from '../../types';

export const collectionsChallenges: Challenge[] = [
  {
    id: 'coll-001',
    title: 'Counter basics',
    topic: 'collections',
    difficulty: 'easy',
    prompt:
      'Using `collections.Counter`, write `tally(items)` returning a plain `dict` of item to count.',
    starter: 'from collections import Counter\n\n\ndef tally(items):\n    ...\n',
    tests: [
      { call: "tally(['a', 'b', 'a'])", expected: "{'a': 2, 'b': 1}" },
      { call: 'tally([])', expected: '{}' },
    ],
    solution:
      'from collections import Counter\n\n\ndef tally(items):\n    return dict(Counter(items))\n',
    explanation:
      '`Counter` is a `dict` subclass that counts in one pass. The `dict()` wrapper matters when an API contract says "plain dict" — and it also drops `Counter`\'s forgiving behaviour, where a missing key returns 0 instead of raising `KeyError`.',
    hints: [
      '`Counter(iterable)` counts for you in one pass.',
      'But a `Counter` is not literally a `dict` — the spec asks for a plain one.',
      '`return dict(Counter(items))`.',
    ],
  },
  {
    id: 'coll-002',
    title: 'Most common items',
    topic: 'collections',
    difficulty: 'easy',
    prompt: 'Write `top(items, n)` returning the `n` most common items as a list of `(item, count)` tuples.',
    starter: 'from collections import Counter\n\n\ndef top(items, n):\n    ...\n',
    tests: [
      {
        call: "top(['a', 'b', 'a', 'c', 'a', 'b'], 2)",
        expected: "[('a', 3), ('b', 2)]",
      },
      { call: "top(['a'], 5)", expected: "[('a', 1)]" },
      { call: 'top([], 2)', expected: '[]' },
    ],
    solution:
      'from collections import Counter\n\n\ndef top(items, n):\n    return Counter(items).most_common(n)\n',
    explanation:
      '`most_common(n)` uses a heap internally, so it is O(n log k) rather than a full sort. Ties are broken by first-encountered order, which is worth stating out loud in an interview because it is *not* alphabetical.',
    hints: [
      'You do not need to sort the whole thing yourself.',
      '`Counter.most_common(n)` already returns `(item, count)` tuples.',
      '`return Counter(items).most_common(n)` — it clamps when `n` is too large.',
    ],
  },
  {
    id: 'coll-003',
    title: 'Counter arithmetic',
    topic: 'collections',
    difficulty: 'medium',
    prompt:
      'Write `diff(before, after)` returning a dict of item to the change in count, including only items whose count changed.',
    starter: 'from collections import Counter\n\n\ndef diff(before, after):\n    ...\n',
    tests: [
      {
        call: "diff(['a', 'a', 'b'], ['a', 'c'])",
        expected: "{'a': -1, 'b': -1, 'c': 1}",
      },
      { call: "diff(['a'], ['a'])", expected: '{}' },
      { call: 'diff([], [])', expected: '{}' },
    ],
    solution:
      'from collections import Counter\n\n\ndef diff(before, after):\n    old = Counter(before)\n    new = Counter(after)\n    keys = set(old) | set(new)\n    return {key: new[key] - old[key] for key in keys if new[key] != old[key]}\n',
    explanation:
      'The key insight is that indexing a missing key on a `Counter` returns 0 instead of raising, so `new[key] - old[key]` works for keys present on only one side. Note that `new - old` would *not* work here: Counter subtraction discards zero and negative counts.',
    hints: [
      'Some items appear on only one side — handle those without a `KeyError`.',
      'A missing key in a Counter is 0, so subtraction just works.',
      'Why is `new - old` not enough? Counter subtraction drops zero and negative counts.',
    ],
  },
  {
    id: 'coll-004',
    title: 'defaultdict of lists',
    topic: 'collections',
    difficulty: 'easy',
    prompt:
      'Write `group_by_length(words)` returning a plain dict mapping word length to the list of words of that length.',
    starter: 'from collections import defaultdict\n\n\ndef group_by_length(words):\n    ...\n',
    tests: [
      {
        call: "group_by_length(['a', 'bb', 'cc'])",
        expected: "{1: ['a'], 2: ['bb', 'cc']}",
      },
      { call: 'group_by_length([])', expected: '{}' },
    ],
    solution:
      'from collections import defaultdict\n\n\ndef group_by_length(words):\n    groups = defaultdict(list)\n    for word in words:\n        groups[len(word)].append(word)\n    return dict(groups)\n',
    explanation:
      'A `defaultdict(list)` calls the factory on any missing key, so `groups[k].append(...)` just works. The catch that bites people: merely *reading* `groups[k]` also inserts an empty list, so the dict can grow when you did not expect it to.',
    hints: [
      'The first word of each length has to create the list.',
      '`defaultdict(list)` creates missing values on access.',
      '`groups[len(word)].append(word)`, then `return dict(groups)`.',
    ],
  },
  {
    id: 'coll-005',
    title: 'defaultdict of ints',
    topic: 'collections',
    difficulty: 'easy',
    prompt: 'Write `total_by(records)` summing `(key, amount)` pairs into a plain dict.',
    starter: 'from collections import defaultdict\n\n\ndef total_by(records):\n    ...\n',
    tests: [
      { call: "total_by([('a', 1), ('b', 2), ('a', 3)])", expected: "{'a': 4, 'b': 2}" },
      { call: 'total_by([])', expected: '{}' },
    ],
    solution:
      'from collections import defaultdict\n\n\ndef total_by(records):\n    totals = defaultdict(int)\n    for key, amount in records:\n        totals[key] += amount\n    return dict(totals)\n',
    explanation:
      '`int()` returns 0, so `defaultdict(int)` gives a zero-initialised accumulator and `+=` needs no guard. Any zero-argument callable works as the factory — `defaultdict(set)`, `defaultdict(lambda: [])`, or even `defaultdict(dict)` for nesting.',
    hints: [
      'You want `+=` to work even on the first sighting of a key.',
      '`int()` is 0, so it makes a perfect zero-factory.',
      '`totals = defaultdict(int)`, then `totals[key] += amount`.',
    ],
  },
  {
    id: 'coll-006',
    title: 'deque as a queue',
    topic: 'collections',
    difficulty: 'medium',
    prompt:
      'Write `drain(items)` that pops items from the **front** one at a time and returns them in the order removed, using a `deque`.',
    starter: 'from collections import deque\n\n\ndef drain(items):\n    ...\n',
    tests: [
      { call: 'drain([1, 2, 3])', expected: '[1, 2, 3]' },
      { call: 'drain([])', expected: '[]' },
    ],
    solution:
      'from collections import deque\n\n\ndef drain(items):\n    queue = deque(items)\n    result = []\n    while queue:\n        result.append(queue.popleft())\n    return result\n',
    explanation:
      '`deque.popleft()` is O(1), whereas `list.pop(0)` is O(n) because every remaining element shifts down — turning a queue drain into O(n²). This is the single most common reason to reach for `deque`.',
    hints: [
      '`list.pop(0)` is the slow way — every remaining element shifts down.',
      'A `deque` pops from the left in O(1).',
      '`queue = deque(items)`, then loop `while queue: result.append(queue.popleft())`.',
    ],
  },
  {
    id: 'coll-007',
    title: 'Bounded history with deque',
    topic: 'collections',
    difficulty: 'medium',
    prompt:
      'Write `last_n(items, n)` returning the final `n` items as a list, using a `deque` with a maximum length.',
    starter: 'from collections import deque\n\n\ndef last_n(items, n):\n    ...\n',
    tests: [
      { call: 'last_n([1, 2, 3, 4], 2)', expected: '[3, 4]' },
      { call: 'last_n([1], 5)', expected: '[1]' },
      { call: 'last_n([1, 2], 0)', expected: '[]' },
    ],
    solution:
      'from collections import deque\n\n\ndef last_n(items, n):\n    return list(deque(items, maxlen=n))\n',
    explanation:
      'A `maxlen` deque silently discards from the opposite end when it overflows, which makes it a ready-made sliding window or "last N log lines" buffer. It works on a stream where slicing (`items[-n:]`) would require holding everything in memory.',
    hints: [
      'The container can enforce the bound for you.',
      '`deque` takes a `maxlen` argument and discards from the far end.',
      '`list(deque(items, maxlen=n))`.',
    ],
  },
  {
    id: 'coll-008',
    title: 'Rotate with deque',
    topic: 'collections',
    difficulty: 'medium',
    prompt: 'Write `rotate(items, k)` rotating a list right by `k` using `deque.rotate`.',
    starter: 'from collections import deque\n\n\ndef rotate(items, k):\n    ...\n',
    tests: [
      { call: 'rotate([1, 2, 3, 4], 1)', expected: '[4, 1, 2, 3]' },
      { call: 'rotate([1, 2, 3], -1)', expected: '[2, 3, 1]' },
      { call: 'rotate([], 2)', expected: '[]' },
    ],
    solution:
      'from collections import deque\n\n\ndef rotate(items, k):\n    buffer = deque(items)\n    buffer.rotate(k)\n    return list(buffer)\n',
    explanation:
      '`rotate(k)` moves elements to the right for positive `k` and left for negative, handles oversized values, and copes with an empty deque without raising — unlike a hand-rolled `k % len(items)` which divides by zero.',
    hints: [
      'Build a deque, rotate it, convert back.',
      '`deque.rotate` mutates in place and returns `None`.',
      'It handles negative and oversized `k`, and an empty deque, without raising.',
    ],
  },
  {
    id: 'coll-009',
    title: 'Chain iterables',
    topic: 'collections',
    difficulty: 'easy',
    prompt: 'Using `itertools.chain`, write `concat(lists)` flattening a list of lists by one level.',
    starter: 'from itertools import chain\n\n\ndef concat(lists):\n    ...\n',
    tests: [
      { call: 'concat([[1, 2], [3], []])', expected: '[1, 2, 3]' },
      { call: 'concat([])', expected: '[]' },
    ],
    solution:
      'from itertools import chain\n\n\ndef concat(lists):\n    return list(chain.from_iterable(lists))\n',
    explanation:
      '`chain(*lists)` unpacks every sub-list as an argument, which fails on a very long or infinite outer iterable. `chain.from_iterable` consumes lazily instead, so it is the version to prefer.',
    hints: [
      '`chain` concatenates iterables lazily.',
      '`chain.from_iterable` versus `chain(*lists)` — one of them unpacks eagerly.',
      '`list(chain.from_iterable(lists))`.',
    ],
  },
  {
    id: 'coll-010',
    title: 'groupby needs sorted input',
    topic: 'collections',
    difficulty: 'hard',
    prompt:
      'Using `itertools.groupby`, write `group_by_key(pairs)` grouping `(key, value)` tuples into a dict of key to list of values.\n\nThe input is **not** sorted.',
    starter: 'from itertools import groupby\n\n\ndef group_by_key(pairs):\n    ...\n',
    tests: [
      {
        call: "group_by_key([('a', 1), ('b', 2), ('a', 3)])",
        expected: "{'a': [1, 3], 'b': [2]}",
      },
      { call: 'group_by_key([])', expected: '{}' },
    ],
    solution:
      'from itertools import groupby\nfrom operator import itemgetter\n\n\ndef group_by_key(pairs):\n    ordered = sorted(pairs, key=itemgetter(0))\n    return {\n        key: [value for _, value in group]\n        for key, group in groupby(ordered, key=itemgetter(0))\n    }\n',
    explanation:
      '`groupby` only groups **adjacent** equal keys — it does not sort for you, so unsorted input silently produces duplicate groups. Sorting by the same key first is mandatory. Also note each group is a shared iterator that is invalidated as soon as you advance to the next group, so materialise it immediately.',
    hints: [
      '`groupby` groups consecutive runs only — it does not sort for you.',
      'Sort by the same key first, or you get duplicate groups.',
      'Each group is a shared iterator, so materialise it before moving on.',
    ],
  },
  {
    id: 'coll-011',
    title: 'Compress consecutive runs',
    topic: 'collections',
    difficulty: 'medium',
    prompt:
      'Write `run_lengths(items)` returning `(value, count)` tuples for each consecutive run.',
    starter: 'from itertools import groupby\n\n\ndef run_lengths(items):\n    ...\n',
    tests: [
      {
        call: "run_lengths(['a', 'a', 'b', 'a'])",
        expected: "[('a', 2), ('b', 1), ('a', 1)]",
      },
      { call: 'run_lengths([])', expected: '[]' },
    ],
    solution:
      'from itertools import groupby\n\n\ndef run_lengths(items):\n    return [(value, len(list(group))) for value, group in groupby(items)]\n',
    explanation:
      'This is the case `groupby` was designed for: adjacent-run detection with no sorting. `len(list(group))` is needed because a group is an iterator with no length. Note `"a"` appears twice in the output — runs are not merged, which is exactly right for run-length encoding.',
    hints: [
      'Here you must NOT sort first — runs are defined by adjacency.',
      '`groupby(items)` with no key groups equal neighbours.',
      'A group has no `len()`, so use `len(list(group))`.',
    ],
  },
  {
    id: 'coll-012',
    title: 'Sliding window sums',
    topic: 'collections',
    difficulty: 'hard',
    prompt:
      'Write `window_sums(numbers, size)` returning the sum of each consecutive window of length `size`.\n\nReturn `[]` when the list is shorter than the window.',
    starter: 'def window_sums(numbers, size):\n    ...\n',
    tests: [
      { call: 'window_sums([1, 2, 3, 4], 2)', expected: '[3, 5, 7]' },
      { call: 'window_sums([1, 2], 3)', expected: '[]' },
      { call: 'window_sums([5], 1)', expected: '[5]' },
    ],
    solution:
      'def window_sums(numbers, size):\n    if size <= 0 or len(numbers) < size:\n        return []\n    total = sum(numbers[:size])\n    result = [total]\n    for index in range(size, len(numbers)):\n        total += numbers[index] - numbers[index - size]\n        result.append(total)\n    return result\n',
    explanation:
      'Re-summing each window is O(n*size). Sliding the total — add the entering element, subtract the leaving one — makes it O(n), which is the answer interviewers are after. The guard covers both an oversized window and a nonsensical size.',
    hints: [
      'Do not re-sum each window — consecutive windows overlap.',
      'Add one element, subtract one element as the window slides.',
      'Seed with `sum(numbers[:size])`, then loop from index `size`.',
    ],
  },
  {
    id: 'coll-013',
    title: 'Accumulate a running maximum',
    topic: 'collections',
    difficulty: 'medium',
    prompt:
      'Using `itertools.accumulate`, write `running_max(numbers)` returning the maximum seen so far at each position.',
    starter: 'from itertools import accumulate\n\n\ndef running_max(numbers):\n    ...\n',
    tests: [
      { call: 'running_max([1, 3, 2, 5])', expected: '[1, 3, 3, 5]' },
      { call: 'running_max([])', expected: '[]' },
      { call: 'running_max([2])', expected: '[2]' },
    ],
    solution:
      'from itertools import accumulate\n\n\ndef running_max(numbers):\n    return list(accumulate(numbers, max))\n',
    explanation:
      '`accumulate` takes an optional binary function, defaulting to addition. Passing `max` turns it into a running maximum; `operator.mul` gives a running product. It yields exactly as many values as the input, and yields nothing for an empty input.',
    hints: [
      '`accumulate` defaults to addition, but that is only the default.',
      '`accumulate` accepts a second argument: any binary function.',
      '`list(accumulate(numbers, max))`.',
    ],
  },
  {
    id: 'coll-014',
    title: 'Unique pairs',
    topic: 'collections',
    difficulty: 'medium',
    prompt:
      'Using `itertools.combinations`, write `pairs(items)` returning every unordered pair of distinct positions.',
    starter: 'from itertools import combinations\n\n\ndef pairs(items):\n    ...\n',
    tests: [
      { call: 'pairs([1, 2, 3])', expected: '[(1, 2), (1, 3), (2, 3)]' },
      { call: 'pairs([1])', expected: '[]' },
      { call: 'pairs([])', expected: '[]' },
    ],
    solution:
      'from itertools import combinations\n\n\ndef pairs(items):\n    return list(combinations(items, 2))\n',
    explanation:
      '`combinations` treats order as irrelevant, so `(1, 2)` appears but `(2, 1)` does not — use `permutations` when order matters, and `product` for the cartesian product with another iterable. It emits in input order, so no sorting is needed.',
    hints: [
      'Order does not matter, so `(1, 2)` and `(2, 1)` are the same pair.',
      'combinations vs permutations vs product — pick the one that ignores order.',
      '`list(combinations(items, 2))`.',
    ],
  },
  {
    id: 'coll-015',
    title: 'Cartesian product',
    topic: 'collections',
    difficulty: 'easy',
    prompt: 'Write `matrix(rows, cols)` returning every `(row, col)` coordinate pair.',
    starter: 'from itertools import product\n\n\ndef matrix(rows, cols):\n    ...\n',
    tests: [
      { call: 'matrix([1, 2], [3, 4])', expected: '[(1, 3), (1, 4), (2, 3), (2, 4)]' },
      { call: 'matrix([], [1])', expected: '[]' },
    ],
    solution:
      'from itertools import product\n\n\ndef matrix(rows, cols):\n    return list(product(rows, cols))\n',
    explanation:
      '`product` replaces nested loops and its rightmost argument varies fastest, matching the order of the equivalent nested `for`. It also takes a `repeat=` argument for self-products, which is handy for generating combinations of flags.',
    hints: [
      'This is a nested loop over two sequences.',
      '`product` replaces nested for-loops, rightmost argument varying fastest.',
      '`list(product(rows, cols))`.',
    ],
  },
  {
    id: 'coll-016',
    title: 'Take while a condition holds',
    topic: 'collections',
    difficulty: 'medium',
    prompt:
      'Write `leading_positives(numbers)` returning the prefix of numbers before the first non-positive value.',
    starter: 'from itertools import takewhile\n\n\ndef leading_positives(numbers):\n    ...\n',
    tests: [
      { call: 'leading_positives([1, 2, -1, 3])', expected: '[1, 2]' },
      { call: 'leading_positives([-1, 1])', expected: '[]' },
      { call: 'leading_positives([])', expected: '[]' },
    ],
    solution:
      'from itertools import takewhile\n\n\ndef leading_positives(numbers):\n    return list(takewhile(lambda n: n > 0, numbers))\n',
    explanation:
      '`takewhile` stops at the first failure — unlike a comprehension with `if`, which would keep the `3` after the `-1`. Its mirror `dropwhile` discards the prefix instead. Both are lazy and work on infinite iterators.',
    hints: [
      'A filtering comprehension does not stop early — it would keep the `3`.',
      'You want to stop at the first element that fails the test.',
      '`list(takewhile(lambda n: n > 0, numbers))`.',
    ],
  },
  {
    id: 'coll-017',
    title: 'Islice a generator',
    topic: 'collections',
    difficulty: 'medium',
    prompt:
      'Write `first_n_squares(n)` returning the first `n` squares, taken from an infinite `itertools.count`.',
    starter: 'from itertools import count, islice\n\n\ndef first_n_squares(n):\n    ...\n',
    tests: [
      { call: 'first_n_squares(4)', expected: '[0, 1, 4, 9]' },
      { call: 'first_n_squares(0)', expected: '[]' },
    ],
    solution:
      'from itertools import count, islice\n\n\ndef first_n_squares(n):\n    return list(islice((i * i for i in count()), n))\n',
    explanation:
      '`count()` is infinite, so it can never be sliced with `[:n]` or converted to a list. `islice` applies slice semantics lazily to any iterator, which is what makes an infinite source usable.',
    hints: [
      '`count()` never ends, so it can never be listed or sliced with `[]`.',
      'You cannot slice an iterator with `[]` — but there is a lazy equivalent.',
      '`list(islice((i * i for i in count()), n))`.',
    ],
  },
  {
    id: 'coll-018',
    title: 'OrderedDict vs dict',
    topic: 'collections',
    difficulty: 'medium',
    prompt:
      'Write `move_to_end(mapping, key)` returning a **new** plain dict with `key` moved to the last position.\n\nReturn a copy unchanged when the key is absent.',
    starter: 'def move_to_end(mapping, key):\n    ...\n',
    tests: [
      {
        call: "list(move_to_end({'a': 1, 'b': 2, 'c': 3}, 'a'))",
        expected: "['b', 'c', 'a']",
      },
      {
        call: "move_to_end({'a': 1, 'b': 2}, 'z')",
        expected: "{'a': 1, 'b': 2}",
      },
      { call: "move_to_end({}, 'a')", expected: '{}' },
    ],
    solution:
      'def move_to_end(mapping, key):\n    if key not in mapping:\n        return dict(mapping)\n    result = {k: v for k, v in mapping.items() if k != key}\n    result[key] = mapping[key]\n    return result\n',
    explanation:
      'Since 3.7 a plain dict preserves insertion order, so re-inserting a key at the end reproduces what `OrderedDict.move_to_end` does. Reassigning an existing key does **not** move it — the key keeps its original position — which is why the key must be removed first.',
    hints: [
      'Reassigning an existing key does not change its position.',
      'So the key has to be removed before it can be re-added at the end.',
      'Build a dict without the key, then assign it last.',
    ],
  },
  {
    id: 'coll-019',
    title: 'Counter for anagram grouping',
    topic: 'collections',
    difficulty: 'hard',
    prompt:
      'Write `anagram_groups(words)` returning a list of groups of anagrams.\n\nGroups are sorted alphabetically internally, and the list of groups is sorted by its first word.',
    starter: 'def anagram_groups(words):\n    ...\n',
    tests: [
      {
        call: "anagram_groups(['eat', 'tea', 'tan', 'ate', 'nat'])",
        expected: "[['ate', 'eat', 'tea'], ['nat', 'tan']]",
      },
      { call: 'anagram_groups([])', expected: '[]' },
    ],
    solution:
      "def anagram_groups(words):\n    groups = {}\n    for word in words:\n        signature = ''.join(sorted(word))\n        groups.setdefault(signature, []).append(word)\n    return sorted((sorted(group) for group in groups.values()), key=lambda group: group[0])\n",
    explanation:
      'The trick is choosing a canonical *signature* that all anagrams share — the sorted letters. A `Counter` also works conceptually, but a Counter is unhashable and cannot be a dict key, so you would need `frozenset(Counter(word).items())`. The sorted string is simpler.',
    hints: [
      'Find a key that all anagrams share.',
      'Why can a Counter not be the dict key? It is unhashable.',
      "Sorted letters work: `''.join(sorted(word))`.",
    ],
  },
  {
    id: 'coll-020',
    title: 'Zip with a default',
    topic: 'collections',
    difficulty: 'medium',
    prompt:
      'Using `itertools.zip_longest`, write `pair_up(a, b, fill)` pairing two lists of different lengths.',
    starter: 'from itertools import zip_longest\n\n\ndef pair_up(a, b, fill):\n    ...\n',
    tests: [
      { call: "pair_up([1, 2, 3], ['a'], 'x')", expected: "[(1, 'a'), (2, 'x'), (3, 'x')]" },
      { call: 'pair_up([], [], 0)', expected: '[]' },
    ],
    solution:
      'from itertools import zip_longest\n\n\ndef pair_up(a, b, fill):\n    return list(zip_longest(a, b, fillvalue=fill))\n',
    explanation:
      'Plain `zip` silently truncates to the shortest input, which quietly drops data — a genuinely common source of bugs. `zip_longest` pads instead. In 3.10+, `zip(..., strict=True)` raises when lengths differ, which is the safest option when they are supposed to match.',
    hints: [
      '`zip` truncates silently, which would drop the extra elements.',
      'There is a variant that pads instead of truncating.',
      '`list(zip_longest(a, b, fillvalue=fill))`.',
    ],
  },
  {
    id: 'coll-021',
    title: 'Flatten deeply nested lists',
    topic: 'collections',
    difficulty: 'hard',
    prompt:
      'Write `deep_flatten(data)` flattening arbitrarily nested lists into one flat list.\n\nStrings must not be treated as nested sequences.',
    starter: 'def deep_flatten(data):\n    ...\n',
    tests: [
      { call: 'deep_flatten([1, [2, [3, [4]]]])', expected: '[1, 2, 3, 4]' },
      { call: "deep_flatten(['ab', ['cd']])", expected: "['ab', 'cd']" },
      { call: 'deep_flatten([])', expected: '[]' },
    ],
    solution:
      'def deep_flatten(data):\n    result = []\n    for item in data:\n        if isinstance(item, list):\n            result.extend(deep_flatten(item))\n        else:\n            result.append(item)\n    return result\n',
    explanation:
      'Recursion handles unknown depth naturally. The string caveat is the interesting part: strings are iterable, so a generic `isinstance(item, Iterable)` check would recurse into `"ab"` and never bottom out on single characters, which are themselves strings.',
    hints: [
      'Recurse on the nested case, append on the flat case.',
      'Why are strings a problem for a generic check? They are iterable forever.',
      'So test `isinstance(item, list)` specifically, not `Iterable`.',
    ],
  },
  {
    id: 'coll-022',
    title: 'ChainMap for layered config',
    topic: 'collections',
    difficulty: 'medium',
    prompt:
      'Using `collections.ChainMap`, write `resolve(overrides, defaults, key)` returning the value from `overrides` when present, otherwise from `defaults`, otherwise `None`.',
    starter: 'from collections import ChainMap\n\n\ndef resolve(overrides, defaults, key):\n    ...\n',
    tests: [
      { call: "resolve({'a': 1}, {'a': 2, 'b': 3}, 'a')", expected: '1' },
      { call: "resolve({'a': 1}, {'b': 3}, 'b')", expected: '3' },
      { call: "resolve({}, {}, 'x')", expected: 'None' },
    ],
    solution:
      'from collections import ChainMap\n\n\ndef resolve(overrides, defaults, key):\n    return ChainMap(overrides, defaults).get(key)\n',
    explanation:
      '`ChainMap` searches its mappings left to right without copying them, so later edits to the underlying dicts are visible — unlike `{**defaults, **overrides}`, which snapshots. That makes it a good fit for layered CLI/env/file configuration.',
    hints: [
      'The override layer should be searched before the defaults layer.',
      '`ChainMap` searches left to right, without copying.',
      '`ChainMap(overrides, defaults).get(key)`.',
    ],
  },
  {
    id: 'coll-023',
    title: 'Counter as a multiset',
    topic: 'collections',
    difficulty: 'medium',
    prompt:
      'Write `can_build(letters, word)` returning `True` when `word` can be spelled using the available `letters`, each letter used at most as often as supplied.',
    starter: 'from collections import Counter\n\n\ndef can_build(letters, word):\n    ...\n',
    tests: [
      { call: "can_build('aabbc', 'cab')", expected: 'True' },
      { call: "can_build('abc', 'aab')", expected: 'False' },
      { call: "can_build('', '')", expected: 'True' },
    ],
    solution:
      'from collections import Counter\n\n\ndef can_build(letters, word):\n    return not (Counter(word) - Counter(letters))\n',
    explanation:
      'Counter subtraction keeps only positive counts, so the result is empty exactly when every needed letter is available in sufficient quantity. A plain set intersection would ignore multiplicity and wrongly accept `"aab"` from `"abc"`.',
    hints: [
      'A set would ignore how many times each letter is available.',
      'Counter subtraction drops non-positive counts.',
      'So `Counter(word) - Counter(letters)` is empty exactly when it fits.',
    ],
  },
  {
    id: 'coll-024',
    title: 'Dedupe while preserving order',
    topic: 'collections',
    difficulty: 'easy',
    prompt: 'Write `dedupe(items)` preserving first-appearance order, using a dict rather than a set.',
    starter: 'def dedupe(items):\n    ...\n',
    tests: [
      { call: 'dedupe([3, 1, 3, 2])', expected: '[3, 1, 2]' },
      { call: 'dedupe([])', expected: '[]' },
    ],
    solution: 'def dedupe(items):\n    return list(dict.fromkeys(items))\n',
    explanation:
      '`dict.fromkeys` builds a dict with the items as keys — duplicates collapse, and insertion order is preserved since 3.7. Iterating a dict yields its keys, so `list()` gives the deduplicated sequence in one expression.',
    hints: [
      'Keys are unique and, since 3.7, ordered by insertion.',
      '`dict.fromkeys` is the trick — it builds a dict from an iterable of keys.',
      '`list(dict.fromkeys(items))`.',
    ],
  },
  {
    id: 'coll-025',
    title: 'Heap for the k smallest',
    topic: 'collections',
    difficulty: 'medium',
    prompt: 'Using `heapq`, write `k_smallest(numbers, k)` returning the `k` smallest values, ascending.',
    starter: 'import heapq\n\n\ndef k_smallest(numbers, k):\n    ...\n',
    tests: [
      { call: 'k_smallest([5, 1, 4, 2], 2)', expected: '[1, 2]' },
      { call: 'k_smallest([1], 5)', expected: '[1]' },
      { call: 'k_smallest([], 3)', expected: '[]' },
    ],
    solution: 'import heapq\n\n\ndef k_smallest(numbers, k):\n    return heapq.nsmallest(k, numbers)\n',
    explanation:
      '`nsmallest` keeps a bounded heap, making it O(n log k) and constant in memory relative to `k` — better than sorting when `k` is small and `n` is huge. Both `nsmallest` and `nlargest` accept a `key=` argument like `sorted`.',
    hints: [
      'Sorting everything is O(n log n) when you only need `k` values.',
      '`heapq.nsmallest` keeps a bounded heap instead.',
      '`return heapq.nsmallest(k, numbers)` — it already returns them ascending.',
    ],
  },
  {
    id: 'coll-026',
    title: 'Bisect into a sorted list',
    topic: 'collections',
    difficulty: 'hard',
    prompt:
      'Using `bisect`, write `insert_sorted(items, value)` inserting `value` into an already-sorted list **in place**, keeping it sorted. Return `None`.',
    starter: 'import bisect\n\n\ndef insert_sorted(items, value):\n    ...\n',
    tests: [
      {
        setup: 'data = [1, 3, 5]',
        call: 'insert_sorted(data, 4)\ndata',
        expected: '[1, 3, 4, 5]',
      },
      {
        setup: 'data = []',
        call: 'insert_sorted(data, 1)\ndata',
        expected: '[1]',
      },
      {
        setup: 'data = [1, 1]',
        call: 'insert_sorted(data, 1)\ndata',
        expected: '[1, 1, 1]',
      },
    ],
    solution: 'import bisect\n\n\ndef insert_sorted(items, value):\n    bisect.insort(items, value)\n',
    explanation:
      '`insort` finds the position with a binary search (O(log n)) then inserts (O(n) for the shift) — much cheaper than appending and re-sorting the whole list. `bisect_left` and `bisect_right` differ only in which side of equal values they land on.',
    hints: [
      'Appending and re-sorting throws away the fact that the list is already sorted.',
      'A binary search finds the insertion point in O(log n).',
      '`bisect.insort` does the search and the insert, in place.',
    ],
  },
  {
    id: 'coll-027',
    title: 'namedtuple with defaults',
    topic: 'collections',
    difficulty: 'medium',
    prompt:
      'Define `Server` with fields `host`, `port` and `secure`, where `port` defaults to 443 and `secure` to `True`.\n\nWrite `make_server(host)` returning one.',
    starter: 'from collections import namedtuple\n\n\ndef make_server(host):\n    ...\n',
    tests: [
      { call: "make_server('a').port", expected: '443' },
      { call: "make_server('a').secure", expected: 'True' },
      { call: "make_server('a')", expected: "('a', 443, True)" },
    ],
    solution:
      "from collections import namedtuple\n\nServer = namedtuple('Server', ['host', 'port', 'secure'], defaults=[443, True])\n\n\ndef make_server(host):\n    return Server(host)\n",
    explanation:
      '`defaults` applies to the **rightmost** fields, mirroring how default arguments work in a normal function signature. Since 3.7 you can pass it directly; before that you had to assign to `Server.__new__.__defaults__`.',
    hints: [
      'Create the class once at module level, then just call it.',
      '`namedtuple(..., defaults=[...])` fills from the right.',
      "`Server = namedtuple('Server', ['host', 'port', 'secure'], defaults=[443, True])`.",
    ],
  },
  {
    id: 'coll-028',
    title: 'Nested defaultdict',
    topic: 'collections',
    difficulty: 'hard',
    prompt:
      'Write `pivot(records)` where each record is `(region, product, amount)`, returning a plain nested dict `{region: {product: total}}`.',
    starter: 'from collections import defaultdict\n\n\ndef pivot(records):\n    ...\n',
    tests: [
      {
        call: "pivot([('eu', 'a', 1), ('eu', 'a', 2), ('us', 'b', 5)])",
        expected: "{'eu': {'a': 3}, 'us': {'b': 5}}",
      },
      { call: 'pivot([])', expected: '{}' },
    ],
    solution:
      'from collections import defaultdict\n\n\ndef pivot(records):\n    totals = defaultdict(lambda: defaultdict(int))\n    for region, product, amount in records:\n        totals[region][product] += amount\n    return {region: dict(inner) for region, inner in totals.items()}\n',
    explanation:
      'The factory must be a callable that *returns* a defaultdict, hence the lambda — writing `defaultdict(defaultdict(int))` passes an instance rather than a factory and raises TypeError. Converting back to plain dicts at the end matters, because a defaultdict compares equal to a dict but keeps creating keys on access.',
    hints: [
      'Both levels need to spring into existence on first access.',
      'The factory must be callable, not an instance — so wrap it in a lambda.',
      '`defaultdict(lambda: defaultdict(int))`, then convert the inner dicts back at the end.',
    ],
  },  {
    id: 'coll-029',
    title: 'Counter total',
    topic: 'collections',
    difficulty: 'easy',
    prompt:
      'Write `total_items(items)` returning the total number of items counted, using a `Counter`.',
    starter: 'from collections import Counter\n\n\ndef total_items(items):\n    ...\n',
    tests: [
      { call: "total_items(['a', 'b', 'a'])", expected: '3' },
      { call: 'total_items([])', expected: '0' },
    ],
    solution:
      'from collections import Counter\n\n\ndef total_items(items):\n    return sum(Counter(items).values())\n',
    explanation:
      '`len(counter)` gives the number of *distinct* keys, not the total count \u2014 confusing the two is a common slip. Summing `.values()` gives the real total. Python 3.10 added `Counter.total()` for exactly this.',
    hints: [
      '`len(counter)` counts distinct keys, not occurrences.',
      'You need the sum of the counts.',
      '`sum(Counter(items).values())`, or `.total()` on 3.10+.',
    ],
  },
  {
    id: 'coll-030',
    title: 'Counter union and intersection',
    topic: 'collections',
    difficulty: 'medium',
    prompt:
      'Write `shared_stock(a, b)` returning a plain dict with, for each item present in both lists, the smaller of the two counts.',
    starter: 'from collections import Counter\n\n\ndef shared_stock(a, b):\n    ...\n',
    tests: [
      {
        call: "shared_stock(['x', 'x', 'y'], ['x', 'y', 'y'])",
        expected: "{'x': 1, 'y': 1}",
      },
      { call: "shared_stock(['x'], ['y'])", expected: '{}' },
      { call: 'shared_stock([], [])', expected: '{}' },
    ],
    solution:
      'from collections import Counter\n\n\ndef shared_stock(a, b):\n    return dict(Counter(a) & Counter(b))\n',
    explanation:
      '`&` on Counters takes the *minimum* of each count, and `|` takes the maximum \u2014 a multiset intersection and union, not the set versions. Items ending at zero are dropped automatically, which is why the second case is empty.',
    hints: [
      'Counters support the set operators, but with count-aware meanings.',
      '`&` takes the minimum of each count; `|` takes the maximum.',
      '`dict(Counter(a) & Counter(b))`.',
    ],
  },
  {
    id: 'coll-031',
    title: 'deque appendleft',
    topic: 'collections',
    difficulty: 'easy',
    prompt:
      'Write `prepend_all(items)` building a deque by adding each item to the **front**, returning it as a list.',
    starter: 'from collections import deque\n\n\ndef prepend_all(items):\n    ...\n',
    tests: [
      { call: 'prepend_all([1, 2, 3])', expected: '[3, 2, 1]' },
      { call: 'prepend_all([])', expected: '[]' },
    ],
    solution:
      'from collections import deque\n\n\ndef prepend_all(items):\n    buffer = deque()\n    for item in items:\n        buffer.appendleft(item)\n    return list(buffer)\n',
    explanation:
      '`appendleft` is O(1) on a deque, whereas `list.insert(0, item)` is O(n) because every element shifts. Repeatedly prepending naturally reverses the input order.',
    hints: [
      '`list.insert(0, x)` would be O(n) each time.',
      'A deque can push to the front in O(1).',
      'Repeated `appendleft` reverses the order for you.',
    ],
  },
  {
    id: 'coll-032',
    title: 'Counter from a dict',
    topic: 'collections',
    difficulty: 'medium',
    prompt:
      'Write `restock(current, delivery)` where both are `{item: count}` dicts, returning their summed counts as a plain dict.',
    starter: 'from collections import Counter\n\n\ndef restock(current, delivery):\n    ...\n',
    tests: [
      { call: "restock({'a': 1}, {'a': 2, 'b': 3})", expected: "{'a': 3, 'b': 3}" },
      { call: 'restock({}, {})', expected: '{}' },
      { call: "restock({'a': 1}, {})", expected: "{'a': 1}" },
    ],
    solution:
      'from collections import Counter\n\n\ndef restock(current, delivery):\n    return dict(Counter(current) + Counter(delivery))\n',
    explanation:
      '`Counter` accepts an existing mapping of counts, not just a sequence to count. `+` then merges by adding, unlike `dict.update` which would overwrite. Be aware `+` also strips out any non-positive results.',
    hints: [
      '`Counter` can be built from a dict of counts directly.',
      '`+` on Counters adds the counts rather than overwriting.',
      '`dict(Counter(current) + Counter(delivery))`.',
    ],
  },
  {
    id: 'coll-033',
    title: 'Group into a dict of counters',
    topic: 'collections',
    difficulty: 'hard',
    prompt:
      'Write `status_by_page(events)` where each event is `(page, status)`, returning `{page: {status: count}}` as plain dicts.',
    starter: 'from collections import defaultdict, Counter\n\n\ndef status_by_page(events):\n    ...\n',
    tests: [
      {
        call: "status_by_page([('/a', 200), ('/a', 200), ('/a', 404), ('/b', 200)])",
        expected: "{'/a': {200: 2, 404: 1}, '/b': {200: 1}}",
      },
      { call: 'status_by_page([])', expected: '{}' },
    ],
    solution:
      'from collections import defaultdict, Counter\n\n\ndef status_by_page(events):\n    groups = defaultdict(Counter)\n    for page, status in events:\n        groups[page][status] += 1\n    return {page: dict(counts) for page, counts in groups.items()}\n',
    explanation:
      '`defaultdict(Counter)` composes the two: the outer level creates a Counter on demand, and the Counter itself tolerates missing keys as zero. Here `Counter` is passed as the factory directly, since it takes no required arguments \u2014 no lambda needed.',
    hints: [
      'Combine the two tools \u2014 one per level.',
      '`Counter` takes no required arguments, so it works as a factory directly.',
      '`defaultdict(Counter)`, then `groups[page][status] += 1`.',
    ],
  },
  {
    id: 'coll-034',
    title: 'Longest group with groupby',
    topic: 'collections',
    difficulty: 'medium',
    prompt:
      'Write `longest_run_value(items)` returning the value of the longest consecutive run.\n\nOn a tie return the earliest; return `None` when empty.',
    starter: 'from itertools import groupby\n\n\ndef longest_run_value(items):\n    ...\n',
    tests: [
      { call: "longest_run_value(['a', 'b', 'b', 'c'])", expected: "'b'" },
      { call: "longest_run_value(['a', 'b'])", expected: "'a'" },
      { call: 'longest_run_value([])', expected: 'None' },
    ],
    solution:
      'from itertools import groupby\n\n\ndef longest_run_value(items):\n    runs = [(value, len(list(group))) for value, group in groupby(items)]\n    if not runs:\n        return None\n    return max(runs, key=lambda run: run[1])[0]\n',
    explanation:
      'Materialise the runs first, then pick the longest. `max` returns the first maximal element, which gives the earliest-wins tie-break for free. Trying to call `max` directly on the `groupby` output fails, because each group iterator is invalidated as soon as you move on.',
    hints: [
      '`groupby` gives you the runs \u2014 measure each one.',
      'Materialise them into a list first; group iterators expire.',
      '`max` returns the first maximal element, handling the tie-break.',
    ],
  },
  {
    id: 'coll-035',
    title: 'Dropwhile',
    topic: 'collections',
    difficulty: 'medium',
    prompt:
      'Write `skip_header(lines)` discarding leading lines that start with `#`, keeping everything after the first real line.',
    starter: 'from itertools import dropwhile\n\n\ndef skip_header(lines):\n    ...\n',
    tests: [
      {
        call: "skip_header(['# a', '# b', 'data', '# c'])",
        expected: "['data', '# c']",
      },
      { call: "skip_header(['data'])", expected: "['data']" },
      { call: 'skip_header([])', expected: '[]' },
    ],
    solution:
      "from itertools import dropwhile\n\n\ndef skip_header(lines):\n    return list(dropwhile(lambda line: line.startswith('#'), lines))\n",
    explanation:
      '`dropwhile` discards only the *leading* run that satisfies the predicate and then yields everything else untouched \u2014 which is why the trailing `# c` survives. A filtering comprehension would have removed that one too.',
    hints: [
      'A filtering comprehension would also drop the later comment line.',
      'You want to stop discarding after the first non-match.',
      '`dropwhile` is the mirror of `takewhile`.',
    ],
  },
  {
    id: 'coll-036',
    title: 'Permutations of a word',
    topic: 'collections',
    difficulty: 'medium',
    prompt:
      'Write `arrangements(letters)` returning the sorted distinct strings formed by using every letter once.',
    starter: 'from itertools import permutations\n\n\ndef arrangements(letters):\n    ...\n',
    tests: [
      { call: "arrangements('ab')", expected: "['ab', 'ba']" },
      { call: "arrangements('aa')", expected: "['aa']" },
      { call: "arrangements('')", expected: "['']" },
    ],
    solution:
      "from itertools import permutations\n\n\ndef arrangements(letters):\n    return sorted({''.join(p) for p in permutations(letters)})\n",
    explanation:
      '`permutations` yields tuples of characters, so each needs joining. It also treats positions as distinct rather than values, so repeated letters produce duplicate strings \u2014 the set comprehension removes them. Note `permutations("")` yields one empty tuple, hence `[\'\']`.',
    hints: [
      '`permutations` yields tuples, so join each one.',
      'It permutes positions, not values, so repeats produce duplicates.',
      'Deduplicate with a set before sorting.',
    ],
  },
  {
    id: 'coll-037',
    title: 'Combinations with replacement',
    topic: 'collections',
    difficulty: 'medium',
    prompt:
      'Write `dice_pairs(sides)` returning every unordered pair of rolls from two dice with `sides` faces, as `(low, high)` tuples.',
    starter:
      'from itertools import combinations_with_replacement\n\n\ndef dice_pairs(sides):\n    ...\n',
    tests: [
      { call: 'dice_pairs(2)', expected: '[(1, 1), (1, 2), (2, 2)]' },
      { call: 'dice_pairs(1)', expected: '[(1, 1)]' },
      { call: 'dice_pairs(0)', expected: '[]' },
    ],
    solution:
      'from itertools import combinations_with_replacement\n\n\ndef dice_pairs(sides):\n    return list(combinations_with_replacement(range(1, sides + 1), 2))\n',
    explanation:
      'Plain `combinations` would exclude `(1, 1)` because it never reuses an element. `combinations_with_replacement` allows repeats while still ignoring order, which is exactly the "two dice, order irrelevant" model.',
    hints: [
      'Plain `combinations` would miss the doubles.',
      'You need the variant that allows an element to repeat.',
      '`combinations_with_replacement(range(1, sides + 1), 2)`.',
    ],
  },
  {
    id: 'coll-038',
    title: 'Cycle a short list',
    topic: 'collections',
    difficulty: 'medium',
    prompt:
      'Write `assign(tasks, workers)` distributing tasks round-robin, returning `(task, worker)` pairs.\n\nReturn `[]` when there are no workers.',
    starter: 'from itertools import cycle\n\n\ndef assign(tasks, workers):\n    ...\n',
    tests: [
      {
        call: "assign(['t1', 't2', 't3'], ['a', 'b'])",
        expected: "[('t1', 'a'), ('t2', 'b'), ('t3', 'a')]",
      },
      { call: "assign(['t1'], [])", expected: '[]' },
      { call: "assign([], ['a'])", expected: '[]' },
    ],
    solution:
      'from itertools import cycle\n\n\ndef assign(tasks, workers):\n    if not workers:\n        return []\n    return list(zip(tasks, cycle(workers)))\n',
    explanation:
      '`cycle` repeats forever, and `zip` stopping at the shorter side is what makes the pairing terminate. The empty-workers guard is essential: `cycle([])` yields nothing, so `zip` would return `[]` \u2014 correct here, but `next(cycle([]))` would raise if used differently.',
    hints: [
      '`cycle` repeats an iterable forever.',
      '`zip` stops at the shorter side, which bounds the result.',
      'Guard the empty-workers case before cycling.',
    ],
  },
  {
    id: 'coll-039',
    title: 'Repeat a value',
    topic: 'collections',
    difficulty: 'easy',
    prompt:
      'Write `padded(items, size, filler)` right-padding a list to `size` using `itertools.repeat`.\n\nLonger lists are returned unchanged.',
    starter: 'from itertools import repeat\n\n\ndef padded(items, size, filler):\n    ...\n',
    tests: [
      { call: 'padded([1, 2], 4, 0)', expected: '[1, 2, 0, 0]' },
      { call: 'padded([1, 2, 3], 2, 0)', expected: '[1, 2, 3]' },
      { call: 'padded([], 2, None)', expected: '[None, None]' },
    ],
    solution:
      'from itertools import repeat\n\n\ndef padded(items, size, filler):\n    missing = max(0, size - len(items))\n    return list(items) + list(repeat(filler, missing))\n',
    explanation:
      '`repeat(value, n)` yields the value `n` times without building an intermediate list. The `max(0, ...)` guard is what makes over-long inputs pass through untouched \u2014 a negative count would otherwise be silently treated as zero anyway, but the intent is clearer stated.',
    hints: [
      'Work out how many fillers are missing first.',
      'Clamp that count at zero for the over-long case.',
      '`repeat(filler, missing)` produces exactly that many.',
    ],
  },
  {
    id: 'coll-040',
    title: 'Filterfalse',
    topic: 'collections',
    difficulty: 'easy',
    prompt:
      'Write `rejected(numbers, limit)` returning the numbers that are **not** above `limit`, using `itertools.filterfalse`.',
    starter: 'from itertools import filterfalse\n\n\ndef rejected(numbers, limit):\n    ...\n',
    tests: [
      { call: 'rejected([1, 5, 9], 4)', expected: '[1]' },
      { call: 'rejected([9], 4)', expected: '[]' },
      { call: 'rejected([], 4)', expected: '[]' },
    ],
    solution:
      'from itertools import filterfalse\n\n\ndef rejected(numbers, limit):\n    return list(filterfalse(lambda n: n > limit, numbers))\n',
    explanation:
      '`filterfalse` keeps the items where the predicate is false, saving you from writing `not (...)`. It is the complement of the built-in `filter`, and pairing the two lets you partition without evaluating the predicate twice in source.',
    hints: [
      'It is the complement of the built-in `filter`.',
      'It keeps the items where the predicate is false.',
      'So pass the positive predicate `n > limit` unchanged.',
    ],
  },
  {
    id: 'coll-041',
    title: 'Counter of a Counter',
    topic: 'collections',
    difficulty: 'hard',
    prompt:
      'Write `count_of_counts(items)` returning `{frequency: how_many_items_had_it}` as a plain dict.',
    starter: 'from collections import Counter\n\n\ndef count_of_counts(items):\n    ...\n',
    tests: [
      {
        call: "count_of_counts(['a', 'a', 'b', 'c', 'c'])",
        expected: '{2: 2, 1: 1}',
      },
      { call: 'count_of_counts([])', expected: '{}' },
    ],
    solution:
      'from collections import Counter\n\n\ndef count_of_counts(items):\n    return dict(Counter(Counter(items).values()))\n',
    explanation:
      'Counting the counts is a frequency histogram \u2014 useful for spotting distributions like "how many words appear exactly once". The inner `Counter` produces the per-item counts, and the outer one tallies those numbers.',
    hints: [
      'Count the items first, then count the resulting numbers.',
      'The second count operates on `.values()`, not the keys.',
      '`Counter(Counter(items).values())`.',
    ],
  },
  {
    id: 'coll-042',
    title: 'Rotate a deque both ways',
    topic: 'collections',
    difficulty: 'medium',
    prompt:
      'Write `shift_window(items, steps)` rotating **left** by `steps`, returning a list.',
    starter: 'from collections import deque\n\n\ndef shift_window(items, steps):\n    ...\n',
    tests: [
      { call: 'shift_window([1, 2, 3, 4], 1)', expected: '[2, 3, 4, 1]' },
      { call: 'shift_window([1, 2, 3], 0)', expected: '[1, 2, 3]' },
      { call: 'shift_window([], 2)', expected: '[]' },
    ],
    solution:
      'from collections import deque\n\n\ndef shift_window(items, steps):\n    buffer = deque(items)\n    buffer.rotate(-steps)\n    return list(buffer)\n',
    explanation:
      '`rotate` moves right for positive values, so a left rotation is simply a negative one. Getting the sign backwards is the whole difficulty of this exercise.',
    hints: [
      '`rotate` moves elements to the right for a positive argument.',
      'You want the opposite direction.',
      'So negate it: `buffer.rotate(-steps)`.',
    ],
  },
  {
    id: 'coll-043',
    title: 'namedtuple _asdict',
    topic: 'collections',
    difficulty: 'medium',
    prompt:
      'Define `Point` with fields `x` and `y`, then write `to_dict(point)` returning it as a plain dict.',
    starter: 'from collections import namedtuple\n\n\ndef to_dict(point):\n    ...\n',
    tests: [
      { call: 'to_dict(Point(1, 2))', expected: "{'x': 1, 'y': 2}" },
      { call: 'list(to_dict(Point(1, 2)))', expected: "['x', 'y']" },
    ],
    solution:
      "from collections import namedtuple\n\nPoint = namedtuple('Point', ['x', 'y'])\n\n\ndef to_dict(point):\n    return dict(point._asdict())\n",
    explanation:
      '`_asdict()` returns a dict of field names to values, in field order \u2014 handy for JSON serialisation. Since 3.8 it already returns a plain `dict`, so the wrapper is defensive rather than strictly required.',
    hints: [
      'A namedtuple knows its own field names.',
      'There is a method that exposes them as a mapping.',
      '`point._asdict()`.',
    ],
  },
  {
    id: 'coll-044',
    title: 'Batched iteration',
    topic: 'collections',
    difficulty: 'hard',
    prompt:
      'Write `batched(items, size)` yielding consecutive tuples of up to `size` elements, using `itertools.islice` and an iterator.\n\nReturn a list of tuples.',
    starter: 'from itertools import islice\n\n\ndef batched(items, size):\n    ...\n',
    tests: [
      { call: 'batched([1, 2, 3, 4, 5], 2)', expected: '[(1, 2), (3, 4), (5,)]' },
      { call: 'batched([], 3)', expected: '[]' },
      { call: 'batched([1], 3)', expected: '[(1,)]' },
    ],
    solution:
      'from itertools import islice\n\n\ndef batched(items, size):\n    iterator = iter(items)\n    result = []\n    while True:\n        chunk = tuple(islice(iterator, size))\n        if not chunk:\n            return result\n        result.append(chunk)\n',
    explanation:
      'Because `islice` consumes from a single shared iterator, each call picks up where the last one stopped \u2014 that is what makes the loop advance. An empty chunk is the end-of-input signal. Python 3.12 added `itertools.batched` doing exactly this.',
    hints: [
      'Create the iterator once, outside the loop.',
      'Each `islice` call consumes from where the previous one stopped.',
      'An empty chunk means the input is exhausted.',
    ],
  },
  {
    id: 'coll-045',
    title: 'Most common with a tie-break',
    topic: 'collections',
    difficulty: 'hard',
    prompt:
      'Write `top_alphabetical(items, n)` returning the `n` most common items, breaking ties alphabetically, as a list of names.',
    starter: 'from collections import Counter\n\n\ndef top_alphabetical(items, n):\n    ...\n',
    tests: [
      {
        call: "top_alphabetical(['b', 'a', 'b', 'c', 'a'], 2)",
        expected: "['a', 'b']",
      },
      { call: "top_alphabetical(['z', 'a'], 1)", expected: "['a']" },
      { call: 'top_alphabetical([], 2)', expected: '[]' },
    ],
    solution:
      'from collections import Counter\n\n\ndef top_alphabetical(items, n):\n    counts = Counter(items)\n    ordered = sorted(counts, key=lambda item: (-counts[item], item))\n    return ordered[:n]\n',
    explanation:
      '`most_common` breaks ties by insertion order, which is not alphabetical \u2014 the second test would return `["z"]` if you relied on it. Sorting the keys with an explicit tuple key gives a deterministic, specified ordering.',
    hints: [
      '`most_common` breaks ties by insertion order, not alphabetically.',
      'Count first, then sort the keys yourself.',
      '`key=lambda item: (-counts[item], item)`.',
    ],
  },
  {
    id: 'coll-046',
    title: 'Chain a dict of lists',
    topic: 'collections',
    difficulty: 'medium',
    prompt:
      'Write `all_members(teams)` where `teams` is `{name: [member, ...]}`, returning every member sorted.',
    starter: 'from itertools import chain\n\n\ndef all_members(teams):\n    ...\n',
    tests: [
      {
        call: "all_members({'a': ['x', 'y'], 'b': ['z']})",
        expected: "['x', 'y', 'z']",
      },
      { call: 'all_members({})', expected: '[]' },
      { call: "all_members({'a': []})", expected: '[]' },
    ],
    solution:
      'from itertools import chain\n\n\ndef all_members(teams):\n    return sorted(chain.from_iterable(teams.values()))\n',
    explanation:
      '`teams.values()` is an iterable of lists, which is exactly what `chain.from_iterable` wants. Sorting afterwards makes the result deterministic regardless of the dict ordering.',
    hints: [
      'You want to flatten the values, not the keys.',
      '`chain.from_iterable` takes an iterable of iterables.',
      '`sorted(chain.from_iterable(teams.values()))`.',
    ],
  },
  {
    id: 'coll-047',
    title: 'Pairwise from itertools',
    topic: 'collections',
    difficulty: 'easy',
    prompt:
      'Write `is_sorted(numbers)` returning `True` when the list is non-decreasing.\n\nEmpty and single-element lists count as sorted.',
    starter: 'def is_sorted(numbers):\n    ...\n',
    tests: [
      { call: 'is_sorted([1, 2, 2, 3])', expected: 'True' },
      { call: 'is_sorted([2, 1])', expected: 'False' },
      { call: 'is_sorted([])', expected: 'True' },
      { call: 'is_sorted([5])', expected: 'True' },
    ],
    solution:
      'def is_sorted(numbers):\n    return all(a <= b for a, b in zip(numbers, numbers[1:]))\n',
    explanation:
      'Comparing each adjacent pair with `all` short-circuits on the first violation, so it beats `numbers == sorted(numbers)` which always does the full O(n log n) sort. `<=` rather than `<` is what allows equal neighbours.',
    hints: [
      '`numbers == sorted(numbers)` works but does far more work than needed.',
      'You only need to compare adjacent pairs.',
      'Use `<=` so equal neighbours are allowed.',
    ],
  },
  {
    id: 'coll-048',
    title: 'defaultdict pitfall',
    topic: 'collections',
    difficulty: 'hard',
    prompt:
      'Write `safe_peek(groups, key)` returning the list stored at `key` in a `defaultdict(list)`, **without** inserting the key.\n\nReturn `[]` when absent.',
    starter: 'def safe_peek(groups, key):\n    return groups[key]\n',
    tests: [
      {
        setup: "from collections import defaultdict\ndata = defaultdict(list)\ndata['a'].append(1)",
        call: "safe_peek(data, 'a')",
        expected: '[1]',
      },
      {
        setup: 'from collections import defaultdict\ndata = defaultdict(list)',
        call: "safe_peek(data, 'z')\ndict(data)",
        expected: '{}',
      },
    ],
    solution: 'def safe_peek(groups, key):\n    return groups.get(key, [])\n',
    explanation:
      'This is the defaultdict trap: `groups[key]` *creates* the key on read, so merely inspecting a defaultdict can grow it. `.get()` does not trigger the factory, which is why it is the correct way to look without touching.',
    hints: [
      'Reading `groups[key]` on a defaultdict has a side effect.',
      'It calls the factory and inserts the key.',
      '`.get()` does not trigger the factory.',
    ],
  },
  {
    id: 'coll-049',
    title: 'Merge sorted iterables',
    topic: 'collections',
    difficulty: 'medium',
    prompt:
      'Using `heapq.merge`, write `merge_all(sorted_lists)` merging several already-sorted lists into one sorted list.',
    starter: 'import heapq\n\n\ndef merge_all(sorted_lists):\n    ...\n',
    tests: [
      { call: 'merge_all([[1, 4], [2, 3], [5]])', expected: '[1, 2, 3, 4, 5]' },
      { call: 'merge_all([])', expected: '[]' },
      { call: 'merge_all([[]])', expected: '[]' },
    ],
    solution:
      'import heapq\n\n\ndef merge_all(sorted_lists):\n    return list(heapq.merge(*sorted_lists))\n',
    explanation:
      '`heapq.merge` is lazy and only ever holds one element per input in memory, so it can merge files far larger than RAM \u2014 the classic external-sort building block. Concatenating and re-sorting would need everything in memory at once.',
    hints: [
      'Concatenating and re-sorting throws away the existing order.',
      '`heapq.merge` takes the iterables as separate arguments.',
      '`list(heapq.merge(*sorted_lists))`.',
    ],
  },
  {
    id: 'coll-050',
    title: 'Find the insertion point',
    topic: 'collections',
    difficulty: 'medium',
    prompt:
      'Using `bisect`, write `rank_of(sorted_scores, score)` returning how many scores are strictly less than `score`.',
    starter: 'import bisect\n\n\ndef rank_of(sorted_scores, score):\n    ...\n',
    tests: [
      { call: 'rank_of([10, 20, 30], 20)', expected: '1' },
      { call: 'rank_of([10, 20, 30], 5)', expected: '0' },
      { call: 'rank_of([10, 20, 30], 99)', expected: '3' },
      { call: 'rank_of([], 5)', expected: '0' },
    ],
    solution:
      'import bisect\n\n\ndef rank_of(sorted_scores, score):\n    return bisect.bisect_left(sorted_scores, score)\n',
    explanation:
      '`bisect_left` returns the index where the value would be inserted to keep the list sorted, placing it *before* any equal values \u2014 which is precisely the count of strictly smaller elements. `bisect_right` would count equal ones too.',
    hints: [
      'The insertion index is the answer.',
      '`bisect_left` and `bisect_right` differ on where equal values land.',
      'You want the one that inserts before equals: `bisect_left`.',
    ],
  },
  {
    id: 'coll-051',
    title: 'Counter subtract keeps negatives',
    topic: 'collections',
    difficulty: 'hard',
    prompt:
      'Write `shortfall(needed, available)` returning `{item: missing_count}` for items where there are not enough, as a plain dict.',
    starter: 'from collections import Counter\n\n\ndef shortfall(needed, available):\n    ...\n',
    tests: [
      {
        call: "shortfall({'a': 3, 'b': 1}, {'a': 1})",
        expected: "{'a': 2, 'b': 1}",
      },
      { call: "shortfall({'a': 1}, {'a': 5})", expected: '{}' },
      { call: 'shortfall({}, {})', expected: '{}' },
    ],
    solution:
      'from collections import Counter\n\n\ndef shortfall(needed, available):\n    return dict(Counter(needed) - Counter(available))\n',
    explanation:
      'The `-` operator on Counters drops zero and negative results, which here is exactly right: an item you have enough of should not appear. Note `Counter.subtract()` is different \u2014 it mutates and *keeps* negative counts.',
    hints: [
      'Subtraction is the operation, but which kind?',
      'The `-` operator drops non-positive results; `.subtract()` keeps them.',
      'Here you want the operator: `Counter(needed) - Counter(available)`.',
    ],
  },
  {
    id: 'coll-052',
    title: 'Zip strict',
    topic: 'collections',
    difficulty: 'medium',
    prompt:
      'Write `pair_exactly(a, b)` returning zipped pairs, or `None` when the two lists have different lengths.',
    starter: 'def pair_exactly(a, b):\n    ...\n',
    tests: [
      { call: "pair_exactly([1, 2], ['a', 'b'])", expected: "[(1, 'a'), (2, 'b')]" },
      { call: "pair_exactly([1], ['a', 'b'])", expected: 'None' },
      { call: 'pair_exactly([], [])', expected: '[]' },
    ],
    solution:
      'def pair_exactly(a, b):\n    if len(a) != len(b):\n        return None\n    return list(zip(a, b))\n',
    explanation:
      'Plain `zip` truncates silently, which hides bugs. Checking the lengths first makes the mismatch explicit. On 3.10+ `zip(a, b, strict=True)` raises `ValueError` instead, which you would catch \u2014 either approach beats silent data loss.',
    hints: [
      'Plain `zip` would silently drop the extra elements.',
      'Check the lengths before zipping.',
      'On 3.10+, `zip(a, b, strict=True)` raises instead.',
    ],
  },
  {
    id: 'coll-053',
    title: 'Sliding window with a deque',
    topic: 'collections',
    difficulty: 'hard',
    prompt:
      'Write `windows(items, size)` returning every consecutive window of length `size` as a list of lists, using a `maxlen` deque.\n\nReturn `[]` when the input is shorter than the window.',
    starter: 'from collections import deque\n\n\ndef windows(items, size):\n    ...\n',
    tests: [
      { call: 'windows([1, 2, 3, 4], 2)', expected: '[[1, 2], [2, 3], [3, 4]]' },
      { call: 'windows([1, 2], 3)', expected: '[]' },
      { call: 'windows([1], 1)', expected: '[[1]]' },
    ],
    solution:
      'from collections import deque\n\n\ndef windows(items, size):\n    if size <= 0:\n        return []\n    buffer = deque(maxlen=size)\n    result = []\n    for item in items:\n        buffer.append(item)\n        if len(buffer) == size:\n            result.append(list(buffer))\n    return result\n',
    explanation:
      'A `maxlen` deque drops the oldest element automatically as each new one arrives, so the window maintains itself. Appending `list(buffer)` rather than `buffer` is essential \u2014 otherwise every entry in the result would reference the same deque and show only the final window.',
    hints: [
      'A `maxlen` deque discards the oldest element for you.',
      'Only record a window once the buffer is full.',
      'Append a *copy* \u2014 `list(buffer)` \u2014 or every entry aliases the same deque.',
    ],
  },];
