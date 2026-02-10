### Technical Metadata Extracted from `PicardGroup.lean`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Module.Invertible R M` | `Prop` | $M$ is invertible iff the canonical map $M^\vee \otimes_R M \to R$ is an isomorphism. |
| `Module.Invertible.linearEquiv` | `[Invertible R M] → M^\vee \otimes_R M \simeq_R R` | Promotes the canonical map to a linear equivalence for invertible modules. |
| `Module.Invertible.right` | `(M ⊗ N ≃ R) → Invertible R N` | If $M \otimes N \simeq R$, then $N$ is invertible. |
| `Module.Invertible.left` | `(M ⊗ N ≃ R) → Invertible R M` | Symmetric to `right`. |
| `Module.Invertible.congr` | `(M ≃ N) → Invertible R M → Invertible R N` | Invertibility is preserved under linear equivalence. |
| `Module.Invertible.finite_projective` | `[Invertible R M] → Finite R M ∧ Projective R M` | Invertible modules are finite and projective. |
| `Module.Invertible.free_iff_linearEquiv` | `Free R M ↔ Nonempty (M ≃ R)` | Invertible module is free iff trivial in Picard group. |
| `Module.Invertible.finrank_eq_one` | `[StrongRankCondition R] [Free R M] [Invertible R M] → finrank R M = 1` | Rank of invertible free module is 1. |
| `Module.Invertible.rank_eq_one` | `[StrongRankCondition R] [Free R M] [Invertible R M] → Module.rank R M = 1` | Rank (as cardinal) is 1. |
| `Module.Invertible.rTensorEquiv` | `(P → Q) ≃ (P ⊗ M → Q ⊗ M)` | Tensoring with invertible module is auto-equivalence. |
| `Module.Invertible.linearEquivDual` | `(M ⊗ N ≃ R) → M ≃ N^\vee` | Induced isomorphism to dual. |
| `Module.Invertible.algEquivOfRing` | `[Algebra R A] [Invertible R A] → R ≃ₐ[R] A` | Invertible algebra over $R$ is isomorphic to $R$. |
| `CommRing.Pic R` | `Type u` | Picard group: invertible $R$-modules up to iso, with tensor product. |
| `CommRing.Pic.mk R M` | `Invertible R M → Pic R` | Class of invertible module $M$ in Picard group. |
| `CommRing.Pic.mapAlgebra R A` | `Pic R →* Pic A` | Induced map on Picard groups from $R$-algebra $A$. |
| `CommRing.relPic R A` | `Subgroup (Pic R)` | Relative Picard group: kernel of `mapAlgebra R A`. |
| `Module.Invertible.tensorProductComm_eq_refl` | `[CommRing R] [Invertible R M] → TensorProduct.comm R M M = .refl` | Symmetry of tensor product is trivial on invertible modules. |
| `Module.Invertible.tmul_comm` | `[Invertible R M] → m₁ ⊗ m₂ = m₂ ⊗ m₁` | Tensor tensors commute in invertible modules. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `Invertible.`: for properties and constructions about invertible modules.
  - `mk`: for constructing elements of `Pic R` from modules.
  - `mapRingHom`, `mapAlgebra`: for induced maps on Picard groups.
  - `leftCancelEquiv`, `rightCancelEquiv`: canonical isomorphisms from duality.
  - `rTensor`, `lTensor`: for left/right tensoring.
  - `linearEquiv`, `linearEquivDual`: linear equivalences derived from duality.

- **Suffixes**:
  - `Equiv`: for linear equivalences (`linearEquiv`, `algEquivOfRing`).
  - `Inv`: for inverses (`rTensorInv`).
  - `_iff`: for biconditional theorems (`free_iff_linearEquiv`, `mk_eq_one_iff_free`).
  - `_iff`: for characterizations (`subsingleton_iff`, `mk_eq_iff`).

- **Other patterns**:
  - `congr`, `comp`, `symm`, `assoc`: standard category-theoretic operations.
  - `of_`, `to_`: for coercions or constructions (e.g., `of_surjective`, `toModuleEnd`).

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `rw`, `ext`, `simp`, `simp_rw`, `congr`, `apply`, `exact`, `refine`, `cases`, `obtain`, `choose`.
- **Category theory**:
  - `Quotient.sound`, `Quotient.mk_out`, `Units.ext`, `Skeleton.toSkeleton_tensorObj`.
- **Linear algebra**:
  - `TensorProduct.assoc`, `TensorProduct.comm`, `TensorProduct.lid`, `TensorProduct.rid`, `TensorProduct.congr`.
- **Module theory**:
  - `Finite.reprEquivₛ`, `Finsupp`, `Projective`, `Dual`, `toModuleEnd`.
