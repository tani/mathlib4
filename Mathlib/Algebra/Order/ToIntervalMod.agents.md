### Technical Brief: `Mathlib.Algebra.Archimedean.ReduceMod`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `toIcoDiv hp a b` | `ℤ` — the unique integer `n` such that `b - n • p ∈ Ico a (a + p)` |
| `toIcoMod hp a b` | `α` — `b - toIcoDiv hp a b • p`, i.e., reduction of `b` into `Ico a (a + p)` |
| `toIocDiv hp a b` | `ℤ` — the unique integer `n` such that `b - n • p ∈ Ioc a (a + p)` |
| `toIocMod hp a b` | `α` — `b - toIocDiv hp a b • p`, i.e., reduction of `b` into `Ioc a (a + p)` |
| `modEq_iff_toIcoMod_eq_left` | `a ≡ b [PMOD p] ↔ toIcoMod hp a b = a` — characterizes congruence via `Ico`-reduction |
| `modEq_iff_toIocMod_eq_right` | `a ≡ b [PMOD p] ↔ toIocMod hp a b = a + p` — characterizes congruence via `Ioc`-reduction |
| `tfae_modEq` | 4 equivalent conditions for `a ≡ b [PMOD p]`, including uniqueness of representatives in `Ioo`, inequality of `Ico`/`Ioc` mods, and period-shift equality |
| `QuotientAddGroup.equivIcoMod` | `α ⧸ ⟨p⟩ ≃ Ico a (a + p)` — canonical equivalence between the quotient group and the interval |
| `QuotientAddGroup.equivIocMod` | `α ⧸ ⟨p⟩ ≃ Ioc a (a + p)` — same as above for open-closed interval |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `toIco*`: for intervals of the form `Ico a (a + p)` (closed-open).
  - `toIoc*`: for intervals of the form `Ioc a (a + p)` (open-closed).
- **Suffixes**:
  - `Div`: returns the integer multiplier (quotient).
  - `Mod`: returns the reduced element (remainder).
- **Other patterns**:
  - `add_zsmul`, `sub_zsmul`, `zsmul_add`: indicate behavior under addition/subtraction of multiples of `p`.
  - `add_right`, `add_left`: indicate behavior under `+ p` on right or left argument.
  - `neg`, `zero`: special cases for negation or `a = 0`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp_rw`, `simp only`, `simp`: for rewriting using definitional equalities and lemmas.
- `abel`, `ring`: for simplifying additive group expressions and integer arithmetic.
- `rw`, `convert`, `refine`: for applying lemmas and constructing proofs step-by-step.
- `tfae_have`, `tfae_finish`: for proving equivalence of multiple statements (TFAE = "the following are equivalent").
- `exact`, `assumption`, `intro`, `cases`: basic proof automation.
- `ext1`, `ext`: extensionality for sets/functions.
- `em'`: excluded middle for case splits.

---

#### **4. Proof Logic**

- **Existence/uniqueness**: All definitions rely on `existsUnique_sub_zsmul_mem_Ico` / `Ioc`, which guarantee a unique integer shift landing in the target interval.
- **Standard proof pattern**:
  1. Use `toIcoDiv_eq_of_sub_zsmul_mem_Ico` / `toIocDiv_eq_of_sub_zsmul_mem_Ioc` to prove equality of divisors.
  2. Use `toIcoMod_eq_iff` / `toIocMod_eq_iff` to characterize when a value is the result of reduction.
  3. Use `abel`/`ring` to simplify linear combinations of `p` and integer multiples.
  4. Use `tfae_*` for multi-way equivalences (e.g., congruence ↔ uniqueness in `Ioo` ↔ `IcoMod ≠ IocMod`).
- **Inductive/quotient arguments**: Proofs about `QuotientAddGroup.equivIcoMod` use `induction b using QuotientAddGroup.induction_on`, and rely on `eq_iff_sub_mem` to relate coset equality to subgroup membership.

---

#### **5. Imports**

Core dependencies defining the scope:
- `Mathlib.Algebra.ModEq`: modular congruence (`≡ [PMOD p]`).
- `Mathlib.Algebra.Module.Defs`: scalar multiplication (`•`), especially `zsmul`.
- `Mathlib.Algebra.Order.Archimedean.Basic`: Archimedean property for `α`.
- `Mathlib.Algebra.Periodic`: periodic functions (used for `toIcoMod_periodic`, etc.).
- `Mathlib.Data.Int.SuccPred`: integer successor/predecessor structure.
- `Mathlib.Order.Circular`: circular orders (used in later `Circular` section).
- `Mathlib.Data.List.TFAE`: tools for proving TFAE statements.
- `Mathlib.Data.Set.Lattice`: set operations, intervals (`Ico`, `Ioc`, `Ioo`), membership lemmas.

---

This module formalizes a foundational tool for modular arithmetic in Archimedean linearly ordered additive commutative groups — enabling canonical representatives modulo a period `p`, with precise control over interval endpoints (`Ico` vs `Ioc`). It is foundational for formalizing modular arithmetic in analysis, geometry, and combinatorics (e.g., in periodic functions, circular orders, or quotient constructions).