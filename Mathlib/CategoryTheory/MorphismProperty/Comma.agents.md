### Technical Metadata Brief: Subcategories of Comma Categories via Morphism Properties

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Comma.P.Comma L R Q W` | `Structure` extending `Comma L R` | Defines the subcategory of `Comma L R` where objects satisfy property `P` on their structural morphism, and morphisms satisfy `Q` (left) and `W` (right). |
| `Comma.Hom` | `Structure` extending `CommaMorphism` | Morphisms in `P.Comma L R Q W`, requiring `Q` on left component and `W` on right. |
| `Comma.id` | `[Q.ContainsIdentities] → [W.ContainsIdentities] → X → X ⟶ X` | Identity morphism in subcategory, using stability of `Q`, `W` under identities. |
| `Comma.Hom.comp` | `[Q.IsStableUnderComposition] → [W.IsStableUnderComposition] → f → g → f ≫ g` | Composition in subcategory, using stability under composition. |
| `Comma.isoMk` | `[Q.RespectsIso] → [W.RespectsIso] → (l : X.left ≅ Y.left) → (r : X.right ≅ Y.right) → ... → X ≅ Y` | Constructs isomorphisms in subcategory from component-wise isos + naturality. |
| `Comma.homFromCommaOfIsIso` | `[Q.RespectsIso] → [W.RespectsIso] → (i : X.toComma ⟶ Y.toComma) [IsIso i] → X ⟶ Y` | Lifts isos in ambient comma category to subcategory. |
| `Comma.forget` | `P.Comma L R Q W ⥤ Comma L R` | Forgetful functor; faithful by construction. |
| `Comma.lift` | `(F : C ⥤ Comma L R) → (∀ X, P ...) → ... → C ⥤ P.Comma L R Q W` | Lifts functors into comma category to subcategory under coherence conditions. |
| `Comma.mapLeft`, `Comma.mapRight` | Natural transformations induce functors between subcategories | Functoriality of `Comma` construction w.r.t. changes in `L`, `R`. |
| `P.Over Q X` | `abbrev := P.Comma (id) (fromPUnit X) Q ⊤` | Subcategory of `Over X` where objects satisfy `P`, morphisms satisfy `Q`. |
| `P.Under Q X` | `abbrev := P.Comma (fromPUnit X) (id) ⊤ Q` | Subcategory of `Under X` where objects satisfy `P`, morphisms satisfy `Q`. |
| `Over.isoMk`, `Under.isoMk` | `[Q.RespectsIso] → ... → A ≅ B` | Construct isomorphisms in `Over`/`Under` subcategories from iso in base category. |
| `Over.Hom.ext`, `Under.Hom.ext` | `(h : f.left = g.left) → f = g` / `(h : f.right = g.right) → f = g` | Extensionality lemmas for morphisms in subcategories of `Over`/`Under`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `Comma.`: General comma-category-level constructions (`Comma`, `Comma.Hom`, `Comma.id`, etc.)
  - `Over.` / `Under.`: Specializations to over/under categories.
  - `homFromCommaOfIsIso`, `isoFromComma`: Indicate lifting from ambient comma category.

- **Suffixes**:
  - `mk`: Constructor for objects/morphisms (e.g., `Over.mk`, `Over.homMk`, `Over.isoMk`).
  - `ext`: Extensionality lemmas (`Over.Hom.ext`, `Under.Hom.ext`).
  - `hom`: Projection to underlying morphism in ambient category (`Hom.hom`, `id_hom`, `comp_hom`).
  - `left`/`right`: Projections to components (`comp_left`, `comp_right`, `Hom.hom_left`, `Hom.hom_right`).
  - `forget`: Forgetful functors (`Comma.forget`, `Over.forget`, `Under.forget`).

- **Property-related**:
  - `prop`, `prop_hom_left`, `prop_hom_right`: Proof components witnessing membership in subcategory.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs and `simp`-friendly definitions:

| Tactic | Usage |
|--------|-------|
| `aesop_cat` | Solves commutativity diagrams in comma/over/under categories (e.g., naturality conditions). |
| `simp` / `simp_rw` | Simplifying projections (`Hom.hom`, `id_hom`, `comp_hom`, etc.). |
| `ext` | Extensionality for morphisms (e.g., `Comma.Hom.ext`, `Over.Hom.ext`). |
| `congrArg` | Proving equality of morphisms by equality of components. |
| `rw`, `subst` | Rewriting equalities and handling `eqToHom`. |
| `infer_instance` | Inferring class instances (e.g., `IsIso`, `ContainsIdentities`). |
| `constructor` | Breaking down `structure` or `instance` goals. |
| `rw [← comp_hom, ...]` | Rewriting using composition lemmas. |

---

#### **4. Proof Logic**

- **General pattern**:
  - **Induction/Case analysis** on equality or structure (e.g., `eqToHom`, `isoMk`).
  - **Projection + simplification**: Use `simp` with `simps`-generated lemmas (`id_hom`, `comp_hom`, etc.).
  - **Lifting properties**: Use assumptions like `Q.RespectsIso`, `Q.IsStableUnderComposition`, etc., to propagate properties through constructions.
  - **Naturality checks**: Often solved automatically via `aesop_cat`, especially for `isoMk` and `homMk`.
  - **Faithfulness/fullness**: Proven via `Comma.Hom.ext'` and `ext`, leveraging component-wise equality.

- **Isomorphism handling**:
  - Isos in ambient comma category lift to subcategory if `Q`, `W` respect isos.
  - Inverses computed via `homFromCommaOfIsIso (inv i)` and verified using `IsIso.eq_inv_of_hom_inv_id`.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Comma.Over` | Provides `Over X`, `Under X`, and basic comma category infrastructure. |
| `Mathlib.CategoryTheory.MorphismProperty.Composition` | Defines `MorphismProperty`, stability axioms (`ContainsIdentities`, `IsStableUnderComposition`, `IsMultiplicative`, `RespectsIso`). |

---

### Summary

This file formalizes a flexible framework for constructing subcategories of comma categories (including over/under categories) defined by morphism properties. It supports both general `P`, `Q`, `W` and the common case where `Q = W = ⊤` (i.e., all morphisms allowed). The design emphasizes modularity, reusability, and compatibility with Lean’s `simps` and `reassoc` infrastructure. Key features include:

- **Functoriality** in the base functors `L`, `R`.
- **Isomorphism reflection/lifting** under mild assumptions.
- **Faithful & full forgetful functors** to ambient comma categories.
- **Specializations** to étale/affine/etc. morphisms over a base (via `P.Over Q X`).

This is foundational for categorical constructions in algebraic geometry and homotopy theory where subcategories defined by properties (e.g., “étale”, “open immersion”, “fibration”) are ubiquitous.