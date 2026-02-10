### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `A f L r ε` | `Set E` — points where `f` is uniformly approximated at scale `r` by linear map `L`, up to error `ε`. Open set. |
| `B f K r s ε` | `Set E` — points where `f` is simultaneously well-approximated at scales `r`, `s` by *some* `L ∈ K`. Union of intersections of `A`-sets; open. |
| `D f K` | `Set E` — points where for all `ε > 0`, there exists `δ > 0` such that for all `r, s < δ`, `x ∈ B f K r s ε`. Countable intersection/union construction. |
| `measurableSet_of_differentiableAt_of_isComplete` | `MeasurableSet {x | DifferentiableAt 𝕜 f x ∧ fderiv 𝕜 f x ∈ K}` when `K` is complete. Core measurability result. |
| `measurableSet_of_differentiableAt` | `MeasurableSet {x | DifferentiableAt 𝕜 f x}` (no derivative constraint). Follows by taking `K = univ`, which is complete in `CompleteSpace F`. |
| `measurable_fderiv` | `Measurable (fderiv 𝕜 f)` — derivative as a function into `E →L[𝕜] F` is measurable. Uses preimage characterization and decomposition into differentiable/non-differentiable parts. |
| `measurable_fderiv_apply_const` | `Measurable (fun x ↦ fderiv 𝕜 f x y)` for fixed `y : E`. Follows from continuity of evaluation map and `measurable_fderiv`. |
| `measurable_deriv` | `Measurable (deriv f)` for `f : 𝕜 → F`. Special case of `measurable_fderiv_apply_const` with `y = 1`. |
| `differentiable_set_eq_D` | Equality `{x | DifferentiableAt 𝕜 f x ∧ fderiv 𝕜 f x ∈ K} = D f K` under `IsComplete K`. Central structural lemma. |
| `D_subset_differentiable_set` | Hard inclusion: `D f K ⊆ {x | DifferentiableAt 𝕜 f x ∧ fderiv 𝕜 f x ∈ K}`. Uses Cauchy sequence of approximating linear maps and completeness of `K`. |
| `norm_sub_le_of_mem_A` | Controls distance between two linear maps approximating `f` at same scale: `‖L₁ - L₂‖ ≤ 4‖c‖ε`, assuming `‖c‖ > 1`. Key for uniqueness of derivative approximation. |
| `mem_A_of_differentiable` | If `f` is differentiable at `x`, then `x ∈ A f (fderiv f x) r ε` for small `r`. Shows differentiable points lie in `D f K` when derivative ∈ `K`. |
| `measurable_derivWithin_Ici`, `measurable_derivWithin_Ioi` | Analogous results for right derivatives on `ℝ`. Proven analogously using `A`, `B`, `D` adapted to one-sided setting. |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `measurableSet_`: asserts measurability of a set (e.g., `measurableSet_of_differentiableAt`).
  - `measurable_`: asserts measurability of a function (e.g., `measurable_fderiv`, `measurable_deriv`).
  - `differentiable_set_`: relates to the set of differentiability points.
  - `A`, `B`, `D`: auxiliary sets in the proof strategy.
  - `with_param`: suffix for parameter-dependent versions (not fully shown in excerpt but mentioned in docstring).
- **Suffixes**:
  - `_of_isComplete`: condition on `K` (e.g., `measurableSet_of_differentiableAt_of_isComplete`).
  - `_with_param`: parameterized version (mentioned in intro).
- **Function names**:
  - `fderiv`, `deriv`, `derivWithin`: standard calculus derivatives.
  - `hasFDerivAt`, `DifferentiableAt`, `DifferentiableWithinAt`: differentiability predicates.

#### 3. **Tactic Stack**

Frequent tactics used in proofs:
- `simp` / `simp only`: simplification with definitional equalities and lemmas.
- `rcases`, `obtain`, `cases'`: destruct existential/universal hypotheses.
- `exact`, `apply`, `apply_rules`: proof construction.
- `gcongr`: for inequalities involving `≤`, `≥`, especially with `*`, `+`, `norm`.
- `ring`, `abel`, `abel_nf`: algebraic simplification in additive/multiplicative contexts.
- `norm_num`: normalize numeric expressions (e.g., positivity of `(1/2)^n`).
- `filter_upwards`: for neighborhood filters (e.g., `𝓝[>]` in right-derivative section).
- `convert`: to reuse proofs under definitional equality up to provable equalities.
- `repeat apply_rules [...]`: automated rule application for measurable sets.
- `rw [Set.ext]`, `ext x`: extensionality for sets/functions.
- `linarith`, `omega`: linear arithmetic and Presburger-style reasoning.

#### 4. **Proof Logic**

- **Structure**:
  1. **Define auxiliary sets** `A`, `B`, `D` to encode uniform approximation at scales.
  2. **Show openness** of `A`, `B` (via `isOpen_A`, `isOpen_B`) → ensures `D` is measurable (countable ops on open sets).
  3. **Prove two inclusions**:
     - `differentiable_set ⊆ D f K`: easy, using `mem_A_of_differentiable`.
     - `D f K ⊆ differentiable_set`: hard, uses:
       - `norm_sub_le_of_mem_A` to show approximating maps are Cauchy.
       - Completeness of `K` (or `F`) to get limit `f'`.
       - Estimate to show `f'` is indeed the derivative.
  4. **Conclude equality** via `Subset.antisymm`.
  5. **Measurability** follows from representation of differentiability set as `D f K` and openness of `B`.
  6. **Function measurability** uses:
     - Preimage decomposition: `{fderiv ∈ s} = {diff ∧ fderiv ∈ s} ∪ {¬diff ∧ 0 ∈ s}`.
     - Measurability of differentiability set + completeness of `s`.
  7. **Right-derivative case**: parallel argument with `Ici`-restricted differentiability and adapted `A`, `B`, `D`.

- **Key insight**: although `L` in `B f K r s ε` may depend on `r, s, ε`, the `norm_sub_le_of_mem_A` lemma shows dependence is *uniform*, enabling Cauchy argument.

#### 5. **Imports**

Core dependencies defining scope:
- `Mathlib.Analysis.Calculus.Deriv.Basic`: derivative definitions (`fderiv`, `deriv`, `DifferentiableAt`, etc.).
- `Mathlib.Analysis.Calculus.Deriv.Slope`: slope-based derivative characterizations.
- `Mathlib.Analysis.Normed.Operator.BoundedLinearMaps`: `E →L[𝕜] F`, operator norm, continuity.
- `Mathlib.Analysis.Normed.Module.FiniteDimension`: finite-dimensional normed spaces (used implicitly via `CompleteSpace F`).
- `Mathlib.MeasureTheory.Constructions.BorelSpace.ContinuousLinearMap`: measurability of evaluation map (`measurable_apply₂`).
- `Mathlib.MeasureTheory.Function.StronglyMeasurable.Basic`: strong measurability, `aemeasurable`, etc.

**Domain**: Measure theory + differential calculus in normed spaces over nontrivially normed fields (e.g., `ℝ`, `ℂ`).  
**Focus**: Measurability of derivative (and differentiability set) without assuming second-countability — avoids classical separability assumptions.