Here's a structured technical metadata summary of the provided Lean 4 file, extracted for use in building a domain-specific AI agent (e.g., for formalization assistance, proof planning, or tactic recommendation in Szemerédi Regularity Lemma formalization):

---

### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `chunk` | `Finpartition U`: Partition of a part `U` of the initial equipartition `P`, constructed via `atomise` + `equitabilise`. Used to refine `P` locally to increase energy. |
| `star V` | `Finset (Finset α)`: Subcollection of `chunk` parts lying inside the non-uniformity witness `G.nonuniformWitness ε U V`. Captures "bad" pieces contributing to non-uniformity. |
| `biUnion_star_subset_nonuniformWitness` | `⊆ G.nonuniformWitness ε U V`: Ensures the union of `star` parts stays within the non-uniform witness. |
| `card_nonuniformWitness_sdiff_biUnion_star` | Bounds the size of the part of the witness *not* covered by `star`. Key in density estimates. |
| `one_sub_eps_mul_card_nonuniformWitness_le_card_star` | Shows that most of the witness is captured by `star`, up to `(1 - ε/10)` factor. Crucial for density lower bounds. |
| `card_chunk` | `#(chunk).parts = 4 ^ #P.parts`: Number of parts in the refined partition. |
| `card_eq_of_mem_parts_chunk` | Each chunk part has size `m` or `m + 1`. Ensures near-equipartition of refined parts. |
| `density_sub_eps_le_sum_density_div_card` | Relates global edge density between unions of chunk parts to average of pairwise densities. Lower bound with `ε⁵/50` error. |
| `sum_density_div_card_le_density_add_eps` | Complementary upper bound: average pairwise density ≤ global density + `ε⁵/49`. |
| `average_density_near_total_density` | Combines above: absolute difference ≤ `ε⁵/49`. |
| `edgeDensity_chunk_aux` | Intermediate inequality bounding `(edgeDensity U V)² - ε⁵/25` below by square of average pairwise density over `chunk` parts. |
| `abs_density_star_sub_density_le_eps` | Controls deviation between densities of `star`-refined witnesses and original non-uniform witnesses: ≤ `ε/5`. |
| `eps_le_card_star_div` | Lower bound on relative size of `star`: `4/5 ε ≤ #(star) / 4^#P.parts`. Ensures `star` is large enough to affect energy. |
| `edgeDensity_star_not_uniform` | **Main local energy increment**: For non-uniform `U, V`, the average squared density over `star × star` is significantly larger than baseline. |
| `edgeDensity_chunk_not_uniform` | **Key theorem**: For non-uniform `U, V`, the energy (sum of squared densities over `chunk × chunk`) increases by at least `ε⁴/3`. |
| `edgeDensity_chunk_uniform` | **Uniform case**: Even for uniform `U, V`, energy does not decrease — only increases minimally (`-ε⁵/25`). |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `card_`: Cardinality bounds (`card_chunk`, `card_nonuniformWitness_sdiff_biUnion_star`, `card_biUnion_star_le_m_add_one_card_star_mul`)
  - `edgeDensity_`: Density estimates (`edgeDensity_chunk_uniform`, `edgeDensity_chunk_not_uniform`, `edgeDensity_star_not_uniform`)
  - `one_sub_`, `m_le_`, `m_add_one_`: Derived inequalities involving `1 - ε`, `m`, `m+1`
  - `biUnion_`, `star_`, `average_`: Structural or combinatorial lemmas
- **Suffixes**:
  - `_le_`, `_ge_`, `_eq_`: Inequality/equality direction
  - `_subset_`, `_div_`, `_mul_`: Operation type
  - `_sq`, `_pow_`: Squaring or exponentiation
- **Special**:
  - `aux`: Intermediate lemmas (`edgeDensity_chunk_aux`)
  - `nonuniformWitness`: Refers to the witness of non-uniformity (e.g., `nonuniformWitness_mem_nonuniformWitnesses`, `le_card_nonuniformWitness`)

