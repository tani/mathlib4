### Technical Metadata Brief: `Analysis/Calculus/FDeriv/Prod.lean`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `HasStrictFDerivAt.prod` | If `f₁`, `f₂` have strict Fréchet derivatives at `x`, then `x ↦ (f₁ x, f₂ x)` has derivative `f₁'.prod f₂'`. |
| `HasFDerivAt.prod` / `HasFDerivWithinAt.prod` | Analogous existence results for (within-at) Fréchet derivatives. |
| `HasFDerivAt.prod_mk_left` / `HasFDerivAt.prod_mk_right` | Derivatives of constant-first/second-coordinate embeddings: `e ↦ (e, f₀)` and `f ↦ (e₀, f)`. |
| `DifferentiableAt.prod` / `Differentiable.prod` | Closure of differentiability under product of functions. |
| `fderiv_prod` | Chain rule for `fderiv` of product: `fderiv (fun x ↦ (f₁ x, f₂ x)) = fderiv f₁ .prod fderiv f₂`. |
| `fderivWithin_prod` | Same for `fderivWithin`, assuming `UniqueDiffWithinAt`. |
| `hasStrictFDerivAt_fst` / `hasStrictFDerivAt_snd` | Derivatives of projection maps `fst`, `snd`. |
| `HasStrictFDerivAt.fst` / `HasStrictFDerivAt.snd` | Chain rule for projections: derivative of `x ↦ (f x).1` is `fst ∘ f'`. |
| `fderiv.fst` / `fderiv.snd` | Explicit formulas for `fderiv` of projections composed with a function. |
| `HasStrictFDerivAt.prodMap` / `HasFDerivAt.prodMap` | Derivative of `Prod.map f f₂`, i.e., `(x, y) ↦ (f x, f₂ y)`. |
| `DifferentiableAt.prod_map` | Differentiability of `Prod.map`. |
| `hasStrictFDerivAt_pi'` / `hasFDerivAt_pi'` | *IFF* characterizations: a function into a finite product is (strictly/Fréchet) differentiable iff all its components are. |
| `hasFDerivAt_pi` / `hasFDerivWithinAt_pi` | Component-wise differentiability ↔ joint differentiability for `φ : ι → E → F' i`. |
| `fderiv_pi` / `fderivWithin_pi` | Derivative of `x ↦ (i ↦ φ i x)` is `i ↦ fderiv (φ i)`. |
| `hasStrictFDerivAt_apply`, `hasFDerivAt_apply`, etc. | Evaluation maps `f ↦ f i` are differentiable (used to extract components). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `has*FDeriv*` — existence of (strict/Fréchet/within) derivative.
  - `differentiable*` — differentiability (at/on/within).
  - `fderiv*` — explicit formula for derivative.
- **Suffixes**:
  - `prod` — product of two functions.
  - `fst` / `snd` — projections.
  - `prodMap` — product map on domains.
  - `pi` / `pi'` — product over index type `ι`.
  - `apply` — evaluation at a coordinate.
- **Special**:
  - `mk_left`, `mk_right` — product construction with one component constant.
  - `inl`, `inr` — linear maps for embedding into product space (used in `hasFDerivAt_prod_mk_*`).

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `simp_rw`, `simp`, `rw` — heavily used for rewriting using lemmas like `hasFDerivAt_pi'`, `differentiableAt_pi`, etc.
  - `exact`, `apply`, `intro`, `intro h` — standard proof structure.
  - `cases h` — when destructuring hypotheses like `h : HasFDerivAt _ _ _`.
- **Specialized**:
  - `fun_prop` — custom `fun_prop` attribute used to mark closure properties for differentiability/derivative existence.
  - `nonrec` — for nonrecursive definitions (e.g., `HasFDerivWithinAt.prod`).
  - `of_isLittleO` — used in proofs of `prod` theorems: reduces to `isLittleO` version.
  - `comp` — composition with `hasFDerivAt_fst`/`snd` in `prodMap` proofs.
  - `tendsto_map` — used in `HasFDerivAtFilter.fst/snd` to handle filter pushforwards.

---

#### **4. Proof Logic**

- **Structure**:
  - Most proofs follow a **two-step pattern**:
    1. Reduce to `isLittleO` (via `has*FDeriv*_iff_isLittleO`).
    2. Use `isLittleO` closure properties (e.g., `isLittleO.prod_left`, `isLittleO.comp`).
  - For `pi`-type results:
    - Use `isLittleO_pi` (characterization of little-o for products).
    - Prove `iff` by splitting into `→` (projection) and `←` (construction via `pi`).
  - For `prodMap`, use:
    - `comp` with `fst`/`snd` to reduce to component functions.
    - Then apply `prod`.
- **Induction**: Not used (finite products via `Fintype ι`, no recursion).
- **Uniqueness**: `UniqueDiffWithinAt` assumptions used only for `fderivWithin` equalities.

---

#### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.Analysis.Calculus.FDeriv.Linear`
  - `Mathlib.Analysis.Calculus.FDeriv.Comp`
- **Context**:
  - Fréchet derivative (`FDeriv`) over nontrivially normed field `𝕜`.
  - Normed spaces `E`, `F`, `G`, etc., over `𝕜`.
  - Filters, `UniqueDiffWithinAt`, `DifferentiableAt`, `DifferentiableWithinAt`, etc.
- **Scope**:
  - Formalizes calculus of product and Pi-type functions.
  - Bridges between pointwise/component-wise differentiability and joint differentiability.
  - Foundation for multivariable calculus in infinite-dimensional settings.

--- 

This module is a **central utility** for handling derivatives of structured functions (products, projections, maps into products), especially in preparation for inverse/implicit function theorems and manifold calculus.