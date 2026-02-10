Here's a structured technical metadata brief extracted from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ordinaryHypergeometricCoefficient` | `𝕂 → 𝕂 → 𝕂 → ℕ → 𝕂` | Computes the coefficient of $x^n$ in the hypergeometric series: $\frac{(a)_n (b)_n}{(c)_n n!}$ using ascending Pochhammer symbols. |
| `ordinaryHypergeometricSeries` | `𝕂 → 𝕂 → 𝕂 → FormalMultilinearSeries 𝕂 𝔸 𝔸` | Constructs the formal multilinear series whose sum defines the hypergeometric function. |
| `ordinaryHypergeometric` | `𝔸 → 𝔸` | The ordinary hypergeometric function $ {}_2F_1(a,b;c;x) $, defined as the sum of `ordinaryHypergeometricSeries`. |
| `₂F₁` | Notation for `ordinaryHypergeometric` | Shorthand for the hypergeometric function. |
| `ordinaryHypergeometricSeries_apply_eq` | `∀ x n, ... = ... • x ^ n` | Explicitly computes the $n$-th term of the series applied to constant function $x$. |
| `ordinaryHypergeometricSeries_apply_eq'` | `∀ x, ... = fun n => ...` | Pointwise version of the above. |
| `ordinaryHypergeometric_sum_eq` | `sum = ∑' n, ...` | Expresses the sum as a $tsum$ (total sum over ℕ). |
| `ordinaryHypergeometric_eq_tsum` | `₂F₁ a b c = fun x => ∑' n, ...` | Full functional equality of the hypergeometric function with its series expansion. |
| `ordinaryHypergeometricSeries_apply_zero` | `n ↦ 0 ↦ ... = Pi.single ... 1 n` | Evaluates the $n$-th term at $x = 0$. |
| `ordinaryHypergeometric_zero` | `₂F₁ a b c 0 = 1` | Initial value of the hypergeometric function at zero. |
| `ordinaryHypergeometricSeries_symm` | `₂F₁(a,b;c;x) = ₂F₁(b,a;c;x)` | Symmetry in the first two parameters. |
| `ordinaryHypergeometricSeries_eq_zero_of_neg_nat` | If $-a = k < n$, then term $n$ is zero | Shows vanishing of terms when parameters are negative integers. |
| `ordinaryHypergeometricSeries_eq_zero_iff` | `term n = 0 ↔ ∃ k < n, k = -a ∨ k = -b ∨ k = -c` | Iff version (under `[RCLike 𝕂]`) of the above. |
| `ordinaryHypergeometric_radius_top_of_neg_nat₁/₂/₃` | Radius = `⊤` if any parameter is a negative integer | Convergence radius is infinite when series terminates. |
| `ordinaryHypergeometricSeries_norm_div_succ_norm` | Ratio of successive coefficient norms | Used to compute radius of convergence via ratio test. |
| `ordinaryHypergeometricSeries_radius_eq_one` | Radius = `1` if no parameter is a non-positive integer | Main convergence result under non-terminating conditions. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `ordinaryHypergeometric...`: Core naming pattern for all hypergeometric-related definitions.
  - `ofScalars`: Used in `ofScalars_apply_eq`, indicating construction from scalar coefficients.
  - `norm_div_succ_norm`: Ratio of norms of successive terms.
- **Suffixes**:
  - `_eq_zero_of_neg_nat`: Vanishing condition for negative integer parameters.
  - `_eq_zero_iff`: Iff version (under `[RCLike]`).
  - `_radius_top_of_neg_nat₁/₂/₃`: Radius is top (infinite) when parameter is negative integer.
  - `_symm`: Symmetry property.
- **Notation**:
  - `₂F₁`: Standard mathematical notation for Gaussian hypergeometric function.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:

- `simp` / `simp_rw`: Simplification, especially with `norm_mul`, `norm_inv`, `factorial_succ`, etc.
- `rw`: Rewriting using definitions and lemmas.
- `rcases` / `obtain`: Case analysis on existential or disjunctive hypotheses.
- `aesop`: Automated reasoning for arithmetic and ordering (e.g., `k < n`).
- `omega`: Solving linear arithmetic goals over ℕ.
- `field_simp` / `ring_nf`: Algebraic simplification and normalization.
- `convert`: Matching goals up to definitional equality.
- `tendsto` / `Filter.Tendsto.*`: For asymptotic analysis (e.g., ratio test).
- `exact`, `apply`, `intro`, `cases`: Basic proof scripting.

---

### **4. Proof Logic**

- **Structure**:
  - **Definition phase**: Define coefficients, series, and function via `FormalMultilinearSeries.ofScalars`.
  - **Term analysis**: Prove when terms vanish (using `ascPochhammer_eval_eq_zero_iff`).
  - **Convergence analysis** (under `[RCLike]`):
    - Use ratio test: compute `‖coeff n / coeff (n+1)‖`.
    - Show limit of ratio is 1 ⇒ radius = 1.
    - If series terminates (some `k = -a, -b, -c`), show radius = `⊤`.
- **Induction / Cases**:
  - Often on `n : ℕ` (e.g., `cases n` in `ordinaryHypergeometricSeries_apply_zero`).
  - Use `ascPochhammer_eval_eq_zero_iff` to relate vanishing to existence of `k < n`.
- **Symmetry proofs**: Use `simp [mul_comm, mul_assoc]`.

---

### **5. Imports & Dependencies**

| Import | Purpose |
|--------|---------|
| `Mathlib.Analysis.Analytic.OfScalars` | Provides `ofScalars`, used to build formal multilinear series from scalar sequences. |
| `Mathlib.Analysis.SpecificLimits.RCLike` | Provides tools for asymptotic analysis in `RCLike` fields (e.g., `tendsto_add_mul_div_add_mul_atTop_nhds`). |

**Key auxiliary libraries used**:
- `Polynomial.eval`, `ascPochhammer` (from `Mathlib.Data.Polynomial.Pochhammer`)
- `NormedAlgebra`, `NormedDivisionRing`, `TopologicalRing`, `RCLike`
- `Filter`, `Asymptotics`, `Real`, `NormedSpace` (via `RCLike`)

---

Let me know if you'd like a dependency graph or a summary of how this fits into the broader `Mathlib` hypergeometric library.