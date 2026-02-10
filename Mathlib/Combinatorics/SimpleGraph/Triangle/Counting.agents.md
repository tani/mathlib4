### Technical Metadata Brief: Triangle Counting Lemma in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `badVertices ε s t` | `Finset α` | Set of vertices in `s` whose edge density into `t` is *less than* `edgeDensity s t - ε`. Used to isolate "irregular" parts of the graph. |
| `card_interedges_badVertices_le` | `#(Rel.interedges G.Adj (badVertices G ε s t) t) ≤ ...` | Upper bounds the number of edges from `badVertices` to `t`. Crucial for bounding contribution of bad vertices. |
| `edgeDensity_badVertices_le` | `G.edgeDensity (badVertices G ε s t) t ≤ G.edgeDensity s t - ε` | Shows that the edge density from `badVertices` to `t` is at most `edgeDensity s t - ε`. Used in contradiction arguments. |
| `card_badVertices_le` | `#(badVertices G ε s t) ≤ #s * ε` | Bounds the size of `badVertices` under uniformity and density assumptions. Core to proving most of the triangle counting lemma. |
| `triangle_split_helper` | Subset inclusion | Shows that a certain union of images of `interedges` (over "good" vertices) lies inside the set of triangles in `s × t × u`. |
| `good_vertices_triangle_card` | Lower bound on triangle count per good vertex | For `x` not in any `badVertices`, lower-bounds the number of triangles `(x, y, z)` with `y ∈ t`, `z ∈ u`, using uniformity of `(t, u)`. |
| `triangle_counting'` | Main inequality for *ordered* triples | If `s,t,u` are pairwise `ε`-uniform and `2ε`-dense, then at least `(1 - 2ε)ε³|s||t||u|` ordered triples `(a,b,c) ∈ s×t×u` form triangles. |
| `triple_eq_triple_of_mem` | Injectivity on disjoint sets | If `s,t,u` are pairwise disjoint, then a 3-element set `{x,y,z}` with `x∈s, y∈t, z∈u` uniquely determines the ordered triple `(x,y,z)`. |
| `triangle_counting` | Final triangle counting lemma | Under same assumptions *plus disjointness*, the number of (unordered) triangles in `G.cliqueFinset 3` is at least `(1 - 2ε)ε³|s||t||u|`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `badVertices`: Descriptive naming for "bad" (non-uniform) vertices.
  - `good_vertices_triangle_card`: Combines `good_vertices` + `triangle_card` → describes count of triangles from good vertices.
- **Suffixes**:
  - `_le`: Inequality proofs (e.g., `card_badVertices_le`).
  - `_helper`: Supporting lemmas used in main proofs (e.g., `triangle_split_helper`).
- **Modifiers**:
  - `edgeDensity_...`: Relates to edge density computations.
  - `card_...`: Relates to cardinality bounds.
  - `interedges`: Refers to bipartite edge sets between two subsets.
- **Variable naming**:
  - `ε` (epsilon): Regularity parameter.
  - `s, t, u`: Vertex subsets.
  - `x, y, z`: Generic vertices.

---

#### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Role |
|--------|------|
| `simp_rw` | Rewriting with simplification (especially for `Finset` operations). |
| `linarith` | Solving linear inequalities over reals/naturals (e.g., bounding `ε`, densities). |
| `aesop` | Automated reasoning for first-order logic + arithmetic (used in injectivity arguments). |
| `ring` | Simplifying polynomial expressions (e.g., expanding `(1 - 2ε)ε³|s||t||u|`). |
| `push_cast` | Moving between `ℕ` and `ℝ` (e.g., casting cardinalities). |
| `exact_mod_cast` | Typeclass inference + cast for numeric inequalities. |
| `cases` / `obtain` | Extracting structure from hypotheses (e.g., `obtain ⟨-, hxY, hsu⟩ := hx`). |
| `rw [disjoint_left]` | Rewriting disjointness using logical quantifiers. |
| `filter_subset`, `subset_of_eq`, `card_le_card` | Set-theoretic reasoning for subsets and cardinalities. |

---

#### **4. Proof Logic**

- **Structure**:
  1. **Decomposition**: Partition `s` into *good* (`X'`) and *bad* vertices (those violating uniformity/density).
  2. **Bounding bad parts**: Show `badVertices` are small (`≤ ε|s|`) using uniformity (`card_badVertices_le`).
  3. **Counting triangles via good vertices**:
     - For each good `x ∈ X'`, use uniformity of `(t, u)` to guarantee many edges between neighbors of `x` in `t` and `u`.
     - Lower-bound triangle count per `x` (`good_vertices_triangle_card`).
  4. **Union bound**: Sum over all `x ∈ X'`, relate to total triangle count.
  5. **Disjointness → unordered triangles**: Use `triple_eq_triple_of_mem` to lift ordered triangle count to unordered (via injectivity of `{x,y,z}` mapping).

- **Key logical flow**:
  > *Assume uniformity & density → bound bad vertices → show most vertices contribute many triangles → sum → adjust for ordering.*

- **Induction?** None — purely combinatorial counting + set-theoretic inequalities.

---

#### **5. Imports & Scope**

| Import | Purpose |
|--------|---------|
| `Mathlib.Combinatorics.SimpleGraph.Clique` | Defines `cliqueFinset`, `isKCllique`, etc. Used for final triangle counting (`#(G.cliqueFinset 3)`). |
| `Mathlib.Combinatorics.SimpleGraph.Regularity.Uniform` | Defines `IsUniform ε s t`, edge density, and related lemmas. Core regularity theory. |
| `Mathlib.Data.Real.Basic` | Real numbers, arithmetic, inequalities. |
| `Mathlib.Tactic.Linarith` | Linear arithmetic solver for reals/naturals. |

**Domain**: Extremal graph theory — specifically, the *Triangle Counting Lemma*, a key step in Szemerédi’s Regularity Lemma formalization.

**Assumptions**:
- `DecidableRel G.Adj` (for definability of `badVertices`, `interedges`, etc.)
- `[DecidableEq α]` (for `Finset` operations like `filter`, `image`, `biUnion`)
- `[Fintype α]` (for finite cardinalities)

---

Let me know if you'd like a diagram of the proof structure or a Lean tactic trace for `triangle_counting`.