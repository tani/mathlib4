### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `integral_bilinear_hasLineDerivAt_right_eq_neg_left_of_integrable_aux1` | Lemma | Proves integration by parts for line derivatives in product space `E × ℝ`, using Fubini and 1D integration by parts. Assumes integrability of `B(f, g')`, `B(f', g)`, and `B(f, g)`. |
| `integral_bilinear_hasLineDerivAt_right_eq_neg_left_of_integrable_aux2` | Lemma | Extends `aux1` to general Haar measure on `E × ℝ` via change of measure using `addHaar`. Requires finite-dimensionality of `E`. |
| `integral_bilinear_hasLineDerivAt_right_eq_neg_left_of_integrable` | Theorem | Main integration-by-parts theorem for **line derivatives** with a general continuous bilinear form `B`. Handles arbitrary direction `v ∈ E`. |
| `integral_bilinear_hasFDerivAt_right_eq_neg_left_of_integrable` | Theorem | Integration by parts for **Fréchet derivatives**, reducing to line derivative version via `HasFDerivAt → HasLineDerivAt`. |
| `integral_bilinear_fderiv_right_eq_neg_left_of_integrable` | Theorem | Same as above, but expressed using `fderiv` (total derivative as a function), assuming differentiability. |
| `integral_smul_fderiv_eq_neg_fderiv_smul_of_integrable` | Theorem | Integration by parts for scalar multiplication (`•`) using `fderiv`, with bilinear form `lsmul`. |
| `integral_mul_fderiv_eq_neg_fderiv_mul_of_integrable` | Theorem | Integration by parts for pointwise multiplication (`*`) using `fderiv`, with bilinear form `mul`. |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `integral_...`: Indicates the theorem involves an integral identity.
  - `hasLineDerivAt`, `hasFDerivAt`, `fderiv`: Reflects the differentiability notion used.
  - `bilinear`: Indicates use of a general continuous bilinear form `B`.
  - `smul`, `mul`: Special cases of bilinear forms (scalar action and multiplication).
- **Suffixes**:
  - `_right_eq_neg_left_of_integrable`: Standard suffix for integration-by-parts lemmas; indicates `∫ f g' = - ∫ f' g`.
  - `_aux1`, `_aux2`: Internal auxiliary lemmas used in the proof pipeline.
- **Variables**:
  - `f, g`: functions
  - `f', g'`: derivatives (line or Fréchet)
  - `v`: direction of differentiation
  - `B`: bilinear form (`F →L[ℝ] G →L[ℝ] W`)
  - `μ`: Haar measure on `E`

#### 3. **Tactic Stack**

- **Core tactics**:
  - `rw`, `simp`, `convert`, `apply`, `exact`
- **Analysis/measure theory**:
  - `integral_congr_ae`, `integral_prod`, `integral_neg`, `integral_map`, `smul_measure_nnreal`
  - `integrable_map_iff`, `hf'.prod_right_ae`, `hfg'.prod_right_ae`, `hfg.prod_right_ae`
- **Linear/functional analysis**:
  - `ContinuousLinearEquiv.ofFinrankEq`, `separatingDual`, `isAddLeftInvariant_eq_smul`
  - `hasLineDerivAt_zero`, `hasDerivAt_id`, `hasDerivAt_const`
- **Automation**:
  - `aesop` (not explicitly used here, but `filter_upwards` + `aesop`-like reasoning appears)
  - `ring`, `linarith` (not visible, but likely used implicitly in simplifications)
- **Proof engineering**:
  - `by_cases`, `rcases`, `obtain`, `let`, `have`, `suffices ... by`, `ext`, `convert ... using 1`

#### 4. **Proof Logic**

- **High-level strategy**:
  1. Reduce to product space `E × ℝ` (via linear equivalence `E ≃L[ℝ] (Fin (n-1) → ℝ) × ℝ`) to isolate direction `v` as `(0, 1)`.
  2. Apply Fubini to decompose integral over `E × ℝ` into iterated integrals over `E` and `ℝ`.
  3. Use 1D integration-by-parts (via `integral_bilinear_hasDerivAt_right_eq_neg_left_of_integrable`) on the `ℝ`-factor.
  4. Reassemble using properties of Haar measures and change-of-variables (via `Measure.map`).
- **Induction / recursion**: Not used.
- **Case analysis**: On `v = 0` vs `v ≠ 0`; on completeness of `W`.
- **Reduction**: General bilinear case → scalar multiplication case via `lsmul`/`mul`.

#### 5. **Imports**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.Calculus.LineDeriv.Basic` | Provides `HasLineDerivAt`, `lineDeriv`, and basic calculus facts for directional derivatives. |
| `Mathlib.MeasureTheory.Integral.IntegralEqImproper` | Provides tools for improper integrals and Fubini-type results (e.g., `integral_prod`, integrability under product measures). |

#### Additional Notes

- **Assumptions**: Emphasize integrability over decay at infinity (unlike classical statements). Motivated by Fourier analysis applications.
- **Generality**: Works in arbitrary finite-dimensional real normed spaces with Haar measure; bilinear forms allow vector- or Banach-space-valued functions.
- **Extensibility**: The auxiliary lemmas (`aux1`, `aux2`) suggest a modular proof structure, suitable for generalization (e.g., to manifolds or infinite dimensions — noted as future work).