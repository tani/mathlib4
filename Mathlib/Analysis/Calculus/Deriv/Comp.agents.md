### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `HasDerivAtFilter.scomp` | `HasDerivAtFilter g₁ g₁' (h x) L' → HasDerivAtFilter h h' x L → Tendsto h L L' → HasDerivAtFilter (g₁ ∘ h) (h' • g₁') x L` | Chain rule for scalar-to-vector composition (`g₁ : 𝕜' → F`, `h : 𝕜 → 𝕜'`) using `smul`. |
| `HasDerivAtFilter.comp` | `HasDerivAtFilter h₂ h₂' (h x) L' → HasDerivAtFilter h h' x L → Tendsto h L L' → HasDerivAtFilter (h₂ ∘ h) (h₂' * h') x L` | Chain rule for scalar-to-scalar composition (`h₂, h : 𝕜 → 𝕜'`) using multiplication. |
| `HasDerivAt.scomp` | `HasDerivAt g₁ g₁' (h x) → HasDerivAt h h' x → HasDerivAt (g₁ ∘ h) (h' • g₁') x` | Standard chain rule for vector-valued outer function. |
| `HasDerivAt.comp` | `HasDerivAt h₂ h₂' (h x) → HasDerivAt h h' x → HasDerivAt (h₂ ∘ h) (h₂' * h') x` | Standard chain rule for scalar-valued outer function. |
| `HasFDerivAt.comp_hasDerivAt` | `HasFDerivAt l l' (f x) → HasDerivAt f f' x → HasDerivAt (l ∘ f) (l' f') x` | Chain rule for Fréchet-differentiable `l : F → E` composed with scalar-differentiable `f : 𝕜 → F`. |
| `deriv.scomp` | `DifferentiableAt 𝕜' g₁ (h x) → DifferentiableAt 𝕜 h x → deriv (g₁ ∘ h) x = deriv h x • deriv g₁ (h x)` | Derivative formula for scalar→vector composition. |
| `deriv.comp` | `DifferentiableAt 𝕜' h₂ (h x) → DifferentiableAt 𝕜 h x → deriv (h₂ ∘ h) x = deriv h₂ (h x) * deriv h x` | Derivative formula for scalar→scalar composition. |
| `derivWithin.scomp` | `DifferentiableWithinAt 𝕜' g₁ t' (h x) → DifferentiableWithinAt 𝕜 h s x → MapsTo h s t' → UniqueDiffWithinAt 𝕜 s x → derivWithin (g₁ ∘ h) s x = derivWithin h s x • derivWithin g₁ t' (h x)` | Local chain rule for derivatives within sets (vector outer). |
| `HasDerivAt.iterate` | `HasDerivAt f f' x → f x = x → HasDerivAt f^[n] (f' ^ n) x` | Derivative of iterated function at a fixed point. |

> **Note**: The `of_eq` variants (e.g., `scomp_of_eq`, `comp_of_eq`) allow substitution via an equality proof `y = h x`, improving flexibility in proofs.

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `HasDerivAt*`, `HasDerivWithinAt*`, `HasStrictDerivAt*`: Differentiability notions (Fréchet, local, strict).
  - `deriv*`, `derivWithin*`: Actual derivative values (functions).
  - `fderiv*`, `fderivWithin*`: Fréchet derivative operators.
- **Suffixes**:
  - `*scomp`: *scalar-to-vector* composition (`g₁ ∘ h`, `g₁ : 𝕜' → F`).
  - `*comp`: *scalar-to-scalar* composition (`h₂ ∘ h`, `h₂, h : 𝕜 → 𝕜'`).
  - `*comp_hasDerivAt`, `*comp_hasFDerivAt`, etc.: Mixed compositions (e.g., Fréchet + scalar derivative).
  - `*of_eq`: Versions accepting an equality proof instead of definitional equality.
- **Operators**:
  - `•`: Scalar multiplication (used in `scomp` lemmas).
  - `*`: Multiplication in algebra (used in `comp` lemmas).

---

#### 3. **Tactic Stack**

- **Core tactics**:
  - `rw`: Rewriting equalities (especially `of_eq` lemmas).
  - `simpa`: Simplifying using lemmas and target.
  - `convert`: Matching goals up to definitional equality (e.g., `mul_comm`, `smulRight_apply`).
  - `ext`: Extensionality for linear maps/functions.
  - `rwa`, `subst`: Rewriting + assumption, substitution.
  - `have`, `exact`, `apply`: Proof construction.
- **Domain-specific simplifications**:
  - `smulRight_apply`, `coe_comp'`, `one_smul`, `mul_comm`: Used to reduce `smul`/`mul` expressions.
  - `ContinuousLinearMap.smulRight_one_pow`: For iterating derivatives at fixed points.

---

#### 4. **Proof Logic**

- **Pattern**:
  1. **Reduction via `restrictScalars`** (e.g., `hg.restrictScalars 𝕜`) to lift scalar differentiability to algebra-differentiability.
  2. **Apply composition lemmas** (`comp`, `scomp`, `comp_hasFDerivAt`, etc.) using continuity/tendsto assumptions.
  3. **Simplify** using algebraic properties (`mul_comm`, `smulRight_apply`, etc.).
  4. **Extract derivative value** via `.deriv` or `.derivWithin` when differentiability is given.
- **Inductive/iterative cases** (e.g., `iterate` lemmas):
  - Use induction on `n`.
  - Base case: `n = 0` or `n = 1`.
  - Step: Apply `iterate` lemma with `n+1`, using `pow_succ` and `smulRight_one_pow`.

---

#### 5. **Imports**

| Module | Role |
|--------|------|
| `Mathlib.Analysis.Calculus.Deriv.Basic` | Core derivative definitions (`HasDerivAt`, `deriv`, etc.). |
| `Mathlib.Analysis.Calculus.FDeriv.Comp` | Chain rules for Fréchet derivatives (`HasFDerivAt.comp`, etc.). |
| `Mathlib.Analysis.Calculus.FDeriv.RestrictScalars` | Lifting scalar differentiability to algebra-differentiability (`restrictScalars`). |

> **Context**: This file formalizes chain rules in the context of **normed fields** (`𝕜`, `𝕜'`) and **normed spaces** (`E`, `F`) over them, with `𝕜'` an algebra over `𝕜` (e.g., `ℝ`, `ℂ`). It bridges scalar calculus (1D) with multivariable calculus (via `fderiv`).

--- 

This metadata captures the structure, conventions, and proof methodology of the chain rule formalization in `Mathlib`, suitable for training a domain-specific Lean assistant.