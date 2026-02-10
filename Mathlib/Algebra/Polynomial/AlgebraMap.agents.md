### Technical Metadata Brief: `Mathlib.Algebra.Polynomial.Basic`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `algebraOfAlgebra` | `Algebra R A[X]` | Constructs an `R`-algebra structure on `A[X]` when `A` is an `R`-algebra. |
| `CAlgHom` | `A →ₐ[R] A[X]` | The canonical algebra homomorphism embedding `A` into `A[X]` as constant polynomials. |
| `algHom_ext'` | `(f g : A[X] →ₐ[R] B) → (f ∘ CAlgHom = g ∘ CAlgHom) → f X = g X → f = g` | Extensionality for algebra homs out of `A[X]`, using behavior on constants and `X`. |
| `aeval` | `R[X] →ₐ[R] A` (given `x : A`) | The unique `R`-algebra homomorphism sending `X ↦ x`; evaluation at `x`. |
| `aeval_def` | `aeval x p = eval₂ (algebraMap R A) x p` | Identifies `aeval` with `eval₂`. |
| `aeval_X`, `aeval_C`, `aeval_monomial`, `aeval_X_pow` | `aeval x X = x`, `aeval x (C r) = algebraMap R A r`, etc. | Basic evaluation laws for generators. |
| `comp_eq_aeval` | `p.comp q = aeval q p` | Composition of polynomials = evaluation of one at another. |
| `aeval_comp` | `aeval x (p.comp q) = aeval (aeval x q) p` | Associativity of composition and evaluation. |
| `algEquivOfCompEqX` | `(p q : R[X]) → p ∘ q = X → q ∘ p = X → R[X] ≃ₐ[R] R[X]` | Constructs automorphisms from compositional inverses. |
| `algEquivCMulXAddC`, `algEquivAevalXAddC`, `algEquivAevalNegX` | Automorphisms of `R[X]` given by linear changes of variable. | Key examples of polynomial automorphisms. |
| `aeval_algHom`, `aeval_algEquiv` | `aeval (f x) = f ∘ aeval x`, etc. | Compatibility of `aeval` with algebra homs and equivalences. |
| `eval_mul_X_sub_C` | `(p * (X - C r)).eval r = 0` | Key step in Cayley–Hamilton proof: `X - r` divides `p(X) - p(r)`. |
| `X_sub_C_pow_dvd_iff` | `(X - t)^n ∣ p ↔ X^n ∣ p(X + t)` | Translation of divisibility under shift. |
| `dvd_comp_*_iff` lemmas | e.g., `p ∣ q ∘ (X + t) ↔ p ∘ (X - t) ∣ q` | Divisibility under substitution (change of variable). |
| `nmem_nonZeroDivisors_iff` (McCoy’s theorem) | `P ∉ R[X]⁰ ↔ ∃ a ≠ 0, a • P = 0` | Characterizes zerodivisors in `R[X]`. |
| `mem_nonZeroDivisors_iff` | `P ∈ R[X]⁰ ↔ ∀ a, a • P = 0 → a = 0` | Complement of McCoy’s theorem. |
| `eq_zero_of_mul_eq_zero_of_smul` | If `P` is “torsion-free” over coefficients, then `P Q = 0 ⇒ Q = 0` | Used in proof of McCoy’s theorem. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `algHom_`, `aeval_`, `mapAlg_`, `algEquiv_`: indicate algebra homomorphism / equivalence / evaluation.
  - `C_`, `X_`: refer to constant polynomial or indeterminate.
  - `eval₂_`, `eval_`: evaluation variants (`eval₂` is generalized evaluation at a ring hom + element).
- **Suffixes**:
  - `_apply`: applied form of a definition (e.g., `aeval_X_left_apply`).
  - `_eq_iff`: equivalence with equality (e.g., `algEquivAevalXAddC_eq_iff`).
  - `_iff`: biconditional characterizations (e.g., `dvd_comp_X_add_C_iff`).
  - `_toAlgHom`, `_toRingHom`: coercion to underlying ring/algebra hom.
