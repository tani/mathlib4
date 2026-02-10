### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**
| Name | Type | Purpose |
|------|------|---------|
| `SimpleGraph.sum` | `SimpleGraph α → SimpleGraph β → SimpleGraph (α ⊕ β)` | Constructs the *disjoint sum* of two graphs over the disjoint union of their vertex types. Adjacency is defined component-wise via `Sum.inl`/`Sum.inr`. |
| `infixl " ⊕g "` | Notation declaration | Introduces `G ⊕g H` as syntactic sugar for `SimpleGraph.sum G H`. |
| `Iso.sumComm` | `G ⊕g H ≃g H ⊕g G` | Proves commutativity of disjoint sum up to graph isomorphism, using `Equiv.sumComm`. |
| `Iso.sumAssoc` | `(G ⊕g H) ⊕g I ≃g G ⊕g (H ⊕g I)` | Proves associativity of disjoint sum up to graph isomorphism, using `Equiv.sumAssoc`. |
| `Embedding.sumInl` | `G ↪g G ⊕g H` | Embeds `G` as the left component in the disjoint sum. |
| `Embedding.sumInr` | `H ↪g G ⊕g H` | Embeds `H` as the right component in the disjoint sum. |

#### 2. **Naming Conventions**
- **Prefixes**:
  - `sum`: Indicates construction or property related to disjoint sum (`sumComm`, `sumAssoc`, `sumInl`, `sumInr`).
- **Suffixes**:
  - `Comm`, `Assoc`: Denote algebraic properties (commutativity, associativity) up to isomorphism.
  - `Inl`, `Inr`: Reflect injection into left/right summands (mirroring `Sum.inl`, `Sum.inr`).
- **`Iso.` namespace**: Used for graph isomorphisms derived from underlying equivalences.
- **`Embedding.` namespace**: Used for graph embeddings (injective homomorphisms with full relation reflection).

#### 3. **Tactic Stack**
- `cases`: Dominant tactic for case analysis on `Sum`-typed variables (`u`, `v`).
- `simp`: Heavily used for simplification, especially with `@[simps!]` attributes and `simp` lemmas for `sum`, `sumInl`, `sumInr`.
- `intro`, `rename_i`: Used in `Iso.sumAssoc` to manage dependent case analysis.
- `id`: Used trivially in `symm` proof for cross-sum cases (`Sum.inl` vs `Sum.inr`).
- `by cases u <;> cases v <;> simp`: Recurring pattern for verifying adjacency preservation under isomorphisms.

#### 4. **Proof Logic**
- **Structure**: Proofs rely on *case analysis* on the sum type (`α ⊕ β`, `(α ⊕ β) ⊕ γ`, etc.), leveraging the definition of `Adj` in `sum`.
- **Isomorphism proofs** (`sumComm`, `sumAssoc`):
  - Construct underlying equivalence (`Equiv.sumComm`, `Equiv.sumAssoc`).
  - Prove adjacency preservation by exhaustive case analysis on inputs, reducing to `G.Adj`/`H.Adj` or `false`.
- **Embedding proofs** (`sumInl`, `sumInr`):
  - Define injective functions via `Sum.inl`/`Sum.inr`.
  - Use `simp` to verify injectivity and full relation reflection (`map_rel_iff'`).
- **Looplessness**: Proven by `cases u <;> simp`, using `loopless` of summands.

#### 5. **Imports**
- `Mathlib.Combinatorics.SimpleGraph.Basic`: Core graph definitions (`SimpleGraph`, `Adj`, `symm`, `loopless`).
- `Mathlib.Combinatorics.SimpleGraph.Maps`: Graph homomorphisms, embeddings, and isomorphisms (`Embedding`, `Iso`, `≃g`, `↪g`).

---

**Domain-Specific AI Agent Guidance**:  
This module formalizes a foundational *coproduct* in the category of simple graphs. The agent should prioritize:
- Case analysis on sum types for proofs.
- Leveraging `@[simps!]` to auto-generate simplification lemmas.
- Mapping algebraic properties (commutativity/associativity) to categorical isomorphisms.
- Using `Equiv`-based constructions for graph isomorphisms.