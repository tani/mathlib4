**Technical Metadata Brief: `guard_goal_nums` Tactic (Lean 4)**

---

### 1. **Key Definitions & Theorems**
- **`guardGoalNums`**  
  - **Type**: `TacticM Unit` (elaborated as a tactic command)  
  - **Purpose**: Validates that the current tactic state has exactly `n` open goals; fails with a descriptive error message if the count differs.  
  - **Implementation**: Reads current goals via `getGoals`, compares length to `n.getNat`, and uses `guard` to enforce equality.

---

### 2. **Naming Conventions**
- **Prefix**: `guard` — indicates a *validation/check* tactic (consistent with Lean’s `guard`/`guard'` in tactic monad).
- **Suffix**: `Nums` — short for “numbers”, indicating the tactic operates on *numerical properties* of the goal state.
- **Elaborator name**: `guardGoalNums` — matches the tactic name but in camelCase (standard for `elab` commands in Lean 4).

---

### 3. **Tactic Stack / Core Tactics Used**
- `getGoals` — retrieves the list of current goals.
- `guard` — conditional failure combinator (from `Lean.Meta.Tactic`/`TacticM`).
- `throwError` — explicit error reporting.
- `getNat` — extracts natural number from `Lean.Parser.Term.Num`.
- `←` (bind) — monadic sequencing in `TacticM`.

*No high-level tactics (e.g., `simp`, `rw`, `induction`) are used — this is a low-level utility.*

---

### 4. **Proof Logic / Execution Flow**
1. **Capture goal state**: `getGoals` → list of goals.
2. **Count goals**: `.length`.
3. **Compare to expected `n`**:
   - If equal → succeed (unit return).
   - If not → throw error with expected vs. actual counts.
4. **No backtracking or side effects** — purely a *diagnostic/check* tactic.

*No induction, case analysis, or proof search involved.*

---

### 5. **Imports**
- `Mathlib.Init` — provides foundational definitions (including `TacticM`, basic monad infrastructure).
- `Lean.Elab.Tactic.Basic` — supplies `elab`, `tactic` command elaboration, and core tactic combinators (`guard`, `throwError`, `getGoals`).

*No additional mathlib dependencies — this is a minimal, self-contained tactic utility.*

---

**Use Case**:  
Primarily for *tactic development*, testing, or debugging — e.g., ensuring a tactic script leaves exactly one goal, or that a `try`/`skip` sequence reduces goals as expected.

**Note**: This is a *stub* (as per comment), likely intended for extension or integration into larger tactic pipelines (e.g., in `mathlib` or custom automation).