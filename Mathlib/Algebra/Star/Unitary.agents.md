### Technical Brief: `unitary R` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `unitary R` | `Submonoid R` | Submonoid of elements `U : R` satisfying `star U * U = 1 ∧ U * star U = 1`. |
| `mem_iff` | `U ∈ unitary R ↔ star U * U = 1 ∧ U * star U = 1` | Characterization of membership in `unitary R`. |
| `star_mul_self_of_mem`, `mul_star_self_of_mem` | `(hU : U ∈ unitary R) → star U * U = 1`, `U * star U = 1` | Projections of membership condition. |
| `star_mem` | `U ∈ unitary R → star U ∈ unitary R` | Closure under star operation. |
| `star_mem_iff` | `star U ∈ unitary R ↔ U ∈ unitary R` | Equivalence of membership under star. |
| `instance : Group (unitary R)` | `Group (unitary R)` | Unitary elements form a group, with inverse given by `star`. |
| `instance : InvolutiveStar (unitary R)` | `InvolutiveStar (unitary R)` | Star is involutive on unitaries. |
| `instance : StarMul (unitary R)` | `StarMul (unitary R)` | Multiplication is star-compatible on unitaries. |
| `star_eq_inv` | `star U = U⁻¹` | Star coincides with group inverse in `unitary R`. |
| `toUnits : unitary R →* Rˣ` | Monoid hom to group of units | Embeds unitaries into units of `R`. |
| `toUnits_injective` | Injectivity of `toUnits` | Unitaries embed faithfully into units. |
| `map_mem` / `map` | `f : F` (star + monoid hom) preserves unitaries | Induces group homomorphism `unitary R →* unitary S`. |
| `instance : CommGroup (unitary R)` (under `CommMonoid`) | Commutative group structure | Unitaries are abelian if base monoid is. |
| `spectrum.unitary_conjugate` | `spectrum R (u * a * star u) = spectrum R a` | Unitary conjugation preserves spectrum. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `star_`: properties involving the star operation (`star_mul_self`, `star_mem`, `star_eq_inv`).
  - `coe_`: coercion lemmas from `unitary R` to `R` (`coe_star`, `coe_mul_star_self`, `coe_inv`).
  - `map_`: behavior under homomorphisms (`map_mem`, `map`).
  - `mem_`: membership criteria (`mem_iff`, `mem_iff_star_mul_self`).
  - `isStarNormal_`: normality w.r.t. star (`isStarNormal_of_mem_unitary`, `instIsStarNormal`).

- **Suffixes**:
  - `_of_mem`: derived from membership hypothesis (`star_mul_self_of_mem`).
  - `_self`: self-conjugacy under star (`star_mul_self`, `mul_star_self`).
  - `_iff`: equivalence characterizations (`mem_iff`, `star_mem_iff`).

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `simp only [...]` — for simplifying using precise lemmas (e.g., `star_one`, `mul_one`).
- `rw [...]` — rewriting using hypotheses or definitions.
- `calc` — chaining equalities in `unitary` proofs (e.g., verifying `star (U * B) * (U * B) = 1`).
- `refine ⟨?_, ?_⟩` — splitting conjunctions.
- `ext` — extensionality for subtype equality.
- `aesop`, `ring`, `simp_rw` — used implicitly or in background (not explicit here, but standard in similar algebraic developments).
- `lift ... to Rˣ` — for lifting elements to units using `IsUnit`.

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - **Membership verification**: Prove both `star U * U = 1` and `U * star U = 1`, often via `calc` blocks.
  - **Group axioms**: Use `star` as inverse; verify `inv_mul_cancel` via `star_mul_self`.
  - **Homomorphism properties**: Use `map_star`, `map_mul` from `StarHomClass`/`MonoidHomClass`.
  - **Spectrum invariance**: Reduce to known result `spectrum.units_conjugate`, using `toUnits`.

- **Common pattern**:
  > *Induction or case analysis on structure → simplify using `simp` + `rw` → apply `calc` for equalities → conclude via subtype extensionality (`ext`) or `Subtype.ext`.*

---

#### **5. Imports & Scope**

**Primary imports**:
- `Mathlib.Algebra.Group.Submonoid.Operations` — for `Submonoid`, `map`, etc.
- `Mathlib.Algebra.Star.SelfAdjoint` — star monoid infrastructure.
- `Mathlib.Algebra.Algebra.Spectrum` — for `spectrum` and conjugation lemmas.

**Scope**:
- Applies to **star monoids** (`[Monoid R] [StarMul R]`), with refinements to:
  - `CommMonoid` → `CommGroup`
  - `GroupWithZero` → division & integer powers
  - `Ring` + `StarRing` → additive negation
- Specialized to matrices via `Matrix.UnitaryGroup`.

---

### Summary

This file formalizes the **unitary group** of a star monoid, establishing its structure as a group (with inverse = star), embedding into the unit group, and proving key properties like spectrum preservation under conjugation. The development is clean, modular, and leverages Mathlib’s algebraic hierarchy (submonoids, star classes, spectra). Naming and proof patterns follow Lean/Mathlib conventions closely.