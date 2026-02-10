### Technical Brief: Normal Mono/Epi Categories with Finite Products/Coproducts and Kernels/Cokernels

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `pullback_of_mono` | `{X Y Z : C} → (a : X ⟶ Z) → (b : Y ⟶ Z) → [Mono a] → [Mono b] → HasLimit (cospan a b)` | Constructs pullbacks of monomorphisms using normal monos and kernels. |
| `P {X Y} f g` | `abbrev` | Pullback object used to construct equalizers: `pullback (prod.lift (𝟙 X) f) (prod.lift (𝟙 X) g)` |
| `hasLimit_parallelPair` | `{X Y : C} → (f g : X ⟶ Y) → HasLimit (parallelPair f g)` | Constructs equalizers in a normal mono category with finite products and kernels. |
| `hasEqualizers` | `instance` | Proves that such a category has all equalizers. |
| `epi_of_zero_cokernel` | `(f : X ⟶ Y) → (Z : C) → (l : IsColimit (CokernelCofork.ofπ (0 : Y ⟶ Z))) → Epi f` | Shows that if a zero morphism is a cokernel of `f`, then `f` is an epimorphism. |
| `epi_of_zero_cancel` | `(f : X ⟶ Y) → (∀ Z g, f ≫ g = 0 → g = 0) → Epi f` | Alternative criterion for epimorphism via zero cancellation. |
| `pushout_of_epi` | `{X Y Z : C} → (a : X ⟶ Y) → (b : X ⟶ Z) → [Epi a] → [Epi b] → HasColimit (span a b)` | Constructs pushouts of epimorphisms using normal epis and cokernels. |
| `Q {X Y} f g` | `abbrev` | Pushout object used to construct coequalizers: `pushout (coprod.desc (𝟙 Y) f) (coprod.desc (𝟙 Y) g)` |
| `hasColimit_parallelPair` | `{X Y : C} → (f g : X ⟶ Y) → HasColimit (parallelPair f g)` | Constructs coequalizers in a normal epi category with finite coproducts and cokernels. |
| `hasCoequalizers` | `instance` | Proves that such a category has all coequalizers. |
| `mono_of_zero_kernel` | `(f : X ⟶ Y) → (Z : C) → (l : IsLimit (KernelFork.ofι (0 : Z ⟶ X))) → Mono f` | Shows that if a zero morphism is a kernel of `f`, then `f` is a monomorphism. |
| `mono_of_cancel_zero` | `(f : X ⟶ Y) → (∀ Z g, g ≫ f = 0 → g = 0) → Mono f` | Alternative criterion for monomorphism via zero cancellation. |

---

#### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `*_of_*`: Construction from structure (e.g., `pullback_of_mono`, `pushout_of_epi`, `epi_of_zero_cokernel`)
  - `has*`: Existence of limits/colimits (`hasEqualizers`, `hasCoequalizers`, `hasLimit_parallelPair`)
  - `*_ofι`, `*_ofπ`: Inclusion/projection morphisms from (co)limits (`Fork.ι_ofι`, `Cofork.π_ofπ`)
  - `cancel_*`: Cancellation lemmas for monos/epis (`cancel_mono`, `cancel_epi`)
  - `zero_*`: Zero-morphism-related constructions (`zeroCokernelOfZeroCancel`, `zeroKernelOfCancelZero`)
  - `isIso_*`: Isomorphism proofs for limit/colimit cones (`isIso_limit_cone_parallelPair_of_eq`, `isIso_colimit_cocone_parallelPair_of_eq`)

- **Abbreviations**:
  - `P`, `Q`: Used for intermediate pullback/pushout objects in equalizer/coequalizer constructions.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` / `simp only` | Simplifying hom-sets, zero morphisms, product/coproduct universal properties |
| `rw` / `rw [assoc]` | Rewriting using associativity, zero morphism laws, cone/cocone conditions |
| `calc` | Chain of equalities, especially for verifying fork/cofork conditions |
| `congr` | Proving equality of morphisms via universal properties (e.g., pullback/pushout uniqueness) |
| `hom_ext` | Extending morphism equality via product/coproduct universal properties |
| `cancel_mono` / `cancel_epi` | Cancel monos/epis on left/right in equations |
| `lift_ι`, `desc_π`, `ι_ofι`, `π_ofπ` | Rewriting using universal properties of (co)limits |
| `zero_comp`, `comp_zero` | Simplifying compositions with zero morphisms |
| `aesop` (implied) | Likely used in background automation (not explicit here but standard in Mathlib) |

---

#### **4. Proof Logic**

- **General Strategy**:
  - Use **normal mono/epi properties** to embed monos/epis as kernels/cokernels.
  - Construct pullbacks/pushouts via kernels/cokernels of lifted morphisms (e.g., `prod.lift`, `coprod.desc`).
  - For equalizers/coequalizers:
    - Lift identity + morphism pairs to monos/epis.
    - Use pullback/pushout of those to get equalizer/coequalizer object.
    - Verify fork/cofork conditions using product/coproduct universal properties.
    - Use uniqueness of (co)limit cones to establish universal property.

- **Inductive/Case Structure**:
  - Not inductive proofs; instead, **constructive universal property arguments**.
  - Each construction follows a pattern:
    1. Build candidate (co)limit object via known limits/colimits.
    2. Define structure maps.
    3. Prove (co)fork condition.
    4. Prove universal property via uniqueness of (co)limit morphisms.

- **Key Lemmas**:
  - `isIso_limit_cone_parallelPair_of_eq` / `isIso_colimit_cocone_parallelPair_of_eq`: Used to deduce isomorphism of equalizer/coequalizer maps from zero morphism conditions.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Limits.Shapes.NormalMono.Basic` | Core definitions: `NormalMonoCategory`, `normalMonoOfMono`, etc. |
| `Mathlib.CategoryTheory.Limits.Shapes.FiniteProducts` | Tools for finite products, `prod.lift`, `prod.fst`, `prod.snd`, etc. |

> **Note**: The file also implicitly uses:
> - `HasZeroMorphisms`, `HasZeroObject`, `Kernel`, `Cokernel`, `Equalizer`, `Coequalizer`, `Pullback`, `Pushout`, `Fork`, `Cofork`, `Limit`, `Colimit`, etc., all from Mathlib’s `CategoryTheory.Limits` hierarchy.

---

### Summary

This file establishes foundational results in homological algebra within category theory:  
- **Normal mono categories with finite products and kernels ⇒ all equalizers exist**  
- **Normal epi categories with finite coproducts and cokernels ⇒ all coequalizers exist**  
These are stepping stones toward proving that a category is **abelian** (e.g., via the Freyd–Mitchell embedding or direct verification of abelian axioms). The proofs rely heavily on the interplay between zero morphisms, kernels/cokernels, and universal properties of (co)limits.