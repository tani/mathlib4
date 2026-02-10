Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Convexity and Derivatives in Lean 4**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `MonotoneOn.convexOn_of_deriv` | `Convex ℝ D → ContinuousOn f D → DifferentiableOn f (interior D) → MonotoneOn (deriv f) (interior D) → ConvexOn ℝ D f` | If `f'` is monotone on `interior D`, then `f` is convex on `D`. |
| `AntitoneOn.concaveOn_of_deriv` | Similar to above, with `AntitoneOn` and `ConcaveOn` | If `f'` is antitone on `interior D`, then `f` is concave on `D`. |
| `StrictMonoOn.strictConvexOn_of_deriv` | `Convex ℝ D → ContinuousOn f D → StrictMonoOn (deriv f) (interior D) → StrictConvexOn ℝ D f` | Strict monotonicity of `f'` on `interior D` implies strict convexity of `f`. |
| `StrictAntiOn.strictConcaveOn_of_deriv` | Dual of above | Strict antitonicity of `f'` implies strict concavity. |
| `convexOn_of_deriv2_nonneg` | `Convex ℝ D → ContinuousOn f D → DifferentiableOn f (interior D) → DifferentiableOn (deriv f) (interior D) → (∀ x ∈ interior D, 0 ≤ deriv^[2] f x) → ConvexOn ℝ D f` | Nonnegative second derivative ⇒ convexity. |
| `concaveOn_of_deriv2_nonpos` | Dual of above | Nonpositive second derivative ⇒ concavity. |
| `strictConvexOn_of_deriv2_pos` | `Convex ℝ D → ContinuousOn f D → (∀ x ∈ interior D, 0 < deriv^[2] f x) → StrictConvexOn ℝ D f` | Positive second derivative ⇒ strict convexity. |
| `strictConcaveOn_of_deriv2_neg` | Dual of above | Negative second derivative ⇒ strict concavity. |
| `ConvexOn.monotoneOn_deriv` | `ConvexOn ℝ S f → (∀ x ∈ S, DifferentiableAt ℝ f x) → MonotoneOn (deriv f) S` | Convex + differentiable ⇒ derivative is monotone. |
| `ConvexOn.deriv_le_slope` | `ConvexOn ℝ S f → x ∈ S → y ∈ S → x < y → DifferentiableAt ℝ f x → deriv f x ≤ slope f x y` | Derivative at left endpoint ≤ secant slope. |
| `ConvexOn.slope_le_deriv` | `ConvexOn ℝ S f → x ∈ S → y ∈ S → x < y → DifferentiableAt ℝ f y → slope f x y ≤ deriv f y` | Secant slope ≤ derivative at right endpoint. |
| `ConvexOn.monotoneOn_derivWithin` | `ConvexOn ℝ S f → DifferentiableOn f S → MonotoneOn (derivWithin f S) S` | Derivative *within* `S` is monotone if `f` is convex and differentiable on `S`. |
| `StrictConvexOn.lt_slope_of_hasDerivWithinAt_Ioi` | `StrictConvexOn ℝ S f → x ∈ S → y ∈ S → x < y → HasDerivWithinAt f f' (Ioi x) x → f' < slope f x y` | Strict convexity ⇒ derivative < secant slope (left endpoint). |

#### **2. Naming Conventions**

- **Prefixes**:
  - `convexOn_`, `concaveOn_`, `strictConvexOn_`, `strictConcaveOn_`: indicate convexity/concavity properties.
  - `deriv`, `derivWithin`, `deriv^[2]`: denote derivatives (first, within-set, second).
  - `slope`: used for secant slope expressions.
  - `mono`, `anti`, `strictMono`, `strictAnti`: denote monotonicity variants.
- **Suffixes**:
  - `_of_deriv`, `_of_deriv2`: indicate the derivative condition used as hypothesis.
  - `_le_slope`, `slope_le_`: indicate inequality direction relative to secant slope.
  - `_univ`: for global results on `ℝ`.
  - `_within`, `_at`: for local/directional differentiability.

#### **3. Tactic Stack**

- **Core tactics**:
  - `intro`, `rw`, `rcases`, `obtain`, `exact`, `apply`, `refine`
  - `simp_rw`, `dsimp`, `convert`, `linarith`, `aesop`
- **Analysis-specific**:
  - `interior_subset`, `interior_interior`, `Icc_subset_Icc_*`, `Ioo_subset_Icc_self`
  - `mem_nhdsGT`, `mem_nhdsLT`, `ordConnected.out`, `ordConnected.ou`
  - `hasDerivWithinAt_iff_tendsto_slope'`, `hasDerivAt_iff_tendsto_slope'`
  - `differentiableAt_of_deriv_ne_zero`, `differentiableWithinAt`, `differentiableOn_congr`
  - `eventually_lt_nhds`, `eventually_gt_nhds`, `filter_upwards`
- **Algebraic simplification**:
  - `mul_lt_mul`, `lt_div_iff₀`, `div_lt_iff₀`, `sub_pos`, `sub_neg`, `le_of_tendsto`, `ge_of_tendsto`

#### **4. Proof Logic**

- **Structure**:
  - Most proofs follow a **two-step pattern**:
    1. **Local analysis**: Use Mean Value Theorem (`exists_deriv_eq_slope`) or its variants to relate slopes and derivatives on subintervals.
    2. **Monotonicity comparison**: Apply monotonicity/antitonicity of `deriv f` (or `deriv^[2] f`) to compare slopes at endpoints.
  - For strict convexity/concavity, auxiliary points are introduced via `exists_between` to separate intervals and apply strict inequalities.
- **Induction/Case analysis**:
  - Rarely used directly; instead, proofs rely on **order-theoretic properties** of `ℝ` (e.g., `ordConnected`, `Icc`, `Ioo`).
  - Common case split: `eq_or_lt_of_le` for handling equality vs. strict inequality in monotonicity arguments.
- **Differentiability handling**:
  - Often deduced from derivative existence (e.g., `differentiableAt_of_deriv_ne_zero`).
  - `HasDerivWithinAt` and `HasDerivAt` are used to bridge local differentiability and derivative values.

#### **5. Imports & Scope**

- **Primary imports**:
  - `Mathlib.Analysis.Calculus.MeanValue`: for Mean Value Theorem and slope–derivative relations.
  - `Mathlib.Analysis.Convex.Slope`: for slope-based convexity criteria (`slope_mono_adjacent`, etc.).
- **Scope**:
  - Focuses on **real-valued functions on subsets of `ℝ`**.
  - Central objects: convex/concave/strictly convex/concave functions, monotone/antitone derivatives, and second-derivative tests.
  - Uses `ContinuousOn`, `DifferentiableOn`, `DifferentiableAt`, `deriv`, `derivWithin`, `slope`, `interior`, `ConvexOn`, `StrictConvexOn`, etc.

---

This brief captures the formalization’s logical architecture, naming discipline, and proof methodology—ideal for training a domain-specific AI agent in real analysis and convex geometry.