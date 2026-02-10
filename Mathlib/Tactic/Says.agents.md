### Technical Brief: `says` Tactic Combinator (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `says.verify` | `Option` (default `false`) — Controls whether to re-verify that `X` produces `"Try this: Y"` when `X says Y` is used. Enabled automatically in CI. |
| `says.no_verify_in_CI` | `Option` (default `false`) — Allows disabling verification even when `CI` env var is set. |
| `parseAsTacticSeq` | `Environment → String → String → Except String (TSyntax ``tacticSeq)` — Parses a string (e.g., `"simp only [X, Y]"`) into Lean tactic syntax. Used to reconstruct tactic AST from `"Try this: …"` output. |
| `evalTacticCapturingMessages` | `TSyntax ``tactic → (Message → Bool) → TacticM (List Message)` — Runs a tactic and captures messages matching a predicate (e.g., only info messages). Preserves original message log. |
| `evalTacticCapturingInfo` | `TSyntax ``tactic → TacticM (List Message)` — Specialization of above to capture only info-level messages. |
| `evalTacticCapturingTryThis` | `TSyntax ``tactic → TacticM (TSyntax ``tacticSeq)` — Extracts `"Try this: …"` message from tactic output, parses it, and returns as tactic syntax. Fails if no/ambiguous output. |
| `says` tactic syntax | `(name := says) tactic " says" (colGt tacticSeq)? : tactic` — Syntax definition for `X says [Y]`. |
| `elab_rules` | Elaborator for `says` tactic: <br> • If `Y` is present and `verify = true`: runs `X`, checks output matches `Y`. <br> • If `Y` absent or `verify = false`: runs `X`, captures `"Try this: Y"`, suggests `X says Y`. <br> • If `Y` present and `verify = false`: runs `Y` directly (no verification). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `evalTacticCapturing*`: Functions that run a tactic and capture messages.
  - `parseAsTacticSeq`: Parses string → tactic syntax (non-standard, custom helper).
- **Suffixes**:
  - `*CapturingMessages` / `*CapturingInfo`: Distinguish message-capture scope.
- **Option names**:
  - `says.verify`, `says.no_verify_in_CI`: Use `.`-separated group + descriptive suffix.

---

#### **3. Tactic Stack / Tactics Used**

- **Core tactics & utilities**:
  - `evalTactic`: Executes tactic in `TacticM`.
  - `modifyGetThe`, `modifyThe`, `getThe`: State manipulation in `TacticM`.
  - `throwError`, `throw`, `catch`: Error handling.
  - `addSuggestion`: Adds "Try this" suggestion to IDE.
  - `Lean.PrettyPrinter.ppTactic`: Pretty-prints tactic syntax for comparison.
  - `Syntax.stripPos`, `String.removeLeadingSpaces`, `dropPrefix?`: String/syntax utilities.
- **Parser combinators**:
  - `andthenFn`, `whitespace`, `Tactic.tacticSeq.fn`, `getTokenTable`, `mkInputContext`, `mkParserState`: For low-level parsing of tactic sequences.

---

#### **4. Proof Logic / Elaboration Flow**

The elaborator follows this logic:

1. **Check verification mode**:
   - `verify = says.verify ∨ (CI ∧ ¬no_verify_in_CI)`
2. **Branch on presence of `result` (`Y`) and `verify`**:
   - **Case A**: `result` present **and** `verify = true`  
     → Run `tac` (`X`), capture `"Try this: Y'"`, compare `Y'` with `result` (`Y`) via pretty-printing.  
     → Fail if mismatch.
   - **Case B**: `result` absent **or** `verify = false`  
     → Run `tac`, capture `"Try this: Y'"`, suggest `tac says Y'`.
   - **Case C**: `result` present **and** `verify = false`  
     → Skip verification; just run `result` (`Y`).
3. **Error handling**:
   - Fails if `tac` produces no info messages or >1 `"Try this: …"` message.
   - Fails if `"Try this: …"` is malformed or unparsable.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Init` | Core Lean + Mathlib initialization. |
| `Lean.Meta.Tactic.TryThis` | Provides infrastructure for `"Try this:"` suggestions (e.g., `tryThis`, message format). |
| `Batteries.Linter.UnreachableTactic` | Used to register `says` as an *ignored tactic* in linter (prevents false positives for unreachable code). |
| `Qq.Match` | Likely for quote/macro utilities (used in `parseAsTacticSeq` or pretty-printing). |

**Module scope**:  
`Mathlib.Tactic.Says` — A utility for *interactive tactic refinement*, especially for `?`-style tactics like `simp?`, `rw?`, `exact?`, etc., that suggest tactics via `"Try this: …"`.

---

### Summary

The `says` combinator enables **tactic suggestion chaining** with **verification safety**. It is designed for reproducibility and IDE-assisted workflow: users can write `simp? [...] says simp only [...]`, and later rely on `simp only [...]` alone — while optionally verifying correctness in CI. The implementation is robust, with careful message capture, parsing, and error reporting.