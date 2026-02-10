### Technical Brief: Clopen Sets in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsClopen` | `Set X → Prop` | Predicate for sets that are both open and closed. Defined as `IsClosed s ∧ IsOpen s`. |
| `isClopen_iff_frontier_eq_empty` | `IsClopen s ↔ frontier s = ∅` | Characterizes clopen sets via empty frontier (i.e., boundary is empty). |
| `isClopen_empty`, `isClopen_univ` | `IsClopen ∅`, `IsClopen univ` | Prove that the empty set and the universal set are clopen. |
| `IsClopen.compl` | `IsClopen s → IsClopen sᶜ` | Complement of a clopen set is clopen. |
| `isClopen_compl_iff` | `IsClopen sᶜ ↔ IsClopen s` | Equivalence expressing symmetry of clopenness under complement. |
| `IsClopen.union`, `IsClopen.inter`, `IsClopen.diff`, `IsClopen.himp` | Binary operations on clopen sets | Closure of clopen sets under union, intersection, difference, and implication (`s ⇨ t = sᶜ ∪ t`). |
| `IsClopen.prod` | `IsClopen s → IsClopen t → IsClopen (s ×ˢ t)` | Product of clopen sets in product topology is clopen. |
| `isClopen_iUnion_of_finite`, `isClopen_biUnion_finset`, etc. | Indexed unions/intersections over finite index types | Clopenness preserved under finite unions and intersections. |
| `IsClopen.preimage` | `IsClopen s → Continuous f → IsClopen (f ⁻¹' s)` | Preimage of clopen under continuous map is clopen. |
| `ContinuousOn.preimage_isClopen_of_isClopen` | `ContinuousOn f s → IsClopen s → IsClopen t → IsClopen (s ∩ f ⁻¹' t)` | Relative preimage of clopen under continuous-on map is clopen. |
| `isClopen_inter_of_disjoint_cover_clopen` | Clopen subset of disjoint open cover ⇒ intersection with one part is clopen | Technical lemma for decomposition arguments. |
| `continuous_boolIndicator_iff_isClopen` | `Continuous U.boolIndicator ↔ IsClopen U` | Connects continuity of Boolean indicator function with clopenness of the set. |
| `isClopen_discrete` | `[DiscreteTopology X] → IsClopen s` | In discrete topology, all sets are clopen. |
| `isClopen_range_inl`, `isClopen_range_inr`, `isClopen_range_sigmaMk` | Range of sum/σ-injections is clopen | Clopenness of canonical embeddings in sum and sigma types. |
| `Topology.IsQuotientMap.isClopen_preimage` | `IsQuotientMap f → IsClopen (f ⁻¹' s) ↔ IsClopen s` | Quotient maps reflect and preserve clopenness. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isClopen_`: for theorems about clopen sets (e.g., `isClopen_empty`, `isClopen_univ`).
  - `continuous_boolIndicator_`: linking continuity and clopenness.
- **Suffixes**:
  - `_iff_`: for equivalences (e.g., `isClopen_compl_iff`, `continuous_boolIndicator_iff_isClopen`).
  - `_of_finite`, `_finset`, `_biUnion`, `_biInter`: indicate finite indexing structure.
- **Structure-based**:
  - `IsClopen.*`: methods on the `IsClopen` structure (e.g., `IsClopen.isOpen`, `IsClopen.compl`).
- **Logical operators**:
  - `himp` for *hypothetical implication* (`s ⇨ t`), defined as `sᶜ ∪ t`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw`: rewriting using equivalences and definitions (`isClopen_iff_frontier_eq_empty`, `himp_eq`, etc.).
- `refine` / `exact`: constructing proofs stepwise.
- `convert`: for equational reasoning with convertible terms.
- `simp_rw`: simplification + rewriting (used in `himp` proof).
- `intro`, `rintro`, `exact`: basic intro/elimination.
- `apply`, `assumption`, `aesop`: for automated reasoning (especially in `himp`, `union`, `inter`, etc.).
- `antisymm`: proving equality of sets via mutual inclusion.
- `subset.trans`, `subset.antisymm`: set inclusion reasoning.
- `convert using 1`: for flexible conversion with minimal rewrites.

---

#### **4. Proof Logic**

- **Structure**: Most proofs follow a *deconstruction* pattern:
  - Unfold `IsClopen` into `IsClosed ∧ IsOpen`.
  - Prove each component separately using known closure properties (e.g., `isClosed.union`, `isOpen.inter`).
- **Equivalence proofs** (`↔`):
  - Split into `→` and `←`.
  - Use `rw` with known lemmas (e.g., `frontier`, `closure_eq_iff_isClosed`, `interior_eq_iff_isOpen`).
- **Finite vs arbitrary unions/intersections**:
  - Finite case uses `isClosed_iUnion_of_finite`, `isOpen_iInter_of_finite`.
  - For `Finset`, reduce to finite sets via `finite_toSet`.
- **Topological reasoning**:
  - Use continuity, preimages, and disjointness to decompose or lift clopenness.
  - E.g., `isClopen_inter_of_disjoint_cover_clopen` uses disjointness and openness to isolate clopen pieces.

---

#### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.Topology.ContinuousOn`: for `ContinuousOn`, preimage lemmas.
  - `Mathlib.Data.Set.BoolIndicator`: for `boolIndicator`, `continuous_boolIndicator_iff_isClopen`.
- **Open namespaces**:
  - `Set`, `Filter`, `Topology`, `TopologicalSpace`: for set operations, topology, filters.
- **Scope**:
  - General topological spaces (`X`, `Y`, `ι`).
  - Clopen sets as a lattice/clopen algebra (closed under Boolean operations).
  - Interactions with continuity, products, quotients, sums, and discrete topology.

---

### Summary

This module formalizes the theory of **clopen sets** in topological spaces, emphasizing their closure under Boolean operations, finite unions/intersections, preimages under continuous/quasi-quotient maps, and their equivalence with continuity of Boolean indicator functions. It serves as foundational infrastructure for further work in connectedness, zero-dimensionality, profinite topology, and Boolean algebras in topology.