### Technical Metadata Brief: Pullback and Pushout of Isomorphisms in Lean 4 (Category Theory)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `pullbackConeOfLeftIso` | `(f : X ⟶ Z) (g : Y ⟶ Z) [IsIso f] → PullbackCone f g` | Constructs an explicit pullback cone when the left leg `f` is an isomorphism; cone apex is `Y`. |
| `pullbackConeOfLeftIsoIsLimit` | `IsLimit (pullbackConeOfLeftIso f g)` | Proves the constructed cone is a limit (i.e., the pullback exists and is given by this cone). |
| `hasPullback_of_left_iso` | `HasPullback f g` | Instance proving existence of pullback when `f` is iso. |
| `pullback_snd_iso_of_left_iso` | `IsIso (pullback.snd f g)` | Shows the second projection of the pullback is an iso when `f` is iso. |
| `pullback_inv_snd_fst_of_left_isIso` | `inv (pullback.snd f g) ≫ pullback.fst f g = g ≫ inv f` | Explicit description of the inverse interaction between projections. |
| `pullbackConeOfRightIso` | `(f : X ⟶ Z) (g : Y ⟶ Z) [IsIso g] → PullbackCone f g` | Analogous to `pullbackConeOfLeftIso`, but when `g` is iso; apex is `X`. |
| `pullbackConeOfRightIsoIsLimit` | `IsLimit (pullbackConeOfRightIso f g)` | Verifies it's a limit cone. |
| `hasPullback_of_right_iso` | `HasPullback f g` | Instance for pullback existence when `g` is iso. |
| `pullback_fst_iso_of_right_iso` | `IsIso (pullback.fst f g)` | First projection is iso when `g` is iso. |
| `pullback_inv_fst_snd_of_right_isIso` | `inv (pullback.fst f g) ≫ pullback.snd f g = f ≫ inv g` | Dual to the left case. |
| `pushoutCoconeOfLeftIso` | `(f : X ⟶ Y) (g : X ⟶ Z) [IsIso f] → PushoutCocone f g` | Constructs pushout cocone when `f` is iso; coapex is `Z`. |
| `pushoutCoconeOfLeftIsoIsLimit` | `IsColimit (pushoutCoconeOfLeftIso f g)` | Proves it's a colimit. |
| `hasPushout_of_left_iso` | `HasPushout f g` | Instance for pushout existence when `f` is iso. |
| `pushout_inr_iso_of_left_iso` | `IsIso (pushout.inr f g)` | Right injection is iso when `f` is iso. |
| `pushout_inl_inv_inr_of_right_isIso` | `pushout.inl f g ≫ inv (pushout.inr f g) = inv f ≫ g` | Explicit inverse relation. |
| `pushoutCoconeOfRightIso` | `(f : X ⟶ Y) (g : X ⟶ Z) [IsIso g] → PushoutCocone f g` | Pushout cocone when `g` is iso; coapex is `Y`. |
| `pushoutCoconeOfRightIsoIsLimit` | `IsColimit (pushoutCoconeOfRightIso f g)` | Verifies colimit. |
| `hasPushout_of_right_iso` | `HasPushout f g` | Instance for pushout existence when `g` is iso. |
| `pushout_inl_iso_of_right_iso` | `IsIso (pushout.inl f g)` | Left injection is iso when `g` is iso. |
| `pushout_inr_inv_inl_of_right_isIso` | `pushout.inr f g ≫ inv (pushout.inl f g) = inv g ≫ f` | Dual inverse relation. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `pullbackConeOf*Iso`: Cone/cocone construction based on which leg is iso.
  - `hasPullback_of_*_iso`, `hasPushout_of_*_iso`: Existence instances.
  - `*_iso_of_*_iso`: Projection/injection is iso under assumptions.
  - `inv_*_of_*_isIso`: Explicit inverse identities (e.g., `inv_snd_fst`, `inv_fst_snd`, `inl_inv_inr`, `inr_inv_inl`).

