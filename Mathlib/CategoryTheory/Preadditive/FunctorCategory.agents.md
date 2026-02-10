### Technical Metadata Brief: Preadditive Structure on Functor Categories (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Zero (F ⟶ G)` | `instance {F G : C ⥤ D} : Zero (F ⟶ G)` | Defines the zero natural transformation: `zero.app X = 0` for all `X : C`. |
| `Add (F ⟶ G)` | `instance {F G : C ⥤ D} : Add (F ⟶ G)` | Pointwise addition of natural transformations: `(α + β).app X = α.app X + β.app X`. |
| `Neg (F ⟶ G)` | `instance {F G : C ⥤ D} : Neg (F ⟶ G)` | Pointwise negation: `(-α).app X = -α.app X`. |
| `functorCategoryPreadditive` | `instance Preadditive (C ⥤ D)` | Establishes that the functor category `C ⥤ D` is preadditive when `D` is. |
| `appHom (X : C)` | `(F ⟶ G) →+ (F.obj X ⟶ G.obj X)` | Natural transformation application at object `X`, viewed as a group homomorphism. |
| `app_zero`, `app_add`, `app_sub`, `app_neg` | `[simp]` lemmas | Simplification lemmas for how zero, addition, subtraction, and negation behave under `app X`. |
| `app_nsmul`, `app_zsmul`, `app_units_zsmul` | `[simp]` lemmas | Compatibility of scalar multiplication (ℕ, ℤ, ℤˣ) with `app X`. |
| `app_sum` | `[simp]` lemma | Compatibility of finite sums with `app X`. |

---

#### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `app_`: Pertains to application of natural transformations at objects (e.g., `app_zero`, `app_add`, `appHom`).
  - `functorCategoryPreadditive`: Descriptive name for the main structure instance.
  - `HomGroup`-like fields in `Preadditive` instance use standard group-theoretic names: `add_assoc`, `zero_add`, `sub_eq_add_neg`, etc.
  - `nsmulRec`, `zsmulRec`: Recursive definitions for natural and integer scalar multiplication in additive contexts.

- **Pattern**:  
  - `app_` + operation (`zero`, `add`, `sub`, `neg`, `nsmul`, `zsmul`, `sum`) → lemmas about behavior under application.
  - `HomGroup` fields mirror additive group axioms.

---

#### **3. Tactic Stack**

- **Core tactics used**:
  - `ext`: To prove equality of natural transformations by extensionality (i.e., pointwise equality).
  - `dsimp`: Simplify definitions before applying lemmas.
  - `apply`: Apply known lemmas (e.g., `add_assoc`, `zero_add`, `add_comp`).
  - `rfl`: For definitional equalities (e.g., `map_zero'`, `map_add'` in `appHom`).
  - `simp only [...]`: For precise simplification using `appHom_apply` and `map_sum`.
  - `apply app_zsmul`: To reduce unit scalar action to integer scalar action.

- **Pattern**: Proofs of group-theoretic properties in `homGroup` and `Preadditive` are mostly *pointwise*, leveraging `D`’s preadditivity and `ext`.

---

#### **4. Proof Logic**

- **Structure of proofs**:
  1. **Pointwise reasoning**: Most proofs proceed by `ext X`, reducing goals to morphism-level properties in `D`.
  2. **Leverage `D`’s preadditivity**: Use lemmas like `add_assoc`, `add_comp`, `comp_add`, `neg_add_cancel` from `Preadditive D`.
  3. **Induction not needed**: All proofs are direct applications of pointwise definitions and `D`’s algebraic structure.
  4. **Simp lemmas**: Proved via `rfl` or `simp` because definitions are set up to be definitionally compatible.

- **Example flow** (e.g., `add_comp`):
  ```lean
  intros; dsimp; ext X; apply add_comp
  ```
  → Expand definitions, extend to arbitrary `X`, then apply `add_comp` in `D`.

---

#### **5. Imports**

- **Primary dependency**:
  ```lean
  import Mathlib.CategoryTheory.Preadditive.Basic
  ```
  - Provides `Preadditive`, `HomGroup`, and basic lemmas about preadditive categories.

- **Implicit dependencies**:
  - `CategoryTheory.Preadditive.Basic` → relies on `CategoryTheory.Category`, `Additive`, `Abelian` infrastructure.
  - `CategoryTheory.Limits` (used via `open CategoryTheory.Limits`) — though not directly used here, may be for future extensions or consistency.

---

### Summary

This file formalizes the standard result that **functor categories into a preadditive category inherit a preadditive structure pointwise**. The proofs are straightforward due to the pointwise definitions of addition, negation, and zero morphisms, and rely heavily on the `ext` tactic and simplification via `D`’s preadditivity. The `appHom` construction is key for reasoning about natural transformations as group homomorphisms, and the `simp` lemmas ensure smooth automation in downstream developments (e.g., homological algebra).