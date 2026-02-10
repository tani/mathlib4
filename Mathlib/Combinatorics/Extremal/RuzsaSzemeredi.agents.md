### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ruzsaSzemerediNumber α` | `ℕ` | Maximum number of edges in a *locally linear* graph on fintype `α` (i.e., each edge lies in exactly one triangle). |
| `ruzsaSzemerediNumberNat n` | `ℕ` | Specialization of `ruzsaSzemerediNumber` to `Fin n`, i.e., graphs on `n` vertices. |
| `triangleIndices s` | `Finset (α × α × α)` | Construction of triangle index set from a subset `s ⊆ α` using arithmetic progressions: `(y, y+a, y+2a)` for `a ∈ s`. |
| `locallyLinear` | `G.LocallyLinear` | Proof that the graph built from `triangleIndices s` is locally linear, assuming `s` is 3AP-free. |
| `card_edgeFinset` | `#(G.edgeFinset) = 3 * card α * #s` | Edge count of the graph constructed from `triangleIndices s`. |
| `addRothNumber_le_ruzsaSzemerediNumber` | Inequality | Relates additive Roth number to Ruzsa–Szemerédi number via sum types. |
| `rothNumberNat_le_ruzsaSzemerediNumberNat` | Inequality | Concrete inequality: `(2n+1) * rothNumberNat n ≤ ruzsaSzemerediNumberNat (6n+3)`. |
| `rothNumberNat_le_ruzsaSzemerediNumberNat'` | Inequality | Refinement: `(n/3 - 2) * rothNumberNat((n-3)/6) ≤ ruzsaSzemerediNumberNat n`. |
| `ruzsaSzemerediNumberNat_lower_bound` | Inequality | Explicit lower bound using Behrend’s construction: `(n/3 - 2) * ((n-3)/6) * exp(-4√log((n-3)/6)) ≤ ruzsaSzemerediNumberNat n`. |
| `ruzsaSzemerediNumberNat_asymptotic_lower_bound` | Big-O notation | Asymptotic lower bound: `n² · exp(-4√log n) = O(ruzsaSzemerediNumberNat n)`. |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `ruzsaSzemerediNumber`: Core definition and variants (`Nat`, `mono`, `congr`, `le`, `spec`).
  - `triangleIndices`: Construction-specific helper.
  - `locallyLinear`, `card_edgeFinset`, `card_triangleIndices`: Graph-theoretic properties.
  - `noAccidental`: Property ensuring no unintended triangle overlaps.
- **Suffixes**:
  - `_Nat`: Natural-number-indexed version (e.g., `ruzsaSzemerediNumberNat`).
  - `_le_`, `_spec`, `_mono`, `_congr`: Standard Lean patterns for bounds, existence, monotonicity, and equivalence.
  - `_lower_bound`, `_asymptotic_lower_bound`: For asymptotic results.

#### 3. **Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp_rw`: Simplification, especially with `Finset`, `card`, and `triangleIndices`.
- `rw`: Rewriting using definitions and lemmas (e.g., `card_triangleIndices`, `locallyLinear`).
- `linarith` / `linear_combination`: Handling linear arithmetic over `α` (often in `CommRing`).
- `norm_num`, `norm_cast`: For numeric normalization and casting between `ℕ`, `ℝ`.
- `gcongr`, `congr'`: For monotonicity and congruence reasoning.
- `exact`, `refine`, `apply`: Direct proof construction.
- `omega`: For automated reasoning in Presburger arithmetic (especially in asymptotic bounds).
- `decide`: For decidable equality and membership checks.
- `cases`, `intro`, `rintro`: Standard intro/case analysis.

#### 4. **Proof Logic**

- **Structure**:
  - **Construction phase**: Define `triangleIndices s` from a 3AP-free set `s` (via Behrend’s construction).
  - **Verification phase**:
    - Prove `triangleIndices s` has no accidental triangles (`noAccidental`).
    - Show explicit disjointness of triangle projections (`ExplicitDisjoint`).
    - Conclude local linearity (`locallyLinear`).
  - **Counting phase**:
    - Compute triangle and edge counts (`card_triangleIndices`, `card_edgeFinset`).
  - **Reduction phase**:
    - Relate additive combinatorial quantities (Roth numbers) to graph-theoretic ones.
    - Use monotonicity and embedding arguments (`ruzsaSzemerediNumber_mono`, `congr`).
  - **Asymptotics**:
    - Derive explicit lower bounds using Behrend’s Roth lower bound.
    - Use `IsBigO` reasoning with `trans`, `of_bound`, and norm estimates.

- **Induction/Case Analysis**: Minimal induction; mostly case analysis on small `n` (e.g., `n = 0,1,2`) and asymptotic analysis.

#### 5. **Imports**

- `Mathlib.Combinatorics.Additive.AP.Three.Behrend`: Provides Behrend’s construction of large 3AP-free sets and Roth number lower bounds.
- `Mathlib.Combinatorics.SimpleGraph.Triangle.Tripartite`: Supplies `TripartiteFromTriangles.locallyLinear` and related graph constructions.
- `Mathlib.Tactic.Rify`: For coercions and reasoning between `ℕ` and `ℝ`.

---

This module formalizes a deep connection between additive combinatorics (3AP-free sets) and extremal graph theory (locally linear graphs), culminating in a near-optimal asymptotic lower bound for the Ruzsa–Szemerédi problem.