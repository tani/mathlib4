### Technical Metadata Brief: `NeZero` Typeclass in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `NeZero` | `class NeZero (n : R) [Zero R] : Prop` | Typeclass asserting that an element `n : R` is *not equal to zero* (i.e., `n ≠ 0`). Defined via `neZero_iff : NeZero n ↔ n ≠ 0`. |
| `not_neZero` | `¬NeZero n ↔ n = 0` | Logical equivalence stating that `n` is *not* `NeZero` iff `n = 0`. |
| `eq_zero_or_neZero` | `a = 0 ∨ NeZero a` | Decidability of zero vs nonzero: every element is either zero or nonzero. |
| `zero_ne_one`, `one_ne_zero` | `(0 : α) ≠ 1`, `(1 : α) ≠ 0` | Under `[One α] [NeZero (1 : α)]`, 0 ≠ 1 and 1 ≠ 0. |
| `ne_zero_of_eq_one` | `{a : α} → a = 1 → a ≠ 0` | If `a = 1` and `1 ≠ 0`, then `a ≠ 0`. |
| `two_ne_zero`, `three_ne_zero`, `four_ne_zero` | `(2 : α) ≠ 0`, etc. | Under `[OfNat α n] [NeZero (n : α)]`, natural-number numerals `2,3,4` are nonzero. |
| `zero_ne_one'`, `one_ne_zero'`, etc. | Duplicate lemmas with `'` suffix | Convenience variants for `field_simps`. |
| `NeZero.of_pos` | `0 < x → NeZero x` | If `x` is strictly positive in a preordered zero type, then `x ≠ 0`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `neZero_`: for lemmas directly about `NeZero` (e.g., `neZero_iff` — used internally, not shown but referenced).
  - `zero_ne_`, `one_ne_`, `two_ne_`, etc.: for explicit numeral nonzero proofs.
  - `'` suffix (e.g., `zero_ne_one'`): variant of a lemma, often for symmetry or field-simp convenience.

- **Suffixes**:
  - `'_ne_zero`: emphasizes that the *first* argument is nonzero (e.g., `one_ne_zero` = 1 ≠ 0).
  - `'_ne_zero'`: primed variant (e.g., `two_ne_zero'`).

- **Class name**: `NeZero` — capitalized, noun form, consistent with Mathlib’s typeclass style.

---

#### **3. Tactic Stack**

- **`simp`**: used in `not_neZero` to reduce via `neZero_iff`.
- **`eq_or_ne` + `.imp_right`**: in `eq_zero_or_neZero`, to derive disjunction from decidability of equality.
- **`NeZero.ne` / `NeZero.ne'`**: *constructor lemmas* used implicitly via typeclass inference — not tactics, but core proof tools.
- **`field_simps`**: attribute on `two_ne_zero`, `three_ne_zero`, etc., for automatic simplification in fields.
- **`▸` (congruence/substitution)**: in `ne_zero_of_eq_one`, to rewrite `a = 1` into `1 ≠ 0`.

No heavy automation (e.g., `aesop`, `linarith`) appears — proofs are mostly direct or rely on typeclass inference.

---

#### **4. Proof Logic**

- **Structure**: Short, modular lemmas built from:
  1. **Typeclass assumptions** (`[Zero R]`, `[One α]`, `[NeZero (1 : α)]`, `[OfNat α n]`).
  2. **Equational reasoning** via `simp`, `congr`, or substitution.
  3. **Case analysis** on `eq_or_ne` (for `eq_zero_or_neZero`).
  4. **Order-theoretic reasoning** (e.g., `ne_of_gt` from `0 < x` in `of_pos`).

- **Typical flow**:
  - Assume `NeZero n` (i.e., `n ≠ 0`) → apply `NeZero.ne` to get `n ≠ 0`.
  - For numerals: use `[OfNat α n]` to interpret `n` as `α`, then apply `NeZero.ne`.
  - For order-based proofs: use `ne_of_gt` (from `Preorder`) to convert strict inequality to inequality.

---

#### **5. Imports**

| Module | Role |
|--------|------|
| `Mathlib.Logic.Basic` | Core logic: `eq_or_ne`, `ne_of_gt`, `congr_arg`, etc. |
| `Mathlib.Algebra.Group.ZeroOne` | Defines `Zero`, `One`, and basic lemmas about `0`, `1`, and their inequality (e.g., `neZero_iff`). |
| `Mathlib.Order.Defs.PartialOrder` | Provides `Preorder`, `ne_of_gt`, and order-theoretic tools for `of_pos`. |

> **Scope**: This module formalizes the `NeZero` typeclass — a lightweight, foundational tool for reasoning about nonzero elements in types with `Zero`. It is widely used in algebra (fields, rings), analysis, and combinatorics where nonzero assumptions are frequent.

--- 

Let me know if you'd like a formalized summary in Lean syntax or a dependency graph.