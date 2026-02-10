### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `HasDerivAtFilter` | `(f : 𝕜 → F) → f' : F → x : 𝕜 → L : Filter 𝕜 → Prop` | Generalized derivative at a point along a filter (e.g., within a set, at a point, etc.) |
| `HasDerivAt`, `HasDerivWithinAt`, `HasStrictDerivAt` | Specializations of `HasDerivAtFilter` | Standard, within-set, and strict derivatives respectively |
| `deriv`, `derivWithin` | `(f : 𝕜 → F) → x : 𝕜 → F` / `(f : 𝕜 → F) → s : Set 𝕜 → x : 𝕜 → F` | The derivative function and derivative within a set |
| `fderiv`, `fderivWithin` | Fréchet derivatives (used internally) | Underlie one-dimensional derivative definitions |
| `HasDerivAtFilter.add`, `HasDerivAt.add`, etc. | `HasDerivAtFilter f f' x L → HasDerivAtFilter g g' x L → HasDerivAtFilter (f + g) (f' + g') x L` | Derivative of sum of functions |
| `HasDerivAtFilter.neg`, `HasDerivAt.neg`, etc. | `HasDerivAtFilter f f' x L → HasDerivAtFilter (-f) (-f') x L` | Derivative of negated function |
| `HasDerivAtFilter.sub`, `HasDerivAt.sub`, etc. | `HasDerivAtFilter f f' x L → HasDerivAtFilter g g' x L → HasDerivAtFilter (f - g) (f' - g') x L` | Derivative of difference of functions |
| `HasDerivAtFilter.sum` | `(∀ i ∈ u, HasDerivAtFilter (A i) (A' i) x L) → HasDerivAtFilter (∑ i ∈ u, A i) (∑ i ∈ u, A' i) x L` | Derivative of finite sum of functions |
| `deriv_add`, `deriv_sub`, `deriv_sum`, `deriv_neg` | `deriv (f + g) x = deriv f x + deriv g x`, etc. | Derivative rules for basic operations |
| `deriv_add_const`, `deriv_sub_const`, `deriv_const_add`, `deriv_const_sub` | `deriv (f + c) = deriv f`, etc. | Derivative is unchanged under constant shifts |
| `hasDerivAt_neg`, `deriv_neg`, `deriv_neg'` | `deriv (Neg.neg) x = -1`, etc. | Derivative of the global negation function `x ↦ -x` |
| `differentiableAt_comp_const_add`, `differentiableAt_comp_add_const`, `differentiableAt_comp_neg`, etc. | Bijections between differentiability of `f` and compositions with affine maps | Used to transfer differentiability across translations and reflections |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `hasDerivAtFilter_`, `hasDerivAt_`, `hasDerivWithinAt_`, `hasStrictDerivAt_`: for derivative existence statements.
  - `deriv_`: for derivative evaluation theorems (e.g., `deriv_add`, `deriv_neg`).
  - `differentiableAt_`, `differentiable_`, `differentiableOn_`: for differentiability properties.
- **Suffixes**:
  - `_add`, `_sub`, `_neg`, `_const_add`, `_const_sub`, `_sum`: indicate operation applied to functions.
  - `_within`, `_at`: distinguish between `derivWithin` and `deriv`.
  - `'` (prime): often used for extensionality or pointwise versions (e.g., `deriv_add'`, `deriv_neg'`).
- **Function names**:
  - `const_add c`, `add_const c`, `const_sub c`, `sub_const c`, `neg`: denote pointwise operations with constants or functions.

#### 3. **Tactic Stack**

- **Core tactics**:
  - `simpa using`: heavily used to discharge goals by simplifying with lemmas.
  - `simp only [...]`: for rewriting using specific lemmas (especially `fderiv_*` lemmas).
  - `ext`: for extensionality proofs (e.g., proving functions equal).
  - `convert`: to match goals up to definitional equality or symmetry.
  - `refine`, `exact`, `assumption`: for straightforward proof steps.
- **Common patterns**:
  - Prove derivative existence via `HasFDerivAtFilter.sum`, then apply `.hasDerivAtFilter`.
  - Use `derivWithin hxs` or `deriv` to convert derivative existence to derivative value.
  - Use `fderiv_*` lemmas (e.g., `fderiv_add`, `fderiv_neg`, `fderiv_const_add`) to reduce to linear algebraic properties.

#### 4. **Proof Logic**

- **Structure**:
  - Most proofs follow a *two-step* pattern:
    1. Prove a derivative existence statement (`HasDerivAt*`) using `HasFDerivAt*` lemmas and algebraic properties of `ContinuousLinearMap`.
    2. Apply `.deriv` or `.derivWithin` to get the derivative value.
  - For `derivWithin_*`, require `UniqueDiffWithinAt` to ensure uniqueness of derivative.
  - For `deriv_*`, rely on `DifferentiableAt` to get `HasDerivAt`.
- **Induction**: Not used here (finite sums handled via `Finset.sum` recursion).
- **Rewriting**: Heavy use of `sub_eq_add_neg`, `zero_add`, `add_zero`, `neg_add`, etc., to reduce subtraction/negation to addition.
- **Equational reasoning**: Many proofs are one-liners via `simpa` or `simp only`.

#### 5. **Imports**

- `Mathlib.Analysis.Calculus.Deriv.Basic`: foundational derivative definitions (`HasDerivAt`, `deriv`, etc.).
- `Mathlib.Analysis.Calculus.FDeriv.Add`: properties of Fréchet derivatives for additive maps (used to lift to 1D case).
- **Implicit dependencies**:
  - `Mathlib.Analysis.NormedSpace.Basic` (via `NormedSpace`, `NormedAddCommGroup`)
  - `Mathlib.Topology.Basic` (via `Filter`, `TopologicalSpace`)
  - `Mathlib.Algebra.Module.Basic` (via `NontriviallyNormedField`, `𝕜`-module structure)

---

This file formalizes the **calculus of one-dimensional derivatives** in the context of functions from a nontrivially normed field `𝕜` to a normed space `F`. It focuses on **algebraic stability** of differentiability under addition, subtraction, negation, and finite sums, and provides explicit derivative formulas. The structure reflects Lean’s layered approach: Fréchet derivative → one-dimensional derivative → derivative rules.