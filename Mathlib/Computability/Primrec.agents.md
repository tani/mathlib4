### Technical Brief: Primitive Recursive Functions in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Primrec` (on `ℕ → ℕ`) | `inductive Primrec : (ℕ → ℕ) → Prop` | Defines primitive recursive functions on naturals via closure under zero, successor, projections (`left`, `right`), pairing, composition, and primitive recursion (`prec`). |
| `unpaired` | `def unpaired {α} (f : ℕ → ℕ → α) (n : ℕ) : α := f n.unpair.1 n.unpair.2` | Encodes binary functions `ℕ × ℕ → α` as unary functions `ℕ → α` using Cantor pairing (`n.unpair`). |
| `Primrec.comp` | `hf : Primrec f → hg : Primrec g → Primrec (f ∘ g)` | Closure under composition. |
| `Primrec.prec` | `hf : Primrec f → hg : Primrec g → Primrec (λ n, n.rec (f z) (g ∘ ⟨z, y, _⟩ ↦ ...))` | Closure under primitive recursion (via `Nat.rec`). |
| `PrimrecBounded` | `∃ g, Primrec g ∧ ∀ x, encode (f x) ≤ g x` | Boundedness condition used in `of_graph` to prove primitiveness via graph characterization. |
| `of_graph` | `PrimrecBounded f → PrimrecRel (λ a b, f a = b) → Primrec f` | Main theorem to prove `f : α → ℕ` is primitive recursive by bounding and verifying its graph is primitive recursive. |
| `Primcodable` | `class Primcodable (α : Type*) extends Encodable α where prim : Nat.Primrec (encode ∘ decode)` | Type class for types with primitive recursive encodings/decodings (e.g., `ℕ`, `Bool`, `Option α`, `α × β`). |
| `Primrec {α β} [Primcodable α] [Primcodable β] (f : α → β)` | `Nat.Primrec (encode ∘ f ∘ decode)` | Generalized notion of primitive recursiveness for functions between `Primcodable` types. |
| `Primrec₂` | `def Primrec₂ f := Primrec (uncurry f)` | Convenience for binary functions: `α → β → σ` ≡ `(α × β) → σ`. |
| `nat_iff` | `Primrec f ↔ Nat.Primrec f` | Equivalence between general and natural-number-only primitive recursiveness. |
| `nat_div`, `nat_mul`, `nat_add`, `nat_sub`, `nat_pow`, `nat_le`, `nat_lt`, `nat_min`, `nat_max` | `Primrec₂` | Binary arithmetic and order operations on `ℕ` are primitive recursive. |
| `dom_fintype` | `[Finite α] → Primrec f` | Any function from a finite type is primitive recursive (via list indexing). |
| `of_graph` (used for division) | `of_graph ... → Primrec₂ ((· / ·))` | Proves division is primitive recursive via bounded graph. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `prim` / `Primrec`: Core predicate for primitive recursiveness.
  - `of_`: Conversion or lifting lemmas (e.g., `of_eq`, `ofEquiv`, `ofNat`).
  - `nat_`: Natural-number-specific versions (e.g., `nat_add`, `nat_div`).
  - `dom_`: Domain-specific encodings (e.g., `dom_bool`, `dom_fintype`).
  - `option_`: Operations on `Option` (e.g., `option_bind`, `option_map`, `option_getD`).
  - `list_`: List operations (e.g., `list_get?₁`, `list_findIdx₁`, `list_indexOf₁`).

- **Suffixes**:
  - `_comp`: Composition lemmas (e.g., `PrimrecPred.comp`, `PrimrecRel.comp₂`).
  - `_iff`: Equivalence lemmas (e.g., `nat_iff`, `encode_iff`, `option_some_iff`).
  - `_₁`, `_₂`: Arity indicators for higher-arity functions (e.g., `list_findIdx₁`, `Primrec₂`).
  - `'` / `''`: Variant lemmas (e.g., `casesOn'`, `nat_rec'`).
  - `'_symm`: For inverses under equivalences (e.g., `of_equiv_symm`).

