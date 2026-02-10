### Technical Brief: Commuting Probability in Finite Groups (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `commProb` | `def commProb : ℚ` | Defines the commuting probability of a finite type with multiplication: ratio of commuting pairs to total pairs. |
| `commProb_def` | `commProb M = Nat.card { p : M × M // Commute p.1 p.2 } / (Nat.card M : ℚ) ^ 2` | Unfolds the definition of `commProb`. |
| `commProb_prod` | `commProb (M × M') = commProb M * commProb M'` | Multiplicativity over direct products. |
| `commProb_pi` | `commProb (∀ a, i a) = ∏ a, commProb (i a)` | Generalizes multiplicativity to dependent products (Pi types). |
| `commProb_function` | `commProb (α → β) = (commProb β) ^ Fintype.card α` | Special case of `commProb_pi` for function types. |
| `commProb_eq_zero_of_infinite` | `[Infinite M] ⇒ commProb M = 0` | Handles infinite types (non-finite case). |
| `commProb_pos` | `[Nonempty M] ⇒ 0 < commProb M` | Positivity for nonempty finite types. |
| `commProb_le_one` | `commProb M ≤ 1` | Upper bound on commuting probability. |
| `commProb_eq_one_iff` | `[Nonempty M] ⇒ commProb M = 1 ↔ Std.Commutative ((· * ·))` | Characterizes groups where all elements commute (i.e., abelian groups). |
| `commProb_def'` | `commProb G = Nat.card (ConjClasses G) / Nat.card G` | Alternative expression using conjugacy class count (for groups). |
| `Subgroup.commProb_subgroup_le` | `commProb H ≤ commProb G * (H.index : ℚ)^2` | Bounds commuting probability of a subgroup in terms of index. |
| `Subgroup.commProb_quotient_le` | `[H.Normal] ⇒ commProb (G ⧸ H) ≤ commProb G * Nat.card H` | Bounds commuting probability of a quotient group. |
| `inv_card_commutator_le_commProb` | `(↑(Nat.card (commutator G)))⁻¹ ≤ commProb G` | Relates commuting probability to size of commutator subgroup via abelianization. |
| `commProb_odd` | `Odd n ⇒ commProb (DihedralGroup n) = (n + 3) / (4 * n)` | Exact formula for commuting probability of odd-order dihedral groups. |
| `commProb_reciprocal` | `commProb (Product (reciprocalFactors n)) = 1 / n` | Main construction: for any `n`, constructs a finite group with commuting probability exactly `1/n`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `commProb_`: All definitions and theorems related to commuting probability.
  - `Subgroup.`: Theorems about subgroups and quotients.
  - `DihedralGroup.`: Lemmas specific to dihedral groups and their product construction.

- **Suffixes**:
  - `_def`, `_def'`: Definitions or alternative forms.
  - `_le`, `_eq_zero`, `_pos`, `_one`: Inequality/equality properties.
  - `_iff`: Biconditional characterizations.
  - `_mul`, `_div`, `_pow`: Arithmetic behavior under multiplication/division/powers.

- **Other patterns**:
  - `reciprocalFactors`: Recursive list construction for target probability denominator.
  - `Product`: Abbreviation for finite product of dihedral groups indexed by list.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp_rw` | Rewriting with simplification rules (especially for `commProb_def`, `Nat.card_*`, `Commute`, etc.). |
| `congr` | Proving equality of expressions by congruence (e.g., in `commProb_prod`, `commProb_pi`). |
| `exact` / `apply` | Direct proof steps, especially for injectivity/surjectivity arguments. |
| `rw` | Rewriting using known equalities (e.g., `card_mul_index`, `div_mul_cancel₀`). |
| `field_simp` | Simplifying rational expressions (e.g., in `commProb_odd`, `commProb_reciprocal`). |
| `norm_num` | Normalizing numeric expressions (especially in dihedral group calculations). |
| `qify` | Converting integer divisibility goals to rational arithmetic (e.g., in `commProb_odd`). |
| `linear_combination` | Solving linear combinations of equations (used in final step of `commProb_reciprocal`). |
| `omega` | Solving linear arithmetic over integers (e.g., in `div_four_lt`). |
| `rcases` / `cases'` | Case analysis on disjunctions or existential quantifiers. |
| `have` / `set` | Introducing intermediate lemmas or hypotheses. |

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - Most proofs follow a **rewrite → simplify → apply known lemmas** pattern.
  - For inequalities (`≤`), the standard approach is:
    - Rewrite using `commProb_def` or `commProb_def'`.
    - Reduce to counting or cardinality comparisons.
    - Use injectivity/surjectivity lemmas like `Finite.card_le_of_injective`, `Finite.card_le_of_surjective`.
  - For equalities (`=`):
    - Use `congr` to reduce to subgoals on components.
    - Use `Nat.card_congr` to establish bijections between types.
    - Use `div_eq_div_iff`, `div_eq_one_iff_eq`, etc., for rational arithmetic.
  - For constructions (e.g., `commProb_reciprocal`):
    - Induction on `n` via `even_or_odd`.
    - Recursive definition of `reciprocalFactors`.
    - Combine lemmas about dihedral groups (`commProb_odd`) and product multiplicativity.

- **Key logical flow**:
  - **Step 1**: Unfold definitions (`commProb_def`, `commProb_def'`).
  - **Step 2**: Reduce to cardinality statements.
  - **Step 3**: Use group-theoretic facts (e.g., `card_comm_eq_card_conjClasses_mul_card`, `ConjClasses.map_surjective`).
  - **Step 4**: Apply arithmetic lemmas (`div_mul_cancel₀`, `pow_ne_zero`, etc.).
  - **Step 5**: Conclude via field simplification or linear combination.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.GroupTheory.Abelianization` | Used for `Abelianization.commGroup`, `commutator G`, and relation to commuting probability. |
| `Mathlib.GroupTheory.GroupAction.CardCommute` | Provides `card_comm_eq_card_conjClasses_mul_card`, linking commuting pairs and conjugacy classes. |
| `Mathlib.GroupTheory.SpecificGroups.Dihedral` | Defines `DihedralGroup n`, its order, and conjugacy class structure (used in `commProb_odd`). |
| `Mathlib.Tactic.FieldSimp` | Simplifies rational expressions (especially division and multiplication). |
| `Mathlib.Tactic.LinearCombination` | Solves linear combinations of equations (used in final step of `commProb_reciprocal`). |
| `Mathlib.Tactic.Qify` | Converts integer divisibility goals to rational arithmetic (e.g., `2 ∣ n + 3`). |

---

#### **Domain-Specific AI Agent Notes**

- **Focus areas for automation**:
  - Recognizing patterns in `commProb_*` lemmas (e.g., product → multiplication, quotient → multiplication by kernel size).
  - Automating cardinality-based inequalities via injectivity/surjectivity lemmas.
  - Handling dihedral group-specific arithmetic (odd/even cases, modular arithmetic).
  - Constructing groups with prescribed commuting probability (via `reciprocalFactors`).

- **Potential extensions**:
  - Formalize **Neumann’s theorem** (mentioned in TODO): If `commProb G > 1/|G'|`, then `G` is abelian-by-finite.
  - Generalize `commProb_reciprocal` to arbitrary finite groups (not just dihedral products).
  - Explore connections with **representation theory** (e.g., number of irreducible representations = number of conjugacy classes).

--- 

Let me know if you'd like a **proof sketch** for a specific theorem (e.g., `commProb_reciprocal`) or a **visualization** of the `reciprocalFactors` construction.