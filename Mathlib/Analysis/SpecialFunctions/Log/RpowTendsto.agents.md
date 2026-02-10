### Technical Brief: `RpowTendsto.lean`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Real.norm_inv_mul_rpow_sub_one_sub_log_le` | `∀ {p x : ℝ}, 0 < p → 0 < x → ‖p * log x‖ ≤ 1 → ‖p⁻¹ * (x ^ p - 1) - log x‖ ≤ p * ‖log x‖ ^ 2` | Quantitative bound on the difference between the power expression and the logarithm, under a smallness condition on $p \log x$. |
| `Real.tendstoLocallyUniformlyOn_rpow_sub_one_log` | `TendstoLocallyUniformlyOn (λ p x ↦ p⁻¹ * (x ^ p - 1)) log (𝓝[>] 0) (Ioi 0)` | Shows that $p^{-1}(x^p - 1)$ converges *locally uniformly* to $\log x$ on $(0, \infty)$ as $p \to 0^+$. |
| `tendsto_rpow_sub_one_log` | `∀ x > 0, Tendsto (λ p ↦ p⁻¹ * (x ^ p - 1)) (𝓝[>] 0) (𝓝 (log x))` | Pointwise convergence of $p^{-1}(x^p - 1) \to \log x$ as $p \to 0^+$, for each fixed $x > 0$. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `norm_...`: bounds involving norms (e.g., `norm_inv_mul_rpow_sub_one_sub_log_le`)
  - `tendsto...`: convergence statements (`tendsto_rpow_sub_one_log`, `tendstoLocallyUniformlyOn_rpow_sub_one_log`)
- **Suffixes**:
  - `_le`: inequality upper bounds (e.g., `..._le`)
  - `_rpow`: involving real power $x^p$
  - `_sub_one_log`: expressions of the form $p^{-1}(x^p - 1)$ vs $\log x$

---

#### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Role |
|--------|------|
| `grind` | Simplification and rewriting using algebraic identities, especially for real arithmetic and norm properties. |
| `gcongr` | Goal-directed congruence reasoning for inequalities (e.g., bounding expressions). |
| `simp only [...]` | Precise simplification with explicit lemmas. |
| `rw [...]` | Rewriting using known equalities (e.g., `Real.exp_mul`, `Real.exp_log`). |
| `filter_upwards [...]` | Handling filters and eventually-quantified statements. |
| `fun_prop` | Proving continuity properties (e.g., `ContinuousOn`). |
| `refine`, `intro`, `calc`, `have`, `let` | Standard proof structuring. |
| `grind [_root_.inv_nonneg]` | Automatic positivity/negativity reasoning. |

---

#### **4. Proof Logic**

The logical flow follows a standard pattern for uniform convergence proofs on compact sets:

1. **Reduction to compact subsets** via `tendstoLocallyUniformlyOn_iff_forall_isCompact`.
2. **Uniform bound derivation** using:
   - A key inequality (`norm_inv_mul_rpow_sub_one_sub_log_le`) that bounds the error in terms of $p$ and $\|\log x\|^2$.
   - Compactness ensures $\|\log x\|$ is bounded on the set $s$, allowing control over the error term.
3. **Choice of radius** $p_{\text{bound}} = \varepsilon / (\sup \|\log x\|^2 + 1)$ ensures the error is $< \varepsilon$.
4. **Verification of smallness condition** $\|p \log x\| \le 1$ using bounds on $p$ and $\|\log x\|$.
5. **Chain of inequalities** (`calc`) to finalize the uniform bound.
6. **Pointwise convergence** follows from local uniform convergence via `TendstoLocallyUniformlyOn.tendsto_at`.

Induction is *not* used; the proof is analytic and relies on continuity, compactness, and elementary real analysis.

---

#### **5. Imports**

- `Mathlib.Analysis.SpecialFunctions.Pow.Real`: Provides definitions and basic properties of real exponentiation $x^p$, especially via `Real.rpow`, `Real.exp`, and `Real.log`.
- `Topology.Basic` (via `open scoped Topology`): For filter and uniform convergence machinery (`TendstoLocallyUniformlyOn`, `𝓝[>]`, `Ioi`).
- `Metric.Space` (via `Metric.uniformity_basis_dist_le`): For metric-characterization of uniform convergence.

---

#### **6. Mermaid Diagrams**

##### **Dependency Graph (File-Level)**

```mermaid
graph TD
  A[RpowTendsto.lean] --> B[Mathlib.Analysis.SpecialFunctions.Pow.Real]
  A --> C[Mathlib.Topology.Basic]
  A --> D[Mathlib.Analysis.Calculus.LocalExtr.Basic]  %% for continuity lemmas
  A --> E[Mathlib.Analysis.NormedSpace.Basic]         %% for norm properties
  B --> F[Mathlib.Analysis.SpecialFunctions.ExpLog]
  B --> G[Mathlib.Analysis.SpecialFunctions.Pow.Complex] %% possibly shared infrastructure
```

##### **Overview of Theoretical Flow**

```mermaid
flowchart LR
  subgraph Definitions
    A[x^p via exp(log)] --> B[p⁻¹(x^p − 1)]
  end

  subgraph Core Lemma
    C[norm_inv_mul_rpow_sub_one_sub_log_le] --> D[Error bound]
  end

  subgraph Convergence
    D --> E[Locally Uniform Convergence]
    E --> F[Pointwise Convergence]
  end

  subgraph Tools
    G[Compactness] --> D
    H[Continuity of log] --> G
    I[Filter arithmetic] --> E
  end

  C -->|used in| E
  D -->|used in| F
```

---

#### **7. Summary**

This file formalizes a classical result in real analysis: the logarithm arises as the derivative at $p = 0$ of the function $p \mapsto x^p$, i.e.,  
$$
\lim_{p \to 0^+} \frac{x^p - 1}{p} = \log x \quad \text{for } x > 0.
$$
It provides both **pointwise** and **locally uniform** convergence, with an explicit error bound. The formalization leverages Lean’s `Real.rpow`, continuity of `log`, and compactness arguments to control uniformity. The proof is fully constructive in the sense of providing an explicit rate (quadratic in $\|\log x\|$), and is typical of modern analysis libraries like Mathlib.
