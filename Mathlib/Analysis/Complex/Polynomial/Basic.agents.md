### Technical Brief: Fundamental Theorem of Algebra and Related Results in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `exists_root` | `{f : ℂ[X]} → 0 < degree f → ∃ z, IsRoot f z` | **Fundamental Theorem of Algebra**: Every non-constant complex polynomial has a root. Proven via Liouville’s theorem. |
| `isAlgClosed` | `IsAlgClosed ℂ` | Instance showing ℂ is algebraically closed, derived from `exists_root`. |
| `splits_ℚ_ℂ` | `{p : ℚ[X]} → Fact (p.Splits (algebraMap ℚ ℂ))` | Every rational polynomial splits over ℂ (due to ℂ being algebraically closed). |
| `card_complex_roots_eq_card_real_add_card_not_gal_inv` | `(p : ℚ[X]) → (p.rootSet ℂ).toFinset.card = (p.rootSet ℝ).toFinset.card + ...` | Counts complex roots as sum of real roots and non–conjugation-fixed roots (i.e., non-real roots). |
| `galActionHom_bijective_of_prime_degree` | Irreducible `p : ℚ[X]`, prime degree, exactly 2 non-real roots ⇒ `galActionHom p ℂ` is bijective | Shows full symmetric Galois group under specific root-count conditions. |
| `galActionHom_bijective_of_prime_degree'` | Same as above, but with 1–3 non-real roots (inequalities) ⇒ bijective Galois action | Generalizes previous result using bounds on number of non-real roots. |
| `mul_star_dvd_of_aeval_eq_zero_im_ne_zero` | Real polynomial `p`, `z ∈ ℂ` root with `z.im ≠ 0` ⇒ `(X - conj z)(X - z) ∣ p` | Shows that non-real roots come in conjugate pairs, giving quadratic factor. |
| `quadratic_dvd_of_aeval_eq_zero_im_ne_zero` | Same hypotheses ⇒ quadratic minimal polynomial over ℝ divides `p` | Explicit quadratic divisor: `X² - 2Re(z)X + |z|²`. |
| `Irreducible.degree_le_two` | `p : ℝ[X]` irreducible ⇒ `degree p ≤ 2` | Classification of irreducible real polynomials: only linear or quadratic. |
| `Irreducible.natDegree_le_two` | Same as above, for natural degree | Equivalent formulation using `natDegree`. |

---

#### **2. Naming Conventions**

- **Predicates / Properties**:
  - `isAlgClosed`, `Irreducible`, `separable`, `Splits`, `IsRoot`, `IsUnit`
- **Galois-theoretic actions**:
  - `galActionHom`, `galActionHom_injective`, `galActionHom_bijective_of_...`
- **Root sets**:
  - `rootSet`, `rootSet_def`, `mem_rootSet`, `mem_rootSet_of_ne`
- **Evaluation / substitution**:
  - `aeval`, `eval`, `map`, `algebraMap`
- **Conjugation-related**:
  - `Complex.conjAe`, `Complex.conj`, `starRingEnd`, `restrict`, `conj_eq_iff_im`
- **Degree-related**:
  - `degree_pos_of_irreducible`, `natDegree_eq_card_roots`, `degree_le_two`, `degree_mul_le`
- **Polynomial arithmetic**:
  - `mul_star_dvd`, `quadratic_dvd`, `X_sub_C`, `X_pow`, `C`

Prefixes/suffixes:
- `is_`, `mem_`, `card_`, `degree_`, `natDegree_`, `galActionHom_`, `mul_`, `quadratic_`, `star_`, `conj_`

---

#### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Usage |
|--------|-------|
| `by_contra!` | To assume negation and derive contradiction (e.g., in `exists_root`). |
| `simp_rw`, `simp` | Simplification with rewrite rules, especially for root sets, `aeval`, conjugation. |
| `rw` | Rewriting using lemmas like `mem_rootSet`, `conj_eq_iff_im`, `map_zero`, etc. |
| `exact`, `apply`, `refine` | Proof construction, especially for injectivity/surjectivity goals. |
| `have`, `suffices`, `on_goal` | Intermediate lemma introduction and goal decomposition. |
| `tauto` | Automated reasoning for set-theoretic logic (e.g., disjointness, union membership). |
| `compute_degree!` | Automatic degree computation for explicit polynomials. |
| `ring` | Polynomial ring simplifications (e.g., in `quadratic_dvd_of_aeval_eq_zero_im_ne_zero`). |
| `ext` | Extensionality for functions/evaluations (e.g., `Complex.ext`). |
| `apply_congr`, `congr_arg` | Congruence reasoning for equalities involving functions. |
| `lt_of_le_of_ne`, `le_antisymm` | Order reasoning with strict/non-strict inequalities. |
| `intro`, `cases`, `induction` | Standard proof decomposition. |

---

#### **4. Proof Logic**

- **Main proof strategy for `exists_root`**:
  - Assume no root → `f⁻¹` is entire (differentiable everywhere).
  - Show `f⁻¹ → 0` at infinity (since `f` grows like its leading term).
  - Apply **Liouville’s theorem** ⇒ `f⁻¹ = 0` ⇒ `f = ∞`, contradiction with `0 < degree f`.

- **Galois group bijectivity proofs**:
  - Use group-theoretic criteria: injectivity + size matching ⇒ bijectivity.
  - For prime degree, use:
    - `prime_degree_dvd_card` (from group action theory),
    - `two_dvd_card_support` (for conjugation involution),
    - Counting arguments on real vs. non-real roots (`card_complex_roots_eq_card_real_add_card_not_gal_inv`).
  - In `prime_degree'`, use inequalities to pin down number of non-real roots to 2.

- **Irreducible real polynomials ≤ degree 2**:
  - Use algebraic closure of ℂ to get a complex root.
  - If real ⇒ linear factor.
  - If non-real ⇒ quadratic factor via conjugate pair.
  - Irreducibility forces the cofactor to be a unit ⇒ degree ≤ 2.

- **Common logical flow**:
  - *Case split* on reality of a root (`eq_or_ne z.im 0`)
  - *Lift* or *embed* into ℂ via `algebraMap`
  - *Factor* using conjugate symmetry
  - *Apply irreducibility* to constrain degrees

---

#### **5. Imports & Scope**

**Primary imports**:
- `Mathlib.Analysis.Complex.Liouville` — Liouville’s theorem for complex analysis.
- `Mathlib.Analysis.Calculus.Deriv.Polynomial` — Differentiability of polynomials.
- `Mathlib.FieldTheory.PolynomialGaloisGroup` — Galois group actions on roots.
- `Mathlib.Topology.Algebra.Polynomial` — Topological properties (e.g., continuity, convergence).

**Core mathematical domains covered**:
- Complex analysis (Liouville, differentiability)
- Field theory (algebraic closure, splitting fields)
- Galois theory (group actions, permutation representations)
- Real/complex polynomial algebra (roots, conjugation, irreducibility)

**Notable structures used**:
- `IsAlgClosed`, `Irreducible`, `IsUnit`, `Splits`
- `Polynomial.Gal.galActionHom`
- `Complex.conjAe`, `starRingEnd`, `AlgEquiv`
- `Bornology`, `CocompactFilter`, `tendsto_norm_atTop`

---

### Summary

This file formalizes the **Fundamental Theorem of Algebra** in Lean 4 using complex analysis (Liouville), then leverages it to develop deep results in **Galois theory over ℚ** and **structure theory of real polynomials**. It demonstrates a tight interplay between analysis, algebra, and topology — a hallmark of modern formalized mathematics in Mathlib.