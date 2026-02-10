### Technical Metadata Brief: `Mathlib.Combinatorics.SimpleGraph.Regularity.Increment`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `increment` | `increment : Finpartition (univ : Finset α)` | Constructs the *increment partition* by refining each part of `P` via `chunk hP G ε`. Used to increase energy when `P` is not uniform. |
| `card_increment` | `#(increment hP G ε).parts = stepBound #P.parts` | Bounds the size of the increment partition in terms of the original partition size and `stepBound`. Crucial for controlling growth. |
| `increment_isEquipartition` | `(increment hP G ε).IsEquipartition` | Proves the increment partition remains an equipartition (all parts same size up to ±1). |
| `distinctPairs` | `distinctPairs : {x // x ∈ P.parts.offDiag} → Finset (Finset α × Finset α)` | Helper defining pairs of refined parts coming from an off-diagonal pair in `P`. Used to relate energy sums. |
| `distinctPairs_increment` | `P.parts.offDiag.attach.biUnion (distinctPairs hP G ε) ⊆ (increment hP G ε).parts.offDiag` | Shows that `distinctPairs` correctly embeds into the off-diagonal of the increment partition. |
| `pairwiseDisjoint_distinctPairs` | `PairwiseDisjoint (distinctPairs hP G ε)` | Ensures no overlap between refined pairs from distinct off-diagonal source pairs — needed for disjoint summation. |
| `le_sum_distinctPairs_edgeDensity_sq` | Inequality bounding edge density squared of original pair by average over refined pairs | Core analytic inequality used in energy increment proof. Depends on uniformity and bounds on `ε`. |
| `energy_increment` | `P.energy G + ε ^ 5 / 4 ≤ (increment hP G ε).energy G` | Main result: energy strictly increases by at least `ε⁵ / 4` under increment, provided `P` is not uniform. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `increment_`: for definitions and properties of the increment partition.
  - `distinctPairs_`: for lemmas about refined pairs.
  - `card_`, `energy_`: standard for partition/cardinality/energy-related results.
- **Suffixes**:
  - `_isEquipartition`: proves equipartition property.
  - `_increment`: refers to the increment partition specifically.
  - `_uniform` / `_not_uniform`: used in conditional cases (e.g., `if G.IsUniform ... then 0 else ...`).
- **Variables**:
  - `hP`, `hPα`, `hPG`, `hPε`, `hε₀`, `hε₁`: hypotheses naming conventions follow Lean 4 style: `h` + descriptive name, often with subscripts indicating content (e.g., `hPα` = hypothesis about `P` and `α` size).

---

#### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Usage |
|--------|-------|
| `rw` / `simp_rw` | Rewriting definitions (`increment`, `chunk`, `bind`, `energy`, `offDiag`, etc.). |
| `simp` | Simplifying set-theoretic expressions (e.g., `mem_bind`, `mem_offDiag`, `mem_product`). |
| `gcongr` | Used twice in `energy_increment` to lift inequalities under sums and divisions (noted in TODO as a target for golfing). |
| `exact`, `refine`, `intro` | Standard proof construction. |
| `cases`, `obtain` | Extracting structure from existential hypotheses (e.g., `obtain ⟨U, hU, hA⟩ := hA`). |
| `congr` | To reduce goals to proving component equalities (e.g., after `add_mul`). |
| `ring` | Simplifying polynomial expressions in reals (e.g., verifying algebraic identities like `6/7 * ... = ...`). |
| `norm_num`, `norm_cast` | Handling numeric inequalities and casting between `ℕ` and `ℝ`. |
| `nlinarith` | Solving nonlinear arithmetic goals (e.g., bounding `#P.parts.offDiag`). |
| `sum_le_sum_of_subset_of_nonneg`, `sum_le_sum` | For bounding sums over subsets or refined partitions. |

---

#### **4. Proof Logic**

The proof structure follows a **refinement + energy analysis** pattern:

1. **Define increment partition** as `P.bind (chunk hP G ε)`.
2. **Show it's an equipartition** (`increment_isEquipartition`) using properties of `chunk`.
3. **Control its size** (`card_increment`) using `stepBound` and assumptions on `card α`.
4. **Relate energy sums**:
   - Introduce `distinctPairs` to decompose refined off-diagonal pairs.
   - Prove disjointness (`pairwiseDisjoint_distinctPairs`) and inclusion (`distinctPairs_increment`) to justify summation over refined pairs.
5. **Bound edge density** of original pairs by refined ones (`le_sum_distinctPairs_edgeDensity_sq`), splitting on uniformity.
6. **Combine into energy increment** (`energy_increment`):
   - Expand `P.energy` and `(increment hP G ε).energy`.
   - Use inequality from step 5.
   - Simplify using algebra (`ring`) and arithmetic (`gcongr`, `nlinarith`).
   - Use non-uniformity assumption (`hPG`) to extract a positive lower bound (`ε⁵ / 4`).

The logic is **inductive in spirit** (repeated refinement until uniformity), but here it's a *single-step* analysis.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Combinatorics.SimpleGraph.Regularity.Chunk` | Defines `chunk`, the core refinement tool used to build `increment`. |
| `Mathlib.Combinatorics.SimpleGraph.Regularity.Energy` | Defines `Finpartition.energy`, `edgeDensity`, `IsUniform`, `nonUniforms`, etc. — foundational energy theory. |

These imports situate the file within the formalization of the **Szemerédi Regularity Lemma**, specifically the *incremental refinement* phase.

---

### Summary

This file formalizes the **increment partition** step in the proof of Szemerédi’s Regularity Lemma: given a non-uniform equipartition `P`, it constructs a strictly higher-energy equipartition (`increment hP G ε`) whose size is controlled by `stepBound`. The proof combines combinatorial set-theoretic reasoning (via `bind`, `offDiag`, `chunk`) with analytic estimates on edge densities, culminating in a quantitative energy lower bound (`ε⁵ / 4`). The use of `gcongr` hints at future optimization potential.