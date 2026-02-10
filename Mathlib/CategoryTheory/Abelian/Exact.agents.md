Here is the **technical metadata** extracted from the provided Lean 4 file, formatted as a structured technical brief for domain-specific AI agent training:

---

### 🔹 **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `exact_iff_epi_imageToKernel'` | `S.Exact ↔ Epi (imageToKernel' S.f S.g S.zero)` | Relates exactness of a short complex to epimorphism of a canonical map. |
| `exact_iff_epi_imageToKernel` | `S.Exact ↔ Epi (imageToKernel S.f S.g S.zero)` | Same as above but for the standard `imageToKernel` (not primed variant). |
| `exact_iff_isIso_imageToKernel` | `S.Exact ↔ IsIso (imageToKernel S.f S.g S.zero)` | Exactness ⇔ the canonical map is an isomorphism. |
| `exact_iff_image_eq_kernel` | `S.Exact ↔ imageSubobject S.f = kernelSubobject S.g` | Core characterization: exactness ⇔ image = kernel as subobjects. |
| `exact_iff_of_forks` | Uses universal properties of kernel/cokernel forks to reduce exactness to a single equation. | Enables proving exactness via universal properties. |
| `Exact.isLimitImage` | `S.Exact → IsLimit (KernelFork.ofι (Abelian.image.ι S.f) …)` | If exact, then `image.ι f` satisfies the universal property of `ker(g)`. |
| `Exact.isLimitImage'` | Refines `isLimitImage` using `Limits.image.ι`. | Connects abelian image with categorical image. |
| `Exact.isColimitCoimage` | `S.Exact → IsColimit (CokernelCofork.ofπ (Abelian.coimage.π S.g) …)` | Dually, `coimage.π g` is the cokernel of `f`. |
| `Exact.isColimitImage` | `S.Exact → IsColimit (CokernelCofork.ofπ (Limits.factorThruImage S.g) …)` | Factor through image gives cokernel. |
| `exact_kernel`, `exact_cokernel` | `ShortComplex.mk (kernel.ι f) f zero`.Exact, etc. | Standard exact sequences from kernels/cokernels. |
| `exact_iff_exact_image_ι`, `exact_iff_exact_coimage_π` | Exactness equivalent to exactness of image/coimage variants. | Allows reduction to “standard” forms via isomorphisms. |
| `Abelian.tfae_mono`, `Abelian.tfae_epi` | `TFAE [Mono f, kernel.ι f = 0, Exact 0 f]`, etc. | Characterizations of monos/epis via exactness. |
| `reflects_exact_of_faithful` | Faithful `F` preserving zero morphisms reflects exactness. | Key reflection principle for exact sequences. |
| `preservesMonomorphisms_of_map_exact`, `preservesEpimorphisms_of_map_exact` | Functors preserving all exact sequences preserve monos/epis. | Consequences of exactness preservation. |
| `preservesHomology_of_map_exact` | If `F` preserves exactness, then it preserves homology (i.e., kernels & cokernels of composable pairs). | Central result: exactness preservation ⇒ homology preservation. |
| `preservesHomology_of_preservesMonos_and_cokernels`, `preservesHomology_of_preservesEpis_and_kernels` | Alternative sufficient conditions for homology preservation. | Useful for verifying homology preservation without full exactness. |

---

### 🔹 **Naming Conventions**

- **Prefixes:**
  - `exact_`: Theorems about exactness of short complexes.
  - `isLimitImage`, `isColimitCoimage`: Universal properties of image/coimage under exactness.
  - `preserves*`, `reflects*`: Functors preserving/reflectiong categorical properties.
  - `Abelian.*`: General abelian-categorical lemmas (e.g., `Abelian.tfae_mono`).
- **Suffixes:**
  - `_iff_*`: Biconditional characterizations.
  - `_mono`, `_epi`: Monomorphism/epimorphism-related lemmas.
  - `_image`, `_coimage`: Related to image/coimage constructions.
  - `_ι`, `_π`: Refers to inclusion/projection morphisms (e.g., `kernel.ι`, `cokernel.π`).
- **`imageToKernel`, `imageToKernel'`**: Canonical morphism from image to kernel; primed version is a variant used in intermediate proofs.

---

### 🔹 **Tactic Stack**

| Tactic | Usage Frequency | Purpose |
|--------|------------------|---------|
| `tfae_have`, `tfae_finish` | High | Proving equivalence of multiple statements (TFAE = The Following Are Equivalent). |
| `rw`, `simp`, `dsimp` | Very High | Rewriting and simplification using definitions, lemmas, and β-reduction. |
| `aesop_cat`, `aesop` | Medium | Automated reasoning in categories (e.g., diagram chasing, composition simplifications). |
| `apply`, `intro`, `exact`, `refine` | High | Standard proof construction. |
| `ext` | Medium | Extensionality for morphisms/subobjects. |
| `cancel_mono`, `cancel_epi` | Medium | Cancellation lemmas for monos/epis. |
| `infer_instance` | Medium | Typeclass inference (e.g., `Epi`, `Mono`, `IsIso`). |
| `obtain ⟨k, hk⟩ := ...` | Medium | Existential destructuring (e.g., from universal properties). |
| `reassoc_of% hS` | Low | Custom reassociation tactic (likely from `Mathlib.Tactic`). |

---

### 🔹 **Proof Logic**

- **Structure of proofs:**
  - Most results follow a pattern:  
    `exact_iff_*` → reduce to known universal properties (kernel/cokernel) → use `kernel.lift`, `cokernel.desc`, `factorThruImage`, `factorThruCoimage`.
  - For universal properties (`isLimitImage`, `isColimitCoimage`, etc.):  
    Use `IsLimit.ofι`, `IsColimit.ofπ`, then verify universal property via `kernel.lift_ι`, `cokernel.π_desc`, and exactness hypothesis.
  - For functor properties (`preserves*`, `reflects*`):  
    Map the exactness condition via `F.map`, use faithfulness or preservation assumptions, then pull back or push forward via universal properties.
  - `tfae` proofs use bidirectional implications between standard characterizations (e.g., `Mono f ↔ kernel.ι f = 0 ↔ Exact 0 f`).

- **Common proof strategy:**
  1. Reduce to a canonical morphism (e.g., `imageToKernel`).
  2. Show it’s mono + epi ⇒ iso (in abelian categories).
  3. Use subobject equality or universal properties to conclude.

---

### 🔹 **Imports & Scope**

| Module | Role |
|--------|------|
| `Mathlib.Algebra.Homology.ImageToKernel` | Core definitions of `imageToKernel`, related morphisms. |
| `Mathlib.Algebra.Homology.ShortComplex.Exact` | Definitions of `ShortComplex`, `Exact`, and basic lemmas. |
| `Mathlib.CategoryTheory.Abelian.Opposite` | Abelian category properties, opposites. |
| `Mathlib.CategoryTheory.Limits.Preserves.Shapes.*` | Preservation of zero objects, kernels, cokernels, equalizers. |
| `Mathlib.CategoryTheory.Adjunction.Limits` | Limits/colimits preserved by adjoints (used implicitly). |
| `Mathlib.Tactic.TFAE` | For proving equivalence of multiple statements. |

**Domain Scope:**  
This file formalizes foundational homological algebra in **abelian categories**, focusing on:
- Exact sequences and their characterizations,
- Image/coimage factorizations,
- Universal properties of kernels/cokernels,
- Behavior of functors (preservation/reflection of exactness, monos/epis, homology).

---

Let me know if you'd like a **diagrammatic summary**, **proof sketch templates**, or a **Lean-to-natural-language glossary** for this module.