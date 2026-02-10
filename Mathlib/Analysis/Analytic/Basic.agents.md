Here's a structured technical brief extracted from the provided Lean 4 file on **analytic functions and formal multilinear series**:

---

### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `FormalMultilinearSeries.sum p x` | `∑' n, p n fun _ => x` — the infinite sum of a formal multilinear series applied to `x`. |
| `FormalMultilinearSeries.partialSum p n x` | `∑ k ∈ Finset.range n, p k fun _ => x` — finite partial sum up to degree `n−1`. |
| `FormalMultilinearSeries.radius p` | `⨆_{r, C, ∀n, ‖p n‖ rⁿ ≤ C} r` — the radius of convergence: largest `r` such that `‖p n‖ rⁿ` is bounded. |
| `HasFPowerSeriesOnBall f p x r` | `f(x + y) = ∑' pₙ yⁿ` for all `‖y‖ < r`, with `r ≤ p.radius` and `r > 0`. |
| `HasFPowerSeriesAt f p x` | `∃ r > 0, HasFPowerSeriesOnBall f p x r` — `f` has a convergent power series expansion near `x`. |
| `AnalyticAt 𝕜 f x` | `∃ p, HasFPowerSeriesAt f p x` — `f` is analytic at `x`. |
| `AnalyticWithinAt 𝕜 f s x` | `∃ p, HasFPowerSeriesWithinAt f p s x` — `f` has a power series converging within set `s` at `x`. |
| `AnalyticOnNhd 𝕜 f s` | `∀ x ∈ s, AnalyticAt 𝕜 f x` — `f` analytic on neighborhood of every point in `s`. |
| `AnalyticOn 𝕜 f s` | `∀ x ∈ s, AnalyticWithinAt 𝕜 f s x` — `f` analytic within `s` at each point of `s`. |

#### Key Theorems:
- `le_radius_of_bound`, `le_radius_of_isBigO`, `lt_radius_of_isBigO`: relate growth bounds of `‖p n‖ rⁿ` to radius.
- `isLittleO_of_lt_radius`, `norm_mul_pow_le_mul_pow_of_lt_radius`: exponential decay of coefficients below radius.
- `radius_eq_top_of_summable_norm`, `radius_eq_top_of_eventually_eq_zero`: sufficient conditions for infinite radius.
- `summable_norm_apply`, `hasSum`: convergence of series inside radius of convergence (in complete codomain).
- `min_radius_le_radius_add`: radius of sum ≥ min of radii.
- `HasFPowerSeriesOnBall.continuousOn`, `HasFPowerSeriesAt.continuousAt`, `AnalyticAt.continuousAt`: analytic ⇒ continuous.

---

### **2. Naming Conventions**

- **Prefixes**:
  - `le_`, `lt_`, `not_`, `eventually_`, `norm_`, `nnnorm_`, `isLittleO_`, `isBigO_`, `hasSum_`, `hasFPowerSeries_`, `analytic_`, `radius_`, `partialSum_`, `constFormalMultilinearSeries_`, `compFormalMultilinearSeries_`, `shift_`, `unshift_`, `min_`, `zero_`, `neg_`.
- **Suffixes**:
  - `_onBall`, `_withinOnBall`, `_at`, `_withinAt`, `_onNhd`, `_on`, `_of_`, `_of_lt_`, `_of_pos_`, `_of_eventually_`, `_of_summable_`, `_congr`, `_mono`, `_unique`, `_comp_sub`, `_hasSum_sub`.
- **Adjectives**:
  - `nonneg`, `pos`, `lt`, `le`, `eventually`, `isBigO`, `isLittleO`, `summable`, `bounded`, `continuous`, `analytic`.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp`, `simp only`, `simp_rw`
- `rw`, `rwa`, `convert`, `abel`
- `gcongr`, `linarith`, `norm_num`, `field_simp`, `div_le_iff₀`, `pow_pos`, `mul_nonneg`
- `rcases`, `cases'`, `obtain`, `refine`, `exact`
- `apply`, `intro`, `intro!`, `funext`, `ext`
- `tsub_add_cancel_of_le`, `eq_of_le_of_le`, `le_of_forall_nnreal_lt`, `lt_of_lt_of_le`
- `filter_upwards`, `mem_of_superset`, `eventually_and`, `eventually_of_forall`
- `push_cast`, `mod_cast`, `lift`, `norm_cast`
- `tfae_*`, `TFAE_exists_lt_isLittleO_pow`
- ` continuity`, ` continuity'`, ` continuity_at`

---

### **4. Proof Logic & Strategy**

- **Radius analysis**: Often reduces to bounding `‖p n‖ rⁿ`, using `isBigO`, `isLittleO`, or summability criteria.
- **Radius comparisons**: Use `le_of_forall_nnreal_lt`, `lt_iff_exists_nnreal_btwn`, `ENNReal` lemmas.
- **Convergence proofs**: Use `summable_of_le`, `summable_geometric_of_lt_one`, `of_norm`, `hasSum`, `completeSpace`.
- **Uniqueness**: Use `hasSum.unique`, `HasFPowerSeriesWithinOnBall.unique`, `HasFPowerSeriesOnBall.unique`.
- **Continuity**: Follows from uniform convergence on compact subsets inside radius (via `continuousOn`, `continuousAt` lemmas).
- **Induction / cases**: Used in `partialSum_continuous`, `radius_shift`, `radius_unshift`.
- **Change of variables**: `comp_sub`, `hasSum_sub`, `congr`, `congr'` lemmas for translating power series.

---

### **5. Imports & Scope**

**Core dependencies**:
- `Mathlib.Algebra.Order.Star.Basic`
- `Mathlib.Analysis.Calculus.FormalMultilinearSeries`
- `Mathlib.Analysis.SpecificLimits.Normed`
- `Mathlib.Logic.Equiv.Fin`
- `Mathlib.Tactic.Bound.Attribute`
- `Mathlib.Topology.Algebra.InfiniteSum.Module`

**Scope**:
- General theory of analytic functions in normed vector spaces over nontrivially normed fields.
- Works in arbitrary (possibly infinite) dimensions.
- Does **not** assume symmetry or uniqueness of multilinear coefficients.
- Designed to support applications like exponential of bounded operators and inverse on invertible operators.

---

Let me know if you'd like a diagram of the logical dependencies or a summary of the `Within`-variant definitions (e.g., `AnalyticWithinAt`, `AnalyticOn`) in more detail.