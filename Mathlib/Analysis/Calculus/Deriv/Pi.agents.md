### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**
| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `hasDerivAt_update` | `HasDerivAt (Function.update x i) (Pi.single i (1 : 𝕜)) y` | Shows that updating a function at point `i` with value `y` has derivative `Pi.single i 1` at `y`. |
| `hasDerivAt_single` | `HasDerivAt (Pi.single i) (Pi.single i (1 : 𝕜)) y` | Special case of `hasDerivAt_update` where the base function is identically zero; models the derivative of the embedding `𝕜 → ι → 𝕜` sending `y ↦ (j ↦ if j = i then y else 0)`. |
| `deriv_update` | `deriv (Function.update x i) y = Pi.single i (1 : 𝕜)` | Computes the actual derivative (as a linear map / vector in 1D) of the updated function at `y`. |
| `deriv_single` | `deriv (Pi.single i) y = Pi.single i (1 : 𝕜)` | Derivative of the `Pi.single` embedding; follows directly from `deriv_update` with `x = 0`. |

> **Note**: In this context (1D over a nontrivially normed field), `HasDerivAt` and `deriv` refer to the usual Fréchet derivative, identified with multiplication by a scalar (here represented as `Pi.single i 1`, i.e., the function that is `1` at `i` and `0` elsewhere).

---

#### 2. **Naming Conventions**
- **Prefixes**:
  - `hasDerivAt_`: asserts existence of a derivative (Fréchet or classical).
  - `deriv_`: computes or equates the derivative itself.
- **Suffixes / Structure**:
  - `_update`: refers to `Function.update`.
  - `_single`: refers to `Pi.single`.
- **Variable naming**:
  - `x : ι → 𝕜`: base function.
  - `i : ι`: index of update/embedding.
  - `y : 𝕜`: point at which derivative is taken.

---

#### 3. **Tactic Stack**
- `convert`: used to reduce to a known theorem (`hasFDerivAt_update`).
- `ext`: extensionality (to prove equality of functions).
- `rw`: rewriting using definitions (`Pi.single`, `Function.update_apply`).
- `split_ifs`: case analysis on decidable equality (`i = j`).
- `simp [h]`, `simp [Pi.single_eq_of_ne h]`: simplification using hypotheses and lemmas about `Pi.single`.

> No heavy automation (e.g., `aesop`, `ring`, `linarith`) is used—proofs are mostly definitional and rely on `simp`-based simplification.

---

#### 4. **Proof Logic**
- **Strategy**: Reduce to known higher-level results (`hasFDerivAt_update`) via `convert`, then verify equality pointwise using extensionality.
- **Steps**:
  1. Use `convert` to lift from `hasFDerivAt_update` (a known theorem in `FDeriv.Pi`).
  2. Prove equality of the candidate derivatives by extensionality (`ext z j`).
  3. Simplify using definitions of `Pi.single` and `Function.update_apply`.
  4. Split on `i = j` (via `split_ifs`) and simplify each branch.

- **Induction / recursion**: Not used—proofs are direct and rely on algebraic/syntactic simplification.

---

#### 5. **Imports**
- `Mathlib.Analysis.Calculus.FDeriv.Pi`: Provides `hasFDerivAt_update`, the higher-order (Fréchet) derivative version for pi-types.
- `Mathlib.Analysis.Calculus.Deriv.Basic`: Supplies foundational definitions like `HasDerivAt`, `deriv`, and basic calculus rules.

> **Scope**: This module formalizes the relationship between Fréchet and classical (1D) derivatives for functions on finite-dimensional product spaces (`ι → 𝕜`), focusing on elementary operations: updating a single coordinate and embedding via `Pi.single`. It serves as a bridge between abstract `FDeriv` theory and concrete calculus in finite dimensions.

--- 

Let me know if you'd like a formalized summary for use in a domain-specific AI agent (e.g., for proof planning or tactic recommendation).