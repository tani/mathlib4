Here's a structured technical metadata brief extracted from the provided Lean 4 file:

---

### **Technical Metadata Brief**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `SimpleGraph.IsUniform G ε s t` | `Prop` | Defines ε-regularity (uniformity) of a pair of vertex subsets `s`, `t` in graph `G`: edge density between subsets is close to that of the whole pair. |
| `SimpleGraph.nonuniformWitnesses G ε s t` | `Finset α × Finset α` | Returns a pair of subsets witnessing non-uniformity of `(s, t)` if it exists; otherwise returns `(s, t)`. |
| `SimpleGraph.nonuniformWitness G ε s t` | `Finset α` | A single subset witnessing non-uniformity (uses classical choice + well-ordering to pick one side). |
| `Finpartition.sparsePairs P G ε` | `Finset (Finset α × Finset α)` | Pairs of distinct parts in partition `P` with edge density < ε. |
| `Finpartition.nonUniforms P G ε` | `Finset (Finset α × Finset α)` | Pairs of distinct parts in `P` that are *not* ε-uniform. |
| `Finpartition.IsUniform P G ε` | `Prop` | Partition `P` is ε-uniform if the proportion of non-ε-uniform part pairs ≤ ε. |
| `Finpartition.nonuniformWitnesses P G ε s` | `Finset (Finset α)` | Collects witnesses of non-uniformity for a fixed part `s` against other parts in `P`. |
| `SimpleGraph.regularityReduced G P ε δ` | `SimpleGraph α` | Reduced graph: edges between parts that are ε-uniform and have density ≥ δ. |

**Key Theorems:**
- `IsUniform.mono`: Uniformity is monotone in ε (larger ε ⇒ easier to satisfy).
- `IsUniform.symm`: Uniformity is symmetric in `s`, `t`.
- `not_isUniform_iff`: Logical equivalence for non-uniformity via existence of a bad witness pair.
- `nonUniforms_mono`: If ε increases, fewer pairs are non-uniform.
- `IsUniform.mono` (for partitions): Monotonicity of partition uniformity in ε.
- `IsEquipartition.card_interedges_sparsePairs_le`: Bound on total edges in sparse pairs for equitable partitions.
- `IsEquipartition.sum_nonUniforms_lt`: Total size of non-uniform part products is small under uniformity.
- `unreduced_edges_subset`: Decomposition of edges not in the reduced graph into three types: non-uniform, off-diagonal, sparse.

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `isUniform_`, `nonUniform_`, `sparse_`: Predicate-related (e.g., `isUniform_singleton`, `nonUniforms`, `sparsePairs`).
  - `nonuniformWitness`: Witness construction (lowercase `w` in `nonuniformWitness`, uppercase in `nonuniformWitnesses`).
  - `card_`, `biUnion`, `offDiag`: Set-theoretic operations.
- **Suffixes:**
  - `_le`, `_lt`: Inequalities in theorems (e.g., `card_interedges_sparsePairs_le`, `sum_nonUniforms_lt`).
  - `_comm`: Commutativity lemmas (e.g., `isUniform_comm`, `edgeDensity_comm`).
  - `_mono`: Monotonicity lemmas (e.g., `nonUniforms_mono`, `IsUniform.mono`).
- **Variables:**
  - `ε`, `δ`: Real/field parameters for regularity thresholds.
  - `s`, `t`, `u`, `v`: Vertex subsets.
  - `U`, `V`: Parts of a partition (capitalized for clarity).
  - `P`: Partition, `G`: Graph.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp_rw`: Simplification, especially with `mem_`, `card_`, `edgeDensity_` lemmas.
- `rw`: Rewriting using equivalences like `not_isUniform_iff`, `mk_mem_*`.
- `gcongr`: Goal-directed congruence for inequalities (common in density bounds).
- `exact`, `refine`, `apply`: Proof construction.
- `cases`, `rcases`, `obtain`: Case analysis and destructuring.
- ` positivity`: For proving positivity of natural/field expressions.
- `ring`: For algebraic simplification of polynomial expressions.
- `aesop`: Not explicitly used here, but `simp` + `linarith`-style reasoning dominates.
- `mod_cast`: Cast inequalities between `ℕ` and `𝕜` (linearly ordered field).

---

#### **4. Proof Logic**

- **Inductive/constructive style**: Definitions use `if ... then ... else` with classical choice (`Classical.choice`) for witnesses.
- **Common proof patterns:**
  1. **Equivalence unfolding**: e.g., `not_isUniform_iff` rewrites negation into existential form.
  2. **Bounding via summation**: Use `card_biUnion_le`, `sum_le_card_nsmul`, and `mul_le_mul` to bound set sizes.
  3. **Equipartition arithmetic**: Leverage bounds on part sizes (`card_part_le_average_add_one`) and off-diagonal cardinalities.
  4. **Decomposition arguments**: e.g., `unreduced_edges_subset` splits edge set into disjoint cases using `if`/`cases`.
  5. **Scaling arguments**: Monotonicity lemmas (`mono`) allow adjusting ε without loss of generality.

---

#### **5. Imports & Scope**

**Primary Imports:**
- `Mathlib.Algebra.BigOperators.Ring`: For summation over finite sets, `∑`, `•`.
- `Mathlib.Combinatorics.SimpleGraph.Density`: Edge density, `interedges`, basic graph ops.
- `Mathlib.Data.Nat.Cast.Order.Field`: Casting `ℕ → 𝕜`, order properties.
- `Mathlib.Order.Partition.Equipartition`: Equipartitions, `IsEquipartition`.
- `Mathlib.SetTheory/Cardinal/Basic`: Cardinal arithmetic, `biUnion`, `offDiag`.

**Scope & Domain:**
- Formalizes **Szemerédi’s Regularity Lemma** machinery.
- Works over arbitrary `Type*` with `LinearOrderedField` (e.g., `ℝ`, `ℚ`).
- Assumes `DecidableRel G.Adj` and `DecidableEq α` for finite set operations.
- Focuses on **finite graphs**, finite partitions, and quantitative regularity.

---

Let me know if you'd like a dependency graph, a summary of the Szemerédi Regularity Lemma formalization pipeline, or a comparison to other formalizations (e.g., in Coq or Isabelle).