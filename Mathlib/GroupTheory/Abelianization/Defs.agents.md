### Technical Brief: `Defs.lean` — Abelianization of a Group in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Abelianization G` | `Type u` | Quotient of `G` by its commutator subgroup: $ G^{\mathrm{ab}} := G / [G,G] $ |
| `of : G →* Abelianization G` | `MonoidHom G (Abelianization G)` | Canonical projection onto abelianization |
| `commGroup : CommGroup (Abelianization G)` | Instance | Proves abelianization is abelian |
| `commutator_subset_ker` | `commutator G ≤ f.ker` | Key lemma: any map to abelian group kills commutators |
| `lift f : Abelianization G →* A` | `MonoidHom (Abelianization G) A` | Universal property: unique lift through abelianization |
| `lift_apply_of` | `lift f (of x) = f x` | Lift commutes with projection |
| `lift_unique` | Uniqueness of lift | Any map factoring `f` through `of` equals `lift f` |
| `map f : Abelianization G →* Abelianization H` | `MonoidHom (Abelianization G) (Abelianization H)` | Functoriality of abelianization on group homs |
| `map_id`, `map_comp` | Id & composition preservation | `Abelianization` is a functor |
| `MulEquiv.abelianizationCongr e` | `Abelianization G ≃* Abelianization H` | Equivalence of groups induces equivalence of abelianizations |
| `Abelianization.equivOfComm` | `H ≃* Abelianization H` (for `CommGroup H`) | Abelian groups are canonically isomorphic to their abelianization |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `of`: canonical projection (`of : G →* Gᵃᵇ`)
  - `lift`: universal property lift (`lift f`)
  - `map`: functorial action (`map f`)
  - `abelianizationCongr`: congruence under equivalence

- **Suffixes**:
  - `_of`: composition with `of` (e.g., `lift_apply_of`)
  - `_symm`: inverse direction (e.g., `lift_symm_apply`)
  - `_trans`, `_refl`, `_symm`: for equivalence/iso properties

- **Notable patterns**:
  - `QuotientGroup.mk` → `of`
  - `QuotientGroup.lift` used internally in `lift`
  - `hom_ext` used to prove equality of homs via precomposition with `of`

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` | Simplifying goals using `@[simp]` lemmas (e.g., `lift_apply_of`, `map_of`) |
| `rfl` | Reflexivity for definitional equalities |
| `intro` / `rintro` | Introducing hypotheses/variables |
| `rw` / `apply` | Rewriting using lemmas like `QuotientGroup.ker_mk'`, `MonoidHom.ext` |
| `exact` / `assumption` | Closing goals directly |
| `cases` / `induction` | Induction on quotients (e.g., `Quotient.induction_on`) |
| `aesop` / `ring` | Not used here — lean low-level group theory avoids heavy automation |
| `MonoidHom.ext` | Proving homomorphism equality via extensionality |

---

#### **4. Proof Logic**

- **Structure**:
  1. **Construction**: Define `Abelianization G` as quotient by `commutator G`.
  2. **Algebraic structure**: Prove it's a commutative group using `QuotientGroup.Quotient.group` and `mul_comm` via quotient induction.
  3. **Universal property**:
     - Show `commutator G ≤ ker f` for any `f : G →* A` with `A` abelian.
     - Use `QuotientGroup.lift` to get `lift f`.
     - Prove uniqueness via `Quotient.induction_on`.
  4. **Functoriality**:
     - Define `map f := lift (of.comp f)`.
     - Prove identity and composition using `hom_ext`.
  5. **Equivalence invariance**:
     - For `e : G ≃* H`, define `abelianizationCongr e` using `map e` and `map e.symm`.
     - Verify inverses and multiplicativity via `simp` and `map_mul`.
  6. **Special cases**:
     - For abelian `H`, `equivOfComm` uses `lift (id)` as inverse to `of`.
     - `Unique G ⇒ Unique (Abelianization G)` via `Quotient.instUniqueQuotient`.

- **Induction principle**: Almost all proofs over `Abelianization G` use `Quotient.induction_on` or `QuotientGroup.induction_on`.

---

#### **5. Imports & Dependencies**

- **Core dependency**:
  ```lean
  import Mathlib.GroupTheory.Commutator.Basic
  ```
  - Provides `commutator G`, `commutatorElement`, `commutator_eq_closure`, etc.

- **Implicit imports** (via `Mathlib.GroupTheory.Commutator.Basic` and `QuotientGroup`):
  - `Mathlib.GroupTheory.QuotientGroup`
  - `Mathlib.Algebra.Group.Defs`
  - `Mathlib.Algebra.Group.Basic`
  - `Mathlib.Algebra.MonoidTheory.Submonoid`
  - `Mathlib.Logic.Equivalence.Basic`
  - `Mathlib.Algebra.Group.WithOne`

- **No heavy category theory yet** — adjunction is deferred to `Adjunctions.lean`.

---

#### **6. Mermaid Diagrams**

##### **Dependency Graph (Module-Level)**

```mermaid
graph TD
  A[Defs.lean] --> B[Mathlib.GroupTheory.Commutator.Basic]
  B --> C[Mathlib.GroupTheory.QuotientGroup]
  C --> D[Mathlib.Algebra.Group.Defs]
  C --> E[Mathlib.Logic.Equivalence.Basic]
  A --> F[Mathlib.Algebra.Category.GroupCat]  %% implicit via future use
  A --> G[Mathlib.Algebra.Category.Grp.Adjunctions] %% future: adjunction proof
```

##### **Overview of Abelianization Construction**

```mermaid
graph LR
  G[Group G] -->|commutator| G_ab[Abelianization G = G / [G,G]]
  G -->|of| G_ab
  G -->|f| A[Abelian Group A]
  G_ab -.->|∃! lift f| A
  G -->|f| H[Group H]
  G_ab -->|map f| H_ab[Abelianization H]
  G ≃* H -->|abelianizationCongr| G_ab ≃* H_ab
  CommGroup H -->|equivOfComm| H ≃* H_ab
```

##### **Functoriality Triangle**

```mermaid
graph LR
  G -->|id| G
  G_ab -->|map id = id| G_ab

  G -->|f| H
  H -->|g| I
  G_ab -->|map f| H_ab -->|map g| I_ab
  G_ab -->|map (g ∘ f)| I_ab
```

---

#### **7. Notes on Design & Style**

- **Minimal imports**: Avoids importing full `group` hierarchy early (e.g., uses `Subgroup.subset_closure` instead of `group` tactic).
- **Simp normal forms**: `of`, `map`, `lift` are designed to simplify nicely (`@[simp]` lemmas).
- **Deprecation annotations**: `lift.of`, `lift.unique` deprecated in favor of `lift_apply_of`, `lift_unique`.
- **Simp lemmas**: `@[simps]` used for `equivOfComm` to auto-generate projections.
- **Extensionality**: `hom_ext` is key — equality of homs from `Gᵃᵇ` is determined by precomposition with `of`.

---

#### **8. Future Work (Context)**

- The file prepares for the **adjunction**:
  $$
  -^{\mathrm{ab}} \dashv U : \mathbf{Ab} \to \mathbf{Grp}
  $$
  where $-^{\mathrm{ab}}$ is abelianization and $U$ is the forgetful functor.
- This is realized in `Mathlib/Algebra/Category/Grp/Adjunctions.lean`.

--- 

Let me know if you'd like a formalized summary in Lean syntax or a comparison with other formalizations (e.g., Coq, Isabelle).
