Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Akra–Bazzi Recurrence Formalization in Lean 4**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `AkraBazziRecurrence` | `structure` | Predicate encoding divide-and-conquer recurrences of the form `T n = ∑ a i * T (r i n) + g n`, with constraints on `a`, `b`, `r`, and `g`. |
| `GrowsPolynomially` | `class` (imported) | Growth condition on `g`: `c₁ g(n) ≤ g(u) ≤ c₂ g(n)` for `b*n ≤ u ≤ n`, `b ∈ (0,1)`. |
| `smoothingFn` / `ε` | `ℝ → ℝ`, `ε x := 1 / log x` | Smoothing factor used to control approximation errors in induction steps. |
| `p` | `noncomputable irreducible_def p : ℝ` | Unique real exponent satisfying `∑ a i * b i ^ p = 1`. |
| `sumTransform` | `ℝ → (ℝ → ℝ) → ℕ → ℕ → ℝ` | `sumTransform p g n₀ n = n^p * ∑_{u ∈ [n₀, n)} g u / u^(p+1)` |
| `asympBound` | `ℕ → ℝ` | Asymptotic bound: `asympBound g a b n = n^p + sumTransform p g 0 n` |
| `isTheta_asympBound` | *Theorem* (not shown in snippet, but mentioned in docstring) | Main result: `T ∈ Θ(asympBound g a b)` |

#### **2. Naming Conventions**

- **Predicates & properties**:  
  - `isLittleO_`, `isEquivalent_`, `isTheta_`, `eventually_`, `growsPolynomially_`, `strictMonoOn_`, `strictAntiOn_`, `differentiableAt_`, `deriv_`, `tendsto_`, `mem_range_`, `injective_`, `continuous_`, `strictAnti_`, `tendsto_zero_`, `tendsto_atTop_`, `tendsto_atBot_`, `one_mem_range_`, `sumCoeffsExp_`, `min_bi`, `max_bi`, `r_lt_n`, `dist_r_b`, `T_pos`, `T_nonneg`, `T_gt_zero'`, `h_rec`, `g_nonneg`, `g_grows_poly`, `b_pos`, `b_lt_one`, `a_pos`, `n₀_gt_zero`, `r_ge`, `r_lt_n`, `eventually_r_`, `eventually_bi_`, `eventually_one_`, `eventually_log_`, `eventually_deriv_`, `eventually_asympBound_`, `asympBound_pos`, `sumTransform_def`, `asympBound_def`, `asympBound_def'`, `p`, `sumCoeffsExp_p_eq_one`, `isEquivalent_smoothingFn_sub_self`, `isTheta_smoothingFn_sub_self`.

- **Prefixes**:
  - `isLittleO_`, `isEquivalent_`, `isTheta_`: asymptotic relations.
  - `eventually_`: filter-based eventual properties.
  - `growsPolynomially_`, `strictMonoOn_`, `strictAntiOn_`, `differentiableAt_`, `deriv_`, `tendsto_`: analysis properties.
  - `min_bi`, `max_bi`: extremal selectors for `b i`.
  - `T_`, `g_`, `a_`, `b_`, `r_`: parameter-related predicates.

- **Suffixes**:
  - `_pos`, `_nonneg`, `_lt_one`, `_gt_zero`, `_le`, `_ge`: inequality properties.
  - `_def`, `_def'`: definition variants.
  - `_atTop`, `_real`, `_atBot`: filter or domain qualifiers.

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `aesop` (with `safe`, `add`, `isBigO_refl`, `isLittleO`, etc.)
- `simp` / `simp_rw`
- `gcongr`, `linarith`, `ring`, `norm_num`
- `filter_upwards`, `eventually`, `rw [Filter.eventually_all]`
- `exact`, `refine`, `calc`, `have`, `obtain`, `cases`
- `continuity`, `aesop`, `aesop (add safe ...)`
- `rw [← Set.mem_range]`, `Function.invFun_eq`, `tendsto_order`, `tendsto_atTop`, `tendsto_atBot`, `tendsto_mul`, `tendsto_pow`, `tendsto_log`, `tendsto_rpow`, `tendsto_inv`, `tendsto_const_mul`, `tendsto_comp`, `tendsto_atTop_mono`, `tendsto_finset_sum`, `tendsto_zero`, `tendsto_atTop`, `tendsto_atBot`

#### **4. Proof Logic & Strategy**

- **Induction**: Strong induction (`Nat.strongRecOn`) used for positivity of `T n`.
- **Filter-based reasoning**: Heavy use of `atTop` filters, `eventually`, and `isLittleO` to handle asymptotics.
- **Monotonicity & continuity**: Proofs rely on monotonicity/continuity of `rpow`, `log`, `inv`, and combinations (e.g., `ε`, `1 ± ε`).
- **Uniqueness of `p`**: Follows from strict monotonicity of `∑ a i * b i ^ x`, proven via `strictAnti_sumCoeffsExp`.
- **Existence of `p`**: Uses intermediate value theorem via continuity and limits at `atTop`/`atBot`.
- **Smoothing function analysis**: Derivatives and asymptotics of `ε` are computed and compared to `x⁻¹`, often via `isLittleO` and `isEquivalent`.
- **Bounding `r i n`**: Sandwich bounds `b i * n ± n / log² n` derived from `dist_r_b`, then used to control recursion depth and error terms.

#### **5. Imports & Dependencies**

- `Mathlib.Computability.AkraBazzi.GrowsPolynomially`: Defines `GrowsPolynomially`, a key growth condition on `g`.
- `Mathlib.Analysis.Calculus.Deriv.Inv`: For derivative rules (e.g., `deriv_div`, `deriv_inv`).
- `Mathlib.Analysis.SpecialFunctions.Pow.Deriv`: For derivatives of `x ^ p`, `rpow`, etc.
- `Finset`, `Real`, `Filter`, `Asymptotics`, `Topology`: Core libraries used for sums, real analysis, filters, and asymptotic notation.

---

This formalization is a rigorous, asymptotically precise treatment of divide-and-conquer recurrences, with a focus on algorithmic analysis. It avoids integrals in favor of sums for computational relevance, and uses advanced real analysis (e.g., `rpow`, `log`, smoothness, derivatives) to support the proof of the Akra–Bazzi theorem in the `ℕ → ℝ` setting.

Let me know if you'd like a summary of the proof sketch of `isTheta_asympBound`, or a breakdown of the `p`-existence/uniqueness argument.