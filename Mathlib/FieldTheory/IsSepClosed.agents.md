### Technical Metadata Brief: Separably Closed Fields and Separable Closures in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsSepClosed` | `class IsSepClosed : Prop` | Typeclass stating that every separable polynomial over `k` splits in `k`. |
| `IsSepClosed.splits_codomain` | `[IsSepClosed K] → (p : k[X]) → p.Separable → p.Splits f` | Ensures separable polynomials split under any ring homomorphism `f : k →+* K` when `K` is separably closed. |
| `IsSepClosed.splits_domain` | `[IsSepClosed k] → (p : k[X]) → p.Separable → p.Splits f` | Ensures separable polynomials split under any ring homomorphism `f : k →+* K` when `k` is separably closed. |
| `IsSepClosed.exists_root` | `[IsSepClosed k] → (p : k[X]) → p.degree ≠ 0 → p.Separable → ∃ x, IsRoot p x` | Guarantees existence of a root for non-constant separable polynomials. |
| `IsSepClosed.exists_root_C_mul_X_pow_add_C_mul_X_add_C` | `[IsSepClosed k] → ... → ∃ x, a * x ^ n + b * x + c = 0` | Solvability of certain sparse polynomials in separably closed fields under characteristic constraints. |
| `IsSepClosed.exists_pow_nat_eq` | `[IsSepClosed k] → (x : k) → (n : ℕ) → NeZero (n : k) → ∃ z, z ^ n = x` | Every element has an `n`-th root when `n ≠ 0` in `k`. |
| `IsSepClosed.of_exists_root` | `(∀ p, Monic → Irreducible → Separable → ∃ x, p.eval x = 0) → IsSepClosed k` | Characterization of separably closed fields via roots of irreducible separable polynomials. |
| `IsSepClosed.degree_eq_one_of_irreducible` | `[IsSepClosed k] → Irreducible p → Separable p → p.degree = 1` | All irreducible separable polynomials over a separably closed field are linear. |
| `IsSepClosed.algebraMap_surjective` | `[IsSepClosed k] → [Algebra k K] → [Algebra.IsSeparable k K] → Function.Surjective (algebraMap k K)` | Surjectivity of the structure map under separable extension + separably closed codomain. |
| `IsSepClosed.lift` | `[Algebra k L] → [Algebra.IsSeparable k L] → [IsSepClosed M] → L →ₐ[K] M` | Existence of a `K`-algebra homomorphism from a separable extension into a separably closed field. |
| `IsSepClosure` | `class IsSepClosure [Algebra k K] : Prop` | Typeclass stating `K` is a separable closure of `k`: separably closed and separable over `k`. |
| `IsSepClosure.equiv` | `[IsSepClosure k L] → [IsSepClosure k M] → L ≃ₐ[K] M` | Uniqueness up to `K`-algebra isomorphism of separable closures. |
| `IsSepClosure.isAlgClosure_of_perfectField` | `[Algebra k K] → [IsSepClosure k K] → [PerfectField k] → IsAlgClosure k K` | For perfect base fields, separable closure = algebraic closure. |
| `IsSepClosure.of_isAlgClosure_of_perfectField` | `[Algebra k K] → [IsAlgClosure k K] → [PerfectField k] → IsSepClosure k K` | Converse: algebraic closure is separable closure over perfect fields. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isSepClosed_`: properties of separably closed fields.
  - `isSepClosure_`: properties of separable closures.
  - `lift`, `equiv`: canonical constructions (noncomputable).
- **Suffixes**:
  - `_of_separable`, `_of_irreducible`, `_of_perfectField`: specify hypotheses.
  - `_codomain`, `_domain`: distinguish between splitting in codomain vs domain of map.
- **Pattern**:
  - `exists_*`: existence results (e.g., roots, roots of specific forms).
  - `degree_eq_one_of_*`: structural constraints on irreducible polynomials.
  - `of_*`: implication-based definitions or instances.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `convert` | To reuse existing lemmas with minor adjustments (e.g., `splits_map_iff`). |
| `simp_rw` / `simp` | Rewriting using definitional equalities and lemmas (e.g., `eval₂_eq_eval_map`). |
| `compute_degree!` | Automated degree computations for polynomials. |
| `by_cases` / `rcases` | Case analysis on equalities or orderings (e.g., `hx : x = 0`). |
| `obtain ⟨x, hx⟩ := ...` | Extracting witnesses from existential statements. |
| `rw [← mem_roots, h]` | Manipulating membership in roots via equivalence. |
| `exact`, `refine`, `intro` | Standard proof construction. |
| `have h : ...; clear h` | Introducing intermediate facts. |
| `aesop` / `linarith` | Linear arithmetic and simplification (e.g., for `hn' : 2 ≤ n`). |
| `field_simp`, `ring` | Field/ring simplifications (e.g., for `eval_C`, `eval_X`). |

---

#### **4. Proof Logic**

- **Inductive/structural reasoning**:
  - Most proofs rely on polynomial factorization properties (`Splits`, `Separable`, `Irreducible`).
  - Key strategy: reduce to known results (e.g., `IsAlgClosed.splits`, `PerfectField.separable_of_irreducible`).
- **Common pattern**:
  1. Use separability to ensure splitting in separably closed field.
  2. Extract roots via `exists_root_of_splits`.
  3. Use algebraic structure (e.g., minimal polynomials, `aeval`) to derive field-theoretic properties.
- **Uniqueness proofs**:
  - Use `AlgEquiv.ofBijective` on `lift` maps in both directions.
  - Leverage `Normal.toIsAlgebraic.algHom_bijective₂` for bijectivity.
- **Instance inference**:
  - Priority instances (`priority := 100`) ensure automatic use of `IsSepClosed` → `IsAlgClosed` under perfectness.

---

#### **5. Imports**

- **Core dependency**:
  ```lean
  import Mathlib.FieldTheory.Galois.Basic
  ```
- **Implicit dependencies** (via `Mathlib.FieldTheory.*`):
  - `Polynomial.Splits`, `Polynomial.Separable`, `Polynomial.Minpoly`
  - `Algebra.IsSeparable`, `Algebra.IsAlgebraic`, `Algebra.IsPurelyInseparable`
  - `FieldTheory.PerfectField`, `FieldTheory.Galois`
  - `IntermediateField`, `AlgHom`, `AlgEquiv`

---

### Summary

This file formalizes the theory of **separably closed fields** and **separable closures**, including:
- Characterizations of separable closure,
- Existence/uniqueness of separable closures,
- Interaction with algebraic closures under perfectness,
- Structural consequences (e.g., surjectivity of structure maps, degree constraints).

It builds on foundational field theory in Mathlib, especially Galois theory and polynomial factorization, and uses Lean’s typeclass system to manage algebraic structure and separability conditions.