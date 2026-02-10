Here's a structured technical metadata summary extracted from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `IsometricContinuousFunctionalCalculus` | Class extending `ContinuousFunctionalCalculus` requiring `cfcHom` to be an isometry. Used for unital algebras over metric scalar rings (`ℝ`, `ℝ≥0`, `ℂ`). |
| `NonUnitalIsometricContinuousFunctionalCalculus` | Non-unital analog of the above; extends `NonUnitalContinuousFunctionalCalculus` with isometry of `cfcₙHom`. |
| `isometry_cfcHom` | Lemma: `cfcHom` is an isometry under `IsometricContinuousFunctionalCalculus`. |
| `isometry_cfcₙHom` | Lemma: `cfcₙHom` is an isometry under `NonUnitalIsometricContinuousFunctionalCalculus`. |
| `norm_cfcHom`, `nnnorm_cfcHom` | Lemmas: norm preservation of `cfcHom` (and nonnegative norm version). |
| `norm_cfcₙHom`, `nnnorm_cfcₙHom` | Norm preservation for non-unital case. |
| `IsGreatest.norm_cfc`, `IsGreatest.nnnorm_cfc` | Lemmas: the norm of `cfc f a` equals the supremum of `‖f‖` over the spectrum (resp. quasispectrum). |
| `IsGreatest.norm_cfcₙ`, `IsGreatest.nnnorm_cfcₙ` | Non-unital analogs. |
| `norm_apply_le_norm_cfc`, `nnnorm_apply_le_nnnorm_cfc` | Pointwise bound: `‖f x‖ ≤ ‖cfc f a‖` for `x ∈ spectrum`. |
| `norm_cfc_le`, `norm_cfc_lt`, `norm_cfc_le_iff`, `norm_cfc_lt_iff` | Characterizations of norm bounds via pointwise bounds on spectrum. |
| `nnnorm_cfc_nnreal_*` family | Specialized lemmas for `ℝ≥0`-valued functions and nonnegative elements (`0 ≤ a`). |
| `SpectrumRestricts.isometric_cfc` | Construction of `IsometricContinuousFunctionalCalculus` via restriction of scalars along an isometric algebra map. |
| `QuasispectrumRestricts.isometric_cfc` | Non-unital analog of the above. |
| `IsStarNormal.instIsometricContinuousFunctionalCalculus` | Instance: `IsStarNormal` elements in a `CStarAlgebra` admit an isometric functional calculus over `ℂ`. |
| `IsSelfAdjoint.instIsometricContinuousFunctionalCalculus` | Instance: self-adjoint elements in a `CStarAlgebra` admit an isometric functional calculus over `ℝ`. |
| `Nonneg.instIsometricContinuousFunctionalCalculus` | Instance: nonnegative elements (i.e., `0 ≤ a`) admit an isometric functional calculus over `ℝ≥0`, assuming extra structure. |
| `IsStarNormal.instNonUnitalIsometricContinuousFunctionalCalculus`, `IsSelfAdjoint.instNonUnitalIsometricContinuousFunctionalCalculus`, `Nonneg.instNonUnitalIsometricContinuousFunctionalCalculus` | Non-unital analogs of the above instances. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `isometric_`: properties of isometric maps (`isometric_cfcHom`, `isometry_cfcₙHom`).
  - `norm_`, `nnnorm_`: norm and nonnegative norm versions (`norm_cfcHom`, `nnnorm_cfcₙHom`).
  - `apply_le_`, `apply_lt_`: pointwise bounds (`norm_apply_le_norm_cfc`, `nnnorm_apply_le_nnnorm_cfc`).
  - `cfc_*`, `cfcₙ_*`: functional calculus operations (`cfcHom`, `cfcₙHom`, `cfc_apply`, `cfcₙ_apply`).
  - `isLUB_le_iff`, `lt_iff`: equivalence lemmas for suprema/infima characterizations.

- **Suffixes**:
  - `_le`, `_lt`, `_le_iff`, `_lt_iff`: inequality and equivalence variants.
  - `_nnreal`: specialized for `ℝ≥0`-valued functions and spectra (`nnnorm_cfc_nnreal_*`, `nnnorm_cfcₙ_nnreal_*`).
  - `inst*`: instance names for typeclass resolution (`IsStarNormal.instIsometricContinuousFunctionalCalculus`).

---

### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `cfc_tac` | Auto-generates hypotheses like `p a` for functional calculus. |
| `cfc_cont_tac`, `cfc_zero_tac` | Proves continuity and basepoint conditions (e.g., `f 0 = 0`). |
| `simp`, `simp only`, `simp_rw` | Simplification with definitional equalities and lemmas. |
| `rw` / `congr!` | Rewriting and congruence closure for equality proofs. |
| `exact`, `refine`, `convert` | Proof construction, especially with dependent types. |
| `apply`, `apply le_antisymm` | Standard inequality proofs via double inequality. |
| `nontriviality`, `subsingleton_or_nontrivial` | Case analysis on algebra size. |
| `isometry_*` lemmas | Often used via `isometry_cfcHom a |>.norm_map_of_map_zero`. |
| `ext`, `funext` | Extensionality for functions and subtype equality. |

---

### **4. Proof Logic**

- **General proof pattern**:
  1. **Case split** on `subsingleton_or_nontrivial A` to handle trivial vs nontrivial algebras.
  2. Use `IsGreatest` lemmas to reduce norm bounds to pointwise bounds over spectrum/quasispectrum.
  3. Apply `isometry_cfcHom` or `isometry_cfcₙHom` to reduce to norm preservation in function space.
  4. Use `ContinuousMap` lemmas (e.g., `norm_le`, `dist_eq`, `norm_coe_le_norm`) to relate function and algebra norms.
  5. For `ℝ≥0`-valued cases, lift to `ℝ`-valued functions via `realToNNReal`, then descend.

- **Key logical structure**:
  - **Induction-free**: mostly case analysis and direct norm estimates.
  - **Equational reasoning**: heavy use of `le_antisymm`, `ext`, and `congr!`.
  - **Spectral theory**: reliance on compactness of spectrum/quasispectrum and continuity of functions.

---

### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.CStarAlgebra.ContinuousFunctionalCalculus.Instances` | Base definitions and instances for continuous functional calculus. |
| *(Implicit)* `Mathlib.Analysis.Normed.Group.Basic`, `Mathlib.Analysis.Normed.Space.Basic` | For normed spaces, modules, and algebras. |
| *(Implicit)* `Mathlib.Topology.MetricSpace.Basic`, `Mathlib.Topology.Compactness.Basic` | For metric and compactness arguments (e.g., `isCompact_spectrum`). |
| *(Implicit)* `Mathlib.Algebra.Star.Basic`, `Mathlib.Algebra.Module.Star` | For star rings, star modules, and star algebras. |
| *(Implicit)* `Mathlib.Data.NNReal.Basic`, `Mathlib.Data.Real.Basic` | For `ℝ≥0`, `NNReal`, and related order/norm structure. |

---

Let me know if you'd like a dependency graph or a classification of lemmas by use-case (e.g., "norm estimates", "scalar restriction", "instances").