### Technical Brief: Normal Monomorphisms and Epimorphisms in Lean 4 (Category Theory)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `NormalMono (f : X ⟶ Y)` | `Class` | A morphism `f` is a **normal monomorphism** if it is the kernel of some morphism `g : Y ⟶ Z`. Contains: <br>• `Z : C` (codomain of `g`) <br>• `g : Y ⟶ Z` <br>• `w : f ≫ g = 0` <br>• `isLimit : IsLimit (KernelFork.ofι f w)` |
| `NormalEpi (f : X ⟶ Y)` | `Class` | Dual to `NormalMono`: `f` is the cokernel of some `g : W ⟶ X`. Contains: <br>• `W : C` <br>• `g : W ⟶ X` <br>• `w : g ≫ f = 0` <br>• `isColimit : IsColimit (CokernelCofork.ofπ f w)` |
| `NormalMono.regularMono` | `instance` | Every normal mono is a regular mono. Uses `KernelFork.ofι` as the equalizer diagram. |
| `NormalEpi.regularEpi` | `instance` | Every normal epi is a regular epi. Uses `CokernelCofork.ofπ` as the coequalizer diagram. |
| `equivalenceReflectsNormalMono` | `def` | If `F : C ⥤ D` is an equivalence and `F.map f` is normal mono, then `f` is normal mono. Relies on `IsLimit.ofConeEquiv` and `reflects`. |
| `equivalenceReflectsNormalEpi` | `def` | Dual of above: equivalences reflect normal epis. |
| `normalOfIsPullbackSndOfNormal` | `def` | In a pullback square, if the right leg `h` is a normal mono, then the bottom leg `g` is also a normal mono. Uses `regularOfIsPullbackSndOfRegular` and `IsLimit.ofIsoLimit`. |
| `normalOfIsPullbackFstOfNormal` | `def` | Dual: if left leg `k` is normal mono, then top leg `f` is too. |
| `normalMonoCategoryOfNormalMono` | `def` | In a `NormalMonoCategory`, every mono is normal (non-instance to avoid loops). |
| `regularMonoCategoryOfNormalMonoCategory` | `instance` | Every `NormalMonoCategory` is a `RegularMonoCategory`. |
| `normalEpiOfEpi` / `regularEpiCategoryOfNormalEpiCategory` | `def` / `instance` | Duals of above for epis. |
| `normalEpiOfNormalMonoUnop` | `def` | A normal mono in `C` becomes a normal epi in `Cᵒᵖ`. Uses `op`/`unop` and duality of limits/colimits. |
| `normalMonoOfNormalEpiUnop` | `def` | Dual: normal epi in `C` becomes normal mono in `Cᵒᵖ`. |
| `NormalMono.lift'` | `def` | Universal property: given `k : W ⟶ Y` with `k ≫ g = 0`, there exists unique `l : W ⟶ X` with `l ≫ f = k`. |
| `NormalEpi.desc'` | `def` | Dual: given `k : X ⟶ W` with `g ≫ k = 0`, there exists unique `l : Y ⟶ W` with `f ≫ l = k`. |
| `normalOfIsPushoutSndOfNormal` / `normalOfIsPushoutFstOfNormal` | `def` | Pushout duals of pullback normality results. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `normalOfIsPullback*` / `normalOfIsPushout*`: constructions of normal (co)monos from (co)limits.
  - `equivalenceReflects*`: properties preserved/reflected by equivalences.
  - `*OfNormal*`: derived properties from normality assumptions.
- **Suffixes**:
  - `Unop`: duality via opposite category (`Cᵒᵖ`).
  - `'` (e.g., `lift'`, `desc'`): variants of universal properties using `IsLimit.lift'` / `IsColimit.desc'`.
- **Class names**:
  - `NormalMono`, `NormalEpi`, `NormalMonoCategory`, `NormalEpiCategory`: standard `is_`-style naming for classes, though `NormalMono` omits `is_` per comment.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only`: simplification of zero morphisms, associativity, whiskering.
- `rw [← Category.assoc, ...]`: reassociation and rewriting using `assoc`.
- `congrArg Quiver.Hom.op` / `unop`: handling opposites.
- `convert`: partial unification, especially when `isLimit`/`isColimit` is involved.
- `infer_instance`: to discharge class instances (e.g., `regularMonoCategoryOfNormalMonoCategory`).
- `aesop`: likely used implicitly (via `simp`-based automation), though not explicit in snippet.
- `intro`/`rintro`/`cases`: for destructuring cones/cocones and uniqueness arguments.
- `Functor.map_preimage`, `Iso.inv_hom_id`, `Category.comp_id`: lemmas for manipulating morphisms under functors and isomorphisms.

---

#### **4. Proof Logic**

- **Inductive/Universal Property Style**: Most proofs rely on:
  - Showing a cone/cocone is limiting via `IsLimit.ofConeEquiv`, `IsColimit.ofCoconeEquiv`, or `ofIsoLimit`.
  - Using equivalences of cones/cocones induced by functors (e.g., `Cones.postcomposeEquivalence`).
- **Duality**: Many results are dualized via:
  - `Opposite` and `unop`/`op`.
  - Swapping `kernel` ↔ `cokernel`, `IsLimit` ↔ `IsColimit`, `pullback` ↔ `pushout`.
- **Pullback/Pushout Normality**:
  - Reduce to regular mono/epi case (`regularOfIsPullbackSndOfRegular`), then upgrade using `IsLimit.ofIsoLimit` with isomorphisms from `objObjPreimageIso`.
- **Equivalence Reflection**:
  - Use `F.map_injective` to lift zero equations.
  - Transport limiting structure via `F` and its quasi-inverse.

---

#### **5. Imports**

Core dependencies defining scope:
- `Mathlib.CategoryTheory.Limits.Shapes.RegularMono`: regular monos.
- `Mathlib.CategoryTheory.Limits.Shapes.Kernels`: kernels and kernel forks.
- `Mathlib.CategoryTheory.Limits.Preserves.Basic`: preservation of limits/colimits, equivalences.

> **Note**: This module builds on standard limit/colimit infrastructure in Mathlib, especially zero morphisms, kernels, cokernels, pullbacks, pushouts, and their universal properties.

--- 

This module formalizes foundational results about *normal* (co)monos — a stricter notion than regular — and shows how they interact with equivalences, pullbacks/pushouts, and categorical closure properties.