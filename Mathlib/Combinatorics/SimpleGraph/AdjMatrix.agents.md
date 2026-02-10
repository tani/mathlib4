### Technical Brief: Adjacency Matrices in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Matrix.IsAdjMatrix` | `structure (A : Matrix V V α) : Prop` | Captures adjacency matrix properties: entries ∈ {0,1}, symmetric, zero diagonal. |
| `IsAdjMatrix.zero_or_one` | `∀ i j, A i j = 0 ∨ A i j = 1` | Ensures binary entries. |
| `IsAdjMatrix.symm` | `A.IsSymm` | Symmetry of matrix. |
| `IsAdjMatrix.apply_diag` | `∀ i, A i i = 0` | Looplessness (no self-loops). |
| `IsAdjMatrix.toGraph` | `h : IsAdjMatrix A ↦ SimpleGraph V` | Constructs simple graph from adjacency matrix. |
| `Matrix.compl` | `A.compl i j = if i = j then 0 else if A i j = 0 then 1 else 0` | Complement adjacency matrix (for simple graphs). |
| `SimpleGraph.adjMatrix` | `G.adjMatrix α : Matrix V V α` | Adjacency matrix of a simple graph `G`. |
| `adjMatrix_apply` | `G.adjMatrix α v w = if G.Adj v w then 1 else 0` | Entry-wise definition of adjacency matrix. |
| `isAdjMatrix_adjMatrix` | `(G.adjMatrix α).IsAdjMatrix` | Adjacency matrix of a simple graph satisfies adjacency matrix axioms. |
| `toGraph_adjMatrix_eq` | `(G.isAdjMatrix_adjMatrix α).toGraph = G` | Equivalence between graph and its matrix-induced graph. |
| `adjMatrix_toGraph_eq` | `h.toGraph.adjMatrix α = A` | Inverse direction: matrix recovers from its graph. |
| `adjMatrix_pow_apply_eq_card_walk` | `(G.adjMatrix α ^ n) u v = Fintype.card { p : G.Walk u v | p.length = n }` | Counts walks via matrix powers — central spectral graph theory result. |
| `trace_adjMatrix` | `Matrix.trace (G.adjMatrix α) = 0` | No loops ⇒ zero trace. |
| `adjMatrix_mul_self_apply_self` | `(G.adjMatrix α * G.adjMatrix α) i i = degree G i` | Diagonal of square counts degree (number of length-2 walks from `i` to itself). |
| `adjMatrix_mulVec_const_apply` | `(G.adjMatrix α *ᵥ const a) v = G.degree v * a` | Action on constant vector yields degree-scaled vector. |
| `one_add_adjMatrix_add_compl_adjMatrix_eq_allOnes` | `1 + A + A.compl = all-ones matrix` | Decomposition of complete graph’s adjacency matrix. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isAdjMatrix_`: properties of `IsAdjMatrix` (e.g., `isAdjMatrix_adjMatrix`, `isAdjMatrix_compl`)
  - `adjMatrix_`: operations on `adjMatrix` (e.g., `adjMatrix_apply`, `adjMatrix_mulVec_apply`)
  - `toGraph_`: constructions from `IsAdjMatrix` to `SimpleGraph` (e.g., `toGraph_adjMatrix_eq`, `toGraph_compl_eq`)
  - `compl_`: complement matrix properties (e.g., `compl_apply_diag`, `isSymm_compl`)

- **Suffixes**:
  - `_eq`: equality lemmas (e.g., `toGraph_adjMatrix_eq`)
  - `_apply`: entry-wise evaluation (e.g., `adjMatrix_mulVec_apply`)
  - `_apply_self`: diagonal or self-loop related (e.g., `adjMatrix_mul_self_apply_self`)

- **Structure/Class-based naming**:
  - `h.toGraph`, `h.compl`, `h.symm`, `h.apply_diag`: methods/fields of `IsAdjMatrix h`.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` | Simplification of `if-then-else`, `ite`, `decidable` expressions, and definitions like `adjMatrix_apply`, `compl`. |
