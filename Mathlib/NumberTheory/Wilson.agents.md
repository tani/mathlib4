### Technical Metadata Brief: Wilson’s Theorem in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `wilsons_lemma` | `((p - 1)! : ZMod p) = -1` | Proves that for prime `p`, the product `1·2·…·(p−1)` is congruent to `−1 mod p`. This is the *forward direction* of Wilson’s theorem for primes. |
| `prod_Ico_one_prime` | `∏ x ∈ Ico 1 p, (x : ZMod p) = -1` | Restates Wilson’s lemma using `Ico 1 p`, i.e., the interval `[1, p)`; equivalent to `wilsons_lemma`. |
| `prime_of_fac_equiv_neg_one` | `((n - 1)! : ZMod n) = -1 → n ≠ 1 → Prime n` | Proves the *converse*: if `(n−1)! ≡ −1 (mod n)` and `n ≠ 1`, then `n` is prime. |
| `prime_iff_fac_equiv_neg_one` | `n ≠ 1 → Prime n ↔ ((n - 1)! : ZMod n) = -1` | Full statement of **Wilson’s Theorem**: equivalence between primality and the factorial congruence, for `n ≠ 1`. |

> **Note**: `wilsons_lemma` is currently not given a descriptive name (per TODO comment), and could be renamed e.g. `wilsons_lemma_prime`.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `wilsons_` — for Wilson-related results (`wilsons_lemma`, `wilsons_theorem` implied via `prime_iff_fac_equiv_neg_one`).
  - `prod_` — for product-related lemmas (`prod_Ico_one_prime`).
  - `fac_` — short for factorial (`prime_of_fac_equiv_neg_one`, `prime_iff_fac_equiv_neg_one`).
- **Suffixes**:
  - `_prime` — used in lemmas about primes (`prime_of_...`, `prime_iff_...`).
  - `_iff_` — for biconditional statements (`prime_iff_fac_equiv_neg_one`).
- **Variable naming**:
  - `p` — always a natural number assumed prime (via `[Fact p.Prime]`).
  - `n` — general natural number in `Nat` namespace.
  - `a`, `b`, `x` — standard loop variables in proofs involving finite sets or units.

---

#### **3. Tactic Stack**

The proofs rely heavily on:

| Tactic | Usage |
|--------|-------|
| `calc` | Structuring chains of equalities (e.g., in `wilsons_lemma`). |
| `rw` / `simp_rw` | Rewriting using definitions and known lemmas (e.g., `prod_natCast`, `val_cast_of_lt`, `Units.coeHom_apply`). |
| `simp` / `simp_rw` | Simplifying expressions involving units, casts, and finite field arithmetic. |
| `refine` / `exact` | Constructing proofs step-by-step, especially when using bijections or divisibility arguments. |
| `conv` | Congruence rewriting (used to adjust `Ico 1 p` bounds). |
| `rcases` / `obtain` | Case analysis and extracting witnesses (e.g., `exists_dvd_of_not_prime2`). |
| `norm_num` | Simplifying numeric goals (e.g., `norm_num at h` when `n = 0`). |
| `by_contra` | Proof by contradiction (used in `prime_of_fac_equiv_neg_one`). |
| `apply_fun` | Applying functions to equalities (e.g., `apply_fun val at h`). |

---

#### **4. Proof Logic**

- **`wilsons_lemma`**:
  - Reduces factorial to product over `Ico 1 p`.
  - Shows this equals product over all units `(ZMod p)ˣ`.
  - Uses `prod_univ_units_id_eq_neg_one`, a known result that the product of all units in a finite field is `-1`.
  - Key steps: bijection between `{1, ..., p−1}` and `(ZMod p)ˣ`, and properties of the unit group.

- **`prime_of_fac_equiv_neg_one`**:
  - Assumes `(n−1)! ≡ −1 (mod n)` and `n ≠ 1`.
  - Excludes `n = 0` and `n = 1` quickly.
  - Suppose `n` composite ⇒ ∃ proper divisor `m` with `1 < m < n`.
  - Then `m ∣ (n−1)!`, and also `m ∣ n`, so `m ∣ ((n−1)! + 1)`.
  - But `(n−1)! + 1 ≡ 0 (mod n)` ⇒ `m ∣ 1`, contradiction.

- **`prime_iff_fac_equiv_neg_one`**:
  - Combines both directions:
    - `Prime n ⇒ ((n−1)! ≡ −1 mod n)` via `wilsons_lemma`.
    - `((n−1)! ≡ −1 mod n) ⇒ Prime n` via `prime_of_fac_equiv_neg_one`.

---

#### **5. Imports & Dependencies**

- **Core import**:
  ```lean
  import Mathlib.FieldTheory.Finite.Basic
  ```
  - Provides foundational results on finite fields, including:
    - `ZMod p` structure when `p` is prime.
    - `Units (ZMod p)`, its group structure, and properties like `prod_univ_units_id_eq_neg_one`.
    - Tools for reasoning about finite products, casts, and valuations.

- **Key auxiliary lemmas used**:
  - `prod_univ_units_id_eq_neg_one`: product of all units in `ZMod p` is `-1`.
  - `val_cast_of_lt`: casting small naturals into `ZMod p`.
  - `natCast_zmod_eq_zero_iff_dvd`: connects divisibility to zero in `ZMod n`.
  - `exists_dvd_of_not_prime2`: existence of a proper divisor for composite `n > 1`.

---

#### **6. Scope & Generalization Potential**

- **Current scope**: Strictly about `ZMod p` and Wilson’s theorem over integers modulo primes.
- **TODO comment** suggests generalization to finite abelian groups (e.g., product of all elements in a finite abelian group equals the unique element of order 2, or identity if none).
- Could be extended to:
  - `finite_abelian_group_prod_eq_one_or_inv` style lemmas.
  - Legendre symbol and quadratic reciprocity (currently blocked via `assert_not_exists legendreSym.quadratic_reciprocity`).

--- 

Let me know if you'd like a diagram of the logical dependencies or a refactoring suggestion for `wilsons_lemma`.