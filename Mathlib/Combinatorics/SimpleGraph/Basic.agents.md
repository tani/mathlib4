### Technical Brief: `Mathlib.Combinatorics.SimpleGraph.Basic`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `SimpleGraph V` | `Structure` | Represents a simple graph on vertex type `V` as an irreflexive, symmetric relation `Adj : V → V → Prop`. |
| `neighborSet v` | `Set V` | Set of vertices adjacent to `v`. |
| `commonNeighbors v w` | `Set V` | Intersection of `neighborSet v` and `neighborSet w`. |
| `incidenceSet v` | `Set (Sym2 V)` | Set of edges (as unordered pairs) incident to `v`. |
| `edgeSet G` | `Set (Sym2 V)` | Set of edges (unordered pairs `{v,w}` with `G.Adj v w`). |
| `completeGraph V` / `⊤` | `SimpleGraph V` | Graph where all distinct vertices are adjacent (`Adj := Ne`). |
| `emptyGraph V` / `⊥` | `SimpleGraph V` | Graph with no edges (`Adj _ _ := False`). |
| `completeBipartiteGraph V W` | `SimpleGraph (V ⊕ W)` | Bipartite graph with edges only across the sum injection sides. |
| `fromRel r` | `SimpleGraph V` | Symmetrization & irreflexivization of a binary relation `r`. |
| `fromEdgeSet s` | `SimpleGraph V` | Graph induced by a set of edges `s : Set (Sym2 V)` (excluding loops). |
| `IsSubgraph` / `≤` | `SimpleGraph V → SimpleGraph V → Prop` | Subgraph relation: `G ≤ H` iff `G.Adj ⊆ H.Adj`. |
| `sup` / `⊔`, `inf` / `⊓`, `compl` / `ᶜ`, `sdiff` / `\` | Lattice operations on `SimpleGraph V` | Pointwise union/intersection/complement/difference of adjacency relations. |
| `distribLattice`, `completeAtomicBooleanAlgebra` | `instance` | `SimpleGraph V` forms a complete atomic Boolean algebra under subgraph ordering. |
| `mem_edgeSet` | `s(v, w) ∈ G.edgeSet ↔ G.Adj v w` | Definitional equivalence between adjacency and edge membership. |
| `edgeSet_inj` | `G₁.edgeSet = G₂.edgeSet ↔ G₁ = G₂` | Injectivity of edge set mapping. |
| `adj_iff_exists_edge` | `G.Adj v w ↔ v ≠ w ∧ ∃ e ∈ G.edgeSet, v ∈ e ∧ w ∈ e` | Characterization of adjacency via edges. |
| `incidenceSet_inter_incidenceSet_of_adj` | `G.Adj a b → G.incidenceSet a ∩ G.incidenceSet b = {s(a,b)}` | Unique edge between adjacent vertices. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isSubgraph`, `support`, `neighborSet`, `commonNeighbors`, `incidenceSet`, `edgeSet`, `fromRel`, `fromEdgeSet`, `otherVertexOfIncident`.
- **Suffixes**:
  - `_adj`: properties about adjacency (e.g., `sup_adj`, `compl_adj`, `fromEdgeSet_adj`).
  - `_mem_`: membership lemmas (e.g., `mem_neighborSet`, `mem_incidenceSet`, `mem_commonNeighbors`).
  - `_eq`: definitional equalities (e.g., `edgeSet_bot`, `completeGraph_eq_top`, `fromEdgeSet_edgeSet`).
  - `_mono`, `_le`, `_subset`: monotonicity/subset lemmas (e.g., `edgeSet_mono`, `fromEdgeSet_mono`).
- **Symmetry/irreflexivity**:
  - `symm`, `loopless`, `irrefl`, `adj_comm`, `adj_symm`, `ne_of_adj`.

---

#### **3. Tactic Stack**

- **Primary automation tactic**: `aesop_graph`  
  - Custom variant of `aesop` with:
    - Rule set `[SimpleGraph]`
    - `introsTransparency := default`
    - `terminal := true` (fails if unsolved)
- **Variants**:
  - `aesop_graph?`: same as `aesop_graph`, but returns `Try this` suggestion.
  - `aesop_graph_nonterminal`: nonterminal version (for exploration only).
- **Common tactics in proofs**:
  - `simp`, `rw`, `ext`, `cases`, `intro`, `exact`, `contradiction`, `tauto`, `ring`, `aesop`, `aesop_graph`.
  - `symm`, `subst`, `rwa`, `rintro`, `refine`, `convert`, `apply`, `have`, `show`, `by_cases`.

---

#### **4. Proof Logic**

- **Structure proofs**:
  - Use `ext` + `simp` to prove equality of graphs via adjacency extensionality.
  - Use `ext e` (for `e : Sym2 V`) to prove equality of edge sets.
- **Inductive/constructive reasoning**:
  - `fromEdgeSet` and `fromRel` constructions are proven via `ext` + `simp`.
  - Lattice/Boolean algebra properties are proven via `ext` + `aesop_graph` or manual case analysis.
- **Symmetry & irreflexivity**:
  - Often discharged automatically via `aesop_graph` using registered `symm`, `loopless`, `irrefl`, `adj_comm`, `adj_symm` attributes.
- **Edge/vertex relationships**:
  - Proofs about `neighborSet`, `incidenceSet`, `commonNeighbors` rely on `simp` + `mem_*` lemmas.
  - `Sym2`-based reasoning uses `Sym2.ind`, `Sym2.mem_and_mem_iff`, `Sym2.other_spec`, etc.

---

#### **5. Imports**

| Module | Purpose |
|--------|---------|
| `Mathlib.Combinatorics.SimpleGraph.Init` | Core definitions and basic properties of `SimpleGraph`. |
| `Mathlib.Data.Finite.Prod` | Finite type machinery for `Fintype`, `Finite`. |
| `Mathlib.Data.Rel` | Relations, `Rel.dom`, `Symmetric`, `Irreflexive`, etc. |
| `Mathlib.Data.Set.Finite.Basic` | Finite sets, `Set.fintypeInter`, `Set.fintypeDiff`, etc. |
| `Mathlib.Data.Sym.Sym2` | Unordered pairs (`Sym2 V`), used for edge representation. |

---

### Summary

This module formalizes **simple graphs** as symmetric, irreflexive relations, with a rich algebraic structure (complete atomic Boolean algebra). It provides:
- Core data structures (`SimpleGraph`, `edgeSet`, `neighborSet`, `incidenceSet`, `commonNeighbors`)
- Lattice/Boolean operations (`⊔`, `⊓`, `ᶜ`, `\`, `≤`)
- Equivalence between graphs and edge sets (`edgeSet_inj`, `fromEdgeSet_edgeSet`)
- Decidability & finiteness instances for finite vertex types
- Automation via `aesop_graph`, leveraging custom rule sets and transparency settings.

The formalization is designed for extensibility toward multigraphs and directed graphs, but currently focuses on foundational unoriented simple graph theory.