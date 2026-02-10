### Technical Metadata Brief: Triangle Removal Lemma in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `triangleRemovalBound` | `ε : ℝ ↦ ℝ` | Explicit constant bounding the threshold for triangle removal; depends on Szemerédi Regularity bound (tower exponential). Defined as `min (2 * ⌈4/ε⌉₊^3)⁻¹ ((1 - ε/4) * (ε/(16 * bound (ε/8) ⌈4/ε⌉₊))^3)`. |
| `triangleRemovalBound_pos` | `0 < ε ∧ ε ≤ 1 ⇒ 0 < triangleRemovalBound ε` | Positivity of the bound under realistic assumptions. |
| `triangleRemovalBound_nonpos` | `ε ≤ 0 ⇒ triangleRemovalBound ε ≤ 0` | Handles degenerate case where ε is nonpositive. |
| `triangleRemovalBound_mul_cube_lt` | `0 < ε ⇒ triangleRemovalBound ε * ⌈4/ε⌉₊^3 < 1` | Ensures the bound scales sublinearly with ⌈4/ε⌉₊³. |
| `card_bound` | Under equipartition & part count bound, lower bounds size of each part in reals. | Used to relate cardinalities of parts to global `card α`. |
| `triangle_removal_aux` | Core technical lemma: if a reduced graph has a triangle, then original graph has many triangles. | Links regularity-reduced clique existence to triangle count in original graph. |
| `regularityReduced_edges_card_aux` | Bounds number of edges removed to get to reduced graph. | Shows few edges suffice to eliminate most irregular/sparse pairs. |
| `FarFromTriangleFree.le_card_cliqueFinset` | `G.FarFromTriangleFree ε ⇒ triangleRemovalBound ε * card α^3 ≤ #cliques₃(G)` | One direction of equivalence: many triangles needed to be far from triangle-free. |
| `triangle_removal` | `#cliques₃(G) < triangleRemovalBound ε * card α^3 ⇒ ∃ G' ≤ G, ... ∧ G'.CliqueFree 3` | Main theorem: few triangles ⇒ can remove few edges to eliminate all triangles. |
| `evalTriangleRemovalBound` | Positivity tactic extension | Enables `positivity` tactic to discharge `0 < triangleRemovalBound ε` goals using context `0 < ε ≤ 1`. |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `triangleRemovalBound_`: auxiliary lemmas about the bound.
  - `card_`, `regularityReduced_`, `triangle_removal_`: structural lemmas in proof pipeline.
  - `FarFromTriangleFree.`: properties tied to the `FarFromTriangleFree` predicate.
- **Suffixes:**
  - `_pos`, `_nonpos`, `_lt`: indicate inequality direction or sign.
  - `_aux`: intermediate technical lemmas.
  - `_le`, `_lt`: often used for inequalities in proofs.
- **Constants:**
  - `ε`, `s`, `t`, `P`, `G`: standard notation for density, subsets, partitions, graphs.
  - `l`, `k`, `n`: natural numbers used in counting arguments.

---

#### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Role |
|--------|------|
| ` positivity` | Proves inequalities involving positive expressions (e.g., `triangleRemovalBound_pos`). |
| ` gcongr` | Used repeatedly to lift inequalities through multiplicative/functional contexts (e.g., bounding products). |
| ` ring` | Simplifies algebraic identities (e.g., `2 * (ε/8) = ε/4`). |
| ` rw [mem_cliqueFinset_iff, is3Clique_iff]` | Rewrites membership in clique sets using logical characterizations. |
| ` cases'`, `cases`, `obtain` | Structural decomposition of hypotheses (e.g., partition disjointness, triangle triples). |
| ` calc` | Chains inequalities step-by-step (common in analytic estimates). |
| ` simp`, `norm_cast`, `mod_cast` | Simplifies and casts between `ℕ` and `ℝ`. |
| ` exact`, `apply`, `refine` | Goal-directed proof construction. |
| ` by_contra!` | Used in `triangle_removal` to prove existence via contradiction. |
| ` aesop` (not explicitly used here, but implied by `positivity` extension) | For automated reasoning in simple goals. |

---

#### **4. Proof Logic Flow**

The proof follows a standard structure for Szemerédi Regularity-based arguments:

1. **Reduction via Regularity Lemma**  
   Apply Szemerédi’s Regularity Lemma to get an equipartition `P` with bounded parts and uniformity.

2. **Edge Removal Analysis**  
   Show that removing edges not in the reduced graph `G.regularityReduced P (ε/8) (ε/4)` removes few edges (using `regularityReduced_edges_card_aux`).

3. **Triangle Counting in Reduced Graph**  
   If the reduced graph contains a triangle (i.e., a 3-clique), then by `triangle_removal_aux`, the original graph has many triangles — lower-bounded by `triangleRemovalBound ε * card α^3`.

4. **Contrapositive for Main Theorem**  
   - If `G` is *far* from triangle-free (cannot remove all triangles with < `ε·card α²` edges), then it must have ≥ `triangleRemovalBound ε·card α³` triangles (`FarFromTriangleFree.le_card_cliqueFinset`).
   - Conversely, if triangle count is < `triangleRemovalBound ε·card α³`, then `G` is *not* far from triangle-free ⇒ there exists a subgraph `G' ≤ G` with few removed edges and no triangles (`triangle_removal`).

5. **Positivity & Edge Cases**  
   Handle degenerate cases (`ε ≤ 0`, empty graph) separately using `triangleRemovalBound_nonpos`, `Fintype.card_eq_zero`, etc.

---

#### **5. Imports & Scope**

| Import | Purpose |
|--------|---------|
| `Mathlib.Combinatorics.SimpleGraph.DegreeSum` | Basic graph theory (degrees, edge counts). |
| `Mathlib.Combinatorics.SimpleGraph.Regularity.Lemma` | Szemerédi Regularity Lemma and related machinery (`bound`, `IsEquipartition`, `IsUniform`, `regularityReduced`). |
| `Mathlib.Combinatorics.SimpleGraph.Triangle.Basic` | Triangle-related definitions (`CliqueFree`, `cliqueFinset`, `FarFromTriangleFree`). |
| `Mathlib.Combinatorics.SimpleGraph.Triangle.Counting` | Triangle counting lemmas (e.g., `triangle_counting`). |

**Domain Scope**:  
This file formalizes a quantitative version of the **Triangle Removal Lemma**, a cornerstone of extremal graph theory and additive combinatorics. It relies heavily on the Szemerédi Regularity Lemma and is part of a larger effort to formalize Szemerédi’s Regularity Lemma and its applications (e.g., in *Formalising Szemerédi’s Regularity Lemma in Lean*).

---

Let me know if you'd like a diagram of the logical dependencies or a breakdown of the `SzemerediRegularity.bound` tower structure.