- **Operators**:
  - `· + ·`, `· * ·`, `· - ·`, `· ^ ·`, `· ≤ ·`, `· < ·`: Infix notation for arithmetic/order.
  - `swap`, `pair`, `unpair`, `decode`, `encode`: Standard operations on pairs/encodings.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp` | Simplification using definitional equalities, `unpair_pair`, `decode_prod_val`, `encodek`, etc. |
| `induction` | Structural or numeric induction (e.g., on `n.unpair.2`, `f a`, `l`). |
| `cases` / `cases'` | Case analysis on naturals (`0` vs `succ`), `Option`, products, booleans. |
| `rw` | Rewriting using lemmas like `Nat.div_le_self`, `tsub_eq_zero_iff_le`, `encode_injective.eq_iff`. |
| `congr'` / `congr` | Congruence reasoning (e.g., for `funext`, `encodek`). |
| `aesop` | Not explicitly used here, but `simp` + `rw` + `induction` cover most automation. |
| `exact` / `refine` | For constructing proofs of `Primrec` goals via constructors (`zero`, `succ`, `comp`, `prec`, etc.). |
| `dsimp`, `convert`, `apply` | Used in intermediate steps for equational reasoning. |

---

#### **4. Proof Logic**

- **Inductive Structure**: Proofs of `Primrec f` rely on the inductive definition:
  - Base cases: `zero`, `succ`, `left`, `right`.
  - Inductive steps: `pair`, `comp`, `prec`.
- **Encoding/Decoding**: Most proofs reduce to `Nat.Primrec` via `nat_iff`, then use `unpaired`, `unpair_pair`, and `encodek` to manipulate encodings.
- **Bounded Graph Method**:
  - To prove `Primrec f`, show:
    1. `PrimrecBounded f`: `encode (f x) ≤ g x` for some `Primrec g`.
    2. `PrimrecRel (λ a b, f a = b)`: Graph is primitive recursive.
  - Then apply `of_graph`.
- **Case Analysis & Induction**:
  - Induction on natural arguments (e.g., `n.unpair.2`) to verify recursive definitions.
  - Case splits on `Option`, `Bool`, or `n.casesOn` to handle base/recursive cases.
- **Equivalence-Based Reasoning**:
  - Use `ofEquiv`, `of_equiv`, `of_equiv_symm` to transfer `Primcodable` and `Primrec` across isomorphisms.
  - `encode_iff`, `option_some_iff`, `unpaired'` to switch between encodings and direct definitions.

---

#### **5. Imports**

| Module | Purpose |
|--------|---------|
| `Mathlib.Algebra.Order.Ring.Nat` | Natural numbers as ordered semiring (used for `add`, `sub`, `mul`, `pow`, `le`, `lt`). |
| `Mathlib.Logic.Equiv.List` | Equivalences and list encodings (used in `ofEquiv`, `dom_fintype`). |
| `Mathlib.Logic.Function.Iterate` | Function iteration (`f^[n]`), used in `nat_iterate`. |

---

### Summary

This file formalizes **primitive recursive functions** in Lean 4, extending the classical definition to arbitrary `Primcodable` types via Gödel encodings. It provides:
- A robust inductive definition of `Primrec`.
- A rich library of closure properties (composition, recursion, pairing).
- Tools for reasoning about binary functions (`Primrec₂`), predicates (`PrimrecPred`), and relations (`PrimrecRel`).
- Key examples: arithmetic, order, list operations, `Option` operations, and bounded graph-based proofs (e.g., division).
- A clean separation between natural-number and general-type primitive recursiveness via `nat_iff`.

The formalization is highly structured, leveraging Lean 4’s type class inference (`Primcodable`, `Denumerable`) and advanced simplification/induction tactics to manage encodings and proofs.