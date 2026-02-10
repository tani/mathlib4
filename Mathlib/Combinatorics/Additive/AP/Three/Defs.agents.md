### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ThreeGPFree` | `∀ {α} [Monoid α], Set α → Prop` | Predicate for a set to be *3GP-free* (no non-trivial geometric progressions of length 3). |
| `ThreeAPFree` | `∀ {α} [AddMonoid α], Set α → Prop` | Predicate for a set to be *3AP-free* (no non-trivial arithmetic progressions of length 3); also called *non-averaging* or *Salem–Spencer*. |
| `mulRothNumber` | `Finset α →o ℕ` | Multiplicative Roth number: size of the largest 3GP-free subset of a finset. |
| `addRothNumber` | `Finset α →o ℕ` | Additive Roth number: size of the largest 3AP-free subset of a finset. |
| `rothNumberNat` | `ℕ →o ℕ` | Roth number of a natural `n`: `addRothNumber (Finset.range n)`. |
| `threeGPFree_empty` | `ThreeGPFree (∅ : Set α)` | Empty set is trivially 3GP-free. |
| `threeGPFree_singleton` | `ThreeGPFree ({a} : Set α)` | Singleton sets are 3GP-free. |
| `threeGPFree_insert` | `ThreeGPFree (insert a s) ↔ ...` | Characterizes when inserting an element preserves 3GP-freeness. |
| `threeGPFree_smul_set` | `ThreeGPFree (a • s) ↔ ThreeGPFree s` | Scaling a set by a nonzero element preserves 3GP-freeness (in `CancelCommMonoidWithZero`). |
| `threeAPFree_iff_eq_right` | `ThreeAPFree s ↔ ∀ a b c ∈ s, a + c = 2b → a = c` | In `ℕ`, 3AP-freeness is equivalent to no solutions to `a + c = 2b` with `a ≠ c`. |
| `mulRothNumber_spec` | `∃ t ⊆ s, #t = mulRothNumber s ∧ ThreeGPFree t` | Existence of a maximal 3GP-free subset achieving the Roth number. |
| `IsMulFreimanIso.threeGPFree_congr` | `ThreeGPFree s ↔ ThreeGPFree t` under 2-Freiman isomorphism | 3GP-freeness is preserved under 2-Freiman isomorphisms. |
| `IsMulFreimanIso.mulRothNumber_congr` | `mulRothNumber s = mulRothNumber t` under 2-Freiman isomorphism | Roth numbers are invariant under 2-Freiman isomorphisms. |
| `rothNumberNat_add_le` | `rothNumberNat (M + N) ≤ rothNumberNat M + rothNumberNat N` | Subadditivity of Roth number over natural numbers. |

---

#### 2. **Naming Conventions**

- **Predicates**:  
  - `ThreeGPFree`, `ThreeAPFree`: prefix `Three` + structure (`GP`/`AP`) + `Free`.  
  - `is_`, `has_`, `mem_`, `coe_`, `map_`, `image_`, `mul_`, `add_`, `smul_`, `card_`, `inter_`, `union_`, `subset_`, `mono`, `le_`, `eq_`, `spec`, `congr`, `mono`, `image`, `mapsTo`, `injOn`, `bijOn`, `invFunOn`, `mulLeftEmbedding`, `mulRightEmbedding`, `Finset.range`, `Finset.Ico`, `Finset.Iio`.

- **Properties & Equivalences**:  
  - `↔` lemmas often named `*_congr`, `*_iff_*`, or `*_image` (e.g., `threeGPFree_image`, `threeGPFree_smul_set₀`).

- **Monotonicity/Invariance**:  
  - `mono`, `le_*`, `mulRothNumber_*`, `addRothNumber_*`, `rothNumberNat_*`.

- **Decidability/Instances**:  
  - `instDecidable`, `instance ThreeGPFree.instDecidable`.

- **Specialized Lemmas**:  
  - `eq_right`, `of_image`, `image'`, `smul_set`, `smul_set₀`, `insert_of_lt`, `union_le`, `product`, `map_mul_left/right`.

