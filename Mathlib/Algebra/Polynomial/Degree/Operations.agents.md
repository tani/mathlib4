### Technical Brief: Polynomial Degree and Leading Coefficient Lemmas in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `degree` | `R[X] → WithBot ℕ` | Returns the degree of a polynomial, with `⊥` for the zero polynomial. |
| `natDegree` | `R[X] → ℕ` | Returns the degree as a natural number (0 for zero polynomial). |
| `leadingCoeff` | `R[X] → R` | Returns the coefficient of the highest-degree nonzero term; 0 for zero polynomial. |
| `monic` | `R[X] → Prop` | `p.Monic` iff `leadingCoeff p = 1` and `p ≠ 0`. |
| `degree_mul` | `degree (p * q) = degree p + degree q` | Degree is additive under multiplication (requires `NoZeroDivisors R`). |
| `degree_add_eq_left_of_degree_lt` | `degree q < degree p ⇒ degree (p + q) = degree p` | When degrees differ, sum inherits the larger degree. |
| `leadingCoeff_add_of_degree_lt` | `degree p < degree q ⇒ leadingCoeff (p + q) = leadingCoeff q` | Leading coefficient of sum is that of the higher-degree summand. |
| `leadingCoeff_add_of_degree_eq` | `degree p = degree q ∧ leadingCoeff p + leadingCoeff q ≠ 0 ⇒ leadingCoeff (p + q) = leadingCoeff p + leadingCoeff q` | When degrees equal and leading coeffs don’t cancel, sum’s leading coeff is sum of leading coeffs. |
| `coeff_mul_degree_add_degree` | `coeff (p * q) (natDegree p + natDegree q) = leadingCoeff p * leadingCoeff q` | Key lemma for proving multiplicativity of degree/leading coeff. |
| `degree_mul'` | `leadingCoeff p * leadingCoeff q ≠ 0 ⇒ degree (p * q) = degree p + degree q` | Multiplicativity of degree under nonzero product of leading coeffs. |
| `natDegree_mul'` | `leadingCoeff p * leadingCoeff q ≠ 0 ⇒ natDegree (p * q) = natDegree p + natDegree q` | Analogous for `natDegree`. |
| `degree_pow'` | `leadingCoeff p ^ n ≠ 0 ⇒ degree (p ^ n) = n • degree p` | Degree of power is scalar multiple of degree. |
| `leadingCoeff_mul` | `leadingCoeff (p * q) = leadingCoeff p * leadingCoeff q` | Multiplicativity of leading coeff (requires `NoZeroDivisors R`). |
| `degreeMonoidHom` | `R[X] →* Multiplicative (WithBot ℕ)` | Bundled monoid homomorphism version of `degree`. |
| `leadingCoeffHom` | `R[X] →* R` | Bundled monoid homomorphism version of `leadingCoeff`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `degree_`, `natDegree_`, `leadingCoeff_`: Core operations.
  - `eq_of_`, `le_of_`, `lt_of_`: Implication-based lemmas (e.g., `degree_add_eq_left_of_degree_lt`).
  - `of_`: Hypothesis-driven lemmas (e.g., `monic_of_degree_le_of_coeff_eq_one`).
- **Suffixes**:
  - `_left`, `_right`: Indicates which operand dominates (e.g., `degree_add_eq_left_of_degree_lt`).
  - `_le`, `_lt`, `_eq`: Reflect the type of inequality/equality in the hypothesis.
  - `_mul`, `_add`, `_pow`: Operation context (e.g., `degree_mul`, `natDegree_add_eq_left_of_degree_lt`).
- **Special**:
  - `_X`, `_C`: For `X` (indeterminate) or `C a` (constant polynomial).
  - `_pow`: For powers of `X` or general polynomials.
  - `_sub`: For subtraction (often via `sub_eq_add_neg` reduction).
  - `_ne_zero`, `_eq_zero`: For nonzero/zero implications.

---

#### **3. Tactic Stack**

