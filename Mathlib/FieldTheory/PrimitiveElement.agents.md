Here's a structured technical metadata summary of the provided Lean 4 file on the **Primitive Element Theorem**, extracted for use in building a domain-specific AI agent:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `adjoin_simple F α` | `Subalgebra F E` | The smallest subalgebra of `E` over `F` containing `α`. |
| `F ⟮ α ⟯ = ⊤` | `adjoin_simple F α = ⊤` | Statement that `α` generates the whole extension `E` over `F`; i.e., `α` is a *primitive element*. |
| `exists_primitive_element` | `∃ α : E, F⟮α⟯ = ⊤` | Main theorem: finite separable extensions have a primitive element. |
| `exists_primitive_element_of_finite_top` | `[Finite E] → ∃ α, F⟮α⟯ = ⊤` | Primitive element theorem for finite fields (or finite extensions). |
| `exists_primitive_element_of_finite_bot` | `[Finite F] → [FiniteDimensional F E] → ∃ α, F⟮α⟯ = ⊤` | Primitive element theorem when base field is finite and extension is finite-dimensional. |
| `primitive_element_inf_aux` | `[Infinite F] → [Algebra.IsSeparable F E] → ∃ γ, F⟮α, β⟯ = F⟮γ⟯` | Core lemma: for infinite base fields, any two separable elements generate a simple extension. |
| `isAlgebraic_of_adjoin_eq_adjoin` | `F⟮α^m⟯ = F⟮α^n⟯ ∧ m ≠ n ⇒ IsAlgebraic F α` | Shows algebraicity from equality of adjoined subalgebras of powers. |
| `isAlgebraic_of_finite_intermediateField` | `[Finite (IntermediateField F E)] ⇒ Algebra.IsAlgebraic F E` | Finite intermediate fields imply algebraicity of the extension. |
| `finite_intermediateField_of_exists_primitive_element` | `[Algebra.IsAlgebraic F E] → (∃ α, F⟮α⟯ = ⊤) → Finite (IntermediateField F E)` | If extension is simple and algebraic, then only finitely many intermediate fields. |
| `exists_primitive_element_iff_finite_intermediateField` | `(Algebra.IsAlgebraic F E ∧ ∃ α, F⟮α⟯ = ⊤) ↔ Finite (IntermediateField F E)` | Steinitz’s theorem: equivalence of primitivity and finiteness of intermediate fields. |
| `powerBasisOfFiniteOfSeparable` | `PowerBasis F E` | Constructs a power basis from a primitive element in finite separable extensions. |
| `primitive_element_iff_minpoly_natDegree_eq` | `F⟮α⟯ = ⊤ ↔ (minpoly F α).natDegree = finrank F E` | Characterization of primitive elements via minimal polynomial degree. |
| `primitive_element_iff_algHom_eq_of_eval'` | `F⟮α⟯ = ⊤ ↔ injective (φ ↦ φ α)` | Primitive element iff evaluation map on algebra homs is injective. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `exists_`: existential results (e.g., `exists_primitive_element`)
  - `primitive_element_`: related to primitivity (e.g., `primitive_element_inf_aux`)
  - `finite_`: finiteness conditions (e.g., `finite_intermediateField_of_exists_primitive_element`)
  - `isAlgebraic_of_`: implications from structural assumptions to algebraicity.

- **Suffixes**:
  - `_of_finite_top`, `_of_finite_bot`: variants based on finiteness of top/bottom.
  - `_iff_`: biconditional statements (e.g., `exists_primitive_element_iff_finite_intermediateField`)
  - `_aux`: auxiliary lemmas used in main proofs.

- **Special abbreviations**:
  - `adjoin_simple` = `F⟮α⟯`
  - `primitive_element` ≡ `adjoin_simple_eq_top`

---

### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Usage |
|--------|-------|
| `rw` / `simp_rw` | Rewriting definitions (e.g., `adjoin`, `minpoly`, `eval`, `map`) |
| `exact`, `assumption`, `intro`, `cases'` | Basic proof structure |
| `apply le_antisymm` | Proving equality of subalgebras via mutual inclusion |
| `have`, `suffices`, `convert` | Intermediate lemma construction |
| `ring`, `abel1` | Simplifying polynomial/ring expressions |
| `aesop` / `norm_cast` | Automated reasoning for basic algebraic identities |
| `convert` + `congr` | Proving equality of polynomials via coefficient comparison |
| `rw [← map_add]`, `rw [map_sub]`, etc. | Manipulating polynomial maps under algebra homs |
| `exact_mod_cast`, `norm_cast` | Handling coercion between types (e.g., units ↔ elements) |
| `rw [div_eq_iff]`, `rw [inv_mul_eq_div]` | Field arithmetic simplifications |
| `rw [eq_X_sub_C_of_separable_of_root_eq]` | Advanced polynomial factorization lemmas |

---

### **4. Proof Logic**

- **Structure**:
  - **Case split** on finiteness of base field `F`: finite vs infinite.
    - **Finite case**: Use group-theoretic cyclic generator of `Eˣ`.
    - **Infinite case**: Use `primitive_element_inf_aux` to reduce binary extensions to simple ones.
  - **Induction on adjoin**: For general finite separable extensions, inductively adjoin generators and apply `primitive_element_inf_aux`.
  - **Equivalence proofs**: Use `⟨_, _⟩` and `⟨_, _⟩` to prove biconditionals; often rely on prior lemmas like `finite_intermediateField_of_exists_primitive_element`.

- **Key logical flow**:
  - Prove existence for binary extensions (`α, β`) → lift to finite extensions via induction.
  - Prove equivalence with finiteness of intermediate fields via injectivity of `K ↦ minpoly_K(α)`.

---

### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.FieldTheory.IsAlgClosed.Basic` | Algebraically closed fields, splitting fields, separability. |
| `Mathlib.RingTheory.IntegralDomain` | Basic ring theory, integrality, domains. |
| `Mathlib.RingTheory.Polynomial.UniqueFactorization` | UFD properties, GCDs, separable polynomials, minimal polynomials. |

---

### **6. Additional Notes**

- **Noncomputable section**: Required due to use of choice (e.g., `exists_primitive_element`).
- **Stacks Project references**: e.g., `[stacks 030N]`, `[stacks 09HY]`.
- **Deprecations**: `finiteDimensional_of_*` aliases deprecated in favor of `FiniteDimensional.of_*`.
- **Porting notes**: Comments indicate Lean 4-specific fixes (e.g., `-map_add`, `simp_rw` usage).

--- 

Let me know if you'd like a visual dependency graph or a tactic-level proof sketch for any specific theorem.