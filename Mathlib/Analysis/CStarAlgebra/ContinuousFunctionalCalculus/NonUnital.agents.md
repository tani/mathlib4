Here's a structured technical metadata brief extracted from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `NonUnitalContinuousFunctionalCalculus` | `class` | A class asserting existence of a non-unital star algebra homomorphism from `C(σₙ R a, R)₀` to `A`, sending `id.restrict` to `a`, with spectral mapping and closed embedding properties. |
| `cfcₙHom` | `p a → C(σₙ R a, R)₀ →⋆ₙₐ[R] A` | The bundled non-unital star algebra homomorphism for elements satisfying predicate `p`. |
| `cfcₙ` | `(R → R) → A → A` | Unbundled functional calculus: returns `0` when conditions fail (junk value). Primary API for user use. |
| `UniqueNonUnitalContinuousFunctionalCalculus` | `class` | Ensures uniqueness of `cfcₙHom` under continuity and identity-mapping constraints. |
| `cfcₙHom_id` | `cfcₙHom ha ⟨id.restrict, rfl⟩ = a` | The homomorphism sends the identity function to the element `a`. |
| `cfcₙHom_map_quasispectrum` | `σₙ R (cfcₙHom f) = range f` | **Spectral mapping theorem** for `cfcₙHom`. |
| `cfcₙ_map_quasispectrum` | `σₙ R (cfcₙ f a) = f '' σₙ R a` | **Spectral mapping theorem** for `cfcₙ`. |
| `cfcₙ_comp` | `cfcₙ (g ∘ f) a = cfcₙ g (cfcₙ f a)` | Composition law for `cfcₙ`. |
| `cfcₙ_star` | `cfcₙ (star ∘ f) a = star (cfcₙ f a)` | Compatibility with star operation. |
| `cfcₙ_add`, `cfcₙ_mul`, `cfcₙ_sub`, `cfcₙ_neg` | Linearity & ring homomorphism properties | Algebraic structure preservation. |
| `cfcₙ_zero`, `cfcₙ_const_zero` | `cfcₙ (0) a = 0` | Maps zero function to zero element. |
| `cfcₙ_id`, `cfcₙ_id'` | `cfcₙ id a = a` | Identity function recovers `a`. |
| `cfcₙ_congr` | `EqOn f g ⇒ cfcₙ f a = cfcₙ g a` | Functional calculus depends only on values on quasispectrum. |
| `cfcₙ_nonneg_iff` | `0 ≤ cfcₙ f a ↔ ∀ x ∈ σₙ R a, 0 ≤ f x` | Positivity characterization (requires `NonnegSpectrumClass`). |
| `StarOrderedRing.nonneg_iff_quasispectrum_nonneg` | `0 ≤ a ↔ ∀ x ∈ σₙ R a, 0 ≤ x` | Positivity of `a` iff identity is nonnegative on quasispectrum. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `cfcₙ`: *continuous functional calculus, non-unital* (e.g., `cfcₙHom`, `cfcₙL`, `cfcₙ_comp`).
  - `is_`: for predicate classes (e.g., `IsStarNormal`, `IsSelfAdjoint`).
  - `NonUnital`: for class names and core properties.
- **Suffixes**:
  - `_Hom`: bundled homomorphism version.
  - `_L`: bundled as continuous linear map.
  - `_zero`: for zero-related lemmas (`cfcₙ_zero`, `cfcₙ_const_zero`).
  - `_id`, `_id'`: identity function lemmas.
  - `_mono`, `_nonneg`, `_nonpos`: order-theoretic properties.
- **Special**:
  - `σₙ`: notation for `quasispectrum`.
  - `cfc_cont_tac`, `cfc_zero_tac`, `cfc_tac`: custom tactics for discharging continuity/zero/predicate goals.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw`, `congr`, `simp`, `ext`, `exact`, `by_cases`, `obtain`, `swap`, `convert`, `nth_rw`.
- Custom tactics:
  - `cfc_cont_tac`: proves continuity on quasispectrum.
  - `cfc_zero_tac`: proves `f 0 = 0`.
  - `cfc_tac`: proves predicate `p a`.
- `aesop`, `ring`, `linarith` likely used implicitly (not explicit here).
- `simp_rw` used in `cfcₙ_add`.
- `fun_prop` used in typeclass inference for continuity.

---

### **4. Proof Logic**

- **Structure**:
  - Most proofs follow a *case split* on whether `a` satisfies `p` and whether `f` is continuous on `σₙ R a` with `f 0 = 0`.
  - If yes: reduce to `cfcₙHom` and use its algebraic/spectral properties.
  - If no: apply `cfcₙ_apply_of_not_*` lemmas to reduce to `0`.
- **Key reasoning patterns**:
  - **Uniqueness**: via `UniqueNonUnitalContinuousFunctionalCalculus.eq_of_continuous_of_map_id`.
  - **Spectral mapping**: via `cfcₙHom_map_quasispectrum` or `cfcₙ_map_quasispectrum`.
  - **Composition**: via `cfcₙHom_comp`, using `ContinuousMapZero.comp` and uniqueness.
  - **Order properties**: via monotonicity of `cfcₙHom` and positivity characterizations.
- **Induction**: not used (algebraic/analytic, not inductive structure).

---

### **5. Imports**

| Module | Role |
|--------|------|
| `Mathlib.Algebra.Algebra.Quasispectrum` | Defines `quasispectrum`, basic spectral theory. |
| `Mathlib.Topology.ContinuousMap.Compact` | Compactness of domain for functional calculus. |
| `Mathlib.Topology.ContinuousMap.ContinuousMapZero` | `C(X, R)₀`: continuous functions vanishing at 0. |
| `Mathlib.Analysis.CStarAlgebra.ContinuousFunctionalCalculus.Unital` | Reference design for unital case (mirrored here). |
| `Mathlib.Topology.UniformSpace.CompactConvergence` | Topology on function spaces (for continuity of homs). |

---

### **Domain-Specific AI Agent Notes**

- **Primary domain**: Non-unital C*-algebras / *-algebras, functional calculus, spectral theory.
- **Key abstractions**: `quasispectrum`, `C(X, R)₀`, `NonUnitalStarAlgHom`, `NonnegSpectrumClass`.
- **Critical assumptions**:
  - `R ∈ {ℝ≥0, ℝ, ℂ}` (via `OrderedCommSemiring`, `OrderedCommRing`, `StarOrderedRing`).
  - `p ∈ {IsStarNormal, IsSelfAdjoint, (0 ≤ ·)}` depending on `R`.
  - `UniqueNonUnitalContinuousFunctionalCalculus` for composition/uniqueness.
- **Tactics to prioritize**: `cfc_cont_tac`, `cfc_zero_tac`, `cfc_tac`, `simp`, `rw`, `by_cases`.

--- 

Let me know if you'd like this exported as JSON or YAML for ingestion.