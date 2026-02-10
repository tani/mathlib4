Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Linear Isometries in Lean 4 (Mathlib)**

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `LinearIsometry σ₁₂ E E₂` | A bundled `σ₁₂`-semilinear isometric embedding `E → E₂`. Extends `E →ₛₗ[σ₁₂] E₂` with `norm_map' : ∀ x, ‖f x‖ = ‖x‖`. |
| `LinearIsometryEquiv σ₁₂ E E₂` | A bundled `σ₁₂`-semilinear isometric equivalence `E ≃ E₂`. Extends `E ≃ₛₗ[σ₁₂] E₂` with `norm_map'`. |
| `SemilinearIsometryClass 𝓕 σ₁₂ E E₂` | A class asserting that a type `𝓕` of bundled maps `E → E₂` are `σ₁₂`-semilinear and norm-preserving (`∀ f x, ‖f x‖ = ‖x‖`). |
| `LinearIsometryClass 𝓕 R E E₂` | Abbreviation for `SemilinearIsometryClass 𝓕 (RingHom.id R) E E₂`. |
| `SemilinearIsometryEquivClass 𝓕 σ₁₂ E E₂` | Class for bundled `σ₁₂`-semilinear *equivalences* that are norm-preserving. |
| `LinearMap.toLinearIsometry` | Constructor: lifts a linear map `f : E →ₛₗ[σ₁₂] E₂` to `LinearIsometry` if `f` is an `Isometry`. |
| `LinearIsometry.toContinuousLinearMap` | Forgets the isometry to a continuous semilinear map. |
| `LinearIsometryEquiv.toIsometryEquiv` | Forgets the semilinearity to an isometry equivalence. |
| `LinearIsometryEquiv.toHomeomorph` | Forgets algebraic structure to a homeomorphism. |
| `LinearIsometryEquiv.toContinuousLinearEquiv` | Forgets to a continuous linear equivalence. |
| `Submodule.subtypeₗᵢ` | The inclusion of a submodule as a `LinearIsometry`. |
| `LinearIsometry.comp` | Composition of linear isometries (respects semilinearity via ring hom composition). |
| `LinearIsometryEquiv.trans` | Transitivity of isometric equivalences. |
| `LinearIsometryEquiv.symm` | Inverse of a linear isometric equivalence. |
| `LinearIsometry.isometry`, `LinearIsometryEquiv.isometry` | Prove that bundled maps are isometries (hence continuous, Lipschitz, etc.). |
| `LinearIsometry.injective`, `LinearIsometryEquiv.range_eq_univ` | Injectivity and surjectivity (for equivalences). |
| `LinearIsometry.dist_map`, `edist_map`, `norm_map` | Simplification lemmas: distances, edist, and norms are preserved. |
| `LinearIsometry.preimage_ball/sphere/closedBall` | Preimages of metric balls under isometries are balls. |
| `LinearIsometry.isComplete_image_iff` | Completeness is preserved under isometric embeddings. |
| `LinearIsometry.completeSpace_map` | If a submodule is complete, its image under a surjective isometry is complete. |

#### **2. Naming Conventions**

- **Prefixes & Suffixes**:
  - `isometry` → `LinearIsometry`, `LinearIsometryEquiv`, `SemilinearIsometryClass`, etc.
  - `σ₁₂` → indicates semilinearity w.r.t. ring hom `σ₁₂ : R →+* R₂`.
  - `→ₛₗᵢ[σ]` / `≃ₛₗᵢ[σ]` → notation for semilinear isometric embeddings / equivalences.
  - `→ₗᵢ[R]` / `≃ₗᵢ[R]` → linear (i.e., identity-semilinear) isometries.
  - `→ₗᵢ⋆[R]` / `≃ₗᵢ⋆[R]` → *antilinear* isometries (via `starRingEnd R`).
  - `toLinearMap`, `toLinearEquiv`, `toContinuousLinearMap`, `toIsometryEquiv`, `toHomeomorph`, `toContinuousLinearEquiv` → projection functions.
  - `coe_`, `mk`, `ext`, `comp`, `trans`, `symm`, `refl`, `id`, `subtypeₗᵢ`, `ofBounds`, `ulift`, `induced`, `restr`, etc. → standard bundled map operations.

#### **3. Tactic Stack**

- **Core tactics**:
  - `simp`, `simp_rw`, `congr`, `ext`, `funext`, `rfl`, `congr_arg`
  - `cases'`, `cases`, `intro`, `intro h`, `rintro ⟨_, _⟩`, `rcases`
  - `apply`, `exact`, `assumption`, `exact?`
  - `ring`, `linarith`, `nlinarith`, `norm_num`
  - `aesop`, `tauto`, `first | ...`
- **Specialized**:
  - `simpa using`, `simpa only [...] using`, `convert`, `rw [← dist_zero_right]`
  - `have h := ...; simpa using h`
  - `by { ... }`, `by simp`, `by aesop`, `by linarith`
- **Proof automation**:
  - `simp only [coe_toLinearMap, coe_comp, coe_id, coe_symm] at *`
  - `ext x; simp`
  - `congr; funext x; simp`

#### **4. Proof Logic**

- **Structure**:
  - Most proofs are *definitional* or *by simplification* using bundled structure.
  - Lemmas about `LinearIsometry`/`LinearIsometryEquiv` typically reduce to properties of underlying maps (`toLinearMap`, `toLinearEquiv`) plus `norm_map`.
  - `ext` lemmas use `coe_injective` + `funext`.
  - `isometry` proofs often use `AddMonoidHomClass.isometry_of_norm`.
  - `norm_map` lemmas use `norm_map'` or `norm_map` from class instances.
- **Common patterns**:
  - **Induction**: Not common (mostly algebraic structures).
  - **Cases**: On bundled structure (e.g., `cases f with f hf`).
  - **Rewriting**: Heavy use of `simp` with `coe_` lemmas.
  - **Equational reasoning**: `trans` + `norm_map` + `dist_eq`/`edist_eq`.
  - **Class instance inference**: `SemilinearIsometryClass`, `ContinuousSemilinearMapClass`, etc.

#### **5. Imports & Scope**

- **Core dependencies**:
  - `Mathlib.Algebra.Star.Basic` — for `starRingEnd`, star structures.
  - `Mathlib.Analysis.Normed.Group.*` — seminormed/normed additive commutative groups, uniform structures, submodules, constructions.
  - `Mathlib.LinearAlgebra.Basis.Defs`, `DFinsupp` — for module theory.
  - `Mathlib.Topology.Algebra.Module.Equiv` — for topological module equivalences.

- **Scope**:
  - Generalizes to *seminormed* modules (does not assume `‖x‖ = 0 → x = 0` unless needed).
  - Works over arbitrary semirings with ring homomorphisms for semilinearity.
  - Supports both linear and antilinear (star-linear) cases.
  - Provides both embeddings (`→ₛₗᵢ`) and equivalences (`≃ₛₗᵢ`), with class-based abstraction (`SemilinearIsometryClass`, etc.).

---

Let me know if you'd like a diagram of the hierarchy or a summary of the `simp`-friendly lemmas.