### Technical Metadata Brief: Simplicial Complexes in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `SimplicialComplex 𝕜 E` | `Type u → Type v → Type (max u v)` (structure) | Core definition: a downward-closed set of *affine independent* finite subsets of `E`, whose convex hulls intersect nicely. |
| `faces K` | `Set (Finset E)` | The collection of faces (as vertex sets) of a simplicial complex `K`. |
| `not_empty_mem K` | `∅ ∉ K.faces` | Ensures no empty face (non-emptiness of simplices). |
| `indep K` | `∀ {s ∈ K.faces}, AffineIndependent 𝕜 (↑ : s → E)` | Each face’s vertices are affinely independent (ensures well-defined simplex geometry). |
| `down_closed K` | `∀ {s t}, s ∈ K.faces → t ⊆ s → t ≠ ∅ → t ∈ K.faces` | Downward closure: non-empty subsets of faces are faces. |
| `inter_subset_convexHull K` | `∀ {s t ∈ K.faces}, convHull s ∩ convHull t ⊆ convHull (s ∩ t)` | “Gluing condition”: intersection of convex hulls lies in convex hull of intersection of vertices. |
| `space K` | `Set E` | Union of convex hulls of all faces: underlying topological space of `K`. |
| `vertices K` | `Set E` | Zero-dimensional faces: `{x | {x} ∈ K.faces}`. |
| `facets K` | `Set (Finset E)` | Maximal faces under inclusion: `{s ∈ K.faces | ∀ t ∈ K.faces, s ⊆ t → s = t}`. |
| `convexHull_inter_convexHull` | `convexHull s ∩ convexHull t = convexHull (s ∩ t)` | Equality version of gluing condition (proven using `inter_subset_convexHull` + monotonicity). |
| `face_subset_face_iff` | `convexHull s ⊆ convexHull t ↔ s ⊆ t` | For faces `s, t`, inclusion of convex hulls ⇔ inclusion of vertex sets. |
| `vertex_mem_convexHull_iff` | `x ∈ convHull s ↔ x ∈ s` (for `x` a vertex of `K`) | A vertex lies in a face’s convex hull iff it belongs to the face’s vertex set. |
| `ofErase`, `ofSubcomplex` | Constructors | Build new simplicial complexes from existing data (e.g., removing empty set, restricting to subcomplex). |
| `instance : SemilatticeInf (SimplicialComplex 𝕜 E)` | `inf = ⊓` | Meet (intersection) of two complexes: faces = intersection of face sets. |
| `instance : OrderBot (SimplicialComplex 𝕜 E)` | `⊥` | Bottom element: empty complex (no faces). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`, `mem_`, `subset_`, `convexHull_`, `vertex_`, `facet_`, `face_`, `inter_`, `down_closed`, `indep`, `not_empty_mem`.
- **Suffixes**:
  - `_iff`: characterizations (e.g., `mem_space_iff`, `vertex_mem_convexHull_iff`).
  - `_subset`: inclusion lemmas (e.g., `vertices_subset_space`, `convexHull_subset_space`).
  - `_eq`: equality lemmas (e.g., `convexHull_inter_convexHull`, `vertices_eq`).
- **Structure fields**:
  - `faces`, `not_empty_mem`, `indep`, `down_closed`, `inter_subset_convexHull`.
- **Constructors**:
  - `ofErase`, `ofSubcomplex`: named for construction method.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp_rw`: simplification with definitional equalities (e.g., `mem_space_iff`, `vertices_eq`).
- `convert`: for equational reasoning with convertible terms (e.g., `convexHull_subset_space`).
- `rfl`, `refine`, `exact`: basic proof automation.
- `ext`: extensionality for sets/functions.
- `push_neg`: negation normal form (e.g., `not_facet_iff_subface`).
- `classical`: classical reasoning (e.g., in `disjoint_or_exists_inter_eq_convexHull`).
- `antisymm`: proving set equality via mutual inclusion.
- `subset_inter`, `convexHull_mono`, `Finset.disjoint_iff_inter_eq_empty`: specialized lemmas applied repeatedly.
- `rwa`, `rw [← ...]`: rewriting with reverse direction or using `coerce` lemmas (`coe_inter`, `coe_empty`, etc.).

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - **Inductive/constructive reasoning** on finite sets (`Finset`) and their subsets.
  - **Case analysis** on membership (`mem_` lemmas), subset relations (`subset_`), and non-emptiness.
  - **Equational reasoning** using `antisymm` for set equalities (e.g., `convexHull_inter_convexHull`).
  - **Logical equivalence** (`↔`) proven via `⟨fun h => ..., fun h => ...⟩`.
  - **Classical contradiction** (`by_contra!`) used in disjunction-based lemmas (`disjoint_or_exists_inter_eq_convexHull`).
  - **Downward closure** leveraged to reduce statements about arbitrary subsets to known faces.

- **Typical flow**:
  1. Unfold definitions (`simp`/`rfl`).
  2. Apply `down_closed` or `indep` to reduce to known faces.
  3. Use convexity lemmas (`convexHull_mono`, `subset_convexHull`) to relate sets.
  4. Use `antisymm` or `disjoint_iff` to handle intersections.

---

#### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.Analysis.Convex.Hull`: defines `convexHull`, convexity, and related lemmas.
  - `Mathlib.LinearAlgebra.AffineSpace.Independent`: defines `AffineIndependent`, key for `indep` condition.

- **Implicit dependencies**:
  - `OrderedRing 𝕜`: ensures `𝕜` supports convex combinations (e.g., `ℝ`).
  - `AddCommGroup E`, `Module 𝕜 E`: `E` is a `𝕜`-module (ambient space for simplices).
  - `Finset`, `Set`: standard finite set and set theory.

- **Scope**:
  - Formalizes **abstract simplicial complexes** embedded in a `𝕜`-module, with geometric realization via convex hulls.
  - Focuses on **combinatorial + topological structure** (faces, vertices, facets, gluing).
  - Does *not* yet model simplicial maps or homology (as per `TODO`).

---

### Summary

This module provides a rigorous, *combinatorially grounded* formalization of simplicial complexes in a `𝕜`-module, emphasizing:
- **Affine independence** of vertices (to avoid degenerate simplices),
- **Downward closure** and **intersection compatibility** (via convex hulls),
- **Lattice-theoretic structure** (meet, bottom element),
- **Equivalence between face inclusion and convex hull inclusion**.

It serves as a foundation for further development (e.g., homology, triangulations, topological data analysis), with clear separation of combinatorial and geometric aspects.