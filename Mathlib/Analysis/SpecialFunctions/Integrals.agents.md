### Technical Metadata Brief

#### 1. Key Definitions & Theorems

| Name | Type / Purpose |
|------|----------------|
| `intervalIntegrable_pow` | `IntervalIntegrable (fun x => x ^ n) μ a b` — Power functions are integrable on any interval under locally finite measure. |
| `intervalIntegrable_zpow`, `intervalIntegrable_rpow`, `intervalIntegrable_rpow'` | Integrability of integer/rational/real exponents; handles singularities at 0 via condition `0 ∉ [[a, b]]` or `r > -1`. |
| `intervalIntegrable_cpow`, `intervalIntegrable_cpow'` | Integrability of complex power functions `x ↦ x^r` (with `x ∈ ℝ`), using real part condition `r.re > -1` or `0 ∉ [[a, b]]`. |
| `integrableOn_Ioo_rpow_iff`, `integrableOn_Ioo_cpow_iff` | Characterization of integrability near 0: `x^s` integrable on `(0, t)` iff `-1 < s` (real or complex case). |
| `integral_pow`, `integral_zpow`, `integral_rpow`, `integral_cpow` | Fundamental theorem of calculus for powers: `∫ x in a..b, x^r = (b^{r+1} - a^{r+1}) / (r+1)` under appropriate conditions. |
| `integral_id`, `integral_one`, `integral_inv`, `integral_exp`, `integral_log`, `integral_sin`, `integral_cos` | Standard integrals: linear, constant, reciprocal, exponential, logarithmic, sine, cosine. |
| `integral_one_div_one_add_sq`, `integral_inv_one_add_sq` | `∫ 1/(1+x²) = arctan b - arctan a`. |
| `integral_cos_sq_sub_sin_sq` | `∫ (cos²x - sin²x) = sin b cos b - sin a cos a`. |
| `integral_sin_pow`, `integral_cos_pow` | Reduction formulae: express `∫ sin^{n+2}` / `∫ cos^{n+2}` in terms of `∫ sin^n` / `∫ cos^n`. |
| `integral_sin_pow_odd`, `integral_sin_pow_even` | Closed-form product expressions for `∫₀^π sin^n x dx` for odd/even `n`, used in Wallis product derivation. |
| `integral_mul_cpow_one_add_sq`, `integral_mul_rpow_one_add_sq` | Integrals of `x·(1+x²)^t`, generalizing standard substitution-based integrals. |
| `integral_pow_abs_sub_uIoc` | `∫ |x−a|^n` over `Ι a b` = `|b−a|^{n+1}/(n+1)` — used in Picard–Lindelöf proofs. |

#### 2. Naming Conventions

- **Prefixes**:
  - `intervalIntegrable_`: asserts integrability of a function over an interval.
  - `integral_`: evaluates the integral of a function over an interval.
  - `mul_integral_`, `inv_mul_integral_`: encode change-of-variable lemmas for integrals under affine transformations.
- **Suffixes**:
  - `_pow`, `_zpow`, `_rpow`, `_cpow`: distinguish integer, real, and complex exponent cases.
  - `_odd`, `_even`: for parity-specific simplifications.
  - `_of_pos`, `_of_neg`: for cases where interval lies entirely in positive/negative reals.
  - `_aux`: intermediate lemmas used in main proofs (e.g., reduction formula derivation).
- **Structure**:
  - `intervalIntegrable_*` often rely on `continuousOn_*` + `intervalIntegrable` constructor.
  - `integral_*` often use `integral_deriv_eq_sub'`, `integral_mul_deriv_eq_deriv_mul`, or `integral_eq_sub_of_hasDerivAt`.

#### 3. Tactic Stack

Frequently used tactics:
- `simp`, `simp only`, `simp_rw`: for rewriting using definitional equalities and known lemmas.
- `field_simp`, `ring`, `norm_num`: algebraic simplification and normalization.
- `convert`, `congr`, `ext`: for equational reasoning and congruence closure.
- `rw`, `rwa`, `apply`, `exact`: core proof scripting.
- `have`, `suffices`, `by_cases`, `rcases`, `induction'`: case analysis and induction.
- `fun_prop`, `measurable_set_*`, `integrable_*`, `continuous_*`: domain-specific automation for regularity properties.
- `aesop` (implied by context): likely used in later stages for automation (not explicit here but standard in modern Mathlib).

#### 4. Proof Logic

- **Structure**:
  1. **Integrability first**: Prove `IntervalIntegrable` using continuity or measure-theoretic criteria (`continuousOn_*`, `aestronglyMeasurable`, `integrableOn_*`).
  2. **Apply FTC variants**:
     - `integral_deriv_eq_sub'`: when primitive is known (e.g., `d/dx x^{r+1}/(r+1) = x^r`).
     - `integral_mul_deriv_eq_deriv_mul`: integration by parts (e.g., for `sin^n`, `cos^n`).
     - `integral_eq_sub_of_hasDerivAt`: for piecewise or singular cases (e.g., `x^r` near 0).
  3. **Handle singularities**:
     - Split interval at 0: `∫_a^b = ∫_a^0 + ∫_0^b`.
     - Use symmetry (`x ↦ -x`) or substitution (`x ↦ x/c + d`) to reduce to `[0, c]`.
     - For complex powers, reduce to real part via `‖x^r‖ = x^{r.re}`.
  4. **Induction & product formulas**:
     - Reduction formulae → recurrence → closed forms for `∫₀^π sin^n x dx`, `∫₀^π cos^n x dx`.
     - Parity-based splitting (`even_or_odd'`) → separate product forms.

#### 5. Imports

- `Mathlib.MeasureTheory.Integral.FundThmCalculus`: Fundamental theorem of calculus for Lebesgue integral.
- `Mathlib.Analysis.SpecialFunctions.Trigonometric.ArctanDeriv`: Derivative of `arctan`, used in `∫ 1/(1+x²)`.
- `Mathlib.Analysis.SpecialFunctions.NonIntegrable`: Likely for counterexamples or boundary cases (e.g., `x⁻¹` at 0).
- `Mathlib.Analysis.SpecialFunctions.Pow.Deriv`: Derivatives of `x^r`, `x^s`, `x^n`, crucial for FTC applications.

---

This module serves as a **comprehensive toolkit for computing elementary definite integrals** in Lean, with emphasis on:
- Rigorous handling of singularities (especially at 0),
- Uniform treatment of real/complex powers,
- Derivation of reduction formulae and product forms for trigonometric powers,
- Integration under affine changes of variable.

It is designed to support automation (`simp`/`norm_num`) for routine integrals and serves as a foundation for deeper analysis (e.g., Wallis product, Fourier analysis, PDE estimates).