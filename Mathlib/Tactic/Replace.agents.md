**Technical Metadata Brief: `Mathlib.Tactic.ReplaceExt`**

---

### 1. **Key Definitions & Theorems**

| Name | Type / Syntax | Purpose |
|------|----------------|---------|
| `replace'` tactic syntax | `(name := replace') "replace" haveIdLhs' : tactic` | Extends `replace` to allow hypothesis *replacement* (i.e., shadowing) instead of *addition* when a hypothesis with the same name already exists. |
| `haveLetCore` (imported) | Internal Lean elaborator function | Core utility used to implement `have`/`let`-style hypothesis introduction; reused here for consistency. |
| `replaceMainGoal`, `clear`, `getLCtx`, `findFromUserName?`, `fvarId`, `observing?` | Lean Elab.Tactic API | Used to manipulate the local context and goal state during tactic execution. |

> **Note**: No named theorems are proven in this file — it is purely a *tactic extension*.

---

### 2. **Naming Conventions**

- **Prefix**: `replace'` — prime suffix indicates a *variant* of the base `replace` tactic.
- **Syntax identifier**: `haveIdLhs'` — derived from `haveIdLhs`, suggesting it reuses syntax for hypothesis introduction with an identifier on the left-hand side.
- **Internal naming**: `hId?`, `hId`, `name`, `goal1`, `goal2` — standard Lean tactic elaborator variable naming (e.g., `?` suffix for optional values).

---

### 3. **Tactic Stack / Elaboration Flow**

- **Core tactics used**:
  - `withMainContext`
  - `haveLetCore`
  - `getMainGoal`, `replaceMainGoal`
  - `getLCtx`, `findFromUserName?`, `fvarId`
  - `clear`, `observing?`, `getD`
- **No high-level proof tactics** (e.g., `simp`, `rw`, `induction`) — this is a *low-level tactic elaborator*, not a proof script.

---

### 4. **Proof Logic / Elaboration Logic**

The tactic elaborator follows this logic:

1. Parse input of the form `replace h : β` (optionally with binder annotations `bs`).
2. Use `haveLetCore` to generate two subgoals:
   - `goal1`: to prove the new hypothesis (`β` under assumptions including the old `h : α`).
   - `goal2`: the original goal, now with the new hypothesis added.
3. Check if a hypothesis named `h` already exists in the local context.
4. If yes:
   - Clear the old hypothesis (`hId`) from `goal2` *before* replacing the main goal.
   - This achieves *replacement* (shadowing), not accumulation.
5. If no:
   - Proceed as with `have`, adding the new hypothesis without clearing.

> **Style note**: This mimics older-style `replace` behavior (pre-Batteries refactor), where `replace` would overwrite existing hypotheses — now discouraged in mathlib in favor of explicit `have` + `clear`.

---

### 5. **Imports**

| Import | Role |
|--------|------|
| `Mathlib.Tactic.Have` | Provides `haveLetCore`, the core elaborator for `have`/`let`-style hypothesis introduction. |
| `Lean Elab.Tactic` | Provides low-level tactic elaboration utilities (`withMainContext`, `getMainGoal`, `replaceMainGoal`, etc.). |

> **No heavy dependencies** — this is a lightweight extension built on top of core Lean elaboration infrastructure.

---

### Summary

This file defines a *tactic variant* `replace'` that restores pre-Batteries behavior of `replace`, allowing hypothesis *shadowing* instead of accumulation. It is **not intended for use in mathlib itself**, but serves downstream users preferring legacy style. The implementation leverages `haveLetCore` and context manipulation APIs to conditionally clear existing hypotheses of the same name.