### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `discrim` | `def discrim [Ring R] (a b c : R) : R := b ^ 2 - 4 * a * c` | Defines the discriminant of a quadratic expression `a * x² + b * x + c`. |
| `discrim_neg` | `lemma discrim_neg [Ring R] (a b c : R) : discrim (-a) (-b) (-c) = discrim a b c` | Shows discriminant is invariant under sign flip of all coefficients. |
| `discrim_eq_sq_of_quadratic_eq_zero` | `lemma` | If `x` is a root, then discriminant equals `(2*a*x + b)²`. |
| `quadratic_eq_zero_iff_discrim_eq_sq` | `theorem` | Equivalence: `x` is a root ⇔ discriminant is a square `(2*a*x + b)²`, under `[NeZero 2]` and `[NoZeroDivisors]`. |
| `quadratic_ne_zero_of_discrim_ne_sq` | `theorem` | If discriminant is *not* a square, then no root exists. |
| `quadratic_eq_zero_iff` | `theorem` (Field case) | Explicit root characterization: roots are `(-b ± s)/(2*a)` where `s² = discriminant`. |
| `exists_quadratic_eq_zero` | `theorem` | If discriminant has a square root, then quadratic has a root. |
| `quadratic_eq_zero_iff_of_discrim_eq_zero` | `theorem` | Special case when discriminant = 0: unique root `x = -b/(2*a)`. |
| `discrim_le_zero` | `theorem` | If quadratic is globally nonnegative, then discriminant ≤ 0. |
| `discrim_le_zero_of_nonpos` | `lemma` | If quadratic is globally nonpositive, then discriminant ≤ 0. |
| `discrim_lt_zero` | `theorem` | If quadratic is globally positive and `a ≠ 0`, then discriminant < 0. |
| `discrim_lt_zero_of_neg` | `lemma` | If quadratic is globally negative and `a ≠ 0`, then discriminant < 0. |

---

#### 2. **Naming Conventions**

- **Prefixes:**
  - `discrim_`: all lemmas/theorems about discriminant properties.
  - `quadratic_`: all about roots/solvability of quadratics.
  - `exists_`: existence of roots given discriminant condition.
- **Suffixes:**
  - `_eq_zero`: when discriminant is zero or quadratic evaluates to zero.
  - `_eq_sq`: when discriminant equals a square.
  - `_ne_sq`: when discriminant is not a square.
  - `_le_zero`, `_lt_zero`: inequality-based discriminant bounds.
  - `_of_...`: specialized versions (e.g., `of_discrim_eq_zero`, `of_nonpos`, `of_neg`).
- **Structure:**
  - `quadratic_eq_zero_iff` uses `iff` for biconditional root-characterization.
  - `discrim_*` often mirrors `quadratic_*` in logic, but focuses on discriminant behavior.

---

#### 3. **Tactic Stack**

Frequently used tactics:
- `simp` / `simp_rw`: simplification, especially with `discrim`, `sq`, `mul_zero`, `add_zero`.
- `field_simp`: simplifying field expressions (division, nonzero assumptions).
- `linear_combination`: algebraic manipulation of equations/inequalities (core for discriminant derivations).
- `rw`: rewriting using hypotheses and lemmas.
- `apply mul_left_cancel₀`: cancellation in domains with no zero divisors.
- `rcases / obtain`: case analysis on trichotomy (`lt_trichotomy`), disjunctions, existential quantifiers.
- `convert ... using 1`: flexible equality chaining (used in `discrim_le_zero` for `a > 0` case).
- `or_congr`: to prove equivalence of disjunctions.
- `linarith`: solving linear inequalities (especially after substitution).
- `ring`: simplifying polynomial expressions (used in `discrim_le_zero` for `a > 0` case).

---

#### 4. **Proof Logic**

- **General pattern:**
  - **Forward direction**: assume a root exists → derive discriminant is a square (via algebraic manipulation, often `linear_combination`).
  - **Backward direction**: assume discriminant = `s²` → solve quadratic explicitly (via `field_simp`, `linear_combination`, or `mul_left_cancel₀`).
- **Order-theoretic results (`discrim_le_zero`, `discrim_lt_zero`, etc.):**
  - Use case analysis on sign of leading coefficient `a` (`lt_trichotomy`).
  - For `a < 0`: show polynomial tends to `-∞`, contradicting nonnegativity.
  - For `a = 0`: reduce to linear case; handle via direct evaluation.
  - For `a > 0`: evaluate at vertex `x = -b/(2*a)` to bound discriminant.
- **Symmetry via `discrim_neg`**: many lemmas for nonpositive/negative quadratics are derived by applying `discrim_neg` to the nonnegative/positive case.

---

#### 5. **Imports**

- `Mathlib.Order.Filter.AtTopBot.Field`: for asymptotic behavior (e.g., `tendsto_atBot`, `atTop`), used in `discrim_le_zero` for `a < 0`.
- `Mathlib.Tactic.FieldSimp`: simplification in fields (division, nonzero denominators).
- `Mathlib.Tactic.LinearCombination`: algebraic manipulation of linear combinations of equations.
- `Mathlib.Tactic.Linarith.Frontend`: linear arithmetic solver for ordered rings/fields.

> **Scope**: This module formalizes elementary algebraic and order-theoretic properties of quadratic expressions over rings, fields, and linearly ordered fields — with emphasis on discriminant-root relationships and positivity/negativity implications.

--- 

Let me know if you'd like a dependency graph or a summary of proof automation patterns.