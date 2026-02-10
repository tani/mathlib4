### Technical Brief: Properties Local at the Target in Topological Spaces (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsInducing` | `α → β → Prop` | A map `f : α → β` is *inducing* if it induces the topology on its image (i.e., `f` is continuous and the topology on `α` is the pullback of the subspace topology on `range f`). |
| `IsEmbedding` | `α → β → Prop` | `f` is an *embedding* iff it is inducing and injective. |
| `IsOpenEmbedding` | `α → β → Prop` | `f` is an *open embedding* iff it is an embedding and an open map. |
| `IsClosedEmbedding` | `α → β → Prop` | `f` is a *closed embedding* iff it is an embedding and a closed map. |
| `restrictPreimage` | `Set β → (α → β) → α → s` | For `s : Set β`, `s.restrictPreimage f` is the corestricted map `f⁻¹(s) → s`, i.e., `x ↦ ⟨f x, hx⟩` where `hx : f x ∈ s`. |
| `isOpen_iff_inter_of_iSup_eq_top` | `s : Set β → Prop` | Characterizes openness of `s` in terms of openness of intersections with an open cover `U i` whose union is `⊤`. |
| `isEmbedding_iff_of_iSup_eq_top` | `Continuous f → Prop` | `f` is an embedding iff all restrictions `U i.1.restrictPreimage f` are embeddings, assuming `⋃ i, U i = ⊤`. |
| `isOpenEmbedding_iff_isOpenEmbedding_of_iSup_eq_top` | `Continuous f → Prop` | Analogous to above for open embeddings. |
| `isClosedEmbedding_iff_isClosedEmbedding_of_iSup_eq_top` | `Continuous f → Prop` | Analogous to above for closed embeddings. |
| `inducing_iff_inducing_of_iSup_eq_top` | `Continuous f → Prop` | `f` is inducing iff all `U i.1.restrictPreimage f` are inducing. |
| `isClosedMap_iff_isClosedMap_of_iSup_eq_top` / `isOpenMap_iff_isOpenMap_of_iSup_eq_top` | `Prop` | Characterize closed/open maps via local restrictions. |
| `denseRange_iff_denseRange_of_iSup_eq_top` | `Prop` | Density of range is local at the target w.r.t. open covers. |
| `isEmbedding_of_iSup_eq_top_of_preimage_subset_range` | `Prop` | A *sufficient* condition for `f` to be an embedding: if the domain is covered by opens pulled back from an open cover of the range, and each local piece is an embedding, then `f` is an embedding. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isInducing`, `isEmbedding`, `isOpenEmbedding`, `isClosedEmbedding`, `isOpenMap`, `isClosedMap`, `isLocallyClosed`, `denseRange`: predicate-style naming for properties.
  - `restrictPreimage`: action-based naming for the operation of restricting the codomain and prerestricting the domain.
- **Suffixes**:
  - `_of_iSup_eq_top`: indicates equivalence or implication under the assumption `iSup U = ⊤`.
  - `_iff_`: indicates biconditional characterizations.
  - `_preimage`: often used for maps defined via preimage restriction (e.g., `subtypeVal.preimage`, `continuous_subtype_val`).
- **Aliases**:
  - Deprecated aliases like `Set.restrictPreimage_inducing`, `Embedding.restrictPreimage`, etc., point to newer `is_`-prefixed versions.
  - `alias Topology.IsEmbedding.restrictPreimage := ...` shows module-level organization.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp_rw` | Rewriting with definitional equalities and lemmas (e.g., `restrictPreimage`, `nhds`, `comap`). |
| `rw` | Standard rewriting, especially for set-theoretic identities (`image_preimage_eq_inter_range`, `range_restrictPreimage`, etc.). |
| `exact`, `refine`, `convert` | Goal-directed proof construction, often with `ext` for extensionality. |
| `intro`, `cases`, `obtain` | Logical decomposition and existential elimination. |
| `convert` + `ext` | Proving equality of sets/functions by extensionality. |
| `simpa` | Simplifying with a lemma or context (e.g., `simpa [isClosed_induced_iff]`). |
| `fun_prop` | Propagation of continuity hypotheses (from `Topology.Basic`). |
| `have`, `suffices` | Intermediate lemma introduction and goal switching. |
| `wlog` | Without loss of generality, used in `isEmbedding_of_iSup_eq_top_of_preimage_subset_range`. |
| `convert` + ` rfl` | For trivial equalities after simplification. |

---

#### **4. Proof Logic**

- **Structure of Main Results**:
  - Most theorems follow a *local-to-global* pattern:  
    Given an open cover `U i` of the codomain (or of `range f`), show that a global property of `f` holds iff all local restrictions `U i.restrictPreimage f` have the property.
  - Proofs typically:
    1. Reduce to checking openness/closedness via preimage characterizations (`isOpen_induced_iff`, `isClosed_induced_iff`).
    2. Use `isOpen_iff_inter_of_iSup_eq_top` or its variants to reduce to intersections with `U i`.
    3. Apply continuity and properties of `restrictPreimage` (e.g., `image_restrictPreimage`, `range_restrictPreimage`).
    4. Use filter-theoretic characterizations for `IsInducing` (`isInducing_iff_nhds`, `nhds_eq_comap`).
    5. For embeddings, combine injectivity and inducing properties; injectivity often reduces to `iUnion_eq_univ` or surjectivity of the cover.

- **Notable Proof Techniques**:
  - **Filter-based reasoning**: `nhds`, `comap`, `map`, and `Filter.le_principal_iff` used to analyze inducing maps.
  - **Set-theoretic manipulation**: `image_preimage_eq_inter_range`, `Set.inter_iUnion`, `Subtype.range_coe`.
  - **Cover-based equivalence**: `iSup U = ⊤` is used to lift properties from local pieces to the whole space.
  - **Homeomorph-based tricks**: In `isEmbedding_of_iSup_eq_top_of_preimage_subset_range`, `Homeomorph.ofIsEmbedding` and `setCongr` are used to rephrase embeddings as homeomorphisms onto their image.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Topology.Sets.Opens` | Provides `Opens β`, the type of open subsets of `β`, with lattice structure and `coe` coercion. Used for open covers (`U : ι → Opens β`). |
| `Mathlib.Topology.LocallyClosed` | Defines `IsLocallyClosed`, used in `isLocallyClosed_iff_coe_preimage_of_iSup_eq_top`. |

> **Note**: The file is self-contained for local-at-target properties, relying on standard topology libraries (`Topology.Basic`, `Topology.ContinuousMap`, `Topology.Subspace`, `Topology.OpenMap`, etc.) via `Mathlib.Topology.*`.

---

### Summary

This file formalizes the principle that several important classes of continuous maps — *inducing*, *embedding*, *open/closed embeddings*, and *open/closed maps* — are **local at the target**: their behavior can be checked on an open cover of the codomain (or range). The key tool is the `restrictPreimage` operation, and the main logical tool is the equivalence `iSup U = ⊤ ⇒ (P(s) ↔ ∀ i, P(s ∩ U i))` for various `P`. The proofs rely heavily on filter-theoretic and set-theoretic manipulations, and the structure reflects a clean, reusable formalization pattern for local-to-global arguments in topology.