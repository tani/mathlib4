### Technical Metadata Brief: `Mathlib.Data.Denumerable`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Denumerable` | `class Denumerable (α : Type*) extends Encodable α` | Typeclass for types *constructively* bijective with `ℕ`. Extends `Encodable` with a proof that `encode` and `decode` are inverses. |
| `decode_inv` | `∀ n, ∃ a ∈ decode n, encode a = n` | Core axiom: every natural `n` is the encoding of some element `a` in the type, and `decode n` returns a `some a`. |
| `ofNat` | `ℕ → α` | Returns the `n`-th element of `α` via decoding. |
| `eqv` | `α ≃ ℕ` | Explicit equivalence between `α` and `ℕ`, using `encode` and `ofNat`. |
| `mk'` | `(α ≃ ℕ) → Denumerable α` | Constructs a `Denumerable` instance from an explicit equivalence with `ℕ`. |
| `ofEquiv` | `β ≃ α → Denumerable α → Denumerable β` | Transport `Denumerable` along an equivalence. |
| `equiv₂` | `α ≃ β` (for denumerable `α`, `β`) | Any two denumerable types are equivalent. |
| `nat`, `int`, `pnat`, `option`, `sum`, `prod`, `sigma`, `ulift`, `plift` | Instance declarations | Standard constructions preserve denumerability. |
| `pair` | `α × α ≃ α` | For denumerable `α`, `α × α` is equivalent to `α`. |
| `Nat.Subtype.denumerable` | `Denumerable s` for infinite decidable `s : Set ℕ` | Any infinite decidable subset of `ℕ` is denumerable. |
| `ofEncodableOfInfinite` | `[Encodable α] → [Infinite α] → Denumerable α` | Any infinite encodable type is denumerable. |
| `nonempty_denumerable` | `[Countable α] → [Infinite α] → Nonempty (Denumerable α)` | Countably infinite types admit a `Denumerable` instance. |
| `nonempty_denumerable_iff` | `Nonempty (Denumerable α) ↔ Countable α ∧ Infinite α` | Characterization of existence of `Denumerable` instances. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `ofNat`: “nth element” via decoding.
  - `encode`, `decode`: inherited from `Encodable`.
  - `eqv`, `equiv₂`, `ofEquiv`, `mk'`: constructions involving equivalences.
  - `denumerable`: for subtypes of `ℕ`.
  - `pair`, `prod`, `sum`, `sigma`, `option`, `int`, `pnat`, `ulift`, `plift`: standard type constructors.

- **Suffixes**:
  - `_ofNat`: properties of `ofNat`.
  - `_of_decode`, `_ofEquiv`, `_nat`, `_int`, etc.: specialization to concrete types.
  - `right_inverse_aux`, `left_inv`, `ofNat_surjective`: internal lemmas for proofs.

- **Pattern**:
  - `ofNat α n`, `encode a`, `decode n`, `eqv α`, `ofEquiv β α e`, `mk' e`, `denumerable s`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp_rw` | Rewriting with `simp`-style lemmas (e.g., `decode_eq_ofNat`, `encode_ofNat`). |
| `simp` | Simplification, especially for `Option`, `Sum`, `Prod`, `Sigma`, `Finset`, `List`. |
| `rw` | Rewriting using `encodek`, `decode_inv`, `ofNat_encode`, etc. |
| `cases` | Case analysis on `n : ℕ`, `Option`, `Sum`, `bodd n`, etc. |
| `obtain` / `rcases` | Extracting witnesses from existential hypotheses (`decode_inv`). |
| `exact`, `refine`, `apply` | Goal-directed proof construction. |
| `omega` | Solving linear arithmetic (e.g., inequalities involving `succ`, `lt`, `le`). |
| `funext` | Extensionality for function equality (e.g., `ofNat (ℕ × ℕ) = unpair`). |
| `letI` / `haveI` | Introducing instance arguments for typeclass inference. |
| `termination_by` | Well-founded recursion (in `ofNat_surjective`). |

---

#### **4. Proof Logic**

- **Inductive/Recursive Structure**:
  - `ofNat` is defined recursively on `ℕ`, with base case `0 ↦ ⊥` and step `succ`.
  - Proofs about `ofNat` often use induction on `n` or structural recursion on elements of `s : Set ℕ`.

- **Common Proof Patterns**:
  - **Inverse verification**: Show `encode (ofNat n) = n` and `ofNat (encode a) = a` using `decode_inv` and `encodek`.
  - **Equivalence transport**: Use `ofEquiv` to transfer `Denumerable` along known equivalences (`Equiv.intEquivNat`, `Equiv.pnatEquivNat`, `Equiv.ulift`, etc.).
  - **Subtype encoding**: For `s : Set ℕ`, define `toFunAux` as counting elements `< x`, then prove it’s a right/left inverse of `ofNat s`.
  - **Surjectivity + injectivity**: Use `eqv α` to deduce `Infinite α`, or use `ofEncodableOfInfinite` to lift from encodability.

- **Key Lemmas**:
  - `lt_succ_iff_le`, `lt_succ_self`, `succ_le_of_lt`, `le_succ_of_forall_lt_le`: ordering properties of `succ` on subsets of `ℕ`.
  - `right_inverse_aux`: `toFunAux (ofNat n) = n` — proved by induction with `card_insert_of_not_mem`.

---

#### **5. Imports**

| Module | Purpose |
|--------|---------|
| `Mathlib.Data.Fintype.Card` | For `card_eq_zero`, `Fintype`, counting arguments. |
| `Mathlib.Data.List.MinMax` | For `List.maximum`, `List.filter`, `List.countP`, used in `ofNat_surjective`. |
| `Mathlib.Data.Nat.Order.Lemmas` | Basic order theory on `ℕ` (`lt_succ_iff_le`, `Nat.find`, etc.). |
| `Mathlib.Logic.Encodable.Basic` | Foundation: `Encodable`, `encode`, `decode`, `encodek`. |

---

### Summary

This file formalizes **denumerable types** — types constructively equivalent to `ℕ` — as a typeclass extending `Encodable`. It provides:
- A canonical equivalence `α ≃ ℕ` (`eqv`),
- Closure properties under standard type constructors (`Option`, `Sum`, `Prod`, `Sigma`, etc.),
- A constructive proof that any infinite decidable subset of `ℕ` is denumerable,
- A bridge between `Countable`, `Infinite`, and `Denumerable` via `nonempty_denumerable_iff`.

The proofs rely heavily on `Option`-based decoding, `Nat.find` for minimality, and `Finset`/`List` combinatorics for subset encoding. The style is explicit and constructive, avoiding choice except where necessary (e.g., classical `exists_succ`).