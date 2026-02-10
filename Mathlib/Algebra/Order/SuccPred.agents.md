Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Interaction between Successors and Arithmetic in Lean 4**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `SuccAddOrder` | `class SuccAddOrder (α : Type*) [Preorder α] [Add α] [One α] extends SuccOrder α` | Introduces a typeclass for preorders where `succ x = x + 1`. |
| `PredSubOrder` | `class PredSubOrder (α : Type*) [Preorder α] [Sub α] [One α] extends PredOrder α` | Introduces a typeclass for preorders where `pred x = x - 1`. |
| `succ_eq_add_one` | `succ x = x + 1` | Core equivalence for `SuccAddOrder`. |
| `pred_eq_sub_one` | `pred x = x - 1` | Core equivalence for `PredSubOrder`. |
| `add_one_le_of_lt` | `x < y → x + 1 ≤ y` | Relates strict inequality to non-strict with `+1`. |
| `add_one_le_iff_of_not_isMax` | `¬ IsMax x → (x + 1 ≤ y ↔ x < y)` | Characterizes `x + 1 ≤ y` in terms of strict order when `x` is not maximal. |
| `wcovBy_add_one`, `covBy_add_one` | `x ⩿ x + 1`, `x ⋖ x + 1` | Covering relations with `+1`. |
| `sub_one_wcovBy`, `sub_one_covBy` | `x - 1 ⩿ x`, `x - 1 ⋖ x` | Covering relations with `-1`. |
| `succ_iterate` | `succ^[n] x = x + n` | Iterated successor equals addition of natural number. |
| `pred_iterate` | `pred^[n] x = x - n` | Iterated predecessor equals subtraction of natural number. |
| `covBy_iff_add_one_eq` | `x ⋖ y ↔ x + 1 = y` | Characterizes covering relation via `+1`. |
| `covBy_iff_sub_one_eq` | `x ⋖ y ↔ y - 1 = x` | Characterizes covering relation via `-1`. |
| `IsSuccPrelimit.add_one_lt`, `IsPredPrelimit.lt_sub_one` | `y < x → y + 1 < x`, `x < y → x < y - 1` | Behavior of limits/prelimits under `+1`/`-1`. |
| `lt_one_iff_nonpos` | `x < 1 ↔ x ≤ 0` | Characterizes elements less than 1 in ordered structures with `0 ≤ 1`. |
| Monotonicity lemmas (e.g., `monotoneOn_of_le_add_one`) | `(∀ a, … → f a ≤ f (a + 1)) → MonotoneOn f s` | Transfer monotonicity criteria from `+1`/`-1` to general monotonicity. |

#### **2. Naming Conventions**

- **Prefixes**:
  - `succ_`, `pred_`: For operations tied to `succ`/`pred`.
  - `add_`, `sub_`: For arithmetic operations.
  - `covBy_`, `wcovBy_`: For covering relations.
  - `isSucc_`, `isPred_`: For limit/prelimit properties.
- **Suffixes**:
  - `_le`, `_lt`, `_ge`, `_gt`: For direction of inequality.
  - `_iff`, `_of_not_isMax`, `_of_not_isMin`: For equivalence or conditional versions.
  - `_iterate`: For iteration over naturals.
  - `_mono`, `_anti`, `_strictMono`, `_strictAnti`: For monotonicity variants.

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw`: Rewriting using definitions and lemmas (especially `succ_eq_add_one`, `pred_eq_sub_one`).
- `induction`: For natural number induction (e.g., `succ_iterate`, `pred_iterate`).
- `simp` / `simpa`: Simplification and simplification with target.
- `exact`: Direct proof application.
- `apply`, `intro`, `cases`: Basic proof structure.
- `linarith` / `order`: Implicitly used via `zero_le_one`, `one_pos`, etc.
- `aesop`: Not explicitly used here, but likely applicable in future simplifications.

#### **4. Proof Logic**

- **Inductive structure**: Many proofs (e.g., `succ_iterate`, `pred_iterate`) use induction on `n : ℕ`.
- **Rewriting strategy**: Replace `succ`/`pred` with `+1`/`-1` using class assumptions, then apply known order-theoretic lemmas.
- **Case analysis**: On `IsMax`, `IsMin`, or `NoMaxOrder`/`NoMinOrder` assumptions to handle edge cases.
- **Equivalence chaining**: Many theorems prove `↔` by rewriting both directions using `←` and `→` of key equalities.
- **Leveraging existing order theory**: Uses `SuccOrder`, `PredOrder`, `covBy`, `wcovBy`, `IsSuccPrelimit`, etc., from Mathlib.

#### **5. Imports**

- `Mathlib.Algebra.Group.Basic`: Basic group theory (used for additive structures).
- `Mathlib.Algebra.Order.ZeroLEOne`: `0 ≤ 1` class and consequences.
- `Mathlib.Data.Int.Cast.Defs`: Integer casting (used for `Int.cast`, though not directly here).
- `Mathlib.Order.SuccPred.Limit`: Definitions of `succ`, `pred`, limits, prelimits, covering relations.

---

This file formalizes a bridge between order-theoretic successor/predecessor operations and arithmetic `+1`/`-1`, enabling uniform reasoning across structures like `ℕ`, `ℤ`, ordinals (once refactored), and more. It sets the stage for future `simp`-normalization of `succ`/`pred` to `+1`/`-1`.