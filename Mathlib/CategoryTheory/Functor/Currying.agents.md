### Technical Metadata Brief: Currying and Uncurrying Functors in Lean 4 (Category Theory)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `uncurry` | `(C ⥤ D ⥤ E) ⥤ C × D ⥤ E` | Functor that "uncurries" a functor of two arguments into a bifunctor. |
| `curryObj` | `(C × D ⥤ E) → C ⥤ D ⥤ E` | Object-level part of currying: turns a bifunctor into a functor into a functor category. |
| `curry` | `(C × D ⥤ E) ⥤ C ⥤ D ⥤ E` | Functor version of currying; constructs a functor `C → (D → E)` from a bifunctor `C × D → E`. |
| `currying` | `C ⥤ D ⥤ E ≌ C × D ⥤ E` | Equivalence of categories between curried and uncurried functors. |
| `fullyFaithfulUncurry` | `uncurry.FullyFaithful` | Proof that `uncurry` is fully faithful (hence an equivalence on hom-sets). |
| `uncurry_obj_curry_obj` | `uncurry.obj (curry.obj F) = F` | Left inverse law: uncurrying after currying returns original bifunctor (definitionally). |
| `curry_obj_uncurry_obj` | `curry.obj (uncurry.obj F) = F` | Right inverse law: currying after uncurrying returns original curried functor (up to extensionality). |
| `flipIsoCurrySwapUncurry` | `F.flip ≅ curry.obj (Prod.swap ⋙ uncurry.obj F)` | Isomorphism between flipped functor and curried swapped uncurried version. |
| `uncurryObjFlip` | `uncurry.obj F.flip ≅ Prod.swap ⋙ uncurry.obj F` | Uncurrying of flipped functor is isomorphic to precomposing with swap. |
| `curryObjProdComp` | `curry.obj ((F₁.prod F₂).comp G) ≅ F₁ ⋙ curry.obj G ⋙ whiskeringLeft.obj F₂` | Interaction of currying with product of functors and composition. |
| `whiskeringRight₂` | `(C ⥤ D ⥤ E) ⥤ (B ⥤ C) ⥤ (B ⥤ D) ⥤ B ⥤ E` | Bifunctorial version of right whiskering, defined via currying/uncurrying. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `curry` / `uncurry`: core operations.
  - `flip`: for swapping arguments in bifunctors or curried functors.
  - `whiskeringRight₂`, `whiskeringLeft`: generalized whiskering for bifunctors.
- **Suffixes**:
  - `Obj`: object-level (non-functorial) version (e.g., `curryObj`).
  - `Iso`: indicates an isomorphism (e.g., `flipIsoCurrySwapUncurry`).
  - `FullyFaithful`, `Full`, `Faithful`: properties of functors.
- **Structure**:
  - `obj`, `map`, `app`: standard categorical components.
  - `naturality`, `map_comp`, `map_id`: verification of functor laws.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp` / `simp only` | Simplify using definitional equalities and known lemmas (`prod_comp`, `map_id`, etc.). |
| `rw` / `rwa` | Rewrite using naturality, associativity, identity laws. |
| `ext` | Extensionality for functors/natural transformations. |
| `dsimp` | Simplify definitional redexes before rewriting. |
| `aesop_cat` | Automated reasoning for category-theoretic identities (e.g., `curry_obj_uncurry_obj`). |
| `slice_lhs` | Focused rewriting on subterms (e.g., naturality square). |
| `exact`, `refl`, `rfl` | Immediate proofs or reflexivity. |
| `intro`, `rintro`, `cases` | Structural reasoning on products and morphisms. |

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - **Functor laws** (`map_id`, `map_comp`, `naturality`) are verified by:
    - Simplifying with `simp only [...]` to reduce to known identities.
    - Applying `NatTrans.naturality`, `Category.assoc`, `prod_comp`, etc.
    - Using `rw` to rearrange compositions.
  - **Isomorphisms / natural isomorphisms**:
    - Constructed via `NatIso.ofComponents`, where each component is `Iso.refl _`.
    - Verified by extensionality (`ext`) and simplification.
  - **Inverse laws** (`uncurry_obj_curry_obj`, `curry_obj_uncurry_obj`):
    - Proven using `Functor.ext` (extensionality for functors and natural transformations).
    - Component-wise simplification (`by simp`) suffices for object parts.
    - Morphism parts often require `aesop_cat` or manual naturality reasoning.

- **Inductive or case-based reasoning**: Minimal; mostly definitional + naturality-based.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.CategoryTheory.EqToHom` | Tools for converting equalities to isomorphisms (used implicitly via `Iso.refl`). |
| `Mathlib.CategoryTheory.Products.Basic` | Core product category infrastructure: `prod`, `prod_comp`, `prod_id`, `Prod.swap`, etc. |

---

### Summary

This file formalizes the **currying equivalence** of functor categories in Lean 4’s Category Theory library. It defines `curry` and `uncurry` as functors, proves they form an equivalence (`currying`), and establishes key properties (fully faithfulness, invertibility, interaction with flip, product, and whiskering). The proofs rely heavily on simplification, naturality, and extensionality, with minimal case analysis. The naming and structure follow Lean’s category-theory conventions, emphasizing modularity and reuse of standard lemmas.