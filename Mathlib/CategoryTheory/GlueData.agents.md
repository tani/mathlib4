### Technical Metadata Brief: `GlueData` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `GlueData C` | Structure encoding gluing data for a category `C`: index type `J`, objects `U i`, intersection objects `V (i,j)`, monic gluing maps `f i j : V i j ⟶ U i`, transition maps `t i j : V i j ⟶ V j i`, and coherence conditions (`t'`, `cocycle`, etc.). |
| `GlueData'.f' D i j` | Derived morphism `V' i j → U i` from `GlueData'`, handling diagonal case `i = j` via `U i`. |
| `GlueData.ofGlueData' D` | Conversion from `GlueData'` (where `V i j` is only defined for `i ≠ j`) to full `GlueData`. |
| `D.diagram` | Multispan diagram in `C` encoding gluing data: left leg `V i j → U i`, right leg `V i j → U j` via `t i j ≫ f j i`. |
| `D.glued` | Colimit (multicoequalizer) of `D.diagram`, representing the glued object. |
| `D.ι i : U i ⟶ D.glued` | Canonical maps from each `U i` into the glued object. |
| `D.π : ∐ U i ⟶ D.glued` | Colimit cocone map from the coproduct to the glued object. |
| `D.vPullbackCone i j` | Pullback cone over `ι i` and `ι j`, built from `f i j` and `t i j ≫ f j i`. |
| `D.mapGlueData F` | Image of `GlueData D` under a functor `F : C ⥤ C'`, assuming `F` preserves required pullbacks. |
| `D.diagramIso F` | Natural isomorphism between the diagram of `D` composed with `F` and the diagram of `mapGlueData`. |
| `D.gluedIso F` | Isomorphism `F.obj D.glued ≅ (D.mapGlueData F).glued`, assuming `F` preserves the colimit of the diagram. |
| `D.ι_gluedIso_hom`, `D.ι_gluedIso_inv` | Compatibility of `ι` with `gluedIso`. |
| `D.vPullbackConeIsLimitOfMap` | If `F` reflects pullbacks and `F(vPullbackCone)` is a limit, then `vPullbackCone` is a limit. |
| `D.ι_jointly_surjective` | If `F : C → Type` preserves colimits and required limits, then `ι` is jointly surjective (in `Type`). |
| `GlueData'.t''` | Construction of `t'` for `GlueData.ofGlueData'`, handling diagonal cases via `eqToHom`. |

**Theorems (selected):**
- `t_inv`: `t i j` is an isomorphism with inverse `t j i`.
- `t'_isIso`, `t'_inv`: `t' i j k` is an isomorphism.
- `t'_comp_eq_pullbackSymmetry`: Cocycle condition reformulated.
- `types_π_surjective`, `types_ι_jointly_surjective`: Surjectivity properties in `Type`.
- `ι_gluedIso_hom`, `ι_gluedIso_inv`: Naturality of `ι` w.r.t. `gluedIso`.

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `f_`: gluing maps (`f i j : V i j ⟶ U i`)
  - `t_`: transition maps (`t i j : V i j ⟶ V j i`)
  - `t'_`: induced maps on pullbacks (`t' i j k : pullback(f i j, f i k) ⟶ pullback(f j k, f j i)`)
  - `ι_`: canonical maps into the glued object (`ι i : U i ⟶ glued`)
  - `π_`: coproduct-to-glued map (`π : ∐ U i ⟶ glued`)
  - `vPullbackCone_`: cones over `ι i`, `ι j`
  - `mapGlueData_`, `diagramIso_`, `gluedIso_`: constructions under functors

- **Suffixes:**
  - `_hom`, `_inv`: components of isomorphisms
  - `_eq`, `_fac`, `_cocycle`: coherence conditions
  - `_surjective`, `_jointly_surjective`: surjectivity lemmas
  - `_isIso`, `_mono`, `_hasPullback`: instance properties

