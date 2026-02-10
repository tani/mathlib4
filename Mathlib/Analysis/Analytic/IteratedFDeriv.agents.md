### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `FormalMultilinearSeries.iteratedFDerivSeries` | A formal multilinear series constructed by iterating `derivSeries` and currying; models the power series of the `k`-th iterated derivative of a function with power series `p`. |
| `HasFPowerSeriesWithinOnBall.iteratedFDerivWithin` | If `f` has power series `p` on a ball within set `s`, then its `k`-th iterated derivative (within `s`) has power series `p.iteratedFDerivSeries k`. |
| `FormalMultilinearSeries.iteratedFDerivSeries_eq_zero` | If `p(n + k) = 0`, then the `n`-th coefficient of `p.iteratedFDerivSeries k` vanishes. |
| `HasFPowerSeriesWithinOnBall.iteratedFDerivWithin_eq_zero` | If `p n = 0`, then the `n`-th iterated derivative (within `s`) of `f` vanishes at `x`. |
| `ContinuousMultilinearMap.iteratedFDeriv_comp_diagonal` | For a continuous multilinear map `f`, the `n`-th iterated derivative of `x ↦ f(x, ..., x)` at `x` applied to `v` equals `∑_{σ ∈ Perm(n)} f(v_{σ(1)}, ..., v_{σ(n)})`. |
| `HasFPowerSeriesWithinOnBall.iteratedFDerivWithin_eq_sum_of_subset` | Under analyticity and uniqueness of diff, the `n`-th iterated derivative of `f` at `x` applied to `v` equals `∑_{σ ∈ Perm(n)} p_n(v_{σ(1)}, ..., v_{σ(n)})`. |
| `HasFPowerSeriesWithinOnBall.iteratedFDerivWithin_eq_sum` | Main theorem: formula for iterated derivative of analytic function in terms of power series coefficients and permutations. |
| `HasFPowerSeriesOnBall.iteratedFDeriv_eq_sum` | Global version of the above (on whole space). |
| `HasFPowerSeriesWithinOnBall.iteratedFDerivWithin_eq_sum_of_completeSpace` | Variant without analyticity assumption, assuming completeness of target space. |
| `HasFPowerSeriesOnBall.iteratedFDeriv_eq_sum_of_completeSpace` | Global version of the above. |
| `AnalyticOn.iteratedFDerivWithin_comp_perm` | Symmetry of iterated derivative: precomposing the input vector function with a permutation does not change the value. |
| `ContDiffWithinAt.iteratedFDerivWithin_comp_perm` | Symmetry for `ContDiffWithinAt`, using local analyticity. |
| `AnalyticOn.iteratedFDeriv_comp_perm` | Symmetry of global iterated derivative. |
| `ContDiffAt.iteratedFDeriv_comp_perm` | Symmetry of global iterated derivative for `ContDiffAt`. |

---

#### 2. **Naming Conventions**

- **Prefixes:**
  - `iteratedFDeriv`: refers to iterated Fréchet derivatives (global or within set).
  - `hasFPowerSeries`: indicates existence of a power series expansion.
  - `continuousMultilinearCurry*`: currying equivalences for multilinear maps.
  - `perm`, `σ`: used for permutations (e.g., `Perm (Fin n)`, `σ : Perm (Fin n)`).
  - `comp_perm`: composition with a permutation.

- **Suffixes:**
  - `_eq_sum`: indicates a formula expressing derivative as sum over permutations.
  - `_eq_zero`: vanishing of derivative under coefficient vanishing.
  - `_within`: indicates “within a set” version (e.g., `iteratedFDerivWithin`).
  - `_of_completeSpace`: variant assuming completeness instead of analyticity.

- **Other patterns:**
  - `toHasFPowerSeriesWithinOnBall`, `of_le`, `mono`, `inter`: standard category-theoretic or set-theoretic lemmas.
  - `congr_zero`, `zero_apply`, `sum_comp`, `comp_diagonal`: used in multilinear/linear map manipulations.

---

#### 3. **Tactic Stack**

- **Core tactics:**
  - `induction`: used heavily for induction on `n` or `k`.
  - `rw`: rewriting using equalities, especially power series and derivative definitions.
  - `simp` / `simp only`: simplification with many lemmas about multilinear maps, permutations, and sums.
  - `congr`: for functional extensionality or equality of sums.
  - `ext`: extensionality for multilinear maps or formal series.
  - `abel`: for abelian group simplifications (e.g., `f = g + (f - g)`).
  - `rcases`: destructing existential quantifiers (e.g., local analyticity).
  - `conv_rhs`: equational reasoning on right-hand side.

- **Domain-specific automation:**
  - `aesop`: likely used implicitly in `simp`-based automation (not explicitly listed, but common in Mathlib).
  - `ring`: for polynomial-like simplifications in multilinear settings.

---

#### 4. **Proof Logic**

- **Inductive structure**:
  - Proofs of derivative formulas proceed by induction on the order `n` of differentiation.
  - Base case (`n = 0`) uses currying equivalences.
  - Inductive step uses `iteratedFDerivWithin_succ_eq_comp_left` and composition with linear equivalences.

- **Decomposition strategy**:
  - Analytic function `f` is decomposed as `g + (f - g)`, where `g(z) = p_n(z - x, ..., z - x)` isolates the `n`-th term.
  - The derivative of `g` is handled via `ContinuousMultilinearMap.iteratedFDeriv_comp_diagonal`.
  - The remainder `(f - g)` has vanishing `n`-th derivative by `iteratedFDerivWithin_eq_zero`.

- **Symmetry proofs**:
  - Use the sum-over-permutations formula and invariance under reordering: `∑_σ f(v_{σ(i)}) = ∑_σ f(v_{σ∘τ(i)})`.
  - Implemented via `Equiv.sum_comp` and properties of permutations (`perm`, `mulLeft`, etc.).

- **Reduction to local settings**:
  - Many global results reduce to local ones via `iteratedFDerivWithin_univ`, `hasFPowerSeriesWithinOnBall_univ`.
  - Intersections with balls (`s ∩ EMetric.ball x r`) used to ensure domain restrictions.

---

#### 5. **Imports**

| Module | Role |
|--------|------|
| `Mathlib.Analysis.Calculus.ContDiff.Basic` | Core theory of `ContDiff`, `iteratedFDeriv`, chain rule, etc. |
| `Mathlib.Analysis.Calculus.ContDiff.CPolynomial` | Smoothness of multilinear maps and polynomial-like constructions. |
| `Mathlib.Data.Fintype.Perm` | Permutation group theory on finite types (`Perm (Fin n)`). |

**Additional context**: The file builds on a rich library of:
- Formal multilinear series (`FormalMultilinearSeries`)
- Power series expansions (`HasFPowerSeriesWithinOnBall`, `HasFPowerSeriesOnBall`)
- Analytic functions (`AnalyticOn`, `ContDiffAt`, `ContDiffWithinAt`)
- Unique differentiability conditions (`UniqueDiffOn`)
- Metric/topological tools (`EMetric.ball`, `isOpen_ball`, etc.)

No external dependencies beyond Mathlib are required.

--- 

Let me know if you'd like a dependency graph or a summary of how this module fits into the broader `Mathlib` analysis hierarchy.