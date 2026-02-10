### Technical Metadata Brief: Fourier Transform Formalization in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `fourierIntegral` (`VectorFourier`) | `AddChar 𝕜 𝕊 → Measure V → (V →ₗ[𝕜] W →ₗ[𝕜] 𝕜) → (V → E) → W → E` | General Fourier integral over vector spaces: `w ↦ ∫ v, e(-L v w) • f v ∂μ` |
| `fourierIntegral` (`Fourier`) | `AddChar 𝕜 𝕊 → Measure 𝕜 → (𝕜 → E) → 𝕜 → E` | Special case where domain/codomain = base ring `𝕜`, with `L = mul` |
| `fourierIntegral` (`Real`) | `(V → E) → V → E` | Fourier transform on finite-dimensional real inner product space using `𝐞` and volume measure |
| `fourierIntegralInv` (`Real`) | `(V → E) → V → E` | Inverse Fourier transform (sign-flipped exponential) |
| `Real.fourierChar` | `AddChar ℝ 𝕊` | Standard additive character: `x ↦ exp(2πix)` |
| `𝐞` (notation) | `Real.fourierChar` | Shorthand for the standard character |
| `𝓕`, `𝓕⁻` (notations) | `Real.fourierIntegral`, `Real.fourierIntegralInv` | Fourier and inverse Fourier transform operators |
| `fourierIntegral_continuous` | `Continuous (fourierIntegral e μ L f)` | Fourier transform of integrable `f` is continuous (under continuity of `e`, `L`) |
| `fourierIntegral_convergent_iff` | `Integrable (e (-L v w) • f v) ↔ Integrable f` | Convergence of Fourier integral equivalent to `f ∈ L¹` |
| `integral_fourierIntegral_smul_eq_flip` | `∫ ξ, (𝓕 f ξ) • g ξ = ∫ x, f x • (𝓕 g.flip x)` | Self-adjointness of Fourier transform (Plancherel-type identity) |
| `fourierIntegral_comp_add_right` | `𝓕(f(·+v₀)) = e(v₀·) • 𝓕 f` | Translation property: right-translation ↔ phase multiplication |
| `fourierIntegral_const_smul` | `𝓕(r • f) = r • 𝓕 f` | Linearity over ℂ scalars |
| `norm_fourierIntegral_le_integral_norm` | `‖𝓕 f w‖ ≤ ∫ ‖f‖` | Uniform bound of Fourier transform by `L¹`-norm |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `fourierIntegral_...`: Core definitions and lemmas for the integral transform.
  - `fourierChar`, `𝐞`: Standard additive character on `ℝ`.
  - `𝓕`, `𝓕⁻`: Notations for Fourier/inverse Fourier transforms (scoped in `FourierTransform`).
  - `vector_fourierIntegral_...`: Lemmas lifting results from `VectorFourier` to concrete cases.
- **Suffixes**:
  - `_eq`: Equality with explicit integral expression.
  - `_convergent_iff`: Equivalence of integrability conditions.
  - `_comp_add_right`: Behavior under translation.
  - `_smul`, `_const_smul`: Interaction with scalar multiplication.
  - `_flip`: Use of flipped bilinear form (e.g., `L.flip`).
  - `_continuous`: Continuity of resulting function.
- **Modifiers**:
  - `toLinearMap₂`: Conversion of `ContinuousLinearMap` to binary linear map.
  - `measurePreserving`, `measurableEmbedding`: For change-of-variables lemmas.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Role |
|--------|------|
| `simp_rw` | Rewriting with simplification (especially for `smul`, `norm`, `map`, `integral` simplifications) |
| `rw` | Standard rewriting (e.g., of bilinear forms, character properties) |
| `congr` / `ext1` | Extensionality for function equality |
| `exact`, `apply` | Goal-directed proof construction (e.g., `apply B.comp_aestronglyMeasurable A'`) |
| `have`, `calc` | Intermediate lemma construction and chain of equalities |
| `aesop` / `linarith` | Not heavily used; more manual control preferred |
| `ring`, `norm_num` | Minimal use (algebraic simplifications mostly handled by `simp`) |
| `change`, `conv` | Focused rewriting in subterms (e.g., `conv in L _ => rw [...]`) |
| `filter_upwards` | For measure-theoretic a.e. arguments |
| `simp only`, `dsimp` | Local simplification with explicit control |

---

#### **4. Proof Logic & Strategy**

- **Induction**: Not used (finite-dimensional setting, no structural recursion).
- **Main proof patterns**:
  - **Reduction to known lemmas**: Many results lift from `VectorFourier` to `Fourier`/`Real` via `simp` and `rw`.
  - **Measure-theoretic control**:
    - Use of `Integrable` and `aestronglyMeasurable` to justify Fubini, change of variables, and integral manipulations.
    - `integral_integral_swap` for switching order of integration (requires dominated convergence via `mono` on integrable majorant).
  - **Continuity arguments**:
    - `continuous_of_dominated`: Proves continuity of `fourierIntegral f` by dominating with `‖f‖₁`.
    - Continuity of `e` and `L` is assumed explicitly (`he`, `hL`) and used to ensure strong measurability of integrand.
  - **Algebraic manipulation**:
    - Heavy use of `e.map_add_eq_mul`, `Circle.coe_mul`, `smul_assoc`, `neg_mul`, `mul_neg` to re-express exponentials.
    - `smul_eq_mul`, `Circle.smul_def` to connect additive characters with multiplicative exponentials.
  - **Change of variables**:
    - `MeasurePreserving.integral_comp` for linear isometries (e.g., `fourierIntegral_comp_linearIsometry`).

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Algebra.Group.AddChar`: Additive characters and their algebraic properties.
- `Mathlib.Analysis.Complex.Circle`: Circle group `𝕊`, exponential map, continuity.
- `Mathlib.MeasureTheory.Group.Integral`: Integration w.r.t. Haar/translation-invariant measures.
- `Mathlib.MeasureTheory.Integral.Prod`, `SetIntegral`: Product measures, Fubini, change of variables.
- `Mathlib.MeasureTheory.Measure.Haar.InnerProductSpace`, `OfBasis`: Haar measure on finite-dimensional spaces, normalization via basis.

**Key Logical Contexts**:
- `𝕜`: Commutative ring (often `ℝ` or `ℂ`).
- `V`, `W`: Additive commutative groups with `𝕜`-module and measurable space structures.
- `e`: Unitary additive character (`AddChar 𝕜 Circle`).
- `L`: Bilinear form (`V →ₗ W →ₗ 𝕜` or `V →L W →L 𝕜` for continuous version).
- `μ`, `ν`: Measures (often Haar/volume, assumed σ-finite).
- `E`, `F`, `G`: Normed complex vector spaces (often `ℂ`, `ℝ`, or function spaces).

**Notable Scopes**:
- `scoped[FourierTransform]`: For notations `𝐞`, `𝓕`, `𝓕⁻`.
- `scoped Real`: For real-specific definitions (`fourierChar`, `fourierIntegral` on inner product spaces).

---

This metadata reflects a mature, measure-theoretic foundation for Fourier analysis in Lean, emphasizing correctness over automation, with careful attention to topological, measurable, and algebraic structure compatibility.