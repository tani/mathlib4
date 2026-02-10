### Technical Metadata Brief: Lucas Primality Test in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `lucas_primality` | `∀ (p : ℕ) (a : ZMod p), a ^ (p - 1) = 1 → (∀ q : ℕ, q.Prime → q ∣ p - 1 → a ^ ((p - 1) / q) ≠ 1) → p.Prime` | Main direction: if an element `a` has order exactly `p−1` modulo `p`, then `p` is prime. |
| `reverse_lucas_primality` | `∀ (p : ℕ), p.Prime → ∃ a : ZMod p, a ^ (p - 1) = 1 ∧ ∀ q : ℕ, q.Prime → q ∣ p - 1 → a ^ ((p - 1) / q) ≠ 1` | Converse: for prime `p`, such an `a` (a primitive root mod `p`) exists. |
| `lucas_primality_iff` | `∀ (p : ℕ), p.Prime ↔ ∃ a : ZMod p, a ^ (p - 1) = 1 ∧ ∀ q : ℕ, q.Prime → q ∣ p - 1 → a ^ ((p - 1) / q) ≠ 1` | Biconditional equivalence formalizing the Lucas primality criterion. |
| `orderOf_eq_of_pow_and_pow_div_prime` *(used internally)* | Implicit in proof of `lucas_primality` | Lemma linking order of `a` to the given exponent conditions. |
| `IsCyclic.exists_generator` *(used in `reverse_lucas_primality`)* | `∀ [Group G] [IsCyclic G], ∃ g : G, ∀ x : G, ∃ n : ℤ, x = g ^ n` | Guarantees existence of a generator for the cyclic group `(ZMod p)ˣ` when `p` is prime. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `lucas_`: Indicates Lucas primality-related results.
  - `reverse_`: Denotes the converse direction of a main theorem.
- **Suffixes**:
  - `_primality`: Used for core primality theorems.
  - `_iff`: For biconditional characterizations.
- **Variable names**:
  - `p`: Natural number being tested for primality.
  - `a`: Element of `ZMod p`, intended to be a witness.
  - `q`: Prime divisor of `p−1`.
  - `ha`, `hb`, `hd`: Hypotheses about powers of `a`.
  - `hP`, `hP'`: Hypotheses about primality of `p`.

---

#### **3. Tactic Stack**

The proofs rely heavily on:

- `constructor` / `intro` / `exact`: Basic intro/elimination tactics.
- `rwa`: Rewrite + assumption (used repeatedly for rewriting using equivalences).
- `apply`: To apply lemmas or theorems.
- `calc`: For chaining equalities/inequalities (especially in `lucas_primality`).
- `rw [← pow_succ', tsub_add_eq_add_tsub hp1]`: Specific rewrites for arithmetic manipulation.
- `exact`, `antisymm`: For proving equalities via mutual inequalities.
- `have`, `replace`, `refine`: To introduce intermediate facts and construct witnesses.
- `tsub_pos_of_lt`, `tsub_pos_iff_lt`: Tactics for handling subtraction on naturals.

No heavy automation like `aesop` or `norm_num` is used — the proofs are largely manual and rely on algebraic structure (group theory, order of elements).

---

#### **4. Proof Logic**

- **`lucas_primality`**:
  1. Show `p ≠ 0` and `p ≠ 1` using the hypothesis `hd`.
  2. Deduce `1 < p`.
  3. Use `NeZero p` to ensure `ZMod p` is a domain.
  4. Reduce goal to showing `p - 1 ≤ #units(ZMod p)`, then use antisymmetry with known inequality `#units ≤ p - 1`.
  5. Construct unit `a'` from `a` using `Units.mkOfMulEqOne`.
  6. Compute chain of equalities/inequalities involving `orderOf a`, `orderOf a'`, and `#units`.

- **`reverse_lucas_primality`**:
  1. Use `IsCyclic.exists_generator` to get a generator `g` of `(ZMod p)ˣ`.
  2. Show `orderOf g = p - 1` via group-theoretic identities.
  3. Translate this into required exponent conditions using `orderOf_eq_iff`.

- **`lucas_primality_iff`**:
  - Immediate from the two previous theorems via `⟨reverse_lucas_primality p, fun ⟨a, ⟨ha, hb⟩⟩ ↦ lucas_primality p a ha hb⟩`.

---

#### **5. Imports**

- `Mathlib.RingTheory.IntegralDomain`: Provides foundational results about rings and domains, especially relevant for `ZMod p` when `p` is prime.
- Implicit dependencies (via `Mathlib`):
  - `Mathlib.GroupTheory.OrderOfElement`: For `orderOf`, properties of element orders.
  - `Mathlib.GroupTheory.Cyclic`: For `IsCyclic.exists_generator`.
  - `Mathlib.Data.ZMod.Basic`: For `ZMod p`, its units, and arithmetic.
  - `Mathlib.Data.Nat.Prime`: For primality, divisors, and prime factorization.

---

### Summary

This file formalizes the **Lucas primality test**, a deterministic primality criterion based on multiplicative order in the group `(ZMod p)ˣ`. It establishes both directions of the equivalence, leveraging group-theoretic properties (especially cyclicity of the unit group modulo a prime). The formalization is constructive and suitable for algorithmic use (e.g., Pratt certificates), as noted in the TODOs.