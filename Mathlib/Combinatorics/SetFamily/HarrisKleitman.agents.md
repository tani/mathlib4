### Technical Metadata Brief: Harris-Kleitman Inequality in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsLowerSet` | `Set (Finset α) → Prop` | Predicate for *lower-closed* families of subsets: if `t ∈ 𝒜` and `s ⊆ t`, then `s ∈ 𝒜`. |
| `IsUpperSet` | `Set (Finset α) → Prop` | Predicate for *upper-closed* families: if `t ∈ 𝒜` and `t ⊆ s`, then `s ∈ 𝒜`. |
| `𝒜.memberSubfamily a` | `Finset (Finset α)` | Subfamily of sets in `𝒜` that *contain* element `a`. |
| `𝒜.nonMemberSubfamily a` | `Finset (Finset α)` | Subfamily of sets in `𝒜` that *do not contain* element `a`. |
| `IsLowerSet.le_card_inter_finset'` | `#𝒜 * #ℬ ≤ 2 ^ #s * #(𝒜 ∩ ℬ)` | Localized Harris–Kleitman inequality for families bounded by a fixed set `s`. |
| `IsLowerSet.le_card_inter_finset` | `#𝒜 * #ℬ ≤ 2 ^ Fintype.card α * #(𝒜 ∩ ℬ)` | Global Harris–Kleitman inequality for lower sets over all subsets of a finite type `α`. |
| `IsUpperSet.le_card_inter_finset` | `#𝒜 * #ℬ ≤ 2 ^ Fintype.card α * #(𝒜 ∩ ℬ)` | Harris–Kleitman inequality for *upper* sets (via complement reduction to lower sets). |
| `IsLowerSet.card_inter_le_finset`, `IsUpperSet.card_inter_le_finset` | `2 ^ Fintype.card α * #(𝒜 ∩ ℬ) ≤ #𝒜 * #ℬ` | Anticorrelation inequality: a lower set and an upper set are negatively correlated. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isLowerSet_`, `isUpperSet_`: Theorems about lower/upper sets.
  - `memberSubfamily`, `nonMemberSubfamily`: Subfamilies distinguished by membership of a fixed element `a`.
- **Suffixes**:
  - `_finset`: Indicates the inequality is stated for finite families (`𝒜`, `ℬ : Finset (Finset α)`).
  - `_finset'`: A more general or localized version (e.g., bounded by a specific `s`).
- **Logical structure**:
  - `le_card_inter_`: Correlation inequality (`≤`).
  - `card_inter_le_`: Anticorrelation inequality (`≥`).

---

#### **3. Tactic Stack**

The proofs rely heavily on:

- `induction' ... using Finset.induction`: Structural induction on finite sets (`s`), standard for combinatorial arguments over `Finset`.
- `simp_rw [...]`: Extensive use of rewriting with `mem_`, `card_`, and set-theoretic definitions (e.g., `mem_memberSubfamily`, `mem_nonMemberSubfamily`).
- `exact`, `refine`, `apply`, `intro`: Standard intro/apply tactics.
- `add_mul`, `mul_add`, `mul_le_mul_*`: Ordered ring arithmetic lemmas (from `Mathlib.Algebra.Order.Ring.Nat`).
- `card_le_card`, `card_insert_of_not_mem`, `card_compl`, `card_sdiff`: Cardinality manipulation lemmas.
- `rwa [...]`: Rewrite + assumption, used to simplify after applying a lemma.
- `tsub_*`, `le_tsub_*`: Tactics for subtraction in `ℕ` (e.g., `tsub_mul`, `le_tsub_iff_tsub_le`).
- `aesop` is *not* used — proofs are largely manual and structured.

---

#### **4. Proof Logic**

- **Inductive structure**: Proofs proceed by induction on the size of a bounding set `s` (or `univ` in the global case), splitting families via `memberSubfamily a` and `nonMemberSubfamily a`.
- **Decomposition step**:
  - Use identity: `#𝒜 = #𝒜.memberSubfamily a + #𝒜.nonMemberSubfamily a`.
  - Expand `#𝒜 * #ℬ` using distributivity.
- **IH application**:
  - Apply induction hypothesis separately to:
    - `𝒜.memberSubfamily a`, `ℬ.memberSubfamily a` (sets containing `a`, reduced to `s`)
    - `𝒜.nonMemberSubfamily a`, `ℬ.nonMemberSubfamily a` (sets not containing `a`, also reduced to `s`)
- **Complement trick**:
  - For upper sets: use `IsUpperSet 𝒜 ↔ IsLowerSet 𝒜ᶜ`, then reduce to lower-set case.
  - For anticorrelation: apply lower-set inequality to `𝒜ᶜ ∩ ℬ`, then manipulate using set identities (`sdiff`, `compl`, `inter`).
- **Key insight**: The inequality reflects *positive association* within monotone families (FKG-type phenomenon) in the uniform measure on `𝒫(α)`.

---

#### **5. Imports**

| Module | Role |
|--------|------|
| `Mathlib.Algebra.Order.Ring.Nat` | Ordered semiring arithmetic, `mul_le_mul_*`, `add_le_add_*`, `tsub_*` lemmas. |
| `Mathlib.Combinatorics.SetFamily.Compression.Down` | Definitions of `memberSubfamily`, `nonMemberSubfamily`, and basic properties of lower/upper sets. |
| `Mathlib.Order.UpperLower.Basic` | Core definitions of `IsLowerSet`, `IsUpperSet`, and closure properties (e.g., `nonMemberSubfamily`, `memberSubfamily` preserve lowerness). |
| `Mathlib.Data.Fintype.Powerset` | Cardinality of powerset (`Fintype.card_finset`, `card_sdiff`, `card_compl`). |

---

### Summary

This file formalizes the **Harris–Kleitman inequality**, a foundational result in probabilistic combinatorics, stating that monotone families of subsets (lower or upper) are positively correlated, while a lower and upper family are negatively correlated. The proof is constructive and inductive, leveraging decomposition by element membership and complementation. The naming and structure reflect Lean’s combinatorial library conventions, with heavy use of `Finset` induction and ordered ring arithmetic.