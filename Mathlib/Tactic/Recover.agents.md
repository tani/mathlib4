### Technical Metadata Brief: `recover` Tactic Modifier in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `getUnassignedGoalMVarDependencies` | `MVarId → MetaM (Std.HashSet MVarId)` | Computes all metavariables that a given goal depends on (including those in its type, local context, and delayed assignments), recursively. Used to identify *unresolved* subgoals after tactic execution. |
| `recover` (elaborator) | `tacticSeq → tactic` (via `elab`) | A **tactic modifier** that wraps a tactic sequence `tacs`, executes it, and then *re-introduces* any goals that were not closed (i.e., remain unassigned), starting from the original goal set. Designed for debugging incorrect goal closure. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `getUnassignedGoalMVarDependencies`: Uses `get` + `Unassigned` + `Goal` + `MVar` + `Dependencies` — descriptive, modular naming.
  - `recover`: Short, imperative verb — standard for debugging/repair modifiers (`try`, `recover`, `try?`, etc. in Lean).
- **Internal helpers**:
  - `addMVars`, `go`: Auxiliary functions with conventional recursive/iterative naming (`go` is common in stateful traversals).
- **No suffixes** like `_def`, `_thm`, `_prop` — this is a *tactic elaborator*, not a theorem or definition in the logical sense.

---

#### **3. Tactic Stack / Tactics Used**

- **Core tactic combinators**:
  - `getGoals`, `setGoals`: To capture and restore goal state.
  - `evalTactic`: Executes the wrapped tactic sequence.
  - `withIncRecDepth`: Wraps recursive calls to prevent infinite loops (used in `go`).
- **Meta-level utilities**:
  - `getMVars`: Extracts metavariables from an expression.
  - `mvarId.isAssigned`, `mvarId.isDelayedAssigned`: Check assignment status.
  - `getDelayedMVarAssignment?`, `getDecl`, `lctx`: Accessor methods on `MVarId`.
  - `StateRefT`, `modify`, `insert`, `insertMany`, `eraseDups`: State management and set operations.
- **No high-level tactics** (e.g., `simp`, `rw`, `induction`) appear — this is a *meta-level* utility, not a proof tactic.

---

#### **4. Proof Logic / Execution Flow**

The logic is **stateful and meta-level**, not logical inference:

1. **Capture original goals** before tactic execution.
2. **Run the wrapped tactic sequence** (`evalTactic tacs`).
3. For each *original* goal:
   - If it remains unassigned, add it to the `unassigned` set.
   - Compute *all dependent metavariables* via `getUnassignedGoalMVarDependencies`.
   - Merge those into the `unassigned` set.
4. **Reconstruct the goal list** by appending unassigned metavariables to the current goals, deduplicating.

> **Key insight**: It does *not* replay tactics — it only *re-exposes* goals that were not closed, enabling inspection of where a tactic sequence failed to finish.

---

#### **5. Imports & Scope**

- **Primary import**: `Mathlib.Init`  
  → Provides foundational Lean infrastructure (including `Lean.Meta`, `Lean.Elab.Tactic`, etc.).
- **Module scope**: `Mathlib.Tactic` namespace.
- **Dependencies** (implicit via imports):
  - `Lean.Meta`: For `MVarId`, `getMVars`, `getDecl`, etc.
  - `Lean.Elab.Tactic`: For `elab`, `evalTactic`, `getGoals`, `setGoals`.
  - `Std.HashSet` (via `open Lean`): For mutable hash sets in `MetaM`.

---

### Summary

The `recover` modifier is a **diagnostic tool** for tactic debugging in Lean 4. It leverages low-level metavariable tracking to detect incomplete goal closure, making it especially useful when tactics like `assumption`, `exact`, or `solve1` silently fail to close goals. Its design reflects Lean’s meta-programming style: stateful, recursive traversal of the metavariable graph, with clear separation of concerns between goal tracking and tactic execution.