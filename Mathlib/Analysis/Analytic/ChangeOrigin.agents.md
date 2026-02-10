### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `changeOriginSeriesTerm` | `ℕ → ℕ → Finset (Fin (k + l)) → s.card = l → E[×l]→L[𝕜] E[×k]→L[𝕜] F` | Constructs individual terms in the re-centered power series by distributing inputs between `y` (new origin shift) and `z` (variable). |
| `changeOriginSeriesTerm_apply` | `p.changeOriginSeriesTerm k l s hs x y = p(k + l)(s.piecewise x y)` | Evaluates the term explicitly using `piecewise` assignment of arguments. |
| `norm_changeOriginSeriesTerm`, `nnnorm_changeOriginSeriesTerm` | `‖p.changeOriginSeriesTerm k l s hs‖ = ‖p(k + l)‖` | Shows that the operator norm is preserved under reorganization. |
| `changeOriginSeries` | `ℕ → FormalMultilinearSeries 𝕜 E (E[×k]→L[𝕜] F)` | Defines the `k`-th coefficient of the re-centered series as a sum over all subsets of size `l`. |
| `changeOrigin` | `E → FormalMultilinearSeries 𝕜 E F` | Re-centered formal multilinear series: `(p.changeOrigin x).sum y = p.sum (x + y)` when convergent. |
| `changeOriginIndexEquiv` | `(Σ k l : ℕ, { s : Finset (Fin (k + l)) // s.card = l }) ≃ Σ n : ℕ, Finset (Fin n)` | Key combinatorial equivalence used to reindex sums over subsets. |
| `changeOrigin_eval` | `(‖x‖₊ + ‖y‖₊ < p.radius) → (p.changeOrigin x).sum y = p.sum (x + y)` | Core analytic identity: evaluating the re-centered series at `y` gives original series at `x + y`. |
| `changeOrigin_radius` | `p.radius - ‖x‖₊ ≤ (p.changeOrigin x).radius` | Lower bound on radius of convergence of the re-centered series. |
| `hasFPowerSeriesOnBall_changeOrigin` | `HasFPowerSeriesOnBall (fun x ↦ p.changeOrigin x k) (p.changeOriginSeries k) 0 p.radius` | Shows each coefficient of `p.changeOrigin x` has a power series expansion around `0`. |
| `analyticAt_changeOrigin` | `p.radius > 0 → AnalyticAt 𝕜 (fun x ↦ p.changeOrigin x n) 0` | Coefficients of the re-centered series are analytic at `0`. |
| `HasFPowerSeriesWithinOnBall.changeOrigin` | `HasFPowerSeriesWithinOnBall f p s x r → y ∈ B(0, r) → HasFPowerSeriesWithinOnBall f (p.changeOrigin y) s (x + y) (r - ‖y‖)` | Re-centering a function’s power series within a set. |
| `HasFPowerSeriesOnBall.analyticAt_of_mem` | `y ∈ B(x, r) → AnalyticAt 𝕜 f y` | Main consequence: analyticity at a point implies analyticity at all points in some neighborhood. |
| `isOpen_analyticAt` | `IsOpen { x | AnalyticAt 𝕜 f x }` | Set of analyticity points is open — key topological consequence. |

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `changeOrigin`: Indicates operations related to shifting the origin of a power series.
  - `changeOriginSeriesTerm`: Term-level component of the re-centered series.
  - `changeOriginSeries`: Series-level (i.e., coefficient-level) re-centering.
  - `derivSeries`: Power series for the derivative (uses `changeOriginSeries 1`).
- **Suffixes**:
  - `_term`, `_series`, `_eval`, `_radius`, `_le`, `_aux₁`, `_aux₂`, `_aux₃`: Standard Lean naming for components, results, and auxiliary lemmas.
- **Structure**:
  - `p.changeOrigin x k` — `k`-th coefficient of re-centered series at `x`.
  - `p.changeOriginSeries k l` — `l`-th coefficient of the `k`-th coefficient series.
  - `p.changeOriginSeriesTerm k l s hs` — summand indexed by subset `s`.

---

#### 3. **Tactic Stack**

Frequent tactics used in proofs:
- `simp` / `simp_rw`: For simplifying expressions involving `piecewise`, `curryFinFinset`, norms, and sums.
- `rw`: Rewriting using lemmas like `changeOrigin_eval`, `changeOriginIndexEquiv`, and `hasSum`.
- `apply`, `exact`, `refine`: For constructing proofs step-by-step.
- `convert_to`: Used to adjust goals with definitional equalities (e.g., in `changeOriginIndexEquiv.left_inv`).
- `nnnorm_*` lemmas and `NNReal`-based reasoning (`tsum`, `summable`, `le_of_forall_nnreal_lt`).
- `aesop`: Likely used in routine norm/inequality reasoning (not explicit in snippet but common in Mathlib).
- `ring`, `abel`: For algebraic simplifications (e.g., `add_tsub_cancel`, `tsub_add_cancel`).
- `finset`-specific tactics: `sum_eq_zero`, `hasSum_fintype`, `sigma`, `map`, `piecewise`.

---

#### 4. **Proof Logic**

- **Combinatorial reindexing**: Proofs rely heavily on `changeOriginIndexEquiv` to switch between:
  - Summation over `(k, l, s)` with `s ⊆ Fin(k + l)`, `|s| = l`
  - Summation over `(n, t)` with `t ⊆ Fin n`.
- **Norm estimates**:
  - Use `nnnorm_changeOriginSeriesTerm_apply_le` and `le_opNNNorm` to bound terms.
  - Apply `NNReal.summable_of_le` and comparison tests to prove convergence.
- **Analyticity arguments**:
  - Show `HasFPowerSeriesOnBall` for re-centered coefficients → deduce `AnalyticAt`.
  - Use `hasFPowerSeriesOnBall.changeOrigin` to propagate analyticity from one point to a neighborhood.
- **Inductive/structural reasoning**:
  - Many proofs proceed by fixing `k`, `l`, and analyzing subsets `s ⊆ Fin(k + l)`.
  - Use `Finset.card_compl`, `Finset.piecewise`, and `curryFinFinset` to decompose multilinear maps.

---

#### 5. **Imports**

- `Mathlib.Analysis.Analytic.Basic`: Core definitions of analyticity, power series, `HasFPowerSeriesOnBall`, etc.
- `NNReal`, `ENNReal`, `Topological`, `Filter`, `Set`: For radius-of-convergence reasoning and topology.
- `ContinuousMultilinearMap`, `Curry`, `Finset`, `Fin`, `Embedding`, `Congr`, `Equiv`: For handling multilinear maps and combinatorial indexing.

---

### Summary

This file formalizes the *re-centering* of formal multilinear power series in Banach spaces, proving:
- The re-centered series converges on at least the subball `B(x, R - ‖x‖)`.
- Its sum coincides with the original series evaluated at `x + y`.
- Analyticity is an *open* property — a foundational result in local analytic theory.

The formalization is highly structured, leveraging:
- Multilinear map currying (`curryFinFinset`, `continuousMultilinearCurryFin1`)
- Combinatorial indexing (`changeOriginIndexEquiv`)
- Norm estimates in `NNReal`/`ENNReal`
- Topological arguments (`isOpen_analyticAt`, `analyticAt_of_mem`)

It serves as a key step toward the general theory of analytic functions in infinite-dimensional spaces.