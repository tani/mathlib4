### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `closedPoints` | `def closedPoints : Set X := setOf (IsClosed {·})` | Defines the set of points whose singleton is closed. |
| `mem_closedPoints_iff` | `x ∈ closedPoints X ↔ IsClosed {x}` | Characterizes membership in `closedPoints`. |
| `preimage_closedPoints_subset` | `f ⁻¹' closedPoints Y ⊆ closedPoints X` (under injectivity & continuity) | Preimage of closed points under continuous injective map lies in closed points. |
| `Topology.IsClosedEmbedding.preimage_closedPoints` | `f ⁻¹' closedPoints Y = closedPoints X` (for closed embeddings) | Equality of preimage and closed points for closed embeddings. |
| `closedPoints_eq_univ` | `closedPoints X = Set.univ` (in T1 spaces) | In T1 spaces, all points are closed. |
| `JacobsonSpace` | `class JacobsonSpace : Prop` | Class of *Jacobson spaces*: every closed subspace has dense closed points. |
| `closure_inter_closedPoints` | `∀ {Z}, IsClosed Z → closure (Z ∩ closedPoints X) = Z` | Defining property of Jacobson spaces. |
| `jacobsonSpace_iff_locallyClosed` | `JacobsonSpace X ↔ ∀ Z, Z.Nonempty → IsLocallyClosed Z → (Z ∩ closedPoints X).Nonempty` | Equivalence between Jacobson condition and existence of closed points in nonempty locally closed subsets. |
| `nonempty_inter_closedPoints` | `(Z ∩ closedPoints X).Nonempty` (under assumptions) | Immediate corollary of the above equivalence. |
| `isClosed_singleton_of_isLocallyClosed_singleton` | `{x} locally closed ⇒ {x} closed` (in Jacobson spaces) | In Jacobson spaces, locally closed singletons are closed. |
| `Topology.IsOpenEmbedding.preimage_closedPoints` | `f ⁻¹' closedPoints Y = closedPoints X` (for open embeddings into Jacobson space) | Preimage equality for open embeddings. |
| `JacobsonSpace.of_isOpenEmbedding` / `of_isClosedEmbedding` | `JacobsonSpace Y ⇒ JacobsonSpace X` (via open/closed embeddings) | Jacobson property descends along open/closed embeddings. |
| `JacobsonSpace.discreteTopology` | `(closedPoints X).Finite ⇒ DiscreteTopology X` | Finite closed points imply discrete topology in Jacobson spaces. |
| `jacobsonSpace_iff_of_iSup_eq_top` | `JacobsonSpace X ↔ ∀ i, JacobsonSpace (U i)` (for open cover by `U i`) | Jacobson property is local over open covers. |

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `closedPoints_`: for lemmas about the `closedPoints` set.
  - `jacobsonSpace_`: for lemmas about the `JacobsonSpace` class.
  - `preimage_closedPoints`: for behavior of preimages of closed points.
  - `of_`: for constructing instances (e.g., `of_isOpenEmbedding`).
- **Suffixes**:
  - `_iff`: for biconditional characterizations.
  - `_subset` / `_eq`: for inclusion or equality statements.
  - `_singleton`: for results about singletons.
- **Pattern**: `lemma [class]_[action]_[condition]` — e.g., `isClosed_singleton_of_isLocallyClosed_singleton`.

---

#### 3. **Tactic Stack**

Frequently used tactics in proofs:
- `rw`, `simp`, `simp_rw`: for rewriting and simplification (especially with `mem_closedPoints_iff`, `closure_eq_iff_isClosed`, etc.).
- `apply`, `convert`, `convert_to`: for targeted application and equality conversion.
- `ext`: for extensionality (especially with sets and functions).
- `exact`, `assumption`, `intro`, `cases`: basic proof automation.
- `aesop`: likely used in simpler goals (not explicitly shown, but common in modern Mathlib).
- `ring`, `linarith`: not present here — topology-heavy.
- `by_cases`: used in the last lemma for case analysis on membership in open sets.
- `subset_antisymm`: for proving set equality via double inclusion.

---

#### 4. **Proof Logic**

- **Structure**:
  - Most proofs follow a *local-to-global* or *closure-based* pattern.
  - Key technique: use `jacobsonSpace_iff_locallyClosed` to reduce to existence of closed points in locally closed sets.
  - For implications like `JacobsonSpace X → JacobsonSpace Y`, use embedding properties (open/closed) to transfer closed points via preimage.
  - For discrete topology result: combine finiteness of closed points with density (via closure_closedPoints) to deduce all points are closed, then use finiteness + T1 to get discreteness.
  - For the iSup characterization: reduce to open cover, use nonemptiness of intersections with closed points in each open set, then glue back using continuity and subtype properties.

- **Induction**: Not used directly — relies on set-theoretic arguments and topological closure properties.

---

#### 5. **Imports**

- `Mathlib.Topology.LocalAtTarget`: for local topology concepts (used implicitly via `IsLocallyClosed`).
- `Mathlib.Topology.Separation.Regular`: likely for separation axioms (though not directly used here, may be needed for related results).
- `Mathlib.Tactic.StacksAttribute`: for linking to Stacks Project tags (e.g., `[stacks 005U]`).

> **Scope**: This module formalizes foundational properties of *Jacobson spaces* — a class of topological spaces where closed points are dense in every closed subset — with emphasis on closure properties, behavior under embeddings, and connections to discreteness and local closedness.

--- 

Let me know if you'd like a dependency graph or a summary of how this fits into the broader topology library.