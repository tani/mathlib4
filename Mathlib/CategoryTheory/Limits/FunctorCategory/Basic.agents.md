### Technical Brief: (Co)limits in Functor Categories (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `evaluationJointlyReflectsLimits` | `{F : J ⥤ K ⥤ C} → Cone F → (∀ k, IsLimit (eval k .mapCone c)) → IsLimit c` | Shows that a cone is limiting iff all pointwise evaluations are limiting. |
| `combineCones` | `(F : J ⥤ K ⥤ C) → (∀ k, LimitCone (F.flip.obj k)) → Cone F` | Constructs a cone over `F` from pointwise limit cones. |
| `combinedIsLimit` | `(F : J ⥤ K ⥤ C) → (∀ k, LimitCone (F.flip.obj k)) → IsLimit (combineCones F c)` | Proves the stitched cone is limiting using `evaluationJointlyReflectsLimits`. |
| `pointwiseCocone` | `[HasColimitsOfShape J C] → F : J ⥤ K ⥤ C → Cocone F` | Constructs a canonical cocone in the functor category using pointwise colimits. |
| `pointwiseIsColimit` | `[HasColimitsOfShape J C] → IsColimit (pointwiseCocone F)` | Shows the pointwise cocone is colimiting. |
| `functorCategoryHasLimit` | `[∀ k, HasLimit (F.flip.obj k)] → HasLimit F` | Installs limits in the functor category `K ⥤ C` if `C` has them pointwise. |
| `functorCategoryHasLimitsOfShape` | `[HasLimitsOfShape J C] → HasLimitsOfShape J (K ⥤ C)` | Generalizes above to all shapes. |
| `evaluation_preservesLimit` | `[∀ k, HasLimit (F.flip.obj k)] → PreservesLimit F (eval k)` | Shows evaluation functors preserve limits. |
| `limitObjIsoLimitCompEvaluation` | `[HasLimitsOfShape J C] → (limit F).obj k ≅ limit (F ⋙ eval k)` | Relates evaluation of a limit cone at `k` to the limit of evaluations. |
| `limitCompWhiskeringLeftIsoCompLimit` | `limit (F ⋙ whiskeringLeft G) ≅ G ⋙ limit F` | Describes how limits interact with whiskering. |
| `preservesLimit_of_evaluation` | `(∀ k, PreservesLimit G (F ⋙ eval k)) → PreservesLimit G F` | A functor into a functor category preserves a limit iff all evaluations do. |
| `preservesLimits_const` | `PreservesLimits (const D : C ⥤ _)` | Constant functor preserves all limits. |
| `colimitIsoFlipCompColim` | `colimit F ≅ F.flip ⋙ colim` | Describes colimits in functor categories pointwise. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `evaluation_`: Relates to evaluation functors `eval K C : K ⥤ (K ⥤ C)`.
  - `combined_`: Stitching together pointwise (co)cones.
  - `pointwise_`: Constructing (co)cones pointwise using colimits/limits in `C`.
  - `limitObjIso_`, `colimitObjIso_`: Isomorphisms between evaluations of (co)limits and (co)limits of evaluations.
  - `preserves_`: Properties of functors preserving (co)limits.
  - `flip_`, `swap_`, `curry_`, `uncurry_`: Manipulating arguments of bifunctors.

- **Suffixes**:
  - `_ofShape`, `_ofSize`: For shape- or size-specific (co)limits.
  - `_app`: Component-wise application (e.g., `π.app j`, `ι.app j`).
  - `_hom`, `_inv`: Hom/inv parts of isomorphisms.

- **Notable patterns**:
  - `Iso.refl _`, `Iso.symm`, `Iso.ofNatIso`, `Iso.comp_inv_eq`, `Iso.eq_comp_inv`: Standard iso manipulations.
  - ` whiskerLeft`, `whiskerRight`: Horizontal composition with natural transformations.
  - `curry`, `uncurry`, `Prod.swap`: For currying/uncurrying bifunctors.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `ext` | Extensionality for natural transformations / functors / cones. |
