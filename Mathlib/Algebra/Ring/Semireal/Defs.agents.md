### Technical Metadata Brief: `Mathlib.Algebra.Ring.Semireal`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsSemireal` | `class IsSemireal [AddMonoid R] [Mul R] [One R] [Neg R] : Prop` | Predicate asserting that `R` is a non-trivial commutative ring where `-1` is **not** a sum of squares. |
| `IsSemireal.non_trivial` | `0 ≠ (1 : R)` | Ensures the ring is non-trivial (i.e., `0 ≠ 1`). |
| `IsSemireal.not_isSumSq_neg_one` | `¬ IsSumSq (-1 : R)` | States that `-1` cannot be expressed as a sum of squares in `R`. |
| `instance [LinearOrderedRing R] : IsSemireal R` | Proof instance | Shows that any linearly ordered ring is semireal: `-1 < 0`, and sums of squares are ≥ 0, so `-1` cannot be a sum of squares. |

> **Note**: `IsSumSq` is imported from `Mathlib.Algebra.Ring.SumsOfSquares`, representing the predicate “is a sum of squares”.

---

#### **2. Naming Conventions**

- **Class name**: `IsSemireal` — follows Lean/Mathlib convention of `Is<Property>` for predicates.
- **Field names**: `non_trivial`, `not_isSumSq_neg_one` — descriptive, using underscores and logical negation (`not_`) for negative properties.
- **Alias declarations**:
  - `isSemireal` (deprecated) → `IsSemireal`
  - `isSemireal.neg_one_not_SumSq` (deprecated) → `IsSemireal.not_isSumSq_neg_one`
  - Suggests earlier naming used camelCase (`isSemireal`) before switching to PascalCase (`IsSemireal`) per Mathlib style.

---

#### **3. Tactic Stack**

- **Tactics used in proofs** (in the provided snippet):
  - `fun h ↦ …` — lambda abstraction, standard in Lean proofs.
  - `non_trivial := zero_ne_one` — uses existing lemma `zero_ne_one` (from `LinearOrderedRing`).
  - `not_le (α := R).2 neg_one_lt_zero h.nonneg`:
    - `not_le` lemma: `¬ a ≤ b ↔ b < a`
    - `.2` extracts the reverse implication (`b < a → ¬ a ≤ b`)
    - `neg_one_lt_zero` is a lemma in ordered rings: `(-1 : R) < 0`
    - `h.nonneg` uses that sums of squares are non-negative (`IsSumSq.nonneg`)
    - Combines to derive contradiction: `-1 < 0` and `-1` being a sum of squares would imply `0 ≤ -1`, contradicting `-1 < 0`.

> **Dominant tactic pattern**: `contradiction via order-theoretic properties` — leveraging positivity of sums of squares and strict inequality of `-1`.

---

#### **4. Proof Logic**

- **Structure of main instance proof**:
  1. **Goal**: Prove `IsSemireal R` for `R` a `LinearOrderedRing`.
  2. **Step 1**: Show `0 ≠ 1` — immediate from `zero_ne_one` (a property of ordered rings).
  3. **Step 2**: Show `¬ IsSumSq (-1)`:
     - Assume `h : IsSumSq (-1)`.
     - By `IsSumSq.nonneg`, `0 ≤ -1`.
     - But in a linearly ordered ring, `(-1 : R) < 0`, i.e., `0 ≤ -1` is false.
     - Contradiction via `not_le`.2 `neg_one_lt_zero` `h.nonneg`.
  4. Conclude `¬ IsSumSq (-1)`.

- **General proof strategy**: *Reductio ad absurdum* using order-theoretic positivity of sums of squares.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.Ring.SumsOfSquares` | Provides `IsSumSq` and its properties (e.g., `IsSumSq.nonneg`). Core to defining “sum of squares” and reasoning about it. |
| *(Implicit)* `Mathlib.Algebra.Order.LinearOrderedRing` | Provides `zero_ne_one`, `neg_one_lt_zero`, and `IsSumSq.nonneg` (via `LinearOrderedRing`). |

> **Scope**: This module sits at the intersection of **ring theory** and **ordered algebra**, specifically targeting real-algebraic structures where ordering prevents `-1` from being a sum of squares.

---

### Summary

This file formalizes the notion of a **semireal ring**, a foundational concept in real algebra. It emphasizes the interplay between algebraic structure (ring operations) and order-theoretic positivity. The key insight is that in ordered settings, sums of squares are non-negative, so `-1` cannot be among them — a property generalized here via the `IsSemireal` class. The formalization is concise, leveraging existing order-theoretic lemmas and Lean’s typeclass inference.