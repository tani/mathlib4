### Technical Brief: Derangements on Fintypes in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `derangements α` | `Subtype (Perm α) (λ σ => ∀ x, σ x ≠ x)` | Type of derangements (fixed-point-free permutations) on a fintype `α`. |
| `card_derangements_invariant` | `card α = card β → card (derangements α) = card (derangements β)` | Shows derangement count depends only on cardinality of the type. |
| `numDerangements : ℕ → ℕ` | Recursive definition: <br>`0 ↦ 1`, `1 ↦ 0`, `n+2 ↦ (n+1)*(numDerangements n + numDerangements (n+1))` | Computationally friendly definition of derangement numbers (subfactorial). |
| `card_derangements_fin_eq_numDerangements` | `card (derangements (Fin n)) = numDerangements n` | Proves `numDerangements` correctly computes derangements on `Fin n`. |
| `card_derangements_eq_numDerangements` | `card (derangements α) = numDerangements (card α)` | Generalizes previous result to arbitrary fintypes. |
| `numDerangements_succ` | `(numDerangements (n+1) : ℤ) = (n+1)*numDerangements n - (-1)^n` | Alternate recurrence over integers, useful for closed-form derivation. |
| `numDerangements_sum` | `(numDerangements n : ℤ) = ∑ k ∈ range (n+1), (-1)^k * ascFactorial (k+1) (n-k)` | Closed-form expression using alternating sum and ascending factorial. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `card_`: Relates to cardinalities (e.g., `card_derangements_*`).
  - `num_`: Denotes numeric/computational definitions (e.g., `numDerangements`).
  - `is_`, `mem_`, `ne_`, `not_`: Not heavily used here, but `¬_ = x` appears in predicate definition.
- **Suffixes**:
  - `_eq_*`: Equality theorems (e.g., `card_derangements_eq_numDerangements`).
  - `_invariant`: Invariance under equivalence of size.
  - `_succ`, `_add_two`: Recurrence steps.
- **Function names**:
  - `ascFactorial`: Ascending factorial (Pochhammer symbol), used in closed form.
  - `derangementsCongr`, `derangementsRecursionEquiv`: Structural lemmas about derangement equivalences.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp only [...]` | Simplification with explicit lemmas, especially for `Fin`, `card`, `sigma`, `sum`. |
| `rw [...]` | Rewriting using recurrence or invariance lemmas. |
| `induction' n using Nat.strong_induction_on` | Strong induction on natural numbers (common for recurrence proofs). |
| `rcases n with _ | _ | n` | Case analysis on natural numbers (0, 1, ≥2). |
| `ring` | Simplifying integer/ring expressions (e.g., in `numDerangements_succ`). |
| `omega` | Solving linear arithmetic goals (e.g., `n ≥ 2`, `x ≤ n`). |
| `congr` / `congr'` | Used implicitly via `;` to apply same tactic to multiple goals. |
| `apply`, `exact`, `intro` | Basic proof scripting. |

---

#### **4. Proof Logic**

- **Inductive structure**:
  - Proofs often proceed by **strong induction** on `n`, with base cases `n = 0, 1`, and inductive step for `n ≥ 2`.
- **Cardinality arguments**:
  - Use `card_derangements_invariant` to reduce to `Fin n`.
  - Use `card_derangements_fin_add_two` to relate `card (derangements (Fin (n+2)))` to smaller cases.
- **Recurrence alignment**:
  - Show `numDerangements` satisfies same recurrence as `card (derangements (Fin n))`, then conclude equality.
- **Closed-form derivation**:
  - Use `numDerangements_succ` to derive alternating sum formula via induction and properties of `ascFactorial`.

---

#### **5. Imports & Scope**

**Primary imports**:
- `Mathlib.Algebra.BigOperators.Ring`: For summation over finite types, ring arithmetic.
- `Mathlib.Combinatorics.Derangements.Basic`: Core definitions and basic properties of derangements.
- `Mathlib.Data.Fintype.BigOperators`: Cardinality lemmas for fintypes and big operators.
- `Mathlib.Tactic.Ring`: For simplifying ring expressions (e.g., integer arithmetic).

**Domain scope**:
- **Combinatorics on finite sets**, especially permutation groups and fixed-point-free elements.
- **Enumerative combinatorics**: Derangement numbers, subfactorial, inclusion–exclusion.
- **Type-theoretic formalization**: Leverages `Fintype`, `DecidableEq`, `Subtype`, and `Equiv` to reason about finite structures.

--- 

Let me know if you'd like a diagram of the proof dependencies or a formalized summary in a specific format (e.g., for a domain model or AI agent training).