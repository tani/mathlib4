### Technical Metadata Brief: `SimpleGraph.TripartiteFromTriangles`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Rel t` | `α ⊕ β ⊕ γ → α ⊕ β ⊕ γ → Prop` | Underlying symmetric, irreflexive relation for the tripartite graph: two vertices are related iff they appear together in some triangle index `(a, b, c) ∈ t`. |
| `graph t` | `SimpleGraph (α ⊕ β ⊕ γ)` | The constructed simple graph from triangle indices `t`. |
| `ExplicitDisjoint t` | `Prop` | Predicate ensuring that for each pair of coordinates (e.g., fixed `b, c`), at most one `a` appears in `t`. Ensures edge-disjointness of explicit triangles. |
| `NoAccidental t` | `Prop` | Predicate ensuring that any triangle in `graph t` must come from a single index in `t`; i.e., no “accidental” triangles formed by mixing indices. |
| `toTriangle x` | `α × β × γ ↪ Finset (α ⊕ β ⊕ γ)` | Embedding mapping a triangle index `x = (a, b, c)` to the 3-element set `{in₀ a, in₁ b, in₂ c}` — the explicit triangle. |
| `toTriangle_is3Clique hx` | `(graph t).IsNClique 3 (toTriangle x)` | Shows that each image of `toTriangle` is a 3-clique in `graph t`. |
| `is3Clique_iff [NoAccidental t]` | `(graph t).IsNClique 3 s ↔ ∃ x ∈ t, toTriangle x = s` | Characterizes all 3-cliques as exactly the explicit triangles when `NoAccidental t` holds. |
| `cliqueSet_eq_image [NoAccidental t]` | `(graph t).cliqueSet 3 = toTriangle '' t` | Equality of the set of 3-cliques with the image of `t` under `toTriangle`. |
| `map_toTriangle_disjoint [ExplicitDisjoint t]` | `Pairwise (λ x y ↦ x ∩ y.Subsingleton)` on `t.map toTriangle` | Explicit triangles are pairwise edge-disjoint (i.e., share at most one vertex). |
| `locallyLinear [ExplicitDisjoint t] [NoAccidental t]` | `(graph t).LocallyLinear` | The graph is *locally linear*: every edge lies in a unique triangle. |
| `farFromTriangleFree [ExplicitDisjoint t]` | Lower bound on triangle removal: if `#t` is large enough, the graph is far from triangle-free. | Used in Roth number lower bounds (Ruzsa–Szemerédi). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `in₀`, `in₁`, `in₂`: Injections from `α`, `β`, `γ` into `α ⊕ β ⊕ γ`.
  - `in₀₁`, `in₁₀`, etc.: Constructors of `Rel`, indicating adjacency between sum components.
  - `toTriangle`: Maps triangle indices to explicit triangles.
  - `ExplicitDisjoint`, `NoAccidental`: Predicate names for structural properties.

- **Suffixes**:
  - `_iff`, `_iff'`: Biconditional lemmas; `_iff'` versions use explicit existential quantification over `x : α × β × γ`.
  - `_eq_image`, `_eq_map`: Equalities involving images/maps of `toTriangle`.
  - `_disjoint`, `_surjOn`: Properties about disjointness or surjectivity.

- **Class names**:
  - `ExplicitDisjoint`, `NoAccidental`: Typeclass-style predicates (used for typeclass inference).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `cases`: On `Sum` or `Finset` membership hypotheses.
- `simp only [...]`: With precise lemmas (e.g., `in₀₁_iff`, `mem_insert`, `Prod.mk.inj_iff`).
- `exact`, `assumption`, `constructor`: For straightforward proof steps.
- `aesop`: For automated reasoning in set-theoretic and logical goals (e.g., in `map_toTriangle_disjoint`).
- `ext`: Extensionality for `Finset`.
- `push_cast`: To move between `ℕ` and `𝕜` in arithmetic contexts.
- `convert`: To align goals modulo definitional equality.
- `rw [cliqueSet_eq_image, coe_map]`: Rewriting using previously established equalities.

---

#### **4. Proof Logic**

- **Inductive definitions** (`Rel`, `graph`) are built from triangle indices.
- **Adjacency lemmas** (`in₀₁_iff`, etc.) are proven via `simp` + `constructor` or `decidable_of_iff'`.
- **Triangle structure lemmas** (`graph_triple`, `toTriangle_is3Clique`) use case analysis on `Sum` components.
- **Main structural results** (`is3Clique_iff`, `cliqueSet_eq_image`) rely on:
  - `graph_triple` to reorder arbitrary triangles into canonical form.
  - `NoAccidental` to force equality of indices.
- **Disjointness & linearity** (`map_toTriangle_disjoint`, `locallyLinear`) use:
  - `ExplicitDisjoint` to enforce uniqueness of coordinates.
  - Set-theoretic reasoning with `Finset` membership and intersection.
- **Cardinality & density arguments** (`card_triangles`, `farFromTriangleFree`) use:
  - `cliqueFinset_eq_map`, `card_map`, and inequalities over finite types.

---

#### **5. Imports**

- `Mathlib.Combinatorics.SimpleGraph.Triangle.Basic`: Provides foundational triangle-related definitions (e.g., `IsNClique`, `cliqueSet`, `FarFromTriangleFree`, `LocallyLinear`).
- `Finset`, `Function`, `Sum3`: Standard libraries used for finite sets, functions, and sum types.
- `[LinearOrderedField 𝕜]`: Required for quantitative statements (e.g., `farFromTriangleFree` over `𝕜`).

---

### Summary

This file formalizes a **graph construction from triangle indices**, central to applications in additive combinatorics (e.g., Roth numbers, corners theorem). It defines a tripartite graph on `α ⊕ β ⊕ γ` where edges correspond to pairs appearing in triangle indices, and studies when all triangles are *explicit* (`NoAccidental`) and *edge-disjoint* (`ExplicitDisjoint`). The key result is that under these conditions, the 3-cliques of the graph are in bijection with the triangle indices, and the graph is *locally linear*. These properties are leveraged to derive quantitative triangle removal lemmas and lower bounds for the Ruzsa–Szemerédi problem.