### Technical Metadata Brief: Derivative of Power Functions in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `hasStrictDerivAt_pow` | `∀ n x, HasStrictDerivAt (λ x ↦ x ^ n) (n • x^(n-1)) x` | Proves strict differentiability of `x ↦ x^n` with derivative `n * x^(n-1)`, via induction on `n`. |
| `hasDerivAt_pow` | `∀ n x, HasDerivAt (λ x ↦ x ^ n) (n • x^(n-1)) x` | Derives the standard (non-strict) derivative from strict differentiability. |
| `hasDerivWithinAt_pow` | `∀ n x s, HasDerivWithinAt (λ x ↦ x ^ n) (n • x^(n-1)) s x` | Extends derivative to within a set `s`. |
| `differentiableAt_pow`, `differentiableWithinAt_pow`, `differentiable_pow`, `differentiableOn_pow` | Various differentiability statements | Establishes full differentiability (at a point, within a set, globally, etc.) of power functions. |
| `deriv_pow`, `deriv_pow'`, `deriv_pow''` | Equalities for derivatives of `x^n` and compositions | Explicitly compute derivatives: pointwise (`deriv_pow`), globally (`deriv_pow'`), and for composite functions (`deriv_pow''`). |
| `derivWithin_pow` | Under `UniqueDiffWithinAt`, gives derivative within set | Relates derivative within set to standard derivative under uniqueness assumptions. |
| `HasDerivWithinAt.pow`, `HasDerivAt.pow` | Chain rule for power functions | Generalizes power rule to composite functions: if `c` has derivative `c'`, then `c^n` has derivative `n * c^(n-1) * c'`. |
| `derivWithin_pow'` | Chain rule for derivative within set | Computes derivative within set for composite power functions. |

> **Note**: `n : ℕ`, and `(n : 𝕜)` denotes coercion of natural number `n` to the field `𝕜`.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `hasStrictDerivAt_`, `hasDerivAt_`, `hasDerivWithinAt_`: indicate existence of (strict / usual / within-set) derivative.
  - `differentiable(Within)At_`, `differentiable(On)_`: indicate differentiability properties.
  - `deriv(Within)_`: denote actual derivative values.
- **Suffixes**:
  - `_pow`: indicates the theorem applies to power functions `x ↦ x^n`.
  - `'` (e.g., `deriv_pow'`, `deriv_pow''`): used for more general or composite versions (e.g., `deriv_pow'` is the global derivative function; `deriv_pow''` applies to composites).
- **Function names**:
  - `pow` used consistently for `x^n`.
  - `c` used for a generic function being composed with power.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `simp`, `simpa`: heavily used for simplification, especially base cases (`n = 0`, `n = 1`).
  - `rw`: for rewriting using equalities (e.g., `← hasDerivWithinAt_univ`).
  - `exact`, `apply`: for applying known theorems.
- **Induction & composition**:
  - `induction n` (implicit via pattern matching in `hasStrictDerivAt_pow`).
  - `.mul`, `.comp_hasDerivWithinAt`: leveraging existing lemmas for product and chain rules.
- **Extensional reasoning**:
  - `funext`: used in `deriv_pow'` to prove function equality.

---

#### **4. Proof Logic**

- **Inductive structure** for `hasStrictDerivAt_pow`:
  - Base cases: `n = 0` (constant function), `n = 1` (identity function).
  - Inductive step: `n + 2` handled by writing `x^(n+2) = x^(n+1) * x`, then applying `mul` rule for strict derivatives.
- **Derivative propagation**:
  - Strict derivative ⇒ derivative ⇒ derivative within set ⇒ differentiability.
  - Chain rule for powers (`pow` lemma) derived via composition with `HasDerivAt.pow` / `HasDerivWithinAt.pow`.
- **Uniqueness assumptions**:
  - `derivWithin_pow` and `derivWithin_pow'` require `UniqueDiffWithinAt` to ensure uniqueness of derivative within set.

---

#### **5. Imports & Scope**

- **Primary imports**:
  - `Mathlib.Analysis.Calculus.Deriv.Mul`: for product rule (`mul` lemma for `HasStrictDerivAt`).
  - `Mathlib.Analysis.Calculus.Deriv.Comp`: for chain rule (`comp_hasDerivWithinAt`, etc.).
- **Domain**:
  - One-dimensional calculus over a `NontriviallyNormedField` `𝕜` (e.g., `ℝ`, `ℂ`).
  - Works in both global and local (point/set) contexts.
- **Scope**:
  - Focuses on elementary power rule (`x^n`) and its composition variants.
  - Part of the broader `Analysis.Calculus.Deriv.*` hierarchy in Mathlib.

---

### Summary

This file formalizes the classical power rule for derivatives in a general analytic setting (Banach-space-valued functions over nontrivially normed fields), with full coverage of strict, standard, and within-set derivatives, and their behavior under composition. The proofs rely on induction and existing calculus lemmas (`mul`, `comp`), and the naming reflects a systematic hierarchy of derivative existence and computation.