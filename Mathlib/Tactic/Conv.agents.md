### Technical Metadata Brief: `Mathlib.Tactic.Conv` Module

---

#### **1. Key Definitions & Theorems**

| Name / Syntax | Type / Purpose |
|---------------|----------------|
| `convLHS` (`conv_lhs`) | Syntax macro: runs a `conv` sequence on the **left-hand side** of an equality in the goal. Expands to `conv => lhs; seq`. |
| `convRHS` (`conv_rhs`) | Syntax macro: runs a `conv` sequence on the **right-hand side** of an equality. Expands to `conv => rhs; seq`. |
| `dischargeConv` (`discharge`) | Conv tactic: rewrites the current goal `p` to `True` if a given tactic proves `p`; otherwise returns `p` as a new subgoal. |
| `elabDischargeConv` | Elaborator for `discharge`: handles metavariable assignment and goal manipulation in `conv` mode. |
| `refine` (in `conv`) | Macro: lifts `refine` into `conv` mode via `tactic => refine e`. |
| `conv in pat => cs` | Macro: runs `conv` tactics on the first subexpression matching `pat`, using `pattern` internally. Supports `occs` clause. |
| `#conv`, `#whnf`, `#whnfR`, `#simp`, `#norm_num`, `#push_neg` | Command macros: evaluate conv tactics on a term and display the result (no proof). |
| `withReducible` (`with_reducible`) | Macro: wraps a `conv` sequence with reducible transparency enabled. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `conv_`: for conv-specific syntax/tactics (`conv_lhs`, `conv_rhs`, `conv` macro).
  - `discharge`: for goal discharge behavior.
  - `#`: for top-level command macros (`#conv`, `#whnf`, etc.).
  - `run_`: e.g., `run_conv` — executes conv logic in tactic mode.

- **Suffixes**:
  - `_Conv`: for conv-specific elaborators (`elabDischargeConv`).
  - `_Conv`: also used in syntax names (`dischargeConv`).
  - `R`: for variants with extended behavior (e.g., `#whnfR` → WHNF with reducible transparency).

- **Structure**:
  - `tactic => ...` used to embed tactic-mode actions inside `conv`.
  - `conv' => ...` used for nested conv contexts (e.g., `with_reducible` macro).

---

#### **3. Tactic Stack (Frequently Used Tactics)**

| Tactic | Usage Context |
|--------|---------------|
| `tactic'` | Embedding tactic sequences inside `conv` (e.g., `with_reducible`, `run_conv`). |
| `tactic => ...` | Embedding tactic actions in `conv` mode (e.g., `refine`, `discharge`). |
| `pattern` | Core internal tactic used by `conv in ... => ...`. |
| `lhs`, `rhs` | Built-in `conv` tactics to focus on LHS/RHS of equality. |
| `run_tac` | Used in `run_conv` to execute tactic sequences in `conv` mode. |
| `evalTactic`, `setGoals`, `assign`, `mkEqTrue`, `mkFreshExprMVar` | Low-level metavariable/meta-programming operations in `elabDischargeConv`. |
| `whnf`, `simp`, `norm_num`, `push_neg` | High-level conv tactics used via `#conv` commands. |

---

#### **4. Proof Logic / Elaboration Flow**

- **Macro Expansion**:
  - `conv_lhs`, `conv_rhs`, `conv in ...`, `#conv`, `#whnf`, etc., expand to lower-level `conv` tactics using `pattern`, `lhs`, `rhs`, and tactic embedding.

- **`discharge` Logic**:
  1. Extracts LHS/RHS of current goal via `Conv.getLhsRhsCore`.
  2. Verifies LHS is a proposition (`isProp`).
  3. Assigns `True` to RHS metavariable.
  4. Creates fresh metavariable for LHS and constructs `eq_true` goal.
  5. If a tactic is given, attempts to solve the new goal; otherwise leaves it unsolved.

- **`#conv` Command Flow**:
  1. Elaborates term `e` and synthesizes type.
  2. Constructs a `conv` goal via `Conv.mkConvGoalFor`.
  3. Runs `conv` tactic on the metavariable goal.
  4. Solves remaining goals (refl/inferInstance).
  5. Instantiates metavariables and logs the resulting term.

- **`with_reducible`**:
  - Wraps a `conv` sequence in `with_reducible%tk conv' => $s`, enabling reducible transparency for unfolding.

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Init` | Core Lean + Mathlib initialization. |
| `Lean.Elab.Tactic.Conv.Basic` | Provides basic `conv` infrastructure: `pattern`, `lhs`, `rhs`, `whnf`, `mkConvGoalFor`, etc. |
| `Lean.Elab.Command` | Enables command elaboration (e.g., `#conv`, `#whnf`). |

---

### Summary

This module extends Lean’s `conv` mode with convenient syntax for:
- Focusing on LHS/RHS (`conv_lhs`, `conv_rhs`),
- Discharging goals (`discharge`),
- Embedding tactic actions (`refine`, `run_conv`),
- Running conv on terms in command mode (`#conv`, `#whnf`, etc.),
- Controlling transparency (`with_reducible`).

It leverages existing `conv` infrastructure (`Lean.Elab.Tactic.Conv.Basic`) and adds syntactic sugar and command-level utilities for interactive and automated rewriting.