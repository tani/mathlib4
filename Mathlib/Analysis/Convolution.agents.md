Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Convolution in Lean 4 (Mathlib)**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `convolution` | `convolution f g L μ x = ∫ t, L (f t) (g (x - t)) ∂μ` | Defines the convolution of `f` and `g` w.r.t. a continuous bilinear map `L` and measure `μ`. |
| `ConvolutionExistsAt` | `ConvolutionExistsAt f g x L μ ↔ Integrable (t ↦ L (f t) (g (x - t))) μ` | States that the convolution integral exists at a point `x`. |
| `ConvolutionExists` | `ConvolutionExists f g L μ ↔ ∀ x, ConvolutionExistsAt f g x L μ` | States that the convolution exists everywhere. |
| `hasFDerivAt_convolution_right` | `HasCompactSupport g → HasFDerivAt (f ⋆[L, μ] g) x (L (f t) ∘ₗ g'[x - t])` | Total derivative of convolution w.r.t. right argument when `g` has compact support. |
| `contDiff_convolution_right` | `HasCompactSupport g → ContDiff ℝ n g → LocallyIntegrable f → ContDiff ℝ n (f ⋆[L, μ] g)` | Smoothness of convolution: if `g` is `Cⁿ` with compact support and `f` is locally integrable, then `f ⋆ g` is `Cⁿ`. |
| `convolution_tendsto_right` | `Tendsto (f ⋆[L, μ] g) (nhds x₀) (nhds (f x₀ * ∫ g))` under support shrinking to 0 | Approximate identity property: convolution with bump functions approximates the original function. |
| `support_convolution_subset_swap` | `support (f ⋆ g) ⊆ support g + support f` | Support of convolution is contained in sum of supports. |
| `convolution_congr` | `f =ᵐ[μ] f' ∧ g =ᵐ[μ] g' ⇒ f ⋆ g = f' ⋆ g'` | Convolution is insensitive to almost-everywhere equality. |

#### **2. Naming Conventions**

- **Prefixes**:
  - `convolution_...`: for definitions and basic properties (e.g., `convolution_def`, `convolution_lsmul`).
  - `ConvolutionExists...`: for existence conditions.
  - `hasFDerivAt_convolution_...`, `contDiff_convolution_...`: for differentiability/smoothness results.
  - `aes_...`: for almost-everywhere measurability (`AEStronglyMeasurable`).
  - `hasCompactSupport_...`: for results assuming compact support.

- **Suffixes**:
  - `_right`, `_left`: indicate which argument (right/left) has compact support or is differentiated.
  - `_flip`: for symmetry-related lemmas (e.g., `convolutionExistsAt_flip`).
  - `_swap`: for swapping arguments (e.g., `convolution_integrand_swap_snd`).
  - `_on`, `_iff`, `_mono`: for restricted or equivalence versions.

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp_rw`, `simp only`, `simp`: for rewriting definitions and simplifying expressions.
- `exact`, `refine`, `apply`: for constructing proofs term-by-term.
- `convert`: for equational reasoning with convertible terms.
- `rw`, `ext`: for extensionality and rewriting.
- `filter_upwards`, `eventually_of_forall`: for almost-everywhere arguments.
- `integral_congr_ae`, `integral_zero`, `integral_mono`: for integral manipulations.
- `aesop`, `ring`, `linarith`: for algebraic simplifications (used sparingly due to measure-theoretic complexity).
- `push_neg`, `rcases`, `by_contra`: for logical reasoning and case analysis.

#### **4. Proof Logic**

- **Inductive/structural style**: Most proofs follow a pattern of:
  1. **Reduction**: Reduce to known integrability/measurability facts (e.g., via `integrableOn_iff_integrable_of_support_subset`).
  2. **Bounding**: Use norm estimates (e.g., `L.le_of_opNorm₂_le_of_le`, `norm_nonneg`) to dominate integrand.
  3. **Measurability**: Show `AEStronglyMeasurable` via composition and invariance properties (e.g., under translation).
  4. **Application of parameterized integral theorems**: Use `continuousOn_integral_bilinear_of_locally_integrable_of_compact_support` for continuity/smoothness.
  5. **Symmetry/flip tricks**: Use `convolutionExistsAt_flip` to reduce left/right cases.

- **Common proof patterns**:
  - **Compact support + continuity ⇒ integrability**: via `HasCompactSupport.convolutionExistsAt`.
  - **Almost-everywhere arguments**: via `integral_congr_ae`, `ae_convolution_exists`.
  - **Parameter-dependent continuity**: via `continuousOn_convolution_right_with_param`, using thickened compact sets.

#### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.Analysis.Calculus.ContDiff.Basic`
  - `Mathlib.Analysis.Calculus.ParametricIntegral`
  - `Mathlib.MeasureTheory.Integral.Prod`
  - `Mathlib.MeasureTheory.Function.LocallyIntegrable`
  - `Mathlib.MeasureTheory.Group.Integral`, `Prod`, `IntervalIntegral`

- **Scope & Notation**:
  - Localized in `Convolution` scope.
  - Notations:
    - `f ⋆[L, μ] g`: full convolution.
    - `f ⋆[L] g`: with volume measure.
    - `f ⋆ g`: default (scalar multiplication `lsmul ℝ ℝ`).

- **Algebraic assumptions**:
  - `AddGroup`, `TopologicalAddGroup`, `MeasurableAdd`, `MeasurableNeg`, `IsAddRightInvariant`/`IsAddLeftInvariant` measures.
  - `NontriviallyNormedField`, `NormedSpace`, `BorelSpace`.

---

Let me know if you'd like a dependency graph or a summary of the `to_additive` design pattern usage.