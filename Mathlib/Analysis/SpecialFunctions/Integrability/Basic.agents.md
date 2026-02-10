### Technical Brief: `Basic.lean` — Integrability of Special Functions

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `intervalIntegrable_pow` | `IntervalIntegrable (fun x ↦ x ^ n) μ a b` | Power function $x \mapsto x^n$ (for $n \in \mathbb{N}$) is integrable on $[a,b]$ under any locally finite measure. |
| `intervalIntegrable_zpow` | `IntervalIntegrable (fun x ↦ x ^ n) μ a b` | Integer power $x \mapsto x^n$ integrable if $n \ge 0$ or $0 \notin [a,b]$. |
| `intervalIntegrable_rpow` | `IntervalIntegrable (fun x ↦ x ^ r) μ a b` | Real power $x \mapsto x^r$ integrable if $r \ge 0$ or $0 \notin [a,b]$. |
| `intervalIntegrable_rpow'` | `IntervalIntegrable (fun x ↦ x ^ r) volume a b` | Weaker condition: $-1 < r$, but only for volume measure. |
| `integrableOn_Ioo_rpow_iff` | `IntegrableOn (fun x ↦ x ^ s) (Ioo 0 t) ↔ -1 < s` | Characterizes integrability of $x^s$ near 0: integrable on $(0,t)$ iff $s > -1$. |
| `intervalIntegrable_cpow` | `IntervalIntegrable (fun x ↦ (x : ℂ) ^ r) μ a b` | Complex power integrable if $\operatorname{re}(r) \ge 0$ or $0 \notin [a,b]$. |
| `intervalIntegrable_cpow'` | `IntervalIntegrable (fun x ↦ (x : ℂ) ^ r) volume a b` | Complex power integrable for $\operatorname{re}(r) > -1$, volume measure only. |
| `integrableOn_Ioo_cpow_iff` | `IntegrableOn (fun x ↦ (x : ℂ) ^ s) (Ioo 0 t) ↔ -1 < s.re` | Complex power integrable near 0 iff real part $> -1$. |
| `intervalIntegrable_log` | `IntervalIntegrable log μ a b` | $\log$ integrable if $0 \notin [a,b]$, any locally finite $\mu$. |
| `intervalIntegrable_log'` | `IntervalIntegrable log volume a b` | $\log$ integrable on any interval w.r.t. volume (handles singularity at 0). |
| `intervalIntegrable_one_div_one_add_sq` | `IntervalIntegrable (fun x ↦ 1 / (1 + x^2)) μ a b` | Integrability of Cauchy kernel (derivative of $\arctan$). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `intervalIntegrable_`: main predicate for integrability over interval $[a,b]$.
  - `integrableOn_Ioo_`: integrability on open interval $(0,t)$, often with iff-characterization.
- **Suffixes**:
  - `'` (prime): weaker hypothesis, but restricted to volume measure (e.g., `rpow'`, `cpow'`).
  - No prime: stronger hypothesis (e.g., $r \ge 0$), but works for any locally finite $\mu$.
