### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `convexOn_norm` | `Convex ℝ s → ConvexOn ℝ s norm` | Norm is convex on any convex set in a real normed space. |
| `convexOn_univ_norm` | `ConvexOn ℝ univ norm` | Norm is convex on the entire space. |
| `convexOn_dist` | `z : E → Convex ℝ s → ConvexOn ℝ s (dist z')` | Distance to a fixed point is convex on any convex set. |
| `convexOn_univ_dist` | `z : E → ConvexOn ℝ univ (dist z')` | Distance to a fixed point is convex on the whole space. |
| `convex_ball` | `Convex ℝ (Metric.ball a r)` | Open metric balls are convex. |
| `convex_closedBall` | `Convex ℝ (Metric.closedBall a r)` | Closed metric balls are convex. |
| `Convex.thickening` | `Convex ℝ s → δ : ℝ → Convex ℝ (thickening δ s)` | Thickening (Minkowski sum with open ball) preserves convexity. |
| `Convex.cthickening` | `Convex ℝ s → δ : ℝ → Convex ℝ (cthickening δ s)` | Closed thickening preserves convexity. |
| `convexHull_exists_dist_ge` | `x ∈ convexHull ℝ s → ∃ x' ∈ s, dist x y ≤ dist x' y` | Points in convex hull are no farther from `y` than some point in `s`. |
| `convexHull_exists_dist_ge2` | `x ∈ convexHull ℝ s ∧ y ∈ convexHull ℝ t → ∃ x' ∈ s, ∃ y' ∈ t, dist x y ≤ dist x' y'` | Extends previous result to pairs of points in convex hulls. |
| `convexHull_ediam` | `EMetric.diam (convexHull ℝ s) = EMetric.diam s` | EMetric diameter is unchanged by convex hull. |
| `convexHull_diam` | `Metric.diam (convexHull ℝ s) = Metric.diam s` | Metric diameter is unchanged by convex hull. |
| `isBounded_convexHull` | `Bornology.IsBounded (convexHull ℝ s) ↔ Bornology.IsBounded s` | Convex hull is bounded iff original set is bounded. |
| `Wbtw.dist_add_dist` | `Wbtw ℝ x y z → dist x y + dist y z = dist x z` | Points on a line segment satisfy triangle equality. |
| `dist_add_dist_of_mem_segment` | `y ∈ [x -[ℝ] z] → dist x y + dist y z = dist x z` | Segment membership implies additive distance. |
| `isConnected_setOf_sameRay` | `IsConnected { y | SameRay ℝ x y }` | Set of vectors in same ray as `x` is connected. |
| `isConnected_setOf_sameRay_and_ne_zero` | `x ≠ 0 → IsConnected { y | SameRay ℝ x y ∧ y ≠ 0 }` | Nonzero vectors in same ray as nonzero `x` form a connected set. |
| `exists_mem_interior_convexHull_affineBasis` | `s ∈ 𝓝 x → ∃ b : AffineBasis ..., x ∈ interior (convexHull (range b)) ∧ convexHull (range b) ⊆ s` | In finite dimensions, any neighborhood of `x` contains a simplex (convex hull of affine basis) with `x` in its interior. |

---

#### 2. **Naming Conventions**

- **Predicates on sets/objects**:  
  - `convexOn_...`: convexity of a function on a set  
  - `convex_...`: convexity of a set (e.g., `convex_ball`, `convex_closedBall`)  
  - `isConnected_...`: connectedness of a set  
  - `isBounded_...`: boundedness of a set  

- **Operations on convex hulls**:  
  - `convexHull_...`: properties of convex hulls (`ediam`, `diam`, `bounded`, `exists_dist_ge`, etc.)

- **Metric/Distance-related**:  
  - `dist_...`, `edist_...`, `ball`, `closedBall`, `thickening`, `ct thickening`

- **Affine/Vector operations**:  
  - `sameRay`, `segment`, `wbtw`, `centroid`, `affineBasis`, `smul`, `vadd`

