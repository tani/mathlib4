### Technical Metadata Brief: Rayleigh Quotient in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `rayleighQuotient` | `T : E →L[𝕜] E → x : E ↦ T.reApplyInnerSelf x / ‖x‖²` | Defines the Rayleigh quotient for a continuous linear map `T`. |
| `image_rayleigh_eq_image_rayleigh_sphere` | `r > 0 ⇒ rayleighQuotient T '' {0}ᶜ = rayleighQuotient T '' sphere 0 r` | Shows the Rayleigh quotient’s image over nonzero vectors equals its image over any sphere centered at 0. |
| `iSup_rayleigh_eq_iSup_rayleigh_sphere`, `iInf_rayleigh_eq_iInf_rayleigh_sphere` | `r > 0 ⇒ sup/inf over nonzero vectors = sup/inf over sphere of radius r` | Allows reduction of extremal analysis of Rayleigh quotient to compact spheres. |
| `linearly_dependent_of_isLocalExtrOn` | `IsSelfAdjoint T ⇒ local extremum on sphere ⇒ ∃ a b ≠ (0,0), a•x₀ + b•T x₀ = 0` | Key step in Lagrange multipliers argument: extremality implies linear dependence of `x₀` and `T x₀`. |
| `eq_smul_self_of_isLocalExtrOn` | `IsSelfAdjoint T ⇒ local extremum on sphere ⇒ T x₀ = rayleighQuotient T x₀ • x₀` | Shows extremizers are eigenvectors with eigenvalue equal to Rayleigh quotient value. |
| `hasEigenvector_of_isLocalExtrOn` | `x₀ ≠ 0 ∧ local extremum ⇒ HasEigenvector T (rayleighQuotient T x₀) x₀` | Immediate corollary: extremizers are eigenvectors. |
| `hasEigenvector_of_isMaxOn`, `hasEigenvector_of_isMinOn` | `x₀ ≠ 0 ∧ global max/min on sphere ⇒ HasEigenvector T (sup/inf Rayleigh) x₀` | Global extrema on sphere yield eigenvectors with eigenvalue equal to global sup/inf. |
| `hasEigenvalue_iSup_of_finiteDimensional`, `hasEigenvalue_iInf_of_finiteDimensional` | `FiniteDimensional E ∧ Nontrivial E ∧ T symmetric ⇒ sup/inf Rayleigh is eigenvalue` | In finite dimensions, sup/inf of Rayleigh quotient is attained and is an eigenvalue. |
| `subsingleton_of_no_eigenvalue_finiteDimensional` | `T symmetric + no eigenvalues ⇒ E is subsingleton` | Contrapositive: nontrivial finite-dimensional symmetric operators must have eigenvalues. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `rayleigh_`: for Rayleigh quotient–related definitions and lemmas.
  - `isMaxOn`, `isMinOn`, `isLocalExtrOn`: extremum-related predicates.
  - `hasEigenvector`, `hasEigenvalue`: existence of eigenvectors/eigenvalues.
  - `reApplyInnerSelf`: real part of `⟪T x, x⟫`, used for differentiability in real case.

- **Suffixes**:
  - `_of_isMaxOn`, `_of_isMinOn`, `_of_isLocalExtrOn`: indicate dependency on extremum assumptions.
  - `_of_finiteDimensional`: indicates finite-dimensional context.
  - `_real`: for real-specific versions (e.g., `eq_smul_self_of_isLocalExtrOn_real`).

- **Other patterns**:
  - `reApplyInnerSelf_smul`, `reApplyInnerSelf_continuous`: derived properties of `reApplyInnerSelf`.
  - `toSelfAdjoint`, `toSelfAdjoint.prop`: conversion from symmetric linear maps to self-adjoint continuous ones.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `field_simp`, `simp`, `simp only` | Simplify denominators, norms, and scalar multiples. |
| `ring` | Normalize algebraic expressions involving scalars. |
| `convert`, `rw`, `ext` | Structural equality reasoning, especially in derivatives and inner products. |
| `have`, `obtain`, `refine` | Introduce intermediate claims and construct witnesses. |
| `gcongr`, `congr_arg` | Handle inequalities and functional congruences. |
| `aesop` (implicit via `simp` + `ring` + `field_simp`) | Automates routine algebraic reasoning. |
| `apply smul_right_injective` | Cancel nonzero scalars in vector equations. |
| `convert ... using 1` | Control proof state alignment in derivative arguments. |
| `nontriviality`, `exists_ne` | Construct nonzero vectors in nontrivial spaces. |
| `isCompact_sphere`, `isCompact_closedBall` | Use compactness in finite-dimensional spaces. |

---

#### **4. Proof Logic**

- **Core strategy**:
  1. **Reduction to sphere**: Use homogeneity of Rayleigh quotient to restrict analysis to spheres (`image_rayleigh_eq_image_rayleigh_sphere`, `iSup_rayleigh_eq_iSup_rayleigh_sphere`).
  2. **Extremum ⇒ eigenvector**:
     - Use Lagrange multipliers: extremum of `reApplyInnerSelf` on sphere ⇒ linear dependence of `x₀` and `T x₀`.
     - Deduce `T x₀ = λ x₀` via inner product manipulation.
  3. **Global extrema ⇒ eigenvalue**:
     - In complete spaces: extremum on sphere ⇒ eigenvector with eigenvalue = local extremum value.
     - In finite dimensions: compactness ⇒ extremum is attained ⇒ eigenvalue = global sup/inf.
  4. **Finite-dimensional existence**:
     - Use compactness of spheres + continuity ⇒ max/min exist.
     - Apply previous results to conclude eigenvalue exists.

- **Inductive/structural flow**:
  - Real case first (`section Real`), then general `𝕜` via `rclikeToReal` reduction.
  - Local extremum ⇒ eigenvector ⇒ global extremum ⇒ eigenvalue.
  - Contrapositive arguments for subsingleton conclusions.

---

#### **5. Imports & Scope**

**Primary imports**:
- `Mathlib.Analysis.InnerProductSpace.Calculus`: Differentiability, chain rule, inner product calculus.
- `Mathlib.Analysis.InnerProductSpace.Dual`: Riesz representation, dual space.
- `Mathlib.Analysis.InnerProductSpace.Adjoint`: Adjoint operators, self-adjointness.
- `Mathlib.Analysis.Calculus.LagrangeMultipliers`: Lagrange multiplier theorem (key for extremum ⇒ eigenvector).
- `Mathlib.LinearAlgebra.Eigenspace.Basic`: Eigenspaces, eigenvectors, eigenvalues.
- `Mathlib.Algebra.EuclideanDomain.Basic`: Used for field simplifications (e.g., `field_simp`).

**Key locales & scopes**:
- `scoped NNReal`: for normed space arithmetic.
- `scoped InnerProductSpace`: for inner product notation `⟪x, y⟫`.
- `Module.End`, `Metric`, `ContinuousLinearMap`: for operator-theoretic context.

**Assumptions**:
- `𝕜 : RCLike` (i.e., `ℝ` or `ℂ`).
- `E` is a normed additive commutative group and inner product space over `𝕜`.
- `T : E →L[𝕜] E` (continuous linear map).
- `IsSelfAdjoint T` or `T.IsSymmetric` depending on context.

---

Let me know if you'd like a diagram of the logical dependencies or a formalized summary in LaTeX.