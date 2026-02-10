### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `analyticOnNhd_cexp` | `AnalyticOnNhd ℂ exp univ` | Proves `Complex.exp` is analytic on the whole space. |
| `hasDerivAt_exp` | `HasDerivAt exp (exp x) x` | Shows derivative of `Complex.exp` at `x` is `exp x`. |
| `differentiable_exp` | `Differentiable ℂ exp` | `Complex.exp` is globally differentiable. |
| `deriv_exp` | `deriv exp = exp` | Derivative of `Complex.exp` equals itself. |
| `iter_deriv_exp` | `∀ n, deriv^[n] exp = exp` | All iterated derivatives of `Complex.exp` equal `exp`. |
| `contDiff_exp` | `ContDiff ℂ n exp` | `Complex.exp` is infinitely differentiable (`C^∞`). |
| `HasStrictDerivAt.cexp` | `HasStrictDerivAt f f' x → HasStrictDerivAt (exp ∘ f) (exp (f x) * f') x` | Chain rule for `Complex.exp` composition. |
| `iteratedDeriv_cexp_const_mul` | `iteratedDeriv n (s ↦ exp (c * s)) = s ↦ c^n * exp (c * s)` | Explicit formula for iterated derivatives of `exp(c·)`. |
| `analyticOnNhd_rexp`, `hasDerivAt_exp`, `contDiff_exp`, etc. | Analogous to above for `Real.exp` | Real exponential is smooth, analytic, etc. |
| `HasStrictDerivAt.exp`, `deriv_exp`, `fderiv_exp`, etc. | Chain rules for `Real.exp` composition | Derivative rules for `Real.exp ∘ f`. |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `analyticOnNhd_`, `analyticOn_`, `analyticAt_`: For analyticity properties.
  - `hasDerivAt_`, `hasStrictDerivAt_`, `hasFDerivAt_`, `hasDerivWithinAt_`: For various derivative existence notions.
  - `differentiableAt_`, `differentiableOn_`, `differentiable_`: For differentiability.
  - `contDiffAt_`, `contDiffOn_`, `contDiff_`, `contDiffWithinAt_`: For smoothness (`C^n`).
  - `deriv_`, `derivWithin_`, `fderiv_`, `fderivWithin_`: For derivatives themselves.
  - `iteratedDeriv_`: For higher-order derivatives.

- **Suffixes**:
  - `_cexp`, `_rexp`: Distinguish complex vs real exponential.
  - `.cexp`, `.exp`: For lemmas about composition with `exp`.
  - `_const_mul`: For special case where argument is linear (`c * s`).

- **`@[simp]` / `@[fun_prop]`**: Marked lemmas intended for simplification or type-class propagation.

#### 3. **Tactic Stack**

- **Core tactics**:
  - `rw`, `simp`, `refine`, `exact`, `intro`, `apply`, `funext`
- **Analysis-specific**:
  - `analyticOnNhd_cexp.restrictScalars.contDiff`
  - `hasDerivAt_iff_isLittleO_nhds_zero`
  - `isLittleO_pow_id`, `exp_bound_sq`
  - `iterate_succ_apply`, `iter_deriv_exp`
  - `comp`, `comp_analyticOn`, `comp_hasFDerivWithinAt`, etc.
- **Automated reasoning**:
  - `norm_num`, `filter_upwards`, `simp only [Metric.mem_ball, dist_zero_right, norm_pow]`
  - `le_rfl`, `mem_univ _`

#### 4. **Proof Logic**

- **Structure**:
  - Prove basic derivative property (`hasDerivAt_exp`) via `isLittleO` estimates.
  - Derive differentiability, analyticity, and smoothness from that.
  - Use composition lemmas (`comp`, `comp_hasFDerivWithinAt`, etc.) to lift properties through `exp ∘ f`.
  - For iterated derivatives, use induction (`iter_deriv_exp`) or known lemmas like `iteratedDeriv_comp_const_mul`.
  - Real case often reduces to complex case via `real_of_complex`.

- **Common pattern**:
  ```text
  1. Prove base derivative (e.g., `hasDerivAt_exp`).
  2. Derive `differentiable`, `contDiff`, `analytic` via closure properties.
  3. Use chain rule lemmas (`.cexp`, `.exp`) to handle compositions.
  4. For higher derivatives, use `iter_deriv_exp` or `iteratedDeriv_*`.
  ```

#### 5. **Imports**

- `Mathlib.Analysis.Calculus.ContDiff.RCLike`: For `ContDiff` over `ℝ`/`ℂ`.
- `Mathlib.Analysis.Calculus.IteratedDeriv.Lemmas`: For `iteratedDeriv`, `iter_deriv`.
- `Mathlib.Analysis.Complex.RealDeriv`: For real/complex derivative relations.
- `Mathlib.Analysis.SpecialFunctions.Exp`, `Exponential`: Core exponential function definitions and basic properties.

---

This module formalizes foundational calculus of the exponential function over `ℝ` and `ℂ`, emphasizing smoothness, analyticity, and chain rules — all critical for further analysis (e.g., ODEs, complex analysis, Lie theory).