Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: (Semi-)Lattices in Lean 4 (Mathlib)**

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `SemilatticeSup α` | Type class for **join-semilattices**: a `PartialOrder α` with binary `⊔` (supremum/join) satisfying: <br> • `a ≤ a ⊔ b` (left upper bound) <br> • `b ≤ a ⊔ b` (right upper bound) <br> • `a ≤ c → b ≤ c → a ⊔ b ≤ c` (least upper bound) |
| `SemilatticeInf α` | Type class for **meet-semilattices**: dual to `SemilatticeSup`, with `⊓` (infimum/meet) satisfying: <br> • `a ⊓ b ≤ a`, `a ⊓ b ≤ b` <br> • `a ≤ b → a ≤ c → a ≤ b ⊓ c` |
| `Lattice α` | Type class for **lattices**: extends both `SemilatticeSup` and `SemilatticeInf` |
| `DistribLattice α` | Type class for **distributive lattices**: extends `Lattice` with `le_sup_inf`: `(x ⊔ y) ⊓ (x ⊔ z) ≤ x ⊔ (y ⊓ z)` |
| `SemilatticeSup.mk'` | Alternative constructor: if `⊔` is commutative, associative, idempotent → induces a `SemilatticeSup` via `a ≤ b ↔ a ⊔ b = b` |
| `SemilatticeInf.mk'` | Dual of `mk'` for `⊓` |
| `Lattice.mk'` | Constructor for lattices from two ops `⊔`, `⊓` satisfying: <br> • commutativity, associativity, idempotence (induced) <br> • **absorption laws**: `a ⊔ (a ⊓ b) = a`, `a ⊓ (a ⊔ b) = a` |
| `sup_le_iff` | `a ⊔ b ≤ c ↔ a ≤ c ∧ b ≤ c` |
| `inf_le_iff` | `a ≤ b ⊓ c ↔ a ≤ b ∧ a ≤ c` |
| `sup_inf_left` / `inf_sup_left` | Distributivity: `a ⊔ (b ⊓ c) = (a ⊔ b) ⊓ (a ⊔ c)` and `a ⊓ (b ⊔ c) = (a ⊓ b) ⊔ (a ⊓ c)` in `DistribLattice` |
| `sup_eq_max`, `inf_eq_min` | In `LinearOrder`, `⊔ = max`, `⊓ = min` (syntactically equal) |
| `Lattice.toLinearOrder` | If a lattice has decidable `≤`, `=`, `<`, and total `≤`, then it is a `LinearOrder` |
| `OrderDual.instSemilatticeSup`, `instSemilatticeInf`, `instLattice`, `instDistribLattice` | Duality: `αᵒᵈ` swaps `⊔ ↔ ⊓`, `sup ↔ inf`, `≤ ↔ ≥` |

#### **2. Naming Conventions**

- **Prefixes**:
  - `le_`, `inf_`, `sup_`: e.g., `le_sup_left`, `inf_le_right`, `sup_le`
  - `left_`, `right_`, `idem`, `comm`, `assoc`: e.g., `sup_left_comm`, `inf_right_idem`, `sup_comm`, `inf_assoc`
  - `congr_`: e.g., `sup_congr_left`, `inf_congr_right`
  - `of_`, `to_`: e.g., `ofDual_inf`, `toDual_sup`
- **Suffixes**:
  - `_left`, `_right`: argument position (e.g., `le_sup_left`, `inf_le_right`)
  - `_iff`: equivalence lemmas (e.g., `sup_le_iff`, `inf_lt_iff`)
  - `_distrib_left`, `_distrib_right`: e.g., `sup_sup_distrib_left`
- **Notation**:
  - `⊔` = `sup` (join)
  - `⊓` = `inf` (meet)
  - `≤`, `<` inherited from `PartialOrder`

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only` — for rewriting using `@[simp]` lemmas (e.g., `sup_idem`, `inf_comm`)
- `rw` / `rwa` — rewriting with equalities, often with `←` to reverse direction
- `apply`, `exact`, `refine` — for constructing proofs term-by-term
- `cases` — for destructing inductive types (e.g., `cases A`, `cases h`)
- `ext` — extensionality for functions/structures (e.g., `ext x y`)
- `congr` — for congruence closure (e.g., `congr`)
- `calc` — chain of inequalities/equalities
- `by_cases`, `split_ifs` — for handling `ite`/decidable propositions
- `dsimp` — definitional simplification (used in `mk'` proofs)
- `apply le_antisymm` — common pattern for equality proofs via antisymmetry
- `aesop` — not explicitly used here, but `gcongr`/`gcongr_forward` suggest automation-friendly design

#### **4. Proof Logic & Strategy**

- **Inductive/constructive definitions**:
  - `mk'` lemmas construct structures from algebraic properties (comm, assoc, idem/absorption).
  - Proofs often reduce to verifying order-theoretic axioms from algebraic ones (e.g., `le_trans` via associativity + idempotence).
- **Duality**:
  - Many theorems are proven for `SemilatticeSup`, then dualized for `SemilatticeInf` via `OrderDual`.
  - E.g., `inf_le_left` is `@le_sup_right αᵒᵈ`.
- **Absorption-based lattice construction**:
  - `Lattice.mk'` proves idempotence of `⊔`, `⊓` from absorption laws, then uses `mk'` for each semilattice.
- **Equality via antisymmetry**:
  - `le_antisymm` is heavily used: prove `a = b` by `a ≤ b` and `b ≤ a`.
- **Case analysis on order**:
  - In `LinearOrder`, proofs often split on `le_total` or `le_or_le`.
- **Pointwise lifting**:
  - Function spaces `Π i, α i` inherit lattice ops pointwise (`sup_apply`, `inf_apply`).

#### **5. Imports & Dependencies**

- **Core**:
  - `Mathlib.Data.Bool.Basic`
  - `Mathlib.Order.Monotone.Basic`
  - `Mathlib.Order.ULift`
  - `Mathlib.Tactic.GCongr.CoreAttrs`
- **Key dependencies**:
  - `PartialOrder`, `Preorder`, `LinearOrder`
  - `OrderDual` (for duality)
  - `Std.Commutative`, `Std.Associative`, `Std.IdempotentOp` (type classes for algebraic properties)
  - `Max`, `Min` (for `⊔`, `⊓` notation and `max`, `min` instances)

---

This file formalizes foundational order theory in Lean 4, emphasizing algebraic ↔ order-theoretic equivalences and leveraging duality extensively. It serves as a core module for lattice theory in Mathlib, with many results designed for reuse (e.g., via `mk'`, `ext`, and dual instances).