### Technical Metadata Brief: `Mathlib.Tactic.SplitIfs`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `SplitPosition` | `inductive` | Represents locations where an `if` expression may be split: either in the **target** (goal) or in a **hypothesis** (`hyp fvarId`). |
| `getSplitCandidates (loc : Location)` | `TacticM (List (SplitPosition × Expr))` | Collects all expressions (in target and/or hypotheses) that are candidates for splitting, based on the given `loc`. |
| `findIfToSplit? (e : Expr)` | `Option (Expr × Expr)` | Finds the outermost *non-nested* `if`/`if-then-else` (`ite`/`dite`) expression in `e`, returning `(condition, decidable_instance)`. |
| `findIfCondAt (loc : Location)` | `TacticM (Option (SplitPosition × Expr))` | Scans candidates at `loc` and returns the first `(position, condition)` where a splitable `if` exists. |
| `discharge? (e : Expr)` | `SimpM (Option Expr)` | Custom simplifier discharge strategy: delegates to `SplitIf.mkDischarge?`, and additionally discharges `True` goals via `True.intro`. |
| `reduceIfsAt (loc : Location)` | `TacticM Unit` | After splitting, simplifies remaining `if` expressions in the specified location(s) using `simp` with custom discharge. |
| `splitIf1 (cond : Expr) (hName : Name) (loc : Location)` | `TacticM Unit` | Splits a *single* `if` expression at `loc`, introducing a new hypothesis named `hName`, then reduces resulting goals. |
| `getNextName (hNames : IO.Ref (List binderIdent))` | `MetaM Name` | Pops the next user-provided name from `hNames`, or generates a fresh `h` if none remain. |
| `valueKnown (cond : Expr)` | `TacticM Bool` | Checks whether `cond` or `¬cond` already appears as a hypothesis — to avoid redundant splits. |
| `splitIfsCore (loc : Location) (hNames : IO.Ref …) (done : List Expr)` | `List Expr → TacticM Unit` | Main recursive loop: finds next splitable `if`, skips if condition already known or previously processed, splits, and recurses. |
| `split_ifs` tactic syntax | `tactic` | Entry point: parses `split_ifs [at ...] [with h₁ h₂ ...]`, expands location, and invokes `splitIfsCore`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `get*`: Functions that collect or extract data (e.g., `getSplitCandidates`, `getNextName`).
  - `find*?`: Partial functions returning `Option` (e.g., `findIfToSplit?`, `findIfCondAt`).
  - `reduce*`: Functions that simplify or normalize (e.g., `reduceIfsAt`).
  - `value*`: Semantic checks (e.g., `valueKnown`).
- **Suffixes**:
  - `?`: Indicates partiality / optional result (e.g., `findIfToSplit?`).
  - `Core`: Denotes the main recursive logic (`splitIfsCore`).
- **Descriptive compound names**:
  - `splitIf1`, `splitIfsCore`, `reduceIfsAt`, `valueKnown`, `discharge?`.

---

#### **3. Tactic Stack**

Frequently used tactics and utilities:
- `by_cases` — via `evalTactic` to introduce hypothesis for condition.
- `simp` — via `simpLocation` with custom `discharge?`.
- `andThenOnSubgoals` — to apply tactics sequentially across all subgoals.
- `instantiateMVars`, `inferType`, `mkFVar`, `mkApp`, `mkConst`, `getArg!` — low-level term manipulation.
- `withMainContext`, `withMainGoal` — context management.
- `logWarningAt` — for unused hypothesis names.

---

#### **4. Proof Logic / Control Flow**

1. **Parse input**: `split_ifs` parses location (`at *`, `at h`, etc.) and optional hypothesis names.
2. **Initialize**: `splitIfsCore` is called with:
   - `loc`: expanded location,
   - `hNames`: `IO.Ref` of user-provided names,
   - `done`: empty list of processed conditions.
3. **Loop**:
   - `findIfCondAt` locates next splitable `if`.
   - Normalize condition: if `¬p`, use `p`.
   - Skip if condition already in `done` or `valueKnown`.
   - Otherwise:
     - Generate fresh or use next user name `hName`.
     - `splitIf1`: `by_cases h : cond`, then `reduceIfsAt`.
     - Recurse on subgoals, adding `cond` to `done`.
4. **Cleanup**: Warn about unused hypothesis names.

**Key design choices**:
- Avoids using `SplitIf.splitIfTarget?`/`splitIfLocalDecl?` to match mathlib3 behavior.
- Prioritizes top-level `if`s (no nested `if` in condition).
- Skips splits where condition is already known (prevents explosion).
- Uses custom `discharge?` to handle `True` goals robustly.

---

#### **5. Imports**

| Module | Role |
|--------|------|
| `Lean.Elab.Tactic.Location` | Location parsing (`Location`, `expandLocation`). |
| `Lean.Meta.Tactic.SplitIf` | Core `splitIf` utilities (`mkDischarge?`, `getSimpContext`). |
| `Lean.Elab.Tactic.Simp` | `simpLocation`, `Simp.SimprocsArray`, `Simp.Discharge`. |
| `Mathlib.Tactic.Core` | Core mathlib tactics and utilities (e.g., `logWarningAt`, `mkFreshUserName`). |

---

### Summary

This module implements `split_ifs`, a mathlib-specific tactic for decomposing `if`/`ite`/`dite` expressions into multiple goals, with support for hypothesis splitting, custom naming, and robust simplification. It prioritizes compatibility with mathlib3 behavior over using Lean 4’s built-in `splitIf*` functions, leveraging custom simplifier discharge and recursive condition tracking to avoid redundant or infinite splitting.