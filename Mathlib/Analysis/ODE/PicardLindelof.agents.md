Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Picard–Lindelöf Theorem in Lean 4**

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `IsPicardLindelof` | A `Prop`-valued structure encoding the hypotheses of the Picard–Lindelöf theorem: Lipschitz continuity in `x`, continuity in `t`, boundedness of `v`, and a compatibility condition `C * max(...) ≤ R`. Used as the public API. |
| `PicardLindelof` | A bundled structure holding all data from `IsPicardLindelof` plus concrete values for parameters (`tMin`, `tMax`, `t₀`, `x₀`, `C`, `R`, `L`). Part of the internal API to avoid repeated choice. |
| `FunSpace` | Space of curves `γ : Icc tMin tMax → E` with `γ(t₀) = x₀` and Lipschitz constant `C`. Equipped with the sup-metric (via embedding into continuous maps). |
| `vComp` | For `f : FunSpace v`, `vComp t = v(proj t, f(proj t))`, where `proj` is the projection onto `[tMin, tMax]`. Used to define the integral operator. |
| `next` | The Picard–Lindelöf operator: `next f (t) = x₀ + ∫_{t₀}^t vComp τ dτ`. Maps `FunSpace v → FunSpace v`. |
| `dist_iterate_next_apply_le` | Quantitative estimate on how `next^[n]` contracts distances: `dist(next^[n] f₁ t, next^[n] f₂ t) ≤ (L·|t−t₀|)^n / n! · dist(f₁, f₂)`. |
| `exists_contracting_iterate` | Shows some iterate `next^[N]` is a strict contraction (since `(L·tDist)^N / N! → 0`). |
| `exists_solution` | Main existence theorem: under `CompleteSpace E`, there exists a fixed point `f` of `next`, i.e., a solution to the integral equation. |
| `IsPicardLindelof.exists_forall_hasDerivWithinAt_Icc_eq` | Public theorem: if `IsPicardLindelof` holds, then there exists `f : ℝ → E` solving the ODE `∂/∂t f(t) = v(t, f(t))` *within* `[tMin, tMax]`. |
| `exists_isPicardLindelof_const_of_contDiffAt` | Shows that a time-independent ODE `ẋ = v(x)` with `v` continuously differentiable at `x₀` satisfies `IsPicardLindelof` locally. |
| `exists_forall_hasDerivAt_Ioo_eq_of_contDiffAt` | Corollary: local *classical* solution exists on an open interval `(t₀−ε, t₀+ε)` when `v` is `C¹`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`: for `Prop`-valued hypothesis bundles (`IsPicardLindelof`, `isFixedPt`, `isClosed`, `isUniformInducing`).
  - `proj`: projection maps (`proj`, `projIcc`, `proj_coe`, `proj_of_mem`).
  - `vComp`: composition with vector field `v` and projection.
  - `next`: Picard iteration operator.
  - `dist_`, `norm_`, `mem_`: metric/norm-related lemmas.
  - `iterate_`: for iterated applications (`iterate_succ_apply'`, `dist_iterate_next_apply_le`).

- **Suffixes**:
  - `_le`, `_lt`, `_nonneg`: inequality direction.
  - `_apply`: application to arguments (`next_apply`, `map_t₀`).
  - `_on`, `_within`: for restricted domains (`LipschitzOnWith`, `HasDerivWithinAt`).
  - `_iff`, `_eventuallyEq`: logical equivalences or up-to-filter reasoning.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp_rw`: simplification with definitional equalities and rewrite rules.
- `exact`, `refine`, `apply`: constructing proofs term-by-term.
- `gcongr`, `linarith`, `nlinarith`: for inequalities and arithmetic.
- `intervalIntegral`-specific tactics: `integral_same`, `integral_sub`, `norm_integral_le_of_norm_le_const`, `integral_pow_abs_sub_uIoc`.
- `filter_upwards`: for filter-based arguments (e.g., neighborhoods).
- `induction ... generalizing ...`: structural induction with generalization.
- `lift ... using ...`: coercions and subtype lifting.
- `continuous_proj`, `fun_prop`, `continuousOn.comp`, `continuous_swap.continuousOn`: continuity automation.
- `aesop` (implied via `fun_prop`, `continuous_*` lemmas): for routine continuity/ measurability goals.

---

#### **4. Proof Logic**

The proof follows the classical **contraction mapping principle** approach:

1. **Setup**: Encode assumptions in `IsPicardLindelof` → instantiate `PicardLindelof` structure.
2. **Function space**: Define `FunSpace` of Lipschitz curves through `x₀`; show it’s complete if `E` is.
3. **Operator**: Define `next` via the integral formulation of the ODE.
4. **Contraction estimate**:
   - Prove `dist(next f₁ t, next f₂ t) ≤ L·|t−t₀|·dist(f₁,f₂)`.
   - Iterate to get `dist(next^[n] f₁, next^[n] f₂) ≤ (L·tDist)^n / n! · dist(f₁,f₂)`.
   - Use `tendsto_pow_div_factorial_atTop` to find `N` where `next^[N]` is a strict contraction.
5. **Fixed point**: Apply `fixedPoint_iterate` (from `MetricSpace` theory) to get `f` with `next f = f`.
6. **Differentiability**: Show `f ∘ proj` satisfies the ODE *within* `[tMin, tMax]` using `HasDerivWithinAt` and fundamental theorem of calculus for interval integrals.
7. **Local existence for `C¹` vector fields**: Reduce to `IsPicardLindelof` via local Lipschitzness and boundedness from `ContDiffAt`.

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.SpecialFunctions.Integrals` | Interval integrals, fundamental theorem of calculus, norm estimates for integrals. |
| `Mathlib.Topology.Algebra.Order.Floor` | Used for `FloorSemiring.tendsto_pow_div_factorial_atTop` (asymptotics of `x^n / n!`). |
| `Mathlib.Topology.MetricSpace.Contracting` | Contraction mapping theorem, fixed points of iterates. |

**Core dependencies**:
- `MeasureTheory` (for `intervalIntegral`, `volume`, integrability).
- `MetricSpace`, `ContinuousMap`, `Lipschitz` (for function space structure).
- `NormedSpace`, `NormedAddCommGroup` (for Banach space setting).
- `Interval` (for `Icc`, `Ioo`, `projIcc`).
- `Filter`, `TopologicalSpace` (for continuity, neighborhoods, filters).

---

Let me know if you'd like a diagram of the proof structure or a summary of how uniqueness is handled (via `ODE_solution_unique` in `Gronwall.lean`).