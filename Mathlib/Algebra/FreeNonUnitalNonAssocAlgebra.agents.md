### Technical Metadata Brief: Free Non-Unital, Non-Associative Algebras in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `FreeNonUnitalNonAssocAlgebra` | `abbrev FreeNonUnitalNonAssocAlgebra := MonoidAlgebra R (FreeMagma X)` | Constructs the free non-unital, non-associative algebra over `R` on `X` as a magma algebra over the free magma on `X`. |
| `of : X → FreeNonUnitalNonAssocAlgebra R X` | `def of := MonoidAlgebra.ofMagma R _ ∘ FreeMagma.of` | Embeds generators `X` into the free algebra. |
| `lift : (X → A) ≃ (FreeNonUnitalNonAssocAlgebra R X →ₙₐ[R] A)` | `def lift := FreeMagma.lift.trans (MonoidAlgebra.liftMagma R)` | Universal property: gives a bijection between maps `X → A` and algebra morphisms from the free algebra to `A`. |
| `lift_symm_apply` | `∀ F, (lift R).symm F = F ∘ of R` | Describes the inverse of `lift`. |
| `of_comp_lift` | `∀ f, lift R f ∘ of R = f` | Shows `lift` extends `f` correctly. |
| `lift_unique` | `∀ f F, F ∘ of R = f ↔ F = lift R f` | Characterizes uniqueness of algebra morphisms extending a function. |
| `lift_of_apply` | `∀ f x, lift R f (of R x) = f x` | Evaluates `lift` on generators. |
| `lift_comp_of` | `∀ F, lift R (F ∘ of R) = F` | Shows `lift` recovers any algebra morphism from its action on generators. |
| `hom_ext` | `∀ F₁ F₂, (∀ x, F₁ (of R x) = F₂ (of R x)) → F₁ = F₂` | Extensionality principle for algebra homomorphisms: determined by values on `of R x`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `of_`: for canonical embeddings (`of`).
  - `lift_`: for universal constructions (`lift`, `lift_symm_apply`, `lift_unique`, etc.).
  - `hom_ext`: standard extensionality pattern for morphisms.

- **Suffixes**:
  - `_apply`: for evaluation lemmas (`lift_of_apply`, `of_comp_lift`).
  - `_comp`: for composition-based lemmas (`of_comp_lift`, `lift_comp_of`).
  - `_unique`: for uniqueness statements (`lift_unique`).

- **Type suffixes**:
  - `NonUnitalNonAssocAlgebra`: reflects the algebraic structure being modeled (non-unital, non-associative).
  - `Magma`: used in intermediate constructions (`FreeMagma`, `MonoidAlgebra`, `ofMagma`, `liftMagma`).

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `rfl`: used in `lift_symm_apply`, `of_comp_lift`, `lift_of_apply`, `lift_comp_of`.
  - `simp_rw`: implied by heavy use of `@[simp]` attributes (e.g., `lift_symm_apply`, `of_comp_lift`, etc.).
  - `ext`: used in `hom_ext` (via `ext` lemma pattern).
  - `funext`: used in `hom_ext` proof.
  - `congr_fun`: used in `lift_of_apply`.

- **No explicit use of automation tactics** like `aesop`, `ring`, or `linarith` — proofs are mostly definitional or rely on universal properties.

---

#### **4. Proof Logic**

- **Strategy**: Proofs are largely *definitional* or *categorical*, leveraging:
  - The universal property of `FreeMagma.lift`.
  - The universal property of `MonoidAlgebra.liftMagma`.
  - Equivalence of types via `lift` being an equivalence (`equiv`).
- **Typical flow**:
  1. Use `@[simp]` lemmas to reduce goals to identities.
  2. Apply `lift_unique` or `hom_ext` to reduce morphism equality to generator-wise equality.
  3. Use `congr_fun` and `funext` to manipulate function extensionality.
- **No induction** or case analysis on terms — the structure is abstracted via universal properties.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.Free` | Provides `FreeMagma`, `FreeMagma.lift`, and related constructions. |
| `Mathlib.Algebra.MonoidAlgebra.Basic` | Provides `MonoidAlgebra`, `ofMagma`, `liftMagma`, and scalar module structures needed for magma algebras. |

- **No additional algebraic structure imports** (e.g., no `LieAlgebra`, `AssociativeAlgebra`) — this is a foundational module for building more structured free algebras.

---

### Summary

This file formalizes the *free non-unital, non-associative algebra* over a semiring `R` and type `X`, using magma algebras over free magmas. It emphasizes *categorical universal properties* and avoids exposing implementation details (e.g., via irreducible definitions). The design is minimal and foundational, intended as a building block for richer free algebra constructions (e.g., free Lie algebras).