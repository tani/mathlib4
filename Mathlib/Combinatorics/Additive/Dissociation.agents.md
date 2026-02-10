### Technical Brief: Dissociation and Span in Commutative Groups (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `MulDissociated s` | `Set α → Prop` | Predicate stating that all finite subsets of `s` have *distinct* products (analog of linear independence with scalars ∈ {−1, 0, 1}). Formally: `InjOn (∏ x in ·, x) {t : Finset α | ↑t ⊆ s}`. |
| `mulDissociated_iff_sum_eq_subsingleton` | `MulDissociated s ↔ ∀ a, ... .Subsingleton` | Equivalent characterization: for each `a`, there is at most one subset of `s` whose product is `a`. |
| `mulDissociated_empty` | `MulDissociated (∅ : Set α)` | Empty set is dissociated. |
| `mulDissociated_singleton` | `MulDissociated ({a} : Set α) ↔ a ≠ 1` | A singleton is dissociated iff its element is not the identity. |
| `not_mulDissociated` | `¬ MulDissociated s ↔ ∃ t ≠ u ⊆ s, ∏ t = ∏ u` | Characterizes failure of dissociation via two distinct subsets with equal product. |
| `not_mulDissociated_iff_exists_disjoint` | Same as above, but with `t`, `u` disjoint and `t ≠ u`. | Refinement: dissociation fails iff two *disjoint* subsets have equal product. |
| `mulSpan s` | `Finset α → Finset α` | Span of `s`: set of all products `∏ a in s, a ^ ε a` where `ε : s → {-1, 0, 1}`. Analog of integer linear combinations with coefficients in {−1, 0, 1}. |
| `mem_mulSpan` | `a ∈ mulSpan s ↔ ∃ ε, ... ∧ ∏ a in s, a ^ ε a = a` | Membership criterion for `mulSpan`. |
| `subset_mulSpan` | `s ⊆ mulSpan s` | Every element of `s` lies in its span. |
| `prod_div_prod_mem_mulSpan` | `t ⊆ s ∧ u ⊆ s ⇒ (∏ t) / (∏ u) ∈ mulSpan s` | Closure under division of products over subsets — key structural property. |
| `exists_subset_mulSpan_card_le_of_forall_mulDissociated` | `∀ s' ⊆ s, MulDissociated s' ⇒ |s'| ≤ d ⇒ ∃ s' ⊆ s, |s'| ≤ d ∧ s ⊆ mulSpan s'` | Core structural theorem: if all dissociated subsets of `s` have size ≤ `d`, then `s` is spanned by a small dissociated subset. Analog of dimension bound in vector spaces. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `mul_` / `add_`: Multiplicative vs additive analogs (e.g., `mulSpan`, `addSpan`; `mulDissociated`, `addDissociated`).
  - `is_`, `mem_`, `subset_`, `prod_`, `div_`, `erase_`, `insert_`, `ssubset_`: Standard Lean/Mathlib patterns.
- **Suffixes**:
  - `_iff_`: Biconditional lemmas (e.g., `mulDissociated_iff_sum_eq_subsingleton`).
  - `_eq_iff_`, `_ne_iff_`, `_disjoint_iff_`: Equivalence characterizations.
  - `_preimage`, `_inv`: Behavior under group homomorphisms/automorphisms.
- **Notation**:
  - `↑t` for coercion `t : Finset α → Set α`.
  - `ε a` for exponent function; `ε ∈ {-1, 0, 1}` encoded via `Finset.piFinset`.
  - `∏ x in t, x` for finset product; `zpow` for integer powers.

---

#### **3. Tactic Stack**

- **Core automation**:
  - `simp` / `simp_rw`: Dominant use — especially for rewriting definitions (`mulSpan`, `InjOn`, `subset`, `prod`), handling `Finset` coercions, and exponent arithmetic.
  - `aesop`: Used in `not_mulDissociated` to automate propositional logic + set reasoning.
- **Algebraic reasoning**:
  - `ring`, `abel`, `zpow` lemmas: Implicit in `prod_div_distrib`, `zpow_sub`, `pow_ite`.
  - `push_cast`: For coercions (`↑t`, `↑u`) and set-fintype interactions.
- **Set/Finset manipulation**:
  - `subset_insert_iff`, `subset_singleton_iff`, `sdiff_ne_sdiff_iff`, `disjoint_sdiff_sdiff`, `inter_eq_right`, `prod_erase_eq_div`, `prod_sdiff_eq_prod_sdiff_iff`.
- **Classical reasoning**:
  - `classical`: Used in `not_mulDissociated_iff_exists_disjoint` and `exists_subset_mulSpan_card_le_of_forall_mulDissociated`.
- **Induction/Maximality**:
  - `exists_maximal`: In the main structural theorem — constructs a maximal dissociated subset.

---

#### **4. Proof Logic**

- **Dissociation properties**:
  - Proofs often reduce to *uniqueness of product representation* over subsets.
  - `not_mulDissociated` lemmas use contrapositive reasoning: failure ⇔ existence of two distinct subsets with same product.
  - Disjointness refinement (`exists_disjoint`) uses set difference (`t \ u`, `u \ t`) to eliminate overlap while preserving product equality.
- **Span properties**:
  - Membership proofs construct an explicit exponent function `ε : α → ℤ` with values in `{−1, 0, 1}`.
  - `prod_div_prod_mem_mulSpan` shows closure under division of products — key for generating the span.
- **Structural theorem**:
  - **Strategy**: Maximal dissociated subset.
    1. Use `exists_maximal` to get a maximal `s' ⊆ s` with `MulDissociated s'`.
    2. Assume `a ∈ s \ s'`; show `a ∈ mulSpan s'` by contradiction:
       - If not, `s' ∪ {a}` remains dissociated (via `not_mulDissociated_iff_exists_disjoint`), contradicting maximality.
       - Use disjoint subsets `t`, `u` to express `a` as a quotient of products over `s'`.
    3. Conclude `s ⊆ mulSpan s'` and `|s'| ≤ d` by hypothesis.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.BigOperators.Group.Finset` | Core finset product/sum machinery (`∏`, `∑`, `zpow`, `prod_div_distrib`, etc.). |
| `Mathlib.Algebra.Group.Pointwise.Set.Basic` | Set operations on groups (`s⁻¹`, `•`, etc.); needed for `s⁻¹` in `mulDissociated_inv`. |
| `Mathlib.Algebra.Group.Units.Equiv` | Multiplicative equivalences (`≃*`), used in `MulEquiv.mulDissociated_preimage`. |
| `Mathlib.Data.Fintype.Card` | Cardinality of fintypes (`Fintype.card`, used in `s'.card ≤ d`). |

**Domain**: Commutative groups (`CommGroup α`), with decidability (`DecidableEq α`) and finiteness (`Fintype α`) for `mulSpan` definitions.

**Mathematical context**: Analogs of linear algebra over ℤ with restricted scalars `{−1, 0, 1}` — relevant in additive combinatorics, especially in contexts like *dissociated sets* in harmonic analysis or *Sidon sets*.

--- 

Let me know if you'd like a formalized summary for documentation or a tactic-level proof sketch of the main theorem.