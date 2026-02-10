Here's a **structured technical brief** extracted from the provided Lean 4 file, focusing on formalization metadata for domain-specific AI agent training:

---

### 🔑 **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ExponentialIdeal` | `class ExponentialIdeal : Prop` | Defines when a reflective subcategory inclusion `i : D ⥤ C` is an *exponential ideal*: closed under exponentials `A ⟹ B` for `B ∈ D`. |
| `ExponentialIdeal.exp_closed` | `∀ {B}, B ∈ i.essImage → ∀ A, (A ⟹ B) ∈ i.essImage` | Core property: exponentials with codomain in `D` stay in `D`. |
| `ExponentialIdeal.mk'` | `(∀ (B : D) (A : C), (A ⟹ i.obj B) ∈ i.essImage) → ExponentialIdeal i` | Practical intro rule: it suffices to check exponentials against objects in the image of `i`. |
| `exponentialIdealReflective` | `[Reflective i] → [ExponentialIdeal i] → i ⋙ exp A ⋙ reflector i ⋙ i ≅ i ⋙ exp A` | Natural iso expressing that exponentiating in `C` then reflecting back is naturally isomorphic to exponentiating in `D` (via `i`). |
| `ExponentialIdeal.mk_of_iso` | `(∀ A, i ⋙ exp A ⋙ reflector i ⋙ i ≅ i ⋙ exp A) → ExponentialIdeal i` | Converse: existence of such a natural iso implies exponential ideal. |
| `bijection` | `(A B : C) (X : D) → (L(A ⊗ B) ⟶ X) ≃ (LA ⊗ LB ⟶ X)` | Key bijection used to show reflector `L` preserves binary products when `i` is an exponential ideal. |
| `bijection_symm_apply_id` | `(bijection i A B _).symm (𝟙 _) = prodComparison L A B` | Shows the inverse of the bijection sends identity to the product comparison map. |
| `bijection_natural` | Naturality of `bijection` in codomain `X`. | Ensures compatibility with morphisms, used to prove `prodComparison` is iso. |
| `prodComparison_iso` | `IsIso (prodComparison L A B)` | Proves the product comparison map is an iso under exponential ideal + reflective assumptions. |
| `preservesBinaryProducts_of_exponentialIdeal` | `[ExponentialIdeal i] → PreservesLimitsOfShape (Discrete WalkingPair) (reflector i)` | Main theorem: exponential ideal ⇒ reflector preserves binary products. |
| `preservesFiniteProducts_of_exponentialIdeal` | `[ExponentialIdeal i] → PreservesLimitsOfShape (Discrete J) (reflector i)` | Extends to finite products via binary + terminal preservation. |
| `cartesianClosedOfReflective` | `[ExponentialIdeal i] → CartesianClosed D` | If `D` is a reflective exponential ideal in a CCC `C`, then `D` is itself cartesian closed. |

---

### 📝 **Naming Conventions**

- **Prefixes / Suffixes**:
  - `exp_`: related to exponentials (`exp_closed`, `exp.adjunction`, `exp.ev`, `expComparison` via `uncurry`).
  - `prod_`: binary products (`prodComparison`, `prodComparisonIso`, `prodComparison_fst`, `prodComparison_snd`).
  - `unit_`: unit of adjunction (`unitCompPartialBijective`, `η.app`, `reflectorAdjunction i`.unit).
  - `bijection_`: internal bijection for product preservation.
  - `reflective_`: properties tied to reflectivity (`reflective_products`, `reflectiveChosenFiniteProducts`).
  - `isIso_`, `IsIso`, `IsSplitMono`: used for invertibility/splitting.
  - `essImage`, `mem_essImage_of_unit_isSplitMono`: essential image membership criteria.

