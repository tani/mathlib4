Here's a structured technical metadata brief extracted from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `EdgeDisjointTriangles` | `SimpleGraph α → Prop` | Predicate stating each edge belongs to **at most one** triangle (i.e., 3-cliques intersect in at most one vertex). |
| `LocallyLinear` | `SimpleGraph α → Prop` | Predicate stating each edge belongs to **exactly one** triangle (i.e., edge-disjoint + coverage). |
| `FarFromTriangleFree` | `SimpleGraph α → 𝕜 → Prop` | A graph is *ε-far from triangle-free* if removing fewer than `ε * n²` edges cannot make it triangle-free (`n = card α`). |
| `cliqueFinset` | `SimpleGraph α → ℕ → Finset (Finset α)` | Finite set of all `k`-cliques (here `k = 3`). |
| `cliqueFree` | `SimpleGraph α → ℕ → Prop` | Graph has **no** `k`-cliques (here `k = 3`). |
| `deleteFar` | (general) | Standard notion of “far from satisfying a property P by edge deletions”. Used here with `P = CliqueFree 3`. |

#### Key Theorems:
| Name | Statement Summary |
|------|-------------------|
| `EdgeDisjointTriangles.card_edgeFinset_le` | If triangles are edge-disjoint, then `3 * #triangles ≤ #edges`. |
| `LocallyLinear.card_edgeFinset` | If graph is locally linear, then `#edges = 3 * #triangles`. |
| `farFromTriangleFree_of_disjoint_triangles` | If there are ≥ `ε·n²` *pairwise disjoint* triangles, then graph is `ε`-far from triangle-free. |
| `EdgeDisjointTriangles.farFromTriangleFree` | Special case of above when all triangles are edge-disjoint (hence disjoint). |
| `FarFromTriangleFree.lt_half` | If `G` is `ε`-far from triangle-free, then `ε < 1/2`. |
| `FarFromTriangleFree.nonpos` | If `G` is triangle-free and `ε`-far from triangle-free, then `ε ≤ 0`. |
| `FarFromTriangleFree.cliqueFinset_nonempty` | If `G` is `ε`-far from triangle-free and `ε > 0`, then `G` has at least one triangle. |

---

### **2. Naming Conventions**

- **Predicates**:  
  - `is_...`, `has_...`, `...Free`, `...Disjoint`, `...Linear`, `...FarFrom...`  
  - e.g., `LocallyLinear`, `EdgeDisjointTriangles`, `CliqueFree`, `FarFromTriangleFree`

- **Set/Finset operations**:  
  - `cliqueSet`, `cliqueFinset`, `edgeSet`, `edgeFinset`, `sym2`, `attach`, `sdiff`

- **Map/Embedding operations**:  
  - `map`, `comap`, `Embedding`, `Equiv`

- **Cardinality**:  
  - `card`, `#_`, `Finset.card`, `Fintype.card`

- **Logical helpers**:  
  - `mono`, `antisymm'`, `nonempty_of_ne_empty`, `not_and`, `not_not`, `exists_ne_map_eq_of_card_lt_of_maps_to`

- **Tactic-generated lemmas**:  
  - `instDecidable`, `mem_sym2_subsingleton`, `card_le_one`, etc.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp_rw` — for simplification with definitional equalities and lemmas.
- `aesop` — for automated reasoning with first-order logic and algebra.
- `rw` — rewriting using equalities/iff lemmas.
- `exact`, `refine`, `obtain`, `cases` — standard proof construction.
- `gcongr` — for congruence reasoning with inequalities (e.g., `ε ≤ ε'`).
- `norm_num`, `norm_cast` — numeric normalization and type casting.
- `pos` / `Positivity` — from `Mathlib.Tactic.Positivity`, for proving positivity.
- `decidable_of_iff`, `inferInstanceAs` — for decidability instances.
- `card_mono`, `card_le_card`, `card_mul_le_card_mul` — cardinality inequalities.
- `symmetry`, `convert`, `subst` — for equality reasoning.

---

### **4. Proof Logic**

- **Inductive/structural reasoning** on cliques and edges.
- **Double counting arguments**: e.g., counting pairs `(triangle, edge ∈ triangle)` in two ways.
- **Pigeonhole / injectivity arguments**: e.g., `exists_ne_map_eq_of_card_lt_of_maps_to` used to derive collisions in symmetric pairs.
- **Contrapositive reasoning**: many lemmas use `not_...` forms to derive contradictions.
- **Decidability handling**: explicit `DecidableEq α`, `DecidableRel` assumptions to enable finite counting.
- **Monotonicity & closure properties**: e.g., `EdgeDisjointTriangles.mono`, `map`, `comap` lemmas.
- **Bounding arguments**: e.g., `lt_half`, `lt_one`, `nonpos` — derive constraints on `ε`.

---

### **5. Imports & Scope**

#### Primary Imports:
- `Mathlib.Algebra.Order.Field.Basic` — ordered fields, used for `ε ∈ 𝕜`.
- `Mathlib.Algebra.Order.Ring.Abs` — absolute value and order properties.
- `Mathlib.Combinatorics.Enumerative.DoubleCounting` — double counting lemmas.
- `Mathlib.Combinatorics.SimpleGraph.Clique` — clique definitions and basic facts.
- `Mathlib.Data.Finset.Sym` — symmetric products (`Sym2`), essential for unordered pairs.
- `Mathlib.Tactic.GCongr`, `Mathlib.Tactic.Positivity` — for inequality reasoning.

#### Scope:
- Focuses on **simple graphs** (`SimpleGraph α`) over a finite type `α`.
- Uses **finite combinatorics** (`Finset`, `Fintype`, `DecidableEq`).
- Central theme: **triangle structure** and **stability under edge deletion**, leading toward the **Triangle Removal Lemma**.

---

Let me know if you'd like a diagram of dependencies or a formalization roadmap for the Triangle Removal Lemma.