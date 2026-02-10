### Technical Metadata Brief: Fubini Theorem for Categorical (Co)limits in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `DiagramOfCones` | Structure encoding a natural family of limit cones over `F.obj j` for each `j : J`. |
| `DiagramOfCocones` | Dual structure for colimit cocones. |
| `DiagramOfCones.conePoints` | Extracts the diagram `J ⥤ C` of cone points and maps. |
| `DiagramOfCocones.coconePoints` | Dual for cocones. |
| `coneOfConeUncurry` | Given a diagram of limit cones and a cone over `uncurry.obj F`, constructs a cone over the diagram of cone points. |
| `coconeOfCoconeUncurry` | Dual for colimits. |
| `coneOfConeUncurryIsLimit` | Proves that `coneOfConeUncurry Q c` is a limit cone if `c` is. |
| `coconeOfCoconeUncurryIsColimit` | Dual for colimits. |
| `DiagramOfCones.mkOfHasLimits` | Constructs a canonical `DiagramOfCones` using `limit.cone` and universal maps. |
| `DiagramOfCocones.mkOfHasColimits` | Dual for colimits. |
| `limitUncurryIsoLimitCompLim` | Main Fubini isomorphism: `limit (uncurry.obj F) ≅ limit (F ⋙ lim)`. |
| `colimitUncurryIsoColimitCompColim` | Dual for colimits. |
| `limitIsoLimitCurryCompLim` | Fubini in terms of uncurried `G : J × K ⥤ C`: `limit G ≅ limit (curry.obj G ⋙ lim)`. |
| `colimitIsoColimitCurryCompColim` | Dual for colimits. |
| `limitFlipCompLimIsoLimitCompLim` | Symmetry of iterated limits: `limit (F.flip ⋙ lim) ≅ limit (F ⋙ lim)`. |
| `colimitFlipCompColimIsoColimitCompColim` | Dual for colimits. |
| `limitCurrySwapCompLimIsoLimitCurryCompLim` | Swap of iterated limits: `limit_k limit_j G ≅ limit_j limit_k G`. |
| `colimitCurrySwapCompColimIsoColimitCurryCompColim` | Dual for colimits. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `coneOf...`, `coconeOf...`: constructions from cones/cocones.
  - `DiagramOf...`: structures encoding diagrams of cones/cocones.
  - `mkOf...`: canonical constructions assuming existence (e.g., `mkOfHasLimits`).
  - `iso...`: isomorphisms between (co)limits.
  - `uncurry`, `curry`, `flip`, `swap`: operations on functors/products.

- **Suffixes**:
  - `IsLimit`, `IsColimit`: properties of (co)cones.
  - `hom`, `inv`: components of isomorphisms.
  - `π`, `ι`: projections/injections for limits/colimits.
  - `fac`, `uniq`, `naturality`: standard cone/cocone morphism properties.

- **Pattern**:
  - `limitUncurryIsoLimitCompLim` = `limit` + `uncurry` + `Iso` + `limit` + `comp` + `lim`
  - `limitIsoLimitCurryCompLim` = `limit` + `Iso` + `limit` + `curry` + `comp` + `lim`

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `aesop_cat` | Automated category-theoretic reasoning (e.g., for `id`, `comp` fields in structures). |
| `simp` / `simp only` | Simplification using lemmas, especially naturality and cone/cocone laws. |
| `rw` / `rwa` | Rewriting using equalities or isomorphisms. |
| `dsimp` | Definitional simplification (often before `simp`). |
| `apply`, `exact`, `refine` | Proof construction. |
| `rcases`, `cases` | Decomposing product types (e.g., `⟨j, k⟩`, `⟨fj, fk⟩`). |
| `slice_rhs`, `slice_lhs` | Focused rewriting on subterms. |
| `cancel_epi`, `cancel_mono` | Cancellation lemmas for monos/epis. |
| `trans` | Transitivity of equality/isomorphism. |
| `set_option tactic.skipAssignedInstances false` | Ensures full simplifier context (used in `simp` proofs). |

---

#### **4. Proof Logic**

- **Structure**:
  1. **Constructive lemmas** (`coneOfConeUncurry`, `coconeOfCoconeUncurry`) build cones/cocones from data.
  2. **Universality lemmas** (`coneOfConeUncurryIsLimit`, etc.) show these are (co)limits.
  3. **Isomorphism construction** uses `IsLimit.conePointUniqueUpToIso` / `IsColimit.coconePointUniqueUpToIso`, leveraging uniqueness of (co)limit cones.
  4. **Simp lemmas** (`hom_π_π`, `inv_π`, etc.) characterize the isomorphisms via universal properties.

- **Common proof pattern**:
  - Define candidate (co)limit cone.
  - Prove it satisfies the universal property using:
    - Naturality of original (co)cone structure.
    - Functoriality of `uncurry`, `curry`, `flip`.
    - Properties of `limit.cone`, `colimit.cocone`, and their universal morphisms.

- **Symmetry variants** (`limitFlipCompLimIsoLimitCompLim`, `limitCurrySwap...`) use:
  - Precomposition with `Prod.braiding` (symmetry of product).
  - `HasLimit.isoOfEquivalence` / `HasColimit.isoOfEquivalence`.
  - Composition of previously constructed isomorphisms.

---

#### **5. Imports**

| Module | Role |
|--------|------|
| `Mathlib.CategoryTheory.Limits.HasLimits` | Provides `HasLimitsOfShape`, `HasLimit`, `limit.cone`, `IsLimit`, etc. |
| `Mathlib.CategoryTheory.Products.Basic` | Basic product category constructions (`Prod`, `Prod.braiding`, `Prod.swap`). |
| `Mathlib.CategoryTheory.Functor.Currying` | Currying/uncurrying of functors (`curry`, `uncurry`, `currying`). |
| `Mathlib.CategoryTheory.Products.Bifunctor` | Bifunctoriality and related lemmas (e.g., `map_id`). |

---

#### **Domain-Specific AI Agent Notes**

- **Focus**: Formalization of categorical limits/colimits, especially iterated limits and Fubini-type theorems.
- **Key abstractions**: `Cone`, `Cocone`, `IsLimit`, `IsColimit`, `DiagramOfCones`, `uncurry`, `curry`.
- **Common proof techniques**:
  - Use of universal properties (`fac`, `uniq`).
  - Naturality and functoriality reasoning.
  - Isomorphism chaining via `trans` and `≪≫`.
- **Critical lemmas for automation**:
  - `limitUncurryIsoLimitCompLim_hom_π_π`, `limitIsoLimitCurryCompLim_hom_π_π`
  - `colimitUncurryIsoColimitCompColim_ι_ι_inv`, `colimitIsoColimitCurryCompColim_ι_ι_inv`
  - `limitFlipCompLimIsoLimitCompLim_hom_π_π`, `limitCurrySwapCompLimIsoLimitCurryCompLim_hom_π_π`

This module is a prime example of *structured categorical reasoning* in Lean, with heavy reliance on definitional equality, `simp`-based automation, and high-level universal properties.