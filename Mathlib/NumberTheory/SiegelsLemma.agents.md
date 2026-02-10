Here is a structured technical metadata summary of the provided Lean 4 file on **Siegel’s Lemma**, extracted for use in building a domain-specific AI agent (e.g., for theorem proving assistance or formal verification):

---

### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `m`, `n`, `e`, `B`, `B'`, `T`, `P`, `N`, `S` | Notational shorthands introduced for matrix dimensions, exponent, bounding box, and image bounds (see local notations). |
| `Matrix.seminormedAddCommGroup` | Instance used to define the sup-norm `‖A‖` on integer matrices (maximum absolute value of entries). |
| `image_T_subset_S` | Lemma: For all `v ∈ T`, `A *ᵥ v ∈ S`. Proven by case analysis on signs of matrix entries and using properties of `posPart`/`negPart`. |
| `card_T_eq` | Lemma: `#T = (B + 1)^n`, where `T = [0, B]^n` in the lattice `β → ℤ`. |
| `N_le_P_add_one` | Lemma: For each row `i`, `N i ≤ P i + 1`, ensuring the interval `[N i, P i]` is non-empty. |
| `card_S_eq` | Lemma: `#S = ∏_{i : α} (P i - N i + 1)`, where `S = ∏_{i : α} [N i, P i]`. |
| `one_le_norm_A_of_ne_zero` | Lemma: If `A ≠ 0`, then `1 ≤ ‖A‖`. |
| `card_S_lt_card_T` | Core inequality: Under `m < n`, `#S < #T`. Proven via bounding products and using properties of `B = ⌊(n·max(1,‖A‖))^e⌋`. |
| `exists_ne_zero_int_vec_norm_le` | **Main theorem**: Given `A : Matrix α β ℤ`, `A ≠ 0`, `m < n`, there exists a non-zero integer vector `t` such that `A *ᵥ t = 0` and `‖t‖ ≤ (n·max(1,‖A‖))^{m/(n−m)}`. |
| `exists_ne_zero_int_vec_norm_le'` | Variant of the main theorem with `‖A‖` instead of `max(1,‖A‖)`, assuming `A ≠ 0`. |

---

### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `is_`, `card_`, `image_`, `norm_`, `one_le_`, `N_le_P_add_one`: Descriptive, often indicating the object or inequality being described.
  - `mulVec_`, `sub_`, `prod_`, `sum_`: Standard Lean/MLlib naming for operations (`mulVec` = matrix-vector multiplication).
  - `posPart`, `negPart`: Standard functions for splitting integers into positive/negative parts.
  - `Icc`: Interval `[a, b]` (inclusive), used in `Finset.Icc`.
  - `rpow`, `rify`, `zify`: Tactics/lemmas for real exponentiation and type coercion.

- **Notation**:
  - `‖_‖`: Sup-norm on matrices.
  - `A *ᵥ v`: Matrix-vector multiplication.
  - `v ∈ T`, `v ∈ S`: Membership in finite sets (boxes).
  - `B'`, `P`, `N`: Function-valued bounds for intervals.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Purpose |
|--------|---------|
| `rify` / `zify` | Convert integer/natural expressions to reals/integers for arithmetic reasoning. |
| `gcongr` | Generalized congruence for inequalities (especially with sums/products). |
| `simp only [...]` | Simplify using precise lemmas, avoiding over-simplification. |
| `rw [...]` | Rewrite using equalities/definitions. |
| `rcases ... with ...` | Destruct existential/universal quantifiers or conjunctions. |
| `linarith` | Linear arithmetic over ordered rings. |
| `exact`, `apply`, `refine` | Proof construction. |
| `norm_cast` | Normalize casts between `ℤ`, `ℚ`, `ℝ`. |
| `posi` / ` positivity` | Prove non-negativity of expressions. |
| `mul_nonneg`, `mul_le_mul_of_nonneg_right`, etc. | Standard inequalities for ordered semirings. |

---

### **4. Proof Logic**

The proof follows a **pigeonhole principle** strategy:

1. **Setup**:
   - Define a box `T = [0, B]^n` of integer vectors.
   - Define `S = ∏_{i : α} [N i, P i]` as the image box under `A *ᵥ -`.
   - Show `A *ᵥ T ⊆ S`.

2. **Cardinality comparison**:
   - Compute `#T = (B + 1)^n`.
   - Bound `#S = ∏_{i} (P i - N i + 1)` using `B = ⌊(n·max(1,‖A‖))^e⌋`.
   - Prove `#S < #T` using exponent algebra and inequalities.

3. **Pigeonhole**:
   - Apply `Finset.exists_ne_map_eq_of_card_lt_of_maps_to` to get `x ≠ y ∈ T` with `A *ᵥ x = A *ᵥ y`.
   - Then `t := x - y ≠ 0`, `A *ᵥ t = 0`.

4. **Norm bound**:
   - Use `norm_col` and properties of sup-norm to bound `‖t‖`.
   - Final inequality derived from definition of `B`.

---

### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Analysis.Matrix` | Provides `Matrix.seminormedAddCommGroup`, sup-norm, and related analysis tools. |
| `Mathlib.Data.Pi.Interval` | Provides `Pi.card_Icc`, cardinality of product intervals. |
| `Mathlib.Tactic.Rify` | Enables `rify`/`zify` for real/integer coercion. |

---

### **Domain-Specific AI Agent Notes**

- **Focus area**: Diophantine approximation, geometry of numbers, linear algebra over ℤ.
- **Key proof patterns**:
  - Pigeonhole principle on finite sets of integer vectors.
  - Bounding volumes of boxes in lattice points.
  - Use of `posPart`/`negPart` to handle sign-sensitive inequalities.
- **Common lemmas to recall**:
  - `norm_entry_le_entrywise_sup_norm`
  - `one_le_norm_A_of_ne_zero`
  - `card_Icc_of_le`
  - `mulVec_sub`, `mulVec_zero`
- **Challenges for automation**:
  - Handling real exponentiation (`rpow`) and floor functions (`floor`).
  - Managing multiple type coercions (`ℤ → ℝ`, `ℕ → ℤ`, etc.).
  - Nontrivial algebraic manipulation of exponents and products.

Let me know if you'd like a ** tactic trace **, ** dependency graph **, or ** formalization checklist ** for this file.