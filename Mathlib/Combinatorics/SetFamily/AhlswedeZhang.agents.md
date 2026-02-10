### Technical Brief: Ahlswede-Zhang Identity in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `truncatedSup s a` | `α` | Supremum of elements in `s` ≥ `a`, or `⊤` if none exist. Used to measure how far up `a` reaches in `s`. |
| `truncatedInf s a` | `α` | Infimum of elements in `s` ≤ `a`, or `⊥` if none exist. Dual to `truncatedSup`. |
| `infSum 𝒜` | `ℚ` | Weighted sum over all subsets `s` of `#(truncatedInf 𝒜 s) / (#s * n.choose #s)`. LHS of Ahlswede-Zhang identity. |
| `supSum 𝒜` | `ℚ` | Weighted sum over all subsets `s` of `#(truncatedSup 𝒜 s) / ((n - #s) * n.choose #s)`. Complementary term. |
| `IsAntichain.le_infSum` | `∑_{A ∈ 𝒜} 1 / n.choose |A| ≤ infSum 𝒜` | Generalizes LYM inequality: for antichains, LYM sum ≤ RHS of AZ identity. |
| `infSum_eq_one` | `infSum 𝒜 = 1` | **Ahlswede-Zhang Identity**: For nonempty `𝒜` with `∅ ∉ 𝒜`, the weighted sum of truncated infima equals 1. |
| `infSum_compls_add_supSum` | `infSum 𝒜ᶜ + supSum 𝒜 = n * ∑_{k=1}^{n-1} 1/k + 1` | Decomposition of full sum over all subsets into complement + sup terms. Core structural lemma. |
| `supSum_of_not_univ_mem` | `supSum 𝒜 = n * ∑_{k=1}^{n-1} 1/k` | Closed form for `supSum` when `𝒜` is nonempty and doesn’t contain the full set. |
| `binomial_sum_eq` | `∑_{i=0}^n (n.choose i * (m−n) / ((m−i) * m.choose i)) = 1` | Key binomial identity used in proving `supSum_singleton`. |
| `Fintype.sum_div_mul_card_choose_card` | `∑_{s ⊆ α} card α / ((card α − |s|) * card α.choose |s|) = card α * (∑_{k=1}^{n} 1/k)` | Sum over all subsets of a rational weight; appears in `supSum` simplifications. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `truncated*`: For `truncatedSup`, `truncatedInf` — indicates truncation relative to a bound.
  - `*Aux`: Internal helper lemmas (e.g., `sup_aux`, `inf_aux`, `infs_aux`, `sups_aux`).
  - `*_of_*`: Lemmas about behavior under conditions (e.g., `truncatedSup_of_mem`, `supSum_singleton`).
  - `*_of_not_*`: Behavior when condition fails (e.g., `truncatedSup_of_not_mem`, `supSum_of_not_univ_mem`).
  - `*union*`, `*infs*`, `*sups*`: Interaction with union, intersection (`⊼`), and union (`⊻`) of families.

- **Suffixes**:
  - `*sup'`, `*inf'`: Use of `sup'`/`inf'` (nonempty supremum/infimum) in definitions.
  - `*compl*`: Complement-related (e.g., `compl_truncatedSup`, `infSum_compls_add_supSum`).
  - `*eq_*`: Equality lemmas (`infSum_eq_one`, `binomial_sum_eq`).

- **Logical operators**:
  - `*le_*`: Inequality lemmas (`le_infSum`, `le_truncatedSup`, `truncatedInf_le`).
  - `*card_*`: Counting lemmas (`card_truncatedSup_union_add_card_truncatedSup_infs`, etc.).

---

#### **3. Tactic Stack**

- **Core automation**:
  - `simp`, `simp_rw`, `simp only`: Heavy use for rewriting definitions and simplifying filters, unions, intersections.
  - `rw`, `convert`, `congr`: For equational reasoning and congruence closure.
  - `field_simp`, `ring`, `linarith`: Rational arithmetic and simplification of binomial expressions.
  - `cases`, `by_cases`: Splitting on membership/non-membership (e.g., `by_cases h𝒜 : s ∈ lowerClosure 𝒜`).
  - `obtain ⟨...⟩`: Extract witnesses from existential hypotheses.
  - `exact`, `apply`, `refine`: For direct proof construction.

