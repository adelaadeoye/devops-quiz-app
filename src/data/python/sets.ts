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
    hints: [
      'A nested loop works but is O(n*m) — convert to sets first.',
      '`&` intersects two sets.',
      'Sets have no order, so wrap the result: `sorted(set(a) & set(b))`.',
    ],
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
    hints: [
      '"In a but not in b" has a direct set operator.',
      'Subtracting sets is allowed, and it is asymmetric.',
      '`sorted(set(a) - set(b))`.',
    ],
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
    hints: [
      'You do not need the shared values, only whether any exist.',
      'There is a method that answers "no elements in common".',
      '`not set(a).isdisjoint(b)` — it short-circuits and returns a real `bool`.',
    ],
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
    hints: [
      'A single set is not enough to tell "seen" from "seen again".',
      'One set for "seen", one for "seen twice".',
      'Collect repeats in a set so a value seen three times is still reported once.',
    ],
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
    hints: [
      'Duplicates disappear when you build a set — that is measurable.',
      'Compare two lengths.',
      '`len(set(items)) == len(items)`.',
    ],
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
    hints: [
      'Ignoring order and duplicates inside a group means each group is really a set.',
      'But a set cannot contain a set — sets are unhashable.',
      'Which built-in type is a hashable set? `len({frozenset(g) for g in groups})`.',
    ],
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
    hints: [
      'Subset, not intersection.',
      'Watch out for `<` versus `<=` — one of them rejects equal sets.',
      '`set(required) <= set(granted)`, which is `True` for an empty requirement.',
    ],
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
    hints: [
      'You cannot change a set\u2019s size while iterating over it.',
      'Take a snapshot of what to delete before deleting.',
      'Loop over a list comprehension of the doomed words, or use `words -= {...}`.',
    ],
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
    hints: [
      '"In exactly one" is everything except the intersection.',
      'There is a single operator for it: `^` on sets.',
      '`sorted(set(a) ^ set(b))`, equivalent to `(a - b) | (b - a)`.',
    ],
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
    hints: [
      'Accumulate into one set as you walk the groups.',
      '`set.update` takes any iterable, so no inner conversion is needed.',
      'Or in one line: `sorted(set().union(*groups))`.',
    ],
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
    hints: [
      'Run the starter mentally on `\'abc\'` and count the elements added.',
      'What happens when you iterate a string?',
      '`update` iterates its argument; `add` inserts the object whole.',
    ],
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
    hints: [
      'This is the subset question asked from the other side.',
      'Superset is the mirror of subset.',
      '`set(available) >= set(needed)`.',
    ],
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
    hints: [
      '"Required but not present" is a set difference.',
      'Key views support set operations directly — no `set(record)` needed.',
      '`sorted(set(required) - record.keys())`.',
    ],
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
    hints: [
      'The starter passes the small case and fails the other one — ask why.',
      'Why does `list(set(...))` sometimes look sorted? Small ints hash to themselves.',
      'Never rely on it: `sorted(set(items))`.',
    ],
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
    hints: [
      'Order and repetition both have to be ignored.',
      'Set equality already does exactly that.',
      '`set(a) == set(b)` — use `Counter(a) == Counter(b)` if the counts mattered too.',
    ],
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
    hints: [
      'Braces with a single expression build a set, not a dict.',
      'How do you write an empty set literal? (`{}` is a dict.)',
      '`sorted({name[0].lower() for name in names})`.',
    ],
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
    hints: [
      '`items.count(item)` inside a loop would be O(n²).',
      'Keep a set of what you have already seen.',
      'Return as soon as you see a repeat — that is what makes it "first".',
    ],
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
    hints: [
      '`(1, 2)` and `(2, 1)` must collapse to the same thing.',
      'Find a canonical form for each edge.',
      '`len({tuple(sorted(edge)) for edge in edges})`.',
    ],
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
    hints: [
      'What is the intersection of zero sets? Python cannot represent it.',
      'Seed from the first group, then intersect the rest.',
      'Guard the empty outer list first, then `common &= set(group)` in a loop.',
    ],
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
    hints: [
      'The starter is right except for one edge case.',
      'One of the two removal methods raises when the value is absent.',
      '`discard` is the silent one.',
    ],
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
    hints: [
      '`set()` of a string gives its characters.',
      'Normalise the case before building the sets, not after.',
      '`sorted(set(a.lower()) & set(b.lower()))`.',
    ],
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
    hints: [
      'A set cannot be a dict key — it is unhashable.',
      'Order within the tags must not matter, so a tuple is wrong too.',
      '`groups.setdefault(frozenset(tags), []).append(name)`.',
    ],
  },  {
    id: 'set-023',
    title: 'Set operations preserve nothing',
    topic: 'set',
    difficulty: 'medium',
    prompt:
      'Write `first_common(a, b)` returning the first value in `a` that also appears in `b`, or `None`.\n\nOrder is defined by `a`.',
    starter: 'def first_common(a, b):\n    ...\n',
    tests: [
      { call: 'first_common([3, 1, 2], [1, 2])', expected: '1' },
      { call: 'first_common([1], [2])', expected: 'None' },
      { call: 'first_common([], [1])', expected: 'None' },
    ],
    solution:
      'def first_common(a, b):\n    lookup = set(b)\n    return next((item for item in a if item in lookup), None)\n',
    explanation:
      '`set(a) & set(b)` would answer "which values" but not "which came first", because a set has no order. Converting only `b` keeps `a` as an ordered sequence while still getting O(1) membership tests.',
    hints: [
      '`set(a) & set(b)` loses the ordering you need.',
      'Only one of the two collections needs converting.',
      'Convert `b` to a set, then iterate `a` in order.',
    ],
  },
  {
    id: 'set-024',
    title: 'Update versus union',
    topic: 'set',
    difficulty: 'medium',
    prompt:
      'Write `absorb(target, extra)` adding every element of `extra` into the `target` set **in place**. Return `None`.',
    starter: 'def absorb(target, extra):\n    target = target | set(extra)\n',
    tests: [
      {
        setup: "data = {'a'}",
        call: "absorb(data, ['b', 'c'])\nsorted(data)",
        expected: "['a', 'b', 'c']",
      },
      {
        setup: 'data = set()',
        call: 'absorb(data, [])\nsorted(data)',
        expected: '[]',
      },
    ],
    solution: 'def absorb(target, extra):\n    target.update(extra)\n',
    explanation:
      '`target = target | ...` builds a new set and rebinds the local name, so the caller sees nothing \u2014 the same trap as `items = sorted(items)` inside a function. `update` (or `|=`) mutates the existing object instead.',
    hints: [
      'The starter builds a new set and throws it away.',
      'You need to change the object the caller is holding.',
      '`target.update(extra)`, or `target |= set(extra)`.',
    ],
  },
  {
    id: 'set-025',
    title: 'Count distinct per group',
    topic: 'set',
    difficulty: 'medium',
    prompt:
      'Write `distinct_per_user(events)` where each event is `(user, page)`, returning `{user: number_of_distinct_pages}`.',
    starter: 'def distinct_per_user(events):\n    ...\n',
    tests: [
      {
        call: "distinct_per_user([('a', '/x'), ('a', '/x'), ('a', '/y'), ('b', '/x')])",
        expected: "{'a': 2, 'b': 1}",
      },
      { call: 'distinct_per_user([])', expected: '{}' },
    ],
    solution:
      'def distinct_per_user(events):\n    seen = {}\n    for user, page in events:\n        seen.setdefault(user, set()).add(page)\n    return {user: len(pages) for user, pages in seen.items()}\n',
    explanation:
      'Counting distinct values per group needs a set per group \u2014 a plain counter would count repeats. This is exactly what `COUNT(DISTINCT ...) GROUP BY` does in SQL.',
    hints: [
      'A plain counter would count the duplicates too.',
      'Each group needs its own set.',
      '`seen.setdefault(user, set()).add(page)`, then take the lengths.',
    ],
  },
  {
    id: 'set-026',
    title: 'Sets do not support indexing',
    topic: 'set',
    difficulty: 'easy',
    prompt:
      'Write `any_element(values)` returning one arbitrary element of the set, or `None` when empty.\n\nThe set must not be modified.',
    starter: 'def any_element(values):\n    return values[0]\n',
    tests: [
      { call: "any_element({'a'})", expected: "'a'" },
      { call: 'any_element(set())', expected: 'None' },
      {
        setup: "data = {'a'}",
        call: 'any_element(data)\nsorted(data)',
        expected: "['a']",
      },
    ],
    solution: 'def any_element(values):\n    return next(iter(values), None)\n',
    explanation:
      '`values[0]` raises `TypeError` \u2014 sets are unordered and unsubscriptable. `values.pop()` would work but removes the element. `next(iter(values), None)` peeks without mutating and handles the empty case via the default.',
    hints: [
      'Sets are not subscriptable \u2014 `values[0]` raises.',
      '`.pop()` would work but it removes the element.',
      '`next(iter(values), None)` peeks without mutating.',
    ],
  },
  {
    id: 'set-027',
    title: 'Which groups contain the value',
    topic: 'set',
    difficulty: 'medium',
    prompt:
      'Write `groups_with(groups, value)` where `groups` is `{name: [item, ...]}`, returning the sorted names whose group contains `value`.',
    starter: 'def groups_with(groups, value):\n    ...\n',
    tests: [
      {
        call: "groups_with({'a': [1, 2], 'b': [2, 3], 'c': [4]}, 2)",
        expected: "['a', 'b']",
      },
      { call: "groups_with({'a': [1]}, 9)", expected: '[]' },
      { call: 'groups_with({}, 1)', expected: '[]' },
    ],
    solution:
      'def groups_with(groups, value):\n    return sorted(name for name, items in groups.items() if value in set(items))\n',
    explanation:
      'A straightforward filter over `.items()`. Wrapping each group in `set()` only pays off if you test many values against the same groups \u2014 for a single lookup, `value in items` on the list is equally fine and avoids the conversion.',
    hints: [
      'Filter the items of the dict on a membership test.',
      'Collect the names, not the groups.',
      'Wrap the whole generator in `sorted(...)`.',
    ],
  },
  {
    id: 'set-028',
    title: 'Symmetric difference of many sets',
    topic: 'set',
    difficulty: 'hard',
    prompt:
      'Write `in_exactly_one(groups)` returning the sorted values that appear in exactly one of the lists.',
    starter: 'def in_exactly_one(groups):\n    ...\n',
    tests: [
      { call: 'in_exactly_one([[1, 2], [2, 3], [3, 4]])', expected: '[1, 4]' },
      { call: 'in_exactly_one([[1], [1]])', expected: '[]' },
      { call: 'in_exactly_one([])', expected: '[]' },
    ],
    solution:
      'def in_exactly_one(groups):\n    counts = {}\n    for group in groups:\n        for value in set(group):\n            counts[value] = counts.get(value, 0) + 1\n    return sorted(value for value, count in counts.items() if count == 1)\n',
    explanation:
      'Chaining `^` across many sets does *not* mean "in exactly one" \u2014 it means "in an odd number of them", so a value in three groups would wrongly survive. Counting group membership explicitly is the correct approach, and `set(group)` stops a duplicate inside one group counting twice.',
    hints: [
      'Chaining `^` gives "in an odd number of sets", which is not the same thing.',
      'Count how many groups each value appears in.',
      'Deduplicate within each group first, then keep the values with a count of 1.',
    ],
  },
  {
    id: 'set-029',
    title: 'Set from a generator',
    topic: 'set',
    difficulty: 'easy',
    prompt:
      'Write `distinct_lengths(words)` returning the sorted distinct word lengths.',
    starter: 'def distinct_lengths(words):\n    ...\n',
    tests: [
      { call: "distinct_lengths(['a', 'bb', 'cc', 'ddd'])", expected: '[1, 2, 3]' },
      { call: 'distinct_lengths([])', expected: '[]' },
    ],
    solution: 'def distinct_lengths(words):\n    return sorted({len(word) for word in words})\n',
    explanation:
      'Deduplicating a *derived* value rather than the item itself. A set comprehension does the mapping and the deduplication in one pass; `sorted(set(map(len, words)))` is the equivalent functional form.',
    hints: [
      'You are deduplicating the lengths, not the words.',
      'A set comprehension can transform and deduplicate at once.',
      '`sorted({len(word) for word in words})`.',
    ],
  },
  {
    id: 'set-030',
    title: 'Remove a whole set of values',
    topic: 'set',
    difficulty: 'medium',
    prompt:
      'Write `strip_stopwords(words, stopwords)` returning the list of words with stopwords removed, preserving order and duplicates.',
    starter: 'def strip_stopwords(words, stopwords):\n    ...\n',
    tests: [
      {
        call: "strip_stopwords(['the', 'cat', 'the', 'hat'], ['the'])",
        expected: "['cat', 'hat']",
      },
      { call: "strip_stopwords([], ['a'])", expected: '[]' },
      { call: "strip_stopwords(['a'], [])", expected: "['a']" },
    ],
    solution:
      'def strip_stopwords(words, stopwords):\n    blocked = set(stopwords)\n    return [word for word in words if word not in blocked]\n',
    explanation:
      'Building the stopword set once outside the comprehension turns an O(n*m) scan into O(n). Filtering into a new list rather than converting the words to a set preserves both order and duplicates, which the first test checks.',
    hints: [
      'Converting `words` to a set would destroy order and duplicates.',
      'Only the stopwords need to become a set.',
      'Build it once outside the comprehension, not inside it.',
    ],
  },
  {
    id: 'set-031',
    title: 'Pairs that sum to a target',
    topic: 'set',
    difficulty: 'hard',
    prompt:
      'Write `pairs_summing(numbers, target)` returning the sorted distinct `(low, high)` pairs of values that add to `target`.',
    starter: 'def pairs_summing(numbers, target):\n    ...\n',
    tests: [
      { call: 'pairs_summing([1, 2, 3, 4], 5)', expected: '[(1, 4), (2, 3)]' },
      { call: 'pairs_summing([1, 1, 4], 5)', expected: '[(1, 4)]' },
      { call: 'pairs_summing([1], 5)', expected: '[]' },
    ],
    solution:
      'def pairs_summing(numbers, target):\n    seen = set()\n    found = set()\n    for value in numbers:\n        partner = target - value\n        if partner in seen:\n            found.add((min(value, partner), max(value, partner)))\n        seen.add(value)\n    return sorted(found)\n',
    explanation:
      'One pass with a `seen` set finds the complements in O(n), and a second set of *canonically ordered* pairs deduplicates \u2014 which is why `[1, 1, 4]` reports `(1, 4)` only once. Sorting each pair before storing is what makes the deduplication work.',
    hints: [
      'For each value you know exactly which partner you need.',
      'Keep a set of values already seen.',
      'Store each pair in a canonical order so duplicates collapse.',
    ],
  },
  {
    id: 'set-032',
    title: 'Sets in a boolean context',
    topic: 'set',
    difficulty: 'easy',
    prompt:
      'Write `describe(values)` returning `"empty"` for an empty set and `"has items"` otherwise.',
    starter: 'def describe(values):\n    ...\n',
    tests: [
      { call: 'describe(set())', expected: "'empty'" },
      { call: "describe({'a'})", expected: "'has items'" },
      { call: 'describe({0})', expected: "'has items'" },
    ],
    solution:
      "def describe(values):\n    return 'has items' if values else 'empty'\n",
    explanation:
      'An empty set is falsy and a non-empty one is truthy, so `if values` is the idiomatic emptiness test \u2014 no `len(values) == 0` needed. The third test guards against confusing the *set* being empty with its *contents* being falsy: `{0}` is truthy.',
    hints: [
      'You do not need `len()` for this.',
      'An empty collection is falsy in Python.',
      'Careful: `{0}` is a non-empty set, so it is truthy.',
    ],
  },
  {
    id: 'set-033',
    title: 'Difference update in place',
    topic: 'set',
    difficulty: 'medium',
    prompt:
      'Write `revoke(granted, removed)` deleting every value in `removed` from the `granted` set **in place**, ignoring ones that are not there. Return `None`.',
    starter: 'def revoke(granted, removed):\n    ...\n',
    tests: [
      {
        setup: "data = {'read', 'write'}",
        call: "revoke(data, ['write', 'admin'])\nsorted(data)",
        expected: "['read']",
      },
      {
        setup: "data = {'read'}",
        call: 'revoke(data, [])\nsorted(data)',
        expected: "['read']",
      },
    ],
    solution:
      'def revoke(granted, removed):\n    granted.difference_update(removed)\n',
    explanation:
      '`difference_update` (equivalently `-=`) removes in bulk and silently ignores values that were never present, so no per-item `discard` loop is needed. Like all the `_update` methods it takes any iterable, not just a set.',
    hints: [
      'A loop of `discard` calls works, but there is a bulk method.',
      'It is the in-place version of the `-` operator.',
      '`granted.difference_update(removed)`, or `granted -= set(removed)`.',
    ],
  },
  {
    id: 'set-034',
    title: 'Jaccard similarity',
    topic: 'set',
    difficulty: 'hard',
    prompt:
      'Write `similarity(a, b)` returning the size of the intersection divided by the size of the union.\n\nTwo empty inputs score 1.0.',
    starter: 'def similarity(a, b):\n    ...\n',
    tests: [
      { call: 'similarity([1, 2], [2, 3])', expected: '1 / 3' },
      { call: 'similarity([1], [1])', expected: '1.0' },
      { call: 'similarity([], [])', expected: '1.0' },
      { call: 'similarity([1], [2])', expected: '0.0' },
    ],
    solution:
      'def similarity(a, b):\n    left = set(a)\n    right = set(b)\n    union = left | right\n    if not union:\n        return 1.0\n    return len(left & right) / len(union)\n',
    explanation:
      'The Jaccard index, used everywhere from deduplication to recommendation. The empty-union guard prevents a `ZeroDivisionError`; defining two empty sets as identical is the usual convention.',
    hints: [
      'Intersection over union \u2014 both are single operators.',
      'Compute the union once and reuse its length.',
      'Guard the empty union before dividing.',
    ],
  },
  {
    id: 'set-035',
    title: 'Deduplicate case-insensitively',
    topic: 'set',
    difficulty: 'medium',
    prompt:
      'Write `unique_ignoring_case(words)` keeping the first spelling of each word, ignoring case, preserving order.',
    starter: 'def unique_ignoring_case(words):\n    ...\n',
    tests: [
      {
        call: "unique_ignoring_case(['Ann', 'ann', 'Bob'])",
        expected: "['Ann', 'Bob']",
      },
      { call: 'unique_ignoring_case([])', expected: '[]' },
    ],
    solution:
      'def unique_ignoring_case(words):\n    seen = set()\n    result = []\n    for word in words:\n        key = word.lower()\n        if key not in seen:\n            seen.add(key)\n            result.append(word)\n    return result\n',
    explanation:
      'The set holds the normalised key while the result list keeps the original spelling \u2014 the same split you need whenever "equal" is defined by a transformation rather than by the value itself.',
    hints: [
      'What goes in the set is not what goes in the result.',
      'Store the lowercase form as the key.',
      'Append the original word so the first spelling survives.',
    ],
  },];
