### Technical Brief: `CPolynomial` Theory in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `HasFiniteFPowerSeriesOnBall` | `f : E → F → FormalMultilinearSeries → ℕ → ℝ≥0∞ → Prop` | States that `f` equals the sum of a *finite* formal multilinear series `p` on `EMetric.ball x r`, and `pₘ = 0` for all `m ≥ n`. |
| `HasFiniteFPowerSeriesAt` | `f : E → F → FormalMultilinearSeries → ℕ → Prop` | Local version: `f` has a finite power series on *some* ball around `x`. |
| `CPolynomialAt` | `f : E → F → E → Prop` | `f` is *continuously polynomial* at `x`: admits a finite power series expansion near `x`. |
| `CPolynomialOn` | `f : E → F → Set E → Prop` | `f` is continuously polynomial at every point of `s`. |
| `changeOrigin` | `FormalMultilinearSeries → E → ℕ → ContinuousMultilinearMap` | Shifts the expansion point of a formal multilinear series. |
| `changeOrigin_finite_of_finite` | `∀ {n}, (∀ m ≥ n, p m = 0) → ∀ k ≥ n, p.changeOrigin x k = 0` | Shows `p.changeOrigin x` remains finite with same bound. |
| `HasFiniteFPowerSeriesOnBall.changeOrigin` | `HasFiniteFPowerSeriesOnBall f p x n r → y ∈ B(x,r) ⇒ HasFiniteFPowerSeriesOnBall f (p.changeOrigin y) (x+y) n (r - ‖y‖)` | Key localization result: finite power series at `x` implies one at nearby `y`, via `changeOrigin`. |
| `isOpen_cPolynomialAt` | `IsOpen {x | CPolynomialAt f x}` | The set of points where `f` is continuously polynomial is open. |
| `HasFiniteFPowerSeriesOnBall.hasFPowerSeriesOnBall` | `hf : HasFiniteFPowerSeriesOnBall f p x n r ⇒ HasFPowerSeriesOnBall f p x r` | Finite implies analytic (no completeness needed). |
| `CPolynomialAt.analyticAt` | `CPolynomialAt f x ⇒ AnalyticAt f x` | Continuously polynomial ⇒ analytic. |
| `ContinuousMultilinearMap.hasFiniteFPowerSeriesOnBall` | `f : ContinuousMultilinearMap ⇒ HasFiniteFPowerSeriesOnBall f f.toFormalMultilinearSeries (Fintype.card ι + 1) ⊤` | Continuous multilinear maps are continuously polynomial. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `HasFiniteFPowerSeriesOnBall` / `HasFiniteFPowerSeriesAt`: Existence of *finite* power series.
  - `CPolynomialAt` / `CPolynomialOn`: Class of *continuously polynomial* functions.
  - `changeOrigin`: Operation to recenter a series.
  - `finite`: Predicate on series (`∀ m ≥ n, p m = 0`).
- **Suffixes**:
  - `OnBall`: Global on a ball.
  - `At`: Local (neighborhood).
  - `On`: Global on a set.
- **Other patterns**:
  - `mk'`: Constructive introduction rule (often with explicit `finite` and `sum_eq`).
  - `congr`: Congruence under equality a.e. or on a set.
  - `mono`: Monotonicity in radius or domain.
  - `eventually`: Neighborhood-based variants.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Role |
|--------|------|
| `simp` / `simp_rw` | Simplify definitions (e.g., `partialSum`, `changeOrigin`, `finite`). |
| `aesop` / `tauto` | Automated reasoning for set membership, filter filters, openness. |
| `rw` / `apply` | Rewrite using lemmas like `changeOrigin_eval_of_finite`, `finite`, `hasSum`. |
| `exact` / `refine` | Construct proofs with explicit witnesses (e.g., `⟨p, n, r, hf⟩`). |
| `convert` | Match goals up to definitional equality (e.g., sums). |
| `rw [add_comm, add_sub_cancel]` | Algebraic reordering in normed spaces. |
| `apply_fun`, `ext`, `funext` | Extensionality for multilinear maps / functions. |
| `tsub_le_tsub_right`, `nnnorm_add_le` | Metric/analysis lemmas for radii and norms. |
| `set_option maxSynthPendingDepth 2` | Workaround for elaboration depth (used in `changeOriginSeriesTerm_bound`). |

---

#### **4. Proof Logic & Strategy**

- **Induction / finite support**: Proofs often rely on truncating infinite sums to finite ones using `finite : ∀ m ≥ n, p m = 0`.
- **Localization via `changeOrigin`**: Core technique: given a finite expansion at `x`, derive one at `y ∈ B(x,r)` using `p.changeOrigin y`, and prove finiteness via `changeOrigin_finite_of_finite`.
- **Filter-based arguments**: Use `eventually`, `𝓝 x`, `𝓝ˢ s` to handle local behavior and openness.
- **Congruence lemmas**: Prove stability under equality a.e. (`=ᶠ[𝓝 x]`) or on open sets (`EqOn`), crucial for sheaf-like properties.
- **Summability & uniqueness**: Leverage `hasSum.unique`, `tsum_eq_sum`, and `summable_of_ne_finset_zero` to identify sums.
- **Continuity & analyticity**: Derive analyticity from finite power series via `HasFiniteFPowerSeriesOnBall.hasFPowerSeriesOnBall`, avoiding completeness assumptions.

---

#### **5. Imports & Scope**

**Primary imports**:
- `Mathlib.Analysis.Analytic.ChangeOrigin`: Provides `changeOrigin`, `changeOriginSeries`, radius bounds.
- `Mathlib.Analysis.Analytic.Constructions`: General analytic function theory (e.g., `HasFPowerSeriesOnBall`, `AnalyticAt`).

**Domain scope**:
- Normed vector spaces over a `NontriviallyNormedField 𝕜`.
- Functions `E → F` between normed spaces.
- Formal multilinear series (`FormalMultilinearSeries 𝕜 E F`) and their truncations.
- Emphasis on *finite* truncations → avoids completeness (unlike full analytic theory).
- Includes applications to:
  - Constant functions
  - Continuous multilinear maps (hence analytic)
  - Openness of the domain of continuous polynomiality.

---

This module formalizes a *finite-rank* variant of analyticity, enabling stronger generality (no completeness) and concrete computational control (via truncation bounds), while preserving key analytic properties (analyticity, continuity, openness of domain).