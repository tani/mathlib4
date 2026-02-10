Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Invariant Extensions and Frobenius Elements**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Algebra.IsInvariant` | `class IsInvariant : Prop` | States that every `G`-fixed element of `B` lies in the image of `A`. Formally: `∀ b : B, (∀ g : G, g • b = b) → ∃ a : A, algebraMap A B a = b`. |
| `MulSemiringAction.charpoly` | `b : B ↦ ∏ g : G, (X - C (g • b))` | Defines the *characteristic polynomial* of an element `b` under the finite group action. Used to construct monic polynomials over `A`. |
| `Algebra.IsInvariant.charpoly_mem_lifts` | `charpoly G b ∈ Polynomial.lifts (algebraMap A B)` | Shows that the coefficients of `charpoly G b` lie in the image of `A`, assuming `IsInvariant A B G`. |
| `Algebra.IsInvariant.isIntegral` | `Algebra.IsIntegral A B` | Proves that `B/A` is integral under `IsInvariant A B G` and finite `G`. |
| `Algebra.IsInvariant.exists_smul_of_under_eq` | `∃ g : G, Q = g • P` | Transitivity of `G`-action on primes of `B` lying over a fixed prime `P ⊆ A`. |
| `IsFractionRing.stabilizerHom` | `MulAction.stabilizer G Q →* (L ≃ₐ[K] L)` | Canonical monoid homomorphism from the stabilizer of `Q` to automorphisms of the residue field extension `L/K`. |
| `IsFractionRing.stabilizerHom_surjective` | `Function.Surjective (stabilizerHom …)` | Main Frobenius-type result: the stabilizer surjects onto `Aut(L/K)`. |
| `Ideal.Quotient.stabilizerHom_surjective` | `Function.Surjective (Ideal.Quotient.stabilizerHom …)` | Surjectivity of the stabilizer map onto `Aut((B/Q)/(A/P))`. |

#### **2. Naming Conventions**

- **Prefixes:**
  - `isInvariant_`: properties of the `IsInvariant` class.
  - `charpoly_`: properties of the characteristic polynomial.
  - `fixed_of_fixed1`, `fixed_of_fixed2`, `fixed_of_fixed1_aux1`, etc.: technical lemmas for proving fixed-point behavior.
  - `smul_`, `coeff_smul`, `eval_charpoly`: actions and evaluations related to group action.
  - `stabilizerHom_`: maps involving stabilizers and automorphism groups.

- **Suffixes:**
  - `_surjective`, `_injective`, `_mem_lifts`, `_eq`, `_le`, `_ne`: indicate properties like surjectivity, membership, equality, or inequality.

- **General patterns:**
  - `algebraMap` used for canonical maps between rings/fields.
  - `•` for group action (`smul`).
  - `under A` for contraction of ideals along `algebraMap A B`.
  - `lifts (algebraMap A B)` for polynomials with coefficients in the image of `A`.

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw`, `simp`, `simp_rw`: for rewriting and simplification (especially with `algebraMap`, `smul`, `eval`, `coeff`).
- `exact`, `apply`, `intro`, `cases`: basic proof structure.
- `convert`, `congrArg`, `ext`: for equality reasoning on maps and polynomials.
- `Finset.sum_ite_eq'`, `Finset.prod_ite`, `Finset.prod_const`: for simplifying finite sums/products over conditional expressions.
- `ring`, `field_simp`: for algebraic simplifications in fields/rings.
- `aesop`: for automated reasoning in simple goals (e.g., in `fixed_of_fixed1_aux1`).
- `nontriviality`, `decide`, `decidable_eq`: for handling decidability and nontriviality assumptions.

#### **4. Proof Logic**

- **Structure of main proofs:**
  - **Integral extension (`isIntegral`)**: Use `charpoly_mem_lifts` + `lifts_and_natDegree_eq_and_monic` to get a monic polynomial over `A` satisfied by `b`.
  - **Transitivity (`exists_smul_of_under_eq`)**: Use prime avoidance + `isInvariant` to find `g` with `Q ≤ g • P`, then symmetry to get equality.
  - **Surjectivity (`stabilizerHom_surjective`)**:
    - Reduce to showing any `f ∈ Aut(L/K)` fixes the image of `B/Q` in `L`.
    - Use `fixed_of_fixed1` (via `fixed_of_fixed2`) to reduce to showing `f` fixes elements of `B/Q`.
    - Construct `a ∈ B` fixed by `G` and `b ∈ B` with controlled behavior mod `Q`, using `charpoly` and root multiplicity.
    - Apply `isInvariant` to lift `a` to `A`, then use algebra maps and automorphism properties.

- **Inductive/constructive style**: Heavy use of finite products over `G`, evaluation at elements, and lifting via `isInvariant`.

#### **5. Imports**

- `Mathlib.FieldTheory.Fixed`: For fixed points, automorphism groups, and related lemmas.
- `Mathlib.RingTheory.Ideal.Over`: For ideal theory over ring maps (e.g., `under`, `LiesOver`, `stabilizerHom`).

---

This file formalizes a generalization of the Frobenius element in algebraic number theory, using invariant theory and group actions on rings. It culminates in a surjectivity result for stabilizers onto residue field automorphism groups — a key step toward Frobenius existence in general settings.