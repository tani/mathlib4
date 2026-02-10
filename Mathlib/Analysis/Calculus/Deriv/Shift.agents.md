Here's a structured technical metadata summary of the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `HasDerivAt.comp_const_add` | `HasDerivAt f f' (a + x) → HasDerivAt (fun x ↦ f (a + x)) f' x` | Shows that precomposing `f` with `a + ·` preserves the derivative at `x`. |
| `HasDerivAt.comp_add_const` | `HasDerivAt f f' (x + a) → HasDerivAt (fun x ↦ f (x + a)) f' x` | Same as above, but for `· + a`. |
| `HasDerivAt.comp_const_sub` | `HasDerivAt f f' (a - x) → HasDerivAt (fun x ↦ f (a - x)) (-f') x` | Precomposition with `a - ·` negates the derivative. |
| `HasDerivAt.comp_sub_const` | `HasDerivAt f f' (x - a) → HasDerivAt (fun x ↦ f (x - a)) f' x` | Precomposition with `· - a` preserves the derivative. |
| `deriv_comp_neg` | `deriv (fun x ↦ f (-x)) x = -deriv f (-x)` | Derivative of `f ∘ (-id)` is the negative of `f'` at the reflected point. |
| `deriv_comp_const_add` | `deriv (fun x ↦ f (a + x)) x = deriv f (a + x)` | Derivative of `f(a + ·)` equals derivative of `f` at `a + x`. |
| `deriv_comp_add_const` | `deriv (fun x ↦ f (x + a)) x = deriv f (x + a)` | Derivative of `f(· + a)` equals derivative of `f` at `x + a`. |
| `deriv_comp_const_sub` | `deriv (fun x ↦ f (a - x)) x = -deriv f (a - x)` | Derivative of `f(a - ·)` is negative of `f'` at `a - x`. |
| `deriv_comp_sub_const` | `deriv (fun x ↦ f (x - a)) x = deriv f (x - a)` | Derivative of `f(· - a)` equals derivative of `f` at `x - a`. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `HasDerivAt.*`: For statements about *existence* of a derivative (i.e., `HasDerivAt`).
  - `deriv_*`: For equalities involving the *actual derivative value* (`deriv`).
- **Suffixes**:
  - `_const_add`, `_add_const`, `_const_sub`, `_sub_const`: Indicate the type of translation applied:
    - `const_add`: `a + ·`
    - `add_const`: `· + a`
    - `const_sub`: `a - ·`
    - `sub_const`: `· - a`
  - `_neg`: For negation (`-x`).
- **Structure**: `deriv_comp_<operation>` where `<operation>` describes the transformation applied to the input variable.

---

### **3. Tactic Stack**

- **Core tactics used**:
  - `simpa [Function.comp_def] using …`: Simplifies using composition definition and rewrites using a given fact.
  - `by_cases hf : DifferentiableAt …`: Splits into differentiable / non-differentiable cases.
  - `rw [deriv_zero_of_not_differentiableAt …]`: Handles non-differentiable points by reducing to `0`.
  - `simp_rw [sub_eq_add_neg, …]`: Rewrites subtraction in terms of addition and negation, then simplifies.
  - `hasDerivAt_id'`, `const_add`, `add_const`, `const_sub`, `sub_const`: From `Mathlib.Analysis.Calculus.Deriv.Add` and `Comp`, used to build derivative facts for basic functions.

---

### **4. Proof Logic**

- **General pattern**:
  1. For `HasDerivAt.*` lemmas:
     - Use `HasDerivAt.scomp` (chain rule for `HasDerivAt`) with:
       - `hf`: derivative of `f` at the translated point.
       - A known derivative for the translation function (e.g., `hasDerivAt_id' x |>.const_add a` for `x ↦ a + x`).
     - `simpa` to clean up composition syntax.
  2. For `deriv_*` lemmas:
     - Split on differentiability at the relevant point (`by_cases hf`).
     - If differentiable: apply `HasDerivAt.deriv` to the corresponding `HasDerivAt.*` lemma.
     - If not: use `deriv_zero_of_not_differentiableAt` on both sides (often via `differentiableAt_*` lemmas to relate differentiability of composed functions).
     - For subtraction/negation cases: rewrite using `sub_eq_add_neg`, then reduce to previously proven lemmas (`deriv_comp_neg`, `deriv_comp_const_add`, etc.).

---

### **5. Imports**

- **Primary dependencies**:
  - `Mathlib.Analysis.Calculus.Deriv.Add`: Provides derivative facts for addition, subtraction, constants, identity, etc.
  - `Mathlib.Analysis.Calculus.Deriv.Comp`: Provides chain rule (`HasDerivAt.scomp`, etc.) and related lemmas.

- **Context assumptions**:
  - `𝕜`: A nontrivially normed field (e.g., `ℝ` or `ℂ`).
  - `F`: A normed additive commutative group and normed space over `𝕜`.
  - These ensure the setting for Fréchet differentiability in Banach spaces (though here specialized to `𝕜 → F`).

---

Let me know if you'd like a diagram of the logical dependencies or a formalized summary for documentation.