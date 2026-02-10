Here is the **technical metadata** extracted from the provided Lean 4 file, formatted as a structured technical brief for use in building a domain-specific AI agent:

---

### 🔹 **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `CommShift.isoZero` | `shiftFunctor C (0 : A) ⋙ F ≅ F ⋙ shiftFunctor D (0 : A)` | Canonical isomorphism for zero shift, derived from `shiftFunctorZero`. |
| `CommShift.isoZero'` | `(a : A) → a = 0 → shiftFunctor C a ⋙ F ≅ F ⋙ shiftFunctor D a` | Generalized zero-shift iso when `a = 0`. |
| `CommShift.isoAdd'` | `(h : a + b = c) → (e₁ : shiftFunctor C a ⋙ F ≅ F ⋙ shiftFunctor D a) → (e₂ : shiftFunctor C b ⋙ F ≅ F ⋙ shiftFunctor D b) → shiftFunctor C c ⋙ F ≅ F ⋙ shiftFunctor D c` | Constructs iso for sum `c = a + b` given isos for `a` and `b`. |
| `CommShift.isoAdd` | `(e₁ : shiftFunctor C a ⋙ F ≅ F ⋙ shiftFunctor D a) → (e₂ : shiftFunctor C b ⋙ F ≅ F ⋙ shiftFunctor D b) → shiftFunctor C (a + b) ⋙ F ≅ F ⋙ shiftFunctor D (a + b)` | Special case of `isoAdd'` for `c = a + b`. |
| `CommShift` (class) | `CommShift (F : C ⥤ D) A` | Typeclass asserting `F` commutes with shifts by `A`: equipped with `iso a` for all `a`, coherent with `0` and `+`. |
| `F.commShiftIso` | `a : A → shiftFunctor C a ⋙ F ≅ F ⋙ shiftFunctor D a` | Projection of the class instance: the coherence isomorphism for shift `a`. |
| `NatTrans.CommShift` (class) | `CommShift (τ : F₁ ⟶ F₂) A` | Typeclass asserting natural transformation `τ` commutes with shifts (i.e., respects the `commShiftIso` isos). |
| `Functor.CommShift.id` | `CommShift (𝟭 C) A` | Identity functor commutes with shifts. |
| `Functor.CommShift.comp` | `[F.CommShift A] → [G.CommShift A] → (F ⋙ G).CommShift A` | Composition of shift-commuting functors. |
| `Functor.CommShift.ofIso` | `F ≅ G → F.CommShift A → G.CommShift A` | Transfer of shift-commutation along functor isomorphism. |
| `NatTrans.CommShift.verticalComposition` | Lemma about vertical pasting of squares of functors with shift-commuting data | Ensures that if all components in a vertical composite diagram commute with shifts, so does the composite natural transformation. |

---

### 🔹 **Naming Conventions**

- **Prefixes / Suffixes**:
  - `isoZero`, `isoZero'`: zero-shift isomorphisms.
  - `isoAdd`, `isoAdd'`: addition-compatible isomorphisms.
  - `commShiftIso`: main isomorphism for a functor commuting with shift.
  - `shift_comm`, `shift_app_comm`, `shift_app`, `app_shift`: properties of natural transformations commuting with shifts.
  - `ofIso`, `of_isIso`: constructions transferring structure via isomorphisms.
  - `map_shiftFunctorComm_hom_app`, `map_shiftFunctorCompIsoId_hom_app`: lemmas about how `F` maps shift coherence isos.

- **Suffixes**:
  - `'` (prime): variant of a definition (e.g., `isoZero'`, `isoAdd'`) — often handles a more general or conditional case.
  - `_assoc`, `_hom_app`, `_inv_app`: suffixes for lemmas about hom/inv components or associator manipulations.

---

### 🔹 **Tactic Stack**

- **Core tactics**:
  - `aesop_cat`: used in class proofs (`zero`, `add`, `shift_comm`) to automate categorical reasoning.
  - `simp only [...]`: heavily used for simplifying whiskering, naturality, and associator expressions.
  - `ext`: extensionality for natural transformations / functors.
  - `rw`, `erw`: rewriting using lemmas like `commShiftIso_add`, `shiftFunctorAdd'_eq_shiftFunctorAdd`.
  - `dsimp`: simplifying definitions before `simp`.
  - `cancel_epi`, `cancel_mono`: used to eliminate common factors in diagrams.
  - `congr_arg`, `congr_app`: for applying congruence to equalities of natural transformations.

- **Custom lemmas for simplification**:
  - `@[reassoc (attr := simp)]`: for `commShiftIso_hom_naturality`, `commShiftIso_inv_naturality`, `shift_app_comm`, etc.
  - `@[simps!]`: for definitions like `isoZero`, `isoAdd'`, `commShiftIso`, etc., to auto-generate `.hom.app`, `.inv.app` simplification lemmas.

---

### 🔹 **Proof Logic**

- **Inductive / structural style**:
  - Proofs of class instances (`id`, `comp`, `ofIso`) proceed by:
    1. Defining the candidate isomorphism (`iso a`) explicitly.
    2. Proving coherence with `0` (`zero`) and `+` (`add`) using `ext` + `simp`.
  - For natural transformations (`NatTrans.CommShift`):
    - Use `ext X` and `simp only [...]` with naturality and whiskering lemmas.
    - Often rely on `shift_app_comm` and `shift_app` to move `τ` across shift isos.

- **Diagrammatic reasoning**:
  - Heavy use of **whiskering**, **associators**, and **unitors** to rearrange composite functors.
  - Lemmas like `map_shiftFunctorComm_hom_app` are proved by:
    - Applying `congr_arg Iso.hom` to `commShiftIso_add`,
    - Simplifying using `shiftFunctorComm_eq`, `shiftFunctorAdd'_eq_shiftFunctorAdd`,
    - Canceling invertible morphisms (`cancel_epi`, `Iso.inv_hom_id_app`).

- **Transfer lemmas**:
  - `ofIso`, `of_isIso`, `whiskerRight`, `whiskerLeft`, `comp` instances are proved by unfolding definitions and simplifying using naturality and coherence.

---

### 🔹 **Imports & Dependencies**

- **Core imports**:
  ```lean
  import Mathlib.CategoryTheory.Shift.Basic
  ```
  - Provides foundational definitions: `shiftFunctor`, `shiftFunctorZero`, `shiftFunctorAdd`, `shiftFunctorComm`, `shiftFunctorCompIsoId`, etc.

- **Implicit dependencies** (via `CategoryTheory` namespace usage):
  - `Mathlib.CategoryTheory.NatTrans`
  - `Mathlib.CategoryTheory.Functor`
  - `Mathlib.CategoryTheory.Isomorphism`
  - `Mathlib.CategoryTheory.Whiskering`
  - `Mathlib.CategoryTheory.Unitor`
  - `Mathlib.CategoryTheory.Associator`
  - `Mathlib.CategoryTheory.Additive` (via `AddMonoid`, `AddCommMonoid`)
  - `Mathlib.CategoryTheory.Category.Basic`

- **Typeclass assumptions**:
  - `[AddMonoid A]`, `[AddCommMonoid B]`
  - `[HasShift C A]`, `[HasShift D A]`, etc.
  - `[Category C]`, `[Category D]`, etc.

---

Let me know if you'd like a **dependency graph**, **simplified version for teaching**, or **extraction of key lemmas for automation** (e.g., for a tactic like `simp_shift`).