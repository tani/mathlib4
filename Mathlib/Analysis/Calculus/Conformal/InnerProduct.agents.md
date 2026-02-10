### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `conformalAt_iff'` | `ConformalAt f x ↔ ∃ c : ℝ, 0 < c ∧ ∀ u v, ⟪fderiv ℝ f x u, fderiv ℝ f x v⟫ = c * ⟪u, v⟫` | Characterizes conformality at a point via the differential scaling inner products by a positive scalar. |
| `conformalAt_iff` | Same as above, but for a given `f'` with `HasFDerivAt f f' x` | Refines `conformalAt_iff'` to use an explicit derivative `f'` instead of `fderiv`. |
| `conformalFactorAt` | `ConformalAt f x → ℝ` | Extracts the positive scalar `c` (the *conformal factor*) guaranteed by the equivalence. |
| `conformalFactorAt_pos` | `0 < conformalFactorAt h` | Proves positivity of the conformal factor. |
| `conformalFactorAt_inner_eq_mul_inner'` | `⟪fderiv u, fderiv v⟫ = conformalFactorAt h * ⟪u, v⟫` | States the defining property of the conformal factor with respect to the differential. |
| `conformalFactorAt_inner_eq_mul_inner` | Same as above, but for an arbitrary derivative `f'` (via uniqueness) | Extends the inner product scaling identity to any representative derivative. |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `conformalAt_`: Relates to conformality at a point.
  - `conformalFactorAt_`: Relates to the conformal factor (scalar multiplier).
- **Suffixes**:
  - `_iff` / `_iff'`: Biconditional characterizations (with `'` often used for more abstract or foundational versions).
  - `_pos`: Positivity of a derived quantity.
  - `_inner_eq_mul_inner`: Identity expressing inner product scaling.
- **Notable pattern**: Use of `'` suffix for the more general version involving `fderiv`, and the non-primed version for a specific derivative `f'`.

#### 3. **Tactic Stack**

- `rw`: Rewriting using equivalences (`conformalAt_iff'`, `h.fderiv`).
- `simp only [conformalAt_iff', h.fderiv]`: Simplification using a specific equivalence and a hypothesis.
- `Classical.choose` / `Classical.choose_spec`: Extracting and using the witness and property from existential quantifiers (via classical choice).
- `hasFDerivAt.unique`: Uniqueness of the Fréchet derivative (used in `conformalFactorAt_inner_eq_mul_inner`).
- `▸` (substitution via equality): Used to transport equalities along derivative uniqueness.

#### 4. **Proof Logic**

- **Core strategy**: Reduce conformality to a linear algebraic condition on the derivative.
- **Structure**:
  1. Use `conformalAt_iff_isConformalMap_fderiv` and `isConformalMap_iff` to translate `ConformalAt` into existence of a positive scalar `c` satisfying the inner product scaling condition.
  2. For `conformalAt_iff`, apply `h.fderiv` to replace `fderiv` with the given `f'`.
  3. Define `conformalFactorAt` using `Classical.choose`, and prove its properties via `Classical.choose_spec`.
  4. Use derivative uniqueness (`hasFDerivAt.unique`) to lift results from `fderiv` to arbitrary `f'`.

#### 5. **Imports**

- `Mathlib.Analysis.Calculus.Conformal.NormedSpace`: General theory of conformal maps in normed spaces.
- `Mathlib.Analysis.InnerProductSpace.ConformalLinearMap`: Linear conformal maps between inner product spaces.

These imports indicate the module sits at the intersection of differential calculus and inner product geometry, focusing on *nonlinear* conformal maps via their linearization (differentials).