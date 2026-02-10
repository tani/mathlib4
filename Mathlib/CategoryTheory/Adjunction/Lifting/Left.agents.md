### Technical Metadata Brief: Adjoint Lifting in Lean 4 (`Mathlib.CategoryTheory.Adjunction.Lifting.Left`)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `counitCoequalises` | `[∀ X, RegularEpi (adj₁.counit.app X)] → (X : B) → IsColimit (...)` | Shows that the counit `ε_X : FUX → X` is a coequalizer under regular epi assumption. |
| `otherMap` | `F'.obj (U.obj (F.obj (U.obj X))) ⟶ F'.obj (U.obj X)` | Constructs the second morphism in a reflexive pair used to define the lifted left adjoint. |
| `IsReflexivePair` instance | `IsReflexivePair (F'.map (U.map (adj₁.counit.app X))) (otherMap _ _ adj₁ adj₂ X)` | Proves `(F'Uε_X, otherMap X)` forms a reflexive pair, ensuring coequalizers exist in `A`. |
| `constructLeftAdjointObj` | `B → A` | Object part of the candidate left adjoint to `R`, defined as a coequalizer. |
| `constructLeftAdjointEquiv` | `(constructLeftAdjointObj X ⟶ Y) ≃ (X ⟶ R.obj Y)` | Hom-set equivalence used to prove adjunction; key step in verifying the left adjoint. |
| `constructLeftAdjoint` | `B ⥤ A` | Full left adjoint functor constructed via `Adjunction.leftAdjointOfEquiv`. |
| `isRightAdjoint_triangle_lift` | Under regular epi counit + reflexive coequalizers + `(R ⋙ U).IsRightAdjoint`, implies `R.IsRightAdjoint` | **Adjoint Triangle Theorem**: lifts left adjoints through `U` when `U` has regular epi counit. |
| `isRightAdjoint_triangle_lift_monadic` | If `U` is monadic, `A` has reflexive coequalizers, and `R ⋙ U` has left adjoint, then `R` does | Special case of triangle theorem for monadic functors. |
| `isRightAdjoint_square_lift` | Commutative square with `U, V, R` having left adjoints, `V`'s counit regular epi ⇒ `Q` has left adjoint if `R` does | **Adjoint Lifting Theorem** for squares. |
| `isRightAdjoint_square_lift_monadic` | Same as above, but `V` monadic instead of regular epi counit | Monadic version of square lifting. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `constructLeftAdjoint*`: for building the lifted left adjoint (e.g., `constructLeftAdjointObj`, `constructLeftAdjointEquiv`).
  - `isRightAdjoint_*`: for theorems asserting existence of right adjoints (i.e., left adjoints of the domain functor).
  - `counit*`: properties of the counit of an adjunction.
  - `otherMap`: auxiliary morphism in coequalizer construction.

- **Suffixes**:
  - `Obj`: object part of a functor.
  - `Equiv`: hom-set equivalence.
  - `triangle_lift`, `square_lift`: indicates lifting scenario (triangle or square).
  - `_monadic`: special case where monadicity simplifies assumptions.

- **Variable naming**:
  - `adj₁ : F ⊣ U`, `adj₂ : F' ⊣ R ⋙ U`: standard notation for two adjunctions involved.
  - `(η, ε)` and `(ι, δ)` for units/counits (used in docstring, not variables in code).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `rw` / `erw` | Rewriting using equations, especially naturality and triangle identities. `erw` used for deferred rewriting after PR #2644. |
| `simp_rw` | Simplify and rewrite in one step (e.g., `Functor.comp_map`). |
| `aesop_cat` | Category-theoretic automation for diagram chasing and equality of morphisms. |
| `apply`, `intro`, `exact`, `refine` | Standard proof construction. |
| `dsimp`, `simp` | Simplification of definitions (e.g., `Functor.comp_obj`, `adj₂.left_triangle_components`). |
| `cancel_epi` | Eliminate epimorphisms from both sides of an equation. |
| `subtypeEquiv`, `homIso`, `IsColimit.mk'` | Equiv/colimit reasoning for hom-sets and cocones. |

---

#### **4. Proof Logic**

- **Core strategy**:
  1. **Construct candidate left adjoint**:
     - Define object map via coequalizer of a reflexive pair `(F'Uε_X, otherMap X)`.
     - Use `HasReflexiveCoequalizers A` to ensure existence.
  2. **Establish hom-set equivalence**:
     - Chain multiple equivalences using:
       - `Cofork.IsColimit.homIso`
       - `adj₂.homEquiv` (from `F' ⊣ R ⋙ U`)
       - `adj₁.homEquiv` (from `F ⊣ U`)
       - Subtype equivalences to enforce coequalizer condition.
  3. **Verify naturality & functoriality**:
     - Use `Adjunction.leftAdjointOfEquiv` + naturality lemmas (`homEquiv_naturality_*`).
     - `aesop_cat` handles diagrammatic reasoning.

- **Triangle theorem proof**:
  - Reduce to `constructLeftAdjoint` + `Adjunction.adjunctionOfEquivLeft`.
  - Use `counitCoequalises` to ensure coequalizer condition holds.

- **Monadic corollaries**:
  - Use `MonadicRightAdjoint` to get `U ≃ Monad.forget T` with `F = leftAdjoint (Monad.forget T)`.
  - Beck’s condition (regular epi counit) follows from `Monad.beckAlgebraCoequalizer`.

- **Square theorem proof**:
  - Reduce to triangle case via `comm : U ⋙ R ≅ Q ⋙ V`.
  - Use `ofNatIsoRight` to transfer left adjointness across isomorphism.

---

#### **5. Imports & Scope**

- **Primary imports**:
  ```lean
  import Mathlib.CategoryTheory.Monad.Adjunction
  import Mathlib.CategoryTheory.Monad.Coequalizer
  ```
  - These provide monadicity, comparison functors, and coequalizer machinery.

- **Key abstractions used**:
  - `CategoryTheory.Limits.HasReflexiveCoequalizers`
  - `CategoryTheory.RegularEpi`
  - `CategoryTheory.Monad.MonadicRightAdjoint`
  - `CategoryTheory.Adjunction.IsRightAdjoint`
  - `CategoryTheory.Adjunction.homEquiv_*` naturality lemmas.

- **Universe polymorphism**:
  - Explicit universe variables `u₁, u₂, u₃, u₄, v₁, v₂, v₃, v₄` for categories `A, B, C, D`.

- **Notable modules in sync**:
  - This file is adapted from `Mathlib.CategoryTheory.Adjunction.Lifting.Right`; kept in sync for dual lifting (right adjoints).

---

### Summary

This module formalizes two major adjoint lifting theorems in category theory: the **adjoint triangle theorem** and the **adjoint lifting theorem for squares**, with both general (regular epi counit) and monadic special cases. It constructs lifted left adjoints explicitly via coequalizers of reflexive pairs and verifies adjunction via hom-set equivalences. The proofs rely heavily on monadicity, coequalizer existence, and naturality of adjunction data, with automation via `aesop_cat` and careful rewriting.