| `simp` / `simpa` | Simplification using `@[simps]`, `@[reassoc]`, and definitional equalities. |
| `rw` / `erw` | Rewriting using equations or definitional equalities (`erw` for elaboration). |
| `dsimp` | Definitional simplification (often before `simp`). |
| `congr_app` | Apply congruence to natural transformation components. |
| `cancel_mono`, `cancel_epi` | Cancellation lemmas for monos/epis. |
| `apply ... ofIso...` | Use isomorphism-based preservation lemmas (e.g., `ofIsoLimit`, `ofIsoColimit`). |
| `exact`, `assumption` | Direct proof steps. |
| `change`, `convert` | Adjust goal type to match known lemmas. |
| `funext` / `ext` | For proving equality of functions/natural transformations. |
| `aesop` / `tauto` | Not used here — Lean’s category theory proofs are mostly manual or `simp`-driven. |

---

#### **4. Proof Logic**

- **General Strategy**:
  - **Pointwise construction**: Build (co)cones in `K ⥤ C` by assembling pointwise (co)cones in `C`.
  - **Joint reflection**: Use `evaluationJointlyReflectsLimits/Colimits` to reduce global (co)limit proofs to pointwise ones.
  - **Isomorphism chaining**: Prove isomorphisms like `(limit F).obj k ≅ limit (F ⋙ eval k)` via:
    - `preservesLimitIso` (if evaluation preserves limits),
    - or via `combinedIsLimit` + `evaluateCombinedCones`.
  - **Whiskering & currying**: Use `whiskeringLeft`, `flip`, `curry`, `uncurry`, and `Prod.swap` to reorganize arguments and relate diagrams.

- **Typical proof flow**:
  1. Construct candidate (co)limit cone/cocone (`combineCones`, `pointwiseCocone`).
  2. Show it’s limiting/colimiting via `combinedIsLimit` / `combinedIsColimit`.
  3. Derive isomorphisms using `preservesLimitIso`, `Iso.ofNatIso`, etc.
  4. Use `ext` + `simp` to verify naturality and universal properties.

- **Induction**: Not used — proofs are mostly diagrammatic and rely on universal properties.

---

#### **5. Imports & Scope**

- **Core imports**:
  ```lean
  import Mathlib.CategoryTheory.Functor.Currying
  import Mathlib.CategoryTheory.Limits.Preserves.Limits
  ```
- **Scope**: Category theory in `Type u`, with universe polymorphism (`u`, `v`, `u₁`, `v₁`, etc.).
- **Main modules used**:
  - `CategoryTheory.Functor.Currying`: For `curry`, `uncurry`, `flip`, `whiskering`.
  - `CategoryTheory.Limits.Preserves.Limits`: For `PreservesLimit`, `PreservesColimit`, `HasLimit`, etc.
  - `CategoryTheory.Limits.Constructions.Basic` (implicit via `HasLimit`, `LimitCone`, etc.)

- **Key abstractions**:
  - `Cone`, `Cocone`, `LimitCone`, `ColimitCocone`
  - `evaluation K C : K ⥤ (K ⥤ C)`
  - `whiskeringLeft`, `whiskeringRight`
  - `curry`, `uncurry`, `Prod.swap`

---

### Summary

This file formalizes the foundational theory of (co)limits in functor categories:  
✅ Limits/colimits in `K ⥤ C` exist if `C` has them pointwise.  
✅ Evaluation functors preserve (co)limits.  
✅ A functor `D ⥤ K ⥤ C` preserves (co)limits iff all evaluations do.  
✅ Explicit isomorphisms relate `(co)limit F` to `(co)lim (F.flip ⋙ eval k)`.

The proofs are constructive and rely heavily on pointwise constructions, joint reflection, and isomorphism-based reasoning — typical of modern Lean category theory.