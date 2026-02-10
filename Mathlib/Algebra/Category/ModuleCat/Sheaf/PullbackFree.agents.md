**Technical Brief: PullbackFree.lean**

---

### 1. KEY DEFINITIONS & THEOREMS

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `pushforwardSections` | `{M : SheafOfModules R} → M.sections → ((pushforward φ).obj M).sections` | Maps global sections of a sheaf of modules to global sections of its pushforward along a continuous functor. |
| `unitToPushforwardObjUnit` | `unit S ⟶ (pushforward φ).obj (unit R)` | Canonical morphism of sheaves of modules induced by the ring morphism `φ : S → F_* R`. |
| `pullbackObjUnitToUnit` | `(pullback φ).obj (unit S) ⟶ unit R` | Adjoint of `unitToPushforwardObjUnit` via the `pullback ⊣ pushforward` adjunction. |
| `pullbackObjFreeIso` | `(pullback φ).obj (free I) ≅ free I` | Isomorphism showing pullback of a free sheaf of modules is free on the same index set. |
| `freeFunctorCompPullbackIso` | `freeFunctor ⋙ pullback φ ≅ freeFunctor` | Natural isomorphism of functors: pullback commutes with free sheaf construction (up to iso), when `F` is final. |
| `bijective_pushforwardSections` | `Function.Bijective (pushforwardSections φ)` | Under `F.Final`, pushforward on sections is bijective. |
| `instance [F.Final] : IsIso (pullbackObjUnitToUnit φ)` | Proof that `pullbackObjUnitToUnit φ` is an isomorphism when `F` is final. | Core structural result enabling freeness preservation. |

---

### 2. NAMING CONVENTIONS

- **Prefixes**:
  - `pushforward*`: constructions involving the pushforward functor `pushforward φ`.
  - `pullback*`: constructions involving the pullback functor `pullback φ`.
  - `unit*`: constructions involving the unit sheaf `unit S` (i.e., free rank-1 module).
  - `free*`: constructions involving free sheaves `free I`.
- **Suffixes**:
  - `Sections`: global sections map.
  - `Unit`: refers to the unit sheaf `unit`.
  - `Iso`: indicates an isomorphism (often `asIso`, `pullbackObjFreeIso`, `freeFunctorCompPullbackIso`).
- **Adjoint-related**:
  - `homEquiv`: refers to the hom-set bijection of an adjunction.
  - `Adjunction`: used in lemmas referencing the `pullback ⊣ pushforward` adjunction.

---

### 3. TACTIC STACK

- `ext`: extensionality for morphisms in concrete categories (e.g., `SheafOfModules`, `ModuleCat`).
- `simp`: heavily used, especially with `map_one`, `map_mul`, `unitHomEquiv`, `ιFree`.
- `rw`: rewriting using lemmas like `pullbackPushforwardAdjunction_homEquiv_pullbackObjUnitToUnit`.
- `convert`: for partial equality proofs where typeclass inference fills gaps.
- `dsimp`: simplification of definitional equalities (e.g., unfolding `unitHomEquiv`).
- `apply_symm_apply`, `bijective.of_comp_iff'`: for reasoning about bijectivity and adjunctions.
- `Cofan.IsColimit.hom_ext`, `isColimitCofanMkObjOfIsColimit`: for colimit-based naturality arguments.
- `simp [pullbackObjFreeIso, ιFree]`: for reassoc lemmas involving `ιFree`.

---

### 4. PROOF LOGIC

