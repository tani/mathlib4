### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ContinuousLinearEquiv.hasStrictFDerivAt` | `HasStrictFDerivAt iso (iso : E →L[𝕜] F) x` | A continuous linear equivalence is strictly Fréchet differentiable everywhere, with derivative equal to itself. |
| `ContinuousLinearEquiv.fderiv` | `fderiv 𝕜 iso x = iso` | The Fréchet derivative of a continuous linear equivalence is the equivalence itself (viewed as a continuous linear map). |
| `ContinuousLinearEquiv.comp_differentiableWithinAt_iff` | `DifferentiableWithinAt 𝕜 (iso ∘ f) s x ↔ DifferentiableWithinAt 𝕜 f s x` | Composition with a continuous linear equivalence preserves (or reflects) differentiability. |
| `ContinuousLinearEquiv.comp_hasFDerivWithinAt_iff` | `HasFDerivWithinAt (iso ∘ f) ((iso : E →L[𝕜] F).comp f') s x ↔ HasFDerivWithinAt f f' s x` | Characterizes the chain rule for composition with a continuous linear equivalence. |
| `ContinuousLinearEquiv.comp_fderivWithin` | `fderivWithin 𝕜 (iso ∘ f) s x = (iso : E →L[𝕜] F).comp (fderivWithin 𝕜 f s x)` | Chain rule for `fderivWithin` under composition with a continuous linear equivalence. |
| `ContinuousLinearEquiv.uniqueDiffOn_image_iff` | `UniqueDiffOn 𝕜 (e '' s) ↔ UniqueDiffOn 𝕜 s` | Continuous linear equivalences preserve and reflect the unique differentiability property of sets. |
| `HasStrictFDerivAt.of_local_left_inverse` | Under assumptions, `HasStrictFDerivAt g (f'.symm : F →L[𝕜] E) a` | If `g` is a local left inverse of `f` near `a`, and `f` is strictly differentiable at `g(a)` with invertible derivative `f'`, then `g` is strictly differentiable at `a` with derivative `f'⁻¹`. |
| `PartialHomeomorph.hasStrictFDerivAt_symm` | `HasStrictFDerivAt f.symm (f'.symm : F →L[𝕜] E) a` | Special case of the above for partial homeomorphisms (used in inverse function theorem proofs). |
| `HasFDerivWithinAt.mapsTo_tangent_cone` | `MapsTo f' (tangentConeAt 𝕜 s x) (tangentConeAt 𝕜 (f '' s) (f x))` | The differential maps the tangent cone of `s` at `x` into the tangent cone of `f(s)` at `f(x)`. |
| `ContinuousLinearEquiv.uniqueDiffOn_image` | `UniqueDiffOn 𝕜 (e '' s)` | Image of a uniquely differentiable set under a continuous linear equivalence is uniquely differentiable. |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `has*`: asserts existence of a derivative (e.g., `hasFDerivAt`, `hasStrictFDerivAt`).
  - `differentiable*`: asserts differentiability (e.g., `differentiableAt`, `differentiableWithinAt`, `differentiableOn`, `differentiable`).
  - `comp_*`: properties of composition with a linear equivalence (e.g., `comp_differentiableAt_iff`, `comp_fderiv`).
  - `comp_right_*`: properties of precomposition (`f ∘ iso`).
  - `fderiv*`: formulas for Fréchet derivatives (`fderiv`, `fderivWithin`, `comp_fderiv`, `comp_fderivWithin`).
  - `uniqueDiff*`: properties related to unique differentiability of sets.

- **Suffixes**:
  - `_iff`: equivalence (↔) statements.
  - `_within`: variants for sets (e.g., `hasFDerivWithinAt`, `fderivWithin`).
  - `_at`: pointwise variants (e.g., `hasFDerivAt`, `fderiv`).
  - `_on`: global-on-set variants (e.g., `differentiableOn`, `uniqueDiffOn`).

- **`iso` variable**: Used uniformly for `ContinuousLinearEquiv` or `LinearIsometryEquiv`.

#### 3. **Tactic Stack**

Frequent tactics used in proofs:
- `rw`: rewriting using equalities (especially `iso.symm_comp_self`, `iso.self_comp_symm`, `Function.comp_assoc`, `ContinuousLinearMap.comp_assoc`, etc.)
- `simp` / `simp_rw`: simplification with lemmas about composition, symmetry, and continuity.
- `exact`, `apply`, `intro`, `intro h`, `rintro`: basic proof construction.
- `convert`: for approximate equality (e.g., when proving equality of functions up to extensionality).
- `ext`: extensionality (for proving equality of functions/maps).
- `change`: to rewrite goal into a definitionally equal form.
- `have`, `set`, `by_cases`: intermediate lemma introduction and case analysis.
- `tendsto_congr`, `isBigO.trans`, `isLittleO.trans`: asymptotic analysis reasoning.
- `refine`: for partial proof construction with holes.
- `rwa`: `rw` followed by `assumption`.
- `simpa`: `simp` + `assumption`.

#### 4. **Proof Logic**

- **Structure**:
  - Most proofs follow a *two-way implication* (`↔`) pattern: prove both directions separately.
  - For chain rule-like results: use `hasFDerivAt.comp` or `hasFDerivWithinAt.comp` in one direction, and in the other, precompose with `iso.symm` and use `iso.symm_comp_self` to reduce.
  - For derivative formulas: either apply `fderivWithin`/`fderiv` to a known `hasFDerivWithinAt`/`hasFDerivAt`, or use `fderivWithin_zero_of_not_differentiableWithinAt` when differentiability fails.
  - For tangent cone and unique differentiability results: use `mapsTo_tangent_cone` and `uniqueDiffWithinAt` lemmas, often combined with `Submodule.span_le`, `denseRange`, and closure arguments.

- **Common patterns**:
  - Use `iso.symm` to transfer differentiability or derivative information back and forth.
  - Leverage `ContinuousLinearMap.comp_assoc`, `iso.coe_symm_comp_coe`, and `iso.coe_comp_coe_symm` to simplify compositions of linear maps.
  - Use `eventually` reasoning (`∀ᶠ`, `tendsto`, `isBigO`, `isLittleO`) for asymptotic behavior near points.

#### 5. **Imports**

- `Mathlib.Analysis.Asymptotics.AsymptoticEquivalent`: for `~[...]`, `isBigO`, `isLittleO`, asymptotic reasoning.
- `Mathlib.Analysis.Calculus.FDeriv.Linear`: linear algebra background for Fréchet derivatives.
- `Mathlib.Analysis.Calculus.FDeriv.Comp`: chain rule and composition lemmas.

These imports define the core calculus framework (Fréchet derivative, differentiability, chain rule, asymptotics) used throughout the file.

--- 

This metadata is suitable for training or guiding a domain-specific Lean 4 assistant focused on multivariable calculus in normed spaces, especially around differentiability, linear equivalences, and inverse function theorems.