- **Special:**
  - `ofGlueData'`: conversion from variant with restricted `V`
  - `f'`, `t''`: internal constructions for `GlueData'`

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `simp` / `simp_rw`: simplification of identities, `t_id`, `t_fac`, `cocycle`, `ι`, `π`, etc.
- `rw` / `erw`: rewriting using lemmas, naturality, isomorphism properties
- `aesop`: automated reasoning for equality chains, especially in `GlueData'.t''` and `ofGlueData'`
- `cases` / `split_ifs`: case analysis on equality `i = j`, used heavily in `GlueData'` constructions
- `ext`: extensionality for pullback morphisms
- `apply`, `exact`, `refine`: proof construction
- `convert`, `subst`: handling definitional equalities and `HEq`
- `infer_instance`: synthesizing `Mono`, `IsIso`, `HasPullback`, `HasMulticoequalizer`
- `reassoc`, `elementwise`: custom attributes for associativity and elementwise reasoning (via `CategoryTheory.Elementwise`)
- `cancel_mono`, `Mono.right_cancellation`: monomorphism cancellation

---

#### **4. Proof Logic**

- **Structure Proofs:**  
  - Define structures with fields and typeclass instances (`Mono`, `IsIso`, `HasPullback`) via `infer_instance`.
  - Use `attribute [simp]`, `[reassoc]`, `[instance]` to automate simplification and reasoning.

- **Isomorphism Proofs:**  
  - Show `t i j` is iso by constructing inverse and verifying `t_inv`.
  - Use `IsIso.eq_inv_of_hom_inv_id`, `IsIso.comp_inv_eq`, `Iso.hom_inv_id`, etc.

- **Pullback & Colimit Reasoning:**  
  - Leverage `PreservesLimit`, `PreservesColimit`, `ReflectsLimit` to transfer (co)limits.
  - Use `isLimitOfReflects`, `isLimitMapConePullbackConeEquiv`, `hasColimitOfIso`.

- **Diagonal Handling (`GlueData'`):**  
  - Use `if h : i = j then ... else ...` and `eqToHom` to extend definitions to `i = j`.
  - Prove properties by case analysis (`split_ifs`, `subst`) and simplification.

- **Elementwise Reasoning:**  
  - Use `elementwise` attribute to enable element-style proofs (e.g., `x : F.obj D.glued`), especially in `ι_jointly_surjective`.

---

#### **5. Imports & Scope**

**Primary Imports:**
- `Mathlib.Tactic.CategoryTheory.Elementwise`: for `elementwise` tactic and elementwise reasoning.
- `Mathlib.CategoryTheory.Limits.Shapes.Multiequalizer`: for `MultispanIndex`, `multicoequalizer`.
- `Mathlib.CategoryTheory.Limits.Constructions.EpiMono`: for `Epi`, `Mono` lemmas.
- `Mathlib.CategoryTheory.Limits.Preserves.Limits`: for `PreservesLimit`, `PreservesColimit`.
- `Mathlib.CategoryTheory.Limits.Shapes.Types`: for `Types`-valued limits/colimits.

**Scope & Universe Settings:**
- `universe v u₁ u₂`: universe polymorphism for categories `C : Type u₁`, `C' : Type u₂`.
- `noncomputable section`: allows noncomputable definitions (e.g., colimits in general categories).
- `open CategoryTheory.Limits`: imports standard limit/colimit notation.

**Key Notation:**
- `∐ D.U`: coproduct over `J`
- `pullback.fst`, `pullback.snd`, `pullback.condition`: pullback projections and universal property.
- `ι i`, `π`, `t i j`, `t' i j k`: standard gluing data maps.
- `Iso.refl`, `pullbackSymmetry`: symmetry of pullbacks.

---

This metadata captures the core formal structure, conventions, and proof patterns of the `GlueData` module, suitable for building a domain-specific AI agent for category-theoretic reasoning in Lean 4.