| `aesop` | Automated reasoning for propositional logic, especially in `IsAdjMatrix` structure proofs. |
| `rw` | Rewriting using lemmas (e.g., `adj_comm`, `transpose_apply`). |
| `ext` | Extensionality for matrices, graphs, relations. |
| `split_ifs` | Decomposing nested `ite`/`if-then-else`. |
| `obtain` / `cases'` | Case analysis on `h.zero_or_one i j`, `eq_or_ne u v`, etc. |
| `induction'` | Induction on `n` for `adjMatrix_pow_apply_eq_card_walk`. |
| `norm_cast` | Casts natural numbers to semiring elements. |
| `congr` + `ext` | Proving matrix equality by pointwise extensionality. |
| `rw [card_set_walk_length_eq]` | Key lemma linking walks and matrix powers. |

---

#### **4. Proof Logic**

- **Structure Proofs** (`IsAdjMatrix`):
  - Use `aesop` to discharge trivial goals (e.g., `symm`, `apply_diag`).
  - Manual case analysis on `zero_or_one i j` for entry-wise reasoning.

- **Graph-Matrix Equivalence**:
  - `toGraph_adjMatrix_eq`: Show `Adj_G(i,j) ↔ A i j = 1` via `simp` and `zero_ne_one`.
  - `adjMatrix_toGraph_eq`: Inverse direction: expand definitions, case-split on adjacency.

- **Complement Matrix**:
  - Prove `IsAdjMatrix A.compl` using `isSymm_compl` and `compl_apply_diag`.
  - `toGraph_compl_eq`: Show adjacency in complement ↔ non-adjacency in original + no loops.

- **Walk Counting** (`adjMatrix_pow_apply_eq_card_walk`):
  - **Induction on `n`**:
    - Base case (`n = 0`, `n = 1`) uses `eq_or_ne u v` and `finsetWalkLength`.
    - Inductive step: expand `pow_succ'`, apply `adjMatrix_mul_apply`, then use:
      - `Finset.card_biUnion`
      - `card_map`, `neighborFinset_def`
      - Disjointness proof via `disjoint_iff_inf_le` and injectivity of walk extensions.

- **Linear Algebra Identities**:
  - Use `dotProduct`, `mulVec`, `mul_apply` definitions + `neighborFinset_eq_filter`.
  - Simplify sums over neighbors via `sum_filter`, `filter_true_of_mem`.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Combinatorics.SimpleGraph.Basic`: Core graph definitions (`SimpleGraph`, `Adj`, `neighborFinset`, `degree`).
- `Mathlib.Combinatorics.SimpleGraph.Connectivity.WalkCounting`: Walks, `Walk.length`, `card_set_walk_length_eq`.
- `Mathlib.LinearAlgebra.Matrix.Trace`: `trace`, `trace_adjMatrix`.
- `Mathlib.LinearAlgebra.Matrix.Symmetric`: `IsSymm`, `transpose`.

**Key Type Class Assumptions**:
- `[Zero α]`, `[One α]`: For binary entries.
- `[MulZeroOneClass α]`, `[Nontrivial α]`: For `toGraph`, `zero_ne_one`, decidability.
- `[DecidableEq α]`, `[DecidableEq V]`: For `compl`, `ite`, `decidableRel`.
- `[Semiring α]`, `[NonAssocSemiring α]`: For matrix multiplication, vector actions, trace.

**Domain Scope**:
- **Combinatorics + Spectral Graph Theory**: Adjacency matrices as computational proxies for graph structure.
- **Applications**: Walk enumeration, regular graphs, complement graphs, trace/determinant-based invariants.

--- 

This module formalizes foundational spectral graph theory in Lean 4, with emphasis on the bijection between simple graphs and 0–1 symmetric zero-diagonal matrices, and the combinatorial meaning of matrix powers.