- **Structure**:
  - `pow`, `zpow`, `rpow`, `cpow`: real/integer/real-exponent/complex-exponent powers.
  - `log`, `inv`, `one_div`, `id`, `const`, `sin`, `cos`, `exp`: standard functions.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp` / `simp only` | Simplify goals using lemmas, especially `intervalIntegrable_iff`, `norm_cpow_eq_rpow_re`, etc. |
| `rw` | Rewrite using equivalences (e.g., `intervalIntegrable_iff`, `uIoc_of_le`, `neg_zero`). |
| `exact`, `apply`, `convert` | Construct proofs via known integrability lemmas (e.g., `continuous_pow.intervalIntegrable`). |
| `intro`, `cases`, `rcases`, `obtain` | Case analysis on order (`le_total`, `lt_or_eq`), membership (`hx`), or sign. |
| `have`, `suffices` | Introduce intermediate claims (e.g., integrability on $[0,c]$). |
| `congr_fun`, `congr_arg` | Use equality of functions/sets to transfer integrability. |
| `filter_upwards`, `aestronglyMeasurable` | Handle almost-everywhere properties and measurability. |
| `norm_num`, `linarith` | Arithmetic reasoning (e.g., positivity, inequalities). |
| `fun_prop`, `intro` | Functional properties (e.g., continuity, differentiability). |
| `rw [← ...]`, `symm`, `trans` | Reverse rewriting, symmetry, transitivity of integrability. |

---

#### **4. Proof Logic**

**General Strategy**:

1. **Continuity-based integrability**:
   - If $f$ is continuous on $[a,b]$, then `continuous f`.intervalIntegrable.
   - Used for powers with $r \ge 0$, or $0 \notin [a,b]$, or $\log$ away from 0.

2. **Singularity handling at 0**:
   - Reduce to $[0,c]$ or $[c,0]$ via `intervalIntegrable_iff`.
   - Use derivative-based integrability (`integrableOn_deriv_of_nonneg`) for $x^r$, $r > -1$.
   - For $r < 0$, compare to $x^{-1}$ (non-integrable at 0) or use symmetry (e.g., evenness of $\log$).

3. **Complex powers**:
   - Reduce to norm integrability via `intervalIntegrable_norm_iff`.
   - Use `Complex.norm_cpow_eq_rpow_re` to relate to real powers.
   - Handle sign of real part: $\operatorname{re}(r) > 0$ → continuity; $\operatorname{re}(r) = 0$ → constant norm; $\operatorname{re}(r) < 0$ → compare to $|x|^{\operatorname{re}(r)}$.

4. **IFF characterizations**:
   - Prove both directions:
     - ($\Rightarrow$): Assume integrability, derive constraint (e.g., $s > -1$) via comparison with $x^{-1}$.
     - ($\Leftarrow$): Use `intervalIntegrable_rpow'` or `intervalIntegrable_cpow'`.

5. **Measure-theoretic reductions**:
   - Use `intervalIntegrable_iff_integrableOn_Ioo_of_le` to switch between closed and open intervals.
   - Use `integrableOn_congr_fun`, `mono`, `Set.Ioo_subset_Ioo` for comparison.

---

#### **5. Imports**

| Module | Purpose |
|--------|---------|
| `Mathlib.Analysis.SpecialFunctions.Log.NegMulLog` | Properties of $-x \log x$, used in `log'` proof. |
| `Mathlib.Analysis.SpecialFunctions.NonIntegrable` | Likely contains non-integrability criteria (e.g., $x^{-1}$ near 0). |
| `Mathlib.Analysis.SpecialFunctions.Pow.Deriv` | Derivatives of $x^r$, $x \mapsto x^r$, needed for `integrableOn_deriv_of_nonneg`. |

---

#### **6. Mermaid Diagrams**

##### **Dependency Graph (High-Level)**

```mermaid
graph TD
  A[Basic.lean] --> B[Mathlib.Analysis.SpecialFunctions.Log.NegMulLog]
  A --> C[Mathlib.Analysis.SpecialFunctions.NonIntegrable]
  A --> D[Mathlib.Analysis.SpecialFunctions.Pow.Deriv]

  B --> E[Logarithm properties]
  C --> F[Non-integrability of x⁻¹ near 0]
  D --> G[Deriv of x^r]

  A --> H[Integrability criteria]
  H --> I[Power functions (real/complex)]
  H --> J[Logarithm]
  H --> K[Cauchy kernel 1/(1+x²)]
```

##### **Overview of File Structure**

```mermaid
flowchart LR
  subgraph Definitions
    D1[IntervalIntegrable]
    D2[IntegrableOn]
  end

  subgraph Main Theorems
    T1[pow, zpow, rpow]
    T2[rpow', cpow, cpow']
    T3[log, log']
    T4[1/(1+x²)]
  end

  subgraph Characterizations
    C1[integrableOn_Ioo_rpow_iff]
    C2[integrableOn_Ioo_cpow_iff]
  end

  D1 --> T1
  D1 --> T2
  D1 --> T3
  D1 --> T4
  D2 --> C1
  D2 --> C2
  T1 --> C1
  T2 --> C2
```

---

#### **7. Summary**

This file formalizes foundational integrability results for powers and logarithm over intervals, distinguishing between:
- **Singularity at 0** (handled via derivative estimates or comparison),
- **Measure generality** (any locally finite vs. volume-only),
- **Real vs. complex exponents** (via real part analysis).

It serves as a basis for more advanced integration theory (e.g., beta/gamma functions, Fourier analysis), where integrability near singularities is critical.

--- 

Let me know if you'd like a formalized dependency graph (e.g., `leanpkg` tree) or a proof sketch for a specific theorem.
