Here is the **technical metadata extraction** for the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `DifferentiableOn.nonneg_of_iteratedDeriv_nonneg` | `{f : ℂ → ℂ} → {c : ℂ} → {r : ℝ} → DifferentiableOn ℂ f (Metric.ball c r) → (∀ n, 0 ≤ iteratedDeriv n f c) → c ≤ z → z ∈ Metric.ball c r → 0 ≤ f z` | Shows nonnegativity of `f(z)` on the ray `[c, c + r)` in the disk, assuming all iterated derivatives at `c` are nonnegative reals. |
| `Differentiable.nonneg_of_iteratedDeriv_nonneg` | `(hf : Differentiable ℂ f) → (∀ n, 0 ≤ iteratedDeriv n f c) → c ≤ z → 0 ≤ f z` | Entire function version: nonnegativity on the ray `c + ℝ≥0`. |
| `Differentiable.apply_le_of_iteratedDeriv_nonneg` | `(hf : Differentiable ℂ f) → (∀ n ≠ 0, 0 ≤ iteratedDeriv n f c) → c ≤ z → f c ≤ f z` | Shows `f(z) ≥ f(c)` when only higher-order derivatives are nonnegative. |
| `Differentiable.apply_le_of_iteratedDeriv_alternating` | `(hf : Differentiable ℂ f) → (∀ n ≠ 0, 0 ≤ (-1)^n * iteratedDeriv n f c) → z ≤ c → f c ≤ f z` | Shows `f(z) ≥ f(c)` along `c - ℝ≥0` under alternating sign condition on derivatives. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `nonneg_of_...`: Indicates conclusion is `0 ≤ f z`.
  - `apply_le_of_...`: Indicates conclusion is `f c ≤ f z`.
- **Suffixes**:
  - `_nonneg`: Derivatives are nonnegative.
  - `_alternating`: Derivatives satisfy alternating sign condition.
- **Structure**:
  - `theorem <action>_<condition>_<variant>`: e.g., `apply_le_of_iteratedDeriv_alternating`.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `have H := ...`: Introduce intermediate facts.
- `rw [...]`: Rewrite using equalities/inequalities.
- `refine ... ▸ ...`: Use substitution with `H ▸`.
- `tsum_nonneg`: For proving nonnegativity of a series termwise.
- `norm_cast`: Move between `ℝ` and `ℂ` reals.
- `simp only [...]`: Simplify using precise lemmas.
- `pos...ity` (e.g., `positivity`): Prove positivity from assumptions.
- `convert ... using 1`: Use congruence with minor adjustments.
- `rwa [...]`: Rewrite and then apply.

---

### **4. Proof Logic**

- **Core idea**: Use Taylor series expansion of `f` at `c`, valid on the disk of holomorphy.
- **Main steps**:
  1. Express `f(z)` via Taylor series (via `taylorSeries_eq_on_ball'`).
  2. Reduce inequality to termwise nonnegativity of series coefficients.
  3. Use assumption that `iteratedDeriv n f c ≥ 0` (or alternating variant).
  4. For entire functions, extend radius arbitrarily large.
  5. For `f c ≤ f z`, reduce to previous case by subtracting constant `f c`.
  6. For alternating case, compose with `z ↦ -z` to flip direction.

- **Induction/Case analysis**: Not used directly; relies on Taylor series and algebraic manipulation.

---

### **5. Imports**

- `Mathlib.Analysis.Complex.TaylorSeries`: Provides Taylor series representation for holomorphic functions on disks (`taylorSeries_eq_on_ball'`), crucial for the main argument.

---

Let me know if you'd like a formalized summary in Lean or a diagram of dependencies.