### Technical Brief: Creation of (Co)limits in Lean 4 (Category Theory Library)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `LiftableCone` | `structure` | Given a cone `c` over `K ⋙ F`, provides a cone `liftedCone` over `K` and an iso `F.mapCone liftedCone ≅ c`. Used to express *liftability* of cones. |
| `LiftableCocone` | `structure` | Dual of `LiftableCone` for cocones. |
| `CreatesLimit K F` | `class` | `F` *creates limits of `K`*: every limit cone over `K ⋙ F` is liftable to a limit cone over `K`, and `F` reflects limits of `K`. |
| `CreatesLimitsOfShape J F` | `class` | `F` creates limits of shape `J` (i.e., for all `K : J ⥤ C`). |
| `CreatesLimitsOfSize.{v₂, v₂} F` | `abbrev` | `F` creates all small limits (i.e., limits of shape `J` for any small `J`). |
| `CreatesColimit K F` | `class` | Dual of `CreatesLimit`: `F` creates colimits of `K`. |
| `CreatesColimitsOfShape J F` / `CreatesColimitsOfSize F` | `class` / `abbrev` | Dual of `CreatesLimitsOfShape` / `CreatesLimits`. |
| `liftLimit t` | `def` | Given `t : IsLimit c`, returns the lifted cone over `K`. |
| `liftedLimitMapsToOriginal t` | `def` | Provides the isomorphism `F.mapCone (liftLimit t) ≅ c`. |
| `liftedLimitIsLimit t` | `def` | Proves `liftLimit t` is a limit cone (uses `reflectsLimit` + `IsLimit.ofIsoLimit`). |
| `hasLimit_of_created K F` | `thm` | If `F` creates limits of `K` and `K ⋙ F` has a limit, then `K` has a limit. |
| `hasLimitsOfShape_of_hasLimitsOfShape_createsLimitsOfShape` | `thm` | If `D` has limits of shape `J` and `F` creates them, then `C` has limits of shape `J`. |
| `createsLimitOfReflectsIso` | `def` | If `F` reflects isos and any limit cone over `K ⋙ F` has a *particular* lift which is a limit, then `F` creates limits of `K`. |
| `createsLimitOfFullyFaithfulOfLift'` | `def` | If `F` is fully faithful and a limit cone over `K ⋙ F` lifts (via some `c`), then `F` creates limits of `K`. |
| `createsLimitOfFullyFaithfulOfIso'` | `def` | If `F` is fully faithful and the limit point of `K ⋙ F` lies in the essential image of `F`, then `F` creates limits of `K`. |
| `preservesLimit_of_createsLimit_and_hasLimit` | `instance` | If `F` creates and `K ⋙ F` has a limit, then `F` preserves the limit. |
| `createsLimitOfIsoDiagram` / `createsLimitOfNatIso` | `def` | Transfer creation of limits along diagram isos / natural isos of functors. |

> **Note**: Duals exist for all above (e.g., `liftColimit`, `createsColimitOfReflectsIso`, etc.).

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `lift*`: constructing a lift (e.g., `liftLimit`, `liftColimit`)
  - `creates*`: class/def asserting creation (e.g., `CreatesLimit`, `createsLimitOf...`)
  - `has*`: existence of (co)limits (e.g., `hasLimit_of_created`, `HasLimit`, `HasColimitsOfShape`)
  - `preserves*`: preservation of (co)limits (e.g., `preservesLimit_of_creates...`)
  - `reflects*`: reflection properties (e.g., `ReflectsLimit`, `ReflectsIsomorphisms`)

- **Suffixes**:
  - `OfShape`: shape-specific (e.g., `CreatesLimitsOfShape J F`)
  - `OfSize`: universe-polymorphic (e.g., `CreatesLimitsOfSize.{w, w'} F`)
  - `OfIso...`, `OfNatIso...`: transfer along isos/natural isos
  - `FullyFaithful`: when assuming full & faithful functors
  - `ReflectsIso`: when assuming reflection of isomorphisms

- **Structure fields**:
  - `liftedCone`, `validLift`, `makesLimit`
  - `liftedCocone`, `validLift`, `makesColimit`

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Role |
|--------|------|
| `simp` / `simp only` | Simplify cone/cocone morphism components, naturality, functor action |
| `rw [assoc]`, `rw [← assoc]` | Reassociate compositions in diagrams |
| `dsimp` | Simplify definitional equalities (e.g., in `app` components) |
| `infer_instance` | Solve class constraints (e.g., `HasLimit`, `CreatesLimit`) |
| `exact`, `apply`, `refine` | Construct proofs/instances using lemmas like `IsLimit.ofIsoLimit`, `uniq_cone_morphism` |
| `congr'`, `ext` | Prove equality of cones/cocones by extensionality (`fun j => ...`) |
| `iso_whisker_right`, `iso_whisker_left` | Manipulate natural isos in diagram functors |
| `map_injective`, `map_surjective` | When `F` is fully faithful, use injectivity/surjectivity of `F.map` |
| `cancel_mono`, `cancel_epi` | Cancellation lemmas for monos/epis in diagram chasing |

---

#### **4. Proof Logic**

The logical flow in most creation proofs follows this pattern:

1. **Assume** a limit cone `c` over `K ⋙ F` with `IsLimit c`.
2. **Construct** a candidate lift `c'` over `K` (e.g., via `liftLimit`, or explicit `c` + iso `F.mapCone c ≅ c'`).
3. **Show** `F.mapCone c' ≅ c` (via `validLift`).
4. **Use**:
   - `IsLimit.ofIsoLimit` to transfer `IsLimit c` to `IsLimit (F.mapCone c')`,
   - Then `reflectsLimit` (or `ofFaithful` if `F` fully faithful) to get `IsLimit c'`.
5. **Conclude** creation via `CreatesLimit.mk` or helper lemmas like `createsLimitOfReflectsIso`.

For fully faithful functors:
- Use `F.map_injective` / `F.map_preimage` to construct cone morphisms in the source category.
- Often bypass explicit reflection of limits by leveraging faithfulness.

For natural isomorphisms:
- Use `isoWhiskerLeft`, `isoWhiskerRight`, and `mapConeEquiv`/`mapCoconeEquiv` to transport structure along `F ≅ G`.

---

#### **5. Imports**

- `Mathlib.CategoryTheory.Limits.Preserves.Basic`  
  → Provides foundational notions: limits, colimits, preservation, reflection.

- **Core dependencies** (implicit via `CategoryTheory` namespace):
  - `CategoryTheory.Limits.Constructions.Basic` (cones, cocones)
  - `CategoryTheory.Limits.Shapes.Products` (if used)
  - `CategoryTheory.NaturalIsomorphism`
  - `CategoryTheory.Functor.Basic`
  - `CategoryTheory.Iso`

> **Note**: Universe polymorphism is explicit (`u₁`, `u₂`, `w`, `w'`, etc.), and `noncomputable section` is used due to reliance on classical choice in limits/colimits.

--- 

This module formalizes the *creation* of (co)limits as in Riehl’s *Category Theory in Context*, with emphasis on practical lemmas for transferring limits/colimits along functors (especially fully faithful or isomorphic ones).