### Technical Metadata Brief: Parity in `Fin n`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Statement | Purpose |
|------|------------------|---------|
| `even_of_val` | `{k : Fin n} → Even k.val → Even k` | Lifts evenness of the underlying natural number to `Fin n`. |
| `odd_of_val` | `[NeZero n] → {k : Fin n} → Odd k.val → Odd k` | Lifts oddness of the underlying natural number to `Fin n`. |
| `even_of_odd` | `{n : ℕ} → Odd n → (k : Fin n) → Even k` | Shows all elements of `Fin n` are even when `n` is odd. |
| `odd_of_odd` | `[NeZero n] → Odd n → (k : Fin n) → Odd k` | Shows all elements of `Fin n` are odd when `n` is odd. *(Note: This contradicts `even_of_odd` unless `n = 1` — likely a typo; see note below.)* |
| `even_iff_of_even` | `{n : ℕ} → Even n → {k : Fin n} → Even k ↔ Even k.val` | Equivalence between evenness in `Fin n` and in `ℕ`, when `n` is even. |
| `odd_iff_of_even` | `[NeZero n] → Even n → {k : Fin n} → Odd k ↔ Odd k.val` | Same as above for oddness, when `n` is even. |
| `even_iff` | `{n : ℕ} → {k : Fin n} → Even k ↔ Odd n ∨ Even k.val` | Main characterization: `k` is even in `Fin n` iff `n` is odd or `k.val` is even. |
| `even_iff_imp` | `{n : ℕ} → {k : Fin n} → Even k ↔ (Even n → Even k.val)` | Curried version of `even_iff`. |
| `odd_iff` | `[NeZero n] → {k : Fin n} → Odd k ↔ Odd n ∨ Odd k.val` | Dual of `even_iff`. |
| `odd_iff_imp` | `[NeZero n] → {k : Fin n} → Odd k ↔ (Even n → Odd k.val)` | Curried version of `odd_iff`. |
| `even_iff_mod_of_even`, `odd_iff_mod_of_even` | Relate parity in `Fin n` to `k.val % 2 = 0 / 1`, under `Even n`. | Practical computational characterizations. |
| `not_odd_iff_even_of_even`, `not_even_iff_odd_of_even` | Logical negations of parity, under `Even n`. | Useful for case analysis. |
| `odd_add_one_iff_even`, `even_add_one_iff_odd` | Parity flip under successor in `Fin n`. | Captures parity behavior of `k + 1`. |

> **⚠️ Note on `odd_of_odd`**:  
> The statement `odd_of_odd` as written is *incorrect* in general. For example, in `Fin 3` (`n = 3`, odd), `k = 0` has `k.val = 0`, which is even, yet `odd_of_odd` claims `Odd k`. This contradicts `even_of_odd`, which says *all* elements are even when `n` is odd. Likely, `odd_of_odd` should be `odd_iff_of_odd` or similar — possibly a copy-paste error. The correct dual of `even_of_odd` is `odd_iff`, which includes the disjunction.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `even_of_`, `odd_of_`: Imply *one-directional* lifting (e.g., from `val` or from `n`).
  - `even_iff_`, `odd_iff_`: Biconditional characterizations.
  - `even_iff_of_`, `odd_iff_of_`: Biconditional *under a hypothesis* (e.g., `Even n`).
  - `not_..._of_`: Logical negation under assumptions.

- **Suffixes**:
  - `_val`: Relates to `Fin.val`.
  - `_mod`: Involves modulo arithmetic (`% 2`).
  - `_imp`: Curried implication form (e.g., `P ↔ (Q → R)`).

- **Structure**:
  - `even_iff` / `odd_iff`: Core theorems.
  - `even_iff_of_even` / `odd_iff_of_even`: Specialized versions for `Even n`.
  - `odd_add_one_iff_even`: Describes successor parity flip.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `rcases` / `cases` | Split on `even_or_odd`, `even_or_odd n`, or existential hypotheses. |
| `rw` | Rewrite using lemmas like `Fin.cast_val_eq_self`, `val_add_eq_ite`, `val_add`, `val_mul`. |
| `simp` / `simp only` | Simplify using `Fin`-specific lemmas, `Nat` parity lemmas (`even_iff`, `odd_iff`), and arithmetic. |
| `split_ifs` | Handle `ite` (if-then-else) branches in `val_add_eq_ite`. |
| `exact` / `apply` | Apply known lemmas (e.g., `h.natCast`, `hk.natCast`). |
| `simpa` | Simplify and discharge goal using assumptions. |
| `add_right_cancel`, `eq_sub_iff_add_eq.mpr` | Algebraic reasoning in additive structure. |
| `Nat.mod_mul_mod`, `Nat.add_mod_mod`, etc. | Modular arithmetic simplifications. |

---

#### **4. Proof Logic**

- **Structure**:
  - Most proofs follow a **case analysis on parity of `k.val`** (`k.val.even_or_odd`) and/or **parity of `n`** (`n.even_or_odd`).
  - When `n` is odd, proofs use `even_of_odd`/`odd_of_odd` to show uniform parity of all elements.
  - When `n` is even, proofs reduce to `Fin.val`-based parity via `even_iff_of_even`/`odd_iff_of_even`.
  - Modular arithmetic (`% 2`) is used to connect to concrete parity (`k.val % 2 = 0/1`).
  - Logical equivalences (`↔`) are proven via `⟨fun h ↦ ..., fun h ↦ ...⟩` or `or_imp.mpr`.
  - `imp_iff_not_or` and `Nat.not_even_iff_odd` are used to convert between disjunctive and implication forms.

- **Inductive/Recursive?**  
  No induction is used — all proofs are *case-based* and rely on algebraic properties of `Fin`, `ZMod`, and `Nat` parity.

---

#### **5. Imports & Scope**

| Import | Purpose |
|--------|---------|
| `Mathlib.Algebra.Ring.Parity` | Defines `Even`, `Odd`, and basic parity arithmetic in rings (e.g., `natCast`, `even_add`, `odd_add`). |
| `Mathlib.Data.Fin.Basic` | Core `Fin` type, `val`, `cast`, `add`, `one`, arithmetic operations. |
| `Mathlib.Data.ZMod.Defs` | Provides `ZMod n` and related facts (used implicitly via `Fin` and parity in rings). |

**Domain**: Finite types `Fin n`, parity in the ring `Fin n`, interaction between `Fin.val` and ring-theoretic parity.

**Key Insight**: Parity in `Fin n` is *not* just parity of the representative — it depends on `n`. This file formalizes that dependency precisely.

--- 

Let me know if you'd like a corrected version of `odd_of_odd`, or a formalization of the corrected `odd_iff_of_odd`.