### Technical Brief: Preserving Products and Coproducts in Lean 4 (Category Theory Library)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `isLimitMapConeFanMkEquiv` | `IsLimit (Functor.mapCone G (Fan.mk P g)) ≃ IsLimit (Fan.mk _ (G.map ∘ g))` | Equivalence between the limit property of a mapped cone and the cone of mapped morphisms. Enables commuting `Fan.mk` with `Functor.mapCone`. |
| `isLimitFanMkObjOfIsLimit` | `[PreservesLimit (Discrete.functor f) G] → IsLimit (Fan.mk _ g) → IsLimit (Fan.mk _ (G.map ∘ g))` | Shows that if `G` preserves limits, then the image of a limiting cone under `G` is again limiting. |
| `isLimitOfIsLimitFanMkObj` | `[ReflectsLimit (Discrete.functor f) G] → IsLimit (Fan.mk _ (G.map ∘ g)) → IsLimit (Fan.mk _ g)` | Shows that if `G` reflects limits, then a limiting cone in the image implies the original cone was limiting. |
| `isLimitOfHasProductOfPreservesLimit` | `[HasProduct f] → [PreservesLimit (Discrete.functor f) G] → IsLimit (Fan.mk _ (G.map ∘ Pi.π))` | If `G` preserves products and `C` has them, then the cone of mapped projections from `G(∏ f)` is limiting. |
| `PreservesProduct.of_iso_comparison` | `IsIso (piComparison G f) → PreservesLimit (Discrete.functor f) G` | If the comparison map `piComparison G f` is an iso, then `G` preserves the product limit. |
| `PreservesProduct.iso` | `G.obj (∏ᶜ f) ≅ ∏ᶜ (G ∘ f)` | Constructed when `G` preserves products: the canonical comparison is an iso. |
| `PreservesProduct.iso_hom` | `(PreservesProduct.iso G f).hom = piComparison G f` | Identifies the hom component of the iso as the standard comparison map. |
| `isColimitMapCoconeCofanMkEquiv` | Dual of `isLimitMapConeFanMkEquiv` for colimits/cofans. | Enables reasoning about colimits via cofans. |
| `isColimitCofanMkObjOfIsColimit` | `[PreservesColimit (Discrete.functor f) G] → IsColimit (Cofan.mk _ g) → IsColimit (Cofan.mk _ (G.map ∘ g))` | Preservation of colimits in terms of cofans. |
| `PreservesCoproduct.of_iso_comparison` | `IsIso (sigmaComparison G f) → PreservesColimit (Discrete.functor f) G` | Dual of `PreservesProduct.of_iso_comparison`. |
| `PreservesCoproduct.iso` | `G.obj (∐ f) ≅ ∐ (G ∘ f)` | Canonical iso when `G` preserves coproducts. |
| `PreservesCoproduct.inv_hom` | `(PreservesCoproduct.iso G f).inv = sigmaComparison G f` | Identifies the inverse as the comparison map. |
| `preservesLimitsOfShape_of_discrete` | `(∀ f, PreservesLimit (Discrete.functor f) F) → PreservesLimitsOfShape (Discrete J) F` | If `F` preserves all discrete-shaped limits, then it preserves all limits of shape `Discrete J`. |
| `preservesColimitsOfShape_of_discrete` | Dual of above for colimits. | |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `isLimit*`, `isColimit*`: Properties of (co)limits.
  - `Preserves*`, `Reflects*`: Functors preserving/reflecting (co)limits.
  - `piComparison`, `sigmaComparison`: Standard comparison maps for products/coproducts.
  - `of_*`, `iso_*`: Derived consequences or constructions from assumptions.

- **Suffixes:**
  - `Equiv`: Logical equivalence (often between limit properties).
  - `ObjOfIsLimit`, `OfIsLimit`: Implications from limit preservation/reflection.
  - `OfHasProduct`, `OfHasCoproduct`: From existence of (co)products.

- **Structure:**
  - `def` names often follow pattern:  
    `[Typeclass assumptions] → [input data] → [output property/construction]`.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `refine`, `apply`, `exact`: For constructing proofs step-by-step.
- `rw`, `simp`, `dsimp`: Rewriting and simplification, especially around homs and objects.
- `cases`: On discrete indices (`j : J`) or equality proofs.
- `infer_instance`: To solve typeclass goals (e.g., `IsIso`).
- `congr'`, `ext`: For extensionality (e.g., `Cones.ext`, `Cocones.ext`).
- `symm`: To reverse equivalences or isomorphisms.
- `trans`: Chaining equivalences or isomorphisms.

No heavy automation like `aesop` or `ring` is used — proofs are mostly structural and rely on categorical lemmas.

---

#### **4. Proof Logic**

- **General Strategy:**
  - Use equivalences (`≃`) to reduce statements about mapped cones/fans to original ones.
  - Leverage `IsLimit.conePointUniqueUpToIso` / `IsColimit.coconePointUniqueUpToIso` to construct comparison isomorphisms.
  - Prove preservation/reflection by reducing to known (co)limit cones (e.g., `productIsProduct`, `coproductIsCoproduct`).
  - Use `IsLimit.ofPointIso` / `IsColimit.ofPointIso` to deduce limit properties from isomorphisms of cone points.

- **Typical Flow:**
  1. Assume preservation/reflection typeclass instance.
  2. Use `Fan.mk` / `Cofan.mk` to construct candidate (co)cones.
  3. Apply `isLimitMapConeFanMkEquiv` to translate between mapped and original (co)cones.
  4. Use uniqueness of (co)limit cones to get isomorphisms.
  5. Conclude via `preservesLimit_of_preserves_limit_cone` or dual.

- **Key Insight:**  
  The core idea is that *preserving products* is equivalent to the *comparison map being an isomorphism*, and this is expressed concretely via fans/cofans.

---

#### **5. Imports**

- `Mathlib.CategoryTheory.Limits.Shapes.Products`: Defines products as limits over discrete diagrams.
- `Mathlib.CategoryTheory.Limits.Preserves.Basic`: Defines `PreservesLimit`, `ReflectsLimit`, etc.

These imports indicate the module sits in the **limits and preservers** part of the category theory hierarchy, specifically dealing with **discrete-shaped limits** (i.e., products/coproducts).

---

### Summary

This file formalizes the equivalence between:
- A functor preserving products/coproducts, and  
- The canonical comparison maps (`piComparison`, `sigmaComparison`) being isomorphisms.

It uses fans/cofans to bridge abstract limit preservation with concrete universal properties, and is foundational for reasoning about exactness properties of functors in Lean’s `Mathlib`.