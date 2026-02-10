### Technical Metadata Brief: `hofer` Lemma in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `hofer` | Main theorem: In a complete metric space `X`, given `x ∈ X`, `ε > 0`, and a continuous nonnegative function `ϕ : X → ℝ`, there exists `ε' ≤ ε` and `x' ∈ X` such that: <br> • `d(x', x) ≤ 2ε` <br> • `ε·ϕ(x) ≤ ε'·ϕ(x')` <br> • `∀ y, d(x', y) ≤ ε' → ϕ(y) ≤ 2·ϕ(x')` <br> *(This is a quantitative refinement of a local boundedness property, used in bubbling-off analysis.)* |
| `reformulation` | Helper equivalence: `ε * ϕ x ≤ ε / 2^k * ϕ x' ↔ 2^k * ϕ x ≤ ϕ x'`, derived using positivity of `ε`. |
| `H` | Negated goal assumption, used to derive a contradiction via induction. |
| `F` | Choice function `ℕ × X → X`, constructed via `choose!`, satisfying: <br> `d x' y ≤ ε / 2^k ∧ 2 * ϕ x' < ϕ y` whenever `d x' x ≤ 2ε ∧ 2^k * ϕ x ≤ ϕ x'`. |
| `u : ℕ → X` | Sequence defined recursively: `u 0 = x`, `u (n+1) = F(n, u n)`. |
| `key₁`, `key₂` | Two key properties of `u`: <br> • `d(u n, u (n+1)) ≤ ε / 2^n` <br> • `2 * ϕ(u n) < ϕ(u (n+1))` |
| `cauchy_u` | Proof that `u` is Cauchy (via summable tail bound `ε / 2^n`). |
| `limy` | Limit of `u` (guaranteed by completeness). |
| `lim_top` | Proof that `ϕ ∘ u → +∞` (via geometric growth from `key₂`). |
| `lim` | Continuity of `ϕ` implies `ϕ ∘ u → ϕ(y)` (contradicts `lim_top`). |

---

#### **2. Naming Conventions**

- **Predicates & properties**:  
  - `nonneg`, `cont`, `ε_pos`, `H`, `key`, `cauchy_u`, `limy`, `lim_top`, `lim` — descriptive, often short and action-oriented.
- **Inductive/recursive constructions**:  
  - `u`, `F`, `v` — standard for sequences/functions.
- **Quantifier/inequality helpers**:  
  - `reformulation`, `A`, `B` — intermediate logical/inequality steps.
- **Metric-related**:  
  - `d` (local notation for `dist`), `dist_le_range_sum_dist`, `dist_comm`.
- **Induction helpers**:  
  - `IH` (induction hypothesis), `hF`, `hu`.

---

#### **3. Tactic Stack**

| Tactic | Role |
|--------|------|
| `by_contra` | Assume negation to derive contradiction. |
| `push_neg` | Convert negated quantifiers into positive form. |
| `rw [div_mul_eq_mul_div, le_div_iff₀, ...]` | Algebraic rewriting using field inequalities. |
| ` positivity` | Prove inequalities involving nonnegative expressions. |
| `choose!` | Axiom of choice: extract a function from a forall-exists statement. |
| `induction ... using Nat.case_strong_induction_on` | Strong induction on `ℕ` for recursive sequence properties. |
| `calc` | Chain of inequalities (used in bounding `d(u 0, u (n+1))`). |
| `sum_le_sum`, `Finset.sum_mul`, `field_simp`, `gcongr` | Summation and simplification for geometric series bounds. |
| `simpa [reformulation] using` | Simplify using a known equivalence. |
| `tendsto_add_atTop_iff_nat`, `tendsto_atTop_of_geom_le` | Convergence at infinity lemmas for sequences. |
| `not_tendsto_atTop_of_tendsto_nhds` | Final contradiction step: a sequence cannot tend both to a finite limit and `+∞`. |

---

#### **4. Proof Logic**

- **High-level strategy**: *Proof by contradiction using inductive sequence construction*.
  1. Assume the negation of the desired conclusion.
  2. Use this to build a choice function `F` that, given a point `x'` and index `k`, finds a point `y` with strictly larger `ϕ`-value within a shrinking ball (`ε / 2^k`).
  3. Define a sequence `u` recursively: `u₀ = x`, `u_{n+1} = F(n, u_n)`.
  4. Prove two key properties of `u` by strong induction:
     - Distances between successive terms decay geometrically (`≤ ε / 2^n`) → `u` is Cauchy.
     - `ϕ(u_n)` grows at least exponentially (`> 2^n ϕ(x)`) → `ϕ ∘ u → +∞`.
  5. By completeness, `u → y` for some `y ∈ X`.
  6. By continuity of `ϕ`, `ϕ(u_n) → ϕ(y)` — contradiction with divergence to `+∞`.

- **Critical insight**: The geometric decay of distances ensures convergence, while exponential growth of `ϕ(u_n)` contradicts continuity at the limit.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.SpecificLimits.Basic` | Provides convergence lemmas (`tendsto_atTop_of_geom_le`, `tendsto_add_atTop_iff_nat`, etc.) and basic limit theory. |
| `Topology`, `Filter`, `Finset` | Used for metric space topology (`dist`, `CauchySeq`, `Tendsto`), summation over finite sets, and filter-based arguments. |

**Domain**: Metric geometry + analysis on complete spaces.  
**Application context**: Motivated by symplectic topology (bubbling-off analysis), though the lemma itself is purely metric/analytic.

--- 

Let me know if you'd like a formalized dependency graph or a step-by-step tactic trace.