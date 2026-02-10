### Technical Metadata Brief: `Mathlib.Analysis.Seminorm.Egauge`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `egauge` | `𝕜 : Type* [NNNorm 𝕜] → {E : Type*} [SMul 𝕜 E] → s : Set E → x : E → ℝ≥0∞` | Minkowski functional (gauge) of a set `s`, mapping `x` to the infimum of `‖c‖₊` over all `c : 𝕜` such that `x ∈ c • s`. Generalizes `gauge` to normed semifields (e.g., `ℝ≥0`). |
| `egauge_anti` | `s ⊆ t → egauge 𝕜 t x ≤ egauge 𝕜 s x` | Monotonicity of `egauge` w.r.t. set inclusion. |
| `egauge_le_of_mem_smul` | `x ∈ c • s → egauge 𝕜 s x ≤ ‖c‖₊` | Upper bound on `egauge` when `x` lies in a scaled copy of `s`. |
| `le_egauge_iff` | `r ≤ egauge 𝕜 s x ↔ ∀ c, x ∈ c • s → r ≤ ‖c‖₊` | Characterization of lower bounds of `egauge`. |
| `egauge_lt_iff` | `egauge 𝕜 s x < r ↔ ∃ c, x ∈ c • s ∧ ‖c‖₊ < r` | Characterization of strict upper bounds. |
| `egauge_eq_top` | `egauge 𝕜 s x = ∞ ↔ ∀ c, x ∉ c • s` | When `egauge` is infinite: iff `x` is not in any scaled copy of `s`. |
| `egauge_zero_left_eq_top` | `egauge 𝕜 0 x = ∞ ↔ x ≠ 0` | `egauge` of the zero set is infinite except at `0`. |
| `egauge_le_of_smul_mem_of_ne` | `c • x ∈ s ∧ c ≠ 0 → egauge 𝕜 s x ≤ ‖c‖₊⁻¹` | Refinement of `egauge_le_of_mem_smul` using inverse norm. |
| `egauge_le_of_smul_mem` | `c • x ∈ s → egauge 𝕜 s x ≤ (‖c‖₊)⁻¹` | Same as above, handles `c = 0` trivially. |
| `mem_of_egauge_lt_one` | `Balanced s → egauge 𝕜 s x < 1 → x ∈ s` | If `x` has `egauge < 1` and `s` is balanced, then `x ∈ s`. |
| `egauge_eq_zero_iff` | `egauge 𝕜 s x = 0 ↔ ∃ᶠ c ∈ 𝓝[≠] 0, x ∈ c • s` | `egauge` vanishes iff `x` lies in arbitrarily small scaled copies of `s`. |
| `egauge_zero_right` | `s.Nonempty → egauge 𝕜 s 0 = 0` | `egauge` at `0` is `0` if `s` is nonempty. |
| `egauge_smul_left` | `c ≠ 0 → egauge 𝕜 (c • s) x = egauge 𝕜 s x / ‖c‖₊` | Scaling behavior of `egauge` under left multiplication of the set. |
| `egauge_smul_right` | `c = 0 → s.Nonempty → egauge 𝕜 s (c • x) = ‖c‖₊ * egauge 𝕜 s x` | Scaling behavior under right multiplication (i.e., scaling the vector). |
| `div_le_egauge_closedBall` | `‖x‖₊ / r ≤ egauge 𝕜 (closedBall 0 r) x` | Lower bound of `egauge` on closed balls. |
| `egauge_ball_le_of_one_lt_norm` | `1 < ‖c‖ → egauge 𝕜 (ball 0 r) x ≤ ‖c‖₊ * ‖x‖₊ / r` | Upper bound of `egauge` on open balls using rescaling lemma. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `egauge_`: core properties of the Minkowski functional.
  - `le_egauge_`: inequalities involving `egauge` as lower bound.
  - `egauge_le_`: inequalities involving `egauge` as upper bound.
  - `egauge_smul_`: behavior under scalar multiplication (left/right).
  - `div_le_egauge_`: lower bounds using division by norms.

- **Suffixes**:
  - `_left`, `_right`: distinguish between scaling the *set* vs. the *vector*.
  - `_of_mem_smul`, `_of_smul_mem`: based on membership in scaled sets.
  - `_iff`: biconditional characterizations.
  - `_eq_top`, `_eq_zero`: special values of `egauge`.

- **Notable patterns**:
  - `egauge_zero_left` vs `egauge_zero_right`: left = scaling set by `0`, right = scaling argument by `0`.
  - `egauge_le_of_smul_mem_of_ne` vs `egauge_le_of_smul_mem`: distinction for invertible vs. possibly zero scalars.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` | Simplification of `egauge`, `iInf`, `smul`, `nnnorm`, `ENNReal` coercions. |
| `rw` | Rewriting using lemmas like `egauge_lt_iff`, `egauge_eq_top`, `inv_smul_smul₀`, etc. |
| `exact` / `apply` | Applying lemmas like `egauge_le_of_mem_smul`, `mem_of_egauge_lt_one`. |
| `rcases` / `cases` | Splitting on `c = 0` or `x = 0`, especially in `egauge_smul_*` proofs. |
| `gcongr` | Handling inequalities involving `≤` and `‖·‖₊`, especially in `div_le_egauge_*`. |
| `refine` / `exact` + `calc` | Structured chaining of inequalities (e.g., in `egauge_ball_le_of_one_lt_norm`). |
| `simp_rw` | Combining `simp` and `rw` for complex rewrites (e.g., in `le_egauge_smul_left`). |
| `aesop` (not present) | Not used — proofs are mostly manual and rely on structured rewriting. |

---

#### **4. Proof Logic**

- **General Strategy**:
  - Most proofs are **case analyses** on whether scalars or vectors are zero.
  - Use of **infimum characterizations** (`iInf`, `iInf₂`) to reduce to concrete bounds.
  - **Balanced set arguments** rely on `mem_of_egauge_lt_one`, using the definition of balanced sets.
  - For normed spaces, proofs often use:
    - `rescale_to_shell_semi_normed` to construct scalars with controlled norms.
    - `div_le_iff` / `mul_le_iff` for `ENNReal` arithmetic.
    - `nnnorm_*` lemmas (e.g., `nnnorm_mul`, `nnnorm_inv`) to manipulate norms.

- **Typical Flow**:
  1. Unfold `egauge` as `iInf₂`.
  2. Apply `le_iInf₂_iff` or `iInf₂_le` to get/construct bounds.
  3. Use `mem_smul_set_iff_*` lemmas to translate membership conditions.
  4. Handle zero/nonzero cases separately.
  5. Use `ENNReal` arithmetic lemmas to manipulate inequalities.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Analysis.Seminorm` | Core definitions: `SeminormedAddCommGroup`, `NormedSpace`, `NNNorm`, `nnnorm`, `balanced`, etc. |
| `Set`, `Filter`, `Metric` | For set operations (`smul_set`, `ball`, `closedBall`), filters (`𝓝[≠]`, `frequently`), metric concepts. |
| `Topological`, `Pointwise`, `ENNReal`, `NNReal` | For `ENNReal` arithmetic, scalar multiplication, and topological structure. |

---

### Summary

This file formalizes the **Minkowski functional** (`egauge`) in the generality of **topological vector spaces over normed semifields**, especially targeting `𝕜 = ℝ≥0`. It establishes foundational properties (monotonicity, scaling behavior, relation to norms), and prepares the ground for generalizing Fréchet differentiability beyond normed spaces. The proofs rely heavily on `ENNReal` analysis, case splits on zero, and careful manipulation of scalar multiplication and norms.