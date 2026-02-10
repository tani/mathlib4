### Technical Metadata Brief: L’Hôpital’s Rule for 0/0 Indeterminate Forms (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `HasDerivAt.lhopital_zero_right_on_Ioo` | `a < b → (∀ x ∈ Ioo a b, HasDerivAt f (f' x) x) → (∀ x ∈ Ioo a b, HasDerivAt g (g' x) x) → (∀ x ∈ Ioo a b, g' x ≠ 0) → Tendsto f (𝓝[>] a) (𝓝 0) → Tendsto g (𝓝[>] a) (𝓝 0) → Tendsto (f' / g') (𝓝[>] a) l → Tendsto (f / g) (𝓝[>] a) l` | Core interval-based right-hand L’Hôpital rule using `HasDerivAt`. Proven via Cauchy’s mean value theorem on subintervals `Ioo a x`. |
| `HasDerivAt.lhopital_zero_right_on_Ico` | Similar to above, but assumes continuity on `Ico a b` and `f a = g a = 0`. | Extends `Ioo` version to half-closed interval using continuity at `a`. |
| `HasDerivAt.lhopital_zero_left_on_Ioo` | Analogous to right version, but for left limit at `b`. | Proven by composing with `Neg.neg` and reducing to right version. |
| `HasDerivAt.lhopital_zero_left_on_Ioc` | Left version on `Ioc a b`, with `f b = g b = 0`. | Similar to `Ico` case, via continuity at `b`. |
| `HasDerivAt.lhopital_zero_atTop_on_Ioi` | For limits as `x → +∞`, on `Ioi a`. | Uses composition with `Inv.inv` (i.e., `x ↦ 1/x`) to reduce to right limit at 0. |
| `HasDerivAt.lhopital_zero_atBot_on_Iio` | For limits as `x → -∞`, on `Iio a`. | Uses `Neg.neg` + `atTop` version. |
| `HasDerivAt.lhopital_zero_nhds_right` | Same as `Ioo` right version, but conditions hold *eventually* in `𝓝[>] a`. | Generic version: avoids explicit interval by using filter-based eventual conditions. |
| `HasDerivAt.lhopital_zero_nhds_left` | Left-hand generic version. | Analogous to right, using `𝓝[<] a`. |
| `HasDerivAt.lhopital_zero_nhds'` | Two-sided version on punctured neighborhood `𝓝[≠] a`. | Combines left/right versions via union decomposition of `𝓝[≠] a`. |
| `HasDerivAt.lhopital_zero_nhds` | Full two-sided version on `𝓝 a`, conclusion in `𝓝[≠] a`. | Standard L’Hôpital statement for real limit point `a`. |
| `HasDerivAt.lhopital_zero_atTop`, `atBot` | Generic versions for infinite limits. | Derived from interval-based ones via change of variables. |
| `deriv.lhopital_zero_*` (all variants) | Same as above, but assumes `DifferentiableOn`/`DifferentiableAt` and uses `deriv f`, `deriv g`. | Convenience versions for calculus applications where differentiability is given in terms of `deriv`. |

> **Note**: All theorems are available in two namespaces: `HasDerivAt` (explicit derivative existence) and `deriv` (differentiability + `deriv` usage). The `deriv` versions reduce to `HasDerivAt` ones via `DifferentiableAt.hasDerivAt`.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `lhopital_zero_`: Core pattern for all L’Hôpital 0/0 theorems.
  - `right` / `left`: Direction of approach (`a+`, `b−`, `+∞`, `−∞`).
  - `Ioo`, `Ico`, `Ioc`, `Ioi`, `Iio`: Interval type in assumptions.
  - `nhds`, `atTop`, `atBot`: Filter type for limits.
- **Suffixes**:
  - `_on_I...`: Explicit interval version.
  - `_nhds...`: Generic (eventual) version.
  - `_right`, `_left`, `_atTop`, `_atBot`: Limit direction.
- **Namespace**:
  - `HasDerivAt.*`: Uses `HasDerivAt` hypotheses.
  - `deriv.*`: Uses `DifferentiableAt`/`DifferentiableOn` and `deriv`.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `rw`, `simp`, `field_simp`, `simp only`, `simp_rw`
  - `apply`, `exact`, `intro`, `cases`, `rcases`, `obtain`
  - `have`, `set`, `let`, `refine`, `apply_assumption`
  - `first | ... | ...`: Branching on goals.
  - `by_contradiction`, `contradiction`
  - `linarith`, `assumption`, `apply_congr`, `tendsto_*` lemmas
- **Specialized**:
  - `tendsto_nhdsWithin_of_tendsto_nhds`, `tendsto_of_tendsto_of_tendsto_of_le_of_le'`
  - `eventually_nhdsWithin_of_forall`, `eventually_iff_exists_mem`
  - `neg_Ioo`, `neg_Iio`, `inv_pos`, `inv_ne_zero`, `pow_ne_zero`, etc. (algebraic rewrites)
  - `comp`, `hasDerivAt_neg`, `hasDerivAt_inv`: Chain rule lemmas.

---

#### **4. Proof Logic**

- **Structure**:
  1. **Reduction to canonical case** (`Ioo`, right limit at `a`) via:
     - Change of variables (`Neg.neg`, `Inv.inv`) for left/infinite cases.
     - Continuity extension for `Ico`/`Ioc`.
  2. **Interval-based proof** (`lhopital_zero_right_on_Ioo`):
     - Prove `g(x) ≠ 0` on `Ioo a b` (via Rolle’s lemma contradiction).
     - Apply **Cauchy’s mean value theorem** (`exists_ratio_hasDerivAt_eq_ratio_slope'`) to get `c ∈ Ioo a x` with `f(x)g'(c) = g(x)f'(c)`.
     - Define `c(x)` via choice.
     - Show `f(x)/g(x) = f'(c(x))/g'(c(x))`.
     - Use `c(x) → a⁺` as `x → a⁺` to transfer limit via composition.
  3. **Generic versions**:
     - Extract an interval where all conditions hold (via `eventually_iff_exists_mem`).
     - Apply interval version on that interval.
  4. **`deriv` versions**:
     - Lift `DifferentiableAt` to `HasDerivAt` via `DifferentiableAt.hasDerivAt`.
     - Handle `deriv g ≠ 0` by contradiction if `g` not differentiable.

- **Key lemmas used**:
  - `exists_hasDerivAt_eq_zero'` (Rolle)
  - `exists_ratio_hasDerivAt_eq_ratio_slope'` (Cauchy MVT)
  - `tendsto_nhdsWithin_congr`, `tendsto.comp`, `tendsto_nhdsWithin_of_tendsto_nhds`
  - `neg_Ioo`, `neg_Iio`, `neg_Ioc`, `neg_Ioi`, `inv_pos`, `inv_ne_zero`, `pow_ne_zero`

---

#### **5. Imports**

- `Mathlib.Analysis.Calculus.MeanValue`: Provides Cauchy MVT (`exists_ratio_hasDerivAt_eq_ratio_slope'`) and Rolle’s theorem.
- `Mathlib.Analysis.Calculus.Deriv.Inv`: Provides derivative of inverse function (`hasDerivAt_inv`), needed for `atTop`/`atBot` via `x ↦ 1/x`.

> **Scope**: Formalization of real analysis, specifically differential calculus and filter-based limit theory. Fully within `ℝ`-based topology and analysis.

--- 

Let me know if you'd like a diagram of the dependency graph or a summary of the proof strategy for the core `Ioo` case.