---

### **3. Tactic Stack**

Frequently used tactics (based on syntax and proof structure):

| Tactic | Role |
|--------|------|
| `simp` / `simp_rw` | Simplification, especially with `Finset`, `Finpartition`, `edgeDensity_def`, `sup_eq_biUnion` |
| `rw` | Rewriting using equalities, often with `cast_mul`, `pow_right_comm`, `div_mul_assoc` |
| `gcongr` | Critical for monotonicity arguments (e.g., bounding expressions with `ε`); used heavily in density estimates |
| `linarith` | Linear arithmetic over reals (e.g., after `abs_sub_le_iff` decomposition) |
| `norm_num` | Normalizing numeric expressions (e.g., `100`, `4^k`, `16^k`) |
| `apply`, `exact`, `refine` | Proof construction, especially in inequality chains (`calc`) |
| `cases` | Case analysis on `le_total`, `abs_sub_le_iff`, `card_eq_of_mem_parts_chunk` |
| `convert` | Typeclass inference + congruence (e.g., `convert sum_div_card_sq_le_sum_sq_div_card`) |
| `push_cast` | Moving between `ℝ` and `ℕ` embeddings |
| `sz_positivity` | Custom tactic (from `SzemerediRegularity.Positivity`) for positivity goals (e.g., `0 < ε`, `0 ≤ m`) |
| `ring` | Algebraic simplification (e.g., expanding `(a - b)^2`) |

---

### **4. Proof Logic Flow**

- **Structure**: Modular, with lemmas building toward energy increment.
- **Typical proof pattern**:
  1. **Setup**: Assume `U, V ∈ P.parts`, `U ≠ V`, and `¬G.IsUniform ε U V`.
  2. **Control witness size**: Bound `#(witness \ star.biUnion)` using `card_nonuniformWitness_sdiff_biUnion_star`.
  3. **Show `star` is large**: Use `one_sub_eps_mul_card_nonuniformWitness_le_card_star` to ensure most of witness is captured.
  4. **Relate densities**:
     - Use `average_density_near_total_density` to approximate global density by average over `star`.
     - Use `abs_density_star_sub_density_le_eps` to relate `star`-density to original witness density.
  5. **Combine with non-uniformity assumption**: `|edgeDensity(witness_U, witness_V) - edgeDensity(U,V)| ≥ ε` (by `nonuniformWitness_spec`).
  6. **Chain inequalities** (`calc`) to derive final energy increment (`edgeDensity_chunk_not_uniform`).
- **Uniform case**: Simpler — uses `edgeDensity_chunk_aux` + `sum_div_card_sq_le_sum_sq_div_card` to show no decrease.

---

### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Combinatorics.SimpleGraph.Regularity.Bound` | Bounds on `m`, `stepBound`, `card α` (e.g., `hundred_div_ε_pow_five_le_m`, `pow_mul_m_le_card_part`) |
| `Mathlib.Combinatorics.SimpleGraph.Regularity.Equitabilise` | `equitabilise`, `atomise`, `card_aux₁`, `card_aux₂` — used in `chunk` definition |
| `Mathlib.Combinatorics.SimpleGraph.Regularity.Uniform` | `IsUniform`, `nonuniformWitness`, `nonuniformWitness_spec`, `le_card_nonuniformWitness` — core uniformity notions |

**Domain**: Formalization of Szemerédi Regularity Lemma (SRL) in combinatorics/graph theory.  
**Focus**: Local energy increment via partition refinement (`chunk`, `star`).  
**Assumptions**:  
- `α` finite type, `G` simple graph on `α`,  
- `P` equipartition (`P.IsEquipartition`),  
- `ε ∈ ℝ`, `0 < ε ≤ 1`,  
- Large enough `card α ≥ #P.parts * 16^#P.parts`,  
- `100 ≤ 4^#P.parts * ε⁵` (technical regularity condition).

---

Let me know if you'd like a **tactic recommendation engine** or **proof sketch generator** built from this metadata.