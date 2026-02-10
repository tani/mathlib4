### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**
| Name | Type | Purpose |
|------|------|---------|
| `Complex.cot_eq_exp_ratio` | `∀ z : ℂ, cot z = (exp (2 * I * z) + 1) / (I * (1 - exp (2 * I * z)))` | Expresses the complex cotangent function as a rational function of the exponential function. |
| `Complex.cot_pi_eq_exp_ratio` | `∀ z : ℂ, cot (π * z) = (exp (2 * π * I * z) + 1) / (I * (1 - exp (2 * π * I * z)))` | Scaled version of the above, convenient for modular/elliptic contexts (e.g., Fourier expansions). |
| `pi_mul_cot_pi_q_exp` | `∀ z : ℍ, π * cot (π * z) = π * I - 2 * π * I * ∑' n : ℕ, exp (2 * π * I * z)^n` | Series expansion of `π * cot(π * z)` on the upper half-plane `ℍ`, using the geometric series; key for modular forms and Eisenstein series computations. |

#### 2. **Naming Conventions**
- **Prefixes**:
  - `Complex.`: Indicates definitions/lemmas about complex functions.
  - `pi_` / `π_`: Signals involvement of `π`, especially in scaled arguments (e.g., `cot (π * z)`).
- **Suffixes**:
  - `_eq_exp_ratio`: Denotes equality to a ratio of exponentials.
  - `_q_exp`: Suggests a *q-expansion* (Fourier series in `q = exp(2πi z)`), as in modular forms literature.
- **Variables**:
  - `z : ℂ` or `z : ℍ`: `ℍ` denotes the upper half-plane (via `UpperHalfPlane` typeclass).
  - `I`: Standard notation for `Complex.I`.

#### 3. **Tactic Stack**
- `rw`: Rewriting using definitions (`Complex.cot`, `Complex.sin`, `Complex.cos`) and lemmas.
- `field_simp`: Simplifying field expressions (division, nonzero denominators).
- `simp only [...]`: Targeted simplification with explicit lemmas (e.g., `mul_one`, `add_left_inj`).
- `ring_nf`: Normalizing ring expressions (especially after applying exponential identities).
- `tsum_geometric_of_norm_lt_one`: Used to justify convergence and evaluate infinite sums of geometric series.
- `geom_series_mul_one_add`: Applies the closed-form for geometric series.
- `ring`: Final simplification of algebraic expressions.

#### 4. **Proof Logic**
- **Strategy**: 
  1. Expand `cot` via its definition in terms of `sin` and `cos`.
  2. Simplify using exponential identities (`exp_add`, `exp_neg`).
  3. Factor and rearrange to isolate the geometric series structure.
  4. For the series expansion (`pi_mul_cot_pi_q_exp`):
     - Use the exponential ratio form.
     - Factor out `1 / (1 - q)` where `q = exp(2πi z)`.
     - Apply geometric series convergence (justified by `UpperHalfPlane.abs_exp_two_pi_I_lt_one`, which uses `‖q‖ < 1` for `z ∈ ℍ`).
     - Simplify the resulting expression algebraically.

#### 5. **Imports**
- `Mathlib.Analysis.Complex.UpperHalfPlane.Exp`: Provides:
  - `Complex.exp` properties.
  - `UpperHalfPlane.abs_exp_two_pi_I_lt_one`: Key lemma ensuring `|exp(2πi z)| < 1` for `z` in the upper half-plane.
  - Tools for working with the upper half-plane (`ℍ`) and its topology.

---

**Domain Context**: This file supports modular forms and complex analysis on the upper half-plane, particularly expansions involving `cot(πz)` which appear in Eisenstein series, Dedekind eta function identities, and elliptic function theory.