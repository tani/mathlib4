### Technical Brief: `boxProd` in `Mathlib.Combinatorics.SimpleGraph.Path`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `boxProd` | `SimpleGraph α → SimpleGraph β → SimpleGraph (α × β)` | Defines the **box (or Cartesian) product** of two simple graphs: adjacency holds iff one coordinate is adjacent and the other is equal. |
| `□` (infix) | `G □ H` | Notation for `boxProd G H`. |
| `boxProd_adj` | `(G □ H).Adj x y ↔ G.Adj x.1 y.1 ∧ x.2 = y.2 ∨ H.Adj x.2 y.2 ∧ x.1 = y.1` | Characterizes adjacency in the box product. |
| `boxProd_adj_left` | `(G □ H).Adj (a₁, b) (a₂, b) ↔ G.Adj a₁ a₂` | Restricts adjacency to moves in the `G`-factor (fixed second coordinate). |
| `boxProd_adj_right` | `(G □ H).Adj (a, b₁) (a, b₂) ↔ H.Adj b₁ b₂` | Restricts adjacency to moves in the `H`-factor (fixed first coordinate). |
| `boxProd_neighborSet` | `(G □ H).neighborSet x = G.neighborSet x.1 ×ˢ {x.2} ∪ {x.1} ×ˢ H.neighborSet x.2` | Describes the neighbor set of a vertex in the product as a disjoint union of “horizontal” and “vertical” neighbors. |
| `boxProdComm` | `G □ H ≃g H □ G` | Graph isomorphism showing commutativity of box product up to isomorphism (via `Equiv.prodComm`). |
| `boxProdAssoc` | `G □ H □ I ≃g G □ (H □ I)` | Graph isomorphism showing associativity up to isomorphism (via `Equiv.prodAssoc`). |
| `boxProdLeft b` | `G ↪g G □ H` | Embedding of `G` into the product at fixed `b : β`. |
| `boxProdRight a` | `H ↪g G □ H` | Embedding of `H` into the product at fixed `a : α`. |
| `Walk.boxProdLeft b` | `G.Walk a₁ a₂ → (G □ H).Walk (a₁, b) (a₂, b)` | Lifts walks in `G` to walks in `G □ H` (horizontal moves only). |
| `Walk.boxProdRight a` | `H.Walk b₁ b₂ → (G □ H).Walk (a, b₁) (a, b₂)` | Lifts walks in `H` to walks in `G □ H` (vertical moves only). |
| `Walk.ofBoxProdLeft` | `(G □ H).Walk x y → G.Walk x.1 y.1` | Projects walks in the product to walks in `G` (ignores vertical steps). Requires decidability. |
| `Walk.ofBoxProdRight` | `(G □ H).Walk x y → H.Walk x.2 y.2` | Projects walks in the product to walks in `H` (ignores horizontal steps). Requires decidability. |
| `Preconnected.boxProd` | `G.Preconnected → H.Preconnected → (G □ H).Preconnected` | Product of preconnected graphs is preconnected. |
| `Preconnected.ofBoxProdLeft` | `(G □ H).Preconnected → G.Preconnected` (requires `β` nonempty) | Factor of a preconnected product is preconnected. |
| `Preconnected.ofBoxProdRight` | `(G □ H).Preconnected → H.Preconnected` (requires `α` nonempty) | Symmetric to above. |
| `Connected.boxProd` | `G.Connected → H.Connected → (G □ H).Connected` | Product of connected graphs is connected. |
| `Connected.ofBoxProdLeft/Right` | `(G □ H).Connected → G.Connected / H.Connected` | Factors of a connected product are connected. |
| `boxProd_connected` | `(G □ H).Connected ↔ G.Connected ∧ H.Connected` | Full characterization of connectedness of the product. |
| `boxProdFintypeNeighborSet` | Instance | Constructs a fintype structure on neighbor sets of the product, assuming finiteness on factors. |
| `boxProd_neighborFinset` | Equality of neighbor *finsets* in the product. | Refines `boxProd_neighborSet` to finite sets. |
| `boxProd_degree` | `degree (G □ H) (a, b) = degree G a + degree H b` | Degree in the product is sum of degrees in factors. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `boxProd_*`: All definitions and theorems related to the box product.
  - `ofBoxProd_*`: Projection functions from walks in the product back to factor graphs.
  - `boxProd*_*`: Embedding/mapping functions *into* the product (e.g., `boxProdLeft`, `boxProdRight`, `boxProdComm`, `boxProdAssoc`).
