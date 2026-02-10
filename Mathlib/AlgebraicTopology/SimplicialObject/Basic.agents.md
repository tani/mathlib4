### Technical Brief: Simplicial and Cosimplicial Objects in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `SimplicialObject C` | `SimplexCategoryᵒᵖ ⥤ C`: category of contravariant functors from `SimplexCategory` to `C`. |
| `CosimplicialObject C` | `SimplexCategory ⥤ C`: category of covariant functors from `SimplexCategory` to `C`. |
| `Truncated C n` | `(SimplexCategory.Truncated n)ᵒᵖ ⥤ C` (for simplicial) or `SimplexCategory.Truncated n ⥤ C` (for cosimplicial): truncated objects up to dimension `n`. |
| `δ i`, `σ i` | Face maps (`δ`) and degeneracy maps (`σ`) for simplicial/cosimplicial objects. Defined via `X.map (δ i).op` or `X.map (σ i)`. |
| `δ_comp_δ`, `δ_comp_σ_of_le`, `δ_comp_σ_self`, `σ_comp_σ`, etc. | **Simplicial identities** (5 total), formalized as `reassoc` lemmas expressing compositions of face/degeneracy maps. |
| `δ_naturality`, `σ_naturality` | Naturality of face/degeneracy maps with respect to morphisms of (co)simplicial objects. |
| `truncation n` | Functors `SimplicialObject C ⥤ Truncated C n` and `CosimplicialObject C ⥤ Truncated C n`. |
| `Truncated.sk n`, `Truncated.cosk n` | Left/right Kan extensions along `SimplexCategory.Truncated.inclusion n`, giving **n-skeleton** and **n-coskeleton** functors. |
| `sk n`, `cosk n` | Endofunctors on `SimplicialObject C` defined as `truncation n ⋙ sk n` / `truncation n ⋙ cosk n`. |
| `skAdj n`, `coskAdj n` | Adjointness: `sk n ⊣ truncation n`, `truncation n ⊣ cosk n`, when Kan extensions exist. |
| `augment` | Constructs an **augmented** (co)simplicial object from a (co)simplicial object, an object `X₀`, and a map `X _[0] ⟶ X₀` (or `X₀ ⟶ X _[0]` for cosimplicial) satisfying compatibility. |
| `Augmented C` | Comma category `Comma (𝟭 (SimplicialObject C)) (const C)` (simplicial) or `Comma (const C) (𝟭 (CosimplicialObject C))` (cosimplicial). |
| `simplicialCosimplicialEquiv` | Anti-equivalence `(SimplicialObject C)ᵒᵖ ≌ CosimplicialObject Cᵒᵖ`. |
| `rightOp`, `leftOp` | Constructions linking augmented simplicial and cosimplicial objects across opposites. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `δ_`, `σ_`: face/degeneracy maps (e.g., `δ_comp_δ`, `σ_comp_σ`).
  - `eqToIso_`: isomorphisms induced by equality of indices.
  - `naturality`: naturality squares (e.g., `δ_naturality`, `σ_naturality`).
  - `sk_`, `cosk_`: skeleton/coskeleton functors and adjunctions.
  - `augment_`: augmentation constructions.
  - `truncation_`: truncation functors.

- **Suffixes**:
  - `_self`, `_of_le`, `_of_gt`, `_succ`, `_castSucc`, `_pred`, `_castLT`: classify cases of simplicial identities based on index relations.
  - `'`, `''`: variants of base lemmas (e.g., `δ_comp_δ_self`, `δ_comp_δ_self'`, `δ_comp_δ_self''`).
  - `Opposite`-related: `rightOp`, `leftOp`, `op`, `unop`.

- **Notation**:
  - `X _[n]`: `n`-th term of (co)simplicial object `X` (scoped in `Simplicial` locale).
  - `[n]`: shorthand for `SimplexCategory.mk n`.

---

#### **3. Tactic Stack**

