Here's a structured technical metadata brief extracted from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `WeierstrassCurve R` | `Type u → Type u` (structure) | Represents a Weierstrass curve over a commutative ring `R`, given by coefficients `a₁, a₂, a₃, a₄, a₆`. |
| `b₂, b₄, b₆, b₈` | `R` | Intermediate coefficients used in discriminant and j-invariant computations. |
| `c₄, c₆` | `R` | Standard modular invariants; relate to `b₂, b₄, b₆`. |
| `Δ : R` | `R` | Discriminant of the Weierstrass curve; vanishes iff the curve is singular (over fields). |
| `twoTorsionPolynomial : Cubic R` | `Cubic R` | Cubic polynomial whose roots are X-coordinates of non-zero 2-torsion points (over suitable fields). |
| `IsElliptic : Prop` | `Prop` | Typeclass asserting `Δ` is a unit (i.e., curve is nonsingular in good cases). |
| `Δ' : Rˣ` | `Rˣ` | Unit-valued discriminant for elliptic curves (when `IsElliptic` holds). |
| `j : R` | `R` | j-invariant: `j = Δ'⁻¹ * c₄³`, invariant under isomorphism. |
| `map φ` | `WeierstrassCurve A` | Base change of a Weierstrass curve along ring homomorphism `φ : R →+* A`. |
| `baseChange [Algebra R A]` | `WeierstrassCurve A` | Special case of `map` for algebra maps. |
| `c_relation` | `1728 * Δ = c₄³ - c₆²` | Fundamental identity linking discriminant and modular invariants. |
| `twoTorsionPolynomial_disc` | `disc = 16 * Δ` | Discriminant of 2-torsion polynomial is 16× the curve discriminant. |
| `j_eq_zero_iff'` | `j = 0 ↔ c₄³ = 0` | Characterization of j-invariant zero. |
| `map_j` | `(W.map φ).j = φ W.j` | j-invariant commutes with base change. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `b₂`, `b₄`, `b₆`, `b₈`, `c₄`, `c₆`, `Δ`, `j`: standard mathematical notation.
  - `map_`, `coe_`, `inv_`, `isUnit_`: indicate operations or projections.
  - `of_char_*`: specializations for fixed characteristic (e.g., `b₂_of_char_two`).
  - `twoTorsionPolynomial_*`: properties of the 2-torsion polynomial.

- **Suffixes**:
  - `_of_char_*`: characteristic-specific simplifications.
  - `_iff_*`: biconditional lemmas (often involving zero or unit conditions).
  - `_ne_zero`: proofs of non-vanishing under assumptions.

- **Structure fields**: `a₁`, `a₂`, `a₃`, `a₄`, `a₆` — coefficients of the Weierstrass equation.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp only [...]` | Simplify using explicit lemmas (e.g., `map_a₁`, `b₂`, `Δ`). |
| `map_simp` (macro) | Expands to `simp only [map_ofNat, map_neg, map_add, map_sub, map_mul, map_pow]`. |
| `ring1` / `ring` | Prove polynomial identities (e.g., `c_relation`, `b_relation`). |
| `linear_combination` | Solve linear combinations over `R`, especially in characteristic `p` simplifications. |
| `ext` | Extensionality for structures (e.g., proving equality of `WeierstrassCurve`s). |
| `rw`, `simp_rw` | Rewriting; `simp_rw` used when instance transfer is needed (e.g., for `Δ'`, `j`). |
| `congr_arg` | Equality of function applications. |
| `apply_fun` + `using` | Apply function to both sides of an equation (for injectivity proofs). |

---

### **4. Proof Logic**

- **Structure equality**: Use `ext` + `rcases mk.inj` + `ext <;> assumption`.
- **Polynomial identities**: `simp only [...]` + `ring1` (e.g., `b_relation`, `c_relation`, `twoTorsionPolynomial_disc`).
- **Characteristic-specific simplifications**:
  - Use `linear_combination` with `CharP.cast_eq_zero` to eliminate coefficients divisible by `p`.
  - Often combine with `rw [def_of_char_p]` to reduce definitions.
- **Unit/nonzero arguments**:
  - Use `IsUnit.mul_iff`, `Units.mul_right_eq_zero`, `IsReduced.pow_eq_zero_iff`.
  - `twoTorsionPolynomial_disc_isUnit` leverages `IsUnit` properties.
- **Base change**: Prove lemmas by `simp` + `map_*` lemmas; `map_map`, `map_id` are definitional (`rfl`).
- **j-invariant zero**: Reduce to `c₄ = 0` or `a₁ = 0`/`b₂ = 0` depending on characteristic, using `j_eq_zero_iff'` and `IsReduced` assumptions.

---

### **5. Imports & Scope**

**Primary dependencies**:
- `Mathlib.Algebra.CharP.Defs`: Characteristic `p` theory.
- `Mathlib.Algebra.CubicDiscriminant`: Discriminant of cubic polynomials.
- `Mathlib.RingTheory.Nilpotent.Defs`: Nilpotent elements (used implicitly via `IsReduced`).
- `Mathlib.Tactic.FieldSimp`: For field simplifications (though not directly used here).
- `Mathlib.Tactic.LinearCombination`: Solves linear identities over rings.

**Scope**:
- Formalizes Weierstrass curves and elliptic curves over *arbitrary* commutative rings.
- Emphasizes computational aspects (explicit formulas, discriminants, j-invariant).
- Notes limitations: only equivalent to geometric elliptic curves when `Pic(R)` or 12-torsion is trivial.
- Targets applications in arithmetic geometry (e.g., LMFDB-style discriminants).

---

Let me know if you'd like a dependency graph or a summary of how this fits into the broader `Mathlib` elliptic curve ecosystem.