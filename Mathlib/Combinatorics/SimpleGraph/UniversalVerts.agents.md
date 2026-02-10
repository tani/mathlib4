### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `universalVerts` | `G.universalVerts : Set V` | Defines the set of vertices adjacent to *all* other distinct vertices: `v ∈ G.universalVerts ↔ ∀ w ≠ v, G.Adj w v`. |
| `deleteUniversalVerts` | `G.deleteUniversalVerts : Subgraph G` | Constructs the subgraph obtained by deleting all universal vertices from `G`. |
| `isClique_universalVerts` | `G.IsClique G.universalVerts` | Proves that the set of universal vertices forms a *clique* (every pair is adjacent). |
| `Subgraph.IsMatching.exists_of_universalVerts` | `[Fintype V] → Disjoint G.universalVerts s → s.ncard ≤ G.universalVerts.ncard → ∃ t ⊆ G.universalVerts, ∃ M, M.verts = s ∪ t ∧ M.IsMatching` | A structural lemma used in Tutte’s theorem proofs: given a set `s` disjoint from universal vertices and no larger than the universal set, one can extend `s` with a subset `t` of universal vertices to form a matching. |

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `universalVerts`: descriptive, no special prefix.
  - `deleteUniversalVerts`: verb + noun (`delete` + `UniversalVerts`) — standard for graph modification operations.
- **Suffixes**:
  - `verts`: used in `Subgraph.verts`, indicating vertex set projection.
  - `ncard`: used for cardinality of sets in `Set` (e.g., `s.ncard`, `G.universalVerts.ncard`), consistent with Mathlib’s `Set.natCard`.
- **Adjectives**:
  - `isClique_`: predicate-style naming for properties of sets (`isClique_universalVerts`).
  - `exists_of_`: used for existence lemmas built from assumptions (`exists_of_universalVerts`).

---

#### 3. **Tactic Stack**

- **Core tactics**:
  - `obtain ⟨t, ht⟩ := ...`: destructuring existential/universal quantifiers and products.
  - `refine ⟨t, ht.1, ?_⟩`: constructing witnesses and leaving goals for later.
  - `rw [← Cardinal.eq, ...]`: cardinal arithmetic rewrites using `Set.cast_ncard`, `ncard`.
  - `have hadj (v : s) : G.Adj v (f v) := ...`: local proof construction inside a lambda.
  - `exact ...`: final step for matching existence.
- **Library tactics**:
  - `simp_rw` (implied via `simps!` attribute on `deleteUniversalVerts`).
  - `aesop` not used here (proofs are mostly manual/constructive).
  - `ring` not used (no arithmetic simplification beyond cardinal equalities).

---

#### 4. **Proof Logic**

- **Structure**:
  - **Existential decomposition**: Use `Set.exists_subset_card_eq` to extract a subset `t ⊆ G.universalVerts` with matching cardinality to `s`.
  - **Equivalence construction**: From equal cardinalities, build a bijection `f : s ≃ t`.
  - **Disjointness handling**: Derive disjointness of `s` and `t` from `Disjoint G.universalVerts s` and `t ⊆ G.universalVerts`.
  - **Matching construction**: Apply `Subgraph.IsMatching.exists_of_disjoint_sets_of_equiv`, which constructs a matching from disjoint sets and a bijection preserving adjacency.

- **Logical flow**:
  > Given disjoint `s` and universal vertices, and size constraint, extract `t ⊆ universalVerts` with `|s| = |t|`, lift bijection to adjacency via disjointness, and invoke matching-existence lemma.

---

#### 5. **Imports**

| Import | Role |
|--------|------|
| `Mathlib.Combinatorics.SimpleGraph.Clique` | Provides `IsClique`, foundational clique theory. |
| `Mathlib.Combinatorics.SimpleGraph.Matching` | Provides `IsMatching`, matching existence lemmas (e.g., `exists_of_disjoint_sets_of_equiv`). |

> **Domain**: Graph theory (specifically, simple graphs), with focus on structural decomposition relevant to matching theory (e.g., Tutte’s theorem).  
> **Mathlib version**: Uses modern features (`simps!`, `ncard`, `Set.disjoint_of_subset_left`), consistent with recent Mathlib (2024).