- **Suffixes**:
  - `_of_`: implication direction (`exponentialIdeal_of_preservesBinaryProducts`, `preservesBinaryProducts_of_exponentialIdeal`).
  - `_mk_`: introduction rules (`ExponentialIdeal.mk'`).
  - `_iso`, `_Iso`: isomorphisms (`prodComparisonIso`, `exponentialIdealReflective` returns `NatIso`).

---

### ⚙️ **Tactic Stack**

Frequently used tactics in proofs:
- `apply`, `intro`, `exact`, `rw`, `erw` (extended rewrite)
- `dsimp`, `simp`, `simp only`, `simp_rw`
- `symm`, `assoc`, `id_comp`, `comp_id`
- `apply IsIso.mk'`, `apply IsSplitMono.mk'`
- `apply NatIso.ofComponents`, `apply hom_ext`
- `apply i.map_injective`, `apply Functor.map_injective`
- `apply (reflectorAdjunction i).unit.naturality`
- `apply prodComparison_natural_whiskerLeft`, `apply uncurry_natural_left`, etc.
- `apply IsLimit.equivOfNatIsoOfIso`, `apply isLimitOfReflects i`
- `apply Functor.essImage.unit_isIso`, `apply mem_essImage_of_unit_isSplitMono`

> **Pattern**: Heavy use of naturality, adjunction unit/counit equations, and isomorphism-based reasoning (especially via `homEquiv`, `prodComparisonIso`, `unit_isIso`).

---

### 🧠 **Proof Logic & Strategy**

- **Inductive structure**:
  - Most proofs follow a *two-step* pattern:
    1. Reduce to checking objects in the image of `i` (via `essImage` elimination or `mk'`).
    2. Use adjunctions (`reflectorAdjunction`, `exp.adjunction`) and naturality to transform morphisms.
- **Key lemmas**:
  - `bijection` is the central technical tool: constructs a bijection between morphisms out of `L(A ⊗ B)` and `LA ⊗ LB`.
  - Prove `prodComparison` is iso via `bijection_symm_apply_id` + `bijection_natural`.
  - Use `unit_isSplitMono` to show objects land in essential image (e.g., exponentials).
- **Adjoint machinery**:
  - Reflective adjunction `L ⊣ i` is heavily used: `homEquiv`, `unit`, `counit`, triangle identities.
  - `exp.adjunction` (currying) used to move between tensor and exponential.
- **Limit preservation**:
  - Reflectivity + exponential ideal ⇒ `L` preserves binary products ⇒ `D` has finite products.
  - Then `D` inherits cartesian closure via `cartesianClosedOfReflective`.

---

### 📦 **Imports & Dependencies**

| Module | Role |
|--------|------|
| `Mathlib.CategoryTheory.Limits.Preserves.Shapes.BinaryProducts` | Binary product preservation |
| `Mathlib.CategoryTheory.Limits.Preserves.Shapes.Terminal` | Terminal object preservation |
| `Mathlib.CategoryTheory.Limits.Constructions.FiniteProductsOfBinaryProducts` | Finite products from binary + terminal |
| `Mathlib.CategoryTheory.Monad.Limits` | Limits in Eilenberg-Moore categories (not directly used, but part of broader context) |
| `Mathlib.CategoryTheory.Adjunction.FullyFaithful` | Fully faithful adjunctions |
| `Mathlib.CategoryTheory.Adjunction.Limits` | Limits preserved by adjoints |
| `Mathlib.CategoryTheory.Adjunction.Reflective` | Reflective subcategories, unit/counit, essential image |
| `Mathlib.CategoryTheory.Closed.Cartesian` | Cartesian closed categories, exponentials, curry/uncurry |
| `Mathlib.CategoryTheory.Subterminal` | Subterminal objects (used in example: `subterminalInclusion`) |

> **Scope**: This file lives in the *category theory* library, specifically focusing on **reflective subcategories**, **exponential ideals**, and **cartesian closure**.

---

Let me know if you'd like a **diagrammatic summary**, **proof sketch**, or **conversion to natural language theorem statements**.