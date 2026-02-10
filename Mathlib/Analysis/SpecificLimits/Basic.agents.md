Here's a **structured technical brief** extracted from the provided Lean 4 file, focusing on the requested metadata for building a domain-specific AI agent:

---

### 🔍 **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `tendsto_inverse_atTop_nhds_zero_nat` | `Tendsto (fun n : ℕ ↦ (n : ℝ)⁻¹) atTop (𝓝 0)` | Shows `1/n → 0` in `ℝ` as `n → ∞`. |
| `tendsto_const_div_atTop_nhds_zero_nat` | `Tendsto (fun n ↦ C / n) atTop (𝓝 0)` | Generalizes above to `C/n → 0`. |
| `tendsto_pow_atTop_nhds_zero_iff` | `Tendsto (n ↦ r^n) atTop (𝓝 0) ↔ |r| < 1` | Characterizes geometric decay to 0 in ordered fields. |
| `tendsto_pow_atTop_nhds_zero_of_lt_one` | `0 ≤ r < 1 ⇒ r^n → 0` | One direction of above; used repeatedly. |
| `hasSum_geometric_of_lt_one` | `0 ≤ r < 1 ⇒ ∑ r^n = (1 - r)⁻¹` | Sum of convergent geometric series in `ℝ`. |
| `NNReal.tendsto_pow_atTop_nhds_zero_iff` | `r < 1 ↔ r^n → 0` in `ℝ≥0` | Same as above but for nonnegative reals. |
| `ENNReal.tsum_geometric` | `∑' n, r^n = (1 - r)⁻¹` in `ℝ≥0∞` | Extends geometric series to extended nonnegative reals (including `∞`). |
| `cauchySeq_of_edist_le_geometric` | `edist(f n, f(n+1)) ≤ C·r^n, r < 1 ⇒ f Cauchy` | Key tool for proving convergence in (pseudo)emetric spaces. |
| `dist_le_of_le_geometric_of_tendsto` | Bound on `dist(f n, a)` by `C·r^n/(1 - r)` | Quantitative rate of convergence for Cauchy sequences with geometric decay. |
| `tendsto_natCast_div_add_atTop` | `n/(n + x) → 1` in topological division algebras over `ℝ` | Shows asymptotic behavior of rational functions. |
| `tendsto_mod_div_atTop_nhds_zero_nat` | `(n % m)/n → 0` for fixed `m > 0` | Modular remainder becomes negligible. |
| `Tendsto.num_atTop_iff_den_atTop` | `f/g → a > 0 ⇒ f → ∞ ↔ g → ∞` | Equivalence of divergence under positive asymptotic proportionality. |
| `posSumOfEncodable` | Constructs positive summable sequence on encodable types | Used in measure-theoretic constructions (e.g., probability distributions). |

---

### 📜 **2. Naming Conventions**

- **Prefixes:**
  - `tendsto_..._atTop_nhds_zero`: Convergence to `0` at infinity.
  - `tendsto_..._atTop_nhds_...`: General convergence to a point.
  - `tendsto_..._atTop_atTop`: Divergence to `∞`.
  - `hasSum_...`: Series converges (to a specific value).
  - `summable_...`: Series is summable (exists some sum).
  - `tsum_...`: Value of the sum.
  - `cauchySeq_...`: Sequence is Cauchy.
  - `dist_le_...`, `edist_le_...`: Distance bounds.
  - `geom_...`: Geometric series or sequence properties (`geom_lt`, `geom_le`, etc.).
  - `NNReal.`, `ENNReal.`: Type-specific variants.

- **Suffixes:**
  - `_nat`: Domain is `ℕ` (often cast to `ℝ` or similar).
  - `_of_lt_one`, `_of_one_lt`, `_of_pos`: Hypothesis-driven naming.
  - `_iff`: Biconditional statements.
  - `_comp`, `_mul`, `_div`: Composition/multiplication/division lemmas.

