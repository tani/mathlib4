### Technical Metadata Brief: *Actions as Functors and as Categories* (Lean 4 / Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `actionAsFunctor` | `SingleObj M ⥤ Type u` | Converts a multiplicative action `M ↻ X` into a functor from the one-object category `SingleObj M` to `Type u`. |
| `ActionCategory` | `Type u` (via `CategoryOfElements`) | The *category of elements* of `actionAsFunctor`, encoding the action as a category over `X`. Objects correspond to elements of `X`; morphisms `x → y` are scalars `m : M` with `m • x = y`. |
| `π` | `ActionCategory M X ⥤ SingleObj M` | Projection functor from the action category to the monoid (viewed as a one-object category). |
| `back` | `ActionCategory M X → X` | Underlying element map: sends an object `(⟨⟩, x)` to `x`. |
| `objEquiv` | `X ≃ ActionCategory M X` | Equivalence between `X` and objects of the action category. |
| `hom_as_subtype` | `(p ⟶ q) = { m : M // m • p.back = q.back }` | Describes hom-sets as subtypes of `M`. |
| `stabilizerIsoEnd` | `stabilizerSubmonoid M x ≃* End x` | Isomorphism between the stabilizer submonoid of `x` and the endomorphism monoid at `x`. |
| `curry` | `(F : ActionCategory G X ⥤ SingleObj H) → G →* (X → H) ⋊[mulAutArrow] G` | Currying a functor from the action groupoid into a group `H` as a crossed homomorphism into the semidirect product. |
| `uncurry` | `(F : G →* (X → H) ⋊ G) → sane → ActionCategory G X ⥤ SingleObj H` | Uncurrying a “compatible” group homomorphism into a functor. |
| `homOfPair` | `t : X → g : G → g⁻¹ • t ⟶ t` | Constructs a morphism in the action groupoid from a pair `(t, g)`. |
| `cases` / `cases'` | Induction principle for morphisms in the action groupoid | Enables reasoning about arbitrary morphisms by reducing to `homOfPair`. |
| `Groupoid instance` | `[Group G] ⇒ Groupoid (ActionCategory G X)` | Shows the action category is a groupoid when `M = G` is a group (i.e., *action groupoid*). |
| `endMulEquivSubgroup` | `End (objEquiv G (G ⧸ H) ↑(1 : G)) ≃* H` | Shows vertex groups of the action groupoid on coset space `G/H` are conjugate to `H`. |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `actionAsFunctor`, `ActionCategory`, `ActionCategory.back`, `ActionCategory.objEquiv`, `ActionCategory.id_val`, `ActionCategory.comp_val`, `ActionCategory.cases`, `ActionCategory.cases'`: All related to the action category construction.
  - `homOfPair`, `stabilizerIsoEnd`, `endMulEquivSubgroup`: Descriptive compound names for constructions.
- **Suffixes:**
  - `IsoEnd`, `EquivSubgroup`: Indicates isomorphism/equivalence to an end/stabilizer/subgroup.
  - `val`: Used for projection of a subtype (e.g., `f.val`, `(f ≫ g).val`).
- **`π`**: Standard notation for projection in category of elements.
- **`back`**: Informal but explicit name for the underlying element map.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rfl` | Definitional equalities (e.g., `map_id`, `comp_val`, `homOfPair.val`). |
| `ext` + `funext` | Extensionality for functions/morphisms. |
| `simp` / `simp_rw` | Simplification using `@[simp]` lemmas (e.g., `π_map`, `π_obj`, `coe_back`, `back_coe`). |
| `cases` | Structural decomposition of subtypes/dependent pairs (e.g., `rcases f with ⟨g, h⟩`). |
| `exact` / `refine'` | Direct proof construction. |
| `aesop` / `linarith` | Not present — this file avoids heavy automation. |
| `convert` / `congr_arg` | For equality chaining in `uncurry` proof. |
| `obtain` / `rcases` | Extracting witnesses from existential hypotheses (e.g., in `uncurry`). |
| `rw [ha, hg]` | Rewriting along equalities in `eqToHom` compositions. |

---

#### **4. Proof Logic / Strategy**

- **Structural decomposition**: Morphisms in the action groupoid are handled via `cases`/`cases'`, reducing to `homOfPair t g`. This is central to proving properties like functoriality of `curry`/`uncurry`.
- **Definitional reasoning**: Many equalities hold *definitionally* (e.g., `map_id`, `comp_val`, `homOfPair.val`), so `rfl` suffices.
- **Equivalence-based reasoning**: `objEquiv` and `stabilizerIsoEnd` allow transport between `X` and objects, and between stabilizers and endomorphisms.
- **Inductive/constructive style**: Proofs often proceed by:
  1. Reducing to canonical forms via `cases'`.
  2. Simplifying using `sane` assumptions (e.g., `(F g).right = g`).
  3. Applying definitional equalities and `simp`.
- **Groupoid-specific reasoning**: When `G` is a group, inverses allow constructing inverses of morphisms (`homOfPair` has inverse `homOfPair t g⁻¹`), justifying `Groupoid` instance.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Elements` | Defines `CategoryOfElements`, used to construct `ActionCategory`. |
| `Mathlib.CategoryTheory.IsConnected` | Used for `IsConnected` instance on action categories (via `zigzag_isConnected`). |
| `Mathlib.CategoryTheory.SingleObj` | Encodes monoids as one-object categories (`SingleObj M`). |
| `Mathlib.GroupTheory.GroupAction.Quotient` | Provides quotient actions (e.g., `G ⧸ H`) used in `endMulEquivSubgroup`. |
| `Mathlib.GroupTheory.SemidirectProduct` | Supplies `⋊[mulAutArrow]`, needed for `curry`/`uncurry` into semidirect products. |

**Scope**: This file formalizes the bridge between *group actions* and *category theory*, especially:
- Action → functor → category of elements → action groupoid.
- Functoriality and homomorphism currying/uncurrying across action groupoids and semidirect products.

It serves as foundational infrastructure for further work on groupoid actions, covering spaces, and descent theory.

--- 

Let me know if you'd like a diagrammatic summary or a porting note analysis.