Here's a structured technical brief extracted from the provided Lean 4 file on **subgraphs of a simple graph**:

---

### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `Subgraph G` | Type of subgraphs of `G : SimpleGraph V`. A subgraph is a pair `(verts, Adj)` where `verts ⊆ V`, `Adj` is a symmetric relation on `verts`, and `Adj ⊆ G.Adj`. |
| `Subgraph.singletonSubgraph G v` | One-vertex subgraph with no edges. |
| `Subgraph.subgraphOfAdj G hvw` | One-edge subgraph induced by an edge `hvw : G.Adj v w`. |
| `Subgraph.coe G'` | Coercion of subgraph `G'` to a `SimpleGraph` on its vertex type `G'.verts`. |
| `Subgraph.spanningCoe G'` | Embedding of `G'` into a graph on full vertex type `V`, adding isolated vertices. |
| `Subgraph.IsSpanning G'` | Predicate for whether `G'.verts = univ`. |
| `Subgraph.IsInduced G'` | Predicate for whether adjacency in `G'` matches adjacency in `G` on its vertices. |
| `Subgraph.support G'` | Set of vertices incident to at least one edge in `G'`. |
| `Subgraph.neighborSet G' v` | Set of neighbors of `v` in `G'`. |
| `Subgraph.edgeSet G'` | Set of edges (as symmetric pairs) in `G'`. |
| `Subgraph.incidenceSet G' v` | Set of edges in `G'` incident to `v`. |
| `Subgraph.degree G' v` | Cardinality of `G'.neighborSet v`. |
| `Subgraph.map f H` | Image of subgraph `H` under graph homomorphism `f`. |
| `Subgraph.comap f H` | Preimage of subgraph `H` under graph homomorphism `f`. |
| `Subgraph.inclusion h` | Injective homomorphism between coe-graphs when `x ≤ y`. |
| `Subgraph.hom x` | Injective homomorphism from `x.coe` into `G`. |
| `Subgraph.topIso`, `Subgraph.botEquiv` | Equivalences between top/bottom subgraphs and `G`/empty graph. |
| `Subgraph.toSubgraph H h` | Converts a graph `H ≤ G` into a subgraph of `G`. |
| `Lattice (Subgraph G)`, `BoundedOrder (Subgraph G)` | Lattice and bounded order structures on subgraphs. |
| `CompletelyDistribLattice (Subgraph G)` | Full complete distributivity of the subgraph lattice. |

**Notable Theorems**:
- `sup_adj`, `inf_adj`, `sSup_adj`, `sInf_adj`: Characterizations of joins/meets in terms of adjacency.
- `verts_sup`, `verts_inf`, `verts_top`, `verts_bot`: Vertex sets of lattice operations.
- `neighborSet_sup`, `neighborSet_inf`, etc.: Neighbor sets distribute over lattice ops.
- `edgeSet_mono`, `edgeSet_inf`, `edgeSet_sup`: Edge sets behave monotonically and distributively.
- `map_le_iff_le_comap`: Adjunction between `map` and `comap`.
- `degree_le`, `degree_le'`: Monotonicity of degree under subgraph inclusion.

---

### **2. Naming Conventions**

- **Prefixes**:
  - `is_`: Predicate names (`IsSpanning`, `IsInduced`)
  - `coe_`: Coercion-related (`coe`, `coe_adj_sub`, `coe_degree`)
  - `spanning_`: Spanning-related (`spanningCoe`, `spanningHom`, `spanningCoeEquivCoeOfSpanning`)
  - `neighborSet_`, `edgeSet_`, `incidenceSet_`, `support_`: Set-related operations
  - `map_`, `comap_`: Homomorphism-induced constructions
  - `inclusion_`, `hom_`: Canonical injections

- **Suffixes**:
  - `_sub`: Subgraph properties (`adj_sub`, `edge_vert`)
  - `_Equiv`: Equivalences (`topEquiv`, `botEquiv`, `coeNeighborSetEquiv`)
  - `_Iso`: Graph isomorphisms (`topIso`)
  - `_mono`, `_monotone`: Monotonicity lemmas (`verts_mono`, `map_monotone`)
  - `_iff`: Biconditional lemmas (`singletonSubgraph_le_iff`, `degree_eq_one_iff_unique_adj`)

- **Special**:
  - `mem_`: Membership lemmas (`mem_neighborSet`, `mem_verts_of_mem_edge`)
  - `finiteAt_`: Fintype instances (`finiteAt`, `finiteAtOfSubgraph`)

---

### **3. Tactic Stack**

Frequent tactics used in proofs:
- `aesop_graph`: Custom tactic for graph reasoning (used in `symm` proof of `Subgraph` definition).
- `simp` / `simp only`: Dominant simplifier usage, especially with `@[simp]` lemmas.
- `rw`, `rfl`: Rewriting and definitional equality.
- `intro`, `exact`, `apply`: Basic proof structure.
- `ext`: Extensionality for graphs/subgraphs.
- `induction' ... using Sym2.ind`: Structural induction on symmetric pairs.
- `set_tac`, `set_simp`: Set-theoretic simplifications.
- `apply_fun`, `funext`: Functional extensionality and function application.
- `classical`: For classical reasoning (e.g., in `completelyDistribLatticeMinimalAxioms`).
- `aesop`, `linarith`, `ring`: Minor roles.

---

### **4. Proof Logic**

- **Structure of proofs**:
  - Most lemmas are proven by `ext` + `simp` (extensionality + simplification).
  - Inductive arguments on `Sym2` (edges) are common for edge-set lemmas.
  - Lattice-theoretic properties (e.g., distributivity) are proven via `Subgraph.ext` + set-theoretic reasoning.
  - Homomorphism properties (`map`, `comap`) use adjunction-style reasoning (`map_le_iff_le_comap`).
  - Fintype/finite arguments rely on subset finiteness lemmas (`Set.fintypeSubset`).
  - Equivalence proofs (`equiv`, `iso`) use `ext`, `rfl`, and `simp` with `@[simps]`.

- **Common patterns**:
  - Prove inclusion `≤` by splitting into vertex and edge parts.
  - Use `adj_sub`, `edge_vert`, and `symm` to lift subgraph structure to ambient graph.
  - Use `coe` and `spanningCoe` to switch between dependent and non-dependent graph representations.

---

### **5. Imports**

- `Mathlib.Combinatorics.SimpleGraph.Finite`: For finite graph properties (e.g., `Fintype`, `finiteAt`).
- `Mathlib.Combinatorics.SimpleGraph.Maps`: For graph homomorphisms (`→g`, `Hom.id`, `comp`, etc.).

These imports define the ambient graph theory context and homomorphism machinery used throughout.

---

Let me know if you'd like a **dependency graph**, **index of lemmas by usage**, or **formalization strategy notes** for extending this file.