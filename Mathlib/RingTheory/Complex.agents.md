**Technical Brief: Lean 4 Formalization — Trace and Norm on ℂ over ℝ**

---

### **1. Key Definitions & Theorems**

| Name | Type / Statement | Purpose |
|------|------------------|---------|
| `Algebra.leftMulMatrix_complex` | `∀ z : ℂ, Algebra.leftMulMatrix ℂ.basisOneI z = !![z.re, -z.im; z.im, z.re]` | Computes the matrix of left-multiplication by `z` w.r.t. the standard ℝ-basis `{1, I}` of ℂ. |
| `Algebra.trace_complex_apply` | `∀ z : ℂ, Algebra.trace ℝ ℂ z = 2 * z.re` | Relates the algebraic trace (from field extension ℝ ⊆ ℂ) to the real part of `z`. |
| `Algebra.norm_complex_apply` | `∀ z : ℂ, Algebra.norm ℝ z = Complex.normSq z` | Shows the algebraic norm equals the squared complex modulus (`normSq z = z.re^2 + z.im^2`). |
| `Algebra.norm_complex_eq` | `Algebra.norm ℝ = normSq.toMonoidHom` | Identifies the algebraic norm as the monoid homomorphism induced by `normSq`. |

> **Note**: `Complex.basisOneI` is the ℝ-basis `[1, I]` of ℂ; `normSq.toMonoidHom` is the canonical monoid homomorphism from `ℂ` (as a multiplicative monoid) to `ℝ≥0` given by `z ↦ ‖z‖²`.

---

### **2. Naming Conventions**

- **Prefixes**:
  - `Algebra.`: Standard prefix for algebraic constructions (`Algebra.trace`, `Algebra.norm`, `Algebra.leftMulMatrix`).
- **Suffixes**:
  - `_apply`: Used for pointwise evaluation of algebraic operations (`trace_complex_apply`, `norm_complex_apply`).
  - `_eq`: Used for extensionality or equality-of-functions lemmas (`norm_complex_eq`).
- **Matrix notation**:
  - `!![a, b; c, d]`: Syntax for 2×2 matrices in `Matrix (Fin 2) (Fin 2) ℂ`.
- **Basis-specific**:
  - `basisOneI`: Indicates use of the canonical ℝ-basis `{1, I}`.

---

### **3. Tactic Stack**

The proofs rely heavily on:
- `ext`: To prove matrix equality by extensionality.
- `rw [...]`: Rewriting using definitions (`Algebra.trace_eq_matrix_trace`, `Algebra.norm_eq_matrix_det`, etc.).
- `simp only [...]`: Fine-grained simplification with explicit lemmas (e.g., `mul_re`, `I_im`, `Fin.zero_eta`).
- `fin_cases`: Case analysis on `Fin 2` indices (`i`, `j`).
- `rfl`: For trivial equalities after simplification.
- `exact (two_mul _).symm`: To match the expected form of the trace (uses `2 * x = x + x`).
- `simp`: Final cleanup (e.g., in `norm_complex_apply`).

> **Dominant pattern**: *Expand → rewrite → case-split → simplify → conclude*.

---

### **4. Proof Logic**

- **Structure**:
  1. **Expand definitions**: Replace `Algebra.trace`, `Algebra.norm`, and `Algebra.leftMulMatrix` with their matrix-based definitions.
  2. **Compute matrix**: Use `Algebra.leftMulMatrix_complex` to get an explicit 2×2 matrix.
  3. **Extract trace/determinant**: Apply `Matrix.trace_fin_two` / `Matrix.det_fin_two` for 2×2 matrices.
  4. **Simplify components**: Use arithmetic lemmas for `re`, `im`, `I`, and `normSq`.
  5. **Conclude equality**: Match target expressions (e.g., `2 * z.re`, `z.re^2 + z.im^2`).

- **Induction**: Not used — all proofs are direct computations over finite-dimensional bases.

---

### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Data.Complex.Module` | Provides `ℂ` as an ℝ-algebra, basis `basisOneI`, and module structure. |
| `Mathlib.RingTheory.Norm.Defs` | Defines `Algebra.norm` via determinant of left-multiplication. |
| `Mathlib.RingTheory.Trace.Defs` | Defines `Algebra.trace` via matrix trace of left-multiplication. |

> **Domain**: Commutative algebra over ℝ, specifically the quadratic extension ℂ/ℝ.  
> **Scope**: Explicit computational verification of trace/norm for the standard complex algebra — foundational for later generalizations (e.g., to number fields).

--- 

Let me know if you'd like a dependency graph or a comparison with the `field_norm`/`field_trace` in `Mathlib.FieldTheory`.