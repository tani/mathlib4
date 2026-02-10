Here's a structured technical metadata summary of the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `isIntegral_int_I` | `IsIntegral ℤ I` | Proves that the complex unit `I` (i.e., `Complex.I`) is integral over `ℤ`, by exhibiting the monic polynomial `X² + 1`. |
| `isIntegral_rat_I` | `IsIntegral ℚ I` | Derives integrality of `I` over `ℚ` from integrality over `ℤ`, using the *transitivity of integrality* in a tower (`tower_top`). |

- **Auxiliary facts used**:
  - `monic_X_pow_add_C _ two_ne_zero`: `X^2 + 1` is monic (since `2 ≠ 0` in `ℤ`).
  - `eval₂_add`, `eval₂_X_pow`, `eval₂_C`: Evaluation homomorphism properties.
  - `I_sq`: `I * I = -1`.
  - `eq_intCast`, `Int.cast_one`: Identification of integer casts.
  - `neg_add_cancel`: Used to show `I` is a root: `I^2 + 1 = -1 + 1 = 0`.

---

### **2. Naming Conventions**

- **Prefixes**:
  - `isIntegral_`: Indicates a theorem about integrality (e.g., `isIntegral_int_I`, `isIntegral_rat_I`).
- **Suffixes**:
  - `_int_`, `_rat_`: Denotes base ring (`ℤ`, `ℚ`) in integrality statements.
  - `_I`: Refers to the complex unit `I`.
- **Polynomial-related**:
  - `X`, `C`: Standard notation for indeterminate and constant polynomials.
  - `monic_X_pow_add_C`: Predicate for monic polynomials of the form `X^n + c`.

---

### **3. Tactic Stack**

- `refine`: To construct a witness for `IsIntegral`.
- `rw [...]`: Rewriting using lemmas (evaluation, algebra maps, arithmetic).
- `aesop` is *not* used here — the proofs are highly explicit and rely on `rw` and built-in simplifiers.
- `two_ne_zero`: A `decidable` proof used to justify `X^2 + 1` is monic.

---

### **4. Proof Logic**

- **Structure**:
  1. **Witness construction**: For `isIntegral_int_I`, construct the monic polynomial `X² + 1`.
  2. **Monic check**: Use `monic_X_pow_add_C _ two_ne_zero`.
  3. **Root verification**: Evaluate the polynomial at `I` using `eval₂` lemmas and simplify using algebraic facts (`I_sq`, arithmetic).
- **Tower argument**: For `isIntegral_rat_I`, lift integrality from `ℤ` to `ℚ` via the `tower_top` lemma (which states: if `R ⊆ S ⊆ T` and `x` is integral over `R`, then `x` is integral over `S` in the tower `R → S → T`).

---

### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.Analysis.Complex.Basic`: Provides `Complex.I`, basic complex arithmetic, and `I_sq`.
  - `Mathlib.RingTheory.IntegralClosure.IsIntegral.Basic`: Supplies `IsIntegral`, `tower_top`, and evaluation lemmas (`eval₂_*`).
- **Domain**: Algebraic number theory / commutative algebra over `ℂ`, focusing on integrality of algebraic numbers (here, `I`).

---

Let me know if you'd like a formalized comment block or a `docs` entry for this file.