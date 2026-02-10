### Technical Metadata Brief: `Groupoid` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Groupoid` | `class Groupoid (obj : Type u) extends Category.{v} obj` | Typeclass asserting all morphisms are isomorphisms. |
| `Groupoid.inv` | `∀ {X Y}, (X ⟶ Y) → (Y ⟶ X)` | Provides the inverse of any morphism. |
| `Groupoid.inv_comp`, `Groupoid.comp_inv` | `comp (inv f) f = id`, `comp f (inv f) = id` | Ensure `inv f` is a two-sided inverse of `f`. |
| `IsIso.of_groupoid` | `∀ f, IsIso f` | Instance: every morphism in a groupoid is an isomorphism. |
| `Groupoid.inv_eq_inv` | `Groupoid.inv f = CategoryTheory.inv f` | Equates the groupoid inverse with the categorical inverse. |
| `Groupoid.invEquiv` | `(X ⟶ Y) ≃ (Y ⟶ X)` | Equivalence given by inversion (involutive). |
| `Groupoid.isoEquivHom` | `(X ≅ Y) ≃ (X ⟶ Y)` | In a groupoid, isomorphisms and morphisms are in bijection. |
| `Groupoid.invFunctor` | `C ⥤ Cᵒᵖ` | Contravariant functor sending each morphism to its inverse (via opposite). |
| `Groupoid.ofIsIso` | `(∀ f, IsIso f) → Groupoid C` | Constructor: any category where all morphisms are iso is a groupoid. |
| `Groupoid.ofHomUnique` | `(∀ X Y, Unique (X ⟶ Y)) → Groupoid C` | Constructor: a category with at most one morphism between any two objects is a groupoid. |
| `InducedCategory.groupoid`, `groupoidPi`, `groupoidProd` | Instance constructions | Closure properties: groupoids are closed under induced categories, products, and dependent products. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `Groupoid.`: All core definitions/theorems live under this namespace.
  - `inv`: Used consistently for inverse morphism (`Groupoid.inv`, `CategoryTheory.inv`).
- **Suffixes**:
  - `_equiv`: For equivalences (`invEquiv`, `isoEquivHom`).
  - `_functor`: For functors (`invFunctor`).
  - `of_`: For constructors (`ofIsIso`, `ofHomUnique`).
- **Pattern**:
  - `comp_inv`, `inv_comp`: Standard order for composition identities (left/right).
  - `reverse'`, `map_reverse'`: Related to `Quiver.HasInvolutiveReverse`.

---

#### **3. Tactic Stack**

- **`aesop_cat`**: Used in `where` clauses of `class Groupoid` to discharge category-theoretic identities (e.g., `inv_comp`, `comp_inv`).
- **`simp`**: Used in `invEquiv`, `isoEquivHom`, `induced`, `prod`, `pi` proofs to simplify using `@[simp]` lemmas.
- **`funext`**: In `groupoidPi`, to extend pointwise properties to dependent functions.
- **` Classical.choose_spec`**: In `ofIsIso`, to extract inverse data from `IsIso`.
- **`rfl`, `Iso.ext`**: For extensionality of isomorphisms.

---

#### **4. Proof Logic**

- **Class definition**: Axiomatizes inverses and their properties directly.
- **Instance proofs**:
  - `IsIso.of_groupoid`: Uses the groupoid inverse to construct an isomorphism.
  - `inv_eq_inv`: Uniqueness of inverses in a category implies groupoid inverse = categorical inverse.
- **Equivalence proofs**:
  - `invEquiv`: Shows inversion is involutive (self-inverse map).
  - `isoEquivHom`: Uses `Iso.ext` and `rfl` to show bijection between isos and morphisms.
- **Closure properties**:
  - `groupoidPi`, `groupoidProd`: Pointwise lifting of groupoid structure.
  - `InducedCategory.groupoid`: Inherits structure via underlying morphism map.
- **Constructors**:
  - `ofIsIso`: Extracts inverse from `IsIso` data.
  - `ofHomUnique`: Uses uniqueness to define inverse (any morphism must be its own inverse up to uniqueness).

---

#### **5. Imports**

| Module | Purpose |
|--------|---------|
| `Mathlib.CategoryTheory.FullSubcategory` | Not directly used here, but part of broader category theory infrastructure. |
| `Mathlib.CategoryTheory.Products.Basic` | Needed for `groupoidProd`. |
| `Mathlib.CategoryTheory.Pi.Basic` | Needed for `groupoidPi`. |
| `Mathlib.CategoryTheory.Category.Basic` | Core category theory definitions (`Category`, `comp`, `id`, `Iso`, `Functor`, etc.). |
| `Mathlib.Combinatorics.Quiver.Symmetric` | Provides `Quiver.HasInvolutiveReverse`, used in `groupoidHasInvolutiveReverse`. |

> **Note**: The file is self-contained for defining groupoids and their basic properties, relying on standard category-theoretic infrastructure.

--- 

Let me know if you'd like a formalized summary in Lean syntax or a diagrammatic view of the relationships.