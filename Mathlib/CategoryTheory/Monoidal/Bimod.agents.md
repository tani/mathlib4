### Technical Brief: `Bimod` Category in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `Bimod A B` | **Structure**: A bimodule object over monoids `A`, `B` in a monoidal category `C`. Consists of an object `X : C`, left/right actions satisfying unit, associativity, and middle-interchange laws. |
| `Hom M N` | **Structure**: Morphism of bimodules: a morphism `f : M.X ⟶ N.X` commuting with left/right actions. |
| `id' M`, `comp f g` | **Definitions**: Identity and composition in `Bimod A B`, making it a category. |
| `isoOfIso f f_left_act_hom f_right_act_hom` | **Definition**: Constructs a bimodule isomorphism from an iso of underlying objects, checking only forward compatibility. |
| `regular A` | **Definition**: `A` regarded as a bimodule over itself via multiplication. |
| `forget : Bimod A B ⥤ C` | **Functor**: Forgets bimodule structure, maps to ambient category. |
| `TensorBimod.X P Q` | **Noncomputable def**: Underlying object of tensor product of bimodules `P : Bimod R S`, `Q : Bimod S T`, defined as a coequalizer: <br> `coequalizer (P.actRight ▷ Q.X) ((α_ _ _ _).hom ≫ (P.X ◁ Q.actLeft))` |
| `TensorBimod.actLeft`, `TensorBimod.actRight` | **Noncomputable defs**: Left/right actions on `TensorBimod.X P Q`, constructed via preserved coequalizers and colimit maps. Verified to satisfy bimodule axioms (`one_act_left'`, `left_assoc'`, etc.). |
| `TensorBimod.tensorBimod M N` | **Definition**: The tensor product bimodule `M ⊗_S N`, combining `X`, `actLeft`, `actRight`, and axioms. |
| `whiskerLeft M f`, `whiskerRight f N` | **Definitions**: Left/right whiskering of bimodule morphisms over tensor product. Verified to be bimodule morphisms. |
| `AssociatorBimod.hom`, `AssociatorBimod.inv` | **Noncomputable defs**: Underlying maps of the associator isomorphism `(P ⊗ Q) ⊗ L ≅ P ⊗ (Q ⊗ L)`, defined via coequalizer descent. Verified to be inverses (`hom_inv_id`, `inv_hom_id`) and compatible with actions (`hom_left_act_hom'`, `hom_right_act_hom'`). |
| `LeftUnitorBimod.hom`, `LeftUnitorBimod.inv` | **Defs**: Left unitor isomorphism `R ⊗_R M ≅ M`, using `regular R`. Verified to be inverses and action-compatible. |
| `RightUnitorBimod.hom`, `RightUnitorBimod.inv` | **Defs**: Right unitor isomorphism `M ⊗_S S ≅ M`. Verified similarly. |

**Key Theorems (axiom verifications)**:
- `one_actLeft`, `left_assoc`, `actRight_one`, `right_assoc`, `middle_assoc` — for `Bimod` structure.
- `one_act_left'`, `left_assoc'`, `actRight_one'`, `right_assoc'`, `middle_assoc'` — for tensor product bimodule.
- `hom_left_act_hom'`, `hom_right_act_hom'` — for associator/unitor morphisms.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `actLeft`, `actRight`: Left/right actions.
  - `one_`, `left_`, `right_`, `middle_`: Unit, associativity, and interchange laws.
  - `whiskerLeft`, `whiskerRight`: Morphism whiskering.
  - `hom`, `inv`: Forward/inverse components of isomorphisms.
  - `π`, `desc`, `colimMap`: Coequalizer morphisms.
  - `iso`, `invIso`: Isomorphism components.

- **Suffixes**:
  - `'` (prime): Derived or lifted versions of axioms (e.g., `left_assoc` → `left_assoc'`).
  - `Aux`: Auxiliary morphism used in coequalizer descent (e.g., `homAux`, `invAux`).
  - `desc`: Descending map from coequalizer.
  - `π`: Coequalizer cone leg.

- **Pattern**:
  - `X P Q`, `actLeft P Q`, `hom P Q L`: Parameterized by bimodules.
  - `tensorLeft X`, `tensorRight X`: Used in coequalizer preservation assumptions.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `aesop_cat`, `simp`, `simp only`, `dsimp`: Simplification and definitional reasoning.
- `rw`, `erw`: Rewriting (latter for eta-expansion-sensitive rewrites).
- `refine`, `apply`, `exact`: Proof construction.
- `cancel_mono`, `cancel_epi`: Cancellation lemmas for monos/epis (common in coequalizer-based arguments).
- `monoidal`, `slice_lhs`, `slice_rhs`: Monoidal category reasoning (naturality, associators, unitors).
- `ext`, `ext x`: Extensionality for morphisms/structures.
- `Iso.inv_hom_id`, `Iso.hom_inv_id`: Isomorphism identities.
- `Category.assoc`, `Category.comp_id`, `whisker_exchange`, `associator_*_naturality_*`: Monoidal lemmas.

---

#### **4. Proof Logic**

- **Structure**: Proofs follow a pattern:
  1. **Define** object/morphism via coequalizers (using `PreservesCoequalizer.iso`, `colimMap`).
  2. **Verify axioms** (e.g., unit/associativity) by:
     - Pulling back along `coequalizer.π` (using `cancel_epi`/`cancel_mono`).
     - Applying naturality of associators/unitors (`associator_*_naturality_*`, `leftUnitor_naturality`, etc.).
     - Using `whisker_exchange`, `comp_whiskerRight`, `MonoidalCategory.whiskerLeft_comp`.
     - Reducing to known bimodule axioms (`left_assoc`, `middle_assoc`, etc.).
  3. **Isomorphism verification**:
     - Define forward/inverse via coequalizer descent (`coequalizer.desc`).
     - Prove inverses using `coequalizer.hom_ext` and cancellation.
     - Check action compatibility via naturality and coequalizer properties.

- **Inductive/structural pattern**:
  - **Coequalizer-based constructions** dominate (tensor product, associator, unitors).
  - **Preservation assumptions** (`PreservesColimitsOfSize`) enable descent through coequalizers.
  - **Monoidal coherence** handled via `monoidal` tactic + manual naturality steps.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.CategoryTheory.Bicategory.Basic` | Bicategorical context (e.g., `Mon_ C`, bicategory of monoids/bimodules). |
| `Mathlib.CategoryTheory.Monoidal.Mon_` | Monoid objects in a monoidal category (`Mon_ C`). |
| `Mathlib.CategoryTheory.Limits.Preserves.Shapes.Equalizers` | Coequalizer preservation (used for tensor product of bimodules). |

**Additional context**:
- Assumes `C` is a monoidal category with coequalizers.
- Requires `tensorLeft X` and `tensorRight X` to preserve colimits of size `0` (i.e., coequalizers).
- Built on top of `CategoryTheory`, `Limits`, and `MonoidalCategory`.

---

### Summary

This file formalizes the **2-category of monoid objects and bimodules** in a monoidal category `C`, assuming `C` has coequalizers and tensor functors preserve them. It constructs:
- The category `Bimod A B`,
- A tensor product `⊗_S` on bimodules,
- Associator, left/right unitor isomorphisms,
- Verifying all coherence laws (pentagon, triangle, etc.).

The proofs rely heavily on **coequalizer descent**, **monoidal naturality**, and **cancellation lemmas**, with heavy use of `monoidal` tactic for diagrammatic reasoning.