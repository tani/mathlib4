### Technical Brief: Differentiability of Monotone Functions in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `tendsto_apply_add_mul_sq_div_sub` | `{f : ℝ → ℝ} → {x a c d : ℝ} → {l : Filter ℝ} → l ≤ 𝓝[≠] x → Tendsto (λ y, (f y - d) / (y - x)) l (𝓝 a) → Tendsto (λ y, y + c * (y - x)^2) l l → Tendsto (λ y, (f (y + c * (y - x)^2) - d) / (y - x)) l (𝓝 a)` | Technical lemma to handle small quadratic shifts in difference quotients; used to adjust limits along subfilters (e.g., one-sided). |
| `StieltjesFunction.ae_hasDerivAt` | `(f : StieltjesFunction) → ∀ᵐ x, HasDerivAt f (rnDeriv f.measure volume x).toReal x` | Shows that a Stieltjes function (right-continuous monotone function) is a.e. differentiable, with derivative equal to the Radon–Nikodym derivative of its associated measure w.r.t. Lebesgue. |
| `Monotone.ae_hasDerivAt` | `(f : ℝ → ℝ) → Monotone f → ∀ᵐ x, HasDerivAt f (rnDeriv hf.stieltjesFunction.measure volume x).toReal x` | Extends differentiability to arbitrary monotone functions (not necessarily right-continuous), using a Stieltjes extension and sandwiching arguments. |
| `Monotone.ae_differentiableAt` | `(f : ℝ → ℝ) → Monotone f → ∀ᵐ x, DifferentiableAt ℝ f x` | Immediate corollary: monotone real functions are a.e. differentiable. |
| `MonotoneOn.ae_differentiableWithinAt_of_mem` | `(f : ℝ → ℝ) → {s : Set ℝ} → MonotoneOn f s → ∀ᵐ x, x ∈ s → DifferentiableWithinAt ℝ f s x` | Local version on arbitrary sets (no measurability needed); uses global monotone extension on compact intervals. |
| `MonotoneOn.ae_differentiableWithinAt` | `(f : ℝ → ℝ) → {s : Set ℝ} → MonotoneOn f s → MeasurableSet s → ∀ᵐ x ∂volume.restrict s, DifferentiableWithinAt ℝ f s x` | Measurable-set version using restriction of Lebesgue measure. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `ae_`: Almost everywhere statements (`ae_hasDerivAt`, `ae_differentiableAt`, etc.)
  - `leftLim`, `rightLim`: Left/right limits of functions.
  - `stietjesFunction`: Associated Stieltjes function (right-continuous modification).
  - `rnDeriv`: Radon–Nikodym derivative.

- **Suffixes**:
  - `_at`: Local properties at a point (`differentiableAt`, `hasDerivAt`).
  - `_withinAt`: Local behavior relative to a set (`differentiableWithinAt`).
  - `_le`, `_ge`, `_lt`, `_gt`: One-sided filters (`𝓝[≤]`, `𝓝[>]`, etc.).

- **Helper functions**:
  - `tendsto_*`: Tendsto lemmas (e.g., `tendsto_apply_add_mul_sq_div_sub`)
  - `comp`, `mul`, `congr'`, `mono_left`: Standard tactic-based composition lemmas.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Role |
|--------|------|
| `filter_upwards` | To reduce to properties holding almost everywhere (a.e.) using measure-theoretic filters. |
| `apply Tendsto.congr'` | Replace functions in tendsto statements using eventual equality. |
| `field_simp`, `ring`, `linarith` | Algebraic simplifications and inequalities in real arithmetic. |
| `rw [← ENNReal.ofReal_div_of_pos ...]`, `ENNReal.toReal_ofReal` | Bridge between extended nonnegative reals and reals in measure-theoretic contexts. |
| `gcongr` | Used in `Monotone.ae_hasDerivAt` to lift inequalities through division (with sign control). |
| `have : Tendsto ...`, `apply tendsto_of_tendsto_of_tendsto_of_le_of_le'` | Sandwich arguments for one-sided limits. |
| `nhdsWithin_le_nhds`, `tendsto_nhdsWithin_of_tendsto_nhds_of_eventually_within` | Technical filter manipulations for one-sided convergence. |
| `apply hx.differentiableAt.congr_of_eventuallyEq` | Transfer differentiability via eventual equality on a set. |

---

#### **4. Proof Logic**

- **High-level strategy**:
  1. **Stieltjes case** (`StieltjesFunction.ae_hasDerivAt`):
     - Use `VitaliFamily.ae_tendsto_rnDeriv` to get convergence of `μ([x,y])/(y−x)` to `rnDeriv`.
     - Identify `μ([x,y]) = f(y) − f(x⁻)` and use that `f(x⁻) = f(x)` a.e. (left limits equal function values a.e.).
     - Prove right and left derivative limits separately (`L1`, `L2`), adjusting left limit via quadratic shift (`L3`) to match `(f(y) − f(x))/(y−x)`.
     - Sandwich to get correct left limit (`L4`), then combine via `tendsto_sup`.

  2. **General monotone case** (`Monotone.ae_hasDerivAt`):
     - Reduce to Stieltjes case using `hf.stieltjesFunction`, which agrees with `f` a.e. (at continuity points).
     - Use quadratic shifts again to sandwich `f` between values of the Stieltjes function.
     - Apply same one-sided limit arguments.

  3. **Set-restricted monotonicity**:
     - For arbitrary sets: extend `f` to a global monotone function on compact intervals (via `exists_monotone_extension`).
     - Apply global differentiability and restrict back.
     - For measurable sets: use `ae_restrict_iff'` to reduce to previous case.

- **Core logical pattern**:
  > *Differentiate measure → relate to difference quotients → handle left/right limits → adjust via quadratic perturbations → sandwich to recover original function’s slope.*

---

#### **5. Imports & Dependencies**

| Module | Role |
|--------|------|
| `Mathlib.Analysis.Calculus.Deriv.Slope` | Slope-based differentiability (`HasDerivAt`, `DifferentiableAt`, `slope_fun_def_field`). |
| `Mathlib.MeasureTheory.Covering.OneDim` | Vitali covering theorems, `vitaliFamily`, `VitaliFamily.ae_tendsto_rnDeriv`. |
| `Mathlib.Order.Monotone.Extension` | Monotone extension theorems (used in `MonotoneOn.ae_differentiableWithinAt_of_mem`). |
| `MeasureTheory.Measure` | Radon–Nikodym derivative (`rnDeriv`), Stieltjes measure construction. |
| `Topology.Basic`, `Metric`, `MeasureTheory.Measure` | Filters, neighborhoods (`𝓝`, `𝓝[>]`, `𝓝[<]`, `𝓝[≠]`), continuity, measurability. |

---

#### **Summary**

This formalization demonstrates a classical result in real analysis — *monotone functions are differentiable almost everywhere* — using modern measure-theoretic tools (Radon–Nikodym, Vitali differentiation, Stieltjes measures). The Lean proof is highly structured, with careful handling of one-sided limits, quadratic perturbations, and measure-theoretic almost-everywhere reasoning. The key innovations are:
- Use of `StieltjesFunction` to reduce to right-continuous case.
- Quadratic shift trick (`(y−x)²`) to bridge left/right limits and adjust for discontinuities.
- Sandwich arguments to control error terms in difference quotients.

The code exemplifies Lean’s strength in combining order-theoretic, topological, and measure-theoretic reasoning in a single coherent development.