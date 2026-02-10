### Technical Brief: Fully Faithful Functors in Lean 4 (CategoryTheory.FullyFaithful)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Structure | Purpose |
|------|------------------|---------|
| `Full (F : C ⥤ D)` | `Prop` class | Asserts that `F.map` is surjective on each hom-set. |
| `Faithful (F : C ⥤ D)` | `Prop` class | Asserts that `F.map` is injective on each hom-set. |
| `preimage (F : C ⥤ D) [Full F]` | `F.obj X ⟶ F.obj Y → X ⟶ Y` | Noncomputable choice of preimage under `F.map`. |
| `FullyFaithful (F : C ⥤ D)` | `Structure` | Stores explicit inverse `preimage : (F.obj X ⟶ F.obj Y) → (X ⟶ Y)` of `F.map`, with coherence proofs. |
| `homEquiv (hF : F.FullyFaithful)` | `(X ⟶ Y) ≃ (F.obj X ⟶ F.obj Y)` | Equivalence induced by fully faithful `F`. |
| `isoEquiv (hF : F.FullyFaithful)` | `(X ≅ Y) ≃ (F.obj X ≅ F.obj Y)` | Equivalence on isomorphisms. |
| `preimageIso (hF : F.FullyFaithful)` | `F.obj X ≅ F.obj Y → X ≅ Y` | Lifts isomorphisms in the image back to domain. |
| `isIso_of_isIso_map (hF : F.FullyFaithful)` | `[IsIso (F.map f)] → IsIso f` | Fully faithful functors reflect isomorphisms. |
| `Faithful.div` | Construction of `C ⥤ D` from `F : C ⥤ E`, `G : D ⥤ E` with `G` faithful | “Divides” `F` by `G`, i.e., constructs a factorization through `G`. |
| `fullyFaithfulCancelRight` | `F ⋙ H ≅ G ⋙ H ⇒ F ≅ G` (for fully faithful `H`) | Right-cancellation of natural isomorphisms along fully faithful functors. |

**Key lemmas:**
- `map_injective_iff`: Injectivity equivalence: `F.map f = F.map g ↔ f = g`.
- `map_preimage`, `preimage_map`: `preimage` is truly a two-sided inverse.
- `preimage_id`, `preimage_comp`: `preimage` preserves identities and composition.
- `Full.comp`, `Faithful.comp`: Fullness and faithfulness are preserved under composition.
- `Full.of_comp_faithful`, `Faithful.of_comp`: If `F ⋙ G` has one property and `G` has the other, then `F` inherits the first.

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `preimage_`: For constructions/lemmas about the inverse of `F.map`.
  - `map_`: For properties of the morphism action (e.g., `map_injective`, `map_surjective`, `map_preimage`).
  - `fullyFaithful_`: For constructions using the `FullyFaithful` structure (e.g., `fullyFaithfulCancelRight`).
  - `of_`: For derived properties (e.g., `of_comp`, `of_iso`, `of_comp_faithful`).
- **Suffixes:**
  - `_equiv`: For equivalences (e.g., `homEquiv`, `isoEquiv`).
  - `_iso`: For isomorphism-related constructions (e.g., `preimageIso`).
  - `_faithful`, `_full`: For typeclass instances or lemmas about `Faithful`/`Full`.
- **Structure fields:**
  - `preimage`, `map_preimage`, `preimage_map`: Explicit inverse and coherence proofs.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `aesop_cat`: Custom tactic for category-theoretic reasoning (used in `Faithful.map_injective` and structure proofs).
- `simp`: Dominant tactic for simplification, especially with `@[simp]` lemmas (`map_preimage`, `preimage_map`, `preimage_id`, etc.).
- `ext`: For extensionality (e.g., proving `Iso` equality by `hom`/`inv`).
- `rw`, `convert`, `congr`: For rewriting and congruence closure.
- `have`, `trans`, `apply`: Basic proof scripting.
- `cases'`: For destructuring inductive types (e.g., `Faithful.div_comp` proof).
- `funext`, `subst`: For extensionality and substitution.

---

#### **4. Proof Logic**

- **Inductive/constructive style**: Most proofs are direct and constructive, especially when `FullyFaithful` structure is available.
- **Two-phase reasoning**:
  1. **Class-based reasoning** (`[Full F]`, `[Faithful F]`): Use `map_surjective`/`map_injective` to get existence/injectivity, often via `choose` or `choose_spec`.
  2. **Structure-based reasoning** (`hF : F.FullyFaithful`): Use explicit `preimage` and `homEquiv` to get equivalences and bijections.
- **Cancellation patterns**:
  - Faithful functors reflect isomorphisms: `isIso_of_isIso_map`.
  - Faithful functors allow “division” (`Faithful.div`) when images agree.
  - Fully faithful functors allow cancellation of natural isomorphisms (`fullyFaithfulCancelRight`).
- **Uniqueness**: `FullyFaithful` is a subsingleton (`Subsingleton` instance), so any two such structures are equal.

---

#### **5. Imports**

- `Mathlib.CategoryTheory.NatIso`: For natural isomorphisms (`NatIso`, `naturality_1`, etc.).
- `Mathlib.Logic.Equiv.Defs`: For `≃` (equivalences), used in `homEquiv`, `isoEquiv`.

> **Note**: The file is part of the `CategoryTheory` namespace and heavily relies on the `Category` typeclass infrastructure (e.g., `X ⟶ Y`, `F.map`, `F.obj`, `Iso`, `IsIso`). It serves as a foundational module for higher-level results like `Equivalence.of_fullyFaithful_ess_surj`.

--- 

This module is a canonical reference for working with fully faithful functors in Lean 4’s `Mathlib`, balancing typeclass-based reasoning with explicit structure-based constructions.