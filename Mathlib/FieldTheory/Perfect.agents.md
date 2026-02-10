### Technical Metadata Brief: Perfect Fields and Rings in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `PerfectRing` | `class PerfectRing (R : Type*) (p : ℕ) [CommSemiring R] [ExpChar R p] : Prop` | Defines a *perfect ring* of characteristic `p` as one where the Frobenius map `x ↦ xᵖ` is bijective. |
| `PerfectField` | `class PerfectField (K : Type*) [Field K] : Prop` | Defines a *perfect field* as one where every irreducible polynomial is separable. |
| `bijective_frobenius` | `Bijective (frobenius R p)` | Core hypothesis of `PerfectRing`; asserts Frobenius is bijective. |
| `frobeniusEquiv` | `R ≃+* R` | The Frobenius automorphism for a perfect ring (constructible due to bijectivity). |
| `iterateFrobeniusEquiv` | `R ≃+* R` | Iterated Frobenius automorphism (for `n ≥ 0`). |
| `PerfectRing.ofSurjective` | `Surjective (frobenius R p) → PerfectRing R p` | Surjectivity of Frobenius suffices for perfection in reduced rings. |
| `PerfectRing.ofFiniteOfIsReduced` | `[Finite R] [IsReduced R] → PerfectRing R p` | Finite reduced rings of char `p` are perfect. |
| `PerfectRing.toPerfectField` | `PerfectRing K p → PerfectField K` | A field perfect in Serre’s sense is perfect in the classical sense. |
| `PerfectField.toPerfectRing` | `PerfectField K → PerfectRing K p` | A perfect field of char `p` is perfect in Serre’s sense. |
| `PerfectField.ofCharZero` | `CharZero K → PerfectField K` | All char 0 fields are perfect. |
| `PerfectField.ofFinite` | `[Finite K] → PerfectField K` | All finite fields are perfect. |
| `separable_iff_squarefree` | `g.Separable ↔ Squarefree g` | Over a perfect field, separability ⇔ square-freeness. |
| `Algebra.IsAlgebraic.isSeparable_of_perfectField` | `[IsAlgebraic K L] [PerfectField K] → IsSeparable K L` | Algebraic extensions of perfect fields are separable. |
| `Algebra.IsAlgebraic.perfectField` | `[IsAlgebraic K L] [PerfectField K] → PerfectField L` | Algebraic extensions of perfect fields are perfect. |
| `polynomial_expand_eq` | `expand R p f = (f.map (frobeniusEquiv R p).symm) ^ p` | Key structural identity for `expand` over perfect rings. |
| `not_irreducible_expand` | `¬ Irreducible (expand R p f)` | `expand` of any polynomial is never irreducible over perfect rings. |
| `roots_expand`, `roots_expand_pow` | Explicit descriptions of roots of `expand R p f` and `expand R (p^n) f` | Relates roots of expanded polynomials to original via Frobenius (equiv) inverse. |
| `rootsExpandEquivRoots`, `rootsExpandPowEquivRoots` | `≃` between root sets of `expand R p f` and `f` | Bijection of root sets over perfect rings (via Frobenius). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `frobenius_`: Frobenius map or its variants (`frobenius`, `frobeniusEquiv`, `frobenius_apply_frobeniusEquiv_symm`).
  - `iterateFrobenius_`: Iterated Frobenius (`iterateFrobenius`, `iterateFrobeniusEquiv`, `iterateFrobenius_add_apply`).
  - `rootsExpand_`: Maps/bijections between root sets of expanded polynomials (`rootsExpandToRoots`, `rootsExpandEquivRoots`).
  - `perfect_`: Properties of perfect structures (`perfectRing`, `perfectField`).
  - `expand_`: Polynomial expansion (`expand`, `expand_char`, `expand_X`, `expand_C`).

- **Suffixes**:
  - `_equiv`: Equiv/automorphism versions (`frobeniusEquiv`, `iterateFrobeniusEquiv`).
  - `_apply`: Application form of definitions (`frobeniusEquiv_def`, `rootsExpandEquivRoots_apply`).
  - `_symm`: Inverse maps (`frobeniusEquiv_symm`, `iterateFrobeniusEquiv_symm`).
  - `_le`, `_subset`, `_eq`: Root/multiset relations (`roots_expand_image_frobenius_subset`, `roots_expand_eq`).

---

#### **3. Tactic Stack**

- **Core automation**:
  - `aesop`: Used for routine goal solving (e.g., in `PerfectRing.ofFiniteOfIsReduced`, `of_surjective`).
  - `simp`: Heavy use of `simp` with custom lemmas (`[simp]`, `simp_rw`, `simp only`).
  - `rw`: Rewriting with definitional equalities and lemmas (e.g., `rw [map_sub, aeval_X_pow]`).
  - `ext`: Extensionality for functions, ring homs, multiset equality.
  - `convert`: For partial unification (e.g., in `roots_expand_pow_map_iterateFrobenius_le`).
  - `exact`, `assumption`, `refine`: Goal-directed proof construction.
  - `rcases`, `obtain`, `rintro`: Case analysis and destructuring.
  - `have`, `suffices`: Intermediate lemma introduction.
  - `convert ← ...`: Backward chaining via `convert` with reversed direction.

- **Algebraic reasoning**:
  - `ring`: For polynomial/ring identities (implicit in `simp`/`aesop`).
  - `multiset`-specific tactics: `count_roots`, `Multiset.map_map`, `Multiset.nsmul`.
  - `Finset`-based reasoning: `Finset.image_toFinset`, `Finset.setOf_mem`, `Finset.coe_image`.

---

#### **4. Proof Logic**

- **Inductive/structural reasoning**:
  - Proofs often proceed by:
    1. **Case analysis on characteristic** (`char 0` vs `char p > 0`).
    2. **Using Frobenius bijectivity** to construct inverses or equivs.
    3. **Lifting elements via splitting fields** (e.g., in `PerfectField.toPerfectRing`).
    4. **Reducing to minimal polynomials** and using separability assumptions.
    5. **Multiset/root counting** for polynomial identities (especially in `roots_expand*` lemmas).

- **Common proof patterns**:
  - *Frobenius bijectivity ⇒ automorphism*: Construct `frobeniusEquiv` via `RingEquiv.ofBijective`.
  - *Separability ⇔ square-freeness*: Use `separable_of_irreducible` + `squarefree` ↔ `∀ p ∣ f, p ∣ f' ⇒ p ∣ 1`.
  - *Algebraic extensions*: Reduce to minimal polynomials; use `minpoly.irreducible` + `separable_of_irreducible`.
  - *Root mapping*: Show inclusion first (`roots_expand_image_frobenius_subset`), then equality via bijectivity.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.FieldTheory.Separable` | Defines separable polynomials/field extensions; core for `PerfectField`. |
| `Mathlib.FieldTheory.SplittingField.Construction` | Provides splitting fields, `rootOfSplits`, `aeval`, etc., used in `PerfectField.toPerfectRing`. |
| `Mathlib.Algebra.CharP.Reduced` | Supplies `IsReduced`, `frobenius_inj`, and properties of Frobenius in reduced rings. |

**Scope**: This module formalizes foundational results in *commutative algebra* and *field theory*, especially around:
- Frobenius endomorphisms,
- Separability,
- Perfectness in both Serre’s (ring-theoretic) and classical (field-theoretic) senses,
- Interactions between polynomial expansion (`expand`) and Frobenius.

It serves as a theoretical backbone for further work in Galois theory, algebraic geometry (e.g., perfect schemes), and model theory of fields.

--- 

Let me know if you'd like a dependency graph or a summary of proof obligations for a specific theorem.