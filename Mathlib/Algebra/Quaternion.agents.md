### Technical Brief: Quaternion Algebras in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `QuaternionAlgebra R a b` | Structure: `ℍ[R, a, b]` — quaternion algebra over commutative ring `R` with `i² = a`, `j² = b`. Implemented as 4-tuple `(re, imI, imJ, imK) : R⁴`. |
| `Quaternion R` | `ℍ[R]` — standard quaternions: `QuaternionAlgebra R (-1) (-1)`. |
| `QuaternionAlgebra.equivProd c₁ c₂` | `ℍ[R, c₁, c₂] ≃ R × R × R × R` — product equivalence. |
| `QuaternionAlgebra.equivTuple c₁ c₂` | `ℍ[R, c₁, c₂] ≃ Fin 4 → R` — tuple (function) equivalence. |
| `QuaternionAlgebra.linearEquivTuple c₁ c₂` | `ℍ[R, c₁, c₂] ≃ₗ[R] Fin 4 → R` — linear equivalence (basis representation). |
| `QuaternionAlgebra.basisOneIJK c₁ c₂` | Basis of `ℍ[R, c₁, c₂]` over `R`: `{1, i, j, k}`. |
| `QuaternionAlgebra.swapEquiv c₁ c₂` | `ℍ[R, c₁, c₂] ≃ₐ[R] ℍ[R, c₂, c₁]` — algebra isomorphism swapping coefficients. |
| `QuaternionAlgebra.star` | Conjugation: `star ⟨a, b, c, d⟩ = ⟨a, -b, -c, -d⟩`. |
| `QuaternionAlgebra.starAe` | `ℍ[R, c₁, c₂] ≃ₐ[R] ℍ[R, c₁, c₂]ᵐᵒᵖ` — algebra equivalence to opposite ring via conjugation. |
| `QuaternionAlgebra.instRing` | `Ring ℍ[R, c₁, c₂]` for `CommRing R`. |
| `QuaternionAlgebra.instStarRing` | `StarRing ℍ[R, c₁, c₂]`. |
| `QuaternionAlgebra.algebra` | `Algebra R ℍ[R, c₁, c₂]` (via `algebraMap`). |
| `QuaternionAlgebra.rank_eq_four` / `finrank_eq_four` | `Module.rank / finrank = 4` under `StrongRankCondition`. |
| `QuaternionAlgebra.self_add_star` | `a + star a = 2 * a.re`. |
| `QuaternionAlgebra.star_mul_eq_coe` | `star a * a ∈ R` (i.e., scalar). |
| `QuaternionAlgebra.coe_mul_eq_smul` | `↑r * a = r • a` (coerced scalars act by multiplication). |
| `QuaternionAlgebra.star_eq_self` (in `CharZero`, `NoZeroDivisors`) | `star a = a ↔ a ∈ R`. |
| `QuaternionAlgebra.star_eq_neg` | `star a = -a ↔ a.re = 0`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `coe_`: coercion from `R → ℍ[R, a, b]`.
  - `im_`, `re_`, `imI_`, `imJ_`, `imK_`: projection functions.
  - `star_`: conjugation-related lemmas.
  - `mul_`, `add_`, `neg_`, `sub_`, `zero_`, `one_`: structure operations.
  - `natCast_`, `intCast_`: coercion from `ℕ`, `ℤ`.
  - `smul_`: scalar multiplication.
  - `equiv_`, `linearEquiv_`: equivalence constructions.

- **Suffixes**:
  - `_re`, `_imI`, `_imJ`, `_imK`: component-wise behavior.
  - `_im`: imaginary part (as quaternion).
  - `_mk`: behavior on explicit `mk` terms.
  - `_eq_coe`: result lies in image of `coe`.
  - `_commutes`, `_commute`: centrality/commutativity facts.

- **Notation**:
  - `ℍ[R, a, b]`, `ℍ[R]` — via scoped notation `open scoped Quaternion`.

---

#### **3. Tactic Stack**

- **Core simplification & rewriting**:
  - `simp`, `simp only`, `simp_rw`
  - `ext` (extensionality for structure equality)
  - `congr_arg` (for equality of tuples/structures)

- **Ring-theoretic reasoning**:
  - `ring` (polynomial ring simplification)
  - `ring1` (weaker ring tactic, sometimes used in older files)

- **Algebraic structure inference**:
  - `inferInstanceAs` (to reuse instances from `QuaternionAlgebra R c₁ c₂`)
  - `exact`, `refine`, `apply`

- **Logical & set-theoretic**:
  - `rw`, `apply`, `intro`, `cases`, `induction`
  - `aesop` (for simple goals involving `coe`, `star`, etc.)
  - `norm_cast` (for coercion normalization)

- **Equivalence proofs**:
  - `rfl`, `congr`, `ext`, `funext`, `simp`

---

#### **4. Proof Logic & Strategy**

- **Structure-based reasoning**: Most proofs use `ext` to reduce to component-wise equalities (`re`, `imI`, `imJ`, `imK`), then `simp` + `ring` to verify identities.

- **Instance reuse**: Many instances (`Ring`, `StarRing`, `Algebra`, `Module`, etc.) are derived via `inferInstanceAs` from the general `QuaternionAlgebra` case.

- **Equivalence-based proofs**: Proofs about rank, basis, module structure rely on `linearEquivTuple` and `basisOneIJK`.

- **Inductive/structural lemmas**:
  - `mk_mul_mk`, `mk_add_mk`, `neg_mk`, `smul_mk`, etc., give explicit formulas for operations on `mk` terms.
  - `star_mul_eq_coe`, `mul_star_eq_coe` show that `a * star a` and `star a * a` are central (scalar).

- **Special cases**:
  - In `CharZero`, `NoZeroDivisors`, `star`-fixed points are exactly scalars.
  - In `LinearOrderedField`, `ℍ[R]` is a `DivisionRing` (not shown in excerpt, but mentioned in docstring).

---

#### **5. Imports & Scope**

**Primary dependencies**:
- `Mathlib.Algebra.Algebra.Equiv` — algebra isomorphisms.
- `Mathlib.Algebra.Star.SelfAdjoint` — `StarRing`, `Star`, self-adjoint elements.
- `Mathlib.LinearAlgebra.Dimension.StrongRankCondition` — rank/finiteness conditions.
- `Mathlib.LinearAlgebra.FreeModule.Basic`, `Finite.Basic` — module/freeness.
- `Mathlib.SetTheory.Cardinal.Arithmetic` — cardinal arithmetic for `rank`.

**Scope**:
- Defines `QuaternionAlgebra R a b` for arbitrary `CommRing R`, enabling integer/rational quaternions.
- Fully **computable** (no classical choice).
- Designed for reuse: `ℍ[R]` is a special case of `QuaternionAlgebra`.

---

### Summary

This file formalizes quaternion algebras over arbitrary commutative rings, with full algebraic structure (`Ring`, `StarRing`, `Algebra`, `Module`, `Basis`, etc.). It emphasizes **computability**, **modularity**, and **reuse** via `QuaternionAlgebra` as a general constructor, with `ℍ[R]` as the classical case. Proofs rely heavily on extensionality, simplification, and ring tactics, with extensive use of equivalences to `R⁴` or `Fin 4 → R`.