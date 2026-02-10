### Technical Metadata Brief: Liouville’s Theorem in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `deriv_eq_smul_circleIntegral` | `{R : ℝ} {c : ℂ} {f : ℂ → F}`<br>`0 < R → DiffContOnCl ℂ f (ball c R) → deriv f c = (2 * π * I)⁻¹ • ∮ z ∈ C(c, R), (z - c)^(-2) • f z` | Cauchy integral formula for the derivative of a complex-differentiable function on a disc closure. |
| `norm_deriv_le_aux` | `{c : ℂ} {R C : ℝ} {f : ℂ → F}`<br>`0 < R → DiffContOnCl ℂ f (ball c R) → (∀ z ∈ sphere c R, ‖f z‖ ≤ C) → ‖deriv f c‖ ≤ C / R` | Bounds the norm of the derivative at the center of a disc by the sup-norm on the boundary divided by radius. |
| `norm_deriv_le_of_forall_mem_sphere_norm_le` | Same as above, but uses `e ∘ f` embedding into completion to reduce to `norm_deriv_le_aux`. | Generalizes `norm_deriv_le_aux` to arbitrary complete target spaces via completion. |
| `liouville_theorem_aux` | `{f : ℂ → F}`<br>`Differentiable ℂ f → IsBounded (range f) → ∀ z w, f z = f w` | Core lemma: bounded entire complex-differentiable function is constant on ℂ. |
| `apply_eq_apply_of_bounded` | `{f : E → F}`<br>`Differentiable ℂ f → IsBounded (range f) → ∀ z w, f z = f w` | Full Liouville theorem for functions between complex normed spaces. |
| `exists_const_forall_eq_of_bounded` | Same hypotheses ⇒ `∃ c, ∀ z, f z = c` | Existential form: bounded entire differentiable function is globally constant. |
| `exists_eq_const_of_bounded` | Same ⇒ `∃ c, f = const E c` | Equality-of-functions form of Liouville’s theorem. |
| `eq_const_of_tendsto_cocompact` | `[Nontrivial E]`<br>`Differentiable ℂ f → Tendsto f cocompact 𝓝 c ⇒ f = const E c` | Corollary: if `f` tends to `c` at infinity, then `f` is identically `c`. |
| `apply_eq_of_tendsto_cocompact` | Same ⇒ `f x = c` | Pointwise version of above. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `norm_`: bounds on norms (e.g., `norm_deriv_le_...`)
  - `liouville_`: lemmas specific to Liouville’s theorem
  - `apply_eq_apply_`, `exists_const_forall_eq_`, `exists_eq_const_`: variants of Liouville’s theorem with increasing strength (pointwise → constant value → function equality)
  - `hasDerivAt`, `hasFDerivAt`, `differentiable`, `DiffContOnCl`: standard calculus/analysis terminology

- **Suffixes**:
  - `_aux`: auxiliary lemmas used in main proofs
  - `_of_...`: conditions or assumptions (e.g., `norm_deriv_le_of_forall_mem_sphere_norm_le`)
  - `_comp`, `_smul_const`, `_add_const`: composition, scalar multiplication, and addition patterns

- **Notation**:
  - `̂` (hat): completion of a space (`UniformSpace.Completion`)
  - `•`: scalar multiplication (Lean’s `smul`)
  - `∮ z in C(c, R), ...`: contour integral over circle centered at `c` radius `R`

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `simp_rw`, `simp only` | Simplify using definitional equalities and lemmas (e.g., `zpow_neg`, `norm_smul`) |
| `ring` / `field_simp` / `div_div_cancel₀` | Algebraic simplifications (especially for real/complex arithmetic) |
| `exact`, `apply`, `refine` | Construct proofs step-by-step using known lemmas |
| `congr_arg` | Lift equalities under function application (e.g., `congr_arg norm`) |
| `calc` | Chain equational reasoning (especially in norm bounds) |
| `lift R to ℝ≥0 using hR.le` | Type coercion and lifting to nonnegative reals |
| `gcongr` | Used in set inclusion arguments (e.g., `Set.image_subset`) |
| `rw [UniformSpace.Completion.norm_coe _]` | Manipulate norms under completion embedding |

---

#### **4. Proof Logic**

- **Structure of main proof (`liouville_theorem_aux`)**:
  1. Reduce to showing `deriv f c = 0` for all `c`.
  2. Use boundedness to get global bound `C`.
  3. For arbitrary `ε > 0`, apply `norm_deriv_le_of_forall_mem_sphere_norm_le` with radius `R = C / ε`.
  4. Conclude `‖deriv f c‖ ≤ ε` for all `ε > 0`, hence `deriv f c = 0`.
  5. Apply `is_const_of_deriv_eq_zero` to deduce constancy.

- **General pattern**:
  - Use **Cauchy integral formula** to express derivative.
  - Bound the integral using sup-norm on circle.
  - Let radius grow → derivative vanishes.
  - Lift from ℂ to general `E` via linear paths (`t • (w - z) + z`).

- **Use of completion**:
  - Embed `F` into its completion `F̂` to apply `norm_deriv_le_aux`, which requires `CompleteSpace F`.
  - Use `UniformSpace.Completion.norm_coe` to relate norms in `F` and `F̂`.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.Complex.CauchyIntegral` | Contour integrals, Cauchy integral formula, circle integrals |
| `Mathlib.Analysis.Calculus.FDeriv.Analytic` | Fréchet differentiability, analyticity, power series expansions |
| `Mathlib.Analysis.Normed.Module.Completion` | Completion of normed spaces, embedding `F → F̂`, properties of `toComplL` |

**Core logical scope**:
- Complex analysis on normed spaces over `ℂ`
- Differentiability (`Differentiable ℂ f`) and continuity on closures (`DiffContOnCl`)
- Boundedness (`IsBounded`, `Bornology.IsBounded`)
- Topological filters (`Tendsto`, `cocompact`, `𝓝`)
- Uniform spaces and completion

---

Let me know if you'd like a diagram of the proof dependencies or a summary of how this fits into the broader Liouville theorem hierarchy in Mathlib.