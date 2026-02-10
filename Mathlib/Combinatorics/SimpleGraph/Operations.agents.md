### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `replaceVertex` | `SimpleGraph V → V → V → SimpleGraph V` | Constructs a new graph by replacing vertex `t` with a copy of `s`, removing the `s–t` edge if present. |
| `edge` | `V → V → SimpleGraph V` | Defines the graph with a single undirected edge between `s` and `t`. |
| `not_adj_replaceVertex_same` | `¬(G.replaceVertex s t).Adj s t` | Proves that `s` and `t` are never adjacent in `G.replaceVertex s t`. |
| `replaceVertex_self` | `G.replaceVertex s s = G` | Shows that replacing a vertex with itself yields the original graph. |
| `adj_replaceVertex_iff_of_ne_left/right/iff` | Biconditionals for adjacency in `replaceVertex` under conditions on `v, w ≠ t` | Characterize how adjacency changes in `replaceVertex`. |
| `edgeSet_replaceVertex_of_not_adj` / `of_adj` | Set equalities for `edgeSet` under whether `s–t` is an edge | Describes the edge set of `replaceVertex` in terms of original edges and neighbor sets. |
| `card_edgeFinset_replaceVertex_of_not_adj` / `of_adj` | Numerical formulas for edge count after replacement | Quantify how many edges are added/removed when replacing `t` with `s`. |
| `edge_adj` | Characterization of adjacency in `edge s t` | Gives explicit condition for when two vertices are adjacent in the single-edge graph. |
| `edge_self_eq_bot` | `edge s s = ⊥` | Shows that a self-loop edge is the empty (bottom) graph. |
| `sup_edge_self` | `G ⊔ edge s s = G` | Adding a self-loop does not change the graph. |
| `edge_edgeSet_of_ne` | `(s ≠ t) → (edge s t).edgeSet = {s(s, t)}` | Describes edge set of `edge s t` when `s ≠ t`. |
| `sup_edge_of_adj` | `G.Adj s t → G ⊔ edge s t = G` | Adding an existing edge doesn’t change the graph. |
| `edgeFinset_sup_edge` | Describes `edgeFinset` of `G ⊔ edge s t` when `s ≠ t` and `¬G.Adj s t` | Shows that adding a new edge corresponds to cons-ing the edge into `edgeFinset`. |
| `card_edgeFinset_sup_edge` | `#(G ⊔ edge s t).edgeFinset = #G.edgeFinset + 1` | Edge count increases by 1 when adding a new edge. |
| `Iso.card_edgeFinset_eq` | `#G.edgeFinset = #G'.edgeFinset` under graph isomorphism | Invariance of edge count under isomorphism. |

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `replaceVertex_`: for lemmas about the `replaceVertex` operation.
  - `edge_`: for lemmas about the `edge` graph.
  - `card_edgeFinset_`: for theorems about edge counts.
  - `sup_edge_`: for theorems about joining with `edge`.
  - `adj_..._iff_of_ne`: for adjacency characterizations under inequality assumptions.

- **Suffixes**:
  - `_of_not_adj`, `_of_adj`: distinguish cases based on presence/absence of `s–t` edge.
  - `_iff_of_ne_left/right/iff`: indicate which arguments are constrained to be ≠ `t`.
  - `_self`: for special cases where arguments are equal (e.g., `replaceVertex_self`, `edge_self_eq_bot`).

- **Structure**:
  - `lemma/theorem X_Y_Z`: often `X` = main operation (`replaceVertex`, `edge`, `sup`), `Y` = condition (`adj`, `not_adj`, `self`, `ne`), `Z` = result type (`edgeSet`, `edgeFinset`, `Adj`, `card`).

---

#### 3. **Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` / `simp_rw` | Simplification using definitions (`replaceVertex`, `edge`, `edgeSet`, etc.) and lemmas like `adj_comm`. |
| `aesop` | Automated reasoning for propositional logic, set membership, and basic arithmetic. |
| `split_ifs` | Break down nested `if` expressions in definitions like `replaceVertex`. |
| `rw` | Rewriting using previously proven lemmas or definitions. |
| `ext` | Extensionality to prove graph equality. |
| `congr 2` | Congruence to reduce equality of arithmetic expressions. |
| `exacts [...]` | Provide multiple proof branches for `split_ifs` cases. |
| `rwa` | Rewrite + assume, often used with `edge_edgeSet_of_ne`. |
| `unfold Function.Injective` | Manual unfolding for injectivity proofs. |

---

#### 4. **Proof Logic**

- **Structure**:
  - Most proofs follow a *case analysis* pattern on whether `s` and `t` are adjacent (`ha : G.Adj s t` or `hn : ¬G.Adj s t`).
  - Vertex equality assumptions (`v ≠ t`, `w ≠ t`, `s ≠ t`) are used to simplify `if`-expressions and apply lemmas like `adj_replaceVertex_iff_of_ne`.
  - Set equalities are proven via `ext e; refine e.inductionOn ?_`, then case analysis on membership.
  - Edge count proofs use:
    - `card_union_of_disjoint` + `disjoint_sdiff_neighborFinset_image`
    - `card_sdiff` with subset facts like `incidenceFinset t ⊆ edgeFinset`
    - `card_image_of_injective` + `card_neighborFinset_eq_degree`
  - Arithmetic simplifications use `Nat.sub_add_comm` and `card_le_card`.

- **Induction**: Not used directly; proofs rely on case splits and set-theoretic reasoning.

---

#### 5. **Imports**

| Import | Role |
|--------|------|
| `Mathlib.Combinatorics.SimpleGraph.Finite` | Provides finite-type support (`Fintype`, `edgeFinset`, `degree`, `neighborFinset`, etc.). |
| `Mathlib.Combinatorics.SimpleGraph.Maps` | Provides graph homomorphisms/isomorphisms (`SimpleGraph ≃g`), used in `Iso.card_edgeFinset_eq`. |

These imports define core infrastructure for finite simple graphs, including edge sets, degrees, and isomorphism invariants.

--- 

Let me know if you'd like a diagrammatic summary or a formalized summary in Lean doc-string format.