### Technical Brief: Lagrange Multipliers in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsLocalExtrOn` | `φ : E → ℝ → Set E → E → Prop` | Formalizes that `φ` has a local extremum on a set at a point. |
| `HasStrictFDerivAt` | `f : E → F → (E →L[ℝ] F) → E → Prop` | States that `f` has a strict Fréchet derivative at a point. |
| `range_ne_top_of_hasStrictFDerivAt` | `IsLocalExtrOn φ {x | f x = f x₀} x₀ → HasStrictFDerivAt f f' x₀ → HasStrictFDerivAt φ φ' x₀ → LinearMap.range (f'.prod φ') ≠ ⊤` | Geometric form: the combined differential map is not surjective. |
| `exists_linear_map_of_hasStrictFDerivAt` | `∃ Λ : Dual ℝ F, Λ₀ : ℝ, (Λ, Λ₀) ≠ 0 ∧ ∀ x, Λ (f' x) + Λ₀ • φ' x = 0` | Abstract algebraic form: existence of nontrivial linear relation between differentials. |
| `exists_multipliers_of_hasStrictFDerivAt_1d` | `∃ a b : ℝ, (a, b) ≠ 0 ∧ a • f' + b • φ' = 0` | 1D constraint version: linear dependence of `f'` and `φ'`. |
| `exists_multipliers_of_hasStrictFDerivAt` | `∃ Λ : ι → ℝ, Λ₀ : ℝ, (Λ, Λ₀) ≠ 0 ∧ ∑ i, Λ i • f' i + Λ₀ • φ' = 0` | Finite-family version: existence of Lagrange multipliers for multiple constraints. |
| `linear_dependent_of_hasStrictFDerivAt` | `¬LinearIndependent ℝ (Option.elim' φ' f')` | Reformulation: derivatives of constraints and objective are linearly dependent. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`: e.g., `IsLocalExtrOn`, `IsLocalExtr` — properties of functions at points.
  - `has_`: e.g., `HasStrictFDerivAt` — existence of a derivative.
  - `range_`, `linear_`, `multipliers_`: indicates structural or algebraic content.

- **Suffixes**:
  - `_of_hasStrictFDerivAt`: indicates assumptions of strict differentiability.
  - `_1d`: special case for 1-dimensional codomain (`F = ℝ`).
  - `_ne_top`, `_lt_top`: used in proofs involving submodules and surjectivity.

- **Module/Linear Algebra**:
  - `Dual`, `Module.Dual`, `LinearMap`, `LinearEquiv`, `Submodule`, `range`, `ker`, `coprod`, `prod`.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `intro`, `rcases`, `obtain`, `refine`, `convert`, `ext`, `simp`, `simpa`
- **Algebraic simplification**:
  - `simp only [...] using ...` — heavily used for rewriting with lemmas about `LinearMap`, `prod`, `coprod`, `smul`, etc.
  - `mul_comm`, `mul_left_comm`, `add_comm`, `add_left_comm`
- **Category/Filter reasoning**:
  - `map_map`, `nhdsWithin`, `map_inf_principal_preimage`, `map_snd_nhdsWithin`
- **Linear algebra**:
  - `LinearMap.ext`, `LinearMap.congr_fun`, `LinearMap.range_le_ker_iff`, `Submodule.exists_le_ker_of_lt_top`
- **Proof automation**:
  - `aesop` not used here — proofs are highly structured and rely on explicit manipulation of linear maps and filters.

---

#### **4. Proof Logic**

- **High-level strategy**:
  1. **Geometric → Algebraic**: Use surjectivity assumption to derive a contradiction via filter/nhds reasoning (`range_ne_top_of_hasStrictFDerivAt`).
  2. **Algebraic extraction**: From non-surjectivity, deduce existence of a nonzero linear functional annihilating the range (`Submodule.exists_le_ker_of_lt_top`).
  3. **Coordinate representation**: Use linear equivalences (`LinearEquiv.piRing`, `coprodEquiv`, etc.) to translate abstract linear maps into tuples of reals (Lagrange multipliers).
  4. **Finite families**: Lift to product spaces via `hasStrictFDerivAt_pi`, then project back using `LinearEquiv.piRing`.
  5. **Linear dependence**: Reformulate existence of multipliers as failure of linear independence (`linear_dependent_of_hasStrictFDerivAt`).

- **Induction/Recursion**: Not used — finite-dimensional setting and finite type assumptions avoid recursion.

- **Case analysis**: Used in `exists_multipliers_of_hasStrictFDerivAt_1d` to extract scalars from linear functionals on `ℝ`.

---

#### **5. Imports & Scope**

- **Core analysis**:
  - `Mathlib.Analysis.Calculus.FDeriv.Prod` — product rule, differentiability on products.
  - `Mathlib.Analysis.Calculus.InverseFunctionTheorem.FDeriv` — strict differentiability and chain rule tools.
  - `Mathlib.LinearAlgebra.Dual` — dual space, linear functionals, module theory.

- **Mathlib infrastructure used**:
  - Filter theory (`Filter`, `nhds`, `map`, `inf`, `principal`)
  - Normed spaces over `ℝ`, completeness, continuity
  - Linear maps (`→L[ℝ]`), module theory (`Module.Dual`, `Submodule`)
  - Finite types (`Fintype`, `Finite`), product types (`Π`, `Pi`, `prod`)

- **Domain**: Optimization under equality constraints in infinite-dimensional normed spaces (Banach spaces), with finite or abstract constraint families.

---

#### **Summary**

This formalization provides a rigorous, general, and flexible version of the Lagrange multipliers method in Lean 4, covering:
- Abstract geometric formulation (non-surjectivity of combined differential),
- Algebraic existence of multipliers,
- Explicit scalar multipliers for finite constraint families,
- Linear dependence of derivatives.

It avoids coordinate-specific assumptions, works in Banach spaces, and leverages advanced linear algebra and filter-theoretic tools for clean, modular proofs.