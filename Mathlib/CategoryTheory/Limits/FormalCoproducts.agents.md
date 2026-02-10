### Technical Brief: FormalCoproducts.lean

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `FormalCoproduct` | `Type u → Category.{v} → Type (max u w)` | A category whose objects are indexed families of objects in `C`; morphisms are indexed families of morphisms over a function on indices. |
| `Hom` | `FormalCoproduct → FormalCoproduct → Type (max u w)` | Morphism between formal coproducts: a function on indices + component maps. |
| `category` | `Category (FormalCoproduct.{w} C)` | Defines the categorical structure on formal coproducts. |
| `incl` | `C ⥤ FormalCoproduct.{w} C` | Embedding of `C` into formal coproducts via singleton indexing (`PUnit`). |
| `Hom.fromIncl` | `i : Y.I → X ⟶ Y.obj i → incl X ⟶ Y` | Universal property of `incl`: maps into a formal coproduct from an embedded object correspond to a choice of index and map. |
| `inclHomEquiv` | `((incl C).obj X ⟶ Y) ≃ (i : Y.I) × (X ⟶ Y.obj i)` | Equivalence expressing the universal property of `incl`. |
| `fullyFaithfulIncl` | `(incl C).FullyFaithful` | `incl` is fully faithful. |
| `cofan` | `Cofan f` | Explicit construction of a coproduct cocone over a family `f : 𝒜 → FormalCoproduct C`. |
| `cofanHomEquiv` | `((cofan f).pt ⟶ t) ≃ (i : 𝒜 → f i ⟶ t)` | Universal property of the constructed coproduct. |
| `isColimitCofan` | `IsColimit (cofan f)` | The cocone `cofan f` is a colimit — i.e., `FormalCoproduct C` has all coproducts. |
| `coproductIsoSelf` | `∐ X.toFun ≅ X` | Every formal coproduct `X` is (canonically) a coproduct of embedded objects via `incl`. |
| `isTerminalIncl` | `IsTerminal T → IsTerminal (incl T)` | If `T` is terminal in `C`, then `incl T` is terminal in `FormalCoproduct C`. |
| `pullbackCone` | `PullbackCone f g` | Constructs pullbacks in `FormalCoproduct C` from componentwise pullbacks in `C`. |
| `isLimitPullbackCone` | `IsLimit (pullbackCone f g pb)` | The constructed pullback cone is indeed a limit. |
| `eval` | `(C ⥤ A) ⥤ (FormalCoproduct C ⥤ A)` | Extension of a copresheaf `F : C → A` (with `A` cocomplete) to `FormalCoproduct C`, using coproducts in `A`. |
| `evalOp` | `(Cᵒᵖ ⥤ A) ⥤ ((FormalCoproduct C)ᵒᵖ ⥤ A)` | Extension of a presheaf `F : Cᵒᵖ → A` (with `A` complete) to formal coproducts, using products in `A`. |
| `evalCompInclIsoId` | `eval C A ⋙ whiskeringLeft ... ≅ id` | `eval F` extends `F` along `incl`. |
| `evalOpCompInlIsoId` | `evalOp C A ⋙ ... ≅ id` | `evalOp F` extends `F` along `incl.op`. |
| `preservesColimitsOfShape` | `PreservesColimitsOfShape (Discrete J) (eval F)` | `eval F` preserves coproducts (colimits over discrete diagrams). |
| `preservesLimitsOfShape` | `PreservesLimitsOfShape (Discrete J) (evalOp F)` | `evalOp F` preserves products (limits over discrete diagrams). |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `incl`: embedding of original category.
  - `fromIncl`: maps *from* an embedded object.
  - `cofan`: explicit coproduct cocone.
  - `pullbackCone`: explicit pullback cone.
  - `eval`, `evalOp`: extension functors (copresheaf / presheaf).
  - `isoOfComponents`, `coproductIsoSelf`, `coproductIsoCofanPt`: isomorphisms built from component data.

- **Suffixes:**
  - `Equiv`: bijective correspondence (often universal properties).
  - `Iso`: explicit isomorphism.
  - `Hom`: morphism-related constructions.
  - `Comp`: composition-related lemmas (e.g., `comp_φ`, `comp_f`).
  - `asSigma`: representation as a sigma type (index + data).

- **Structure fields:**
  - `f`: indexing function.
  - `φ`: component maps.
  - `pt`: apex of (co)cone.
  - `inj`: coproduct injections.

---

#### **3. Tactic Stack**

- **`aesop`**: Used heavily for automated equality reasoning (especially in `hom_ext`, `iso` proofs).
- **`simp` / `simp only`**: Simplification of `cofan`, `pullbackCone`, `incl`, `fromIncl`, `Sigma`, `Pi`.
- **`ext`**: Extensionality for structures (e.g., `Hom`, `NatTrans`).
- **`rw`**: Rewriting using equalities (often in `eqToHom` contexts).
- **`congrArg` / `congrFun`**: For functional extensionality and congruence.
- **`simpa`**: Simplify and discharge goal.
- **`obtain` / `cases`**: Destructuring of `Sigma`, `Pullback`, `Iso`.
- **`convert`**: For flexible unification in `uniq` lemmas.
- **`refine` / `exact`**: Manual proof construction in limit/colimit arguments.

---

#### **4. Proof Logic**

