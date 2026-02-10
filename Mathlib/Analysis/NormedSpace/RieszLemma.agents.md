### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `riesz_lemma` | `{F : Subspace 𝕜 E} → IsClosed F → (∃ x, x ∉ F) → r < 1 → ∃ x₀ ∉ F, ∀ y ∈ F, r * ‖x₀‖ ≤ ‖x₀ - y‖` | Constructs a vector outside a closed proper subspace whose distance to the subspace is *almost* its full norm (scaled by any `r < 1`). |
| `riesz_lemma_of_norm_lt` | `{c : 𝕜} → 1 < ‖c‖ → ‖c‖ < R → IsClosed F → (∃ x, x ∉ F) → ∃ x₀, ‖x₀‖ ≤ R ∧ ∀ y ∈ F, 1 ≤ ‖x₀ - y‖` | Refines `riesz_lemma` to guarantee bounded norm (`≤ R`) while maintaining distance ≥ 1 from the subspace, under a nontriviality condition on the field. |
| `Metric.closedBall_infDist_compl_subset_closure` | `x ∈ s → closedBall x (infDist x sᶜ) ⊆ closure s` | Shows that a closed ball centered at a point in `s`, with radius equal to the distance from `x` to the complement of `s`, lies inside the closure of `s`. |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `riesz_lemma*`: Named after *Riesz’s lemma* in functional analysis.
  - `closedBall_*`, `ball_*`, `infDist_*`: Standard metric-space terminology.
- **Suffixes**:
  - `_of_norm_lt`: Indicates a variant conditioned on a norm inequality.
  - `_subset_closure`, `_mem_iff_infDist_zero`: Descriptive suffixes indicating inclusion or equivalence involving topological notions.
- **Structure**:
  - Predicates like `IsClosed`, `Nonempty`, `ne`, `lt`, `le` appear in hypotheses or conclusions.
  - Use of `mem_iff_infDist_zero` suggests equivalence between membership in a closed set and zero inf-distance.

#### 3. **Tactic Stack**

Frequent tactics used in proofs:
- `rcases`, `obtain`, `refine`: For existential/universal reasoning and proof construction.
- `simp`, `simp_rw`, `field_simp`, `ring`, `norm_num`: Simplification and algebraic manipulation.
- `gcongr`: For monotonicity arguments involving norms and inequalities.
- `rw`, `calc`: Chain reasoning with equalities/inequalities.
- `by_contra`, `by_cases`: Classical reasoning.
- `lt_of_le_of_ne`, `lt_div_iff₀`, `mul_lt_iff_lt_one_right`: Arithmetic lemmas for ordered fields/norms.
- `closure_mono`, `singleton_subset_iff`: Topological lemmas.

#### 4. **Proof Logic**

- **Structure of `riesz_lemma`**:
  1. Pick a point `x ∉ F`.
  2. Define `d = infDist x F > 0` (since `F` is closed and `x ∉ F`).
  3. Choose `y₀ ∈ F` close to `x` (within `d / r'`, where `r' = max r 1/2`).
  4. Set `x₀ = x - y₀`, ensuring `x₀ ∉ F`.
  5. Use triangle inequality and properties of inf-distance to bound `‖x₀ - y‖` below by `r * ‖x₀‖`.

- **Structure of `riesz_lemma_of_norm_lt`**:
  1. Apply `riesz_lemma` with `r = ‖c‖ / R < 1`.
  2. Rescale the resulting vector using `rescale_to_shell` to fit within `[R⁻¹ * ‖c‖, R]` norm.
  3. Use field properties and norm multiplicativity to verify the required lower bound on distances.

- **Structure of `closedBall_infDist_compl_subset_closure`**:
  1. Split on whether `infDist x sᶜ = 0`.
  2. If zero: use `x ∈ s` to get inclusion in `closure s`.
  3. If positive: use `closure_ball ⊆ closure s` from `ball_infDist_compl_subset`.

#### 5. **Imports**

- `Mathlib.Analysis.NormedSpace.Real`: For real-normed space theory.
- `Mathlib.Analysis.Seminorm`: For seminormed group and space structures.
- `Mathlib.Topology.MetricSpace.HausdorffDistance`: For `infDist`, `closedBall`, `closure`, and related metric topology lemmas.

These imports indicate the module focuses on **metric and normed-space geometry**, especially leveraging **Hausdorff distance-related tools** and **topological closure properties** in the context of functional analysis.