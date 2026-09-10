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
    hints: ['`Counter(iterable)` counts for you.'],
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
    hints: ['`Counter.most_common(n)`.'],
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
    hints: ['A missing key in a Counter is 0.', 'Why is `new - old` not enough?'],
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
    hints: ['`defaultdict(list)` creates missing values.'],
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
    hints: ['`int()` is 0.'],
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
    hints: ['`list.pop(0)` is the slow way.'],
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
    hints: ['`deque` takes a `maxlen` argument.'],
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
    hints: ['`deque.rotate` mutates in place and returns None.'],
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
    hints: ['`chain.from_iterable` versus `chain(*lists)`.'],
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
    hints: ['`groupby` groups consecutive runs only.', 'Sort by the same key first.'],
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
    hints: ['Here you must NOT sort first.'],
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
    hints: ['Do not re-sum each window.', 'Add one element, subtract one element.'],
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
    hints: ['`accumulate` accepts a second argument.'],
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
    hints: ['combinations vs permutations vs product.'],
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
    hints: ['`product` replaces nested for-loops.'],
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
    hints: ['A filtering comprehension does not stop early.'],
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
    hints: ['You cannot slice an iterator with `[]`.'],
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
    hints: ['Reassigning a key does not change its position.'],
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
    hints: ['Find a key that all anagrams share.', 'Why can a Counter not be the dict key?'],
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
    hints: ['`zip` truncates silently.'],
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
    hints: ['Recurse on the nested case.', 'Why are strings a problem for a generic check?'],
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
    hints: ['`ChainMap` searches left to right.'],
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
    hints: ['Counter subtraction drops non-positive counts.'],
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
    hints: ['`dict.fromkeys` is the trick.'],
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
    hints: ['`heapq.nsmallest`.'],
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
    hints: ['`bisect.insort` does the search and the insert.'],
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
    hints: ['`namedtuple(..., defaults=[...])` fills from the right.'],
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
    hints: ['The factory must be callable, not an instance.', 'Convert the inner dicts back at the end.'],
  },
];
