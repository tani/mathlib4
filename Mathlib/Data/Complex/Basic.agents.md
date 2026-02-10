Here's a **technical metadata brief** extracted from the provided Lean 4 file `Mathlib.Data.Complex.Basic`:

---

### 🔹 **Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `Complex` | `Type` — defined as `ℝ × ℝ` via `re`, `im` components. |
| `equivRealProd` | `ℂ ≃ ℝ × ℝ` — equivalence between complex numbers and pairs of reals. |
| `I` | `ℂ` — the imaginary unit: `⟨0, 1⟩`. |
| `I_mul_I` | `I * I = -1`. |
| `mk_eq_add_mul_I` | `⟨a, b⟩ = a + b * I`. |
| `conj` (via `StarRing`) | Complex conjugation: `⟨z.re, -z.im⟩`. |
| `normSq` | `ℂ →*₀ ℝ`, multiplicative monoid homomorphism: `z ↦ z.re² + z.im²`. |
| `inv_def` | `z⁻¹ = conj z / normSq z`. |
| `instField` | `Field ℂ` — proves ℂ is a field using `normSq` and conjugation. |
| `instCharZero` | `CharZero ℂ` — follows from injectivity of `ℕ → ℂ`. |
| `reAddGroupHom`, `imAddGroupHom` | Additive group homomorphisms `ℂ →+ ℝ`. |
| `ofRealHom` | `ℝ →+* ℂ` — canonical ring homomorphism embedding ℝ into ℂ. |
| `re_eq_add_conj`, `im_eq_sub_conj` | Express real/imag parts via conjugation: <br> `z.re = (z + conj z)/2`, `z.im = (z - conj z)/(2I)`. |

---

### 🔹 **Naming Conventions**

- **Prefixes**:
  - `re_`, `im_`: for projections (e.g., `re_add`, `im_mul`).
  - `ofReal_`: for coercion from `ℝ` (e.g., `ofReal_add`, `ofReal_mul`).
  - `normSq_`: for norm-squared lemmas (e.g., `normSq_mul`, `normSq_conj`).
  - `conj_`: for conjugate lemmas (e.g., `conj_mul`, `conj_inv`).
- **Suffixes**:
  - `_re`, `_im`: for component-wise equalities (e.g., `add_re`, `mul_im`).
  - `_hom`: for homomorphisms (e.g., `reAddGroupHom`, `ofRealHom`).
- **Notation**:
  - `×ℂ` for `reProdIm`.
  - `I` for imaginary unit.
  - `conj` (in `ComplexConjugate` locale) for conjugation.

---

### 🔹 **Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only` — for simplifying definitions (`re`, `im`, `conj`, `normSq`, etc.).
- `ring` — for polynomial identities in ℂ (especially in distributivity, associativity proofs).
- `ext` — extensionality for complex numbers (using `Complex.ext` locally).
- `rw` / `simp_rw` — rewriting using lemmas like `inv_def`, `normSq_apply`.
- `aesop` — in meta lemmas like `forall`, `exists`.
- `norm_cast` — for coercions (`ofReal`, `natCast`, etc.).
- `cases` / `induction` — for structural induction on naturals/integers.
- `ring` + `simp` — common combo for verifying ring axioms.

---

### 🔹 **Proof Logic**

- **Structure**: Proofs follow a *component-wise* strategy:
  1. Use `ext` to reduce to equalities on `re` and `im`.
  2. Simplify using `simp` with definitions (`mul_re`, `add_im`, etc.).
  3. Apply `ring` to verify arithmetic identities over `ℝ`.
- **Induction**: Used for `natCast`, `intCast`, `zsmul`, `nsmul`, and `pow` lemmas.
- **Case analysis**: On `z ≠ 0` for inversion properties (e.g., `mul_inv_cancel`).
- **Equational reasoning**: Heavy use of `congr_arg`, `ext`, and ` rfl` for definitional equalities.

---

### 🔹 **Imports & Scope**

**Primary imports**:
- `Mathlib.Algebra.CharZero.Lemmas`
- `Mathlib.Algebra.GroupWithZero.Divisibility`
- `Mathlib.Algebra.Star.Basic`
- `Mathlib.Data.Real.Basic`
- `Mathlib.Data.Set.Image`
- `Mathlib.Tactic.Ring`

**Scope & locale usage**:
- `ComplexConjugate` locale for `conj`.
- `SMul` scoped instance for `SMul R ℂ` via `SMul R ℝ`.
- `Interval` scoped for rectangle definitions.

---

Let me know if you'd like a dependency graph, usage statistics, or a formalization roadmap for ℂ in Lean.