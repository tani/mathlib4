### Technical Metadata Brief: *Preserving (Co)kernels in Lean 4 / Mathlib*

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `KernelFork.map` | `KernelFork f → C ⥤ D → KernelFork (G.map f)` | Maps a kernel fork under a zero-morphism-preserving functor `G`. |
| `KernelFork.isLimitMapConeEquiv` | `IsLimit (G.mapCone c) ≃ IsLimit (c.map G)` | Equivalence between limit of mapped cone and mapped kernel fork being limit. |
| `KernelFork.mapIsLimit` | `IsLimit c → PreservesLimit (parallelPair f 0) G → IsLimit (c.map G)` | Shows that a limit kernel fork maps to a limit kernel fork if `G` preserves the limit. |
| `isLimitMapConeForkEquiv'` | `IsLimit (G.mapCone (KernelFork.ofι h w)) ≃ IsLimit (KernelFork.ofι (G.map h) …)` | Variant equivalence for `ofι`, avoiding definitional issues with `G.map 0 = 0`. |
| `isLimitForkMapOfIsLimit'` | `PreservesLimit (parallelPair f 0) G → IsLimit (KernelFork.ofι h w) → IsLimit (KernelFork.ofι (G.map h) …)` | Ensures mapped fork is limit under preservation assumption. |
| `isLimitOfHasKernelOfPreservesLimit` | `PreservesLimit (parallelPair f 0) G → IsLimit (Fork.ofι (G.map (kernel.ι f)) …)` | Constructs limit for mapped kernel when `G` preserves limits and `C` has kernels. |
| `PreservesKernel.iso` | `PreservesLimit (parallelPair f 0) G → G.obj (kernel f) ≅ kernel (G.map f)` | Isomorphism between image of kernel and kernel of image under preservation. |
| `PreservesKernel.of_iso_comparison` | `IsIso (kernelComparison f G) → PreservesLimit (parallelPair f 0) G` | Kernel comparison iso ⇒ `G` preserves kernel of `f`. |
| `kernelComparison_comp_kernel_map` | Commutativity of kernel maps with `PreservesKernel.iso.inv`. | Ensures naturality of kernel comparison under morphism squares. |
| `CokernelCofork.map` | `CokernelCofork f → C ⥤ D → CokernelCofork (G.map f)` | Dual to `KernelFork.map`. |
| `CokernelCofork.isColimitMapCoconeEquiv` | `IsColimit (G.mapCocone c) ≃ IsColimit (c.map G)` | Dual equivalence for cokernel coforks. |
| `PreservesCokernel.iso` | `PreservesColimit (parallelPair f 0) G → G.obj (cokernel f) ≅ cokernel (G.map f)` | Dual isomorphism for cokernels. |
| `PreservesCokernel.of_iso_comparison` | `IsIso (cokernelComparison f G) → PreservesColimit (parallelPair f 0) G` | Dual of `PreservesKernel.of_iso_comparison`. |
| `preservesKernel_zero` / `preservesCokernel_zero` | Instances for zero morphisms | Any zero-morphism-preserving functor preserves kernels/cokernels of zero maps. |
| `preservesKernel_zero'` / `preservesCokernel_zero'` | `f = 0 → PreservesLimit/Colimit (parallelPair f 0) G` | Explicit version for zero maps. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isLimit*`, `isColimit*`: Properties of (co)cones being (co)limit.
  - `map*`: Mapping constructions under a functor `G`.
  - `preservesKernel*`, `preservesCokernel*`: Preservation properties.
  - `kernelComparison`, `cokernelComparison`: Canonical comparison maps from `G(kernel f)` to `kernel(G f)`.

- **Suffixes**:
  - `Equiv`: Logical equivalences (`≃`).
  - `Iso`: Isomorphisms (`≅`).
  - `'` (prime): Variant of a definition/lemma avoiding definitional equality issues (e.g., `G.map 0 ≠ 0`).
  - `of_*`: Construction from data (e.g., `of_iso_comparison`, `ofHasKernel…`).

