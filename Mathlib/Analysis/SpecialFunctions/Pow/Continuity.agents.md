Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Continuity of Power Functions in Lean 4 (Mathlib)**

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `cpow_def_of_ne_zero` | Definition of complex power $a^b = \exp(\log a \cdot b)$ when $a \ne 0$ |
| `zero_cpow` | $0^b = 0$ for $b \ne 0$ |
| `rpow_def`, `rpow_def_of_pos`, `rpow_def_of_neg` | Real power definitions: via complex embedding for $a > 0$, and $\exp(\log|a| \cdot b)\cos(\pi b)$ for $a < 0$ |
| `slitPlane` | Subset of $\mathbb{C}$: $\mathbb{C} \setminus (-\infty, 0]$, i.e., complex numbers with positive real part or nonzero imaginary part |
| `continuousAt_cpow` | Continuity of $(z, w) \mapsto z^w$ at points where $z \in \texttt{slitPlane}$ |
| `continuousAt_cpow_zero_of_re_pos` | Continuity at $(0, w)$ when $\operatorname{Re}(w) > 0$ |
| `continuousAt_rpow` | Continuity of $(x, y) \mapsto x^y$ on $\mathbb{R}^2$ when $x \ne 0 \lor y > 0$ |
| `continuousAt_rpow_const` | Continuity of $x \mapsto x^q$ at $x$ when $x \ne 0 \lor 0 \le q$ |
| `continuous_rpow_const` | Global continuity of $x \mapsto x^q$ on $\mathbb{R}_{\ge 0}$ when $q \ge 0$ |
| `continuousAt_rpow` (NNReal) | Continuity of $(x, y) \mapsto x^y$ on $\mathbb{R}_{\ge 0} \times \mathbb{R}$ under $x \ne 0 \lor y > 0$ |
| `continuous_rpow_const` (ENNReal) | Continuity of $x \mapsto x^r$ on $\mathbb{R}_{\ge 0}^\infty$ for any real $r$ |

#### **2. Naming Conventions**

- **Prefixes**:
  - `continuousAt_`, `continuousOn_`, `continuous_`: indicate local/global continuity.
  - `cpow_`, `rpow_`, `nnrpow_`, `ennrpow_`: denote complex, real, nonnegative real, extended nonnegative real powers.
  - `const_`: indicates one argument is fixed (e.g., `const_cpow` = $a^x$).
  - `of_`, `ofReal_`: indicates restriction or embedding (e.g., `ofReal_cpow` = embedding $\mathbb{R} \hookrightarrow \mathbb{C}$).
- **Suffixes**:
  - `_nhds`, `_nhdsWithin`: used in intermediate lemmas about equality in neighborhoods.
  - `_of_`: conditions on arguments (e.g., `rpow_of_pos`, `cpow_of_re_pos`).
  - `_compl_zero`: continuity on complement of zero.

#### **3. Tactic Stack**

- **Core tactics**: `rw`, `simp`, `refine`, `exact`, `cases`, `intro`, `ext`, `dsimp`
- **Topology/analysis-specific**:
  - `continuousAt.comp`, `continuousAt.mul`, `continuousAt_const`, `continuousAt_id`
  - `tendsto.comp`, `tendsto_id`, `tendsto_const_nhds`
  - `squeeze_zero`, `squeeze_zero_norm`
  - `eventually_of_mem`, `eventually_atTop`, `nhdsWithin`, `prod_mk_nhds`
- **Automation**:
  - `aesop`, `norm_cast`, `fun_prop`, ` continuity` (via `fun_prop` lemmas)
  - `rcases`, `obtain`, `cases'` for case analysis on trichotomies (`lt_trichotomy`, `ne_or_eq`, etc.)

#### **4. Proof Logic & Strategy**

- **Induction/Case Analysis**:
  - Trichotomy on real/complex arguments: $x < 0$, $x = 0$, $x > 0$ or $\operatorname{Re}(z) > 0$, etc.
  - Splitting on $x \ne 0 \lor y > 0$ (or variants) to handle singularities.
- **Local-to-Global**:
  - Prove continuity at a point via neighborhood equality (`continuousAt_congr` + `cpow_eq_nhds`).
  - Use `tendsto.comp` to lift pointwise continuity to filter-based convergence.
- **Embedding & Restriction**:
  - Reduce real/NNReal/ENNReal cases to complex ones via `ofReal`, `coe`, `toNNReal`.
  - Use `continuous_real_toNNReal`, `continuous_coe`, etc., for lifting continuity through embeddings.
- **Bounding arguments**:
  - `squeeze_zero`, `abs_rpow_le_exp_log_mul`, `norm_nonneg`, `abs_cpow_le` for handling limits at 0 or ∞.

#### **5. Imports & Dependencies**

- **Primary imports**:
  - `Mathlib.Analysis.SpecialFunctions.Pow.Asymptotics`: asymptotic behavior of powers.
- **Core libraries used**:
  - `TopologicalSpace`, `Filter`, `Complex`, `Real`, `NNReal`, `ENNReal`
  - `ComplexConjugate`, `Finset`, `Set`, `RealOrder`, `ComplexOrder`
- **Key infrastructure**:
  - `fun_prop` infrastructure for automatic continuity propagation.
  - `NeZero`, `ContinuousAt`, `ContinuousOn`, `Tendsto`, `nhds`, `slitPlane`, `arg`, `log`, `exp`, `cos`.

---

This file formalizes a comprehensive continuity theory for power functions across multiple number systems, with careful handling of branch cuts (e.g., slit plane), singularities (e.g., $0^0$), and extended reals. It demonstrates advanced use of filter-based analysis, topological continuity, and embedding arguments in Lean 4.