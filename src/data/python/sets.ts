import type { Challenge } from '../../types';

export const setChallenges: Challenge[] = [
  {
    id: 'set-001',
    title: 'Common elements',
    topic: 'set',
    difficulty: 'easy',
    prompt:
      'Write `common(a, b)` returning a **sorted list** of the values present in both lists, without duplicates.',
    starter: 'def common(a, b):\n    ...\n',
    tests: [
      { call: 'common([1, 2, 3, 2], [2, 3, 4])', expected: '[2, 3]' },
      { call: 'common([1], [2])', expected: '[]' },
      { call: 'common([], [])', expected: '[]' },
    ],
    solution: 'def common(a, b):\n    return sorted(set(a) & set(b))\n',
    explanation:
      '`&` is set intersection; `set(a).intersection(b)` is the method form and accepts any iterable, so it avoids building the second set. Sets have no order, so `sorted()` is what makes the result deterministic — returning `list(set(...))` would give an order that can change between runs.',
    hints: ['`&` intersects two sets.'],
  },
  {
    id: 'set-002',
    title: 'Only in the first list',
    topic: 'set',
    difficulty: 'easy',
    prompt: 'Write `only_in_first(a, b)` returning the sorted values that appear in `a` but not in `b`.',
    starter: 'def only_in_first(a, b):\n    ...\n',
    tests: [
      { call: 'only_in_first([1, 2, 3], [2])', expected: '[1, 3]' },
      { call: 'only_in_first([1, 1], [1])', expected: '[]' },
      { call: 'only_in_first([], [1])', expected: '[]' },
    ],
    solution: 'def only_in_first(a, b):\n    return sorted(set(a) - set(b))\n',
    explanation:
      'Set difference `-` is asymmetric: `a - b` keeps what only `a` has. If you want values unique to either side, that is the symmetric difference `^`. Converting to sets first is what turns an O(n*m) nested loop into O(n+m).',
    hints: ['Subtracting sets is allowed.'],
  },
  {
    id: 'set-003',
    title: 'Do two lists overlap?',
    topic: 'set',
    difficulty: 'easy',
    prompt: 'Write `overlaps(a, b)` returning `True` when the two lists share at least one value.',
    starter: 'def overlaps(a, b):\n    ...\n',
    tests: [
      { call: 'overlaps([1, 2], [2, 3])', expected: 'True' },
      { call: 'overlaps([1], [2])', expected: 'False' },
      { call: 'overlaps([], [1])', expected: 'False' },
    ],
    solution: 'def overlaps(a, b):\n    return not set(a).isdisjoint(b)\n',
    explanation:
      '`isdisjoint` short-circuits on the first shared element and does not build the intersection, so it is both faster and clearer than `len(set(a) & set(b)) > 0`. Returning `not ...` gives a real `bool`, which matters if the caller compares against `True`.',
    hints: ['There is a method that answers "no elements in common".'],
  },
  {
    id: 'set-004',
    title: 'Find the duplicates',
    topic: 'set',
    difficulty: 'medium',
    prompt: 'Write `duplicates(items)` returning the sorted values that appear more than once.',
    starter: 'def duplicates(items):\n    ...\n',
    tests: [
      { call: 'duplicates([1, 2, 2, 3, 3, 3])', expected: '[2, 3]' },
      { call: 'duplicates([1, 2, 3])', expected: '[]' },
      { call: 'duplicates([])', expected: '[]' },
    ],
    solution:
      'def duplicates(items):\n    seen = set()\n    repeated = set()\n    for item in items:\n        if item in seen:\n            repeated.add(item)\n        else:\n            seen.add(item)\n    return sorted(repeated)\n',
    explanation:
      'Two sets in a single pass: `seen` records everything, `repeated` records the second sighting. Collecting into a set rather than a list means a value seen three times is still reported once. `Counter` gives the same answer in one line if you are allowed to import.',
    hints: ['One set for "seen", one for "seen twice".'],
  },
  {
    id: 'set-005',
    title: 'Are all values unique?',
    topic: 'set',
    difficulty: 'easy',
    prompt: 'Write `all_unique(items)` returning `True` when no value repeats.',
    starter: 'def all_unique(items):\n    ...\n',
    tests: [
      { call: 'all_unique([1, 2, 3])', expected: 'True' },
      { call: 'all_unique([1, 1])', expected: 'False' },
      { call: 'all_unique([])', expected: 'True' },
    ],
    solution: 'def all_unique(items):\n    return len(set(items)) == len(items)\n',
    explanation:
      'Building the set costs O(n) time and O(n) memory but replaces a quadratic scan. Careful: this requires the items to be hashable, and it treats `1`, `1.0` and `True` as the same value because they hash equal.',
    hints: ['Compare two lengths.'],
  },
  {
    id: 'set-006',
    title: 'Sets of sets',
    topic: 'set',
    difficulty: 'medium',
    prompt:
      'Write `unique_groups(groups)` where `groups` is a list of lists.\n\nReturn how many **distinct** groups there are, ignoring order and duplicates inside a group.',
    starter: 'def unique_groups(groups):\n    ...\n',
    tests: [
      { call: 'unique_groups([[1, 2], [2, 1], [3]])', expected: '2' },
      { call: 'unique_groups([[1, 1], [1]])', expected: '1' },
      { call: 'unique_groups([])', expected: '0' },
    ],
    solution:
      'def unique_groups(groups):\n    return len({frozenset(group) for group in groups})\n',
    explanation:
      'A `set` is unhashable and cannot be an element of another set — `frozenset` is its immutable, hashable counterpart. Converting each group to a frozenset makes `[1, 2]` and `[2, 1]` compare equal, which is exactly the "ignore order and duplicates" requirement.',
    hints: ['A set cannot contain a set.', 'Which built-in type is a hashable set?'],
  },
  {
    id: 'set-007',
    title: 'Subset check',
    topic: 'set',
    difficulty: 'medium',
    prompt:
      'Write `has_required(granted, required)` returning `True` when every required permission was granted.',
    starter: 'def has_required(granted, required):\n    ...\n',
    tests: [
      { call: "has_required(['read', 'write'], ['read'])", expected: 'True' },
      { call: "has_required(['read'], ['read', 'write'])", expected: 'False' },
      { call: "has_required([], [])", expected: 'True' },
      { call: "has_required([], ['read'])", expected: 'False' },
    ],
    solution: 'def has_required(granted, required):\n    return set(required) <= set(granted)\n',
    explanation:
      '`<=` is the subset operator (`issubset` is the method form). The empty set is a subset of everything, so the empty-requirement case is correct for free. Note `<` means *proper* subset and would wrongly return `False` when the two sets are equal.',
    hints: ['Subset, not intersection.', 'Watch out for `<` versus `<=`.'],
  },
  {
    id: 'set-008',
    title: 'Mutating during iteration',
    topic: 'set',
    difficulty: 'hard',
    prompt:
      'This raises `RuntimeError: Set changed size during iteration`.\n\nFix `drop_short(words, n)` so it removes words shorter than `n` from the set **in place** and returns `None`.',
    starter:
      'def drop_short(words, n):\n    for word in words:\n        if len(word) < n:\n            words.remove(word)\n',
    tests: [
      {
        setup: "data = {'a', 'abc', 'ab'}",
        call: 'drop_short(data, 3)\nsorted(data)',
        expected: "['abc']",
      },
      {
        setup: "data = {'abc'}",
        call: 'drop_short(data, 3)\nsorted(data)',
        expected: "['abc']",
      },
      {
        setup: "data = {'a'}",
        call: 'drop_short(data, 2)',
        expected: 'None',
      },
    ],
    solution:
      'def drop_short(words, n):\n    for word in [w for w in words if len(w) < n]:\n        words.remove(word)\n',
    explanation:
      'You cannot add to or remove from a set (or dict) while iterating it — the iterator is invalidated. Materialise the doomed items into a list first, then remove them. `words -= {w for w in words if len(w) < n}` also works and mutates in place; `words = words - ...` would not, because it rebinds the local name.',
    hints: ['Take a snapshot of what to delete before deleting.', '`-=` mutates a set in place.'],
  },
  {
    id: 'set-009',
    title: 'Symmetric difference',
    topic: 'set',
    difficulty: 'easy',
    prompt: 'Write `only_one_side(a, b)` returning the sorted values present in exactly one of the lists.',
    starter: 'def only_one_side(a, b):\n    ...\n',
    tests: [
      { call: 'only_one_side([1, 2, 3], [3, 4])', expected: '[1, 2, 4]' },
      { call: 'only_one_side([1], [1])', expected: '[]' },
      { call: 'only_one_side([], [])', expected: '[]' },
    ],
    solution: 'def only_one_side(a, b):\n    return sorted(set(a) ^ set(b))\n',
    explanation:
      '`^` is the symmetric difference: everything except the intersection. It is equivalent to `(a - b) | (b - a)` but done in one pass, and unlike `-` it is commutative.',
    hints: ['`^` on sets.'],
  },
  {
    id: 'set-010',
    title: 'Union of many sets',
    topic: 'set',
    difficulty: 'medium',
    prompt:
      'Write `all_tags(groups)` where `groups` is a list of lists, returning every distinct value, sorted.',
    starter: 'def all_tags(groups):\n    ...\n',
    tests: [
      { call: "all_tags([['a', 'b'], ['b', 'c'], []])", expected: "['a', 'b', 'c']" },
      { call: 'all_tags([])', expected: '[]' },
    ],
    solution:
      'def all_tags(groups):\n    result = set()\n    for group in groups:\n        result.update(group)\n    return sorted(result)\n',
    explanation:
      '`set.update()` accepts any iterable and unions in place, so no intermediate sets are created. `set().union(*groups)` is the one-liner, and `set.union` also takes plain lists as arguments.',
    hints: ['`set.update` takes any iterable.'],
  },
  {
    id: 'set-011',
    title: 'add versus update',
    topic: 'set',
    difficulty: 'medium',
    prompt:
      'Write `add_tag(tags, tag)` adding a single string to the set **in place**, returning `None`.\n\nThe string must be added whole, not character by character.',
    starter: 'def add_tag(tags, tag):\n    tags.update(tag)\n',
    tests: [
      {
        setup: "data = set()",
        call: "add_tag(data, 'abc')\nsorted(data)",
        expected: "['abc']",
      },
      {
        setup: "data = {'x'}",
        call: "add_tag(data, 'y')\nsorted(data)",
        expected: "['x', 'y']",
      },
    ],
    solution: 'def add_tag(tags, tag):\n    tags.add(tag)\n',
    explanation:
      '`update` iterates its argument, and a string iterates character by character — so `update("abc")` adds three single-character entries. `add` inserts the object as a single element. The same trap applies to `list.extend` versus `list.append`.',
    hints: ['What happens when you iterate a string?'],
  },
  {
    id: 'set-012',
    title: 'Superset check',
    topic: 'set',
    difficulty: 'easy',
    prompt: 'Write `covers(available, needed)` returning `True` when `available` contains everything in `needed`.',
    starter: 'def covers(available, needed):\n    ...\n',
    tests: [
      { call: 'covers([1, 2, 3], [1, 3])', expected: 'True' },
      { call: 'covers([1], [1, 2])', expected: 'False' },
      { call: 'covers([], [])', expected: 'True' },
    ],
    solution: 'def covers(available, needed):\n    return set(available) >= set(needed)\n',
    explanation:
      '`>=` is `issuperset`. Unlike numbers, set comparison is a *partial* order: two sets can be neither a subset nor a superset of each other, so `not (a >= b)` does not imply `a < b`.',
    hints: ['Superset is the mirror of subset.'],
  },
  {
    id: 'set-013',
    title: 'Missing required fields',
    topic: 'set',
    difficulty: 'medium',
    prompt:
      'Write `missing_fields(record, required)` returning the sorted required keys absent from the dict.',
    starter: 'def missing_fields(record, required):\n    ...\n',
    tests: [
      { call: "missing_fields({'a': 1}, ['a', 'b', 'c'])", expected: "['b', 'c']" },
      { call: "missing_fields({'a': 1}, ['a'])", expected: '[]' },
      { call: "missing_fields({}, [])", expected: '[]' },
    ],
    solution:
      'def missing_fields(record, required):\n    return sorted(set(required) - record.keys())\n',
    explanation:
      '`record.keys()` is a set-like view, so it can be subtracted from a set directly with no conversion. This is a common validation pattern and is much clearer than a loop with an `if key not in record` check.',
    hints: ['Key views support set operations.'],
  },
  {
    id: 'set-014',
    title: 'Sets are unordered',
    topic: 'set',
    difficulty: 'easy',
    prompt:
      'Write `dedupe_sorted(items)` returning distinct values in ascending order.\n\nDo not rely on the iteration order of a set.',
    starter: 'def dedupe_sorted(items):\n    return list(set(items))\n',
    tests: [
      { call: 'dedupe_sorted([3, 1, 2, 1])', expected: '[1, 2, 3]' },
      { call: 'dedupe_sorted([10, 1, 2])', expected: '[1, 2, 10]' },
      { call: 'dedupe_sorted([])', expected: '[]' },
    ],
    solution: 'def dedupe_sorted(items):\n    return sorted(set(items))\n',
    explanation:
      'A set has no defined order; `list(set(...))` happens to look sorted for small integers because of how they hash, which makes the bug pass casual testing and fail on strings or larger values. Always sort explicitly when the order matters.',
    hints: ['Why does `list(set(...))` sometimes look sorted?'],
  },
  {
    id: 'set-015',
    title: 'Equal ignoring duplicates',
    topic: 'set',
    difficulty: 'medium',
    prompt: 'Write `same_contents(a, b)` returning `True` when both lists contain the same distinct values.',
    starter: 'def same_contents(a, b):\n    ...\n',
    tests: [
      { call: 'same_contents([1, 2, 2], [2, 1])', expected: 'True' },
      { call: 'same_contents([1], [1, 2])', expected: 'False' },
      { call: 'same_contents([], [])', expected: 'True' },
    ],
    solution: 'def same_contents(a, b):\n    return set(a) == set(b)\n',
    explanation:
      'Set equality ignores both order and multiplicity. If multiplicity matters — "same items, same counts" — you need `Counter(a) == Counter(b)` instead. Knowing which of the two the question asks for is the real skill here.',
    hints: ['What if the counts mattered too?'],
  },
  {
    id: 'set-016',
    title: 'Set comprehension',
    topic: 'set',
    difficulty: 'easy',
    prompt: 'Write `initials(names)` returning the sorted list of distinct first letters, lowercased.',
    starter: 'def initials(names):\n    ...\n',
    tests: [
      { call: "initials(['Ann', 'alan', 'Bob'])", expected: "['a', 'b']" },
      { call: 'initials([])', expected: '[]' },
    ],
    solution:
      'def initials(names):\n    return sorted({name[0].lower() for name in names})\n',
    explanation:
      'Braces with a single expression create a set comprehension; add a colon and it becomes a dict comprehension. Note that `{}` alone is an empty *dict* — the only way to write an empty set literal is `set()`.',
    hints: ['How do you write an empty set literal?'],
  },
  {
    id: 'set-017',
    title: 'Track seen items in a stream',
    topic: 'set',
    difficulty: 'medium',
    prompt:
      'Write `first_repeat(items)` returning the first value that appears a second time, or `None`.',
    starter: 'def first_repeat(items):\n    ...\n',
    tests: [
      { call: 'first_repeat([1, 2, 3, 2, 1])', expected: '2' },
      { call: 'first_repeat([1, 2, 3])', expected: 'None' },
      { call: 'first_repeat([])', expected: 'None' },
    ],
    solution:
      'def first_repeat(items):\n    seen = set()\n    for item in items:\n        if item in seen:\n            return item\n        seen.add(item)\n    return None\n',
    explanation:
      'Returning on the first repeat means the loop exits as early as possible — O(n) time, and O(k) memory in the number of distinct values seen so far. Using `items.count(item)` inside a loop would be O(n²).',
    hints: ['Return as soon as you see a repeat.'],
  },
  {
    id: 'set-018',
    title: 'Set of tuples',
    topic: 'set',
    difficulty: 'medium',
    prompt:
      'Write `unique_edges(edges)` where each edge is a `(a, b)` tuple, counting distinct **undirected** edges — `(1, 2)` and `(2, 1)` are the same.',
    starter: 'def unique_edges(edges):\n    ...\n',
    tests: [
      { call: 'unique_edges([(1, 2), (2, 1), (1, 3)])', expected: '2' },
      { call: 'unique_edges([(1, 1)])', expected: '1' },
      { call: 'unique_edges([])', expected: '0' },
    ],
    solution:
      'def unique_edges(edges):\n    return len({tuple(sorted(edge)) for edge in edges})\n',
    explanation:
      'Sorting each pair produces a canonical form, so both directions collapse to the same key. `frozenset(edge)` would also ignore direction but additionally collapses a self-loop `(1, 1)` to a single element — still counted once here, but the distinction matters when edges carry weights.',
    hints: ['Find a canonical form for each edge.'],
  },
  {
    id: 'set-019',
    title: 'Intersection of many lists',
    topic: 'set',
    difficulty: 'hard',
    prompt:
      'Write `in_all(groups)` returning the sorted values present in **every** list.\n\nAn empty outer list gives `[]`.',
    starter: 'def in_all(groups):\n    ...\n',
    tests: [
      { call: "in_all([[1, 2, 3], [2, 3], [3, 2]])", expected: '[2, 3]' },
      { call: 'in_all([[1], [2]])', expected: '[]' },
      { call: 'in_all([])', expected: '[]' },
      { call: 'in_all([[1, 1]])', expected: '[1]' },
    ],
    solution:
      'def in_all(groups):\n    if not groups:\n        return []\n    common = set(groups[0])\n    for group in groups[1:]:\n        common &= set(group)\n    return sorted(common)\n',
    explanation:
      'Seeding from the first group and intersecting the rest avoids the "intersection of nothing" problem — mathematically that would be the universal set, which Python cannot represent. Starting from `set()` instead would always return an empty result.',
    hints: ['What is the intersection of zero sets?', 'Seed from the first group.'],
  },
  {
    id: 'set-020',
    title: 'discard versus remove',
    topic: 'set',
    difficulty: 'easy',
    prompt:
      'Write `forget(tags, tag)` removing `tag` from the set **in place** without raising when it is absent. Return `None`.',
    starter: 'def forget(tags, tag):\n    tags.remove(tag)\n',
    tests: [
      {
        setup: "data = {'a', 'b'}",
        call: "forget(data, 'a')\nsorted(data)",
        expected: "['b']",
      },
      {
        setup: "data = {'a'}",
        call: "forget(data, 'z')\nsorted(data)",
        expected: "['a']",
      },
    ],
    solution: 'def forget(tags, tag):\n    tags.discard(tag)\n',
    explanation:
      '`remove` raises `KeyError` when the value is absent; `discard` is the silent version. Use `remove` when absence is a genuine bug you want to hear about, and `discard` when it is expected.',
    hints: ['One of the two raises.'],
  },
  {
    id: 'set-021',
    title: 'Set operations on strings',
    topic: 'set',
    difficulty: 'medium',
    prompt:
      'Write `shared_letters(a, b)` returning the sorted letters that appear in both words, ignoring case.',
    starter: 'def shared_letters(a, b):\n    ...\n',
    tests: [
      { call: "shared_letters('Hello', 'World')", expected: "['l', 'o']" },
      { call: "shared_letters('abc', 'xyz')", expected: '[]' },
      { call: "shared_letters('', 'a')", expected: '[]' },
    ],
    solution:
      'def shared_letters(a, b):\n    return sorted(set(a.lower()) & set(b.lower()))\n',
    explanation:
      '`set("hello")` builds a set of characters directly, since strings are iterable. Lowercasing before the conversion means `H` and `h` collapse into one element rather than staying distinct.',
    hints: ['`set()` of a string gives its characters.'],
  },
  {
    id: 'set-022',
    title: 'Frozenset as a dict key',
    topic: 'set',
    difficulty: 'hard',
    prompt:
      'Write `index_by_tags(records)` where each record is `(name, [tag, ...])`, returning `{frozenset_of_tags: [names]}` with names sorted.',
    starter: 'def index_by_tags(records):\n    ...\n',
    tests: [
      {
        call: "index_by_tags([('a', ['x', 'y']), ('b', ['y', 'x']), ('c', ['z'])])",
        expected: "{frozenset({'x', 'y'}): ['a', 'b'], frozenset({'z'}): ['c']}",
      },
      { call: 'index_by_tags([])', expected: '{}' },
    ],
    solution:
      'def index_by_tags(records):\n    groups = {}\n    for name, tags in records:\n        groups.setdefault(frozenset(tags), []).append(name)\n    return {key: sorted(names) for key, names in groups.items()}\n',
    explanation:
      'A `frozenset` is hashable, so it can be a dict key, and it compares equal regardless of the original order — which is what makes `["x", "y"]` and `["y", "x"]` group together. A plain `set` would raise `TypeError: unhashable type: set`.',
    hints: ['A set cannot be a dict key.', 'Order within the tags must not matter.'],
  },
];
