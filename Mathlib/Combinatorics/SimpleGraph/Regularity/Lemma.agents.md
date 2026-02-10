### Technical Metadata Brief: Szemerédi’s Regularity Lemma in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `szemeredi_regularity` | `∀ {ε : ℝ} {l : ℕ}, 0 < ε → l ≤ card α → ∃ P : Finpartition univ, …` | Main theorem: existence of an `ε`-uniform equitable partition of bounded size. |
| `increment` | `Finpartition α → SimpleGraph α → ℝ → Finpartition α` | Constructs a new equipartition by refining parts using witnesses of non-uniformity. |
| `energy` | `P.energy G` | Measures edge density irregularity of graph `G` w.r.t. partition `P`; bounded in `[0,1]`. |
| `IsUniform` | `P.IsUniform G ε` | Predicate stating that *all* pairs of parts in `P` are `ε`-uniform (i.e., edge densities don’t deviate much from global density). |
| `IsEquipartition` | `P.IsEquipartition` | Predicate ensuring all parts of partition `P` have sizes differing by at most 1. |
| `bound ε l` | `ℕ` | Upper bound on number of parts in final partition (depends only on `ε`, `l`). |
| `initialBound ε l` | `ℕ` | Initial number of parts for the dummy equipartition. |
| `stepBound` | `ℕ → ℕ` | Function iterated during induction to bound growth of partition size per refinement step. |
| `increment_isEquipartition` | `hP.IsEquipartition → (increment hP G ε).IsEquipartition` | Ensures refinement preserves equipartition property. |
| `energy_increment` | `hP.IsEquipartition → … → ε ^ 5 / 4 ≤ (increment hP G ε).energy G - P.energy G` | Key quantitative lemma: energy increases by at least `ε⁵/4` per successful refinement. |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `is_`: Predicate definitions (`isEquipartition`, `isUniform`)
  - `increment_`: Properties of the `increment` operation (`increment_isEquipartition`, `card_increment`)
  - `energy_`: Energy-related lemmas (`energy_increment`, `energy_le_one`, `energy_nonneg`)
  - `initialBound_`, `stepBound_`, `bound_`: Numerical bounds and monotonicity lemmas

- **Suffixes:**
  - `_le_one`, `_nonneg`: Bounding energy from above/below
  - `_mono`, `_monotone`: Monotonicity lemmas
  - `_eq`, `_ge`, `_le`: Inequality directions in numeric bounds

- **Variables & Parameters:**
  - `P`, `G`, `ε`, `l`, `t`, `i`: Standard variables used throughout
  - `hε`, `hl`, `hα`, `hP₁`, etc.: Hypothesis naming convention (`h` + descriptive name)

---

#### **3. Tactic Stack**

Frequently used tactics in the proof:

| Tactic | Usage |
|--------|-------|
| `obtain` / `rcases` | Extracting witnesses from existential statements (e.g., equipartitions, inequalities) |
| `induction'` | Structural induction on natural number `i` (energy-based induction) |
| `by_cases` / `by_contra` | Branching on uniformity or inequality assumptions |
| `rw` / `simp_rw` | Rewriting definitions (e.g., `card`, `energy`, `iterate_succ_apply'`) |
| `gcongr`, `norm_num`, ` positivity` | Arithmetic reasoning, especially for bounding expressions involving `ε` |
| `exact`, `refine`, `apply` | Closing goals with known lemmas or partially applied proofs |
| `trans`, `le_trans`, `lt_irrefl` | Chaining inequalities and contradiction arguments |
| `rwa`, `convert`, `congr'` | Advanced rewriting and congruence handling |

---

#### **4. Proof Logic**

The proof follows a **structured energy-increment argument**, formalized as an induction on natural numbers `i`:

1. **Base case (`i = 0`)**: Use a dummy equipartition of size `initialBound ε l`. Energy ≥ 0 trivially holds.

2. **Inductive step (`i → i+1`)**:
   - Assume existence of equipartition `P` at stage `i` with either:
     - `P` is `ε`-uniform → done (no further refinement needed).
     - Or `P.energy ≥ ε⁵/4 * i` → refine `P` via `increment` to get `P'`.
   - Show `P'.energy ≥ ε⁵/4 * (i+1)` using `energy_increment`.
   - Ensure `P'` remains an equipartition (`increment_isEquipartition`) and size stays bounded (`card_increment`, `stepBound_mono`).

3. **Termination**:
   - Since energy ≤ 1, after `> 4/ε⁵` steps, the “non-uniform” alternative becomes impossible.
   - Thus, the partition at that stage must be `ε`-uniform.

4. **Edge Cases**:
   - Small graphs (`card α ≤ bound ε l`): Use singleton partition (`⊥`), which is trivially uniform.
   - Large `ε` (`ε ≥ 1`): Any equipartition is automatically `ε`-uniform.

---

#### **5. Imports & Dependencies**

| Module | Role |
|--------|------|
| `Mathlib.Combinatorics.SimpleGraph.Regularity.Increment` | Defines `increment` partition and key energy-increment lemma |
| *(Implied)* `Mathlib.Combinatorics.SimpleGraph.Regularity.*` | Full set of supporting files (see comment block):<br>• `Bound`: Numerical bounds<br>• `Energy`: Energy definition & properties<br>• `Uniform`: Uniformity definitions<br>• `Equitabilise`: Equipartition construction<br>• `Chunk`: Local refinement logic<br>• `Lemma`: Final wrap-up (this file) |

Other implicit imports:
- `Mathlib.Data.Fintype.Basic`
- `Mathlib.Data.Finset.Basic`
- `Mathlib.Data.Real.Basic`
- `Mathlib.Data.Finpartition.Basic`

---

This formalization exemplifies a **highly structured, quantitative combinatorial proof**, leveraging Lean’s ability to manage complex arithmetic and inductive reasoning over finite structures.