### Technical Brief: `Mathlib.Data.Digraph`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Digraph V` | `Type u → Type u` (structure) | Represents a directed graph on vertex type `V` as a binary relation `Adj : V → V → Prop`. |
| `Digraph.mk'` | `(V → V → Bool) ↪ Digraph V` | Embedding of decidable boolean adjacency functions into digraphs; used for finite constructions. |
| `Digraph.completeDigraph V` | `Digraph V` | The *complete* digraph: all ordered pairs are adjacent (including self-loops). |
| `Digraph.emptyDigraph V` | `Digraph V` | The *empty* digraph: no edges at all (`Adj _ _ := False`). |
| `Digraph.completeBipartiteGraph V W` | `Digraph (Sum V W)` | Digraph on disjoint union where edges go only across partitions. |
| `Digraph.IsSubgraph G H` | `G ≤ H` | Spanning subgraph relation: `∀ v w, G.Adj v w → H.Adj v w`. |
| `G ⊔ H`, `G ⊓ H` | `Digraph V` | Supremum (union of edges) and infimum (intersection of edges). |
| `Gᶜ` | `Digraph V` | Complement digraph: `Adj v w ↔ ¬G.Adj v w`. |
| `G \ H` | `Digraph V` | Edge difference: edges in `G` but not in `H`. |
| `sSup s`, `sInf s` | `Set (Digraph V) → Digraph V` | Arbitrary sup/inf over sets of digraphs (pointwise ∃/∀). |
| `instance distribLattice` | `DistribLattice (Digraph V)` | Lattice structure: `≤`, `⊔`, `⊓`. |
| `instance completeAtomicBooleanAlgebra` | `CompleteAtomicBooleanAlgebra (Digraph V)` | Full Boolean algebra structure on digraphs: complete, atomic, complemented, distributive. |
| `adj_injective` | `Injective Adj` | Injectivity of the adjacency map: digraphs are extensional. |
| `top_adj`, `bot_adj` | `(⊤).Adj v w`, `(⊥).Adj v w ↔ False` | Characterization of top/bottom elements. |
| `completeDigraph_eq_top`, `emptyDigraph_eq_bot` | `Digraph.completeDigraph V = ⊤`, etc. | Identification of named constructors with lattice top/bot. |
| `instance Fintype (Digraph V)` | `[DecidableEq V] [Fintype V] ⇒ Fintype (Digraph V)` | Finiteness of digraphs when vertices are finite and decidable. |
| `instance Unique (Digraph V)` | `[IsEmpty V] ⇒ Unique (Digraph V)` | Only one digraph on empty vertex set. |
| `instance Nontrivial (Digraph V)` | `[Nonempty V] ⇒ Nontrivial (Digraph V)` | At least two distinct digraphs when vertices are nonempty. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `complete*`: Full digraphs (e.g., `completeDigraph`, `completeBipartiteGraph`).
  - `empty*`: Edgeless digraphs (`emptyDigraph`).
  - `mk'`: Boolean-based constructor.
- **Suffixes**:
  - `adj`: Relational properties (e.g., `sup_adj`, `inf_adj`, `compl_adj`, `sdiff_adj`, `iSup_adj`, `sSup_adj`).
  - `Decidable`: Instances for decidability (e.g., `Bot.adjDecidable`, `Sup.adjDecidable`).
- **Operators**:
  - `⊔`, `⊓`, `ᶜ`, `\`, `≤`, `⊤`, `⊥`: Standard lattice/Boolean algebra notation.
- **Predicates**:
  - `IsSubgraph`: Subgraph relation (used as `≤`).
  - `Adj`: Core relation field.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs and instance constructions:

| Tactic | Usage |
|--------|-------|
| `simp_rw` | Rewriting with `iff`-equivalences (e.g., `simp_rw [mk.injEq]`). |
| `ext` / `ext1` | Extensionality for functions/relations/digraphs. |
| `congr` | Congruence for function equality. |
| `tauto` | Tautology solving for Boolean reasoning (e.g., `top_le_sup_compl`). |
| `intro` / `intro h` | Hypothesis introduction. |
| `exact`, `apply` | Direct proof steps. |
| `by simp` / `by aesop` | Simplification-based automation (e.g., `iSup_adj`, `iInf_adj`). |
| `Classical.skolem` | Used in `iInf_iSup_eq` for classical choice. |
| `rintro` / `rintro ⟨…⟩` | Intro + destructuring of existentials/conjunctions. |
| `funext` | Function extensionality. |
| `simpa` | Simplify and discharge goal. |

---

#### **4. Proof Logic & Strategy**

- **Extensionality**: Most proofs rely on `Digraph.ext` (or `adj_inj`) to reduce equality of digraphs to equality of their adjacency relations.
- **Pointwise reasoning**: All operations (`⊔`, `⊓`, `ᶜ`, `\`, `sSup`, `sInf`) are defined pointwise, so proofs about them reduce to logical reasoning on `Adj v w`.
- **Lattice/Boolean algebra proofs**:
  - Use lattice axioms lifted via `distribLattice` and `completeAtomicBooleanAlgebra`.
  - Many properties (e.g., `inf_compl_le_bot`, `top_le_sup_compl`) are verified by `tauto` or simple logic.
- **Finite constructions**:
  - `Fintype (Digraph V)` uses `Fintype.ofBijective` with `mk'` as the bijection.
  - `Unique`/`Nontrivial` rely on `ext` and case analysis on vertex emptiness/nonemptiness.
- **Decidability**:
  - Instances are derived via `inferInstanceAs` and `DecidableRel` typeclass inference.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Order.CompleteBooleanAlgebra` | Provides `CompleteAtomicBooleanAlgebra` typeclass and lattice theory infrastructure. |
| `Mathlib.Data.Fintype.Pi` | Used for finite type constructions (e.g., `Fintype.ofBijective`, `Fintype (Digraph V)`). |

**Scope**: This module formalizes the *lattice of spanning subgraphs* of the complete digraph on `V`, treating digraphs as arbitrary binary relations (allowing self-loops and asymmetry). It is structurally equivalent to `Quiver V` but treats digraphs as *values* (not classes), enabling lattice-theoretic reasoning over all digraphs on `V`.

--- 

Let me know if you'd like a diagram of the lattice structure or a summary of how this compares to `SimpleGraph`.