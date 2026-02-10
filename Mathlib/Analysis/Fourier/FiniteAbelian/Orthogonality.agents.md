Here's a structured technical metadata summary of the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Statement | Purpose |
|------|------------------|---------|
| `expect_eq_ite` | `𝔼 a, ψ a = if ψ = 0 then 1 else 0` | Computes the expectation of an additive character over a finite group, distinguishing the zero character. |
| `expect_eq_zero_iff_ne_zero` | `𝔼 x, ψ x = 0 ↔ ψ ≠ 0` | Links vanishing of the expectation to nontriviality of the character. |
| `expect_ne_zero_iff_eq_zero` | `𝔼 x, ψ x ≠ 0 ↔ ψ = 0` | Contrapositive of above; expectation nonzero iff character is zero. |
| `wInner_cWeight_self` | `⟪(ψ : G → R), ψ⟫ₙ_[R] = 1` | Norm-squared of a character under the weighted inner product is 1 (unitary). |
| `wInner_cWeight_eq_boole` | `⟪(ψ₁, ψ₂)⟫ₙ = if ψ₁ = ψ₂ then 1 else 0` | **Orthogonality relation**: distinct characters are orthogonal; same character has norm 1. |
| `wInner_cWeight_eq_zero_iff_ne` | `⟪ψ₁, ψ₂⟫ = 0 ↔ ψ₁ ≠ ψ₂` | Orthogonality reformulated as equivalence with inequality. |
| `wInner_cWeight_eq_one_iff_eq` | `⟪ψ₁, ψ₂⟫ = 1 ↔ ψ₁ = ψ₂` | Character inner product equals 1 iff characters are equal. |
| `AddChar.linearIndependent` | `LinearIndependent R ((⇑) : AddChar G R → G → R)` | The set of characters (viewed as functions) is linearly independent over `R`. |
| `instFintype` | `Fintype (AddChar G R)` | Constructs a finite type structure on characters using linear independence. |
| `card_addChar_le` | `card (AddChar G R) ≤ card G` | Number of characters is at most the group order — key step toward Pontryagin duality. |

---

### **2. Naming Conventions**

- **`expect_`**: Expectation over finite domain (`𝔼`, average).
- **`wInner_`**: Weighted inner product (`⟪·, ·⟫ₙ`), often with `cWeight` indicating normalization by group size.
- **`coe_ne_zero`**: Coercion of a character to a function is nonzero (used in linear independence proofs).
- **`map_neg_eq_inv`**: Property of additive characters: `ψ(-x) = ψ(x)⁻¹`.
- **`inv_mul_eq_one` / `inv_apply_eq_conj`**: Standard group-theoretic identities used in simplification.
- **`ite_` / `boole`**: Use of `if-then-else` (`ite`) and boolean (`boole`) encodings in statements.

---

### **3. Tactic Stack**

Frequent tactics used in proofs:
- `simp` / `simp_rw`: Simplification with rewrite rules (especially for `expect`, `inner`, `conj_mul`, `map_neg_eq_inv`).
- `split_ifs`: Breaks `if-then-else` into cases.
- `rw`: Rewriting using lemmas (e.g., `h`, `Ne`, `inv_mul_eq_one`).
- `simpa`: Simplify using a target expression (e.g., `simpa using ...`).
- `cases`: Case analysis (e.g., `cases nonempty_fintype G`).
- `exact`: Direct proof application (e.g., `exact linearIndependent_of_ne_zero_of_wInner_cWeight_eq_zero ...`).
- `rwa`: Rewrite + assume (used for rewriting under hypotheses).
- `nonzero`-related lemmas: `one_ne_zero`, `ne_of_eq_of_ne`, etc.

---

### **4. Proof Logic**

- **Structure**: Inductive-style reasoning via case analysis on equality of characters (`ψ₁ = ψ₂` vs `ψ₁ ≠ ψ₂`).
- **Core strategy**:
  1. Reduce inner product to expectation via `wInner_cWeight_eq_expect`.
  2. Use algebraic identities (`inv_apply_eq_conj`, `map_neg_eq_inv`) to relate `ψ₁⁻¹ * ψ₂` to the zero character.
  3. Apply `expect_eq_zero_iff_ne_zero` to conclude orthogonality.
- **Linear independence proof**:
  - Uses general lemma `linearIndependent_of_ne_zero_of_wInner_cWeight_eq_zero`.
  - Requires: (i) each character is nonzero (`coe_ne_zero`), and (ii) inner product zero iff characters distinct.
- **Finiteness & cardinality**:
  - Leverages `Fintype.ofFinite` from linear independence.
  - Uses `finrank_fintype_fun_eq_card` to relate dimension of function space to group size.

---

### **5. Imports & Scope**

**Primary imports**:
- `Mathlib.Algebra.BigOperators.Expect`: Expectation over finite types.
- `Mathlib.Algebra.Group.AddChar`: Additive characters (group homs to `Rˣ` or `R` with conjugation).
- `Mathlib.Analysis.RCLike.Inner`: Real/complex-like inner products, conjugation, norms.

**Domain scope**:
- Finite abelian groups (`AddCommGroup G`, `[Fintype G]`).
- Target ring `R` is:
  - A semifield + domain + char zero (for expectation lemmas),
  - Or `RCLike` (e.g., `ℝ`, `ℂ`) for inner product theory.
- Characters are viewed as functions `G → R`, with inner product normalized by `1 / card G`.

---

Let me know if you'd like a diagram of the logical dependencies or a formalization of the Pontryagin duality consequence (`card AddChar G R = card G` when `R = ℂ`).