Here's a structured technical brief extracted from the provided Lean 4 file on **Compositions**:

---

### 🔹 **Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `Composition n` | Structure: a list of positive naturals summing to `n`. Core representation of a composition. |
| `CompositionAsSet n` | Structure: a finset of `Fin (n+1)` containing `0` and `n`, representing block boundaries. Alternative combinatorial view. |
| `c.blocks` | `List ℕ`: list of block sizes in `c : Composition n`. |
| `c.length` | `ℕ`: number of blocks (`c.blocks.length`). |
| `c.blocksFun : Fin c.length → ℕ` | Function version of `blocks`, used for analytic composition. |
| `c.sizeUpTo i` | `ℕ`: cumulative sum of first `i` blocks. |
| `c.embedding i : Fin (c.blocksFun i) ↪o Fin n` | Embedding of `i`-th block into `Fin n`. |
| `c.index j` | `Fin c.length`: index of block containing `j : Fin n`. |
| `c.invEmbedding j` | `Fin (c.blocksFun (c.index j))`: position of `j` inside its block. |
| `c.boundary : Fin (c.length + 1) ↪o Fin (n + 1)` | Order embedding of block boundaries (including right endpoint). |
| `c.boundaries` | `Finset (Fin (n+1))`: image of `c.boundary`. |
| `c.toCompositionAsSet` | Equivalence constructor from `Composition n → CompositionAsSet n`. |
| `compositionEquiv n` | Equivalence `Composition n ≃ CompositionAsSet n`. |
| `compositionAsSetEquiv n` | Equivalence `CompositionAsSet n ≃ Finset (Fin (n-1))`. |
| `composition_card` | Theorem: `Fintype.card (Composition n) = 2^(n-1)` (for `n ≥ 1`; `n = 0` handled separately). |
| `ones n` | Composition `[1, ..., 1]` (n times). |
| `single n h` | Composition `[n]` for `h : 0 < n`. |
| `l.splitWrtComposition c` | Splits list `l` of length `n` into sublists per `c : Composition n`. |
| `flatten_splitWrtComposition` | Theorem: `flatten (splitWrtComposition l c) = l`. |
| `splitWrtComposition_flatten` | Theorem: if `map length L = c.blocks`, then `splitWrtComposition (flatten L) c = L`. |

---

### 🔹 **Naming Conventions**

- **Prefixes**:
  - `blocks_`: relates to block list or function (`blocksFun`, `blocks_pos`, `blocks_length`).
  - `sizeUpTo_`: cumulative sums (`sizeUpTo_zero`, `sizeUpTo_succ`, `sizeUpTo_length`).
  - `embedding_`: block embeddings (`embedding_comp_inv`, `index_embedding`, `mem_range_embedding`).
  - `invEmbedding_`: inverse embeddings (`invEmbedding_comp`, `coe_invEmbedding`).
  - `boundary_`: boundary points (`boundary_zero`, `boundary_last`, `card_boundaries_eq_succ_length`).
  - `ones`, `single`: canonical compositions.

- **Suffixes**:
  - `_eq_iff`: characterizations (`eq_ones_iff`, `eq_single_iff_length`).
  - `_iff`: logical equivalences (`mem_range_embedding_iff`, `eq_ones_iff_length`).
  - `_aux`: auxiliary definitions (`splitWrtCompositionAux`, `index_exists`).
  - `_fun`: functional versions (`blocksFun`, `invEmbedding`).

---

### 🔹 **Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp_rw`: simplification of sums, `take`, `drop`, `get`, `sizeUpTo`, embeddings.
- `rw`: rewriting using lemmas like `sizeUpTo_succ`, `blocks_sum`, `index_exists`.
- `induction'`: structural induction on lists or naturals (e.g., `splitWrtCompositionAux`).
- `exact`, `apply`, `convert`: proof construction.
- `cases'`: destructuring structures (`c : Composition n`, `j : Fin n`, `i : Fin c.length`).
- `ext`: extensionality for lists, functions, embeddings.
- `congr`: congruence for equality of structures.
- `linarith`, `omega`: arithmetic reasoning (e.g., `length_le`, `one_le_blocksFun`).
- `aesop`: for routine goals involving order, positivity, and basic arithmetic.
- `Fin.ext_iff`, `Finset.ext_iff`: extensionality for finite types/sets.

---

### 🔹 **Proof Logic & Strategy**

- **Inductive/constructive**: Many definitions (e.g., `sizeUpTo`, `embedding`, `index`) are built via recursion or minimal witnesses (`Nat.find`).
- **Order-theoretic reasoning**: Embeddings and boundaries rely on monotonicity (`monotone_sizeUpTo`, `strict_mono_sizeUpTo`).
- **Disjointness arguments**: Proofs like `disjoint_range` use ordering and minimality of `index`.
- **Equivalence constructions**: `compositionEquiv` is built via `toCompositionAsSet` and inverse maps.
- **List splitting/joining**: Proofs like `flatten_splitWrtComposition` use induction on block list and properties of `take`/`drop`.
- **Cardinality proofs**: Reduce to bijections with `Finset (Fin (n-1))`, then use known cardinalities.

---

### 🔹 **Imports & Scope**

**Primary imports**:
- `Mathlib.Algebra.BigOperators.Fin`
- `Mathlib.Algebra.Order.BigOperators.Group.Finset`
- `Mathlib.Data.Finset.Sort`

**Scope**:
- Combinatorics of compositions, with emphasis on:
  - List-based representation (`Composition n`)
  - Boundary/set-based representation (`CompositionAsSet n`)
  - Equivalence between them
  - Application to list splitting (`splitWrtComposition`)
- Motivation: formal multilinear series and analytic function composition.

---

Let me know if you'd like a **diagram of the equivalences**, **summary of key lemmas for list splitting**, or a **proof sketch of `composition_card`**.