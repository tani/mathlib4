### Technical Metadata Brief: Local Homeomorphisms in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsLocalHomeomorphOn f s` | `∀ x ∈ s, ∃ e : PartialHomeomorph X Y, x ∈ e.source ∧ f = e` | Defines that `f` is a local homeomorphism at every point of `s`, i.e., locally equal to a `PartialHomeomorph`. |
| `IsLocalHomeomorph f` | `∀ x : X, ∃ e : PartialHomeomorph X Y, x ∈ e.source ∧ f = e` | Global version: `f` is a local homeomorphism everywhere (on `univ`). |
| `IsLocalHomeomorphOn.mk` | `(∀ x ∈ s, ∃ e, x ∈ e.source ∧ EqOn f e e.source) → IsLocalHomeomorphOn f s` | Allows proving `IsLocalHomeomorphOn` using local agreement on sources, not full equality. |
| `IsLocalHomeomorph.mk` | `(∀ x, ∃ e, x ∈ e.source ∧ EqOn f e e.source) → IsLocalHomeomorph f` | Analogous to above for global case. |
| `PartialHomeomorph.isLocalHomeomorphOn` | `IsLocalHomeomorphOn e e.source` | Every `PartialHomeomorph` is a local homeomorphism on its source. |
| `isLocalHomeomorphOn_iff_isOpenEmbedding_restrict` | `IsLocalHomeomorphOn f s ↔ ∀ x ∈ s, ∃ U ∈ 𝓝 x, IsOpenEmbedding (U.restrict f)` | Equivalent characterization via open embeddings on neighborhoods. |
| `isLocalHomeomorph_iff_isOpenEmbedding_restrict` | `IsLocalHomeomorph f ↔ ∀ x, ∃ U ∈ 𝓝 x, IsOpenEmbedding (U.restrict f)` | Global version of above. |
| `Homeomorph.isLocalHomeomorph` | `X ≃ₜ Y → IsLocalHomeomorph f` | Every homeomorphism is a local homeomorphism. |
| `IsLocalHomeomorph.continuous` | `IsLocalHomeomorph f → Continuous f` | Local homeomorphisms are continuous. |
| `IsLocalHomeomorph.isOpenMap` | `IsLocalHomeomorph f → IsOpenMap f` | Local homeomorphisms are open maps. |
| `IsLocalHomeomorph.map_nhds_eq` | `IsLocalHomeomorph f → (𝓝 x).map f = 𝓝 (f x)` | Pushforward of neighborhoods equals neighborhood of image. |
| `IsLocalHomeomorph.isOpenEmbedding_of_injective` | `IsLocalHomeomorph f → f.Injective → IsOpenEmbedding f` | Injective local homeomorphisms are open embeddings. |
| `IsLocalHomeomorph.toHomeomorph_of_bijective` | `IsLocalHomeomorph f → f.Bijective → X ≃ₜ Y` | Bijective local homeomorphisms are homeomorphisms. |
| `IsLocalHomeomorph.isTopologicalBasis` | `IsLocalHomeomorph g → IsTopologicalBasis {U | ∃ V, IsOpen V ∧ ∃ s : C(V,X), g ∘ s = id ∧ range s = U}` | Ranges of continuous local sections form a basis. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isLocalHomeomorphOn_`: predicates on subsets (`s : Set X`)
  - `isLocalHomeomorph_`: global predicates (on `univ`)
  - `of_`: reverse implication or derivation lemmas (e.g., `of_comp`, `of_comp_left`)
  - `mk`: constructors using weaker hypotheses (agreement on source only)
  - `continuous`, `isOpenMap`, `map_nhds_eq`: properties derived from the definition

- **Suffixes**:
  - `_restrict`: refers to restriction of functions to open subsets
  - `_on`: indicates subset-based version (`IsLocalHomeomorphOn`)
  - `_of_`: indicates derived properties (e.g., `isOpenEmbedding_of_injective`)

- **Aliases**:
  - Deprecated aliases use `alias` with `@deprecated` and version info (e.g., `openEmbedding_of_injective` → `isOpenEmbedding_of_injective`)

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `intro`, `rintro`, `obtain` | Introducing hypotheses and destructuring existential quantifiers |
| `rw`, `change`, `convert` | Rewriting using equalities, especially ` rfl`, `he`, `← he` |
| `simp_rw`, `simp` | Simplifying using equivalences like `isLocalHomeomorph_iff_isLocalHomeomorphOn_univ` |
| `exact`, `refine`, `apply` | Constructing terms, especially for `PartialHomeomorph` constructions |
| `ext` | Extensionality for sets/functions |
| `apply`, `exact`, `assumption` | Goal solving with existing lemmas |
| `mono` | Monotonicity of `IsLocalHomeomorphOn` under subset inclusion |
| `continuousOn_of_forall_continuousAt`, `continuous_iff_continuousOn_univ` | Continuity automation |
| `isOpenEmbedding_iff_continuous_injective_isOpenMap` | Breaking down open embeddings |
| `Set.range_inclusion`, `isOpen_induced`, `isOpen_interior` | Topological set manipulations |
| `Filter.univ_mem`, `mem_interior_iff_mem_nhds` | Neighborhood/filter reasoning |

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - Most proofs follow a **constructive pattern**: extract local `PartialHomeomorph` data, then refine or compose them.
  - **Induction** is not used; instead, proofs rely on **pointwise local analysis** and **patching** via `mk` or `PartialHomeomorph` operations.
  - Common flow:
    1. Unfold definitions (`isLocalHomeomorphOn_iff_isOpenEmbedding_restrict`, etc.)
    2. Use `intro x hx` to fix a point and hypothesis.
    3. Extract `e : PartialHomeomorph` from assumption.
    4. Construct new `e'` (e.g., via `trans`, `restr`, `symm`, `ofContinuousOpenRestrict`) to satisfy required properties.
    5. Prove equality/agreement on source using `he`, `left_inv'`, `right_inv'`, etc.

- **Key reasoning principles**:
  - **Local-to-global**: Prove pointwise properties and lift to global via `mk` or `isLocalHomeomorph_iff_isLocalHomeomorphOn_univ`.
  - **Equivalence with open embeddings**: Many results reduce to verifying `IsOpenEmbedding` on neighborhoods.
  - **Composition closure**: Prove closure under composition via `trans` of `PartialHomeomorph`s.

---

#### **5. Imports**

| Module | Role |
|--------|------|
| `Mathlib.Topology.PartialHomeomorph` | Core definitions and properties of `PartialHomeomorph`, including `toFun`, `invFun`, `continuousOn_toFun`, `continuousOn_invFun`, `isOpen_source`, etc. |
| `Mathlib.Topology.SeparatedMap` | Used for `IsLocallyInjective` (via `SeparatedMap` or related lemmas), though not directly imported here — likely via transitive imports. |

> **Note**: The file does *not* import `Mathlib.Topology.Homeomorph` directly, but uses `Homeomorph` via `PartialHomeomorph` and `toHomeomorph_of_bijective`.

---

### Summary

This file formalizes **local homeomorphisms** in topology using `PartialHomeomorph` as the primitive notion. It emphasizes:
- Equivalence between local homeomorphism status and local open embedding behavior.
- Closure properties (composition, restriction, continuity, openness).
- Characterizations of homeomorphisms as bijective local homeomorphisms.
- Basis generation by local sections.

The style is **constructive**, **pointwise**, and **equational**, leveraging Lean’s typeclass inference and `PartialHomeomorph` infrastructure.