Here's a structured technical metadata brief extracted from the provided Lean 4 file on **Turán’s theorem**:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsTuranMaximal r` | `SimpleGraph V → ℕ → Prop` | `G.IsTuranMaximal r` means `G` is `(r+1)`-cliquefree and has the maximum number of edges among all such graphs on the same vertex set. |
| `turanGraph n r` | `ℕ → ℕ → SimpleGraph (Fin n)` | The canonical Turán graph: vertices are `Fin n`, adjacency is `v % r ≠ w % r`. It is `(r+1)`-cliquefree. |
| `IsTuranMaximal.finpartition` | `[DecidableEq V] → Finpartition (univ : Finset V)` | From Zykov symmetrisation: parts are equivalence classes of non-adjacency in a Turán-maximal graph. |
| `IsTuranMaximal.nonempty_iso_turanGraph` | `Nonempty (G ≃g turanGraph (Fintype.card V) r)` | Forward direction of Turán’s theorem: any Turán-maximal graph is isomorphic to `turanGraph n r`. |
| `isTuranMaximal_of_iso` | `(G ≃g turanGraph n r) → 0 < r → G.IsTuranMaximal r` | Reverse direction: any graph isomorphic to `turanGraph n r` (with `r > 0`) is Turán-maximal. |
| `isTuranMaximal_iff_nonempty_iso_turanGraph` | `0 < r → (G.IsTuranMaximal r ↔ Nonempty (G ≃g turanGraph n r))` | Full statement of Turán’s theorem: Turán-maximality ⇔ isomorphism to `turanGraph n r`. |
| `IsTuranMaximal.equivalence_not_adj` | `Equivalence (¬G.Adj · ·)` | Non-adjacency is an equivalence relation in a Turán-maximal graph (key step in Zykov symmetrisation). |
| `IsTuranMaximal.isEquipartition` | `h.finpartition.IsEquipartition` | Parts of the finpartition induced by non-adjacency have equal size. |
| `IsTuranMaximal.card_parts` | `#h.finpartition.parts = min (Fintype.card V) r` | Number of parts in the equipartition equals `min(n, r)`. |
| `IsTuranMaximal.degree_eq_card_sub_part_card` | `G.degree s = Fintype.card V - #h.finpartition.part s` | Degree formula in terms of part size. |
| `turanGraph_cliqueFree` | `0 < r → (turanGraph n r).CliqueFree (r + 1)` | `turanGraph n r` is `(r+1)`-cliquefree. |
| `not_cliqueFree_of_isTuranMaximal` | `r ≤ Fintype.card V → G.IsTuranMaximal r → ¬G.CliqueFree r` | A Turán-maximal graph cannot be `r`-cliquefree if it has enough vertices. |
| `exists_isTuranMaximal` | `0 < r → ∃ H, H.IsTuranMaximal r` | Existence of a Turán-maximal graph (via extremal principle). |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `isTuranMaximal_`: properties of Turán-maximal graphs (e.g., `isTuranMaximal_of_iso`, `isTuranMaximal_turanGraph`).
  - `turanGraph_`: properties of the Turán graph (e.g., `turanGraph_zero`, `turanGraph_cliqueFree`).
  - `degree_eq_`, `card_parts`, `not_adj_`: structural lemmas about Turán-maximal graphs.
- **Suffixes**:
  - `_iff_`: characterisations (e.g., `isTuranMaximal_iff_nonempty_iso_turanGraph`).
  - `_trans`, `_symm`, `_refl`: used in equivalence proofs (e.g., `not_adj_trans`).
- **Pattern**:
  - `h.` used for local context (e.g., `h.equivalence_not_adj`).
  - `fp`, `zm`, `zp`, `z` used for intermediate constructions (e.g., `fp := h.finpartition`, `zm` for part-preserving equiv).

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp_rw`, `simp`, `rw`: heavy use of simplification and rewriting, especially with `Fin`, `mod`, `card`, `adj`.
- `ext`: extensionality for graphs, functions, sets.
- `cases`, `rcases`, `obtain`: destructuring existential/and hypotheses.
- `by_contra`, `push_neg`: for negation handling (e.g., proving non-cliquefreeness).
- `omega`: arithmetic reasoning (especially in edge-count comparisons).
- `convert`, `congr`: for equational reasoning with structure (e.g., edge counts, degrees).
- `aesop`: likely used in background automation (not explicit here, but `omega` and `simp` dominate).
- `exact`, `assumption`, `intro`, `intro!`: standard natural deduction.

---

### **4. Proof Logic**

- **Forward direction (Zykov symmetrisation)**:
  1. Show non-adjacency is an equivalence relation (`equivalence_not_adj`).
  2. Induce a finpartition from this relation (`finpartition`).
  3. Prove parts are equipartition (`isEquipartition`) and count them (`card_parts`).
  4. Construct an equivalence preserving parts (`partPreservingEquiv`).
  5. Show this equivalence is a graph isomorphism to `turanGraph n r`.

- **Reverse direction**:
  1. Prove existence of *some* Turán-maximal graph (`exists_isTuranMaximal`).
  2. Use forward direction to get an isomorphism from that graph to `turanGraph`.
  3. Transfer Turán-maximality across isomorphisms (`isTuranMaximal_of_iso`, `IsTuranMaximal.iso`).

- **Key lemmas**:
  - `degree_eq_of_not_adj`: non-adjacent vertices have equal degree (used to prove transitivity).
  - `not_adj_trans`: transitivity of non-adjacency (via degree equality and replacement).
  - `isEquipartition`: equal part sizes (via contradiction + vertex replacement).
  - `card_parts`: number of parts = `min(n, r)` (via pigeonhole and clique arguments).

---

### **5. Imports**

- `Mathlib.Combinatorics.SimpleGraph.Clique`: defines cliques, cliquefreeness, `cliqueFree`, `IsNClique`, `cliqueFinset`.
- `Mathlib.Order.Partition.Equipartition`: provides `Finpartition`, `IsEquipartition`, `ofSetoid`, `partPreservingEquiv`.

These imports define the core combinatorial and order-theoretic infrastructure used in the formalisation.

---

Let me know if you'd like a dependency graph or a summary of the proof strategy in natural language.