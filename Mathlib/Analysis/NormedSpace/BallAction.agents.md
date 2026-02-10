### Technical Brief: Multiplicative Actions of Balls and Spheres in Normed Spaces

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `mulActionClosedBallBall` | `MulAction (closedBall (0 : 𝕜) 1) (ball (0 : E) r)` — Closed unit ball in base field acts on open ball centered at 0 in normed space. |
| `mulActionClosedBallClosedBall` | `MulAction (closedBall (0 : 𝕜) 1) (closedBall (0 : E) r)` — Closed unit ball acts on closed ball. |
| `mulActionSphereBall` | `MulAction (sphere (0 : 𝕜) 1) (ball (0 : E) r)` — Unit sphere acts on open ball via inclusion into closed ball. |
| `mulActionSphereClosedBall` | `MulAction (sphere (0 : 𝕜) 1) (closedBall (0 : E) r)` — Unit sphere acts on closed ball. |
| `mulActionSphereSphere` | `MulAction (sphere (0 : 𝕜) 1) (sphere (0 : E) r)` — Unit sphere acts on sphere of radius `r`. |
| `continuousSMul_*` (8 total) | `ContinuousSMul` instances for all above actions — ensures continuity of scalar multiplication. |
| `isScalarTower_*` (9 total) | `IsScalarTower` instances for combinations of closed balls, spheres, and balls over scalar towers (`𝕜 → 𝕜'`). |
| `instSMulCommClass_*` (8 total) | `SMulCommClass` instances ensuring scalar multiplications from `𝕜` and `𝕜'` commute on subsets. |
| `ne_neg_of_mem_sphere` | `r ≠ 0 → x ∈ sphere 0 r → x ≠ -x` — No nonzero point on a sphere is antipodal to itself. |
| `ne_neg_of_mem_unit_sphere` | `x ∈ sphere 0 1 → x ≠ -x` — Special case of above for unit sphere. |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `mulAction*`: Defines multiplicative action structure.
  - `continuousSMul*`: Ensures continuity of the action.
  - `isScalarTower*`: Encodes compatibility of scalar tower structure with actions.
  - `instSMulCommClass*`: Encodes commutativity of scalar actions.

- **Suffixes:**
  - `*_ball`, `*_closedBall`, `*_sphere`: Indicate domain/codomain types (open ball, closed ball, sphere).
  - `*_closedBall_closedBall_closedBall`, etc.: Order reflects source–source–target (e.g., `𝕜`-ball × `𝕜'`-ball × `E`-ball).

- **Structure:**
  - `closedBall (0 : 𝕜) 1`: Closed unit ball in normed field `𝕜`.
  - `sphere (0 : E) r`: Sphere of radius `r` centered at 0 in `E`.
  - `inclusion sphere_subset_closedBall`: Embeds unit sphere into closed unit ball.

---

#### **3. Tactic Stack**

- **Core tactics used repeatedly:**
  - `simp_rw`, `simpa`: Simplify using definitions (`mem_ball_zero_iff`, `mem_closedBall_zero_iff`, `norm_smul`, etc.).
  - `rw`: Rewrite using lemmas like `one_smul`, `mul_smul`, `smul_assoc`, `smul_comm`.
  - `exact`, `apply`, `intro`: Standard proof construction.
  - `conv_lhs => rw [...]`: Localized rewriting in complex expressions.
  - `subtype.ext`: Prove equality of subtype elements by equality of their underlying values.
  - `norm_nonneg`, `zero_le_one`, `one_pos`: Basic norm properties.

- **Notable absence:** No heavy automation like `aesop`, `linarith`, or `interval_cases` — proofs are mostly direct and computational.

---

#### **4. Proof Logic**

- **Structure of proofs:**
  - For each `MulAction`, `IsScalarTower`, or `SMulCommClass` instance:
    1. Define the action (`smul`) explicitly using scalar multiplication in `E`.
    2. Prove well-definedness (e.g., that the result lies in the target set) using norm inequalities:
       - `mul_lt_mul'` for open balls (strict inequality),
       - `mul_le_mul` for closed balls (non-strict inequality).
    3. Use `subtype.ext` to reduce equality of subtype elements to equality in the ambient space.
    4. Apply standard module axioms (`one_smul`, `mul_smul`, `smul_assoc`, `smul_comm`) to verify algebraic laws.

- **Continuity proofs:**
  - Use `continuous_subtype_val.fst'.smul continuous_subtype_val.snd'` to lift continuity from ambient space to subtypes.

- **Antipodal point lemmas:**
  - Use `self_eq_neg` and `ne_zero_of_mem_sphere` to derive contradiction if `x = -x` for nonzero `x` on a sphere.

---

#### **5. Imports & Scope**

- **Primary imports:**
  - `Mathlib.Analysis.Normed.Field.UnitBall`: Defines unit ball/sphere in normed fields.
  - `Mathlib.Analysis.Normed.Module.Basic`: Basic theory of normed modules/spaces.
  - `Mathlib.LinearAlgebra.Basis.VectorSpace`: Used for vector space structure (though not heavily in this file).

- **Scope:**
  - Focuses on **multiplicative actions** of subsets of a normed field (`closedBall 0 1`, `sphere 0 1`) on subsets of a normed space (`ball 0 r`, `closedBall 0 r`, `sphere 0 r`).
  - Extends to **scalar tower** and **commuting scalar class** settings for layered field extensions (`𝕜 → 𝕜'`).
  - Assumes `CharZero 𝕜` for antipodal point lemmas (to avoid characteristic 2 pathologies).

---

### Summary

This file formalizes foundational algebraic and topological properties of multiplicative actions of unit balls and spheres in normed fields on balls and spheres in normed spaces. It emphasizes **explicit constructions**, **norm-based verification**, and **compatibility with scalar towers**, laying groundwork for further study of symmetry, homogeneity, and group actions in analysis and geometry.