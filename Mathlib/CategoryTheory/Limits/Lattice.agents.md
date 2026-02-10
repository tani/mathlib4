### Technical Brief: Limits and Colimits in Lattice Categories (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `finiteLimitCone` | `[SemilatticeInf α] [OrderTop α] → (F : J ⥤ α) → LimitCone F` | Constructs a limit cone over any finite diagram in a semilattice with top. Limit object is `Finset.univ.inf F.obj`. |
| `finiteColimitCocone` | `[SemilatticeSup α] [OrderBot α] → (F : J ⥤ α) → ColimitCocone F` | Constructs a colimit cocone over any finite diagram in a semilattice with bottom. Colimit object is `Finset.univ.sup F.obj`. |
| `hasFiniteLimits_of_semilatticeInf_orderTop` | Instance | Proves that every finite diagram has a limit in such a lattice. |
| `hasFiniteColimits_of_semilatticeSup_orderBot` | Instance | Proves that every finite diagram has a colimit in such a lattice. |
| `finite_limit_eq_finset_univ_inf` | `limit F = Finset.univ.inf F.obj` | Identifies the limit of a finite diagram with the infimum of its image. |
| `finite_colimit_eq_finset_univ_sup` | `colimit F = Finset.univ.sup F.obj` | Identifies the colimit of a finite diagram with the supremum of its image. |
| `finite_product_eq_finset_inf` | `∏ᶜ f = Fintype.elems.inf f` | Shows finite products correspond to infima over finite families. |
| `finite_coproduct_eq_finset_sup` | `∐ f = Fintype.elems.sup f` | Shows finite coproducts correspond to suprema over finite families. |
| `prod_eq_inf` | `prod x y = x ⊓ y` | Binary product = infimum (with top element absorption). |
| `coprod_eq_sup` | `coprod x y = x ⊔ y` | Binary coproduct = supremum (with bottom element absorption). |
| `pullback_eq_inf` | `pullback f g = x ⊓ y` | Pullback in lattice category = infimum of domain objects (via cospan). |
| `pushout_eq_sup` | `pushout f g = x ⊔ y` | Pushout in lattice category = supremum of codomain objects (via span). |
| `limitCone` | `[CompleteLattice α] → (F : J ⥤ α) → LimitCone F` | General limit cone for arbitrary diagrams in a complete lattice. Limit = `iInf F.obj`. |
| `colimitCocone` | `[CompleteLattice α] → (F : J ⥤ α) → ColimitCocone F` | General colimit cocone for arbitrary diagrams. Colimit = `iSup F.obj`. |
| `hasLimits_of_completeLattice` / `hasColimits_of_completeLattice` | Instances | Every diagram (not just finite) has a limit/colimit in a complete lattice. |
| `limit_eq_iInf` / `colimit_eq_iSup` | `limit F = iInf F.obj`, `colimit F = iSup F.obj` | General identification of limits/colimits with inf/sup over image. |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `finite_`: For finite diagrams (e.g., `finiteLimitCone`, `finite_product_eq_finset_inf`)
  - `hasFiniteLimits_of_`, `hasFiniteColimits_of_`: Instance construction patterns
  - `prod_eq_`, `coprod_eq_`, `pullback_eq_`, `pushout_eq_`: Explicit identification of categorical constructions with lattice operations

- **Suffixes:**
  - `_eq_finset_inf` / `_eq_finset_sup`: When limit/colimit equals inf/sup over `Finset.univ`
  - `_eq_iInf` / `_eq_iSup`: When limit/colimit equals inf/sup over arbitrary index set (`iInf`/`iSup`)
  - `_cone`, `_cocone`: Cone/cocone constructions
  - `_of_`: Instance naming (e.g., `hasFiniteLimits_of_semilatticeInf_orderTop`)

- **Other patterns:**
  - `homOfLE`: Used to construct morphisms from inequalities (`a ≤ b` → `a ⟶ b`)
  - `le_inf`, `inf_le`, `le_sup`, `sup_le`: Standard lattice inequalities used in proofs

