Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Swapping Limits and Derivatives via Uniform Convergence**

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `uniformCauchySeqOnFilter_of_fderiv` | If `fₙ` are differentiable near `x`, converge at `x`, and `fₙ'` is uniformly Cauchy near `x`, then `fₙ` is uniformly Cauchy near `x`. |
| `hasFDerivAt_of_tendstoUniformlyOnFilter` | If `fₙ → g` pointwise near `x`, `fₙ' → g'` *uniformly at* `x`, and `fₙ` are differentiable near `x`, then `g` is differentiable at `x` with `g' x` as its derivative. |
| `hasFDerivAt_of_tendstoUniformlyOn` | Special case of the above when all `fₙ`, `fₙ'` exist on a common open set and `fₙ' → g'` uniformly there. |
| `hasFDerivAt_of_tendstoLocallyUniformlyOn` | Local version: assumes `fₙ' → g'` *locally uniformly* on an open set `s ∋ x`. |
| `difference_quotients_converge_uniformly` | Shows uniform convergence of difference quotients of `fₙ` to those of `g`, under uniform convergence of derivatives and pointwise convergence of functions. |
| `UniformCauchySeqOnFilter.one_smulRight` | Technical lemma: if `fₙ'` is uniformly Cauchy, then so is `n ↦ z ↦ (1 : 𝕜 →L[𝕜] 𝕜).smulRight (fₙ' z)`, used to reduce `deriv` to `fderiv`. |
| `uniformCauchySeqOnFilter_of_deriv`, `hasDerivAt_of_tendstoUniformlyOnFilter`, etc. | `deriv`-analogues of the `fderiv` theorems, using `hasDerivAt ↔ hasFDerivAt` and the above `one_smulRight` lemma. |

#### **2. Naming Conventions**

- **Prefixes**:
  - `hasFDerivAt_`, `hasDerivAt_`: Theorems asserting differentiability at a point.
  - `uniformCauchySeqOnFilter_`, `uniformCauchySeqOn_`: Statements about uniform Cauchy behavior on filters or sets.
  - `difference_quotients_`: Concerning convergence of difference quotients.
- **Suffixes**:
  - `_of_tendstoUniformlyOnFilter`: Hypotheses involve uniform convergence *at* a point (via filter).
  - `_of_tendstoUniformlyOn`: Hypotheses involve uniform convergence on a set.
  - `_of_tendstoLocallyUniformlyOn`: Hypotheses involve locally uniform convergence on a set.
  - `_of_tendstoUniformly`: Strongest form: uniform convergence globally.
- **Other**:
  - `_filter`, `_ball`, `_open`: Indicate the domain of uniformity (filter neighborhood, metric ball, open set).
  - `'` variants (e.g., `hasFDerivAt_of_tendsto_locally_uniformly_on'`) use `DifferentiableOn` instead of `HasFDerivAt`.

#### **3. Tactic Stack**

- **Core tactics**:
  - `rw`, `simp`, `simp_rw`: Rewriting and simplification, especially for norms, operator norms, and `hasFDerivAt`/`hasDerivAt` equivalences.
  - `exact`, `refine`, `apply`: For constructing proofs term-by-term.
  - `have`, `suffices`: Intermediate lemma introduction.
  - `convert`: For equating expressions up to definitional equality (e.g., `abel` used after `convert`).
- **Analysis-specific**:
  - `Convex.norm_image_sub_le_of_norm_hasFDerivWithin_le`: Mean Value Theorem (MVT) application.
  - `eventually_prod_iff`, `eventually_curry_iff`, `curry_le_prod`, `mono_left`: Filter manipulation, especially curried filters.
  - `Metric.tendstoUniformlyOnFilter_iff`, `Metric.tendsto_nhds`, `Metric.cauchy_iff`: Metric-space characterizations.
  - `exists_pos_rat_lt`, `exists_between`, `mul_lt_iff_lt_one_right`: Real analysis lemmas for ε-δ control.
  - `gcongr`, `norm_smul`, `norm_inv`, `RCLike.norm_coe_norm`: Norm simplifications and inequalities.
  - `filter_upwards`: For filtering universal quantifiers over filters.

#### **4. Proof Logic**

- **High-level strategy**: ε/3 decomposition of the difference quotient error:
  ```
  ‖g(y) - g(x) - g'(x)(y - x)‖ / ‖y - x‖
  ≤ ‖g(y) - fₙ(y) - (g(x) - fₙ(x))‖ / ‖y - x‖   -- (1) uniform convergence of difference quotients
   + ‖fₙ(y) - fₙ(x) - fₙ'(x)(y - x)‖ / ‖y - x‖  -- (2) derivative of fₙ
   + ‖fₙ'(x) - g'(x)‖                            -- (3) uniform convergence of derivatives
  ```
- **Key technical innovation**: Use of **curried filters** (`l.curry (𝓝 x)`) to correctly model the quantifier order:
  ```
  ∀ ε > 0, ∃ N, ∀ n ≥ N, ∃ δ > 0, ∀ y ∈ B_δ(x), ...
  ```
  This avoids the pitfalls of `l ×ˢ 𝓝 x` (which gives `∃ N, ∃ δ, ∀ n ≥ N, ∀ y`) or `∀ᶠ n, Tendsto ...` (which gives `∃ N, ∀ n ≥ N, ∀ ε, ∃ δ`).
- **Proof flow**:
  1. Reduce to `fderiv` case (if needed) via `hasDerivAt ↔ hasFDerivAt`.
  2. Show uniform Cauchy property of `fₙ` using MVT and uniform Cauchy of `fₙ'`.
  3. Prove convergence of difference quotients via `difference_quotients_converge_uniformly`.
  4. Apply ε/3 decomposition using:
     - Uniform convergence of difference quotients (from step 3),
     - Definition of derivative for `fₙ`,
     - Uniform convergence of derivatives (`fₙ' → g'`).
  5. Conclude via `hasFDerivAt_iff_tendsto`.

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.Calculus.MeanValue` | Used for `Convex.norm_image_sub_le_of_norm_hasFDerivWithin_le` (MVT in normed spaces). |
| `Mathlib.Analysis.NormedSpace.RCLike` | Provides `RCLike` field structure (ℝ or ℂ), needed for norm properties and scalar restriction. |
| `Mathlib.Order.Filter.Curry` | Defines `curry` filter construction, essential for correct quantifier handling. |

---

This file formalizes a classical result in analysis: **uniform convergence of derivatives + pointwise convergence of functions ⇒ derivative of limit = limit of derivatives**, with careful handling of quantifier structure via filters and currying. It is a cornerstone for results like term-by-term differentiation of power series or holomorphic functions.