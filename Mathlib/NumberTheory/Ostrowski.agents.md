### Technical Metadata Brief: `Ostrowski's Theorem` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `padic (p : ℕ) [Fact p.Prime]` | `AbsoluteValue ℚ ℝ` | Defines the *p*-adic absolute value on `ℚ` via `padicNorm`. |
| `real` | `AbsoluteValue ℚ ℝ` | Standard Archimedean absolute value on `ℚ`, i.e., `|x|`. |
| `equiv_on_nat_iff_equiv` | `(∃ c > 0, ∀ n : ℕ, f n ^ c = g n) ↔ f ≈ g` | Characterizes equivalence of absolute values by behavior on `ℕ`. |
| `eq_on_nat_iff_eq` | `(∀ n : ℕ, f n = g n) ↔ f = g` | Values on `ℕ` uniquely determine an absolute value. |
| `equiv_padic_of_bounded` | `f ≠ trivial ∧ (∀ n, f n ≤ 1) → ∃! p, f ≈ padic p` | Main non-Archimedean case: bounded nontrivial absolute values are *p*-adic. |
| `equiv_real_of_unbounded` | `¬(∀ n, f n ≤ 1) ∧ f ≠ trivial → f ≈ real` | Main Archimedean case: unbounded nontrivial absolute values are standard. |
| `equiv_real_or_padic` | `f ≠ trivial → f ≈ real ∨ ∃! p, f ≈ padic p` | **Ostrowski’s Theorem** for `ℚ`. |
| `not_real_equiv_padic` | `¬ real ≈ padic p` | Standard and *p*-adic absolute values are *not* equivalent. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `equiv_`: Relates to equivalence of absolute values (`equiv_on_nat_iff_equiv`, `equiv_padic_of_bounded`, etc.).
  - `padic_`: Pertains to *p*-adic absolute value (`padic`, `padic_eq_padicNorm`, `padic_le_one`).
  - `real_`: Pertains to standard absolute value (`real`, `real_eq_abs`).
  - `apply_`: Often used for inequalities involving `f n` (e.g., `apply_le_sum_digits`, `apply_nat_le_self`).
  - `list_`: For list-specific lemmas (`list_mul_sum`, `list_geom`).
  - `tendsto_`: For limit behavior (`tendsto_const_rpow_inv`, `tendsto_nat_rpow_inv`).

- **Suffixes**:
  - `_le_one`, `_lt_one`, `_ne_zero`, `_pos`: Describe inequality or positivity properties.
  - `_of_`: Indicates conditions or assumptions (e.g., `equiv_padic_of_bounded`, `eq_one_of_not_dvd`).
  - `_iff_`, `_mp`, `_mt`: Logical equivalences and modus ponens/tollens.

---

#### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Usage |
|--------|-------|
| `simp_rw` | Rewriting with simplification (e.g., `simp_rw [← equiv_on_nat_iff_equiv]`). |
| `simp` | Simplification, especially for `map_mul`, `map_pow`, `padicNorm`, `abs`. |
| `rw` | Rewriting using lemmas (e.g., `rw [Nat.ofDigits_eq_sum_mapIdx]`). |
| `gcongr` | For monotonicity arguments (e.g., raising to powers, applying `f` to inequalities). |
| `linarith` | Linear arithmetic over reals (e.g., handling `0 < x < 1` chains). |
| `field_simp` | Field simplifications (e.g., inverses, division). |
| `exact_mod_cast`, `convert_mod_cast`, `norm_cast` | Handling coercion between `ℕ`, `ℤ`, `ℚ`, `ℝ`. |
| `rcases`, `obtain`, `rintro` | Case analysis and destructuring existential/universal hypotheses. |
| `congr 1`, `congrFun`, `congrArg` | Extensionality for functions/structures. |
| `push_cast`, `cast_*` | Explicitly pushing/coercing numerals. |
| `rpow_*` lemmas | For real exponentiation reasoning (`rpow_le_rpow_left_iff`, `rpow_mul`, etc.). |
| `tendsto_*` + `eventually_atTop` | For asymptotic behavior proofs. |

---

#### **4. Proof Logic**

The proof follows a **case split** on boundedness of `f` on `ℕ`:

- **Non-Archimedean case** (`∀ n, f n ≤ 1`):
  1. Show existence of *minimal* `p ∈ ℕ` with `0 < f p < 1`.
  2. Prove `p` is prime.
  3. Show `f m = 1` if `p ∤ m`.
  4. Express `f p = p^{-t}` for some `t > 0`.
  5. Conclude `f ≈ padic p` using equivalence characterization on `ℕ`.

- **Archimedean case** (`¬∀ n, f n ≤ 1`):
  1. Show `f n > 1` for all `n ≥ 2`.
  2. Bound `f n` using base-`m` digit expansion and geometric sum.
  3. Prove `f n ≤ f m^{log_b m n}`.
  4. Show exponent `s` in `f m = m^s` is *independent* of `m ≥ 2`.
  5. Conclude `f ≈ real` via `f n = |n|^{s^{-1}}`.

- **Main theorem** combines both cases.

---

#### **5. Imports**

Core dependencies defining the module’s scope:

| Import | Role |
|--------|------|
| `Mathlib.Algebra.Order.AbsoluteValue.Equivalence` | Absolute value equivalence (`≈`), basic algebraic properties. |
| `Mathlib.Analysis.SpecialFunctions.Log.Base` | `logb`, real exponentiation, continuity, limits. |
| `Mathlib.Analysis.SpecialFunctions.Pow.Continuity` | Continuity of `x ↦ x^r`, `r ∈ ℝ`. |
| `Mathlib.NumberTheory.Padics.PadicNorm` | *p*-adic norm, its properties (multiplicativity, ultrametric inequality, etc.). |

Additional imports (via `open`/`import`):
- `Filter`, `Nat`, `Real`, `Topological` — for analysis and topology.
- `Int` — for integer arithmetic and Bezout identities.

---

### Summary

This formalization of **Ostrowski’s Theorem** for `ℚ` is a sophisticated blend of:
- **Algebraic structure** (absolute values, equivalence),
- **Number-theoretic reasoning** (prime minimality, divisibility, base expansions),
- **Real analysis** (limits, continuity, exponentiation),
- **Lean-specific proof engineering** (coercions, tactic scripting, extensionality).

It exemplifies modern Lean’s ability to unify disparate mathematical domains in a single, rigorous development.