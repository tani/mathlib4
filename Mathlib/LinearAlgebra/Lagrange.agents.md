Here's a structured technical metadata summary extracted from the provided Lean 4 file on **Lagrange interpolation**:

---

### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `basisDivisor x y` | `F[X]`: Normalized linear polynomial satisfying `eval x (basisDivisor x y) = 1`, `eval y (basisDivisor x y) = 0` when `x ≠ y`. Building block for basis polynomials. |
| `basis s v i` | `F[X]`: Lagrange basis polynomial indexed by `i ∈ s`, evaluating to `1` at `v i` and `0` at `v j` for `j ≠ i`, assuming `v` injective on `s`. |
| `interpolate s v r` | `F[X]`: Linear map returning the unique polynomial of degree `< #s` interpolating values `r i` at nodes `v i`. |
| `nodal s v` | `R[X]`: Monic polynomial with roots exactly `v '' s`. Defined as `∏ i ∈ s, (X - v i)`. |
| `nodalWeight s v i` | `F`: Inverse of derivative of `nodal s v` at node `v i`, used in barycentric forms. |
| `eq_zero_of_degree_lt_of_eval_finset_eq_zero` | Thm: If `f` vanishes on `s` and `deg f < #s`, then `f = 0`. |
| `eq_of_degree_sub_lt_of_eval_finset_eq` | Thm: If `(f - g)` vanishes on `s` and `deg(f - g) < #s`, then `f = g`. |
| `eq_interpolate` | Thm: Any `f` with `deg f < #s` equals its interpolation: `f = interpolate s v (fun i ↦ f.eval (v i))`. |
| `funEquivDegreeLT` | Equiv: Between functions `s → F` and polynomials of degree `< #s`, showing interpolation is an isomorphism. |
| `derivative_nodal` | Thm: `∂(∏_{i∈s} (X - v i)) = ∑_{i∈s} ∏_{j∈s\{i}} (X - v j)`. |
| `eval_interpolate_not_at_node'` | Thm: Second barycentric form: `eval x (interpolate s v r) = (∑ w_i * r_i / (x - v_i)) / (∑ w_i / (x - v_i))`. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `basisDivisor_`, `basis_`, `interpolate_`, `nodal_`, `nodalWeight_`: Module-specific.
  - `eval_`, `degree_`, `natDegree_`, `card_`: Standard mathlib conventions.
- **Suffixes**:
  - `_self`: When argument repeated (e.g., `basisDivisor_self`, `eval_basis_self`).
  - `_of_ne`, `_ne`: For conditions like `x ≠ y`.
  - `_eq`, `_eq_iff`: For equality lemmas.
  - `_left`, `_right`: For symmetric cases (e.g., `basis_pair_left`, `basis_pair_right`).
  - `_erase`, `_insert`, `_sdiff`: Set operation variants.
  - `_div`, `_inv`, `_mul`: Algebraic operation indicators.
- **`_inj`, `_injOn`**: Injectivity-related lemmas.

---

### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `simp_rw` | Rewriting with simplification, especially for `eval`, `prod`, `sum`. |
| `rw` | Basic rewriting, often after `simp` or `rcases`. |
| `exact`, `refine`, `apply` | Goal-directed proof construction. |
| `intro`, `rintro`, `rcases` | Introducing hypotheses and destructing existentials/conjunctions. |
| `congr` | Congruence reasoning (e.g., for function extensionality). |
| `sum_congr`, `prod_congr` | Equality of sums/products via pointwise equality. |
| `mul_div_cancel_left₀`, `sub_ne_zero_of_ne`, `inv_mul_cancel₀` | Algebraic simplifications in fields. |
| `card_eq_sum_ones`, `card_erase_of_mem`, `card_insert_of_not_mem` | Cardinality arithmetic. |
| `lt_of_lt_of_le`, `le_of_lt`, `lt_of_le_of_lt` | Ordering reasoning (especially with `degree`). |
| `eq_of_degree_le_of_eval_finset_eq`, `eq_of_degrees_lt_of_eval_index_eq` | Core uniqueness lemmas for polynomials. |
| `conv` | Convolution tactic for equational reasoning (e.g., `rhs; rw [...]`). |

---

### **4. Proof Logic**

- **Uniqueness via degree bounds**: Most interpolation uniqueness proofs follow the pattern:
  - Show `f - g` has degree `< #s`.
  - Show `f - g` vanishes on `s`.
  - Apply `eq_zero_of_degree_lt_of_eval_finset_eq_zero`.
- **Induction on finite sets**: Used in `derivative_nodal`, `natDegree_nodal`, etc.
- **Case analysis on membership**: `mem_erase`, `mem_insert`, `mem_sdiff` heavily used.
- **Injectivity assumptions**: Often `Set.InjOn v s` is required to ensure nodes are distinct.
- **Field arithmetic**: Heavy use of `inv_mul_cancel₀`, `sub_ne_zero_of_ne`, `mul_div_cancel_left₀`.
- **Barycentric forms**: Derived by factoring `nodal s v` and using `nodalWeight`.

---

### **5. Imports & Scope**

**Primary imports**:
- `Mathlib.Algebra.BigOperators.Group.Finset`: For `sum`, `prod`, cardinality lemmas.
- `Mathlib.Algebra.Polynomial.FieldDivision`: For division in polynomial rings over fields.
- `Mathlib.LinearAlgebra.Vandermonde`: Related structure (though not directly used here).
- `Mathlib.RingTheory.Polynomial.Basic`: Core polynomial arithmetic.

**Domain scope**:
- Commutative rings (`CommRing`), integral domains (`IsDomain`), fields (`Field`).
- Finite sets (`Finset`), finite types (`Fintype`), decidable equality (`DecidableEq`).
- Polynomial rings over fields (`F[X]`), with evaluation maps, degree, leading coefficient.

---

Let me know if you'd like a visualization of the dependency graph or a formalization roadmap for extending this module.