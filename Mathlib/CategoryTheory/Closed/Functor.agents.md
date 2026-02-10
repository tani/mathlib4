### Technical Metadata Brief: Cartesian Closed Functors in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `frobeniusMorphism` | `L ⊣ F → A : C → tensorLeft (F.obj A) ⋙ L ⟶ L ⋙ tensorLeft A` | Constructs a natural transformation from the product comparison and the counit of an adjunction; central to Frobenius reciprocity. |
| `expComparison` | `A : C → exp A ⋙ F ⟶ F ⋙ exp (F.obj A)` | Natural transformation comparing exponentials under `F`; `F` is *cartesian closed* iff this is an iso for all `A`. |
| `CartesianClosedFunctor` | `Prop` (class) | Predicate stating that `F` preserves exponentials: `∀ A, IsIso (expComparison F A)`. |
| `frobeniusMorphism_mate` | `conjugateEquiv (...) (frobeniusMorphism ...) = expComparison` | Relates the Frobenius morphism and exponential comparison via mate equivalence (adjoint transpose). |
| `frobeniusMorphism_iso_of_expComparison_iso` / `expComparison_iso_of_frobeniusMorphism_iso` | `IsIso (expComparison F A) ↔ IsIso (frobeniusMorphism F h A)` | Shows equivalence of isomorphism status between Frobenius morphism and exponential comparison. |
| `cartesianClosedFunctorOfLeftAdjointPreservesBinaryProducts` | `L ⊣ F, F full & faithful, L preserves binary products ⇒ CartesianClosedFunctor F` | Sufficient condition for `F` to be cartesian closed: full, faithful, and left adjoint preserving binary products. |
| `expComparison_ev`, `coev_expComparison`, `uncurry_expComparison` | Equations involving evaluation/counit and `expComparison` | Technical lemmas describing behavior of `expComparison` under evaluation, coevaluation, and uncurrying. |
| `expComparison_whiskerLeft` | Naturality of `expComparison` in `A` | Proves naturality of the exponential comparison in the base object `A`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `frobeniusMorphism_`: for Frobenius-related constructions.
  - `expComparison_`: for exponential comparison morphisms and lemmas.
  - `prodComparison_`: for binary product comparison (e.g., `prodComparison`, `prodComparisonNatTrans`, `prodComparisonNatIso`).
  - `curriedTensor_`: for curried tensor functors (used in exponential adjunctions).
- **Suffixes**:
  - `_iso`: indicates a proof that a morphism is an isomorphism (e.g., `frobeniusMorphism_iso_of_...`).
  - `_nat`: or `_natural`: naturality lemmas (e.g., `prodComparison_natural_whiskerLeft`).
  - `_app`: for component-wise application at an object (e.g., `expComparison_ev` uses `.app B`).
- **Adjectives**:
  - `leftAdjointSquareConjugate`, `rightAdjointConjugateSquare`: technical terms for diagrammatic constructions in mate theory.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp only [...]`: heavily used for simplification with explicit lemmas (especially for whiskering, naturality, and adjunction components).
- `rw [...]`: rewriting using naturality, adjunction, and comparison lemmas.
- `ext`: extensionality for natural transformations.
- `apply IsIso.eq_inv_of_inv_hom_id` / `IsIso.inv_eq_of_hom_inv_id`: to prove inverses.
- `convert ... using n`: for controlled proof refinement.
- `dsimp`, `unfold`: for simplifying definitions (e.g., `frobeniusMorphism`, `expComparison`).
- `infer_instance`: to discharge typeclass goals (e.g., `IsIso`).
- `slice_lhs ... => rw [...]`: for localized rewriting in complex expressions.

---

#### **4. Proof Logic**

- **General Strategy**:
  - Use **mate equivalence** (via `mateEquiv`, `conjugateEquiv`) to translate between product comparison and exponential comparison.
  - Leverage **naturality** of comparison morphisms (e.g., `prodComparison_natural_whiskerLeft`, `expComparison_whiskerLeft`) to reduce to component-wise reasoning.
  - Apply **adjunction identities** (unit/counit equations) and **tensor/hom adjunctions** (e.g., `uncurry_eq`, `exp.ev`, `exp.coev`) to relate evaluation and coevaluation.
  - Prove isomorphism by showing both directions via `frobeniusMorphism_mate` and `conjugateEquiv_of_iso`.
- **Inductive/Structural Reasoning**:
  - Not induction-heavy; mostly diagrammatic/category-theoretic reasoning.
  - Relies on properties of **preserves limits**, **full & faithful functors**, and **cartesian closed structure**.

---

#### **5. Imports & Scope**

**Primary Imports**:
- `Mathlib.CategoryTheory.Closed.Cartesian`: Cartesian closed categories and exponentials.
- `Mathlib.CategoryTheory.Limits.Preserves.Shapes.BinaryProducts`: Preservation of binary products.
- `Mathlib.CategoryTheory.Adjunction.FullyFaithful`: Fully faithful functors and adjunctions.

**Scope & Universe Parameters**:
- `universe v u u'`, variables `C : Type u`, `D : Type u'`, functors `F : C ⥤ D`, `L : D ⥤ C`.
- Assumes `ChosenFiniteProducts` for both categories (to fix binary products).
- Assumes `CartesianClosed` for both `C` and `D` in most lemmas.

**Key Typeclasses**:
- `Limits.PreservesLimitsOfShape (Discrete WalkingPair) F` (binary product preservation).
- `F.Full`, `F.Faithful` (for full faithfulness).
- `L ⊣ F` (adjunction).

---

### Summary

This file formalizes the theory of **cartesian closed functors** in Lean 4, focusing on the interplay between:
- **Exponential comparison morphisms** (`expComparison`),
- **Frobenius morphisms** (`frobeniusMorphism`) for adjunctions,
- And the characterization of cartesian closed functors via isomorphism of these morphisms.

It establishes foundational results (e.g., equivalence of Frobenius and exponential comparison being isos), and provides a sufficient condition for a functor to be cartesian closed (full, faithful, left adjoint preserving binary products). The proofs rely heavily on adjoint calculus, naturality, and diagrammatic reasoning in cartesian closed categories.