Here is a **structured technical brief** extracted from the provided Lean 4 file, focusing on formalization metadata for domain-specific AI agent training:

---

### 🔑 **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `HasSum.hasSum_at_zero` | `HasSum (λ n ↦ 0 ^ n • a n) (a 0)` | Shows that the series with only the 0-th term survives when multiplying by `0^n`. |
| `HasSum.exists_hasSum_smul_of_apply_eq_zero` | `HasSum (z^m • a m) s ∧ (∀ k < n, a k = 0) → ∃ t, z^n • t = s ∧ HasSum (z^m • a (m+n)) t` | Enables factoring out a power of `z` from a convergent power series when lower coefficients vanish. |
| `HasFPowerSeriesAt.has_fpower_series_dslope_fslope` | `HasFPowerSeriesAt f p z₀ → HasFPowerSeriesAt (dslope f z₀) p.fslope z₀` | Relates derivative-like operation `dslope` to formal series operation `fslope`. |
| `HasFPowerSeriesAt.iterate_dslope_fslope_ne_zero` | `p ≠ 0 → (swap dslope z₀)^[p.order] f z₀ ≠ 0` | Non-vanishing of the first non-zero derivative at the order of vanishing. |
| `HasFPowerSeriesAt.eq_pow_order_mul_iterate_dslope` | `∀ᶠ z ∈ 𝓝 z₀, f z = (z - z₀)^p.order • (swap dslope z₀)^[p.order] f z` | Local factorization of analytic function near `z₀` as power of `(z - z₀)` times non-vanishing analytic function. |
| `HasFPowerSeriesAt.locally_ne_zero` | `p ≠ 0 → ∀ᶠ z ∈ 𝓝[≠] z₀, f z ≠ 0` | Zeros of non-zero analytic functions are isolated (local version). |
| `HasFPowerSeriesAt.locally_zero_iff` | `(∀ᶠ z ∈ 𝓝 z₀, f z = 0) ↔ p = 0` | Characterizes identically zero germs via vanishing of formal power series. |
| `AnalyticAt.eventually_eq_zero_or_eventually_ne_zero` | `(∀ᶠ z ∈ 𝓝 z₀, f z = 0) ∨ ∀ᶠ z ∈ 𝓝[≠] z₀, f z ≠ 0` | **Main local principle of isolated zeros**: analytic function is either identically zero near `z₀`, or non-vanishing puncturally. |
| `AnalyticAt.frequently_eq_iff_eventually_eq` | `(∃ᶠ z ∈ 𝓝[≠] z₀, f z = g z) ↔ ∀ᶠ z ∈ 𝓝 z₀, f z = g z` | For analytic `f, g`, agreement on a punctured neighborhood implies agreement on full neighborhood. |
| `AnalyticAt.order` | `AnalyticAt 𝕜 f z₀ → ENat` | Defines order of vanishing: `∞` if identically zero near `z₀`, else unique natural `n` such that `f = (z - z₀)^n • g` with `g(z₀) ≠ 0`. |
| `AnalyticAt.order_eq_top_iff` / `order_eq_nat_iff` | Characterizations of `order` in terms of local behavior. | |
| `AnalyticOnNhd.eqOn_of_preconnected_of_frequently_eq` | `EqOn f g U` under analyticity, preconnectedness, and frequent equality near a point in `U`. | **Identity theorem** for analytic functions on connected domains. |
| `AnalyticOnNhd.eq_of_frequently_eq` | `f = g` if analytic on all of `𝕜`, connected, and agree frequently near some point. | Global identity theorem. |

---

### 📝 **Naming Conventions**

