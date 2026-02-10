### Technical Brief: Conformal Maps Between Complex Vector Spaces (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `isConformalMap_conj` | `IsConformalMap (conjLIE : ℂ →L[ℝ] ℂ)` | Shows complex conjugation (as a real-linear map) is conformal. |
| `isConformalMap_complex_linear` | `map ≠ 0 → IsConformalMap (map.restrictScalars ℝ)` | A nonzero complex-linear map into any complex normed space, viewed as real-linear, is conformal. |
| `isConformalMap_complex_linear_conj` | `map ≠ 0 → IsConformalMap ((map.restrictScalars ℝ).comp conjCLE)` | Composition of a nonzero complex-linear map with conjugation is conformal. |
| `isConformalMap_iff_is_complex_or_conj_linear` | `IsConformalMap g ↔ ((∃ map, map.restrictScalars ℝ = g) ∨ ∃ map, map.restrictScalars ℝ = g ∘L conjCLE) ∧ g ≠ 0` | Characterizes conformal real-linear maps on ℂ: they are exactly nonzero maps that are either complex-linear or complex-antilinear (i.e., complex-linear after precomposing with conjugation). |
| `DifferentiableAt.conformalAt` | `DifferentiableAt ℂ f z → deriv f z ≠ 0 → ConformalAt f z` | Holomorphicity + nonvanishing derivative ⇒ conformality at a point (Cauchy–Riemann implication). |
| `conformalAt_iff_differentiableAt_or_differentiableAt_comp_conj` | `ConformalAt f z ↔ (DifferentiableAt ℂ f z ∨ DifferentiableAt ℂ (f ∘ conj) (conj z)) ∧ fderiv ℝ f z ≠ 0` | Full equivalence: conformality at a point ⇔ holomorphic or antiholomorphic with nonvanishing real differential. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isConformalMap_`: properties of *linear* maps being conformal.
  - `conformalAt_`: properties of *functions* being conformal *at a point*.
- **Suffixes**:
  - `_complex_linear`: maps that are ℂ-linear.
  - `_conj`: involve complex conjugation (`conj`, `conjCLE`, `conjLIE`).
  - `_iff_`: biconditional characterizations.
- **Variables**:
  - `map`: a complex-linear map (`ℂ →L[ℂ] E`).
  - `g`: a real-linear map on ℂ (`ℂ →L[ℝ] ℂ`).
  - `f`: a general function ℂ → E.
  - `z`: basepoint in ℂ.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp` / `simp only [...]` | Simplification with explicit lemmas (e.g., `map.map_smul`, `norm_smul`, `smul_inv_smul₀`). |
| `rw [...]` | Rewriting using definitions (e.g., `fderiv`, `restrictScalars`, `conformalAt_iff_isConformalMap_fderiv`). |
| `ext1` | Extensionality for linear maps (one variable at a time). |
| `rcases` / `obtain` | Case analysis on existential/universal hypotheses. |
| `refine` / `exact` | Proof construction with holes filled later. |
| `field_simp` | Simplification involving inverses and division. |
| `contrapose!` | Logical contrapositive + simplification. |
| `have ... := ...` | Intermediate lemma introduction. |
| `nth_rw n [...]` | Rewrite at nth occurrence (used for structural manipulation). |

---

#### **4. Proof Logic**

- **Structure of main proofs**:
  - **Linear case** (`isConformalMap_complex_linear`, `isConformalMap_complex_linear_conj`):
    - Construct explicit scaling factor `c = ‖map 1‖`.
    - Show existence of a linear isometry up to scaling.
    - Use `simp` + algebraic identities (`smul_eq_mul`, `map_smul`, `norm_smul`).
  - **Characterization on ℂ** (`isConformalMap_iff_is_complex_or_conj_linear`):
    - Use classification of linear isometries of ℂ (`linear_isometry_complex`): any such is rotation or rotation + conjugation.
    - Reduce to scalar multiplication cases.
    - Handle both directions via `or_congr`, `and_congr_left`, and `simp`-based elimination of zero cases.
  - **Differentiable case** (`conformalAt_iff_differentiableAt_or_differentiableAt_comp_conj`):
    - Translate conformality at a point to conformality of the *fderiv* (via `conformalAt_iff_isConformalMap_fderiv`).
    - Apply linear characterization.
    - Use `differentiableAt_iff_restrictScalars` to relate complex/differentiability and real-linear restrictions.
    - Precompose with `conj` to capture antiholomorphicity.

- **Inductive/Case-based reasoning**:
  - `rcases linear_isometry_complex li with ⟨a, rfl | rfl⟩` splits into holomorphic vs antiholomorphic cases.
  - Contrapositive reasoning (`contrapose!`) used to eliminate zero maps.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Analysis.Calculus.Conformal.NormedSpace`: General theory of conformal maps in normed spaces.
- `Mathlib.Analysis.Calculus.Deriv.Basic`: Derivatives of complex functions.
- `Mathlib.Analysis.Calculus.FDeriv.Equiv`: Linear isometries and equivalences.
- `Mathlib.Analysis.Calculus.FDeriv.RestrictScalars`: Restriction of scalars for fderiv.
- `Mathlib.Analysis.Complex.Isometry`: Structure of isometries over ℂ.
- `Mathlib.Analysis.Normed.Module.FiniteDimension`: Finite-dimensional normed modules.
- `Mathlib.Data.Complex.FiniteDimensional`: ℂ as a finite-dimensional ℝ-module.

**Domain**: Complex analysis in infinite-dimensional normed spaces, with emphasis on:
- Linear conformality (real-linear maps between complex normed spaces).
- Local conformality of differentiable functions (Cauchy–Riemann framework).
- Antiholomorphic maps included as conformal (per convention in this formalization).

---

Let me know if you'd like a diagram of the logical dependencies or a summary of how this fits into the broader `Mathlib` conformal geometry library.