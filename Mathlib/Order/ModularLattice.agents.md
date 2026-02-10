### Technical Metadata Brief: Modular Lattices in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsWeakUpperModularLattice` | `class (α : Type*) [Lattice α] : Prop` | Weakly upper modular: if `a ⊓ b ⋖ a` and `a ⊓ b ⋖ b`, then `a ⋖ a ⊔ b` and `b ⋖ a ⊔ b`. |
| `IsWeakLowerModularLattice` | `class (α : Type*) [Lattice α] : Prop` | Weakly lower modular: if `a ⋖ a ⊔ b` and `b ⋖ a ⊔ b`, then `a ⊓ b ⋖ a` and `a ⊓ b ⋖ b`. |
| `IsUpperModularLattice` | `class (α : Type*) [Lattice α] : Prop` | Upper (semi)modular: if `a ⊓ b ⋖ a`, then `b ⋖ a ⊔ b`. |
| `IsLowerModularLattice` | `class (α : Type*) [Lattice α] : Prop` | Lower modular: if `a ⋖ a ⊔ b`, then `a ⊓ b ⋖ b`. |
| `IsModularLattice` | `class (α : Type*) [Lattice α] : Prop` | Modular: for `x ≤ z`, `(x ⊔ y) ⊓ z ≤ x ⊔ (y ⊓ z)`. |
| `infIccOrderIsoIccSup` | `Set.Icc (a ⊓ b) a ≃o Set.Icc b (a ⊔ b)` | Diamond (second) isomorphism: order isomorphism between intervals `[a ⊓ b, a]` and `[b, a ⊔ b]`. |
| `infIooOrderIsoIooSup` | `Ioo (a ⊓ b) a ≃o Ioo b (a ⊔ b)` | Strict version of the diamond isomorphism on open intervals. |
| `isModularLattice_iff_inf_sup_inf_assoc` | `IsModularLattice α ↔ ∀ x y z, (x ⊓ z) ⊔ (y ⊓ z) = ((x ⊓ z) ⊔ y) ⊓ z` | Equivalence between modular law and `inf_sup_inf` associativity. |
| `DistribLattice.isModularLattice` | `[DistribLattice α] → IsModularLattice α` | Every distributive lattice is modular. |
| `sup_lt_sup_of_lt_of_inf_le_inf` | `x < y → y ⊓ z ≤ x ⊓ z → x ⊔ z < y ⊔ z` | Strict monotonicity of `⊔` under modular condition. |
| `strictMono_inf_prod_sup` | `StrictMono fun x ↦ (x ⊓ z, x ⊔ z)` | Pair `(inf z, sup z)` is strictly monotone in modular lattices. |
| `wellFounded_lt_exact_sequence` | Generalizes Artinian module extension result | Uses modular structure + Galois (co)insertions to lift well-foundedness. |
| `wellFounded_gt_exact_sequence` | Dual of above for Noetherian case | Same as above, dualized. |
| `IicOrderIsoIci` | `IsCompl a b → Set.Iic a ≃o Set.Ici b` | Diamond isomorphism between principal ideals/filters when `a, b` are complements. |
| `disjoint_sup_right_of_disjoint_sup_left`, `isCompl_sup_right_of_isCompl_sup_left` | Properties of disjointness/complement under `⊔` in modular lattices | Used in module/ideal theory (e.g., modular law for submodules). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `covBy_`: about covering relations (`a ⋖ b`).
  - `inf_`, `sup_`: refer to meet/join operations.
  - `infIcc_`, `infIoo_`: interval-related isomorphisms.
  - `isCompl_`, `disjoint_`: complement/disjointness properties.
  - `wellFounded_`: well-foundedness lifting results.

- **Suffixes**:
  - `_of_inf_covBy`, `_of_covBy_sup`: conditional statements based on covering assumptions.
  - `_left`, `_right`: indicate which argument is varied or assumed.
  - `_assoc`: associativity-like identities.
  - `_orderIso`, `_orderIsoIcc`, `_orderIsoIci`: order isomorphisms.
  - `to_is*`: coercion instances (e.g., `IsModularLattice.to_isLowerModularLattice`).

- **Aliases**:
  - `CovBy.sup_of_inf_left`, `CovBy.inf_of_sup_right`, etc., provide user-friendly notation for derived covering lemmas.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rw` / `simp_rw` | Rewriting definitions, commutativity, associativity, and interval membership. |
| `simp` | Simplifying lattice identities, `inf_le_*`, `le_sup_*`, `bot_*`, `top_*`. |
| `exact` / `apply` | Applying class axioms or lemmas like `sup_inf_le_assoc_of_le`. |
| `le_antisymm` | Proving equality via double inequality (common in modular law proofs). |
| `subst` / `change` | Simplifying goals using subtype equality (`Subtype.ext`). |
| `dsimp` | Simplifying definitional equalities in interval maps. |
| `exact id` / `exact ⟨...⟩` | Trivial proofs or constructing elements of subsingleton types. |
| `convert` / `congr'` | For isomorphism proofs (e.g., `infIccOrderIsoIccSup`). |
| `rw [← ...]` | Reversing equalities to match goal shape. |
| `interval_simp` (implicit via `Icc`, `Ioo` API) | Handling interval membership and subtype structure. |
| `gcongr` / `congr_arg` | For proving order isomorphisms and monotonicity. |

---

#### **4. Proof Logic**

- **Inductive/structural style**: Proofs rely heavily on:
  - **Lattice identities** (`inf_sup_inf_assoc`, `sup_inf_assoc_of_le`, etc.)
  - **Covering relation (`⋖`)** definitions via `covBy_iff_Ioo_eq`.
  - **Order isomorphisms** to transfer properties between intervals.
  - **Galois (co)insertions** for exact sequence lemmas (`wellFounded_*_exact_sequence`).
- **Common proof patterns**:
  - *Diamond isomorphism proofs*: Show `toFun` and `invFun` are inverses using modular identities (`inf_sup_assoc_of_le`, `sup_inf_assoc_of_le`).
  - *Instance derivations*: Use `simp_rw` + `isEmpty_coe_sort` + interval isomorphisms to show emptiness/non-emptiness of intervals (e.g., proving `a ⋖ a ⊔ b`).
  - *Strict monotonicity*: Prove via `strictMono_of_restrict` or `strictMono_inf_prod_sup`.
  - *Well-foundedness lifting*: Combine `strictMono.wellFoundedLT` with Galois connection lemmas and modular properties.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Order.Cover` | Defines covering relation `a ⋖ b`. |
| `Mathlib.Order.LatticeIntervals` | Interval types (`Icc`, `Ioo`) and basic order isomorphisms. |
| `Mathlib.Order.GaloisConnection` | Galois insertions/coinsertions used in exact sequence theorems. |

> **Note**: The file builds on standard lattice theory infrastructure in Mathlib (e.g., `Lattice`, `BoundedOrder`, `ComplementedLattice`, `DistribLattice`), but does not import them directly—assumes they are available in scope.

---

### Summary

This module formalizes modular lattices and their variants in Lean 4, emphasizing:
- **Structural hierarchy** of modular conditions (weak → upper/lower → full modular),
- **Diamond isomorphisms** as central tools,
- **Applications** to module theory (Artinian/Noetherian extensions),
- **Complement and disjointness** behavior in modular settings.

It exemplifies Lean’s strength in abstract algebraic reasoning via typeclass inference, order-theoretic APIs, and interval isomorphisms.