---

### ⚙️ **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` / `simp_rw` | Simplification with definitional equalities, especially for casts (`coe`), `pow`, `div`, `inv`. |
| `rw` | Rewriting using lemmas, often with `←` to go backward. |
| `convert` | Matching goals up to definitional equality or known lemmas. |
| `exact`, `apply`, `refine` | Applying lemmas with holes filled via `?_`. |
| `field_simp` | Field-specific simplification (e.g., division, nonzero assumptions). |
| `aesop` | Automated reasoning for order, positivity, and basic logic. |
| `gcongr` | Generalized congruence for inequalities (e.g., `≤`, `<`). |
| `norm_num` | Normalizing numeric expressions (e.g., `1/2`, `2⁻¹`). |
| `linarith` / `nlinarith` | Linear/nonlinear arithmetic (used implicitly via `aesop`). |
| `ext` | Extensionality for function equality. |
| `filter_upwards` | Filter-based reasoning (e.g., `eventually` statements). |
| `convert ... using n` | Flexibility in matching subgoals. |
| `rcases`, `obtain`, `cases'` | Decomposing existential/universal hypotheses. |

---

### 🧠 **4. Proof Logic & Strategy**

- **Induction & monotonicity**: Used in proving divergence of powers (`tendsto_pow_atTop_atTop_of_one_lt`) via monotonicity and unboundedness.
- **Comparison with geometric series**: Central technique — bounding terms or distances by geometric sequences to deduce convergence/Cauchy-ness.
- **Filter-based reasoning**: Heavy use of `Tendsto`, `eventually`, and `HasSum` in terms of filters (e.g., `atTop`, `𝓝`, `𝓝[>]`).
- **Casting & coercion reasoning**: Many lemmas involve `coe` (e.g., `NNReal.coe_pow`, `ENNReal.coe_zero`) and use `norm_cast`, `push_cast`, `lift` to move between types.
- **Case analysis on order**: `lt_or_le`, `le_or_lt`, `eq_or_lt`, `sign_cases` used to split into subcases (e.g., `r = 0` vs `0 < r`).
- **Equivalence via biconditionals**: Many key results are iff statements (`tendsto_pow_atTop_nhds_zero_iff`, `num_atTop_iff_den_atTop`), proven by two-direction implication.
- **Quantitative bounds**: Often derive explicit bounds (e.g., `dist(f n, a) ≤ C·r^n/(1 - r)`) to support convergence rates.

---

### 📦 **5. Imports & Scope**

**Primary Dependencies:**
- `Mathlib.Algebra.GeomSum`: Geometric sums and identities.
- `Mathlib.Order.Filter.AtTopBot.Archimedean`: Archimedean property and filter behavior.
- `Mathlib.Order.Iterate`: Iterated functions, monotonicity.
- `Mathlib.Topology.Algebra.Algebra`: Topological algebra structures.
- `Mathlib.Topology.Algebra.InfiniteSum.Real`: Infinite sums in `ℝ`.
- `Mathlib.Topology.Instances.EReal`: Extended reals (`ℝ≥0∞`, `ℝ≥0`, `ℝ`).

**Domain Scope:**
- Metric/emetric spaces (`PseudoEMetricSpace`, `PseudoMetricSpace`)
- Ordered rings/fields (`LinearOrderedRing`, `LinearOrderedField`)
- Topological vector spaces over `ℝ` (`TopologicalSpace`, `ContinuousSMul`, `TopologicalDivisionRing`)
- Extended nonnegative reals (`ENNReal`, `NNReal`)
- Countable/encodable types (`Encodable`, `Countable`)

**Notable Exclusions:**
- No `NormedSpace` imports — this file is intentionally independent of normed space theory.
- Focus on *specific* limit computations rather than abstract functional-analytic results.

---

Let me know if you'd like this exported as JSON or YAML for ingestion into an AI agent pipeline.