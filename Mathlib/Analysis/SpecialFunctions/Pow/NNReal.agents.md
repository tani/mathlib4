Here's a **structured technical brief** extracted from the provided Lean 4 file, focusing on the formalization of power functions on `ℝ≥0` and `ℝ≥0∞`.

---

## 🔹 **1. Key Definitions & Theorems**

### **Definitions**
| Name | Type | Purpose |
|------|------|---------|
| `NNReal.rpow` | `ℝ≥0 → ℝ → ℝ≥0` | Defines `x ^ y` for nonnegative real base `x` and real exponent `y`, via restriction of `Real.rpow`. |
| `ENNReal.rpow` | `ℝ≥0∞ → ℝ → ℝ≥0∞` | Extends `rpow` to extended nonnegative reals (`ℝ≥0∞`), handling `0`, `∞`, and sign of exponent. |
| `rpowMonoidHom` | `ℝ → ℝ≥0 →* ℝ≥0` | Bundles `x ↦ x ^ r` as a monoid homomorphism (for fixed exponent `r`). |

### **Core Theorems**
| Name | Statement | Significance |
|------|-----------|--------------|
| `rpow_zero` | `x ^ 0 = 1` | Base case for exponent 0. |
| `rpow_eq_zero_iff` | `x ^ y = 0 ↔ x = 0 ∧ y ≠ 0` | Characterizes when power is zero. |
| `zero_rpow` | `0 ^ x = 0` for `x ≠ 0`, `0 ^ 0 = 1` | Standard convention for `0^x`. |
| `rpow_add` | `x ^ (y + z) = x ^ y * x ^ z` (for `x ≠ 0`) | Exponent addition law. |
| `rpow_mul` | `x ^ (y * z) = (x ^ y) ^ z` | Power of a power. |
| `rpow_neg` | `x ^ (-y) = (x ^ y)⁻¹` | Negative exponent law. |
| `rpow_lt_rpow_of_exponent_lt` | `1 < x ∧ y < z ⇒ x ^ y < x ^ z` | Monotonicity in exponent for `x > 1`. |
| `rpow_lt_rpow_of_exponent_gt` | `0 < x < 1 ∧ z < y ⇒ x ^ y < x ^ z` | Monotonicity in exponent for `0 < x < 1`. |
| `rpow_left_injective` | `x ≠ 0 ⇒ y ↦ y ^ x` is injective | Left-injectivity of power function. |
| `rpow_left_bijective` | `x ≠ 0 ⇒ y ↦ y ^ x` is bijective | Enables inverse (`y ↦ y ^ (1/x)`). |
| `orderIsoRpow` | `0 < y ⇒ x ↦ x ^ y` is an order isomorphism | Connects order structure with power function. |

---

## 🔹 **2. Naming Conventions**

- **Prefixes**:
  - `rpow_`: Standard prefix for all `rpow`-related lemmas (e.g., `rpow_add`, `rpow_mul`, `rpow_neg`).
  - `coe_`: For coercion lemmas (e.g., `coe_rpow`, `coe_mul_rpow`).
  - `one_`, `zero_`, `top_`: For special cases (`0`, `1`, `∞`) (e.g., `zero_rpow`, `one_rpow`, `top_rpow_of_pos`).
  - `inv_`, `div_`, `mul_`: For algebraic properties (e.g., `inv_rpow`, `div_rpow`, `mul_rpow`).
  - `natCast`, `intCast`: For integer/natural coercion lemmas (e.g., `rpow_natCast`, `rpow_intCast`).
  - `of_nonneg`, `of_pos`, `of_neg`, `of_nonpos`: For conditions on exponents or bases (e.g., `rpow_add_of_nonneg`, `rpow_lt_rpow_of_neg`).

- **Suffixes**:
  - `'` (prime): Variant of a lemma with relaxed assumptions (e.g., `rpow_add'`, `rpow_sub'`).
  - `'_`: In older versions (now deprecated), used for `1 / z` instead of `z⁻¹` (e.g., `le_rpow_one_div_iff` → deprecated in favor of `le_rpow_inv_iff`).

---

