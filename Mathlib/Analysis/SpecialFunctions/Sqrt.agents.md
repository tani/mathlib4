### Technical Metadata Brief: Smoothness of `Real.sqrt` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `sqPartialHomeomorph` | `PartialHomeomorph ℝ ℝ` | Constructs a local homeomorphism between `Ioi 0` and itself via `x ↦ x²` and `√·`, used to transfer smoothness properties. |
| `deriv_sqrt_aux` | `x ≠ 0 → HasStrictDerivAt (√·) (1 / (2 * √x)) x ∧ ∀ n, ContDiffAt ℝ n (√·) x` | Core lemma: establishes strict differentiability and infinite smoothness of `√·` at nonzero points. |
| `hasStrictDerivAt_sqrt` | `x ≠ 0 → HasStrictDerivAt (√·) (1 / (2 * √x)) x` | Derivative of `√·` at nonzero `x`. |
| `contDiffAt_sqrt` | `x ≠ 0 → ContDiffAt ℝ n (√·) x` | Infinite differentiability of `√·` at nonzero `x`. |
| `hasDerivAt_sqrt` | `x ≠ 0 → HasDerivAt (√·) (1 / (2 * √x)) x` | Standard derivative (weaker than strict) of `√·`. |
| `HasDerivWithinAt.sqrt`, `HasDerivAt.sqrt`, `HasStrictDerivAt.sqrt` | Chain rules for `√· ∘ f` under various derivative notions | Generalize derivative rules for composition with `√·`. |
| `derivWithin_sqrt`, `deriv_sqrt` | Formulas for derivative of `√(f x)` | Explicit derivative formulas using quotient rule. |
| `HasFDerivAt.sqrt`, `fderiv_sqrt`, etc. | Chain rules in normed space setting | Extend derivative rules to Fréchet derivatives and `fderiv`. |
| `DifferentiableAt.sqrt`, `ContDiffAt.sqrt`, etc. | Closure properties under composition | Ensure smoothness is preserved under composition with `√·`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `has*DerivAt`, `has*FDerivAt`: denote derivative existence (strict, regular, or Fréchet).
  - `contDiffAt`, `contDiffWithinAt`, `contDiffOn`, `contDiff`: denote smoothness (finite or infinite order).
  - `differentiable*`: denote differentiability (at, within, on, global).
- **Suffixes**:
  - `.sqrt`: applied to lemmas to indicate they are about composition with `√·`.
- **Function notation**:
  - `√·` used for pointwise function `fun x => Real.sqrt x`.
  - `(· ∘ ·)` used in `simpa` to rewrite compositions.

---

#### **3. Tactic Stack**

- **`simp_rw` / `simpa`**: heavily used to rewrite compositions and simplify expressions involving `div_eq_inv_mul`, `mul_one`, etc.
- **`aesop`**: not explicitly used here, but `simp` and `linarith` suffice.
- **`rw` / `apply`**: for applying known derivative theorems (e.g., `hasStrictDerivAt_sqrt hx`).
- **`cases'`**: for splitting `x ≠ 0` into `x > 0` or `x < 0`.
- **`exact` / `constructor`**: for building conjunctions (e.g., in `deriv_sqrt_aux`).
- **`have` / `suffices`**: intermediate steps (e.g., proving nonzero denominator).
- **`contDiffAt_const.congr_of_eventuallyEq`**, **`congr_of_eventuallyEq`**: for extending smoothness via local equality.

---

#### **4. Proof Logic**

- **Structure of `deriv_sqrt_aux`**:
  1. **Case split** on `x ≠ 0`: either `x < 0` or `x > 0`.
     - For `x ≤ 0`: `√x = 0` and function is locally constant ⇒ trivial smoothness.
     - For `x > 0`: use `sqPartialHomeomorph` to relate `√·` to inverse of `x²`.
  2. **Strict derivative**: apply `hasStrictDerivAt_symm` to `sqPartialHomeomorph`, using known derivative of `x²`.
  3. **Smoothness**: use `contDiffAt_symm_deriv` from `sqPartialHomeomorph`, relying on `contDiffAt_id.pow 2`.
- **Chain rule lemmas**:
  - All follow from composition lemmas: e.g., `comp_hasDerivWithinAt`, `comp_hasFDerivAt`.
  - Use `simpa` to normalize the resulting derivative expression.

---

#### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.Analysis.Calculus.ContDiff.Basic`: for `ContDiffAt`, `ContDiffWithinAt`, etc.
  - `Mathlib.Analysis.Calculus.Deriv.Pow`: for derivative of `x ↦ x^n`, used in `deriv_sqrt_aux`.
- **Domain**: Real analysis on `ℝ`, with extensions to normed spaces (`E`).
- **Key concepts**:
  - Local homeomorphisms (`PartialHomeomorph`)
  - Strict vs. regular derivatives
  - ContDiff (smoothness up to order `n ∈ WithTop ℕ∞`)
  - Chain rules for `deriv`, `fderiv`, `derivWithin`, etc.

---

### Summary

This file formalizes the infinite smoothness of `Real.sqrt` away from zero, leveraging a local homeomorphism between `x²` and `√·`. It provides a full suite of chain rules and closure properties for derivatives, Fréchet derivatives, and higher-order smoothness, all conditional on the inner function being nonzero. The proofs rely on inverse function techniques and local behavior analysis, with heavy use of `simpa` and congruence lemmas for smoothness.