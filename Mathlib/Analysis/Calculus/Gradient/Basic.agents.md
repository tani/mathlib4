### Technical Metadata Brief: Gradient in Hilbert Spaces (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `HasGradientAtFilter` | `f : F → 𝕜 → f' x : F → L : Filter F → Prop` | Generalized gradient along a filter: `f(x') = f(x) + ⟨f', x' - x⟩ + o(x' - x)` along `L`. |
| `HasGradientWithinAt` | `f : F → 𝕜 → f' : F → s : Set F → x : F → Prop` | Gradient within a subset `s` at `x`, using the neighborhood filter `𝓝[s] x`. |
| `HasGradientAt` | `f : F → 𝕜 → f' x : F → Prop` | Full gradient at a point `x`, using neighborhood filter `𝓝 x`. |
| `gradientWithin` | `f : F → 𝕜 → s : Set F → x : F → F` | Returns the unique gradient vector in `s` at `x`, if it exists; otherwise `0`. Defined via `fderivWithin`. |
| `gradient` | `f : F → 𝕜 → x : F → F` | Gradient vector at `x`, defined as `(toDual 𝕜 F).symm (fderiv 𝕜 f x)`. |
| `∇` (scoped notation) | `gradient` | Standard gradient notation. |
| `hasGradientWithinAt_iff_hasFDerivWithinAt` | `↔` | Equivalence between gradient and Fréchet derivative within a set. |
| `hasGradientAt_iff_hasFDerivAt` | `↔` | Equivalence between gradient and Fréchet derivative globally. |
| `HasGradientAt.unique` | `gradf = gradg` | Uniqueness of gradient: if two vectors satisfy the gradient condition, they are equal. |
| `gradient_eq_deriv` | `∇ g u = starRingEnd 𝕜 (deriv g u)` | In 1D, gradient is conjugate of derivative (complex case). |
| `gradient_eq_deriv'` | `∇ g u = deriv g u` | In real 1D, gradient equals derivative. |
| `hasGradientAtFilter_iff_isLittleO` | `↔` | Characterization via little-o: `f(x') - f(x) - ⟨f', x' - x⟩ = o(x' - x)`. |
| `hasGradientWithinAt_congr_set` | `↔` | Gradient is invariant under eventual equality of sets near `x`. |
| `gradient_const` | `∇ (fun _ => c) x = 0` | Gradient of constant function is zero. |
| `HasGradientAt.continuousAt` | `ContinuousAt f x` | Function with gradient at `x` is continuous at `x`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `hasGradient...`: predicate definitions (`hasGradientAt`, `hasGradientWithinAt`, `hasGradientAtFilter`).
  - `gradient...`: function definitions or properties (`gradient`, `gradientWithin`, `gradient_const`, `gradient_eq`).
- **Suffixes**:
  - `_iff_...`: logical equivalences (e.g., `hasGradientAt_iff_hasFDerivAt`).
  - `_congr_...`: congruence properties (e.g., `hasGradientWithinAt_congr_set`, `gradient_congr`).
  - `_of_...`: derived properties (e.g., `gradient_eq_zero_of_not_differentiableAt`).
- **Aliases**:
  - `⟨HasGradientWithinAt.hasFDerivWithinAt, _⟩` — forward/backward implication projections.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw [...]` — rewriting using equivalences (e.g., `hasGradientAt_iff_hasFDerivAt`).
- `simp` / `simp_rw` — simplification, especially with `toDual`, `inner`, `map_zero`.
- `exact`, `assumption`, `intro`, `cases` — basic proof structure.
- `ext` — extensionality for linear maps (e.g., proving `smulRight = toDual`).
- `rwa [...]` — rewrite + assumption.
- `by_cases` — case analysis on decidability (e.g., differentiability).
- `tauto` — for set-theoretic tautologies (e.g., subset inclusion).
- `funext` — extensionality for functions (e.g., proving `∇ f = f'`).
- `simpa using h` — simplifies goal using hypothesis `h`.

---

#### **4. Proof Logic**

- **Core Strategy**: Reduce gradient statements to Fréchet derivative (`fderiv`) via `toDual`, leveraging existing calculus infrastructure.
- **Typical Flow**:
  1. Translate gradient condition ↔ Fréchet derivative condition using `hasGradientAt_iff_hasFDerivAt`.
  2. Apply known theorems about `fderiv` (e.g., uniqueness, chain rule, continuity).
  3. Translate back using `toDual.symm_apply_apply` or injectivity of `toDual`.
- **Induction/Case Analysis**:
  - Rarely needed; most results follow from equivalence with `fderiv`.
  - For 1D case (`𝕜 = ℝ` or `ℂ`), reduce to derivative via `HasDerivAtFilter` ↔ `HasGradientAtFilter`.
- **Uniqueness Proofs**:
  - Use injectivity of `toDual` + uniqueness of Fréchet derivative.
- **Congruence Proofs**:
  - Lift set/function congruence to `fderiv` level, then translate.

---

#### **5. Imports & Scope**

- **Core Dependencies**:
  - `Mathlib.Analysis.InnerProductSpace.Dual`: `toDual`, Riesz representation.
  - `Mathlib.Analysis.Calculus.FDeriv.Basic`: `HasFDerivAt`, `fderiv`, Fréchet calculus.
  - `Mathlib.Analysis.Calculus.Deriv.Basic`: 1D calculus (`HasDerivAt`, `deriv`).
- **Assumptions**:
  - `𝕜` is `RCLike` (i.e., `ℝ` or `ℂ`).
  - `F` is a complete inner product space over `𝕜` (i.e., a Hilbert space).
- **Scopes**:
  - `scoped[Gradient] notation "∇" => gradient`
  - Local notation for inner product: `⟪x, y⟫ := inner x y`

---

This module formalizes the **gradient** as the Riesz representative of the Fréchet derivative in Hilbert spaces, aligning with standard mathematical practice and enabling seamless transfer of calculus results (e.g., continuity, uniqueness, chain rule via `fderiv`). The design emphasizes modularity and reuse of existing `fderiv` infrastructure.