## 🔹 **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` / `simp only` | Simplifying goals using `@[simp]` lemmas (e.g., `rpow_zero`, `zero_rpow`). |
| `rw` / `rwa` | Rewriting using equalities (especially `rpow_add`, `rpow_mul`, `rpow_neg`). |
| `ext` | Extensionality for `NNReal`/`ENNReal` equality (proving two reals/extended reals equal by coercion). |
| `cases` / `rcases` | Case analysis on `x : ℝ≥0`, `x : ℝ≥0∞`, or trichotomy of real numbers (`lt_trichotomy`). |
| `field_simp` | Simplifying expressions involving inverses and division (e.g., in `rpow_inv_rpow_self`). |
| `ring` / `norm_cast` | For algebraic simplifications and coercion normalization. |
| `aesop` / `linarith` | For linear arithmetic (e.g., handling inequalities like `0 < y`, `z ≤ 0`). |
| `induction` | Structural induction on `ENNReal` (e.g., `induction x using recTopCoe`). |
| `convert` / `using` | For symmetry arguments (e.g., `wlog hxy : x ≤ y`). |

---

## 🔹 **4. Proof Logic**

The proofs follow a **structured pattern**:

1. **Reduction to `Real.rpow`**:
   - For `NNReal`, most lemmas reduce to corresponding `Real.rpow` facts via `NNReal.eq` or coercion lemmas (`coe_rpow`).
   - For `ENNReal`, proofs often split into cases (`x = 0`, `x = ⊤`, `0 < x < ⊤`) and use `ENNReal.coe_rpow_of_ne_zero`/`coe_rpow_of_nonneg`.

2. **Case Analysis**:
   - Trichotomy on real numbers (`y < 0`, `y = 0`, `y > 0`) is heavily used (e.g., in `zero_rpow_def`, `rpow_eq_zero_iff`).
   - For `ENNReal`, case analysis on `x = 0`, `x = ⊤`, or `x = some a` is standard.

3. **Monoid/Order Structure**:
   - Monoid homomorphism properties (`rpowMonoidHom`) enable product lemmas (`list_prod_map_rpow`, `finset_prod_rpow`).
   - Order isomorphisms (`orderIsoRpow`) are used to transfer monotonicity/injectivity.

4. **Induction**:
   - Used for `ENNReal` (e.g., `induction x using recTopCoe`) and finite products (`Finset.induction`).

5. **Field Simplification**:
   - Inverses and division handled via `field_simp` and `rpow_self_rpow_inv`/`rpow_inv_rpow_self`.

---

## 🔹 **5. Imports & Scope**

### **Primary Imports**
- `Mathlib.Analysis.SpecialFunctions.Pow.Real`: Provides `Real.rpow` and its properties.
- Standard libraries: `Mathlib.Data.NNReal`, `Mathlib.Data.ENNReal`, `Mathlib.Data.Real.Basic`, `Mathlib.Data.Complex.Conjugate`, etc.

### **Scope**
- **Noncomputable**: All definitions are noncomputable (as `rpow` uses `Real.rpow`, which is noncomputable due to `Real.exp`/`Real.log`).
- **Sections**:
  - `noncomputable section`: At top level.
  - `section Real`: Inside `NNReal`, for lifting `Real` lemmas to `NNReal`/`ENNReal`.

---

## 🔹 **Summary**

This file formalizes the **real power function** on nonnegative reals (`ℝ≥0`) and extended nonnegative reals (`ℝ≥0∞`), including:
- Definition via restriction of `Real.rpow`.
- Algebraic laws (`rpow_add`, `rpow_mul`, `rpow_neg`).
- Order-theoretic properties (monotonicity, injectivity, bijectivity).
- Product lemmas (for lists, multisets, finsets).
- Special cases (`0^x`, `1^x`, `∞^x`).
- Coercion compatibility (`coe_rpow`, `toNNReal_rpow`).

The formalization is **modular**, leveraging `Real.rpow` and `ENNReal` induction, with a consistent naming and proof strategy.

Let me know if you'd like a **dependency graph**, **proof outline**, or **migration notes** (e.g., deprecated lemmas).