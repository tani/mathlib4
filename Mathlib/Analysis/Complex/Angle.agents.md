### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `angle_eq_abs_arg` | `x ≠ 0 → y ≠ 0 → angle x y = |(x / y).arg|` | Relates Euclidean angle between nonzero complex numbers to the absolute value of the argument of their quotient. |
| `angle_one_left` | `y ≠ 0 → angle 1 y = |y.arg|` | Special case of `angle_eq_abs_arg` with first argument `1`. |
| `angle_one_right` | `x ≠ 0 → angle x 1 = |x.arg|` | Special case of `angle_eq_abs_arg` with second argument `1`. |
| `angle_mul_left` | `a ≠ 0 → angle (a * x) (a * y) = angle x y` | Invariance of angle under left-multiplication by a nonzero complex number. |
| `angle_mul_right` | `a ≠ 0 → angle (x * a) (y * a) = angle x y` | Invariance of angle under right-multiplication by a nonzero complex number. |
| `angle_div_left_eq_angle_mul_right` | `angle (x / a) y = angle x (y * a)` | Equivalence between division on left and multiplication on right. |
| `angle_div_right_eq_angle_mul_left` | `angle x (y / a) = angle (x * a) y` | Equivalence between division on right and multiplication on left. |
| `angle_exp_exp` | `angle (exp (x * I)) (exp (y * I)) = |toIocMod (2π) (-π) (x - y)|` | Angle between two unit complex exponentials equals the modulated difference of angles. |
| `angle_exp_one` | `angle (exp (x * I)) 1 = |toIocMod (2π) (-π) x|` | Special case of `angle_exp_exp` with second argument `1`. |
| `norm_sub_mem_Icc_angle` | `‖x‖ = 1 → ‖y‖ = 1 → ‖x - y‖ ∈ [2/π * angle x y, angle x y]` | Bounds chord length between unit complex numbers in terms of arc length (angle). |
| `norm_sub_le_angle` | `‖x‖ = 1 → ‖y‖ = 1 → ‖x - y‖ ≤ angle x y` | Chord length ≤ arc length. |
| `mul_angle_le_norm_sub` | `‖x‖ = 1 → ‖y‖ = 1 → 2/π * angle x y ≤ ‖x - y‖` | Arc length ≤ (π/2) × chord length (rearranged). |
| `angle_le_mul_norm_sub` | `‖x‖ = 1 → ‖y‖ = 1 → angle x y ≤ π/2 * ‖x - y‖` | Arc length ≤ (π/2) × chord length. |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `angle_`: for angle-related lemmas.
  - `norm_sub_`: for chord-length (Euclidean distance) lemmas.
- **Suffixes**:
  - `_left`, `_right`: indicate which argument is fixed or transformed (e.g., `angle_one_left`, `angle_mul_right`).
  - `_eq_`: for equalities (e.g., `angle_eq_abs_arg`, `angle_div_left_eq_angle_mul_right`).
  - `_mem_Icc_`: for membership in an interval (e.g., `norm_sub_mem_Icc_angle`).
- **Structure**:
  - `angle_*` lemmas often use `angle_eq_abs_arg` as a core simplification.
  - `norm_sub_*` lemmas rely on `norm_sub_mem_Icc_angle` as a master bound.

#### 3. **Tactic Stack**

- **Core tactics**:
  - `simp`, `rw`, `field_simp`, `ring`, `linarith`, `linear_combination`
- **Specialized/Advanced**:
  - `wlog` (without loss of generality) — used in `norm_sub_mem_Icc_angle`
  - `convert`, `exact`, `gcongr`, `norm_cast`
  - `aesop` not used here; proof is mostly manual and arithmetic-heavy.
  - `Ioc_subset_Icc_self`, `toIocMod_eq_self` — for handling interval-modulo reasoning.

#### 4. **Proof Logic**

- **General Strategy**:
  - Reduce to simpler cases using invariance properties (`angle_mul_left`, `angle_div_*`).
  - Use polar representation (`exp_mul_I`, `arg_exp_mul_I`) for unit complex numbers.
  - For `norm_sub_mem_Icc_angle`, apply *without loss of generality* to reduce to `y = 1`, then parametrize `x = exp(I * θ)`.
  - Prove double inequality via bounding trigonometric expressions (`cos`, `sin`) using elementary inequalities:
    - `Real.cos_le_one_sub_mul_cos_sq`
    - `Real.one_sub_sq_div_two_le_cos`
    - `Real.cos_sq_add_sin_sq`
- **Induction**: Not used.
- **Case analysis**: Used in `angle_mul_left` (`eq_or_ne x 0`, `eq_or_ne y 0`).
- **Field simplification**: Heavy use of `field_simp` and `div_ne_zero` for nonzero assumptions.

#### 5. **Imports**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.SpecialFunctions.Trigonometric.Bounds` | Provides trigonometric inequalities (e.g., `cos_le_one_sub_mul_cos_sq`, `one_sub_sq_div_two_le_cos`). |
| `Mathlib.Geometry.Euclidean.Angle.Unoriented.Basic` | Defines `angle` in the Euclidean context (for ℂ as ℝ²), and basic properties like symmetry, invariance under scaling. |

#### Summary

This file bridges complex analysis (argument, exponential map) with Euclidean geometry (angle, chord/arc distances). It establishes precise equivalence between arc-length (angle) and chord-length (norm difference) for unit complex numbers, up to constants `2/π` and `π/2`. The proofs rely on trigonometric bounds, modular reduction of angles (`toIocMod`), and algebraic simplifications using field and ring tactics.