- **Core automation**:
  - `simp` / `simp only`: Dominant tactic; simplifies using many `@[simp]` lemmas (e.g., `natDegree_C`, `degree_X`, `leadingCoeff_mul_X`).
  - `rw`: Rewriting with equalities (especially `degree_eq_natDegree`, `natDegree_eq_of_degree_eq`, `coeff_eq_zero_of_degree_lt`).
- **Case analysis & induction**:
  - `by_cases`, `cases'`, `obtain ⟨...⟩`: For splitting on `p = 0`, `q = 0`, `degree p < degree q`, etc.
  - `induction n with | zero | succ`: For induction on natural number exponents.
- **Order reasoning**:
  - `lt_of_lt_of_le`, `le_of_not_gt`, `antisymm`, `trans`: For chaining inequalities in `WithBot ℕ`.
  - `with_bot.coe_lt_coe`, `bot_lt_iff_ne_bot`: For reasoning about `WithBot` order.
- **Algebraic simplification**:
  - `ring`, `add_comm`, `mul_comm`, `mul_assoc`: Basic ring simplifications.
  - `Finset.sum_eq_single`, `Finset.sum_eq_single_of_mem`: For simplifying convolution sums in `coeff_mul`.
- **Nontriviality & decidability**:
  - `nontriviality`, `Decidable.byCases`, `Classical.decEq`: To handle nontriviality assumptions and decidability of equality.

---

#### **4. Proof Logic**

- **Inductive structure**:
  - Most proofs proceed by **case analysis on zero/nonzero** (`eq_or_ne p 0`), then:
    - If nonzero: use `degree_eq_natDegree hp` to reduce to `ℕ`-valued reasoning.
    - If zero: simplify using `degree_zero`, `leadingCoeff_zero`, etc.
- **Degree comparison**:
  - Use `lt_trichotomy` or `le_or_lt` to split into cases: `degree p < degree q`, `=`, or `>`.
  - For equal degrees, check whether leading coefficients cancel (`leadingCoeff p + leadingCoeff q ≠ 0`).
- **Leading coefficient extraction**:
  - Often reduces to evaluating `coeff p (natDegree p)` via `leadingCoeff` definition.
  - Uses `coeff_eq_zero_of_degree_lt` / `coeff_eq_zero_of_natDegree_lt` to kill lower-degree terms.
- **Multiplicativity proofs**:
  - Core pattern: Prove coefficient at `natDegree p + natDegree q` is product of leading coeffs (`coeff_mul_degree_add_degree`), then apply `degree_eq_natDegree` + `le_degree_of_ne_zero`.
- **Subtraction handling**:
  - Often rewrites `p - q` as `p + (-q)` and uses `degree_neg`, `leadingCoeff_neg`, `degree_add_eq_*`.

---

#### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.Algebra.Polynomial.Coeff`: Defines `coeff`, `degree`, `natDegree`, `leadingCoeff`.
  - `Mathlib.Algebra.Polynomial.Degree.Definitions`: Basic degree theory (e.g., `degree_le_iff_coeff_zero`, `degree_lt_iff_coeff_zero`).
- **Key algebraic assumptions**:
  - `[Semiring R]`: General setting for most lemmas.
  - `[Ring R]`: Needed for subtraction lemmas (`degree_sub_*`, `leadingCoeff_sub_*`).
  - `[NoZeroDivisors R]`: Required for `degree_mul`, `leadingCoeff_mul` (multiplicativity).
  - `[Nontrivial R]`: Needed for `degree_X`, `natDegree_X`, `degree_mul_X`, etc.
- **Domain-specific lemmas**:
  - Focus on **univariate polynomials** (`R[X]`), with heavy use of `WithBot ℕ` for degree codomain.
  - Extensive use of `natDegree` for natural-number-valued reasoning (especially in `natDegree_*` lemmas).
  - Special handling of `X`, `C a`, `X ^ n`, and linear polynomials (`X + C a`).

---

This module forms the backbone of degree/leading-coefficient reasoning in Mathlib, enabling higher-level results like factorization, irreducibility criteria, and algebraic closure constructions.