---

#### 3. **Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `intro`, `rintro`, `rcases`, `obtain` | Introducing hypotheses and destructing existential/universal quantifiers. |
| `rw`, `simp`, `simp_rw` | Rewriting using definitions, lemmas, and simplification rules. |
| `exact`, `refine`, `convert` | Finishing or partially constructing proofs. |
| `apply`, `assumption` | Applying lemmas or using local hypotheses. |
| `cases` | Case analysis on `Fin`, `Nat`, or inductive types. |
| `aesop` | Automated reasoning for simple goals (e.g., set inclusions, equalities). |
| `ring`, `linarith`, `omega` | Solving arithmetic goals (especially in `Nat`/ordered structures). |
| `ext`, `funext` | Extensionality for sets/functions. |
| `congr`, `congr_arg` | Congruence reasoning. |
| `calc` | Chain of equalities/inequalities. |
| `have`, `suffices`, `by_cases` | Intermediate lemma introduction or case splitting. |
| `mod_cast` | Casting between types with compatible structures (e.g., `ℕ` → `Fin n`). |
| `decide` | For decidable propositions (e.g., `Decidable (ThreeGPFree s)`). |

---

#### 4. **Proof Logic**

- **Inductive/Structural Reasoning**:  
  Proofs often proceed by induction on structure (e.g., `Finset`, `Set`, or `Nat`) or by case analysis on membership (`mem_insert_iff`, `mem_image`, `mem_range`, `mem_Ico`, `mem_Iio`).

- **Freiman Homomorphism Techniques**:  
  Central to many lemmas:  
  - Use of `IsMulFreimanHom`, `IsMulFreimanIso`, `invFunOn`, `BijOn`, `injOn`, `surjOn`.  
  - Key pattern: lift/set down properties via Freiman homs (e.g., `of_image`, `threeGPFree_image`, `mulRothNumber_congr`).

- **Cardinality & Subset Arguments**:  
  - Use of `card_le_card`, `card_image_of_injOn`, `card_union_le`, `card_product`.  
  - Maximal subset extraction via `mulRothNumber_spec`, `addRothNumber_spec`.

- **Monotonicity & Subadditivity**:  
  - Prove monotonicity via `mono`, `subset_trans`, `le_findGreatest`.  
  - Subadditivity via decomposition (`range (M + N) = range M ∪ ...`) and union bounds.

- **Arithmetic in `ℕ`**:  
  - Use of `two_mul`, `add_left_cancel`, `mul_left_cancel₀`, `two_ne_zero`, `mul_comm`, `mul_mul_mul_comm`.

---

#### 5. **Imports**

| Module | Purpose |
|--------|---------|
| `Mathlib.Algebra.Order.Interval.Finset` | Interval finsets (`range`, `Ico`, `Iio`) and order-theoretic properties. |
| `Mathlib.Algebra.SMulWithZero` | Scalar multiplication with zero, needed for `smul_set`, `smul_set₀`. |
| `Mathlib.Combinatorics.Additive.FreimanHom` | Freiman homomorphisms/isomorphisms (`IsMulFreimanHom`, `IsMulFreimanIso`), foundational for structure-preserving maps. |
| `Mathlib.Order.Interval.Finset.Fin` | Interval finsets in `Fin`, used in `Fin.addRothNumber_*` lemmas. |

---

### Summary

This file formalizes the theory of *3AP-free* and *3GP-free* sets and their associated *Roth numbers*, with emphasis on:
- Structural properties (closure under subsets, products, images under Freiman isomorphisms),
- Cardinality optimization (maximal free subsets),
- Arithmetic behavior in `ℕ` and general monoids,
- Connections to additive combinatorics (Roth’s theorem, Salem–Spencer sets).

The formalization is highly modular, leveraging `Monoid`, `CommMonoid`, `CancelCommMonoid`, and `OrderedCancelCommMonoid` hierarchies, and heavily relies on `FreimanHom` infrastructure for structural invariance.