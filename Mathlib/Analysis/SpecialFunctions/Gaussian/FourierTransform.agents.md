### Technical Metadata Brief: Fourier Transform of the Gaussian in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `verticalIntegral` | `ℂ → ℝ → ℝ → ℂ` | Defines the contour integral over vertical edges of a rectangle used in complex-analytic proof of Gaussian integral. |
| `norm_cexp_neg_mul_sq_add_mul_I` | `∀ b c T, ‖cexp(-b*(T + c*I)²)‖ = exp(-(b.re*T² - 2*b.im*c*T - b.re*c²))` | Computes the norm of the Gaussian exponential along a complex line. |
| `verticalIntegral_norm_le` | `0 < b.re → 0 ≤ T ⇒ ‖verticalIntegral b c T‖ ≤ 2|c|·exp(-(b.re·T² - 2|b.im|·|c|·T - b.re·c²))` | Bounds the vertical contour integral to show it vanishes as `T → ∞`. |
| `tendsto_verticalIntegral` | `0 < b.re ⇒ verticalIntegral b c T → 0` as `T → ∞` | Shows vertical contributions vanish in the contour deformation argument. |
| `integrable_cexp_neg_mul_sq_add_real_mul_I` | `0 < b.re ⇒ integrable (x ↦ cexp(-b*(x + c*I)²))` | Proves integrability of shifted Gaussian along complex lines. |
| `integral_cexp_neg_mul_sq_add_real_mul_I` | `0 < b.re ⇒ ∫ x, cexp(-b*(x + c*I)²) = (π/b)^(1/2)` | Key lemma: Gaussian integral is invariant under vertical shifts in complex plane. |
| `integral_cexp_quadratic` | `b.re < 0 ⇒ ∫ x, cexp(bx² + cx + d) = (π/(-b))^(1/2)·cexp(d - c²/(4b))` | General formula for integral of complex Gaussian with quadratic exponent. |
| `fourierIntegral_gaussian` | `0 < b.re ⇒ ∫ x, exp(I*t*x)·exp(-b*x²) = (π/b)^(1/2)·exp(-t²/(4b))` | Fourier transform of Gaussian is Gaussian — core result. |
| `fourierIntegral_gaussian_pi` | `0 < b.re ⇒ 𝓕(x ↦ exp(-π*b*x²)) = t ↦ b^(-1/2)·exp(-π*t²/b)` | Symmetric Fourier transform version (with `π` normalization). |
| `integral_cexp_neg_mul_sq_norm_add` | `0 < b.re ⇒ ∫ v, cexp(-b‖v‖² + c⟨w,v⟩) = (π/b)^(n/2)·exp(c²‖w‖²/(4b))` | Multidimensional Gaussian integral with linear term in inner product space. |
| `fourierIntegral_gaussian_innerProductSpace` | `0 < b.re ⇒ 𝓕(v ↦ cexp(-b‖v‖²))(w) = (π/b)^(n/2)·exp(-π²‖w‖²/b)` | Fourier transform of Gaussian in finite-dimensional real inner product space. |

> **Note**: `𝓕` denotes the Fourier transform operator `fourierIntegral`, defined as `(𝓕 f)(t) = ∫ x, exp(-2π*I*t*x)·f x` in `ℝ`, but here adapted with `exp(I*t*x)` in some theorems (non-`2π`-normalized).

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`, `has_`, `integrable_`, `tendsto_`, `norm_`, `vertical_`, `fourierIntegral_`, `integral_`, `cexp_`
- **Suffixes**:
  - `_le`, `_eq`, `_norm`, `_add`, `_mul`, `_sq`, `_norm_sq`, `_innerProductSpace`, `_pi`, `_pi'`, `_quadratic`
- **Pattern**:
  - `integral_cexp_quadratic`: integral of `cexp` of quadratic polynomial.
  - `fourierIntegral_gaussian`: Fourier integral (i.e., Fourier transform) of Gaussian.
  - `integrable_cexp_neg_mul_sq_add_real_mul_I`: integrability of `cexp(-b·x² + linear term)`.
  - `norm_cexp_...`: norm estimate for complex exponential.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `rw` / `simp_rw` | Rewriting definitions, simplifying expressions (especially with `Complex.exp_add`, `norm_cexp_...`, `sq`, `re`, `im`). |
