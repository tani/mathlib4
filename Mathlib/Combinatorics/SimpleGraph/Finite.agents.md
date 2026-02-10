### Technical Metadata Brief: `Mathlib.Combinatorics.SimpleGraph.Finite`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `edgeFinset` | `abbrev edgeFinset : Finset (Sym2 V)` — finite version of `edgeSet`, assuming finiteness of `edgeSet`. |
| `neighborFinset` | `def neighborFinset : Finset V` — finite version of `neighborSet v`, assuming `Fintype (G.neighborSet v)`. |
| `incidenceFinset` | `def incidenceFinset : Finset (Sym2 V)` — finite version of `incidenceSet v`, assuming `DecidableEq V`. |
| `degree` | `def degree : ℕ` — number of neighbors of a vertex: `#(neighborFinset v)`. |
| `LocallyFinite` | `abbrev LocallyFinite := ∀ v, Fintype (G.neighborSet v)` — graph where every vertex has finite degree. |
| `IsRegularOfDegree` | `def IsRegularOfDegree (d : ℕ) : Prop` — all vertices have degree `d`. |
| `minDegree`, `maxDegree` | `def minDegree`, `def maxDegree : ℕ` — extremal degrees over all vertices (with fallback `0` if no vertices). |
| `DeleteFar` | `def DeleteFar (p : SimpleGraph V → Prop) (r : 𝕜) : Prop` — graph is *r*-delete-far from property `p` if any subgraph satisfying `p` requires deleting ≥ `r` edges. |
| `mem_edgeFinset` | `e ∈ G.edgeFinset ↔ e ∈ G.edgeSet` — membership equivalence. |
| `mem_neighborFinset` | `w ∈ G.neighborFinset v ↔ G.Adj v w` — adjacency characterization. |
| `card_edgeFinset_top_eq_card_choose_two` | `#(⊤).edgeFinset = n.choose 2` — edge count of complete graph. |
| `card_edgeFinset_le_card_choose_two` | `#G.edgeFinset ≤ n.choose 2` — max edges in any graph on `n` vertices. |
| `edgeFinset_inj` | `G₁.edgeFinset = G₂.edgeFinset ↔ G₁ = G₂` — injectivity of `edgeFinset`. |
| `deleteFar_iff` | Equivalence between `DeleteFar` and edge-deletion bound via `#G.edgeFinset - #H.edgeFinset`. |
| `degree_compl` | `Gᶜ.degree v = n - 1 - G.degree v` — degree in complement graph. |
| `exists_minimal_degree_vertex`, `exists_maximal_degree_vertex` | Existence of vertices achieving min/max degree. |
| `minDegree_le_degree`, `degree_le_maxDegree` | Extremal degree bounds. |
| `card_commonNeighbors_le_degree_left/right` | Common neighbors bounded by degrees of endpoints. |
| `Adj.card_commonNeighbors_lt_degree` | Strict inequality for common neighbors when vertices are adjacent. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `edgeFinset_`, `neighborFinset_`, `incidenceFinset_`: for finite-set versions of set-based constructs.
  - `degree_`: for degree-related lemmas.
  - `minDegree_`, `maxDegree_`: extremal degree properties.
  - `DeleteFar_`: for deletion-farness properties.
  - `card_`: for cardinality lemmas (e.g., `card_edgeFinset`, `card_neighborFinset_eq_degree`).
  - `commonNeighbors_`: for lemmas about common neighbors.

- **Suffixes**:
  - `_eq_degree`: equating cardinalities to `degree`.
  - `_le_degree`, `_lt_degree`: bounding degree or cardinalities.
  - `_iff`: characterizing equivalences (e.g., `deleteFar_iff`, `edgeFinset_inj`).
  - `_mono`, `_strict_mono`: monotonicity of `edgeFinset` w.r.t. graph inclusion.

- **Other patterns**:
  - `top`, `bot`: refer to complete (`⊤`) and empty (`⊥`) graphs.
  - `compl`: refers to complement graph.
  - `univ`: often used with `Finset.univ` over vertices.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` / `simp_rw` | Rewriting definitions, especially with `coe_`, `mem_`, `card_`, `Finset` lemmas. |
| `rw` | Rewriting using lemmas like `degree`, `edgeFinset`, `mem_neighborFinset`. |
| `ext` | Extensionality for set/finset equality. |
| `apply`, `exact`, `intro` | Basic proof structure. |
| `cases'`, `rcases` | Case analysis on existential or product types. |
| `have`, `obtain` | Intermediate lemma introduction. |
| `classical` | For classical reasoning (e.g., in `deleteFar_iff`, `degree_compl`). |
| `apply Finset.card_lt_card`, `apply Finset.card_le_card` | Cardinality comparisons. |
| `rw [Set.toFinset_card]` | Relating `Fintype.card` and `#Finset`. |
| `aesop` (implied by `gcongr`, `mono` attributes) | For monotonicity and simple goal solving. |
| `induction e using Sym2.induction_on` | Induction on symmetric pairs. |

---

#### **4. Proof Logic**

- **Inductive/structural reasoning**:
  - Proofs often rely on `Finset` extensionality (`ext`) and rewriting via `mem_` lemmas.
  - Induction on symmetric pairs (`Sym2`) for incidence/edge finset characterizations.

- **Cardinality arguments**:
  - Many proofs reduce to comparing sizes of subsets using:
    - `Finset.card_le_card`, `Finset.card_lt_card`
    - Disjointness (`disjoint_edgeFinset`, `disjoint_singleton_right`)
    - Union/intersection/sdiff identities (`card_union_of_disjoint`, `card_sdiff`)

- **Fintype/decidability management**:
  - Instances like `Fintype (G.neighborSet v)`, `DecidableRel G.Adj`, `DecidableEq V` are often introduced or assumed.
  - `Fintype.ofEquiv` used to transfer finiteness via equivalences (e.g., `incidenceSet ≃ neighborSet`).

- **Extremal principle**:
  - `minDegree`, `maxDegree` definitions use `Finset.min`, `Finset.max` over `univ.image degree`.
  - Proofs of extremality use `mem_image`, `min_of_nonempty`, `max_of_nonempty`.

- **Combinatorial reasoning**:
  - Edge counts in complete graphs via `Sym2.card_subtype_not_diag`.
  - Common neighbor bounds via subset relations (`commonNeighbors_subset_neighborSet_left`).

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.Order.Ring.Defs` | For `OrderedRing`, used in `DeleteFar` over a ring `𝕜`. |
| `Mathlib.Combinatorics.SimpleGraph.Basic` | Core graph definitions (`SimpleGraph`, `edgeSet`, `neighborSet`, `incidenceSet`, `Adj`, `compl`, `deleteEdges`, etc.). |
| `Mathlib.Data.Finset.Max` | For `min_of_nonempty`, `max_of_nonempty`, extremal finset operations. |
| `Mathlib.Data.Sym.Card` | For `Sym2`, `IsDiag`, cardinality lemmas on symmetric powers. |

---

### Summary

This module formalizes **finite combinatorial graph theory** in Lean 4, focusing on:
- **Finite representations** of graph sets (`edgeFinset`, `neighborFinset`, `incidenceFinset`)
- **Locally finite graphs** and degree analysis
- **Extremal degree properties** (min/max degree, regularity)
- **Edge-deletion distance** to graph properties (`DeleteFar`)
- **Cardinality bounds**, especially for complete graphs and common neighbors.

It leverages `Finset`, `Fintype`, and decidability assumptions to bridge set-theoretic definitions with finite computation-friendly representations.