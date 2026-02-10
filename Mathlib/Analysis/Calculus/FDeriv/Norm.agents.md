### Technical Metadata Brief: Differentiability of the Norm in Real Normed Spaces (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `not_differentiableAt_norm_zero` | `[Nontrivial E] → ¬DifferentiableAt ℝ (‖·‖) 0` | Shows the norm is *not* differentiable at 0 in nontrivial spaces. |
| `ContDiffAt.contDiffAt_norm_smul` | `t ≠ 0 → ContDiffAt ℝ n ‖·‖ x → ContDiffAt ℝ n ‖·‖ (t • x)` | Propagates `n`-times continuous differentiability of the norm along nonzero scalar multiplication. |
| `contDiffAt_norm_smul_iff` | `t ≠ 0 → (ContDiffAt ℝ n ‖·‖ x ↔ ContDiffAt ℝ n ‖·‖ (t • x))` | Equivalence of continuous differentiability at `x` and `t•x` for `t ≠ 0`. |
| `ContDiffAt.contDiffAt_norm_of_smul` | `ContDiffAt ℝ n ‖·‖ (t • x) → ContDiffAt ℝ n ‖·‖ x` | Reverse direction: differentiability at `t•x` implies at `x`. |
| `HasStrictFDerivAt.hasStrictFDerivAt_norm_smul` | `t ≠ 0 → HasStrictFDerivAt ‖·‖ f x → HasStrictFDerivAt ‖·‖ ((sign t) • f) (t • x)` | Transfers strict Fréchet differentiability with sign-adjusted derivative. |
| `HasFDerivAt.hasFDerivAt_norm_smul` | `t ≠ 0 → HasFDerivAt ‖·‖ f x → HasFDerivAt ‖·‖ ((sign t) • f) (t • x)` | Same as above, but for Fréchet differentiability (weaker than strict). |
| `differentiableAt_norm_smul` | `t ≠ 0 → (DifferentiableAt ℝ ‖·‖ x ↔ DifferentiableAt ℝ ‖·‖ (t • x))` | Equivalence of differentiability at `x` and `t•x` for `t ≠ 0`. |
| `DifferentiableAt.fderiv_norm_self` | `DifferentiableAt ℝ ‖·‖ x → fderiv ℝ ‖·‖ x x = ‖x‖` | Evaluates the derivative of the norm along the vector itself. |
| `fderiv_norm_smul` | `fderiv ℝ (‖·‖) (t • x) = sign(t) • fderiv ℝ (‖·‖) x` | Explicit formula for the derivative of the norm at a scaled point. |
| `norm_fderiv_norm` | `[Nontrivial E] → DifferentiableAt ℝ ‖·‖ x → ‖fderiv ℝ ‖·‖ x‖ = 1` | Operator norm of the derivative of the norm is 1 (in nontrivial spaces). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `has*FDerivAt_*`: For properties of (strict) Fréchet derivatives (`HasStrictFDerivAt`, `HasFDerivAt`).
  - `differentiableAt_*`: For Gâteaux/Fréchet differentiability (`differentiableAt_norm_smul`).
  - `contDiffAt_*`: For smoothness (`ContDiffAt.contDiffAt_norm_smul`, `contDiffAt_norm_smul_iff`).
  - `fderiv_*`: For explicit formulas involving `fderiv`.
  - `norm_*`: For results directly about the norm function.

- **Suffixes**:
  - `_smul`: Indicates behavior under scalar multiplication.
  - `_neg` / `_pos`: Special cases for sign of scalar (`fderiv_norm_smul_neg`, `hasFDerivAt_norm_smul_pos`).
  - `_self`: Derivative applied to the same vector (`fderiv_norm_self`).
  - `_of_smul`: Reverse implication (from scaled point to original).

- **Sign handling**:
  - `SignType.sign t` used uniformly for sign of `t`.
  - `ht : t ≠ 0` or `ht : 0 < t` / `ht : t < 0` used to distinguish cases.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `simp`, `rw`, `conv`, `ext`, `convert`, `exact`, `refine`, `apply`.
- **Domain-specific tactics**:
  - `field_simp`, `norm_num`, `ring` (implicit via `simp`/`ring`-like rewrites).
  - `cases` on `t = 0` or `n = ⊥`.
  - `obtain rfl | ht := eq_or_ne t 0`, `rcases eq_bot_or_bot_lt n`.
  - `nontriviality`-style reasoning via `by_cases hE : Nontrivial E`.
- **Analysis-specific**:
  - `norm_eq_abs`, `norm_smul`, `abs_mul`, `mul_inv_cancel₀`, `self_mul_sign`.
  - `lineDeriv_eq_fderiv`, `deriv_mul_const`, `deriv_abs`, `deriv_comp`.

---

#### **4. Proof Logic**

- **Structure**:
  - Most proofs follow a *chain of derivative propagation*:
    1. Decompose the map `y ↦ ‖y‖` as a composition:  
       `y ↦ t⁻¹ • y ↦ |t| * ‖y‖` (or similar).
    2. Use known derivative rules (`hasFDerivAt_id`, `const_smul`, `comp`).
    3. Simplify using algebraic identities (`inv_mul_cancel₀`, `abs_one`, `mul_assoc`).
    4. Apply sign identities (`self_mul_sign`, `inv_mul_cancel₀`).
- **Case analysis**:
  - `t = 0` vs `t ≠ 0` (often via `eq_or_ne t 0`).
  - `n = ⊥` vs `n ≥ 1` (via `eq_bot_or_bot_lt`).
  - `Nontrivial E` vs `Subsingleton E`.
- **Contrapositive reasoning**:
  - `mt` used to lift non-differentiability at 0 to other points.
  - `not_differentiableAt_norm_zero` is a key negative lemma.

---

#### **5. Imports**

| Module | Role |
|--------|------|
| `Mathlib.Analysis.Calculus.Deriv.Abs` | Derivative of absolute value on `ℝ`, used for chain rule with `‖·‖`. |
| `Mathlib.Analysis.Calculus.LineDeriv.Basic` | Tools for line derivatives (`lineDeriv`, `fderiv` relations), essential for `fderiv_norm_self`. |

> **Note**: The file assumes `E` is a `NormedAddCommGroup` and `NormedSpace ℝ E`, i.e., a real normed vector space.

--- 

Let me know if you'd like a dependency graph or a summary of how these results fit into a larger development (e.g., for inverse function theorem or submersion theory).