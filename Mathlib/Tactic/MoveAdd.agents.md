### Technical Brief: `move_add` Tactic (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `getExprInputs` | `Expr → Array Expr` — Extracts immediate subexpressions of an `Expr` constructor (e.g., `app`, `lam`, etc.). Used for traversal and size computation. |
| `size` | `Expr → ℕ` — Recursively counts total number of subexpressions (nodes in the expression tree). Used for prioritizing replacements in `rankSums`. |
| `uniquify` | `List α → List (α × ℕ)` — Annotates list elements with occurrence index (to handle duplicates uniquely). Critical for matching inputs to atoms without ambiguity. |
| `weight` | `List (α × Bool) → α → ℤ` — Assigns integer weights to elements based on their position and direction (`true` = left, `false` = right). Ensures stable ordering: left-moved elements get negative weights, right-moved positive, others zero. |
| `reorderUsing` | `List α → List (α × Bool) → List α` — Reorders a list according to `instructions` (direction + priority). Implements the core permutation logic. |
| `prepareOp` | `Expr → Expr` — Extracts the partially applied binary operation from a fully applied sum/product expression (e.g., from `a + b + c`, extracts `λ x y, x + y`). Needed to reconstruct reordered sums. |
| `sumList` | `Expr → Bool → List Expr → Expr` — Rebuilds a left- or right-associated sum/product from a list of operands using `prepOp`. Handles associativity direction (e.g., `And`/`Or` are right-assoc by default). |
| `getAddends` | `Expr → MetaM (Array Expr)` — Recursively extracts *maximal* operands of a binary operation `op` in an expression (e.g., for `a + b + c`, returns `[a, b, c]`). Filters by type compatibility. |
| `getOps` | `Expr → MetaM (Array (Array Expr × Expr))` — Collects all maximal `op`-subexpressions and their operands (possibly with duplicates). Used to find all places where reordering applies. |
| `rankSums` | `Expr → List (Expr × Bool) → MetaM (List (Expr × Expr))` — For each maximal `op`-subexpression, computes its reordered version using `reorderUsing`, returns list of `(old, new)` pairs sorted by decreasing `size`. Ensures inner replacements happen before outer ones. |
| `permuteExpr` | `Expr → List (Expr × Bool) → MetaM Expr` — Applies all `(old, new)` replacements from `rankSums` in order. Fails if no changes needed. |
| `pairUp` | `List (Expr × Bool × Syntax) → List Expr → MetaM ((List (Expr × Bool)) × List (Expr × Bool × Syntax))` — Matches user inputs to available operands via `isDefEq`, preserving order and avoiding reuse. Returns matched/unmatched pairs. |
| `unifyMovements` | `Array (Expr × Bool × Syntax) → Expr → MetaM (...)` — High-level unification: parses inputs, matches to atoms, reports unmatched terms with syntax locations. |
| `parseArrows` | `TSyntax `rwRuleSeq` → TermElabM (Array (Expr × Bool × Syntax))` — Parses `[a, ← b, _]` into `(expr, isLeft?, syntax)` triples. Handles optional `←`. |
| `reorderAndSimp` | `MVarId → List (Expr × Bool) → MetaM (List MVarId)` — Core tactic driver: permutes goal, generates `mv = permuted_mv` and `permuted_mv` subgoals, solves equality via `simp` using operation-specific lemmas. |
| `moveOperTac` | Elaborator for `move_oper op [...]` — Generic tactic for associative-commutative binary ops. |
| `move_add`, `move_mul` | Elaborators wrapping `move_oper` for `HAdd.hAdd` and `HMul.hMul`. |

**No named theorems** — the tactic relies on *lemmas* (not theorems) in `moveOperSimpCtx`.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `get*`, `rank*`, `perm*`, `reorder*`, `unify*`, `pair*`, `prepare*`, `sumList` — functional decomposition.
  - `move_*` — tactic entry points (`move_add`, `move_mul`, `move_oper`).
