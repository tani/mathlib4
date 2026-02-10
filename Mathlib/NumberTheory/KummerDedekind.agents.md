Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Kummer–Dedekind Theorem in Lean 4**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `conductor R x` | `Ideal S` | Largest ideal of `S` contained in the subalgebra `R⟨x⟩`. |
| `quotAdjoinEquivQuotMap hx h_alg` | `R⟨x⟩ ⧸ I·R⟨x⟩ ≃+* S ⧸ I·S` | Ring isomorphism under coprimality condition on conductor and `I`. |
| `normalizedFactorsMapEquivNormalizedFactorsMinPolyMk hI hI' hx hx'` | `{J ∈ normalizedFactors (I·S)} ≃ {d ∈ normalizedFactors (f mod I)}` | Bijection between prime factors of `I·S` and those of the reduction of the minimal polynomial `f` modulo `I`. |
| `emultiplicity_factors_map_eq_emultiplicity` | Equality of multiplicities under the above bijection | Proves that multiplicities are preserved by the bijection. |
| `normalizedFactors_ideal_map_eq_normalizedFactors_min_poly_mk_map` | `normalizedFactors (I·S) = Multiset.map (equiv.symm) (normalizedFactors (f mod I)).attach` | Full statement of the monogenic Kummer–Dedekind theorem: factorizations match up to the bijection. |
| `Ideal.irreducible_map_of_irreducible_minpoly` | `Irreducible (f mod I) → Irreducible (I·S)` | Sufficient condition for `I·S` to be irreducible, via irreducibility of `f mod I`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `conductor_`: properties of the conductor ideal.
  - `quotAdjoinEquivQuotMap_`: properties of the quotient isomorphism.
  - `normalizedFactors_`: statements about normalized factor multisets.
  - `emultiplicity_`: multiplicity preservation.
- **Suffixes**:
  - `_map`: refers to ideal or polynomial map (e.g., `I.map`, `Polynomial.map`).
  - `_mk`: refers to quotient map (`Ideal.Quotient.mk I`).
  - `_equiv_`: indicates an equivalence/bijection.
  - `_of_`: indicates a condition or hypothesis (e.g., `of_irreducible_minpoly`).
- **Variables**:
  - `R`, `S`: base and extension rings.
  - `I`: prime/maximal ideal in `R`.
  - `x`: generator of monogenic extension `S = R⟨x⟩`.
  - `hx`, `hx'`: hypotheses on conductor and integrality.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only`: simplification with local hypotheses and definitions.
- `rw`: rewriting using equalities or equivalences.
- `exact`, `refine`, `apply`: constructing proofs term-by-term.
- `cases`: case analysis on hypotheses or inductive types.
- `have`, `suffices`: intermediate lemma introduction.
- `ext`: extensionality for ideals, multisets, functions.
- `ring`: for commutative ring arithmetic.
- `aesop`: automated reasoning for simple goals (used implicitly in some `simpa` calls).
- `subst`: substitution after equality reasoning.
- `multiset`-specific tactics: `Multiset.map_injective`, `Multiset.count_eq_zero`, etc.

---

#### **4. Proof Logic**

- **Structure**:
  1. **Technical lemmas** on conductors and coprimality (`conductor_subset_adjoin`, `prod_mem_ideal_map_of_mem_conductor`, `comap_map_eq_map_adjoin_of_coprime_conductor`).
  2. **Isomorphism construction** (`quotAdjoinEquivQuotMap`) under coprimality.
  3. **Bijection of normalized factors** via:
     - Quotient isomorphism `f`.
     - Use of `normalizedFactorsEquivOfQuotEquiv` to lift to factor sets.
     - Identification of quotient with polynomial ring modulo minimal polynomial.
  4. **Multiplicities preserved** via `emultiplicity_factors_map_eq_emultiplicity`.
  5. **Full theorem** via multiset equality (`ext` + `count` reasoning).
  6. **Irreducibility corollary** via singleton factorization and `normalizedFactors_irreducible`.

- **Inductive/Case-based reasoning** appears in conductor and ideal membership proofs.
- **Classical logic** used for existence of bijections and normalization.

---

#### **5. Imports & Dependencies**

- **Core imports**:
  - `Mathlib.RingTheory.DedekindDomain.Ideal`: Dedekind domain ideal theory.
  - `Mathlib.RingTheory.IsAdjoinRoot`: Adjoining roots, power bases, minimal polynomials.

- **Key modules used**:
  - `Ideal`, `Polynomial`, `DoubleQuot`, `UniqueFactorizationMonoid`, `Algebra`, `RingHom`.
  - `IsLocalization` (for conductor lemma in localized context).
  - `IsDedekindDomain`, `IsIntegrallyClosed`, `IsDomain`, `NoZeroSMulDivisors`.

- **Assumptions**:
  - `R`: commutative ring, domain, integrally closed, Dedekind domain.
  - `S`: Dedekind domain, algebra over `R`, no zero divisors over `R`.
  - `I`: maximal, non-zero ideal.
  - `x ∈ S`: integral over `R`, generates `S` monogenically.

---

Let me know if you'd like a diagram of the bijection or a formalized summary of the main theorem in symbolic form.