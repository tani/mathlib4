### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Real.exists_extension_norm_eq` | `∀ (p : Subspace ℝ E) (f : p →L[ℝ] ℝ), ∃ g : E →L[ℝ] ℝ, (∀ x, g x = f x) ∧ ‖g‖ = ‖f‖` | Hahn-Banach extension theorem over `ℝ`: extends a continuous linear functional on a subspace to the whole space without increasing norm. |
| `exists_extension_norm_eq` | `∀ (p : Subspace 𝕜 E) (f : p →L[𝕜] 𝕜), ∃ g : E →L[𝕜] 𝕜, (∀ x, g x = f x) ∧ ‖g‖ = ‖f‖` | Generalized Hahn-Banach extension over `𝕜 ∈ {ℝ, ℂ}` (via `RCLike 𝕜`). |
| `ContinuousLinearMap.exist_extension_of_finiteDimensional_range` | `∀ (p : Submodule 𝕜 E) (f : p →L[𝕜] F), [FiniteDimensional 𝕜 (LinearMap.range f)] → ∃ g : E →L[𝕜] F, f = g.comp p.subtypeL` | Extends continuous linear maps with finite-dimensional range (no norm control). |
| `Submodule.ClosedComplemented.of_finiteDimensional` | `∀ (p : Submodule 𝕜 F), [FiniteDimensional 𝕜 p] → p.ClosedComplemented` | Finite-dimensional submodules over `ℝ`/`ℂ` are complemented in the topological sense. |
| `coord_norm'` | `∀ (x : E) (h : x ≠ 0), ‖(‖x‖ : 𝕜) • coord 𝕜 x h‖ = 1` | Norm computation for the normalized coordinate functional on a 1D subspace. |
| `exists_dual_vector` | `∀ (x : E) (h : x ≠ 0), ∃ g : E →L[𝕜] 𝕜, ‖g‖ = 1 ∧ g x = ‖x‖` | Hahn-Banach corollary: existence of norm-1 functional attaining the norm at a nonzero vector. |
| `exists_dual_vector'` | `∀ (x : E), ∃ g : E →L[𝕜] 𝕜, ‖g‖ = 1 ∧ g x = ‖x‖` | Variant of `exists_dual_vector` without nonzero hypothesis (uses nontriviality of space). |
| `exists_dual_vector''` | `∀ (x : E), ∃ g : E →L[𝕜] 𝕜, ‖g‖ ≤ 1 ∧ g x = ‖x‖` | Weaker variant allowing `‖g‖ ≤ 1`, valid even in trivial space. |

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `exists_`: Existential theorems (e.g., `exists_extension_norm_eq`, `exists_dual_vector`).
  - `coord_`: Functionals associated with coordinates/bases (e.g., `coord_norm'`).
  - `reCLM`: Real part of complex linear maps (`reCLM` = real part continuous linear map).
  - `extendTo𝕜`: Extension from real to complex scalars (via `RCLike` structure).
- **Suffixes**:
  - `_norm_eq`: Norm-preserving extension.
  - `_norm_le` / `_norm_lt`: Norm bounds.
  - `_of_`: Derived from a condition (e.g., `of_finiteDimensional`, `of_le_sublinear`).
- **Other patterns**:
  - `mkContinuous`: Constructing a continuous linear map from a bounded one.
  - `comp`: Composition of linear maps.
  - `subtypeL`: Canonical inclusion of a submodule as a continuous linear map.

---

#### 3. **Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rcases` / `obtain` | Extracting existential witnesses or conjunctions. |
| `rw` / `erw` | Rewriting using equalities; `erw` used for definitional issues (e.g., after `← hg.1`). |
| `simp` / `simp only` | Simplifying goals using lemmas and definitions (especially for `re`, `im`, `norm`, `coord`). |
| `apply` / `exact` | Applying lemmas or hypotheses directly. |
| `calc` | Chain of equalities/inequalities (e.g., proving `‖g‖ = ‖f‖`). |
| `le_antisymm` | Proving equality of reals via double inequality. |
| `set_option maxSynthPendingDepth 2` | Workaround for typeclass inference depth (see `coord_norm'`). |
| `ext` | Extensionality for functions/maps (e.g., proving two linear maps equal). |
| `dsimp` | Definitional simplification (e.g., in `Real.exists_extension_norm_eq`). |
| `ring` / `linarith` | Not explicitly used here, but `calc` + `simp` suffices for norm arithmetic. |

---

#### 4. **Proof Logic**

- **Core strategy**:
  - **Real case**: Reduce to sublinear domination (via `norm_add_le`, `norm_smul`), apply `exists_extension_of_le_sublinear`, then construct continuous extension via `mkContinuous`.
  - **Complex case (`RCLike`)**:
    1. Restrict scalars to `ℝ`.
    2. Take real part `fr` of `f`.
    3. Apply real Hahn-Banach to get `g`.
    4. Extend `g` to complex using `extendTo𝕜`.
    5. Verify extension property and norm equality via `reCLM_norm`, `norm_extendTo𝕜`, and `opNorm_le_bound`.
- **Finite-dimensional extension**:
  - Choose a finite basis of the range.
  - Extend each coordinate functional using `exists_extension_norm_eq`.
  - Reassemble via `pi` and basis equivalence.
- **Dual vector construction**:
  - Define functional on 1D subspace `𝕜 ∙ x` as `x ↦ ‖x‖ · coord(x)`.
  - Extend via `exists_extension_norm_eq`.
  - Compute norm using `coord_norm'`.
- **Variant handling**:
  - `exists_dual_vector'`: Split on `x = 0`, use nontriviality to pick nonzero `y`.
  - `exists_dual_vector''`: Use previous result and weaken norm bound.

---

#### 5. **Imports**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.Convex.Cone.Extension` | Used for `exists_extension_of_le_sublinear` (sublinear domination extension). |
| `Mathlib.Analysis.NormedSpace.RCLike` | Defines `RCLike` class for `ℝ`/`ℂ`-like fields; basis for uniform treatment. |
| `Mathlib.Analysis.NormedSpace.Extend` | Provides `extendTo𝕜`, `mkContinuous`, and related extension lemmas. |
| `Mathlib.Analysis.RCLike.Lemmas` | Technical lemmas about `RCLike`, e.g., `reCLM_norm`, `coord_norm`. |

---

### Summary

This file formalizes the **analytic Hahn-Banach theorem** and its key corollaries in Lean 4, covering both real and complex cases via the `RCLike` abstraction. It leverages:
- Sublinear domination for real extension,
- Scalar restriction and complexification for the complex case,
- Finite-dimensional basis tricks for range extensions,
- Coordinate functionals and norm computations for dual vector existence.

The proofs are highly structured, with heavy use of `simp`, `calc`, and `le_antisymm`, and rely on a rich library of normed space and `RCLike` theory.