- **Suffixes**:
  - `?` — Boolean flag (e.g., `left_assoc?`).
  - `*` — Variadic (e.g., `rwRuleSeq| [$rs,*]`).
  - `Ctx`, `Thms` — Context/theorem collections (`moveOperSimpCtx`, `simpTheorems`).
- **Booleans**:
  - `true` = move **left** (`← a`), `false` = move **right** (`a`).
- **Data structures**:
  - `Expr × Bool × Syntax` — parsed input triple.
  - `Expr × Expr` — `(old_sum, new_sum)` pair.
  - `List (α × ℕ)` — `uniquify` output.

---

#### **3. Tactic Stack**

Frequent tactics used *within* the implementation (not user-facing):

| Tactic | Role |
|--------|------|
| `isDefEq` | Unification of user terms with subexpressions (matching atoms). |
| `inferType` | Type inference for safety checks. |
| `mkEq`, `mkAppM`, `mkFreshExprMVar` | Meta-programming helpers to build new goals/expressions. |
| `simp` / `simpOnly` | Closing the equality goal `mv = permuted_mv` using operation lemmas. |
| `guard`, `unless`, `for ... in ... do` | Control flow in `MetaM`. |
| `withMainContext`, `getMainGoal`, `replaceMainGoal` | Goal manipulation. |
| `logErrorAt`, `throwErrorAt` | Error reporting with syntax locations. |
| `trace[...]` | Debug tracing (via `Tactic.move_oper`). |

No custom tactics — built entirely from Lean’s `Meta` API.

---

#### **4. Proof Logic / Execution Flow**

1. **Parsing** (`parseArrows`):  
   Input `[a, ← b, _]` → `[(a, false), (b, true), (_, false)]` + syntax.

2. **Unification** (`unifyMovements` → `pairUp`):  
   Match parsed terms to *available atoms* (operands of `op` in goal), using `isDefEq`.  
   - First match wins; later terms skip already-matched atoms.  
   - Unmatched terms → error with syntax underline.

3. **Reordering** (`rankSums` → `permuteExpr`):  
   - For each maximal `op`-subexpression (e.g., `x + y + z`):  
     - Extract operands → reorder via `reorderUsing` (using `weight`).  
     - Rebuild with `sumList` (respecting associativity direction).  
   - Sort `(old, new)` pairs by decreasing `size` (inner → outer replacements).

4. **Goal Update & Simplification** (`reorderAndSimp`):  
   - Replace goal with permuted version.  
   - Generate two subgoals:  
     1. `permuted = original` (solved by `simp` using `add_comm`, `add_assoc`, etc.)  
     2. `permuted` (new goal).  
   - Fail if `simp` cannot close the equality.

5. **Associativity Handling**:  
   - `And`, `Or` → right-associated by default (`left_assoc? = false`).  
   - `HAdd.hAdd`, `HMul.hMul` → left-associated (`left_assoc? = true`).

---

#### **5. Imports & Scope**

**Core Imports**:
- `Mathlib.Algebra.Group.Basic` — Provides `add_comm`, `add_assoc`, etc., for `HAdd.hAdd`.
- `Mathlib.Lean.Meta` — Meta-programming utilities (`MetaM`, `Expr`, `MVarId`, `Simp`, etc.).

**Scope**:
- `Mathlib.MoveAdd` namespace.
- Extensible via `moveOperSimpCtx` to support new binary ops (`Max`, `Min`, `And`, `Or`, etc.).
- **Not exported** — internal tactic; users call `move_add`, `move_mul`, or `move_oper`.

---

### Summary

`move_add` is a **domain-specific reordering tactic** for associative-commutative binary operations (addition/multiplication). It uses:
- **Unification** (`pairUp`) to match user terms to operands,
- **Weighted permutation** (`weight`, `reorderUsing`) to enforce left/right ordering,
- **Recursive replacement** (`rankSums`, `permuteExpr`) to handle nested expressions,
- **Simplification** (`simp` + `moveOperSimpCtx`) to justify the permutation.

It exemplifies Lean’s power for *tactic-level metaprogramming* with precise control over expression structure and matching semantics.