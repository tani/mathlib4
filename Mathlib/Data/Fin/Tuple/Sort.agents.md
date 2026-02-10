### Technical Brief: `Tuple.sort` and Sorted Tuple API in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `graph f` | `Finset (α ×ₗ Fin n)` | Constructs the finite set of pairs `(f i, i)` with lexicographic order on the product. |
| `graph.proj` | `graph f → α` | Projects a pair `(x, i)` to its first component `x = f i`. |
| `graphEquiv₁ f` | `Fin n ≃ graph f` | Natural equivalence mapping `i ↦ (f i, i)`. |
| `graphEquiv₂ f` | `Fin n ≃o graph f` | Order-preserving equivalence (via `Finset.orderIsoOfFin`). |
| `sort f` | `Equiv.Perm (Fin n)` | The permutation that reorders indices so that `f ∘ sort f` is monotone. Defined as `graphEquiv₂ f.trans (graphEquiv₁ f).symm`. |
| `monotone_sort` | `Monotone (f ∘ sort f)` | Core theorem: composing `f` with `sort f` yields a monotone function. |
| `lt_card_le_iff_apply_le_of_monotone` | `j < #{i // f i ≤ a} ↔ f j ≤ a` | Characterizes membership in the prefix of a sorted tuple bounded by `a`. |
| `eq_sort_iff` | `σ = sort f ↔ Monotone (f ∘ σ) ∧ ∀ i < j, f(σ i) = f(σ j) → σ i < σ j` | Full characterization of `sort f`: it is the *lexicographically minimal* permutation making `f ∘ σ` monotone. |
| `sort_eq_refl_iff_monotone` | `sort f = id ↔ Monotone f` | `sort f` is identity iff `f` is already monotone. |
| `comp_sort_eq_comp_iff_monotone` | `f ∘ σ = f ∘ sort f ↔ Monotone (f ∘ σ)` | Uniqueness of sorted version: any monotone permutation gives the same result. |
| `unique_monotone` | `f ∘ σ = f ∘ τ` if both are monotone | Uniqueness of monotone rearrangements. |
| `antitone_pair_of_not_sorted` | `f ≠ f ∘ sort f ⇒ ∃ i < j, f j < f i` | Contrapositive: non-sorted tuples contain a strictly decreasing pair. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `graph_`: Relates to the finite set of `(f i, i)` pairs.
  - `sort`: Pertains to the sorting permutation.
  - `proj`: Projection from `graph f` to `α`.
- **Suffixes**:
  - `_iff_`: Biconditional characterizations (e.g., `eq_sort_iff`, `sort_eq_refl_iff_monotone`).
  - `_of_`: Properties derived from assumptions (e.g., `monotone_sort`, `lt_card_le_iff_apply_le_of_monotone`).
- **Equiv/Order variants**:
  - `graphEquiv₁`, `graphEquiv₂`: Distinguish between plain equivalence and order equivalence.
  - `orderIsoOfFin`: Constructs order isomorphisms from finite types.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `dsimp`: Simplification and definitional reduction (especially for `Finset`, `Prod`, `Equiv`).
- `rw`: Rewriting using equalities and equivalences.
- `exact`, `apply`, `intro`: Basic proof construction.
- `obtain ⟨…⟩`: Destructuring existential or conjunction hypotheses.
- `conv_rhs => rw [...]`: Targeted rewriting in right-hand side of equations.
- `contrapose!`: Contrapositive reasoning with negation simplification.
- `ofFn_injective`, `eq_of_perm_of_sorted`: Specialized lemmas for uniqueness of sorted lists.
- `Finset.card_mono`, `Fintype.card_congr`: Cardinality reasoning.

---

#### **4. Proof Logic**

- **Structure of sorting proofs**:
  - Define `graph f` to encode input-output pairs.
  - Use `graphEquiv₁` (index → pair) and `graphEquiv₂` (index → ordered pair) to relate indexing and ordering.
  - Define `sort f` as the composite equivalence: reorder indices via `graphEquiv₂`, then map back via `graphEquiv₁`.
  - Prove `f ∘ sort f = graph.proj ∘ graphEquiv₂`, and since both components are monotone, conclude `f ∘ sort f` is monotone.

- **Uniqueness arguments**:
  - Use `unique_monotone`: any two monotone permutations of `f` must agree because sorted lists are unique under linear order.
  - Leverage `ofFn_injective` and `eq_of_perm_of_sorted` for list-based uniqueness.

- **Lexicographic minimality**:
  - `eq_sort_iff` shows `sort f` is minimal among permutations making `f ∘ σ` monotone: ties are broken by index order (`σ i < σ j` when `f(σ i) = f(σ j)` and `i < j`).

- **Contrapositive non-sortedness**:
  - `antitone_pair_of_not_sorted` uses monotonicity equivalence (`monotone_iff_forall_lt`) to derive existence of a decreasing pair.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Data.Finset.Sort`: For sorting finite sets and order isomorphisms.
- `Mathlib.Data.Fintype.Sum`: For cardinality arithmetic on sums/subtypes.
- `Mathlib.Data.List.FinRange`: For finite range indexing and list constructions.
- `Mathlib.Data.Prod.Lex`: Lexicographic order on products (`×ₗ`).
- `Mathlib.GroupTheory.Perm.Basic`: Permutation group theory (`Equiv.Perm`, `trans`, `symm`).
- `Mathlib.Order.Interval.Finset.Fin`: Interval finite sets over `Fin`.

**Scope**:
- Focuses on **finite tuples** (`Fin n → α`) over a **linearly ordered type** `α`.
- Provides a **permutation-based API** for sorting, with emphasis on correctness (`monotone_sort`), uniqueness (`unique_monotone`), and minimality (`eq_sort_iff`).
- Designed for use in higher-level libraries needing sorted representations (e.g., combinatorics, statistics, formalized algorithms).

--- 

Let me know if you'd like a diagram of the equivalences or a proof sketch of `eq_sort_iff`.