### Technical Brief: `Mathlib.Algebra.Polynomial.RootMultiplicity`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `modByMonicHom` | `q : R[X] →ₗ[R] R[X]` | Linear map sending `p ↦ p %ₘ q`, the remainder upon division by monic `q`. |
| `rootMultiplicity` | `p.rootMultiplicity t : ℕ` | Multiplicity of root `t` in polynomial `p`; defined via multiplicity of `X - C t`. |
| `rootMultiplicity_eq_rootMultiplicity` | `p.rootMultiplicity t = (p.comp (X + C t)).rootMultiplicity 0` | Shifts root from `t` to `0` via substitution `X ↦ X + t`. |
| `rootMultiplicity_eq_natTrailingDegree` | `p.rootMultiplicity t = (p.comp (X + C t)).natTrailingDegree` | Expresses root multiplicity as trailing degree after shift. |
| `rootMultiplicity_X_sub_C_pow` | `rootMultiplicity a ((X - C a) ^ n) = n` | Multiplicity of `a` in `(X - a)^n` is exactly `n`. |
| `rootMultiplicity_X_sub_C_self` | `rootMultiplicity x (X - C x) = 1` | Simple root case (`n = 1`). |
| `rootMultiplicity_X_sub_C` | `rootMultiplicity x (X - C y) = if x = y then 1 else 0` | General case: root multiplicity of linear factor. |
| `rootMultiplicity_mul'` | Under nonzero evaluation condition, `rootMultiplicity x (p * q) = rootMultiplicity x p + rootMultiplicity x q` | Additivity of multiplicity under multiplication (with condition). |
| `rootMultiplicity_mul` | `p * q ≠ 0 ⇒ rootMultiplicity x (p * q) = rootMultiplicity x p + rootMultiplicity x q` | Full additivity in integral domains. |
| `rootMultiplicity_mul_X_sub_C_pow` | `(p * (X - C a)^n).rootMultiplicity a = p.rootMultiplicity a + n` | Adds powers of linear factors to multiplicity. |
| `exists_multiset_roots` | `∀ p ≠ 0, ∃ s : Multiset R, ...` | Constructs multiset of roots (with multiplicities) bounded by degree. |
| `prime_X_sub_C`, `irreducible_X_sub_C` | `Prime (X - C r)`, `Irreducible (X - C r)` | Linear polynomials are prime/irreducible over domains. |
| `isCoprime_X_sub_C_of_isUnit_sub` | `IsUnit (a - b) ⇒ IsCoprime (X - a), (X - b)` | Coprimality of distinct linear factors when difference is unit. |
| `pairwise_coprime_X_sub_C` | Injective `s : I → K ⇒ Pairwise (IsCoprime (X - s i))` | Distinct roots give pairwise coprime linear factors over fields. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `rootMultiplicity_`: All theorems about multiplicity of roots.
  - `isCoprime_`: Coprimality of polynomials.
  - `prime_`, `irreducible_`: Primality/irreducibility of polynomials.
  - `aeval_`: Evaluation at algebra elements.
  - `modByMonic_`: Division by monic polynomials.

- **Suffixes**:
  - `_eq_self_of_root`: Identity when evaluating at a root.
  - `_of_degree_eq_one`: Implication from degree condition.
  - `_of_not_monic`, `_of_root`: Conditional variants.
  - `_mul`, `_pow`: Behavior under multiplication or exponentiation.

- **Special patterns**:
  - `X_sub_C` = `X - C r` (linear polynomial).
  - `comp` = composition (`p.comp q`).
  - `C` = constant polynomial embedding `R → R[X]`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp_rw` | Rewriting with definitional equalities (e.g., `rootMultiplicity_eq_multiplicity`, `eval_divByMonic_eq_trailingCoeff_comp`). |
| `rw` | Standard rewriting, especially with lemmas like `modByMonic_eq_sub_mul_div`, `mul_comp`. |
| `congr` | Congruence reasoning (e.g., for multiplicity equalities). |
| `apply` / `exact` | Applying lemmas or hypotheses directly. |
| `split_ifs` | Handling `if ... then ... else ...` cases (e.g., `rootMultiplicity_X_sub_C`). |
| `rcases` / `rintro` | Destructuring existential or conjunction hypotheses. |
| `convert` | Up to definitional equality (e.g., `multiplicity_map_eq`). |
| `by_contra!` | Contradiction proofs (e.g., `aeval_ne_zero_of_isCoprime`). |
| `calc` | Chain of equalities/inequalities (e.g., in `exists_multiset_roots`). |
| `aesop`, `linarith`, `ring` | Implicitly used in `decreasing_by` and arithmetic reasoning. |
| `simp only [...] at h` | Simplifying hypotheses (e.g., in `aeval_ne_zero_of_isCoprime`). |

---

#### **4. Proof Logic**

- **Inductive/Recursive Structure**:
  - `exists_multiset_roots` uses **well-founded induction** on `natDegree p`, constructing roots one at a time via division by `(X - a)`.

- **Common Proof Patterns**:
  - **Shift to `0`**: Many proofs reduce to the case `t = 0` via substitution (`X ↦ X + t`) using `rootMultiplicity_eq_rootMultiplicity`.
  - **Factor out linear terms**: Use `rootMultiplicity_mul_X_sub_C_pow` to isolate multiplicities.
  - **Use prime factorization**: Leverage `prime_X_sub_C` and `multiplicity_mul` in integral domains.
  - **Coprime arguments**: Use `isCoprime_X_sub_C_of_isUnit_sub` and `pairwise_coprime_X_sub_C` for Chinese Remainder Theorem-style constructions.

- **Domain-specific reasoning**:
  - Over **domains**, use `degree_eq_degree_of_associated`, `prime_X_sub_C`, `rootMultiplicity_mul`.
  - Over **fields**, use `pairwise_coprime_X_sub_C` and injectivity of root assignments.
  - Over **general rings**, rely on `modByMonicHom`, `aeval_modByMonic_eq_self_of_root`, and `isCoprime` conditions.

---

#### **5. Imports & Scope**

- **Core imports**:
  ```lean
  import Mathlib.Algebra.Polynomial.AlgebraMap
  import Mathlib.Algebra.Polynomial.Div
  import Mathlib.RingTheory.Coprime.Basic
  ```

- **Scope**:
  - **Univariate polynomials** over commutative rings/semirings/domains/fields.
  - Focus on **root multiplicity**, **coprimality**, **irreducibility**, and **evaluation**.
  - Uses `Multiset` for root collections and `WithBot ℕ` for degree/multiplicity bounds.

- **Key algebraic structures assumed**:
  - `[CommRing R]`, `[IsDomain R]`, `[Field K]`, `[Semiring S]`, `[Algebra R S]`.

---

### Summary

This module formalizes foundational properties of univariate polynomial roots, especially **multiplicity**, leveraging:
- Division by monic polynomials (`modByMonicHom`, `modByMonic_eq_zero_iff_dvd`),
- Substitution to shift roots (`comp (X + C t)`),
- Prime factorization via linear factors (`prime_X_sub_C`),
- Coprimality of distinct linear factors (`pairwise_coprime_X_sub_C`),
- Constructive root extraction (`exists_multiset_roots`).

It serves as a basis for deeper results like the Chinese Remainder Theorem for polynomials, interpolation, and factorization theory.