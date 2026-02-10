### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `hasFDerivAt_integral_of_dominated_loc_of_lip` | `{F : H → ℝ → E} {F' : ℝ → H →L[𝕜] E} {x₀ : H}` → `HasFDerivAt (fun x ↦ ∫ t in a..b, F x t ∂μ) (∫ t in a..b, F' t ∂μ) x₀` under dominated Lipschitz conditions | Generalizes Leibniz rule for Fréchet derivatives under the integral sign for Banach-space-valued functions, assuming local Lipschitz continuity in the parameter with integrable bound. |
| `hasFDerivAt_integral_of_dominated_of_fderiv_le` | Similar to above but assumes uniform bound on derivative norm instead of Lipschitz condition | Provides Fréchet differentiability under a dominated derivative condition (norm control). |
| `hasDerivAt_integral_of_dominated_loc_of_lip` | Specialization of the first theorem to scalar parameter space `𝕜 = ℝ` or `ℂ`, yielding `HasDerivAt` instead of `HasFDerivAt` | One-dimensional version of differentiation under the integral sign using Lipschitz bounds. |
| `hasDerivAt_integral_of_dominated_loc_of_deriv_le` | One-dimensional version with derivative norm bounded by integrable function | One-dimensional dominated convergence for derivatives (no Lipschitz assumption, just uniform derivative bound). |

All four theorems are *nonrec*, indicating they are defined directly (not via recursion), and rely on pre-existing theorems in `Mathlib.Analysis.Calculus.ParametricIntegral`.

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `hasFDerivAt_` / `hasDerivAt_`: Indicates the theorem asserts existence of a (Fréchet or Gâteaux) derivative at a point.
  - `integral_of_`: Denotes the theorem applies to an integral expression.
  - `dominated_`: Signifies use of a dominating integrable function (as in dominated convergence).
  - `loc_of_lip` / `loc_of_deriv_le`: Specifies local conditions — Lipschitz or derivative boundedness — on a neighborhood.

- **Suffixes**:
  - `_of_lip`: Lipschitz condition on the integrand in the parameter variable.
  - `_of_fderiv_le` / `_of_deriv_le`: Derivative norm bounded by an integrable function.

- **Structure**:  
  `has[FDeriv|Deriv]At_integral_of_[dominated|...]_[condition]`

---

#### 3. **Tactic Stack**

The proofs use a consistent tactic pipeline:

- `rw [...] at ...`: Rewriting using measure-theoretic equivalences (`ae_restrict_iff' measurableSet_uIoc`) to convert between interval integrability and restriction to `Ι a b`.
- `simp only [...]`: Simplification with specific lemmas:
  - `intervalIntegrable_iff`
  - `intervalIntegral_eq_integral_uIoc`
- `have := ...`: Reuse of existing theorems from `ParametricIntegral`, followed by:
  - `.const_smul _`: Scaling argument (since interval integrals are scalar multiples of restricted integrals).
- No heavy automation (e.g., `aesop`, `linarith`) appears — proofs are mostly structural rewrites and applications of prior results.

---

#### 4. **Proof Logic**

- **High-level strategy**:
  1. Reduce interval integrals to integrals over `uIoc a b` using `intervalIntegral_eq_integral_uIoc`.
  2. Translate integrability and measurability assumptions over the interval to the restricted measure space via `ae_restrict_iff'`.
  3. Apply a known theorem from `ParametricIntegral` (e.g., `hasFDerivAt_integral_of_dominated_loc_of_lip` from the ambient space).
  4. Adjust the conclusion using `const_smul` to account for the change from `uIoc`-integral to interval integral.

- **Induction / cases**: Not used — all proofs are direct reductions.

- **Key logical flow**:
  > *Assumptions on integrability, measurability, and domination ⇒ apply known parametric integral theorem ⇒ adjust result for interval integrals.*

---

#### 5. **Imports & Scope**

- **Core imports**:
  - `Mathlib.Analysis.Calculus.ParametricIntegral`: Source of the base theorems.
  - `Mathlib.MeasureTheory.Integral.IntervalIntegral`: Provides interval-specific integral definitions and conversions.

- **Scopes opened**:
  - `Topology`, `Filter`, `Interval`: For neighborhood filters (`𝓝`), interval notation (`Ι a b`, `ball x₀ ε`), and related topology.

- **Assumptions on types**:
  - `𝕜`: A `RCLike` field (`ℝ` or `ℂ`).
  - `E`, `H`: Normed additive commutative groups and normed spaces over `ℝ` and `𝕜`.
  - `μ`: A measure on `ℝ`.
  - Integrability and measurability are expressed via `IntervalIntegrable` and `AEStronglyMeasurable`.

---

### Summary

This file formalizes **Leibniz’s rule for interval integrals with parameters**, extending parametric differentiation theorems from `ParametricIntegral` to the interval-specific setting. It provides four variants (Fréchet/derivative, Lipschitz/dominated derivative) and relies on measure-theoretic simplifications and reuse of existing results. The naming and structure follow Lean/Mathlib conventions for parametric integrals, emphasizing conditions (Lipschitz, dominated, local) and the type of derivative (`FDeriv` vs `Deriv`).