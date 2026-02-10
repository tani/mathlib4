Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Extending Differentiability to the Boundary**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `hasFDerivWithinAt_closure_of_tendsto_fderiv` | `∀ {f : E → F} {s : Set E} {x : E} {f' : E →L[ℝ] F}, DifferentiableOn ℝ f s → Convex ℝ s → IsOpen s → (∀ y ∈ closure s, ContinuousWithinAt f s y) → Tendsto (fderiv ℝ f) (𝓝[s] x) (𝓝 f') → HasFDerivWithinAt f f' (closure s) x` | General extension result: if `f` is differentiable on a convex open set `s`, continuous on `closure s`, and its derivative converges to `f'` at a boundary point `x`, then `f` is differentiable at `x` (within `closure s`) with derivative `f'`. |
| `hasDerivWithinAt_Ici_of_tendsto_deriv` | `∀ {s : Set ℝ} {e : E} {a : ℝ} {f : ℝ → E}, DifferentiableOn ℝ f s → ContinuousWithinAt f s a → s ∈ 𝓝[>] a → Tendsto (deriv f) (𝓝[>] a) (𝓝 e) → HasDerivWithinAt f e (Ici a) a` | One-dimensional version for right endpoints: differentiability on `(a, ∞)` + continuity + derivative convergence ⇒ differentiability at `a` from the right. |
| `hasDerivWithinAt_Iic_of_tendsto_deriv` | `∀ {s : Set ℝ} {e : E} {a : ℝ} {f : ℝ → E}, DifferentiableOn ℝ f s → ContinuousWithinAt f s a → s ∈ 𝓝[<] a → Tendsto (deriv f) (𝓝[<] a) (𝓝 e) → HasDerivWithinAt f e (Iic a) a` | One-dimensional version for left endpoints: differentiability on `(-∞, a)` + continuity + derivative convergence ⇒ differentiability at `a` from the left. |
| `hasDerivAt_of_hasDerivAt_of_ne` | `∀ {f g : ℝ → E} {x : ℝ}, (∀ y ≠ x, HasDerivAt f (g y) y) → ContinuousAt f x → ContinuousAt g x → HasDerivAt f (g x) x` | If `f` is differentiable everywhere except possibly at `x`, and both `f` and `g` are continuous at `x`, then `f` is differentiable at `x` with derivative `g x`. |
| `hasDerivAt_of_hasDerivAt_of_ne'` | `∀ {f g : ℝ → E} {x y : ℝ}, (∀ y ≠ x, HasDerivAt f (g y) y) → ContinuousAt f x → ContinuousAt g x → HasDerivAt f (g y) y` | Global version of previous: under same assumptions, `f` has derivative `g y` at *every* `y`. |

> **Note**: The first three theorems are the core results; the last two are corollaries using the first three.

#### **2. Naming Conventions**

- **Prefixes**:
  - `hasFDerivWithinAt_`: for Fréchet differentiability within a set at a point.
  - `hasDerivWithinAt_`: for 1D differentiability within a set at a point.
  - `hasDerivAt_`: for full differentiability at a point.
- **Suffixes**:
  - `_of_tendsto_fderiv`: derivative converges (Fréchet case).
  - `_of_tendsto_deriv`: derivative converges (1D case).
  - `_of_ne`: differentiability holds away from a point.
- **Other patterns**:
  - `Ici`, `Iic`, `Ioo`, `Ioc`, `Icc`: standard interval notation (`[a,∞)`, `(-∞,a]`, `(a,b)`, etc.).
  - `tendsto_nhdsWithin`: filters for one-sided limits.
  - `fderiv`, `deriv`: Fréchet and 1D derivatives, respectively.

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `intro`, `rw`, `simp`, `apply`, `exact`
- `have`, `suffices`, `by_cases`, `push_neg`
- `set`, `obtain`, `refine`, `exact`
- `conv`/`congr`-style reasoning: `gcongr`, `congr'`, `mono`, `mono_of_mem_nhdsWithin`
- `abel` (for algebraic simplifications in additive groups)
- `ring` (implicit via `abel` or `norm_num`)
- `aesop` not present — proofs are highly manual and geometric.
- `closure_prod_eq`, `closure_Ioo`, `isOpen_Ioo`, `convex_Ioo`, etc. — used as rewrite lemmas.

#### **4. Proof Logic**

- **High-level strategy**:
  1. Reduce to a *nice* subdomain (e.g., open interval `t = (a,b)` or `t = (b,a)`) contained in `s`.
  2. Verify assumptions of `hasFDerivWithinAt_closure_of_tendsto_fderiv` on `t`.
  3. Apply the main theorem.
  4. Transfer conclusion back to original set using monotonicity (`mono_of_mem_nhdsWithin`, `mono`).
- **Core analytical step** (in `hasFDerivWithinAt_closure_of_tendsto_fderiv`):
  - Use mean value inequality on convex domain `B ∩ s`.
  - Control `‖fderiv f y - f'‖` via assumption `h`.
  - Reduce to continuity of `f - f'` on `closure s`.
- **Key lemmas used**:
  - `norm_image_sub_le_of_norm_fderivWithin_le'`: mean value inequality.
  - `closure_prod_eq`, `isOpen_ball.inter`, `convex_ball`.
  - `differentiableWithinAt_of_isOpen`, `fderivWithin_eq_fderiv`.

#### **5. Imports & Dependencies**

- **Core imports**:
  ```lean
  import Mathlib.Analysis.Calculus.MeanValue
  ```
- **Implicit dependencies** (via `Mathlib.Analysis.Calculus.MeanValue` and surrounding context):
  - `Mathlib.Analysis.NormedSpace.Basic` (for `NormedAddCommGroup`, `NormedSpace`)
  - `Mathlib.Topology.Basic` (for `Filter`, `Metric`, `ContinuousWithinAt`, `closure`, `nhdsWithin`)
  - `Mathlib.Analysis.Calculus.FDeriv` (for `fderiv`, `HasFDerivWithinAt`)
  - `Mathlib.Analysis.Calculus.Deriv` (for `deriv`, `HasDerivAt`)
  - `Mathlib.Analysis.Calculus.MeanValue` (for mean value inequalities)
  - `Mathlib.Data.Set.Interval` (for interval lemmas like `closure_Ioo`, `Icc_mem_nhdsGE`)
  - `Mathlib.Analysis.Asymptotics` (for `Tendsto`, `isLittleO`, `Asymptotics`)

---

This module formalizes a foundational result in analysis: *differentiability extends to the boundary if the function and its derivative converge*. It is a key ingredient for constructing differentiable extensions and handling endpoint behavior in calculus on Banach spaces.