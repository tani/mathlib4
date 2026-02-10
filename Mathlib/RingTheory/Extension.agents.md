### Technical Metadata Brief: `Algebra.Extension` Module (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Algebra.Extension` | `Type u → Type v → Type w → Type w` (structure) | Represents an extension of an `R`-algebra `S`: a surjective algebra map `P →ₐ[R] S`. |
| `Algebra.Extension.ofSurjective` | `(f : P →ₐ[R] S) → Function.Surjective f → Extension R S` | Constructs an extension from a surjective algebra homomorphism. |
| `Algebra.Extension.self` | `Extension R S` | The trivial extension: identity map `S → S`. |
| `Algebra.Extension.localization` | `Extension R S → Extension R S'` | Localizes an extension along a submonoid `M ⊆ S`, yielding an extension over localized algebra `Sₘ`. |
| `Algebra.Extension.baseChange` | `Extension R S → Extension T (T ⊗[R] S)` | Base change of an extension along `R → T`, producing a `T`-extension over the tensor product. |
| `Algebra.Extension.Hom` | `Hom P P'` (structure) | Morphism between extensions: a ring homomorphism `P.Ring →+* P'.Ring` commuting with structure maps. |
| `Algebra.Extension.Hom.id` | `Hom P P` | Identity morphism on an extension. |
| `Algebra.Extension.Hom.comp` | `Hom P' P'' → Hom P P' → Hom P P''` | Composition of extension homs. |
| `Algebra.Extension.ker` | `Ideal P.Ring` | Kernel of the structure map `P.Ring → S`. |
| `Algebra.Extension.Cotangent` | `Type _` | Type synonym for `P.ker.Cotangent = I / I²`, where `I = ker(P → S)`. |
| `Algebra.Extension.Cotangent.module` | `Module S P.Cotangent` | `S`-module structure on the cotangent space via section `σ`. |
| `Algebra.Extension.Cotangent.map` | `Hom P P' → P.Cotangent →ₗ[S] P'.Cotangent` | Induced linear map on cotangent spaces from a hom of extensions. |
| `Algebra.Extension.Cotangent.map_id` | `map (id P) = id` | Identity preservation for cotangent maps. |
| `Algebra.Extension.Cotangent.map_comp` | `map (g.comp f) = map g ∘ map f` | Functoriality of cotangent map. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `algebraMap_σ`: property of section `σ` w.r.t. algebra map.
  - `σ_`: section-related (e.g., `σ_smul`, `σ_injective`).
  - `of_`: construction from data (e.g., `ofSurjective`, `of_val`).
  - `val_`: projection from type synonym (e.g., `val_add`, `val_smul`).
  - `mk_`: quotient/map construction (e.g., `mk_surjective`, `mk`).
  - `map_`: induced maps (e.g., `map_id`, `map_comp`, `map_mk`).

- **Suffixes**:
  - `_smul`, `_add`, `_zero`: action properties.
  - `_surjective`, `_injective`, `_ext`: categorical properties.
  - `_comp`, `_id`: composition/identity lemmas.

- **Structure fields**:
  - `Ring`, `σ`, `algebraMap_σ`: core extension data.
  - `toRingHom`, `toRingHom_algebraMap`, `algebraMap_toRingHom`: hom field names.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage Pattern |
|--------|---------------|
| `simp` | Simplifying algebraic expressions, especially with `algebraMap_σ`, `σ_smul`, `val_`, `mk_`, `map_`. |
| `ext` | Extensionality for homs, cotangent elements, and linear maps. |
| `rw` | Rewriting using `algebraMap_σ`, `smul_def`, `IsScalarTower.algebraMap_eq`, etc. |
| `congr` | Proving equality of composite maps or module actions. |
| `obtain ⟨x, rfl⟩ := ...` | Eliminating surjectivity or existential hypotheses (e.g., `Cotangent.mk_surjective`). |
| `conv` | Convolution-style rewriting (e.g., `conv_rhs => rw [...]`). |
| `have := ...; simpa` | Intermediate lemma + simplification (e.g., `smul_eq_zero_of_mem`). |
| `ring` / `linarith` | Not explicitly used here — algebraic manipulations are mostly `simp`-driven. |
| `aesop` | Not used — proofs are explicit and constructive. |

---

#### **4. Proof Logic**

- **Inductive/constructive style**: Most definitions are *explicitly constructed* (e.g., `ofSurjective`, `localization`, `baseChange`) using choice (`choose`) or localization universal properties.
- **Section-based module actions**: The `S`-module structure on `P.Cotangent` is defined via a section `σ : S → P.Ring`, and module axioms are verified by reducing to `P.Ring` and using `smul_eq_zero_of_mem` for kernel elements.
- **Functoriality via lifting**: Maps on cotangent spaces are induced via `Ideal.mapCotangent`, requiring compatibility of homs with the algebra maps.
- **Type synonym trick**: `Cotangent` is a type synonym to avoid definitional diamonds when acting through `S`, with `val`/`of` as identity equivalences.
- **Local simplification**: `attribute [local simp] RingHom.mem_ker` indicates heavy use of kernel membership simplifications.

---

#### **5. Imports & Scope**

| Import | Purpose |
|--------|---------|
| `Mathlib.LinearAlgebra.TensorProduct.RightExactness` | Used in `baseChange` to prove surjectivity of `T ⊗[R] P.Ring → T ⊗[R] S`. |
| `Mathlib.RingTheory.Ideal.Cotangent` | Provides `Ideal.toCotangent`, `Ideal.mapCotangent`, and cotangent module structure. |

**Domain**:  
- Commutative algebra, specifically *extensions of algebras*, *localization*, *base change*, and *cotangent spaces* (as in deformation theory or étale cohomology).  
- Built on top of `Mathlib`’s algebraic hierarchy: `Algebra`, `IsScalarTower`, `Localization`, `TensorProduct`.

---

### Summary

This module formalizes a categorical framework for algebra extensions, their morphisms, and the associated cotangent complex in degree 0 (`I/I²`). It emphasizes *constructive* definitions (sections, localization, base change), *explicit module structures* via sections, and *functoriality* of cotangent maps. The naming and proof style reflect Lean’s emphasis on clarity, modularity, and compatibility with `Mathlib`’s algebraic infrastructure.