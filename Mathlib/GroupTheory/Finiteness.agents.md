### Technical Brief: Finitely Generated Monoids and Groups in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `Submonoid.FG P` | `Prop` | A submonoid `P ≤ M` is finitely generated iff `∃ S : Finset M, closure S = P`. |
| `AddSubmonoid.FG P` | `Prop` | Additive version of `Submonoid.FG`. |
| `Monoid.FG` | `Class` | A monoid `M` is finitely generated iff the top submonoid `⊤ : Submonoid M` is finitely generated. |
| `AddMonoid.FG` | `Class` | Additive version of `Monoid.FG`. |
| `Subgroup.FG P` | `Prop` | A subgroup `P ≤ G` is finitely generated iff `∃ S : Finset G, closure S = P`. |
| `AddSubgroup.FG P` | `Prop` | Additive version of `Subgroup.FG`. |
| `Group.FG` | `Class` | A group `G` is finitely generated iff the top subgroup `⊤ : Subgroup G` is finitely generated. |
| `AddGroup.FG` | `Class` | Additive version of `Group.FG`. |
| `Submonoid.fg_iff` | `↔` | Equivalence between `Finset`-based and `Set.Finite`-based definitions. |
| `Subgroup.fg_iff_submonoid_fg` | `↔` | A subgroup is finitely generated as a group iff as a submonoid (uses `S ∪ S⁻¹`). |
| `Group.fg_iff_monoid_fg` | `↔` | A group is finitely generated as a group iff as a monoid. |
| `Group.rank` | `nat` | Minimum number of generators (noncomputable, via `Nat.find`). |
| `Group.rank_spec` | `∃`-statement | Guarantees existence of a generating set of size `rank G`. |
| `Group.rank_le_of_surjective` | `≤` | Surjective homomorphism implies rank of codomain ≤ rank of domain. |
| `Group.rank_congr` | `=` | Isomorphic groups have equal rank. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `fg_`: Indicates finitely generated properties (`fg_iff`, `fg_def`, `fg_of_surjective`, `fg_of_finite`).
  - `closure_`: Refers to closure operations (`closure_finset_fg`, `closure_finite_fg`, `closure_preimage_eq_top`).
  - `map_`: Homomorphic image (`map`, `map_injective`).
  - `rank_`: Related to minimal number of generators (`rank_spec`, `rank_le`, `rank_congr`).

- **Suffixes**:
  - `_fg`: Denotes finitely generated (`Submonoid.FG`, `Group.FG`, `Monoid.fg_def`).
  - `_iff`: Logical equivalence (`fg_iff`, `fg_iff_submonoid_fg`, `fg_iff_monoid_fg`).
  - `_of_`: Implication from a stronger condition (`fg_of_surjective`, `fg_of_finite`, `fg_range`).

- **Additive/Multiplicative Pairs**:
  - `Add_` prefix for additive analogues (`AddSubmonoid`, `AddGroup`, `AddMonoid.FG`).
  - `Multiplicative`/`Additive` type conversions used to bridge additive and multiplicative settings.

---

#### **3. Tactic Stack**

- **Core Tactics**:
  - `rw`: Rewriting using equalities/definitions (e.g., `rw [Finset.coe_univ]`, `rw [Subgroup.closure_le]`).
  - `simp`: Simplification with lemmas like `Submonoid.closure_closure_coe_preimage`.
  - `convert`: Used for transferring properties across equivalences (e.g., `convert (Submonoid.fg_iff_add_fg ...).symm`).
  - `exact`, `refine`, `apply`: For constructing proofs with minimal boilerplate.
  - `cases`: Case analysis (e.g., `cases nonempty_fintype M`).
  - `congr`: Congruence reasoning (e.g., `congr; rw [Set.image_preimage_eq_iff]`).
  - `apply le_antisymm ...`: Proving equality via double inequality.

- **Advanced Tactics**:
  - ` Classical.decPred _`: For decidability in noncomputable definitions (`Group.rank`).
  - `haveI := Fintype.ofFinite s`: Introducing instance for finite types.
  - `conv_rhs => rw [...]`: Right-hand side rewriting in conv mode.

---

#### **4. Proof Logic**

- **Inductive/Constructive Style**:
  - Proofs often proceed by unpacking existential quantifiers (`obtain ⟨S, hS⟩`), then constructing witnesses (e.g., `s.image f`, `s.preimage e`).
  - Many equivalences (`↔`) are proven via mutual implication, often using `fg_iff` to switch between `Finset` and `Set.Finite`.

- **Common Patterns**:
  - **Equivalence via `fg_iff`**: Replace `Finset`-based definition with `Set.Finite` for flexibility.
  - **Transfer via `toSubmonoid`/`toAddSubmonoid`**: Use `Subgroup.fg_iff_submonoid_fg` to reduce group questions to monoid ones.
  - **Surjectivity → Generation**: Use `Monoid.fg_of_surjective` / `Group.fg_of_surjective` to lift finite generation along epimorphisms.
  - **Closure under finite sets**: Use `closure_finset_fg`, `closure_finite_fg` to show generated substructures are FG.

- **Quotient Argument**:
  - `QuotientGroup.fg` uses `fg_of_surjective` on `QuotientGroup.mk'`, leveraging surjectivity of the quotient map.

---

#### **5. Imports & Scope**

- **Core Dependencies**:
  - `Mathlib.Algebra.Group.Pointwise.Set.Finite`: Finite sets under pointwise actions.
  - `Mathlib.Algebra.Group.Subgroup.Pointwise`: Pointwise operations on subgroups/submonoids.
  - `Mathlib.GroupTheory.QuotientGroup.Defs`: Quotient groups and their structure.
  - `Mathlib.SetTheory.Cardinal.Finite`: Finite sets and cardinals.

- **Domain Scope**:
  - Focuses on **finitely generated algebraic structures** (monoids, groups, additive variants).
  - Bridges monoid/group and additive/multiplicative perspectives.
  - Includes rank theory (minimal generating set size), closure properties, and behavior under homomorphisms/quotients.

--- 

This module provides a foundational and highly structured treatment of finite generation in algebra, with strong support for both constructive and classical reasoning, and seamless interoperability between additive and multiplicative formalizations.