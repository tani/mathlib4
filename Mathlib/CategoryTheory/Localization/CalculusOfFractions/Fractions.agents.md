### Technical Brief: Lean 4 Formalization — `CategoryTheory.Localization.CalculusOfFractions.LeftFractionLemmas`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Structure | Purpose |
|------|------------------|---------|
| `LeftFraction₂ X Y` | `Structure` | Bundles **two left fractions** for objects `X, Y` with the **same denominator** `s : Y ⟶ Y'` in `W`. Used to compare two morphisms in the localized category via a common denominator. |
| `LeftFraction₃ X Y` | `Structure` | Bundles **three left fractions** with the same denominator. Generalizes `LeftFraction₂` for handling three morphisms simultaneously. |
| `RightFraction₂ X Y` | `Structure` | Bundles **two right fractions** with the same denominator `s : X' ⟶ X` in `W`. Dual to `LeftFraction₂`. |
| `LeftFraction₂Rel z₁ z₂` | `Prop` | Equivalence relation on `LeftFraction₂` tuples: two such tuples are related if they become equal after extending the denominator. Not proven to be an equivalence here. |
| `LeftFraction₂.fst`, `LeftFraction₂.snd`, `LeftFraction₂.symm` | `abbrev` | Projections and symmetry for `LeftFraction₂`. |
| `LeftFraction₃.fst`, `LeftFraction₃.snd`, `LeftFraction₃.thd`, `forgetFst`, etc. | `abbrev` | Projections and forgetting operations for `LeftFraction₃`. |
| `LeftFraction₂.map_eq_iff` | `lemma` | **Core equivalence**: For `φ, ψ : W.LeftFraction₂ X Y`, the equality of both fractions' images under `L` (the localization functor) holds **iff** `LeftFraction₂Rel φ ψ`. Generalizes `LeftFraction.map_eq_iff`. |
| `RightFraction₂.exists_leftFraction₂` | `lemma` | Given `φ : W.RightFraction₂ X Y`, constructs `ψ : W.LeftFraction₂ X Y` such that the numerators commute with the shared denominator. Generalizes `RightFraction.exists_leftFraction`. |
| `Localization.exists_leftFraction₂` | `lemma` | For any two morphisms `f, f' : L.obj X ⟶ L.obj Y`, there exists a `LeftFraction₂` representing both via the localization map. Generalizes `Localization.exists_leftFraction`. |
| `Localization.exists_leftFraction₃` | `lemma` | Same as above but for **three** morphisms `f, f', f''`. Uses `exists_leftFraction₂` twice and builds a `LeftFraction₃`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `LeftFraction₂`, `LeftFraction₃`, `RightFraction₂`: indicate bundled data of 2 or 3 fractions with shared denominator.
  - `fst`, `snd`, `thd`: first, second, third component.
  - `forgetFst`, `forgetSnd`, `forgetThd`: operations dropping one fraction from a triple.
  - `symm`: swaps the two fractions in `LeftFraction₂`.

- **Suffixes**:
  - `_₂`, `_₃`: denote arity (2 or 3 fractions).
  - `Rel`: indicates a relation (e.g., `LeftFraction₂Rel`).
  - `map_eq_iff`: equivalence between equality of mapped fractions and a relation.

- **Reduction-friendly**: Many definitions are marked `abbrev` or `reducible` to support rewriting (as noted in the docstring).

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Role |
|--------|------|
| `obtain ⟨…⟩` / `rcases` | Destruct existential or conjunction hypotheses. |
| `rw [reassoc_of% …]`, `rw [← reassoc_of% …]` | Reassociate compositions using associativity lemmas from `CategoryTheory`. |
| `cancel_mono` | Cancel monomorphisms on left/right in equalities. |
| `simp only [LeftFraction.map_eq_iff L W]` | Simplify using known equivalences. |
| `dsimp` | Simplify definitional equalities (e.g., after `let`/`abbrev` introductions). |
| `infer_instance` | Solve typeclass goals (e.g., `IsIso`, `W.comp_mem`). |
| `exact`, `refine` | Construct witnesses for existentials. |
| `nth_rw` | Rewrite at a specific occurrence (e.g., `nth_rw 1 [L.map_comp]`). |

---

#### **4. Proof Logic**

- **General Strategy**:
  - **Decompose** complex morphisms into fractions using `exists_leftFraction` or `exists_leftFraction₂`.
  - **Merge denominators** via `RightFraction.mk … .exists_leftFraction`, producing a common extension.
  - **Construct bundled structures** (`LeftFraction₂`, `LeftFraction₃`) from the merged data.
  - **Verify commutativity** using associativity, `map_comp`, and properties of `L` (e.g., `L.map_comp`, `inverts L W _ hs` ⇒ `IsIso (L.map s)`).
  - **Cancel isomorphisms** (e.g., `cancel_mono (L.map s)`) to reduce equalities to simpler forms.

- **Inductive/Iterative Pattern**:
  - For `exists_leftFraction₂`: apply `exists_leftFraction` twice, then unify denominators.
  - For `exists_leftFraction₃`: apply `exists_leftFraction₂` once, then `exists_leftFraction` for the third, and unify again.

- **Key Lemma**: `LeftFraction₂.map_eq_iff` is proven by:
  - Using `LeftFraction.map_eq_iff` on each fraction separately.
  - Merging the two extension data via `RightFraction.mk … .exists_leftFraction`.
  - Iteratively extending to a common denominator using `HasLeftCalculusOfFractions.ext`.
  - Verifying all three components commute and that the final denominator is in `W`.

---

#### **5. Imports & Scope**

- **Primary Import**:
  ```lean
  import Mathlib.CategoryTheory.Localization.CalculusOfFractions
  ```
  - Provides foundational notions: `MorphismProperty`, `LeftFraction`, `RightFraction`, `Localization`, `HasLeftCalculusOfFractions`, etc.

- **Dependencies**:
  - `CategoryTheory.Localization.CalculusOfFractions` (core localization theory).
  - Implicitly relies on `CategoryTheory.MonoIso`, `CategoryTheory.IsIso`, and `CategoryTheory.Composition` for reassociation/cancellation.

- **Domain**:
  - **Localized categories** where `W` admits a **left calculus of fractions**.
  - Used to define **preadditive structures** on localized categories (as noted in the docstring).

---

### Summary

This file extends the calculus of fractions machinery to handle **multiple fractions with a shared denominator**, enabling precise comparison of multiple morphisms in the localized category. It introduces structured datatypes (`LeftFraction₂`, `LeftFraction₃`, `RightFraction₂`) and proves key lemmas (`map_eq_iff`, `exists_leftFraction₂`, `exists_leftFraction₃`) that are essential for constructing algebraic structures (e.g., addition) on hom-sets of localized categories. The proofs rely heavily on the existence of common extensions guaranteed by `HasLeftCalculusOfFractions`.