- **Infix notation**:
  - `□` (U+25A1 WHITE SQUARE) for `boxProd`.
- **Suffixes**:
  - `_left` / `_right`: Indicate which factor is fixed or moved.
  - `_adj`: Adjacency characterizations.
  - `_neighborSet` / `_neighborFinset`: Neighborhood set descriptions.
  - `_degree`: Degree formulas.
  - `_connected` / `_preconnected`: Connectivity properties.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only`: Dominant use for simplifying `boxProd_adj`, `adj_comm`, `eq_comm`, `and_comm`, etc.
- `rw`: Rewriting with definitions and lemmas (e.g., `boxProd_adj`, `map_cons`, `ofBoxProdLeft`).
- `by_cases` / `by_contra` / `Or.by_cases`: Handling disjunctions in adjacency or walk steps.
- `congr_arg`: Proving injectivity of embeddings.
- `ext`: Extensionality for sets/functions (e.g., proving equality of neighbor sets).
- `convert_to`: Used in `boxProd_neighborFinset` to adjust fintype instances.
- `aesop`: Not explicitly used here, but `simp`-based automation suffices.
- `induction` / `cases`: Implicit in recursive definitions (e.g., `ofBoxProdLeft`, `ofBoxProdRight`).
- ` rfl`: For base cases in inductive proofs (e.g., `nil` walks).

---

#### **4. Proof Logic**

- **Structural Induction on Walks**: Proofs about `ofBoxProdLeft`, `ofBoxProdRight`, and their interaction with `boxProdLeft`/`boxProdRight` use induction on walks (`nil`, `cons'`).
- **Case Analysis on Adjacency**: Many proofs (e.g., `boxProd_adj_left`, `ofBoxProdLeft`) split on whether an edge comes from `G` or `H`.
- **Decidability Assumptions**: Projection lemmas require `DecidableEq` and `DecidableRel` to handle case splits on equality and adjacency.
- **Isomorphism Proofs**: For `boxProdComm`, `boxProdAssoc`, proofs reduce to verifying the underlying equivalence preserves adjacency — done via `simp` and logical rewrites.
- **Connectivity Arguments**:
  - *Forward direction* (`boxProd_connected.1`): Uses `ofBoxProdLeft`/`ofBoxProdRight` to extract walks in factors.
  - *Backward direction* (`boxProd_connected.2`): Constructs a walk in the product by concatenating a horizontal walk (via `boxProdLeft`) and a vertical walk (via `boxProdRight`).
- **Fintype/Finset Reasoning**: Uses `Fintype.ofEquiv`, `Finset.disjUnion`, and disjointness lemmas (`neighborFinset_disjoint_singleton`) to handle finite neighbor sets.

---

#### **5. Imports**

- **Primary dependency**:
  - `Mathlib.Combinatorics.SimpleGraph.Path`: Provides core graph theory infrastructure: `SimpleGraph`, `Walk`, `Preconnected`, `Connected`, `neighborSet`, `degree`, etc.
- **Implicit dependencies** (via `Mathlib` hierarchy):
  - `Mathlib.Data.Set.Basic`, `Mathlib.Data.Product`, `Mathlib.Data.Fintype.Basic`, `Mathlib.Data.Finset.Basic`, `Mathlib.Data.Equiv.Basic`.

---

#### **Summary**

This file formalizes the **Cartesian (box) product** of simple graphs in Lean 4, including:
- Fundamental structural properties (adjacency, neighborhoods, degrees),
- Universal properties (embeddings, projections),
- Walk-theoretic behavior (lifting and projecting walks),
- Connectivity characterizations (connected ⇔ both factors connected),
- Algebraic properties up to isomorphism (commutativity, associativity).

It exemplifies Lean’s strength in formalizing combinatorial constructions with precise type-theoretic control over finiteness, decidability, and structure-preserving maps.