### Technical Metadata Brief: Rademacher’s Theorem in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `lineDeriv ℝ f x v` | `E → E → ℝ` | Directional (Gateaux) derivative of `f` at `x` in direction `v`, defined as limit of difference quotients. |
| `LineDifferentiableAt ℝ f x v` | Prop | `f` has a line derivative at `x` in direction `v`. |
| `HasLineDerivAt ℝ f l x v` | Prop | `l` is the value of the line derivative of `f` at `x` in direction `v`. |
| `ae_lineDifferentiableAt` | `LipschitzWith C f → v : E → ∀ᵐ p ∂μ, LineDifferentiableAt ℝ f p v` | Step 1: A Lipschitz function is almost everywhere differentiable in any fixed direction. |
| `ae_lineDeriv_sum_eq` | `LipschitzWith C f → ∀ᵐ x ∂μ, lineDeriv f x (∑ a i • v i) = ∑ a i • lineDeriv f x (v i)` | Step 2: The a.e. line derivative is linear in the direction (via Morrey’s duality/integration-by-parts argument). |
| `ae_exists_fderiv_of_countable` | `LipschitzWith C f → s.Countable → ∀ᵐ x ∂μ, ∃ L, ∀ v ∈ s, HasLineDerivAt f (L v) x v` | Step 3a: For countable `s`, a.e. point admits a linear map `L` agreeing with line derivatives on `s`. |
| `hasFderivAt_of_hasLineDerivAt_of_closure` | `LipschitzWith C f → sphere 0 1 ⊆ closure s → (∀ v ∈ s, HasLineDerivAt f (L v) x v) → HasFDerivAt f L x` | Step 3b: If line derivatives on a dense subset of directions are given by a single continuous linear map `L`, then `f` is Fréchet-differentiable at `x` with derivative `L`. |
| `ae_differentiableAt` | `LipschitzWith C f → ∀ᵐ x ∂μ, DifferentiableAt ℝ f x` | **Rademacher’s Theorem**: A Lipschitz function between finite-dimensional real normed spaces is differentiable μ-a.e. |
| `ae_differentiableWithinAt` | `LipschitzOnWith C f s → MeasurableSet s → ∀ᵐ x ∂(μ.restrict s), DifferentiableWithinAt ℝ f s x` | Localized version on subsets. |
| `memℒp_lineDeriv` | `LipschitzWith C f → v : E → Memℒp (lineDeriv _ f x v) ∞ μ` | Line derivative is essentially bounded by `C * ‖v‖`. |
| `integral_lineDeriv_mul_eq` | Integration-by-parts formula for line derivatives (requires compact support). | Key technical tool for proving linearity of line derivative. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `ae_`: Almost-everywhere statements (`ae_lineDifferentiableAt`, `ae_lineDeriv_sum_eq`, `ae_differentiableAt`).
  - `has_`: Existence of derivative (`hasLineDerivAt`, `hasFderivAt`).
  - `memℒp_`: Membership in `ℒ^p` spaces (`memℒp_lineDeriv`).
  - `locallyIntegrable_`: Local integrability (`locallyIntegrable_lineDeriv`).
  - `integral_`: Integral identities (`integral_lineDeriv_mul_eq`, `integral_inv_smul_sub_mul_tendsto_integral_lineDeriv_mul`).

- **Suffixes**:
  - `_of_`: Implication or restriction (`ae_differentiableAt_of_real`, `hasFderivAt_of_hasLineDerivAt_of_closure`).
  - `_on_`: Localized version (`ae_differentiableWithinAt_of_mem`, `LipschitzOnWith`).
  - `_real`: Real-valued special case (often superseded by general version).

- **Other patterns**:
  - `LipschitzWith`, `LipschitzOnWith`: Main classes for Lipschitz conditions.
  - `LineDifferentiableAt`, `HasLineDerivAt`, `DifferentiableAt`, `DifferentiableWithinAt`: Derivative notions.

---

#### **3. Tactic Stack**