- **Special**:
  - `CAlgHom`, `aeval`, `algEquivOfCompEqX`: named constructions (not just `def_*`).
  - `map_dvd_iff`, `eval₂_hom`: pattern `*_dvd_iff`, `*_hom` for transfer lemmas.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` / `simp_rw` | Simplifying definitions (`aeval`, `eval₂`, `C`, `X`, `algebraMap`). |
| `ext` / `ext1` | Extensionality for functions, algebra homs, polynomials. |
| `congr` | Congruence reasoning (especially for `aeval`, `eval₂`). |
| `rw [← comp_eq_aeval]` | Rewriting composition via `aeval`. |
| `apply AlgHom.ext`, `apply RingHom.ext` | Proving equality of algebra/ring homs. |
| `induction p using Polynomial.induction_on` | Structural induction on polynomials. |
| `convert` + `simp` | Matching goals up to definitional equality. |
| `aesop` / `linarith` | Rare, but used for arithmetic in `Finset` sums or degree bounds. |
| `rw [coeff_mul]`, `rw [coeff_C_mul]`, `rw [coeff_monomial]` | Coefficient-level reasoning. |
| `rw [Finset.sum_range_*]`, `rw [sum_def]` | Expanding polynomial sums. |
| `exact`, `refine`, `apply` | Direct proof steps, especially for divisibility or membership. |

---

#### **4. Proof Logic**

- **Inductive structure**: Most proofs about polynomials use `Polynomial.induction_on` (on `p`), often with base cases for `0`, `1`, `X`, and closure under `+`, `*`, `C r`.
- **Extensionality**: Algebra homs out of `R[X]` are uniquely determined by their action on `X` and constants (`algHom_ext`, `algHom_ext'`).
- **Evaluation-based reasoning**: Many results reduce to `eval₂` properties (e.g., `aeval` lemmas via `eval₂`).
- **Divisibility & substitution**: Key lemmas (`dvd_comp_*_iff`, `X_sub_C_pow_dvd_iff`) use algebra isomorphisms (`algEquiv*`) to transfer divisibility across substitutions.
- **McCoy’s theorem**: Uses structural induction + coefficient analysis (`eq_zero_of_mul_eq_zero_of_smul`) to reduce to torsion in base ring.
- **Degree arguments**: Often involve bounding degrees (`natDegree_mul_le`, `natDegree_X_sub_C_le`), and using `sum_range'` with degree bounds.

---

#### **5. Imports**

Core dependencies defining scope:

| Import | Purpose |
|--------|---------|
| `Mathlib.Algebra.Algebra.Pi` | Product algebras, used for `Pi`-based modules/algebras. |
| `Mathlib.Algebra.Algebra.Subalgebra.Basic` | Subalgebras, comaps, etc. (`aeval_apply_smul_mem_of_le_comap`). |
| `Mathlib.Algebra.Algebra.Tower` | Scalar tower laws (`IsScalarTower`, `aevalTower`). |
| `Mathlib.Algebra.MonoidAlgebra.Basic` | Implementation of `Polynomial R = MonoidAlgebra R ℕ`. |
| `Mathlib.Algebra.Polynomial.Eval.Algebra` | `eval₂` as algebra hom (`eval₂AlgHom'`, `aeval`). |
| `Mathlib.Algebra.Polynomial.Eval.Degree` | Degree and natDegree lemmas (`natDegree_mul_le`, etc.). |
| `Mathlib.Algebra.Polynomial.Monomial` | Monomial representation, coefficient lemmas. |

> **Note**: The file avoids `Ideal` (via `assert_not_exists Ideal`), focusing on foundational algebraic structure rather than ideal theory.

--- 

This metadata captures the core structure, conventions, and proof patterns of the `Polynomial.Basic` module in Mathlib, suitable for training or querying a domain-specific Lean 4 AI agent.