### Technical Brief: Isometries of the Complex Plane (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `rotation` | `Circle →* ℂ ≃ₗᵢ[ℝ] ℂ` | Maps a unit complex number (element of the circle) to the linear isometry given by multiplication (rotation). |
| `rotation_apply` | `rotation a z = a * z` | Specifies the action of `rotation a` on a complex number. |
| `rotation_symm` | `(rotation a).symm = rotation a⁻¹` | Describes the inverse of a rotation. |
| `rotation_trans` | `(rotation a).trans (rotation b) = rotation (b * a)` | Composition law for rotations (note reversed order due to contravariance of `trans`). |
| `rotation_ne_conjLIE` | `rotation a ≠ conjLIE` | Shows no rotation equals complex conjugation. |
| `rotationOf` | `ℂ ≃ₗᵢ[ℝ] ℂ → Circle` | Extracts the rotation parameter from a linear isometry that fixes 0 and acts as rotation on 1. |
| `rotationOf_rotation` | `rotationOf (rotation a) = a` | Left-inverse property, used to prove injectivity of `rotation`. |
| `rotation_injective` | `Function.Injective rotation` | Follows from `rotationOf_rotation`. |
| `LinearIsometry.re_apply_eq_re_of_add_conj_eq` | `(∀ z, z + conj z = f z + conj (f z)) → (f z).re = z.re` | Technical lemma linking real parts via trace-like condition. |
| `LinearIsometry.im_apply_eq_im_or_neg_of_re_apply_eq_re` | `(∀ z, (f z).re = z.re) → (f z).im = ± z.im` | After fixing real part, imaginary part must be preserved or negated. |
| `LinearIsometry.im_apply_eq_im` | `f 1 = 1 → z + conj z = f z + conj (f z)` | Shows that if `f` fixes 1, then it preserves `z + conj z`. |
| `LinearIsometry.re_apply_eq_re` | `f 1 = 1 → (f z).re = z.re` | If `f` fixes 1, then it preserves real parts. |
| `linear_isometry_complex_aux` | `f 1 = 1 → f = id ∨ f = conjLIE` | Classification of linear isometries fixing 1: only identity or conjugation. |
| `linear_isometry_complex` | `∃ a : Circle, f = rotation a ∨ f = conjLIE.trans (rotation a)` | Main classification theorem: every linear isometry is either a rotation or conjugation followed by a rotation. |
| `toMatrix_rotation` | Matrix of `rotation a` w.r.t. standard basis = `[[re a, -im a], [im a, re a]]` | Connects geometric rotation to its matrix representation. |
| `det_rotation` | `det (rotation a) = 1` | Rotations have determinant 1 (orientation-preserving). |
| `linearEquiv_det_rotation` | `LinearEquiv.det (rotation a) = 1` | Same as above, but for determinant as a linear equivalence. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `rotation_`: Pertains to the `rotation` map and its properties.
  - `linear_isometry_`: Pertains to general linear isometries (e.g., `linear_isometry_complex_aux`).
  - `re_`, `im_`: Real/imaginary part related lemmas.
  - `det_`, `linearEquiv_det_`: Determinant variants for linear maps vs. equivalences.

- **Suffixes**:
  - `_apply`: Action on elements (e.g., `rotation_apply`).
  - `_symm`: Inverse behavior (e.g., `rotation_symm`).
  - `_trans`: Composition behavior (e.g., `rotation_trans`).
  - `_of_`: Extraction or restriction (e.g., `rotationOf`, `re_apply_eq_re_of_add_conj_eq`).
  - `_or_neg`: Disjunction in classification (e.g., `im_apply_eq_im_or_neg_of_re_apply_eq_re`).

- **Special**:
  - `conjLIE`: Abbreviation for *complex conjugation as a linear isometry equivalence* (`ℂ ≃ₗᵢ[ℝ] ℂ`).
  - `planeConformalMatrix`: Standard 2×2 real matrix representing complex multiplication.

