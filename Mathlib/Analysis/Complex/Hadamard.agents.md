### Technical Brief: Hadamard Three-Lines Theorem in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `verticalStrip a b` | `Set ℂ` | Open vertical strip: `re ⁻¹' Ioo a b` |
| `verticalClosedStrip a b` | `Set ℂ` | Closed vertical strip: `re ⁻¹' Icc a b` |
| `sSupNormIm f x` | `ℝ` | Supremum of `‖f(z)‖` over the vertical line `re z = x` (denoted `M(x)`) |
| `interpStrip f z` | `ℂ → ℂ` | Interpolation: `(M(0))^(1−z) * (M(1))^z`, with `ite` to handle zero cases |
| `invInterpStrip f z ε` | `ℂ` | Regularized inverse of `interpStrip`: `(ε + M(0))^(z−1) * (ε + M(1))^(−z)` |
| `F f ε z` | `ℂ → E` | Test function: `invInterpStrip f z ε • f z`, used to apply Phragmén–Lindelöf |
| `norm_le_interpStrip_of_mem_verticalClosedStrip` | `∀ z ∈ re ⁻¹' [0,1], ‖f z‖ ≤ ‖interpStrip f z‖` | Main theorem: Hadamard three-lines bound on closed strip |
| `norm_le_interp_of_mem_verticalClosedStrip'` | `∀ z ∈ re ⁻¹' [0,1], ‖f z‖ ≤ a^(1−z.re) * b^z.re` | Practical corollary: bounds in terms of edge suprema `a = sup_{re=0} ‖f‖`, `b = sup_{re=1} ‖f‖` |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`, `mem_`, `edge_`, `BddAbove_`, `diffContOnCl_`: indicate properties (e.g., membership, boundedness, differentiability).
  - `norm_`, `abs_`, `rpow_`: refer to norm, absolute value, and real power operations.
- **Suffixes**:
  - `_eps`: perturbation by `ε > 0` (regularization).
  - `_of_mem_...`: conditional on membership in a set (e.g., `of_mem_verticalClosedStrip`).
  - `_of_...`: conditional on assumptions (e.g., `of_pos`, `of_zero`, `of_eventuallyLE`).
- **Function names**:
  - `F`, `invInterpStrip`, `interpStrip`, `sSupNormIm`: descriptive, often matching mathematical literature (`M(x)` → `sSupNormIm`).

---

#### **3. Tactic Stack**

| Tactic | Frequency | Role |
|--------|-----------|------|
| `simp` / `simp_rw` | Very High | Simplify definitions, rewrite using lemmas (e.g., `abs_cpow_eq_rpow_re_of_pos`, `interpStrip_eq_of_pos`) |
| `rw` | High | Apply equalities (especially `← ofReal_add`, `sub_re`, `one_re`, `neg_re`) |
| `gcongr` | Medium | Handle inequalities with monotone functions (e.g., powers) |
| `apply`, `exact`, `refine` | High | Proof construction, especially for `DiffContOnCl`, `BddAbove`, and Phragmén–Lindelöf |
| `cases` / `rcases` | Medium | Split disjunctions (`hz : z ∈ re ⁻¹' {0,1}`) or existential quantifiers |
| `push_neg` | Medium | Convert `¬(P ∨ Q)` to `¬P ∧ ¬Q` (e.g., for positivity arguments) |
| `filter_upwards` | Low | Handle filter-based limits (e.g., `eventuallyLE` in limit argument) |
| `convert`, `tendsto_*`, `apply Tendsto.*` | Low | Continuity/limit arguments (e.g., `tendsto_nhdsWithin_congr`) |
| `aesop` / `linarith` | Low-Medium | Linear arithmetic (e.g., positivity of `ε + sSupNormIm`) |
| `ring` | Rare | Algebraic simplifications (e.g., `mul_neg`, `neg_sub`) |

---

#### **4. Proof Logic Flow**

- **Core Strategy**: Reduce to **Phragmén–Lindelöf principle** on the open strip `verticalStrip 0 1`, using:
  1. **Regularization** (`invInterpStrip` with `ε > 0`) to avoid singularities when `M(0)` or `M(1)` vanish.
  2. **Boundedness** of `F f ε` on the closed strip (via `F_BddAbove`).
  3. **Edge bounds** (`F_edge_le_one`) showing `‖F f ε‖ ≤ 1` on `re = 0` and `re = 1`.
  4. Apply `PhragmenLindelof.vertical_strip` to conclude `‖F f ε z‖ ≤ 1` on the whole closed strip.
  5. Let `ε → 0⁺` using continuity and `tendsto_le_of_eventuallyLE` to remove regularization.

- **Structure of Main Proof** (`norm_le_interpStrip_of_mem_verticalClosedStrip`):
  - Prove inequality on **open strip** (`verticalStrip 0 1`) via `norm_le_interpStrip_of_mem_verticalStrip_zero`.
  - Extend to **closed strip** using `le_on_closure`, leveraging continuity of `z ↦ ‖f z‖` and `z ↦ ‖interpStrip f z‖`.

- **Variant Proof** (`norm_le_interp_of_mem_verticalClosedStrip'`):
  - Relate `sSupNormIm f 0` and `sSupNormIm f 1` to given bounds `a`, `b`.
  - Use `csSup_le` to show `sSupNormIm f 0 ≤ a`, `sSupNormIm f 1 ≤ b`.
  - Combine with main theorem and monotonicity of real powers.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.SpecialFunctions.Pow.Deriv` | Differentiability and calculus of complex powers (`cpow`), crucial for `diffContOnCl_invInterpStrip`, `diffContOnCl_interpStrip` |
| `Mathlib.Analysis.Complex.PhragmenLindelof` | Core tool: Phragmén–Lindelöf principle for strips (used in `norm_mul_invInterpStrip_le_one_of_mem_verticalClosedStrip`) |

**Domain**: Complex analysis on vertical strips in `ℂ`, with emphasis on:
- Boundedness and differentiability conditions,
- Supremum norms along vertical lines,
- Convexity of `log M(x)` (implicit in the inequality `M(z.re) ≤ M(0)^{1−z.re} M(1)^{z.re}`).

**Key Structures**:
- `NormedAddCommGroup E`, `NormedSpace ℂ E`: General target space (e.g., `ℂ`, `ℝ`, Banach spaces).
- `DiffContOnCl`: Differentiability on the interior with continuity on the closure (standard for Phragmén–Lindelöf).

--- 

This formalization exemplifies a **rigorous, structure-aware application** of advanced complex analysis in Lean 4, leveraging Mathlib’s powerful analysis library for infinite-dimensional settings.