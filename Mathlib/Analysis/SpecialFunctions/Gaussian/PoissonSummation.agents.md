### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `rexp_neg_quadratic_isLittleO_rpow_atTop` | `{a : ℝ} → a < 0 → (fun x ↦ rexp (a * x ^ 2 + b * x)) =o[atTop] (· ^ s)` | Shows Gaussian-type real exponentials decay faster than any power at `+∞`. |
| `cexp_neg_quadratic_isLittleO_rpow_atTop` | `{a : ℂ} → a.re < 0 → (fun x ↦ cexp (a * x ^ 2 + b * x)) =o[atTop] (· ^ s)` | Complex analog: exponential decay of complex Gaussian along `atTop`. |
| `cexp_neg_quadratic_isLittleO_abs_rpow_cocompact` | `{a : ℂ} → a.re < 0 → (fun x ↦ cexp (a * x ^ 2 + b * x)) =o[cocompact ℝ] (|·| ^ s)` | Extends decay to *cocompact* filter (i.e., both ends and away from compact sets). |
| `tendsto_rpow_abs_mul_exp_neg_mul_sq_cocompact` | `{a : ℝ} → 0 < a → Tendsto (|x| ^ s * rexp (-a * x ^ 2)) (cocompact ℝ) (𝓝 0)` | Shows that weighted Gaussian tends to 0 at infinity (used for integrability/decay). |
| `isLittleO_exp_neg_mul_sq_cocompact` | `{a : ℂ} → 0 < a.re → (fun x ↦ exp (-a * x ^ 2)) =o[cocompact ℝ] |·| ^ s` | Key decay estimate for complex Gaussian used in Poisson summation setup. |
| `Complex.tsum_exp_neg_quadratic` | `{a : ℂ} → 0 < a.re → ∑' n, exp(-π*a*n² + 2π*b*n) = a⁻¹ᐟ² * ∑' n, exp(-π/a*(n + I*b)²)` | **Jacobi transformation formula** for theta series with linear term (`b`). |
| `Complex.tsum_exp_neg_mul_int_sq` | `{a : ℂ} → 0 < a.re → ∑' n, exp(-π*a*n²) = a⁻¹ᐟ² * ∑' n, exp(-π/a*n²)` | Special case of above with `b = 0`; core identity for modular transformation of theta function. |
| `Real.tsum_exp_neg_mul_int_sq` | `{a : ℝ} → 0 < a → ∑' n, exp(-π*a*n²) = a⁻¹ᐟ² * ∑' n, exp(-π/a*n²)` | Real version of the identity; derived from complex case via `ofReal`. |

> **Note**: `a ^ (1 / 2 : ℂ)` denotes the principal complex square root.

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `rexp_`: real exponential (`rexp = Real.exp ∘ ofReal`).
  - `cexp_`: complex exponential (`cexp = Complex.exp`).
  - `isLittleO_`, `tendsto_`, `isBigO_`: standard asymptotic notation.
  - `quadratic`: indicates dependence on quadratic polynomials in exponent.
  - `mul_int_sq`: sum over integers of `exp(-a * n²)`.

- **Suffixes**:
  - `_atTop`, `_atBot`, `_cocompact`: filter-specific decay estimates.
  - `_ofReal`, `_intCast`: type coercion lemmas.
  - `_const_mul_left`, `_comp_tendsto`: structural properties of asymptotics.

- **General pattern**: `function_property_filter_condition`.

---

#### 3. **Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `rw`, `simp_rw`, `simp only` | Rewriting definitions, simplifying expressions (especially coercions, `I_sq`, `ofReal_*`). |
| `convert` | Matching goals up to definitional equality (e.g., applying lemmas with slight variations). |
| `exact`, `refine`, `apply` | Direct proof steps; often with `using` or `1` to select subgoal. |
| `have`, `suffices` | Introducing intermediate claims. |
| `ext1`, `ext` | Extensionality for functions. |
| `ring`, `ring_nf` | Algebraic simplification (polynomial identities). |
| `norm_num`, ` positivity` | Handling numeric inequalities (e.g., `pi_pos`, `one_half_pos`). |
| `tendsto_*` lemmas (`tendsto_id.atTop_mul_atTop`, etc.) | Asymptotic reasoning. |
| `convert ... using 1` | Selective conversion to first subgoal (common in `tsum_eq_tsum_fourierIntegral_of_rpow_decay`). |
| `rwa`, `rw [...] at` | Rewriting in hypotheses. |

---

#### 4. **Proof Logic / Strategy**

- **Decomposition by filter**: Decay estimates are proven separately for `atTop` and `atBot`, then combined via `cocompact_eq_atBot_atTop` and `isLittleO_sup`.
- **Reduction to known lemmas**: Many results reduce to `rexp_neg_quadratic_isLittleO_rpow_atTop` via:
  - Norm estimates (`Complex.norm_eq_abs`, `Complex.abs_exp`)
  - Real/imaginary parts (`re_ofReal_mul`, `add_re`)
  - Algebraic manipulation (`ring_nf`, `I_sq`)
- **Application of Poisson summation**: Final theorems use:
  - `Real.tsum_eq_tsum_fourierIntegral_of_rpow_decay`
  - With hypotheses verified via decay lemmas (`f_bd`, `Ff_bd`)
  - Continuity of `f` and integrability ensured via `hCf`, `h1`, `h2`
- **Specialization**: General theta transformation (`tsum_exp_neg_quadratic`) specialized to `b = 0` yields `tsum_exp_neg_mul_int_sq`.
- **Real case**: Derived from complex case using `ofReal_*` lemmas and injectivity (`ofReal_inj`).

---

#### 5. **Imports & Scope**

- **Core imports**:
  - `Mathlib.Analysis.SpecialFunctions.Gaussian.FourierTransform`
  - `Mathlib.Analysis.Fourier.PoissonSummation`

- **Open scopes**:
  - `Real`, `Topology`, `FourierTransform`, `RealInnerProductSpace`
  - `Complex` (with `hiding exp continuous_exp abs_of_nonneg sq_abs`)

- **Noncomputable section**: Required for `Complex.cpow` and real powers like `a ^ (1 / 2)`.

- **Domain scope**: Analysis on `ℝ`, especially Fourier analysis, Gaussian integrals, and modular forms (theta functions).  
  - Central object: `∑' n : ℤ, exp(-π * a * n²)` — the *theta series*.
  - Key tool: **Poisson summation formula** applied to Gaussian test functions.

--- 

Let me know if you'd like a diagram of dependencies or a tactic-level proof sketch.