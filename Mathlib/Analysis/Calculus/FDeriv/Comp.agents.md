### Technical Metadata Brief: Chain Rule for Fréchet Derivatives in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `HasFDerivAtFilter` | `f : E → F →L[𝕜] F → Filter E → Prop` | Generalized Fréchet differentiability at a point *with respect to a filter*, enabling local analysis (e.g., within subsets, along sequences). |
| `HasFDerivAt` | `HasFDerivAtFilter f f' x (𝓝 x)` | Standard Fréchet differentiability at a point (using neighborhood filter). |
| `HasFDerivWithinAt` | `HasFDerivAtFilter f f' x (𝓝[s] x)` | Differentiability *within* a subset `s` at `x`. |
| `DifferentiableAt`, `DifferentiableWithinAt`, `DifferentiableOn`, `Differentiable` | `Prop` | Local/global differentiability (with/without subset restrictions). |
| `fderiv`, `fderivWithin` | `fderiv 𝕜 f x : E →L[𝕜] F`, `fderivWithin 𝕜 f s x : E →L[𝕜] F` | The *unique* derivative (linear map) when differentiable. |
| `HasStrictFDerivAt` | `Prop` | Strict Fréchet differentiability (stronger condition, useful for inverse/implicit function theorems). |
| `HasFDerivAtFilter.comp` | `(hg : HasFDerivAtFilter g g' (f x) L') → (hf : HasFDerivAtFilter f f' x L) → Tendsto f L L' → HasFDerivAtFilter (g ∘ f) (g'.comp f') x L` | Core chain rule in filter-based generality. |
| `HasFDerivAt.comp` | `(hg : HasFDerivAt g g' (f x)) → (hf : HasFDerivAt f f' x) → HasFDerivAt (g ∘ f) (g'.comp f') x` | Standard chain rule for full differentiability. |
| `fderivWithin_comp` | Under `UniqueDiffWithinAt`, `fderivWithin (g ∘ f) = (fderivWithin g).comp (fderivWithin f)` | Chain rule for *actual derivatives* (not just existence), with equality. |
| `fderiv_comp` | `fderiv (g ∘ f) = (fderiv g).comp (fderiv f)` | Chain rule for global derivatives. |
| `HasFDerivAtFilter.iterate`, `Differentiable.iterate`, etc. | `f^[n]` derivative properties under iteration | Extend chain rule to iterates (e.g., `fⁿ`), using `f' ^ n` (power in `E →L[𝕜] E`). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `HasFDerivAt*`: Existence of Fréchet derivative (at point, within set, w.r.t. filter).
  - `Differentiable*`: Actual differentiability (implies existence + continuity of derivative).
  - `fderiv*`: The derivative *itself* (when it exists).
  - `HasStrictFDerivAt*`: Strict differentiability (stronger, used for robust composition).
- **Suffixes**:
  - `WithinAt`, `At`, `On`, `Within`: Distinguish local, global, and subset-restricted variants.
  - `comp`, `comp'`, `comp₃`: Composition lemmas (primary, variant without `∘`, ternary composition).
  - `of_tendsto`, `of_eq`, `of_mem`: Variants with extra hypotheses (e.g., `f x = y`).
- **Other**:
  - `iterate`: For repeated application (`f^[n]`).
  - `fun_prop`: Instance attribute for typeclass resolution (e.g., `@[fun_prop]` helps `Differentiable`/`DifferentiableAt` inferability).

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `simp`, `simp_rw`, `rw`: Simplification and rewriting (especially for `map_sub`, `coe_comp'`, `Function.comp_apply`).
  - `exact`, `refine`, `apply`: Goal-directed proof construction.
  - `convert`, `congr'`: For equational reasoning with convertible terms.
  - `induction`: Induction on `n : ℕ` (e.g., for `iterate` lemmas).
  - `substs`: Eliminate equality hypotheses (e.g., `f x = y`).
  - `calc`: Chain of equalities (used in readable chain rule proofs).
- **Asymptotic analysis**:
  - `isBigO`, `isLittleO`, `triangle`, `trans_isBigO`, `trans_isLittleO`: Manipulate Landau symbols (key for `HasFDerivAtFilter` proofs).
  - `tendsto`, `tendsto_nhdsWithin`, `tendsto_principal_principal`: Filter convergence reasoning.
- **Helper**:
  - `have`, `let`: Intermediate definitions (e.g., `eq₁`, `eq₂` in `HasFDerivAtFilter.comp`).
  - `mapsTo_univ`, `inter_subset_right`, etc.: Set-theoretic simplifications.

---

#### **4. Proof Logic**

- **General pattern for chain rule proofs**:
  1. **Reduce to filter-based version** (`HasFDerivAtFilter.comp`) for maximal generality.
  2. **Decompose error terms** using Landau calculus:
     - Show `g(f(x')) - g(f(x)) - g'(f(x') - f(x)) = o(f(x') - f(x))`
     - Show `g'(f(x') - f(x)) - g'.comp f'(x' - x) = O(f(x') - f(x)) = o(x' - x)`
     - Combine via triangle inequality.
  3. **Lift to concrete variants**:
     - `HasFDerivAt`/`WithinAt` follow by specializing filters (`𝓝 x`, `𝓝[s] x`).
     - `Differentiable*` follows from `HasFDerivAt*` + uniqueness of derivative.
     - `fderiv*` equalities use `fderivWithin`/`fderiv` uniqueness under `UniqueDiffWithinAt`.
- **Iterate proofs**:
  - Induction on `n`.
  - Base case: identity (`id` has derivative `1`).
  - Step: apply `comp` lemma to `f^[n] ∘ f`, using `f' ^ (n+1) = f' ^ n ∘ f'`.

---

#### **5. Imports & Scope**

- **Primary import**:  
  `Mathlib.Analysis.Calculus.FDeriv.Basic`  
  → Defines `HasFDerivAtFilter`, `fderiv`, `Differentiable*`, `HasStrictFDerivAt`, and basic properties (linearity, uniqueness, etc.).
- **Key dependencies**:
  - `Mathlib.Analysis.Calculus.FDeriv.Basic` (core Fréchet derivative theory).
  - `Mathlib.Topology.Basic` (filters, continuity, tendsto).
  - `Mathlib.Analysis.Asymptotics.Asymptotics` (Landau symbols: `O`, `o`).
  - `Mathlib.Algebra.Module.Defs` (normed spaces, linear maps).
- **Domain scope**:  
  Fréchet calculus on **normed vector spaces over a nontrivially normed field** `𝕜` (e.g., `ℝ`, `ℂ`).  
  Generalizes 1D calculus to infinite-dimensional settings (Banach spaces, manifolds, etc.).

---

### Summary

This module formalizes the **chain rule** for Fréchet derivatives in full generality (filter-based, within subsets, strict differentiability), along with corollaries for derivatives, differentiability, and iteration. It leverages Lean’s typeclass infrastructure (`[NormedSpace]`, `[UniqueDiffWithinAt]`) and asymptotic analysis (`O`, `o`) to handle subtle local behavior. The naming and structure reflect Mathlib’s emphasis on *modularity*, *reusability*, and *backward compatibility* (via `@[deprecated]` aliases).