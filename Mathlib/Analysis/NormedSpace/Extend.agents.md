### Technical Brief: Extension of Continuous Real-Linear Maps to Complex-Linear Maps

---

#### **1. Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `extendTo𝕜'` (for `LinearMap`) | `F →ₗ[ℝ] ℝ → F →ₗ[𝕜] 𝕜` | Extends a real-linear functional to a `𝕜`-linear functional via `fc x = fr x - I * fr(I • x)` |
| `extendTo𝕜'` (for `ContinuousLinearMap`) | `F →L[ℝ] ℝ → F →L[𝕜] 𝕜` | Continuous extension preserving norm bound; uses `LinearMap.mkContinuous` |
| `extendTo𝕜` (for `LinearMap`) | `RestrictScalars ℝ 𝕜 F →ₗ[ℝ] ℝ → F →ₗ[𝕜] 𝕜` | Same as `extendTo𝕜'`, but works directly on `RestrictScalars ℝ 𝕜 F` (i.e., `F` viewed as an `ℝ`-module) |
| `extendTo𝕜` (for `ContinuousLinearMap`) | `RestrictScalars ℝ 𝕜 F →L[ℝ] ℝ → F →L[𝕜] 𝕜` | Continuous version of `extendTo𝕜`, norm-preserving |
| `extendTo𝕜'_apply` | `fr.extendTo𝕜' x = fr x - I * fr(I • x)` | Explicit formula for the extension |
| `extendTo𝕜'_apply_re` | `re (fr.extendTo𝕜' x) = fr x` | Real part of the extension recovers original functional |
| `norm_extendTo𝕜'_bound` | `‖fr.extendTo𝕜' x‖ ≤ ‖fr‖ * ‖x‖` | Norm bound for the extension (key for continuity) |
| `norm_extendTo𝕜'` | `‖fr.extendTo𝕜'‖ = ‖fr‖` | Norm equality for continuous extension (isometric embedding) |
| `norm_extendTo𝕜` | `‖fr.extendTo𝕜‖ = ‖fr‖` | Same as above for `extendTo𝕜` (on `RestrictScalars`) |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `extendTo𝕜'`: Base extension on `LinearMap`/`ContinuousLinearMap` over `F` (with `IsScalarTower ℝ 𝕜 F`)
  - `extendTo𝕜`: Extension over `RestrictScalars ℝ 𝕜 F` (preferred interface)
- **Suffixes**:
  - `_apply`: Gives explicit evaluation formula
  - `_re`: Gives real part of the extended map
  - `_bound`: Gives inequality for norm control
  - `_sq`: Gives quadratic norm identity (used in proofs)
- **Variables**:
  - `fr`: Real-linear (continuous) map input
  - `fc` or `lm`: Intermediate or resulting complex-linear (continuous) map

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `simp only [...]` — for rewriting using definitional equalities and lemmas like `rclike_simps`
- `rw [...]` — rewriting using lemmas like `map_add`, `smul_smul`, `mul_assoc`, etc.
- `ring` / `abel` — simplifying algebraic expressions in `𝕜` or `ℝ`
- `cases' ... with h h` — case analysis on `I_mul_I_ax` (defining `I² = -1`)
- `le_antisymm` — proving equality of norms via two inequalities
- `calc` — chaining inequalities step-by-step (especially in norm bounds)
- `apply mul_nonneg` — positivity arguments for norms
- `infer_instance` — for normed space instances (e.g., `NormedSpace 𝕜 (RestrictScalars ℝ 𝕜 F)`)

---

#### **4. Proof Logic**

- **Extension correctness**:
  - Prove `fc` is additive (`add`) and `𝕜`-linear (`smul_𝕜`) by:
    - First handling real scalars (`smul_ℝ`)
    - Then handling `I` (`smul_I`)
    - Finally combining for general `c ∈ 𝕜` using `re + im` decomposition (`smul_𝕜`)
- **Norm control**:
  - Use identity `‖fc x‖² = fr(conj(fc x) • x)` (`norm_extendTo𝕜'_apply_sq`)
  - Apply `le_opNorm` and properties of `norm_smul`, `norm_conj`
  - Conclude `‖fc x‖ ≤ ‖fr‖ * ‖x‖`
- **Norm equality**:
  - Show `‖fr‖ ≤ ‖fc‖` via `re (fc x) = fr x` and `|re z| ≤ ‖z‖`
  - Combine with `‖fc‖ ≤ ‖fr‖` from `norm_extendTo𝕜'_bound`
- **Use of `RestrictScalars`**:
  - Provides a clean interface where `F` is treated as an `ℝ`-module, avoiding `IsScalarTower` hypotheses in user-facing lemmas

---

#### **5. Imports & Scope**

**Primary imports**:
- `Mathlib.Algebra.Algebra.RestrictScalars` — for `RestrictScalars` and module structure
- `Mathlib.Analysis.NormedSpace.OperatorNorm.Basic` — for operator norm, `opNorm`, continuity
- `Mathlib.Analysis.RCLike.Basic` — for `RCLike 𝕜` (abstracts `ℝ`/`ℂ` with conjugation, `I`, etc.)

**Domain scope**:
- Functional analysis over normed spaces over `ℝ` or `ℂ`
- Extension of linear functionals from real to complex scalars
- Applications likely include:
  - Hahn–Banach-type extensions
  - Duality theory for complex normed spaces
  - Complexification of real Banach spaces

---

#### **6. Notes on Design Choices**

- **Uniform formulation via `RCLike`**: Avoids case analysis on `𝕜 = ℝ` or `ℂ`; works for any `RCLike` field (e.g., `ℝ`, `ℂ`, or future generalizations).
- **`RestrictScalars` interface**: Preferred over `IsScalarTower` for user-facing APIs to reduce hypothesis clutter.
- **Isometric extension**: The norm equality `‖fr.extendTo𝕜‖ = ‖fr‖` shows the extension is *isometric*, not just bounded — crucial for functional-analytic applications.

--- 

Let me know if you'd like a diagram of the extension functor or a porting checklist for Lean 3 → Lean 4.