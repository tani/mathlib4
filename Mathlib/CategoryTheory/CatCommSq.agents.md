### Technical Brief: `CatCommSq` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `CatCommSq` | `class CatCommSq (T : C₁ ⥤ C₂) (L : C₁ ⥤ C₃) (R : C₂ ⥤ C₄) (B : C₃ ⥤ C₄)` | Encodes a *2-commutative square* of functors: an isomorphism `T ⋙ R ≅ L ⋙ B`. |
| `iso` | `def iso [h : CatCommSq T L R B] : T ⋙ R ≅ L ⋙ B` | Extracts the witnessing isomorphism from a `CatCommSq` instance. |
| `hComp` | `def hComp ... [CatCommSq T₁ V₁ V₂ B₁] [CatCommSq T₂ V₂ V₃ B₂] : CatCommSq (T₁ ⋙ T₂) V₁ V₃ (B₁ ⋙ B₂)` | Horizontal composition of 2-commutative squares (composing along the *left/right* functors). |
| `vComp` | `def vComp ... [CatCommSq H₁ L₁ R₁ H₂] [CatCommSq H₂ L₂ R₂ H₃] : CatCommSq H₁ (L₁ ⋙ L₂) (R₁ ⋙ R₂) H₃` | Vertical composition of 2-commutative squares (composing along the *top/bottom* functors). |
| `hInv` | `def hInv (_ : CatCommSq T.functor L R B.functor) : CatCommSq T.inverse R L B.inverse` | Transforms a 2-commutative square involving equivalences into one involving their inverses, horizontally. |
| `hInvEquiv` | `def hInvEquiv : CatCommSq T.functor L R B.functor ≃ CatCommSq T.inverse R L B.inverse` | Shows equivalence between 2-commutativity for functors vs. inverses in horizontal direction. |
| `vInv` | `def vInv (_ : CatCommSq T L.functor R.functor B) : CatCommSq B L.inverse R.inverse T` | Horizontal dual of `hInv`: swaps left/right with inverses. |
| `vInvEquiv` | `def vInvEquiv : CatCommSq T L.functor R.functor B ≃ CatCommSq B L.inverse R.inverse T` | Equivalence for vertical direction. |
| `hInv_hInv` / `vInv_vInv` | `lemma ...` | Prove `hInv` / `vInv` are involutive (up to equality), ensuring `hInvEquiv` / `vInvEquiv` are equivalences. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `h_` / `v_`: denote *horizontal* / *vertical* operations (e.g., `hComp`, `hInv`, `vComp`, `vInv`).
  - `iso'`: internal field in the class; `iso` is the public accessor.
- **Suffixes**:
  - `_Equiv`: indicates a definitional equivalence (bijection of types).
  - `_hom_app` / `_inv_app`: used in `@[simps!]` to specify projection of hom/inv components.
- **Functorial notation**:
  - `T.functor`, `T.inverse`: for equivalences `T : C₁ ≌ C₂`.
  - `T.unitIso`, `T.counitIso`, `T.leftUnitor`, etc.: standard equivalence data.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs and definitions:

| Tactic | Usage |
|--------|-------|
| `ext` | Extensionality for natural transformations / functors (e.g., `ext X`). |
| `rw`, `erw` | Rewriting using naturality, unit/counit laws, associators. |
| `simp only [...]` | Simplification with precise lemmas (e.g., `Iso.inv_hom_id_app`, `Functor.map_comp`, `comp_id`). |
| `dsimp` | Simplify definitional equalities (e.g., in `hInv_hInv`, `vInv_vInv`). |
| `cancel_mono` | Cancellation lemma for monomorphisms (used in both `hInv_hInv` and `vInv_vInv`). |
| `rfl` | Reflexivity for definitional equalities (final step in `hInv_hInv`). |

---

#### **4. Proof Logic**

- **Structure of proofs** (e.g., `hInv_hInv`, `vInv_vInv`):
  1. **Extensionality**: `ext X` reduces to pointwise equality at object `X`.
  2. **Naturality & unit/counit laws**: Rewriting using naturality of `iso`, unit/counit isos, and associators.
  3. **Simplification**: Apply `simp only` with key lemmas:
     - `Iso.inv_hom_id_app`
     - `Equivalence.counitInv_app_functor`
     - `Functor.map_id`, `comp_id`, `assoc`
  4. **Definitional simplification**: `dsimp` to unfold definitions.
  5. **Cancellation**: Use `cancel_mono` to reduce to identity.
  6. **Final simplification**: Often ends with `rfl` or `simp`.

- **General pattern**:
  > *Unfold definitions → apply naturality/unit-counit identities → simplify using categorical laws → cancel to identity.*

---

#### **5. Imports & Scope**

- **Primary import**:
  ```lean
  import Mathlib.CategoryTheory.Equivalence
  ```
  - Provides `Equivalence`, `unitIso`, `counitIso`, `leftUnitor`, `rightUnitor`, etc.

- **Context**:
  - Works in the setting of **locally small categories** (via `Category Cᵢ`).
  - Relies on `Functor`, `NatTrans`, `Iso`, `associator`, `isoWhiskerLeft`, `isoWhiskerRight` from `CategoryTheory.Functor` and `CategoryTheory.NaturalIsomorphism`.

- **Scope**:
  - Part of a larger effort to formalize *2-categorical* reasoning in category theory.
  - Intended for future use in *localization of categories*, especially *localization of adjunctions*.

---

### Summary

This file formalizes **2-commutative squares of functors** as isomorphisms between composite functors, and provides:
- Composition operations (`hComp`, `vComp`)
- Inversion under equivalences (`hInv`, `vInv`)
- Equivalence lemmas (`hInvEquiv`, `vInvEquiv`)

It demonstrates how higher-categorical coherence data (associators, unitors, unit/counit isos) interact in a formalized setting, with proofs relying heavily on naturality and simplification tactics.