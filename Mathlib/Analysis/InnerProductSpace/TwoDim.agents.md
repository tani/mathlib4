Here is a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Oriented Two-Dimensional Real Inner Product Spaces**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `areaForm` (`ω`) | `E →ₗ[ℝ] E →ₗ[ℝ] ℝ` | Antisymmetric bilinear form representing oriented area; `ω x y = o.volumeForm ![x, y]`. |
| `rightAngleRotation` (`J`) | `E ≃ₗᵢ[ℝ] E` | Isometric automorphism squaring to `-1`; models 90° rotation in oriented plane. |
| `basisRightAngleRotation` | `(x : E) → x ≠ 0 → Basis (Fin 2) ℝ E` | For nonzero `x`, gives orthogonal basis `![x, J x]`. |
| `kahler` | `E →ₗ[ℝ] E →ₗ[ℝ] ℂ` | Complex-valued real-bilinear map: `kahler x y = ⟪x, y⟫ + ω x y • I`. Real part = inner product, imag. part = area form. |
| `rightAngleRotation_rightAngleRotation` | `J (J x) = -x` | Core identity: `J² = -Id`. |
| `nonneg_inner_and_areaForm_eq_zero_iff_sameRay` | `0 ≤ ⟪x, y⟫ ∧ ω x y = 0 ↔ SameRay ℝ x y` | Characterizes same-ray relation via nonnegative inner product and vanishing area form. |
| `kahler_mul` | `o.kahler x a * o.kahler a y = ‖a‖² * o.kahler x y` | Multiplicativity identity; key for angle definitions. |
| `Complex.areaForm`, `Complex.rightAngleRotation`, `Complex.kahler` | Concrete interpretations on `ℂ` | `ω w z = (conj w * z).im`, `J z = I * z`, `kahler w z = conj w * z`. |
| `areaForm_map_complex`, `rightAngleRotation_map_complex`, `kahler_map_complex` | Pullback formulas via orientation-preserving isometry to `ℂ` | Relate abstract constructions to complex plane model. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `areaForm`, `rightAngleRotation`, `kahler`: core geometric constructions.
  - `inner_`, `areaForm_`, `rightAngleRotation_`, `kahler_`: auxiliary lemmas about interactions.
- **Suffixes**:
  - `_left`, `_right`: indicate position of `J` or `ω` in bilinear forms (e.g., `⟪J x, y⟫`, `ω x (J y)`).
  - `_map`: pullback under isometry.
  - `_comp`: composition with linear isometry (often with positivity/determinant condition).
  - `_mul`, `_sq`, `_swap`: algebraic identities (e.g., `kahler_mul`, `inner_sq_add_areaForm_sq`).
- **Auxiliary definitions**:
  - `rightAngleRotationAux₁`, `rightAngleRotationAux₂`: intermediate steps in defining `J`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only`: for rewriting definitions (`areaForm_to_volumeForm`, `kahler_apply_apply`, etc.).
- `linear_combination`: for verifying bilinear identities (especially with `I`, `I_sq`, `Complex` arithmetic).
- `ring`: for algebraic simplification over `ℝ` or `ℂ`.
- `ext`: for extensionality (e.g., proving linear maps equal by testing on inputs).
- `rw`, `convert`, `trans`: for chaining equalities via intermediate terms.
- `cases'`, `fin_cases`: for case analysis on finite types (`Fin 2`, `Fin 0`, `Fin 1`).
- `norm_num`, `omega`: for numeric reasoning and linear arithmetic (e.g., in norm positivity arguments).
- ` positivity`: to discharge positivity goals (e.g., `‖x‖ > 0` when `x ≠ 0`).

---

#### **4. Proof Logic**

- **Structure of main constructions**:
  - `areaForm`: defined via volume form and alternating map curry/uncurry.
  - `rightAngleRotation`: built in two stages:
    1. `rightAngleRotationAux₁`: linear map defined via dual isomorphism + `ω`.
    2. `rightAngleRotationAux₂`: upgraded to isometry using norm estimates and orthogonal decomposition.
    3. Final `rightAngleRotation`: isometric equivalence using `Aux₂` and its square.
  - `kahler`: direct sum of inner product and area form, tensored into `ℂ`.

- **Common proof patterns**:
  - **Induction/extensionality**: Prove equalities of linear maps/bilinear forms by testing on basis elements (e.g., `basisRightAngleRotation`).
  - **Orthogonal decomposition**: Use `basisRightAngleRotation x hx` to reduce identities to 2D coordinate calculations.
  - **Determinant positivity**: For invariance under automorphisms, require `0 < det φ` to ensure orientation preservation.
  - **Complex reduction**: Prove abstract identities by mapping to `ℂ` via orientation-preserving isometry and using concrete formulas.

- **Key lemmas used repeatedly**:
  - `inner_rightAngleRotation_left/right`: relate `J` to `ω`.
  - `areaForm_rightAngleRotation_left/right`: express `ω(J x, y)` in terms of inner product.
  - `inner_mul_inner_add_areaForm_mul_areaForm` / `inner_mul_areaForm_sub`: bilinear algebraic identities enabling `kahler_mul` proof.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Analysis.InnerProductSpace.Dual`: for `toDual` isomorphism.
- `Mathlib.Analysis.InnerProductSpace.Orientation`: for `orientation`, `volumeForm`, `map`.
- `Mathlib.Data.Complex.FiniteDimensional`: for `finrank ℂ over ℝ = 2`.
- `Mathlib.Data.Complex.Orientation`: for `Complex.orientation`.
- `Mathlib.Tactic.LinearCombination`: for symbolic manipulation of bilinear forms.

**Scope & Notation**:
- Scoped notation: `local notation "ω" => o.areaForm`, `local notation "J" => o.rightAngleRotation`.
- Noncomputable section: constructions rely on choice (e.g., volume form normalization).
- Uses `Fact (finrank ℝ E = 2)` to enforce 2-dimensionality.

---

This summary captures the formal structure, naming discipline, proof methodology, and dependencies essential for building domain-specific AI agents targeting geometric reasoning in 2D oriented inner product spaces.