- **Prefixes:**
  - `has_fpower_series_...`: properties of `HasFPowerSeriesAt`.
  - `iterate_dslope_fslope`: repeated application of derivative/series operators.
  - `locally_...`: neighborhood-based properties (e.g., `locally_ne_zero`, `locally_zero_iff`).
  - `eventually_...`: filter-based eventual behavior (`eventually_eq_zero_or_eventually_ne_zero`, `eventually_eq_or_eventually_ne`).
  - `frequently_...`: filter-based frequent behavior (`frequently_zero_iff_eventually_zero`).
  - `unique_...`: uniqueness of representation (e.g., `unique_eventuallyEq_pow_smul_nonzero`).
  - `eqOn_...`: equality on a set (`eqOn_zero_of_preconnected_of_frequently_eq_zero`).
  - `eq_...`: global equality (`eq_of_frequently_eq`).

- **Suffixes:**
  - `_iff`: biconditional characterizations.
  - `_or_...`: dichotomy results.
  - `_ne_zero`: non-vanishing statements.
  - `_zero`: vanishing/zero-locus statements.

---

### ⚙️ **Tactic Stack**

Frequently used tactics in proofs:
- `rw`, `simp`, `simp_rw`: rewriting and simplification (especially with `hasFPowerSeriesAt_iff'`, `coeff_*`, `zpow_*`).
- `convert`: for flexible equality proofs (e.g., matching up series expansions).
- `filter_upwards`: for working with filter-based eventual statements.
- `rcases`, `obtain`, `cases'`: destructuring existential/universal hypotheses.
- `field_simp`, `ring`, `simp only`: algebraic simplifications in normed fields.
- `intro`, `intro!`, `intros`: standard proof intros.
- `contrapose!`: for contrapositive reasoning.
- `wlog`: without loss of generality (used in uniqueness proofs).
- `exact`, `assumption`, `apply`: basic proof steps.
- `convert ... using n`: for controlled conversion steps.

---

### 🧠 **Proof Logic Patterns**

1. **Local Structure via Power Series:**
   - Start with `rcases hf with ⟨p, hp⟩` to get a formal series representation.
   - Use `hp` to derive properties of derivatives via `has_fpower_series_dslope_fslope`, `iterate_dslope_fslope_ne_zero`, etc.
   - Factor out lowest non-zero coefficient using `eq_pow_order_mul_iterate_dslope`.

2. **Isolation of Zeros:**
   - If `p ≠ 0`, then `locally_ne_zero` gives punctured neighborhood where `f ≠ 0`.
   - If `p = 0`, then `eventually_eq_zero` gives full neighborhood where `f = 0`.

3. **Identity Principle:**
   - Reduce to zero function via subtraction: `f - g`.
   - Use `frequently_eq_iff_eventually_eq` to promote agreement on punctured nbhd to full nbhd.
   - Apply `eqOn_zero_of_preconnected_of_frequently_eq_zero` (or variant) to extend to whole domain.

4. **Uniqueness of Order:**
   - Assume two representations `(z - z₀)^m • g` and `(z - z₀)^n • j`.
   - Derive contradiction if `m ≠ n` using `frequently_eq_iff_eventually_eq` and non-vanishing of `g, j`.

5. **ENat-based Order Definition:**
   - Use `if ... then ... else ...` to define `order` as `∞` or `n`.
   - Prove correctness via `order_eq_top_iff` and `order_eq_nat_iff`.

---

### 📦 **Imports & Scope**

**Core Imports:**
- `Mathlib.Analysis.Analytic.Constructions`
- `Mathlib.Analysis.Calculus.DSlope`
- `Mathlib.Analysis.Calculus.FDeriv.Analytic`
- `Mathlib.Analysis.Analytic.Uniqueness`

**Key Open Namespaces:**
- `Filter`, `Function`, `Nat`, `FormalMultilinearSeries`, `EMetric`, `Set`
- `Topological` (via `open scoped Topology`)

**Type Class Assumptions:**
- `[NontriviallyNormedField 𝕜]`
- `[NormedAddCommGroup E]`, `[NormedSpace 𝕜 E]`

**Domain Focus:**
- One-dimensional complex (or real) analytic function theory.
- Local and global behavior of zeros, identity theorems, order of vanishing.
- Formal power series machinery (`FormalMultilinearSeries`, `HasFPowerSeriesAt`).

---

Let me know if you'd like this exported as JSON or YAML for ingestion into a domain-specific AI agent.