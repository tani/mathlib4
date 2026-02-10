### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `toSimpleGraphInclusive` | `Digraph V → SimpleGraph V` | Forgets orientation by including an undirected edge if *either* direction exists in the digraph. |
| `toSimpleGraphStrict` | `Digraph V → SimpleGraph V` | Forgets orientation only if *both* directions exist (i.e., symmetric edges). Enforces looplessness via `v ≠ w`. |
| `toSimpleGraphStrict_subgraph_toSimpleGraphInclusive` | `G.toSimpleGraphStrict ≤ G.toSimpleGraphInclusive` | Shows strict orientation-forgetting yields a subgraph of inclusive one. |
| `toSimpleGraphInclusive_mono` | `Monotone toSimpleGraphInclusive` | Inclusive map preserves subgraph ordering. |
| `toSimpleGraphStrict_mono` | `Monotone toSimpleGraphStrict` | Strict map also preserves subgraph ordering. |
| `toSimpleGraphInclusive_top` | `(⊤ : Digraph V).toSimpleGraphInclusive = ⊤` | Top digraph (complete, with all possible directed edges) maps to top simple graph. |
| `toSimpleGraphStrict_top` | `(⊤ : Digraph V).toSimpleGraphStrict = ⊤` | Same for strict map — top digraph maps to top simple graph. |
| `toSimpleGraphInclusive_bot` | `(⊥ : Digraph V).toSimpleGraphInclusive = ⊥` | Bottom digraph (no edges) maps to bottom simple graph. |
| `toSimpleGraphStrict_bot` | `(⊥ : Digraph V).toSimpleGraphStrict = ⊥` | Same for strict map. |

#### 2. **Naming Conventions**
- **Prefixes**:
  - `toSimpleGraph*`: Indicates conversion *from* `Digraph` *to* `SimpleGraph`.
- **Suffixes**:
  - `Inclusive`: Includes edges if *at least one* orientation exists.
  - `Strict`: Requires *both* orientations.
- **Predicate-style names**:
  - `mono` suffix for monotonicity lemmas.
  - `subgraph` in `*_subgraph_*` for subgraph relations.

#### 3. **Tactic Stack**
- `ext`: Extensionality to prove graph equality.
- `tauto`: For propositional logic simplifications (e.g., handling `v ≠ w` and contradictions).
- `exact`, `intro`, `apply`, `cases`: Standard proof structure.
- `symm`, `rfl`: For symmetry and reflexivity in equality reasoning.
- `And.intro`, `Or.inl`, `Or.inr`: Manual handling of conjunctions/disjunctions in definitions.
- `fun _ _ h ↦ ...`: Lambda-style intro for graph adjacency proofs.

#### 4. **Proof Logic**
- **Equality proofs** (`ext` + `⟨...⟩`): Prove graph equality by showing adjacency relations are logically equivalent.
- **Monotonicity proofs**: Assume edge inclusion in digraphs (`h₁`), then show induced simple graph adjacency inclusion (`h₂`) using cases on disjunctions (`Or.inl`, `Or.inr`) or conjunctions.
- **Subgraph proofs**: Use `fun _ _ h ↦ ⟨...⟩` to unpack strict adjacency into inclusive adjacency.
- **Top/Bottom cases**: Use `ext` + `tauto` or `False.elim` to handle edge existence/non-existence.

#### 5. **Imports**
- `Mathlib.Combinatorics.Digraph.Basic`: Core digraph definitions (`Digraph`, `Adj`, `⊤`, `⊥`, subgraph order `≤`).
- `Mathlib.Combinatorics.SimpleGraph.Basic`: Core simple graph definitions (`SimpleGraph`, `fromRel`, `Adj`, `⊤`, `⊥`, subgraph order).

---

This module formalizes *orientation-forgetting functors* between digraphs and simple graphs, focusing on two canonical constructions and their basic lattice-theoretic properties. It sets the stage for further work on orientations (e.g., tournaments, orientations of undirected graphs), as indicated in the `TODO`.