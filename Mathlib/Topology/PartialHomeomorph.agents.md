### Technical Metadata Brief: `PartialHomeomorph` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `PartialHomeomorph X Y` | `Type*` (structure) | Represents homeomorphisms between *open* subsets of topological spaces `X` and `Y`. Extends `PartialEquiv X Y` with openness of source/target and continuity of both directions on their domains. |
| `toFun'` / `coe` | `X → Y` | Coercion to a function; used for application `e x`. |
| `symm` | `e : PartialHomeomorph X Y → PartialHomeomorph Y X` | Inverse partial homeomorphism; swaps source/target and continuity assumptions. |
| `toPartialEquiv` | `PartialHomeomorph X Y → PartialEquiv X Y` | Projection to underlying partial equivalence (forgetting topological data). Injective. |
| `Homeomorph.toPartialHomeomorph` | `X ≃ₜ Y → PartialHomeomorph X Y` | Embeds global homeomorphisms as partial homeomorphisms over the whole space (`source = target = univ`). |
| `restr` / `restrOpen` | `s : Set X → PartialHomeomorph X Y` | Restriction of `e` to an open subset of its source (via `interior s` or explicit `IsOpen s`). |
| `IsImage s t` | `Prop` | `t` is the image of `s` under `e`, i.e., `∀ x ∈ source, e x ∈ t ↔ x ∈ s`. Used to track correspondence of subsets. |
| `restr` (on `IsImage`) | `h : e.IsImage s t → IsOpen (e.source ∩ s) → PartialHomeomorph X Y` | Restricts `e` to a pair of corresponding open sets. |
| `ofContinuousOpen` / `ofContinuousOpenRestrict` | `(e : PartialEquiv X Y) → ... → PartialHomeomorph X Y` | Constructs a `PartialHomeomorph` from a `PartialEquiv` with continuous, open forward map and open source. |
| `ext` | `(∀ x, e x = e' x) → (∀ x, e.symm x = e'.symm x) → (e.source = e'.source) → e = e'` | Extensionality principle: equality of functions, inverses, and source implies equality of partial homeomorphisms. |
| `isOpen_image_of_subset_source` | `(hs : IsOpen s) (hse : s ⊆ e.source) → IsOpen (e '' s)` | `e` is an open map on its source. |
| `map_nhds_eq`, `symm_map_nhds_eq` | `x ∈ e.source → map e (𝓝 x) = 𝓝 (e x)` | `e` induces a bijection of neighborhoods at points in its source. |
| `preimage_interior`, `preimage_closure`, `preimage_frontier` | `e.source ∩ e ⁻¹' interior s = e.source ∩ interior (e ⁻¹' s)` | Commutation of preimage with topological operators (interior, closure, frontier) on source. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isImage_`: Relates to subset correspondence under `e`.
  - `restr`: Restriction to subsets (e.g., `restr`, `restrOpen`, `restrOpen_toPartialEquiv`).
  - `continuousOn_`, `continuousAt_`, `mapsTo`, `bijOn`, `injOn`, `surjOn`: Continuity and injectivity/surjectivity properties.
  - `open_`: Openness of source/target (`open_source`, `open_target`).
  - `eventually_`: Neighborhood-based properties (`eventually_left_inverse`, `eventually_nhds`).
  - `nhdsWithin_`, `map_nhdsWithin_`: Local behavior near points.

- **Suffixes**:
  - `_symm`: Applies to inverse (`symm_source`, `symm_mapsTo`, `symm_image_target_eq_source`).
  - `_of_`: Construction from data (`toPartialHomeomorphOfImageEq`, `ofContinuousOpen`).
  - `_iff_`: Equivalence statements (`isOpen_image_iff_of_subset_source`, `isOpen_symm_image_iff_of_subset_target`).

- **Custom Simps Projections**:
  - `apply`, `symm_apply`: Used to simplify `e x` and `e.symm x`.
  - `toFun → apply`, `invFun → symm_apply`: Standardized projections for `simp`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp` / `mfld_simps` | Simplification with custom lemmas (`[mfld_simps]`), especially for coercions and `symm`. |
| `rw` / `congr_arg` | Rewriting definitional equalities (e.g., `e.left_inv hx`, `e.source = e'.source`). |
| `exact` / `assumption` | Direct proof steps using hypotheses. |
| `cases` / `subst` | Structural decomposition of structures (e.g., `cases e` to unpack fields). |
| `ext` | Apply extensionality (`PartialHomeomorph.ext`). |
| `filter_upwards` | For `eventually`-based arguments (e.g., `eventually_nhdsWithin`). |
| `interval_cases`, `aesop`, `tauto` | Less frequent, but used in automation-heavy lemmas. |
| `ring`, `linarith` | Rare; mostly algebraic or order reasoning not central here. |
| `simpa` | Used in `toPartialHomeomorphOfImageEq` to discharge `e '' s = t`. |

---

#### **4. Proof Logic & Strategy**

- **Structure-based reasoning**: Most proofs proceed by unpacking the `PartialHomeomorph` structure and reducing to properties of `PartialEquiv`, then verifying openness/continuity.
- **Continuity arguments**: Use `ContinuousOn`, `ContinuousAt`, and `isOpen_inter_preimage` to lift openness/continuity from subsets.
- **Neighborhood arguments**: Leverage `eventually_*` lemmas and `map_nhds_eq` to transfer local topology via `e`.
- **Subset correspondences**: `IsImage` is central for reasoning about how `e` maps subsets; many lemmas transfer `PartialEquiv.IsImage` API.
- **Restriction lemmas**: Often rely on `restrOpen`/`restr` and `isOpen_interior` to ensure source remains open.
- **Symmetry**: Many lemmas have symmetric counterparts via `symm_symm` and `symm_source/target`.

---

#### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.Logic.Equiv.PartialEquiv`: Underlying partial equivalence theory.
  - `Mathlib.Topology.Sets.Opens`: Open sets, continuity, neighborhoods, interiors, closures, etc.

- **Domain**:  
  - **Topology** (especially point-set topology on topological spaces).
  - **Manifold theory** (indirectly; `PartialHomeomorph` is foundational for charts).
  - **Category theory** (not explicit here, but `PartialHomeomorph` forms a categoryoid with `trans`, `symm`, `refl`).

- **Design philosophy**:
  - Extends `PartialEquiv` conservatively (adds topological constraints).
  - Prioritizes definitional equality for coercions (`@[coe]`, `@[simps]`).
  - Emphasizes local behavior (neighborhoods, interiors, closures) over global.

--- 

Let me know if you'd like a formalized summary (e.g., for a Lean 4 module docstring or a domain model spec).