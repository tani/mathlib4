### Technical Metadata Brief: Graph Cliques in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `SimpleGraph.IsClique` | `s : Set α → Prop` | Predicate: `s` is a clique iff all pairs in `s` are adjacent. |
| `SimpleGraph.IsNClique` | `n : ℕ → Finset α → Prop` | Predicate: `s` is an `n`-clique iff it’s a clique and `#s = n`. |
| `SimpleGraph.cliqueSet` | `n : ℕ → Set (Finset α)` | Set of all `n`-cliques (as sets). |
| `SimpleGraph.cliqueFinset` | `n : ℕ → Finset (Finset α)` | Finset of all `n`-cliques (when decidable). |
| `SimpleGraph.CliqueFree` | `n : ℕ → Prop` | Graph has **no** `n`-cliques. |
| `SimpleGraph.CliqueFreeOn` | `Set α → ℕ → Prop` | Graph has no `n`-cliques **contained in** a given set `s`. |
| `SimpleGraph.cliqueNum` | `ℕ` | Maximum size of a clique (clique number). |
| `SimpleGraph.IsMaximumClique` | `Finset α → Prop` | Clique of maximum possible size. |
| `SimpleGraph.IsMaximalClique` | `Set α → Prop` | Clique not properly contained in any larger clique. |

**Key Theorems:**
- `isClique_iff`: `G.IsClique s ↔ s.Pairwise G.Adj`
- `isClique_iff_induce_eq`: `G.IsClique s ↔ G.induce s = ⊤`
- `isNClique_iff`: `G.IsNClique n s ↔ G.IsClique s ∧ #s = n`
- `cliqueFree_iff`: `G.CliqueFree n ↔ IsEmpty ((⊤ : SimpleGraph (Fin n)) ↪g G)`
- `not_cliqueFree_iff`: `¬G.CliqueFree n ↔ Nonempty ((⊤ : SimpleGraph (Fin n)) ↪g G)`
- `cliqueFree_bot`: `(⊥ : SimpleGraph α).CliqueFree n` if `2 ≤ n`
- `cliqueFree_of_card_lt`: If `card α < n`, then `G.CliqueFree n`
- `maximumClique_card_eq_cliqueNum`: Size of any maximum clique = `cliqueNum G`
- `is3Clique_iff`: Characterizes 3-cliques via triples of mutually adjacent vertices.

---

#### **2. Naming Conventions**

- **Predicates**:  
  - `isClique`, `isNClique`, `cliqueFree`, `cliqueFreeOn`, `isMaximumClique`, `isMaximalClique`  
  - Prefix `is_` for properties of sets/cliques; `cliqueFree` for global absence of cliques.

- **Constructors / Data**:  
  - `cliqueSet`, `cliqueFinset`, `cliqueNum`, `IsMaximumClique` (structure), `IsNClique` (structure).

- **Embedding / Mapping lemmas**:  
  - `map`, `mono`, `mono'`, `replaceVertex`, `sup_edge`, `comap`, `card_le_cliqueNum`.

- **Equivalences / Characterizations**:  
  - `iff` suffix (e.g., `isClique_iff`, `isNClique_iff`, `cliqueFree_iff`, `cliqueFreeOn_two`).

- **Special cases**:  
  - `empty`, `singleton`, `pair`, `triple`, `bot`, `top`, `two`, `zero`, `one`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp_rw` — for rewriting using definitional equalities and lemmas.
- `rw` — for rewriting with equivalences and equalities.
- `exact`, `intro`, `cases`, `subst`, `by_cases`, `by_contra` — basic proof structure.
- `aesop` — for automated reasoning in graph adjacency and embedding contexts.
- `push_cast`, `ext`, `convert`, `apply_ite`, `set_ext` — for set/finset reasoning.
- `ring`, `linarith` — for arithmetic (e.g., cardinalities, inequalities).
- `exact?`, `decide` — for decidable instances (e.g., `decidable_of_iff'`).
- `obtain ⟨a, b, c, …⟩ :=` — destructuring existential or conjunctions.

---

#### **4. Proof Logic & Strategy**

- **Inductive / structural reasoning** on sets/cliques:
  - Use `isClique_insert`, `isClique_insert_of_not_mem`, `IsClique.insert` to build cliques incrementally.
  - Use `IsNClique.insert` to extend `n`-cliques by one vertex.

- **Embedding-based characterizations**:
  - Core equivalence: `¬G.CliqueFree n ↔ ∃ f : ⊤ ↪g G`.
  - Prove non–clique-freeness by constructing an embedding of `⊤` (complete graph on `n` vertices).
  - Prove clique-freeness by showing no such embedding exists.

- **Cardinality arguments**:
  - Use `card_le_cliqueNum`, `cliqueFree_of_card_lt`, `cliqueFree_bot`, `cliqueFreeOn_card_lt`.
  - Often combine with `Finset.card_le_card`, `card_mono`, `exists_subset_card_eq`.

- **Equational reasoning**:
  - Many lemmas are proven via `ext` + `simp` (e.g., `cliqueSet_zero`, `cliqueSet_one`, `cliqueFreeOn_two`).
  - Use `coe_injective`, `Set.ext`, `Finset.ext` to reduce to element-wise reasoning.

- **Case analysis**:
  - `s.subsingleton_or_nontrivial`, `le_or_lt n 1`, `eq_or_ne n 1`, `mt : t ∈ Set.range φ` — common branching points.

- **Decidability handling**:
  - `instance [DecidableEq α] [DecidableRel G.Adj]` used to make `IsClique`, `IsNClique` decidable.

---

#### **5. Imports & Scope**

**Primary imports**:
- `Mathlib.Combinatorics.SimpleGraph.Path` — for walks, cycles (used in `is3Clique_iff_exists_cycle_length_three`).
- `Mathlib.Combinatorics.SimpleGraph.Operations` — for `map`, `comap`, `replaceVertex`, `sup`, `induce`, etc.
- `Mathlib.Data.Finset.Pairwise` — for `Pairwise` and clique definitions.
- `Mathlib.Data.Fintype.Powerset` — for `powersetCard`, `card_powersetCard`.
- `Mathlib.Data.Nat.Lattice` — for `sSup`, `BddAbove`, `card_le_card`, etc.

**Domain scope**:
- **Combinatorics / Graph theory** (simple graphs, cliques, independence).
- **Finite combinatorics** (fintypes, finsets, cardinalities).
- **Order theory** (embeddings, monotonicity, lattices).
- **Logic / decidability** (constructive vs classical reasoning, decidability instances).

---

Let me know if you'd like a **diagram of dependencies**, **API cheat sheet**, or **refactoring suggestions** (e.g., dualizing to independent sets as in the TODO).