- **Structure extensionality**: Prove equality of morphisms via `hom_ext` or `hom_ext_iff'`, requiring:
  - Equality of indexing functions (`f = g`).
  - Equality of component maps up to `eqToHom` (coherence with reindexing).
- **Universal properties**:
  - Coproducts: Construct `cofan`, prove `cofanHomEquiv`, then `isColimitCofan`.
  - Pullbacks: Assume componentwise pullbacks `pb i`, build `pullbackCone`, prove `homPullbackEquiv`, then `isLimitPullbackCone`.
- **Isomorphism construction**:
  - Use `isoOfComponents` with `Equiv` on indices and component isos.
  - For `coproductIsoSelf`, chain `coproductIsoCofanPt` and `cofanPtIsoSelf`.
- **Preservation lemmas**:
  - Show that `eval F` (or `evalOp F`) sends colimiting (limiting) cocones (cones) to colimiting (limiting) ones via explicit `desc` / `lift` maps and uniqueness via `Sigma.hom_ext` / `Pi.hom_ext`.

---

#### **5. Imports**

| Module | Purpose |
|--------|---------|
| `Mathlib.CategoryTheory.Limits.Preserves.Shapes.Products` | Product preservation lemmas. |
| `Mathlib.CategoryTheory.Limits.Shapes.Opposites.Products` | Products in opposite categories. |
| `Mathlib.CategoryTheory.Limits.Shapes.Pullback.HasPullback` | Pullback existence and properties. |
| `Mathlib.CategoryTheory.Limits.Shapes.Terminal` | Terminal objects. |
| `Mathlib.CategoryTheory.Limits.Shapes.Pullback.IsPullback.Basic` | Basic `IsPullback` theory. |
| `Mathlib.CategoryTheory.Limits.Shapes.ZeroObjects` | Zero objects (used implicitly via terminal/initial). |

> **Note**: No direct imports of coproducts or colimits beyond the above — all coproducts are *constructed* in this file.

---

#### **6. Mermaid Diagrams**

##### **Dependency Graph (Top-Level)**

```mermaid
graph TD
  A[FormalCoproducts.lean] --> B[Mathlib.CategoryTheory.Limits.Preserves.Shapes.Products]
  A --> C[Mathlib.CategoryTheory.Limits.Shapes.Opposites.Products]
  A --> D[Mathlib.CategoryTheory.Limits.Shapes.Pullback.HasPullback]
  A --> E[Mathlib.CategoryTheory.Limits.Shapes.Terminal]
  A --> F[Mathlib.CategoryTheory.Limits.Shapes.Pullback.IsPullback.Basic]
  A --> G[Mathlib.CategoryTheory.Limits.Shapes.ZeroObjects]

  subgraph Theory
    B --> H[PreservesColimits]
    C --> I[PreservesLimits]
    D --> J[HasPullbacks]
    E --> K[HasTerminal]
    F --> L[IsPullback]
    G --> M[HasZero]
  end

  A -->|defines| N[FormalCoproduct C]
  A -->|defines| O[incl : C ⥤ FormalCoproduct C]
  A -->|defines| P[eval : (C ⥤ A) ⥤ (FormalCoproduct C ⥤ A)]
  A -->|defines| Q[evalOp : (Cᵒᵖ ⥤ A) ⥤ ((FormalCoproduct C)ᵒᵖ ⥤ A)]
```

##### **Overview of FormalCoproducts Theory**

```mermaid
flowchart LR
  C[Category C] -->|incl| FC[FormalCoproduct C]
  FC -->|has| Coprod[Coproducts]
  FC -->|has| Pullb[Pullbacks]
  FC -->|has| Term[Terminal]

  C -->|F : C ⥤ A| Eval[eval F : FormalCoproduct C ⥤ A]
  A[Category A] -->|HasCoproducts| Eval

  Cᵒᵖ -->|F : Cᵒᵖ ⥤ A| EvalOp[evalOp F : (FormalCoproduct C)ᵒᵖ ⥤ A]
  A -->|HasProducts| EvalOp

  FC -->|every X| CoprodSelf[X ≅ ∐_{i:X.I} incl(X.obj i)]
  FC -->|incl fully faithful| FF[incl.FullyFaithful]
  FC -->|universal prop| HomEquiv[incl X ⟶ Y ≃ Σ i, X ⟶ Y.i]
```

---

#### **7. Summary**

This file constructs the **category of formal coproducts** over a base category `C`, denoted `FormalCoproduct C`. Its objects are families `(I, obj : I → C)`, and morphisms are indexed families of maps over a function `I → J`. It proves:

- `FormalCoproduct C` has all coproducts, pullbacks, and a terminal object (if `C` does).
- The embedding `incl : C → FormalCoproduct C` is fully faithful.
- Every object in `FormalCoproduct C` is a coproduct of embedded objects from `C`.
- Given a category `A` with coproducts (resp. products), any copresheaf (resp. presheaf) `C → A` extends uniquely to `FormalCoproduct C → A` via `eval` (resp. `evalOp`), preserving all coproducts (resp. products).

This is foundational for constructing **Čech cohomology** and modeling sheaves/stacks over sites defined by formal coproducts.

--- 

Let me know if you'd like a formalization roadmap or a proof outline for a specific theorem (e.g., `eval` preserves coproducts).