- **Prefixes/suffixes**:  
  - `univ_...`: global version (on whole space)  
  - `exists_...`: existential statement  
  - `_le`, `_lt`, `_ge`, `_gt`: inequality direction  
  - `_of_...`: conditional version (e.g., `convexOn_univ_dist` vs `convexOn_dist`)  
  - `_image`, `_preimage`: functional image/preimage usage  
  - `_of_nonneg`, `_of_nonpos`: case analysis on sign  

---

#### 3. **Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` / `simp_rw` | Simplification with definitional equalities, especially for `dist`, `norm`, `convexHull`, `thickening`, etc. |
| `rw` | Rewriting using lemmas like `dist_eq_norm`, `edist_dist`, `mem_vadd_set_iff_neg_vadd_mem`, etc. |
| `exact`, `apply`, `refine` | Goal-directed proof construction, especially with `le_trans`, `antisymm`, `subset_convexHull`, etc. |
| `calc` | Chain of inequalities (e.g., in `convexOn_norm`) |
| `obtain` / `rcases` | Extracting witnesses from existential hypotheses (e.g., `convexHull_exists_dist_ge2`) |
| `by_cases` / `le_total` | Case splits on order or equality (e.g., `hδ : 0 ≤ δ`) |
| `wlog` | WLOG (without loss of generality) reductions (e.g., translating to origin) |
| `set` | Introducing intermediate definitions (e.g., `cnorm`, `ε'`) |
| ` positivity` | Proving positivity of expressions involving `+`, `*`, `/` |
| `linarith` | Linear arithmetic over inequalities |
| `convex_iInter₂`, `convexOn.comp`, `convexOn.convex_lt`, etc. | Applying structure-preserving properties of convex functions/sets |

---

#### 4. **Proof Logic**

- **Structure of proofs**:
  - **Direct inequality proofs**: e.g., `convexOn_norm` uses `norm_add_le` and `norm_smul`.
  - **Reduction via translation/scaling**: e.g., `convexOn_dist`, `exists_mem_interior_convexHull_affineBasis` use translation to reduce to origin.
  - **Inductive or extremal arguments**: e.g., `convexHull_exists_dist_ge` uses convexity of `dist` and extremal property of convex hull.
  - **Diameter preservation**: `convexHull_ediam` uses `antisymm` + `EMetric.diam_mono` + `convexHull_exists_dist_ge2`.
  - **Connectedness via image of intervals**: `isConnected_setOf_sameRay` uses `isConnected_Ici.image` and `sameRay` equivalence with nonnegative scalar multiples.

- **Common proof patterns**:
  - Use of `convexOn.comp_affineMap` to transfer convexity via affine transformations.
  - Use of `convexHull_min` to bound convex hulls inside other convex sets.
  - Use of `Metric.mem_nhds_iff` to extract open balls inside neighborhoods.
  - Use of finite-dimensionality (`finiteDimensional`, `exists_affineBasis_of_finiteDimensional`) to construct affine bases.

---

#### 5. **Imports**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.Convex.Between` | Betweenness, `Wbtw`, segments, midpoint convexity |
| `Mathlib.Analysis.Convex.Jensen` | Jensen’s inequality, convex combinations, convex hulls |
| `Mathlib.Analysis.Convex.Topology` | Topological properties of convex sets (interior, closure, openness) |
| `Mathlib.Analysis.Normed.Group.Pointwise` | Minkowski sum, scaling, translation of sets |
| `Mathlib.Analysis.Normed.Affine.AddTorsor` | Affine spaces, torsors, affine combinations |
| `Mathlib.Analysis.Normed.Affine.AddTorsorBases` | Affine bases, barycentric coordinates, centroids |

These imports define the foundational setting: real normed spaces, affine geometry, convex analysis, and metric/topological structure.

--- 

Let me know if you'd like a diagram of dependencies or a formalized summary for AI agent training.