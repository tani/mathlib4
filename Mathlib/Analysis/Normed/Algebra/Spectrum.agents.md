Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Spectrum in Complete Normed Algebras (Lean 4)**

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `spectralRadius` | `spectralRadius a = ⨆ k ∈ spectrum 𝕜 a, ‖k‖₊` — supremum of norms of spectral points (0 if spectrum empty, ∞ if unbounded). |
| `resolventSet` | `ρ a = { k : 𝕜 | k • 1 - a ∈ Units A }` — set of points where resolvent `(k • 1 - a)⁻¹` exists. |
| `spectrum` | `σ a = { k : 𝕜 | k • 1 - a ∉ Units A }` — complement of resolvent set. |
| `hasDerivAt_resolvent` | `k ∈ ρ a ⇒ HasDerivAt (resolvent a) (-resolvent a k ^ 2) k` — resolvent is complex-differentiable on resolvent set. |
| `isOpen_resolventSet` | `IsOpen (ρ a)` — resolvent set is open (hence spectrum is closed). |
| `isClosed`, `isCompact` | `σ a` is closed and compact (under `ProperSpace 𝕜`, `CompleteSpace A`). |
| `subset_closedBall_norm` | `σ a ⊆ closedBall 0 (‖a‖ * ‖1‖)` — spectrum lies in disk of radius `‖a‖·‖1‖`. |
| `spectralRadius_le_nnnorm` | `ρ a ≤ ‖a‖₊` — spectral radius bounded by norm. |
| `pow_nnnorm_pow_one_div_tendsto_nhds_spectralRadius` | **Gelfand’s formula**: `(‖aⁿ‖₊)^(1/n) → ρ a` as `n → ∞`. |
| `spectrum.nonempty` | In a *nontrivial* complex Banach algebra, `σ a ≠ ∅` for all `a`. |
| `algEquivComplexOfComplete` | **Gelfand–Mazur theorem**: If `A` is a complex Banach *division* algebra, then `algebraMap ℂ A : ℂ → A` is an algebra isomorphism; inverse given by `a ↦ (some (spectrum.nonempty a))`. |
| `map_polynomial_aeval` | **Spectral mapping theorem for polynomials**: `σ(p(a)) = p '' σ(a)` for `p ∈ ℂ[X]`. |
| `exp_mem_exp` | `z ∈ σ(a) ⇒ exp z ∈ σ(exp a)` — exponential maps spectrum into spectrum of exponential. |

#### **2. Naming Conventions**

- **Prefixes**:
  - `spectralRadius_`, `resolvent_`, `isUnit_`, `isClosed_`, `isOpen_`, `isBounded_`, `isCompact_`, `nonempty_`, `pow_`, `map_`, `algEquiv_`, `exp_`.
- **Suffixes**:
  - `_of_mem`, `_of_lt`, `_of_nonempty`, `_le_`, `_lt_`, `_tendsto_nhds_`, `_eventually_`, `_isBigO_`, `_hasFPowerSeriesOnBall_`.
- **Notation**:
  - `σ a` for `spectrum 𝕜 a`, `ρ a` for `resolventSet 𝕜 a`, `↑ₐ` for `algebraMap 𝕜 A`.
  - `nnnorm` (`‖·‖₊`) used for extended nonnegative norm (values in `ℝ≥0∞`).

#### **3. Tactic Stack**

Frequently used tactics:
- `simp`, `rw`, `convert`, `exact`, `refine`, `apply`, `intro`, `cases`, `by_cases`, `contrapose!`, `nontriviality`, `norm_cast`, ` positivity`, `omega`.
- `aesop` (implicit via `suffices`/`have`/`obtain` + `simpa`).
- `filter_upwards`, `eventually_of_forall`, `tendsto_of_le_liminf_of_limsup_le`.
- `continuous_at`, `differentiableAt`, `differentiableWithinAt`, `hasDerivAt`, `hasFDerivAt`.
- `ENNReal`-specific: `le_of_forall_lt`, `sSup_lt_iff_of_continuous`, `liminf_eq_iSup_iInf_of_nat'`, `inv_lt_inv`, `rpow_inv_natCast`.

#### **4. Proof Logic & Structure**

- **Inductive/limit-based arguments** dominate:
  - Gelfand’s formula: prove `liminf ≥ ρ` and `limsup ≤ ρ`, then conclude convergence.
  - Nonempty spectrum: assume empty, deduce `resolvent a` is entire & bounded → Liouville ⇒ zero ⇒ contradiction.
- **Compactness arguments**:
  - Use `isCompact_iff_compactSpace`, `isCompact_of_isClosed_isBounded`.
  - Existence of extremal spectral point via `isCompact.exists_isMaxOn`.
- **Algebraic–analytic interplay**:
  - `mem_resolventSet` via norm estimates (`‖a‖·‖1‖ < ‖k‖`).
  - Differentiability via chain rule (`HasDerivAt.comp_hasDerivAt`).
  - Power series expansions (`exp`, resolvent via geometric series) used for local invertibility and spectral mapping.

#### **5. Imports & Scope**

**Core dependencies**:
- `Mathlib.Algebra.Algebra.Quasispectrum`
- `Mathlib.FieldTheory.IsAlgClosed.Spectrum`
- `Mathlib.Analysis.Complex.Liouville`
- `Mathlib.Analysis.Complex.Polynomial.Basic`
- `Mathlib.Analysis.Analytic.RadiusLiminf`
- `Mathlib.Topology.Algebra.Module.CharacterSpace`
- `Mathlib.Analysis.Normed.Algebra.Exponential`
- `Mathlib.Analysis.Normed.Algebra.UnitizationL1`
- `Mathlib.Tactic.ContinuousFunctionalCalculus`

**Domain**:  
Banach algebras over `𝕜 = ℝ` or `ℂ`, with emphasis on *complex* case (e.g., nonempty spectrum, Gelfand–Mazur).  
Key structures: `NormedRing`, `NormedAlgebra`, `CompleteSpace`, `Nontrivial`, `ProperSpace`.

---

Let me know if you'd like a dependency graph, a summary of the Gelfand–Mazur proof, or a formalization roadmap for future work (e.g., computing higher derivatives of `resolvent`).