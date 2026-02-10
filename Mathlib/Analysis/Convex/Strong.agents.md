### Technical Brief: Uniformly and Strongly Convex Functions in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `UniformConvexOn` | `Set E → (ℝ → ℝ) → (E → ℝ) → Prop` | Defines *uniform convexity* of `f` on `s` with modulus `φ`: `f(a•x + b•y) ≤ a•f x + b•f y - a*b*φ(‖x - y‖)` for convex combinations. |
| `UniformConcaveOn` | `Set E → (ℝ → ℝ) → (E → ℝ) → Prop` | Dual notion: `a•f x + b•f y + a*b*φ(‖x - y‖) ≤ f(a•x + b•y)`. |
| `StrongConvexOn` | `Set E → ℝ → (E → ℝ) → Prop` | `m`-strong convexity: uniform convexity with modulus `r ↦ m/2 * r²`. |
| `StrongConcaveOn` | `Set E → ℝ → (E → ℝ) → Prop` | `m`-strong concavity: uniform concavity with same modulus. |
| `uniformConvexOn_zero` | `UniformConvexOn s 0 f ↔ ConvexOn ℝ s f` | Connects uniform convexity with zero modulus to ordinary convexity. |
| `uniformConcaveOn_zero` | `UniformConcaveOn s 0 f ↔ ConcaveOn ℝ s f` | Analogous for concavity. |
| `UniformConvexOn.mono` | `ψ ≤ φ ⇒ UniformConvexOn s φ f → UniformConvexOn s ψ f` | Monotonicity in modulus: weaker modulus ⇒ stronger convexity condition. |
| `UniformConvexOn.strictConvexOn` | `∀ r ≠ 0, 0 < φ r ⇒ UniformConvexOn s φ f → StrictConvexOn ℝ s f` | Strict convexity follows if modulus is *positive-definite*. |
| `StrongConvexOn.mono` | `m ≤ n ⇒ StrongConvexOn s n f → StrongConvexOn s m f` | Strong convexity is monotone in `m`. |
| `strongConvexOn_zero` | `StrongConvexOn s 0 f ↔ ConvexOn ℝ s f` | Recovers convexity from strong convexity with `m = 0`. |
| `strongConvexOn_iff_convex` | `StrongConvexOn s m f ↔ ConvexOn ℝ s (λ x ↦ f x - m/2 * ‖x‖²)` | **Key equivalence** in inner product spaces: strong convexity ⇔ convexity of shifted function. |
| `strongConcaveOn_iff_convex` | `StrongConcaveOn s m f ↔ ConcaveOn ℝ s (λ x ↦ f x + m/2 * ‖x‖²)` | Dual equivalence for strong concavity. |
| `aux_sub`, `aux_add` | Technical lemmas | Algebraic identities used to prove the equivalences above (expand norms via inner product). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `uniformConvexOn_`, `uniformConcaveOn_`: for uniform (concave/convex) on a set.
  - `strongConvexOn_`, `strongConcaveOn_`: for strong (concave/convex) on a set.
  - `strictConvexOn_`, `strictConcaveOn_`: for strict variants (derived).
- **Suffixes**:
  - `_zero`: modulus is identically zero.
  - `_mono`: monotonicity in modulus or parameter `m`.
  - `_iff_convex`: characterizations in inner product spaces.
- **Variable naming**:
  - `φ`, `ψ`: moduli of convexity/concavity.
  - `m`, `n`: strong convexity/concavity constants.
  - `a`, `b`: convex combination coefficients (`a + b = 1`).
  - `x`, `y`: points in domain.
  - `s`: subset of domain.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `simp`, `simp_rw`: simplification using definitions and lemmas (e.g., `uniformConvexOn_zero`, `strongConvexOn_iff_convex`).
  - `refine`: constructing proofs with holes (e.g., `refine ⟨hf.1, fun ... ↦ ?_⟩`).
  - `gcongr`: for proving inequalities under congruence (e.g., `by gcongr; apply hψφ`).
  - ` positivity`: proving positivity of expressions (e.g., `have := hφ _ hxy.ne'; positivity`).
  - `ring_nf`, `ring`: simplifying polynomial expressions (used in `aux_sub`, `aux_add`).
  - `norm_add_sq_real`, `norm_sub_sq_real`, `norm_smul`, `real_inner_smul_left`, `inner_smul_right`: norm/inner product expansions.
  - `le_of_neg_le_neg`, `lt_add_of_pos_right`, `sub_lt_self`: order manipulation.

---

#### **4. Proof Logic**

- **Structure**:
  - Most proofs follow a *decomposition pattern*:
    1. Extract convexity of `s` (first conjunct of definition).
    2. Introduce variables `x, y ∈ s`, `a, b ≥ 0`, `a + b = 1`.
    3. Apply the defining inequality of uniform convexity/concavity.
    4. Manipulate using algebraic identities (`aux_sub`, `aux_add`) or monotonicity (`mono`).
- **Key reasoning steps**:
  - **Equivalence proofs** (`strongConvexOn_iff_convex`):
    - Reduce to comparing two inequalities.
    - Use `aux_sub` to rewrite the quadratic term in terms of `‖x - y‖²`.
    - Apply `simp_rw` to align expressions.
  - **Strict convexity**:
    - Use positivity of modulus away from zero (`hφ r hxy.ne'`) to upgrade ≤ to <.
  - **Negation duality**:
    - `UniformConvexOn.neg` flips inequality direction and swaps `UniformConvexOn` ↔ `UniformConcaveOn`.

---

#### **5. Imports**

- **Primary dependency**:
  ```lean
  import Mathlib.Analysis.InnerProductSpace.Basic
  ```
  - Provides:
    - `NormedAddCommGroup`, `NormedSpace ℝ E`: for general normed spaces.
    - `InnerProductSpace ℝ E`: for inner product structure (norm induced by inner product).
    - Tools for norm expansions: `norm_add_sq_real`, `norm_sub_sq_real`, etc.
    - Convexity notions: `ConvexOn`, `StrictConvexOn`, `ConcaveOn`, etc.

- **Implicit dependencies**:
  - `Mathlib.Data.Real.Basic`: for `Real`, arithmetic, `norm_pos_iff`.
  - `Mathlib.Order.Basic`: for `≤`, `<`, `pos`, `mono`.
  - `Mathlib.LinearAlgebra.InnerProductSpace.Basic`: for inner product properties.

---

#### **Summary**

This file formalizes *uniform* and *strong* convexity in both general normed spaces and inner product spaces. It establishes foundational properties (monotonicity, duality via negation, strict convexity criteria) and provides a key characterization in inner product spaces:  
> **`f` is `m`-strongly convex ⇔ `x ↦ f(x) − (m/2)‖x‖²` is convex.**

The proofs rely heavily on algebraic manipulation of quadratic terms (via inner product identities) and order-theoretic reasoning (positivity, monotonicity). The design reflects Lean’s functional style: definitions are parameterized by modulus `φ` or constant `m`, and properties are derived via clean, reusable lemmas.