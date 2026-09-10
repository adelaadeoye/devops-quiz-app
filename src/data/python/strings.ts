import type { Challenge } from '../../types';

export const stringChallenges: Challenge[] = [
  {
    id: 'str-001',
    title: 'Normalise whitespace',
    topic: 'str',
    difficulty: 'easy',
    prompt:
      'Write `squash(text)` that collapses every run of whitespace into a single space and trims the ends.',
    starter: 'def squash(text):\n    ...\n',
    tests: [
      { call: "squash('  a   b \\n c  ')", expected: "'a b c'" },
      { call: "squash('')", expected: "''" },
      { call: "squash('   ')", expected: "''" },
    ],
    solution: "def squash(text):\n    return ' '.join(text.split())\n",
    explanation:
      '`text.split()` with no argument is special: it splits on *any* run of whitespace and discards empty pieces, which handles tabs, newlines and leading/trailing padding in one step. `text.split(\' \')` behaves completely differently and would leave empty strings behind.',
    hints: ['`split()` with no argument is not the same as `split(" ")`.'],
  },
  {
    id: 'str-002',
    title: 'Count characters',
    topic: 'str',
    difficulty: 'easy',
    prompt:
      'Write `char_counts(text)` returning a dict of character to occurrence count, ignoring spaces.',
    starter: 'def char_counts(text):\n    ...\n',
    tests: [
      { call: "char_counts('aab b')", expected: "{'a': 2, 'b': 2}" },
      { call: "char_counts('')", expected: '{}' },
    ],
    solution:
      "def char_counts(text):\n    counts = {}\n    for char in text:\n        if char == ' ':\n            continue\n        counts[char] = counts.get(char, 0) + 1\n    return counts\n",
    explanation:
      'Strings are iterable character by character, so no `list()` conversion is needed. `Counter(text.replace(" ", ""))` is the one-liner, but building the dict manually shows you understand `get` with a default.',
    hints: ['Strings iterate over characters.'],
  },
  {
    id: 'str-003',
    title: 'Is it a palindrome?',
    topic: 'str',
    difficulty: 'medium',
    prompt:
      'Write `is_palindrome(text)` that ignores case and any non-alphanumeric character.',
    starter: 'def is_palindrome(text):\n    ...\n',
    tests: [
      { call: "is_palindrome('A man, a plan, a canal: Panama')", expected: 'True' },
      { call: "is_palindrome('hello')", expected: 'False' },
      { call: "is_palindrome('')", expected: 'True' },
      { call: "is_palindrome('.,!')", expected: 'True' },
    ],
    solution:
      'def is_palindrome(text):\n    cleaned = [char.lower() for char in text if char.isalnum()]\n    return cleaned == cleaned[::-1]\n',
    explanation:
      '`[::-1]` is the reverse-slice idiom and works on any sequence. Cleaning first with `.isalnum()` keeps the comparison honest. Comparing a list against its reversed copy costs O(n) extra memory; a two-pointer walk is the O(1)-space follow-up an interviewer may ask for.',
    hints: ['`str.isalnum()` filters punctuation.', '`seq[::-1]` reverses.'],
  },
  {
    id: 'str-004',
    title: 'Title-case words',
    topic: 'str',
    difficulty: 'easy',
    prompt:
      'Write `capitalise_words(text)` that upper-cases the first letter of each space-separated word and lower-cases the rest.',
    starter: 'def capitalise_words(text):\n    ...\n',
    tests: [
      { call: "capitalise_words('hello WORLD')", expected: "'Hello World'" },
      { call: "capitalise_words('')", expected: "''" },
      { call: "capitalise_words('a')", expected: "'A'" },
    ],
    solution:
      "def capitalise_words(text):\n    return ' '.join(word.capitalize() for word in text.split())\n",
    explanation:
      '`str.capitalize()` upper-cases the first character and lower-cases everything else, which is what the spec asks. The built-in `str.title()` looks similar but breaks on apostrophes, turning "don\'t" into "Don\'T" — a classic interview gotcha.',
    hints: ['`str.capitalize()` and `str.title()` differ.'],
  },
  {
    id: 'str-005',
    title: 'Parse key=value pairs',
    topic: 'str',
    difficulty: 'medium',
    prompt:
      'Write `parse_env(text)` where each line looks like `KEY=value`.\n\nSkip blank lines and lines starting with `#`. Values may contain `=`.',
    starter: 'def parse_env(text):\n    ...\n',
    tests: [
      {
        call: "parse_env('A=1\\n# comment\\n\\nB=x=y')",
        expected: "{'A': '1', 'B': 'x=y'}",
      },
      { call: "parse_env('')", expected: '{}' },
      { call: "parse_env('  ')", expected: '{}' },
    ],
    solution:
      "def parse_env(text):\n    result = {}\n    for line in text.splitlines():\n        line = line.strip()\n        if not line or line.startswith('#'):\n            continue\n        key, _, value = line.partition('=')\n        result[key] = value\n    return result\n",
    explanation:
      '`partition` splits on the **first** separator and always returns three parts, so a value containing `=` survives intact — `split("=")` would shred it. `splitlines()` beats `split("\\n")` because it also copes with `\\r\\n`.',
    hints: ['`str.partition` splits once.', '`splitlines()` handles line endings.'],
  },
  {
    id: 'str-006',
    title: 'Reverse the word order',
    topic: 'str',
    difficulty: 'easy',
    prompt: 'Write `reverse_words(text)` that reverses the order of words but not the words themselves.',
    starter: 'def reverse_words(text):\n    ...\n',
    tests: [
      { call: "reverse_words('the quick fox')", expected: "'fox quick the'" },
      { call: "reverse_words('one')", expected: "'one'" },
      { call: "reverse_words('')", expected: "''" },
    ],
    solution: "def reverse_words(text):\n    return ' '.join(reversed(text.split()))\n",
    explanation:
      '`reversed()` returns an iterator, and `join` accepts any iterable, so nothing extra is materialised. `text.split()[::-1]` is equivalent and slightly more common in interviews.',
    hints: ['Split, reverse the list, join.'],
  },
  {
    id: 'str-007',
    title: 'Anagram check',
    topic: 'str',
    difficulty: 'medium',
    prompt: 'Write `are_anagrams(a, b)` ignoring case and spaces.',
    starter: 'def are_anagrams(a, b):\n    ...\n',
    tests: [
      { call: "are_anagrams('Listen', 'Silent')", expected: 'True' },
      { call: "are_anagrams('a', 'b')", expected: 'False' },
      { call: "are_anagrams('conversation', 'voices rant on')", expected: 'True' },
      { call: "are_anagrams('', '')", expected: 'True' },
    ],
    solution:
      "def are_anagrams(a, b):\n    def normalise(text):\n        return sorted(text.lower().replace(' ', ''))\n\n    return normalise(a) == normalise(b)\n",
    explanation:
      'Sorting both strings gives an O(n log n) answer that is easy to defend. Counting characters with `Counter` is O(n) and is the optimisation to mention. Note that comparing *sets* would be wrong: "aab" and "abb" have identical character sets.',
    hints: ['Sorted characters, or a character count.', 'Why is a set the wrong tool here?'],
  },
  {
    id: 'str-008',
    title: 'Truncate with an ellipsis',
    topic: 'str',
    difficulty: 'medium',
    prompt:
      'Write `truncate(text, limit)` returning `text` unchanged when it fits, otherwise cut it so the result — including a trailing `"…"` — is exactly `limit` characters.',
    starter: 'def truncate(text, limit):\n    ...\n',
    tests: [
      { call: "truncate('hello', 10)", expected: "'hello'" },
      { call: "truncate('hello world', 8)", expected: "'hello w…'" },
      { call: "truncate('hello', 5)", expected: "'hello'" },
      { call: "truncate('hello', 1)", expected: "'…'" },
    ],
    solution:
      "def truncate(text, limit):\n    if len(text) <= limit:\n        return text\n    return text[: limit - 1] + '…'\n",
    explanation:
      'The `limit - 1` accounts for the ellipsis character so the result length is exactly `limit`. The `<=` in the guard matters: with `<`, a string of exactly `limit` characters would be needlessly truncated.',
    hints: ['Reserve one character for the ellipsis.', 'Check `<=` versus `<`.'],
  },
  {
    id: 'str-009',
    title: 'Strip a prefix safely',
    topic: 'str',
    difficulty: 'medium',
    prompt:
      'Write `drop_prefix(text, prefix)` removing `prefix` only when the string actually starts with it.',
    starter: 'def drop_prefix(text, prefix):\n    ...\n',
    tests: [
      { call: "drop_prefix('v1.2.0', 'v')", expected: "'1.2.0'" },
      { call: "drop_prefix('1.2.0', 'v')", expected: "'1.2.0'" },
      { call: "drop_prefix('vvv', 'v')", expected: "'vv'" },
      { call: "drop_prefix('abc', '')", expected: "'abc'" },
    ],
    solution:
      'def drop_prefix(text, prefix):\n    if prefix and text.startswith(prefix):\n        return text[len(prefix) :]\n    return text\n',
    explanation:
      "The trap is `text.lstrip(prefix)`: `lstrip` treats its argument as a *set of characters*, so `'vvv'.lstrip('v')` returns `''`. Python 3.9 added `str.removeprefix()` which does exactly the right thing in one call.",
    hints: ['`lstrip` does not do what you think.', 'Python 3.9 added a method for this.'],
  },
  {
    id: 'str-010',
    title: 'Join with a final "and"',
    topic: 'str',
    difficulty: 'medium',
    prompt:
      'Write `humanise(items)` producing `"a"`, `"a and b"`, or `"a, b and c"`.\n\nAn empty list gives `""`.',
    starter: 'def humanise(items):\n    ...\n',
    tests: [
      { call: "humanise(['a'])", expected: "'a'" },
      { call: "humanise(['a', 'b'])", expected: "'a and b'" },
      { call: "humanise(['a', 'b', 'c'])", expected: "'a, b and c'" },
      { call: 'humanise([])', expected: "''" },
    ],
    solution:
      "def humanise(items):\n    if not items:\n        return ''\n    if len(items) == 1:\n        return items[0]\n    return ', '.join(items[:-1]) + ' and ' + items[-1]\n",
    explanation:
      'Handling the 0- and 1-item cases up front keeps the general case to a single expression. `join` only accepts strings — passing a list of ints raises `TypeError: sequence item 0: expected str instance`.',
    hints: ['Special-case the short inputs first.'],
  },
  {
    id: 'str-011',
    title: 'Longest word',
    topic: 'str',
    difficulty: 'easy',
    prompt:
      'Write `longest_word(text)` returning the longest whitespace-separated word.\n\nOn a tie return the first one; return `""` for empty input.',
    starter: 'def longest_word(text):\n    ...\n',
    tests: [
      { call: "longest_word('a bb ccc')", expected: "'ccc'" },
      { call: "longest_word('aa bb')", expected: "'aa'" },
      { call: "longest_word('')", expected: "''" },
    ],
    solution:
      "def longest_word(text):\n    return max(text.split(), key=len, default='')\n",
    explanation:
      '`max` with `key=len` returns the first maximal element, which satisfies the tie-break rule for free. `default=` covers the empty case; without it `max` raises `ValueError` on an empty sequence.',
    hints: ['`max` accepts `key` and `default`.'],
  },
  {
    id: 'str-012',
    title: 'Slugify a title',
    topic: 'str',
    difficulty: 'medium',
    prompt:
      'Write `slugify(title)` returning a lowercase, hyphen-separated slug containing only letters, digits and hyphens.',
    starter: 'def slugify(title):\n    ...\n',
    tests: [
      { call: "slugify('Hello, World!')", expected: "'hello-world'" },
      { call: "slugify('  Spaced   out  ')", expected: "'spaced-out'" },
      { call: "slugify('')", expected: "''" },
      { call: "slugify('!!!')", expected: "''" },
    ],
    solution:
      "def slugify(title):\n    words = []\n    for word in title.lower().split():\n        cleaned = ''.join(char for char in word if char.isalnum())\n        if cleaned:\n            words.append(cleaned)\n    return '-'.join(words)\n",
    explanation:
      'Splitting first and cleaning per word keeps punctuation from producing empty segments like `hello--world`. The `if cleaned` check drops words that were pure punctuation, which is what makes the `"!!!"` case return an empty string rather than a stray hyphen.',
    hints: ['Clean each word, then drop the empty ones.'],
  },
  {
    id: 'str-013',
    title: 'Count word frequency in a sentence',
    topic: 'str',
    difficulty: 'medium',
    prompt:
      'Write `top_word(text)` returning the most frequent lowercase word.\n\nOn a tie return the alphabetically first; return `None` for empty input.',
    starter: 'def top_word(text):\n    ...\n',
    tests: [
      { call: "top_word('a b a')", expected: "'a'" },
      { call: "top_word('b a')", expected: "'a'" },
      { call: "top_word('The the THE cat')", expected: "'the'" },
      { call: "top_word('')", expected: 'None' },
    ],
    solution:
      'def top_word(text):\n    counts = {}\n    for word in text.lower().split():\n        counts[word] = counts.get(word, 0) + 1\n    if not counts:\n        return None\n    return min(counts, key=lambda word: (-counts[word], word))\n',
    explanation:
      '`min` with a tuple key of `(-count, word)` gives "highest count, then alphabetically first" in a single pass over the dict. Reaching for `Counter.most_common(1)` would be shorter but its tie-break is insertion order, not alphabetical — which fails the second test.',
    hints: ['Count first, then pick with a tuple key.', 'Why is `most_common` not enough here?'],
  },
  {
    id: 'str-014',
    title: 'Mask a secret',
    topic: 'str',
    difficulty: 'easy',
    prompt:
      'Write `mask(token)` keeping only the last 4 characters and replacing the rest with `*`.\n\nStrings of 4 characters or fewer are returned unchanged.',
    starter: 'def mask(token):\n    ...\n',
    tests: [
      { call: "mask('abcdefgh')", expected: "'****efgh'" },
      { call: "mask('abcd')", expected: "'abcd'" },
      { call: "mask('')", expected: "''" },
    ],
    solution:
      "def mask(token):\n    if len(token) <= 4:\n        return token\n    return '*' * (len(token) - 4) + token[-4:]\n",
    explanation:
      '`"*" * n` repeats a string, and `token[-4:]` takes the last four characters safely even on short input. Without the length guard, `len(token) - 4` goes negative and `"*" * -1` silently produces an empty string — a bug that hides itself.',
    hints: ['Negative repetition counts give an empty string.'],
  },
  {
    id: 'str-015',
    title: 'Split on multiple separators',
    topic: 'str',
    difficulty: 'medium',
    prompt:
      'Write `split_tags(text)` splitting on commas **and** semicolons, trimming each tag and dropping empties.',
    starter: 'def split_tags(text):\n    ...\n',
    tests: [
      { call: "split_tags('a, b;c ,, d')", expected: "['a', 'b', 'c', 'd']" },
      { call: "split_tags('')", expected: '[]' },
      { call: "split_tags(' ; , ')", expected: '[]' },
    ],
    solution:
      "def split_tags(text):\n    normalised = text.replace(';', ',')\n    return [tag.strip() for tag in normalised.split(',') if tag.strip()]\n",
    explanation:
      'Normalising one separator into the other avoids reaching for `re.split`. The `if tag.strip()` filter removes the empty strings that consecutive separators produce — `"a,,b".split(",")` yields `["a", "", "b"]`.',
    hints: ['Turn one separator into the other first.'],
  },
  {
    id: 'str-016',
    title: 'Format a table row',
    topic: 'str',
    difficulty: 'medium',
    prompt:
      'Write `pad_row(values, width)` returning each value left-aligned to `width` characters, joined by `" | "`.\n\nValues longer than `width` are left as they are.',
    starter: 'def pad_row(values, width):\n    ...\n',
    tests: [
      { call: "pad_row(['a', 'bb'], 3)", expected: "'a   | bb '" },
      { call: "pad_row(['toolong'], 3)", expected: "'toolong'" },
      { call: 'pad_row([], 3)', expected: "''" },
    ],
    solution:
      "def pad_row(values, width):\n    return ' | '.join(value.ljust(width) for value in values)\n",
    explanation:
      '`str.ljust(width)` pads on the right and, importantly, never truncates — an over-long value is returned untouched, which is exactly the required behaviour. `rjust` and `center` are the other two variants, and f-strings offer the same via `f"{value:<3}"`.',
    hints: ['`str.ljust` never truncates.'],
  },
  {
    id: 'str-017',
    title: 'Strings are immutable',
    topic: 'str',
    difficulty: 'medium',
    prompt:
      'Write `replace_at(text, index, char)` returning a new string with the character at `index` replaced.\n\nReturn the original when `index` is out of range.',
    starter: 'def replace_at(text, index, char):\n    ...\n',
    tests: [
      { call: "replace_at('abc', 1, 'X')", expected: "'aXc'" },
      { call: "replace_at('abc', 5, 'X')", expected: "'abc'" },
      { call: "replace_at('abc', 0, 'Z')", expected: "'Zbc'" },
    ],
    solution:
      'def replace_at(text, index, char):\n    if not 0 <= index < len(text):\n        return text\n    return text[:index] + char + text[index + 1 :]\n',
    explanation:
      '`text[1] = "X"` raises `TypeError: str object does not support item assignment`, so you rebuild the string from two slices. The chained comparison `0 <= index < len(text)` rejects negative indices too, which plain indexing would silently accept as counting from the end.',
    hints: ['You cannot assign into a string.', 'Do not forget negative indices.'],
  },
  {
    id: 'str-018',
    title: 'Build a string efficiently',
    topic: 'str',
    difficulty: 'medium',
    prompt: 'Write `repeat_join(word, times, sep)` returning `word` repeated `times`, joined by `sep`.',
    starter: 'def repeat_join(word, times, sep):\n    ...\n',
    tests: [
      { call: "repeat_join('ab', 3, '-')", expected: "'ab-ab-ab'" },
      { call: "repeat_join('ab', 1, '-')", expected: "'ab'" },
      { call: "repeat_join('ab', 0, '-')", expected: "''" },
    ],
    solution: 'def repeat_join(word, times, sep):\n    return sep.join([word] * times)\n',
    explanation:
      'Repeated `result += piece` in a loop creates a new string every iteration, giving quadratic behaviour on large inputs. `join` walks the sequence once, sizes the buffer, and copies — this is the canonical "why you should use join" answer.',
    hints: ['Why is `+=` in a loop a bad idea for strings?'],
  },
  {
    id: 'str-019',
    title: 'Case-insensitive sort',
    topic: 'str',
    difficulty: 'easy',
    prompt:
      'Write `sort_names(names)` sorting case-insensitively while returning the original spellings.',
    starter: 'def sort_names(names):\n    ...\n',
    tests: [
      { call: "sort_names(['bob', 'Ann', 'carl'])", expected: "['Ann', 'bob', 'carl']" },
      { call: 'sort_names([])', expected: '[]' },
    ],
    solution: 'def sort_names(names):\n    return sorted(names, key=str.lower)\n',
    explanation:
      'Plain `sorted` compares by code point, so every uppercase letter sorts before every lowercase one and "Zoe" would land before "ann". Passing `key=str.lower` compares folded copies while returning the originals. `str.casefold` is the more aggressive variant for non-English text.',
    hints: ['Pass a `key`, do not mutate the values.'],
  },
  {
    id: 'str-020',
    title: 'Extract numbers from text',
    topic: 'str',
    difficulty: 'medium',
    prompt:
      'Write `numbers_in(text)` returning every whitespace-separated token that is a non-negative integer, converted to `int`.',
    starter: 'def numbers_in(text):\n    ...\n',
    tests: [
      { call: "numbers_in('a 1 bb 22 c')", expected: '[1, 22]' },
      { call: "numbers_in('none here')", expected: '[]' },
      { call: "numbers_in('')", expected: '[]' },
      { call: "numbers_in('3.5 4')", expected: '[4]' },
    ],
    solution:
      'def numbers_in(text):\n    return [int(token) for token in text.split() if token.isdigit()]\n',
    explanation:
      '`str.isdigit()` is true only for pure digit strings, so `"3.5"` and `"-4"` are correctly rejected. Beware that `isdigit` also accepts superscripts like `"²"`; `str.isdecimal()` is the stricter check when input may be non-ASCII.',
    hints: ['`str.isdigit()` filters before converting.'],
  },
  {
    id: 'str-021',
    title: 'Common prefix',
    topic: 'str',
    difficulty: 'hard',
    prompt:
      'Write `common_prefix(words)` returning the longest string that every word starts with.\n\nReturn `""` when there is none or the list is empty.',
    starter: 'def common_prefix(words):\n    ...\n',
    tests: [
      { call: "common_prefix(['flow', 'flower', 'flight'])", expected: "'fl'" },
      { call: "common_prefix(['a', 'b'])", expected: "''" },
      { call: "common_prefix(['same', 'same'])", expected: "'same'" },
      { call: 'common_prefix([])', expected: "''" },
    ],
    solution:
      "def common_prefix(words):\n    if not words:\n        return ''\n    shortest = min(words, key=len)\n    for index, char in enumerate(shortest):\n        if any(word[index] != char for word in words):\n            return shortest[:index]\n    return shortest\n",
    explanation:
      'The answer can never be longer than the shortest word, so scanning that one bounds the work and removes any index-out-of-range risk. A neat alternative: `os.path.commonprefix(words)` does this for arbitrary sequences, despite living in the path module.',
    hints: ['The answer cannot exceed the shortest word.'],
  },
  {
    id: 'str-022',
    title: 'Balanced brackets',
    topic: 'str',
    difficulty: 'hard',
    prompt:
      'Write `is_balanced(text)` returning `True` when `()`, `[]` and `{}` are correctly nested and closed.',
    starter: 'def is_balanced(text):\n    ...\n',
    tests: [
      { call: "is_balanced('a(b[c]{d})')", expected: 'True' },
      { call: "is_balanced('([)]')", expected: 'False' },
      { call: "is_balanced('(')", expected: 'False' },
      { call: "is_balanced(')(')", expected: 'False' },
      { call: "is_balanced('')", expected: 'True' },
    ],
    solution:
      "def is_balanced(text):\n    pairs = {')': '(', ']': '[', '}': '{'}\n    stack = []\n    for char in text:\n        if char in pairs.values():\n            stack.append(char)\n        elif char in pairs:\n            if not stack or stack.pop() != pairs[char]:\n                return False\n    return not stack\n",
    explanation:
      'A list used as a stack is the standard solution. The two failure modes are a closer with nothing (or the wrong thing) on top, and leftover openers at the end — the final `return not stack` catches the second. Counting brackets instead of stacking them fails on `([)]`.',
    hints: ['Use a list as a stack.', 'Do not forget to check the stack is empty at the end.'],
  },
  {
    id: 'str-023',
    title: 'Chunk a string',
    topic: 'str',
    difficulty: 'easy',
    prompt:
      'Write `group_digits(digits, size)` splitting a string into groups of `size` characters joined by spaces.',
    starter: 'def group_digits(digits, size):\n    ...\n',
    tests: [
      { call: "group_digits('123456789', 3)", expected: "'123 456 789'" },
      { call: "group_digits('12345', 2)", expected: "'12 34 5'" },
      { call: "group_digits('', 3)", expected: "''" },
    ],
    solution:
      "def group_digits(digits, size):\n    return ' '.join(digits[i : i + size] for i in range(0, len(digits), size))\n",
    explanation:
      'Identical to chunking a list — strings are sequences too, so the same `range(0, len, step)` plus slicing idiom applies, and the final short group needs no special handling.',
    hints: ['Same idea as chunking a list.'],
  },
  {
    id: 'str-024',
    title: 'Remove characters by set',
    topic: 'str',
    difficulty: 'medium',
    prompt: 'Write `strip_vowels(text)` removing every `a e i o u`, in either case.',
    starter: 'def strip_vowels(text):\n    ...\n',
    tests: [
      { call: "strip_vowels('Beautiful')", expected: "'Btfl'" },
      { call: "strip_vowels('xyz')", expected: "'xyz'" },
      { call: "strip_vowels('')", expected: "''" },
    ],
    solution:
      "def strip_vowels(text):\n    vowels = set('aeiou')\n    return ''.join(char for char in text if char.lower() not in vowels)\n",
    explanation:
      'A set gives O(1) membership tests, and `set(\'aeiou\')` is a compact way to build one from a string. Lowercasing only the character being tested preserves the original casing of everything you keep.',
    hints: ['Build a set of vowels once, outside the loop.'],
  },
  {
    id: 'str-025',
    title: 'Word wrap',
    topic: 'str',
    difficulty: 'hard',
    prompt:
      'Write `wrap(text, width)` returning a list of lines, greedily fitting whole words within `width` characters.\n\nAssume no word is longer than `width`.',
    starter: 'def wrap(text, width):\n    ...\n',
    tests: [
      { call: "wrap('a bb ccc dd', 6)", expected: "['a bb', 'ccc dd']" },
      { call: "wrap('one two', 20)", expected: "['one two']" },
      { call: "wrap('', 5)", expected: '[]' },
    ],
    solution:
      "def wrap(text, width):\n    lines = []\n    current = []\n    length = 0\n    for word in text.split():\n        extra = len(word) if not current else len(word) + 1\n        if length + extra > width:\n            lines.append(' '.join(current))\n            current = [word]\n            length = len(word)\n        else:\n            current.append(word)\n            length += extra\n    if current:\n        lines.append(' '.join(current))\n    return lines\n",
    explanation:
      'The subtle part is accounting for the separating space only when the line is not empty — forgetting it produces lines one character too long. Tracking `length` avoids re-joining the buffer on every word. `textwrap.wrap` in the stdlib is the production answer.',
    hints: ['Remember to count the space between words.', 'Do not forget the final partial line.'],
  },
];
