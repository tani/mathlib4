### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `hasFDerivAt_update` | `HasFDerivAt (Function.update x i) (.pi (Pi.single i (.id 𝕜 (E i)))) y` | Shows that updating a function at index `i` with value `y` has Fréchet derivative equal to the canonical embedding of `E i` into the product space via `Pi.single`. |
| `hasFDerivAt_single` | `HasFDerivAt (Pi.single i) (.pi (Pi.single i (.id 𝕜 (E i)))) y` | Special case of `hasFDerivAt_update` at zero; shows that the `Pi.single` map (embedding a single component into the product) is Fréchet differentiable with the same derivative. |
| `fderiv_update` | `fderiv 𝕜 (Function.update x i) y = .pi (Pi.single i (.id 𝕜 (E i)))` | Computes the actual Fréchet derivative (as a continuous linear map) of the update function at point `y`. |
| `fderiv_single` | `fderiv 𝕜 (Pi.single i) y = .pi (Pi.single i (.id 𝕜 (E i)))` | Computes the Fréchet derivative of the `Pi.single` map — independent of `y`, since it's affine linear. |

> **Note**: `.pi` and `.id` refer to `ContinuousLinearMap.pi` and `ContinuousLinearMap.id` respectively (from `Mathlib.Analysis.NormedSpace.PiBasic` or similar), and `Pi.single i` is the canonical inclusion of `E i` into `Π i, E i`.

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `hasFDerivAt_`: for the *property* of having a given Fréchet derivative at a point.
  - `fderiv_`: for the *computation* of the derivative (as a continuous linear map).
- **Suffixes**:
  - `_update`: refers to the `Function.update` operation.
  - `_single`: refers to the `Pi.single` embedding.
- **Internal abbreviations**:
  - `l := ContinuousLinearMap.pi (Pi.single i (.id 𝕜 (E i)))`: used to simplify expressions in proofs.

---

#### 3. **Tactic Stack**

- `set`: to introduce local definitions (e.g., `l := ...`)
- `ext`: extensionality to prove function equality.
- `dsimp`: simplification with definitional equalities (e.g., unfolding `Pi.single`, `Function.update`).
- `split_ifs`: handles `if-then-else` cases (from `Function.update` definition).
- `subst`: eliminates equality hypotheses by substitution.
- `simp`: basic simplification using rewrite rules.
- `rw`: rewrite using equalities (e.g., `update_eq`, `zero_add`).
- `convert`: to match goals up to definitional equality, especially when applying lemmas like `hasFDerivAt_const`, `hasFDerivAt_sub_const`.
- `.hasFDerivAt`, `.fderiv`: projection of derivative properties from `HasFDerivAt` to `fderiv`.

> **No heavy automation** like `linarith`, `ring`, or `norm_cast` — the proofs are mostly structural and rely on known calculus lemmas.

---

#### 4. **Proof Logic**

- **Strategy**: Decompose the update function into a sum of a constant function and a linear map, then apply known rules for derivatives of sums and compositions.
  - First, express `Function.update x i` as `(fun _ ↦ x) + l ∘ (· - x i)`, where `l` is the canonical embedding.
  - Use `hasFDerivAt_const` and `hasFDerivAt_sub_const` to get differentiability of each summand.
  - Apply `add` rule for Fréchet derivatives (`hasFDerivAt_const.add ...`).
  - Simplify using `zero_add`, `comp_id`, etc.
- For `fderiv_*` theorems: apply `.fderiv` to the corresponding `hasFDerivAt_*` result.

---

#### 5. **Imports**

- `Mathlib.Analysis.Calculus.FDeriv.Add`: Provides rules for Fréchet derivatives under addition (e.g., `hasFDerivAt_const`, `hasFDerivAt_sub_const`, `add` rule).
- Implicit dependencies (via `NormedAddCommGroup`, `NormedSpace`, `Pi.single`, `ContinuousLinearMap.pi`):
  - `Mathlib.Analysis.NormedSpace.PiBasic`
  - `Mathlib.Analysis.NormedSpace.Basic`
  - `Mathlib.Data.Fintype.Basic`, `Mathlib.Data.DecidableEq.Basic`

> The file is part of the **Mathlib** library, specifically dealing with calculus on infinite product spaces (`Π i, E i`) over a nontrivially normed field `𝕜`.

--- 

Let me know if you'd like a formalized summary in Lean syntax or a diagram of the derivative structure.