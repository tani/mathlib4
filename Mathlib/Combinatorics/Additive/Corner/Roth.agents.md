### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `triangleIndices` | `Finset (G × G) → Finset (G × G × G)` | Maps a set of points `A ⊆ G × G` to a set of triples `(a, b, a + b)` encoding potential corners as triangles in a tripartite graph. |
| `cornersTheoremBound` | `ℝ → ℕ` | Explicit lower bound on `|G|` needed to guarantee a corner in any dense subset of `G × G`. Depends on `triangleRemovalBound`. |
| `corners_theorem` | `∀ ε > 0, cornersTheoremBound ε ≤ |G| ⇒ (ε·|G|² ≤ |A|) ⇒ ¬IsCornerFree A` | Main result: any dense enough subset `A ⊆ G × G` contains a corner (i.e., is not corner-free). |
| `corners_theorem_nat` | Analogous to above for `A ⊆ {1,…,n}²` | Extends corners theorem to finite grids in `ℕ`. |
| `roth_3ap_theorem` | `∀ ε > 0, cornersTheoremBound ε ≤ |G| ⇒ (ε·|G| ≤ |A|) ⇒ ¬ThreeAPFree A` | Roth’s theorem for finite abelian groups: dense subsets of `G` contain a 3-term arithmetic progression. |
| `roth_3ap_theorem_nat` | Analogous for `A ⊆ {1,…,n}` | Roth’s theorem for finite initial segments of `ℕ`. |
| `rothNumberNat_isLittleO_id` | `rothNumberNat =o[atTop] id` | Asymptotic form of Roth’s theorem: the maximum size of a 3AP-free subset of `{1,…,n}` is `o(n)`. |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `is_`: predicates (e.g., `IsCornerFree`, `ThreeAPFree`)
  - `noAccidental`: property of triangle indices avoiding accidental coincidences
  - `farFromTriangleFree`: graph-theoretic density condition
- **Suffixes**:
  - `_graph`: constructions applied to the graph associated with `triangleIndices`
  - `_nat`: versions specialized to `ℕ` or `{1,…,n}`
  - `_bound`: explicit constants derived from removal lemmas
- **Other patterns**:
  - `triangleIndices`, `triangleRemovalBound`, `cornersTheoremBound`: all relate to encoding corners as triangles.
  - `of_image`, `image_subset_iff`, `coe_`: coercion-related lemmas.

#### 3. **Tactic Stack**

Frequent tactics used in proofs:
- `simp` / `simp_rw`: simplification with many lemmas (especially `mk_mem_triangleIndices`, `card_triangleIndices`, etc.)
- `rw`: rewriting using definitions and lemmas (e.g., `B`, `hxy`, `sub_add_sub_comm`)
- `exact`, `refine`, `convert`: proof construction
- `ring`, `linarith`, `omega`: arithmetic reasoning (especially in `corners_theorem_nat`, `roth_3ap_theorem_nat`)
- `gcongr`, ` positivity`: handling inequalities and positivity conditions
- `have`, `obtain`, `rw [← coe_image]`: structural proof engineering, especially for coercion and image arguments
- `convert ... using 1`: flexible equality chaining
- `simp only [...] at *`: targeted simplification in hypotheses

#### 4. **Proof Logic**

- **High-level strategy**:
  - Encode corners in `A ⊆ G × G` as triangles in a tripartite graph built from `triangleIndices A`.
  - Use triangle removal lemma (`triangleRemovalBound`) to deduce existence of triangles → corners.
  - For Roth’s theorem, reduce 3AP-freeness in `G` to corner-freeness in `G × G` via the set `B = {(x, y) | y - x ∈ A}`.
- **Common proof patterns**:
  - *Contrapositive*: assume no corner/3AP, derive contradiction via density + removal lemma.
  - *Reduction to finite abelian group case*: for `ℕ`, lift to `Fin (2n+1)` via coercion and use `Fin.isAddFreimanIso_Iio`.
  - *Cardinality estimates*: relate `#A`, `#B`, `#triangleIndices A`, and `#triangles` via `card_map`, `card_image_of_injOn`, etc.
  - *Inequality manipulation*: use `mul_le_iff_le_one_left`, `inv_lt_iff_one_lt_mul₀'`, `Nat.floor_lt'`, etc., to bridge real and natural bounds.

#### 5. **Imports**

- `Mathlib.Combinatorics.Additive.AP.Three.Defs`: definitions of 3AP-freeness.
- `Mathlib.Combinatorics.Additive.Corner.Defs`: definitions of corners and corner-freeness.
- `Mathlib.Combinatorics.SimpleGraph.Triangle.Removal`: triangle removal lemma and `triangleRemovalBound`.
- `Mathlib.Combinatorics.SimpleGraph.Triangle.Tripartite`: tripartite graph constructions (used in encoding corners as triangles).

These imports indicate the formalization sits at the intersection of additive combinatorics and graph theory, with heavy reliance on Szemerédi-type regularity and removal principles.

--- 

This metadata reflects a highly structured, modern Lean formalization leveraging category-theoretic and model-theoretic tools (e.g., `ExplicitDisjoint`, `NoAccidental`) to bridge combinatorial density with structural regularity.