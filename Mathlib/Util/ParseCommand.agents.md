**Technical Metadata Brief: `#parse` Command in Lean 4 (Mathlib.GuardExceptions)**

---

### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `captureException` | `Environment → ParserFn → String → Except String Syntax` | Attempts to parse a `String` using a given `ParserFn` and returns either a syntax tree (`.ok`) or an error message (`.error`). Wraps low-level parsing state to provide a clean `Except` interface. |
| `parseCmd` | Syntax rule: `#parse ident => str : command` | Declares the custom command syntax for `#parse`. |
| `elab_rules` | Elaborator for `#parse $parserFnId => $str` | Implements the elaboration logic: retrieves the parser function, invokes `captureException`, and logs the input string on success (or raises an exception on failure), enabling integration with `#guard_msgs`. |

---

### 2. **Naming Conventions**

- **Prefixes**:
  - `captureException`: descriptive verb + noun, indicating exception capture via `Except`.
  - `parseCmd`: `Cmd` suffix indicates a *command* (i.e., top-level tactic-like syntax).
- **Suffixes**:
  - `Fn` in `parserFnId`: standard Lean convention for *function identifiers* (e.g., `ParserFn`).
  - `Id` in `parserFnId`: indicates an identifier reference (e.g., a constant name).
- **Syntax pattern**: `#parse <parser> => <string>` — mirrors `#eval`, `#check`, etc., with `=>` for argument separation.

---

### 3. **Tactic / Elaborator Stack**

- **Core tactics/macros used**:
  - `elabCommand`: to embed command elaboration.
  - `run_cmd`: monadic command block.
  - `Lean.ofExcept`: converts `Except String α` to a monadic action (throws on `.error`).
  - `logInfo`: logs the parsed string (used here for output logging).
  - `getEnv`: retrieves the current `Environment`.
  - `mkInputContext`, `getTokenTable`, `mkParserState`, `s.stxStack`, etc.: low-level parser state utilities from `Lean.Parser`.

- **No high-level tactics** (e.g., `simp`, `rw`, `aesop`) — this is purely an *elaborator-time* utility.

---

### 4. **Proof / Elaboration Logic Flow**

1. Parse the syntax tree `#parse $parserFnId => $str`.
2. Retrieve the `Environment` via `getEnv`.
3. Look up the `ParserFn` identified by `$parserFnId`.
4. Call `captureException env parserFn str`:
   - Constructs input context and parser state.
   - Runs the parser.
   - Checks for errors or incomplete consumption of input.
   - Returns `.ok stx` or `.error msg`.
5. Use `Lean.ofExcept` to:
   - On `.ok`: log the input string (`logInfo str`) — *note: logs the input, not the parsed syntax*.
   - On `.error`: throw an exception (which can be caught by `#guard_msgs`).
6. Enables testing of parser behavior via `#guard_msgs`.

> **Note**: The comment says “if the parse is successful, then the output is captured in an exception” — this appears to be a typo; the code actually *logs* on success and *throws* on failure.

---

### 5. **Imports & Dependencies**

| Import | Role |
|--------|------|
| `Lean.Elab.Command` | Provides infrastructure for defining custom commands (`elab_rules`, `command`, `elabCommand`). |
| `Mathlib.Init` | Supplies foundational utilities (including `Except`, `Environment`, `ParserFn`, etc.). |

> No heavy Mathlib dependencies — this is a lightweight utility for parser debugging/testing.

---

### Summary

The `#parse` command is a **debugging utility** for testing Lean parser functions (`ParserFn`) on arbitrary strings. It leverages Lean’s internal parser state machinery to capture parsing errors and integrates with `#guard_msgs` for regression testing of parser behavior (e.g., validating error messages like “Stacks tags must be exactly 4 characters”). Designed for internal use in Mathlib’s parser development and validation.