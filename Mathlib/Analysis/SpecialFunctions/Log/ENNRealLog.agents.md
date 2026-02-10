### Technical Brief: `ENNReal.log` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `log : ℝ≥0∞ → EReal` | `ENNReal.log` | Extension of `Real.log` to extended nonnegative reals: `log 0 = ⊥`, `log ⊤ = ⊤`, `log x = Real.log x.toReal` for `0 < x < ⊤`. |
| `log_strictMono` | `StrictMono log` | `log` is strictly increasing on `ℝ≥0∞`. |
| `log_injective` | `Function.Injective log` | Follows from strict monotonicity. |
| `log_surjective` | `Function.Surjective log` | Every `y : EReal` has a preimage: `⊥ ↦ 0`, `⊤ ↦ ⊤`, `↑r ↦ ofReal (exp r)`. |
| `log_bijective` | `Function.Bijective log` | Injectivity + surjectivity. |
| `log_mul_add` | `log (x * y) = log x + log y` | Logarithm turns multiplication into addition (holds unconditionally in `ℝ≥0∞`/`EReal` conventions). |
| `log_pow` | `log (x ^ n) = n • log x` | Logarithm of natural powers. |
| `log_rpow` | `log (x ^ y) = y • log x` | Logarithm of real powers (`y : ℝ`). |
| `log_inv` | `log x⁻¹ = - log x` | Log of inverse (derived from `log_rpow` with `y = -1`). |

**Auxiliary lemmas (simplification rules):**
- `log_zero`, `log_one`, `log_top`
- `log_ofReal`, `log_ofReal_of_pos`
- `log_pos_real`, `log_pos_real'`, `log_of_nnreal`
- `log_eq_iff`, `log_eq_bot_iff`, `log_eq_one_iff`, `log_eq_top_iff`
- `log_lt_log_iff`, `bot_lt_log_iff`, `log_lt_top_iff`, `log_lt_zero_iff`, `zero_lt_log_iff`
- `log_le_log_iff`, `log_le_zero_iff`, `zero_le_log_iff`

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `log_`: All definitions/lemmas related to the logarithm function.
  - `is_`, `mul_`, `dist_`, etc., are *not* used here — this is a focused module on `log`.
- **Suffixes:**
  - `_iff`: Equivalences (`↔`) involving `log`.
  - `_ofReal`, `_of_nnreal`, `_pos_real`: Specializations to embedded reals.
  - `_top`, `_zero`: Cases at boundary points (`⊤`, `0`).
  - `_mul_add`, `_pow`, `_rpow`, `_inv`: Algebraic identities.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `rcases ENNReal.trichotomy x`: Exhaustive case analysis on `x = 0`, `x = ⊤`, or `0 < x < ⊤`.
- `simp only [...]`: Heavy use of `simp` with explicit lemmas to reduce `log`, `toReal`, `ofReal`, `rpow`, `pow`, and `EReal` arithmetic.
- `rw [...]`: Rewriting using lemmas like `log_pos_real'`, `ENNReal.toReal_mul`, `Real.log_mul`, etc.
- `norm_cast`: For coercions between `ℝ≥0`, `ℝ≥0∞`, `ℝ`, and `EReal`.
- `exact`, `apply`, `intro`, `exfalso`, `split_ifs`: Standard proof scripting.
- ` positivity`: To discharge positivity goals (e.g., for `n : ℕ⁺`, `y : ℝ⁺`).

---

#### **4. Proof Logic**

- **Structure:** Proofs follow a *case analysis* strategy based on the trichotomy of `ℝ≥0∞`:
  - `x = 0`, `x = ⊤`, or `0 < x < ⊤` (i.e., `x = ofReal r` with `r > 0`).
- **Monotonicity (`log_strictMono`)**:
  - Reduce to `Real.log` on positive reals, where strict monotonicity is known.
  - Handle boundary cases (`0`, `⊤`) separately using `not_lt_bot`, `lt_top`, etc.
- **Surjectivity (`log_surjective`)**:
  - Construct preimage explicitly: `⊥ ↦ 0`, `⊤ ↦ ⊤`, `↑r ↦ ofReal (exp r)`.
  - Use `Real.log_exp` and `log_ofReal_of_pos`.
- **Algebraic laws (`log_mul_add`, `log_pow`, `log_rpow`)**:
  - Case analysis on `x`, `y`, and (for `log_rpow`) sign of `y`.
  - Reduce to known real identities (`Real.log_mul`, `Real.log_pow`, `Real.log_rpow`) via `toReal_*` lemmas.
  - Use `EReal` arithmetic simplifications (e.g., `top_add_coe`, `mul_bot_of_pos`).

---

#### **5. Imports & Scope**

**Primary imports:**
- `Mathlib.Data.Real.EReal`: Extended reals (`EReal`), with `⊥`, `⊤`, order, arithmetic.
- `Mathlib.Analysis.SpecialFunctions.Pow.NNReal`: Powers on `ℝ≥0`, `ℝ≥0∞`, including `rpow`, `pow`, continuity, monotonicity.

**Domain scope:**
- **Objects:** Extended nonnegative reals (`ℝ≥0∞`), embedded reals (`ofReal`, `nnreal` coercion), extended reals (`EReal`).
- **Functions:** `log`, `exp`, `rpow`, `pow`, `toReal`, `ofReal`.
- **Properties:** Order-theoretic (strict monotonicity), algebraic (homomorphism over `*` and `^`), bijectivity.

**Notable conventions:**
- `log 0 = ⊥`, `log ⊤ = ⊤` (extended real values).
- Multiplication in `ℝ≥0∞` and addition in `EReal` are defined to make `log (x * y) = log x + log y` hold *unconditionally* (e.g., `0 * ⊤ = 0`, `⊥ + ⊤ = ⊥` in `EReal`? — but here `log 0 = ⊥`, `log ⊤ = ⊤`, and `⊥ + ⊤ = ⊥` is *not* used; instead, cases avoid inconsistent sums via case analysis).
- `toReal : ℝ≥0∞ → ℝ≥0` is total (maps `0` and `⊤` to `0`), but `log` avoids `toReal` at boundaries via `if` guards.

---

### Summary

This module formalizes the **extended logarithm** on `ℝ≥0∞`, extending `Real.log` to include `0` and `⊤` with values `⊥` and `⊤` in `EReal`. It establishes:
- **Order-theoretic properties** (strict monotonicity, bijectivity),
- **Algebraic identities** (log of product, power, inverse),
- **Simplification rules** for case analysis.

The proofs rely heavily on case splits over the three regimes of `ℝ≥0∞`, leveraging `Real.log` properties and careful handling of extended arithmetic. The design ensures that `log` behaves as a *strictly increasing bijection* between `ℝ≥0∞` and `EReal`, preserving the algebraic structure of multiplication and exponentiation.