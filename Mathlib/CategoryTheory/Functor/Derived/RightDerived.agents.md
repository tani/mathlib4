Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Right Derived Functors in Lean 4**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsRightDerivedFunctor` | `class IsRightDerivedFunctor [L.IsLocalization W] : Prop` | Asserts that `RF : D ⥤ H` is a *right derived functor* of `F : C ⥤ H` w.r.t. localization `L : C ⥤ D` for `W`, i.e., `α : F ⟶ L ⋙ RF` exhibits `RF` as the **left Kan extension** of `F` along `L`. |
| `rightDerivedDesc` | `RF.rightDerivedDesc α W G β : RF ⟶ G` | Universal property: given `β : F ⟶ L ⋙ G`, produces the unique mediating map `RF → G`. |
| `rightDerivedNatTrans` | `rightDerivedNatTrans RF RF' α α' W τ : RF ⟶ RF'` | Induced natural transformation between right derived functors from `τ : F ⟶ F'`. |
| `rightDerivedNatIso` | `rightDerivedNatIso RF RF' α α' W τ : RF ≅ RF'` | Induced natural isomorphism from `τ : F ≅ F'`. |
| `rightDerivedUnique` | `rightDerivedUnique [RF'.IsRightDerivedFunctor α'₂ W] : RF ≅ RF'` | Uniqueness of right derived functors up to iso. |
| `HasRightDerivedFunctor` | `class HasRightDerivedFunctor : Prop` | Asserts that `F : C ⥤ H` admits a right derived functor w.r.t. `W`, i.e., `F` has a left Kan extension along *any* localization `L` for `W`. |
| `totalRightDerived` | `F.totalRightDerived L W : D ⥤ H` | The *total* (i.e., globally defined) right derived functor: the left Kan extension of `F` along `L`. |
| `totalRightDerivedUnit` | `F.totalRightDerivedUnit L W : F ⟶ L ⋙ F.totalRightDerived L W` | The unit of the Kan extension (i.e., the structure map `α`). |
| `isRightDerivedFunctor_iff_isLeftKanExtension` | `RF.IsRightDerivedFunctor α W ↔ RF.IsLeftKanExtension α` | Equivalence showing that being a right derived functor is equivalent to being a left Kan extension. |
| `hasRightDerivedFunctor_iff` | `F.HasRightDerivedFunctor W ↔ HasLeftKanExtension L F` | Characterization: `F` has a right derived functor iff it has a left Kan extension along `L`. |

#### **2. Naming Conventions**

- **Prefixes**:
  - `rightDerived*`: for constructions derived from a given `α : F ⟶ L ⋙ RF`.
  - `totalRightDerived*`: for the canonical construction when `F` has a right derived functor.
  - `isRightDerivedFunctor*`: for properties/lemmas about the `IsRightDerivedFunctor` class.
  - `hasRightDerivedFunctor*`: for properties/lemmas about the `HasRightDerivedFunctor` class.

- **Suffixes**:
  - `_fac`, `_fac_app`: factorization lemmas (for `rightDerivedDesc`).
  - `_ext`: extension/uniqueness lemmas.
  - `_iff*`: logical equivalences.
  - `_unit`: unit of the Kan extension.

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `aesop_cat`: for categorical diagram chasing and simplification of compositions.
- `simp`, `simp only [...]`: heavily used, especially with `reassoc` attribute for whiskering.
- `rw [...]`: rewriting using equivalences like `isRightDerivedFunctor_iff_isLeftKanExtension`.
- `dsimp`, `infer_instance`: for type class resolution and definitional simplification.
- `have := ...; infer_instance`: to extract and reuse instance data.

#### **4. Proof Logic**

- **Structure of proofs**:
  - Most lemmas reduce to properties of **left Kan extensions** via `isRightDerivedFunctor_iff_isLeftKanExtension`.
  - Proofs often proceed by:
    1. Unfolding definitions (`dsimp [totalRightDerived]` etc.),
    2. Applying `isLeftKanExtension_*` lemmas (e.g., `descOfIsLeftKanExtension_fac_app`),
    3. Using `rightDerived_ext` to prove equality of natural transformations via universal property.
  - Uniqueness proofs use `rightDerived_ext` with `aesop_cat` to verify the required commutative diagram.
  - Isomorphism proofs (`rightDerivedNatIso`) rely on `isRightDerivedFunctor_iff_isIso_rightDerivedDesc`.

- **Inductive/constructive style**:
  - Definitions are noncomputable (as expected for derived functors), but constructive via Kan extension machinery.
  - Instances are built using `⟨...⟩` or `by infer_instance`.

#### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.CategoryTheory.Functor.KanExtension.Basic`: provides `HasLeftKanExtension`, `IsLeftKanExtension`, `leftKanExtension`, etc.
  - `Mathlib.CategoryTheory.Localization.Predicate`: provides `MorphismProperty`, `IsLocalization`, `Localization`, `W.Q`, etc.

- **Scope**:
  - Works in a general categorical setting (no abelian or homological assumptions).
  - Focuses on *left Kan extensions* as the correct notion for *right derived functors* in this context.
  - Intended as a stepping stone toward derived categories and derivability structures (see TODO).

---

Let me know if you'd like a diagrammatic summary or a comparison with the abelian-categorical `Functor.rightDerived`.