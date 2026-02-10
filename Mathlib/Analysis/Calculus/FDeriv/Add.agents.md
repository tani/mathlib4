### Technical Metadata Brief: `Analysis/Calculus/FDeriv/Additive.lean`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `HasStrictFDerivAt` | `f →L[𝕜] F → E → Prop` | Characterizes existence of strict Fréchet derivative at a point. |
| `HasFDerivAt`, `HasFDerivWithinAt`, `HasFDerivAtFilter` | Variants of Fréchet differentiability (global, within set, along filter). | Generalized differentiability notions used throughout calculus. |
| `DifferentiableAt`, `DifferentiableWithinAt`, `DifferentiableOn`, `Differentiable` | Properties of functions being differentiable at a point, within a set, on a set, or globally. | Regularity conditions for differentiation. |
| `fderiv`, `fderivWithin` | `fderiv : DifferentiableAt f x → E →L[𝕜] F`, `fderivWithin` similarly | Extracts the derivative (as a continuous linear map) when differentiability holds. |
| `HasStrictFDerivAt.const_smul` | `HasStrictFDerivAt f f' x → c • f` has derivative `c • f'` | Derivative of scalar multiplication. |
| `HasStrictFDerivAt.add` | `HasStrictFDerivAt f f' x → HasStrictFDerivAt g g' x → HasStrictFDerivAt (f + g) (f' + g') x` | Derivative of sum of functions. |
| `HasStrictFDerivAt.neg` | `HasStrictFDerivAt f f' x → HasStrictFDerivAt (-f) (-f') x` | Derivative of negation. |
| `HasStrictFDerivAt.sub` | `HasStrictFDerivAt f f' x → HasStrictFDerivAt g g' x → HasStrictFDerivAt (f - g) (f' - g') x` | Derivative of difference. |
| `HasStrictFDerivAt.sum` | `∀ i ∈ u, HasStrictFDerivAt (A i) (A' i) x → HasStrictFDerivAt (∑ i ∈ u, A i) (∑ i ∈ u, A' i) x` | Derivative of finite sum over a finset. |
| `fderiv_add`, `fderiv_add'`, `fderiv_sub`, `fderiv_sub'`, etc. | Equalities like `fderiv (f + g) x = fderiv f x + fderiv g x` | Explicit derivative formulas for operations. |
| `differentiableAt_add_iff_left/right`, `differentiableAt_sub_iff_left/right`, etc. | Biconditionals like `DifferentiableAt (f + g) x ↔ DifferentiableAt f x` (under assumptions) | Characterize differentiability of combinations in terms of components. |

---

#### **2. Naming Conventions**

- **Predicate prefixes**:
  - `Has*`: Existence of derivative (e.g., `HasFDerivAt`, `HasStrictFDerivAt`).
  - `Differentiable*`: Actual differentiability (stronger than existence).
- **Operation-based suffixes**:
  - `const_smul`, `add`, `sub`, `neg`, `sum`, `add_const`, `const_add`, `sub_const`, `const_sub`.
- **Derivative extraction**:
  - `fderiv*`, `fderivWithin*`.
- **Biconditional lemmas**:
  - `*_iff_*` (e.g., `differentiableAt_add_const_iff`, `differentiableWithinAt_sub_iff_left`).
- **Alternative syntax versions**:
  - `'` suffix (e.g., `fderiv_add'`) for versions using `f + g` instead of `fun y ↦ f y + g y`.

---

#### **3. Tactic Stack**

- **Core simplification & algebra**:
  - `simp`, `simp only`, `abel`, `ring`
- **Rewriting with definitions**:
  - `simp_rw`, `convert`, `rw`
- **Case analysis & classical reasoning**:
  - `by_cases`, `classical`
- **Filter/limit reasoning**:
  - `tendsto_map`, `isLittleO`, `isLittleO.congr_left`
- **Functional properties**:
  - `fun_prop` (used in `@[fun_prop]` attributes to guide typeclass resolution for differentiability preservation)
- **Equational reasoning**:
  - `simpa`, `exact`, `refine`, `convert`

---

#### **4. Proof Logic**

- **Structure**:
  - Most proofs follow a *derivative existence → differentiability → derivative formula* pipeline.
  - For existence lemmas (`Has*`), proofs reduce to showing the defining little-o condition via:
    - `isLittleO.sum`, `isLittleO.add`, `isLittleO.neg`, etc.
    - Use of `congr_left` and algebraic simplifications (`abel`, `simp only [LinearMap.*]`).
  - For derivative *equalities* (`fderiv*`), proofs apply:
    - `fderivWithin`/`fderiv` uniqueness (via `hasFDerivWithinAt.fderivWithin`, `hasFDerivAt.fderiv`).
    - Often rely on `by_cases` on differentiability to handle zero-derivative edge cases.
- **Induction**:
  - Used implicitly in `sum` lemmas (via `Finset.sum` induction).
- **Equivalence proofs** (`iff` lemmas):
  - Typically use `⟨fun h ↦ ..., fun h ↦ ...⟩` with `simpa` or direct construction.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.Calculus.FDeriv.Linear` | Provides basic linear algebraic structure on derivatives (e.g., `ContinuousLinearMap`, `id`, `const_smul` maps). |
| `Mathlib.Analysis.Calculus.FDeriv.Comp` | Chain rule and composition lemmas (used in `const_smul.comp`, etc.). |

> **Note**: This file builds on foundational Fréchet derivative theory (`FDeriv.Basic` via module docstring), focusing on *algebraic stability* of differentiability and derivative formulas under additive operations and scalar multiplication.

--- 

Let me know if you'd like a dependency graph or a summary of how this file fits into the broader `FDeriv` hierarchy.