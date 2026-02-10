### Technical Metadata Brief: Ax-Grothendieck Theorem Formalization in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ax_grothendieck_of_locally_finite` | `{ι K R : Type*} [Field K] [Finite K] [CommRing R] [Finite ι] [Algebra K R] [IsAlgebraic K R] → (ps : ι → MvPolynomial ι R) → S : Set (ι → R) → S.MapsTo (eval ps) S → S.InjOn (eval ps) → S.SurjOn (eval ps)` | Proves surjectivity of injective polynomial maps over *algebraic extensions of finite fields*, using Noetherianity of finitely generated subalgebras. |
| `genericPolyMapSurjOnOfInjOn` | `Language.ring.Sentence` | Encodes the first-order sentence expressing: *if a polynomial map is total on a definable set `S`, injective on `S`, then it's surjective on `S`*, parameterized by a formula `φ` and monomial bounds `mons`. |
| `realize_genericPolyMapSurjOnOfInjOn` | `Sentence.Realize ↔ ∀ v p, ... → S.MapsTo f S → S.InjOn f → S.SurjOn f S` | Relates the semantic realization of the above sentence to concrete polynomial maps and definable sets. |
| `ACF_models_genericPolyMapSurjOnOfInjOn_of_prime` | `Theory.ACF p ⊨ᵇ genericPolyMapSurjOnOfInjOn φ mons` | Shows the sentence holds in all algebraically closed fields of *prime characteristic*, via reduction to finite fields and `ax_grothendieck_of_locally_finite`. |
| `ACF_models_genericPolyMapSurjOnOfInjOn_of_prime_or_zero` | `Theory.ACF p ⊨ᵇ ...` | Extends the above to *all* algebraically closed fields (including characteristic 0), using infinitary arguments over primes. |
| `ax_grothendieck_of_definable` | `{K : Type*} [Field K] [IsAlgClosed K] [Finite ι] → S : Set (ι → K) → c.Definable Language.ring S → ps : ι → MvPolynomial ι K → S.MapsTo f S → S.InjOn f → S.SurjOn f` | Main model-theoretic Ax-Grothendieck: surjectivity of injective polynomial maps on *definable* subsets of `K^n` over algebraically closed `K`. |
| `ax_grothendieck_zeroLocus` | `I : Ideal (MvPolynomial ι K) → p : ι → MvPolynomial ι K → S := zeroLocus I → S.MapsTo f S → S.InjOn f → S.SurjOn f` | Special case where `S` is an algebraic set (`zeroLocus` of an ideal), using definability of zero loci. |
| `ax_grothendieck_univ` | `p : ι → MvPolynomial ι K → (fun v => eval v ∘ p).Injective → (fun v => eval v ∘ p).Surjective` | Classical statement: injective polynomial self-maps of `K^n` are surjective over algebraically closed `K`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `ax_grothendieck_*`: Main theorems in the Ax-Grothendieck family.
  - `genericPolyMapSurjOnOfInjOn`: Encodes a *generic* (uniform) first-order statement for polynomial maps.
  - `realize_*`: Relates syntactic formulas to semantic satisfaction.
  - `ACF_models_*`: States that Axiom System of Algebraically Closed Fields (ACF) proves a sentence.

- **Suffixes**:
  - `_of_definable`, `_of_locally_finite`, `_zeroLocus`, `_univ`: Distinguish variants based on context (definable set, finite field extension, algebraic set, full space).
  - `_of_prime`, `_of_prime_or_zero`: Characteristic-based variants.

- **Other**:
  - `mapsTo`, `injOn`, `surjOn`: Standard set-theoretic properties encoded in language.
  - `eval`, `genericPolyMap`, `zeroLocus`, `support`: Core polynomial/evaluation notions.

---

#### **3. Tactic Stack**

- **Core automation**:
  - `simp +singlePass only [...]`: Used heavily for simplification with performance tuning (avoids exponential blowup).
  - `aesop`: Likely used in earlier stages (not explicit here, but implied by model-theoretic context).
  - `rcases`, `rintro`, `exact`, `refine`: Standard proof construction.
  - `rw [...] at this`: Rewriting using semantic equivalences (e.g., `realize_sentence_iff`, `ACF_isComplete`).
  - `convert`, `ext`, `funext`: Equality reasoning.
  - `have := ...; exact ...`: Intermediate lemma introduction.

- **Model theory & algebra**:
  - `simp only [Sentence.Realize, Formula.Realize, ...]`: Deep simplification over semantic realizability.
  - `haveI := ...`: Implicit typeclass inference (e.g., `compatibleRingOfRing`, `charP_of_injective_algebraMap`).
  - `noncomputable section`: Required due to use of algebraic closures.

---

#### **4. Proof Logic**

- **High-level strategy**:
  1. **Model-theoretic reduction**:
     - Encode the statement as a first-order sentence `genericPolyMapSurjOnOfInjOn`.
     - Prove it holds in *all* algebraically closed fields by:
       - Showing it holds in ACFₚ for prime `p` (via finite fields + `ax_grothendieck_of_locally_finite`).
       - Extending to characteristic 0 using infinitary compactness (infinite primes).
  2. **Algebraic-geometric specialization**:
     - Use definability of zero loci (`mvPolynomial_zeroLocus_definable`) to reduce `zeroLocus` case to definable case.
     - Use `ax_grothendieck_of_definable` to get full generality.

- **Key lemmas & flows**:
  - `ax_grothendieck_of_locally_finite`: 
    - Extract finite coefficient set `s`.
    - Pass to subalgebra `Algebra.adjoin K s`, which is finite over `K` (hence a finite field extension).
    - Use `Finite.injective_iff_surjective` on the restricted map.
  - `realize_genericPolyMapSurjOnOfInjOn`:
    - Expands semantics of polynomial evaluation, support constraints, and quantifiers.
    - Uses `mvPolynomialSupportLEEquiv` to linearize monomial indices.
  - `ACF_models_*`:
    - Leverages *completeness* of ACF (i.e., all models of same characteristic are elementarily equivalent).
    - Reduces to algebraically closed field ` AlgebraicClosure (ZMod p)`.

---

#### **5. Imports & Scope**

| Module | Role |
|--------|------|
| `Mathlib.RingTheory.Algebraic.Basic` | Algebraic extensions, integrality, `IsAlgebraic`. |
| `Mathlib.Data.Fintype.Card` | Finite type arithmetic (e.g., `Fintype.ofFinite`). |
| `Mathlib.ModelTheory.Algebra.Field.IsAlgClosed` | ACF theory, algebraic closures, completeness. |
| `Mathlib.ModelTheory.Algebra.Ring.Definability` | Definable sets, formulas, realizability. |
| `Mathlib.RingTheory.Polynomial.Basic` | Multivariate polynomials (`MvPolynomial`), evaluation, support. |

**Domain scope**:  
- **Algebra**: Commutative algebra, field theory, polynomial rings.  
- **Model theory**: First-order logic, definability, ACF, Lefschetz principle.  
- **Geometry**: Algebraic sets (`zeroLocus`), definable subsets of `K^n`.  

**Notable features**:
- Uses *noncomputable* definitions (algebraic closures).
- Integrates semantic (model-theoretic) and syntactic (formula-based) reasoning.
- Leverages Lean’s `Language.ring` and `BoundedFormula` for first-order encoding.

--- 

This formalization exemplifies a *bridge* between constructive algebra (finite field techniques) and abstract model theory (completeness, definability), culminating in a powerful generalization of the Ax–Grothendieck theorem.