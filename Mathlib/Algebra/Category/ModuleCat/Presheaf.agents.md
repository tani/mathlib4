### Technical Brief: `Presheaf.lean` — Presheaves of Modules over a Presheaf of Rings

---

#### **1. Key Definitions & Theorems**

| Name | Type / Structure | Purpose |
|------|------------------|---------|
| `PresheafOfModules R` | `Structure` | Defines a presheaf of modules over a presheaf of rings `R : Cᵒᵖ ⥤ RingCat`. Consists of: <br>• `obj X : ModuleCat (R.obj X)` for all `X : Cᵒᵖ` <br>• `map f : M.obj X → (R.map f)* M.obj Y` (linear over `R.map f`) <br>• coherence axioms `map_id`, `map_comp` |
| `Hom M₁ M₂` | `Structure` | Morphism of presheaves of modules: natural family of module maps `M₁.obj X → M₂.obj X` commuting with restriction maps |
| `Category (PresheafOfModules R)` | `Instance` | Makes `PresheafOfModules R` a category with `Hom` as above |
| `presheaf M` | `Noncomputable def` | Underlying presheaf of abelian groups: `Cᵒᵖ ⥤ Ab` |
| `toPresheaf R` | `Noncomputable def` | Forgetful functor `PresheafOfModules R ⥤ (Cᵒᵖ ⥤ Ab)` |
| `ofPresheaf M map_smul` | `Noncomputable def` | Constructor: builds a presheaf of modules from a presheaf of abelian groups with semilinear restriction maps |
| `homMk φ hφ` | `Noncomputable def` | Constructor of module morphism from abelian presheaf morphism satisfying linearity |
| `evaluation X` | `Def` | Evaluation at `X`: `PresheafOfModules R ⥤ ModuleCat (R.obj X)` |
| `restriction f` | `Def` | Natural transformation `evaluation X ⇒ evaluation Y ⋙ restrictScalars (R.map f)` |
| `unit R` | `Def` | Free rank-1 presheaf of modules: `obj X = R.obj X`, `map f = R.map f` |
| `sections M` | `Def` | Global sections: `M.presheaf ⋙ forget Ab`.sections` |
| `sectionsMk s hs` | `Def` | Constructor for sections: compatible family `∀ X, M.obj X` |
| `sectionsMap f` | `Def` | Induced map on sections `M.sections → N.sections` |
| `unitHomEquiv M` | `Def` | Equivalence `(unit R ⟶ M) ≃ M.sections` (Yoneda for modules) |
| `forgetToPresheafModuleCat X hX` | `Def` | Forgetful functor when `X` is initial: `PresheafOfModules R ⥤ Cᵒᵖ ⥤ ModuleCat (R.obj X)` |

**Theorems / Lemmas (selected):**
- `map_smul`: `map f` is `R.map f`-linear.
- `hom_ext`: Extensionality for module morphisms.
- `sections_ext`: Extensionality for sections.
- `unitHomEquiv`: Yoneda lemma for presheaves of modules.
- `toPresheaf Faithful`: The forgetful functor is faithful.
- `PresheafOfModules` is **preadditive** and **additive** over morphisms.

---

#### **2. Naming Conventions**

| Pattern | Examples | Meaning |
|--------|----------|---------|
| `is_`, `has_` | — | Not used here (no typeclass predicates like `isModule`) |
| `map_`, `obj_` | `map`, `obj`, `map_smul`, `map_id`, `map_comp` | Structural operations (functoriality) |
| `app_` | `app`, `id_app`, `comp_app`, `naturality_apply`, `zero_app`, `neg_app`, `add_app`, `sub_app`, `zsmul_app` | Component-wise operations in natural transformations |
| `presheaf_` | `presheaf`, `presheaf_obj_coe`, `presheaf_map_apply_coe` | Underlying abelian presheaf |
| `toPresheaf_` | `toPresheaf`, `toPresheaf_obj_coe`, `toPresheaf_map_app_apply` | Forgetful functor to presheaves of abelian groups |
| `ofPresheaf_` | `ofPresheaf`, `ofPresheaf_presheaf` | Constructor from abelian presheaf |
| `homMk_` | `homMk`, `homMk_app` (via `simps`) | Constructor of module morphism |
| `evaluation_` | `evaluation`, `evaluation_obj_coe`, `evaluation_map_coe` (via `simps`) | Evaluation at object |
| `restriction_` | `restriction`, `restriction_app` | Natural transformation of evaluation functors |
| `unit_` | `unit`, `unit_map_one` | Free rank-1 module |
| `sections_` | `sections`, `sections.eval`, `sectionsMk`, `sections_property`, `sections_ext`, `sectionsMap`, `sectionsMap_comp`, `sectionsMap_id` | Global sections and induced maps |
| `forgetToPresheafModuleCat_` | `forgetToPresheafModuleCatObj`, `forgetToPresheafModuleCatMap`, `forgetToPresheafModuleCat` | Forgetful functor when source is initial |

**Suffixes:**
- `_app`: component at an object (e.g., `f.app X`)
- `_hom`: underlying function of a module hom (e.g., `(f.app X).hom`)
- `_coe`: coercion to underlying type/function (e.g., `presheaf_obj_coe`)
- `_mk`: constructor (e.g., `sectionsMk`, `homMk`)
- `_ext`: extensionality lemma (e.g., `hom_ext`, `sections_ext`)
- `_comp`, `_id`: composition / identity laws (e.g., `map_comp`, `map_id`)

---

#### **3. Tactic Stack**

| Tactic | Frequency | Role |
|--------|-----------|------|
| `simp` | Very high | Simplify using `@[simp]` lemmas (`map_id`, `map_comp`, `naturality`, `app`, `add_app`, etc.) |
| `ext` / `ext1` | High | Prove equality of functions/natural transformations/sections |
| `rw` | High | Rewrite using equalities (e.g., `← naturality_apply`, `unit_map_one`) |
| `congr` | Medium | Congruence reasoning (e.g., `congrArg RingCat.Hom.hom`) |
| `cat_disch` | Medium | Category-theoretic discharge (used in `map_id`, `map_comp`, `naturality` proofs) |
| `dsimp` | Low | Simplify definitional equalities (e.g., in `unitHomEquiv.right_inv`) |
| `change` | Low | Adjust goal to match known lemmas |
| `apply` / `exact` | Low | Direct proof steps (e.g., `apply hX.hom_ext`) |
| `ring` | Not used | Not needed (no polynomial ring reasoning) |
| `aesop` | Not used | Not used (proofs are highly structured, not automated) |

**Typical proof pattern:**
```lean
ext x
change ... = ...
rw [← naturality_apply, ...]
simp
```

---

#### **4. Proof Logic**

- **Structure proofs** are mostly *definitional* or *by construction*:
  - `Hom`/`PresheafOfModules` structure fields are defined explicitly.
  - Coherence axioms (`map_id`, `map_comp`) are proven by `cat_disch`, i.e., using category-theoretic identities.

- **Morphism proofs** rely on:
  - **Naturality** (`Hom.naturality`) as the key commuting square.
  - **Extensionality lemmas** (`hom_ext`, `sections_ext`) to reduce to pointwise equality.
  - **Linearity** (`map_smul`) to handle scalar multiplication.

- **Yoneda-style arguments**:
  - `unitHomEquiv` uses linearity to identify `Hom(unit, M)` with sections via evaluation at `1`.
  - Inverse uses `LinearMap.ringLmapEquivSelf` to identify module maps `R → M` with elements of `M`.

- **Initial object case**:
  - Uses unique morphism `hX.to Y` to transport module structure via restriction of scalars.
  - Proofs use `hX.hom_ext` to show uniqueness of maps from initial object.

- **Inductive/recursive structure**:
  - Not used (no induction on syntax or natural numbers).
  - All constructions are *functorial* or *natural*.

---

#### **5. Imports & Dependencies**

| Import | Purpose |
|--------|---------|
| `Mathlib.Algebra.Category.ModuleCat.ChangeOfRings` | Restriction of scalars, change-of-ring functors |
| `Mathlib.Algebra.Category.Ring.Basic` | `RingCat`, ring homomorphisms, `R.map f` |
| `CategoryTheory` (via `open`) | General category theory: functors, natural transformations, limits, hom-sets |
| `LinearMap`, `Opposite` | Module maps, opposite category |
| `Ab`, `ModuleCat`, `forget₂` | Abelian groups, modules, forgetful functors |

**Key dependencies:**
- `ModuleCat`: category of modules over a ring.
- `restrictScalars`: core tool for base change.
- `RingCat`: base category for presheaves of rings.
- `Opposite`: to model contravariance (`Cᵒᵖ`).

---

#### **6. Mermaid Diagrams**

##### **Dependency Graph (Module Scope)**

```mermaid
graph TD
  A[PresheafOfModules R] --> B[Category (PresheafOfModules R)]
  A --> C[Presheaf M : Cᵒᵖ ⥤ Ab]
  A --> D[Sections M]
  A --> E[Evaluation X : PresheafOfModules R ⥤ ModuleCat (R.obj X)]
  A --> F[Forgetful toPresheaf R]
  A --> G[unit R]
  A --> H[Hom M₁ M₂]
  C --> I[Module (R.obj X) (M.obj X)]
  C --> J[Restriction Maps M.map f]
  G --> K[Free Rank-1 Module]
  H --> L[Naturality Square]
  E --> M[Module Maps f.app X]
  F --> N[Presheaf of Abelian Groups]
  D --> O[Global Sections]
  H --> P[AddCommGroup Structure]
  A --> Q[Forgetful to Module over Initial X]
