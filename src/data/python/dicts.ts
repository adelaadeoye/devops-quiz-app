import type { Challenge } from '../../types';

export const dictChallenges: Challenge[] = [
  {
    id: 'dict-001',
    title: 'Count word frequencies',
    topic: 'dict',
    difficulty: 'easy',
    prompt:
      'Write `word_counts(words)` that returns a dict mapping each word to how often it appears.',
    starter: 'def word_counts(words):\n    ...\n',
    tests: [
      {
        call: "word_counts(['a', 'b', 'a'])",
        expected: "{'a': 2, 'b': 1}",
      },
      { call: 'word_counts([])', expected: '{}' },
      { call: "word_counts(['x'])", expected: "{'x': 1}" },
    ],
    solution:
      'def word_counts(words):\n    counts = {}\n    for word in words:\n        counts[word] = counts.get(word, 0) + 1\n    return counts\n',
    explanation:
      '`dict.get(key, default)` avoids a `KeyError` on the first sighting without needing an `if key in counts` check. `collections.Counter(words)` is the production answer, but `Counter` is a dict subclass, so if a test demands an exact `dict` you may need `dict(Counter(words))`.',
    hints: [
      'The first time you see a word there is no count to increment yet.',
      '`dict.get(key, default)` avoids the `KeyError` without an `if`.',
      '`counts[word] = counts.get(word, 0) + 1`.',
    ],
  },
  {
    id: 'dict-002',
    title: 'Invert a dictionary',
    topic: 'dict',
    difficulty: 'easy',
    prompt:
      'Write `invert(mapping)` that swaps keys and values.\n\nYou may assume the values are unique and hashable.',
    starter: 'def invert(mapping):\n    ...\n',
    tests: [
      { call: "invert({'a': 1, 'b': 2})", expected: "{1: 'a', 2: 'b'}" },
      { call: 'invert({})', expected: '{}' },
    ],
    solution:
      'def invert(mapping):\n    return {value: key for key, value in mapping.items()}\n',
    explanation:
      '`.items()` yields `(key, value)` pairs which unpack directly in the comprehension. The uniqueness caveat is the interesting part: if two keys share a value, the last one silently wins. When values may repeat you need a dict of lists instead.',
    hints: [
      'You need both halves of each entry at once.',
      'Iterate over `.items()`, which yields `(key, value)` pairs.',
      'A dict comprehension can swap them: `{value: key for key, value in mapping.items()}`.',
    ],
  },
  {
    id: 'dict-003',
    title: 'Group by first letter',
    topic: 'dict',
    difficulty: 'medium',
    prompt:
      'Write `group_by_initial(words)` that returns a dict mapping each first letter to the list of words starting with it, in input order.',
    starter: 'def group_by_initial(words):\n    ...\n',
    tests: [
      {
        call: "group_by_initial(['apple', 'avocado', 'beet'])",
        expected: "{'a': ['apple', 'avocado'], 'b': ['beet']}",
      },
      { call: 'group_by_initial([])', expected: '{}' },
    ],
    solution:
      'def group_by_initial(words):\n    groups = {}\n    for word in words:\n        groups.setdefault(word[0], []).append(word)\n    return groups\n',
    explanation:
      '`setdefault(key, [])` inserts the empty list only when the key is missing and returns the list either way, so you can append immediately. `collections.defaultdict(list)` reads better in a loop; note that `setdefault` builds a new `[]` on every call even when unused, which defaultdict avoids.',
    hints: [
      'The first word for a letter has to create the list.',
      '`dict.setdefault(key, [])` inserts only if missing and returns the stored value.',
      'So you can chain it: `groups.setdefault(word[0], []).append(word)`.',
    ],
  },
  {
    id: 'dict-004',
    title: 'Sort a dict by value',
    topic: 'dict',
    difficulty: 'medium',
    prompt:
      'Write `top_n(scores, n)` returning the `n` highest-scoring `(name, score)` pairs, highest first.\n\nBreak ties alphabetically by name.',
    starter: 'def top_n(scores, n):\n    ...\n',
    tests: [
      {
        call: "top_n({'ann': 5, 'bob': 9, 'cy': 5}, 2)",
        expected: "[('bob', 9), ('ann', 5)]",
      },
      { call: "top_n({'a': 1}, 5)", expected: "[('a', 1)]" },
      { call: "top_n({'a': 1}, 0)", expected: '[]' },
    ],
    solution:
      'def top_n(scores, n):\n    ordered = sorted(scores.items(), key=lambda pair: (-pair[1], pair[0]))\n    return ordered[:n]\n',
    explanation:
      'Sorting `.items()` with a tuple key gives descending score (via negation) and ascending name in one pass. Slicing past the end is safe, so `n` larger than the dict needs no guard. For a huge dict with small `n`, `heapq.nlargest(n, ...)` is O(n log k) instead of O(n log n).',
    hints: [
      'Sort `.items()`, not the dict itself.',
      'Two orderings are needed: score descending, then name ascending.',
      'Negate the score in a tuple key, then slice: `key=lambda p: (-p[1], p[0])`.',
    ],
  },
  {
    id: 'dict-005',
    title: 'Merge dictionaries',
    topic: 'dict',
    difficulty: 'easy',
    prompt:
      'Write `merge(base, override)` returning a new dict where keys from `override` win.\n\nNeither input may be modified.',
    starter: 'def merge(base, override):\n    ...\n',
    tests: [
      { call: "merge({'a': 1, 'b': 2}, {'b': 9})", expected: "{'a': 1, 'b': 9}" },
      {
        setup: "left = {'a': 1}",
        call: "merge(left, {'a': 2})\nleft",
        expected: "{'a': 1}",
      },
      { call: 'merge({}, {})', expected: '{}' },
    ],
    solution: 'def merge(base, override):\n    return {**base, **override}\n',
    explanation:
      'Dict unpacking builds a new dict, later keys overwriting earlier ones. `base | override` (3.9+) is equivalent. The trap is `base.update(override)`, which mutates `base` in place and returns `None` — the third test would catch it.',
    hints: [
      '`base.update(override)` is the trap — it mutates and returns `None`.',
      'You want an expression that builds a brand new dict.',
      '`{**base, **override}`, or `base | override` on 3.9+.',
    ],
  },
  {
    id: 'dict-006',
    title: 'Safe nested lookup',
    topic: 'dict',
    difficulty: 'medium',
    prompt:
      'Write `dig(data, path, default=None)` that walks a nested dict following the list of keys in `path`.\n\nReturn `default` if any key is missing or an intermediate value is not a dict.',
    starter: 'def dig(data, path, default=None):\n    ...\n',
    tests: [
      { call: "dig({'a': {'b': {'c': 1}}}, ['a', 'b', 'c'])", expected: '1' },
      { call: "dig({'a': {'b': 1}}, ['a', 'x'], 'missing')", expected: "'missing'" },
      { call: "dig({'a': 1}, ['a', 'b'], 0)", expected: '0' },
      { call: "dig({'a': 1}, [])", expected: "{'a': 1}" },
    ],
    solution:
      'def dig(data, path, default=None):\n    current = data\n    for key in path:\n        if not isinstance(current, dict) or key not in current:\n            return default\n        current = current[key]\n    return current\n',
    explanation:
      'Each step must verify two things: that the current value is still a dict, and that the key exists. Checking only `key not in current` breaks when an intermediate value is an int, because `in` on an int raises TypeError. An empty path returns the input unchanged, which falls out of the loop naturally.',
    hints: [
      'Walk the path with a loop and a cursor variable.',
      'Two things can go wrong at each step: the key is missing, or the cursor is not a dict.',
      '`if not isinstance(current, dict) or key not in current: return default`.',
    ],
  },
  {
    id: 'dict-007',
    title: 'Filter a dict by value',
    topic: 'dict',
    difficulty: 'easy',
    prompt: 'Write `passing(scores, threshold)` returning only the entries whose score is >= threshold.',
    starter: 'def passing(scores, threshold):\n    ...\n',
    tests: [
      { call: "passing({'a': 50, 'b': 80}, 60)", expected: "{'b': 80}" },
      { call: "passing({'a': 60}, 60)", expected: "{'a': 60}" },
      { call: 'passing({}, 10)', expected: '{}' },
    ],
    solution:
      'def passing(scores, threshold):\n    return {name: score for name, score in scores.items() if score >= threshold}\n',
    explanation:
      'A dict comprehension with an `if` clause is the direct translation of "filter a mapping". Note that deleting from a dict while iterating over it raises `RuntimeError: dictionary changed size during iteration` — building a new dict sidesteps that entirely.',
    hints: [
      'Deleting while iterating a dict raises — build a new one instead.',
      'Dict comprehensions support a trailing `if`.',
      '`{k: v for k, v in scores.items() if v >= threshold}`.',
    ],
  },
  {
    id: 'dict-008',
    title: 'Invert to a multimap',
    topic: 'dict',
    difficulty: 'medium',
    prompt:
      'Write `group_values(mapping)` that inverts a dict where values repeat, mapping each value to the sorted list of keys that had it.',
    starter: 'def group_values(mapping):\n    ...\n',
    tests: [
      {
        call: "group_values({'ann': 'ops', 'bob': 'dev', 'cy': 'ops'})",
        expected: "{'ops': ['ann', 'cy'], 'dev': ['bob']}",
      },
      { call: 'group_values({})', expected: '{}' },
    ],
    solution:
      'def group_values(mapping):\n    groups = {}\n    for key, value in mapping.items():\n        groups.setdefault(value, []).append(key)\n    return {value: sorted(keys) for value, keys in groups.items()}\n',
    explanation:
      'This is the "values are not unique" version of dict inversion. Two passes keep it readable: group first, sort second. Since Python 3.7 dicts preserve insertion order, so the resulting keys appear in first-seen order — which is what the expected result relies on.',
    hints: [
      'This is inversion where the values are not unique.',
      'Build lists first, sort them at the end.',
      '`groups.setdefault(value, []).append(key)`, then a comprehension with `sorted`.',
    ],
  },
  {
    id: 'dict-009',
    title: 'Sum values per key',
    topic: 'dict',
    difficulty: 'medium',
    prompt:
      'Write `totals(records)` where `records` is a list of `(category, amount)` tuples, returning a dict of category to summed amount.',
    starter: 'def totals(records):\n    ...\n',
    tests: [
      {
        call: "totals([('food', 10), ('gas', 5), ('food', 2)])",
        expected: "{'food': 12, 'gas': 5}",
      },
      { call: 'totals([])', expected: '{}' },
      { call: "totals([('a', -1), ('a', 1)])", expected: "{'a': 0}" },
    ],
    solution:
      'def totals(records):\n    result = {}\n    for category, amount in records:\n        result[category] = result.get(category, 0) + amount\n    return result\n',
    explanation:
      'Tuple unpacking in the `for` target makes the loop body read like the problem statement. `collections.defaultdict(int)` lets you write `result[category] += amount` directly, since a missing key materialises as 0.',
    hints: [
      'Each record already carries both the key and the amount.',
      'Unpack the tuple in the loop header: `for category, amount in records:`.',
      '`result[category] = result.get(category, 0) + amount`.',
    ],
  },
  {
    id: 'dict-010',
    title: 'Keys are hashable, values are not the key',
    topic: 'dict',
    difficulty: 'hard',
    prompt:
      'Write `index_by(records, field)` where `records` is a list of dicts, returning a dict keyed by `record[field]`.\n\nIf the field is missing from a record, skip that record. If a key repeats, the **first** record wins.',
    starter: 'def index_by(records, field):\n    ...\n',
    tests: [
      {
        call: "index_by([{'id': 1, 'n': 'a'}, {'id': 2, 'n': 'b'}], 'id')",
        expected: "{1: {'id': 1, 'n': 'a'}, 2: {'id': 2, 'n': 'b'}}",
      },
      {
        call: "index_by([{'id': 1, 'n': 'a'}, {'id': 1, 'n': 'b'}], 'id')",
        expected: "{1: {'id': 1, 'n': 'a'}}",
      },
      { call: "index_by([{'n': 'a'}], 'id')", expected: '{}' },
      { call: "index_by([], 'id')", expected: '{}' },
    ],
    solution:
      'def index_by(records, field):\n    index = {}\n    for record in records:\n        if field not in record:\n            continue\n        key = record[field]\n        if key not in index:\n            index[key] = record\n    return index\n',
    explanation:
      'A dict comprehension would be shorter but gives "last wins", the opposite of the requirement — that asymmetry is the point of the exercise. The `continue` guard is cleaner than nesting, and `if key not in index` enforces first-wins explicitly.',
    hints: [
      'A comprehension gives you last-wins. You need the opposite.',
      'Two guards are needed: the field may be missing, and the key may repeat.',
      '`continue` when the field is absent, and only assign `if key not in index`.',
    ],
  },
  {
    id: 'dict-011',
    title: 'get versus square brackets',
    topic: 'dict',
    difficulty: 'easy',
    prompt:
      'Write `lookup(mapping, key)` returning the value, or the string `"unknown"` when the key is absent.\n\nIt must never raise.',
    starter: 'def lookup(mapping, key):\n    ...\n',
    tests: [
      { call: "lookup({'a': 1}, 'a')", expected: '1' },
      { call: "lookup({'a': 1}, 'b')", expected: "'unknown'" },
      { call: "lookup({'a': None}, 'a')", expected: 'None' },
    ],
    solution: "def lookup(mapping, key):\n    return mapping.get(key, 'unknown')\n",
    explanation:
      '`mapping[key]` raises `KeyError`; `.get()` returns `None` by default or whatever you pass as the second argument. The third test is the subtle one: a key that exists with the value `None` must return `None`, which is why `mapping.get(key) or "unknown"` would be wrong.',
    hints: [
      '`mapping[key]` raises; you need the forgiving version.',
      'Beware of `or` as a default — it also swallows `None` and `0`.',
      '`mapping.get(key, \'unknown\')` passes all three tests.',
    ],
  },
  {
    id: 'dict-012',
    title: 'setdefault versus get',
    topic: 'dict',
    difficulty: 'medium',
    prompt:
      'Write `remember(cache, key, value)` that stores `value` only if `key` is absent, and returns whatever is stored afterwards.',
    starter: 'def remember(cache, key, value):\n    ...\n',
    tests: [
      {
        setup: "store = {'a': 1}",
        call: "remember(store, 'a', 99)",
        expected: '1',
      },
      {
        setup: 'store = {}',
        call: "remember(store, 'a', 5)\nstore",
        expected: "{'a': 5}",
      },
    ],
    solution:
      'def remember(cache, key, value):\n    return cache.setdefault(key, value)\n',
    explanation:
      '`setdefault` both reads and writes: it inserts only when the key is missing, and always returns the stored value. Unlike `.get()`, it mutates the dict — which is exactly why it should not be used for plain lookups.',
    hints: [
      'You need "insert only if absent" and "tell me what is there now".',
      'One method does both the check and the insert.',
      '`return cache.setdefault(key, value)`.',
    ],
  },
  {
    id: 'dict-013',
    title: 'Delete safely',
    topic: 'dict',
    difficulty: 'easy',
    prompt:
      'Write `drop(mapping, key)` removing the key **in place** and returning the removed value, or `None` when absent.',
    starter: 'def drop(mapping, key):\n    ...\n',
    tests: [
      {
        setup: "store = {'a': 1, 'b': 2}",
        call: "drop(store, 'a')\nstore",
        expected: "{'b': 2}",
      },
      { call: "drop({'a': 1}, 'a')", expected: '1' },
      { call: "drop({}, 'a')", expected: 'None' },
    ],
    solution: 'def drop(mapping, key):\n    return mapping.pop(key, None)\n',
    explanation:
      '`del mapping[key]` raises on a missing key and returns nothing. `dict.pop(key, default)` removes and returns in one step, and the default makes the missing case safe — the same pattern as `.get()`.',
    hints: [
      '`del mapping[key]` raises on a miss and gives you nothing back.',
      'There is a method that removes and returns in one step.',
      '`dict.pop` takes a default too: `mapping.pop(key, None)`.',
    ],
  },
  {
    id: 'dict-014',
    title: 'Keys, values and views',
    topic: 'dict',
    difficulty: 'medium',
    prompt:
      'Write `shared_keys(a, b)` returning the sorted list of keys present in both dicts.',
    starter: 'def shared_keys(a, b):\n    ...\n',
    tests: [
      { call: "shared_keys({'a': 1, 'b': 2}, {'b': 9, 'c': 3})", expected: "['b']" },
      { call: "shared_keys({}, {'a': 1})", expected: '[]' },
    ],
    solution: 'def shared_keys(a, b):\n    return sorted(a.keys() & b.keys())\n',
    explanation:
      '`.keys()` returns a *view* that supports set operations directly — no `set()` conversion needed. `.items()` does too when the values are hashable, but `.values()` does not, because values need be neither unique nor hashable.',
    hints: [
      '"Present in both" is an intersection.',
      'Key views behave like sets — no `set()` conversion needed.',
      '`sorted(a.keys() & b.keys())`.',
    ],
  },
  {
    id: 'dict-015',
    title: 'Build a dict from two lists',
    topic: 'dict',
    difficulty: 'easy',
    prompt:
      'Write `to_mapping(keys, values)` pairing the two lists positionally.\n\nExtra items in the longer list are ignored.',
    starter: 'def to_mapping(keys, values):\n    ...\n',
    tests: [
      { call: "to_mapping(['a', 'b'], [1, 2])", expected: "{'a': 1, 'b': 2}" },
      { call: "to_mapping(['a', 'b'], [1])", expected: "{'a': 1}" },
      { call: 'to_mapping([], [])', expected: '{}' },
    ],
    solution: 'def to_mapping(keys, values):\n    return dict(zip(keys, values))\n',
    explanation:
      '`dict()` accepts an iterable of key/value pairs, which is exactly what `zip` produces. `zip` truncating to the shorter input is the documented behaviour here — use `strict=True` (3.10+) when a mismatch should be an error instead.',
    hints: [
      'Pair the two lists up positionally first.',
      '`dict()` accepts an iterable of key/value pairs.',
      '`dict(zip(keys, values))` — and `zip` truncating is exactly the behaviour asked for.',
    ],
  },
  {
    id: 'dict-016',
    title: 'Count nested values',
    topic: 'dict',
    difficulty: 'medium',
    prompt:
      'Given `{team: [member, ...]}`, write `member_count(teams)` returning `{team: number_of_members}`.',
    starter: 'def member_count(teams):\n    ...\n',
    tests: [
      {
        call: "member_count({'a': ['x', 'y'], 'b': []})",
        expected: "{'a': 2, 'b': 0}",
      },
      { call: 'member_count({})', expected: '{}' },
    ],
    solution:
      'def member_count(teams):\n    return {team: len(members) for team, members in teams.items()}\n',
    explanation:
      'A dict comprehension that keeps the keys and transforms the values is the most common shape you will write. Unpacking `.items()` into two names keeps it readable.',
    hints: [
      'The keys stay the same; only the values change shape.',
      'Keep the key, transform the value.',
      '`{team: len(members) for team, members in teams.items()}`.',
    ],
  },
  {
    id: 'dict-017',
    title: 'Rename keys',
    topic: 'dict',
    difficulty: 'medium',
    prompt:
      'Write `rename(record, renames)` where `renames` maps old key to new key.\n\nKeys not mentioned keep their name.',
    starter: 'def rename(record, renames):\n    ...\n',
    tests: [
      {
        call: "rename({'a': 1, 'b': 2}, {'a': 'x'})",
        expected: "{'x': 1, 'b': 2}",
      },
      { call: "rename({'a': 1}, {})", expected: "{'a': 1}" },
      { call: "rename({}, {'a': 'x'})", expected: '{}' },
    ],
    solution:
      'def rename(record, renames):\n    return {renames.get(key, key): value for key, value in record.items()}\n',
    explanation:
      '`renames.get(key, key)` is a neat trick: fall back to the key itself when no rename is registered, so a single comprehension covers both cases. Mutating the dict while iterating it would raise `RuntimeError`.',
    hints: [
      'Every key needs a new name — sometimes that new name is the old one.',
      'Use the key itself as the default of the lookup.',
      '`{renames.get(key, key): value for key, value in record.items()}`.',
    ],
  },
  {
    id: 'dict-018',
    title: 'Deep merge',
    topic: 'dict',
    difficulty: 'hard',
    prompt:
      'Write `deep_merge(base, override)` merging nested dicts recursively.\n\nWhen both sides hold a dict for the same key, merge them; otherwise the override wins. Neither input may be modified.',
    starter: 'def deep_merge(base, override):\n    ...\n',
    tests: [
      {
        call: "deep_merge({'a': {'x': 1, 'y': 2}}, {'a': {'y': 9}})",
        expected: "{'a': {'x': 1, 'y': 9}}",
      },
      {
        call: "deep_merge({'a': {'x': 1}}, {'a': 5})",
        expected: "{'a': 5}",
      },
      {
        setup: "left = {'a': {'x': 1}}",
        call: "deep_merge(left, {'a': {'x': 2}})\nleft",
        expected: "{'a': {'x': 1}}",
      },
    ],
    solution:
      'def deep_merge(base, override):\n    result = dict(base)\n    for key, value in override.items():\n        current = result.get(key)\n        if isinstance(current, dict) and isinstance(value, dict):\n            result[key] = deep_merge(current, value)\n        else:\n            result[key] = value\n    return result\n',
    explanation:
      '`{**base, **override}` is only a *shallow* merge — a nested dict on the override side replaces the whole subtree. Recursing when both sides are dicts fixes that. Starting from `dict(base)` guarantees the inputs are untouched, which the third test enforces.',
    hints: [
      '`{**base, **override}` replaces whole subtrees — that is the bug to fix.',
      'Recurse only when both sides hold a dict for the same key.',
      'Start from `dict(base)` so the inputs are never touched, then assign into the copy.',
    ],
  },
  {
    id: 'dict-019',
    title: 'Invert with collision detection',
    topic: 'dict',
    difficulty: 'medium',
    prompt:
      'Write `strict_invert(mapping)` returning the inverted dict, or `None` when two keys share a value.',
    starter: 'def strict_invert(mapping):\n    ...\n',
    tests: [
      { call: "strict_invert({'a': 1, 'b': 2})", expected: "{1: 'a', 2: 'b'}" },
      { call: "strict_invert({'a': 1, 'b': 1})", expected: 'None' },
      { call: 'strict_invert({})', expected: '{}' },
    ],
    solution:
      'def strict_invert(mapping):\n    inverted = {value: key for key, value in mapping.items()}\n    if len(inverted) != len(mapping):\n        return None\n    return inverted\n',
    explanation:
      'Comparing the two lengths is the cheapest collision check: a collision is exactly the case where two keys collapsed into one, so the inverted dict is smaller. Checking `len(set(mapping.values())) != len(mapping)` is equivalent.',
    hints: [
      'Invert first, then work out whether anything was lost.',
      'A collision makes the result smaller than the input.',
      'Compare `len(inverted)` with `len(mapping)`.',
    ],
  },
  {
    id: 'dict-020',
    title: 'Frequency of the values',
    topic: 'dict',
    difficulty: 'easy',
    prompt:
      'Write `value_histogram(mapping)` counting how many keys map to each value.',
    starter: 'def value_histogram(mapping):\n    ...\n',
    tests: [
      {
        call: "value_histogram({'a': 'x', 'b': 'y', 'c': 'x'})",
        expected: "{'x': 2, 'y': 1}",
      },
      { call: 'value_histogram({})', expected: '{}' },
    ],
    solution:
      'def value_histogram(mapping):\n    counts = {}\n    for value in mapping.values():\n        counts[value] = counts.get(value, 0) + 1\n    return counts\n',
    explanation:
      'Iterating `.values()` directly is clearer than `for key in mapping` followed by an index lookup. This only works when the values are hashable — a dict of lists would raise `TypeError`.',
    hints: [
      'The keys are irrelevant here.',
      'Iterate `.values()` directly.',
      'Then it is the same counting loop as any other frequency count.',
    ],
  },
  {
    id: 'dict-021',
    title: 'Sort a dict into a new dict',
    topic: 'dict',
    difficulty: 'medium',
    prompt: 'Write `sort_by_key(mapping)` returning a new dict whose keys are in sorted order.',
    starter: 'def sort_by_key(mapping):\n    ...\n',
    tests: [
      { call: "list(sort_by_key({'b': 1, 'a': 2}))", expected: "['a', 'b']" },
      { call: "sort_by_key({'b': 1, 'a': 2})", expected: "{'a': 2, 'b': 1}" },
      { call: 'sort_by_key({})', expected: '{}' },
    ],
    solution:
      'def sort_by_key(mapping):\n    return {key: mapping[key] for key in sorted(mapping)}\n',
    explanation:
      'Dicts have no `.sort()` — you build a new one by inserting keys in the desired order, which sticks because insertion order is preserved since 3.7. Note that two dicts with the same pairs compare equal regardless of order, so the second test alone would not prove the sort worked; the first one does.',
    hints: [
      'You cannot sort a dict in place — there is no `.sort()`.',
      'Build a new dict, inserting the keys in the order you want.',
      '`{key: mapping[key] for key in sorted(mapping)}`.',
    ],
  },
  {
    id: 'dict-022',
    title: 'Dict of sets',
    topic: 'dict',
    difficulty: 'medium',
    prompt:
      'Write `tags_by_user(events)` where each event is `(user, tag)`, returning `{user: sorted_list_of_unique_tags}`.',
    starter: 'def tags_by_user(events):\n    ...\n',
    tests: [
      {
        call: "tags_by_user([('a', 'x'), ('a', 'x'), ('a', 'y'), ('b', 'z')])",
        expected: "{'a': ['x', 'y'], 'b': ['z']}",
      },
      { call: 'tags_by_user([])', expected: '{}' },
    ],
    solution:
      'def tags_by_user(events):\n    groups = {}\n    for user, tag in events:\n        groups.setdefault(user, set()).add(tag)\n    return {user: sorted(tags) for user, tags in groups.items()}\n',
    explanation:
      'Accumulating into sets deduplicates as you go, then a final comprehension converts to sorted lists for a deterministic result. Returning the sets directly would be non-deterministic in ordering and awkward to serialise to JSON.',
    hints: [
      'Two requirements: no duplicate tags, and a deterministic order.',
      'Accumulate in sets, convert at the end.',
      '`groups.setdefault(user, set()).add(tag)`, then `{u: sorted(t) for ...}`.',
    ],
  },
  {
    id: 'dict-023',
    title: 'Flatten a nested dict',
    topic: 'dict',
    difficulty: 'hard',
    prompt:
      'Write `flatten(data, prefix="")` turning `{"a": {"b": 1}}` into `{"a.b": 1}`, recursing to any depth.',
    starter: "def flatten(data, prefix=''):\n    ...\n",
    tests: [
      { call: "flatten({'a': {'b': 1}, 'c': 2})", expected: "{'a.b': 1, 'c': 2}" },
      { call: "flatten({'a': {'b': {'c': 3}}})", expected: "{'a.b.c': 3}" },
      { call: 'flatten({})', expected: '{}' },
      { call: "flatten({'a': {}})", expected: '{}' },
    ],
    solution:
      "def flatten(data, prefix=''):\n    result = {}\n    for key, value in data.items():\n        path = f'{prefix}{key}'\n        if isinstance(value, dict):\n            result.update(flatten(value, f'{path}.'))\n        else:\n            result[path] = value\n    return result\n",
    explanation:
      'Passing the accumulated prefix down the recursion keeps each level simple. Note that an empty nested dict contributes nothing, which is why `{"a": {}}` flattens to `{}` — worth calling out, because callers often expect a placeholder key.',
    hints: [
      'Each level needs to know the path that led to it.',
      'Pass the accumulated prefix down the recursion.',
      'Recurse with `f\'{path}.\'` and `result.update(...)`; an empty nested dict adds nothing.',
    ],
  },
  {
    id: 'dict-024',
    title: 'Update returns None',
    topic: 'dict',
    difficulty: 'easy',
    prompt:
      'Write `apply_patch(record, patch)` applying the patch **in place** and returning the same dict object.',
    starter: 'def apply_patch(record, patch):\n    return record.update(patch)\n',
    tests: [
      {
        setup: "store = {'a': 1}",
        call: "apply_patch(store, {'b': 2})\nstore",
        expected: "{'a': 1, 'b': 2}",
      },
      {
        setup: 'store = {}',
        call: "apply_patch(store, {'a': 1}) is store",
        expected: 'True',
      },
    ],
    solution:
      'def apply_patch(record, patch):\n    record.update(patch)\n    return record\n',
    explanation:
      'Like `list.sort()` and `list.append()`, `dict.update()` mutates and returns `None`. Returning its result is a very common bug — Python deliberately returns `None` from mutating methods to stop you chaining them as if they were pure.',
    hints: [
      'The mutation itself is already correct — look at what is returned.',
      'What does `.update()` return?',
      'Call it as a statement, then `return record` on the next line.',
    ],
  },
  {
    id: 'dict-025',
    title: 'Two-level lookup with defaults',
    topic: 'dict',
    difficulty: 'medium',
    prompt:
      'Write `stock(inventory, warehouse, product)` returning the count from `{warehouse: {product: count}}`, or 0 when either level is missing.',
    starter: 'def stock(inventory, warehouse, product):\n    ...\n',
    tests: [
      { call: "stock({'eu': {'a': 3}}, 'eu', 'a')", expected: '3' },
      { call: "stock({'eu': {'a': 3}}, 'eu', 'b')", expected: '0' },
      { call: "stock({}, 'eu', 'a')", expected: '0' },
    ],
    solution:
      'def stock(inventory, warehouse, product):\n    return inventory.get(warehouse, {}).get(product, 0)\n',
    explanation:
      'Chaining `.get(key, {})` lets the second lookup run against an empty dict rather than `None`, so the chain never raises. It is concise, though it does allocate a throwaway dict on each miss.',
    hints: [
      'Two lookups, and either one can miss.',
      'What default makes the second `.get()` safe to call?',
      '`inventory.get(warehouse, {}).get(product, 0)`.',
    ],
  },
  {
    id: 'dict-026',
    title: 'Keys with the maximum value',
    topic: 'dict',
    difficulty: 'medium',
    prompt:
      'Write `winners(scores)` returning the sorted list of all keys tied for the highest score.\n\nReturn `[]` for an empty dict.',
    starter: 'def winners(scores):\n    ...\n',
    tests: [
      { call: "winners({'a': 3, 'b': 3, 'c': 1})", expected: "['a', 'b']" },
      { call: "winners({'a': 1})", expected: "['a']" },
      { call: 'winners({})', expected: '[]' },
    ],
    solution:
      'def winners(scores):\n    if not scores:\n        return []\n    best = max(scores.values())\n    return sorted(key for key, value in scores.items() if value == best)\n',
    explanation:
      '`max(scores, key=scores.get)` returns only *one* winner, silently hiding ties. Finding the maximum first and then collecting every key that matches is the correct two-pass approach.',
    hints: [
      '`max(scores, key=scores.get)` returns only one key and hides the tie.',
      'Find the best value first, then collect everything that matches it.',
      '`best = max(scores.values())`, then filter `.items()` on `value == best`.',
    ],
  },
  {
    id: 'dict-027',
    title: 'Dict from a list of records',
    topic: 'dict',
    difficulty: 'medium',
    prompt:
      'Write `latest_by_user(events)` where each event is `(user, timestamp)`, returning `{user: highest_timestamp}`.',
    starter: 'def latest_by_user(events):\n    ...\n',
    tests: [
      {
        call: "latest_by_user([('a', 1), ('b', 5), ('a', 3)])",
        expected: "{'a': 3, 'b': 5}",
      },
      { call: "latest_by_user([('a', 5), ('a', 2)])", expected: "{'a': 5}" },
      { call: 'latest_by_user([])', expected: '{}' },
    ],
    solution:
      'def latest_by_user(events):\n    latest = {}\n    for user, timestamp in events:\n        if user not in latest or timestamp > latest[user]:\n            latest[user] = timestamp\n    return latest\n',
    explanation:
      'A comprehension would give "last one wins" by position, not by value — the second test would then wrongly return 2. Comparing explicitly is what makes it a true maximum, and the `or` short-circuits so the missing-key lookup never runs.',
    hints: [
      'Last-seen is not the same as largest.',
      'A plain comprehension would keep whichever event came last in the list.',
      'Only overwrite when the key is new or the timestamp is bigger.',
    ],
  },
  {
    id: 'dict-028',
    title: 'Only hashable keys',
    topic: 'dict',
    difficulty: 'medium',
    prompt:
      'Write `safe_keys(candidates)` returning the sublist of values that could legally be used as dict keys, preserving order.',
    starter: 'def safe_keys(candidates):\n    ...\n',
    tests: [
      { call: "safe_keys([1, 'a', [2], (3,), {4: 5}])", expected: "[1, 'a', (3,)]" },
      { call: 'safe_keys([])', expected: '[]' },
    ],
    solution:
      'def safe_keys(candidates):\n    result = []\n    for candidate in candidates:\n        try:\n            hash(candidate)\n        except TypeError:\n            continue\n        result.append(candidate)\n    return result\n',
    explanation:
      'Being usable as a dict key means being hashable, and the only reliable test is calling `hash()` and catching `TypeError`. Checking `isinstance(x, (int, str, tuple))` is not enough: a tuple containing a list is unhashable despite being a tuple.',
    hints: [
      '"Can be a dict key" means exactly one thing: hashable.',
      'Is every tuple hashable? Check `(1, [2])`.',
      'Ask forgiveness, not permission — call `hash(x)` in a `try` and catch `TypeError`.',
    ],
  },
  {
    id: 'dict-029',
    title: 'Difference between two dicts',
    topic: 'dict',
    difficulty: 'hard',
    prompt:
      'Write `changed(before, after)` returning `{key: (old, new)}` for keys whose value changed.\n\nUse `None` on the side where the key is absent.',
    starter: 'def changed(before, after):\n    ...\n',
    tests: [
      {
        call: "changed({'a': 1, 'b': 2}, {'a': 9, 'c': 3})",
        expected: "{'a': (1, 9), 'b': (2, None), 'c': (None, 3)}",
      },
      { call: "changed({'a': 1}, {'a': 1})", expected: '{}' },
      { call: 'changed({}, {})', expected: '{}' },
    ],
    solution:
      'def changed(before, after):\n    result = {}\n    for key in before.keys() | after.keys():\n        old = before.get(key)\n        new = after.get(key)\n        if old != new:\n            result[key] = (old, new)\n    return result\n',
    explanation:
      'Unioning the two key views covers additions, removals and edits in one loop. The `None` sentinel is ambiguous if a real value can be `None` — in production code you would use a dedicated `MISSING` sentinel object instead.',
    hints: [
      'Three cases to cover: added, removed and edited keys.',
      'Union the key views so one loop handles all three.',
      '`for key in before.keys() | after.keys()`, comparing `before.get(key)` with `after.get(key)`.',
    ],
  },
  {
    id: 'dict-030',
    title: 'Memoise with a dict',
    topic: 'dict',
    difficulty: 'hard',
    prompt:
      'Write `fib(n, cache=None)` returning the nth Fibonacci number (`fib(0) == 0`, `fib(1) == 1`), memoised in a dict.',
    starter: 'def fib(n, cache=None):\n    ...\n',
    tests: [
      { call: 'fib(0)', expected: '0' },
      { call: 'fib(10)', expected: '55' },
      { call: 'fib(40)', expected: '102334155' },
      { call: 'fib(1)', expected: '1' },
    ],
    solution:
      'def fib(n, cache=None):\n    if cache is None:\n        cache = {}\n    if n < 2:\n        return n\n    if n not in cache:\n        cache[n] = fib(n - 1, cache) + fib(n - 2, cache)\n    return cache[n]\n',
    explanation:
      'Without the cache this is exponential and `fib(40)` would take noticeably long; with it, each value is computed once, making it linear. The `None` sentinel avoids the mutable-default-argument trap, and passing `cache` down the recursion is what makes the sharing work. `functools.lru_cache` is the decorator version.',
    hints: [
      'Without a cache this recomputes the same values exponentially often.',
      'Do not use `cache={}` as the default — that is the mutable-default trap.',
      'Use `None` as the sentinel and pass the cache into both recursive calls.',
    ],
  },  {
    id: 'dict-031',
    title: 'Increment nested counters',
    topic: 'dict',
    difficulty: 'medium',
    prompt:
      'Write `record(hits, page, code)` incrementing `hits[page][code]` **in place**, creating either level as needed. Return `None`.',
    starter: 'def record(hits, page, code):\n    ...\n',
    tests: [
      {
        setup: 'data = {}',
        call: "record(data, '/a', 200)\ndata",
        expected: "{'/a': {200: 1}}",
      },
      {
        setup: "data = {'/a': {200: 1}}",
        call: "record(data, '/a', 200)\ndata",
        expected: "{'/a': {200: 2}}",
      },
      {
        setup: "data = {'/a': {200: 1}}",
        call: "record(data, '/b', 404)\ndata",
        expected: "{'/a': {200: 1}, '/b': {404: 1}}",
      },
    ],
    solution:
      'def record(hits, page, code):\n    inner = hits.setdefault(page, {})\n    inner[code] = inner.get(code, 0) + 1\n',
    explanation:
      '`setdefault` creates the inner dict on first use and returns it either way, so the second line can work on it directly. Combining it with `.get(code, 0)` covers the "outer exists, inner key does not" case in one step.',
    hints: [
      'Two levels, and either one might not exist yet.',
      '`setdefault` creates the inner dict and hands it back.',
      'Then the usual `.get(code, 0) + 1` handles the counter.',
    ],
  },
  {
    id: 'dict-032',
    title: 'Pick a subset of keys',
    topic: 'dict',
    difficulty: 'easy',
    prompt:
      'Write `pick(record, keys)` returning a new dict with only the listed keys that actually exist.',
    starter: 'def pick(record, keys):\n    ...\n',
    tests: [
      { call: "pick({'a': 1, 'b': 2, 'c': 3}, ['a', 'c'])", expected: "{'a': 1, 'c': 3}" },
      { call: "pick({'a': 1}, ['z'])", expected: '{}' },
      { call: "pick({}, ['a'])", expected: '{}' },
    ],
    solution:
      'def pick(record, keys):\n    return {key: record[key] for key in keys if key in record}\n',
    explanation:
      'Iterating the requested keys rather than the record keeps the result in the caller\u2019s requested order and is faster when the record is large. The `if key in record` guard is what stops a missing key raising.',
    hints: [
      'Iterate the keys you want, not the whole record.',
      'Guard against keys that are not present.',
      '`{k: record[k] for k in keys if k in record}`.',
    ],
  },
  {
    id: 'dict-033',
    title: 'Drop a subset of keys',
    topic: 'dict',
    difficulty: 'easy',
    prompt: 'Write `omit(record, keys)` returning a new dict without the listed keys.',
    starter: 'def omit(record, keys):\n    ...\n',
    tests: [
      { call: "omit({'a': 1, 'b': 2}, ['b'])", expected: "{'a': 1}" },
      { call: "omit({'a': 1}, ['z'])", expected: "{'a': 1}" },
      {
        setup: "store = {'a': 1}",
        call: "omit(store, ['a'])\nstore",
        expected: "{'a': 1}",
      },
    ],
    solution:
      'def omit(record, keys):\n    drop = set(keys)\n    return {key: value for key, value in record.items() if key not in drop}\n',
    explanation:
      'Converting `keys` to a set once makes each membership test O(1) instead of scanning a list per key. Building a new dict rather than calling `del` in a loop keeps the caller\u2019s dict untouched, which the third test checks.',
    hints: [
      '`del` would mutate the caller\u2019s dict \u2014 build a new one.',
      'Convert `keys` to a set so the lookups are O(1).',
      'Then filter `.items()` with `if key not in drop`.',
    ],
  },
  {
    id: 'dict-034',
    title: 'Values are lists: extend not append',
    topic: 'dict',
    difficulty: 'medium',
    prompt:
      'Write `merge_lists(a, b)` where both dicts map keys to lists, returning a new dict whose values are the concatenated lists.\n\nNeither input may be modified.',
    starter: 'def merge_lists(a, b):\n    ...\n',
    tests: [
      {
        call: "merge_lists({'x': [1]}, {'x': [2], 'y': [3]})",
        expected: "{'x': [1, 2], 'y': [3]}",
      },
      {
        setup: "left = {'x': [1]}",
        call: "merge_lists(left, {'x': [2]})\nleft",
        expected: "{'x': [1]}",
      },
      { call: 'merge_lists({}, {})', expected: '{}' },
    ],
    solution:
      'def merge_lists(a, b):\n    result = {key: list(value) for key, value in a.items()}\n    for key, value in b.items():\n        result.setdefault(key, []).extend(value)\n    return result\n',
    explanation:
      'Copying each list with `list(value)` is essential \u2014 `dict(a)` alone is shallow, so `extend` would mutate the caller\u2019s inner lists. `extend` appends every element, whereas `append` would nest the whole list as one item.',
    hints: [
      '`dict(a)` is shallow \u2014 the inner lists would still be shared.',
      'Copy each list as you build the result.',
      '`extend` adds the elements; `append` would nest the list.',
    ],
  },
  {
    id: 'dict-035',
    title: 'Longest key',
    topic: 'dict',
    difficulty: 'easy',
    prompt:
      'Write `longest_key(mapping)` returning the longest key, breaking ties alphabetically.\n\nReturn `None` for an empty dict.',
    starter: 'def longest_key(mapping):\n    ...\n',
    tests: [
      { call: "longest_key({'a': 1, 'bbb': 2, 'cc': 3})", expected: "'bbb'" },
      { call: "longest_key({'bb': 1, 'aa': 2})", expected: "'aa'" },
      { call: 'longest_key({})', expected: 'None' },
    ],
    solution:
      'def longest_key(mapping):\n    return min(mapping, key=lambda key: (-len(key), key), default=None)\n',
    explanation:
      'Iterating a dict yields its keys, so `min`/`max` work on it directly. Using `min` with a negated length gives "longest first, then alphabetically ascending" \u2014 `max` would pick the alphabetically *last* key on a tie.',
    hints: [
      'Iterating a dict already gives you the keys.',
      'Two orderings again: length descending, then name ascending.',
      '`min(mapping, key=lambda k: (-len(k), k), default=None)`.',
    ],
  },
  {
    id: 'dict-036',
    title: 'Dict equality ignores order',
    topic: 'dict',
    difficulty: 'medium',
    prompt:
      'Write `same_order(a, b)` returning `True` when the two dicts have equal contents **and** the same key order.',
    starter: 'def same_order(a, b):\n    ...\n',
    tests: [
      { call: "same_order({'a': 1, 'b': 2}, {'a': 1, 'b': 2})", expected: 'True' },
      { call: "same_order({'a': 1, 'b': 2}, {'b': 2, 'a': 1})", expected: 'False' },
      { call: 'same_order({}, {})', expected: 'True' },
    ],
    solution:
      'def same_order(a, b):\n    return list(a.items()) == list(b.items())\n',
    explanation:
      '`a == b` compares contents only and ignores insertion order entirely, so it returns `True` for the second case. Comparing the `.items()` as lists preserves order, which is the only way to distinguish them.',
    hints: [
      '`a == b` is not enough \u2014 it ignores order completely.',
      'You need a comparison that preserves sequence.',
      '`list(a.items()) == list(b.items())`.',
    ],
  },
  {
    id: 'dict-037',
    title: 'Build an index of positions',
    topic: 'dict',
    difficulty: 'medium',
    prompt:
      'Write `positions(items)` returning a dict of value to the list of indices where it occurs.',
    starter: 'def positions(items):\n    ...\n',
    tests: [
      {
        call: "positions(['a', 'b', 'a'])",
        expected: "{'a': [0, 2], 'b': [1]}",
      },
      { call: 'positions([])', expected: '{}' },
    ],
    solution:
      'def positions(items):\n    index = {}\n    for position, item in enumerate(items):\n        index.setdefault(item, []).append(position)\n    return index\n',
    explanation:
      'The grouping pattern combined with `enumerate`. This inverted index is the same structure a search engine builds: term to list of positions, letting you answer "where does X occur?" in O(1) instead of rescanning.',
    hints: [
      'You need both the value and its index.',
      'This is grouping, with the index as the thing collected.',
      '`index.setdefault(item, []).append(position)`.',
    ],
  },
  {
    id: 'dict-038',
    title: 'Sum two sparse vectors',
    topic: 'dict',
    difficulty: 'medium',
    prompt:
      'Write `add_vectors(a, b)` where each dict maps an index to a non-zero value.\n\nReturn their sum, omitting any entry that cancels to zero.',
    starter: 'def add_vectors(a, b):\n    ...\n',
    tests: [
      { call: 'add_vectors({0: 1, 2: 3}, {2: 4})', expected: '{0: 1, 2: 7}' },
      { call: 'add_vectors({0: 1}, {0: -1})', expected: '{}' },
      { call: 'add_vectors({}, {})', expected: '{}' },
    ],
    solution:
      'def add_vectors(a, b):\n    result = {}\n    for key in a.keys() | b.keys():\n        total = a.get(key, 0) + b.get(key, 0)\n        if total:\n            result[key] = total\n    return result\n',
    explanation:
      'Unioning the key views covers indices present on either side, and `.get(key, 0)` supplies the implicit zero. Dropping cancelled entries keeps the representation genuinely sparse \u2014 otherwise repeated additions would slowly fill it with zeros.',
    hints: [
      'An index may exist in only one of the two vectors.',
      'Union the key views, and use `.get(key, 0)` for the missing side.',
      'Skip entries whose total is zero to keep it sparse.',
    ],
  },
  {
    id: 'dict-039',
    title: 'Invert a dict of lists',
    topic: 'dict',
    difficulty: 'medium',
    prompt:
      'Write `invert_lists(mapping)` turning `{key: [value, ...]}` into `{value: key}`.\n\nAssume each value appears under exactly one key.',
    starter: 'def invert_lists(mapping):\n    ...\n',
    tests: [
      {
        call: "invert_lists({'fruit': ['apple', 'pear'], 'veg': ['leek']})",
        expected: "{'apple': 'fruit', 'pear': 'fruit', 'leek': 'veg'}",
      },
      { call: "invert_lists({'a': []})", expected: '{}' },
      { call: 'invert_lists({})', expected: '{}' },
    ],
    solution:
      'def invert_lists(mapping):\n    return {value: key for key, values in mapping.items() for value in values}\n',
    explanation:
      'A dict comprehension can carry two `for` clauses just like a list comprehension, flattening the nested structure inline. A key whose list is empty simply contributes nothing.',
    hints: [
      'Each key produces several entries, not one.',
      'A dict comprehension can have two `for` clauses.',
      '`{v: k for k, values in mapping.items() for v in values}`.',
    ],
  },
  {
    id: 'dict-040',
    title: 'Default values for missing keys',
    topic: 'dict',
    difficulty: 'easy',
    prompt:
      'Write `with_defaults(record, defaults)` returning a new dict where missing keys take the default, but existing keys win.',
    starter: 'def with_defaults(record, defaults):\n    ...\n',
    tests: [
      {
        call: "with_defaults({'a': 1}, {'a': 9, 'b': 2})",
        expected: "{'a': 1, 'b': 2}",
      },
      { call: "with_defaults({}, {'a': 1})", expected: "{'a': 1}" },
      { call: "with_defaults({'a': None}, {'a': 5})", expected: "{'a': None}" },
    ],
    solution:
      'def with_defaults(record, defaults):\n    return {**defaults, **record}\n',
    explanation:
      'The order of the unpacking decides the winner: whatever comes last overwrites. Since the real record must win, it goes second \u2014 the mirror image of a normal override merge. The third test shows an explicit `None` still counts as present.',
    hints: [
      'This is a merge \u2014 the only question is which side wins.',
      'In `{**x, **y}` the later one overwrites.',
      'So the defaults go first: `{**defaults, **record}`.',
    ],
  },
  {
    id: 'dict-041',
    title: 'Count by a computed key',
    topic: 'dict',
    difficulty: 'medium',
    prompt:
      'Write `count_by_length(words)` returning `{length: count}` for a list of words.',
    starter: 'def count_by_length(words):\n    ...\n',
    tests: [
      { call: "count_by_length(['a', 'bb', 'cc'])", expected: '{1: 1, 2: 2}' },
      { call: 'count_by_length([])', expected: '{}' },
    ],
    solution:
      'def count_by_length(words):\n    counts = {}\n    for word in words:\n        counts[len(word)] = counts.get(len(word), 0) + 1\n    return counts\n',
    explanation:
      'The counting loop again, except the key is derived from the item rather than being the item. Generalising this to `key_func(item)` gives you a reusable `count_by` helper, which is what `Counter(map(len, words))` does in one line.',
    hints: [
      'The key is not the word itself.',
      'Compute the key first, then count as usual.',
      '`Counter(len(w) for w in words)` is the one-line version.',
    ],
  },
  {
    id: 'dict-042',
    title: 'Find the first missing key',
    topic: 'dict',
    difficulty: 'easy',
    prompt:
      'Write `first_missing(record, keys)` returning the first key from `keys` that is absent, or `None`.',
    starter: 'def first_missing(record, keys):\n    ...\n',
    tests: [
      { call: "first_missing({'a': 1}, ['a', 'b', 'c'])", expected: "'b'" },
      { call: "first_missing({'a': 1}, ['a'])", expected: 'None' },
      { call: "first_missing({}, [])", expected: 'None' },
    ],
    solution:
      'def first_missing(record, keys):\n    return next((key for key in keys if key not in record), None)\n',
    explanation:
      '`next` with a default stops at the first match instead of building a full list of missing keys. Order matters here, so iterating `keys` (a list) rather than a set is essential.',
    hints: [
      'You want the first one, so stop as soon as you find it.',
      '`next()` with a generator does that.',
      'Pass `None` as the default so it never raises.',
    ],
  },
  {
    id: 'dict-043',
    title: 'Group into ranges',
    topic: 'dict',
    difficulty: 'medium',
    prompt:
      'Write `bucket(scores, size)` grouping values into buckets keyed by the lower bound.\n\nWith `size=10`, 0\u20139 land in bucket 0, 10\u201319 in bucket 10.',
    starter: 'def bucket(scores, size):\n    ...\n',
    tests: [
      { call: 'bucket([3, 11, 15, 25], 10)', expected: '{0: [3], 10: [11, 15], 20: [25]}' },
      { call: 'bucket([], 10)', expected: '{}' },
      { call: 'bucket([0], 5)', expected: '{0: [0]}' },
    ],
    solution:
      'def bucket(scores, size):\n    groups = {}\n    for score in scores:\n        groups.setdefault(score // size * size, []).append(score)\n    return groups\n',
    explanation:
      'Integer division then multiplication snaps a value down to the nearest multiple: `15 // 10 * 10 == 10`. That expression is the whole trick \u2014 the rest is the standard grouping pattern.',
    hints: [
      'You need to round each score down to a multiple of `size`.',
      'Integer division then multiplication does exactly that.',
      '`score // size * size` is the bucket key.',
    ],
  },
  {
    id: 'dict-044',
    title: 'Detect a cycle in a mapping',
    topic: 'dict',
    difficulty: 'hard',
    prompt:
      'Given `{node: next_node}`, write `has_cycle(graph, start)` returning `True` when following `start` revisits a node.\n\nA node missing from the graph ends the chain.',
    starter: 'def has_cycle(graph, start):\n    ...\n',
    tests: [
      { call: "has_cycle({'a': 'b', 'b': 'a'}, 'a')", expected: 'True' },
      { call: "has_cycle({'a': 'b'}, 'a')", expected: 'False' },
      { call: "has_cycle({'a': 'a'}, 'a')", expected: 'True' },
      { call: "has_cycle({}, 'a')", expected: 'False' },
    ],
    solution:
      'def has_cycle(graph, start):\n    seen = set()\n    node = start\n    while node in graph:\n        if node in seen:\n            return True\n        seen.add(node)\n        node = graph[node]\n    return False\n',
    explanation:
      'Walking the chain with a `seen` set is the straightforward cycle detection; without it the loop would never terminate. The `while node in graph` condition doubles as the end-of-chain check, so no separate guard is needed.',
    hints: [
      'Walk the chain one link at a time.',
      'Without bookkeeping the loop would run forever \u2014 that is the hint.',
      'Keep a `seen` set and return `True` on a revisit.',
    ],
  },
  {
    id: 'dict-045',
    title: 'Transpose a dict of dicts',
    topic: 'dict',
    difficulty: 'hard',
    prompt:
      'Write `transpose(table)` turning `{row: {col: value}}` into `{col: {row: value}}`.',
    starter: 'def transpose(table):\n    ...\n',
    tests: [
      {
        call: "transpose({'r1': {'c1': 1, 'c2': 2}, 'r2': {'c1': 3}})",
        expected: "{'c1': {'r1': 1, 'r2': 3}, 'c2': {'r1': 2}}",
      },
      { call: 'transpose({})', expected: '{}' },
      { call: "transpose({'r1': {}})", expected: '{}' },
    ],
    solution:
      'def transpose(table):\n    result = {}\n    for row, columns in table.items():\n        for column, value in columns.items():\n            result.setdefault(column, {})[row] = value\n    return result\n',
    explanation:
      'Two nested loops with the keys swapped on assignment. Because the table is sparse, the inner dicts will not all have the same keys \u2014 `setdefault` handles columns appearing for the first time part-way through.',
    hints: [
      'Two nested loops, one per level.',
      'On assignment, swap which key goes outside and which inside.',
      '`result.setdefault(column, {})[row] = value`.',
    ],
  },
  {
    id: 'dict-046',
    title: 'Keys sorted by nested field',
    topic: 'dict',
    difficulty: 'medium',
    prompt:
      'Given `{name: {"score": n}}`, write `leaderboard(players)` returning names sorted by score descending, then name ascending.',
    starter: 'def leaderboard(players):\n    ...\n',
    tests: [
      {
        call: "leaderboard({'ann': {'score': 5}, 'bob': {'score': 9}, 'cy': {'score': 5}})",
        expected: "['bob', 'ann', 'cy']",
      },
      { call: 'leaderboard({})', expected: '[]' },
    ],
    solution:
      "def leaderboard(players):\n    return sorted(players, key=lambda name: (-players[name]['score'], name))\n",
    explanation:
      'The key function can reach back into the dict to look up whatever it needs, so you can sort the keys by a nested field without restructuring the data first. The tuple key handles the mixed ascending/descending requirement.',
    hints: [
      'You are sorting the keys, but ordering by something inside the values.',
      'The key function can look the value back up.',
      "`key=lambda name: (-players[name]['score'], name)`.",
    ],
  },
  {
    id: 'dict-047',
    title: 'Dict comprehension over a range',
    topic: 'dict',
    difficulty: 'easy',
    prompt:
      'Write `squares(n)` returning `{i: i * i}` for `i` from 0 up to but not including `n`.',
    starter: 'def squares(n):\n    ...\n',
    tests: [
      { call: 'squares(4)', expected: '{0: 0, 1: 1, 2: 4, 3: 9}' },
      { call: 'squares(0)', expected: '{}' },
      { call: 'squares(1)', expected: '{0: 0}' },
    ],
    solution: 'def squares(n):\n    return {i: i * i for i in range(n)}\n',
    explanation:
      'The simplest possible dict comprehension: a key expression, a colon, a value expression, and a `for`. `range(0)` is empty, so the zero case needs no guard.',
    hints: [
      'A dict comprehension needs a key and a value expression.',
      'They are separated by a colon.',
      '`{i: i * i for i in range(n)}`.',
    ],
  },];
