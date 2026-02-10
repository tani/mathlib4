### Technical Metadata Brief: `swap_var` Tactic (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name / Type | Purpose |
|-------------|---------|
| `swapRule` (syntax) | Parser for a single swap rule: `ident " ↔"? ppSpace ident`, i.e., `x y` or `x ↔ y`. |
| `swap_var` (elab tactic) | Elaborator for the `swap_var` tactic. Swaps the *user-facing names* of two local constants (hypotheses or variables) in the local context and goal. Does **not** affect semantics—only renaming. |
| `getLocalDeclFromUserName` (imported) | Retrieves a local constant by its user-facing name (used to resolve `n₁`, `n₂` to `fvarId`s). |
| `lctx.setUserName fvarId name` | Updates the user name of a local constant in the local context. |

> **Note**: No theorems are proven here—this is a *tactic implementation*, not a theory.

---

#### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `swap_`: Core naming pattern for the tactic (`swap_var`, `swapRule`).
  - `ident`: Standard Lean syntax for identifiers.
  - `fvarId`: Abbreviation for *free variable ID* (Lean’s internal representation of local constants).
  - `lctx`: Local context (type `LocalContext`).
  - `mvarId`: Meta variable ID (goal identifier).

- **Syntax pattern**:
  - `swapRule| $n₁:ident $[↔]? $n₂:ident` — uses Lean’s *syntax quotation* with optional `↔`.

---

#### **3. Tactic Stack**

- **Core tactics/macros used**:
  - `getMainGoal`, `getLocalDeclFromUserName`, `setUserName`, `modifyMCtx`, `withLCtx`
  - `foldlM`: Monadic left fold (for sequential application of rules)
  - `unreachable!`: For syntax parsing failure (exhaustive pattern match)
  - `getElems`: Extracts list from a `colGt`-parsed sequence

- **No high-level tactics** like `simp`, `rw`, or `aesop` — this is a low-level context manipulation tactic.

---

#### **4. Proof Logic / Execution Flow**

1. **Parse input**: Expect one or more `swapRule`s (comma-separated).
2. **For each rule**:
   - Extract two identifiers `n₁`, `n₂`.
   - Resolve them to `fvarId`s via `getLocalDeclFromUserName`.
   - Update the local context: swap the *user names* of the two local constants.
3. **Update the main goal’s declaration** with the modified local context.
4. **No backtracking or case analysis** — purely deterministic renaming.

> **Key insight**: The tactic operates *only on syntax* (names in the local context), not on the semantic content of hypotheses. It preserves all logical structure.

---

#### **5. Imports**

| Module | Role |
|--------|------|
| `Lean.Elab.ElabRules` | Provides infrastructure for tactic elaboration (e.g., `elab`, `syntax`, `getLocalDeclFromUserName`, `withLCtx`). |
| `Mathlib.Util.Tactic` | Utility tactics and helpers (likely includes `getLocalDeclFromUserName` or related utilities). |

> **No core logic or arithmetic imports** — this is a purely syntactic, context-manipulation utility.

---

### Summary

The `swap_var` tactic is a **lightweight, syntax-level renaming tool** for local constants in Lean proofs. It enables swapping hypothesis names (e.g., to align with naming conventions or avoid shadowing), and is implemented via direct manipulation of the local context’s user-facing names. Its design reflects Lean’s separation of *syntax* (names) and *semantics* (types/proofs).