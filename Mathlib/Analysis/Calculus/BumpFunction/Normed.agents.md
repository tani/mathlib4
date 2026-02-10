### Technical Brief: `ContDiffBump.normed` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `normed` | `ContDiffBump c → Measure E → E → ℝ` | Normalizes a bump function `f` so its integral w.r.t. `μ` is 1. |
| `normed_def` | `f.normed μ x = f x / ∫ x, f x ∂μ` | Definition of normalization (by division by total mass). |
| `nonneg_normed` | `0 ≤ f.normed μ x` | Positivity of the normalized bump function. |
| `contDiff_normed` | `ContDiff ℝ n (f.normed μ)` | Smoothness is preserved under normalization. |
| `continuous_normed` | `Continuous (f.normed μ)` | Continuity follows from smoothness. |
| `normed_sub` | `f.normed μ (c - x) = f.normed μ (c + x)` | Symmetry about center `c` (for symmetric bump). |
| `normed_neg` | `f.normed μ (-x) = f.normed μ x` | Evenness when `c = 0`. |
| `integrable_normed` | `Integrable (f.normed μ) μ` | Normalized bump is integrable. |
| `integral_normed` | `∫ x, f.normed μ x ∂μ = 1` | Key normalization property. |
| `support_normed_eq` | `Function.support (f.normed μ) = Metric.ball c f.rOut` | Support of normalized bump equals original support. |
| `tsupport_normed_eq` | `tsupport (f.normed μ) = Metric.closedBall c f.rOut` | Topological support is the closed ball. |
| `hasCompactSupport_normed` | `HasCompactSupport (f.normed μ)` | Compact support preserved. |
| `tendsto_support_normed_smallSets` | Convergence of supports to `c` as radii → 0 | Used for approximation arguments. |
| `integral_normed_smul` | `∫ x, f.normed μ x • z ∂μ = z` | Integral of normalized bump against constant vector-valued function recovers the vector. |
| `measure_closedBall_le_integral` | `(μ (closedBall c f.rIn)).toReal ≤ ∫ f ∂μ` | Lower bound on integral via inner ball measure. |
| `normed_le_div_measure_closedBall_rIn` | `f.normed μ x ≤ 1 / μ(closedBall c f.rIn)` | Pointwise upper bound using inner ball. |
| `integral_le_measure_closedBall` | `∫ f ∂μ ≤ (μ (closedBall c f.rOut)).toReal` | Upper bound on integral via outer ball. |
| `measure_closedBall_div_le_integral` | `(μ (closedBall c f.rOut)).toReal / K^d ≤ ∫ f ∂μ` | Lower bound under scaling condition `rOut ≤ K·rIn`, using Haar measure. |
| `normed_le_div_measure_closedBall_rOut` | `f.normed μ x ≤ K^d / μ(closedBall c f.rOut)` | Pointwise bound under scaling condition. |

> **Notation**: `d = finrank ℝ E`, `rIn`, `rOut` are inner/outer radii of bump function `f`.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `normed_`: Pertains to normalized bump function (`normed_def`, `normed_sub`, `normed_neg`, etc.)
  - `integral_`: Relates to integrals of bump or normalized bump (`integral_pos`, `integral_normed`, `integral_normed_smul`, etc.)
  - `measure_`: Relates measures of balls to integrals (`measure_closedBall_le_integral`, `measure_closedBall_div_le_integral`)
  - `support_`: Describes support properties (`support_normed_eq`, `tsupport_normed_eq`)
  - `hasCompactSupport_`: Property of compact support (`hasCompactSupport_normed`)
  - `tendsto_..._smallSets`: Convergence of supports in the small-sets filter.

- **Suffixes**:
  - `_normed`: Refers to normalized version.
  - `_rIn`, `_rOut`: Distinguishes inner vs outer radius bounds.
  - `_le_integral`, `_div_le_integral`: Inequality direction and normalization context.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp_rw` | Rewriting with definitional equalities (e.g., `normed_def`, `f.sub`, `f.neg`) |
| `rw` | Standard rewriting (e.g., `support_div`, `integral_smul`) |
| `gcongr` | Generalized congruence for inequalities (used repeatedly in bounding integrals/pointwise values) |
| `exact`, `apply`, `refine` | Proof construction |
| `div_le_iff₀`, `div_lt_div_iff₀`, `mul_pos_iff` | Algebraic manipulation of inequalities involving division/multiplication |
| `setIntegral_congr_fun`, `setIntegral_mono`, `setIntegral_eq_integral_of_forall_compl_eq_zero` | Handling integrals over restricted domains |
| `integral_smul`, `integral_smul_const` | Pulling scalars/vectors out of integrals |
| `pow_pos`, `mul_pos_iff` | Positivity reasoning for powers and products |
| `isCompact_closedBall`, `isClosed_ball`, `closure_ball` | Topological facts about balls |
| `measure_closedBall_pos`, `measure_closedBall_lt_top` | Measure-theoretic facts about balls under Haar/locally finite measures |

---

#### **4. Proof Logic**

- **Structure**: Proofs follow a pattern of:
  1. **Reduction to definitions** via `simp_rw` (e.g., unfolding `normed`, `support`, `tsupport`)
  2. **Algebraic simplification** using properties of integrals (linearity, positivity, change of domain)
  3. **Inequality chaining** (`calc` blocks) with `gcongr`, `le_trans`, `mul_comm`, etc.
  4. **Measure-theoretic lemmas** (e.g., `integral_pos_iff_support_of_nonneg`, `addHaar_closedBall'`)
  5. **Topological facts** (e.g., compactness of closed balls, closure of open balls)
  6. **Scaling arguments** under assumptions like `rOut ≤ K·rIn`, often reducing to homogeneity of Haar measure.

- **Common proof patterns**:
  - *Normalization*: Show denominator > 0 (`integral_pos`), then apply `inv_mul_cancel₀`.
  - *Support preservation*: Use `support_div`, `support_const`, and known support of `f`.
  - *Bounding pointwise values*: Combine `f.le_one`, `measure_closedBall_le_integral`, and positivity of denominator.
  - *Haar measure scaling*: Use `addHaar_closedBall'` and homogeneity: `μ(B(0, r)) = r^d μ(B(0,1))`.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.Calculus.BumpFunction.Basic` | Core bump function theory (`ContDiffBump`, `rIn`, `rOut`, `ContDiffBump.c`, etc.) |
| `Mathlib.MeasureTheory.Integral.SetIntegral` | Set integrals and monotonicity/congruence lemmas |
| `Mathlib.MeasureTheory.Measure.Lebesgue.EqHaar` | Equivalence of Lebesgue measure and Haar measure on `ℝⁿ`, including `addHaar_closedBall'` |

**Domain**: Analysis on finite-dimensional real normed spaces (`E`), with emphasis on:
- Smooth bump functions,
- Normalization for probability-like behavior,
- Interaction between measure theory (Haar/Lebesgue), topology (balls, supports), and calculus (`ContDiff`).

**Assumptions**:
- `E` has `ContDiffBump` structure (i.e., admits smooth bump functions),
- Measurable space + Borel structure + finite-dimensionality for Haar equivalence,
- Local finiteness / openness of measure for positivity of ball measures.

---

Let me know if you'd like a diagram of dependencies or a summary of how `normed` fits into larger constructions (e.g., mollifiers, partitions of unity).