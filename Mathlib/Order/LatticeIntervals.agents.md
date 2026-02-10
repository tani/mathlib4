### Technical Metadata Brief: Intervals in Lattices (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Ico.semilatticeInf` | `[SemilatticeInf α] → SemilatticeInf (Ico a b)` | Endows open-closed interval `Ico a b` with meet (infimum) structure. |
| `Ico.orderBot` | `[PartialOrder α] → a < b → OrderBot (Ico a b)` | Provides bottom element when `a < b`, using `isLeast_Ico`. |
| `Ioc.semilatticeSup` | `[SemilatticeSup α] → SemilatticeSup (Ioc a b)` | Gives join (supremum) structure on open-closed interval `Ioc a b`. |
| `Ioc.orderTop` | `[PartialOrder α] → a < b → OrderTop (Ioc a b)` | Supplies top element for `Ioc a b` when `a < b`, via `isGreatest_Ioc`. |
| `Iic.semilatticeInf`, `Iic.semilatticeSup` | `[SemilatticeInf α]`, `[SemilatticeSup α]` | Makes left-closed interval `Iic a` a lattice (if base is lattice). |
| `Iic.lattice` | `[Lattice α] → Lattice (Iic a)` | Combines inf/sup to form full lattice on `Iic a`. |
| `Iic.orderTop`, `Iic.orderBot` | `[Preorder α]`, `[OrderBot α]` | Adds top (`⟨a, le_refl a⟩`) and bottom (`⟨⊥, bot_le⟩`) to `Iic a`. |
| `Iic.boundedOrder` | `[Preorder α] [OrderBot α] → BoundedOrder (Iic a)` | Bundles top & bottom into bounded order. |
| `Iic.disjoint_iff`, `Iic.codisjoint_iff`, `Iic.isCompl_iff` | ↔ statements | Relate disjointness/codisjointness/complementarity in `Iic a` to ambient α. |
| `Iic.complementedLattice_iff` | ↔ statement | Characterizes when `Iic a` is a complemented lattice via existence of complements in α. |
| `Ici.semilatticeInf`, `Ici.semilatticeSup`, `Ici.lattice`, `Ici.distribLattice` | Similar to `Iic`, but for right-closed intervals `Ici a`. | Provides lattice/distributive lattice structure on `Ici a`. |
| `Ici.orderBot`, `Ici.orderTop`, `Ici.boundedOrder` | Analogous to `Iic`. | Adds bounds and bounded order structure. |
| `Icc.semilatticeInf`, `Icc.semilatticeSup`, `Icc.lattice` | `[SemilatticeInf α]`, `[SemilatticeSup α]`, `[Lattice α]` | Interval `[a, b]` inherits lattice structure. |
| `Icc.orderBot`, `Icc.orderTop`, `Icc.boundedOrder` | `[Preorder α]`, `Fact (a ≤ b)` | Bounded order on closed interval when `a ≤ b`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `Ico`, `Ioc`, `Iio`, `Ioi`, `Iic`, `Ici`, `Icc`: Standard interval notation (`I` for interval, `c`/`o` for closed/open endpoints).
  - `coe_`: For lemmas about coercion of elements (e.g., `coe_inf`, `coe_sup`, `coe_top`, `coe_bot`).
  - `isCompl_`, `disjoint_`, `codisjoint_`: Relational properties in bounded lattices.

- **Suffixes**:
  - `orderBot`, `orderTop`, `boundedOrder`: Indicate presence of least/greatest element or both.
  - `semilatticeInf`, `semilatticeSup`, `lattice`, `distribLattice`: Lattice-theoretic structure.

- **Pattern**:
  - `Subtype.{structure}`: All instances use `Subtype.{structure}` to lift operations from α to subtype (interval).
  - `⟨...⟩`: Used to construct elements and proofs in subtypes.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `simp` / `simp_rw`: For simplifying using lemmas like `coe_inf`, `eq_top_iff`, etc.
  - `rw`: Rewriting using equivalences (e.g., `isCompl_iff`, `disjoint_iff`).
  - `exact`, `refine`: For constructing proofs and instances.
  - `cases`: For destructing subtype hypotheses (`⟨_, _⟩`).
  - `lt_of_le_of_lt`, `lt_of_lt_of_le`, `le_trans`, `le_inf`, `inf_le_left`, `sup_le`, `le_sup_left`: Order/lattice lemmas used in proofs.

- **Notable absence**:
  - No heavy automation (e.g., `aesop`, `linarith`, `ring`) — proofs are mostly manual and rely on lattice/order theory lemmas.

---

#### **4. Proof Logic**

- **General pattern**:
  - **Instance construction**: Use `Subtype.{structure}` to define operations pointwise and verify closure via order/lattice properties.
  - **Proofs of properties**:
    - For `orderBot`/`orderTop`: Use `isLeast_Ico`, `isGreatest_Ioc`, `isLeast_Icc`, etc., then apply `orderBot`/`orderTop` constructor.
    - For lattice/bounded order: Combine semilattice instances and verify compatibility.
    - For equivalences (`↔`): Use `simp` + lemmas like `Subtype.ext_iff`, `Iic.eq_top_iff`, etc.

- **Inductive/structural reasoning**:
  - No induction used — all arguments are direct and rely on properties of subtypes and intervals.
  - Most proofs are *extensional*: rely on `Subtype.ext_iff` to reduce to element-wise reasoning.

---

#### **5. Imports**

- **Primary dependency**:
  ```lean
  import Mathlib.Order.Bounds.Basic
  ```
  - Provides foundational definitions: intervals (`Ico`, `Ioc`, `Iio`, `Ioi`, `Iic`, `Ici`, `Icc`), `isLeast`, `isGreatest`, `OrderBot`, `OrderTop`, `BoundedOrder`, `Disjoint`, `Codisjoint`, `IsCompl`, etc.

- **Implicit dependencies** (via `Mathlib.Order.*`):
  - `Mathlib.Order.Lattice` (for `SemilatticeInf`, `SemilatticeSup`, `Lattice`, `DistribLattice`)
  - `Mathlib.Order.Bounded` (for `OrderBot`, `OrderTop`, `BoundedOrder`)
  - `Mathlib.Data.Subtype` (for `Subtype.semilatticeInf`, `Subtype.semilatticeSup`)

---

### Summary

This module formalizes lattice-theoretic structures on various intervals in a preordered/lattice/ordered type. It emphasizes *inheritance* of structure via subtypes, with careful attention to endpoint conditions (`a < b`, `a ≤ b`, existence of bounds). The design is modular: each interval type gets minimal necessary structure, with additional lemmas connecting internal and ambient operations. The naming and structure follow Lean’s `Mathlib` conventions, especially `Subtype.{structure}` and `isLeast`/`isGreatest`-based bounded order constructions.