- **Advanced tactics**:
  - `induction' ... using Nat.strong_induction_on`: Strong induction on cardinality for `supSum_of_not_univ_mem`.
  - `set ... with h`: Introduce new variables with names.
  - `have h := ...; clear_value h`: For definitional equality management.
  - `convert Or.inl ... with a ha`: Fine-grained control over disjunctions.

- **Order-theoretic helpers**:
  - `sup'_le_iff`, `le_inf'_iff`, `sup'_union`, `inf'_map`: Reasoning about suprema/infima of finite sets.
  - `lowerClosure`, `upperClosure`, `lower_aux`, `upper_aux`: Structural lemmas about closures.

---

#### **4. Proof Logic**

- **Inductive structure**:
  - Proofs often proceed by **case analysis on membership** in lower/upper closures (e.g., `by_cases h𝒜 : s ∈ lowerClosure 𝒜`).
  - For `supSum_of_not_univ_mem`, **strong induction on `𝒜.card`** is used, with cases:
    - `𝒜` is a singleton → direct computation via `supSum_singleton`.
    - `𝒜 = insert a 𝒜'` → apply `supSum_union_add_supSum_infs`, reduce to smaller families.

- **Algebraic simplifications**:
  - Binomial identities (`binomial_sum_eq`, `Fintype.sum_div_mul_card_choose_card`) are proven separately and reused.
  - Rational arithmetic is normalized using `field_simp` + `ring`.

- **Order-theoretic reasoning**:
  - Antichain properties (`IsAntichain.le_infSum`) rely on:
    - `truncatedInf_of_isAntichain`: For antichains, `truncatedInf 𝒜 A = A`.
    - Then `#(truncatedInf 𝒜 A) = 1`, reducing the sum to LYM form.

- **Complement duality**:
  - `compl_truncatedSup`, `compl_truncatedInf`, and `infSum_compls_add_supSum` exploit Boolean algebra structure.
  - Complement maps `truncatedSup` ↔ `truncatedInf`, enabling decomposition of full sum.

- **Cardinality arguments**:
  - `card_truncatedSup_union_add_card_truncatedSup_infs` mirrors inclusion–exclusion:
    - `#(𝒜 ∪ ℬ) + #(𝒜 ⊼ ℬ) = #𝒜 + #ℬ` at level of truncated suprema.

---

#### **5. Imports & Scope**

- **Core dependencies**:
  ```lean
  Mathlib.Algebra.BigOperators.Intervals
  Mathlib.Algebra.BigOperators.Ring
  Mathlib.Algebra.Order.BigOperators.Group.Finset
  Mathlib.Algebra.Order.Field.Basic
  Mathlib.Data.Finset.Sups
  Mathlib.Tactic.FieldSimp
  Mathlib.Tactic.Ring
  ```

- **Key abstractions used**:
  - `Finset`, `Fintype`, `DecidableEq`, `DecidableRel`
  - `SemilatticeSup`, `SemilatticeInf`, `DistribLattice`, `BooleanAlgebra`
  - `lowerClosure`, `upperClosure`, `powersetCard`, `compl`
  - `IsAntichain`, `FinsetFamily` (via `open scoped FinsetFamily`)

- **Mathlib modules involved**:
  - Order theory (`LowerSet`, `UpperSet`, `BoundedOrder`)
  - Combinatorics (`Finset`, `choose`, `powerset`)
  - Algebraic combinatorics (`BigOperators`, `Ring`, `Field`)

---

### Summary

This file formalizes the **Ahlswede–Zhang identity**, a refinement of the LYM inequality, in the context of finite sets and Boolean algebras. It introduces `truncatedSup`/`truncatedInf` to measure extremal elements in families, defines weighted sums (`infSum`, `supSum`), and proves key structural lemmas (union/infs/sups decomposition), culminating in `infSum_eq_one`. The proofs rely heavily on case analysis, order-theoretic properties, and binomial identities, with tactics like `simp`, `field_simp`, and strong induction playing central roles.