### Technical Brief: Quaternion Exponential in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `exp_coe` | `exp ℝ (r : ℍ[ℝ]) = ↑(exp ℝ r)` | Shows that the exponential of a real scalar, viewed as a quaternion, equals the real exponential embedded in ℍ. |
| `expSeries_even_of_imaginary` | `q.re = 0 ⇒ expSeries(2n) = ↑((-1)^n * ‖q‖^(2n) / (2n)!)` | Identifies even terms of the exponential series for *pure imaginary* quaternions as real scalars matching the cosine power series. |
| `expSeries_odd_of_imaginary` | `q.re = 0 ⇒ expSeries(2n+1) = ((-1)^n * ‖q‖^(2n+1) / (2n+1)! / ‖q‖) • q` | Identifies odd terms as scalar multiples of `q`, matching the sine series scaled by `q / ‖q‖`. |
| `hasSum_expSeries_of_imaginary` | Hypotheses on cosine/sine series convergence ⇒ exponential series converges to `c + (s / ‖q‖) • q` | Bridges term-wise convergence of real series to quaternion exponential convergence. |
| `exp_of_re_eq_zero` | `q.re = 0 ⇒ exp q = cos ‖q‖ + (sin ‖q‖ / ‖q‖) • q` | Closed-form expression for exponential of pure imaginary quaternions. |
| `exp_eq` | `exp q = exp(q.re) • (cos ‖q.im‖ + (sin ‖q.im‖ / ‖q.im‖) • q.im)` | General closed-form for exponential of arbitrary quaternion, decomposed into real and imaginary parts. |
| `re_exp` | `(exp q).re = exp(q.re) * cos ‖q.im‖` | Real part of quaternion exponential. |
| `im_exp` | `(exp q).im = exp(q.re) * (sin ‖q.im‖ / ‖q.im‖) • q.im` | Imaginary part of quaternion exponential. |
| `normSq_exp` | `normSq (exp q) = exp(q.re)^2` | Squared norm of quaternion exponential depends only on real part. |
| `norm_exp` | `‖exp q‖ = ‖exp(q.re)‖` | Norm of quaternion exponential equals norm of real exponential of real part. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `exp_`: Core exponential lemmas (`exp_eq`, `exp_of_re_eq_zero`, `exp_coe`).
  - `re_`, `im_`: Extract real/imaginary parts (`re_exp`, `im_exp`).
  - `norm_`: Norm-related results (`norm_exp`, `normSq_exp`).
  - `hasSum_`: Convergence of series (`hasSum_expSeries_of_imaginary`).
  - `expSeries_`: Series term analysis (`expSeries_even_of_imaginary`, `expSeries_odd_of_imaginary`).

- **Suffixes**:
  - `_of_imaginary`: Applies when `q.re = 0`.
  - `_coe`: Coercion-related simplifications (`exp_coe`).
  - `_smul`, `_div`, `_pow`: Structural manipulations involving scalar multiplication, division, powers.

- **Variables**:
  - `q`: General quaternion.
  - `r`: Real scalar.
  - `n`: Natural number index for series terms.
  - `c`, `s`: Real limits (cosine/sine sums).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `rw` | Rewriting using equalities (e.g., `sq_eq_neg_normSq`, `pow_mul`, `normSq_eq_norm_mul_self`). |
| `simp` / `simp_rw` | Simplification with lemmas like `exp_eq_tsum`, `expSeries_apply_eq`, `Real.cos_sq_add_sin_sq`. |
| `congr 1` / `congr` | Equality of expressions via congruence (e.g., in `expSeries_even_of_imaginary`). |
| `have` / `obtain` | Introducing intermediate facts (e.g., `hq2 : q ^ 2 = -normSq q`). |
| `calc` | Chain of equalities (used heavily in series term simplifications). |
| `exact` / `refine` | Finishing proofs with known results or partially applied lemmas. |
| `ext n : 1` | Extensionality for sequences (proving two functions equal by pointwise equality). |
| `push_cast`, `norm_cast` | Managing coercion between ℝ and ℍ. |
| `ring`, `ring_nf` | Simplifying polynomial expressions in ℝ. |
| `div_div_cancel_left'`, `pow_ne_zero`, `ne_of_gt` | Handling division by nonzero scalars (especially `‖q.im‖ ≠ 0`). |
| `smul_smul`, `smul_zero`, `mul_zero` | Scalar multiplication algebraic simplifications. |

---

#### **4. Proof Logic**

- **Structure**:
  1. **Series decomposition**: Split exponential series into even/odd parts.
  2. **Term-wise identification**: Show even terms match cosine series, odd terms match sine series (using `q.re = 0 ⇒ q² = -‖q‖²`).
  3. **Convergence**: Use known convergence of real cosine/sine series (`Real.hasSum_cos`, `Real.hasSum_sin`) to deduce convergence of quaternion exponential series.
  4. **Closed form**: Summarize via `HasSum.tsum_eq`.
  5. **General case**: Reduce to pure imaginary case using `q = q.re + q.im`, commutativity of real scalars with all quaternions, and `exp(a + b) = exp a * exp b` when `a` commutes with `b`.

- **Key Insight**:
  - For pure imaginary `q`, `q² = -‖q‖²` mimics `i² = -1`, enabling analogy with complex exponential.
  - General case follows by separating real (central) and imaginary (orthogonal) components.

---

#### **5. Imports & Scope**

- **Core Dependencies**:
  - `Mathlib.Analysis.Quaternion`: Quaternion algebra, norm, real/imaginary decomposition.
  - `Mathlib.Analysis.Normed.Algebra.Exponential`: General exponential in normed algebras (`exp`, `expSeries`, `map_exp`).
  - `Mathlib.Analysis.SpecialFunctions.Trigonometric.Series`: Convergence of sine/cosine power series (`Real.hasSum_cos`, `Real.hasSum_sin`).

- **Domain**: Analysis on the normed division algebra `ℍ[ℝ]` (quaternions over ℝ), with emphasis on:
  - Smooth structure (`exp` as analytic function),
  - Norm behavior,
  - Interaction between algebraic structure (imaginary unit sphere) and analysis.

- **Notable Lemmas Used**:
  - `sq_eq_neg_normSq`: For pure imaginary `q`, `q² = -‖q‖²`.
  - `exp_eq_tsum`: Exponential defined as sum of `expSeries`.
  - `Real.cos_sq_add_sin_sq`: Pythagorean identity for real trig functions.
  - `normSq_eq_norm_mul_self`: `normSq q = ‖q‖²`.

---

This module formalizes the **quaternion exponential closed form**, leveraging decomposition into real/imaginary parts and analogy with complex analysis. It is foundational for applications in Lie theory, rotation geometry, and quantum mechanics over ℍ.