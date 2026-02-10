### Technical Metadata Brief: Ackermann Function in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ack` | `ℕ → ℕ → ℕ` | Two-argument Ackermann function, defined by primitive recursion on both arguments. |
| `ack_zero` | `ack 0 n = n + 1` | Base case for first argument. |
| `ack_succ_zero` | `ack (m+1) 0 = ack m 1` | Base case for second argument. |
| `ack_succ_succ` | `ack (m+1) (n+1) = ack m (ack (m+1) n)` | Recursive step. |
| `ack_one`, `ack_two`, `ack_three` | Closed forms: `n+2`, `2n+3`, `2^(n+3)-3` | Explicit evaluations for small `m`. |
| `ack_pos` | `∀ m n, 0 < ack m n` | Positivity of Ackermann function. |
| `one_lt_ack_succ_left/right` | `1 < ack (m+1) n`, `1 < ack m (n+1)` | Strict lower bounds. |
| `ack_strictMono_right/left` | Strict monotonicity in each argument | Enables equivalence lemmas like `ack_lt_iff_right`. |
| `lt_ack_left/right` | `m < ack m n`, `n < ack m n` | Every argument is strictly less than the output. |
| `add_lt_ack` | `m + n < ack m n` | Linear growth is dominated by Ackermann. |
| `ack_add_one_sq_lt_ack_add_three` | `(ack m n + 1)^2 ≤ ack (m+3) n` | Quadratic bound in terms of Ackermann. |
| `ack_add_one_sq_lt_ack_add_four` | `ack m ((n+1)^2) < ack (m+4) n` | Square input bounded by 4-increase in first argument. |
| `ack_pair_lt` | `ack m (pair n k) < ack (m+4) (max n k)` | Key inequality for pairing function; used in main inductive proof. |
| `exists_lt_ack_of_nat_primrec` | `hf : Nat.Primrec f ⇒ ∃ m, ∀ n, f n < ack m n` | Main technical lemma: any primitive recursive function is pointwise bounded by some `ack m`. |
| `not_nat_primrec_ack_self` | `¬Nat.Primrec (λ n, ack n n)` | Diagonal Ackermann is not primitive recursive. |
| `not_primrec₂_ack` | `¬Primrec₂ ack` | Full Ackermann function is not binary primitive recursive. |

---

#### **2. Naming Conventions**

- **Predicates/Properties**:
  - `is_` prefix not used here; instead, properties like `mono`, `strictMono`, `injective`, `lt_iff`, `le_iff`, `inj` are common suffixes.
  - `ack_` prefix for all Ackermann-related lemmas.
  - `primrec` suffix for properties about primitive recursiveness (`not_primrec`, `not_primrec₂`, `nat_primrec`).
- **Quantifier/Structure**:
  - `exists_..._of_...` for existence lemmas derived from assumptions (e.g., `exists_lt_ack_of_nat_primrec`).
- **Inequalities**:
  - `lt_ack`, `le_ack`, `add_lt_ack`, `sq_le_two_pow`, `ack_add_one_sq_lt_ack_add_*` — naming reflects structure of inequality.
- **Auxiliary lemmas**:
  - `*_aux`, `*_left`, `*_right`, `*_max`, `*_add`, `*_pair`, `*_succ` — standard Lean 4 naming for case analysis or argument position.

---

#### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Usage |
|--------|-------|
| `rw` | Rewriting definitions (`ack`, `pair`, `unpair`, `max`, etc.) and lemmas. |
| `induction'` | Structural induction on natural numbers and primitive recursive hypotheses. |
| `simp` / `simp only` | Simplifying using `[simp]` lemmas (e.g., `ack_zero`, `ack_succ_succ`). |
| `cases'` | Case analysis on `lt_or_le`, `exists_eq_succ_of_ne_zero`, `IHf`, `IHg`. |
| `apply`, `exact`, `trans` | Proof construction and chaining inequalities. |
| `omega` | Solving linear arithmetic goals (e.g., `m + n + 1 ≤ ack m n`). |
| `ring` / `ring_nf` | Simplifying polynomial expressions (e.g., `mul_succ`, `two_mul`). |
| `linarith` | Linear arithmetic with inequalities (e.g., in `sq_le_two_pow_add_one_minus_three`). |
| `norm_num` | Normalizing numeric expressions (e.g., `2 * 3 ≤ 2 * 2 ^ 3`). |
| `apply H.trans` | Chaining inequalities via transitivity. |
| `rwa` | Rewrite + assumption (e.g., `rwa [add_lt_add_iff_right] at h`). |
| `apply ... trans ...` | Multi-step inequality proofs (e.g., `ack_pair_lt` chain). |

---

#### **4. Proof Logic**

- **Overall Strategy**:
  - Prove that any primitive recursive function `f : ℕ → ℕ` is pointwise bounded by some `ack m`.
  - Use this to show that the diagonal function `n ↦ ack n n` cannot be primitive recursive.
  - Conclude that the binary Ackermann function is not primitive recursive.

- **Inductive Structure of `exists_lt_ack_of_nat_primrec`**:
  - Induction on the derivation of `Nat.Primrec f`.
  - Base cases: zero, successor, projections.
  - Inductive steps:
    - **Pairing**: Use `pair_lt_max_add_one_sq`, `sq_le_two_pow`, and `ack_add_one_sq_lt_ack_add_three`.
    - **Composition**: Use `ack_ack_lt_ack_max_add_two`.
    - **Primitive recursion**: Most complex case:
      - Prove auxiliary inequality:  
        `rec (f m) (fun y IH => g (pair m (pair y IH))) n < ack (max a b + 9) (m + n)`
      - Induct on `n`, apply `ack_pair_lt` twice (hence `+4+4=8`), then adjust constant to `9` via simpler bounds.
      - Use `unpair_add_le` to reduce to the auxiliary inequality.

- **Key Lemmas Used**:
  - `ack_pair_lt`: central for handling pairing in recursion.
  - `add_lt_ack`, `lt_ack_left/right`: basic growth bounds.
  - `ack_mono_left/right`, `max_ack_*`: monotonicity for bounding arguments.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Computability.Primrec` | Core definitions and lemmas about primitive recursive functions (`Nat.Primrec`, `Primrec`, `Primrec₂`, `pair`, `unpair`, `rec`, etc.). |
| `Mathlib.Tactic.Ring` | For algebraic simplification (e.g., `mul_succ`, `two_mul`). |
| `Mathlib.Tactic.Linarith` | For solving linear arithmetic goals (e.g., `m + n + 1 ≤ ack m n`). |

> **Note**: The file does *not* import `Mathlib.Data.Nat.Basic` explicitly, but relies on standard `Nat` lemmas (e.g., `pow_succ`, `mul_comm`, `sub_add_comm`) available via `Mathlib`’s prelude.

---

### Summary

This formalization demonstrates the non-primitive-recursiveness of the Ackermann function using a classic diagonalization argument. It carefully tracks constants in bounding lemmas (e.g., `+9` for primitive recursion case), and leverages monotonicity, pairing/unpairing, and arithmetic inequalities. The proof is highly structured, with a clear separation between general growth properties of `ack` and the specific inductive argument over primitive recursive definitions.