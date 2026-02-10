### Technical Metadata Brief: Associativity of Pullbacks and Pushouts in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `pullbackPullbackLeftIsPullback` | `IsLimit (PullbackCone.mk l₁ l₂ ...)` — Shows that the composite cone `(W → Z₁ → X₁, W → Z₂ → X₃)` is the pullback of `g₂ ≫ f₃` and `f₄`. |
| `pullbackAssocIsPullback` | `IsLimit (PullbackCone.mk (l₁ ≫ g₁) l₂ ...)` — Shows that the same composite cone is also the pullback of `f₁` and `g₃ ≫ f₂`. |
| `hasPullback_assoc` | `HasPullback f₁ (g₃ ≫ f₂)` — Consequence: existence of the pullback `X₁ ×_{Y₁} (X₂ ×_{Y₂} X₃)`. |
| `pullbackPullbackRightIsPullback` | `IsLimit (PullbackCone.mk l₁' l₂' ...)` — Shows that the cone from `W' = X₁ ×_{Y₁} (X₂ ×_{Y₂} X₃)` is the pullback of `g₂ ≫ f₃` and `f₄`. |
| `pullbackAssocSymmIsPullback` | `IsLimit (PullbackCone.mk l₁' (l₂' ≫ g₄) ...)` — Shows that `W'` is also the pullback of `f₁` and `g₃ ≫ f₂`. |
| `hasPullback_assoc_symm` | `HasPullback (g₂ ≫ f₃) f₄` — Converse existence: `X₁ ×_{Y₁} X₂ ×_{Y₂} X₃` exists if the other does. |
| `pullbackAssoc` | `pullback (g₂ ≫ f₃) f₄ ≅ pullback f₁ (g₃ ≫ f₂)` — Canonical isomorphism between the two ways of associating pullbacks. |
| `pullbackAssoc_*_fst_*`, `pullbackAssoc_*_snd_*` | `simp`-friendly lemmas describing how `pullbackAssoc` and its inverse interact with the pullback projections (`fst`, `snd`). |
| `pushoutPushoutLeftIsPushout`, `pushoutAssocIsPushout`, `hasPushout_assoc` | Dual statements for pushouts: existence and universal property of `(X₁ ⨿_{Z₁} X₂) ⨿_{Z₂} X₃`. |
| `pushoutPushoutRightIsPushout`, `pushoutAssocSymmIsPushout`, `hasPushout_assoc_symm` | Dual statements for the other associativity shape. |
| `pushoutAssoc` | `pushout (g₃ ≫ inr) g₄ ≅ pushout g₁ (g₂ ≫ inl)` — Canonical isomorphism for associativity of pushouts. |
| `inl_inl_pushoutAssoc_hom`, `inr_inl_pushoutAssoc_hom`, etc. | `simp`-friendly lemmas describing how `pushoutAssoc` and its inverse interact with pushout injections (`inl`, `inr`). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `pullback*`, `pushout*`: Core definitions for pullback/pushout associativity.
  - `*_IsPullback`, `*_IsPushout`: Statements asserting universal properties (i.e., `IsLimit` / `IsColimit`).
  - `has*`: Existence lemmas (`HasPullback`, `HasPushout`).
  - `assoc`, `assoc_symm`: Canonical isomorphisms and their inverses.
  - `assoc_hom`, `assoc_inv`: Components of the isomorphism.

- **Suffixes**:
  - `*_fst`, `*_snd`: Projections from pullbacks/pushouts.
  - `*_hom`, `*_inv`: Morphism parts of the isomorphism.
  - `*_assoc`: Associativity-related lemmas.

- **Notation**:
  - `Z₁`, `Z₂`, `W`, `W'`: Local notation for pullback objects.
  - `g₁`, `g₂`, `g₃`, `g₄`: Standard pullback projections.
  - `l₁`, `l₂`, `l₁'`, `l₂'`: Mediating morphisms from composite pullbacks.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `rw`, `simp`, `refl`, `exact`, `trans`, `congr`, `ext`
- **Category-theoretic automation**:
  - `simpa` (with `using` or `[...]`)
  - `apply ... using ...`
  - `category theory`-specific lemmas: `pullback.condition`, `pushout.condition`, `Category.assoc`, `pullback.lift_fst`, `pushout.inl_desc`, etc.
- **Limit/colimit reasoning**:
  - `IsLimit.conePointUniqueUpToIso_*`, `IsColimit.coconePointUniqueUpToIso_*`
  - `pullbackIsPullback`, `pushoutIsPushout`
  - `pasteHorizIsPullback`, `pasteVertIsPullback`, `pasteHorizIsPushout`, `pasteVertIsPushout`
- **Rewriting helpers**:
  - `@[reassoc (attr := simp)]`: Custom reassociation lemmas for `simp`-based simplification of compositions.

---

#### **4. Proof Logic**

- **High-level strategy**:
  1. **Construct candidate cones** (e.g., `PullbackCone.mk` or `PushoutCocone.mk`) from composite diagrams.
  2. **Show they satisfy the universal property**:
     - Use `pasteHorizIsPullback`, `pasteVertIsPullback`, etc., to glue known pullback/pushout squares.
     - Use `IsLimit.conePointUniqueUpToIso` to get canonical isomorphisms between cones with same limit/colimit.
  3. **Derive existence** (`HasPullback`, `HasPushout`) from universal properties.
  4. **Define the canonical isomorphism** (`pullbackAssoc`, `pushoutAssoc`) via `conePointUniqueUpToIso` / `coconePointUniqueUpToIso`.
  5. **Prove projection behavior** using `simp`-friendly lemmas (`@[reassoc (attr := simp)]`) to simplify compositions with `fst`, `snd`, `inl`, `inr`.

- **Inductive/structural pattern**:
  - Most proofs follow:  
    `apply [pasting lemma] ...; simpa using [known limit/colimit]`.

---

#### **5. Imports**

- **Primary dependency**:
  ```lean
  import Mathlib.CategoryTheory.Limits.Shapes.Pullback.Pasting
  ```
  - Provides pasting lemmas for pullbacks (`pasteHorizIsPullback`, `pasteVertIsPullback`, etc.).
- **Implicit imports** (via `CategoryTheory` namespace and `Limits`):
  - `Mathlib.CategoryTheory.Limits.Shapes.Pullback`
  - `Mathlib.CategoryTheory.Limits.Shapes.Pushout`
  - `Mathlib.CategoryTheory.Limits.Constructions.Pullback`
  - `Mathlib.CategoryTheory.Limits.Constructions.Pushout`
  - `Mathlib.CategoryTheory.Limits.Shapes.WalkingCospan` (for `WalkingCospan.left`, `right`)
  - `Mathlib.CategoryTheory.Limits.Preserves` (for `conePointUniqueUpToIso`, etc.)

---

### Summary

This file formalizes the **associativity of pullbacks and pushouts up to canonical isomorphism**, using:
- **Pasting lemmas** to verify universal properties,
- **Uniqueness of limits/colimits** to construct isomorphisms,
- **Simp-friendly projection lemmas** for practical reasoning.

It exemplifies a standard pattern in Mathlib: *construct → verify universal property → deduce isomorphism → simplify with projection lemmas*.