### Technical Brief: `SurjectiveOnStalks` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `SurjectiveOnStalks` | `f : R →+* S → Prop` | Defines that for every prime ideal `Q ⊆ S`, with `P = f⁻¹(Q)`, the induced map on localizations `R_P → S_Q` is surjective. |
| `surjective_localRingHom_iff` | `∀ P : Ideal S, P.IsPrime → (Function.Surjective (Localization.localRingHom _ P f rfl) ↔ ∀ s : S, ∃ x r : R, ∃ c ∉ P, f r ∉ P ∧ c * f r * s = c * f x)` | Gives a concrete algebraic criterion for surjectivity of the localized map: every element of `S` becomes a fraction `f(x)/f(r)` up to a denominator not in `P`. |
| `surjectiveOnStalks_iff_forall_ideal` | `f.SurjectiveOnStalks ↔ ∀ I : Ideal S, I ≠ ⊤ → ∀ s : S, ∃ x r : R, ∃ c ∉ I, f r ∉ I ∧ c * f r * s = c * f x` | Reformulates surjectivity on stalks using arbitrary proper ideals instead of just primes (via maximal ideals). |
| `surjectiveOnStalks_iff_forall_maximal` | `f.SurjectiveOnStalks ↔ ∀ I : Ideal S, I.IsMaximal → Function.Surjective (Localization.localRingHom _ I f rfl)` | Surjectivity on stalks can be checked only at maximal ideals. |
| `surjectiveOnStalks_iff_forall_maximal'` | Same as above but in existential form (like `surjective_localRingHom_iff`). | Useful for constructive proofs. |
| `surjectiveOnStalks_of_exists_div` | `(∀ x : S, ∃ r s : R, IsUnit (f s) ∧ f s * x = f r) → SurjectiveOnStalks f` | If every element of `S` is “divisible” by a unit image under `f`, then `f` is surjective on stalks. |
| `surjectiveOnStalks_of_surjective` | `Function.Surjective f → SurjectiveOnStalks f` | Surjective ring homomorphisms are trivially surjective on stalks. |
| `SurjectiveOnStalks.comp` | `SurjectiveOnStalks g → SurjectiveOnStalks f → SurjectiveOnStalks (g.comp f)` | Stability under composition. |
| `SurjectiveOnStalks.of_comp` | `SurjectiveOnStalks (g.comp f) → SurjectiveOnStalks g` | If a composition is surjective on stalks, then the second map is too. |
| `SurjectiveOnStalks.exists_mul_eq_tmul` | Under `algebraMap R T` surjective on stalks, for any `x ∈ S ⊗_R T` and prime `J ⊆ T`, ∃ `t, r, a` with `(1 ⊗ r • t) * x = a ⊗ t` and `r • t ∉ J`. | Key technical lemma for base change arguments; used to control tensor products. |
| `surjectiveOnStalks_of_isLocalization` | `[Algebra R S] [IsLocalization M S] → SurjectiveOnStalks (algebraMap R S)` | Localization maps are surjective on stalks. |
| `SurjectiveOnStalks.baseChange` | If `R → T` is surjective on stalks, then `S → S ⊗_R T` is too. | Stability under base change (tensoring). |
| `surjectiveOnStalks_iff_of_isLocalHom` | `[IsLocalRing S] [IsLocalHom f] → f.SurjectiveOnStalks ↔ Function.Surjective f` | In the local case, surjectivity on stalks is equivalent to plain surjectivity. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `surjectiveOnStalks_`: predicates or lemmas about `SurjectiveOnStalks`.
  - `surjective_localRingHom_`: lemmas about surjectivity of localized maps.
- **Suffixes**:
  - `_iff`: characterizations (biconditionals).
  - `_of_`: implications from stronger assumptions (e.g., `surjective`, `exists_div`).
  - `_comp`, `_of_comp`: composition-related lemmas.
  - `_baseChange`: base change stability.
  - `_of_isLocalization`, `_of_isLocalHom`: special cases.
- **Variables**:
  - `f : R →+* S`, `g : S →+* T`, `h : R →+* T`: typical ring homomorphisms.
  - `P, Q, I, J`: ideals (often prime or maximal).
  - `x, y, s, t, r, a, c`: generic elements.

---

#### **3. Tactic Stack**

The proofs rely heavily on:

- `simp_rw`: for rewriting with definitional equivalences (e.g., `surjectiveOnStalks_iff_forall_ideal`).
- `induction x using TensorProduct.ind`: structural induction on tensor products.
- `obtain ⟨…⟩ := H …`: destructuring existential or universal hypotheses.
- `convert … using 1 <;> ring`: for equational reasoning in commutative rings.
- `rw [← RingHom.coe_comp, ← Localization.localRingHom_comp]`: manipulating coercion and localization maps.
- `simp only [tmul_smul, Algebra.TensorProduct.algebraMap_apply, …]`: simplifying tensor algebra expressions.
- `exact`, `refine`, `apply`: standard proof construction.
- `Ideal.mem_comap`, `mem_nonunits_iff`, `IsUnit.*`: ideal and unit reasoning.

---

#### **4. Proof Logic**

- **Structure of main proofs**:
  - Most proofs reduce to checking surjectivity at primes/maximals via `surjective_localRingHom_iff`.
  - Use of `Localization.ind` or `TensorProduct.ind` for inductive arguments.
  - For tensor product lemmas: induction on `x`, then use surjectivity hypothesis to lift denominators.
  - For base change: reduce to `exists_mul_eq_tmul`, then construct explicit preimages using the hypothesis.
- **Common patterns**:
  - *Reduction to maximal ideals*: via `I.exists_le_maximal`.
  - *Denominator management*: extracting `c ∉ I`, `f r ∉ I` to ensure localization is valid.
  - *Unit lifting*: in local case, `IsUnit (f r)` implies `r` is a unit (via `isUnit_of_map_unit`).

---

#### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.RingTheory.Localization.AtPrime`: for `localRingHom`, prime localization.
  - `Mathlib.RingTheory.TensorProduct.Basic`: for tensor products and algebra maps.
- **Domain scope**:
  - Commutative algebra (localization, prime/maximal ideals, tensor products).
  - Algebraic geometry (preparation for *immersions*, though not yet formalized here).
  - Local ring theory (`IsLocalRing`, `IsLocalHom`).

---

#### **Summary**

This file formalizes a key property of ring maps—*surjectivity on stalks*—and establishes its stability under composition, base change, and localization. It provides multiple equivalent characterizations and leverages localization theory and tensor algebra to prove structural lemmas. The development is highly technical and tailored for future use in algebraic geometry, especially in the study of morphisms of schemes (e.g., immersions).