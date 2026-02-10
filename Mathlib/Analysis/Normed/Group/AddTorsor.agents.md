### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `NormedAddTorsor` | Class: Bundles a torsor structure of an additive seminormed group `V` acting on a pseudometric space `P`, with the key axiom `dist x y = ‖x -ᵥ y‖`. Ensures the metric arises from the norm. |
| `dist_eq_norm_vsub` | Theorem: `dist x y = ‖x -ᵥ y‖`. Core identity linking distance in `P` to norm in `V`. Explicit `V` argument for robust rewriting. |
| `nndist_eq_nnnorm_vsub` | Theorem: `nndist x y = ‖x -ᵥ y‖₊`. Nonnegative extended real version of above. |
| `dist_vadd_cancel_left/right` | Theorems: `dist (v +ᵥ x) (v +ᵥ y) = dist x y`, `dist (v₁ +ᵥ x) (v₂ +ᵥ x) = dist v₁ v₂`. Expresses invariance of distance under translation and subtraction of basepoint. |
| `dist_vadd_left/right` | Theorems: `dist (v +ᵥ x) x = ‖v‖`, `dist x (v +ᵥ x) = ‖v‖`. Distance from a point to its translate is the norm of the vector. |
| `IsometryEquiv.vaddConst`, `IsometryEquiv.constVSub` | Isometric equivalences: `V ≃ᵢ P` via `v ↦ v +ᵥ x`, and `P ≃ᵢ V` via `p ↦ x -ᵥ p`. Show local isometry between tangent space and torsor. |
| `dist_vsub_cancel_left/right` | Theorems: `dist (x -ᵥ y) (x -ᵥ z) = dist y z`, `dist (x -ᵥ z) (y -ᵥ z) = dist x y`. Distance is preserved under common subtraction (analogous to translation invariance). |
| `dist_vadd_vadd_le`, `dist_vsub_vsub_le` | Triangle-type inequalities: `dist (v +ᵥ p) (v' +ᵥ p') ≤ dist v v' + dist p p'`, and `dist (p₁ -ᵥ p₂) (p₃ -ᵥ p₄) ≤ dist p₁ p₃ + dist p₂ p₄`. |
| `LipschitzWith.vadd/vsub` | Theorems: If `f`, `g` are Lipschitz, then `v +ᵥ g` and `f -ᵥ g` are Lipschitz with constant sum. |
| `uniformContinuous_vadd/vsub` | Theorems: Vector addition and subtraction are uniformly continuous. |
| `continuous_vadd/continuous_vsub` | Corollaries: Continuity of `vadd` and `vsub`. |
| `Filter.Tendsto.vsub` | Theorem: Pointwise subtraction preserves limits. |
| `Continuous.vsub` / `ContinuousAt.vsub` / etc. | Closure properties: subtraction preserves continuity, continuity at a point, etc. |
| `LineMap`, `midpoint` convergence theorems | Theorems: Affine combinations (e.g., `lineMap`, `midpoint`) preserve limits under convergence of endpoints and coefficients. |
| `AffineSubspace.toNormedAddTorsor` | Instance: Nonempty affine subspaces inherit a `NormedAddTorsor` structure from ambient space. |
| `pseudoMetricSpaceOfNormedAddCommGroupOfAddTorsor`, `metricSpaceOfNormedAddCommGroupOfAddTorsor` | Constructors: Given only an `AddTorsor V P`, define a (pseudo)metric structure via `dist x y := ‖x -ᵥ y‖`. Not instances due to dependency on `V`. |

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `dist_`, `nndist_`, `edist_`: For distance-related lemmas (metric, nonnegative extended, extended real).
  - `vadd_`, `vsub_`: For operations involving vector addition/subtraction (`+ᵥ`, `-ᵥ`).
  - `isometry_`, `isometric_`: For isometric equivalences and actions.
  - ` LipschitzWith_`, `uniformContinuous_`, `continuous_`: For regularity properties.
  - `to_`: For coercion/instance definitions (e.g., `toAddTorsor`, `toIsometricVAdd`).
  - `of_`: For constructing structures from properties (e.g., `Isometry.of_dist_eq`).

