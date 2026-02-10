### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `convolution_eq_right` | `{x₀ : G} → (∀ x ∈ ball x₀ φ.rOut, g x = g x₀) → (φ ⋆[lsmul ℝ ℝ, μ] g) x₀ = integral μ φ • g x₀` | Computes convolution when `g` is constant on the support radius of `φ`. |
| `normed_convolution_eq_right` | `{x₀ : G} → (∀ x ∈ ball x₀ φ.rOut, g x = g x₀) → (φ.normed μ ⋆[lsmul ℝ ℝ, μ] g) x₀ = g x₀` | Special case for *normed* bump functions: convolution equals `g x₀` if `g` is constant on the ball. |
| `dist_normed_convolution_le` | `{x₀ : G} → {ε : ℝ} → AEStronglyMeasurable g μ → (∀ x ∈ ball x₀ φ.rOut, dist (g x) (g x₀) ≤ ε) → dist ((φ.normed μ ⋆ g) x₀) (g x₀) ≤ ε` | Bounds the distance between convolution and `g x₀` when `g` is approximately constant near `x₀`. |
| `convolution_tendsto_right` | `{φ : ι → ContDiffBump 0} → {g : ι → G → E'} → {k : ι → G} → Tendsto (rOut ∘ φ) l (𝓝 0) → ... → Tendsto (i ↦ ((φ i).normed μ ⋆ g i) (k i)) l (𝓝 z₀)` | General convergence result: convolution with varying bump functions and arguments converges under suitable conditions. |
| `convolution_tendsto_right_of_continuous` | `{φ : ι → ContDiffBump 0} → Tendsto (rOut ∘ φ) l (𝓝 0) → Continuous g → Tendsto (i ↦ ((φ i).normed μ ⋆ g) x₀) l (𝓝 (g x₀))` | Specialization of above when `g` is fixed and continuous. |
| `ae_convolution_tendsto_right_of_locallyIntegrable` | `{φ : ι → ContDiffBump 0} → Tendsto (rOut ∘ φ) l (𝓝 0) → (rOut ≤ K * rIn) eventually → LocallyIntegrable g μ → ∀ᵐ x₀ ∂μ, Tendsto (i ↦ ((φ i).normed μ ⋆ g) x₀) l (𝓝 (g x₀))` | Almost-everywhere convergence of convolution to `g` for locally integrable `g`, assuming control on inner/outer radii. |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `convolution_`: core convolution lemmas.
  - `normed_`: applies to *normed* bump functions (`φ.normed μ`).
  - `ae_`: almost-everywhere statements.
  - `dist_`: bounds involving metric distance.
- **Suffixes**:
  - `_right`: convolution acts on the *right* (i.e., `(φ ⋆ g)(x₀)`).
  - `_le`: inequality bounds.
  - `_eq`: exact equality cases.
- **Function names**:
  - `rOut`, `rIn`: outer/inner radii of bump functions.
  - `normed`: normalization of bump function w.r.t. measure `μ`.
  - `support_normed_eq`: support of normalized bump.

#### 3. **Tactic Stack**

Frequently used tactics in proofs:
- `simp_rw`: for rewriting with definitional equalities.
- `rw`: standard rewriting.
- `filter_upwards`: for handling filter-based convergence (especially in `ae_` and `tendsto` lemmas).
- `simp only`, `simp`: simplification with specific lemmas.
- `exact`, `apply`: for direct proof steps.
- `change`: to rewrite goal into a more convenient form.
- `congr`: congruence reasoning (e.g., `tendsto_const_nhds.congr`).
- `have`, `set`: local assumptions and definitions.

#### 4. **Proof Logic**

- **Structure**:
  - Most proofs follow a pattern of:
    1. Reducing to known convolution identities (`convolution_eq_right'`, `integral_normed_smul`).
    2. Applying general convolution convergence theorems (`dist_convolution_le`, `convolution_tendsto_right`).
    3. Using measure-theoretic tools: Lebesgue differentiation, Besicovitch covering, Haar measure uniqueness.
  - For `ae_convolution_tendzo_right_of_locallyIntegrable`:
    - Uses **Lebesgue differentiation theorem** (via `Besicovitch.vitaliFamily.ae_tendsto_average_norm_sub`).
    - Relates convolution to averages over balls using support containment and volume estimates.
    - Handles scaling via `integral_smul_of_tendsto_average_norm_sub`, leveraging boundedness of `rOut / rIn`.

#### 5. **Imports**

Core dependencies defining scope:
- `Mathlib.Analysis.Convolution`: foundational convolution theory.
- `Mathlib.Analysis.Calculus.BumpFunction.Normed`: normalized bump functions and their properties.
- `Mathlib.MeasureTheory.Integral.Average`: average integrals and Lebesgue differentiation.
- `Mathlib.MeasureTheory.Covering.Differentiation`: Besicovitch covering and differentiation theorems.
- `Mathlib.MeasureTheory.Covering.BesicovitchVectorSpace`: vector-space-specific Besicovitch constants.
- `Mathlib.MeasureTheory.Measure.Haar.Unique`: uniqueness of Haar measure (used to identify `μ` as Haar).

---

This module formalizes foundational approximation properties of convolution with smooth bump functions, especially in the context of normed vector spaces over `ℝ`, with emphasis on convergence and exact evaluation under regularity assumptions.