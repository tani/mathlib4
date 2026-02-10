### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `NNReal.strictConcaveOn_rpow` | `{p : ℝ} → 0 < p → p < 1 → StrictConcaveOn ℝ≥0 univ (λ x ↦ x ^ p)` | Proves strict concavity of `x ↦ x^p` on nonnegative reals for `p ∈ (0,1)`. |
| `NNReal.concaveOn_rpow` | `{p : ℝ} → 0 ≤ p → p ≤ 1 → ConcaveOn ℝ≥0 univ (λ x ↦ x ^ p)` | Extends to include endpoints `p = 0, 1`, proving concavity (not necessarily strict). |
| `NNReal.strictConcaveOn_sqrt` | `StrictConcaveOn ℝ≥0 univ NNReal.sqrt` | Special case of strict concavity for square root (`p = 1/2`). |
| `Real.strictConcaveOn_rpow` | `{p : ℝ} → 0 < p → p < 1 → StrictConcaveOn ℝ (Set.Ici 0) (λ x ↦ x ^ p)` | Lifts strict concavity from `ℝ≥0` to `ℝ` on domain `[0, ∞)`. |
| `Real.concaveOn_rpow` | `{p : ℝ} → 0 ≤ p → p ≤ 1 → ConcaveOn ℝ (Set.Ici 0) (λ x ↦ x ^ p)` | Analogous extension for concavity on `ℝ` with domain `[0, ∞)`. |
| `Real.strictConcaveOn_sqrt` | `StrictConcaveOn ℝ (Set.Ici 0) (√·)` | Square root concavity on `ℝ`, via `sqrt = rpow (1/2)`. |

> **Note**: All proofs avoid calculus (no derivatives/integrals), relying instead on order-theoretic properties and known convexity/concavity results for `rpow` with exponent >1 (imported from `Analysis.Convex.SpecificFunctions.Basic`).

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `strictConcaveOn_`, `concaveOn_`: Standard Lean/Lean-Mathlib naming for convexity/concavity properties.
  - `rpow`: Indicates dependence on real power function (`rpow` = real exponentiation).
- **Suffixes**:
  - `_rpow`: Indicates the function under analysis is `λ x ↦ x ^ p`.
  - `_sqrt`: Special case for square root.
- **Domain qualifiers**:
  - `NNReal.*`: Statements over nonnegative reals (`ℝ≥0`).
  - `Real.*`: Statements over all reals, restricted to `Set.Ici 0 = [0, ∞)`.

---

#### 3. **Tactic Stack**

Frequently used tactics in this file:

| Tactic | Role |
|--------|------|
| `refine` | Structured proof construction, especially for `StrictConcaveOn`/`ConcaveOn` constructors. |
| `simp` / `simp only` | Simplification using definitional equalities (e.g., `rpow_zero`, `rpow_one`, `NNReal.sqrt_eq_rpow`). |
| `rw` | Rewriting using lemmas (e.g., `funext`, `NNReal.orderIsoRpow_symm_eq`). |
| `ext` | Extensionality for function equality (e.g., proving `f = g` by `ext x`). |
| `exact` / `exact_mod_cast` | Closing goals by matching term types; `exact_mod_cast` handles coercion between `ℝ≥0` and `ℝ`. |
| `linarith` | Linear arithmetic for inequalities (e.g., verifying `0 < 1/2`). |
| `norm_cast` | Normalizes casts between numeric types (`ℝ≥0` ↔ `ℝ`). |
| `have`, `let` | Introducing intermediate lemmas or definitions (e.g., `f := NNReal.orderIsoRpow ...`). |

---

#### 4. **Proof Logic**

- **Structure**:
  - **Step 1**: Reduce to known convexity/concavity results (e.g., `strictConvexOn_rpow` for exponents >1).
  - **Step 2**: Use order isomorphisms (`NNReal.orderIsoRpow`) to relate `x ↦ x^p` (for `p ∈ (0,1)`) to `x ↦ x^{1/p}` (with `1/p > 1`), which is convex.
  - **Step 3**: Apply symmetry: if `f` is strictly convex, then `f⁻¹` is strictly concave.
  - **Step 4**: For endpoint cases (`p = 0`, `p = 1`), reduce to constant or identity functions.
  - **Step 5**: Lift from `NNReal` to `Real` via coercion and `Set.Ici 0`.

- **Inductive/Case Analysis**:
  - `rcases eq_or_lt_of_le` used to split on equality vs strict inequality at endpoints.

---

#### 5. **Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Analysis.Convex.SpecificFunctions.Basic` | Provides `strictConvexOn_rpow` for exponents `> 1`, foundational convexity facts. |
| `Mathlib.Analysis.SpecialFunctions.Pow.NNReal` | Defines `rpow` on `NNReal`, key properties like `NNReal.sqrt_eq_rpow`, continuity, monotonicity. |

> **Minimal dependencies**: No calculus (e.g., `deriv`, `integral`) used — relies on order-theoretic convexity and algebraic properties of `rpow`.

--- 

Let me know if you'd like a diagram of the logical dependencies or a formalized summary in Lean style.