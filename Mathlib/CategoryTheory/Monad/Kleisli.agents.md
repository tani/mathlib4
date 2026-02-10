### Technical Brief: Kleisli and Co-Kleisli Categories in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Kleisli (_T : Monad C)` | `Type u` | Objects of the Kleisli category; same as objects of `C`. |
| `Cokleisli (_U : Comonad C)` | `Type u` | Objects of the co-Kleisli category; same as objects of `C`. |
| `category [Inhabited C]` | `Category (Kleisli T)` / `Category (Cokleisli U)` | Defines the category structure on Kleisli/co-Kleisli objects. |
| `comp` (Kleisli) | `f ≫ T.map g ≫ μ_Z` | Kleisli composition: `X → TY`, `Y → TZ` ↦ `X → TZ`. |
| `comp` (Co-Kleisli) | `δ_X ≫ U.map f ≫ g` | Co-Kleisli composition: `UX → Y`, `UY → Z` ↦ `UX → Z`. |
| `toKleisli T` | `C ⥤ Kleisli T` | Left adjoint in Kleisli adjunction; includes identity `η` on morphisms. |
| `fromKleisli T` | `Kleisli T ⥤ C` | Right adjoint in Kleisli adjunction; maps `f : X → TY` to `Tf ≫ μ_Y`. |
| `adj` (Kleisli) | `toKleisli T ⊣ fromKleisli T` | Kleisli adjunction inducing monad `T`. |
| `toKleisliCompFromKleisliIsoSelf` | `toKleisli T ⋙ fromKleisli T ≅ T` | Shows composition of adjoint functors recovers `T`. |
| `toCokleisli U` | `C ⥤ Cokleisli U` | Right adjoint in co-Kleisli adjunction; uses counit `ε`. |
| `fromCokleisli U` | `Cokleisli U ⥤ C` | Left adjoint in co-Kleisli adjunction; uses comultiplication `δ`. |
| `adj` (Co-Kleisli) | `fromCokleisli U ⊣ toCokleisli U` | Co-Kleisli adjunction inducing comonad `U`. |
| `toCokleisliCompFromCokleisliIsoSelf` | `toCokleisli U ⋙ fromCokleisli U ≅ U` | Recovers comonad `U` from adjunction composition. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `toKleisli`, `fromKleisli`, `toCokleisli`, `fromCokleisli`: denote functors in adjunctions.
  - `Kleisli`, `Cokleisli`: module-level definitions for categories.
- **Suffixes**:
  - `compIsoSelf`: indicates isomorphism between composite of adjoint functors and original (co)monad.
- **Variable naming**:
  - `T`, `U`: monad and comonad respectively.
  - `f`, `g`, `h`: morphisms in Kleisli/co-Kleisli categories.
  - `X`, `Y`, `Z`: objects (same as in `C`).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only`: simplify using monad/co-monad laws (`left_unit`, `right_unit`, `assoc`, `naturality`, `coassoc`, etc.).
- `rw`: rewrite using naturality, associativity, unit/counit laws.
- `dsimp`: simplify definitional equalities (e.g., unfolding `comp`, `id`).
- `change`: guide simplification by rewriting goal to a definitional equivalent.
- `apply Category.comp_id`: trivial category theory lemmas.
- `erw`: rewrite with equational reasoning (used for `μ.naturality_assoc`).
- `rfl`: reflexivity for definitional equalities (e.g., in `Iso.refl`).

> **Note**: Several comments indicate workarounds for missing `unfold_projs` tactic — common in older Mathlib versions.

---

#### **4. Proof Logic**

- **Structure**: Proofs follow standard category-theoretic reasoning:
  1. **Unfold definitions** (`dsimp`, `change`).
  2. **Apply naturality/unit/counit laws** (`T.η.naturality`, `T.left_unit`, `U.ε.naturality`, `U.right_counit`, etc.).
  3. **Use associativity & functoriality** (`Functor.map_comp`, `Category.assoc`).
  4. **Simplify using monad/co-monad axioms** (`Monad.assoc`, `Comonad.coassoc`).
- **Induction**: Not used — proofs are purely equational, leveraging categorical axioms.
- **Iso construction**: `NatIso.ofComponents` + `Iso.refl` for identity isomorphisms.

---

#### **5. Imports & Scope**

- **Primary imports**:
  - `Mathlib.CategoryTheory.Adjunction.Basic`
  - `Mathlib.CategoryTheory.Monad.Basic`
- **Scope**: Formalizes foundational theory of Kleisli and co-Kleisli categories, and their adjunctions, as in:
  - Riehl, *Category Theory in Context*, Def. 5.2.9 & Lemma 5.2.11.
- **Universe handling**:
  - Uses `universe v u` and `variable {C : Type u} [Category.{v} C]`.
  - Follows Mathlib’s convention: morphism universe `v` ≤ object universe `u`.

---

### Summary

This file formalizes the Kleisli and co-Kleisli constructions as categories, and shows how they arise from adjunctions inducing a given monad or comonad. The proofs rely heavily on naturality, unit/counit, and associativity laws, with heavy use of `simp` and `rw`. The naming and structure align with Mathlib’s conventions, and the formalization closely mirrors the categorical literature (e.g., Riehl).