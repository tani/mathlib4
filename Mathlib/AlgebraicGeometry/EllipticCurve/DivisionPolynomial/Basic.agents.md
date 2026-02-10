Here is a **structured technical brief** extracted from the provided Lean 4 file, focusing on the key definitions, naming conventions, proof tactics, logical flow, and dependencies.

---

## 🔍 **Technical Brief: Division Polynomials of Weierstrass Curves in Lean 4**

### 1. **Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `ψ₂` | `R[X][Y]` | The 2-division polynomial, defined as `W.toAffine.polynomialY`. |
| `Ψ₂Sq` | `R[X]` | Univariate polynomial congruent to `ψ₂²`, defined as `4X³ + b₂X² + 2b₄X + b₆`. |
| `Ψ₃` | `R[X]` | Univariate version of the 3-division polynomial `ψ₃`. |
| `preΨ₄` | `R[X]` | Auxiliary polynomial for `ψ₄`, used to define `Ψ₄ = preΨ₄ ⬝ ψ₂`. |
| `preΨ' (n : ℕ)` | `R[X]` | Auxiliary univariate sequence (via `preNormEDS'`) for building `Ψₙ`. |
| `preΨ (n : ℤ)` | `R[X]` | Extension of `preΨ'` to integers (via `preNormEDS`). |
| `ΨSq (n : ℤ)` | `R[X]` | Univariate polynomial congruent to `ψₙ²`, defined as `preΨ n² * (if Even n then Ψ₂Sq else 1)`. |
| `Ψ (n : ℤ)` | `R[X][Y]` | Bivariate polynomial congruent to `ψₙ`, defined as `C (preΨ n) * (if Even n then ψ₂ else 1)`. |
| `Φ (n : ℤ)` | `R[X]` | Univariate polynomial congruent to `φₙ = Xψₙ² - ψₙ₊₁ψₙ₋₁`, defined using `ΨSq` and `preΨ`. |
| `ψ (n : ℤ)` | `R[X][Y]` | Actual `n`-division polynomial, defined via `normEDS` with base `ψ₂`, `Ψ₃`, `preΨ₄`. |
| `φ (n : ℤ)` | `R[X][Y]` | Bivariate polynomial `Xψₙ² - ψₙ₊₁ψₙ₋₁`. |
| `mk_ψ`, `mk_Ψ_sq`, `mk_φ` | Lemmas | Show congruence of `ψₙ`, `ψₙ²`, `φₙ` with `Ψₙ`, `ΨSqₙ`, `Φₙ` in the coordinate ring. |
| `map_ψ`, `map_Ψ`, etc. | Lemmas | Compatibility of all polynomials with ring homomorphisms. |
| `baseChange_*` | Lemmas | Compatibility with base change (algebra morphisms). |

#### Notable Theorems (Recurrence Relations)
- `preΨ'_even`, `preΨ'_odd`, `preΨ_even`, `preΨ_odd`: Recurrence formulas for `preΨ`.
- `Ψ_even_ofNat`, `Ψ_odd_ofNat`, `Ψ_even`, `Ψ_odd`: Recurrences for `Ψₙ`.
- `ψ_even_ofNat`, `ψ_odd_ofNat`, `ψ_even`, `ψ_odd`: Recurrences for `ψₙ`.
- `Φ_neg`, `ΨSq_neg`, `Ψ_neg`, `φ_neg`: Parity/symmetry properties.

---

### 2. **Naming Conventions**

| Pattern | Meaning | Examples |
|--------|---------|----------|
| `preΨ` | Auxiliary univariate sequence (before lifting to bivariate) | `preΨ'`, `preΨ`, `preΨ₄` |
| `Ψ` | Bivariate analog of division polynomials (congruent to `ψ` mod Weierstrass eq) | `Ψ`, `ΨSq`, `Ψ₃`, `Ψ₂Sq` |
| `ψ` | Actual division polynomials (in `R[X, Y]`) | `ψ`, `ψ₂`, `ψ₃`, `ψ₄` |
| `Φ`, `φ` | Analogues of `Xψₙ² - ψₙ₊₁ψₙ₋₁` | `Φ` (univariate), `φ` (bivariate) |
| `map_*`, `baseChange_*` | Lemmas for compatibility with ring/algebra maps | `map_ψ`, `baseChange_Ψ` |
| `mk_*` | Lemmas about image in coordinate ring | `mk_ψ`, `mk_Ψ_sq`, `mk_φ` |

