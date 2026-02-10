### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `invertibleNeg` | `[Mul α] [One α] [HasDistribNeg α] → α → Invertible a → Invertible (-a)` | Constructs invertibility of additive inverse from invertibility of element. |
| `invOf_neg` | `[Monoid α] [HasDistribNeg α] → (a : α) → [Invertible a] → [Invertible (-a)] → ⅟ (-a) = -⅟ a` | Shows that the inverse of `-a` is `-⅟ a`. |
| `one_sub_invOf_two` | `[Ring α] [Invertible (2 : α)] → 1 - ⅟ 2 = ⅟ 2` | Simplifies expression involving `⅟ 2` in rings where `2` is invertible. |
| `invOf_two_add_invOf_two` | `[NonAssocSemiring α] [Invertible (2 : α)] → ⅟ 2 + ⅟ 2 = 1` | Verifies that doubling `⅟ 2` yields `1`. |
| `pos_of_invertible_cast` | `[Semiring α] [Nontrivial α] → (n : ℕ) → [Invertible (n : α)] → 0 < n` | Links invertibility of natural number embeddings to positivity. |
| `invOf_add_invOf` | `[Semiring α] → (a b : α) → [Invertible a] [Invertible b] → ⅟a + ⅟b = ⅟a * (a + b) * ⅟b` | Algebraic identity for sum of inverses. |
| `invOf_sub_invOf` | `[Ring α] → (a b : α) → [Invertible a] [Invertible b] → ⅟a - ⅟b = ⅟a * (b - a) * ⅟b` | Analogous identity for difference of inverses. |
| `Ring.inverse_add_inverse` | `{a b : α} → (h : IsUnit a ↔ IsUnit b) → Ring.inverse a + Ring.inverse b = Ring.inverse a * (a + b) * Ring.inverse b` | Extends sum-of-inverses identity to `Ring.inverse`, handling non-invertible cases via `IsUnit` equivalence. |
| `Ring.inverse_sub_inverse` | `{a b : α} → (h : IsUnit a ↔ IsUnit b) → Ring.inverse a - Ring.inverse b = Ring.inverse a * (b - a) * Ring.inverse b` | Same for difference, using `Ring.inverse`. |

---

#### 2. **Naming Conventions**

- **Prefixes:**
  - `invOf_`: Refers to inverses under the `Invertible` typeclass (constructive inverse).
  - `Ring.inverse_`: Refers to inverses under the `IsUnit`-based `Ring.inverse` (partial inverse).
- **Suffixes:**
  - `_add_`, `_sub_`, `_neg_`: Denote operations on sums, differences, or negatives.
  - `_two`: Specifically for the element `2`.
- **Pattern:** `invOf_*` for `⅟ a`, `Ring.inverse_*` for `Ring.inverse a`.

---

#### 3. **Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp_rw`: For simplifying using `@[simp]` lemmas and definitional equalities.
- `rw`: Rewriting using equalities (e.g., `invOf_mul_self`, `mul_invOf_self`).
- `mul_right_inj.1`: To cancel invertible elements on one side of an equation.
- `by_cases`: To split on whether an element is a unit (`IsUnit a`).
- `obtain ⟨ia⟩ := ...`: To extract invertible witnesses from `IsUnit`.
- `add_sub_cancel_right`, `sub_mul`, `mul_sub`, `mul_assoc`: Ring-theoretic rewrites.

---

#### 4. **Proof Logic**

- **Structure:** Most proofs follow a pattern:
  1. Use `rw` to expand definitions (`invOf`, `Ring.inverse`, etc.).
  2. Apply ring identities (`mul_add`, `mul_sub`, `mul_invOf_self`, etc.).
  3. Simplify using `simp` with invertibility assumptions.
- **Case analysis:** For `Ring.inverse_*` lemmas, split on `IsUnit a` ↔ `IsUnit b` via `by_cases`.
- **Witness extraction:** When `IsUnit a` holds, extract `Invertible a` via `nonempty_invertible`, then use `inverse_invertible` to reduce to `invOf_*` lemmas.
- **Non-invertible case:** Use `inverse_non_unit` to simplify to `0`, and `simp` handles remaining equalities.

---

#### 5. **Imports**

- `Mathlib.Algebra.GroupWithZero.Invertible`: Provides `Invertible`, `⅟`, and basic lemmas.
- `Mathlib.Algebra.Ring.Defs`: Defines `Ring`, `Semiring`, `NonAssocSemiring`, `IsUnit`, `Ring.inverse`.

These imports indicate the module focuses on **invertible elements in rings and semirings**, especially leveraging `Invertible` vs `IsUnit` perspectives.

--- 

Let me know if you'd like a formalized summary or a diagram of dependencies.