### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `deriv_arcsin_aux` | `∀ x, x ≠ -1 ∧ x ≠ 1 → HasStrictDerivAt arcsin (1 / √(1 - x^2)) x ∧ ContDiffAt ℝ ω arcsin x` | Core auxiliary result: establishes strict differentiability and smoothness of `arcsin` away from ±1. |
| `hasStrictDerivAt_arcsin` | `∀ x, x ≠ -1 ∧ x ≠ 1 → HasStrictDerivAt arcsin (1 / √(1 - x^2)) x` | Extracts strict derivative part of `deriv_arcsin_aux`. |
| `hasDerivAt_arcsin` | `∀ x, x ≠ -1 ∧ x ≠ 1 → HasDerivAt arcsin (1 / √(1 - x^2)) x` | Derives standard differentiability (weaker than strict). |
| `contDiffAt_arcsin` | `∀ x, x ≠ -1 ∧ x ≠ 1 → ContDiffAt ℝ n arcsin x` | Smoothness of `arcsin` away from ±1. |
| `hasDerivWithinAt_arcsin_Ici` / `hasDerivWithinAt_arcsin_Iic` | `x ≠ -1 → HasDerivWithinAt arcsin ... (Ici x) x`, etc. | One-sided derivatives on intervals ending at ±1. |
| `differentiableWithinAt_arcsin_Ici` / `differentiableWithinAt_arcsin_Iic` | Biconditionals characterizing differentiability within intervals. | Characterize when `arcsin` is differentiable from right/left at a point. |
| `differentiableAt_arcsin` | `DifferentiableAt ℝ arcsin x ↔ x ≠ -1 ∧ x ≠ 1` | Full differentiability characterization. |
| `deriv_arcsin` | `deriv arcsin = fun x => 1 / √(1 - x^2)` | Global formula for derivative of `arcsin`. |
| `differentiableOn_arcsin` / `contDiffOn_arcsin` | On complement of `{−1, 1}`. | Global differentiability/smoothness on domain of definition. |
| `contDiffAt_arcsin_iff` | `ContDiffAt ℝ n arcsin x ↔ n = 0 ∨ x ≠ -1 ∧ x ≠ 1` | Full characterization of smoothness at a point. |
| `hasStrictDerivAt_arccos`, `hasDerivAt_arccos`, etc. | Analogous to arcsin but with negative sign. | Derivatives and smoothness of `arccos`. |
| `deriv_arccos` | `deriv arccos = fun x => -(1 / √(1 - x^2))` | Derivative of `arccos`. |

> **Note**: All derivative formulas assume the standard real-valued `arcsin`, `arccos` with ranges `[-π/2, π/2]` and `[0, π]`, respectively.

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `hasStrictDerivAt_`, `hasDerivAt_`, `hasDerivWithinAt_`: indicate derivative existence (strict, standard, or within a set).
  - `differentiableAt_`, `differentiableWithinAt_`, `differentiableOn_`: differentiability properties.
  - `contDiffAt_`, `contDiffOn_`: smoothness (`Cⁿ`) properties.
  - `deriv_`: global derivative function (e.g., `deriv_arcsin`).
- **Suffixes**:
  - `_Ici`, `_Iic`: for one-sided derivatives on intervals `[x, ∞)` and `(-∞, x]`.
- **Logical structure**:
  - `iff`-style theorems often use `↔` in names implicitly (e.g., `differentiableAt_arcsin`).
  - `_iff` suffix used when biconditional is explicit (e.g., `contDiffAt_arcsin_iff`).

---

#### 3. **Tactic Stack**

Frequently used tactics in this file:

| Tactic | Role |
|--------|------|
| `cases'` / `rcases` / `rintro` | Case analysis on inequalities/equalities (e.g., `x ≠ -1`, `x = 1`). |
| `simp` / `simp only` / `simp +contextual` | Simplification using lemmas like `arcsin_of_one_le`, `sin_arcsin'`, `sqrt_pos`, etc. |
| `rw` | Rewriting using equalities (e.g., `sqrt_eq_zero'`, `div_zero`). |
| `convert` | Goal-directed rewriting, often with `congr` or `simp` to finish. |
| `filter_upwards` | For filtering neighborhood filters (used in `differentiableWithinAt_arcsin_Ici`). |
| `exact`, `refine`, `apply` | Proof construction. |
| `funext` | Extensionality for function equality (used in `deriv_arcsin`, `deriv_arccos`). |
| `nlinarith` | Nonlinear arithmetic for inequalities involving squares. |
| `ne'` | Converts `h : a ≠ b` to `a - b ≠ 0` or similar for division/sqrt. |
| `congr_of_eventuallyEq` | Uses eventual equality to transfer derivative/contDiff properties. |

---

#### 4. **Proof Logic**

- **Structure**:
  - Proofs are typically **case-based** on whether `x = ±1`, using `eq_or_ne`, `em`, or `lt_or_lt`.
  - For `x ∈ (-1, 1)`, the proof leverages the inverse function theorem via `sinPartialHomeomorph.hasStrictDerivAt_symm`.
  - For `x < -1` or `x > 1`, `arcsin` is locally constant (`π/2` or `−π/2`), so derivative is zero (handled via `div_zero`, `sqrt_eq_zero'`, and `hasStrictDerivAt_const`).
  - One-sided differentiability uses `hasDerivWithinAt_arcsin_Ici`/`_Iic`, often reducing to the interior case or constant behavior at endpoints.
  - Smoothness (`ContDiffAt`, `ContDiffOn`) follows from chain rule and known smoothness of `sin`, `sqrt`, rational functions away from singularities.

- **Key lemmas reused**:
  - `sin_arcsin'`, `arcsin_of_one_le`, `arcsin_of_le_neg_one`
  - `sinPartialHomeomorph.hasStrictDerivAt_symm`
  - `hasDerivAt_sin`, `contDiff_sin`
  - `hasDerivWithinAt_id`, `differentiableWithinAt_id`

---

#### 5. **Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Analysis.SpecialFunctions.Trigonometric.Inverse` | Definitions and basic properties of `arcsin`, `arccos`, `arctan`, etc. |
| `Mathlib.Analysis.SpecialFunctions.Trigonometric.Deriv` | Derivatives of `sin`, `cos`, etc., and related lemmas (e.g., `hasDerivAt_sin`). |

> **Domain scope**: Real analysis on `ℝ`, focusing on differentiability and smoothness of inverse trigonometric functions. No complex analysis or higher-dimensional manifolds involved.

--- 

Let me know if you'd like a formalized summary in Lean syntax or a dependency graph.