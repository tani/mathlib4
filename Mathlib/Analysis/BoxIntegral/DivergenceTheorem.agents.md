Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Divergence Theorem for Henstock–Kurzweil Integral (BoxIntegral Module)**

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `BoxIntegral.IntegrationParams.GP` | A parameter for generalized Henstock–Kurzweil integration over boxes; `GP = ⊥` corresponds to the “no long/thin boxes” condition. |
| `BoxIntegral.HasIntegral` | Generalized integral notion for functions on boxes in `ℝⁿ`, parameterized by `IntegrationParams`. |
| `norm_volume_sub_integral_face_upper_sub_lower_smul_le` | **Auxiliary estimate**: bounds the difference between `vol(I) • f'(eᵢ)` and the face integrals of `f`, up to `2·ε·c·vol(I)`. Crucial for local error control. |
| `hasIntegral_GP_pderiv` | **Main local result**: If `f` is differentiable a.e. on `I` (except countable `s`), then the partial derivative `x ↦ f' x (Pi.single i 1)` is integrable, and its integral equals the difference of face integrals of `f`. |
| `hasIntegral_GP_divergence_of_forall_hasDerivWithinAt` | **Divergence Theorem**: Under same differentiability assumptions, the divergence `x ↦ ∑ᵢ f' x (eᵢ) i` is integrable, and its integral equals the alternating sum of integrals over all faces of `I`. |

#### **2. Naming Conventions**

- **Prefixes**:
  - `hasIntegral_`: asserts existence of an integral (with respect to `BoxIntegral.HasIntegral`).
  - `norm_..._le`: bounds on norms (often involving `ε`, `c`, or distortion).
  - `continuousOn_face_Icc`, `mapsTo_insertNth_face_Icc`: geometric/continuity lemmas about faces and embeddings.
- **Suffixes**:
  - `_face`: refers to integration over a face of a box.
  - `_pderiv`: partial derivative w.r.t. coordinate `i`.
  - `_divergence`: full divergence (sum over all coordinates).
- **Notable identifiers**:
  - `insertNth`: embedding `ℝⁿ → ℝⁿ⁺¹` fixing coordinate `i`.
  - `Pi.single i 1`: standard basis vector `eᵢ`.
  - `distortion`: ratio of max to min side lengths of a box; used to bound diameter.

#### **3. Tactic Stack**

- **Core tactics**:
  - `simp`, `simp_rw`, `dsimp`: heavy use of simplification, especially for `BoxAdditiveMap`, `volume`, `integral`, and `Pi`-type arithmetic.
  - `exact`, `refine`, `convert_to`: for constructing proofs with precise control.
  - `gcongr`, `linarith`, `ring`, `abel`: arithmetic and inequality manipulation.
  - `filter_upwards`, `eventually`, `tendsto_iff`: filter-based arguments (e.g., neighborhoods, `𝓝[>]`).
  - `prod_le_prod`, `norm_integral_le_of_le_const`: integral estimation lemmas.
  - `rcases`, `obtain`, `cases'`: destructuring existential/universal hypotheses.
- **Specialized lemmas**:
  - `diam_Icc_le_of_distortion_le`, `volume_face_mul`, `norm_sub_le_of_le`: geometric/analytic estimates.
  - `integrable_of_continuousOn`: ensures integrability from continuity.

#### **4. Proof Logic & Structure**

- **Overall strategy**:
  1. **Local estimate** (`norm_volume_sub_integral_face_upper_smul_le`):
     - Reduce to bounding integrals of `g(y) = f(y) − a − f'(y − x)`, using differentiability.
     - Use `‖g(y)‖ ≤ ε·diam(I)` and volume estimates to get `O(ε·c·vol(I))`.
  2. **Apply generalized HK integrability criterion** (`HasIntegral.of_le_Henstock_of_forall_isLittleO`):
     - Split into two cases: points in the countable bad set `s`, and its complement.
     - For `x ∈ s`: use continuity to make both integrals close to `f(x)`, and small volume to control error.
     - For `x ∉ s`: use Fréchet differentiability + the auxiliary estimate.
  3. **Sum over coordinates** for divergence theorem: apply `hasIntegral.sum`, reduce to coordinate-wise case.

- **Induction / recursion**: None directly; relies on finite sum over `Fin (n+1)` and case analysis on membership in `s`.

#### **5. Imports & Scope**

- **Core dependencies**:
  - `Mathlib.Analysis.BoxIntegral.Basic`: foundational box integral theory.
  - `Mathlib.Analysis.BoxIntegral.Partition.Additive`: box-additive maps, face integrals.
  - `Mathlib.Analysis.Calculus.FDeriv.Prod`: Fréchet differentiability, product spaces.
- **Mathematical scope**:
  - Generalizes 1D Henstock–Kurzweil integral to `ℝⁿ`.
  - Handles non-differentiability on countable sets (via `ContinuousWithinAt`).
  - Applies to Banach-space-valued functions (`[NormedAddCommGroup E] [NormedSpace ℝ E]`).
  - Works with arbitrary finite dimension `n+1` (via `Fin (n+1)`).

---

This module formalizes a *non-standard* but equivalent generalization of the Henstock–Kurzweil integral (using bounded distortion partitions) and proves the divergence theorem in this setting — a key step toward a fully general Stokes theorem for HK-type integrals.