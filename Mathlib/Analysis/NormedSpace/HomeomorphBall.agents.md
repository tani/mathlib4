### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `PartialHomeomorph.univUnitBall` | `PartialHomeomorph E E` | Constructs a local homeomorphism from the whole space `E` to the open unit ball `ball 0 1`, via radial contraction: `x ↦ x / √(1 + ‖x‖²)`. Its inverse expands back: `y ↦ y / √(1 - ‖y‖²)`. |
| `Homeomorph.unitBall` | `E ≃ₜ ball (0 : E) 1` | A global homeomorphism (as a `Homeomorph`) between `E` and the unit ball, derived from `univUnitBall`. |
| `PartialHomeomorph.unitBallBall` | `PartialHomeomorph E P` | For `r > 0`, a local homeomorphism between the unit ball in `E` and the ball `ball c r` in an affine space `P` over `E`, via scaling + translation. |
| `PartialHomeomorph.univBall` | `PartialHomeomorph E P` | A unified construction: if `r > 0`, composes `univUnitBall` with `unitBallBall c r`; otherwise, just translation by `c`. |
| `univBall_source` | `∀ c r, (univBall c r).source = univ` | Source of `univBall` is always the entire space. |
| `univBall_target` | `∀ c r, 0 < r → (univBall c r).target = ball c r` | Target is exactly `ball c r` when `r > 0`. |
| `ball_subset_univBall_target` | `∀ c r, ball c r ⊆ (univBall c r).target` | Even when `r ≤ 0`, the ball `ball c r` is contained in the target (trivially, since target = `univ`). |
| `univBall_apply_zero` | `∀ c r, univBall c r 0 = c` | The map sends `0` to `c`, regardless of `r`. |
| `univBall_symm_apply_center` | `∀ c r, (univBall c r).symm c = 0` | The inverse sends `c` back to `0`. |
| `continuous_univBall` | `∀ c r, Continuous (univBall c r)` | Continuity of the `univBall` map. |
| `continuousOn_univBall_symm` | `∀ c r, ContinuousOn (univBall c r).symm (ball c r)` | Continuity of the inverse on the ball `ball c r`. |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `univ_`: Indicates source = `univ` (entire space).
  - `unitBall_`: Pertains to homeomorphisms involving the unit ball.
  - `smulOfNeZero`, `vaddConst`: Standard Lean/Mathlib naming for scalar multiplication and vector addition.
- **Suffixes**:
  - `_apply`: Refers to the forward function.
  - `_symm_apply`: Refers to the inverse function.
  - `_source`, `_target`: Refer to domain/codomain sets of a `PartialHomeomorph`.
- **Structure**:
  - `X_trans_Y`: Often used for compositions (e.g., `univUnitBall.trans'`).
  - `toPartialHomeomorphOfImageEq`: Converts an equivalence into a `PartialHomeomorph` using image equality.

#### 3. **Tactic Stack**

Frequent tactics used in proofs:
- `field_simp`: Simplifies inverses and divisions (e.g., in `left_inv'`, `right_inv'`).
- `simp` / `simp only`: For basic simplifications, especially with `@[simp]` lemmas.
- `rw`: Rewriting using equalities (e.g., `mem_ball_zero_iff`, `norm_smul`).
- ` positivity`: To prove positivity of expressions like `1 + ‖x‖²`.
- `nlinarith`: For nonlinear arithmetic in normed spaces (e.g., verifying positivity of `1 - ‖y‖²`).
- ` continuity`: To prove continuity of composite functions.
- `exact`, `refine`, `apply`: For direct proof steps.
- `split_ifs`: Handles `if ... then ... else ...` cases in definitions like `univBall`.

#### 4. **Proof Logic**

- **Radial contraction/expansion**: Proofs rely on algebraic manipulation of norms and square roots, especially verifying:
  - That the map sends `E` into `ball 0 1` (`map_source'`).
  - That the inverse maps `ball 0 1` into `E` (`map_target'`).
  - That the two functions are mutual inverses (`left_inv'`, `right_inv'`).
- **Continuity arguments**:
  - Use continuity of basic operations (`norm`, `smul`, `sqrt`, `inv₀`) and closure properties (`continuousOn.smul`, `continuousOn.comp`).
  - For `univBall`, continuity follows from composition of continuous maps or trivial translation.
- **Case analysis**:
  - `univBall` splits on `0 < r`, handling positive and non-positive radii separately.
  - Proofs about `univBall` often follow the same pattern: split on `0 < r`, then apply lemmas for each case.

#### 5. **Imports**

- `Mathlib.Topology.PartialHomeomorph`: Core definitions and properties of `PartialHomeomorph`.
- `Mathlib.Analysis.Normed.Group.AddTorsor`: Torsor structure over normed additive groups (needed for affine space `P`).
- `Mathlib.Analysis.NormedSpace.Pointwise`: Scalar multiplication and unit ball properties.
- `Mathlib.Data.Real.Sqrt`: Real square root properties (e.g., `Real.sqrt_div`, `Real.sq_sqrt`).

---

This module formalizes a foundational result in analysis and topology: that any real (semi)normed vector space is homeomorphic to its unit ball — a key step toward diffeomorphism results (e.g., in infinite-dimensional manifolds). The use of `PartialHomeomorph` instead of `Homeomorph` ensures the inverse is globally defined, facilitating smoothness extensions.