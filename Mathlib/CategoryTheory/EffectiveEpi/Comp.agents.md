### Technical Brief: Composition of Effective Epimorphisms in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `effectiveEpiFamilyStructCompOfEffectiveEpiSplitEpi'` | `{α : Type*} {B : C} {X Y : α → C}`<br>`(f : (a : α) → X a ⟶ B)`<br>`(g : (a : α) → Y a ⟶ X a)`<br>`(i : (a : α) → X a ⟶ Y a)`<br>`(hi : ∀ a, i a ≫ g a = 𝟙 _)`<br>`[EffectiveEpiFamily _ f] → EffectiveEpiFamilyStruct _ (g ≫ f)` | Constructs an effective epi family structure for `g ≫ f`, given a *section* `i` of each `g a`. Used internally to define the next lemma. |
| `effectiveEpiFamilyStructCompOfEffectiveEpiSplitEpi` | Same as above, but assumes `[∀ a, IsSplitEpi (g a)]` instead of explicit section | Derives effective epi family for `g ≫ f` when each `g a` is a split epi (via `section_`). |
| `instance EffectiveEpiFamily.comp_split_epi` | `[∀ a, IsSplitEpi (g a)] [EffectiveEpiFamily _ f] → EffectiveEpiFamily _ (g ≫ f)` | Instance for effective epi families under precomposition with split epis. |
| `example EffectiveEpi.comp_split_epi` | `(f : X ⟶ B) (g : Y ⟶ X) [IsSplitEpi g] [EffectiveEpi f] → EffectiveEpi (g ≫ f)` | Special case: composition of effective epi with split epi is effective epi. |
| `instance IsSplitEpi.EffectiveEpi` | `[IsSplitEpi f] → EffectiveEpi f` | Every split epi is effective epi. |
| `effectiveEpiFamilyStructOfComp` | `[EffectiveEpiFamily _ (g ≫ f)] [∀ i, Epi (g i)] → EffectiveEpiFamily _ f` | If `g ≫ f` is effective epi and each `g i` is epi, then `f` is effective epi. |
| `effectiveEpiFamily_of_effectiveEpi_epi_comp` | `[∀ a, Epi (g a)] [EffectiveEpiFamily _ (g ≫ f)] → EffectiveEpiFamily _ f` | Family version of above. |
| `effectiveEpi_of_effectiveEpi_epi_comp` | `[Epi g] [EffectiveEpi (g ≫ f)] → EffectiveEpi f` | Single-morphism version. |
| `effectiveEpiFamilyStructCompIso` | `[EffectiveEpiFamily X π] [IsIso i] → EffectiveEpiFamily X (π ≫ i)` | Postcomposition of effective epi family with iso yields effective epi family. |
| `effectiveEpiFamilyStructIsoComp` (via `instance`) | `[EffectiveEpiFamily X π] [∀ a, IsIso (i a)] → EffectiveEpiFamily Y (i ≫ π)` | Precomposition with family of isos preserves effective epi family. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `effectiveEpiFamilyStruct...`: Constructs a *structure* (`EffectiveEpiFamilyStruct`) — the data of an effective epi family.
  - `effectiveEpiFamily...`: Instance or lemma about *families*.
  - `effectiveEpi...`: For single morphisms (via `EffectiveEpi` typeclass).
- **Suffixes**:
  - `'` (prime): Alternate version, often more general or auxiliary (e.g., `effectiveEpiFamilyStructCompOfEffectiveEpiSplitEpi'`).
  - `comp`: Indicates composition-related behavior (e.g., `compOfEffectiveEpiSplitEpi`, `compIso`, `_epi_comp`).
  - `_epi`: Indicates postcomposition or precomposition with epis/isos.
  - `split_epi`: Indicates reliance on split epis (i.e., existence of sections).
  - `iso`: Indicates use of isomorphisms.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only`: Simplify using category laws (`assoc`, `id_comp`, `comp_id`), definitions (`EffectiveEpiFamily.desc`, `fac`, `uniq`), and assumptions (`hi`, `hg`).
- `rw`: Rewrite using equalities (especially `← Category.assoc`, `hi`, `hm`).
- `aesop`: Automated reasoning for simple category-theoretic goals (e.g., verifying commutativity).
- `dsimp`: Simplify definitional equalities (used in `fac`).
- `apply`, `intro`, `exact`: Standard intro/apply reasoning.
- `cancel_epi`: Cancel a common epi on the left in equalities.
- `infer_instance`: Automatically infer typeclass instances (e.g., `EffectiveEpi`, `IsSplitEpi`).

---

#### **4. Proof Logic**

- **Inductive structure**: Most proofs follow a standard pattern for `EffectiveEpiFamilyStruct`:
  1. Define `desc` using the universal property of the *given* effective epi family (e.g., `EffectiveEpiFamily.desc`).
  2. Prove `fac`: Show that `desc` factors through the given cone.
  3. Prove `uniq`: Show uniqueness via the uniqueness clause of the original effective epi family.

- **Common logical flows**:
  - **Precomposition with split epis**: Use the section to lift the cone; verify compatibility using `hi : i a ≫ g a = 𝟙`.
  - **Postcomposition with isos**: Use inverse to transport the mediating morphism.
  - **Cancellation with epis**: Use `cancel_epi` to reduce to known effective epi property.
  - **Reduction via equivalence**: Use `effectiveEpi_iff_effectiveEpiFamily` to switch between single-morphism and family versions.

- **Key lemmas used**:
  - `Category.assoc`, `Category.id_comp`, `Category.comp_id`
  - `EffectiveEpiFamily.fac`, `EffectiveEpiFamily.uniq`
  - `IsSplitEpi.id`, `section_`

---

#### **5. Imports**

- **Primary dependency**:
  ```lean
  import Mathlib.CategoryTheory.EffectiveEpi.Basic
  ```
  This provides:
  - `EffectiveEpi`, `EffectiveEpiFamily`, `EffectiveEpiFamilyStruct`
  - `IsSplitEpi`, `IsIso`, `Epi`
  - Basic lemmas about limits and colimits (via `Limits`)

- **Contextual imports** (via `open`):
  - `Limits`: Provides `Limits.Cone`, `Limits.Cocone`, etc.
  - `Category`: Provides basic category operations (`≈`, `≫`, `𝟙`, etc.)

---

### Summary

This file formalizes stability properties of effective epimorphisms under composition:
- **Precomposition with split epis** preserves effective epi families (and hence effective epis).
- **Postcomposition with isos** preserves effective epi families.
- **Cancellation**: If `g ≫ f` is effective epi and `g` is epi, then `f` is effective epi.

The proofs rely heavily on the universal property of effective epi families and standard categorical identities, with heavy use of `simp` and `aesop` for automation. The naming and structure follow Mathlib conventions for typeclass-based categorical reasoning.