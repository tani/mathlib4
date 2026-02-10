### Technical Brief: Cubic Polynomials and Discriminants in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Cubic R` | `structure` with fields `a b c d : R` | Represents a cubic polynomial `a·X³ + b·X² + c·X + d` over a semiring `R`. |
| `toPoly (P : Cubic R)` | `R[X]` | Converts a `Cubic` into an actual polynomial. |
| `disc (P : Cubic R)` | `R` | Computes the *discriminant* of a cubic: <br> `b²c² − 4ac³ − 4b³d − 27a²d² + 18abcd`. |
| `roots (P : Cubic R)` | `Multiset R` (when `IsDomain R`) | Multiset of roots of `P.toPoly`. |
| `equiv` | `Cubic R ≃ { p : R[X] // p.degree ≤ 3 }` | Equivalence between cubics and polynomials of degree ≤ 3. |
| `map (φ : R →+* S) (P : Cubic R)` | `Cubic S` | Maps coefficients of a cubic along a semiring homomorphism. |
| `disc_ne_zero_iff_roots_nodup` | `P.disc ≠ 0 ↔ (map φ P).roots.Nodup` | **Main theorem**: discriminant nonzero ⇔ roots are distinct (no duplicates). |
| `eq_sum_three_roots` | `map φ P = ⟨φa, φa·-(x+y+z), φa·(xy+xz+yz), φa·-(xyz)⟩` | Relates coefficients to elementary symmetric sums of roots. |
| `splits_iff_card_roots` | `Splits φ P.toPoly ↔ card (map φ P).roots = 3` | Over a splitting field, polynomial splits iff it has 3 roots (counted with multiplicity). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `of_`: conditional simplifications (e.g., `of_a_eq_zero`, `of_b_ne_zero`) — when a coefficient is zero/nonzero.
  - `eq_`: coefficient-root relations (e.g., `eq_sum_three_roots`, `eq_prod_three_roots`).
  - `disc_`: discriminant-related (e.g., `disc_eq_prod_three_roots`, `disc_ne_zero_iff_roots_ne`).
  - `leadingCoeff_`: leading coefficient behavior under coefficient conditions.
  - `degree_`, `natDegree_`: degree/natural degree behavior.

- **Suffixes**:
  - `_eq_zero`, `_ne_zero`: for implications about zero/nonzero status.
  - `_iff_`: biconditional statements.
  - `'` (prime): variants for explicit coefficient tuples (e.g., `monic_of_a_eq_one'`).

- **Structure fields**: `a b c d` — standard cubic coefficients.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp only [...]`: heavy use of `simp` with explicit lemmas (e.g., `coeff_add`, `coeff_C_mul_X`, `prod_cons`, `nodup_cons`).
- `ring` / `ring1`: for polynomial identity verification (especially in discriminant derivations).
- `rw [...]`: rewriting using `toPoly`, `map`, `coeff_eq_*`, `degree_*`, etc.
- `ext`: extensionality for structure equality or polynomial equality.
- `injection`: for extracting equalities from injective maps (e.g., `toPoly_injective`).
- `tauto`: logical simplification (e.g., in `disc_ne_zero_iff_roots_nodup`).
- `nontriviality R`: to ensure ring is nontrivial when needed (e.g., for `Monic` proofs).
- `cases` / `intro`: for inductive or case-based reasoning on naturals or multiset structure.

---

#### **4. Proof Logic**

- **Structure-to-polynomial correspondence**:
  - Prove `toPoly_injective` → `toPoly_eq_zero_iff` → `coeff_*_of_eq`.
  - Use `coeffs` lemma to fix coefficients of `toPoly`.

- **Degree/natDegree reasoning**:
  - Inductive case analysis on which leading coefficient is nonzero.
  - Use `degree_cubic`, `degree_quadratic`, `degree_linear`, `degree_C`, `degree_zero` lemmas.
  - `equiv` proof uses `degree_le_iff_coeff_zero` and `nat.succ_eq_add_one`.

- **Roots over splitting fields**:
  - Assume `Splits φ P.toPoly` → extract roots `{x, y, z}`.
  - Derive coefficient formulas via Vieta (`eq_sum_three_roots`).
  - Compute discriminant in terms of roots (`disc_eq_prod_three_roots`) using `ring1`.
  - Translate discriminant ≠ 0 into pairwise distinctness of roots (`disc_ne_zero_iff_roots_ne`).
  - Use multiset properties (`nodup`, `card`) to get final equivalence.

- **Discriminant ↔ distinct roots**:
  - Key logical chain:  
    `disc ≠ 0`  
    ⇔ `∏_{i<j} (r_i - r_j)² ≠ 0`  
    ⇔ all `r_i ≠ r_j`  
    ⇔ `roots.Nodup`.

---

#### **5. Imports & Scope**

- **Primary import**:  
  `Mathlib.Algebra.Polynomial.Splits` — provides:
  - `Splits` predicate for polynomial splitting.
  - `roots`, `mem_roots_iff`, `card_roots`, `eq_prod_roots_of_splits`, `splits_map_iff`.

- **Implicit dependencies**:
  - `Mathlib.Algebra.Polynomial.Basic` (via `Polynomial` namespace).
  - `Mathlib.Algebra.Semiring.Basic`, `Mathlib.Algebra.Ring.Basic`.
  - `Mathlib.Data.Multiset.Basic`, `Mathlib.Data.Finset.Basic`.
  - `Mathlib.Data.Equiv.Basic`.

- **Domain scope**:
  - Works over **semirings** (`Semiring R`) for basic definitions.
  - Requires **rings** (`Ring R`) for discriminant definition.
  - Requires **fields** (`Field F`, `Field K`) and **splitting field maps** for root/discriminant theorems.
  - Uses `IsDomain` for root multiset properties (`mem_roots_iff`, `card_roots_le`).

---

### Summary

This file formalizes the theory of cubic polynomials and their discriminants in Lean 4, with a focus on the equivalence between nonzero discriminant and distinct roots over a splitting field. It leverages multiset-based root representations, Vieta’s formulas, and polynomial splitting theory. The structure is clean and modular, with extensive use of `simp`-friendly lemmas and careful handling of edge cases (e.g., zero leading coefficient). The main theorem `disc_ne_zero_iff_roots_nodup` is a cornerstone result connecting algebraic and combinatorial properties of cubics.