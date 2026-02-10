Here's a **structured technical brief** extracted from the provided Lean 4 file, focusing on the formalization of the **Cauchy integral formula** and related results in `Mathlib`:

---

### 🔹 **Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `integral_boundary_rect_of_hasFDerivAt_real_off_countable` | Relates the contour integral over the boundary of a rectangle to the integral of the $\bar{z}$-derivative over its interior, assuming real differentiability off a countable set. |
| `integral_boundary_rect_eq_zero_of_differentiable_on_off_countable` | **Cauchy–Goursat for rectangles**: If $f$ is complex differentiable off a countable set and continuous on the closed rectangle, then its contour integral over the boundary is zero. |
| `circleIntegral_sub_center_inv_smul_eq_of_differentiable_on_annulus_off_countable` | Equality of integrals over inner and outer circles of an annulus for functions differentiable off a countable set. |
| `circleIntegral_sub_center_inv_smul_of_differentiable_on_off_countable_of_tendsto` | **Cauchy integral formula at center**: If $f$ tends to $y$ at $c$, then $\oint_{|z-c|=R} \frac{f(z)}{z-c}\,dz = 2\pi i \cdot y$. |
| `circleIntegral_sub_center_inv_smul_of_differentiable_on_off_countable` | Special case of above when $f$ is continuous at $c$: $\oint_{|z-c|=R} \frac{f(z)}{z-c}\,dz = 2\pi i \cdot f(c)$. |
| `circleIntegral_eq_zero_of_differentiable_on_off_countable` | Cauchy–Goursat for disks: $\oint_{|z-c|=R} f(z)\,dz = 0$ under same hypotheses. |
| `circleIntegral_sub_inv_smul_of_differentiable_on_off_countable_aux` | Auxiliary version of Cauchy integral formula assuming $w \notin s$ (countable non-differentiability set). |
| `two_pi_I_inv_smul_circleIntegral_sub_inv_smul_of_differentiable_on_off_countable` | **Full Cauchy integral formula**: $\frac{1}{2\pi i} \oint_{|z-c|=R} \frac{f(z)}{z-w}\,dz = f(w)$ for $w$ in the open disk. |
| `hasFPowerSeriesOnBall_of_differentiable_off_countable` | If $f$ is continuous on closed disk and differentiable off a countable set in the interior, then $f$ is analytic on the open disk, with coefficients given by Cauchy integrals. |
| `DifferentiableOn.hasFPowerSeriesOnBall` | Stronger version: if $f$ is differentiable on the *closed* disk, then it has a convergent power series on the open disk. |
| `DifferentiableOn.analyticAt`, `Differentiable.analyticAt` | Consequence: complex differentiability on a neighborhood implies analyticity at that point. |
| `Differentiable.hasFPowerSeriesOnBall` | Entirely differentiable functions have global power series expansions (infinite radius of convergence). |

---

### 🔹 **Naming Conventions**

- **Prefixes**:
  - `integral_boundary_`: integrals over boundaries of rectangles.
  - `circleIntegral_`: integrals over circles (i.e., `∮`).
  - `hasFPowerSeriesOnBall_`: existence of power series expansions.
  - `differentiable_`, `differentiableOn_`: differentiability assumptions.
  - `off_countable`: allows non-differentiability on a countable set.

- **Suffixes**:
  - `_of_differentiable_on_off_countable`: main version allowing countable exceptions.
  - `_aux`: auxiliary lemmas used in proofs.
  - `_of_tendsto`: version using limit behavior (e.g., at a puncture).
  - `_smul`: integrals involving scalar multiplication `(z - c)⁻¹ • f z`.

- **Operators**:
  - `•`: scalar multiplication in Banach space over ℂ.
  - `⁻¹`: multiplicative inverse (used for $(z - c)^{-1}$).
  - `I`: `Complex.I`, the imaginary unit.

---

