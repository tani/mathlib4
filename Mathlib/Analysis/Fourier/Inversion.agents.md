Here's a structured technical metadata summary of the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `tendsto_integral_cexp_sq_smul` | `Integrable f → Tendsto (fun c ↦ ∫ v, cexp (-c⁻¹ * ‖v‖²) • f v) atTop (𝓝 (∫ v, f v))` | Shows that convolution with a Gaussian kernel (with variance → ∞) approximates the identity in the integral sense. |
| `tendsto_integral_gaussian_smul` | `Integrable f → Integrable (𝓕 f) → v : V → Tendsto (fun c ↦ ∫ w, (π * c)^{n/2} * cexp(-π² * c * ‖v - w‖²) • f w) atTop (𝓝 (𝓕⁻(𝓕 f) v))` | Shows that the Gaussian-regularized inverse Fourier transform converges to `𝓕⁻(𝓕 f)(v)` as the Gaussian flattens. |
| `tendsto_integral_gaussian_smul'` | `Integrable f → ContinuousAt f v → Tendsto (fun c ↦ ∫ w, (π * c)^{n/2} * cexp(-π² * c * ‖v - w‖²) • f w) atTop (𝓝 (f v))` | Shows the same Gaussian-regularized integral converges to `f(v)` at continuity points. |
| `MeasureTheory.Integrable.fourier_inversion` | `Integrable f → Integrable (𝓕 f) → ContinuousAt f v → 𝓕⁻(𝓕 f) v = f v` | Main Fourier inversion theorem: equality at continuity points under integrability of `f` and `𝓕 f`. |
| `Continuous.fourier_inversion` | `Continuous f → Integrable f → Integrable (𝓕 f) → 𝓕⁻(𝓕 f) = f` | Global inversion under continuity (hence equality everywhere). |
| `MeasureTheory.Integrable.fourier_inversion_inv` | `Integrable f → Integrable (𝓕 f) → ContinuousAt f v → 𝓕(𝓕⁻ f) v = f v` | Inversion for the inverse Fourier transform. |
| `Continuous.fourier_inversion_inv` | `Continuous f → Integrable f → Integrable (𝓕 f) → 𝓕(𝓕⁻ f) = f` | Global inversion for inverse transform. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `tendsto_...`: Statements about convergence of integrals (often parameterized by `c → ∞`).
  - `fourier_inversion[_inv]`: Main inversion theorems.
  - `integrable_...`: Conditions or lemmas involving integrability.
- **Suffixes**:
  - `_smul`: Involves scalar multiplication (`•`) with a function.
  - `_sq`: Involves squared norm (`‖v‖^2`).
  - `_gaussian`: Related to Gaussian kernels or transforms.
- **Function names**:
  - `cexp`: Complex exponential (`exp(I * ·)`).
  - `fourierChar`, `fourierIntegral`, `fourierIntegralInv`: Fourier transform and its inverse.
  - `GaussianFourier.*`: Lemmas about Fourier transforms of Gaussians.

---

### **3. Tactic Stack**

Frequent tactics used in proofs:
- `apply`, `convert`, `rw`, `congr`, `ext`, `simp`, `simp only`, `simp_rw`
- `filter_upwards`, `aesop`, `gcongr`, `norm_cast`, `ring`, `ring_nf`
- `exact`, `have`, `let`, `nth_rewrite`, `convert ... using n`
- `tendsto_*` lemmas (e.g., `Tendsto.comp`, `Tendsto.congr'`)
- ` positivity`, `norm_num`, `field_simp`, `linarith`

---

### **4. Proof Logic**

- **High-level strategy**: Approximate the ill-defined Dirac delta by Gaussians, use dominated convergence and Fubini for regularized integrals, then pass to the limit.
- **Structure of main proofs**:
  1. **Regularization**: Introduce Gaussian factor `exp(-c⁻¹‖w‖²)` to gain integrability.
  2. **Fubini step**: For fixed `c`, apply Fubini (justified by integrability of `f` and `𝓕 f`).
  3. **Explicit Gaussian FT**: Use known Fourier transform of Gaussians to compute inner integral.
  4. **Concentration**: Show the resulting kernel becomes increasingly concentrated at `v` as `c → ∞`.
  5. **Limit comparison**: Show both regularized expressions converge (a) to `𝓕⁻(𝓕 f)(v)` and (b) to `f(v)` at continuity points ⇒ equality.
- **Key lemmas used**:
  - `tendsto_integral_cexp_sq_smul`: Approximation of identity via Gaussians.
  - `GaussianFourier.integrable_cexp_neg_mul_sq_norm_add`, `GaussianFourier.integral_rexp_neg_mul_sq_norm`: Gaussian integrability & normalization.
  - `VectorFourier.integral_fourierIntegral_smul_eq_flip`: Fubini for Fourier transforms.
  - `tendsto_rpow_mul_exp_neg_mul_atTop_nhds_zero`: Decay of Gaussian tails.

---

### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.MeasureTheory.Integral.PeakFunction`: Tools for approximation by peak functions (Gaussian regularization).
  - `Mathlib.Analysis.SpecialFunctions.Gaussian.FourierTransform`: Explicit Fourier transform computations for Gaussians.
- **Mathematical context**:
  - Finite-dimensional real inner product space `V`.
  - Measurable, Borel, complete normed space `E` (typically `ℝ` or `ℂ`, but generalized).
  - Fourier transform defined via `𝓕`, inverse via `𝓕⁻`.
  - Integrability (`Integrable`), continuity (`Continuous`, `ContinuousAt`), and convergence in filter sense (`Tendsto`, `𝓝`).
- **Key structures**:
  - `InnerProductSpace ℝ V`, `FiniteDimensional ℝ V`, `CompleteSpace E`, `MeasurableSpace V`, `BorelSpace V`.

---

Let me know if you'd like a diagram of the logical dependencies or a summary of the Gaussian Fourier transform lemmas used.