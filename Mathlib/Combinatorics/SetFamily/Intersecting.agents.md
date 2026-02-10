### Technical Metadata Brief: Intersecting Families in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Intersecting` | `def Intersecting (s : Set α) : Prop := ∀ ⦃a⦄, a ∈ s → ∀ ⦃b⦄, b ∈ s → ¬Disjoint a b` | Defines a *family* (set of elements) where every pair of elements has non-empty intersection (i.e., not disjoint). |
| `Intersecting.mono` | `t ⊆ s → s.Intersecting → t.Intersecting` | Monotonicity: subsets of intersecting families are intersecting. |
| `Intersecting.not_bot_mem` | `s.Intersecting → ⊥ ∉ s` | Bottom element (empty set in Boolean algebra) cannot be in an intersecting family. |
| `Intersecting.ne_bot` | `a ∈ s → s.Intersecting → a ≠ ⊥` | Every element of an intersecting family is non-bottom. |
| `intersecting_singleton` | `({a} : Set α).Intersecting ↔ a ≠ ⊥` | A singleton family is intersecting iff its element is non-bottom. |
| `Intersecting.insert` | Conditions for inserting an element into an intersecting family while preserving intersectingness. | Enables inductive construction of intersecting families. |
| `intersecting_iff_pairwise_not_disjoint` | `s.Intersecting ↔ s.Pairwise (¬Disjoint) ∧ s ≠ {⊥}` | Equivalence between intersecting and pairwise non-disjoint (plus exclusion of singleton `{⊥}`). |
| `Subsingleton.intersecting` | `s.Subsingleton → (s.Intersecting ↔ s ≠ {⊥})` | For subsingletons, intersectingness reduces to non-emptiness (excluding `{⊥}`). |
| `Intersecting.isUpperSet` / `isUpperSet'` | Maximal intersecting families are upper sets (closed under ≥). | Structural property of maximal intersecting families. |
| `Intersecting.exists_mem_set` / `exists_mem_finset` | `𝒜.Intersecting → s ∈ 𝒜 → t ∈ 𝒜 → ∃ a, a ∈ s ∧ a ∈ t` | Intersecting families have non-empty pairwise intersections (classical consequence of ¬Disjoint). |
| `Intersecting.not_compl_mem` | `a ∈ s → aᶜ ∉ s` | In a Boolean algebra, a set and its complement cannot both be in an intersecting family. |
| `Intersecting.card_le` | `[Fintype α] → 2 * #s ≤ Fintype.card α` | Size bound: an intersecting family has size ≤ half the universe. |
| `Intersecting.is_max_iff_card_eq` | `[Nontrivial α] [Fintype α] → (maximality ↔ 2 * #s = Fintype.card α)` | Characterizes maximal intersecting families as those achieving the upper bound. |
| `Intersecting.exists_card_eq` | For any intersecting family, there exists a *maximal* one extending it with full size. | Existence of maximal extensions achieving the bound. |

---

#### **2. Naming Conventions**

- **Predicates**: `Intersecting` (capitalized, noun-like predicate).
- **Properties/lemmas**:
  - `not_*`: e.g., `not_bot_mem`, `not_compl_mem`, `not_mem` — show impossibility of certain memberships.
  - `*_mem_*`: e.g., `exists_mem_set`, `exists_mem_finset` — existence of common elements.
  - `*_iff_*`: e.g., `intersecting_singleton`, `intersecting_iff_pairwise_not_disjoint`, `is_max_iff_card_eq` — characterizations.
  - `*_set` / `*_finset`: distinguishes between `Set α` and `Finset α` versions (e.g., `isUpperSet` vs `isUpperSet'`).
- **Auxiliary lemmas**:
  - `mono`, `insert`, `disjoint_map_compl`, `card_le`, `card_eq` — standard structural operations.
- **Prefixes**:
  - `intersecting_`: for lemmas about the predicate itself.
  - `Intersecting.`: for instance/class methods (e.g., `Intersecting.mono`, `Intersecting.not_bot_mem`).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `intro` / `rintro` | Introduce hypotheses and destruct conjunctions/disjunctions. |
| `rw` / `simp_rw` | Rewrite using definitions (e.g., `disjoint_self`, `coe_insert`, `compl_bot`). |
| `simp` | Simplify using `@[simp]` lemmas (e.g., `intersecting_singleton`, `disjoint_compl_right`). |
| `exact` / `assumption` | Close goals directly from hypotheses. |
| `by_cases` / `by_contra!` | Case analysis or contradiction-based reasoning (e.g., `by_contra! ha`). |
| `classical` | Enable classical logic (used in proofs relying on excluded middle, e.g., `exists_mem_set`). |
| `apply` / `exact` | Apply lemmas or constructors (e.g., `apply hs.insert`). |
| `refine` / `exact?` | Partial proof construction (e.g., `refine ⟨s, Subset.rfl, ...⟩`). |
| `rw [Finset.disjoint_left]`, `rw [coe_union]`, etc. | Rewrite using coercion lemmas (`coe_*`) and finset-specific lemmas. |
| `card_*` lemmas: `card_le`, `card_disjUnion`, `card_map` | Arithmetic reasoning about cardinalities. |
| `eq_univ_of_forall`, `subset_antisymm` | Set equality via double inclusion. |

---

#### **4. Proof Logic & Strategy**

- **Inductive structure**: Proofs often proceed by:
  - **Case analysis** on membership (`rfl | hb`).
  - **Rewriting definitions** (`Intersecting`, `Disjoint`, `compl`) to reduce to basic logic.
  - **Using monotonicity** and closure properties (`mono`, `isUpperSet`).
- **Key logical patterns**:
  - **Contrapositive reasoning**: e.g., `mt (eq_bot_mono hab)` to lift inequality to complement.
  - **Double inclusion / antisymmetry**: to prove maximality ↔ equality of sizes.
  - **Cardinality arithmetic**: `2 * #s ≤ n` ⇒ `#s ≤ n/2`, with equality iff maximal.
  - **Strong induction** on `Finset` size for extension lemmas (`exists_card_eq`).
- **Classical reasoning**: Used in:
  - `exists_mem_*` (from `¬Disjoint` ⇒ `∃ a ∈ s ∩ t`).
  - `exists_card_eq` (via strong induction and excluded middle).
- **Coercion handling**: Heavy use of `coe_*` lemmas to bridge `Finset α` ↔ `Set α`.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Data.Fintype.Card` | Cardinal arithmetic, `#s`, `Fintype.card`, `card_disjUnion`, `card_map`. |
| `Mathlib.Order.UpperLower.Basic` | `IsUpperSet`, `UpperSet`, `LowerSet`, order-theoretic notions. |

**Domain**:  
- **Algebraic structure**: `SemilatticeInf`, `OrderBot`, `BooleanAlgebra`, `Nontrivial`, `Fintype`.  
- **Objects**: Sets (`Set α`) and finite sets (`Finset α`) of elements in a Boolean algebra (e.g., subsets of a finite set, with `⊥ = ∅`, `compl = complement`).  
- **Mathematical context**: Extends classical extremal set theory (Kleitman’s theorem on intersecting families).

---

### Summary

This module formalizes the theory of *intersecting families* in Boolean algebras, establishing foundational properties (closure under subsets, exclusion of complements, upper-set structure of maximal families) and quantitative results (size bounds, maximality characterization). It leverages order-theoretic and cardinality tools, with proofs combining classical logic, case analysis, and algebraic rewriting. The naming and structure follow Lean 4/Mathlib conventions, emphasizing modularity and reuse.