| Tactic | Usage Frequency | Role |
|--------|-----------------|------|
| `filter_upwards` | Very High | Pushing a.e. quantifiers through intersections, unions, finite sums. |
| `aesop` / `simp` / `simp_rw` | High | Simplifying goals, rewriting definitions (e.g., `simp_rw [smul_eq_mul]`, `simp only [LineDifferentiableAt]`). |
| `gcongr` | High | Handling inequalities with nonnegative factors (e.g., bounding norms). |
| `rw` / `convert` | High | Rewriting using lemmas, congruence-based substitutions. |
| `field_simp`, `ring` | Medium | Simplifying field expressions and algebraic manipulations. |
| `exact`, `apply`, `intro` | High | Basic proof structure. |
| `rcases`, `obtain`, `cases` | Medium | Decomposing existential/universal hypotheses. |
| `norm_num`, ` positivity` | Low-Medium | Verifying positivity of scalars. |
| `convert` | Medium | Matching up conclusions with small mismatches (e.g., `convert hx.symm`). |

---

#### **4. Proof Logic Flow**

The proof of Rademacher’s theorem follows **Morrey’s elegant argument**, structured in three main steps:

1. **Directional Differentiability (Step 1)**  
   - Reduce to real-valued case (WLOG).  
   - Use 1D result: Lipschitz ⇒ bounded variation ⇒ a.e. differentiable.  
   - Apply Fubini (via `ae_mem_of_ae_add_linearMap_mem`) to lift to arbitrary directions `v`.  
   - Result: `∀ᵐ x, LineDifferentiableAt f x v`.

2. **Linearity of Line Derivative (Step 2)**  
   - Use integration against smooth compactly supported `g`.  
   - Show:  
     `∫ lineDeriv f x v • g(x) dμ = ∫ lineDeriv g x (-v) • f(x) dμ`  
     via dominated convergence + change of variables.  
   - Use this to prove:  
     `lineDeriv f x (∑ a i • v i) = ∑ a i • lineDeriv f x (v i)` a.e.  
   - Key: duality + integration by parts (Morrey’s trick).

3. **Fréchet Differentiability (Step 3)**  
   - Pick countable dense `s ⊆ E` (exists by separability of finite-dim spaces).  
   - Use Step 1 & 2 to get a.e. `x` where:  
     - `f` is line-differentiable in all `v ∈ s`,  
     - `lineDeriv f x (–)` is linear on `s`.  
   - Extend to all directions using density + Lipschitz control (via `hasFderivAt_of_hasLineDerivAt_of_closure`).  
   - Conclude: `f` is Fréchet-differentiable a.e.

The localized version (`LipschitzOnWith`) reduces to the global case via extension (`hf.extend_real`) or product decomposition.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.Calculus.LineDeriv.Measurable` | Measurability of line derivatives. |
| `Mathlib.Analysis.Normed.Module.FiniteDimension` | Finite-dimensional structure, bases, equivalence of norms. |
| `Mathlib.MeasureTheory.Measure.Lebesgue.EqHaar` | Identification of Lebesgue measure with Haar measure. |
| `Mathlib.Analysis.BoundedVariation` | 1D BV ⇒ a.e. differentiable (used in Step 1). |
| `Mathlib.MeasureTheory.Group.Integral` | Integration over groups, translation invariance. |
| `Mathlib.Analysis.Distribution.AEEqOfIntegralContDiff` | Tool for proving equality a.e. via integration against test functions. |
| `Mathlib.MeasureTheory.Measure.Haar.Disintegration` | Fubini-type disintegration (used in directional argument). |

**Scope**:  
- Works in **finite-dimensional real normed spaces** `E`, `F`.  
- Uses **Haar/Lebesgue measure** `μ`.  
- Assumes **Borel structure** (`BorelSpace E`).  
- Main theorem: `LipschitzWith C f → ∀ᵐ x ∂μ, DifferentiableAt ℝ f x`.  
- Generalizes to functions on subsets (`LipschitzOnWith`) and product/target spaces.

---

Let me know if you'd like a diagram of the proof structure or a dependency graph of the key lemmas.