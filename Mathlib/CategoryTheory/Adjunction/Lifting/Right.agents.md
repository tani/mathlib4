Here is the **technical metadata** extracted from the provided Lean 4 file, formatted as a structured technical brief for use in building a domain-specific AI agent:

---

### 🔹 **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `unitEqualises` | `[∀ X, RegularMono (adj₁.unit.app X)] → (X : B) → IsLimit (Fork.ofι ...)` | Shows that the unit `η_X` is an equalizer (i.e., a regular mono) under the assumption that all units are regular monos. Used to relate hom-sets via equalizer universal property. |
| `otherMap` | `(X : B) → U'.obj (F.obj X) ⟶ U'.obj (F.obj (U.obj (F.obj X)))` | Constructs the second morphism in a coreflexive pair used to define the equalizer for the lifted right adjoint. |
| `constructRightAdjointObj` | `(Y : B) → C` | Object part of the candidate right adjoint to `L`, defined as the equalizer of a coreflexive pair. |
| `constructRightAdjointEquiv` | `(Y : C) (X : B) → (Y ⟶ constructRightAdjointObj ...) ≃ (L.obj Y ⟶ X)` | Hom-set equivalence showing that `constructRightAdjointObj` satisfies the universal property of a right adjoint to `L`. |
| `constructRightAdjoint` | `[∀ X, RegularMono (adj₁.unit.app X)] → B ⥤ C` | Constructs the full right adjoint functor to `L`, using `constructRightAdjointObj` and the hom-set equivalence. |
| `isLeftAdjoint_triangle_lift` | `(L : C ⥤ B) → F ⊣ U → [∀ X, RegularMono (η_X)] → [HasCoreflexiveEqualizers C] → (L ⋙ F).IsLeftAdjoint → L.IsLeftAdjoint` | **Adjoint Triangle Theorem**: If `F ⊣ U` with unit regular monos, and `C` has coreflexive equalizers, then `L` is left adjoint iff `L ⋙ F` is. |
| `isLeftAdjoint_triangle_lift_comonadic` | `F : B ⥤ A → ComonadicLeftAdjoint F → [HasCoreflexiveEqualizers C] → (L ⋙ F).IsLeftAdjoint → L.IsLeftAdjoint` | Special case of the triangle theorem when `F` is comonadic (unit regular mono automatic). |
| `isLeftAdjoint_square_lift` | `(Q : A ⥤ B) (V : B ⥤ D) (U : A ⥤ C) (L : C ⥤ D) → ... → Q.IsLeftAdjoint` | **Adjoint Lifting Theorem (square version)**: Under a commutative square (up to iso), with `U, L, V` left adjoint and `V`’s unit regular mono, then `Q` is left adjoint if `L` is. |
| `isLeftAdjoint_square_lift_comonadic` | Same as above, but `V` is comonadic instead of just having regular mono units. | Special case of square lifting when `V` is comonadic. |

---

### 🔹 **Naming Conventions**

- **Prefixes**:
  - `constructRightAdjoint*`: Internal construction steps for the lifted right adjoint.
  - `isLeftAdjoint_*`: Theorems asserting existence of a left adjoint (i.e., that a functor is *left* adjoint).
  - `unitEqualises`, `otherMap`: Helper definitions for equalizer-based constructions.
- **Suffixes**:
  - `Obj`: Object part of a functor (e.g., `constructRightAdjointObj`).
  - `Equiv`: Hom-set equivalence (e.g., `constructRightAdjointEquiv`).
  - `triangle_lift`, `square_lift`: Indicates the theorem applies to triangle/square lifting scenarios.
  - `_comonadic`: Specialization when a functor is comonadic (e.g., `isLeftAdjoint_triangle_lift_comonadic`).

---

### 🔹 **Tactic Stack**

Frequent tactics used in proofs:
- `simp` / `simp only`: Simplification using definitional equalities and lemmas.
- `rw`: Rewriting using equations (e.g., naturality, unit/counit laws).
- `erw`: Eager rewriting (used for rewriting under binders or with definitional equalities).
- `apply`, `intro`, `exact`: Basic proof scripting.
- `calc`: Chain of equalities (used in hom-set equivalences).
- ` refine `: Partial proof construction (e.g., constructing limits/adjunctions).
- `dsimp`, ` erw `: Used for definitional simplification and rewriting.
- `cancel_mono`: Used to cancel monomorphisms in equations.

---

### 🔹 **Proof Logic**

- **Core strategy**: Use equalizers of coreflexive pairs to construct the object map of the desired right adjoint.
- **Steps**:
  1. Show that the unit `η_X` is a regular mono ⇒ it equalizes a pair.
  2. Define a coreflexive pair `(U'Fη_X, otherMap X)` using the unit/counit of two adjunctions (`F ⊣ U` and `L ⋙ F ⊣ U'`).
  3. Assume `C` has equalizers of such pairs ⇒ define `constructRightAdjointObj`.
  4. Build a chain of hom-set equivalences:
     - From morphisms into the equalizer → morphisms into `U'FX` satisfying an equalizer condition.
     - Via adjunctions (`adj₁`, `adj₂`) → morphisms `L Y → X`.
  5. Use `Adjunction.rightAdjointOfEquiv` to promote the equivalence to an adjunction.
- **Comonadic cases**: Use Beck’s theorem (unit regular mono automatic for comonadic functors) to simplify assumptions.

---

### 🔹 **Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Monad.Adjunction` | Provides adjunctions, monads, and their interaction (e.g., unit/counit, hom-set equivalences). |
| `Mathlib.CategoryTheory.Monad.Equalizer` | Provides tools for equalizers in categories of algebras (e.g., `HasCoreflexiveEqualizers`, `RegularMono.lift'`). |

**Key underlying libraries used**:
- `CategoryTheory.Limits.Constructions` (implicit via `Limits` open)
- `CategoryTheory.Adjunction.Basic` (via `Adjunction`)
- `CategoryTheory.Monad.Comonad` (via `ComonadicLeftAdjoint`, `Comonad.comparison`, etc.)

---

Let me know if you'd like a **diagrammatic summary**, **proof sketch in natural language**, or **export to JSON/YAML** for ingestion into a knowledge base.