| `field_simp` + `ring` | Simplifying rational expressions and verifying algebraic identities (e.g., completing the square). |
| `gcongr` / `congr` / ` refine` | Handling inequalities and constructing proofs stepwise (e.g., bounding integrands). |
| `conv` | Entering deep into expressions for targeted rewriting (e.g., `enter [1,2,x]`). |
| `have` / `suffices` / `by_contra` | Intermediate lemma introduction and contradiction arguments. |
| `convert` | Matching goals up to definitional equality (especially with measurable equivalences). |
| `norm_cast` / `push_cast` | Managing coercion between `ℝ` and `ℂ`. |
| `abel` / `ring_nf` | Simplifying abelian group/ring expressions. |
| `intervalIntegral_tendsto_integral` | Convergence of interval integrals over `[-T,T]` to full line. |
| `tendsto_zero_iff_norm_tendsto_zero` | Reducing limit proofs to norm estimates. |
| `tendsto_atTop_mul_atTop`, `tendsto_exp_atBot`, etc. | Asymptotic analysis (used in `tendsto_verticalIntegral`). |

---

#### **4. Proof Logic**

- **Core Strategy**: Complex-analytic contour deformation.
  1. Define rectangular contour with vertices `±T`, `±T + c·I`.
  2. Use Cauchy’s theorem (`integral_boundary_rect_eq_zero_of_differentiableOn`) to equate integrals over top/bottom and vertical sides.
  3. Show vertical integrals vanish as `T → ∞` via `verticalIntegral_norm_le` and squeeze theorem (`tendsto_verticalIntegral`).
  4. Reduce to known Gaussian integral (`integral_gaussian_complex`) and shift invariance (`integral_cexp_neg_mul_sq_add_real_mul_I`).
- **General Quadratic Case**:
  - Complete the square: `b x² + c x + d = -(-b)(x + c/(2b))² + (d - c²/(4b))`.
  - Apply shift-invariance and known integral.
- **Multidimensional Case**:
  - Reduce to product space via `fintype_prod`, or use Euclidean space isomorphism (`EuclideanSpace`) and orthonormal basis (`stdOrthonormalBasis`).
  - Apply 1D result componentwise.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.SpecialFunctions.Gaussian.GaussianIntegral` | 1D real Gaussian integral (`integral_gaussian_complex`). |
| `Mathlib.Analysis.Complex.CauchyIntegral` | Cauchy integral theorem for rectangles. |
| `Mathlib.MeasureTheory.Integral.Pi` | Fubini / product integral for finite products (`integral_fintype_prod_eq_prod`). |
| `Mathlib.Analysis.Fourier.FourierTransform` | Definition of Fourier transform `𝓕`, `fourierIntegral`, properties. |

**Domain Scope**:
- Real and complex analysis on `ℝ` and `ℂ`.
- Measure theory (integrability, measurable spaces, Borel spaces).
- Finite-dimensional real inner product spaces (`InnerProductSpace ℝ V`, `EuclideanSpace ℝ ι`).
- Complex analysis (contour integration, analyticity of `cexp`).

---

### Summary

This file formalizes the **Fourier transform of Gaussian functions** in both 1D and finite-dimensional inner product spaces, using complex-analytic techniques (contour deformation, Cauchy’s theorem) and measure-theoretic tools (integrability, product integrals). It provides both explicit integral formulas and operator-level Fourier transform identities, with careful handling of complex parameters (`b ∈ ℂ`, `Re(b) > 0`), and supports both `π`-normalized and non-normalized conventions. The proofs rely heavily on algebraic manipulation (`ring`, `field_simp`), norm estimates (`gcongr`, `norm_cexp_...`), and convergence arguments (`tendsto_*`, `squeeze`).