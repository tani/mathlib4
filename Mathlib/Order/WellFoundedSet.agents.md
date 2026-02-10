### Technical Brief: Well-Founded and Partially Well-Ordered Sets in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Set.WellFoundedOn s r` | `s : Set α → r : α → α → Prop → Prop` | States that relation `r` is well-founded when restricted to set `s`. |
| `Set.IsWF s` | `s : Set α → Prop` | Special case: `<` is well-founded on `s`. |
| `Set.PartiallyWellOrderedOn s r` | `s : Set α → r : α → α → Prop → Prop` | Any infinite sequence in `s` has a pair `m < n` with `r (f m) (f n)`. |
| `Set.IsPWO s` | `s : Set α → Prop` | Special case: `≤` is partially well-ordered on `s` (i.e., every sequence has a monotone subsequence of length ≥2). |
| `Set.IsWF.union` | `IsWF s → IsWF t → IsWF (s ∪ t)` | Union of two well-founded sets is well-founded. |
| `Set.IsWF.mono` | `IsWF t → s ⊆ t → IsWF s` | Subset of a well-founded set is well-founded. |
| `Set.Finite.isWF` | `s.Finite → IsWF s` | All finite sets are well-founded. |
| `Set.partiallyWellOrderedOn_sublistForall₂` (Higman’s Lemma) | `s.PartiallyWellOrderedOn r → {l : List α | ∀ x ∈ l, x ∈ s}.PartiallyWellOrderedOn (List.SublistForall₂ r)` | Extends PWO from elements to lists under sublist-wise relation. |
| `Set.wellFoundedOn_iff` | `s.WellFoundedOn r ↔ WellFounded (fun a b ↦ r a b ∧ a ∈ s ∧ b ∈ s)` | Relates relative well-foundedness to absolute well-foundedness on ambient type. |
| `Set.IsWF.isPWO` (in LinearOrder) | `IsWF s → IsPWO s` | In linear orders, `IsWF` and `IsPWO` coincide. |
| `Set.IsPWO.isWF` | `IsPWO s → IsWF s` | PWO implies WF (in preorders). |
| `Set.IsWF.min` | `IsWF s → s.Nonempty → α` | Returns minimal element of nonempty WF set. |
| `Set.IsWF.min_le` | `IsWF s → s.Nonempty → a ∈ s → min ≤ a` | Minimality property of `min`. |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `wellFoundedOn_`: for lemmas about `WellFoundedOn`.
  - `isWF_`: for lemmas about `IsWF`.
  - `partiallyWellOrderedOn_`: for lemmas about `PartiallyWellOrderedOn`.
  - `isPWO_`: for lemmas about `IsPWO`.
- **Suffixes:**
  - `_iff`: characterizations via equivalence (`↔`).
  - `_union`: behavior under union.
  - `_singleton`, `_insert`, `_sdiff_singleton`: behavior under basic set operations.
  - `_image_of_monotone[_on]`: image under monotone functions.
  - `_mono`: monotonicity (subset inclusion).
- **Other patterns:**
  - `exists_monotone_subseq`: existence of monotone subsequence.
  - `no_descending_seq`: characterization via absence of descending sequences.
  - `min`, `not_lt_min`: minimal element properties.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `tfae_have`, `tfae_finish` | Proving equivalence of multiple statements (e.g., `acc_iff_wellFoundedOn`). |
| `simp` / `simp only` | Simplifying goals using known lemmas (e.g., `wellFoundedOn_empty`, `isWF_union`). |
| `rw` / `rwa` | Rewriting using equivalences or implications. |
| `exact`, `refine`, `apply` | Direct proof construction. |
| `rcases`, `obtain`, `cases'` | Decomposing existential/universal hypotheses. |
| `by_contra!`, `exfalso` | Contradiction-based reasoning (e.g., in `finite_of_partiallyWellOrderedOn`). |
| `aesop`, `linarith`, `omega` | Automated reasoning for order arithmetic (e.g., `min_le_min_of_subset`). |
| `induction'` | Structural or natural-number induction. |
| `convert`, `congr'` | Congruence-based proof refinement. |
| `funext`, `ext` | Extensionality for functions/sets. |

---

#### **4. Proof Logic Patterns**

- **Induction + Cases**:  
  Proofs often proceed by induction on natural numbers (e.g., sequences), followed by case analysis on membership or ordering (e.g., `lt_trichotomy`, `le_or_lt`).

- **Contrapositive + Infinite Subsequence Construction**:  
  To show PWO, assume existence of a bad sequence (non-increasing, no `r`-related pair), then derive contradiction via minimal bad sequence argument (used in Higman’s Lemma).

- **Reduction via Equivalences**:  
  Many results reduce to known facts via `wellFoundedOn_iff`, `isWF_iff_isPWO`, or `partiallyWellOrderedOn_iff_exists_monotone_subseq`.

- **Subtype Embedding**:  
  When working with `WellFoundedOn`, proofs often lift/retract via subtype coercion (e.g., `Subtype.val`, `Subtype.coe_injective`).

- **Finite vs Infinite Dichotomy**:  
  Central to PWO reasoning: infinite sequences ⇒ monotone subsequence ⇔ no infinite antichain or descending chain.

- **Monotonicity & Image Preservation**:  
  Monotone functions preserve PWO/WF under image (`image_of_monotone_on`, `image_of_monotone`), often via subsequence extraction.

---

#### **5. Imports & Scope**

**Core Dependencies**:
```lean
import Mathlib.Data.Prod.Lex
import Mathlib.Data.Sigma.Lex
import Mathlib.Order.Antichain
import Mathlib.Order.OrderIsoNat
import Mathlib.Order.WellFounded
import Mathlib.Tactic.TFAE
```

**Domain Scope**:
- **Order Theory**: Well-founded relations, partial orders, linear orders, antichains.
- **Combinatorics**: Higman’s Lemma, infinite sequences, subsequences.
- **Set Theory**: Subsets, unions, finite/infinite sets, images/preimages.
- **Type Theory**: Subtypes, embeddings, accessible elements.

**Notable Exclusions**:
- No `OrderedSemiring` (explicitly asserted non-existence).
- Focus on *strict* and *non-strict* orders (`LT`, `Preorder`, `PartialOrder`, `LinearOrder`).

---

### Summary

This module formalizes foundational concepts in well-quasi-ordering and well-foundedness, with emphasis on:
- Equivalence of definitions (e.g., via sequences, minimal elements, antichains),
- Closure properties (unions, subsets, images),
- Deep combinatorial results like **Higman’s Lemma**,
- Specialization to linear orders where `IsWF ↔ IsPWO`.

The formalization is highly structured, leveraging Lean’s typeclass infrastructure (`IsRefl`, `IsTrans`, `IsStrictOrder`, etc.) and tactic automation for order reasoning.