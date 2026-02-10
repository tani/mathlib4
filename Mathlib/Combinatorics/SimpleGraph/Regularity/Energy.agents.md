### Technical Metadata Brief: Energy of a Partition in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `energy` | `def energy : ℚ` | Defines the *energy* (also called *index*) of a partition `P` w.r.t. a graph `G` as the average of squared edge densities over all off-diagonal part pairs. |
| `energy_nonneg` | `theorem energy_nonneg : 0 ≤ P.energy G` | Proves energy is nonnegative — follows from nonnegativity of squares in numerator and denominator. |
| `energy_le_one` | `theorem energy_le_one : P.energy G ≤ 1` | Shows energy is bounded above by 1 — uses edge density bounded by 1 and combinatorial inequality on off-diagonal cardinality. |
| `coe_energy` | `@[simp, norm_cast] theorem coe_energy` | Allows coercion of energy from `ℚ` to any linear ordered field `𝕜`, simplifying reasoning in extensions like `ℝ`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `energy_`: Used for properties of the `energy` function (`energy_nonneg`, `energy_le_one`, `coe_energy`).
- **Suffixes**:
  - `_nonneg`, `_le_one`: Standard Lean patterns for bounding results.
- **Variables**:
  - `{α : Type*} [DecidableEq α]`: Generic type with decidable equality.
  - `s : Finset α`, `P : Finpartition s`, `G : SimpleGraph α`: Standard setup for graph-partition interactions.
- **Notation**:
  - `P.parts.offDiag`: Refers to unordered pairs of distinct parts in the partition.
  - `G.edgeDensity u v`: Edge density between subsets `u`, `v` — defined elsewhere (likely in `Mathlib.Combinatorics.SimpleGraph.Density`).

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `exact` | Direct proof application (e.g., `exact div_nonneg ...`). |
| `sq_nonneg` | Applies `sq_nonneg x` to get `0 ≤ x^2`. |
| `div_le_of_le_mul₀` | Used to bound a quotient `a / b ≤ c` by showing `a ≤ b * c` and `0 < b`. |
| `calc` | Chain of inequalities (used in `energy_le_one`). |
| `rw [offDiag_card, one_mul]` | Rewriting cardinality lemmas and simplifying multiplicative identities. |
| `norm_cast` | Handles coercion between `ℕ`, `ℤ`, `ℚ`, and `𝕜`. |
| `sq` | Rewrites `x ^ 2` as `x * x`. |
| `tsub_le_self` | Used for bounding subtraction in naturals (e.g., `n - k ≤ n`). |

---

#### **4. Proof Logic**

- **General Strategy**:
  - **Nonnegativity**: Immediate from square nonnegativity in numerator and denominator.
  - **Upper bound (`≤ 1`)**:
    1. Bound each term in the sum by 1 using `G.edgeDensity_le_one`.
    2. Apply `sum_le_card_nsmul` to pull out cardinality.
    3. Simplify using `Nat.smul_one_eq_cast`.
    4. Use `offDiag_card` to relate `#P.parts.offDiag` to `#P.parts`.
    5. Final inequality uses `tsub_le_self` (since `offDiag` excludes diagonal pairs).
- **Coercion lemma (`coe_energy`)**:
  - Uses `norm_cast` to lift the rational definition to a general linear ordered field.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.Module.NatInt` | For coercion and scalar multiplication facts (`ℕ`, `ℤ` actions). |
| `Mathlib.Algebra.Order.BigOperators.Group.Finset` | For sum inequalities, especially `sum_le_card_nsmul`. |
| `Mathlib.Combinatorics.SimpleGraph.Density` | Defines `edgeDensity`, basic graph density properties. |
| `Mathlib.Data.Rat.BigOperators` | For summation over finite sets in `ℚ`, and arithmetic in ℚ. |

---

#### **Domain Context**

- **Purpose**: Formalization of Szemerédi’s Regularity Lemma.
- **Role of Energy**: Drives an induction — energy strictly increases with each refinement unless the partition is already ε-regular.
- **Mathematical Setting**:
  - Finite simple graphs on a type `α` with decidable adjacency.
  - Partitions are finite (`Finpartition`), and energy compares part pairs via edge density.

--- 

Let me know if you'd like a formalized summary for use in an AI agent’s knowledge base or a visualization of the energy function’s behavior.