### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `smul_stabilizer_of_no_doubling_aux` | `(hA : #(A * A) ≤ #A) → (ha : a ∈ A) → a •> (stabilizer G A : Set G) = A ∧ (stabilizer G A : Set G) <• a = A` | Core technical lemma: shows that for `a ∈ A`, both left and right actions of `a` on the stabilizer of `A` yield `A`, under the assumption of *no doubling* (`#(A * A) ≤ #A`). |
| `smul_stabilizer_of_no_doubling` | `(hA : #(A * A) ≤ #A) → (ha : a ∈ A) → a •> (stabilizer G A : Set G) = A` | Left-translation version: non-empty set with no doubling equals left translate of its stabilizer. |
| `op_smul_stabilizer_of_no_doubling` | `(hA : #(A * A) ≤ #A) → (ha : a ∈ A) → (stabilizer G A : Set G) <• a = A` | Right-translation version: non-empty set with no doubling equals right translate of its stabilizer. |
| `stabilizer G A` | `Set G` | Stabilizer of `A` under left multiplication action: `{ g ∈ G | g • A = A }`. |
| `A * A` | `Finset G` | Pointwise product (i.e., `{ x * y | x ∈ A, y ∈ A }`). |
| `#A` | `ℕ` | Cardinality of `A`. |

> **Note**: The `to_additive` attributes indicate intended additive analogues (e.g., for abelian groups written additively, `A + A` instead of `A * A`, and `+•` instead of `•>`).

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `smul_`, `op_smul_`: denote left/right group action (`•>` and `<•`).
  - `stabilizer_`: relates to group stabilizers.
  - `no_doubling`: indicates assumption `#(A * A) ≤ #A`.
- **Suffixes**:
  - `_aux`: auxiliary lemmas used in main proofs.
  - `_of_no_doubling`: condition on doubling.
- **Operators**:
  - `•>` = left multiplication action on sets (`smul`).
  - `<•` = right multiplication action (`op_smul`).
  - `*` = pointwise multiplication of finsets.
  - `⁻¹`, `•`, `mul`, `smul`, `op` — standard group/action notation.

---

#### 3. **Tactic Stack**

Frequent tactics used in proofs:
- `rw` — rewriting using equalities/definitions.
- `simp` / `simpa` — simplification with lemmas (e.g., `smul_finset_subset_mul`, `smul_eq_mul`, `inv_mem`, `mem_inv_smul_finset_iff`).
- `ext` — extensionality for set equality.
- `norm_cast` — handles coercion between `Finset G` and `Set G`.
- `refine` / `exact` — constructing proofs stepwise.
- `have` / `let` — intermediate lemma introduction.
- `by_cases`, `cases` — not explicitly visible here, but implied by `decidable_eq` and `Finset` usage.
- `aesop` is *not* used — proofs are largely manual and rely on algebraic reasoning.

---

#### 4. **Proof Logic**

- **Strategy**:  
  1. **Reduction to set-theoretic equalities** via cardinality:  
     Show `a •> A ⊆ A * A` and `#(a •> A) = #A`, so equality follows from `#(A * A) ≤ #A`.  
     Same for `A <• a`.
  2. **Equating left and right actions**:  
     Use `smul_A ha = A * A = A_smul ha` to deduce `a •> A = A <• a`.
  3. **Characterize stabilizer via inversion**:  
     Show `a⁻¹ • A = stabilizer G A` using `mul_mem_A_comm` (commutativity of membership under multiplication by `a`).
  4. **Conclude via group identities**:  
     Use `inv_smul_smul`, `smul_comm`, `inv_smul_smul`, etc., to rewrite and finish.

- **Induction**: Not used — purely algebraic, pointwise reasoning.

---

#### 5. **Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Algebra.Group.Pointwise.Finset.Basic` | Provides `*`, `smul`, `op_smul`, `stabilizer`, `coe_set_pow`, `Finset.empty_pow`, etc., for finset pointwise operations. |
| `Mathlib.GroupTheory.GroupAction.Defs` | Defines group actions (`MulAction`, `smul`, `stabilizer`, `op_smul`, etc.), needed for `stabilizer G A` and action lemmas. |

> **Scoped notation**:  
> - `open scoped Pointwise RightActions` — enables `•>`, `<•`, `*`, etc., for finsets.  
> - `open MulOpposite MulAction` — for `op_smul`, `op`, and action-related lemmas.

---

### Summary

This file establishes a structural characterization of finsets with *no doubling* (`#(A²) ≤ #A`) in groups: they must be left/right translates of a subgroup (the stabilizer). The proof leverages finset cardinality arguments, group action properties, and set-theoretic manipulations — typical of additive combinatorics in Lean. The structure is clean, modular, and ready for extension (e.g., to doubling < 3/2, as noted in TODO).