- **Ring theory**:
  - `Ideal.isMaximal`, `Localization`, `IsLocalization`, `IsScalarTower`.
- **Proof automation**:
  - `aesop`, `ring`, `linarith`, `exact_mod_cast`, `convert`, `apply_fun`, `dsimp`, `unfold`, `change`.

---

#### **4. Proof Logic**

- **Inductive structure**:
  - Most proofs proceed by:
    1. **Unfolding definitions** (e.g., `Invertible` via `contractLeft`).
    2. **Constructing candidates** (e.g., using `exists_finset` for finite generation).
    3. **Verifying properties** (injectivity/surjectivity via tensor cancellations).
    4. **Using equivalences** (`linearEquiv`, `rTensorEquiv`) to reduce to known cases.
- **Common patterns**:
  - **Tensor cancellation**: Use `leftCancelEquiv`/`rightCancelEquiv` to reduce tensor statements to base module statements.
  - **Duality**: Use `linearEquivDual` to move between $M$ and $N^\vee$.
  - **Localization**: For global-to-local arguments (e.g., `tensorProductComm_eq_refl`).
  - **Faithful flatness**: Used in `mapAlgebra` and `relPic` exactness proofs.
- **Key lemmas reused**:
  - `lTensor_injective_iff`, `rTensor_surjective_iff`, `bijective_of_surjective`: to lift properties through tensoring.
  - `mk_eq_iff`, `mk_eq_mk_iff`: to reason about equality in `Pic R`.

---

#### **5. Imports**

| Module | Purpose |
|--------|---------|
| `Mathlib.Algebra.Category.ModuleCat.Monoidal.Symmetric` | Monoidal & symmetric structure on module category. |
| `Mathlib.CategoryTheory.Monoidal.Skeleton` | Skeleton of monoidal categories (used for `Pic R` as units in skeleton). |
| `Mathlib.LinearAlgebra.Contraction` | `contractLeft`, dual pairing, etc. |
| `Mathlib.LinearAlgebra.LinearDisjoint` | Linear disjointness, used in localization arguments. |
| `Mathlib.RingTheory.ClassGroup` | Class group, related via `ClassGroup.equivPic`. |
| `Mathlib.RingTheory.Ideal.AssociatedPrime.Finiteness` | Finiteness of associated primes (used in finite generation). |
| `Mathlib.RingTheory.LocalRing.Module` | Modules over local rings (e.g., `free_of_flat_of_isLocalRing`). |

---

#### **8. Mermaid Diagrams**

##### **Dependency Graph (High-Level)**

```mermaid
graph TD
  A[Module.Invertible R M] --> B[Finite R M]
  A --> C[Projective R M]
  A --> D[IsReflexive R M]
  A --> E[Invertible R (Dual R M)]
  A --> F[Invertible R (M ⊗ N)]
  A --> G[Invertible R R]
  A --> H[Invertible R (A ⊗_R M)]  %% for algebras

  A --> I[Pic R]
  I --> J[CommGroup (Pic R)]
  I --> K[mapAlgebra R A : Pic R → Pic A]
  I --> L[relPic R A = ker(mapAlgebra R A)]

  H --> M[mapAlgebra R A]
  M --> N[relPic R A]

  A --> O[tensorProductComm_eq_refl]
  O --> P[tmul_comm]

  style A fill:#f9f,stroke:#333
  style I fill:#bbf,stroke:#333
```

##### **Overview of File Structure**

```mermaid
flowchart LR
  subgraph "Module.Invertible"
    I1[Definition] --> I2[LinearEquiv]
    I2 --> I3[CancelEquivs]
    I3 --> I4[rTensorEquiv]
    I4 --> I5[Finite+Projective]
    I5 --> I6[Free iff trivial]
    I6 --> I7[TensorProductComm]
  end

  subgraph "PicardGroup"
    P1[Def: Pic R] --> P2[CommGroup]
    P2 --> P3[mk R M]
    P3 --> P4[mapAlgebra]
    P4 --> P5[relPic]
    P5 --> P6[Exact sequence]
  end

  subgraph "Applications"
    A1[ClassGroup ≃ Pic] --> A2[Local rings trivial]
    A2 --> A3[Semilocal trivial]
    A3 --> A4[UFD trivial (TODO)]
  end

  I1 --> P1
  I7 --> A1
```

---

### Summary

This file formalizes the **Picard group** of a commutative semiring $R$ as the group of isomorphism classes of invertible $R$-modules under tensor product. It establishes foundational properties (finite, projective, reflexive), characterizations (free iff trivial class), and functoriality (via algebra maps). The structure is deeply categorical, leveraging monoidal and skeleton constructions, and connects to class groups, local rings, and localization theory. The proofs rely heavily on tensor cancellations, duality, and localization techniques.
