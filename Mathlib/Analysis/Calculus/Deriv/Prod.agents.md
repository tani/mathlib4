### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `HasDerivAtFilter.prod` | `(HasDerivAtFilter f₁ f₁' x L) → (HasDerivAtFilter f₂ f₂' x L) → HasDerivAtFilter (fun x ↦ (f₁ x, f₂ x)) (f₁', f₂') x L` | Proves that the product of two functions has a derivative at a filter iff the component functions do; derivative is the pair of derivatives. |
| `HasDerivWithinAt.prod` | Analogous to above, for derivatives within a set. | Extends product rule to restricted (within-set) derivatives. |
| `HasDerivAt.prod` | Special case of `HasDerivAtFilter.prod` for the trivial filter (i.e., standard derivative). | Standard derivative of a product function. |
| `HasStrictDerivAt.prod` | Same as above but for strict derivatives. | Ensures strict differentiability lifts to product. |
| `hasStrictDerivAt_pi` | `HasStrictDerivAt φ φ' x ↔ ∀ i, HasStrictDerivAt (fun x ↦ φ x i) (φ' i) x` | Characterizes strict differentiability of a function into a dependent product as pointwise strict differentiability. |
| `hasDerivAtFilter_pi` | `HasDerivAtFilter φ φ' x L ↔ ∀ i, HasDerivAtFilter (fun x ↦ φ x i) (φ' i) x L` | Same as above for filter-based derivatives. |
| `hasDerivAt_pi` | `HasDerivAt φ φ' x ↔ ∀ i, HasDerivAt (fun x ↦ φ x i) (φ' i) x` | Standard derivative version of the above. |
| `hasDerivWithinAt_pi` | `HasDerivWithinAt φ φ' s x ↔ ∀ i, HasDerivWithinAt (fun x ↦ φ x i) (φ' i) s x` | Derivative within a set for product-type-valued functions. |
| `derivWithin_pi` | Under differentiability and unique diffusion assumptions, `derivWithin φ s x = fun i ↦ derivWithin (fun x ↦ φ x i) s x` | Computes derivative within a set for Π-type functions componentwise. |
| `deriv_pi` | Under pointwise differentiability, `deriv φ x = fun i ↦ deriv (fun x ↦ φ x i) x` | Computes derivative for Π-type functions componentwise. |

> **Note**: All theorems are `nonrec`, indicating they are defined via `prod`/`pi`-specific constructions rather than recursion over structure.

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `has*Deriv*`: Indicates a *property* of having a derivative (e.g., `HasDerivAt`, `HasStrictDerivAt`, `HasDerivWithinAt`).
  - `deriv*`: Refers to the *value* of the derivative (e.g., `deriv`, `derivWithin`).
- **Suffixes**:
  - `*At`: Derivative at a point (w.r.t. filter or topology).
  - `*WithinAt`: Derivative within a set at a point.
  - `*Filter`: Explicitly indicates filter-based derivative.
- **Product/Π-specific**:
  - `.prod`: For binary product types (`E × F`).
  - `.pi`: For dependent product types (`Π i, E i`).
- **`[simp]` attribute**: Applied to equivalences (`↔`) used for simplification (e.g., `hasStrictDerivAt_pi`, `hasDerivAtFilter_pi`).

---

#### 3. **Tactic Stack**

- **`simp` / `[simp]`**: Used to mark lemmas for automatic simplification (especially equivalences).
- **`exact` / implicit `assumption`**: Proofs are mostly by direct application of existing lemmas (e.g., `hf₁.prod hf₂`).
- **`rw` / `simp_rw`**: Implicit in rewriting using equivalences like `hasDerivAt_pi`.
- **`aesop` / `norm_num` / `ring`**: Not explicitly used in this file — proofs are mostly *declarative* and rely on library lemmas.
- **`apply` / `exact`**: Used in the `nonrec` definitions (e.g., `hf₁.prod hf₂` is an application of `prod` method on `HasDerivAtFilter`).

---

#### 4. **Proof Logic / Strategy**

- **Componentwise reasoning**: All proofs follow a *componentwise* strategy:
  - For product types: reduce to the two components.
  - For Π-types: reduce to all indices `i : ι`.
- **Equivalence-based characterizations**: Theorems like `hasDerivAt_pi` are stated as `↔`, enabling both directions of reasoning.
- **Leveraging existing infrastructure**:
  - Derivative properties for products are derived from `HasDerivAtFilter.prod` (inherited from `FDeriv` theory).
  - Π-case uses `hasFDerivAtFilter_pi'` (from `FDeriv` theory), specialized to 1D case.
- **No induction or case analysis**: The proofs are mostly *straightforward applications* of existing lemmas, not structural induction.

---

#### 5. **Imports & Scope**

- **Core imports**:
  - `Mathlib.Analysis.Calculus.Deriv.Basic`: Provides foundational derivative notions (`HasDerivAt`, `deriv`, etc.).
  - `Mathlib.Analysis.Calculus.FDeriv.Prod`: Supplies `prod` and `pi` lemmas for Fréchet derivatives, reused here for 1D case.
- **Contextual assumptions**:
  - `𝕜`: Nontrivially normed field (e.g., `ℝ` or `ℂ`).
  - `E`, `F`, `G`: Normed additive commutative groups, normed spaces over `𝕜`.
  - `ι`: Finite index type (`[Fintype ι]`), needed for Π-type analysis.
- **Topological/filter context**:
  - `TopologicalSpace`, `Filter`, `Asymptotics`, `Set` are opened.
  - `UniqueDiffWithinAt` used for chain rule/derivative uniqueness.

---

### Summary

This file formalizes the *componentwise differentiability* of functions into product and dependent product spaces in the 1D setting (i.e., domain is `𝕜`). It leverages the `FDeriv` infrastructure from `Mathlib.Analysis.Calculus.FDeriv.Prod`, specializing it to standard derivatives via equivalences. The style is highly declarative, with proofs as simple applications of existing lemmas, and naming follows Lean’s standard calculus library conventions.