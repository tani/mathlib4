### Technical Brief: Relative Rank of Subfields and Intermediate Fields (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Subfield.relrank A B` | `Cardinal` | Defined as `[B : A ⊓ B]`, i.e., the module rank of `B` over `A ⊓ B`. Generalizes field extension degree. |
| `Subfield.relfinrank A B` | `ℕ` | Natural-number version: `finrank (A ⊓ B) B`. Returns `0` if the extension is infinite. |
| `IntermediateField.relrank A B` | `Cardinal` | Lifted from `Subfield.relrank` via `toSubfield`. |
| `IntermediateField.relfinrank A B` | `ℕ` | Lifted from `Subfield.relfinrank`. |
| `relrank_eq_of_inf_eq` | `h : A ⊓ C = B ⊓ C ⊢ relrank A C = relrank B C` | Independence of `relrank` from the left argument when intersections with a fixed `C` agree. |
| `relrank_eq_rank_of_le` | `h : A ≤ B ⊢ relrank A B = [B : A]` | When `A ≤ B`, `relrank` coincides with the usual extension degree. |
| `relrank_mul_relrank` | `h1 : A ≤ B, h2 : B ≤ C ⊢ relrank A B * relrank B C = relrank A C` | Multiplicativity of relative rank in towers. |
| `relrank_inf_mul_relrank` | `A.relrank (B ⊓ C) * B.relrank C = (A ⊓ B).relrank C` | Key identity relating intersections and relative ranks. |
| `relrank_comap_comap_eq_relrank_inf` | `relrank (A.comap f) (B.comap f) = relrank A (B ⊓ f.fieldRange)` | Behavior under pullback (comap) of field homomorphisms. |
| `relrank_map_map` | `relrank (A.map f) (B.map f) = relrank A B` | Invariance under pushforward (map) of injective field homomorphisms. |
| `relrank_top_right` | `relrank A ⊤ = [A : F]` | Relative rank with the top (whole field) on the right is the absolute degree. |
| `relrank_bot_left` | `relrank ⊥ A = [A : F]` | Relative rank with the bottom (prime field) on the left is the absolute degree. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `relrank_`, `relfinrank_`: Core definitions and properties.
  - `inf_`: Relating to infimum (`⊓`) of subfields.
  - `map_`, `comap_`: Behavior under field homomorphisms.
  - `top_`, `bot_`: Special cases involving `⊤` (whole field) and `⊥` (prime field).
  - `mul_`: Multiplicativity properties.
  - `dvd_`: Divisibility properties.

- **Suffixes**:
  - `_eq_of_le`: When `A ≤ B`, simplifications.
  - `_of_le`: Hypothesis-based simplifications (e.g., `relrank_inf_mul_relrank_of_le`).
  - `_of_surjective`: Special case under surjectivity.
  - `_left`, `_right`: Positional emphasis (e.g., `relrank_top_left` vs `relrank_top_right`).
  - `_toNat_`: Relating `relrank` and `relfinrank`.

- **Pattern**: `rel[fin]rank_[action]_[context]_[condition]`

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rw` / `simp_rw` | Rewriting definitions (`relrank`, `relfinrank`, `inf`, etc.) and known equalities. |
| `congr` / `congr'` | Proving equality of terms by congruence (especially for `toNat`, `lift`, `finrank`). |
| `simp` | Simplifying using `@[simp]` lemmas (e.g., `relrank_self`, `relrank_top_left`). |
| `have` / `let` | Introducing intermediate algebra structures (`Algebra`, `IsScalarTower`). |
| `exact` / `apply` | Applying known lemmas (e.g., `rank_mul_rank`, `dvd_of_mul_right_eq`). |
| `symm` | Flipping equalities (e.g., in `lift_relrank_map_map`). |
| `conv` | Deep rewriting in nested expressions (e.g., `conv_lhs => rw [...]`). |
| `simpa` | Simplifying and discharging goals using a lemma (common in `relfinrank_*` proofs). |
| `aesop` (implicit) | Not explicitly used, but `simp` + `rw` + `congr` cover most automation. |

---

#### **4. Proof Logic**

- **Inductive/structural style**: Most proofs follow a *definition → simplification → algebraic manipulation* pattern.
- **Common flow**:
  1. Unfold `relrank`/`relfinrank` using `rw [relrank]` or `simp`.
  2. Use `inf_le_right`, `inf_le_left`, `inf_of_le_left`, etc., to simplify intersections.
  3. Apply known module-theoretic results (e.g., `rank_mul_rank`, `finrank_mul_finrank`).
  4. Use `congr` or `congr(toNat $...)` to lift results from `relrank` to `relfinrank`.
  5. For homomorphism lemmas: reduce to `Subfield` version via `toSubfield`, then use `map_inf`, `comap_map`, etc.

- **Key lemmas reused**:
  - `rank_mul_rank A B E` (tower law for module rank).
  - `inf_of_le_left h` (if `A ≤ B`, then `A ⊓ B = A`).
  - `map_inf` (compatibility of map with infimum).
  - `lift_id` (for eliminating `Cardinal.lift` when universes match).

---

#### **5. Imports**

- **Core dependency**: `Mathlib.FieldTheory.Adjoin`
  - Provides foundational field theory (subfields, intermediate fields, field extensions).
  - Enables use of `extendScalars`, `map`, `comap`, `fieldRange`, etc.

- **Implicit imports** (via `Mathlib`):
  - `Mathlib.Algebra.Module.Rank`: For `Module.rank`, `finrank`, `extendScalars`.
  - `Mathlib.Algebra.Field.Basic`: For `Field`, `Algebra`, `RingHom`.
  - `Mathlib.Data.Cardinal.Basic`: For `Cardinal`, `toNat`, `lift`.
  - `Mathlib.Data.Subfield.Basic`: For `Subfield`, `IntermediateField`, `⊓`, `⊤`, `⊥`.

- **Universe polymorphism**: Explicit universe variables `u v w` used for type flexibility.

---

### Summary

This file formalizes the *relative rank* (cardinal-valued degree) and *relative finite rank* (natural-number-valued) for subfields and intermediate fields. It establishes foundational properties analogous to subgroup index (`Subgroup.relindex`), including multiplicativity, behavior under homomorphisms (`map`, `comap`), and interaction with intersections. The proofs rely heavily on module-theoretic rank properties and careful manipulation of subfield lattices. The naming and structure follow Lean/`Mathlib` conventions, with heavy use of `congr`, `simp`, and `rw` for automation.