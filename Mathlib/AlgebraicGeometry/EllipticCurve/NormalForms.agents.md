### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `IsCharNeTwoNF` | `class` | Asserts $a_1 = a_3 = 0$, i.e., curve is $Y^2 = X^3 + a_2X^2 + a_4X + a_6$ (char ≠ 2). |
| `IsShortNF` | `class` | Asserts $a_1 = a_2 = a_3 = 0$, i.e., curve is $Y^2 = X^3 + a_4X + a_6$ (char ≠ 2,3 or char=3, j=0). |
| `IsCharThreeJNeZeroNF` | `class` | Asserts $a_1 = a_3 = a_4 = 0$, i.e., $Y^2 = X^3 + a_2X^2 + a_6$ (char=3, j≠0). |
| `IsCharThreeNF` | `inductive class` | Disjunction of `IsCharThreeJNeZeroNF` and `IsShortNF` (char=3). |
| `IsCharTwoJNeZeroNF` | `class` | Asserts $a_1 = 1, a_3 = a_4 = 0$, i.e., $Y^2 + XY = X^3 + a_2X^2 + a_6$ (char=2, j≠0). |
| `IsCharTwoJEqZeroNF` | `class` | Asserts $a_1 = a_2 = 0$, i.e., $Y^2 + a_3Y = X^3 + a_4X + a_6$ (char=2, j=0). |
| `IsCharTwoNF` | `inductive class` | Disjunction of `IsCharTwoJNeZeroNF` and `IsCharTwoJEqZeroNF` (char=2). |
| `toCharNeTwoNF` | `def` | Explicit variable change to `IsCharNeTwoNF`, assuming `Invertible 2`. |
| `toShortNF` | `def` | Explicit variable change to `IsShortNF`, assuming `Invertible 2` and `Invertible 3`. |
| `toShortNFOfCharThree` | `def` | Variable change to `IsShortNF` in char 3 when $b_2 = 0$ (i.e., $j = 0$). |
| `toCharThreeNF` | `def` | Variable change to `IsCharThreeNF`, splitting on $b_2 = 0$ or not. |
| `toCharTwoJEqZeroNF` | `def` | Variable change to `IsCharTwoJEqZeroNF` in char 2 when $a_1 = 0$ (i.e., $j = 0$). |
| `toCharTwoJNeZeroNF` | `def` | Variable change to `IsCharTwoJNeZeroNF` in char 2 when $a_1 ≠ 0$ (i.e., $j ≠ 0$). |
| `toCharTwoNF` | `def` | Case analysis on $a_1 = 0$ to get `IsCharTwoNF`. |
| `exists_variableChange_isCharNeTwoNF`, `exists_variableChange_isShortNF`, etc. | `thm` | Existence of variable changes to respective normal forms under stated hypotheses. |
| `j_of_isShortNF`, `j_of_isCharThreeJNeZeroNF_of_char_three`, etc. | `thm` | Simplified formulas for the $j$-invariant in each normal form. |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `is_`: Typeclass names (`IsCharNeTwoNF`, `IsShortNF`, etc.).
  - `to_`: Functions constructing explicit variable changes (`toCharNeTwoNF`, `toShortNF`, etc.).
  - `of_`: Constructors or lemmas tied to specific cases (`of_j_ne_zero`, `of_j_eq_zero`, `of_char_three`, etc.).
- **Suffixes**:
  - `_spec`: Proof that the constructed variable change lands in the desired normal form (`toCharNeTwoNF_spec`, `toShortNF_spec`, etc.).
  - `_of_char_*`: Specializations for fixed characteristic (e.g., `b₂_of_isCharNeTwoNF_of_char_three`, `j_of_isShortNF_of_char_three`).
  - `_ne_zero` / `_eq_zero`: Indicate conditions on $j$-invariant or $b_2$ (e.g., `IsCharThreeJNeZeroNF`, `toShortNFOfCharThree_spec_of_b₂_eq_zero`).

#### 3. **Tactic Stack**

- **Core simplification & algebra**:
  - `simp`, `simp_rw`
  - `ring`, `ring1`
- **Characteristic arithmetic**:
  - `linear_combination` (used heavily to exploit `CharP R p` hypotheses, e.g., $p \cdot x = 0$)
- **Field-specific reasoning**:
  - `field_simp`, `div_eq_div_iff`, `div_ne_zero_iff`
- **Case analysis & decidability**:
  - `by_cases`, `if ... then ... else ...` (`dif_pos`, `dif_neg`)
- **Inductive type handling**:
  - `cases` (for `IsCharThreeNF`, `IsCharTwoNF`)
- **Typeclass inference**:
  - `infer_instance`, `haveI`, `letI`

#### 4. **Proof Logic**

- **Structure**:
  - **Case analysis** on characteristic (2, 3, ≠2, ≠2,3) and $j$-invariant ($j = 0$ vs $j ≠ 0$).
  - For each case:
    1. Define a normal form via typeclass.
    2. Derive simplified formulas for invariants ($b_i, c_i, \Delta, j$) using `simp` + `linear_combination`.
    3. Construct explicit `VariableChange`s (often compositions of simpler ones).
    4. Prove correctness (`_spec`) via `simp` + `ring` + `linear_combination`.
- **Key reasoning patterns**:
  - Use of `Invertible p` to divide by $p$ (e.g., $⅟2$, $⅟3$).
  - Exploitation of `CharP R p` to reduce coefficients modulo $p$ (e.g., $4 = 1$ in char 3, $2 = 0$ in char 2).
  - For $j$-invariant formulas: reduce to known expressions, then simplify using invertibility of denominator (from elliptic curve assumption $\Delta ≠ 0$).

#### 5. **Imports**

- `Mathlib.AlgebraicGeometry.EllipticCurve.VariableChange`: Core infrastructure for change of variables on Weierstrass curves.
- `Mathlib.Algebra.CharP.Defs`: Characteristic $p$ arithmetic, especially `CharP`, `Cast_eq_zero`, etc.

---

This module formalizes the classification of elliptic curves over arbitrary commutative rings/fields via normal forms, heavily leveraging characteristic-specific simplifications and explicit change-of-variable constructions. The structure is modular, with each normal form isolated in its own section, and proofs follow a consistent pattern of case analysis, simplification, and constructive existence.