```

##### **Overview of File Structure**

```mermaid
flowchart LR
  subgraph Definitions
    A[PresheafOfModules R] --> B[Hom Morphisms]
    A --> C[Category Structure]
    A --> D[Presheaf of Abelian Groups]
    A --> E[Sections]
    A --> F[Evaluation Functors]
    A --> G[Free Module unit R]
  end

  subgraph Functors
    D --> H[toPresheaf R : PresheafOfModules R ⥤ Cᵒᵖ ⥤ Ab]
    F --> I[Evaluation X : PresheafOfModules R ⥤ ModuleCat (R.obj X)]
    A --> J[Forgetful to Module over Initial X]
  end

  subgraph Constructions
    E --> K[sectionsMk / sectionsMap]
    G --> L[unitHomEquiv : (unit R ⟶ M) ≃ M.sections]
    D --> M[ofPresheaf / homMk]
  end

  subgraph Properties
    B --> N[AddCommGroup on Hom]
    C --> O[Preadditive Category]
    H --> P[Faithful Forgetful]
    L --> Q[Yoneda Lemma for Modules]
  end

  style A fill:#f9f,stroke:#333
  style L fill:#9f9,stroke:#333
```

---

#### **7. Summary**

This file formalizes the **category of presheaves of modules over a presheaf of rings**, a foundational object in algebraic geometry and sheaf theory. It:

- Defines presheaves of modules as *functors into a category of modules* with base-change structure.
- Constructs the category structure, forgetful functors, sections, and global section functor.
- Proves key properties: preadditivity, faithfulness of forgetful functor, Yoneda equivalence for the free module.
- Handles special cases (e.g., initial objects) to relate to modules over a single ring.

The formalization is highly structured, leveraging Lean’s category theory library (`CategoryTheory`) and module theory (`ModuleCat`), with careful attention to naturality, linearity, and coherence. The naming and proof style follow Lean’s standard conventions for categorical structures.