Suffixes:
- `'` (e.g., `preΨ'`) → natural-number-indexed version.
- No `'` (e.g., `preΨ`) → integer-indexed version.
- `Sq` → square-related (e.g., `ΨSq`, `Ψ₂Sq`).
- `pre` → pre-normalized or auxiliary.

---

### 3. **Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Purpose |
|--------|---------|
| `simp only [...]` | Simplify using precise lemmas (e.g., `map_ofNat`, `map_mul`, `preNormEDS_*`). |
| `C_simp`, `map_simp` | Custom macros for simplifying `C` (constant polynomial) and `map` applications. |
| `ring1`, `ring` | Prove polynomial identities (especially after `simp`). |
| `split_ifs` | Handle `if ... then ... else ...` cases. |
| `rw_mod_cast` | Rewrite with type casting (e.g., `ℕ → ℤ`). |
| `repeat` | Apply tactic repeatedly (e.g., `repeat rw [Ψ]`). |
| `simp_rw` | Simplify + rewrite in one step (used heavily for unfolding definitions). |
| `aesop` | Not used here — proofs are mostly algebraic and manual. |

---

### 4. **Proof Logic & Strategy**

- **Inductive/Recursive Structure**: All sequences (`preΨ`, `Ψ`, `ψ`, etc.) are defined via `preNormEDS` / `normEDS`, which are based on elliptic divisibility sequences (EDS). Proofs of properties (e.g., recurrences, parity) rely on:
  - `preNormEDS_*` / `normEDS_*` lemmas (e.g., `preNormEDS_even`, `normEDS_odd`).
  - Induction on `n` (often hidden via `repeat rw` + `simp`).
- **Congruence Proofs** (`mk_*` lemmas):
  - Use `mk_ψ₂_sq` to reduce `ψ₂²` to `Ψ₂Sq`.
  - Then apply `map_*` lemmas and `mk`-specific simplifications.
- **Parity Handling**:
  - `if Even n then ... else ...` cases are split via `split_ifs`.
  - `even_two_mul`, `not_even_two_mul_add_one`, etc., used to decide even/odd structure.
- **Polynomial Identities**:
  - After simplification, `ring1` is used to finish equalities in polynomial rings.

---

### 5. **Imports & Dependencies**

| Import | Purpose |
|--------|---------|
| `Mathlib.AlgebraicGeometry.EllipticCurve.Group` | Provides `WeierstrassCurve`, `Affine`, `CoordinateRing`, `mk`, etc. |
| `Mathlib.NumberTheory.EllipticDivisibilitySequence` | Provides `preNormEDS`, `normEDS`, and their properties (e.g., `preNormEDS_even`, `normEDS_zero`). |

#### Key Typeclasses & Universes
- `CommRing R`: Base ring for coefficients.
- `WeierstrassCurve R`: Type of Weierstrass curves over `R`.
- `Polynomial`, `Polynomial.Bivariate`: For univariate/bivariate polynomials.

---

## ✅ Summary

This file formalizes **division polynomials** for Weierstrass curves over arbitrary commutative rings, using **elliptic divisibility sequences (EDS)** as the core mechanism. It introduces:
- **Auxiliary univariate sequences** (`preΨ`, `ΨSq`, `Φ`) to avoid ring division and simplify leading-term analysis.
- **Bivariate analogues** (`Ψ`, `ψ`, `φ`) that are congruent modulo the Weierstrass equation.
- **Functoriality lemmas** (`map_*`, `baseChange_*`) ensuring compatibility with ring/algebra maps.

The formalization is highly structured, leveraging existing EDS infrastructure (`Mathlib.NumberTheory.EllipticDivisibilitySequence`) and carefully managing parity, polynomial congruences, and base change.

Let me know if you'd like a **diagram of dependencies**, **proof outline for a key lemma**, or **export of the API surface**.