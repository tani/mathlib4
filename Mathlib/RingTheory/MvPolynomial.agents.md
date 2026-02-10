### Technical Metadata Brief: Multivariate Polynomials over Fields (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `quotient_mk_comp_C_injective` | `[Field K] → (I : Ideal _) → I ≠ ⊤ → Function.Injective ((Ideal.Quotient.mk I).comp C)` | Shows that the composition of the quotient map with the constant polynomial embedding `C : K → MvPolynomial σ K` is injective when the ideal is proper. Used to reason about embeddings into quotient rings. |
| `rank_eq_lift` | `Module.rank K (MvPolynomial σ K) = lift.{v} #(σ →₀ ℕ)` | Relates the module rank of multivariate polynomials over `K` to the cardinality of finitely supported functions `σ →₀ ℕ`, lifted to a higher universe. |
| `rank_eq` | `Module.rank K (MvPolynomial σ K) = #(σ →₀ ℕ)` | Special case of `rank_eq_lift` when `σ : Type v`, i.e., when the universe levels align; identifies the rank directly with the cardinality of monomial indices. |
| `finrank_eq_zero` | `[Nonempty σ] → Module.finrank K (MvPolynomial σ K) = 0` | States that if the index type `σ` is nonempty, then the *finite* rank (i.e., dimension as a finite-dimensional module) is zero — because the module is infinite-dimensional. |
| `finrank_eq_one` | `[IsEmpty σ] → Module.finrank K (MvPolynomial σ K) = 1` | When `σ` is empty, `MvPolynomial σ K ≅ K`, so the finite rank is 1. |

**Auxiliary Concepts:**
- `basisMonomials σ K`: The standard basis of monomials for `MvPolynomial σ K`, used to compute rank/finiteness.
- `σ →₀ ℕ`: Type of finitely supported functions from `σ` to `ℕ`, indexing monomials.

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `rank_`, `finrank_`: Relating to module/module rank / finite rank.
  - `quotient_mk_`: Quotient ring homomorphism (`Ideal.Quotient.mk`).
  - `comp_`: Composition of ring/module homomorphisms.
- **Suffixes:**
  - `_injective`: Injectivity of a map.
  - `_eq`: Equality statement (often with cardinalities or ranks).
- **Other patterns:**
  - `lift.{v}`: Universe lifting for cardinal arithmetic.
  - `mvPolynomial`: Shortened to `mvP` in comments, but fully spelled out in code (`MvPolynomial`).

---

#### **3. Tactic Stack**

- **Core tactics:**
  - `rw`: Rewriting using equalities (e.g., `Ideal.Quotient.eq_zero_iff_mem`, `inv_mul_cancel₀`, `C_1`, `C.map_mul`).
  - `simp`: Simplification using lemmas like `rank_eq_lift`, `finrank_eq_zero_of_infinite`, etc.
  - `exact`, `refine`: Building proofs via partial goals (`?_`).
  - `cases`: Case analysis on `subsingleton_or_nontrivial K`.
  - `by_contradiction`: Used in `quotient_mk_comp_C_injective` to derive contradiction from non-injectivity.
- **Advanced/automation:**
  - `lift_lift`, `lift_umax`: Universe manipulation tactics (from `Cardinal`).
  - `linearIndependent.finrank_eq_zero_of_infinite`: A lemma used to deduce `finrank = 0` from infinite linear independence.

---

#### **4. Proof Logic**

- **General strategy:**
  - **Cardinal-based reasoning**: Proofs about rank rely on identifying a basis (`basisMonomials`) and computing its cardinality.
  - **Universe lifting**: When comparing ranks across universe levels, `lift_inj` and related lemmas are used to reduce to a common universe.
  - **Contrapositive/contradiction**: In `quotient_mk_comp_C_injective`, injectivity is shown by assuming a nonzero kernel element and deriving that the ideal must be the whole ring (contradicting `I ≠ ⊤`).
  - **Case analysis on `σ`**: For finite rank results, the proof splits on whether `σ` is empty or nonempty, using `subsingleton_or_nontrivial K` to handle field/non-field edge cases.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.MvPolynomial.CommRing` | Provides the commutative ring structure on `MvPolynomial σ K`. |
| `Mathlib.LinearAlgebra.Dimension.Finite` | Tools for finite-dimensional modules (e.g., `finrank`, `finiteDimensional`). |
| `Mathlib.LinearAlgebra.Dimension.StrongRankCondition` | Ensures rank is well-defined (e.g., for modules with basis). |
| `Mathlib.LinearAlgebra.FreeModule.StrongRankCondition` | Used to reason about free modules and their ranks. |
| `Mathlib.RingTheory.MvPolynomial.Basic` | Basic definitions and properties of multivariate polynomials (e.g., `C`, `monomial`, support). |

---

### Summary

This module formalizes foundational facts about multivariate polynomial rings over fields, especially their **module rank** and **finite rank behavior**, leveraging:
- The monomial basis (`basisMonomials`) to connect algebraic structure with set-theoretic cardinalities,
- Universe management for rank comparisons,
- Ideal-theoretic arguments for injectivity in quotient constructions.

It serves as a theoretical backbone for later developments involving dimensions, Hilbert functions, or Noetherian properties in multivariate settings.