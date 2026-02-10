### Technical Brief: Multiplicity in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `FiniteMultiplicity a b` | `Prop` | Indicates that the multiplicity of `a` in `b` is finite: `∃ n, ¬a ^ (n + 1) ∣ b`. |
| `emultiplicity a b` | `ℕ∞` | Returns the largest `n ∈ ℕ` such that `a ^ n ∣ b`, or `⊤` if `a ^ n ∣ b` for all `n`. |
| `multiplicity a b` | `ℕ` | `ℕ`-valued version of `emultiplicity`, defaulting to `1` when `emultiplicity = ⊤`. |
| `emultiplicity_eq_coe` | `emultiplicity a b = n ↔ a ^ n ∣ b ∧ ¬a ^ (n + 1) ∣ b` | Characterizes when `emultiplicity` is a natural number. |
| `pow_dvd_iff_le_emultiplicity` | `a ^ k ∣ b ↔ k ≤ emultiplicity a b` | Connects divisibility by powers to ordering with `emultiplicity`. |
| `emultiplicity_eq_emultiplicity_iff` | `emultiplicity a b = emultiplicity c d ↔ ∀ n, a ^ n ∣ b ↔ c ^ n ∣ d` | Equality of `emultiplicity` values corresponds to identical divisibility behavior by all powers. |
| `emultiplicity_add_of_gt` | `emultiplicity p b < emultiplicity p a → emultiplicity p (a + b) = emultiplicity p b` | When one term dominates in multiplicity, the sum inherits its multiplicity. |
| `emultiplicity_add_eq_min` | `emultiplicity p a ≠ emultiplicity p b → emultiplicity p (a + b) = min (...)` | Generalization of above: sum’s multiplicity is the minimum when they differ. |
| `FiniteMultiplicity.not_unit` | `FiniteMultiplicity a b → ¬IsUnit a` | If multiplicity is finite, the base cannot be a unit. |
| `Nat.finiteMultiplicity_iff` | `FiniteMultiplicity a b ↔ a ≠ 1 ∧ 0 < b` | For natural numbers, finite multiplicity iff base ≠ 1 and target > 0. |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `emultiplicity_...`: Extended (possibly infinite) multiplicity (`ℕ∞`-valued).
  - `multiplicity_...`: Natural-number-valued version.
  - `finite...` / `FiniteMultiplicity`: Predicate for finiteness of multiplicity.
- **Suffixes:**
  - `_eq_iff_...`: Equivalence characterizations (↔).
  - `_of_...`: Implications from assumptions (e.g., `of_dvd`, `of_gt`).
  - `_iff_...`: Biconditional theorems.
  - `_left` / `_right`: Behavior under left/right multiplication or arguments.
- **Special:**
  - `not_...`: Negative results (e.g., `not_dvd`, `not_unit`).
  - `map`, `mul`, `pow`, `add`, `sub`, `neg`: Operations on arguments.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only`: Simplification with lemmas, especially for `emultiplicity`, `multiplicity`, divisibility.
- `rw`: Rewriting using equivalences like `emultiplicity_eq_coe`, `pow_dvd_iff_le_emultiplicity`.
- `cases`: Case analysis on `emultiplicity`, `Nat`, or `FiniteMultiplicity`.
- `exact`, `assumption`, `assumption_mod_cast`: For straightforward subgoals.
- `by_contra!`, `contradiction`: For negation-based arguments.
- `norm_cast`: For lifting results from `ℕ` to `ℤ`.
- `aesop?` (commented): Suggests automation potential.
- `ring`, `omega`: For arithmetic reasoning (e.g., in `Nat.finiteMultiplicity_iff`).
- `conv_rhs`: For rewriting in specific positions.

---

#### **4. Proof Logic**

- **Induction & Cases**: Often on `n : ℕ` or `emultiplicity` values (e.g., `cases k`, `cases hm : emultiplicity a b`).
- **Equivalence-based reasoning**: Many proofs rely on `↔`-characterizations (e.g., `emultiplicity_eq_coe`, `pow_dvd_iff_le_emultiplicity`) to reduce to divisibility or inequality goals.
- **Contrapositive & contradiction**: Used heavily for finiteness and non-divisibility (e.g., `not_pow_dvd_of_emultiplicity_lt`).
- **Monotonicity & antisymmetry**: For proving equality of `emultiplicity`, often via `le_antisymm` using `emultiplicity_le_emultiplicity_iff`.
- **Mapping & equivalence**: For ring/monoid homomorphisms, use `map_pow`, `map_dvd`, and `EquivLike`/`MulEquivClass` instances.
- **Trichotomy**: In additive lemmas (`emultiplicity_add_eq_min`), use `lt_trichotomy` to split into cases.

---

#### **5. Imports & Scope**

**Primary Dependencies:**
- `Mathlib.Algebra.Associated.Basic`: For `Associated` relation.
- `Mathlib.Algebra.BigOperators.Group.Finset`: For summation over finite sets (used in additive lemmas).
- `Mathlib.Algebra.Ring.Divisibility.Basic`: Core divisibility theory.
- `Mathlib.Algebra.Ring.Int.Defs`: For `ℤ`, `natAbs`, etc.
- `Mathlib.Data.ENat.Basic`: For `ℕ∞` (extended naturals), used in `emultiplicity`.

**Scope & Context:**
- Works in general `Monoid`, `CommMonoid`, `MonoidWithZero`, `Semiring`, and `Ring` contexts.
- Uses `Classical` for noncomputable definitions (`emultiplicity`, `multiplicity`).
- `WithTop` and `ENat` infrastructure heavily used for handling `⊤`.

---

This module formalizes a foundational theory of multiplicity in abstract algebraic structures, with rich connections to divisibility, valuation theory, and arithmetic in rings. It is designed for reuse across number theory and algebraic applications (e.g., `padic_val`, factorization).