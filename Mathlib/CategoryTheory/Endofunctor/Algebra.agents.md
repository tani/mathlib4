### Technical Metadata Brief: Algebras and Coalgebras of Endofunctors (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Algebra F` | `structure` | An algebra for an endofunctor `F : C ⥤ C` consists of an object `a : C` and a structure map `F.obj a ⟶ a`. |
| `Coalgebra F` | `structure` | A coalgebra for `F` consists of an object `V : C` and a structure map `V ⟶ F.obj V`. |
| `Algebra.Hom` | `structure` | Morphism between algebras: a morphism `f : A₀.1 ⟶ A₁.1` in `C` commuting with structure maps. |
| `Coalgebra.Hom` | `structure` | Morphism between coalgebras: a morphism `f : V₀.1 ⟶ V₁.1` in `C` commuting with structure maps. |
| `Algebra.category`, `Coalgebra.category` | `instance` | Endow `Algebra F` and `Coalgebra F` with category structure. |
| `Algebra.forget F`, `Coalgebra.forget F` | `def` | Forgetful functors `Algebra F ⥤ C`, `Coalgebra F ⥤ C`. |
| `Algebra.isoMk`, `Coalgebra.isoMk` | `def` | Construct algebra/coalgebra isos from underlying iso in `C` satisfying compatibility. |
| `Algebra.str_isIso` | `theorem` | The structure map of an **initial algebra** is an isomorphism. |
| `Algebra.toCoalgebraOf`, `Coalgebra.toAlgebraOf` | `def` | Functors induced by an adjunction `F ⊣ G`: `Algebra F ⥤ Coalgebra G` and vice versa. |
| `algebraCoalgebraEquiv` | `def` | Equivalence `Algebra F ≌ Coalgebra G` when `F ⊣ G`. |
| `functorOfNatTrans` | `def` | From natural transformation `α : G ⟶ F`, get functor `Algebra F ⥤ Algebra G`. |
| `equivOfNatIso` | `def` | Natural isomorphism `F ≅ G` induces equivalence `Algebra F ≌ Algebra G`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `Algebra.` / `Coalgebra.`: Namespace for algebra/coalgebra-related definitions.
  - `Hom.`: Internal morphism definitions (e.g., `Hom.id`, `Hom.comp`).
  - `forget_`: Forgetful constructions (`forget`, `forget_reflects_iso`, `forget_faithful`).
  - `functorOfNatTrans`: Functors induced by natural transformations.
  - `isoMk`: Isomorphism construction helper.
  - `toAlgebraOf`, `toCoalgebraOf`: Functors induced by adjunctions.

- **Suffixes**:
  - `_f`: Projection to underlying morphism in `C` (e.g., `comp_f`, `id_f`).
  - `_str`: Structure map-related (e.g., `strInv`, `str_isIso`).
  - `_eq`, `_comp`, `_id`: For naturality/identity/composition lemmas (e.g., `comp_eq_comp`, `functorOfNatTransId`).
  - `naturality_`: Naturality conditions (e.g., `homEquiv_naturality_str`).

- **Other patterns**:
  - `homEquiv`: Refers to the hom-set bijection of an adjunction.
  - `unitIso`, `counitIso`: Unit and counit isomorphisms for equivalences.

---

#### **3. Tactic Stack**

- **Core automation**:
  - `aesop_cat`: Used heavily for category-theoretic simplification and solving hom-compatibility goals.
  - `simp`: For simplifying identities, naturality, and functoriality.
  - `rw`: Rewriting using definitions, naturality, and adjunction laws.
  - `congr`: For congruence closure on equalities of morphisms.
  - `ext`: Extensionality for morphisms (via `@[ext]` attribute).
  - `dsimp`: Simplifying definitional equalities in proofs involving `homEquiv`.

- **Category-specific**:
  - `Category.assoc`, `Category.comp_id`, `Category.id_comp`: Rewriting associativity/unitality.
  - `Functor.map_comp`, `Functor.map_id`: Functoriality lemmas.
  - `Iso.hom_inv_id`, `Iso.inv_hom_id`: Isomorphism properties.

---

#### **4. Proof Logic**

- **Structure**:
  - Proofs often proceed by:
    1. **Unfolding definitions** (`dsimp`, `rw`).
    2. **Applying naturality or adjunction laws** (e.g., `homEquiv_naturality_*`).
    3. **Using functoriality** (`Functor.map_comp`, etc.).
    4. **Simplifying with `simp`** and `aesop_cat`.
    5. **Extensivity**: For morphism equality, apply `ext` and reduce to equality of underlying maps.

- **Key proof patterns**:
  - **Initial algebra structure map iso**:
    - Define `strInv` using initiality.
    - Show `left_inv` and `right_inv` using `Limits.IsInitial.hom_ext`.
  - **Adjunction-induced equivalence**:
    - Define functors via `homEquiv`.
    - Prove naturality using `homEquiv_naturality_*`.
    - Construct unit/counit isos using `left_inv`/`right_inv` of adjunction.
  - **Forgetful functor properties**:
    - `reflects_iso`, `faithful`, `epi_of_epi`, `mono_of_mono` follow from underlying map properties.

---

#### **5. Imports**

- **Primary dependency**:
  ```lean
  import Mathlib.CategoryTheory.Limits.Shapes.IsTerminal
  ```
  - Used for `Limits.IsInitial`, which is essential for defining and reasoning about initial algebras.

- **Implicit imports** (via `Mathlib.CategoryTheory.*`):
  - `CategoryTheory.Category`: Basic category theory.
  - `CategoryTheory.Functor`: Functors and natural transformations.
  - `CategoryTheory.NatIso`, `CategoryTheory.Adjunction`: Adjunctions and natural isos.
  - `CategoryTheory.Limits`: General limits/colimits (used for initial objects).
  - `CategoryTheory.Equivalence`: Equivalence of categories.

---

#### **6. Notes on Formalization Style**

- **Simps!**: Many definitions use `@[simps!]` to ensure clean projections and simplification behavior.
- **Hom-compatibility lemmas** (e.g., `Hom.h`) are marked with `reassoc (attr := simp)` for automatic associativity rewriting.
- **Extensionality**: `@[ext]` on `Hom` structures enables `ext` tactic for morphism equality.
- **Universe polymorphism**: Explicit universe parameters `v u` for `Category.{v} C`.

--- 

Let me know if you'd like a summary of the dual coalgebra results (e.g., terminal coalgebra structure map iso), or a formal proof sketch of `str_isIso`.