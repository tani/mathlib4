### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `fderivInnerCLM` | `E × E →L[ℝ] 𝕜`: Continuous linear map representing the Fréchet derivative of the inner product at a point `p : E × E`. Defined via `isBoundedBilinearMap_inner.deriv`. |
| `contDiff_inner` | `ContDiff ℝ n (fun p : E × E => ⟪p.1, p.2⟫)`: The inner product on `E × E` is infinitely `ℝ`-smooth. |
| `inner` | `E → E → 𝕜`: Standard inner product; notation `⟪x, y⟫`. |
| `norm_sq` | `fun x => ‖x‖ ^ 2`: Square of the norm; shown to be `ContDiff ℝ n`. |
| `contDiff_norm_sq` | `ContDiff ℝ n (fun x => ‖x‖ ^ 2)`: Square of the norm is smooth. |
| `contDiffAt_norm` | `x ≠ 0 → ContDiffAt ℝ n norm x`: Norm is smooth away from zero. |
| `hasStrictFDerivAt_norm_sq` | `HasStrictFDerivAt (‖·‖²) (2 • innerSL ℝ x) x`: Strict Fréchet derivative of squared norm. |
| `differentiableWithinAt_euclidean`, `contDiff_euclidean`, etc. | Equivalence between differentiability/smoothness of a function into `EuclideanSpace 𝕜 ι` and componentwise differentiability/smoothness. |
| `univUnitBall`, `unitBallBall`, `univBall` | Explicit diffeomorphisms between `E` and open unit ball(s); proven smooth with smooth inverses on appropriate domains. |
| `PartialHomeomorph.contDiff_univUnitBall`, `contDiff_unitBallBall`, etc. | Smoothness of various ball-to-space homeomorphisms and their inverses. |

#### 2. **Naming Conventions**

- **Prefixes:**
  - `fderivInnerCLM`: `fderiv` + `Inner` + `CLM` (Continuous Linear Map)
  - `hasFDeriv`, `hasStrictFDeriv`, `hasDeriv`: Standard derivative existence predicates.
  - `contDiff`, `ContDiff`, `ContDiffAt`, `ContDiffWithinAt`, `ContDiffOn`: Smoothness at various levels (global, local, within set).
  - `differentiable`, `Differentiable`, `DifferentiableAt`, `DifferentiableWithinAt`, `DifferentiableOn`: First-order differentiability variants.
- **Suffixes:**
  - `_inner`, `_norm_sq`, `_norm`, `_dist`: Applied to indicate operation (inner product, squared norm, norm, distance).
  - `_euclidean`, `_piLp`: For lemmas about `EuclideanSpace` or `PiLp`.
  - `_symm`: For inverses of homeomorphisms/diffeomorphisms.
- **Other:**
  - `•` used for scalar multiplication (e.g., `2 • _`).
  - `innerSL`: Symmetric bilinear map version of inner product.

#### 3. **Tactic Stack**

Frequent tactics used in proofs:
- `simp` / `simp only`: Simplification with local lemmas and definitions.
- `exact`, `by exact`: To resolve unification issues (noted in adaptation comments).
- `convert`: To match goals up to definitional equality (e.g., `inner_self_eq_norm_sq`).
- `rw`: Rewriting using equalities (e.g., `inner_self_eq_norm_sq`, `dist_eq_norm`).
- `refine`: To construct proofs with holes filled later.
- ` positivity`: To prove positivity of expressions involving norms and squares.
- `rwa`: Rewrite + assumption.
- `split_ifs`: To handle `if`-expressions in definitions like `univBall`.
- `apply`, `exact`, `simpa`: Common in derivative and smoothness proofs.
- `ext`: Extensionality for functions (used in `hasStrictFDerivAt_norm_sq`).

#### 4. **Proof Logic**

- **Structure:** Most proofs follow a modular pattern:
  1. Reduce to known results about bilinear maps (`isBoundedBilinearMap_inner`).
  2. Use composition rules (`comp_contDiffWithinAt`, `comp_hasFDerivAt`, etc.).
  3. Apply chain rule variants (`inner`, `norm_sq`, `dist` as compositions).
  4. For Euclidean spaces, reduce to product lemmas (`PiLp`-based equivalences).
- **Induction/Recursion:** Not used directly; smoothness results rely on closure properties (e.g., `ContDiff.comp`, `Differentiable.inner`).
- **Case analysis:** Used in `univBall` definitions (via `split_ifs`) and positivity checks (e.g., `h0 : f x ≠ 0`).
- **Local-to-global:** Many theorems are proved pointwise (`ContDiffAt`, `DifferentiableAt`) and then lifted globally via `contDiff_iff_contDiffAt`.

#### 5. **Imports**

Core dependencies defining the module’s scope:
- `Mathlib.Analysis.InnerProductSpace.PiL2`: For `PiL2` and related inner product space constructions.
- `Mathlib.Analysis.SpecialFunctions.Sqrt`: For smoothness of `sqrt` on positive reals.
- `Mathlib.Analysis.NormedSpace.HomeomorphBall`: For ball-to-space homeomorphisms.
- `Mathlib.Analysis.Calculus.ContDiff.WithLp`: For `ContDiff` lemmas in `PiLp` settings.
- `Mathlib.Analysis.Calculus.FDeriv.WithLp`: For Fréchet derivative lemmas in `PiLp`.

These imports indicate the file sits at the intersection of:
- **Inner product space calculus**
- **Smoothness of norm-related functions**
- **Finite-dimensional analysis (via `EuclideanSpace`)**
- **Local diffeomorphisms of balls**

The file is foundational for higher-order calculus in Hilbert/Euclidean spaces, especially for applications requiring smoothness of geometric constructions (e.g., in manifold theory or optimization).