### Technical Brief: Simple Objects in Lean 4 (Category Theory Library)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Simple` | `class Simple (X : C) : Prop` | Defines a *simple object*: every monomorphism into `X` is either an isomorphism or zero (but not both). |
| `mono_isIso_iff_nonzero` | `∀ {Y} (f : Y ⟶ X) [Mono f], IsIso f ↔ f ≠ 0` | Core equivalence in the `Simple` class; central to reasoning about monos into simple objects. |
| `isIso_of_mono_of_nonzero` | `{f : X ⟶ Y} [Mono f] → f ≠ 0 → IsIso f` | If `Y` is simple, any nonzero mono into `Y` is an iso. |
| `Simple.of_iso` | `[Simple Y] → X ≅ Y → Simple X` | Simplicity is preserved under isomorphism. |
| `Simple.iff_of_iso` | `X ≅ Y → Simple X ↔ Simple Y` | Simplicity is invariant under isomorphism. |
| `kernel_zero_of_nonzero_from_simple` | `[Simple X] → [HasKernel f] → f ≠ 0 → kernel.ι f = 0` | Nonzero maps out of simple objects have zero kernel morphism. |
| `epi_of_nonzero_to_simple` | `[HasEqualizers C] → [HasImage f] → f ≠ 0 → Epi f` | Nonzero maps into simple objects are epimorphisms (under mild assumptions). |
| `simple_of_cosimple` | `[Abelian C] → (∀ f : X ⟶ Z [Epi f], IsIso f ↔ f ≠ 0) → Simple X` | In abelian categories, dual condition implies simplicity. |
| `isIso_of_epi_of_nonzero` | `[Simple X] → [Epi f] → f ≠ 0 → IsIso f` | Nonzero epimorphisms *from* simple objects are isomorphisms (in abelian categories). |
| `indecomposable_of_simple` | `[Preadditive C] → [HasBinaryBiproducts C] → Simple X → Indecomposable X` | Simple objects cannot be decomposed as biproducts. |
| `simple_of_isSimpleOrder_subobject` | `IsSimpleOrder (Subobject X) → Simple X` | Characterization via subobject lattice: `X` simple iff its subobject lattice is `{⊥, ⊤}`. |
| `simple_iff_subobject_isSimpleOrder` | `Simple X ↔ IsSimpleOrder (Subobject X)` | Full equivalence between simplicity and subobject lattice being a 2-element chain. |
| `subobject_simple_iff_isAtom` | `Simple (Y : C) ↔ IsAtom Y` | A subobject `Y ≤ X` is simple iff it is an atom in `Subobject X`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isIso_`, `mono_`, `epi_`, `kernel_`, `cokernel_`, `biprod_`, `subobject_`: indicate categorical properties or constructions.
  - `of_`: often used for implications or derived properties (e.g., `isIso_of_mono_of_nonzero`, `simple_of_cosimple`).
  - `not_`: negations (e.g., `not_isZero`, `zero_not_simple`).
- **Suffixes**:
  - `_iff_nonzero`: equivalence with nonzeroness.
  - `_zero`: condition implies zero morphism.
  - `_of_`: implication from a hypothesis (e.g., `epi_of_nonzero_to_simple`).
  - `_of_simple`: uses simplicity of an object as assumption.
- **`Simple` class**: capitalized, used as typeclass name.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `intro`, `apply`, `rw`, `refine`, `exact`, `cases`, `subst`
- `infer_instance`: to discharge typeclass constraints (e.g., `Mono`, `Epi`, `HasKernel`)
- `simp`, `aesop_cat`, `aesop`: for category-theoretic simplification and automation
- `by_contra`, `contradiction`: for contradiction-based arguments
- `cancel_mono`, `cancel_epi`: for cancellation lemmas in monos/epis
- `rwa`, `change`, `convert`: for rewriting and goal transformation
- `nontrivial_of_ne`, `nontrivial_of_not_isZero`: for proving nontriviality

---

#### **4. Proof Logic**

- **Inductive/structural style**: proofs often proceed by:
  - Unfolding definitions (`intro h`, `rw [Simple.mono_isIso_iff_nonzero]`)
  - Using `by_cases h : f = 0` to split into zero/nonzero cases
  - Applying `isIso_of_mono_of_nonzero` or `isIso_of_epi_of_nonzero` to upgrade mono/epi to iso
  - Leveraging universal properties (kernels, cokernels, images, equalizers)
- **Abelian case**: dual arguments via `simple_of_cosimple`, using cokernels and `Preadditive.mono_of_kernel_zero`
- **Subobject lattice reasoning**:
  - Translate between categorical properties (`Mono f`, `IsIso f`) and order-theoretic ones (`mk f = ⊥`, `IsAtom Y`)
  - Use `Subobject.mk_eq_bot_iff_zero`, `Subobject.isIso_iff_mk_eq_top`, `isSimpleOrder.eq_bot_or_eq_top`
- **Indecomposability proof**:
  - Reduce to biproduct inclusions (`biprod.inl`)
  - Use `Biprod.isIso_inl_iff_isZero` to link iso-ness to zero object

---

#### **5. Imports & Scope**

**Primary imports**:
- `Mathlib.CategoryTheory.Limits.Shapes.ZeroMorphisms`: for zero morphisms and related lemmas
- `Mathlib.CategoryTheory.Limits.Shapes.Kernels`: for kernel objects and morphisms
- `Mathlib.CategoryTheory.Abelian.Basic`: for abelian category structure (cokernels, images, etc.)
- `Mathlib.CategoryTheory.Subobject.Lattice`: for subobject lattice structure
- `Mathlib.Order.Atoms`: for atom definitions in posets/lattices

**Scope**:
- General categories with zero morphisms (`HasZeroMorphisms`)
- Extended to abelian categories (`Abelian`)
- Preadditive + biproducts for indecomposability results
- Zero object assumed in subobject section (`HasZeroObject`)

---

This module formalizes foundational properties of *simple objects* in categorical algebra, with emphasis on:
- Equivalence of categorical and order-theoretic characterizations
- Behavior of morphisms (mono/epi) into/out of simple objects
- Structural consequences (indecomposability, subobject lattice structure)

It serves as a core building block for representation-theoretic and homological applications in Lean’s `Mathlib`.