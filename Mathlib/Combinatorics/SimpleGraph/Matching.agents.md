Here's a structured technical brief extracted from the provided Lean 4 file on **matchings in simple graphs**, focusing on definitions, naming conventions, proof tactics, logic flow, and dependencies.

---

### 🔹 **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsMatching` | `Subgraph G → Prop` | A subgraph `M` is a *matching* if every vertex in `M` is incident to **exactly one** edge in `M`. |
| `IsMatching.toEdge` | `M.IsMatching → M.verts → M.edgeSet` | Given a vertex in a matching, returns the unique edge incident to it. |
| `IsPerfectMatching` | `Subgraph G → Prop` | `M` is a *perfect matching* if it is a matching and spans all vertices (`M.IsSpanning`). |
| `IsMatchingFree` | `SimpleGraph V → Prop` | `G` has **no perfect matchings**. |
| `IsCycles` | `SimpleGraph V → Prop` | Every vertex has either 0 or exactly 2 neighbors (i.e., the graph is a disjoint union of cycles and isolated vertices). |
| `IsAlternating` | `SimpleGraph V → SimpleGraph V → Prop` | Edges of `G'` alternate with respect to `G`: for any vertex `v`, if `w ≠ w'` are neighbors of `v` in `G`, then exactly one of `w, w'` is adjacent to `v` in `G'`. |
| `IsMatching.even_card` | `M.IsMatching → Even M.verts.toFinset.card` | A matching has an even number of vertices (since they come in disjoint pairs). |
| `IsPerfectMatching.even_card` | `M.IsPerfectMatching → Even (Fintype.card V)` | A graph with a perfect matching must have even cardinality. |
| `IsPerfectMatching.symmDiff_spanningCoe_IsCycles` | `(M.IsPerfectMatching → M'.IsPerfectMatching → (M.spanningCoe ∆ M'.spanningCoe).IsCycles)` | Symmetric difference of two perfect matchings yields a graph where each connected component is a cycle. |
| `IsPerfectMatching.symmDiff_spanningCoe_of_isAlternating` | `(M.IsPerfectMatching → G'.IsAlternating M.spanningCoe → G'.IsCycles → (M.spanningCoe ∆ G').toSubgraph ... .IsPerfectMatching)` | If `G'` is alternating w.r.t. a perfect matching and consists of cycles, then `M ∆ G'` is again a perfect matching. |

---

### 🔹 **Naming Conventions**

- **Prefixes:**
  - `is_`: Predicate definitions (`IsMatching`, `IsPerfectMatching`, `IsMatchingFree`, `IsCycles`, `IsAlternating`)
  - `to_`: Construction functions returning canonical objects (`toEdge`)
  - `map`, `sup`, `iSup`, `induce`, `coeSubgraph`, `spanningCoe`: Standard subgraph operations
  - `other_`: Helper functions for cycle-related reasoning (`other_adj_of_adj`)

- **Suffixes:**
  - `_iff`: Characterization lemmas (`isMatching_iff_forall_degree`, `isPerfectMatching_iff`)
  - `_of_`: Implication or specialization lemmas (`even_card_of_isPerfectMatching`, `other_adj_of_adj`)
  - `_iff_not_`: Logical equivalences involving negation (`isMatching_iff_forall_degree` uses `degree_eq_one_iff_unique_adj`)

---

### 🔹 **Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `aesop` | Automated reasoning for basic logic, set membership, and graph adjacency |
| `simp` / `simp only` | Simplification using definitional equalities and lemmas (e.g., `simp only [isMatching_iff_forall_degree]`) |
| `rw` / `congr` | Rewriting using equalities, especially for subtype equality (`Subtype.mk_eq_mk`) |
| `cases'` / `cases` | Case analysis on disjunctions, unions, or existential quantifiers |
| `obtain` / `rintro` | Destructuring complex hypotheses or goals (e.g., `obtain ⟨v, hv, rfl⟩ := hv`) |
| `by_contra!` | Proof by contradiction (used in `odd_matches_node_outside`) |
| `convert_to` | Adjusting instance arguments for typeclass inference (e.g., `Fintype` for degrees) |
| `omega` | Arithmetic reasoning (e.g., for `ncard = 2` implications) |
| `exact`, `refine`, `use` | Goal construction and witness introduction |

---

### 🔹 **Proof Logic & Strategy**

- **Inductive/structural decomposition**: Proofs often proceed by:
  - Decomposing vertices into cases based on membership in supports or unions (`cases' hv with hl hr`)
  - Using uniqueness in `∃!` (e.g., `h v.property).choose_spec`) to reason about adjacency
  - Leveraging lattice operations on subgraphs (`sup`, `iSup`, `induce`, `coeSubgraph`)
- **Cardinality arguments**: Evenness of vertex sets is shown via degree sum formula (`sum_degrees_eq_twice_card_edges`) and `degree_eq_one_iff_unique_adj`.
- **Symmetric difference reasoning**: Key lemmas like `symmDiff_spanningCoe_IsCycles` rely on:
  - Uniqueness of matchings at each vertex
  - Case analysis on equality of matched partners (`by_cases hww' : w = w'`)
- **Connected component analysis**: Induction over components (`induce_connectedComponent`) and finiteness assumptions (`Finite V`, `Fintype`) are used to transfer global properties (e.g., evenness) to components.

---

### 🔹 **Imports & Dependencies**

| Module | Role |
|--------|------|
| `Mathlib.Combinatorics.SimpleGraph.DegreeSum` | Degree sum formula and related lemmas (used in `even_card`) |
| `Mathlib.Combinatorics.SimpleGraph.Connectivity.WalkCounting` | Connectivity and component machinery (e.g., `ConnectedComponent`, `induce`) |
| `Mathlib.Data.Fintype.Order` | Finiteness and ordering tools (e.g., `Fintype.card`, `Even`, `Odd`) |
| `Mathlib.Data.Set.Functor` | Set-theoretic operations (e.g., image, union, disjointness) |

---

### 🔹 **TODOs & Open Work**

- Define and reason about the `other` function mapping a vertex to its unique matching partner.
- Construct bicolorings for matchings (2-colorings of the support).
- Formalize **Tutte’s Theorem** and **Hall’s Marriage Theorem** (already partially covered in `Mathlib.Combinatorics.Hall.Basic`).

---

Let me know if you'd like this exported as a JSON schema or integrated into a domain model for an AI agent.