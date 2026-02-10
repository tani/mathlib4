### Technical Brief: Covering Relations in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `WCovBy a b` | `Prop` | `a ⩿ b`: *Weak covering*: `a ≤ b` and no element strictly between `a` and `b`. |
| `CovBy a b` | `Prop` | `a ⋖ b`: *Covering*: `a < b` and no element strictly between `a` and `b`. |
| `WCovBy.le` | `a ⩿ b → a ≤ b` | Extracts the non-strict inequality from a weak cover. |
| `WCovBy.refl` / `rfl` | `a ⩿ a` | Reflexivity of weak covering. |
| `CovBy.lt` | `a ⋖ b → a < b` | Extracts the strict inequality from a cover. |
| `CovBy.ne` | `a ⋖ b → a ≠ b` | Irreflexivity (strictness) of covering. |
| `wcovBy_iff_covBy_or_le_and_le` | `a ⩿ b ↔ a ⋖ b ∨ a ≤ b ∧ b ≤ a` | Relates weak and strict covering in preorders. |
| `wcovBy_iff_covBy_or_eq` | `a ⩿ b ↔ a ⋖ b ∨ a = b` | In *partial orders*, weak covering = strict cover or equality. |
| `covBy_iff_wcovBy_and_lt` | `a ⋖ b ↔ a ⩿ b ∧ a < b` | Strict cover = weak cover + strict inequality. |
| `covBy_iff_wcovBy_and_not_le` | `a ⋖ b ↔ a ⩿ b ∧ ¬ b ≤ a` | In preorders, strict cover = weak cover + asymmetry. |
| `WCovBy.eq_or_eq` | `a ⩿ b → a ≤ c → c ≤ b → c = a ∨ c = b` | In *partial orders*, interval `[a,b]` has only endpoints. |
| `covBy_iff_lt_and_eq_or_eq` | `a ⋖ b ↔ a < b ∧ ∀ c, a ≤ c → c ≤ b → c = a ∨ c = b` | Characterization of strict covering in partial orders. |
| `not_wcovBy_iff` | `a ≤ b → (¬a ⩿ b ↔ ∃ c, a < c ∧ c < b)` | Weak covering fails iff there's an intermediate element. |
| `not_covBy_iff` | `a < b → (¬a ⋖ b ↔ ∃ c, a < c ∧ c < b)` | Strict covering fails iff there's an intermediate element. |
| `covBy_iff_Ioo_eq` | `a ⋖ b ↔ a < b ∧ Ioo a b = ∅` | Covering ⇔ strict order + empty open interval. |
| `wcovBy_iff_Ioo_eq` | `a ⩿ b ↔ a ≤ b ∧ Ioo a b = ∅` | Weak covering ⇔ non-strict order + empty open interval. |
| `OrderEmbedding.covBy_of_apply` / `OrderIso.map_covBy` | Embeddings/isomorphisms preserve covering. | |
| `wcovBy_eq_reflGen_covBy` | `[PartialOrder α] ⇒ (· ⩿ ·) = ReflGen (· ⋖ ·)` | Weak covering = reflexive closure of strict covering. |
| `exists_covBy_of_wellFoundedLT` | In well-founded `<`, every non-max element is covered by some greater one. | |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `wcovBy_`: General lemmas about weak covering (`a ⩿ b`).
  - `covBy_`: General lemmas about strict covering (`a ⋖ b`).
  - `of_`, `image`, `apply_..._iff`: Lemmas about behavior under maps (embeddings, isomorphisms).
  - `trans_`, `congr_`: Lemmas about transitivity and congruence.
  - `le_`, `lt_`, `ne_`, `eq_or_eq`: Structural properties (order-theoretic).
- **Suffixes**:
  - `_iff`: Characterizations as biconditionals.
  - `_of_`: Implications from assumptions (e.g., `covBy_of_lt`, `wcovBy_of_le_of_le`).
  - `_left`, `_right`: For product/relational properties (e.g., `mk_covBy_mk_iff_left`).
  - `_iff`: Biconditional characterizations (e.g., `covBy_iff_lt_and_eq_or_eq`).
- **Notation**:
  - `a ⩿ b` for `WCovBy a b`
  - `a ⋖ b` for `CovBy a b`

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp_rw`: Simplification with lemmas like `wcovBy_iff_*`, `Ioo_eq_empty_iff`, etc.
- `exact`, `refine`, `apply`: Direct proof construction.
- `rw`: Rewriting using biconditional lemmas (e.g., `covBy_iff_*`).
- `cases`: Case analysis on `le_iff_lt`, `eq_or_lt`, `or`.
- `push_neg`, `not_iff_not`: Handling negations and contrapositives.
- `ext`: Extensionality for set equalities (e.g., `Icc_eq`, `Ioo_eq`).
- `antisymm`: Proving equality from mutual inequalities.
- `aesop`: Automated reasoning for order-theoretic goals (used implicitly in many proofs).
- `conv`: Goal-directed rewriting (e.g., in `OrderIso.map_covBy`).
- `by_cases`: Splitting on decidables (e.g., `x ∈ t`).

---

#### **4. Proof Logic**

- **Induction/Case Analysis**:
  - On order-theoretic cases: `le_iff_lt`, `eq_or_lt`, `lt_or_ge` (especially in `LinearOrder`).
  - On set membership: `x ∈ t`, `a ∈ s`, etc.
- **Contrapositive Reasoning**:
  - `not_lt.1`, `not_le.1`, `not_lt_iff` used to derive inequalities from absence of intermediate elements.
- **Interval Characterization**:
  - Prove `Ioo a b = ∅` ⇔ covering; then use `Icc`, `Ico`, `Ioc` decompositions.
- **Congruence & Transfer**:
  - Use `OrderEmbedding`/`OrderIso` properties (`lt_iff_lt`, `le_iff_le`) to lift covering to embeddings.
- **Reflexive/Transitive Closure Reasoning**:
  - In `Relation` section: relate `WCovBy` and `CovBy` via `ReflGen`, `ReflTransGen`.
- **Well-Founded Arguments**:
  - Use `WellFoundedLT`/`WellFoundedGT` to extract minimal covering successors/predecessors.

---

#### **5. Imports**

| Module | Purpose |
|--------|---------|
| `Mathlib.Order.Interval.Set.OrdConnected` | Ordinal-connected subsets; used for embedding range properties. |
| `Mathlib.Order.Interval.Set.WithBotTop` | `WithBot`/`WithTop` constructions and their order properties. |
| `Mathlib.Order.Antisymmetrization` | `AntisymmRel`, used to handle non-antisymmetric preorders. |

---

### Summary

This file formalizes the **covering relation** (`⋖`) and its **weak variant** (`⩿`) in general preorders and partial orders, with rich structure:
- Equivalences with empty intervals (`Ioo = ∅`)
- Behavior under embeddings/isomorphisms
- Product and `WithBot/WithTop` extensions
- Connections to well-foundedness and linear orders
- Logical relationships between weak/strict covering and equality/inequality.

The formalization is highly structured, leveraging Lean’s typeclass system (`Preorder`, `PartialOrder`, `LinearOrder`, `SemilatticeSup`, etc.) and standard order-theoretic idioms (intervals, connected sets, dual orders).