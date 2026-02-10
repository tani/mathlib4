Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: One-Dimensional Derivatives in Lean 4 (Mathlib)**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `HasDerivAtFilter f f' x L` | `𝕜 → F → F → 𝕜 → Filter 𝕜 → Prop` | `f` has derivative `f'` at `x` along filter `L`: `f(x') = f(x) + (x' - x) • f' + o(x' - x)` as `x' →[L] x`. |
| `HasDerivWithinAt f f' s x` | `𝕜 → F → F → Set 𝕜 → 𝕜 → Prop` | Derivative within set `s` at `x`. |
| `HasDerivAt f f' x` | `𝕜 → F → F → 𝕜 → Prop` | Standard (unrestricted) derivative at `x`. |
| `HasStrictDerivAt f f' x` | `𝕜 → F → F → 𝕜 → Prop` | Strict differentiability: `f y - f z = (y - z) • f' + o(y - z)` as `y,z → x`. |
| `derivWithin f s x` | `𝕜 → F → Set 𝕜 → 𝕜 → F` | Derivative within `s` at `x`, defined as `fderivWithin 𝕜 f s x 1`. Returns `0` if derivative doesn’t exist. |
| `deriv f x` | `𝕜 → F → 𝕜 → F` | Derivative at `x`, defined as `fderiv 𝕜 f x 1`. Returns `0` if derivative doesn’t exist. |
| `hasDerivAtFilter_iff_hasFDerivAtFilter` | `HasFDerivAtFilter f f' x L ↔ HasDerivAtFilter f (f' 1) x L` | Connects Fréchet derivative `f'` to 1D derivative `f' 1`. |
| `hasDerivWithinAt_iff_hasFDerivWithinAt` | `HasDerivWithinAt f f' s x ↔ HasFDerivWithinAt f (smulRight 1 f') s x` | Equivalence for derivative within a set. |
| `hasStrictDerivAt_iff_hasStrictFDerivAt` | `HasStrictDerivAt f f' x ↔ HasStrictFDerivAt f (smulRight 1 f') x` | Strict derivative ↔ strict Fréchet derivative. |
| `derivWithin_zero_of_not_differentiableWithinAt` | `¬DifferentiableWithinAt f s x → derivWithin f s x = 0` | Derivative zero if not differentiable within. |
| `differentiableWithinAt_of_derivWithin_ne_zero` | `derivWithin f s x ≠ 0 → DifferentiableWithinAt f s x` | Nonzero derivative implies differentiability. |
| `derivWithin_fderivWithin` | `(fderivWithin f s x : 𝕜 → F) 1 = derivWithin f s x` | `fderivWithin` evaluated at `1` equals `derivWithin`. |
| `deriv_fderiv` | `smulRight 1 (deriv f x) = fderiv f x` | `fderiv` is scalar multiplication by `deriv`. |
| `deriv_id'` | `deriv (id : 𝕜 → 𝕜) = fun _ ↦ 1` | Derivative of identity is `1`. |
| `deriv_const'` | `deriv (fun _ ↦ c) = fun _ ↦ 0` | Derivative of constant is `0`. |
| `hasDerivAt_iff_isLittleO` | `HasDerivAt f f' x ↔ (f x' - f x - (x' - x) • f') =o[𝓝 x] (x' - x)` | Derivative iff little-o condition. |
| `hasDerivAt_iff_tendsto` | `HasDerivAt f f' x ↔ ‖x' - x‖⁻¹ * ‖f x' - f x - (x' - x) • f'‖ → 0` | Derivative iff slope tends to `0`. |
| `fderiv_deriv` | `(fderiv f x : 𝕜 → F) 1 = deriv f x` | `fderiv` at `1` equals `deriv`. |
| `norm_deriv_eq_norm_fderiv` | `‖deriv f x‖ = ‖fderiv f x‖` | Norms of derivative and Fréchet derivative coincide. |

#### **2. Naming Conventions**

- **Predicate prefixes**:
  - `HasDerivAtFilter`, `HasDerivWithinAt`, `HasDerivAt`, `HasStrictDerivAt`: denote existence of derivative under various conditions.
  - `derivWithin`, `deriv`: functional versions (partial / total).
- **Theorem prefixes**:
  - `has_..._iff_...`: equivalences (↔).
  - `has_..._of_...`: implications (→).
  - `deriv_...`: theorems about `deriv`/`derivWithin`.
  - `fderiv_...`: theorems connecting `fderiv` and `deriv`.
- **Suffixes**:
  - `_id`, `_const`, `_mul`, `_add`, `_comp`, `_inv`, `_pow`: for specific functions.
  - `_Ioi`, `_Ici`, `_Iio`, `_Iic`: for intervals.
  - `_congr`, `_mono`, `_diff`, `_inter`: for congruence/monotonicity/set operations.
  - `_zero`, `_ne_zero`: for zero/nonzero derivative implications.

#### **3. Tactic Stack**

- **Core simplification & rewriting**:
  - `simp`, `simp only`, `rw`, `simp_rw`
- **Equational reasoning**:
  - `ring`, `norm_num`
- **Filter & asymptotic reasoning**:
  - `aesop`, `exact`, `assumption`, `apply`, `intro`, `cases`
- **Topology & continuity**:
  - `tendsto_of_isLittleO`, `isBigO_of_isLittleO`, `mem_nhds_within`, `isOpen.mem_nhds`
- **Fréchet derivative machinery**:
  - `hasFDerivAtFilter_iff_hasDerivAtFilter`, `fderivWithin_zero_of_not_differentiableWithinAt`, etc.

#### **4. Proof Logic**

- **Strategy**:
  - Most theorems are *direct translations* of Fréchet derivative results via `smulRight` and evaluation at `1`.
  - Proofs often reduce to known `fderiv*` lemmas using equivalences like `hasDerivAt_iff_hasFDerivAt`.
  - Uniqueness of derivative uses `UniqueDiffWithinAt.eq` or `HasDerivAt.unique`.
  - Congruence lemmas (`congr`, `congr_set`, `congr_deriv`) rely on `Filter.EventuallyEq` and set-theoretic inclusion.
  - Interval-specific lemmas (`Ioi`, `Ici`, etc.) use `hasDerivWithinAt_diff_singleton`, `Ici_diff_left`, etc.
  - For `derivWithin`/`deriv` values, proofs often split on differentiability (`by_cases hx : DifferentiableAt...`).
  - `simp`-based automation is set up via `@[simp]` lemmas (e.g., `deriv_id'`, `deriv_const'`).

#### **5. Imports & Scope**

- **Core dependencies**:
  - `Mathlib.Analysis.Calculus.FDeriv.Basic`: Fréchet derivative definitions & basic properties.
  - `Mathlib.Analysis.NormedSpace.OperatorNorm.NormedSpace`: operator norm & `ContinuousLinearMap`.
- **Domain**:
  - Functions `f : 𝕜 → F`, where:
    - `𝕜` is a `NontriviallyNormedField` (e.g., `ℝ`, `ℂ`).
    - `F` is a normed additive commutative group and normed space over `𝕜`.
- **Scope**:
  - One-dimensional calculus (domain is 1D, codomain may be infinite-dimensional).
  - Analogous to Fréchet calculus but specialized to scalar domain.
  - Includes derivative rules for standard operations (add, mul, comp, inv, pow, etc.), continuity, mean value, uniqueness, and simplifier support.

---

Let me know if you'd like a dependency graph, a list of missing lemmas (e.g., chain rule for `deriv`), or a comparison with `FDeriv` in more detail.