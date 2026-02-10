### Technical Metadata Brief: Arborescences in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Arborescence V` | `class (V : Type u) [Quiver V] : Type max u v` | Typeclass asserting `V` is a directed rooted tree: there exists a *root* such that every vertex has a *unique* path from the root. |
| `root V` | `def {V : Type u} [Quiver V] [Arborescence V] : V` | Extracts the distinguished root vertex of an arborescence. |
| `uniquePath b` | `instance {V} [Quiver V] [Arborescence V] (b : V) : Unique (Path (root V) b)` | Guarantees uniqueness of paths from root to any vertex. |
| `arborescenceMk r height height_lt unique_arrow root_or_arrow` | `def {V} [Quiver V] → r : V → (V → ℕ) → ... → Arborescence V` | Constructive proof principle: if there's a height function with strictly increasing edges, at most one incoming edge per vertex, and every vertex except `r` has an incoming edge, then `r` is the root of an arborescence. |
| `RootedConnected r` | `class {V} [Quiver V] → Prop` | Asserts existence of *some* path from `r` to every vertex (not necessarily unique). |
| `shortestPath r b` | `noncomputable def {V} [Quiver V] (r : V) [RootedConnected r] (b : V) : Path r b` | Picks a path of minimal length from `r` to `b`, using well-founded minimization over `Path.length`. |
| `shortest_path_spec p` | `theorem {V} [Quiver V] (r : V) [RootedConnected r] (p : Path r a) : shortestPath r a .length ≤ p.length` | Minimality property of `shortestPath`. |
| `geodesicSubtree r` | `def {V} [Quiver V] (r : V) [RootedConnected r] : WideSubquiver V` | Subquiver containing only edges `e : a ⟶ b` that extend a shortest path to `b` (i.e., `shortestPath r b = p.cons e` for some `p`). |
| `geodesicArborescence` | `noncomputable instance {V} [Quiver V] (r : V) [RootedConnected r] : Arborescence (geodesicSubtree r)` | Proves the geodesic subquiver is an arborescence — constructive version of “every connected graph has a spanning tree” without choice. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `arborescenceMk`: “Mk” suffix for *construction* lemmas.
  - `geodesicSubtree`: geometric intuition — minimal subgraph preserving shortest paths.
  - `shortestPath`: descriptive, emphasizes minimality.
- **Suffixes**:
  - `uniquePath`: emphasizes uniqueness quantifier.
  - `root_or_arrow`: logical disjunction pattern (`b = r ∨ ∃ a, ...`).
- **Predicates**:
  - `Arborescence`, `RootedConnected`: capitalized typeclasses, standard Mathlib style.
  - `height_lt`, `unique_arrow`, `root_or_arrow`: descriptive names for hypotheses in `arborescenceMk`.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `intro`, `rcases`, `cases`: for destructuring hypotheses and disjunctions.
- `induction ... with | nil | cons`: structural induction on `Path`.
- `rw [h]`, `simp_rw [h]`: rewriting using definitional equalities (e.g., `Path.length_cons`).
- `rfl`: for definitional equality.
- `exact`, `apply`, `constructor`: standard proof assembly.
- `lt_irrefl`, `lt_of_le_of_lt`, `lt_of_lt_of_le`: order reasoning.
- `WellFounded.min`, `WellFounded.not_lt_min`: for minimality arguments.
- `False.elim`, `lt_irrefl`: contradiction handling.

---

#### **4. Proof Logic**

- **Main proof strategy in `arborescenceMk`**:
  1. **Existence**: Use induction on `n` where `height b < n`, combined with `root_or_arrow` to build a path recursively.
  2. **Uniqueness**: Use induction on paths, leveraging:
     - `height_le` (monotonicity of height along paths),
     - `unique_arrow` (at most one incoming edge per vertex),
     - contradiction via `lt_irrefl` when paths diverge.

- **Geodesic subtree construction**:
  1. Define subquiver via *edge selection criterion* (edges extending shortest paths).
  2. Apply `arborescenceMk`:
     - Height = `length (shortestPath r a)`.
     - `height_lt`: follows from `shortest_path_spec`.
     - `unique_arrow`: follows from uniqueness of decomposition of shortest paths.
     - `root_or_arrow`: follows from minimality of `shortestPath` (either `r` or extends a shorter path).

- **Overall flow**: Constructive, avoids choice principles (e.g., Zorn’s Lemma), relies on natural-number well-foundedness and path induction.

---

#### **5. Imports**

- `Mathlib.Combinatorics.Quiver.Path`: foundational path theory (types, length, composition).
- `Mathlib.Combinatorics.Quiver.Subquiver`: subquivers, wide subquivers.
- `Mathlib.Order.WellFounded`: well-founded relations, `measure`, `WellFounded.min`.

These imports define the ambient combinatorial and order-theoretic context for reasoning about paths and minimality.

--- 

Let me know if you'd like a diagrammatic sketch of the proof structure or a formalized summary in another format (e.g., Coq/Isabelle comparison).