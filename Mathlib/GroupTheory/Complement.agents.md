Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Complements in Group Theory (Lean 4)**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsComplement S T` | `Prop` | States that the multiplication map `S × T → G`, `(s, t) ↦ s * t`, is a bijection. Generalizes transversals and complementary subgroups. |
| `IsComplement' H K` | `abbrev` | Special case of `IsComplement` for subgroups `H, K ≤ G`. |
| `leftTransversals T` | `Set (Set G)` | Set of all subsets `S ⊆ G` such that `IsComplement S T`. Typically used with `T = H` a subgroup — then `S` contains exactly one representative per left coset of `H`. |
| `rightTransversals S` | `Set (Set G)` | Set of all subsets `T ⊆ G` such that `IsComplement S T`. Typically used with `S = H` — then `T` contains exactly one representative per right coset of `H`. |
| `isComplement_iff_existsUnique` | `↔` | Characterizes `IsComplement S T` as: every `g ∈ G` has a *unique* decomposition `g = s * t` with `s ∈ S`, `t ∈ T`. |
| `isComplement'_comm` | `↔` | Symmetry: `H` and `K` are complements iff `K` and `H` are. |
| `isComplement'_top_bot`, `isComplement'_bot_top` | `IsComplement' ⊤ ⊥`, `IsComplement' ⊥ ⊤` | Trivial complements: whole group and trivial subgroup are complements. |
| `isComplement'_bot_left/right` | `↔ H = ⊤` | Characterizes when a subgroup complements the trivial subgroup (i.e., is the whole group). |
| `isComplement'_top_left/right` | `↔ H = ⊥` | Characterizes when a subgroup complements the whole group (i.e., is trivial). |
| `isComplement_subgroup_right_iff_existsUnique_quotientGroupMk` | `↔` | Links `IsComplement S H` to uniqueness of representatives in each left coset: `∀ q ∈ G/H, ∃! s ∈ S, s ↦ q`. |
| `isComplement_subgroup_left_iff_existsUnique_quotientMk''` | `↔` | Analogous for right cosets: `∀ q ∈ H\G, ∃! t ∈ T, t ↦ q`. |
| `isComplement_subgroup_right/left_iff_bijective` | `↔` | Reformulates complement condition as bijectivity of the natural map from `S` (or `T`) to the quotient. |
| `IsComplement.card_mul_card` | `Nat.card S * Nat.card T = Nat.card G` | Cardinality formula for complements (finite case). |
| `IsComplement.card_left/right` | `Nat.card S = H.index`, `Nat.card T = H.index` | Size of a transversal equals the index of the subgroup. |
| `equiv hST : G ≃ S × T` | `noncomputable def` | Equivalence induced by bijectivity of multiplication `S × T → G`. |
| `leftQuotientEquiv hS : G ⧸ H ≃ S` | `noncomputable def` | Equivalence between left cosets and a left transversal. |
| `toLeftFun hS : G → S` | `noncomputable def` | Function picking the unique representative in `S` for each left coset. |
| `exists_isComplement_left/right` | `∃ S, IsComplement S H ∧ g ∈ S` | For any `g ∈ G`, there exists a left/right transversal containing `g`. |
| `exists_left/right_transversal_of_le` | `∃ S, S * H' = H ∧ ...` | Given `H' ≤ H`, there exists a transversal `S` of `H'` in `H`. |

#### **2. Naming Conventions**

- **Prefixes**:
  - `isComplement_...`: properties of `IsComplement`.
  - `isComplement'_...`: properties of `IsComplement'` (subgroup version).
  - `mem_...`: membership criteria for `leftTransversals` / `rightTransversals`.
  - `equiv_...`, `leftQuotientEquiv`, `toLeftFun`: constructions involving the canonical equivalences.
- **Suffixes**:
  - `_left`, `_right`: distinguish left vs. right versions (e.g., `isComplement_univ_left`, `equiv_mul_right`).
  - `_iff`: biconditional characterizations.
  - `_def`: definitional equivalences (e.g., `isComplement'_def`).
- **Notable patterns**:
  - `inv_mul_mem`, `mul_inv_mem`: characterizations using `(s⁻¹ * g ∈ H)` or `(g * t⁻¹ ∈ S)`.
  - `quotientGroupMk`, `Quotient.mk''`: reference to quotient maps.

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp_rw`: simplification, especially with `← QuotientGroup.eq`, `mul_inv_rev`, etc.
- `aesop`: automated reasoning for basic group-theoretic identities.
- `rw`: rewriting using equivalences and definitions.
- `convert`: to align goals up to definitional equality (e.g., with `isComplement_iff_existsUnique`).
- `exact`, `refine`, `obtain`: constructive reasoning and existential elimination.
- `ext`: extensionality for subtype equality.
- `congr_arg`, `congr_arg₂`: for congruence of equalities involving operations.
- `Function.bijective_iff_existsUnique`: bridge between bijectivity and unique existence.
- `Equiv.ofBijective`: construct equivalence from bijective map.
- `quotient_induction_on'`: induction on quotient types.

#### **4. Proof Logic**

- **Core strategy**: Prove `IsComplement S T` by showing the multiplication map `S × T → G` is bijective.
  - Injectivity: assume `s₁ t₁ = s₂ t₂`, deduce `s₁ = s₂`, `t₁ = t₂`.
  - Surjectivity: for any `g`, construct `(s, t)` with `s * t = g`.
- **Transversal constructions**:
  - Use `Function.update` on `Quotient.out` to pick a representative containing a given element.
  - Use `range f` where `f` is a section of the quotient map (`∀ q, f q ∈ q`).
- **Cardinality arguments**:
  - Use `Nat.card_congr` with equivalences (e.g., `leftQuotientEquiv`).
  - Use `Nat.card_prod` and `Equiv.ofBijective`.
- **Quotient-based reasoning**:
  - Translate complement conditions into statements about uniqueness of lifts to the quotient.
  - Use `QuotientGroup.eq`, `leftRel_apply`, `rightRel_apply` to relate coset equality to group equations.

#### **5. Imports**

- `Mathlib.GroupTheory.Index`: Provides `Subgroup.index`, `quotientRightRelEquivQuotientLeftRel`, and foundational quotient group theory.
- `Set`, `Function`, `Pointwise`: Standard libraries for sets, functions, and pointwise operations (e.g., `S * T` for product of subsets).

---

This file formalizes the theory of *complements* and *transversals* in group theory, with a focus on equivalence between algebraic conditions (unique factorization), set-theoretic conditions (bijection to product), and quotient-theoretic conditions (bijection to coset space). It is part of the `Mathlib` ecosystem and follows Lean 4 conventions (e.g., `to_additive`, `deprecated` attributes, `linter` settings).