- **Core automation**:
  - `simp only [...]`: heavily used to simplify compositions and apply known identities.
  - `rw [...]`: for rewriting using lemmas like `δ_comp_δ`, `δ_comp_σ_self`, etc.
  - `dsimp`: to unfold definitions (e.g., `δ`, `σ`, `truncation`).
  - `ext`: for extensionality proofs (e.g., `hom_ext` lemmas).
  - `congr_app`, `congr_fun`: for applying congruence to applications.

- **Category-theoretic automation**:
  - `infer_instance`: to discharge category/limit/colimit instances.
  - `rw [lanAdjunction_unit]`, `rw [ranAdjunction_counit]`: for Kan extension adjunctions.
  - `apply Adjunction.fullyFaithfulLOfIsIsoUnit`, `reflective'`, `coreflective'`: for reflective/coreflective properties.

- **Index manipulation**:
  - `Fin.castSucc`, `Fin.castLT`, `Fin.pred`, `Fin.le_iff_val_le_val`, `add_lt_add_iff_right`: for handling finite type indices.
  - `lt_of_lt_of_le`, `le_of_lt`, `lt_irrefl`, `Fin.not_lt_zero`: for order reasoning on `Fin`.

- **Proof style**:
  - `by ext <;> rfl`: common pattern for proving equality of natural transformations or morphisms in comma categories.
  - `subst H`, `cases H`: for case analysis on equalities or inequalities.

---

#### **4. Proof Logic**

- **Induction & case analysis**:
  - Proofs of simplicial identities rely on **index-based case analysis** (e.g., `i ≤ j`, `i = j.succ`, `j = Fin.castSucc i`).
  - Lemmas like `δ_comp_δ`, `δ_comp_σ_self`, etc., are proven by unfolding definitions (`δ`, `σ`) and applying corresponding identities in `SimplexCategory`.

- **Naturality & functoriality**:
  - Naturality lemmas (`δ_naturality`, `σ_naturality`) follow directly from `f.naturality _`.
  - Functor constructions (`whiskering`, `truncation`, `sk`, `cosk`) use `whiskeringRight`, `lan`, `ran`, and `Functor.const`.

- **Kan extensions & adjunctions**:
  - Existence of `sk n`, `cosk n` requires assumptions on left/right Kan extensions.
  - Adjointness (`skAdj`, `coskAdj`) uses `lanAdjunction`, `ranAdjunction`.
  - Reflectivity/coreflectivity uses `reflective'`, `coreflective'` and properties of fully faithful functors.

- **Augmentation & comma categories**:
  - Morphism extensionality (`hom_ext`) uses `Comma.hom_ext`.
  - Compatibility conditions (`w`) are encoded as universal properties over morphisms `[0] → i`.

---

#### **5. Imports**

- **Core category theory**:
  - `Mathlib.CategoryTheory.Adjunction.Reflective`
  - `Mathlib.CategoryTheory.Comma.Arrow`
  - `Mathlib.CategoryTheory.Functor.KanExtension.Adjunction`
  - `Mathlib.CategoryTheory.Limits.FunctorCategory.Basic`
  - `Mathlib.CategoryTheory.Opposites`

- **Algebraic topology / simplex category**:
  - `Mathlib.AlgebraicTopology.SimplexCategory`

- **Category-theoretic infrastructure**:
  - `CategoryTheory`, `Limits`, `Functor`, `Opposite` (open scopes).
  - Universe polymorphism: `universe v u v' u'`.

---

### Summary

This file formalizes the foundational theory of **simplicial and cosimplicial objects** in an arbitrary category `C`, including:
- Basic definitions (`SimplicialObject`, `CosimplicialObject`, `Truncated`),
- Simplicial identities and their naturality,
- Truncation, skeleton, and coskeleton functors with adjunctions,
- Augmented versions via comma categories,
- Anti-equivalence between simplicial and cosimplicial objects via opposites.

The formalization is highly structured, leveraging Lean 4’s typeclass inference for limits/colimits, and uses extensive automation via `simp`, `rw`, and `infer_instance`. The naming and proof patterns reflect standard category-theoretic conventions and Mathlib’s design principles.