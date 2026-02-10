### Technical Metadata Brief: `fail_if_no_progress` Tactic (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `lctxIsDefEq` | `List (Option LocalDecl) → List (Option LocalDecl) → MetaM Bool` | Compares two lists of local declarations (including optional lets) up to definitional equality at *reducible* transparency. Returns `true` iff the contexts are structurally and definitionally equivalent. |
| `runAndFailIfNoProgress` | `MVarId → TacticM Unit → TacticM (List MVarId)` | Executes a tactic sequence on a goal, then checks whether *actual progress* was made (via context or goal type changes). If no progress, throws an error; otherwise returns new goals. |
| `fail_if_no_progress` | Syntax rule: `"fail_if_no_progress " tacticSeq` | Elaborated tactic combinator: wraps a tactic sequence and fails if it makes no definitional progress on the goal or local context. |

---

#### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `lctxIsDefEq`: `lctx_` = *local context*, `IsDefEq` = *definitional equality check*.
  - `runAndFailIfNoProgress`: `runAnd...` = *execute and conditionally fail*, `NoProgress` = *no measurable change*.
  - `fail_if_no_progress`: Descriptive, imperative, follows Lean’s `fail_if`/`fail_if`-style naming (e.g., `fail_if` in Lean 3).
- **Style**: Functional, descriptive, avoids abbreviations; uses underscores for multi-word identifiers.

---

#### **3. Tactic Stack / Tactics Used**

- **Core Tactics & Utilities**:
  - `run`, `getMainGoal`, `evalTactic`, `replaceMainGoal`
  - `withNewMCtxDepth`, `withReducible`, `isDefEq`, `guard`, `getDecl`, `getType`
  - `failure`, `guard`, `throwError`, `try ... catch _`
- **Meta-level utilities**:
  - `MetaM`, `TacticM`, `LocalDecl`, `fvarId`, `isLet`, `value`, `type`
- **No high-level automation tactics** (e.g., `aesop`, `ring`, `simp`) — this is a *meta-level control combinator*, not a proof tactic itself.

---

#### **4. Proof Logic / Execution Flow**

1. **Capture initial state**:
   - Save current goal (`goal`) and its local context (`ctxDecls`).
2. **Run tactic sequence**:
   - Execute `tacs` on `goal` via `run`, producing new goals `l`.
3. **Check progress**:
   - If `l` is not a singleton list → assume progress (e.g., split goals).
   - Else (`[newGoal]`), compare:
     - **Local contexts**: `lctxIsDefEq ctxDecls newCtxDecls` (with `withReducible`).
     - **Goal types**: `isDefEq (← newGoal.getType) (← goal.getType)` (also `withReducible`).
4. **Fail if no change**:
   - If both context and goal type are definitionally equal → `guard` fails → `catch _` is *not* triggered → `throwError`.
   - If any check fails (e.g., new hypotheses, changed goal type), return new goals.

> **Key insight**: "Progress" is *not* syntactic change (e.g., `1 - 1` → `0`), but *definitional* change at *reducible* transparency — aligning with Lean’s `withReducible` semantics.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Init` | Base definitions, possibly for `MetaM`, `LocalDecl`, etc. |
| `Lean.Elab.Tactic.Basic` | Elaboration infrastructure (`elab_rules`, `evalTactic`, `tacticSeq`, `tactic` syntax). |
| `Lean.Meta.Tactic.Util` | Utilities for tactic meta-programming (e.g., `run`, `withNewMCtxDepth`, `withReducible`). |

- **Module scope**: `Mathlib.Tactic` namespace.
- **Target use case**: Control flow in iterative tactic scripts (e.g., `repeat (fail_if_no_progress simp <;> ring_nf)`), where termination depends on *effective* progress.

---

### Summary

This file defines a **meta-level tactic combinator** that enforces *definitional progress* in tactic sequences. It is a *monitoring utility*, not a proof tactic per se — crucial for building robust, terminating tactic pipelines in Lean 4. Its correctness hinges on precise comparison of local contexts and goal types at *reducible* transparency, avoiding false positives from syntactic simplifications that are definitionally trivial.