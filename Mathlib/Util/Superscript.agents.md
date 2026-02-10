### Technical Metadata Brief: Superscript/Subscript Parser Module

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Mapping` | `Structure` | Bidirectional character mapping between "special" (e.g., superscript) and "normal" characters. |
| `mkMapping (s₁ s₂ : String)` | `Mapping` | Constructs a `Mapping` from two equal-length strings (special ↔ normal). Panics on invariant violations. |
| `Mapping.superscript` | `Mapping` | Predefined mapping for Unicode superscript ↔ ASCII characters. |
| `Mapping.subscript` | `Mapping` | Predefined mapping for Unicode subscript ↔ ASCII characters. |
| `satisfyTokensFn (p : Char → Bool)` | `ParserFn` | Parses runs of characters satisfying `p`, separated by whitespace (or not), returning token spans. |
| `partitionPoint (as : Array α)` | `Nat` | Binary search to find partition index in sorted array based on predicate. |
| `scriptFnNoAntiquot (m : Mapping)` | `ParserFn` | Core parser logic: parses script tokens, unmaps to ASCII, runs inner parser, realigns positions. |
| `scriptParser (m : Mapping)` | `Parser` | Wraps `scriptFnNoAntiquot` into a full parser with antiquotation support. |
| `superscript (p : Parser)` | `Parser` | Parser for superscripts using `Mapping.superscript`. |
| `subscript (p : Parser)` | `Parser` | Parser for subscripts using `Mapping.subscript`. |
| `superscriptTerm`, `subscriptTerm` | `Parser` | Term-level shorthands for `superscript termParser`, `subscript termParser`. |
| `scriptParser.formatter`, `superscript.formatter`, `subscript.formatter` | `Formatter` | Pretty-printers that re-encode parsed syntax back into Unicode script characters. |
| `scriptParser.parenthesizer`, `superscript.parenthesizer`, `subscript.parenthesizer` | `Parenthesizer` | Parenthesizers for pretty-printing. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `scriptFnNoAntiquot`, `scriptParser`: Core parsing logic.
  - `superscript`, `subscript`: Public-facing parser combinators.
  - `superscriptTerm`, `subscriptTerm`: Term-level parser aliases.
  - `mkMapping`, `satisfyTokensFn`: Internal utility functions.

- **Suffixes**:
  - `Fn`: Functional parser combinators (`satisfyTokensFn`, `scriptFnNoAntiquot`).
  - `Term`: Term-level parser shorthands (`superscriptTerm`, `subscriptTerm`).
  - `.parenthesizer`, `.formatter`: Pretty-printer combinators.

- **Structure Fields**:
  - `toNormal`, `toSpecial`: Bidirectional mapping keys.

---

#### **3. Tactic Stack**

- **Core Tactics & Utilities**:
  - `Id.run`: For monadic `do` blocks returning pure values.
  - `assert!`: Compile-time invariant checks in `mkMapping`.
  - `toArray`, `mapM`, `get?`, `Except`: For array/string transformations.
  - `mkInputContext`, `ParserState`, `Syntax`, `SourceInfo`: Lean parser infrastructure.
  - `partitionPoint`: Custom binary search helper (used in position alignment).
  - `modifyGet`, `get`, `set`: State monad operations in `Formatter`.

- **No heavy tactic use** — this is a *parser/pretty-printer* module, not a tactic library.

---

#### **4. Proof Logic / Parsing Flow**

The core logic (`scriptFnNoAntiquot`) follows a **3-stage pipeline**:

1. **Tokenization**:
   - `satisfyTokensFn` collects contiguous runs of script characters (e.g., `⁶⁴`) and optional whitespace.
   - Fails if first char is not a script character.

2. **Unscripting & Parsing**:
   - Maps script chars → ASCII using `m.toNormal`.
   - Builds a new string (e.g., `"64"`), records position alignment info.
   - Runs inner parser (`p`) on the unscripted string.

3. **Re-alignment**:
   - Uses `partitionPoint` to map positions in the unscripted string back to original positions.
   - Reconstructs `Syntax` tree with original source positions and substrings.
   - Pushes resulting syntax node onto stack.

- **Antiquotation support** via `withAntiquotFn` and `mkAntiquot`.
- **Formatter** reverses the mapping: re-encodes ASCII → script chars using `m.toSpecial`.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Init` | Core Lean infrastructure (e.g., `Inhabited`, `Hashable`, `Std.HashMap`). |
| `Batteries.Tactic.Lint` | Linting utilities (likely for parser hygiene checks). |
| `Lean`, `Parser`, `PrettyPrinter`, `Std` | Lean 4 parser/pretty-printer APIs (`ParserFn`, `Syntax`, `Formatter`, `Parenthesizer`, `Format`, etc.). |

---

### Summary

This module implements a **domain-specific parser and pretty-printer** for Unicode superscript and subscript characters, enabling syntax like `2⁶⁴` to parse as `2 ^ 64`. It leverages Lean’s parser combinators, position tracking, and alignment utilities to handle Unicode’s variable-width encoding and preserve source location fidelity. The design is modular, reusable (via `Mapping`), and focused on **local notation** use cases, not general-purpose expression parsing.