### Technical Metadata Brief: `ShiftedHom.opEquiv` and `opEquiv'` in Opposite Categories

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `opEquiv n` | `ShiftedHom X Y n ≃ ShiftedHom (Opposite.op Y) (Opposite.op X) n` | Establishes a natural bijection between shifted morphisms in `C` and in `Cᵒᵖ`, reversing source/target and keeping shift `n`. |
| `opEquiv' n a a' h` | `ShiftedHom X Y a' ≃ (Opposite.op (Y⟦a⟧) ⟶ (Opposite.op X)⟦n⟧)` | Refines `opEquiv` to relate shifted morphisms with re-indexing via `n + a = a'`. Used to connect `preadditiveYoneda.obj B` with shifted homs. |
| `opEquiv_symm_apply` | `f : ShiftedHom (Opposite.op Y) (Opposite.op X) n ↦ ...` | Explicit formula for the inverse of `opEquiv`. |
| `opEquiv'_symm_apply` | `f : Opposite.op (Y⟦a⟧) ⟶ (Opposite.op X)⟦n⟧ ↦ ...` | Explicit inverse of `opEquiv'`. |
| `opEquiv_symm_comp` | `(f.comp g h) ↦ (opEquiv.symm g).comp (opEquiv.symm f)` | Compatibility of `opEquiv.symm` with composition (up to associator). |
| `opEquiv'_symm_comp` | `(x ≫ f.op⟦n⟧') ↦ f ≫ (opEquiv'.symm x)` | Compatibility of `opEquiv'` with post-composition by opposite morphisms. |
| `opEquiv'_zero_add_symm` | Special case for `n = 0`. | Simplifies `opEquiv'` when `n = 0`, using `shiftFunctorZero`. |
| `opEquiv'_add_symm` | `opEquiv' (m + n) ≅ opEquiv' m ∘ opEquiv' n` | Associativity/coherence of `opEquiv'` under addition of shifts. |
| `opEquiv_symm_add`, `opEquiv'_symm_add` | Additivity of `opEquiv.symm` and `opEquiv'.symm` | Ensures `opEquiv`/`opEquiv'` are *additive* equivalences in preadditive setting. |
| `opEquiv'_symm_op_opShiftFunctorEquivalence_counitIso_inv_app_op_shift` | Key lemma linking `opEquiv'` with `opShiftFunctorEquivalence.counitIso`. | Used to relate composition in `C` and `Cᵒᵖ` via unit/counit data. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `opEquiv` / `opEquiv'`: Core bijections involving opposite category.
  - `op_`: Indicates passage to opposite category (e.g., `op`, `opShiftFunctorEquivalence`, `op_comp`, `op_shift`).
  - `shiftFunctorAdd'`: Adjusted shift functor for nontrivial addition proofs (`a + n = a'` vs `n + a = a'`).
- **Suffixes**:
  - `_symm`: Inverse direction of an equivalence.
  - `_apply` / `_symm_apply`: Explicit action on elements (i.e., application of equivalence or its inverse).
  - `_comp`: Behavior under composition.
  - `_add`: Behavior under addition of integers (shifts).
- **Notable patterns**:
  - `unop`, `op`: Explicit use of `Opposite.unop` / `Opposite.op`.
  - `⟦n⟧'`, `⟦n⟧`: Shifted hom objects and morphisms.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `rfl` | Definitional equalities, especially in `opEquiv_symm_apply`-style lemmas. |
| `simp only [...]` | Simplify using structured lemmas (e.g., `assoc`, `Functor.map_comp`, `op_comp`, `Quiver.Hom.op_unop`). |
| `dsimp` | Simplify definitional unfoldings (e.g., of `comp`, `opEquiv`, `opEquiv'`). |
| `rw [...]` | Rewrite using lemmas or hypotheses (especially naturality, associativity, iso properties). |
| `erw [...]` | Rewrite with definitional equality (e.g., `opShiftFunctorEquivalence_unitIso_inv_naturality`). |
| `apply Quiver.Hom.op_inj` | Prove equality of opposite morphisms by reducing to original category. |
| `omega` | Solve linear arithmetic on integers (e.g., verifying `n + a = a'` assumptions). |
| `rw [assoc, ...]` | Reassociate compositions using `assoc`, `id_comp`, `Functor.map_comp`. |
| `rw [← Functor.map_comp]` | Push functors through compositions. |
| `rw [Iso.inv_hom_id_app]` | Simplify using inverse of isomorphisms. |
| `rw [NatTrans.naturality]` | Use naturality of natural transformations (e.g., unit/counit). |

---

#### **4. Proof Logic**

- **General Strategy**:
  - Prove equalities by unfolding definitions (`opEquiv`, `opEquiv'`, `comp`, `shiftFunctorAdd'`) and simplifying using:
    - Functoriality (`Functor.map_comp`, `Functor.map_add`)
    - Naturality of unit/counit isomorphisms (`opShiftFunctorEquivalence`)
    - Properties of opposites (`op_comp`, `unop_comp`, `op_unop`)
    - Additive structure (`Preadditive.comp_add`, `add_comp`)
  - Use `omega` to resolve integer arithmetic constraints (e.g., `b + a = c`).
  - For coherence lemmas (`opEquiv'_add_symm`, `opEquiv_symm_comp`), apply multiple rewrites to reduce to known naturality or iso identities.
  - In preadditive setting, verify additivity separately using `Preadditive.comp_add` and `Functor.map_add`.

- **Inductive/Structural Pattern**:
  - Most proofs are *direct calculations* (not induction), leveraging:
    - Explicit formulas for `opEquiv`/`opEquiv'` and their inverses.
    - Structural properties of `shiftFunctor`, `opShiftFunctorEquivalence`, and `shiftFunctorAdd'`.
  - Opposite-category arguments often reduce to original-category statements via `op_inj` or `unop`.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Triangulated.Opposite.Basic` | Provides `Opposite`, `Cᵒᵖ`, and basic properties of opposite categories in triangulated/pretriangulated settings. |
| `Mathlib.CategoryTheory.Shift.ShiftedHom` | Defines `ShiftedHom`, `shiftFunctor`, `opShiftFunctorEquivalence`, and related constructions. |

**Domain**:  
- **Context**: A category `C` with a `ℤ`-shift (`HasShift C ℤ`), often assumed pretriangulated or preadditive.
- **Goal**: Understand behavior of `ShiftedHom` under opposite category, especially for homological algebra (e.g., `preadditiveYoneda.obj B`).
- **Key structures**: `shiftFunctor`, `opShiftFunctorEquivalence`, `shiftFunctorAdd'`, `Preadditive`.

---

### Summary

This file formalizes the interaction between shifted morphisms and the opposite category, providing explicit equivalences (`opEquiv`, `opEquiv'`) and verifying their algebraic coherence (composition, addition, associativity). It is foundational for studying homological functors like `preadditiveYoneda.obj B` in pretriangulated categories, where duality and shift compatibility are essential. The proofs rely heavily on explicit manipulation of natural isomorphisms, opposites, and additive structure, with tactics focused on simplification, naturality, and arithmetic verification.