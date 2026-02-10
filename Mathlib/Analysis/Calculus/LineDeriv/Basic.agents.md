### Technical Metadata Brief: Line Derivatives in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `HasLineDerivWithinAt` | `f : E → F → F → Set E → E → E → Prop` | `f` has directional derivative `f'` at `x` along `v` within set `s`. |
| `HasLineDerivAt` | `f : E → F → F → E → E → Prop` | `f` has directional derivative `f'` at `x` along `v` (no set restriction). |
| `LineDifferentiableWithinAt` | `f : E → F → Set E → E → E → Prop` | `f` is directionally differentiable at `x` along `v` within `s`. |
| `LineDifferentiableAt` | `f : E → F → E → E → Prop` | `f` is directionally differentiable at `x` along `v`. |
| `lineDerivWithin` | `E → F → Set E → E → E → F` | Returns the line derivative (if exists), else `0`. |
| `lineDeriv` | `E → F → E → E → F` | Returns the unrestricted line derivative (if exists), else `0`. |
| `HasLineDerivWithinAt.mono` | `t ⊆ s ⇒ HasLineDerivWithinAt f f' s x v → HasLineDerivWithinAt f f' t x v` | Monotonicity of line differentiability w.r.t. set inclusion. |
| `HasFDerivWithinAt.hasLineDerivWithinAt` | `HasFDerivWithinAt f L s x ⇒ HasLineDerivWithinAt f (L v) s x v` | Fréchet differentiability implies line differentiability. |
| `DifferentiableAt.lineDeriv_eq_fderiv` | `DifferentiableAt f x ⇒ lineDeriv f x v = fderiv f x v` | When fully differentiable, line derivative equals Fréchet derivative applied to `v`. |
| `HasLineDerivAt.le_of_lip'` | Lipschitz condition ⇒ `‖f'‖ ≤ C * ‖v‖` | Converse mean-value inequality for line derivatives. |
| `norm_lineDeriv_le_of_lipschitz` | `LipschitzWith C f ⇒ ‖lineDeriv f x v‖ ≤ C * ‖v‖` | Norm bound on line derivative under global Lipschitz condition. |
| `HasLineDerivWithinAt.smul` | `HasLineDerivWithinAt f f' s x v ⇒ HasLineDerivWithinAt f (c • f') s x (c • v)` | Homogeneity of line derivative w.r.t. scalar multiplication. |
| `lineDeriv_smul` | `lineDeriv f x (c • v) = c • lineDeriv f x v` | Explicit formula for line derivative under scalar scaling of direction. |
| `lineDeriv_neg` | `lineDeriv f x (-v) = - lineDeriv f x v` | Oddness of line derivative in direction. |

---

#### **2. Naming Conventions**

- **Predicates**:
  - `HasLineDeriv*`: Existence of a derivative (analogous to `HasFDeriv*`).
  - `LineDifferentiable*`: Existence of *some* derivative (analogous to `Differentiable*`).
- **Functions**:
  - `lineDeriv*`: Returns the derivative value (analogous to `deriv*` or `fderiv*`).
- **Suffixes**:
  - `WithinAt`: Restriction to a set `s`.
  - `At`: No set restriction.
  - `mono`, `congr`, `smul`, `neg`: Indicate structural properties (monotonicity, congruence, scalar multiplication, negation).
- **Prefixes**:
  - `hasLineDeriv*`: Existence of derivative (noncomputable, may return zero if not differentiable).
  - `lineDifferentiable*`: Property of being differentiable.

---

#### **3. Tactic Stack**

- **Core proof automation**:
  - `simp`, `simp only`, `simp_rw`: Extensive use for rewriting definitions and simplifying expressions.
  - `rw`: For applying lemmas and equivalences.
  - `convert`: To match goals up to definitional equality.
  - `ext`: Extensionality for function equality.
- **Analysis-specific tactics**:
  - `filter_upwards`: For filtering filters and applying implications in neighborhoods.
  - `fun_prop`: For proving continuity/differentiability of composed functions (e.g., `x + t • v`).
  - `apply ... at`: For applying lemmas to hypotheses.
  - `rcases eq_or_ne c 0`: Case analysis on equality with zero.
- **Algebraic simplification**:
  - `ring`, `norm_num`: Implicitly used via `simp`.
  - `mul_comm`, `smul_smul`, `inv_mul_cancel₀`: Rewriting scalar module laws.

---

#### **4. Proof Logic**

- **Structure**:
  - Most proofs reduce to known results for `HasDerivWithinAt`/`HasDerivAt` via definition unfolding.
  - Common pattern: `defn_of_lineDeriv → apply known lemma for 1D derivative → simplify`.
- **Induction/Case Analysis**:
  - Rarely induction; instead, case splits on `c = 0` (e.g., in `lineDeriv_smul`).
  - Use of `eq_or_ne` and `if ... then ... else` style reasoning.
- **Continuity & Filter Arguments**:
  - Preimage continuity arguments (`ContinuousWithinAt.preimage_mem_nhdsWithin''`) used to transfer neighborhood conditions.
  - `eventually`/`𝓝`/`𝓝[s]` reasoning for congruence and monotonicity.
- **Lipschitz arguments**:
  - Pullback along `t ↦ x + t • v` to reduce to 1D mean-value inequality (`HasDerivAt.le_of_lip'`).
- **Uniqueness & Equality**:
  - `HasDerivAt.unique` used to prove uniqueness of derivative.
  - `lineDeriv` definition ensures equality via `lineDeriv` = `deriv` when differentiable.

---

#### **5. Imports**

| Module | Role |
|--------|------|
| `Mathlib.Analysis.Calculus.Deriv.Comp` | Chain rule and composition lemmas for derivatives. |
| `Mathlib.Analysis.Calculus.Deriv.Add` | Additive properties of derivatives. |
| `Mathlib.Analysis.Calculus.Deriv.Mul` | Multiplicative properties (e.g., product rule). |
| `Mathlib.Analysis.Calculus.Deriv.Slope` | Slope-based characterizations of derivatives (used in `tendsto_slope_zero`). |

> **Note**: The file builds on top of the standard 1D derivative API (`HasDeriv*`, `deriv`, `Differentiable*`) and extends it to directional (line) derivatives in arbitrary modules/normed spaces.

---

### Summary

This module formalizes **Gateaux (line) derivatives** in Lean 4, providing a lightweight directional derivative notion. While less robust than Fréchet derivatives (e.g., no chain rule in general), it supports essential calculus tools: uniqueness, chain rule for compositions with linear maps, scalar homogeneity, Lipschitz bounds, and congruence properties. The design mirrors the Fréchet derivative API but restricts to 1D parameterizations `t ↦ x + t • v`. Proofs heavily rely on reduction to 1D calculus via continuity and filter arguments.