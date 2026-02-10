Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: `ContinuousLinearMap` on a Complex Hilbert Space Forms a `StarOrderedRing`**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsPositive.spectrumRestricts` | `f.IsPositive → SpectrumRestricts f ContinuousMap.realToNNReal` | Shows that a positive continuous linear operator has spectrum contained in `[0, ∞)`, i.e., its spectrum restricts to nonnegative reals. |
| `NonnegSpectrumClass.instance` | `NonnegSpectrumClass ℝ (H →L[𝕜] H)` | Proves that the space of continuous linear maps has *nonnegative spectrum* iff it is positive (via `QuasispectrumRestricts.nnreal_iff`). |
| `instStarOrderedRingRCLike` | `[ContinuousFunctionalCalculus ℝ (IsSelfAdjoint)] → StarOrderedRing (H →L[𝕜] H)` | Constructs a `StarOrderedRing` structure assuming a continuous functional calculus for self-adjoint elements. |
| `instStarOrderedRing` | `StarOrderedRing (H →L[ℂ] H)` | Instantiates the above for complex Hilbert spaces (since `ContinuousFunctionalCalculus` is available for `𝕜 = ℂ`). |

#### **2. Naming Conventions**

- **Prefixes**:
  - `isPositive_`, `isUnit_`, `inner_`, `algebraMap_`, `map_`: indicate properties or actions of maps/operators.
  - `quasispectrum_`, `spectrum_`: relate to spectral theory.
- **Suffixes**:
  - `_left`, `_right`: indicate action on left/right arguments (e.g., `inner_add_left`).
  - `_nonneg`, `_pos`: denote positivity/nonnegativity conditions.
- **Operators**:
  - `sq`, `add`, `sub`, `mul`, `smul`: standard algebraic operations.
  - `star_eq`, `star_adjoint`: relate to `star` operation (adjoint).

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw`: rewriting using equalities/definitions (e.g., `rw [le_def]`, `rw [map_neg]`)
- `simp only [...]`: simplification with specific lemmas (e.g., `inner_smul_left`, `one_apply`)
- `contrapose!`: logical contrapositive + negation normalization
- `set c := -c`: variable introduction for simplification
- `exact`, `simpa`, `rfl`: basic proof steps
- `induction ... using ..._induction`: structural induction on `AddSubmonoid.closure`
- `calc`: chain of inequalities/equalities (used in `IsPositive.spectrumRestricts`)

#### **4. Proof Logic**

- **Main proof strategy**:
  - For `instStarOrderedRingRCLike`, the proof splits into two directions of `le_iff`:
    - **Forward direction**: Uses existence of square roots from the continuous functional calculus (`CFC.exists_sqrt_of_isSelfAdjoint_of_spectrumRestricts`) to express a positive difference as a square.
    - **Reverse direction**: Inductively shows that squares generate the positive cone via `AddSubmonoid.closure_induction`, using base cases for zero, one, and closure under addition/multiplication.
- **Spectral argument** in `IsPositive.spectrumRestricts`:
  - Contrapositive: assume spectrum contains a negative real `c < 0`, then show `f + c` is invertible (via `isUnit_of_forall_le_norm_inner_map`), contradicting `c ∈ spectrum f`.
  - Uses inner product estimates and positivity of `f` to bound `‖x‖²·c ≤ ⟨(f + c)x, x⟩`.

#### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.Analysis.InnerProductSpace.Positive`: defines positivity for operators.
  - `Mathlib.Analysis.CStarAlgebra.ContinuousFunctionalCalculus.Instances`: provides functional calculus tools.
  - `Mathlib.Analysis.CStarAlgebra.ContinuousLinearMap`: basic theory of `H →L[𝕜] H`.
- **Assumptions**:
  - `𝕜` is `RCLike` (i.e., `ℝ` or `ℂ` with complex structure).
  - `H` is a complete inner product space over `𝕜` (i.e., a Hilbert space).
  - Scalar tower condition: `ℝ → ℂ → End(H)` factors through `H →L[𝕜] H`.
  - For `instStarOrderedRingRCLike`, assumes existence of `ContinuousFunctionalCalculus ℝ (IsSelfAdjoint)`.

---

This module establishes foundational order-theoretic and spectral properties of `H →L[ℂ] H`, enabling the use of continuous functional calculus in the context of Hilbert space operators.