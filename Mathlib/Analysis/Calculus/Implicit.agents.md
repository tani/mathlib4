### Technical Metadata Brief: Implicit Function Theorem in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ImplicitFunctionData` | `Structure` | Encapsulates data for the *general* implicit function theorem: two functions `f, g`, point `a`, strict differentiability, surjectivity of derivatives, and complementary kernels. |
| `prodFun` | `E → F × G` | Pairing of the two functions: `x ↦ (f x, g x)`. |
| `toPartialHomeomorph` | `PartialHomeomorph E (F × G)` | Constructed from `prodFun` via inverse function theorem; local homeomorphism witnessing that level sets of `f` are locally homeomorphic to `G`. |
| `implicitFunction` | `F → G → E` | The implicit function: for `(y, z)` near `(f a, g a)`, `φ y z` satisfies `f(φ y z) = y`, `g(φ y z) = z`. |
| `implicitFunction_hasStrictFDerivAt` | `HasStrictFDerivAt (implicitFunction y₀) g'inv z₀` | Strict differentiability of the implicit function at `(y₀, z₀)`, given a right inverse `g'inv` of `rightDeriv` annihilated by `leftDeriv`. |
| `implicitFunctionDataOfComplemented` | `ImplicitFunctionData` | Specialization of `ImplicitFunctionData` for a single function `f` with surjective derivative and *complemented* kernel. Uses `Classical.choose` to pick a complement. |
| `implicitToPartialHomeomorphOfComplemented` | `PartialHomeomorph E (F × ker f')` | Local homeomorphism sending `x ↦ (f x, projection_of_kernel_complement)`. |
| `implicitFunctionOfComplemented` | `F → ker f' → E` | Implicit function in the complemented-kernel case. |
| `implicitToPartialHomeomorph` / `implicitFunction` (finite-dim case) | Same as above, but kernel automatically complemented due to finite-dimensional codomain. |
| `to_implicitFunction` / `to_implicitFunctionOfComplemented` | `HasStrictFDerivAt (implicitFunction f a) (ker f').subtypeL 0` | Strict differentiability of the implicit function at `0` in the kernel direction; derivative is the inclusion `ker f' ↪ E`. |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `implicitFunctionDataOfComplemented`, `implicitFunctionOfComplemented`, `implicitToPartialHomeomorphOfComplemented`: for the complemented-kernel case.
  - `implicitFunction`, `implicitToPartialHomeomorph`: for the finite-dimensional case (kernel automatically complemented).
  - `leftFun`, `rightFun`, `leftDeriv`, `rightDeriv`: components of `ImplicitFunctionData`.
  - `pt`: the base point `a`.

- **Suffixes:**
  - `_ofComplemented`: indicates use of a complemented kernel assumption.
  - `_apply_image`, `_eq`, `_map_implicitFunction_eq`: properties of the implicit function (e.g., `f(φ(y,z)) = y`).
  - `_source`, `_target`, `_self`: properties of the partial homeomorphism at the base point.

- **Other patterns:**
  - `prodFun`, `prod_map_implicitFunction`: product-related constructions.
  - `subtypeL`: the canonical linear map `ker f' → E`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp` / `simp only` | Simplification using definitional equalities and lemmas (e.g., `implicitFunction_apply_image`, `prodFun_apply`). |
| `convert` | Used to match goals up to definitional equality (e.g., in `implicitFunction_hasStrictFDerivAt`). |
| `rw` / `apply` | Rewriting and applying lemmas (e.g., `map_nhds_eq`, `tendsto_implicitFunction`). |
| `haveI` | Introducing instances (e.g., `FiniteDimensional.complete` for `F`). |
| `ext` | Extensionality for linear maps (e.g., proving `g'inv` satisfies required equations). |
| `congr_arg` | Extracting components from equalities in product spaces. |
| `swap` | Reordering goals (used in `implicitFunction_hasStrictFDerivAt`). |
| `aesop` (implied) | Not explicitly used here, but `simp` + `rw` + `convert` cover most automation needs. |

---

#### **4. Proof Logic**

- **General version (`ImplicitFunctionData`)**:
  - Construct `prodFun = (f, g)`.
  - Show `prodFun` has bijective derivative (via `equivProdOfSurjectiveOfIsCompl`).
  - Apply inverse function theorem → get `toPartialHomeomorph`.
  - Define `implicitFunction` as `curry toPartialHomeomorph.symm`.
  - Prove properties via `eventually_left_inverse` / `eventually_right_inverse`.
  - For differentiability: compose with coordinate inclusions and use chain rule.

- **Complemented kernel case**:
  - Use `Classical.choose` to pick a projection `E → ker f'`.
  - Define `rightFun x = projection(x - a)` (shifted to vanish at `a`).
  - Verify assumptions of `ImplicitFunctionData` using `isCompl_of_proj`, `range_eq_of_proj`.
  - Apply general version.

- **Finite-dimensional case**:
  - Use `ker_closedComplemented_of_finiteDimensional_range` to get complemented kernel.
  - Apply complemented case.
  - Use `haveI` to inject completeness of finite-dimensional spaces.

- **Differentiability proofs**:
  - Reduce to `implicitFunction_hasStrictFDerivAt` with specific `g'inv` (e.g., `subtypeL`).
  - Use `ext` to verify `rightDeriv ∘ g'inv = id` and `leftDeriv ∘ g'inv = 0`.

---

#### **5. Imports & Scope**

**Primary imports**:
- `Mathlib.Analysis.Calculus.InverseFunctionTheorem.FDeriv`
- `Mathlib.Analysis.Calculus.FDeriv.Add`
- `Mathlib.Analysis.Calculus.FDeriv.Prod`
- `Mathlib.Analysis.Normed.Module.Complemented`

**Domain**:
- Functional analysis in Banach spaces over a nontrivially normed field `𝕜`.
- Focus on *strict* Fréchet differentiability (`HasStrictFDerivAt`), not just Gâteaux or classical differentiability.
- Uses `PartialHomeomorph`, `ContinuousLinearMap`, `LinearMap.ker/range`, `IsCompl`, `ClosedComplemented`.

**Key assumptions**:
- `CompleteSpace` on all normed spaces (Banach spaces).
- Surjectivity of derivative (`range f' = ⊤`).
- Complemented kernel (automatic in finite codimension).

---

Let me know if you'd like a diagram of the logical dependencies or a summary of the TODO items formalized vs. open.