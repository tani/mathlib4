### Technical Brief: Polynomial Evaluation and Degree Interactions in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `eval₂` | `p.eval₂ f x` | Evaluates polynomial `p : R[X]` at `x : S` via ring homomorphism `f : R →+* S`. |
| `eval` | `p.eval x` | Special case of `eval₂` where `f = id` (i.e., evaluation in the same ring). |
| `natDegree` | `p.natDegree : ℕ` | Degree of `p` as a natural number (0 for zero polynomial). |
| `degree` | `p.degree : WithBot ℕ` | Degree as a bot-extended natural (allows `-∞` represented as `⊥`). |
| `leadingCoeff` | `p.leadingCoeff` | Coefficient of the highest-degree nonzero term. |
| `comp` | `p.comp q` | Polynomial composition: substitute `q` into `p`. |
| `map` | `p.map f` | Induced ring homomorphism on polynomials via `f : R →+* S`. |
| `coeff` | `p.coeff n` | `n`-th coefficient of `p`. |
| `monomial` | `monomial n a` | Polynomial with single nonzero coefficient `a` at degree `n`. |

##### **Key Theorems**
| Name | Statement Summary |
|------|-------------------|
| `eval₂_eq_sum_range` | `p.eval₂ f x` equals finite sum over `i < natDegree p + 1` of `f(p.coeff i) * x^i`. |
| `eval_eq_sum_range` | Specialization of above for `eval` (i.e., `f = id`). |
| `coeff_comp_degree_mul_degree` | Leading coefficient of `p.comp q` is `leadingCoeff p * (leadingCoeff q)^(natDegree p)`, assuming `natDegree q ≠ 0`. |
| `comp_C_mul_X_coeff` | `(p.comp (C r * X)).coeff n = p.coeff n * r^n`. |
| `mapEquiv` | Isomorphism `R[X] ≃+* S[X]` induced by `R ≃+* S`. |
| `degree_map_eq_of_leadingCoeff_ne_zero` | If `f(leadingCoeff p) ≠ 0`, then `degree(p.map f) = degree p`. |
| `degree_map_lt` | If `f(leadingCoeff p) = 0` and `p ≠ 0`, then `degree(p.map f) < degree p`. |
| `iterate_comp_eval` | `(p.comp^[k] q).eval t = (eval p)^[k] (q.eval t)` — iterated composition commutes with evaluation. |
| `isUnit_of_isUnit_leadingCoeff_of_isUnit_map` | If `leadingCoeff f` and `map φ f` are units, then `f` is a unit (in domain `S`). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `eval₂_`, `eval_`: for evaluation-related lemmas.
  - `coeff_`: for coefficient-related properties.
  - `comp_`: for composition lemmas.
  - `map_`: for induced map on polynomials.
  - `natDegree_`, `degree_`: for degree-specific results.
  - `isUnit_`, `monic_`: for special polynomial classes.

- **Suffixes**:
  - `_eq_sum_range`: expresses evaluation as sum over range.
  - `_eq_zero_iff`: characterizes when a polynomial expression is zero.
  - `_ne_zero`: proves non-vanishing under conditions.
  - `_le`, `_lt`, `_eq`: indicates inequality/equality of degrees.
  - `_iff`: biconditional characterizations.

- **Special patterns**:
  - `mapEquiv` uses `!`-syntax (`[simps!]`) for automatic simplification of projections.
  - `iterate_comp_eval₂` uses `iterate` for functional iteration.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rw` | Rewriting using equalities (e.g., `eval_eq_sum`, `coeff_map`). |
| `simp` / `simp_rw` | Simplification with definitional equalities and lemmas. |
| `congr` / `ext` | Extensionality for function/polynomial equality. |
| `refine` / `exact` | Constructing proofs via partial goals (`refine` preferred in ported code). |
| `induction` | Structural induction on `ℕ` (especially for iterates). |
| `cases` | Case analysis on hypotheses (e.g., `p = 0` vs `p ≠ 0`). |
| `convert` (→ `refine`) | Used in porting notes; replaced by `refine` for better control. |
| `sum_congr` | Proving equality of sums via pointwise equality. |
| `Finset.sum_eq_single` | Simplifying sums where only one term is nonzero. |
| `ring` / `abel` | Not explicitly used here, but `simp` + `ring`-like reasoning via `mul_sum`, `mul_add`, etc. |
| `rwa`, `apply_congr` (→ `congr` + `ext`) | Legacy workarounds replaced in port. |

---

#### **4. Proof Logic Patterns**

- **Sum-based evaluation**: Most proofs about `eval`/`eval₂` reduce to rewriting via `eval_eq_sum_range` and simplifying finite sums.
- **Degree comparisons**:
  - Use `degree_le_iff_coeff_zero` / `degree_lt_iff_coeff_zero` to reduce to coefficient vanishing.
  - Prove equality via antisymmetry (`antisymm`) of `≤`.
- **Composition**:
  - Use `coeff_sum` + `Finset.sum_eq_single` to isolate leading term.
  - Rely on `natDegree_mul_le` and `natDegree_pow_le` for bounding degrees.
- **Mapping & units**:
  - Link `leadingCoeff` behavior under `map` to degree changes.
  - Use `isUnit` characterizations via degree (`degree_eq_zero_of_isUnit`) and `coeff_map`.
- **Inductive arguments**:
  - Iterated composition evaluated via induction on `k`, using `eval₂_comp` as inductive step.

---

#### **5. Imports & Scope**

**Primary imports**:
- `Mathlib.Algebra.GroupWithZero.NonZeroDivisors`: for `nonZeroDivisors`, used in `comp_C_mul_X_eq_zero_iff`.
- `Mathlib.Algebra.Polynomial.Degree.*`: degree theory (`Support`, `Units`).
- `Mathlib.Algebra.Polynomial.Eval.Coeff`: foundational evaluation and coefficient lemmas.

**Scope**:
- Focuses on **interaction between evaluation (`eval`, `eval₂`) and degree functions** (`degree`, `natDegree`, `leadingCoeff`).
- Covers:
  - Sum representations of evaluation.
  - Behavior under composition (`comp`).
  - Behavior under ring homomorphisms (`map`, `mapEquiv`).
  - Special cases: monic polynomials, units, domains.
- **Noncomputable section**: indicates reliance on classical logic (e.g., for `degree` as `WithBot ℕ`).

---

### Summary

This module formalizes foundational properties of polynomial evaluation and degree under ring homomorphisms and composition. It emphasizes:
- **Explicit finite-sum expansions** for evaluation.
- **Sharp degree control** under mapping and composition.
- **Equivalence between structural properties** (e.g., monic, unit, zero) and coefficient/degree conditions.

It serves as a core reference for higher-level results in algebra (e.g., algebraic extensions, root counting, factorization).