- **Suffixes**:
  - `_left`, `_right`: Indicate which argument is fixed (e.g., `vadd_cancel_left` fixes the vector, `vadd_cancel_right` fixes the point).
  - `_le`: For inequality lemmas.
  - `_eq`: For equalities (especially simplifying ones).
  - `_cancel`: For cancellation lemmas (e.g., `dist_vadd_cancel_left`).
  - `_vsub`, `_vadd`: Explicitly denote use of `vsub`/`vadd` operations.

- **Special**:
  - `normed_add_torsor`, `affine_subspace`, `midpoint`, `lineMap`: Domain-specific terms.

---

#### 3. **Tactic Stack**

- **Core simplification & rewriting**:
  - `simp`, `simp only`, `rw`, `simp_rw`
- **Algebraic manipulation**:
  - `ring`, `norm_cast`, `apply_mod_cast` (porting note), `exact`, `convert`
- **Metric/norm reasoning**:
  - `exact norm_add_le`, `apply add_le_add`, `apply le_of_eq`, `NNReal.eq`
- **Isometry/continuity arguments**:
  - `Isometry.of_dist_eq`, `uniformContinuous_of_lipschitz`, `continuous_of_uniformContinuous`, `tendsto.comp`
- **Filter/limit reasoning**:
  - `tendsto`, `hf.vsub hg`, `hf.smul hg`, `hf.prod_mk_nhds hg`
- **Set-theoretic closure**:
  - `IsSeqClosed.isClosed`, `isSeqCompact`, `mem_of_tendsto`, `Eventually.of_forall`
- **General automation**:
  - `aesop` (implied by context, though not explicitly used here), `linarith`, `cases`

---

#### 4. **Proof Logic**

- **Structure**:
  - Proofs are largely *direct* and *computational*, leveraging:
    - The defining axiom `dist_eq_norm'`
    - Algebraic identities for `vadd`, `vsub` (e.g., `vsub_add_vsub_cancel`, `vsub_sub_vsub_cancel_left`)
    - Norm properties (`norm_neg`, `norm_add_le`)
    - Metric space axioms (`dist_comm`, `dist_triangle`)
  - Many proofs follow a pattern:
    1. Rewrite `dist` using `dist_eq_norm_vsub`
    2. Apply algebraic simplifications (`vsub`/`vadd` identities)
    3. Use norm or metric inequalities (`norm_add_le`, `dist_triangle`)
    4. Conclude via ` rfl`, `exact`, or `apply ...; exact ...`

- **Induction**: Not used (no inductive types involved).
- **Case analysis**: Minimal; mostly algebraic case splits (e.g., `vsub_vadd_cancel`).
- **Isometry arguments**: Often use `Isometry.of_dist_eq` + `simp` to reduce to `dist_eq_norm_vsub`.
- **Lipschitz/uniform continuity**: Built via composition of known Lipschitz maps (`prod_fst`, `prod_snd`) and closure under `vadd`/`vsub`.

---

#### 5. **Imports**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.Normed.Group.Basic` | Core theory of normed/seminormed additive groups (`norm`, `dist`, `vadd`, `vsub`, `normed_add_comm_group`, `seminormed_add_comm_group`). |
| `Mathlib.Analysis.Normed.Group.Submodule` | For affine subspaces and their direction modules (used in `AffineSubspace.toNormedAddTorsor`). |
| `Mathlib.LinearAlgebra.AffineSpace.AffineSubspace` | Affine subspaces, direction, and basic operations (`lineMap`, `AffineSubspace`). |
| `Mathlib.LinearAlgebra.AffineSpace.Midpoint` | Midpoint construction and properties (used in `midpoint` convergence). |
| `Mathlib.Topology.MetricSpace.IsometricSMul` | Isometric actions and `IsometricVAdd` (used in `NormedAddTorsor.to_isometricVAdd`). |

**Domain scope**: Affine geometry over (semi)normed additive groups, with metric/topological structure. Central to Euclidean affine spaces and related structures.

--- 

Let me know if you'd like a diagram of the key structures or a summary of how torsors generalize vector spaces in this context.