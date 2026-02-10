### Technical Brief: `Complex.UnitDisc` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `UnitDisc` | `Type := ball (0 : ℂ) 1` | The open unit disc in ℂ, defined as the set `{ z : ℂ | ‖z‖ < 1 }`. |
| `𝔻` | Notation for `UnitDisc` | Shorthand for the unit disc. |
| `mk` | `z : ℂ → abs z < 1 → 𝔻` | Constructor: builds an element of `𝔻` from a complex number with `|z| < 1`. |
| `coe` | `𝔻 → ℂ` | Inclusion map (coercion) from disc to ℂ. |
| `abs_lt_one` | `z : 𝔻 → |z| < 1` | Extracts the defining inequality of the disc. |
| `normSq_lt_one` | `z : 𝔻 → normSq z < 1` | Uses `|z| < 1` to derive `|z|² < 1`. |
| `conj` | `𝔻 → 𝔻` | Complex conjugation restricted to the disc (well-defined since `|z| = |conj z|`). |
| `re`, `im` | `𝔻 → ℝ` | Real and imaginary parts, inherited from ℂ. |
| `coe_mul` | `↑(z * w) = (z * w : ℂ)` | Coercion commutes with multiplication. |
| `coe_smul_circle`, `coe_smul_closedBall` | `↑(z • w) = (z * w : ℂ)` | Coercion commutes with scalar multiplication by `Circle` or `closedBall`. |
| `conj_conj`, `conj_mul`, `re_conj`, `im_conj` | Various identities | Conjugation behaves as expected on disc elements. |
| `instCommSemigroup`, `instSemigroupWithZero`, `instSMulCommClass_*`, `circleAction`, `closedBallAction` | Instance declarations | Endows `𝔻` with algebraic and action structures inherited from ℂ and metric actions. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `coe_`: coercion-related lemmas (e.g., `coe_mul`, `coe_zero`, `coe_conj`).
  - `mk_`: constructor-related lemmas (e.g., `mk_coe`, `mk_neg`).
  - `conj_`: conjugation lemmas (e.g., `conj_conj`, `conj_mul`, `re_conj`, `im_conj`).
  - `abs_`, `normSq_`: inequalities involving modulus or squared norm.
  - `ne_`: proofs of inequality (e.g., `coe_ne_one`, `one_add_coe_ne_zero`).

- **Suffixes**:
  - `_circle`, `_closedBall`: denote actions/scalar multiplication by `Circle` or `closedBall`.
  - `_inj`, `_eq_iff`: injectivity or equivalence lemmas (e.g., `coe_injective`, `coe_eq_zero`).

- **Special notation**:
  - `conj'` = `starRingEnd ℂ` (complex conjugation as a ring endomorphism).
  - `𝔻` = `Complex.UnitDisc`.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `unfold`, `infer_instance`, `convert`, `rw`, `simp`, ` rfl`, `exact`, `apply`, `intro`, `cases`.
- **Domain-specific tactics**:
  - `simp_rw` (via `simp` + `rw` patterns).
  - `aesop` (not explicitly used here, but likely available for automation).
  - `ring` (for commutative ring reasoning, implicit in `mul_left_comm`, etc.).
  - `Subtype.eta` (used in `mk_coe` proof).
  - `ne_of_apply_ne`, `mt`, `neg_eq_iff_add_eq_zero` (for inequality reasoning).

---

#### **4. Proof Logic & Strategy**

- **Structure**:
  - Definitions are mostly *computational* (e.g., `mk`, `conj`, `re`, `im`) and rely on coercion (`coe`) to ℂ.
  - Proofs often reduce to properties in ℂ via `coe_injective` or `coe_injective.eq_iff'`.
  - For algebraic properties (e.g., `conj_mul`, `conj_conj`), proofs use:
    - `Subtype.ext` to lift equalities from ℂ to `𝔻`.
    - `map_*` lemmas (e.g., `map_mul`, `map_conj`) for homomorphism behavior.
  - Inequality lemmas (`abs_lt_one`, `normSq_lt_one`, `abs_ne_one`) use:
    - `mem_ball_zero_iff` to translate between metric and modulus conditions.
    - `Real.sqrt_lt'`, `one_pow`, `abs.map_neg`, etc.

- **Induction**: Not used (no inductive types involved).
- **Case analysis**: Minimal; mostly on equality/inequality hypotheses.

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.Complex.Circle` | Defines `Circle` (unit circle in ℂ), `starRingEnd ℂ`, and related actions. |
| `Mathlib.Analysis.NormedSpace.BallAction` | Provides `mulActionSphereBall`, `mulActionClosedBallBall`, and scalar tower/comm class instances for balls under multiplication. |

**Key dependencies**:
- `Metric.ball`, `Subtype`, `Function`, `Set`, `Ring`, `NormedField`, `MulAction`, `SMulCommClass`, `IsScalarTower`.
- `Complex.re`, `Complex.im`, `Complex.abs`, `Complex.normSq`, `Complex.conj`.

---

### Summary

This module formalizes the **open unit disc** `𝔻` in ℂ as a subtype, equips it with inherited algebraic structure (semigroup, zero, conjugation), and defines actions by the circle and closed unit ball. Proofs rely heavily on coercion to ℂ and lifting properties via `coe_injective`. The design emphasizes compatibility with existing `Mathlib` structures (e.g., `MulAction`, `SMulCommClass`) and avoids redundant `norm_cast` lemmas.