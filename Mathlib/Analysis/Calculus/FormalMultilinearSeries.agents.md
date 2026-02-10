### Technical Metadata Brief: `Mathlib.Analysis.NormedSpace.Multilinear.FormalMultilinearSeries`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `FormalMultilinearSeries 𝕜 E F` | `∀ n : ℕ, E[×n]→L[𝕜] F` | Represents a sequence of continuous multilinear maps (modeling derivatives or Taylor coefficients). |
| `zero_apply`, `neg_apply`, `add_apply`, `sub_apply` | `∀ n, (0 : FMS) n = 0`, etc. | Algebraic structure laws for pointwise operations on formal series. |
| `ext` | `(∀ n, p n = q n) → p = q` | Extensionality: formal series are equal iff all coefficients are equal. |
| `prod`, `pi` | `FMS E F × FMS E G → FMS E (F × G)` / `Π i, FMS E (F i) → FMS E (Π i, F i)` | Product and dependent product of formal multilinear series. |
| `removeZero` | `FMS E F → FMS E F` | Sets the 0th coefficient to zero, shifts others down. |
| `congr` | Congruence for equal arguments in multilinear maps. | Ensures well-definedness under argument equality. |
| `compContinuousLinearMap` | `(FMS F G) → (E →L[𝕜] F) → FMS E G` | Pre-composition with a linear map on the domain. |
| `restrictScalars` | `FMS 𝕜' E F → FMS 𝕜 E F` | Change of scalars along a ring homomorphism. |
| `shift` | `FMS E (E →L[𝕜] F)` | Removes 0th coefficient and curries remaining terms into `E →L[𝕜] F`. Models derivative of power series. |
| `unshift` | `FMS E (E →L[𝕜] F) → F → FMS E F` | Adds a constant term to a series over `E →L[𝕜] F`. Models integration / antiderivative. |
| `unshift_shift` | `(p.unshift z).shift = p` | Left-inverse property of `unshift` w.r.t. `shift`. |
| `compFormalMultilinearSeries` | `(F →L[𝕜] G) → FMS E F → FMS E G` | Post-composition with a continuous linear map. |
| `toFormalMultilinearSeries` | `ContinuousMultilinearMap (∀ i, E i) F → FMS (∀ i, E i) F` | Embeds a fixed-arity multilinear map into a formal series. |
| `order` | `FMS E F → ℕ` | Index of first non-zero coefficient (order of zero of analytic function). |
| `apply_order_ne_zero`, `apply_eq_zero_of_lt_order` | Properties of `order`. | Characterizes vanishing/non-vanishing of coefficients relative to order. |
| `coeff` | `FMS 𝕜 E → ℕ → E` | Extracts the `n`th coefficient of a formal power series over `𝕜`. |
| `coeff_eq_zero`, `apply_eq_pow_smul_coeff`, `norm_apply_eq_norm_coef` | Relations between `coeff` and evaluation. | Connects coefficient extraction with evaluation on constant/monomial inputs. |
| `fslope` | `FMS 𝕜 E → FMS 𝕜 E` | Formal difference quotient (analogue of `(f(z)−f(0))/z`). |
| `coeff_fslope`, `coeff_iterate_fslope` | `coeff (fslope p) n = p.coeff (n+1)` | Shifts coefficients forward — models derivative of power series. |
| `constFormalMultilinearSeries` | `F → FMS E F` | Constant series (only 0th term nonzero). |
| `fpowerSeries` | `(E →L[𝕜] F) → E → FMS E F` | Taylor series of a continuous linear map (degree ≤1). |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `removeZero`, `shift`, `unshift`, `fslope`, `compFormalMultilinearSeries`, `compContinuousLinearMap`, `restrictScalars`, `toFormalMultilinearSeries`, `constFormalMultilinearSeries`, `fpowerSeries`: Action-oriented verbs.
  - `coeff`, `order`: Mathematical nouns.
- **Suffixes:**
  - `_apply`: Lemmas about evaluation of series at index `n`.
  - `_coeff_*`: Lemmas about `coeff` function.
  - `_of_pos`, `_ne_zero`, `_eq_zero_iff`: Logical conditions on indices or coefficients.
- **`is_`, `mul_`, `dist_`**: Not used here — this module avoids predicate-style naming.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `rfl`, `ext`, `congr`, `simp`, `rw`, `subst`, `induction`, `cases`
- `convert`, `exact`, `intro`, `introv`, `have`, `show`, `by_contra`
- `simp only [...]`, `simp_rw` (for precise rewriting)
- `apply`, `apply_fun`, `funext`
- `Nat.casesOn`, `Nat.succ_pred_eq_of_pos`, `Nat.not_mem_of_lt_sInf`: Arithmetic lemmas
- `linarith`, `ring`, `norm_num` (less frequent, but present in normed settings)

> **Dominant style**: Lightweight automation (`simp`, `rw`, `congr`) + manual case analysis/induction.

---

#### **4. Proof Logic**

- **Structure**: Most proofs follow a *coefficient-wise* approach:
  - Use `ext` to reduce equality of series to equality of all coefficients.
  - Then prove `∀ n, p n = q n` via `simp`, `rfl`, or `congr`.
- **Induction**: Used for properties like `coeff_iterate_fslope`, `unshift_shift`.
- **Case analysis on `n`**: Especially for `shift`, `unshift`, `removeZero`, `constFormalMultilinearSeries`.
- **Order-based reasoning**: For `order`, uses `sInf` properties and decidability assumptions (`DecidablePred`).
- **Currying/uncurrying**: Heavy use of `curryRight`, `curryLeft`, `continuousMultilinearCurryRightEquiv'`, `uncurry0`, `mkPiRing` to relate multilinear maps and series.

---

#### **5. Imports & Scope**

- **Primary import**:  
  `Mathlib.Analysis.NormedSpace.Multilinear.Curry`  
  → Provides `ContinuousMultilinearMap`, `curryRight`, `curryLeft`, `pi`, `equiv` constructions.

- **Dependencies implied by context**:
  - `Mathlib.Data.Nat.Basic` (for `sInf`, `find`, arithmetic)
  - `Mathlib.Topology.Basic`, `Mathlib.Analysis.NormedSpace.Basic`, `Mathlib.Algebra.Module.Basic`
  - `Mathlib.Data.Fintype.Basic`, `Mathlib.Data.Fin.Basic`
  - `Mathlib.Data.Set.Basic`, `Mathlib.Data.Product.Basic`

- **Scope**:  
  This module defines the *syntactic* framework for formal multilinear/power series — not their analytic convergence or summation. It serves as the foundation for:
  - `contDiff` (smooth functions)
  - `HasFTaylorSeriesUpTo` (formal Taylor expansions)
  - Analytic functions (via `HasFPowerSeriesOnBall`)

---

### Summary

This file formalizes the *algebraic and categorical structure* of formal multilinear series — a key abstraction for higher-order calculus in normed spaces. It emphasizes:
- **Currying/un-currying** to model derivatives,
- **Coefficient-wise reasoning** for extensionality and arithmetic,
- **Order theory** for isolated zeros,
- **Compatibility with linear maps** (pre/post composition, scalar restriction).

It is a foundational module for `mathlib`’s treatment of differentiability and analyticity in infinite-dimensional spaces.