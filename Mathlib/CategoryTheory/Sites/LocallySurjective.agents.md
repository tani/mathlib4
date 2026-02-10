### Technical Metadata Brief: `LocallySurjective` Module in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Class | Purpose |
|------|--------------|---------|
| `imageSieve f s` | `Sieve U` | For `f : F ⟶ G` and `s : G.obj (op U)`, the sieve of arrows `i : V ⟶ U` such that `G.map i.op s` lies in the image of `f.app V`. |
| `localPreimage f s g hg` | `F.obj (op V)` | A *noncomputable* choice of preimage of `G.map g.op s` under `f.app V`, given `g` lies in `imageSieve f s`. |
| `IsLocallySurjective J f` | `Class` | A morphism `f : F ⟶ G` is *locally surjective* w.r.t. Grothendieck topology `J` if for all `s : G.obj (op U)`, `imageSieve f s ∈ J U`. |
| `toImagePresheafSheafify J f` | `F.sheafify J ⟶ G.sheafify J` | The induced map on sheafifications factoring through the image presheaf sheafification. |
| `sheafificationIsoImagePresheaf F` | `J.sheafify F ≅ ((imagePresheaf (J.toSheafify F)).sheafify J).toPresheaf` | Isomorphism between sheafification and double sheafification via image presheaf. |
| `isLocallySurjective_toPlus P` | `IsLocallySurjective J (J.toPlus P)` | The plus-construction map is locally surjective. |
| `isLocallySurjective_toSheafify P` | `IsLocallySurjective J (J.toSheafify P)` | The sheafification map is locally surjective. |
| `isLocallySurjective_iff_isIso {F G : Sheaf J (Type w)} f` | `IsLocallySurjective f ↔ IsIso (imageSheafι f)` | For sheaves of types, local surjectivity ⇔ the canonical map to the image sheaf is iso. |
| `isLocallySurjective_iff_epi {F G : Sheaf J (Type w)} f` | `IsLocallySurjective f ↔ Epi f` | For sheaves of types (with sheafification), local surjectivity ⇔ epimorphism. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isLocallySurjective_...`: Indicates membership in the `IsLocallySurjective` class.
  - `imageSieve_...`: Relates to the sieve of local preimages.
  - `localPreimage_...`: Pertains to the choice of preimage.
  - `sheafificationIsoImagePresheaf`: Isomorphism involving sheafification and image presheaf.

- **Suffixes**:
  - `_iff`: Logical equivalence (↔) statements.
  - `_of_...`: Implication or construction from assumptions (e.g., `isLocallySurjective_of_surjective`).
  - `_fac`: Factorization lemmas (e.g., `isLocallySurjective_of_isLocallySurjective_fac`).
  - `_comp`: Composition-related lemmas (e.g., `comp_isLocallySurjective_iff`).
  - `_sheaf`: Pertains to sheaves (vs. presheaves).
  - `_toSheafify`, `_toPlus`: Maps associated with sheafification/plus-construction.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` / `simp only` | Simplifying goals using definitional equalities and lemmas (e.g., `imageSieve_app`, `app_localPreimage`). |
| `rw` / `rw [...]` | Rewriting using equalities (e.g., naturality, `fac`, `comp_apply`). |
| `exact` / `refine` | Constructing proofs by matching goal structure. |
| `intro` / `rintro` | Introducing hypotheses and destructuring existentials/conjunctions. |
| `apply` | Applying lemmas or instances (e.g., `J.top_mem`, `J.intersection_covering`). |
| `ext` | Extensionality for functions/sieves/sheaves. |
| `dsimp` | Simplifying definitional unfoldings (e.g., `dsimp [GrothendieckTopology.toSheafify]`). |
| `congr` / `congr'` | Congruence reasoning (e.g., `congr_app`, `congr_map`). |
| `have` / `let` | Introducing intermediate lemmas or definitions. |
| `infer_instance` | Automatically inferring class instances (e.g., `IsLocallySurjective`). |
| `aesop` / `tauto` | Not explicitly used here — proofs are mostly constructive and rely on explicit rewriting. |

---

#### **4. Proof Logic**

- **Inductive/Structural Reasoning**: Most proofs proceed by:
  - Unfolding definitions (`imageSieve`, `IsLocallySurjective`).
  - Applying sieve properties (e.g., downward closure, stability under pullback).
  - Using Grothendieck topology axioms: `top_mem`, `bind_covering`, `transitive`, `intersection_covering`.
  - Leveraging naturality and functoriality (e.g., `f.naturality`, `G.map_comp`).
  - Using `localPreimage` and `app_localPreimage` to construct preimages.

- **Common Patterns**:
  - **Sheafification**: Proving local surjectivity of `toSheafify` via `toPlus` and `isLocallySurjective_toPlus`.
  - **Factorization**: Using lemmas like `isLocallySurjective_of_isLocallySurjective_fac` to deduce properties of components in a factorization.
  - **Equivalence with categorical properties**:
    - For sheaves of types: `IsLocallySurjective ↔ Epi` (uses `isLocallySurjective_iff_isIso` + `imageSheafι` iso).
    - For presheaves: `IsLocallySurjective ↔ imagePresheaf.sheafify = ⊤`.

- **Noncomputable Choice**: `localPreimage` uses `choose` (Hilbert choice), justified by `IsLocallySurjective` ensuring nonempty fibers.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Sites.Subsheaf` | Defines subsheaves, image presheaves, sheafification. |
| `Mathlib.CategoryTheory.Sites.CompatibleSheafification` | Sheafification compatibility and universal properties. |
| `Mathlib.CategoryTheory.Sites.LocallyInjective` | Companion module for `IsLocallyInjective`; shares many lemmas (e.g., interaction with `IsLocallySurjective`). |

**Scope**:  
- Focuses on **Grothendieck topologies** and **(pre)sheaves valued in concrete categories** (e.g., `Type`, `Set`, `Ab`, `Ring`).
- Central theme: **Relating local surjectivity to categorical properties (epis, isos)** and **sheafification behavior**.

--- 

This module is foundational for descent theory and cohomological arguments in topos theory, where local surjectivity serves as a proxy for effective epimorphism in the ∞-categorical sense.