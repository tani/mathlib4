### Technical Metadata Brief: Periodic Points in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsPeriodicPt f n x` | `f : α → α`, `n : ℕ`, `x : α` → `Prop` | `x` is a periodic point of `f` of period `n`: `f^[n] x = x`. |
| `ptsOfPeriod f n` | `Set α` | Set of points with (not necessarily minimal) period dividing `n`. |
| `periodicPts f` | `Set α` | Set of all points with *some* positive period. |
| `minimalPeriod f x` | `ℕ` | Minimal positive `n` such that `f^[n] x = x`; `0` if none. |
| `periodicOrbit f x` | `Cycle α` | Cycle `[x, f x, f² x, ..., f^(m-1) x]` where `m = minimalPeriod f x`. |
| `MulAction.period g a` | `ℕ` | Minimal `n > 0` such that `g^n • a = a`; `0` otherwise. |
| `isPeriodicPt_iff_minimalPeriod_dvd` | `IsPeriodicPt f n x ↔ minimalPeriod f x ∣ n` | Core equivalence: `x` has period `n` iff minimal period divides `n`. |
| `bijOn_ptsOfPeriod` | `0 < n → BijOn f (ptsOfPeriod f n)` | `f` is a bijection on points of fixed (nonzero) period. |
| `minimalPeriod_prod_map` | `minimalPeriod (Prod.map f g) (a,b) = lcm (minimalPeriod f a) (minimalPeriod g b)` | Minimal period of product action is lcm of components. |
| `pow_smul_eq_iff_period_dvd` | `g^n • a = a ↔ period g a ∣ n` | Action power fixes point iff period divides exponent. |

---

#### **2. Naming Conventions**

- **Predicates**: `is_`, `isFixedPt`, `isPeriodicPt`, `mem_`, `nodup_`, `eq_`, `dvd_`, `pos_`, `nmem_`
- **Set constructions**: `ptsOfPeriod`, `periodicPts`, `periodicOrbit`
- **Operations on proofs/points**: `apply`, `iterate`, `map`, `comp`, `mul_const`, `const_mul`, `add`, `sub`, `mod`, `gcd`, `left_of_add`, `right_of_add`, `trans_dvd`
- **Action-specific**: `period`, `smul_iterate`, `zpow_smul`, `pow_mod_period`
- **Equational lemmas**: `eq_`, `mem_`, `dvd_`, `mod_`, `mul_`, `add_`, `comp_`, `iterate_`, `min_`, `max_`, `lcm_`, `gcd_`

Prefixes like `is_`, `mem_`, `eq_`, `dvd_`, `iterate_`, `minimalPeriod_`, `period_` dominate.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `rw` | Rewriting definitions (`IsPeriodicPt`, `minimalPeriod`, `ptsOfPeriod`, etc.) |
| `simp` / `simp only` | Simplifying using `@[simp]` lemmas (e.g., `iterate_minimalPeriod`, `mem_ptsOfPeriod`) |
| `exact` / `assumption` | Closing goals with existing hypotheses |
| `convert` | Aligning goals with known lemmas (e.g., `isPeriodicPt_of_mem_periodicPts_of_isPeriodicPt_iterate`) |
| `rcases` / `cases` | Decomposing existential or conjunction hypotheses |
| `apply` / `refine` | Applying lemmas with holes (e.g., `refine ⟨_, _, ?_⟩`) |
| `conv` | Rewriting in subexpressions (e.g., `conv_rhs => rw [...]`) |
| `aesop` / `linarith` | Not heavily used; most reasoning is algebraic or number-theoretic |
| `ring` / `abel` | Rare; arithmetic is mostly handled via `nat` lemmas |
| `induction` | Used implicitly via `Nat.gcd.induction`, `Nat.dvd_antisymm`, etc. |
| `ext` / `funext` | For extensionality of sets/functions |

---

#### **4. Proof Logic & Strategy**

- **Inductive/structural reasoning on `ℕ`**: Many proofs use induction on `n`, `m`, or `gcd` (e.g., `gcd.induction`, `Nat.dvd_antisymm`).
- **Case analysis on positivity**: `0 < n`, `n ≠ 0`, `x ∈ periodicPts f` appear frequently.
- **Divisibility reasoning**: Central to minimal period arguments:
  - `dvd_antisymm`, `dvd_mul`, `dvd_lcm`, `dvd_iff_mod_eq_zero`
  - `Nat.find_min'`, `Nat.find_spec`
- **Iterate algebra**: Heavy use of:
  - `iterate_add`, `iterate_mul`, `iterate_mod_apply`, `iterate_succ_apply`
  - `iterate_injOn_Iio_minimalPeriod` for injectivity on initial segment
- **Cycle/`List.map` reasoning**: `nodup_periodicOrbit`, `Chain` characterizations via `iterate_succ`
- **Action theory**: Reduction to `minimalPeriod` via `period_eq_minimalPeriod`, then leveraging group/ring lemmas.

---

#### **5. Imports & Scope**

**Core dependencies**:
- `Mathlib.Algebra.GroupPower.IterateHom` — iterate homomorphism properties
- `Mathlib.Algebra.Ring.Divisibility.Basic` — divisibility in `ℕ`, `ℤ`
- `Mathlib.Algebra.Ring.Int.Defs` — integers, `zpow`, etc.
- `Mathlib.Data.List.Cycle` — cyclic lists, `Cycle`, `nodup`, `Chain`
- `Mathlib.Data.Nat.GCD.Basic`, `Mathlib.Data.Nat.Prime.Basic`, `Mathlib.Data.PNat.Basic` — number theory
- `Mathlib.Dynamics.FixedPoints.Basic` — fixed points, `IsFixedPt`, `iterate`

**Domain**: Dynamical systems on sets, especially discrete dynamics; group actions (multiplicative/additive) on types.

**Mathlib module scope**: Part of `Mathlib.Dynamics` or `Mathlib.Algebra.GroupAction`, with heavy overlap with `Mathlib.Algebra.GroupPower` and `Mathlib.Data.List.Cycle`.

--- 

Let me know if you'd like a dependency graph, tactic usage heatmap, or a formalization roadmap for extending this file.