---

#### **3. Tactic Stack**

- **Core tactics used repeatedly:**
  - `rw`: Rewriting using equalities like `finite_limit_eq_finset_univ_inf`, `inf_top_eq`, etc.
  - `simp only [...]`: Simplification with specific lemmas (e.g., `Finset.inf_map`, `Finset.univ_map_equiv_to_embedding`)
  - `trans`: Chaining equalities (e.g., in `finite_product_eq_finset_inf`)
  - `rfl`: Definitional equalities (especially for `Finset.inf`/`sup` as folds)
  - `apply ..._of_hasLimit_pair` / `apply ..._of_hasColimit_pair`: Instance construction patterns
  - `infer_instance`: To reuse existing instances (e.g., `hasFiniteLimits_of_hasFiniteLimits_of_size`)
  - `exact ...`: For direct proof terms (e.g., `IsLimit.conePointUniqueUpToIso ...).to_eq`)
  - `intro`, `rintro`: For quantifier handling in instance proofs

- **No heavy automation (e.g., `aesop`, `linarith`, `ring`)** — proofs are mostly algebraic and rely on lattice theory lemmas.

---

#### **4. Proof Logic**

- **General pattern:**
  1. **Construct candidate (co)limit** (e.g., `finiteLimitCone`, `limitCone`) using lattice operations (`inf`, `sup`, `iInf`, `iSup`).
  2. **Verify universal property**:
     - For limits: Show that any cone `s` factors uniquely through the candidate via `homOfLE (le_inf ...)`.
     - For colimits: Show that any cocone `s` factors uniquely via `homOfLE (sup_le ...)`.
  3. **Identify with known constructions**:
     - Use `conePointUniqueUpToIso` + `to_eq` to equate `limit F` with the constructed object.
  4. **Special cases (binary products, pullbacks)**:
     - Reduce to finite diagram case (e.g., `pair x y`, `cospan f g`).
     - Simplify using `Finset` lemmas and lattice identities (`inf_top_eq`, `sup_bot_eq`, `inf_eq_right`, etc.).

- **Induction is not used** — all arguments are categorical + lattice-theoretic, leveraging:
  - Universal properties of (co)limits
  - Properties of `Finset.inf/sup` as folds over finite sets
  - Properties of `iInf/iSup` in complete lattices

---

#### **5. Imports & Scope**

- **Core dependencies:**
  - `Mathlib.Order.CompleteLattice`: Provides `CompleteLattice`, `iInf`, `iSup`, `sInf`, `sSup`.
  - `Mathlib.Data.Finset.Lattice.Fold`: Defines `Finset.inf`, `Finset.sup` as folds over lattices.
  - `Mathlib.CategoryTheory.Category.Preorder`: Interprets preorders/lattices as categories.
  - `Mathlib.CategoryTheory.Limits.Shapes.Products`: Binary products, pullbacks, etc.
  - `Mathlib.CategoryTheory.Limits.Shapes.FiniteLimits`: Finite limits/colimits infrastructure.

- **Scope:**
  - Focuses on **lattice-theoretic semantics of limits/colimits** in category theory.
  - Covers both **finite** (via `Finset`) and **arbitrary** (via `iInf`/`iSup`) cases.
  - Applies to categories arising from **preorders/lattices**, especially:
    - `SemilatticeInf × OrderTop` → finite limits
    - `SemilatticeSup × OrderBot` → finite colimits
    - `CompleteLattice` → all limits/colimits

---

### Summary

This file formalizes the foundational result that **in lattice-theoretic categories, (co)limits are given by infima/suprema**. It distinguishes between finite diagrams (using `Finset`) and arbitrary diagrams (using `iInf`/`iSup`), and explicitly identifies standard constructions (products, coproducts, pullbacks, pushouts) with lattice operations. The proofs are constructive and rely heavily on the interplay between order-theoretic inequalities and categorical universal properties.