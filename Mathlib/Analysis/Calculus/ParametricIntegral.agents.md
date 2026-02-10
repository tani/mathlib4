Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Differentiation Under the Integral Sign in Lean 4**

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `hasFDerivAt_integral_of_dominated_loc_of_lip'` | **Main technical lemma**: Gives Fréchet differentiability of `x ↦ ∫ F x a ∂μ` at `x₀`, assuming uniform local Lipschitz condition with integrable bound, a.e. measurability, and pointwise Fréchet differentiability a.e. |
| `hasFDerivAt_integral_of_dominated_loc_of_lip` | **Usable version** of the above: relaxes measurability to *eventually* near `x₀`, and uses `LipschitzOnWith` instead of explicit norm inequality. |
| `hasFDerivAt_integral_of_dominated_of_fderiv_le` | Alternative version: assumes *pointwise differentiability* on a ball (not just at `x₀`) and uniform bound `‖F' x a‖ ≤ bound a`. |
| `hasFDerivAt_integral_of_dominated_loc_of_lip_interval` | Interval (i.e., `ℝ`) version for set integrals over `(a, b)`. |
| `hasFDerivAt_integral_of_dominated_of_fderiv_le''` | Interval version of the `fderiv_le` theorem. |
| `hasDerivAt_integral_of_dominated_loc_of_lip` | **Scalar-domain version** (`𝕜 = ℝ` or `ℂ`): uses `HasDerivAt` (high-school derivative) instead of `HasFDerivAt`. |
| `hasDerivAt_integral_of_dominated_loc_of_deriv_le` | Scalar-domain version with derivative bound (analog of `fderiv_le`). |

All theorems conclude:
- `Integrable F' μ` (or `IntervalIntegrable` in interval case), and  
- `HasFDerivAt / HasDerivAt` of the integral function at `x₀`, with derivative equal to `∫ F' a ∂μ`.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `hasFDerivAt_...`: Fréchet derivative version (for general normed spaces).
  - `hasDerivAt_...`: 1D derivative version (`𝕜 = ℝ` or `ℂ`).
  - `integral_of_dominated_...`: Parametric integral differentiation under domination assumptions.
- **Suffixes**:
  - `_loc_of_lip`: Local Lipschitz condition (uniform in `a`, integrable bound).
  - `_of_fderiv_le`: Derivative exists nearby and is uniformly bounded.
  - `_interval`: For integrals over intervals (e.g., `∫ t in a..b`).
  - `'` (prime): Slightly more technical/less user-friendly variant (e.g., `hasFDerivAt_integral_of_dominated_loc_of_lip'`).
  - `''` (double prime): Interval version of a `fderiv_le`-style theorem.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `simp`, `rw`, `simp_rw`: Simplification and rewriting (especially for measurability, integrals, norms).
- `apply_rules`, `gcongr`, `linarith`, ` positivity`: Arithmetic and inequality reasoning.
- `filter_upwards`, `mono`, `exacts`, `convert`: Filter and measure-theoretic arguments.
- `aesop`, `ring`: For algebraic simplifications (less frequent, but present).
- `by_cases`, `swap`, `rcases`, `obtain`, `choose`: Case analysis and destructuring.
- `have`, `replace`, `exact`, `refine`: Proof structuring.
- `set`, `convert`, `simpa`: Intermediate definitions and simplifications.

---

#### **4. Proof Logic**

- **General pattern**:
  1. Reduce to a neighborhood where measurability and Lipschitz/differentiability hold.
  2. Prove integrability of the candidate derivative (`F'`) using domination or Lipschitz bound.
  3. Show the difference quotient converges to the integral of `F'`, via:
     - Dominated Convergence Theorem (`tendsto_integral_filter_of_dominated_convergence`).
     - Pointwise convergence from differentiability (`h_diff`).
     - Uniform domination via Lipschitz bound or derivative bound (`h_bound`, `h_lipsch`).
- **Key lemmas used**:
  - `integrable_of_norm_sub_le`: To prove integrability of `F x` near `x₀`.
  - `lipschitzOnWith_of_nnnorm_hasFDerivWithin_le` / `hasDerivWithinAt`: To derive Lipschitz from derivative bounds.
  - `hasFDerivAt_iff_tendsto`, `tendsto_zero_iff_norm_tendsto_zero`: To translate differentiability into limit statements.
  - `convex_ball`: Convexity of balls used to apply Lipschitz-from-derivative lemmas.

---

#### **5. Imports & Scope**

**Primary imports**:
- `Mathlib.Analysis.Calculus.MeanValue`: For mean value and Lipschitz-from-derivative lemmas.
- `Mathlib.MeasureTheory.Integral.DominatedConvergence`: For `tendsto_integral_filter_of_dominated_convergence`.
- `Mathlib.MeasureTheory.Integral.SetIntegral`: For interval/set integrals (`∫ t in a..b`).
- `Mathlib.Analysis.NormedSpace.HahnBanach.SeparatingDual`: For `SeparatingDual.completeSpace_continuousLinearMap_iff` (used in completeness handling).

**Scope**:
- General setting: `H`, `E` normed spaces over `𝕜 ∈ {ℝ, ℂ}`.
- Measure-theoretic: `α` measurable space, `μ` a measure.
- Parametric integrals: `F : H → α → E`, `x ↦ ∫ F x a ∂μ`.
- Differentiability: Fréchet (`H →L[𝕜] E`) or scalar (`𝕜 → E`).

---

Let me know if you'd like a diagram of dependencies or a summary of how these theorems fit into a larger formalization roadmap (e.g., for the Lebesgue differentiation theorem or parameter-dependent ODEs).