### 🔹 **Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Role |
|--------|------|
| `simp`, `simp_rw` | Simplification and rewriting using definitional equalities. |
| `exact`, `refine`, `apply` | Goal-directed proof construction. |
| `congr` | Congruence reasoning (e.g., equality of integrals). |
| `calc` | Chain of equalities (common in analysis). |
| `have`, `suffices` | Intermediate claims and proof restructuring. |
| `rw [← ...]` | Rewriting with reversed equalities (e.g., to introduce or eliminate inverses). |
| `field_simp`, `ac_rfl` | Field simplification and algebraic simplification. |
| `lift` | Lifting to nonnegative reals (e.g., radius $R \ge 0$). |
| `EMetric`, `Metric` | Working with metric/topological structures. |
| `continuousOn.comp`, `continuousAt`, `differentiableAt.comp` | Propagating continuity/differentiability. |
| `mem_nhds`, `tendsto_iff` | Filter-based reasoning (e.g., limits near punctures). |

---

### 🔹 **Proof Logic & Strategy**

1. **Reduction to divergence theorem**:
   - Use a general divergence theorem for functions differentiable off a countable set.
   - Translate complex function $f : ℂ → E$ to $F : ℝ² → E$ via `equivRealProdCLM`.
   - Express contour integrals as line integrals over rectangle edges.

2. **Cauchy–Goursat for rectangles**:
   - Show $\oint_{\partial R} f(z)\,dz = \iint_R \frac{\partial f}{\partial \bar{z}}\,dA$.
   - If $f$ is complex-differentiable, $\frac{\partial f}{\partial \bar{z}} = 0$, so boundary integral vanishes.

3. **Annulus & disk generalizations**:
   - Use change of variables $z = c + e^w$ to map annulus to rectangle.
   - Apply rectangle result to $f(c + e^w)$ to get equality of circle integrals.

4. **Limit arguments**:
   - Let inner radius $r \to 0^+$ to get Cauchy integral formula at center.
   - Use continuity and density to extend from $w \notin s$ to all $w$ in the ball.

5. **Analyticity**:
   - Use Cauchy integral formula to define power series coefficients.
   - Apply `hasFPowerSeriesOn_cauchy_integral` to show convergence.

---

### 🔹 **Imports & Dependencies**

| Module | Role |
|--------|------|
| `Mathlib.Analysis.Analytic.Uniqueness` | Uniqueness of analytic continuation. |
| `Mathlib.Analysis.Calculus.DiffContOnCl` | Differentiability and continuity on closures. |
| `Mathlib.Analysis.Calculus.DSlope` | Slope function `dslope f w z = (f z - f w)/(z - w)`. |
| `Mathlib.Analysis.Calculus.FDeriv.Analytic` | Fréchet derivative and analyticity. |
| `Mathlib.Analysis.Complex.ReImTopology` | Topology of ℂ as ℝ². |
| `Mathlib.Data.Real.Cardinality` | Countability lemmas. |
| `Mathlib.MeasureTheory.Integral.CircleIntegral` | Circle integrals (`∮`). |
| `Mathlib.MeasureTheory.Integral.DivergenceTheorem` | General divergence theorem (key for Cauchy–Goursat). |
| `Mathlib.MeasureTheory.Measure.Lebesgue.Complex` | Lebesgue measure on ℂ. |

---

### 🔹 **Summary**

This file formalizes the **Cauchy integral formula** and its consequences in a highly general setting: functions $f : ℂ → E$ into a **complex Banach space** with **second countable topology**, assuming differentiability **off a countable set**. The proofs rely on:
- A **measure-theoretic divergence theorem** for functions with countably many non-differentiable points.
- **Change of variables** (exponential map) to reduce annular integrals to rectangular ones.
- **Continuity + density arguments** to remove auxiliary assumptions (e.g., $w \notin s$).
- **Power series theory** to deduce analyticity.

The formalization is robust, reusable, and aligns with modern `Mathlib` conventions for analysis in Banach spaces.

--- 

Let me know if you'd like a **diagram of dependencies**, **proof sketch in natural language**, or **extraction of key lemmas for automation** (e.g., for `simp` or `aesop`).