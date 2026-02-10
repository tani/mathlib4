Here's a **structured technical brief** extracted from the provided Lean 4 file, focusing on formal metadata relevant for building a Domain-Specific AI Agent in the context of algebraic geometry (specifically, the category of schemes):

---

### 🔹 **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `Scheme` | A `LocallyRingedSpace` equipped with a proof that every point has an open neighborhood isomorphic to `Spec R` for some commutative ring `R`. |
| `Scheme.Hom` | Morphism of schemes = morphism of underlying locally ringed spaces. |
| `Scheme.Opens X` | Open subsets of a scheme `X`, as a type. |
| `Γ(X, U)` | Global sections over open `U ⊆ X`, i.e., `X.presheaf.obj (op U)`. |
| `f.app U` | Induced map on sections: `Γ(Y, U) → Γ(X, f ⁻¹ᵁ U)` for `f : X → Y`. |
| `f.appLE U V e` | Induced map `Γ(Y, U) → Γ(X, V)` when `V ≤ f ⁻¹ᵁ U`. |
| `f.stalkMap x` | Local ring homomorphism `Y.presheaf.stalk (f x) → X.presheaf.stalk x`. |
| `Spec R` | Spectrum of a commutative ring `R`, regarded as a scheme via its structure sheaf. |
| `Spec.map f` | Induced morphism of schemes `Spec S → Spec R` from ring map `f : R → S`. |
| `Scheme.Spec : CommRingCatᵒᵖ ⥤ Scheme` | Contravariant functor from commutative rings to schemes. |
| `Γ : Schemeᵒᵖ ⥤ CommRingCat` | Global sections functor (right adjoint to `Spec`). |
| `ΓSpecIso : Γ(Spec R, ⊤) ≅ R` | Isomorphism of global sections of `Spec R` with `R`. |
| `basicOpen f` | Open subset where section `f` does not vanish. |
| `zeroLocus s` | Closed subset where all sections in `s` vanish. |
| `Spec.map_presheaf_map_eqToHom` | Compatibility of `Spec.map` with equality-of-opens induced by `eqToHom`. |
| `germ_eq_zero_of_pow_mul_eq_zero` | If `sⁿ·f = 0` and `s` is invertible at `x`, then `f` vanishes at germ `x`. |

**Notable Theorems (Proof-Oriented):**
- `Hom.ext`, `Hom.ext'`: Extensionality lemmas for scheme morphisms.
- `Spec.map_id`, `Spec.map_comp`: `Spec` is a contravariant functor.
- `ΓSpecIso_naturality`: Naturality of the `Γ ⊣ Spec` unit/counit isomorphism.
- `basicOpen_eq_of_affine`: For `Spec R`, `basicOpen` corresponds to classical distinguished open subsets.

---

### 🔹 **2. Naming Conventions**

| Pattern | Meaning / Example |
|--------|-------------------|
| `is_` | Predicate (e.g., `IsLocalHom`, `IsIso`) |
| `mem_` | Membership in a set (e.g., `mem_basicOpen`, `mem_zeroLocus_iff`) |
| `preimage_` | Pullback of open sets along base map (e.g., `preimage_basicOpen`, `preimage_iSup`) |
| `app`, `appTop`, `appLE` | Section maps induced by a scheme morphism (`app` for open `U`, `appTop` for `U = ⊤`, `appLE` for restricted domain). |
| `stalkMap` | Map on stalks induced by a scheme morphism. |
| `homeoOfIso`, `homeomorph` | Homeomorphism induced by an isomorphism or invertible morphism. |
| `basicOpen`, `zeroLocus` | Standard constructions from sections. |
| `Spec.map`, `Spec.map_id`, `Spec.map_comp` | Functoriality of `Spec`. |
| `Γ_obj`, `Γ_map` | Action of global sections functor on objects/morphisms. |
| `eqToHom_*`, `congr_*`, `homOfLE_*` | Coherence isomorphisms for equality of types/proofs. |

---

### 🔹 **3. Tactic Stack**

| Tactic | Usage Frequency / Purpose |
|--------|----------------------------|
| `rfl` | Very frequent: definitional equalities, especially in `simp`-lemmas. |
| `simp` / `simp_rw` | Extremely frequent: simplification using `@[simp]` lemmas (e.g., `comp_app`, `preimage_comp`, `basicOpen_mul`). |
| `rw` / `erw` | Frequent: rewriting using naturality, associativity, and coherence lemmas. |
| `cases` | Used in proofs of extensionality (`Hom.ext`, `Hom.ext'`) and equality of morphisms. |
| `convert` | Used in `basicOpen_eq_of_affine'` to reduce to a known case. |
| `dsimp`, `subst`, `congr` | Used in equality reasoning, especially with `eqToHom`, `congr`, and `homOfLE`. |
| `exact`, `refine`, `apply` | Common in manual proof steps (e.g., `germ_eq_zero_of_pow_mul_eq_zero`). |
| `ext` | Extensionality for morphisms, functions, sheaves. |
| `convert` + `simp` | Used to align terms up to definitional equality (e.g., `Spec.map_presheaf_map_eqToHom`). |
| `have`, `suffices` | Common in intermediate reasoning (e.g., `germ_eq_zero_of_pow_mul_eq_zero`). |

---

### 🔹 **4. Proof Logic & Strategy**

- **Extensionality**: Morphisms of schemes are often proven equal via `Hom.ext` or `Hom.ext'`, reducing to base map equality and sheaf component equality.
- **Functoriality**: Proofs for `Spec.map_id`, `Spec.map_comp`, etc., use `Scheme.Hom.ext'` and known properties of `Spec.locallyRingedSpaceMap`.
- **Naturality**: Many lemmas (e.g., `ΓSpecIso_naturality`, `naturality`, `appLE_map`) follow from naturality of sheaf maps and prefunctoriality of open maps.
- **Local-to-Global Reasoning**: Stalk-level properties (e.g., `stalkMap_germ`, `germ_eq_zero_of_pow_mul_eq_zero`) often reduce to sheaf-level properties via germs and localization.
- **Equality Handling**: Heavy use of `eqToHom`, `congr`, `homOfLE`, and `eqToHom_*` lemmas to manage equality-of-opens and induced maps.
- **Isomorphism Reasoning**: `IsIso` instances and inverses are managed via `inv`, `asIso`, and coherence lemmas like `inv_app`, `stalkMap_hom_inv`.

---

### 🔹 **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.AlgebraicGeometry.Spec` | Defines `Spec R` as a locally ringed space, structure sheaf, etc. |
| `Mathlib.Algebra.Category.Ring.Constructions` | Provides constructions in `CommRingCat`, e.g., localization, stalks. |
| `Mathlib.CategoryTheory.Elementwise` | Enables elementwise reasoning in categories (e.g., `f x`, `f (g x)`). |

**Key Categories & Structures Used:**
- `LocallyRingedSpace`, `SheafedSpace`, `RingedSpace`
- `CommRingCat`, `TopCat`, `Cat`
- `Presheaf`, `Sheaf`, `Opens`, `stalk`, `germ`
- `IsLocalRing`, `IsIso`, `Algebra`

---

Let me know if you'd like this exported as a JSON/YAML schema, or if you'd like a **mini-DSL** for querying this metadata programmatically (e.g., for an AI agent).