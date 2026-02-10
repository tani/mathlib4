### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `exists_prime_gt_modEq_one` | `∀ {k : ℕ}, k ≠ 0 → ∀ n : ℕ, ∃ p : ℕ, Nat.Prime p ∧ n < p ∧ p ≡ 1 [MOD k]` | For any bound `n` and nonzero `k`, there exists a prime `p > n` with `p ≡ 1 [MOD k]`. Core infinitude proof step. |
| `frequently_atTop_modEq_one` | `∀ {k : ℕ}, k ≠ 0 → ∃ᶠ p in atTop, Nat.Prime p ∧ p ≡ 1 [MOD k]` | Reformulates infinitude using the filter `atTop`: primes ≡ 1 mod `k` are frequently (i.e., cofinally) large. |
| `infinite_setOf_prime_modEq_one` | `∀ {k : ℕ}, k ≠ 0 → Set.Infinite {p : ℕ | Nat.Prime p ∧ p ≡ 1 [MOD k]}` | Final infinitude statement: the set of such primes is infinite. |
| `eval` | `Polynomial ℤ → ℤ → ℤ` | Evaluation of integer polynomials at integers (used on cyclotomic polynomials). |
| `cyclotomic k R` | `Polynomial R` | The `k`-th cyclotomic polynomial over a ring `R`. |
| `minFac` | `ℕ → ℕ` | Minimal prime factor function (used to extract a prime divisor from a natural >1). |
| `IsRoot` | `Polynomial R → R → Prop` | Predicate for `r` being a root of polynomial `f`. |
| `orderOf` | `u : G → ℕ` (for `u : Group G`) | Order of an element in a group. |
| `ZMod.orderOf_dvd_card_sub_one` | `orderOf a ∣ p - 1` for `a ∈ ZMod pˣ` | Standard group-theoretic fact: order divides group size. |
| `isRoot_cyclotomic_iff` | `IsRoot (cyclotomic k R) x ↔ orderOf x = k` (under suitable conditions) | Key algebraic link: roots of `cyclotomic k` are exactly elements of order `k`. |

#### 2. **Naming Conventions**

- **Predicates & properties**:  
  - `isRoot_`, `coprime_`, `modEq_`, `prime_`, `dvd_`, `factorial_`, `eval_`, `minFac_`, `orderOf_`, `charP_`, `castRingHom_`, `ZMod_`, `natAbs_`.
- **Theorems**:  
  - `exists_*`, `infinite_*`, `frequently_*`, `*_iff_*`, `*_dvd_*`, `*_ne_*`, `*_pos`, `*_bot_lt`, `*_succ_le_iff`.
- **Variables & locals**:  
  - `b`, `p`, `k`, `n`, `rfl`, `hnp`, `hp`, `hgt`, `hprime`, `hroot`, `hpb`, `hdiv`, `habs`, `hpk`.

#### 3. **Tactic Stack**

- **Core automation & simplification**:  
  `simp`, `rw`, `simp_rw`, `aesop`, `ring`, `omega`, `linarith`, `exact`, `refine`, `apply`, `intro`, `cases`, `rcases`, `obtain`, `have`, `let`, `mod_cast`, `subst`, `convert`.
- **Algebraic reasoning**:  
  `apply_mod_cast`, `modEq_iff_dvd'`, `isRoot.def`, `eval_map`, `map_cyclotomic_int`, `ZMod.intCast_zmod_eq_zero_iff_dvd`, `Int.dvd_natAbs.1`, `coprime_iff_not_dvd`, `minFac_dvd`, `minFac_prime`, `ZMod.orderOf_dvd_card_sub_one`, `isRoot_cyclotomic_iff.mp`, `CharP.cast_eq_zero_iff`.
- **Filter & set reasoning**:  
  `frequently_atTop.2`, `frequently_atTop_iff_infinite.1`, `not_le.1`, `mt`, `fun habs => ?_`, `⟨...⟩`.

#### 4. **Proof Logic**

- **High-level strategy**:  
  - **Step 1**: Reduce to case `k > 1` (since `k = 1` is trivial via `modEq_one`).  
  - **Step 2**: Construct a large integer `b = k * n!` so that `b ≡ 0 [MOD m]` for all `m ≤ n`.  
  - **Step 3**: Use properties of cyclotomic polynomials:  
    - Show `(cyclotomic k ℤ).eval b` has absolute value > 1 (via `sub_one_lt_natAbs_cyclotomic_eval`).  
    - Let `p = minFac(...)` — guaranteed prime.  
  - **Step 4**: Show `b` is a root of `cyclotomic k` modulo `p`, implying `orderOf (b mod p) = k`.  
  - **Step 5**: Use group theory (`orderOf ∣ p - 1`) to deduce `k ∣ p - 1`, i.e., `p ≡ 1 [MOD k]`.  
  - **Step 6**: Ensure `p > n` by contradiction: if `p ≤ n`, then `p ∣ b`, contradicting `b` being coprime to `p` (via root-cyclotomic ⇒ coprime lemma).  
- **Induction/Recursion**: None directly; relies on algebraic construction and minimality (`minFac`).

#### 5. **Imports**

- **Primary dependency**:  
  `Mathlib.RingTheory.Polynomial.Cyclotomic.Eval` — provides evaluation lemmas for cyclotomic polynomials over rings, especially over `ℤ` and `ZMod p`.  
- **Implicit dependencies** (via Mathlib hierarchy):  
  - `Mathlib.Data.Nat.Prime` — `minFac`, `factorial`, `Nat.Prime`, `dvd`, `coprime`.  
  - `Mathlib.Data.ZMod.Basic` — `ZMod`, `orderOf`, `CharP`, `castRingHom`.  
  - `Mathlib.Data.Polynomial.Cyclotomic` — definition and basic properties of `cyclotomic`.  
  - `Mathlib.Topology.Filter.Basic` — `atTop`, `frequently_atTop`, `Set.Infinite`.  
  - `Mathlib.Algebra.Group.Order` — `orderOf`, `orderOf_dvd_card_sub_one`.  
  - `Mathlib.Data.Int.Basic` — `Int.castRingHom`, `Int.coe_castRingHom`, `Int.dvd_natAbs`.

---

This module formalizes a classical analytic-number-theoretic result using *algebraic* tools (cyclotomic polynomials), avoiding Dirichlet’s theorem in full generality but proving the special case `p ≡ 1 [MOD k]` constructively via roots of unity modulo `p`.