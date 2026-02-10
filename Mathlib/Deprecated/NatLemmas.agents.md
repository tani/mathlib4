**Technical Metadata Brief: `Mathlib.Data.Nat.Deprecated` (Lean 4)**

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `mul_eq_zero` | `∀ {a b : ℕ}, a * b = 0 → a = 0 ∨ b = 0` | Classic zero-product property for natural numbers; re-exported via deprecated alias. |
| `discriminate` | `{B : Sort u} → {n : ℕ} → (n = 0 → B) → (∀ m, n = succ m → B) → B` | Case analysis on whether a natural is zero or successor; used for structural induction on `n`. |
| `one_eq_succ_zero` | `1 = succ 0` | Trivial definitional equality; confirms `1` is defined as `succ 0`. |
| `subInduction` | `(∀ m, P 0 m) → (∀ n, P (succ n) 0) → (∀ n m, P n m → P (succ n) (succ m)) → ∀ n m, P n m` | A 2D induction principle for predicates on `ℕ × ℕ`, handling base cases `(0, m)`, `(n, 0)`, and diagonal step `(n, m) → (succ n, succ m)`. |
| `cond_decide_mod_two` | `∀ x : ℕ, Decidable (x % 2 = 1) → cond (decide (x % 2 = 1)) 1 0 = x % 2` | Connects `decide` (computational decidability) with `cond` (if-then-else) to recover `x % 2` as `1` or `0`. |

> **Note**: All definitions/theorems are marked `@[deprecated]`, indicating they are obsolete or unused in current `mathlib`.

---

### **2. Naming Conventions**

- **Prefixes**:
  - `discriminate`, `subInduction`: descriptive functional names (not following standard `mathlib` naming like `nat_mul_zero`).
  - `cond_decide_mod_two`: compound name combining operation (`cond`), mechanism (`decide`), and subject (`mod_two`).
- **Suffixes**:
  - None prominent; no `'_left'`, `'_right'`, `'_comm'`, etc.
- **Aliases**:
  - `⟨eq_zero_of_mul_eq_zero, _⟩ := mul_eq_zero`: uses tuple notation to re-export a lemma under a new name.

---

### **3. Tactic Stack**

- **Core tactics used**:
  - `rfl`: for definitional equalities (`one_eq_succ_zero`, `mul_eq_zero` alias).
  - `induction`: in `discriminate` and `subInduction`.
  - `simp only [...]` + `split` + `omega`: in `cond_decide_mod_two` (simplification, case split, then linear arithmetic).
- **No heavy automation** (e.g., `aesop`, `ring`, `linarith`), consistent with low-level or legacy lemmas.

---

### **4. Proof Logic**

- **Pattern**:
  - **Structural decomposition** (e.g., `induction n` in `discriminate`).
  - **Case analysis** on `n = 0 ∨ ∃ m, n = succ m` (via `discriminate` or `induction`).
  - **Computational reasoning** for decidable propositions (e.g., `decide`, `cond`, `omega` for arithmetic).
- **Inductive style**:
  - `subInduction` uses a *double induction* pattern: base cases for first argument zero, second argument zero, and inductive step for both incrementing.

---

### **5. Imports**

| Import | Role |
|--------|------|
| `Batteries.Data.Nat.Lemmas` | Core natural number lemmas (likely foundational arithmetic). |
| `Mathlib.Util.AssertExists` | Provides `assert_not_exists`, used here to assert `Preorder` does *not* exist in scope (a safeguard against accidental import). |
| `Mathlib.Data.Nat.Notation` | Defines notations like `1`, `2`, `succ`, `%`, etc., for `ℕ`. |

> **Scope**: This module is a *legacy utility* for backward compatibility; it is not part of the current `mathlib` core and should not be imported by new code.

--- 

**Summary**: A deprecated collection of low-level `ℕ` utilities, mostly unused in modern `mathlib`, with simple proofs relying on structural induction and decidability. Intended only for internal migration or legacy support.