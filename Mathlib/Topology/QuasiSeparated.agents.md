### Technical Metadata Brief: Quasi-Separated Spaces in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsQuasiSeparated` | `Set α → Prop` | Defines a subset `s ⊆ α` as *quasi-separated* if intersections of any two compact open subsets of `s` are compact. |
| `QuasiSeparatedSpace` | `Class` | A topological space `α` is *quasi-separated* if intersections of any two compact open subsets of `α` are compact. |
| `isQuasiSeparated_univ_iff` | `IsQuasiSeparated univ ↔ QuasiSeparatedSpace α` | Equivalence between global quasi-separatedness of `α` and `univ` being quasi-separated. |
| `isQuasiSeparated_univ` | `IsQuasiSeparated univ` | Instantiates the above for a `QuasiSeparatedSpace α`. |
| `IsQuasiSeparated.image_of_isEmbedding` | `IsEmbedding f → IsQuasiSeparated s → IsQuasiSeparated (f '' s)` | Pushforward of quasi-separatedness along an embedding. |
| `Topology.IsOpenEmbedding.isQuasiSeparated_iff` | `IsOpenEmbedding f → (IsQuasiSeparated s ↔ IsQuasiSeparated (f '' s))` | Equivalence of quasi-separatedness under open embeddings (pullback & pushforward). |
| `isQuasiSeparated_iff_quasiSeparatedSpace` | `IsOpen s → (IsQuasiSeparated s ↔ QuasiSeparatedSpace s)` | For open subsets, quasi-separatedness coincides with being a quasi-separated space. |
| `IsQuasiSeparated.of_subset` | `s ⊆ t → IsQuasiSeparated t → IsQuasiSeparated s` | Subsets of quasi-separated sets are quasi-separated. |
| `T2Space.to_quasiSeparatedSpace` | Instance | Every Hausdorff space is quasi-separated (since compact opens are closed, and finite intersections of closed sets are closed ⇒ compact). |
| `NoetherianSpace.to_quasiSeparatedSpace` | Instance | Every Noetherian space is quasi-separated (all subsets are compact, so intersections of compact opens are compact). |
| `IsQuasiSeparated.of_quasiSeparatedSpace` | `[QuasiSeparatedSpace α] → IsQuasiSeparated s` | Any subset of a quasi-separated space is quasi-separated (in the relative sense). |
| `QuasiSeparatedSpace.of_isOpenEmbedding` | `IsOpenEmbedding f → QuasiSeparatedSpace β → QuasiSeparatedSpace α` | Pullback of quasi-separatedness along open embeddings. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isQuasiSeparated_`: Relates to `IsQuasiSeparated`, often for equivalences or properties of `univ`.
  - `inter_isCompact`: Core property of `QuasiSeparatedSpace`.
- **Suffixes**:
  - `_iff`: Equivalence statements (e.g., `isQuasiSeparated_univ_iff`).
  - `_of_`: Derived properties (e.g., `of_subset`, `of_isOpenEmbedding`).
- **Aliases**:
  - Deprecated aliases use `alias` with `deprecated` annotation and date (e.g., `image_of_embedding`, `of_openEmbedding`).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rw` | Rewriting definitions (e.g., `preimage_inter`, `image_preimage_eq_inter_range`). |
| `simp` / `simp_rw` | Simplifying using `mk_iff`-generated lemmas (`quasiSeparatedSpace_iff`). |
| `convert` | Matching goals up to definitional equality (e.g., using continuity/compactness lemmas). |
| `symm` | Flipping equalities for substitution. |
| `exact` / `intro` | Standard intro/apply steps. |
| `Set.*` lemmas | E.g., `Set.inter_eq_left`, `Set.image_subset_range`, `Set.subset_univ`. |
| `aesop` (implicit) | Likely used in background automation (not explicit here, but common in Mathlib). |

---

#### **4. Proof Logic**

- **Structure**: Most proofs follow a pattern:
  1. **Introduce** arbitrary compact open subsets `U`, `V`.
  2. **Lift** them via preimage (for embeddings/open embeddings).
  3. **Apply** the hypothesis (e.g., `H`, `hs`, or instance).
  4. **Descend** back using properties like:
     - `h.continuous.1 _ hU'`: continuity pulls back opens.
     - `h.isCompact_iff`: compactness preserved under embeddings.
     - Injectivity for image-preimage simplifications.
- **Key lemmas used**:
  - `Set.preimage_inter`: Distributivity of preimage over intersection.
  - `Set.image_preimage_eq_inter_range`: Image of preimage = intersection with range.
  - `Set.inter_eq_left`: If `U ⊆ range f`, then `f '' (f ⁻¹' U) = U`.
- **Instances** rely on known properties:
  - `T2Space`: Compact opens are closed ⇒ intersections compact.
  - `NoetherianSpace`: All subsets compact ⇒ trivially closed under intersection.

---

#### **5. Imports**

- **Core dependency**:
  ```lean
  import Mathlib.Topology.NoetherianSpace
  ```
- **Open namespaces**:
  ```lean
  open TopologicalSpace Topology
  ```
- **Implicit dependencies** (via Mathlib):
  - `Mathlib.Topology.Basic` (via `TopologicalSpace`)
  - `Mathlib.Topology.Compactness` (for `IsCompact`, `isCompact_iff`, etc.)
  - `Mathlib.Topology.OpenEmbedding` (for `IsOpenEmbedding`, `isOpenMap`, etc.)
  - `Mathlib.Topology.Hausdorff` (for `T2Space`)

---

### Summary

This module formalizes *quasi-separatedness*—a key condition in algebraic geometry and topology—by:
- Defining it for subsets and spaces,
- Proving stability under open embeddings and subsets,
- Providing automatic instances for Hausdorff and Noetherian spaces.

The formalization is clean, modular, and leverages Mathlib’s topology infrastructure effectively.