- **Structure**:
  1. **Setup**: Work in the context of a continuous functor `F : C ⥤ D` between sites, with ring sheaves `S`, `R`, and a morphism `φ : S → F_* R`.
  2. **Section-level bijectivity**: Prove `pushforwardSections` is bijective under `F.Final`, using `Functor.bijective_sectionsPrecomp`.
  3. **Unit morphism is iso**: Show `pullbackObjUnitToUnit φ` is an isomorphism by reducing to bijectivity of sections via coyoneda and unit-hom equivalence.
  4. **Free sheaves**: Use the universal property of `free I` as a copower of copies of `unit R`, and the fact that pullback preserves colimits, to build `pullbackObjFreeIso`.
  5. **Naturality**: Prove naturality of `pullbackObjFreeIso` in `I` using colimit universal properties (`Cofan.IsColimit.hom_ext`).
  6. **Functor-level iso**: Assemble componentwise isos into a natural isomorphism `freeFunctorCompPullbackIso`.

- **Key logical flow**:
  > *Finality* ⇒ *sections bijective* ⇒ *unit morphism iso* ⇒ *free sheaves preserved* ⇒ *free functor commutes with pullback*.

---

### 5. IMPORTS (PRIMARY DEPENDENCIES)

| Module | Role |
|--------|------|
| `Mathlib.Algebra.Category.ModuleCat.Sheaf.Free` | Defines `free I`, `ιFree`, `freeMap`, `freeFunctor`. |
| `Mathlib.Algebra.Category.ModuleCat.Sheaf.PullbackContinuous` | Defines `pullback φ`, `pushforward φ`, and their adjunction. |
| `Mathlib.CategoryTheory.Limits.Preserves.Shapes.Products` | Used for preservation of products (via continuity of `F`). |
| `Mathlib.CategoryTheory.Limits.Final.Type` | Provides tools for working with final functors (`F.Final`). |

Additional implicit dependencies:
- `SheafOfModules`, `Sheaf`, `RingCat`, `AddCommGrpCat`, `GrothendieckTopology`.
- `HasWeakSheafify`, `WEqualsLocallyBijective` for sheafification properties.

---

### 6. MERMAID DIAGRAMS

#### Dependency Graph (High-Level)

```mermaid
graph TD
  A[SheafOfModules] --> B[Sheaf RingCat]
  A --> C[SheafOfModules R]
  B --> D[Continuous Functor F : C ⥤ D]
  C --> E[Pullback φ ⊣ Pushforward φ]
  E --> F[Final Functor F]
  F --> G[IsIso(pullbackObjUnitToUnit)]
  G --> H[Pullback preserves free sheaves]
  H --> I[freeFunctorCompPullbackIso]
```

#### Overview of File Structure

```mermaid
flowchart LR
  subgraph Setup
    S[Ring sheaves S, R] --> F[Continuous F : C ⥤ D]
    S --> φ[φ : S → F_* R]
  end

  subgraph Section Theory
    pushforwardSections[pushforwardSections] --> bijective_pushforwardSections[F.Final ⇒ bijective]
  end

  subgraph Unit Morphism
    unitToPushforwardObjUnit --> pullbackObjUnitToUnit[Adjoint]
    pullbackObjUnitToUnit --> IsIso_unit[IsIso if F.Final]
  end

  subgraph Free Sheaves
    pullbackObjUnitToUnit --> pullbackObjFreeIso[Pullback(free I) ≅ free I]
    pullbackObjFreeIso --> pullback_map_ιFree_comp_pullbackObjFreeIso_hom[Naturality w.r.t. ιFree]
    pullbackObjFreeIso --> pullbackObjFreeIso_hom_naturality[Naturality w.r.t. freeMap]
    pullbackObjFreeIso --> freeFunctorCompPullbackIso[Natural iso of functors]
  end
```

---

### 7. SUMMARY

This file formalizes the behavior of pullback functors between categories of sheaves of modules over ringed sites, especially in the case where the underlying site functor is **final**. The key insight is that under finality, pullback preserves the unit sheaf up to isomorphism, and hence preserves all free sheaves of modules. This yields a natural isomorphism between the free sheaf functor and its composition with pullback — a foundational result for descent and base-change arguments in sheaf theory.

--- 

Let me know if you'd like a formalized dependency graph (e.g., `.lean`-level imports), or a proof sketch in natural deduction style.
