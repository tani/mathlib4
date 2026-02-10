### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Class | Purpose |
|------|--------------|---------|
| `ExtremallyDisconnected` | `class Prop` | Predicate stating that the closure of every open set is open. |
| `CompactT2.Projective` | `def Prop` | Predicate for a space to be projective in the category of compact Hausdorff spaces: every continuous surjection onto it lifts over continuous maps. |
| `CompactT2.Projective.extremallyDisconnected` | `theorem` | If a compact Hausdorff space is projective, then it is extremally disconnected. |
| `CompactT2.ExtremallyDisconnected.projective` | `theorem` | If a compact Hausdorff space is extremally disconnected, then it is projective. |
| `ExtremallyDisconnected.disjoint_closure_of_disjoint_isOpen` | `lemma` | In extremally disconnected spaces, closures of disjoint open sets remain disjoint. |
| `ExtremallyDisconnected.homeoCompactToT2` | `noncomputable def` | Homeomorphism from a compact Hausdorff space satisfying the Zorn subset condition to an extremally disconnected Hausdorff space. |
| `exists_compact_surjective_zorn_subset` | `lemma` | Zorn-lemma-based construction of a minimal compact subset mapping surjectively (Gleason Lemma 2.4). |
| `image_subset_closure_compl_image_compl_of_isOpen` | `lemma` | For maps satisfying the Zorn subset condition, image of open set lies in closure of complement of image of complement (Gleason Lemma 2.1). |
| `instExtremallyDisconnected` | `instance` | Arbitrary sigma-type of extremally disconnected spaces is extremally disconnected. |

---

#### 2. **Naming Conventions**

- **Predicates / Properties**:
  - `ExtremallyDisconnected`, `CompactT2.Projective`: capitalized class/def names.
  - `isClosed_`, `isOpen_`, `closure_`, `preimage_`, `image_`, `disjoint_`, `homeo_`, `projective_`, `extremallyDisconnected_`: recurring prefixes for lemmas/defs.
- **Lemma numbering** (from Gleason 1958):
  - `lemma 2.1`, `2.2`, `2.3`, `2.4`, `2.5` → implemented as `image_subset_closure_compl_image_compl_of_isOpen`, `ExtremallyDisconnected.disjoint_closure_of_disjoint_isOpen`, `homeoCompactToT2_injective`, `exists_compact_surjective_zorn_subset`, `ExtremallyDisconnected.projective`.
- **Homeomorphism-related**:
  - `homeoOfEquivCompactToT2`, `homeoCompactToT2`, `homeo_of_homeo`: standard homeomorphism constructors.
- **Subtype / restriction**:
  - `restrict`, `subtype_val`, `Subtype.val`: used for restricting maps to subspaces.

---

#### 3. **Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rw` | Rewriting definitions (e.g., `isOpen_sigma_iff`, `closure_eq_preimage_closure_image`). |
| `simp` / `simp only` | Simplifying goals using known lemmas (e.g., `isClosed_closure`, `isOpen_compl_iff`). |
| `cases'` / `cases` | Case analysis on disjunctions or existential hypotheses. |
| `exact` / `assumption` | Finishing goals directly. |
| `apply` / `refine` | Introducing intermediate steps (e.g., `refine ⟨h, hh, ?_⟩`). |
| `push_neg` | Negating universal quantifiers in negated goals. |
| `aesop` | Not used here — Lean 4 version likely avoids heavy automation. |
| `ring` / `linarith` | Not used — algebraic reasoning is minimal. |
| `ext` | Extensionality for functions/sets. |
| `congr_fun` | Equality of functions via pointwise equality. |
| `continuous_*` tactics (e.g., `continuous_fst`, `continuous_snd`, `continuous_subtype_val`) | Proving continuity of constructed maps. |
| `isClosed_*`, `isOpen_*`, `isCompact_*` | Applying closure properties. |
| `classical` / ` Classical.choose` / `Classical.choose_spec` | For choice-based constructions (e.g., sections of surjections). |
| `zorn_superset` | Applying Zorn’s lemma for minimal elements. |

---

#### 4. **Proof Logic**

- **Structure of main equivalence (`projective_iff_extremallyDisconnected`)**:
  - **Forward direction** (`Projective.extremallyDisconnected`):
    - Construct a closed subset `Z ⊆ X × Bool` from an open `U ⊆ X`.
    - Use projectivity to get a section `g` of the projection `Z → X`.
    - Define `φ := Subtype.val ∘ g`, and show `closure U = φ⁻¹' Z₂`, where `Z₂ = closure U × {false}`.
    - Use properties of `Z₁`, `Z₂`, and disjointness to conclude openness of `closure U`.
  - **Backward direction** (`ExtremallyDisconnected.projective`):
    - Use Gleason’s lemmas (2.1–2.5):
      - Build the pullback `D ⊆ A × B`.
      - Apply `exists_compact_surjective_zorn_subset` to get minimal `E ⊆ D`.
      - Use `homeoCompactToT2` (Lemma 2.3) to get a homeomorphism `ρ : E ≃ A`.
      - Define lift `h = π₂|_E ∘ ρ⁻¹`.
    - Verify continuity and commutativity `φ = f ∘ h`.

- **Common proof patterns**:
  - **Indirect reasoning**: contradiction via disjointness or closure properties.
  - **Closure-based arguments**: leveraging extremal disconnectedness to turn closures into opens.
  - **Zorn’s lemma**: for minimal compact subsets satisfying surjectivity.
  - **Homeomorphism extraction**: via `homeoOfEquivCompactToT2` when injectivity + compactness + Hausdorffness hold.

---

#### 5. **Imports**

| Import | Role |
|--------|------|
| `Mathlib.Topology.Homeomorph` | Homeomorphisms (`≃ₜ`), continuity, open/closed maps. |
| `Mathlib.Topology.StoneCech` | Stone–Čech compactification, used in `StoneCech.projective`. |
| `Mathlib.Topology.Basic` (implicit via `TopologicalSpace`, `closure`, `isOpen`, etc.) | Core topology definitions. |
| `Mathlib.Topology.Compactness`, `Mathlib.Topology.Separation` | `CompactSpace`, `T2Space`, `T1Space`, separation axioms. |
| `Mathlib.Data.Set.Basic`, `Mathlib.Data.Bool` | Set operations, `Bool` used in `Z₁`, `Z₂` constructions. |
| `Mathlib.Data.Sigma.Basic` | For `instExtremallyDisconnected` on sigma-types. |

---

### Summary

This file formalizes Gleason’s characterization of projective objects in the category of compact Hausdorff spaces: **they are precisely the extremally disconnected compact Hausdorff spaces**. The proofs rely heavily on topological closure properties, Zorn’s lemma for minimal compact subsets, and homeomorphism extraction from bijective continuous maps between compact Hausdorff spaces. The formalization is detailed, with explicit references to Gleason’s 1958 paper and careful handling of subtype restrictions, preimages, and disjointness conditions.