### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `toMonad` | `h : L ⊣ R → Monad C` | Constructs the monad `L ⋙ R` from an adjunction `h`. |
| `toComonad` | `h : L ⊣ R → Comonad D` | Constructs the comonad `R ⋙ L` from an adjunction `h`. |
| `adjToMonadIso` | `T : Monad C → T.adj.toMonad ≅ T` | Shows the monad induced by the Eilenberg–Moore adjunction recovers the original monad. |
| `adjToComonadIso` | `G : Comonad C → G.adj.toComonad ≅ G` | Dual of above for comonads. |
| `unitAsIsoOfIso`, `counitAsIsoOfIso` | `L ⋙ R ≅ 𝟭 C → IsIso unit`, `R ⋙ L ≅ 𝟭 D → IsIso counit` | Relates isomorphisms of composite functors to unit/counit isomorphisms. |
| `fullyFaithfulLOfCompIsoId`, `fullyFaithfulROfCompIsoId` | `L ⋙ R ≅ 𝟭 C → L.FullyFaithful`, `R ⋙ L ≅ 𝟭 D → R.FullyFaithful` | Full faithfulness criteria via unit/counit isos. |
| `Monad.comparison` | `h : L ⊣ R → D ⥤ h.toMonad.Algebra` | Comparison functor from `D` to Eilenberg–Moore algebras of `L ⋙ R`. |
| `Comonad.comparison` | `h : L ⊣ R → C ⥤ h.toComonad.Coalgebra` | Dual comparison functor to coalgebras of `R ⋙ L`. |
| `MonadicRightAdjoint` | `class` | Right adjoint `R` is *monadic* if its comparison functor is an equivalence. |
| `ComonadicLeftAdjoint` | `class` | Left adjoint `L` is *comonadic* if its comparison functor is an equivalence. |
| `monadicOfReflective` | `[Reflective R] → MonadicRightAdjoint R` | Reflective functors are monadic (Prop 5.3.3 in Riehl). |
| `comonadicOfCoreflective` | `[Coreflective R] → ComonadicLeftAdjoint R` | Coreflective functors are comonadic (dual statement). |

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `toMonad`, `toComonad`: Construction from an adjunction.
  - `unitAsIsoOfIso`, `counitAsIsoOfIso`: Derived iso from structural iso.
  - `comparison`: Standard comparison functors for monads/comonads.
  - `monadic*`, `comonadic*`: Related to monadicity/comonadicity.
  - `fullyFaithfulL*`, `fullyFaithfulR*`: Full faithfulness of left/right adjoints.

- **Suffixes**:
  - `OfIso`: Implying a property derived from an isomorphism.
  - `OfReflective`, `OfCoreflective`: Derived from reflective/coreflective assumptions.
  - `full`, `faithful`, `essSurj`: Properties of functors (full, faithful, essentially surjective).

- **Notable patterns**:
  - `transport`: Used in `adj.toMonad.transport`, `adj.toComonad.transport` — action of natural isomorphism on monad/comonad structure.
  - `asIso`, `isoMk`: Constructing isomorphisms from data + proofs.

---

#### 3. **Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp` / `dsimp` | Simplification of definitions (especially `@[simps]` projections). |
| `rw` / `erw` | Rewriting using naturality, unit/counit laws, functoriality. |
| `ext` | Extensionality for natural transformations / morphisms. |
| `aesop_cat` | Automated category-theoretic reasoning (e.g., diagram chasing). |
| `rw [← assoc]`, `rw [assoc]` | Reassociating compositions. |
| `cancel_epi`, `cancel_mono` | Cancellation lemmas for epimorphisms/monomorphisms. |
| `infer_instance` | Solving typeclass goals (e.g., `IsIso`, `Full`, `Faithful`). |
| `refine`, `exact`, `apply` | Proof construction and goal refinement. |
| `congr_arg` | Equality of morphisms via equality of components. |

---

#### 4. **Proof Logic**

- **General pattern**:
  - **Construct data** (e.g., monad structure, comparison functor).
  - **Verify axioms** (associativity, unit laws) using:
    - Functoriality (`map_comp`, `map_id`)
    - Naturality of unit/counit (`unit_naturality`, `counit_naturality`)
    - Triangle identities (`right_triangle_components`, `left_triangle_components`)
  - **Use isomorphism properties** (e.g., `Iso.refl`, `Iso.inv_comp_eq`) to prove invertibility or equivalence.
  - **Leverage typeclasses** (`[R.Faithful]`, `[Reflective R]`) to discharge full/faithful/ess-surj instances.

- **Inductive/structural reasoning**:
  - Proofs often proceed by unfolding definitions (`dsimp`), then simplifying using naturality and triangle identities.
  - For monadicity of reflective functors: show comparison functor is essentially surjective (construct algebra from object via reflector), full (using fullness of `R`), and essentially injective (via unit iso).

- **Computational content**:
  - Some constructions (e.g., `monadicOfReflective`) are *computable* because inverses are given explicitly (not just existence).

---

#### 5. **Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.CategoryTheory.Adjunction.Reflective` | Reflective/coreflective functors, reflector/coreflector adjunctions. |
| `Mathlib.CategoryTheory.Monad.Algebra` | Eilenberg–Moore category of algebras for a monad. |

**Scope**: This file lies at the intersection of:
- Adjunction theory (unit/counit, full faithfulness, triangle identities),
- Monads and their algebras,
- Reflectivity and coreflectivity,
- Monadicity and comonadicity criteria.

It serves as a foundational bridge between adjunctions and categorical algebra (Eilenberg–Moore).