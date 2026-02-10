### Technical Brief: Locally Closed Sets in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `coborder s` | `Set X` | Defined as `closure s \ s` (i.e., the *coboundary* or *border complement* of `s`). Used to characterize locally closed sets. |
| `IsLocallyClosed s` | `Prop` | Predicate: `s` is *locally closed* if it is the intersection of an open set and a closed set. |
| `subset_coborder` | `s ⊆ coborder s` | Trivial inclusion: every set is contained in its coborder. |
| `coborder_inter_closure` | `coborder s ∩ closure s = s` | Fundamental identity: coborder intersected with closure recovers `s`. |
| `coborder_eq_union_frontier_compl` | `coborder s = s ∪ (frontier s)ᶜ` | Alternative expression of coborder using frontier. |
| `coborder_eq_univ_iff` | `coborder s = univ ↔ IsClosed s` | Characterizes closed sets via coborder being the whole space. |
| `coborder_eq_compl_frontier_iff` | `coborder s = (frontier s)ᶜ ↔ IsOpen s` | Characterizes open sets via coborder being the complement of the frontier. |
| `dense_coborder` | `Dense (coborder s)` | Coborder of any set is dense — a topological regularity property. |
| `IsOpenMap.coborder_preimage_subset` | `coborder (f ⁻¹' s) ⊆ f ⁻¹' (coborder s)` | Preimage under open map preserves coborder inclusion. |
| `Continuous.preimage_coborder_subset` | `f ⁻¹' (coborder s) ⊆ coborder (f ⁻¹' s)` | Preimage under continuous map preserves coborder inclusion. |
| `coborder_preimage` | `coborder (f ⁻¹' s) = f ⁻¹' (coborder s)` | Equality when `f` is both open and continuous (e.g., open embedding). |
| `isClosed_preimage_val_coborder` | `IsClosed (coborder s ↓∩ s)` | The coborder intersected with `s` is closed in the subspace topology on `s`. |
| `isLocallyClosed_tfae` | `List.TFAE [...]` | Main equivalence theorem: 5 conditions equivalent to `IsLocallyClosed s`. |
| `isLocallyClosed_iff_isOpen_coborder` | `IsLocallyClosed s ↔ IsOpen (coborder s)` | Direct equivalence between locally closed and open coborder. |
| `IsLocallyClosed.isOpen_preimage_val_closure` | `IsOpen (closure s ↓∩ s)` | If `s` is locally closed, then `s` is open in its closure. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `coborder_`: for lemmas about the coborder operation.
  - `isLocallyClosed_`: for lemmas about the `IsLocallyClosed` predicate.
  - `dense_`, `closure_`, `frontier_`, `preimage_`: standard topological operations.

- **Suffixes**:
  - `_iff`: for biconditional characterizations.
  - `_tfae`: for “the following are equivalent” lemmas.
  - `_subset`, `_eq`, `_iff`: standard for inclusion/equality/equivalence lemmas.

- **Aliases**:
  - `alias ⟨_, IsClosed.coborder_eq⟩ := coborder_eq_univ_iff`
  - `alias ⟨_, IsOpen.coborder_eq⟩ := coborder_eq_compl_frontier_iff`
  - Deprecated aliases for older naming (`OpenEmbedding`, `Inducing`, etc.)

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `rw`, `simp`, `simp_rw`, `refine`, `exact`, `apply`, `convert`
  - `tfae_have`, `tfae_finish` (from `Mathlib.Tactic.TFAE`)
  - `ext`, `funext`, `subset_antisymm`, `inter_eq_right.mpr`, `diff_eq_compl_inter`
  - `choose`, `cases`, `intro`, `intro h`, `rintro`, `obtain`
  - `closure_mono`, `subset_closure`, `closure_subset_iff_isClosed`

- **Topology-specific automation**:
  - `nhds_basis_open_mem`, `mem_nhds_iff`, `isClosed_preimage_val`, `isOpen_preimage_val`
  - `image_preimage_eq_inter_range`, `image_injective.mpr`, `subset_inter`, `inter_subset_inter`

---

#### **4. Proof Logic**

- **Structure of `isLocallyClosed_tfae`**:
  - Uses `tfae_have` to prove a cycle of implications:
    - **1 → 2**: Express `s = U ∩ Z`, then expand coborder using frontier decomposition; use openness of `U` and openness of complement of frontier.
    - **2 → 3**: Use that coborder is open ⇒ neighborhoods from coborder give closed intersections.
    - **3 → 4**: Refine neighborhood condition to open `U` with `U ∩ closure s ⊆ s`.
    - **4 → 5**: Construct open set in closure as union of `U ∩ closure s`, showing `s` is open in `closure s`.
    - **5 → 1**: Use embedding `subtypeVal : closure s ↪ X`, and that `s` open in `closure s` ⇒ preimage of open set ⇒ locally closed.

- **General proof style**:
  - Heavy use of set-theoretic identities (`diff_eq_compl_inter`, `closure_eq_self_union_frontier`, etc.)
  - Subtle interplay between subspace topology (`↓∩`), preimages, and closure operations.
  - Leverages `IsInducing`/`IsEmbedding` to transfer local closedness along embeddings.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Topology.Constructions` | Core topology constructions: closure, frontier, subspace topology, preimage, etc. |
| `Mathlib.Tactic.TFAE` | For `tfae_have`, `tfae_finish`, and handling cyclic equivalence proofs. |

---

### Summary

This file formalizes the theory of **locally closed sets** in topological spaces, with a focus on the **coborder** operation (`closure s \ s`). It establishes multiple equivalent characterizations (via openness of coborder, local closedness in neighborhoods, openness in closure, etc.), and proves stability under intersections, preimages, and (under mild conditions) images. The proofs rely on classical set-theoretic topology and are formalized using Lean’s `tfae` infrastructure for equivalence chains. The module is foundational for further work on stratified spaces, constructible sets, or sheaf theory where locally closed subsets play a role.