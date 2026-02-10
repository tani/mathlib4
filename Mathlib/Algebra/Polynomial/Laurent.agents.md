Here's a structured technical metadata summary of the provided Lean 4 file on **Laurent polynomials**:

---

### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `LaurentPolynomial R` | `abbrev LaurentPolynomial (R : Type*) [Semiring R] := AddMonoidAlgebra R ℤ` — Laurent polynomials over a semiring `R`, implemented as finitely supported functions `ℤ →₀ R`. |
| `R[T;T⁻¹]` | Notation for `LaurentPolynomial R`. |
| `C : R →+* R[T;T⁻¹]` | Ring homomorphism embedding `R` as constant Laurent polynomials (`C = singleZeroRingHom`). |
| `T : ℤ → R[T;T⁻¹]` | Sequence of powers of the formal variable `T`, defined as `T n = Finsupp.single n 1`. |
| `Polynomial.toLaurent : R[X] →+* R[T;T⁻¹]` | Ring homomorphism embedding ordinary polynomials into Laurent polynomials via `mapDomainRingHom` along `Int.ofNatHom`. |
| `trunc : R[T;T⁻¹] →+ R[X]` | Left-inverse of `toLaurent`, truncates negative-degree terms. |
| `degree : R[T;T⁻¹] → WithBot ℤ` | Degree of a Laurent polynomial, defined as `f.support.max`. |
| `invert : R[T;T⁻¹] ≃ₐ[R] R[T;T⁻¹]` | Automorphism sending `T ↦ T⁻¹`, implemented via `AddMonoidAlgebra.domCongr` with `AddEquiv.neg`. |
| `smeval : Sˣ → R[T;T⁻¹] → S` | Evaluation of a Laurent polynomial at a unit `x ∈ Sˣ`, using scalar multiplication. |
| `leval : R[T;T⁻¹] →ₗ[R] S` | `R`-linear evaluation map, induced by `smeval`. |

#### Key Theorems:
| Name | Statement / Purpose |
|------|---------------------|
| `single_eq_C_mul_T` | `Finsupp.single n r = C r * T n` — every monomial is a scalar multiple of a power of `T`. |
| `T_add`, `T_sub`, `T_pow` | `T` respects addition, subtraction, and natural exponentiation: `T m * T n = T (m+n)`, etc. |
| `commute_T` | `T n` commutes with all Laurent polynomials. |
| `induction_on`, `induction_on'` | Induction principles for Laurent polynomials: reduce to `C a * T n` and sums. |
| `leftInverse_trunc_toLaurent` | `trunc ∘ toLaurent = id` — `trunc` is a left-inverse to the embedding of polynomials. |
| `isLocalization` | `R[T;T⁻¹]` is the localization of `R[X]` at the powers of `X`. |
| `toLaurent_reverse` | `toLaurent p.reverse = invert (toLaurent p) * T p.natDegree` — relation between reversal and inversion. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `C_` / `T_`: for constant and variable-power constructors.
  - `toLaurent_`: for maps from `Polynomial`.
  - `trunc_`: for truncation-related lemmas.
  - `degree_`: for degree-related lemmas.
  - `smeval_`, `leval_`: for evaluation-related definitions/lemmas.
- **Suffixes**:
  - `_apply`: for function application lemmas (e.g., `C_apply`, `T_apply`).
  - `_eq`: for equality lemmas (e.g., `T_add`, `degree_C_mul_T`).
  - `_le`: for inequality lemmas (e.g., `degree_C_mul_T_le`).
  - `_of_`: for conditional or case-based lemmas (e.g., `degree_C_mul_T_ite`, `degree_C_ite`).
- **Special**:
  - `invert_`, `smeval_`, `leval_`: domain-specific naming for inversion and evaluation.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp_rw`: heavily used to normalize expressions into `C a * T n` form.
- `rw`: rewriting using lemmas like `T_add`, `single_eq_C_mul_T`.
- `induction_on`, `induction_on'`: custom elimination principles for structural induction.
- `aesop`: used in simple goals (e.g., `C_apply`).
- `convert`, `ext`, `congr`: for extensionality and congruence.
- `split_ifs`, `lift`, `exact`, `refine`: for case analysis and construction.
- `dsimp`, `erw`: for definitional simplification and rewriting.

---

### **4. Proof Logic**

- **Structural Induction**: Most proofs use `LaurentPolynomial.induction_on` or `induction_on'`, reducing to:
  - Base case: `M (C a)` (constants),
  - Closure under addition,
  - Closure under multiplication by `T` (positive and negative steps).
- **Reduction to Polynomials**: Many properties are proven by reducing to `Polynomial` via `trunc` or `toLaurent_injective`.
- **Finsupp Reasoning**: Proofs often rely on `Finsupp`-level lemmas (`single_apply`, `support_single_subset`, etc.).
- **Localization Perspective**: The `isLocalization` proof uses universal properties and explicit inverses via `T n`.

---

### **5. Imports & Scope**

#### Primary Imports:
- `Mathlib.Algebra.Polynomial.AlgebraMap`
- `Mathlib.Algebra.Polynomial.Reverse`
- `Mathlib.Algebra.Polynomial.Inductions`
- `Mathlib.RingTheory.Localization.Defs`

#### Scope & Dependencies:
- Built on `AddMonoidAlgebra R ℤ`, i.e., finitely supported functions `ℤ →₀ R`.
- Compatible with `Polynomial` via `toLaurent`, but with more exposed implementation (closer to `Finsupp`).
- Uses `CommSemiring`/`Semiring` typeclasses for algebraic structure.
- Supports localization, evaluation, degree theory, and inversion.

---

Let me know if you'd like a **diagram of the key maps**, **API cheat sheet**, or **comparison with `Polynomial`**.