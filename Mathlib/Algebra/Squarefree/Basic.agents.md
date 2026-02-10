### Technical Metadata Brief: Squarefree Elements in Monoids (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Squarefree` | `def Squarefree [Monoid R] (r : R) : Prop` | Defines an element `r` as squarefree: any `x` with `x * x ∣ r` must be a unit. |
| `squarefree_iff_emultiplicity_le_one` | `∀ r, Squarefree r ↔ ∀ x, emultiplicity x r ≤ 1 ∨ IsUnit x` | Characterizes squarefreeness via extended multiplicity: no prime factor appears with multiplicity > 1 unless it's a unit. |
| `UniqueFactorizationMonoid.squarefree_iff_nodup_factors` | `∀ x ≠ 0, Squarefree x ↔ Multiset.Nodup (normalizedFactors x)` | In a UFM, squarefreeness ⇔ no repeated irreducible factors in the factorization multiset. |
| `Squarefree.isRadical` | `Squarefree x → IsRadical x` | Every squarefree element is radical (i.e., `x ∣ yⁿ ⇒ x ∣ y` for `n ≥ 1`). |
| `Squarefree.dvd_pow_iff_dvd` | `Squarefree x ∧ n ≠ 0 ⇒ (x ∣ yⁿ ↔ x ∣ y)` | Radical property specialized: divisibility into a power reduces to divisibility into base. |
| `squarefree_mul_iff` | `Squarefree (x * y) ↔ IsRelPrime x y ∧ Squarefree x ∧ Squarefree y` | Product is squarefree iff factors are pairwise coprime and each is squarefree. |
| `IsRelPrime.of_squarefree_mul` | `Squarefree (m * n) ⇒ IsRelPrime m n` | Immediate corollary: if product is squarefree, its factors are relatively prime. |
| `squarefree_iff_irreducible_sq_not_dvd_of_ne_zero` | `r ≠ 0 ⇒ Squarefree r ↔ ∀ p, Irreducible p → ¬ p * p ∣ r` | Alternative characterization using only irreducibles (no need for units or zero). |

> **Note**: The deprecated alias `multiplicity.squarefree_iff_emultiplicity_le_one` points to `squarefree_iff_emultiplicity_le_one`.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `squarefree_`: for properties and equivalences involving squarefreeness (`squarefree_one`, `squarefree_mul_iff`, etc.)
  - `isUnit_`: for unit-related lemmas (`isUnit_one`, `isUnit_of_mul_isUnit_left`)
  - `of_`: for elimination rules (`of_mul_left`, `of_mul_right`, `of_dvd`)
  - `eq_zero_or_`: for dichotomy lemmas (`eq_zero_or_one_of_pow_of_not_isUnit`)
  - `dvd_`: for divisibility lemmas (`dvd_pow_iff_dvd`, `dvd_of_squarefree_of_mul_dvd_mul_right`)
  - `pow_`: for power-related lemmas (`pow_dvd_of_pow_dvd`, `pow_dvd_of_squarefree_of_pow_succ_dvd_mul_right`)

- **Suffixes**:
  - `_left` / `_right`: indicate which factor in a product is preserved or analyzed.
  - `_iff_`: denote biconditional theorems.
  - `_or_`: denote disjunctive conclusions (e.g., `eq_zero_or_one`).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rw` / `erw` | Rewriting definitions (e.g., `sq`, `pow_succ'`, `mul_assoc`) |
| `simp` / `simp_rw` | Simplifying goals using lemmas like `one_mul`, `mul_comm`, `isUnit_iff_dvd_one`, `natAbs_dvd_natAbs` |
| `rcases` / `obtain` | Case analysis on existential or conjunction hypotheses |
| `contrapose!` | Turning negated implications into positive ones |
| `omega` | Solving arithmetic goals (e.g., `2 ≤ n`) |
| `norm_cast` | Handling type coercions (e.g., `ℕ → R`) |
| `infer_instance` | Inferring class instances (e.g., `Nontrivial R`) |
| `by_cases` | Splitting on decidables like `p ∣ x` or `IsUnit x` |
| `assumption_mod_cast` | Matching up to type coercion |
| `exact` / `assumption` | Finishing goals directly from hypotheses |

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - **Biconditionals (`↔`)**: Proven via `refine ⟨fun h ↦ ?, fun h ↦ ?⟩` or `rw [← sq, ...]` + `or_iff_not_imp_left`.
  - **Induction**: Used in `exists_squarefree_dvd_pow_of_ne_zero`, leveraging `WfDvdMonoid.induction_on_irreducible`.
  - **Case splits**: On `r = 0`, `IsUnit x`, `p ∣ x`, or `n = 0`/`n > 0`.
  - **Reduction to irreducibles**: Via `WfDvdMonoid.exists_irreducible_factor`.
  - **Multiplicativity & coprimality**: Central theme — squarefreeness of products decomposes into relative primality + individual squarefreeness.

- **Common proof patterns**:
  - To show `Squarefree x`, assume `x * x ∣ r` and deduce `IsUnit x`.
  - To show `¬Squarefree 0`, construct a counterexample (e.g., `⟨0, rfl⟩`).
  - To lift divisibility through powers: use `pow_dvd_iff_le_emultiplicity` or `emultiplicity_eq_count_normalizedFactors`.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.RingTheory.Nilpotent.Basic`: For nilpotent-related lemmas (e.g., `isUnit_of_mul_isUnit_left`).
- `Mathlib.RingTheory.UniqueFactorizationDomain.GCDMonoid`: Provides GCD monoid structure and normalized factorization.
- `Mathlib.RingTheory.UniqueFactorizationDomain.Multiplicity`: Defines `multiplicity`, `emultiplicity`, and their properties.

**Key Type Classes Used**:
- `[Monoid R]`, `[CommMonoid R]`, `[CommMonoidWithZero R]`
- `[CancelCommMonoidWithZero R]`, `[GCDMonoid R]`, `[WfDvdMonoid R]`, `[DecompositionMonoid R]`, `[NormalizationMonoid R]`, `[UniqueFactorizationMonoid R]`

**Domain Scope**:
- General monoids and their extensions (with zero, cancellative, with GCD/WFDV structure).
- Specialized results for UFDs and integers (`Int` namespace).
- Natural numbers handled via `natAbs` and `natCast`.

---

### Summary

This module formalizes **squarefreeness** in abstract monoid-theoretic settings, with strong connections to:
- **Multiplicities** (`emultiplicity`),
- **Factorization theory** (UFDs, decomposition monoids),
- **Radical elements** (`IsRadical`),
- **Coprimality** (`IsRelPrime`).

It serves as a foundational layer for number-theoretic applications (e.g., in `Data.Nat.Squarefree`) and algebraic reasoning about divisibility without repeated factors.