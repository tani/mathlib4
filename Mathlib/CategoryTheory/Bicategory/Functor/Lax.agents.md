### Technical Metadata Brief: `CategoryTheory.LaxFunctor`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `LaxFunctor B C` | A structure representing a **lax functor** between bicategories `B` and `C`. Extends `PrelaxFunctor` and adds: <br> • `mapId a : 𝟙 (F.obj a) ⟶ F.map (𝟙 a)` (lax unity constraint) <br> • `mapComp f g : F.map f ≫ F.map g ⟶ F.map (f ≫ g)` (lax functoriality constraint) <br> • Naturality, associativity, and unit laws for these constraints. |
| `LaxFunctor.toPrelaxFunctor` | Projection from `LaxFunctor` to its underlying `PrelaxFunctor`. |
| `LaxFunctor.id B` | Identity lax functor on a bicategory `B`. |
| `LaxFunctor.comp F G` | Composition of lax functors `F : B → C`, `G : C → D`, yielding `B → D`. |
| `LaxFunctor.PseudoCore F` | A structure equipping a lax functor `F` with *invertible* `mapId` and `mapComp`, making it a **pseudofunctor** (via `Pseudofunctor.mkOfLax`). |
| `mapComp_naturality_left` | Naturality of `mapComp` in its left argument. |
| `mapComp_naturality_right` | Naturality of `mapComp` in its right argument. |
| `map₂_associator` | Compatibility of `mapComp` with the associator of the bicategory. |
| `map₂_leftUnitor` | Compatibility of `mapComp` and `mapId` with the left unitor. |
| `map₂_rightUnitor` | Compatibility of `mapComp` and `mapId` with the right unitor. |
| `mapComp_assoc_left`, `mapComp_assoc_right` | Derived lemmas expressing associativity of `mapComp` up to the associator. |
| `map₂_leftUnitor_hom`, `map₂_rightUnitor_hom` | Hom-form versions of the left/right unitor laws (using inverses). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `mapId` / `mapComp`: denote the *lax* unity and functoriality constraints.
  - `map₂`: used for 2-morphism mappings (e.g., `map₂_associator`, `map₂_leftUnitor`).
  - `naturality_left` / `naturality_right`: indicate naturality of `mapComp` in each argument.
- **Suffixes**:
  - `_assoc`: indicates associativity-related lemmas (e.g., `mapComp_assoc_left`).
  - `_hom`: used for variants of unitors expressed in terms of hom-components (e.g., `map₂_leftUnitor_hom`).
- **Structure fields**:
  - `mapId`, `mapComp`, `map₂_associator`, etc., follow the pattern `map[operation]` or `map₂[axiom]`.

---

#### **3. Tactic Stack**

- **`aesop_cat`**: Used in field definitions to discharge simple bicategorical equalities (e.g., naturality, unit laws).
- **`simp` / `simp only [...]`**: Heavily used in proofs, especially with `reassoc`, `to_app`, and custom simp attributes.
- **`slice_rhs`, `slice_lhs`**: Used in `comp` definition to manipulate subterms in complex whiskering/composition expressions.
- **`rw [...]`**: For rewriting using axioms and lemmas (e.g., `← F.map₂_associator_assoc`, `mapComp_naturality_left_assoc`).
- **`dsimp`**: Used to simplify definitions before applying lemmas.
- **`assoc`, `comp_id`, `whiskerLeft_comp`, `comp_whiskerRight`**: Standard bicategorical reassociation/whiskering lemmas.

---

#### **4. Proof Logic**

- **Structure definitions** (e.g., `id`, `comp`, `PseudoCore`) are proven by:
  - Expanding definitions (`dsimp`)
  - Applying known naturality/associativity/unit lemmas
  - Using `simp` with custom attributes (`reassoc`, `to_app`, `simp`)
- **Key proof patterns**:
  - **Induction-free**: All proofs are direct manipulations using axioms and lemmas; no structural induction.
  - **Diagram chasing**: Proofs of `map₂_associator`, `map₂_leftUnitor`, etc., rely on rewriting with `map₂_*` axioms and simplifying whiskering.
  - **Iso manipulation**: Inverses of `mapIdIso`, `mapCompIso` are defined via `inv`, and their properties (`mapIdIso_inv`, `mapCompIso_inv`) are proven by `aesop_cat`.
  - **Slice-based term rewriting**: In `comp`, `slice_rhs`/`slice_lhs` are used to isolate and rewrite subterms involving `mapComp` and associators.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Bicategory.Functor.Prelax` | Provides `PrelaxFunctor`, the base structure extended by `LaxFunctor`. |
| `Mathlib.Tactic.CategoryTheory.Slice` | Enables `slice_rhs`/`slice_lhs` tactics for manipulating whiskered compositions. |
| `Mathlib.Tactic.CategoryTheory.ToApp` | Provides `to_app` attribute for simplification of morphism applications. |

---

### Summary

This file formalizes **lax functors between bicategories**, extending `PrelaxFunctor` with lax unity and functoriality constraints and their coherence laws. It includes:
- Core definitions (`LaxFunctor`, `id`, `comp`)
- Coherence lemmas (`map₂_associator`, `map₂_leftUnitor`, etc.)
- A `PseudoCore` structure to promote lax functors to pseudofunctors.

The proofs are largely automated via `aesop_cat` and `simp`, with heavy use of bicategorical rewriting tactics (`whiskerLeft_comp`, `assoc`, `slice_*`). The naming and structure follow Lean’s category theory conventions, emphasizing modularity and coherence.