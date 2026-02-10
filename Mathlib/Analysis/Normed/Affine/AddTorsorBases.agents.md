### Technical Brief: Bases in Normed Affine Spaces (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `continuous_barycentric_coord` | `∀ i, Continuous (b.coord i)` | Barycentric coordinate maps are continuous in finite-dimensional normed affine spaces. |
| `isOpenMap_barycentric_coord` | `IsOpenMap (b.coord i)` | Each barycentric coordinate map is an open map (under finite-dimensionality and nontrivial index type). |
| `AffineBasis.interior_convexHull` | `interior (convexHull ℝ (range b)) = {x | ∀ i, 0 < b.coord i x}` | Characterizes the interior of the convex hull of an affine basis as points with strictly positive barycentric coordinates. |
| `IsOpen.exists_between_affineIndependent_span_eq_top` | `∃ t ⊇ s, t ⊆ u, AffineIndependent t, affineSpan t = ⊤` | Given an affine-independent finite subset `s` inside an open set `u`, extend it to a full affine basis still lying in `u`. |
| `IsOpen.exists_subset_affineIndependent_span_eq_top` | `∃ s ⊆ u, AffineIndependent s, affineSpan s = ⊤` | Every nonempty open set in a finite-dimensional normed affine space contains an affine basis. |
| `IsOpen.affineSpan_eq_top` | `affineSpan ℝ u = ⊤` | The affine span of any nonempty open set is the entire space. |
| `affineSpan_eq_top_of_nonempty_interior` | `(interior (convexHull s)).Nonempty → affineSpan s = ⊤` | If the convex hull of a set has nonempty interior, then the set affinely spans the whole space. |
| `AffineBasis.centroid_mem_interior_convexHull` | `Finset.univ.centroid ℝ b ∈ interior (convexHull (range b))` | The centroid of an affine basis lies in the interior of its convex hull. |
| `interior_convexHull_nonempty_iff_affineSpan_eq_top` | `(interior (convexHull s)).Nonempty ↔ affineSpan s = ⊤` | Equivalence between nonempty interior of convex hull and full affine span (in finite-dimensional setting). |
| `Convex.interior_nonempty_iff_affineSpan_eq_top` | `(interior s).Nonempty ↔ affineSpan s = ⊤` (for convex `s`) | For convex sets, nonempty interior iff full affine span. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `continuous_`, `isOpenMap_`: indicate topological properties of maps.
  - `interior_`, `convexHull_`: refer to standard geometric constructions.
  - `affineSpan_`: relates to affine hulls.
  - `centroid_`: refers to barycenter/centroid constructions.

- **Suffixes**:
  - `_coord`: barycentric coordinate functions.
  - `_mem_interior_convexHull`: membership of a canonical point (e.g., centroid) in the interior of a convex hull.
  - `_between_affineIndependent_span_eq_top`: extension of independent sets to bases within a container.

- **General patterns**:
  - `exists_subset_...`: existential statements about extending subsets.
  - `_nonempty_iff_...`: characterizations via nonemptiness conditions.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `cases subsingleton_or_nontrivial ι` | Splitting into zero-dimensional and positive-dimensional cases. |
| `simp only [...]` | Simplification with precise lemmas (e.g., `interior_iInter_of_finite`, `mem_setOf_eq`). |
| `rw [...]` | Rewriting using equalities like `b.convexHull_eq_nonneg_coord`. |
| `exact`, `refine`, `intro`, `rintro` | Standard proof construction. |
| `gcongr` | Used in `Convex.interior_nonempty_iff_affineSpan_eq_top` to handle monotonicity. |
| `lift ... to Finset` | Conversion from finite type to finite set for centroid usage. |
| `lineMap_apply`, `dist_eq_norm_vsub`, `norm_smul`, `abs_div`, etc. | Normed space arithmetic simplifications. |
| `dif_pos`, `dif_neg`, `if_pos`, `if_neg` | Handling `if-then-else` expressions in definitions like `w`. |

---

#### **4. Proof Logic**

- **Structure of main proofs**:
  - **Case analysis** on whether the index type `ι` is subsingleton or nontrivial.
  - In the **positive-dimensional case**, finite-dimensionality is used to apply:
    - `continuous_of_finiteDimensional`
    - `isOpenMap_of_finiteDimensional`
    - `convexHull_eq_nonneg_coord`
  - **Interior computations** rely on:
    - `interior_iInter_of_finite`
    - `preimage_interior_eq_interior_preimage` under open maps.
  - **Extension lemmas** (`exists_between_...`) use:
    - Metric neighborhood arguments (`closedBall`, `lineMap`)
    - Construction of scaled points via `lineMap q p (w p)`
    - Properties of `AffineIndependent.units_lineMap`
  - **Equivalence proofs** (`↔`) use:
    - One direction via `affineSpan_eq_top_of_nonempty_interior`
    - Other direction via existence of affine subbasis and centroid argument.

- **Common proof pattern**:
  > *Reduce to known structure (e.g., convex hull of basis), use barycentric coordinates to describe interior, apply topological properties (continuity, openness), and leverage finite-dimensionality for compactness/continuity equivalences.*

---

#### **5. Imports & Scope**

**Primary imports**:
- `Mathlib.Analysis.Normed.Module.FiniteDimension`: finite-dimensional normed modules, continuity/openness of linear maps.
- `Mathlib.LinearAlgebra.AffineSpace.FiniteDimensional`: affine spaces, affine independence, affine span, convex hulls.

**Domain scope**:
- **Setting**: finite-dimensional normed affine spaces over `ℝ`, modeled as `MetricSpace P` with `NormedAddTorsor V P`.
- **Core objects**: affine bases, barycentric coordinates, convex hulls, interiors, centroids.
- **Applications**: geometry of convex sets, topology of affine spaces, extension of independent sets.

---

This module formalizes foundational results connecting **affine geometry**, **convexity**, and **topology** in finite-dimensional normed affine spaces — especially how barycentric coordinates control interior points of convex hulls and how open sets necessarily contain full affine bases.