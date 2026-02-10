### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `slope f x y` | `(y - x)⁻¹ • (f y - f x)` | Generalized slope for functions into normed spaces; avoids division by using scalar multiplication with inverse of `y - x`. |
| `hasDerivAtFilter_iff_tendsto_slope` | `HasDerivAtFilter f f' x L ↔ Tendsto (slope f x) (L ⊓ 𝓟 {x}ᶜ) (𝓝 f')` | Relates Fréchet derivative (via filter-based definition) to limit of slope along punctured neighborhoods. |
| `hasDerivWithinAt_iff_tendsto_slope` | `HasDerivWithinAt f f' s x ↔ Tendsto (slope f x) (𝓝[s \ {x}] x) (𝓝 f')` | Characterizes one-sided/within-set derivatives via slope limits. |
| `hasDerivAt_iff_tendsto_slope` | `HasDerivAt f f' x ↔ Tendsto (slope f x) (𝓝[≠] x) (𝓝 f')` | Classical equivalence: derivative exists iff slope tends to it as `y → x`, `y ≠ x`. |
| `hasDerivAt_iff_tendsto_slope_zero` | `HasDerivAt f f' x ↔ Tendsto (t ↦ t⁻¹ • (f(x + t) - f x)) (𝓝[≠] 0) (𝓝 f')` | Reformulation using translation-invariant variable `t = y - x`. |
| `HasDerivAt.tendsto_slope_zero_right/left` | `Tendsto (t ↦ t⁻¹ • (f(x + t) - f x)) (𝓝[>] 0 / < 0) (𝓝 f')` | One-sided versions of above, for ordered fields. |
| `range_derivWithin_subset_closure_span_image` | `range (derivWithin f s) ⊆ closure (Submodule.span 𝕜 (f '' t))` under density condition | Shows derivative values lie in closure of span of function values on dense subset. |
| `range_deriv_subset_closure_span_image` | Same as above for global derivative (`s = univ`) and dense `t`. | Generalizes previous result to full derivative. |
| `isSeparable_range_derivWithin` / `isSeparable_range_deriv` | `IsSeparable (range (derivWithin f s))` / `(range (deriv f))` | Derivative range is separable if domain is separable (uses countable dense subset). |
| `HasDerivWithinAt.limsup_slope_le` | `f' < r ⇒ ∀ᶠ z ∈ 𝓝[s \ {x}], slope f x z < r` | Upper bound on limsup of slope via derivative. |
| `HasDerivWithinAt.limsup_norm_slope_le` | `‖f'‖ < r ⇒ ∀ᶠ z ∈ 𝓝[s] x, ‖z - x‖⁻¹ * ‖f z - f x‖ < r` | Norm-based upper estimate on rate of change. |
| `HasDerivWithinAt.liminf_right_norm_slope_le` | `∃ᶠ z ∈ 𝓝[>] x, ‖z - x‖⁻¹ * ‖f z - f x‖ < r` | Lower bound on liminf from right. |

#### 2. **Naming Conventions**

- **Prefixes:**
  - `hasDerivAt`, `hasDerivWithinAt`: indicate existence of derivative (at point / within set).
  - `limsup_`, `liminf_`: refer to upper/lower limits of slopes.
  - `tendsto_slope`, `tendsto_slope_zero`: emphasize convergence of slope expressions.
- **Suffixes:**
  - `_right`, `_left`: directional variants (for ordered domains).
  - `_within`, `_within'`: variants for `HasDerivWithinAt` with/without `x ∉ s`.
  - `_filter`: for filter-based derivative definitions.
- **Other patterns:**
  - `slope` used in all slope-related theorems.
  - `norm_slope` for normed-space analogues.
  - `derivWithin`, `deriv`: standard derivative operators.

#### 3. **Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only`: simplification with definitional equalities and lemmas.
- `rw`: rewriting using equivalences like `hasDerivAt_iff_tendsto_slope`.
- `filter_upwards`: for proving filter membership statements.
- `tendsto_congr'`, `tendsto_mono`, `tendsto_comap_iff`: handling convergence of slopes.
- `apply`, `exact`, `refine`: standard proof construction.
- `mem_closure_of_tendsto`, `continuousWithinAt.mem_closure_image`: closure-based arguments.
- `norm`, `norm_smul`, `norm_inv`: norm simplifications.
- `aesop` / `ring`: likely used implicitly (not explicitly shown here but standard in Mathlib).
- `cases` / `rcases`: for case analysis on `eq_or_neBot`, `lt`, etc.

#### 4. **Proof Logic**

- **Core strategy**: Translate derivative existence (`HasDerivAt`, `HasDerivWithinAt`) into convergence of slope expressions using `tendsto` criteria.
- **Common pattern**:
  1. Use `hasDerivAtFilter_iff_tendsto_slope` to convert derivative condition to slope convergence.
  2. Simplify slope expression using algebraic identities (`slope_def_module`, `inv_smul_smul₀`).
  3. Adjust filters (e.g., punctured neighborhoods via `𝓟 {x}ᶜ`, `𝓝[≠] x`, `𝓝[s \ {x}]`).
  4. Apply continuity, closure, or density assumptions to relate to image of dense subsets.
- **Inductive/density arguments**:
  - Use `mem_closure_iff_nhdsWithin_neBot` to handle non-isolated points.
  - Use `range_derivWithin_subset_closure_span_image` to propagate derivative info from dense subsets.
- **Metric/norm estimates**:
  - Use `norm_smul`, `norm_sub_norm_le`, `inv_nonneg` to bound ratios like `‖f z - f x‖ / ‖z - x‖`.

#### 5. **Imports**

- `Mathlib.Analysis.Calculus.Deriv.Basic`: foundational derivative theory (Fréchet, chain rule, etc.).
- `Mathlib.LinearAlgebra.AffineSpace.Slope`: definition and basic properties of `slope` in affine/normed settings.

These imports indicate the module sits at the intersection of:
- **Calculus on normed spaces** (Fréchet derivative, chain rule),
- **Affine geometry** (slope as affine difference quotient),
- **Topology & filters** (convergence, neighborhoods, closure, density),
- **Measure-theoretic/structural properties** (separability, closure of submodules).