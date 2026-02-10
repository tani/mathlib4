### Technical Metadata Brief: Prime Powers in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsPrimePow` | `R → Prop` | Defines when an element `n : R` is a *prime power*: ∃ prime `p`, ∃ `k > 0`, `p^k = n`. |
| `isPrimePow_def` | `IsPrimePow n ↔ ∃ p k, Prime p ∧ 0 < k ∧ p ^ k = n` | Equivalence defining `IsPrimePow` via existential quantification. |
| `isPrimePow_iff_pow_succ` | `IsPrimePow n ↔ ∃ p k, Prime p ∧ p ^ (k + 1) = n` | Alternate characterization using `k+1` instead of `k > 0`. |
| `not_isPrimePow_zero` | `[NoZeroDivisors R] ⇒ ¬IsPrimePow 0` | Zero is never a prime power in a domain. |
| `IsPrimePow.not_unit` | `IsPrimePow n ⇒ ¬IsUnit n` | Prime powers are never units (except possibly in degenerate cases, excluded by assumptions). |
| `IsUnit.not_isPrimePow` | `IsUnit n ⇒ ¬IsPrimePow n` | Units cannot be prime powers. |
| `not_isPrimePow_one` | `¬IsPrimePow (1 : R)` | 1 is not a prime power (since it's a unit). |
| `Prime.isPrimePow` | `Prime p ⇒ IsPrimePow p` | Every prime is trivially a prime power (`p = p^1`). |
| `IsPrimePow.pow` | `IsPrimePow n ⇒ k ≠ 0 ⇒ IsPrimePow (n^k)` | Powers of prime powers (by nonzero exponent) remain prime powers. |
| `IsPrimePow.ne_zero`, `IsPrimePow.ne_one` | `IsPrimePow n ⇒ n ≠ 0`, `n ≠ 1` | Immediate corollaries of previous results. |
| `isPrimePow_nat_iff` | `IsPrimePow (n : ℕ) ↔ ∃ p k, Nat.Prime p ∧ 0 < k ∧ p ^ k = n` | Specialization to naturals using `Nat.prime_iff`. |
| `Nat.Prime.isPrimePow` | `p.Prime ⇒ IsPrimePow p` | Natural primes are prime powers. |
| `isPrimePow_nat_iff_bounded` | `IsPrimePow n ↔ ∃ p ≤ n, ∃ k ≤ n, p.Prime ∧ 0 < k ∧ p^k = n` | Bounded existential form enabling decidability. |
| `instance Decidable (IsPrimePow n)` | `Decidable (IsPrimePow n)` | Decidability for naturals via bounded search. |
| `IsPrimePow.dvd` | `IsPrimePow n ⇒ m ∣ n ⇒ m ≠ 1 ⇒ IsPrimePow m` | Divisors of prime powers (≠1) are themselves prime powers. |
| `Nat.disjoint_divisors_filter_isPrimePow` | `a.Coprime b ⇒ Disjoint (a.divisors ∩ primePowers) (b.divisors ∩ primePowers)` | Coprime numbers share no prime-power divisors. |
| `IsPrimePow.two_le`, `IsPrimePow.pos`, `IsPrimePow.one_lt` | `IsPrimePow n ⇒ 2 ≤ n`, `0 < n`, `1 < n` | Positivity and lower bounds for natural prime powers. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isPrimePow_`: for lemmas directly about `IsPrimePow`.
  - `not_isPrimePow_`: for negative results (non-existence).
  - `IsPrimePow.`: for properties of a *given* prime power (e.g., `IsPrimePow.dvd`, `IsPrimePow.pow`).
- **Suffixes**:
  - `_def`: definition equivalence (`isPrimePow_def`).
  - `_iff`: iff-characterizations (`isPrimePow_iff_pow_succ`, `isPrimePow_nat_iff`).
  - `_nat`: naturals-specific versions (`isPrimePow_nat_iff`, `isPrimePow_nat_iff_bounded`).
  - `_bounded`: bounded quantifier forms for decidability (`isPrimePow_nat_iff_bounded`).
- **General pattern**: `IsPrimePow.[property]` for properties of a *witness* (e.g., `IsPrimePow.dvd`, `IsPrimePow.pow`).

---

#### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Usage |
|--------|-------|
| `simp only [...]` | Simplify using definitional equivalences and lemmas (e.g., `isPrimePow_def`, `Nat.prime_iff`). |
| `rw [...]` | Rewrite using equalities (e.g., `hn`, `pow_mul'`). |
| `rwa [...]` | Rewrite + assumption (e.g., `rwa [Nat.sub_add_cancel hk]`). |
| `intro` / `rintro` | Introduce existential or implication hypotheses. |
| `rcases` / `obtain` | Destruct existential or conjunction hypotheses. |
| `conv` | Equational reasoning (e.g., `conv => { lhs; rw [...] }`). |
| `apply` / `exact` | Apply lemmas or assumptions directly. |
| `by rintro rfl` | Case analysis on equality (e.g., to derive contradiction). |
| `decidable_of_iff'` | Transfer decidability via equivalence. |
| `simp` / `aesop` (implied) | Used implicitly in short proofs (e.g., `simp` in `not_isPrimePow_one`). |

No heavy automation like `linarith` or `ring` appears—proofs are mostly structural and case-based.

---

#### **4. Proof Logic**

- **Structure**: Proofs follow a *constructive-deconstructive* pattern:
  1. **Existential introduction**: Build witnesses (e.g., `⟨p, k * k', ...⟩`).
  2. **Existential elimination**: Unpack `IsPrimePow n` as `⟨p, k, hp, hk, hn⟩`.
  3. **Case analysis**: On `n = 0`, `n = 1`, or `n ≥ 2` (e.g., `two_le`).
  4. **Contrapositive reasoning**: Prove `¬P` by assuming `P` and deriving contradiction (e.g., `not_isPrimePow_zero`).
  5. **Divisibility arguments**: Use known lemmas like `Nat.dvd_prime_pow` to analyze divisors.
  6. **Bounded search**: For decidability, reduce to bounded quantifiers over `n`.

- **Induction**: Not used explicitly here—proofs rely on algebraic properties and case splits.

---

#### **5. Imports**

| Module | Role |
|--------|------|
| `Mathlib.Algebra.Associated.Basic` | Provides `Prime`, `IsUnit`, `CommMonoidWithZero`, and foundational algebraic notions. |
| `Mathlib.NumberTheory.Divisors` | Supplies `divisors`, `Coprime`, and related finite set operations (used in `disjoint_divisors_filter_isPrimePow`). |

> **Scope**: This module formalizes *abstract* prime powers in a `CommMonoidWithZero` (e.g., `ℕ`, `ℤ`, polynomial rings), then specializes to `ℕ` with decidability and divisor properties.

--- 

Let me know if you'd like a visualization of the dependency graph or a summary of how this fits into the broader `Mathlib` number theory hierarchy.