### Technical Brief: Phragmen–Lindelöf Principle in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `isBigO_sub_exp_exp` | `{f g : ℂ → E} → (∃ c < a, B, f =O[...] expR (B * expR (c * |u|))) → same for g → ∃ c < a, B, (f - g) =O[...] expR (B * expR (c * |u|))` | Combines two double-exponential growth bounds into one for the difference. |
| `isBigO_sub_exp_rpow` | Similar to above but with `expR (B * |z| ^ c)` (power-type exponential growth). | Handles sub-exponential (but still super-polynomial) growth bounds. |
| `horizontal_strip` | `DiffContOnCl f (im ⁻¹' Ioo a b)` + growth bound `c < π/(b-a)` + boundary bounds `≤ C` ⇒ `‖f z‖ ≤ C` on closed strip | Main Phragmen–Lindelöf estimate in horizontal strip. |
| `eq_zero_on_horizontal_strip` | Same hypotheses, but `f = 0` on boundary ⇒ `f = 0` on closed strip | Uniqueness / identity theorem version. |
| `eqOn_horizontal_strip` | `f = g` on boundary + same growth ⇒ `f = g` on closed strip | Extensionality version. |
| `vertical_strip`, `eq_zero_on_vertical_strip`, `eqOn_vertical_strip` | Analogous to horizontal versions, with `re` instead of `im`, growth `c < π/(b-a)` in `|im z|`. | Phragmen–Lindelöf in vertical strips. |
| `quadrant_I`, `eq_zero_on_quadrant_I`, `eqOn_quadrant_I` | Growth `c < 2` in `|z|^c`, boundary bounds on positive real & imaginary axes ⇒ bound on closed first quadrant. | Phragmen–Lindelöf in first quadrant. |
| `quadrant_II`, `quadrant_III`, `quadrant_IV` | Analogous to `quadrant_I`, using rotations (`· * I`, `· * -1`, etc.) to reduce to first quadrant. | Extension to other coordinate quadrants. |
| `right_half_plane_of_tendsto_zero_on_real`, `right_half_plane_of_bounded_on_real` | Growth control on right half-plane (`re z > 0`) + boundary behavior on `ℝ≥0` ⇒ global bound. | Phragmen–Lindelöf for right half-plane. |
| `eq_zero_on_right_half_plane_of_superexponential_decay`, `eqOn_right_half_plane_of_superexponential_decay` | If `f` decays faster than any `exp(-|z|^α)` on `ℝ≥0` (α > 1), and satisfies growth condition, then `f = 0`. | Strong uniqueness result, tailored for Ilyashenko’s finiteness proof. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isBigO_...`: auxiliary lemmas about Big-O estimates.
  - `eq_zero_on_...`, `eqOn_...`: uniqueness / extensionality corollaries.
  - `horizontal_strip`, `vertical_strip`, `quadrant_...`, `right_half_plane`: domain-specific principle names.
- **Suffixes**:
  - `_of_...`: variants based on assumptions (e.g., `tendsto_zero_on_real`, `bounded_on_real`, `superexponential_decay`).
  - `_sub_exp_exp`, `_sub_exp_rpow`: indicate the type of growth estimate being combined.
- **Function names**:
  - `expR` = `Real.exp` (local notation).
  - `aff`, `g`, `δ`, `d`, `R`: internal auxiliary constructions in proofs.

---

#### **3. Tactic Stack**

The proofs rely heavily on:

| Tactic | Usage |
|--------|-------|
| `rcases`, `obtain`, `cases'` | Extract witnesses from existential hypotheses (`∃ c < a, B, ...`). |
| `gcongr`, `linarith`, `norm_num` | Inequalities involving real exponentials, maxima, positivity. |
| `simp only [...]`, `rw [...]` | Simplify norms, exponentials, real/imag parts using `Complex` lemmas. |
| `filter_upwards`, `eventually...` | Handle filter-based estimates (e.g., `cobounded`, `atTop`). |
| `convert`, `apply`, `exact` | Apply lemmas with matching conclusion (e.g., `norm_le_zero_iff.1`, `sub_eq_zero.1`). |
| `tendsto_*` tactics (`tendsto_exp_atTop`, `tendsto_atTop_add`, etc.) | Asymptotic analysis of growth bounds. |
| `aesop` (implied) | Likely used in background simplification (not explicit but common in Mathlib). |
| `ring`, `linarith`, `field_simp` | Algebraic simplifications (e.g., `(a + b)/2 ± (b - a)/2`). |

---

#### **4. Proof Logic**

- **Structure**:
  1. **Reduction to bounded case**: Often assume `C > 0`, reduce to `C = 0` via scaling or density.
  2. **Change of variables**:
     - Horizontal → vertical via multiplication by `I`.
     - Quadrants → strip via `exp` or `log` (e.g., `z = exp ζ` maps strip `0 < Im ζ < π/2` to first quadrant).
  3. **Auxiliary multiplier function**:
     - In `horizontal_strip`, define `g ε w = exp(ε (exp(aff w) + exp(-aff w)))` to dampen growth and ensure `g ε z • f z → 0` at infinity.
  4. **Apply maximum modulus principle**:
     - Use `norm_le_of_forall_mem_frontier_norm_le` on large rectangles.
     - Verify bounds on horizontal sides via boundary assumptions (`hle_a`, `hle_b`) and on vertical sides via asymptotic decay.
  5. **Uniqueness**:
     - For `eq_zero_on_*`, apply the main estimate to `f` with `C = 0`.
     - For `eqOn_*`, apply to `f - g`.

- **Induction / recursion**: Not used; all proofs are direct applications of maximum modulus + asymptotic estimates.

---

#### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.Analysis.Complex.AbsMax`: Maximum modulus principle and related lemmas.
  - `Mathlib.Analysis.Asymptotics.SuperpolynomialDecay`: Tools for decay estimates (e.g., `superexponential_decay`).
- **Key underlying theories**:
  - Complex analysis (`Complex`, `Differentiable`, `Holomorphic`).
  - Filter theory (`isBigO`, `tendsto`, `cobounded`, `atTop`).
  - Metric/topological structure on `ℂ` (as `ℝ²`).
  - Normed space theory (`NormedSpace ℂ E`, `DiffContOnCl`).
- **Domain**: Complex analysis on unbounded domains, especially strips, quadrants, and half-planes.

---

#### **6. Notable Technical Highlights**

- **Critical constant**: `π / (b - a)` for strips (sharp for exponential type).
- **Quadrant threshold**: `c < 2` (sharp for power-type growth in angle `π/2`).
- **Right half-plane**: Uses `superexponential_decay` (faster than any `exp(-|z|^α)`, α > 1) to force uniqueness.
- **Rotation tricks**: `· * I`, `· * -I`, `Neg.neg` to reduce quadrant cases to first quadrant.

---

This formalization is a sophisticated synthesis of complex analysis, asymptotic analysis, and filter-based reasoning — typical of modern Mathlib developments. It is especially tailored for applications in dynamical systems (e.g., Ilyashenko’s finiteness theorem for limit cycles).