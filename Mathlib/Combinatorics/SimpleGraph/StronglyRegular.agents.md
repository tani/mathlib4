### Technical Metadata Brief: Strongly Regular Graphs in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsSRGWith n k ℓ μ` | `SimpleGraph V → Prop` | Structure defining a strongly regular graph with parameters `(n, k, ℓ, μ)` — i.e., `n` vertices, `k`-regular, `ℓ` common neighbors for adjacent pairs, `μ` for non-adjacent. |
| `bot_strongly_regular` | `⊥.IsSRGWith (Fintype.card V) 0 ℓ 0` | Shows the empty graph is strongly regular (any `ℓ` works since no adjacent pairs exist). |
| `top` | `⊤.IsSRGWith n (n-1) (n-2) μ` | Shows the complete graph is strongly regular (any `μ` works since no distinct non-adjacent pairs exist). |
| `compl` | `G.IsSRGWith n k ℓ μ → Gᶜ.IsSRGWith n (n-k-1) (n-(2*k-μ)-2) (n-(2*k-ℓ))` | Complement of a strongly regular graph is strongly regular, with derived parameters. |
| `param_eq` | `0 < n → k * (k - ℓ - 1) = (n - k - 1) * μ` | Fundamental parameter identity for non-empty SRGs. |
| `matrix_eq` | `G.adjMatrix^2 = k•I + ℓ•A + μ•C` | Matrix characterization: square of adjacency matrix decomposes into identity, adjacency, and complement adjacency components. |
| `card_neighborFinset_union_eq` | `#(N(v) ∪ N(w)) = 2*k - |commonNeighbors v w|` | General union bound on neighborhoods. |
| `card_neighborFinset_union_of_adj` / `of_not_adj` | Specializations of above for adjacent / non-adjacent `v,w`. | Used in proofs of `compl` and `param_eq`. |
| `card_commonNeighbors_eq_of_adj_compl` / `of_not_adj_compl` | Compute common neighbors in complement using original graph parameters. | Core lemmas for `compl`. |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `is_`: Predicate definitions (`isSRGWith`, `isRegularOfDegree`)
  - `card_`: Cardinality-related lemmas (`card_neighborFinset_union_eq`, `card_commonNeighbors_eq_...`)
  - `bot_`, `top_`: For extremal graphs (`⊥`, `⊤`)
  - `compl_`: For complement-related results (`compl_is_regular`, `compl`)
- **Suffixes:**
  - `_eq`: Equality lemmas (`param_eq`, `matrix_eq`)
  - `_of_adj`, `_of_not_adj`: Conditional lemmas based on adjacency status
  - `_compl`: Results about the complement graph
- **Variables:**
  - `v w`: Vertices
  - `n k ℓ μ`: Parameters (natural numbers)
  - `G`: Graph under consideration
  - `Gᶜ`: Complement graph

---

#### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Role |
|--------|------|
| `simp` / `simp_rw` | Simplification with definitional equalities, especially for `Finset`, `Set`, `Fintype`, and graph operations (`neighborFinset`, `commonNeighbors`, `compl`) |
| `rw` | Rewriting using hypotheses or lemmas (e.g., `← h.of_adj`, `h.card`) |
| `ext` | Extensionality for sets/relations (e.g., proving set equality) |
| `apply` / `exact` | Applying lemmas or hypotheses directly |
| `convert` | Used in `param_eq` to reduce to a bipartite counting argument |
| `cases` / `obtain` | Structural decomposition (e.g., `obtain ⟨v⟩ := hn`) |
| `intro` / `rintro` | Introducing hypotheses and destructing conjunctions/disjunctions |
| `aesop` (not present here) | Not used — this file relies on explicit `simp`/`rw`-heavy reasoning |
| `ring` (not present) | Not needed — arithmetic is handled via `simp` and `linarith`-style reasoning |
| `congr!` | Congruence closure for proving equality of expressions (e.g., in `matrix_eq`) |

---

#### **4. Proof Logic**

- **Inductive/Case-based reasoning** dominates:
  - Proofs often split on `v = w`, `G.Adj v w`, or `Gᶜ.Adj v w`.
  - Example: `matrix_eq` splits on `v = w` and `G.Adj v w`.
- **Set-theoretic reasoning** is central:
  - Neighborhoods and common neighbors are translated via `Set.toFinset`, `Finset.card`, and set operations (`union`, `inter`, `diff`, `compl`).
  - Lemmas like `compl_neighborFinset_sdiff_inter_eq` manipulate set expressions to relate complement neighborhoods to originals.
- **Counting arguments**:
  - Double counting (via `card_mul_eq_card_mul`) is used in `param_eq`.
  - Union-intersection identities (`card_union_add_card_inter`) and complementarity (`#Uᶜ = n - #U`) are heavily used.
- **Parameter propagation**:
  - Lemmas like `compl` derive new parameters from old ones using arithmetic identities (e.g., `n - k - 1` for degree in complement).
- **Normalization via `simp`**:
  - Many proofs end with `simp [h.regular v]`, `congr!`, or `ring`-like simplifications to finalize equalities.

---

#### **5. Imports & Scope**

| Import | Purpose |
|--------|---------|
| `Mathlib.Combinatorics.Enumerative.DoubleCounting` | Provides `card_mul_eq_card_mul`, used in `param_eq`. |
| `Mathlib.Combinatorics.SimpleGraph.AdjMatrix` | Defines adjacency matrices, powers, and their entries (`adjMatrix_pow_apply_eq_card_walk`). |
| `Mathlib.Combinatorics.SimpleGraph.Basic` | Core graph definitions: `SimpleGraph`, `neighborFinset`, `commonNeighbors`, `compl`, `IsRegularOfDegree`. |

**Domain Scope**:  
This module formalizes **strongly regular graphs (SRGs)** in the context of finite simple graphs. It bridges combinatorial definitions (regularity, common neighbors), set-theoretic reasoning (neighborhood unions/intersections), and linear algebra (adjacency matrices). It is foundational for further work on SRG parameter constraints, eigenvalues, and classification (e.g., Paley graphs, strongly regular designs).

--- 

Let me know if you'd like a dependency graph, tactic trace, or extraction of lemmas for a specific use case (e.g., verifying known SRG families like cycle graphs or Petersen graph).