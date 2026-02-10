### Technical Brief: Plünnecke–Ruzsa Inequality in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `ruzsa_triangle_inequality_div_div_div` | `#(A / C) * #B ≤ #(A / B) * #(C / B)` | Noncommutative Ruzsa triangle inequality (division version); proven via bipartite double counting. |
| `ruzsa_triangle_inequality_mul_mul_mul` | `#(A * C) * #B ≤ #(A * B) * #(B * C)` | Commutative Ruzsa triangle inequality (multiplication version); relies on Plünnecke–Petridis lemma and minimality argument over subsets. |
| `pluennecke_petridis_inequality_mul` | `#(A * B * C) * #A ≤ #(A * B) * #(A * C)` | Core structural inequality (Plünnecke–Petridis); proven by induction on `C` and careful set-theoretic decomposition. |
| `pluennecke_ruzsa_inequality_pow_div_pow_mul` | `#(B^m / B^n) ≤ (#(A * B) / #A)^(m+n) * #A` | General Plünnecke–Ruzsa inequality (multiplication version); bounds size of mixed product/difference sets in terms of doubling constant. |
| `pluennecke_ruzsa_inequality_pow_mul` | `#(B^n) ≤ (#(A * B) / #A)^n * #A` | Special case: bounds powers `B^n` using doubling constant; corollary of above with `m = 0`. |

> **Notation**:  
> - `A / B = {a * b⁻¹ | a ∈ A, b ∈ B}`  
> - `A * B = {a * b | a ∈ A, b ∈ B}`  
> - `B^n` denotes `B` multiplied with itself `n` times (i.e., `B ^ n = B * B * … * B`)  
> - `#S` is cardinality of finite set `S`.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `ruzsa_triangle_inequality_…`: All variants of Ruzsa’s triangle inequality.
  - `pluennecke_petridis_inequality_…`: Plünnecke–Petridis inequality (core lemma).
  - `pluennecke_ruzsa_inequality_…`: Full Plünnecke–Ruzsa inequality and variants.
- **Suffixes**:
  - `div_div_div`, `mul_mul_mul`, `mul_div_mul`, etc.: Indicate operation types on each argument (e.g., `div` = `/`, `mul` = `*`, `invMul` = `⁻¹ *`, `mulInv` = `* ⁻¹`).
  - `add`, `sub`, `negadd`, `addneg`, etc.: Additive analogues (via `to_additive`).
- **Auxiliary lemmas**:
  - `mul_aux`, `card_mul_pow_le`: Technical lemmas used in proofs of main theorems.

---

#### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Role |
|--------|------|
| `rw` / `simp_rw` | Rewriting definitions (`div_eq_mul_inv`, `mul_comm`, `pow_succ'`, etc.) |
| `induction'` | Structural induction on finite sets (`Finset.induction_on`) or naturals (`n`) |
| `gcongr` | Congruence for inequalities under monotone operations (e.g., exponentiation, multiplication by positive scalars) |
| `field_simp` / `ring` | Simplifying rational expressions and verifying algebraic identities (especially in `mul_aux`, `card_mul_pow_le`) |
| `exact` / `refine` | Constructing proofs using previously established facts |
| `push_cast` / `mod_cast` | Moving between `ℕ`, `ℚ≥0`, and real-valued inequalities |
| ` positivity` | Proving positivity of cardinals and denominators (e.g., `#A > 0`) |
| `aesop` (implicit via `mul_le_mul`, `card_le_card`, etc.) | Automating routine order/group reasoning |

---

#### **4. Proof Logic**

- **Ruzsa triangle inequality (noncommutative)**:
  - Uses **bipartite double counting**: constructs an injective map from a subset of `(A / B) × (C / B)` to `(A / C) × B`.
  - Relies on `card_mul_le_card_mul` and properties of `mem_bipartiteBelow`/`mem_bipartiteAbove`.

- **Plünnecke–Petridis inequality**:
  - Induction on `C` with careful decomposition:
    - Define `A' = A ∩ (A * C / {x})`
    - Express `A * B * (insert x C)` as a union/sdiff: `A * B * C ∪ (A * B * {x}) \ (A' * B * {x})`
    - Apply `card_union_le`, `card_sdiff`, and inductive hypothesis.

- **Ruzsa triangle inequality (commutative)**:
  - Uses **minimal image argument** over nonempty subsets of `B`:
    - Minimizes `#(U * A) / #U` over `U ∈ B.powerset.erase ∅`.
    - Applies Plünnecke–Petridis to this minimal `U` to derive inequality.

- **Plünnecke–Ruzsa inequality**:
  - Combines:
    - Ruzsa triangle inequality (`div_mul_mul`)
    - Plünnecke–Petridis inequality (`pluennecke_petridis_inequality_mul`)
    - Induction + `card_mul_pow_le` (bounds `#(A * B^n)`)
    - Minimality to relate `#(C * B)/#C` to `#(A * B)/#A`.

---

#### **5. Imports & Scope**

**Core imports**:
- `Mathlib.Algebra.Group.Pointwise.Finset.Basic`: Defines `*`, `/`, `⁻¹`, `pow` for `Finset`.
- `Mathlib.Algebra.Order.Field.Rat`: Rational numbers as an ordered field (used for `ℚ≥0`).
- `Mathlib.Algebra.Order.Ring.Basic`: Ordered ring theory (e.g., `mul_le_mul`, `tsub_mul`).
- `Mathlib.Combinatorics.Enumerative.DoubleCounting`: `card_mul_le_card_mul`, bipartite graphs.
- `Mathlib.Tactic.*`: `FieldSimp`, `GCongr`, `Positivity`, `Ring`.

**Scope & assumptions**:
- `DecidableEq G`: Ensures finite sets behave well.
- `[Group G]`: General (possibly noncommutative) groups.
- `[CommGroup G]`: Commutative groups for stronger results (Plünnecke–Petridis, full Plünnecke–Ruzsa).
- `open scoped Pointwise`: Enables `*`, `/`, `⁻¹`, `pow` notation for `Finset`.

---

#### **6. Notes & Adaptations**

- **Adaptation note** in `ruzsa_triangle_inequality_mul_mul_mul`: Explicit `@` needed for `le_div_iff₀` due to typeclass inference ambiguity.
- **Additive analogues**: All multiplicative theorems have `to_additive`-generated additive versions (e.g., `add_sub_sub_sub`, `add_add_add`, `negadd-negadd-negadd`).
- **Harder commutative case**: The multiplicative Plünnecke–Ruzsa inequality is harder than the division version because double counting arguments don’t directly apply.

--- 

This file formalizes foundational tools in **additive combinatorics**, particularly the theory of sets with small doubling, and serves as a basis for further work in small tripling and structure theorems (see `Mathlib.Combinatorics.Additive.SmallTripling`).