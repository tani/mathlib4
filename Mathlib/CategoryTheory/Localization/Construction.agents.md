### Technical Metadata Brief: Localization of Categories in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `LocQuiver W` | `Structure` | Quiver extending `C` with formal inverses for `W`: morphisms are `C`-morphisms (`Sum.inl`) or formal inverses (`Sum.inr`). |
| `ιPaths X` | `Paths (LocQuiver W)` | Embedding of objects of `C` into the path category of `LocQuiver W`. |
| `ψ₁ f` | `ιPaths X ⟶ ιPaths Y` | Embedding of a morphism `f : X ⟶ Y` in `C` into the path category. |
| `ψ₂ w hw` | `ιPaths Y ⟶ ιPaths X` | Embedding of a formal inverse of `w : X ⟶ Y` (with `W w`) into the path category. |
| `relations` | `HomRel (Paths (LocQuiver W))` | Inductive family of relations generating the congruence: identity, composition, and inverse axioms (`Winv₁`, `Winv₂`). |
| `Localization W` | `Category` | Quotient category `Paths (LocQuiver W) / relations`, i.e., the localized category. |
| `Q W : C ⥤ W.Localization` | `Functor` | Canonical functor sending objects/morphisms to their equivalence classes in the localization. |
| `wIso w hw` | `Iso (Q.obj X) (Q.obj Y)` | Isomorphism in the localized category induced by `w ∈ W`. |
| `wInv w hw` | `Y ⟶ X` in `W.Localization` | Inverse of `Q.map w`, defined via `wIso`. |
| `Q_inverts` | `W.IsInvertedBy (Q W)` | `Q` inverts all maps in `W`. |
| `lift G hG` | `W.Localization ⥤ D` | Unique lift of `G : C ⥤ D` (inverting `W`) through `Q`. |
| `fac` | `Q ⋙ lift G hG = G` | Factorization property of the lift. |
| `uniq` | `G₁ = G₂` under `Q ⋙ G₁ = Q ⋙ G₂` | Uniqueness of the lift. |
| `objEquiv` | `C ≃ W.Localization` | Bijection between objects of `C` and its localization (via `Q.obj`). |
| `morphismProperty_is_top` / `morphismProperty_is_top'` | `P = ⊤` | Criteria for a morphism property to hold universally in the localization (stable under comp, contains image of `Q`, and inverses of `W`). |
| `natTransExtension τ` | `F₁ ⟶ F₂` | Extension of a natural transformation `W.Q ⋙ F₁ ⇒ W.Q ⋙ F₂` to `F₁ ⇒ F₂`. |
| `functor`, `inverse` | Functors between `(W.Localization ⥤ D)` and `W.FunctorsInverting D` | Components of the equivalence of categories. |
| `whiskeringLeftEquivalence` | `W.Localization ⥤ D ≌ W.FunctorsInverting D` | The main equivalence: precomposition with `Q` gives an equivalence between functors out of the localization and functors inverting `W`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `wIso`, `wInv`: for isos/inverses associated to `W`.
  - `lift`, `liftToPathCategory`: for lifting functors through localization.
  - `Q`: canonical quotient/localization functor.
  - `ιPaths`, `ψ₁`, `ψ₂`: embedding maps into path category.
  - `relations.*`: constructors of the defining congruence.

- **Suffixes**:
  - `Equiv`, `Iso`, `Iso_hom`, `Iso_inv`: for equivalences and isomorphisms.
  - `inverting`, `invertedBy`: for properties of functors with respect to `W`.
  - `Extension`, `natTransExtension`: for extending data from precomposition.

- **General patterns**:
  - `X.as.obj`, `X.as.hom`: destructors for quotient objects/homs.
  - `eqToHom (h.symm) ≫ _ ≫ eqToHom h`: standard technique for transport along equalities in quotient categories.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `aesop_cat` | Automated reasoning in categories (identity, composition, naturality). |
| `simp` / `simp only [...]` | Simplification using lemmas, especially `fac`, `natTransExtension_app`, `app_eq`. |
| `rw [...]` | Rewriting using definitions (`fac`, `objEquiv.right_inv`, etc.). |
| `rfl` | Reflexivity for definitional equalities (e.g., in `fac`, `natTransExtension_hcomp`). |
| `rcases r with (_|_|⟨f,hf⟩|⟨f,hf⟩)` | Case analysis on inductive `relations`. |
| `induction' p with ...` | Induction on paths in `Paths (LocQuiver W)`. |
| `funext`, `ext` | Extensionality for functors/natural transformations. |
| `apply uniq`, `apply natTrans_hcomp_injective` | Leveraging uniqueness lemmas. |
| `dsimp`, `erw` | Definitional simplification and rewriting with definitional equality. |

---

#### **4. Proof Logic**

- **Construction of localization**:
  1. Build `LocQuiver W` with formal inverses.
  2. Define path category `Paths (LocQuiver W)`.
  3. Impose congruence `relations` (4 types: identity, composition, left/right inverse).
  4. Take quotient `Localization W := Quotient relations`.

- **Universal property**:
  - Given `G : C ⥤ D` with `W.IsInvertedBy G`, define:
    - `liftToPathCategory`: extend `G` to `Paths (LocQuiver W)`.
    - `lift`: descend to quotient using `Quotient.lift`, verifying relations via `aesop_cat` + `simp`.
  - Prove `fac` (factorization) and `uniq` (uniqueness) using:
    - `Functor.ext`, `natTrans.ext`, `Paths.ext_functor`.
    - Transport via `objEquiv.right_inv` and `eqToHom`.

- **Equivalence of categories**:
  - Show `precompose Q : (W.Localization ⥤ D) → (C ⥤ D)` restricts to an equivalence onto `W.FunctorsInverting D`.
  - Construct inverse via `lift`.
  - Prove unit/counit isomorphisms using `uniq`, `natTrans_hcomp_injective`, and simplifications.

- **Morphism properties**:
  - Use induction on paths + stability assumptions (`IsStableUnderComposition`, `stableUnderInverse`) to show `P = ⊤`.

---

#### **5. Imports & Scope**

**Primary imports**:
- `Mathlib.CategoryTheory.MorphismProperty.Composition`
- `Mathlib.CategoryTheory.MorphismProperty.IsInvertedBy`
- `Mathlib.CategoryTheory.Category.Quiv`

**Core dependencies**:
- Path categories (`Paths`), quivers (`Quiv`), and quotient categories (`Quotient`).
- Morphism properties (`MorphismProperty`), including stability under composition/inverses.
- Functors, natural transformations, whiskering, and equivalence of categories.

**Scope**:
- Formalization of *Ore localization* in category theory (Gabriel–Zisman).
- Applicable to homotopy theory, derived categories, and homological algebra.

--- 

Let me know if you'd like a diagrammatic summary or a proof sketch for a specific theorem (e.g., `uniq`, `whiskeringLeftEquivalence`).