### Technical Metadata Brief: Idempotent Elements in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsIdempotentElem` | `def IsIdempotentElem (p : M) : Prop := p * p = p` | Defines an element `p` as idempotent if `p * p = p`. |
| `of_isIdempotent` | `[Std.IdempotentOp (· * ·)] → a : M → IsIdempotentElem a` | Derives idempotency from a standard idempotent operation. |
| `eq` | `IsIdempotentElem p → p * p = p` | Reifies the definition: extracts the equality `p * p = p`. |
| `mul_of_commute` | `Commute p q → IsIdempotentElem p → IsIdempotentElem q → IsIdempotentElem (p * q)` | Product of commuting idempotents in a semigroup is idempotent. |
| `mul` | `[CommSemigroup M] → IsIdempotentElem e₁ → IsIdempotentElem e₂ → IsIdempotentElem (e₁ * e₂)` | Special case of `mul_of_commute` in a commutative semigroup. |
| `zero` | `IsIdempotentElem (0 : M₀)` | Zero is idempotent in a `MulZeroClass`. |
| `one` | `IsIdempotentElem (1 : M₁)` | One is idempotent in a `MulOneClass`. |
| `one_sub` | `IsIdempotentElem p → IsIdempotentElem (1 - p)` | If `p` is idempotent, so is `1 - p` in a (non-associative) ring. |
| `one_sub_iff` | `IsIdempotentElem (1 - p) ↔ IsIdempotentElem p` | Equivalence: `p` is idempotent iff `1 - p` is. |
| `add_sub_mul_of_commute` | `Commute p q → IsIdempotentElem p → IsIdempotentElem q → IsIdempotentElem (p + q - p * q)` | Generalized "join" operation on commuting idempotents in a ring. |
| `add_sub_mul` | `[CommRing R] → IsIdempotentElem p → IsIdempotentElem q → IsIdempotentElem (p + q - p * q)` | Special case in a commutative ring. |
| `pow` | `ℕ → IsIdempotentElem p → IsIdempotentElem (p ^ n)` | Any natural power of an idempotent is idempotent in a monoid. |
| `pow_succ_eq` | `ℕ → IsIdempotentElem p → p ^ (n + 1) = p` | For idempotent `p`, `p^(n+1) = p` for all `n`. |
| `iff_eq_one` | `IsIdempotentElem p ↔ p = 1` | In a group, only `1` is idempotent. |
| `iff_eq_zero_or_one` | `IsIdempotentElem p ↔ p = 0 ∨ p = 1` | In a `CancelMonoidWithZero`, only `0` or `1` can be idempotent. |
| `map` | `[FunLike F M N] [MulHomClass F M N] → IsIdempotentElem e → IsIdempotentElem (f e)` | Idempotency is preserved under multiplicative homomorphisms. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`: e.g., `IsIdempotentElem` — predicate naming.
  - `coe_`: e.g., `coe_zero`, `coe_one`, `coe_compl` — coercion lemmas.
  - `compl_`: e.g., `compl_compl`, `zero_compl`, `one_compl` — complement-related lemmas.

- **Suffixes**:
  - `_of_commute`: e.g., `mul_of_commute`, `add_sub_mul_of_commute` — variants requiring a `Commute` hypothesis.
  - `_iff`: e.g., `one_sub_iff`, `iff_eq_one`, `iff_eq_zero_or_one` — biconditional characterizations.
  - `_succ_eq`: e.g., `pow_succ_eq` — equality involving successor.

- **Generic patterns**:
  - `mul`, `zero`, `one`, `pow`, `one_sub`, `add_sub_mul` — core algebraic operations.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rw` | Rewriting definitions (`IsIdempotentElem`, `mul_assoc`, `sub_mul`, etc.). |
| `simp_rw` | Simplifying with rewrite rules (especially in `add_sub_mul_of_commute`). |
| `convert` + `using 1` | Targeted conversion with manual subgoal control. |
| `nth_rw` (→ `conv_rhs`) | Precise rewriting in nested expressions (e.g., `conv_rhs => rw [← h.eq]`). |
| `exact`, `refine`, `intro`, `cases` | Basic proof structure. |
| `symm`, `trans` | Equality manipulation. |
| `mul_left_cancel`, `mul_left_cancel₀` | Cancellation in groups / cancel monoids. |
| `or_iff_not_imp_left` | Logical manipulation in `iff_eq_zero_or_one`. |
| `Nat.recOn` | Induction on natural numbers (for `pow`, `pow_succ_eq`). |

---

#### **4. Proof Logic**

- **Inductive structure**: Proofs of `pow` and `pow_succ_eq` use `Nat.recOn` (induction on `n`).
- **Algebraic manipulation**: Most proofs rely on:
  - Rewriting `p * p = p` (`h.eq`) to simplify expressions.
  - Associativity, distributivity, and commutativity lemmas (`mul_assoc`, `mul_comm`, `sub_mul`, etc.).
- **Logical equivalences**:
  - `↔` proofs are typically done via `Iff.intro` with two directions.
  - In `iff_eq_zero_or_one`, case analysis on `p = 0` vs `p ≠ 0` via `or_iff_not_imp_left`.
- **Subtype reasoning**:
  - Instances on `Subtype IsIdempotentElem` use `⟨_, prop⟩` to construct elements.
  - Equality in subtypes is proven via `Subtype.ext` (extensionality).

---

#### **5. Imports & Scope**

**Primary dependencies**:
- `Mathlib.Algebra.Group.Basic` — basic group theory.
- `Mathlib.Algebra.Group.Commute.Defs` — `Commute` and related.
- `Mathlib.Algebra.Group.Hom.Defs` — homomorphism classes (`MulHomClass`).
- `Mathlib.Algebra.Ring.Defs` — rings, non-associative rings.
- `Mathlib.Data.Subtype` — subtype constructions.
- `Mathlib.Order.Notation` — order-theoretic notation (e.g., `compl`).

**Scope**:
- General multiplication (`Mul`, `Semigroup`, `Monoid`, `CommSemigroup`)
- Rings (`NonAssocRing`, `Ring`, `CommRing`)
- Groups & cancel monoids with zero (`Group`, `CancelMonoidWithZero`)
- Subtype-based algebraic structures on idempotents.

---

Let me know if you'd like a diagram of the idempotent lattice or a formalization of Boolean algebras from this.