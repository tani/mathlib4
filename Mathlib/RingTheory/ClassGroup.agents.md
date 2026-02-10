### Technical Metadata Brief: Ideal Class Group in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `toPrincipalIdeal` | `Kˣ →* (FractionalIdeal R⁰ K)ˣ` | Maps a nonzero element of the fraction field to the principal fractional ideal it generates. |
| `ClassGroup` | `Type _` | Quotient of invertible fractional ideals modulo principal ones: `(FractionalIdeal R⁰ K)ˣ ⧸ (toPrincipalIdeal).range`. |
| `ClassGroup.mk` | `(FractionalIdeal R⁰ K)ˣ →* ClassGroup R` | Projection of invertible fractional ideals into the class group. |
| `ClassGroup.mk0` | `(Ideal R)⁰ →* ClassGroup R` | Sends a nonzero integral ideal (in a Dedekind domain) to its class in the class group. |
| `ClassGroup.equiv` | `ClassGroup R ≃* (FractionalIdeal R⁰ K)ˣ ⧸ (toPrincipalIdeal R K).range` | Shows independence of the class group from the choice of fraction field `K`. |
| `ClassGroup.integralRep` | `FractionalIdeal R⁰ K → Ideal R` | Sends a fractional ideal to its numerator (an integral ideal representative). |
| `ClassGroup.mk_eq_one_iff` | `ClassGroup.mk I = 1 ↔ (I : Submodule R K).IsPrincipal` | Characterizes trivial class group elements as principal fractional ideals. |
| `ClassGroup.mk0_eq_mk0_iff` | `ClassGroup.mk0 I = ClassGroup.mk0 J ↔ ∃ x y ≠ 0, ⟨x⟩ * I = ⟨y⟩ * J` | Equivalence relation underlying the classical definition of ideal class group. |
| `ClassGroup.mk0_surjective` | `Function.Surjective ClassGroup.mk0` | Every class in the class group has an integral ideal representative. |
| `ClassGroup.mk0_integralRep` | `ClassGroup.mk0 (⟨I.num, ...⟩) = ClassGroup.mk I` | Relates `mk0` and `integralRep`: every class is represented by an integral ideal via numerator. |
| `card_classGroup_eq_one_iff` | `Fintype.card (ClassGroup R) = 1 ↔ IsPrincipalIdealRing R` | Class number 1 ⇔ PID (for Dedekind domains). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `toPrincipalIdeal`: maps to principal ideals.
  - `ClassGroup.mk`, `ClassGroup.mk0`: “make” elements of the class group.
  - `integralRep`: short for *integral representative*.
- **Suffixes**:
  - `_eq_iff`: characterizations of equality in terms of existence conditions.
  - `_iff`: biconditional theorems (e.g., `mk_eq_one_iff`, `mk0_eq_mk0_iff`).
- **Notation**:
  - `R⁰`: type of nonzero elements of `R` (non-zero-divisors in this context).
  - `FractionalIdeal R⁰ K`: fractional ideals over `R` in `K`.
  - `(FractionalIdeal R⁰ K)ˣ`: invertible fractional ideals (units in the monoid).
  - `⟨I, hI⟩`: subtype notation for nonzero ideals (`I ∈ (Ideal R)⁰`).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only`: simplification with many lemmas (e.g., `spanSingleton_mul_spanSingleton`, `Units.ext_iff`).
- `rw` / `erw`: rewriting using equalities; `erw` used for dependent types (post-#2644 Lean 4).
- `ext`: extensionality for ideals, functions, units.
- `convert`: for approximate unification (e.g., when proving equality up to known isomorphisms).
- `exact`, `refine`, `intro`: basic proof construction.
- `have`, `rcases`, `rintro`: local assumptions and destructuring.
- `congr`: congruence reasoning (e.g., for `QuotientGroup.congr`).
- `rw [← Units.eq_iff]`, `rw [Units.ext_iff]`: unit-specific rewriting.
- `rw [FractionalIdeal.canonicalEquiv_*]`: canonical equivalence lemmas.
- `aesop`: not explicitly used here, but `simp`-based automation dominates.

---

#### **4. Proof Logic**

- **Structure**:
  - Most proofs follow a pattern of:
    1. Reduce to known equivalences via `ClassGroup.equiv` or `ClassGroup.mk_eq_mk`.
    2. Use properties of `FractionalIdeal.canonicalEquiv`, `spanSingleton`, and `mk'`.
    3. Translate between fractional and integral ideals via `num`, `den`, `mk0`.
    4. Apply `Units.ext` or `Submodule.isPrincipal_iff` to reduce to element-wise conditions.
- **Induction Principles**:
  - `ClassGroup.induction`: reduce to fractional ideals via surjectivity of `ClassGroup.mk`.
- **Equivalence Proofs**:
  - Use `ClassGroup.equiv` to switch fraction fields and prove independence.
  - `ClassGroup.mk0_eq_mk0_iff` bridges the modern (fractional ideal quotient) and classical (ideal scaling) definitions.
- **Finiteness & PID**:
  - `Fintype` instance via `ClassGroup.induction` + `isPrincipal` for all ideals in a PID.
  - `card_classGroup_eq_one_iff` uses surjectivity of `mk0` and `mk0_eq_one_iff`.

---

#### **5. Imports**

- `Mathlib.RingTheory.DedekindDomain.Ideal`: foundational theory of Dedekind domains and ideals.
- Core dependencies:
  - `IsLocalization`, `IsFractionRing`, `FractionalIdeal`: for constructing fractional ideals and localization.
  - `Units`, `Subgroup`, `QuotientGroup`: for group-theoretic constructions.
  - `NonZeroDivisors`: for `R⁰` and nonzero elements.

---

### Summary

This file formalizes the **ideal class group** of a Dedekind domain using **fractional ideals** and their quotient by principal fractional ideals. It provides:
- A robust, field-independent definition (`ClassGroup.equiv`),
- A bridge to the classical definition (`ClassGroup.mk0_eq_mk0_iff`),
- Computational tools (`integralRep`, `mk0_surjective`),
- Characterizations of triviality (`mk_eq_one_iff`, `card_classGroup_eq_one_iff`),
- And finiteness results for PIDs.

The formalization is highly structured, leveraging Lean’s typeclass inference and canonical equivalences to ensure correctness and modularity.