- **Suffixes**:
  - `*Iso`: Indicates the isomorphism assumption (left/right).
  - `IsLimit` / `IsColimit`: For limit/colimit verification.
  - `app_*`: Component of the cone/cocone morphism at a shape object (`left`, `right`, `none`).

- **Pattern**:  
  `pullbackConeOfLeftIso`, `pushout_inl_iso_of_right_iso`, `pullback_inv_snd_fst_of_left_isIso`  
  → *Structure*: `[action]_[target]_[of]_[condition]_[iso_case]`

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `simp` — heavily used for simplifying compositions with identities and inverses.
  - `ext` — for extensionality (proving morphism equality via components).
  - `rw [IsIso.inv_comp_eq, IsIso.hom_inv_id, Category.comp_id]` — standard rewrites for inverses and unit laws.
  - `refine ⟨…⟩` — constructing morphisms via universal properties (e.g., `pullback.lift`, `pushout.desc`).
  - `by simp [← condition]` — verifying cone/cocone conditions.

- **Specialized**:
  - `IsIso.eq_inv_comp`, `IsIso.inv_comp_eq` — for manipulating equations involving inverses.
  - `pullback.condition`, `pushout.condition`, `pullback.condition_assoc`, `pushout.condition_assoc` — used to rewrite universal properties.

- **Attribute**:
  - `@[reassoc (attr := simp)]` — for associativity-aware simplification of compositions.

---

#### **4. Proof Logic**

- **General Strategy**:
  1. **Construct explicit cone/cocone** using the inverse of the iso leg.
     - E.g., if `f : X → Z` is iso, define pullback cone with apex `Y`, maps `g ≫ f⁻¹` and `1_Y`.
  2. **Verify it’s a limit/colimit** using `isLimitAux'` / `isColimitAux'`, constructing mediating morphisms via universal property.
     - Mediator is often just one component (e.g., `s.snd` or `s.fst`) due to simplifications.
  3. **Prove projections/injections are iso**:
     - Construct candidate inverse using `pullback.lift` / `pushout.desc`.
     - Use `ext` + `simp` to check both composites are identities.
  4. **Derive inverse identities** using `rw` with `inv_comp_eq`, `hom_inv_id`, and cone conditions.

- **Induction/Case Analysis**: Not used — proofs are direct constructions and simplifications.

- **Key Insight**: When one leg of a pullback/pushout diagram is an iso, the (co)limit collapses to the other object, and the universal morphism simplifies drastically.

---

#### **5. Imports**

- **Primary dependency**:
  ```lean
  import Mathlib.CategoryTheory.Limits.Shapes.Pullback.HasPullback
  ```
  - Provides foundational definitions: `PullbackCone`, `HasPullback`, `IsLimit`, etc.

- **Implicit imports** (via `CategoryTheory`):
  - `Mathlib.CategoryTheory.Category.Basic`
  - `Mathlib.CategoryTheory.Limits.Shapes.Pullback`
  - `Mathlib.CategoryTheory.Isomorphism`
  - `Mathlib.CategoryTheory.Limits.Preserves`

- **Contextual imports**:
  - `Mathlib.CategoryTheory.Limits.Shapes.Pushout` (via `PushoutCocone`, `HasPushout`)
  - `Mathlib.CategoryTheory.WalkingDiagram` (via `WalkingCospan`, `WalkingSpan`)

---

### Summary

This file formalizes the elementary but crucial fact that **pullbacks (resp. pushouts) of isomorphisms exist and are isomorphic to the other object**, with explicit constructions and proofs. It leverages Lean’s typeclass inference (`[IsIso f]`) and universal properties to derive both existence and structural properties (e.g., projections/injections being isos). The naming and proof patterns follow Lean’s category theory conventions, emphasizing modularity and reuse of `IsLimit`/`IsColimit` infrastructure.