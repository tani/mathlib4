### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**
- **`Monic.irreducible_of_irreducible_map`**  
  - **Type**: `∀ {R S : Type*} [CommRing R] [IsDomain R] [CommRing S] [IsDomain S] (φ : R →+* S) (f : R[X]), Monic f → Irreducible (f.map φ) → Irreducible f`  
  - **Purpose**: Provides a criterion for proving irreducibility of a *monic* polynomial over an integral domain `R` by checking irreducibility of its image under a ring homomorphism `φ : R →+* S` into another integral domain `S`.  
  - **Special case**: Used to prove irreducibility over `ℤ` via reduction modulo a prime `p` (i.e., `φ : ℤ → ℤ/pℤ`).

#### 2. **Naming Conventions**
- **Prefixes**:
  - `isUnit_`: e.g., `isUnit_of_isUnit_leadingCoeff_of_isUnit_map`, `isUnit_of_mul_eq_one` — indicates criteria for an element being a unit.
  - `map_`: e.g., `map_mul`, `mapRingHom`, `f.map φ` — refers to polynomial mapping under ring homomorphism.
- **Suffixes**:
  - `_of_`: e.g., `irreducible_of_irreducible_map`, `isUnit_of_...` — indicates a conditional statement ("if X then Y").
- **Structure**:
  - `leadingCoeff_mul`: lemma about leading coefficient of a product.
  - `congr_arg`: used to lift equalities through functors (here, `map φ`).

#### 3. **Tactic Stack**
- **Core tactics**:
  - `refine`: used to construct proofs with holes (`?_`).
  - `rw`: rewriting using equalities (e.g., `← h`, `h_mon`, `mul_comm`).
  - `dsimp`: simplifies definitions (e.g., unfolding `Monic`).
  - `apply`: applies lemmas or implications.
  - `exact`: provides a direct proof for a goal.
  - `congr_arg`: lifts equalities through function application.
  - `imp`: used in `have q := ...; refine ... <;> apply ... <;> apply ...` to handle implications in subgoals.
- **Domain-specific automation**:
  - `ring`: likely used implicitly (not visible here, but common in polynomial arithmetic).
  - `aesop`: not used here, but may appear in related lemmas.

#### 4. **Proof Logic**
- **Strategy**:
  1. **Decompose irreducibility**: Use `irreducible` definition as `¬isUnit f ∧ ∀ a b, f = a * b → isUnit a ∨ isUnit b`.
  2. **Non-unit part**: Show `f` is not a unit by contradiction: if `f` were a unit, then `f.map φ` would be a unit (via `IsUnit.map`), contradicting `h_irr.not_unit`.
  3. **Product decomposition**: Assume `f = a * b`, map both sides via `φ`, use `h_irr` on `f.map φ = a.map φ * b.map φ` to get `isUnit (a.map φ) ∨ isUnit (b.map φ)`.
  4. **Lift unit property**: Use `isUnit_of_isUnit_leadingCoeff_of_isUnit_map`, which requires:
     - `f` monic (so `leadingCoeff f = 1`),
     - `a.map φ` or `b.map φ` a unit,
     - and control over leading coefficients via `leadingCoeff_mul`.
  5. **Leading coefficient analysis**: Use `leadingCoeff_mul a b` and `h_mon` to deduce `leadingCoeff a * leadingCoeff b = 1`, enabling `isUnit_of_mul_eq_one`.

#### 5. **Imports**
- **Core dependencies**:
  - `Mathlib.Algebra.Polynomial.Eval.Coeff`: for coefficient-related lemmas (e.g., `leadingCoeff_mul`).
  - `Mathlib.Algebra.Polynomial.Eval.Degree`: for degree/leading coefficient behavior under multiplication and mapping.
  - `Mathlib.Algebra.Prime.Defs`: for definitions related to primes (context for special case over `ℤ/pℤ`).
- **Implicit assumptions**:
  - `CommRing`, `IsDomain`: ensures integral domain structure (no zero divisors, commutative ring with 1).
  - `AddMonoidAlgebra`, `Finset`: used internally in polynomial definitions (via `Polynomial` reexports).

---

This module exemplifies a *base-change* irreducibility criterion, leveraging structural properties of monic polynomials and ring homomorphisms between integral domains. It is foundational for modular irreducibility tests (e.g., reduction mod `p`).