---

#### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Role |
|--------|------|
| `simp` / `simp only` | Simplification using definitional equalities, especially for `Complex`, `Circle`, `abs`, `norm`, `conj`. |
| `rw` / `rwa` | Rewriting using lemmas or hypotheses; often with `at` to rewrite in hypotheses. |
| `ext` / `ext1` | Extensionality for functions, linear maps, equivalences. |
| `apply_fun` | Applies a function to both sides of an equation (e.g., squaring). |
| `congr` / `LinearIsometryEquiv.ext` | Proving equality of isometries via pointwise equality. |
| `fin_cases` | Case analysis on finite types (`fin 2`, `bool`, etc.). |
| `ring` / `linarith` | Not explicitly used here, but `simp` handles algebraic simplifications. |
| `exact`, `refine`, `intro` | Standard proof construction. |
| `have`, `suffices` | Intermediate lemma introduction. |
| `show`, `have h : ... := ...` | Explicitly constructing intermediate facts. |

---

#### **4. Proof Logic**

The logical flow of the main classification proof (`linear_isometry_complex`) is:

1. **Normalization step**: For any `f : ℂ ≃ₗᵢ[ℝ] ℂ`, define `a := f 1` (normalized to lie on the unit circle).
2. **Reduction to fixed-point case**: Consider `g := f.trans (rotation a)⁻¹`, which satisfies `g 1 = 1`.
3. **Apply `linear_isometry_complex_aux`**: This yields `g = id` or `g = conjLIE`.
4. **Reconstruct `f`**:
   - If `g = id`, then `f = rotation a`.
   - If `g = conjLIE`, then `f = conjLIE.trans (rotation a)`.
5. **Auxiliary lemmas**:
   - First show `f 1 = 1 ⇒ (f z).re = z.re` (`re_apply_eq_re`).
   - Then show `f I = ± I` (`h0` in `linear_isometry_complex_aux`).
   - Use basis extension (`basisOneI.ext'`) to conclude `f = id` or `f = conjLIE`.

The proof leverages:
- **Complex structure**: `ℂ` as a 2D real vector space with basis `[1, I]`.
- **Isometry properties**: Preservation of norm ⇒ preservation of inner product ⇒ algebraic constraints.
- **Unit circle parametrization**: Every unit-norm complex number defines a rotation.

---

#### **5. Imports & Scope**

| Import | Purpose |
|--------|---------|
| `Mathlib.Analysis.Complex.Circle` | Defines `Circle`, unit sphere in `ℂ`, `abs`, norm properties. |
| `Mathlib.LinearAlgebra.Determinant` | Determinant theory for linear maps. |
| `Mathlib.LinearAlgebra.Matrix.GeneralLinearGroup.Basic` | Basic facts about `GL(n, R)`, linear equivalences, determinants. |

**Additional context**:
- `noncomputable section`: Required due to use of `Complex.abs`, `norm`, etc., which rely on classical choice.
- `open Complex`, `open CharZero`, `open ComplexConjugate`: Bring key operations (`conj`, `re`, `im`, `abs`) and assumptions (e.g., `2 ≠ 0`) into scope.
- `local notation "|" x "|" => Complex.abs x`: Shorthand for absolute value.

---

#### **6. Summary**

This file formalizes the classification of **linear** (i.e., origin-fixing) isometries of the complex plane: they are precisely the rotations (parameterized by `Circle`) and rotations composed with complex conjugation. The proof is constructive and leverages the algebraic structure of `ℂ` as a 2D real inner product space. Key innovations include:
- Parametrizing rotations via unit complex numbers.
- Reducing the general case to the fixed-point case (`f(1) = 1`) via normalization.
- Using basis extension (`basisOneI.ext'`) to lift pointwise behavior to full equality.

The result is foundational for geometry over `ℂ`, with implications for conformal mappings, crystallography, and quantum mechanics.