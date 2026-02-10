### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `HasStrictDerivAt.hasStrictFDerivAt_equiv` | `HasStrictDerivAt f f' x → f' ≠ 0 → HasStrictFDerivAt f (unitsEquivAut …) x` | Lifts strict differentiability to strict Fréchet differentiability via equivalence of 1D normed spaces. |
| `HasDerivAt.hasFDerivAt_equiv` | `HasDerivAt f f' x → f' ≠ 0 → HasFDerivAt f (unitsEquivAut …) x` | Analogous to above for (non-strict) differentiability. |
| `HasStrictDerivAt.of_local_left_inverse` | `ContinuousAt g a → HasStrictDerivAt f f' (g a) → f' ≠ 0 → f ∘ g =ᶠ[𝓝 a] id → HasStrictDerivAt g f'⁻¹ a` | Proves derivative of local left inverse is inverse of derivative (strict case). |
| `PartialHomeomorph.hasStrictDerivAt_symm` | `a ∈ f.target → f' ≠ 0 → HasStrictDerivAt f f' (f.symm a) → HasStrictDerivAt f.symm f'⁻¹ a` | Special case of above for partial homeomorphisms (i.e., local diffeomorphisms). |
| `HasDerivAt.of_local_left_inverse` | `ContinuousAt g a → HasDerivAt f f' (g a) → f' ≠ 0 → f ∘ g =ᶠ[𝓝 a] id → HasDerivAt g f'⁻¹ a` | Same as strict version but for ordinary derivative. |
| `PartialHomeomorph.hasDerivAt_symm` | `a ∈ f.target → f' ≠ 0 → HasDerivAt f f' (f.symm a) → HasDerivAt f.symm f'⁻¹ a` | Derivative of inverse of partial homeomorphism. |
| `HasDerivAt.eventually_ne` | `HasDerivAt f f' x → f' ≠ 0 → ∀ᶠ z in 𝓝[≠] x, f z ≠ f x` | Nonzero derivative implies function is eventually injective near `x`. |
| `HasDerivAt.tendsto_punctured_nhds` | `HasDerivAt f f' x → f' ≠ 0 → Tendsto f (𝓝[≠] x) (𝓝[≠] f x)` | Function with nonzero derivative induces a map between punctured neighborhoods. |
| `not_differentiableWithinAt_of_local_left_inverse_hasDerivWithinAt_zero` | Hypotheses as above → `¬DifferentiableWithinAt 𝕜 g s a` | If `f` has zero derivative at `g(a)` and `f ∘ g = id` near `a`, then `g` cannot be differentiable at `a` (within set `s`). |
| `not_differentiableAt_of_local_left_inverse_hasDerivAt_zero` | `HasDerivAt f 0 (g a) → f ∘ g =ᶠ[𝓝 a] id → ¬DifferentiableAt 𝕜 g a` | Same as above but for full differentiability (not just within a set). |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `has*DerivAt`: indicates existence of derivative (strict or not) at a point.
  - `of_local_left_inverse`: used for theorems deriving properties of a left inverse under assumptions.
  - `not_differentiable*`: negative results about differentiability.
- **Suffixes**:
  - `_equiv`: indicates use of `ContinuousLinearEquiv.unitsEquivAut` to translate between scalar and operator forms.
  - `_symm`: used for theorems about inverses (e.g., `PartialHomeomorph.hasDerivAt_symm`).
- **Functional composition notation**:
  - `f ∘ g =ᶠ[𝓝 a] id` or `f ∘ g =ᶠ[𝓝[s] a] id`: expresses that `f ∘ g` equals identity *eventually* near `a` (within set `s` if needed).

#### 3. **Tactic Stack**

- `intro`, `simpa`, `have`, `exact`: standard proof structure.
- `field_simp [norm_smul, mt norm_eq_zero.1 hf']`: used in `eventually_ne` to simplify norms and apply contrapositive of `norm_eq_zero`.
- `tendsto_nhdsWithin_of_tendsto_nhds_of_eventually_within`: specialized tactic for punctured neighborhood convergence.
- `comp`, `congr_of_eventuallyEq`, `congr_of_eventuallyEq_of_mem`: used to manipulate derivative compositions and equalities up to filter neighborhoods.
- `unique`: used to conclude uniqueness of derivative (e.g., `this.unique (hasDerivAt_id a)`).
- `hasDerivWithinAt_id`, `hasDerivAt_id`: lemmas about identity function’s derivative.

#### 4. **Proof Logic**

- **General pattern**:
  1. Use `of_local_left_inverse` to reduce to Fréchet derivative setting via `hasFDerivAt_equiv`/`hasStrictFDerivAt_equiv`.
  2. Apply known chain rule / composition lemmas for Fréchet derivatives (`comp`, `congr_of_eventuallyEq`).
  3. Use uniqueness of derivative (via `unique`, `eq_deriv`) to conclude derivative of inverse is inverse of derivative.
- **Negative results** (`not_differentiable*`):
  - Assume differentiability, derive contradiction using chain rule and uniqueness of derivative (e.g., derivative of identity is 1, but composition yields 0).
  - Leverage `UniqueDiffWithinAt` to force equality of derivatives.

#### 5. **Imports**

- `Mathlib.Analysis.Calculus.Deriv.Comp`: composition rules for derivatives.
- `Mathlib.Analysis.Calculus.FDeriv.Equiv`: tools for translating between scalar and linear operator derivatives (e.g., `unitsEquivAut`, `hasFDerivAt_equiv`).

---

This module formalizes the *easy direction* of the inverse function theorem in 1D: assuming existence of a local inverse, it characterizes its derivative. It relies heavily on equivalence between scalar multiplication and linear maps, and on uniqueness of derivatives under regularity conditions (e.g., nonzero derivative ⇒ injectivity near point).