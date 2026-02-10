### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `hasKernels` | `{C : Type u₁} [Category C] [Preadditive C] → {D : Type u₂} [Category D] [Abelian D] → (F : C ⥤ D) → (G : D ⥤ C) [PreservesZeroMorphisms G] → [PreservesFiniteLimits G] → (i : F ⋙ G ≅ 𝟭 C) → HasKernels C` | Constructs kernels in `C` using left exactness of `G` and the iso `i : F ⋙ G ≅ 𝟭 C`. |
| `hasCokernels` | Similar to `hasKernels`, but for cokernels; requires `adj : G ⊣ F`. | Constructs cokernels in `C` using that `G` preserves colimits (via adjunction) and `i`. |
| `cokernelIso` | `{X Y : C} (f : X ⟶ Y) → G.obj (cokernel (F.map f)) ≅ cokernel f` | Relates cokernels in `D` and `C` via `G` and `i`. |
| `coimageIsoImageAux` | `{X Y : C} (f : X ⟶ Y) → kernel (G.map (cokernel.π (F.map f))) ≅ kernel (cokernel.π f)` | Intermediate isomorphism used to relate image and coimage in `C`. |
| `coimageIsoImage` | `{X Y : C} (f : X ⟶ Y) → Abelian.coimage f ≅ Abelian.image f` | Constructs the canonical isomorphism between coimage and image in `C`, assuming abelian structure in `D`. |
| `coimageIsoImage_hom` | `(coimageIsoImage … f).hom = Abelian.coimageImageComparison f` | Shows that the constructed iso coincides with the canonical comparison map. |
| `abelianOfAdjunction` | Under hypotheses (additive `C`, abelian `D`, `F`, `G` preserve zero morphisms, `G` left exact, `G ⊣ F`, `F ⋙ G ≅ 𝟭 C`) ⇒ `Abelian C` | Main theorem: transfers abelianness from `D` to `C` along an adjunction with unit iso. |
| `abelianOfEquivalence` | If `F : C ⥤ D` is an equivalence and `D` abelian, then `C` is abelian. | Special case of `abelianOfAdjunction` using equivalence data. |
| `ShrinkHoms.abelian` | `[Abelian C] → Abelian (ShrinkHoms C)` | Application: `ShrinkHoms C` inherits abelian structure from `C`. |

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `hasKernels`, `hasCokernels`: indicate existence of (co)limits.
  - `coimageIsoImage`, `cokernelIso`, `coimageIsoImageAux`: auxiliary constructions for key isomorphisms.
  - `abelianOfAdjunction`, `abelianOfEquivalence`: main transfer theorems.
  - `homGroup`, `preadditive`, `hasLimitsOfShape`: instance definitions.

- **Suffixes**:
  - `_hom`, `_inv`: refer to hom/inv components of isos.
  - `_comp`, `_iso`, `_aux`: denote composition-based or auxiliary variants.
  - `_ofEq`, `_ofEq_hom`, `_ofEq_inv`: isos induced by equalities/morphisms.

- **Pattern**:
  - `XIsoY` → `X ≅ Y`
  - `XOfY` → construction from `Y`
  - `preservesX`, `hasX`, `isX`: properties/instances.

---

#### 3. **Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` / `simp only [...]` | Simplifying functorial identities, naturality, iso properties. |
| `rw [...]` | Rewriting using naturality squares, iso equations, definitions. |
| `apply ...` | Applying known lemmas (e.g., `hasKernel_iso_comp`, `kernelCompMono`). |
| `calc` | Chaining isomorphisms step-by-step (especially in `cokernelIso`, `coimageIsoImageAux`, `coimageIsoImage`). |
| `infer_instance` | Inferring instances (e.g., `IsIso`). |
| `dsimp`, `simp only [...] using ...` | In `coimageIsoImage_hom`, to reduce definitionally and apply lemmas. |
| `apply inverse C).map_injective` | Injectivity arguments for proving additivity in `ShrinkHoms`. |
| `apply map_add`, `apply (inverse C).map_injective` | For verifying additive structure on homs. |

---

#### 4. **Proof Logic**

- **Structure**:
  1. **Existence of (co)kernels**: Use `G`’s preservation of finite limits/colimits + iso `i` to lift (co)kernel existence from `D` to `C`.
  2. **Coimage–Image Isomorphism**:
     - Build a chain of isomorphisms:
       - `coimage f ≅ G(cokernel(F(kernel.ι f)))` via `cokernelIso`
       - Then relate `F(kernel.ι f)` to `kernel.ι (F f)` using `kernelComparison`
       - Use `coimageIsoImageAux` to connect to `kernel(cokernel.π f) ≅ image f`
     - Prove this iso equals the canonical comparison map (`coimageIsoImage_hom`).
  3. **Abelianness**:
     - Use `abelianOfCoimageImageComparisonIsIso`: if all coimage→image comparisons are isos, category is abelian.
     - Show this holds by transporting isomorphism from `D` (where it holds) via constructed iso.

- **Key Insight**:
  - The iso `i : F ⋙ G ≅ 𝟭 C` is enough (even without counit iso) — this is nontrivial and leveraged via naturality and adjunction.

---

#### 5. **Imports**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.Equiv.TransferInstance` | For transferring algebraic structures (e.g., `AddCommGroup`) along equivalences. |
| `Mathlib.CategoryTheory.Abelian.Basic` | Core abelian category definitions (image, coimage, comparison map). |
| `Mathlib.CategoryTheory.Adjunction.Limits` | Preserves limits/colimits under adjunctions (`leftAdjoint_preservesColimits`, `rightAdjoint_preservesLimits`). |
| `Mathlib.CategoryTheory.Limits.Preserves.Shapes.Kernels` | Tools for handling kernels, cokernels, and their preservation. |
| `Mathlib.CategoryTheory.Preadditive.AdditiveFunctor` | Functors between preadditive categories are additive iff they preserve zero morphisms and addition. |

---

### Summary

This file formalizes a **categorical transfer principle**: under an adjunction `G ⊣ F` with `F ⋙ G ≅ 𝟭 C` and `G` left exact, abelianness descends from `D` to `C`. It includes:
- Explicit constructions of kernels/cokernels in `C`,
- A detailed proof that coimage ≅ image in `C`,
- An application to `ShrinkHoms C`, showing it inherits abelianness from `C`.

The proofs rely heavily on **naturality of isomorphisms**, **functoriality**, and **calculus of (co)kernels**, with heavy use of `calc` blocks and `simp`-based simplification.