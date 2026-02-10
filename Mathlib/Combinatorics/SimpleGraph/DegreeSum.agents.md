### Technical Brief: Degree-Sum Formula and Handshaking Lemma in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `dart_fst_fiber` | `∀ v, {d : G.Dart | d.fst = v} = univ.image (G.dartOfNeighborSet v)` | Identifies the fiber over vertex `v` under the source map of darts as the image of neighbors via `dartOfNeighborSet`. |
| `dart_fst_fiber_card_eq_degree` | `#{d : G.Dart | d.fst = v} = G.degree v` | Shows that the size of the fiber over `v` equals the degree of `v`. |
| `dart_card_eq_sum_degrees` | `Fintype.card G.Dart = ∑ v, G.degree v` | Relates total number of darts to sum of degrees. |
| `Dart.edge_fiber` | `∀ d, {d' : G.Dart | d'.edge = d.edge} = {d, d.symm}` | Describes the fiber over an edge under the edge map: exactly two darts (forward and reverse). |
| `dart_edge_fiber_card` | `#{d : G.Dart | d.edge = e} = 2` (for `e ∈ G.edgeFinset`) | Confirms each edge has exactly two darts in its fiber. |
| `dart_card_eq_twice_card_edges` | `Fintype.card G.Dart = 2 * #G.edgeFinset` | Total darts = twice number of edges. |
| `sum_degrees_eq_twice_card_edges` | `∑ v, G.degree v = 2 * #G.edgeFinset` | **Degree-sum formula**: sum of degrees = twice number of edges. |
| `even_card_odd_degree_vertices` | `Even #{v | Odd (G.degree v)}` | **Handshaking lemma**: number of odd-degree vertices is even. |
| `odd_card_odd_degree_vertices_ne` | `Odd #{w | w ≠ v ∧ Odd (G.degree w)}` (given `Odd (G.degree v)`) | Removing one odd-degree vertex leaves an odd number of odd-degree vertices. |
| `exists_ne_odd_degree_of_exists_odd_degree` | `∃ w ≠ v, Odd (G.degree w)` (given `Odd (G.degree v)`) | If there's an odd-degree vertex, there's another distinct one. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `dart_`: properties about darts (e.g., `dart_fst_fiber`, `dart_card_eq_sum_degrees`)
  - `edge_`: edge-related constructions (e.g., `edge_fiber`, `edge_fiber_card`)
  - `card_`: cardinality statements (e.g., `card_eq_sum_card_fiberwise`, `card_erase_of_mem`)
  - `even_`, `odd_`: parity-related lemmas (e.g., `even_card_odd_degree_vertices`, `odd_card_odd_degree_vertices_ne`)
- **Suffixes**:
  - `_eq_degree`, `_eq_twice_card_edges`: equality to degree or twice edges
  - `_ne`: refers to excluding a specific vertex (`odd_card_odd_degree_vertices_ne`)
  - `_of_mem`, `_of_not_mem`: conditional cardinality simplifications (e.g., `card_insert_of_not_mem`)
- **Helper functions**:
  - `dartOfNeighborSet`: constructs a dart from a vertex and neighbor
  - `symm`: symmetry of darts
  - `edge`: map from dart to undirected edge (`Sym2 V`)

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp only [...]` | Simplification with precise lemmas (e.g., `mem_filter`, `mem_image`, `card_singleton`) |
| `rw [...]` | Rewriting using equalities (e.g., `sum_const_nat`, `card_erase_of_mem`) |
| `exact ...` / `apply ...` | Direct proof steps (e.g., `apply card_insert_of_not_mem`) |
| `induction'` | Structural induction (e.g., on `e : Sym2 V`) |
| `convert ...` | Goal-directed conversion (e.g., `convert congr_arg card d.edge_fiber`) |
| `ext` | Extensionality for set equality |
| `rcases ... with ⟨...⟩` | Destructuring existential/universal quantifiers |
| `omega` | Solving linear arithmetic goals (e.g., in `tsub_eq_of_eq_add`) |
| `simp only [true_and, mem_filter, mem_univ]` | Common simplifications for membership in filters/universals |
| `ZMod.natCast_self`, `ZMod.eq_zero_iff_even`, `ZMod.eq_one_iff_odd` | Arithmetic modulo 2 reasoning for parity |

---

#### **4. Proof Logic**

- **Degree-sum formula**:
  - Uses **fiber decomposition** of the dart set:
    - First, decompose darts by source vertex → sum of degrees.
    - Second, decompose darts by edge → 2-to-1 map → twice number of edges.
  - Combines via `card_eq_sum_card_fiberwise`.

- **Handshaking lemma**:
  - Reduces degree-sum modulo 2:
    - `∑ degree v ≡ 0 (mod 2)` since RHS = `2 * #edges`.
    - LHS mod 2 = sum of `degree v mod 2` = number of odd-degree vertices mod 2.
    - Hence, number of odd-degree vertices ≡ 0 mod 2 ⇒ even.

- **Odd-degree vertex implies another**:
  - From handshaking lemma: total odd-degree vertices even.
  - Removing one odd-degree vertex leaves odd count ⇒ nonempty ⇒ existence of another.

- **Key logical flow**:
  - **Combinatorial fiber counting** → **cardinality identities** → **modular arithmetic** → **parity consequences**.

---

#### **5. Imports**

| Module | Role |
|--------|------|
| `Mathlib.Algebra.BigOperators.Ring` | Summation over finite types, ring homomorphism properties (e.g., `natCast`, `ZMod`) |
| `Mathlib.Combinatorics.SimpleGraph.Dart` | Definition of darts (`G.Dart`), source/target/edge maps, symmetry |
| `Mathlib.Combinatorics.SimpleGraph.Finite` | Finiteness assumptions (`Fintype V`), edge finset (`G.edgeFinset`) |
| `Mathlib.Data.ZMod.Basic` | Arithmetic modulo 2, parity lemmas (`even`, `odd`, `ZMod.eq_zero_iff_even`) |

---

### Summary

This formalization presents a clean, combinatorial proof of the degree-sum formula and handshaking lemma using **dart-based fiber counting**, avoiding adjacency matrix or induction-heavy approaches. It leverages Lean’s `Finset` and `Fintype` infrastructure for finite cardinality reasoning, and `ZMod 2` for parity arguments. The structure is modular, with intermediate lemmas supporting both the main theorems and corollaries like the existence of a second odd-degree vertex.