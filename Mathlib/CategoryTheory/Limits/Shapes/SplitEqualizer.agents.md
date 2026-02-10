### Technical Metadata Brief: Split Equalizers in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Structure | Purpose |
|------|------------------|---------|
| `IsSplitEqualizer` | `structure` | Encodes a *split equalizer diagram*: morphisms `ι : W ⟶ X`, `f, g : X ⟶ Y` with retractions `r : X ⟶ W`, `t : Y ⟶ X` satisfying compatibility conditions (`ι ≫ f = ι ≫ g`, `ι ≫ r = 1`, `g ≫ t = 1`, `f ≫ t = r ≫ ι`). |
| `IsSplitEqualizer.map` | `def` | Shows *absoluteness*: any functor `F : C ⥤ D` preserves split equalizers. |
| `IsSplitEqualizer.asFork` | `def` | Constructs a fork from a split equalizer (`ι : W ⟶ X` with `ι ≫ f = ι ≫ g`). |
| `IsSplitEqualizer.isEqualizer` | `def` | Proves that any split equalizer is an *equalizer* (i.e., its induced fork is a limit cone). |
| `HasSplitEqualizer` | `class Prop` | Asserts existence of a split equalizer for a pair `f, g : X ⟶ Y`. |
| `Functor.IsCosplitPair` | `abbrev` | Says `G f, G g` have a split equalizer in the target category. |
| `HasSplitEqualizer.equalizerOfSplit` | `noncomputable def` | Extracts the equalizer object from the typeclass. |
| `HasSplitEqualizer.equalizerι` | `noncomputable def` | Extracts the equalizer morphism. |
| `HasSplitEqualizer.isSplitEqualizer` | `noncomputable def` | Extracts the actual split equalizer structure. |
| `hasEqualizer_of_hasSplitEqualizer` | `instance` | Shows existence of equalizers when split equalizers exist. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`: Predicate-style definitions (`IsSplitEqualizer`, `isEqualizer`).
  - `has_`: Typeclass-style existence (`HasSplitEqualizer`).
  - `map_`: Functorsial action (`map`, `IsSplitEqualizer.map`).
- **Suffixes**:
  - `_ι`: Canonical morphism into the object (`equalizerι`).
  - `_of_`: Extraction from a class (`equalizerOfSplit`).
- **Structure fields**:
  - `leftRetraction`, `rightRetraction`: Named by their role in splitting (`r : X → W`, `t : Y → X`).
  - `condition`, `ι_leftRetraction`, `bottom_rightRetraction`, `top_rightRetraction`: Reflect diagrammatic equalities.

---

#### **3. Tactic Stack**

- **`aesop_cat`**: Used in `by aesop_cat` for category-theoretic simplification (e.g., verifying diagram commutativity).
- **`simp` / `simp_rw`**: Heavily used in proofs, especially with `[reassoc]` and `[simp]` attributes on structure fields.
- **`rw`**: For rewriting using equalities from structure fields (e.g., `q.condition`, `q.ι_leftRetraction`).
- **`rfl`**: For definitional equalities (e.g., `asFork_ι`).
- **`classical` / `Classical.choice`**: For extracting data from existential quantifiers in typeclasses.

---

#### **4. Proof Logic**

- **Structure proofs**:
  - Define structures with fields and proofs; proofs are discharged via `aesop_cat`.
- **Functoriality proofs**:
  - Use `rw [← F.map_comp, ...]` to lift equalities through functors.
- **Equalizer proofs**:
  - Construct universal property via `Fork.IsLimit.mk'`.
  - Use `simp [-top_rightRetraction, ← top_rightRetraction, ...]` to simplify composites.
- **Typeclass proofs**:
  - Use `Classical.choice` to extract data from `splittable`.
  - Prove instances by constructing witnesses using existing data (e.g., `map` for `map_is_cosplit_pair`).

---

#### **5. Imports**

- **Core dependency**:
  ```lean
  import Mathlib.CategoryTheory.Limits.Shapes.Equalizers
  ```
  - Provides foundational definitions for equalizers and limits.
- **Implicit dependencies** (via Mathlib):
  - `CategoryTheory.Category`: Basic category theory.
  - `CategoryTheory.Limits`: General limit theory.
  - `CategoryTheory.Functor`: Functors and natural transformations.
  - `Mathlib.Tactics.Aesop`: For automated category-theoretic reasoning.

---

### Summary

This file formalizes *split equalizers*—a robust class of equalizers that are preserved by all functors (absolute) and admit explicit splitting data. It mirrors the structure of `SplitCoequalizer`, ensuring consistency across dual constructions. The key insight is that split equalizers are *constructive* enough to yield equalizers (via `isEqualizer`) and stable under functors (via `map`), making them central to comonadicity theorems.