- **Pattern**:
  - `PreservesKernel.iso`, `PreservesCokernel.iso`: Canonical isos when preservation holds.
  - `kernel.map`, `cokernel.map`: Functoriality of kernel/cokernel constructions.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Role |
|--------|------|
| `rw` | Rewriting using equalities, especially `condition`, `map_comp`, `map_zero`. |
| `simp only [...]` | Simplification with explicit lemmas, avoiding unfolding definitions. |
| `aesop_cat` | Automated category-theoretic reasoning (e.g., diagram chasing). |
| `exact`, `refine`, `apply` | Proof construction, especially with equivalences and isomorphisms. |
| `rintro (_|_)` | Case analysis on sum types (e.g., forks/coforks). |
| `ext` | Extensionality for cones/cocones/forks. |
| `infer_instance` | Automatically infer typeclass instances (e.g., `IsIso`). |
| `cancel_mono`, `cancel_epi` | Cancellation lemmas for monos/epis. |
| `Iso.*` lemmas (`comp_inv_eq`, `eq_inv_comp`, etc.) | Reasoning about isomorphisms. |

---

#### **4. Proof Logic**

- **Structure**:
  - Most proofs follow a pattern:
    1. Use `map_condition` to verify fork/cofork condition after mapping.
    2. Construct mapped fork/cofork via `ofι`/`ofπ`.
    3. Use `isLimitMapConeEquiv` / `isColimitMapCoconeEquiv` to reduce to cone/cocone limit properties.
    4. Apply `isLimitOfPreserves` / `isColimitOfPreserves` under assumption of preservation.
    5. For comparison maps: show iso ⇒ preservation via `of_iso_comparison`, and preservation ⇒ iso via `iso` + `hom/inv` lemmas.

- **Key Reasoning Steps**:
  - **Induction/Case Splitting**: Rare; mostly diagrammatic reasoning.
  - **Equivalence Chaining**: Use `equivIsoLimit`, `postcomposeHomEquiv`, etc., to shift between cone and fork perspectives.
  - **Naturality**: Verified via `kernel.map_comp`, `cokernel.map_comp`, etc., often using `Category.assoc`, `Iso.eq_inv_comp`.

- **Avoidance of Definitional Issues**:
  - Use `'`-variants (`isLimitMapConeForkEquiv'`, `isColimitMapCoconeCoforkEquiv'`) to sidestep `G.map 0 = 0` not holding definitionally.

---

#### **5. Imports & Scope**

- **Core Imports**:
  ```lean
  import Mathlib.CategoryTheory.Limits.Shapes.Kernels
  import Mathlib.CategoryTheory.Limits.Preserves.Shapes.Zero
  ```

- **Scope**:
  - Focuses on **kernel and cokernel preservation** under functors.
  - Works in categories with **zero morphisms** (`[HasZeroMorphisms]`).
  - Uses **limit/colimit preservation** (`PreservesLimit`, `PreservesColimit`).
  - Builds on general cone/cocone machinery (`Cones`, `Cocones`, `Forks`, `Coforks`).
  - Central objects: `kernel`, `cokernel`, `kernelComparison`, `cokernelComparison`.

- **Dependencies**:
  - `CategoryTheory.Limits.Shapes.Kernels`: Definitions of kernels, kernel forks, `kernelIsKernel`.
  - `CategoryTheory.Limits.Preserves.Shapes.Zero`: Zero morphism preservation and related lemmas.

---

### Summary

This file formalizes the relationship between **preservation of kernels/cokernels** and **isomorphism of comparison maps**, using kernel/cokernel forks as concrete representatives of limits/colimits. It carefully handles definitional mismatches (e.g., `G.map 0 ≠ 0`) via variants (`'`) and leverages equivalence-based reasoning to bridge abstract preservation with concrete diagrammatic properties. The structure is highly symmetric between kernels and cokernels, with dual lemmas and proofs.