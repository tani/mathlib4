**Technical Metadata Brief: Polynomial Cardinality in Lean 4 (Mathlib)**

---

### 1. **Key Definitions & Theorems**

| Name | Type / Statement | Purpose |
|------|------------------|---------|
| `cardinalMk_eq_max` | `#(R[X]) = max #R ℵ₀` | Exact cardinality of the polynomial ring over a *nontrivial* semiring `R`. |
| `cardinalMk_le_max` | `#(R[X]) ≤ max #R ℵ₀` | Upper bound on the cardinality of `R[X]`, valid for *any* semiring `R`. |
| `toFinsuppIso` | Implicitly used (from `Finsupp` theory) | Provides an equivalence `R[X] ≃₀ (ℕ →₀ R)`, i.e., polynomials ↔ finite support functions `ℕ → R`. |
| `mk_finsupp_lift_of_infinite`, `lift_uzero` | Lemmas from `Cardinal.Finsupp` | Used to compute cardinality of `AddMonoidAlgebra` (i.e., `R[X] ≅ Finsupp ℕ R`). |

> **Note**: `#(-)` denotes cardinality (`Cardinal.mk`), and `ℵ₀` is `cardinal.mk ℕ`.

---

### 2. **Naming Conventions**

- **Prefixes**:
  - `cardinalMk_` / `cardinal_mk_`: Relates to cardinality (`#(-)`) of structures.
  - `is_`, `mul_`, `dist_` are *not* used here — this file focuses on *cardinal arithmetic*.
- **Suffixes**:
  - `_eq_max`: Indicates equality with `max #R ℵ₀`.
  - `_le_max`: Indicates inequality upper-bounded by `max #R ℵ₀`.
- **Aliases**:
  - `cardinal_mk_eq_max` is deprecated in favor of `cardinalMk_eq_max` (consistent with Mathlib’s 2024 naming cleanup: camelCase for theorems).

---

### 3. **Tactic Stack**

- **Core tactics**:
  - `rw` (rewrite using equalities/equivalences)
  - `rfl` (reflexivity for definitional equalities)
  - `trans` / `trans_le` (transitivity of equality/inequality)
  - `cases` (case analysis on `subsingleton_or_nontrivial R`)
- **Library support**:
  - `simp_rw` is *not* used explicitly, but `rw` suffices due to `@[simp]` on `cardinalMk_eq_max`.
  - `mk_eq_one`, `one_le_aleph0`, `le_max_of_le_right` are from `Cardinal` library.

---

### 4. **Proof Logic**

- **For `cardinalMk_eq_max`**:
  1. Use `toFinsuppIso` to equate `#(R[X])` with `#(ℕ →₀ R)` (finite support functions).
  2. Apply `mk_finsupp_lift_of_infinite` (handles infinite `#R`) and `lift_uzero` (handles finite `#R`).
  3. Simplify using `max_comm` and `rfl`.

- **For `cardinalMk_le_max`**:
  1. Split on `subsingleton_or_nontrivial R`:
     - If `R` is subsingleton: `R[X]` has at most one element ⇒ `#(R[X]) = 1 ≤ max #R ℵ₀`.
     - If `R` is nontrivial: Apply `cardinalMk_eq_max.le`.

> **Pattern**: Structural case analysis + cardinal arithmetic lemmas + equivalence-based rewriting.

---

### 5. **Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.Polynomial.Basic` | Defines `R[X]`, polynomial ring, basic properties. |
| `Mathlib.SetTheory.Cardinal.Finsupp` | Provides `AddMonoidAlgebra`, `Finsupp`, and cardinal arithmetic lemmas (`mk_finsupp_lift_of_infinite`, etc.). |

- **Universe**: `universe u` — works in a single universe (polynomials over `Type u`).
- **Open scopes**: `Cardinal`, `Polynomial` — avoids repeated prefixes.

---

### Summary

This file establishes a foundational result:  
> For any semiring `R`, the polynomial ring `R[X]` has cardinality at most `max(#R, ℵ₀)`, and exactly `max(#R, ℵ₀)` if `R` is nontrivial.

It leverages the isomorphism `R[X] ≅ Finsupp ℕ R` and standard cardinal arithmetic, reflecting Lean 4/Mathlib’s style: precise, reusable, and theorem-driven.