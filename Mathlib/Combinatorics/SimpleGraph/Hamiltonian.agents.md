### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsHamiltonian (p : G.Walk a b)` | `Prop` | Predicate stating that walk `p` visits every vertex exactly once (`∀ a, p.support.count a = 1`). |
| `IsHamiltonianCycle (p : G.Walk a a)` | `Structure` extending `p.IsCycle` | Predicate for a *Hamiltonian cycle*: a cycle whose tail is a Hamiltonian path. |
| `IsHamiltonian (G : SimpleGraph α)` | `Prop` | Graph `G` is Hamiltonian if it contains a Hamiltonian cycle (except for the singleton graph, which is Hamiltonian by convention). |
| `IsHamiltonian.map` | `(f : G →g H) → Bijective f → p.IsHamiltonian → (p.map f).IsHamiltonian` | Hamiltonian property preserved under bijective graph homomorphisms. |
| `IsHamiltonianCycle.map` | `(f : G →g H) → Bijective f → p.IsHamiltonianCycle → (p.map f).IsHamiltonianCycle` | Hamiltonian cycle property preserved under bijective homomorphisms. |
| `IsHamiltonian.length_eq` | `[Fintype α] → p.IsHamiltonian → p.length = Fintype.card α - 1` | Length of Hamiltonian path = #vertices − 1. |
| `IsHamiltonianCycle.length_eq` | `[Fintype α] → p.IsHamiltonianCycle → p.length = Fintype.card α` | Length of Hamiltonian cycle = #vertices. |
| `IsHamiltonianCycle.count_support_self` | `p.IsHamiltonianCycle → p.support.count a = 2` | In a Hamiltonian cycle, the start/end vertex appears twice in the support. |
| `IsHamiltonianCycle.support_count_of_ne` | `a ≠ b → p.IsHamiltonianCycle → p.support.count b = 1` | All other vertices appear exactly once in the support. |
| `IsHamiltonian.mono` | `G ≤ H → G.IsHamiltonian → H.IsHamiltonian` | Hamiltonicity is monotone w.r.t. edge addition. |
| `IsHamiltonian.connected` | `G.IsHamiltonian → G.Connected` | Hamiltonian graphs are connected. |

#### 2. **Naming Conventions**

- **Predicates**: `isHamiltonian`, `isHamiltonianCycle` — lowercase camelCase, prefixed with `is_`.
- **Structure fields**: `isHamiltonian_tail`, `toIsCycle` — descriptive, often referencing the underlying property.
- **Lemmas**: `IsHamiltonian.*`, `IsHamiltonianCycle.*` — capitalized, named after the predicate/structure.
- **Suffixes**:
  - `_eq`: for equalities involving cardinalities or lengths.
  - `_mem_support`: for membership lemmas in support.
  - `_count_*`: for lemmas about vertex counts in support.
  - `_iff_*`: for biconditional characterizations.
- **Prefixes**:
  - `isHamiltonianCycle_`: for helper lemmas about the structure definition.
  - `map`: for preservation under graph homomorphisms.

#### 3. **Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only` — heavily used for rewriting definitions (`IsHamiltonian`, `support`, `count`, `map`, etc.).
- `rw` — rewriting with lemmas like `length_support`, `card_univ`, `support_tail`.
- `rcases` / `cases` — for destructuring existential or inductive hypotheses (e.g., walks).
- `exact`, `intro`, `apply`, `refl`, `symm`, `trans` — standard proof scripting.
- `aesop` — not present in this file; proofs are mostly manual/simp-based.
- `ring`, `linarith` — not used; arithmetic handled via `nat` lemmas (`tsub`, `succ_le`, etc.).
- `eq_tsub_of_add_eq`, `Nat.sub_add_cancel`, `Nat.succ_le` — arithmetic lemmas for natural numbers.

#### 4. **Proof Logic**

- **Inductive structure on walks**: Many proofs reason about `p : Walk a b`, often splitting on `p = nil`, `p = cons y p'`, or using `tail`, `support`, `map`.
- **Count-based reasoning**: Central to Hamiltonian definitions; proofs rely on `List.count`, `nodup`, `mem_support`, and `support_toFinset`.
- **Equational reasoning**: Length and support equalities derived via:
  - `length_support`, `sum_toFinset_count_eq_length`, `card_univ`.
  - Arithmetic lemmas for natural numbers (e.g., `tsub` cancellation).
- **Bijective homomorphism arguments**: Use `hf.injective`, `hf.surjective` to lift counts and support properties through `map`.
- **Case analysis on graph size**: E.g., `Fintype.card α ≠ 1` in `IsHamiltonian` definition; singleton vs non-singleton cases.

#### 5. **Imports**

- `Mathlib.Algebra.Order.Ring.Nat` — for natural number arithmetic, order, and ring structure.
- `Mathlib.Data.List.Count` — for `count`, `support`, and list multiplicity reasoning.
- `Mathlib.Combinatorics.SimpleGraph.Path` — foundational definitions for graphs, walks, paths, cycles, and homomorphisms.

> **Note**: No `Mathlib.Combinatorics.SimpleGraph.Basic` or `Connectivity` imports are directly used here — path connectivity is built from `Walk` and `reachable`.

--- 

This metadata reflects the formalization style and logical structure of Hamiltonian graph theory in Lean 4, emphasizing precise count-based reasoning and structural preservation under graph homomorphisms.