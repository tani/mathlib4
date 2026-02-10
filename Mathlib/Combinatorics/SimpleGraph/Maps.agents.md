### Technical Brief: Graph Morphisms and Induced Subgraphs in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `SimpleGraph.map` | `(f : V ↪ W) → SimpleGraph V → SimpleGraph W` | Pushes adjacency forward along an *injective* function `f`. |
| `SimpleGraph.comap` | `(f : V → W) → SimpleGraph W → SimpleGraph V` | Pulls adjacency backward along *any* function `f`. |
| `SimpleGraph.induce` | `s : Set V → SimpleGraph V → SimpleGraph s` | Restricts a graph to a subset `s` of vertices (wrapper around `comap`). |
| `SimpleGraph.spanningCoe` | `SimpleGraph s → SimpleGraph V` | Extends a graph on subset `s` to the full vertex set (wrapper around `map`). |
| `SimpleGraph.Hom` (`G →g H`) | `RelHom G.Adj H.Adj` | Graph homomorphism: preserves adjacency (not necessarily reflectively). |
| `SimpleGraph.Embedding` (`G ↪g H`) | `RelEmbedding G.Adj H.Adj` | Graph embedding: injective and *reflects* adjacency (image is induced subgraph). |
| `SimpleGraph.Iso` (`G ≃g H`) | `RelIso G.Adj H.Adj` | Graph isomorphism: bijective adjacency-preserving map. |
| `map_adj` | `(G.map f).Adj u v ↔ ∃ u' v', G.Adj u' v' ∧ f u' = u ∧ f v' = v` | Characterizes adjacency in mapped graph. |
| `map_adj_apply` | `(G.map f).Adj (f a) (f b) ↔ G.Adj a b` | Adjacency preserved under injective image. |
| `comap_adj` | `(G.comap f).Adj u v ↔ G.Adj (f u) (f v)` | Adjacency in comapped graph via preimage. |
| `comap_map_eq` | `(G.map f).comap f = G` | Left-inverse property for injective `f`. |
| `map_injective` | `Function.Injective (SimpleGraph.map f)` | `map f` is injective on graphs. |
| `comap_surjective` | `Function.Surjective (SimpleGraph.comap f)` | `comap f` is surjective when `f` is injective. |
| `map_le_iff_le_comap` | `G.map f ≤ G' ↔ G ≤ G'.comap f` | Adjunction between `map` and `comap`. |
| `induceUnivIso` | `G.induce Set.univ ≃g G` | Full induced subgraph is isomorphic to original. |
| `overFinIso` | `G ≃g G.overFin hc` | Any finite graph is isomorphic to one over `Fin n`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `map_`, `comap_`: denote pushforward/pullback constructions.
  - `induce_`, `spanningCoe_`: wrappers around `comap`/`map`.
  - `toHom`, `toEmbedding`, `toIso`: coercion to weaker morphism class.
  - `ofLE`: morphism induced by edge inclusion.

- **Suffixes**:
  - `_apply`: action on elements (e.g., `map_apply`, `comap_apply`).
  - `_iff`: biconditional characterizations (e.g., `map_adj_iff`, `map_mem_edgeSet_iff`).
  - `_symm`: inverse constructions (e.g., `comap_symm`, `map_symm`).
  - `_completeGraph`: embeddings/isos induced by type embeddings/isos on complete graphs.

- **Infix Notation**:
  - `→g`, `↪g`, `≃g` for homs, embeddings, isos respectively.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp` / `simp only` | Simplify using definitional equalities and lemmas (e.g., `map_adj`, `coe_id`). |
| `ext` | Extensionality for graphs (equality of graphs = equality of adjacency relations). |
| `rw` / `apply` | Rewriting with known equivalences or applying lemmas. |
| `intro` / `rintro` / `cases` | Standard intro/case analysis for logical structure. |
| `exact` / `assumption` | Immediate proof steps. |
| `convert` + `congr_fun` | Proving equality of functions/relations via pointwise equality. |
| `symmetry` / `convert rfl` | Handling symmetry of adjacency. |
| `aesop` (implied) | Used in `loopless`, `symm` proofs in `map` definition (commented as `obviously`). |
| `dsimp`, `simp only [Subtype.mk_eq_mk]` | Simplifying subtype equality. |

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - **Graph equality**: Prove via `ext` + `simp` or `simp only [map_adj, comap_adj]`.
  - **Morphism properties** (injectivity, surjectivity): Often reduce to properties of underlying functions via `leftInverse_comap_map`, `map_injective`, etc.
  - **Embeddings vs homs**: Use `map_rel_iff` (for embeddings) vs `map_rel'` (for homs).
  - **Induced subgraphs**: Use `induce`, `spanningCoe`, and lemmas like `induce_spanningCoe`, `spanningCoe_induce_le`.
  - **Finite graphs**: Use `overFin`, `overFinIso`, and `Fintype.card_eq`.

- **Common proof patterns**:
  - *Induction on structure*: Not typical here—proofs are mostly equational reasoning.
  - *Relational reasoning*: Heavy use of `RelHom`, `RelEmbedding`, `RelIso` lemmas.
  - *Subtype reasoning*: Many proofs involve `Subtype.mk`, `Subtype.mk_eq_mk`, and coercion simplifications.

---

#### **5. Imports & Scope**

- **Core imports**:
  ```lean
  import Mathlib.Combinatorics.SimpleGraph.Dart
  import Mathlib.Data.FunLike.Fintype
  import Mathlib.Logic.Embedding.Set
  ```
- **Scope**:
  - Graph theory in the context of *simple graphs* (undirected, loopless).
  - Morphisms defined via relational homomorphisms (`RelHom`, etc.).
  - Emphasis on categorical properties: adjunctions (`map` ⊣ `comap`), embeddings as *induced* subgraphs, finite graph normalization (`overFin`).
  - Supports darts (`G.Dart`), edge sets (`G.edgeSet`), neighbor sets (`G.neighborSet`).

---

### Summary

This file formalizes the foundational morphism theory of simple graphs in Lean 4, emphasizing:
- **Map/comap adjunction**,
- **Embeddings as induced subgraphs**,
- **Isomorphisms as structure-preserving bijections**,
- **Finite graph normalization**.

It leverages Mathlib’s relational homomorphism infrastructure (`RelHom`, `RelEmbedding`, `RelIso`) and provides a clean, extensible interface for graph-theoretic constructions.