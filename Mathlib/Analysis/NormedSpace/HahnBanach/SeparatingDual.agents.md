### Technical Brief: `SeparatingDual` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `separatingDual_def` | `separatingDual_def : SeparatingDual R V ↔ ∀ x : V, x ≠ 0 → ∃ f : V →L[R] R, f x ≠ 0` | Equivalence defining the `SeparatingDual` typeclass: continuous linear functionals separate points. |
| `exists_ne_zero'` | `∀ x : V, x ≠ 0 → ∃ f : V →L[R] R, f x ≠ 0` | Core witness for `SeparatingDual`; used to construct separating functionals. |
| `exists_separating_of_ne` | `x ≠ y → ∃ f : V →L[R] R, f x ≠ f y` | Separates *distinct points* via a continuous linear functional. |
| `t1Space`, `t2Space` | `T1Space V`, `T2Space V` under assumptions on `R` | Shows that `V` inherits separation axioms from `R` when dual separates points. |
| `separatingDual_iff_injective` | `SeparatingDual R V ↔ Function.Injective (flip (dualMap R R V))` | Connects `SeparatingDual` to injectivity of the dual map (for fields). |
| `dualMap_surjective_iff` | `Surjective (f.dualMap ∘ toLinearMap) ↔ Injective f` | For finite-dimensional `W`, extension of functionals from `W` to `V` corresponds to injectivity of `f`. |
| `exists_eq_one` | `x ≠ 0 → ∃ f : V →L[R] R, f x = 1` | Normalized separating functional (maps nonzero vector to 1). |
| `exists_eq_one_ne_zero_of_ne_zero_pair` | `x ≠ 0 ∧ y ≠ 0 → ∃ f, f x = 1 ∧ f y ≠ 0` | Simultaneously normalizes at `x` and avoids vanishing at `y`. |
| `exists_continuousLinearEquiv_apply_eq` | `x ≠ 0 ∧ y ≠ 0 → ∃ A : V ≃L[R] V, A x = y` | Transitivity of `V ≃L[R] V` on nonzero vectors — key structural result. |
| `completeSpace_of_completeSpace_continuousLinearMap` | `CompleteSpace (E →L[𝕜] F) → CompleteSpace F` | Completeness descends from space of continuous linear maps to codomain. |
| `completeSpace_continuousLinearMap_iff` | `CompleteSpace (E →L[𝕜] F) ↔ CompleteSpace F` | Equivalence for normed spaces over nontrivially normed fields. |
| `completeSpace_of_completeSpace_continuousMultilinearMap` | `CompleteSpace (ContinuousMultilinearMap 𝕜 M F) → CompleteSpace F` | Extends completeness result to multilinear maps. |
| `completeSpace_continuousMultilinearMap_iff` | `CompleteSpace (ContinuousMultilinearMap 𝕜 M F) ↔ CompleteSpace F` | Multilinear version of completeness equivalence. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `exists_`: asserts existence of a functional or equivalence (e.g., `exists_ne_zero`, `exists_eq_one`).
  - `separatingDual_`: module-level namespace for results about `SeparatingDual`.
  - `completeSpace_`: results about completeness of function spaces.

- **Suffixes**:
  - `_iff`: characterizes `SeparatingDual` or completeness via logical equivalence.
  - `_of_`: conditional version (e.g., `exists_eq_one_ne_zero_of_ne_zero_pair`).
  - `_continuous`: emphasizes continuity (e.g., `continuousLinearEquiv`, `continuousLinearMap`).

- **Functional terms**:
  - `dualMap`, `flip`, `smulRightL`, `compContinuousLinearMapL`: standard multilinear/dual constructions.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Role |
|--------|------|
| `rcases` / `obtain` | Extract witnesses from existential hypotheses (e.g., separating functionals). |
| `simp_rw` / `simp` | Simplify using `separatingDual_def`, `map_zero`, `inv_mul_cancel₀`, etc. |
| `aesop` / `abel` | Solve algebraic equalities in abelian groups/rings (e.g., verifying inverses). |
| `rw` / `apply` | Rewrite using lemmas like `inv_mul_cancel₀`, `mul_inv_cancel₀`. |
| `fun_prop` | Prove continuity of constructions (e.g., evaluation maps). |
| `push_neg` | Convert `¬(∀ … → …)` to `∃ … ∧ …`. |
| `congrm` / `congr` | Reduce goals by congruence (e.g., in `separatingDual_iff_injective`). |
| `exact` / `refine` | Construct terms with holes filled later (e.g., `refine ⟨f, ?_⟩`). |

---

#### **4. Proof Logic**

- **Inductive/constructive style**: Proofs often proceed by:
  1. **Extracting a separating functional** via `exists_ne_zero` or `exists_eq_one`.
  2. **Normalizing** (e.g., scaling to get `f x = 1`).
  3. **Combining functionals** (e.g., `u + v`) to satisfy multiple constraints.
  4. **Defining explicit operators** (e.g., `A z = z + G z • (y - x)`) and verifying properties (inverse, continuity, etc.).
- **Completeness arguments**:
  - Lift a Cauchy sequence in `F` to one in `E →L[𝕜] F` or `ContinuousMultilinearMap`, use completeness there, then evaluate at a carefully chosen nonzero vector.
  - Use `tendsto` and continuity of evaluation to pass limits.

---

#### **5. Imports & Scope**

**Primary imports**:
- `Mathlib.Analysis.NormedSpace.HahnBanach.Extension`  
  → Analytic Hahn-Banach (for normed spaces over `ℝ`/`ℂ`).
- `Mathlib.Analysis.NormedSpace.HahnBanach.Separation`  
  → Geometric Hahn-Banach (for locally convex spaces).
- `Mathlib.Analysis.NormedSpace.Multilinear.Basic`  
  → Multilinear maps, `ContinuousMultilinearMap`.
- `Mathlib.Analysis.NormedSpace.OperatorNorm.Completeness`  
  → Completeness of `E →L[𝕜] F`.
- `Mathlib.LinearAlgebra.Dual`  
  → Linear duality, `dualMap`, `flip`.

**Domain scope**:
- Topological modules over topological rings.
- Normed spaces over `ℝ`, `ℂ`, or `RCLike 𝕜`.
- Locally convex spaces (via `LocallyConvexSpace`).
- Finite-dimensional subspaces and multilinear contexts.

---

### Summary

This file formalizes the foundational theory of **spaces with separating dual**, emphasizing:
- **Separation properties** (`T1`, `T2`) induced by dual functionals.
- **Transitivity of continuous linear equivalences** on nonzero vectors.
- **Completeness transfer** from function spaces to the underlying space.

It leverages Hahn–Banach theorems (analytic and geometric) to instantiate `SeparatingDual` for key classes of spaces, and uses constructive methods to build functionals and equivalences. The formalization is highly modular, with clean interfaces via typeclasses and equivalences (`↔`).