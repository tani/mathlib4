### Technical Metadata Brief: Cardinality of Algebraic Numbers in `Algebraic.lean`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `infinite_of_charZero` | `{ x : A | IsAlgebraic R x }.Infinite` | Shows the set of algebraic elements over `R` in an `R`-algebra `A` of characteristic zero is infinite. |
| `aleph0_le_cardinalMk_of_charZero` | `ℵ₀ ≤ #{ x : A // IsAlgebraic R x }` | Under char. zero, the cardinality of algebraic elements is at least countably infinite. |
| `cardinalMk_lift_le_mul` | `lift.{u} #{ x : A // IsAlgebraic R x } ≤ lift.{v} #R[X] * ℵ₀` | Bounds the lifted cardinality of algebraic elements by `#R[X] * ℵ₀`. Core technical lemma. |
| `cardinalMk_lift_le_max` | `lift.{u} #{ x : A // IsAlgebraic R x } ≤ max (lift.{v} #R) ℵ₀` | Simplified bound using `max(#R, ℵ₀)`. |
| `cardinalMk_lift_of_infinite` | `lift.{u} #{ x : A // IsAlgebraic R x } = lift.{v} #R` (if `R` infinite) | Equality when base ring `R` is infinite (uses `NoZeroSMulDivisors`). |
| `Algebraic.countable` | `Set.Countable { x : A | IsAlgebraic R x }` (if `R` countable) | Algebraic elements form a countable set when `R` is countable. |
| `cardinalMk_of_countable_of_charZero` | `#{ x : A // IsAlgebraic R x } = ℵ₀` (if `R` countable & `A` char. zero) | Exact cardinality `ℵ₀` in this case. |
| `cardinalMk_le_mul`, `cardinalMk_le_max`, `cardinalMk_of_infinite` | Non-lifted versions of above theorems | Direct cardinal bounds without universe lifting. |

> **Note**: All theorems are about the *cardinality* of the subtype `{ x : A // IsAlgebraic R x }`, i.e., elements of `A` algebraic over `R`.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `cardinalMk_`: Cardinality-related theorems (`cardinalMk_lift_le_mul`, `cardinalMk_of_infinite`, etc.).
  - `aleph0_le_`: Lower bounds involving `ℵ₀`.
  - `infinite_of_`: Proofs of infiniteness (e.g., `infinite_of_charZero`).
- **Suffixes**:
  - `_of_charZero`: Assumes `CharZero A`.
  - `_of_infinite`: Assumes `Infinite R`.
  - `_of_countable`: Assumes `Countable R`.
- **Aliases**:
  - Deprecated aliases use `alias cardinal_mk_* := cardinalMk_*` (e.g., `cardinal_mk_le_mul`), indicating a naming shift from `cardinal_mk` → `cardinalMk`.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `rw`: Rewriting with definitions and lemmas (e.g., `← mk_uLift`, `lift_id`, `lift_le_aleph0`).
- `exact`, `refine`: Building proofs via known lemmas.
- `choose`: From `choose g hg₁ hg₂ using ...`, used to extract a function from a dependent choice principle.
- `simp` / `simp_rw`: Simplification with `lift_id`, `lift_le`, `max_eq_left`, etc.
- `apply`, `intro`, `rintro`: Intro-style reasoning.
- `antisymm`: For proving equality of cardinals via mutual ≤.
- `countable_of_injOn`, `injOn`, `Subtype.coe_injective`: Cardinality arguments via injective maps and countability.

---

#### **4. Proof Logic**

- **General Strategy**:
  1. **Reduction via lifting**: Use `lift_mk_le_lift_mk_mul_of_lift_mk_preimage_le` to reduce to bounding preimages.
  2. **Root set finiteness**: Use `f.rootSet_finite A` (finite roots per nonzero polynomial) and injectivity of `g` to deduce countability of preimages.
  3. **Cardinal arithmetic**: Apply lemmas like `mul_le_mul_right'`, `lift_le`, `max_eq_left`, `aleph0_le_mk`.
  4. **Equality via antisymmetry**: For exact cardinalities (e.g., `ℵ₀`), combine upper bound (`countable`) and lower bound (`aleph0_le_`).

- **Inductive/Case-based reasoning** is minimal; most proofs are *cardinal arithmetic* + *set-theoretic* (injectivity, countability, finiteness).

---

#### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.Algebra.Polynomial.Cardinal`: Cardinality of polynomial rings (e.g., `#R[X] = max(#R, ℵ₀)`).
  - `Mathlib.RingTheory.Algebraic.Basic`: Definitions of `IsAlgebraic`, algebraic elements, root sets, etc.

- **Domain scope**:
  - Commutative rings `R`, `A`, with `A` a domain and `R → A` an algebra map.
  - `NoZeroSMulDivisors R A`: Ensures scalar multiplication behaves nicely (e.g., `algebraMap` injective).
  - Characteristic zero assumptions (`CharZero A`) for lower bounds.
  - Universe polymorphism (`u v`) for lifting arguments.

- **Goal**: General cardinal bounds on algebraic elements over arbitrary rings, with corollaries for `ℝ`, `ℂ`, etc.

--- 

Let me know if you'd like a diagram of dependencies or a proof sketch for a specific theorem.