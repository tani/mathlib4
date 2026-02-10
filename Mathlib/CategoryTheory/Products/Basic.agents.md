### Technical Metadata Brief: Cartesian Products of Categories (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `prod` | `Category (C × D)` | Defines the product category structure on `C × D`, with componentwise hom-sets, identities, and composition. |
| `prod.hom_ext` | `{f g : X ⟶ Y} → f.1 = g.1 → f.2 = g.2 → f = g` | Extensionality for morphisms in product categories. |
| `prod_id`, `prod_comp` | `𝟙 (X, Y) = (𝟙 X, 𝟙 Y)`, `f ≫ g = (f.1 ≫ g.1, f.2 ≫ g.2)` | Simplification lemmas for identities and composition in `C × D`. |
| `isIso_prod_iff` | `IsIso f ↔ IsIso f.1 ∧ IsIso f.2` | Characterizes isomorphisms in product categories. |
| `prod.etaIso` | `(X.1, X.2) ≅ X` | Canonical isomorphism between a pair and its product representation. |
| `Iso.prod` | `P ≅ Q → S ≅ T → (P, S) ≅ (Q, T)` | Constructs isomorphisms in product categories from componentwise isos. |
| `sectL`, `sectR` | `C ⥤ C × D`, `D ⥤ C × D` | Section functors embedding one factor into the product (constant in the other factor). |
| `fst`, `snd` | `C × D ⥤ C`, `C × D ⥤ D` | Projection functors. |
| `swap` | `C × D ⥤ D × C` | Functor swapping factors; part of a categorical equivalence. |
| `symmetry`, `braiding` | `swap ⋙ swap ≅ 𝟭`, `C × D ≌ D × C` | Natural isomorphism and equivalence expressing symmetry of product. |
| `evaluation` | `C ⥤ (C ⥤ D) ⥤ D` | Curried evaluation functor: `X ↦ (F ↦ F X)`. |
| `evaluationUncurried` | `C × (C ⥤ D) ⥤ D` | Uncurried evaluation: `(X, F) ↦ F X`. |
| `Functor.prod`, `Functor.prod'` | `A ⥤ B × D`, `A ⥤ B × C` | Product of functors (independent or shared domain). |
| `Functor.diag` | `C ⥤ C × C` | Diagonal functor: `X ↦ (X, X)`. |
| `NatTrans.prod`, `NatTrans.prod'` | `F.prod H ⟶ G.prod I`, `F.prod' H ⟶ G.prod' K` | Product of natural transformations. |
| `prodFunctor` | `(A ⥤ B) × (C ⥤ D) ⥤ A × C ⥤ B × D` | Product of functors as a functor between functor categories. |
| `Equivalence.prod` | `A ≌ B → C ≌ D → A × C ≌ B × D` | Product of equivalences. |
| `functorProdFunctorEquiv` | `(A ⥤ B) × (A ⥤ C) ≌ A ⥤ (B × C)` | Equivalence between product of functor categories and functor into product. |
| `prodOpEquiv` | `(C × D)ᵒᵖ ≌ Cᵒᵖ × Dᵒᵖ` | Equivalence between opposite of product and product of opposites. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `prod_`: Product-related constructions (`prod`, `prod_id`, `prod_comp`, `prod.etaIso`, `prodFunctor`, etc.)
  - `sectL`, `sectR`: Section functors (left/right embedding).
  - `fst`, `snd`: Projection functors.
  - `swap`, `symmetry`, `braiding`: Symmetry-related functors/natural isos.
  - `evaluation`, `evaluationUncurried`: Evaluation functors.
  - `diag`: Diagonal functor.
  - `prod'`: Shared-domain product of functors/natural transformations.

- **Suffixes**:
  - `_obj`, `_map`: Component lemmas for functors.
  - `_app`: Component lemmas for natural transformations.
  - `_comp`: Composition-related lemmas.
  - `Iso`: Natural isomorphisms (`etaIso`, `prod.etaIso`, `symmetry`, `braiding`, etc.).
  - `Equiv`/`Equiv`: Equivalences (`functorProdFunctorEquiv`, `prodOpEquiv`).

- **Infix-style**:
  - `F.prod G`, `α.prod β`, `e₁.prod e₂`: "Poor man's infix" for products (no `×` notation due to Lean 3 legacy limitations).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs and `@[simps]`-generated lemmas:

| Tactic | Usage |
|--------|-------|
| `simp` / `simp only [...]` | Simplification using `prod_*`, `fst_*`, `snd_*`, `etaIso`, `prod_id`, `prod_comp`, etc. |
| `ext` | Hom-extensionality (`prod.hom_ext`) and extensionality of natural transformations. |
| `cases` | Destructing product objects (`X`, `f`, `α`) into components. |
| `rw [...]` | Rewriting using naturality, associativity, and componentwise definitions. |
| `constructor` | Proving conjunctions (e.g., `IsIso f.1 ∧ IsIso f.2`). |
| `dsimp` / `unfold` | Unfolding definitions (e.g., `prod_Hom`, `prod_comp`, `NatTrans.comp_app`). |
| `apply Iso.refl` | Constructing trivial isomorphisms (common in `@[simps!]` lemmas). |
| `aesop` | Not explicitly used here, but `simp` + `rw` + `cases` suffices. |

---

#### **4. Proof Logic**

- **Structure**: Most proofs follow a *componentwise* strategy:
  1. **Decompose** objects/morphisms/natural transformations into components.
  2. **Apply known properties** in `C` and `D` (e.g., identity, associativity, naturality).
  3. **Recombine** using `prod.hom_ext`, `prod.etaIso`, or `Iso.prod`.
- **Induction**: Not used—product categories are defined extensionally, so proofs rely on *equality of components*.
- **Iso/NatIso construction**: Typically via `NatIso.ofComponents`, `Iso.refl`, or `Iso.prod`.
- **Equivalence proofs**: Use `Equivalence.mk` with explicit functors, unit/counit isos, and `functor_unitIso_comp`/`functor_counitIso_comp` proofs via `ext` and `simp`.

---

#### **5. Imports**

| Module | Purpose |
|--------|---------|
| `Mathlib.CategoryTheory.Functor.Const` | Constant functors (used in `constCompEvaluationObj`). |
| `Mathlib.CategoryTheory.Opposites` | Opposite categories (`prodOpEquiv`). |
| `Mathlib.Data.Prod.Basic` | Basic product type theory (e.g., `Prod.mk`, `Prod.fst`, `Prod.snd`). |

> **Note**: No external `category-theory`-specific imports beyond core infrastructure—this file builds foundational product theory from first principles.

--- 

This metadata reflects the *Lean 4* formalization of product categories in `Mathlib`, emphasizing structure, naming discipline, and proof methodology.