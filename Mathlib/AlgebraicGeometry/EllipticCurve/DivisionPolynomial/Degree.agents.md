### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `preΨₙ`, `ΨSqₙ`, `Φₙ` | Polynomials associated to division polynomials of a Weierstrass curve `W` over a commutative ring `R`. Used to describe multiplication-by-`n` maps on elliptic curves. |
| `preΨ' n` | A normalized version of `preΨₙ` defined for natural numbers `n`, used as an intermediate inductive definition. |
| `expDegree n` | `((n² - if Even n then 4 else 1) / 2)` — conjectured degree of `preΨₙ`. |
| `expCoeff n` | `if Even n then n / 2 else n` — conjectured leading coefficient of `preΨₙ`. |
| `natDegree_preΨ'_le`, `coeff_preΨ'` | Bounds and exact coefficients for `preΨ' n`. Core lemmas for induction. |
| `natDegree_preΨ_le`, `coeff_preΨ` | Extension of above to integer-indexed `preΨ n`. |
| `natDegree_Ψ₂Sq_le`, `coeff_Ψ₂Sq`, `natDegree_Ψ₂Sq`, `leadingCoeff_Ψ₂Sq` | Degree and leading coefficient of `Ψ₂Sq = Ψ₂²`, with special handling for `n = 2`. |
| `natDegree_Ψ₃_le`, `coeff_Ψ₃`, `natDegree_Ψ₃`, `leadingCoeff_Ψ₃` | Same for `Ψ₃`, degree 4, leading coeff 3. |
| `natDegree_preΨ₄_le`, `coeff_preΨ₄`, `natDegree_preΨ₄`, `leadingCoeff_preΨ₄` | Same for `preΨ₄`, degree 6, leading coeff 2. |
| `natDegree_ΨSq_le`, `coeff_ΨSq`, `natDegree_ΨSq`, `leadingCoeff_ΨSq` | For `ΨSq n = Ψₙ²`, degree `n² - 1`, leading coeff `n²`. |
| `natDegree_Φ_le`, `coeff_Φ`, `natDegree_Φ`, `leadingCoeff_Φ` | For `Φₙ`, degree `n²`, leading coeff `1`. |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `preΨ` — pre-division polynomial (not yet normalized).
  - `ΨSq` — square of division polynomial (`Ψₙ²`).
  - `Φ` — another division-related polynomial (used in duplication formula).
- **Suffixes**:
  - `_le` — degree bound (≤).
  - `_coeff` — exact coefficient at the top degree.
  - `_ne_zero` — nonzero coefficient under assumption.
  - `_pos` — positivity of degree.
  - `_le` → `_` (e.g., `natDegree_preΨ_le` → `natDegree_preΨ`) when equality holds.
- **Special Cases**:
  - `_₂Sq`, `_₃`, `_₄` — specific low-index cases.
  - `'` (e.g., `preΨ'`) — auxiliary natural-number version.

#### 3. **Tactic Stack**

- **`compute_degree` / `compute_degree!`** — used repeatedly to compute degrees and top coefficients of explicit polynomial expressions (e.g., `Ψ₂Sq`, `Ψ₃`, `preΨ₄`).
- **`norm_cast` / `push_cast`** — for lifting integer/rational identities to real/complex or ring embeddings.
- **`ring1` / `ring`** — for verifying polynomial identities in ℤ, ℚ, or R.
- **`simp only [...]`** — heavily used to simplify with lemmas and case splits.
- **`split_ifs`** — to handle `if ... then ... else ...` cases (especially parity).
- **`natDegree_eq_of_le_of_coeff_ne_zero`** — key lemma to upgrade bounds to equalities.
- **`induction n using normEDSRec`** — specialized induction for division polynomials (likely from `Mathlib.AlgebraicGeometry.EllipticCurve.DivisionPolynomial.Basic`).
- **`aesop`** — for automated reasoning in simple cases (e.g., `preΨ'_ne_zero`).

#### 4. **Proof Logic**

- **Structure**:
  - **Base cases** (`n = 0, 1, 2, 3, 4`) are handled explicitly using `compute_degree!`.
  - **Inductive step** uses `normEDSRec`, a recursion scheme tailored for division polynomials (based on recurrence relations like:
    ```
    Ψ_{m+n} Ψ_{m-n} Ψ_k² = Ψ_{m+1} Ψ_{m-1} Ψ_k² - Ψ_{k+1} Ψ_{k-1} Ψ_m²
    ```
    for appropriate `k`).
  - **Degree & coefficient bounds** are proven simultaneously via induction (`natDegree_coeff_preΨ'`), using:
    - `natDegree_mul_le`, `natDegree_pow_le`, `natDegree_sub_le`
    - `coeff_mul_of_natDegree_le`, `coeff_pow_of_natDegree_le`
  - **Parity splits** (`Even n` vs `Odd n`) are pervasive, especially in degree formulas and coefficient expressions.
  - **Integer extension**: Proofs for `n : ℤ` are lifted from `n : ℕ` using `Int.negInduction` and symmetry (`preΨ_neg`, `ΨSq_neg`, `Φ_neg`).

#### 5. **Imports**

- `Mathlib.AlgebraicGeometry.EllipticCurve.DivisionPolynomial.Basic` — defines division polynomials `Ψₙ`, `preΨₙ`, `ΨSqₙ`, `Φₙ`, and their basic properties.
- `Mathlib.Tactic.ComputeDegree` — provides `compute_degree` tactic for automated degree/leading coefficient computation.

---

This file formalizes the **asymptotic structure** of division polynomials over arbitrary commutative rings, verifying expected degrees and leading coefficients — foundational for torsion theory and duplication formulas on elliptic curves.