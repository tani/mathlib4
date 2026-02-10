### Technical Brief: Holors in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `HolorIndex ds` | `List ℕ → Type` | Type of valid index tuples for a holor of dimensions `ds`. Encoded as `{is : List ℕ // Forall₂ (· < ·) is ds}`. |
| `Holor α ds` | `Type u → List ℕ → Type u` | Function type `HolorIndex ds → α`, representing multidimensional arrays (holors). |
| `mul` / `⊗` | `[Mul α] → Holor α ds₁ → Holor α ds₂ → Holor α (ds₁ ++ ds₂)` | Tensor product of holors: `(x ⊗ y)(i₁ ++ i₂) = x i₁ * y i₂`. |
| `slice x i h` | `Holor α (d :: ds) → ℕ → i < d → Holor α ds` | Fix first index to `i`, yielding a sub-holor of lower dimension. |
| `unitVec d j` | `[Monoid α] [AddMonoid α] → Holor α [d]` | 1D holor with `1` at position `j`, `0` elsewhere. |
| `CPRankMax1 x` | `[Mul α] → Holor α ds → Prop` | Inductive predicate: `x` is a tensor product of 1D holors (rank ≤ 1). |
| `CPRankMax n x` | `[Mul α] [AddMonoid α] → ℕ → Holor α ds → Prop` | Inductive predicate: `x` is sum of `n` rank-≤1 holors (CP rank ≤ `n`). |
| `cprank x` | `[Ring α] → Holor α ds → ℕ` | Noncomputable CP rank: least `n` s.t. `CPRankMax n x`. |
| `sum_unitVec_mul_slice x` | `[Ring α] → Holor α (d :: ds)` | Reconstruction theorem: `x = ∑ᵢ unitVec d i ⊗ slice x i`. |
| `cprankMax_upper_bound` | `[Ring α] → CPRankMax (ds.prod) x` | Upper bound: CP rank ≤ product of dimensions. |
| `cprank_upper_bound` | `[Ring α] → cprank x ≤ ds.prod` | Immediate corollary of previous. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `cast_type`: for equality proofs involving type casts.
  - `mul_`, `zero_`, `add_`, `slice_`, `unitVec_`: denote operations or properties related to tensor product, zero, addition, slicing, or unit vectors.
  - `cprankMax_`, `cprank_`: for CP rank–related definitions and theorems.

- **Suffixes**:
  - `_assocRight`, `_assocLeft`: for associativity isomorphisms (via `cast`).
  - `_left_distrib`, `_right_distrib`: for distributivity of `⊗` over `+`.
  - `_cons`, `_nil`: for list-structural induction or decomposition (e.g., `holor_index_cons_decomp`, `cprankMax_nil`).
  - `_attach`: for indexing over `Finset.attach` (subset representation).

- **Infix**:
  - `⊗` (infix `mul`): tensor product.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` | Simplification with definitional equalities, especially for `HolorIndex`, `slice`, `unitVec`, `mul`. |
| `funext` | Proving function extensionality (core to holor equality). |
| `subst` / `congr_arg` / `cast` | Handling type equality and transport (e.g., `cast_type`, `assocLeft`, `assocRight`). |
| `induction` | Structural induction on `List`, `Finset`, or inductive predicates (`CPRankMax`, `CPRankMax1`). |
| `rw` / `rwa` | Rewriting using lemmas (especially `append_assoc`, `mul_assoc`, `slice_unitVec_mul`). |
| `apply` / `exact` | Goal-directed proof construction (e.g., in `cprankMax_add`, `cprankMax_mul`). |
| `aesop` (implied) | Not explicitly used, but `simp` + `rw` + `linarith`-style reasoning dominates. |
| `have` / `suffices` | Intermediate lemma introduction (common in `cprankMax_sum`, `cprankMax_upper_bound`). |

---

#### **4. Proof Logic & Strategy**

- **Inductive Structure**: Proofs often proceed by:
  - **Induction on `List ds`** (e.g., `cprankMax_upper_bound`, `cprank_upper_bound`).
  - **Induction on `Finset`** (e.g., `cprankMax_sum`, `slice_sum`).
  - **Induction on `CPRankMax`/`CPRankMax1`** (e.g., `cprankMax_add`, `cprankMax_mul`).

- **Key Logical Flow**:
  1. **Decomposition**: Use `sum_unitVec_mul_slice` to express any holor as sum of rank-1 holors.
  2. **Bounding**: Show each summand has CP rank ≤ `ds.prod`, then use `cprankMax_sum` to bound total rank.
  3. **Minimality**: Define `cprank` via `Nat.find`, then prove upper bound via `find_min'`.

- **Equality Reasoning**:
  - Heavy use of `Subtype.eq` and `cast_type` to handle dependent equality in `HolorIndex`.
  - `funext` + `simp` for pointwise equality of holors.

---

#### **5. Imports & Scope**

- **Core Imports**:
  ```lean
  import Mathlib.Algebra.BigOperators.Group.Finset
  import Mathlib.Algebra.Module.Pi
  ```
  - `Finset` for summation over finite sets.
  - `Pi` for holors as dependent functions (`Holor α ds ≈ Π i : HolorIndex ds, α`).

- **Scope**:
  - **Algebraic**: Works over semirings, rings, monoids, groups.
  - **Indexing**: Relies on `List ℕ`-indexed tuples with bounds (`Forall₂ (· < ·)`).
  - **Noncomputable**: `cprank` is noncomputable (uses `Classical.decPred` + `Nat.find`).

---

### Summary

This file formalizes **holors** (multidimensional arrays) and their **CP rank decomposition** in Lean 4. It builds a rich algebraic theory of tensor-like structures using `List`-based indexing and dependent types, with proofs leveraging `Finset` summation, inductive predicates, and type transport via `cast`. The development mirrors mathematical treatments of tensor rank decomposition, with a focus on constructive upper bounds and structural decomposition (e.g., via slices and unit vectors).