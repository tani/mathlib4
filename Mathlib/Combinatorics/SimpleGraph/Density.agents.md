Here's a structured technical metadata brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Edge Density Formalization in Lean 4**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Rel.interedges r s t` | `Finset (α × β)` | Finset of edges of a binary relation `r` between finsets `s : Finset α`, `t : Finset β`. |
| `Rel.edgeDensity r s t` | `ℚ` | Edge density: ratio of actual edges to possible edges (`#(interedges) / (#s * #t)`). |
| `SimpleGraph.interedges G s t` | `Finset (α × α)` | Edges of a simple graph `G` between vertex subsets `s`, `t`. Defined as `Rel.interedges G.Adj s t`. |
| `SimpleGraph.edgeDensity G s t` | `ℚ` | Edge density of graph `G` between `s`, `t`. Defined as `Rel.edgeDensity G.Adj s t`. |
| `mem_interedges_iff` | `x ∈ interedges r s t ↔ x.1 ∈ s ∧ x.2 ∈ t ∧ r x.1 x.2` | Membership characterization for `interedges`. |
| `card_interedges_add_card_interedges_compl` | `#(interedges r s t) + #interedges (¬r) s t = #s * #t` | Total possible edges = actual + complement edges. |
| `edgeDensity_add_edgeDensity_compl` | `edgeDensity r s t + edgeDensity (¬r) s t = 1` (under nonemptiness) | Density + complement density = 1. |
| `mul_edgeDensity_le_edgeDensity` | `(s₂ ⊆ s₁) → (t₂ ⊆ t₁) → ... → (#s₂/#s₁ * #t₂/#t₁) * edgeDensity r s₂ t₂ ≤ edgeDensity r s₁ t₁` | Monotonicity-type inequality for densities under subset inclusion. |
| `abs_edgeDensity_sub_edgeDensity_le_two_mul` | `|(edgeDensity r s₂ t₂) - (edgeDensity r s₁ t₁)| ≤ 2 * δ` | Quantitative continuity: if `s₂`, `t₂` are large subsets of `s₁`, `t₁`, then densities are close. |
| `edgeDensity_comm` | `edgeDensity r s t = edgeDensity r t s` (for symmetric `r`) | Symmetry of density under symmetric relations. |

#### **2. Naming Conventions**

- **Prefixes**:
  - `interedges`: for edge sets between two subsets.
  - `edgeDensity`: for density (rational-valued).
  - `card_...`: for cardinalities of edge sets.
- **Suffixes**:
  - `_left`, `_right`: indicate which argument (domain/codomain) is varied.
  - `_compl`: refers to complement relation.
  - `_mono`: monotonicity statements.
  - `_disjoint_*`: behavior under disjoint unions.
  - `_finpartition_*`: behavior under finite partitions.
- **Symmetry variants** use `comm` (e.g., `edgeDensity_comm`, `mk_mem_interedges_comm`).

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp_rw`, `simp only`: for rewriting with definitional equalities and lemmas.
- `rw`: basic rewriting.
- `gcongr`: for congruence with inequalities (used in density bounds).
- `ring`: for algebraic simplifications (e.g., `2δ - δ² = 1 - (1-δ)²`).
- `norm_num`: for numeric normalization.
- `exact`, `intro`, `cases'`, `obtain`: basic proof structure.
- `apply`, `refine`, `trans`: for chaining inequalities.
- ` positivity`: used in `Tactic.positivity_edge_density` extension (commented out in porting note).
- `disjoint_*` lemmas often use `rw [Finset.disjoint_left]` + `intro ...`.

#### **4. Proof Logic**

- **Structure**:
  - Most proofs follow a pattern: unfold definitions → simplify using `mem_interedges_iff` → apply set-theoretic lemmas (`card_union_of_disjoint`, `filter_union_filter_neg_eq`, etc.) → use arithmetic (`div_le_one`, `mul_pos`, etc.).
  - **Induction** is *not* used; proofs rely on set-theoretic decomposition (e.g., finite partitions, disjoint unions).
  - **Case analysis** on emptiness/nonemptiness (`eq_empty_or_nonempty`) is common.
  - **Classical reasoning** used via `classical` tactic (e.g., in `card_interedges_add_card_interedges_compl`).
  - **Symmetric case** is handled separately (`section Symmetric`) using `Symmetric r`.

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Algebra.Order.Field.Basic`: for ordered field structure (used for `𝕜`, ℚ).
- `Mathlib.Combinatorics.SimpleGraph.Basic`: for `SimpleGraph` type and adjacency.
- `Mathlib.Data.Rat.Cast.Order`: for ℚ-cast and order compatibility.
- `Mathlib.Order.Partition.Finpartition`: for finite partitions (`Finpartition`).
- `Mathlib.Tactic.*`: `GCongr`, `NormNum`, `Positivity`, `Ring`.

**Scope**:
- Formalizes edge density for *binary relations* and *simple graphs* between finite vertex subsets.
- Focuses on *combinatorial and analytic properties*: monotonicity, continuity under subset approximation, complementarity, symmetry, and partition additivity.
- Designed for use in extremal combinatorics (e.g., regularity lemmas, stability).

---

Let me know if you'd like a dependency graph or a summary of how this fits into larger projects (e.g., Szemerédi regularity lemma formalization).