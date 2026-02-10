Here's a structured technical metadata extraction from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `WeierstrassCurve.exists_variableChange_of_j_eq` | `∀ (E E' : WeierstrassCurve F) [_IsElliptic] [_IsElliptic'], E.j = E'.j → ∃ C, E.variableChange C = E'` | Main theorem: Elliptic curves over a separably closed field with equal `j`-invariants are isomorphic via a change of variables. |
| `WeierstrassCurve.exists_variableChange_of_char_two` | `E.j = E'.j → ∃ C, E.variableChange C = E'` (under `CharP F 2`) | Handles characteristic 2 case by splitting into `j ≠ 0` and `j = 0` normal forms. |
| `WeierstrassCurve.exists_variableChange_of_char_two_of_j_ne_zero` | `E.a₆ = E'.a₆ → ∃ C, E.variableChange C = E'` (under `CharP F 2`, both in `IsCharTwoJNeZeroNF`) | Constructive change of variables when `j ≠ 0`. |
| `WeierstrassCurve.exists_variableChange_of_char_two_of_j_eq_zero` | `∃ C, E.variableChange C = E'` (under `CharP F 2`, both in `IsCharTwoJEqZeroNF`) | Constructive change of variables when `j = 0`. |
| `WeierstrassCurve.exists_variableChange_of_char_three` | `E.j = E'.j → ∃ C, E.variableChange C = E'` (under `CharP F 3`) | Handles characteristic 3 case similarly. |
| `WeierstrassCurve.exists_variableChange_of_char_three_of_j_ne_zero` | `E.j = E'.j → ∃ C, E.variableChange C = E'` (under `CharP F 3`, both in `IsCharThreeJNeZeroNF`) | Constructive for `j ≠ 0`. |
| `WeierstrassCurve.exists_variableChange_of_char_three_of_j_eq_zero` | `∃ C, E.variableChange C = E'` (under `CharP F 3`, both in `IsShortNF`) | Constructive for `j = 0`. |
| `WeierstrassCurve.exists_variableChange_of_char_ne_two_or_three` | `p ≠ 2, p ≠ 3, E.j = E'.j → ∃ C, E.variableChange C = E'` | Handles all other characteristics (≥5 or 0). |

**Auxiliary lemmas** include:
- `variableChange_j`: compatibility of `j`-invariant with change of variables.
- `j_of_isCharTwoJNeZeroNF_of_char_two`, `j_of_isCharTwoJEqZeroNF_of_char_two`, etc.: explicit formulas for `j` in each normal form.
- `Δ_of_isCharTwoJNeZeroNF_of_char_two`, `Δ_of_isShortNF_of_char_three`, etc.: discriminant formulas used to ensure non-vanishing.

---

### **2. Naming Conventions**

- **Prefixes**:
  - `exists_variableChange_`: indicates existence of a variable change yielding isomorphism.
  - `of_char_*`: case distinction by characteristic (e.g., `of_char_two`, `of_char_three`).
  - `of_j_*`: case distinction by `j = 0` or `j ≠ 0`.
  - `of_*NF`: refers to specific normal forms (`IsCharTwoJNeZeroNF`, `IsShortNF`, etc.).
- **Suffixes**:
  - `_ne_zero`, `_eq_zero`: distinguishes cases based on `j`-invariant or coefficients.
- **Variable names**:
  - `C`, `C'`, `C''`: variable changes.
  - `u`, `s`, `t`, `r`: parameters for variable changes (often roots or units).
  - `heq`, `hchar2`, `hchar3`: hypotheses for equality or characteristic.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `obtain ⟨...⟩ := ...` | Extract witnesses from existential statements (e.g., roots via `IsSepClosed.exists_root_...`). |
| `rw [...] at heq` | Rewrite hypotheses using definitions (e.g., `j`, `Δ`, normal form formulas). |
| `simp_rw [...]` | Simplify with rewrite rules (especially for `variableChange_aᵢ`, `j`, `Δ`). |
| `field_simp` | Simplify field expressions (division, inverses). |
| `linear_combination ...` | Solve linear identities (often with `CharP.cast_eq_zero`). |
| `ring1`, `ring` | Simplify polynomial identities. |
| `ext` | Extensionality for `WeierstrassCurve` (equality of coefficients). |
| `cases` / `obtain ... | ...` | Case splits on normal forms (`IsCharTwoNF`, `IsShortNF`, etc.). |
| `wlog` | Without loss of generality (used to assume both curves are in short Weierstrass form). |
| `norm_num1`, `norm_num` | Normalize numeric literals in characteristic `p`. |
| `nontriviality`, `ne_of_gt`, `ne_of_lt` | Prove non-zero-ness of numerals (e.g., `3 ≠ 0`, `4 ≠ 0`). |

---

### **4. Proof Logic**

The proof proceeds by **case analysis on the characteristic** of the field `F`:

1. **Characteristic 2**:
   - Reduce both curves to normal forms (`IsCharTwoJNeZeroNF` or `IsCharTwoJEqZeroNF`) via `exists_variableChange_isCharTwoNF`.
   - If both are in `j ≠ 0` form, use coefficient equality (`E.a₆ = E'.a₆`) to construct change of variables.
   - If both are in `j = 0` form, construct change using solvability of certain Artin–Schreier-type equations (via `IsSepClosed.exists_root_...`).
   - Mixed cases lead to contradiction (e.g., `j ≠ 0 = j = 0`).

2. **Characteristic 3**:
   - Similar strategy: reduce to `IsCharThreeJNeZeroNF` or `IsShortNF`.
   - Use separable closedness to extract roots for scaling and translation parameters.

3. **Other characteristics (≥5 or 0)**:
   - Reduce both curves to short Weierstrass form (`IsShortNF`) using `exists_variableChange_isShortNF`.
   - Use equality of `j`-invariants to derive relation `E.a₄³ * E'.a₆² = E'.a₄³ * E.a₆²`.
   - Split into subcases:
     - `E.a₄ = 0` ⇒ `E'.a₄ = 0`, then scale using 6th root of `E.a₆ / E'.a₆`.
     - `E.a₆ = 0` ⇒ `E'.a₆ = 0`, then scale using 4th root of `E.a₄ / E'.a₄`.
     - Otherwise, construct `u` such that `u⁴ = E.a₄ / E'.a₄` and `u⁶ = E.a₆ / E'.a₆` (possible due to separably closedness and relation above).

In all cases, the change of variables is built from:
- `u ∈ Fˣ` (scaling of `x`),
- `s ∈ F` (translation of `x`),
- `t ∈ F` (translation of `y`),
- combined via `VariableChange.mk u s t r` (with `r` often zero in these cases).

---

### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.AlgebraicGeometry.EllipticCurve.NormalForms` | Defines Weierstrass curves, normal forms (`IsCharTwoJNeZeroNF`, `IsShortNF`, etc.), `j`-invariant, discriminant, and variable changes. |
| `Mathlib.FieldTheory.IsSepClosed` | Provides `IsSepClosed` class and lemmas like `exists_root_...`, `exists_pow_nat_eq`, essential for solving equations in separably closed fields. |

---

Let me know if you'd like a diagram of the proof structure or a summary of how `VariableChange` and `variableChange` are defined in the imports.