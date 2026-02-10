### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `stdSimplex ℝ ι` | `Set (ι → ℝ)` | Standard simplex: set of functions `f : ι → ℝ` with `∑ f = 1` and `f ≥ 0`. Used to parametrize convex combinations. |
| `closedConvexHull 𝕜 s` | `ClosureOperator (Set E)` | Minimal convex *closed* superset of `s`. Defined via complete predication over convex & closed sets. |
| `Convex.interior` | `Convex 𝕜 s → Convex 𝕜 (interior s)` | Interior of a convex set in a TVS is convex. |
| `Convex.closure` | `Convex 𝕜 s → Convex 𝕜 (closure s)` | Closure of a convex set in a TVS is convex. |
| `closedConvexHull_closure_eq_closedConvexHull` | `closedConvexHull 𝕜 (closure s) = closedConvexHull 𝕜 s` | Closed convex hull is insensitive to taking closure of the input set. |
| `Set.Finite.isCompact_convexHull` | `s.Finite → IsCompact (convexHull ℝ s)` | Convex hull of a finite set is compact (uses `stdSimplex` compactness). |
| `Set.Finite.isClosed_convexHull` | `s.Finite → IsClosed (convexHull ℝ s)` | Convex hull of a finite set is closed (follows from compactness in Hausdorff spaces). |
| `Convex.combo_interior_closure_subset_interior` | `Convex 𝕜 s → 0 < a → 0 ≤ b → a + b = 1 → a • interior s + b • closure s ⊆ interior s` | Convex combinations of interior and closure points stay in interior. |
| `Convex.closure_interior_eq_closure_of_nonempty_interior` | `Convex 𝕜 s → (interior s).Nonempty → closure (interior s) = closure s` | For convex sets with nonempty interior, closure equals closure of interior. |
| `Convex.interior_closure_eq_interior_of_nonempty_interior` | `Convex 𝕜 s → (interior s).Nonempty → interior (closure s) = interior s` | Dually, interior equals interior of closure. |
| `Convex.isPathConnected` | `Convex ℝ s → s.Nonempty → IsPathConnected s` | Nonempty convex sets in TVS over `ℝ` are path-connected. |
| `TopologicalAddGroup.pathConnectedSpace` | `PathConnectedSpace E` | Any TVS over `ℝ` is path-connected. |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `isCompact_`, `isClosed_`, `isPreconnected_`, `isPathConnected_`: properties of sets.
  - `convex_`, `closedConvexHull_`, `stdSimplex_`: convexity-related objects.
  - `combo_`: convex combinations (`combo_interior_closure`, `combo_self_interior`, etc.).
  - `openSegment_`, `segment_`: line segment-related lemmas.
  - `homothety_`: dilation/scaling lemmas.

- **Suffixes**:
  - `_subset_interior`, `_mem_interior`: membership in interior.
  - `_eq_`: equality lemmas (e.g., `closure_interior_eq_closure`, `closedConvexHull_closure_eq_closedConvexHull`).
  - `_of_`: conditional versions (e.g., `isPathConnected_of_nonempty_interior`).
  - `_mem_`: membership in sets (e.g., `combo_interior_closure_mem_interior`).

- **Function names**:
  - `segment`, `openSegment`, `closedBall`, `ball`, `stdSimplex`, `closedConvexHull`, `homothety`, `lineMap`, `affineEquiv`, `linearProjOfIsCompl`.

#### 3. **Tactic Stack**

Frequently used tactics in proofs:
- `rw`, `simp`, `simp_rw`: rewriting and simplification (especially with `←`, `symm`, `mem_`, `image_`, `add_`, `smul_` lemmas).
- `exact`, `apply`, `convert`: proof construction.
- `intro`, `rintro`, `rcases`, `cases'`: destructuring.
- `subset_antisymm`: proving equality of sets via double inclusion.
- `fun_prop`, `continuous_on`, `continuous_smul`, `continuous_add`: continuity proofs.
- `isCompact_iff_compactSpace`, `isClosed_iff`, `isPreconnected_iff_ordConnected`: equivalence-based reasoning.
- `image_subset`, `image_image`, `image_closure_subset_closure_image`: image manipulation.
- `mem_interior_iff_mem_nhds`, `mem_closure_iff_nhds`, `segment_eq_image_lineMap`: pointwise membership characterizations.
- `add_subset_add`, `subset_interior_add_left`, `interior_mono`: monotonicity of topological operators.

#### 4. **Proof Logic**

- **Inductive/structural reasoning**:
  - Many proofs use *continuity + density* arguments: e.g., `closure_interior_eq_closure` uses continuity of `lineMap` and density of `(0,1)` in `[0,1]`.
  - Convexity is often reduced to `openSegment ⊆ s` via `convex_iff_openSegment_subset`.
  - For `closure`/`interior` convexity: use `a • x + b • y ∈ s` for `x, y ∈ closure/int s` and continuity of affine combinations.

- **Topological arguments**:
  - Use `closure_minimal`, `interior_mono`, `image_closure_subset_closure_image`.
  - For compactness: reduce to `stdSimplex` compactness + continuity of linear maps (`isCompact_stdSimplex`, `isCompact_convexHull`).
  - For path-connectedness: construct paths via `lineMap` or `segment`.

- **Set-theoretic reasoning**:
  - `sInter`, `image`, `preimage`, `union`, `insert`, `subset_antisymm` dominate.
  - Use `Pairwise` for strict convexity conditions.

#### 5. **Imports**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.Convex.Combination` | Convex combinations, `stdSimplex`, `convexHull` definitions. |
| `Mathlib.Analysis.Convex.Strict` | Strict convexity, `strictConvex'`, `strictConvex`. |
| `Mathlib.Topology.Connected.PathConnected` | Path-connectedness, `JoinedIn`, `isPathConnected`. |
| `Mathlib.Topology.Algebra.Affine` | Affine maps, `lineMap`, `homothety`, `AffineEquiv`. |
| `Mathlib.Topology.Algebra.Module.Basic` | Topological modules, continuity of `+`, `•`. |

---

This module formalizes foundational *topological* properties of convex sets in topological vector spaces over `ℝ` (and more generally over linearly ordered fields/rings), with heavy use of continuity, segment geometry, and closure/interior interactions. It serves as a core reference for convex analysis in Lean’s topology/analysis library.