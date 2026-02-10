### Technical Metadata Brief: `CategoryTheory.Subobject`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Subobject X` | `Type u₁` (quotient of `MonoOver X` by isomorphism) | Defines the *category of subobjects* of `X`, i.e., isomorphism classes of monos into `X`. |
| `mk f` | `f : A ⟶ X [Mono f] → Subobject X` | Constructor for a subobject from a monomorphism. |
| `arrow P` | `P : Subobject X → (P : C) ⟶ X` | The canonical monomorphism from the underlying object of `P` to `X`. |
| `underlying P` | `P : Subobject X → C` | Coercion to the ambient object (via choice of representative). |
| `ofLE X Y h` | `h : X ≤ Y → (X : C) ⟶ (Y : C)` | Witness morphism for inequality of subobjects. |
| `ofLEMk X f h`, `ofMkLE f X h`, `ofMkLEMk f g h` | Various morphisms witnessing inequalities involving `mk f`. | Technical tools for manipulating inequalities between subobjects and `mk f`. |
| `eq_of_comm i w` | `i : X ≅ Y, w : i.hom ≫ Y.arrow = X.arrow ⇒ X = Y` | Extensionality principle: equality of subobjects via commuting iso. |
| `pullback f` | `f : X ⟶ Y [HasPullbacks C] → Subobject Y ⥤ Subobject X` | Pullback functor along `f`, precomposing monos with pullback. |
| `map f` | `f : X ⟶ Y [Mono f] → Subobject X ⥤ Subobject Y` | Pushforward along monomorphism `f`. |
| `exists f` | `f : X ⟶ Y [HasImages C] → Subobject X ⥤ Subobject Y` | Image functor (existential quantification), generalizes `map`. |
| `mapIsoToOrderIso e` | `e : X ≅ Y → Subobject X ≃o Subobject Y` | Order-isomorphism between subobject lattices of isomorphic objects. |
| `mapPullbackAdj f` | `map f ⊣ pullback f` | `map f` is left adjoint to `pullback f` when `f` mono and pullbacks exist. |
| `existsPullbackAdj f` | `exists f ⊣ pullback f` | `exists f` is left adjoint to `pullback f` when images and pullbacks exist. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `mk_`: constructors from monos (`mk`, `mk_le_mk_of_comm`, `mk_arrow`, etc.)
  - `ofLE_`, `ofLEMk_`, `ofMkLE_`, `ofMkLEMk_`: morphisms witnessing inequalities.
  - `underlying_`, `representative_`: choice-based constructions.
  - `pullback_`, `map_`, `exists_`: functors induced by categorical operations.
  - `isoOfEq_`, `isoOfEqMk_`, etc.: isos induced by equalities.

- **Suffixes**:
  - `_comp`: composition lemmas (e.g., `ofLEMk_comp`, `ofMkLEMk_comp`).
  - `_refl`, `_id`: identity cases (`ofLE_refl`, `pullback_id`, `map_id`).
  - `_assoc`, `_iso`: associativity or iso-related properties.
  - `_hom`, `_inv`: component-wise hom/inv in iso lemmas.

- **Pattern**:
  - `ofX_Y_Z_h` for morphisms between objects underlying subobjects, where `X`, `Y`, `Z` indicate whether they are `LE`, `Mk`, or mixed.
  - `eq_of_...` for extensionality lemmas.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `induction' ... using Quotient.inductionOn'` | Eliminate subobject variables by lifting to monos. |
| `simp` / `simp only [...]` | Simplify using `@[simp]` lemmas (e.g., `arrow_congr`, `underlying_arrow`, `mk_arrow`). |
| `ext` | Extensionality for morphisms (especially using `eq_of_comp_arrow_eq`). |
| `apply_fun` | Apply a functor to both sides of an equation (e.g., in `mapIsoToOrderIso`). |
| `congr 1` / `congr'` | Prove equality of morphisms by congruence (common in `ofLE_comp_ofLE`-style lemmas). |
| `rw [assoc, Iso.hom_inv_id_assoc]` | Reassociate compositions using categorical identities. |
| `apply (cancel_mono ...).mp` | Cancel monos on left/right. |
| `convert` + `exact` | Prove equality up to iso (e.g., in `lowerEquivalence`). |
| `aesop` (implied) | Likely used in background for routine category-theoretic reasoning. |

---

#### **4. Proof Logic**

- **Inductive structure**: Most proofs proceed by:
  1. **Induction on subobjects** using `Quotient.inductionOn'` (since `Subobject X` is a quotient of `MonoOver X`).
  2. **Lifting to monos** (`f : A ⟶ X [Mono f]`) and proving properties for `mk f`.
  3. **Using thinness of `MonoOver X`**: morphisms between objects in `MonoOver X` are unique when they exist, so many proofs reduce to verifying commutativity of diagrams.
  4. **Leveraging `ThinSkeleton`**: since `Subobject X` is skeletal, functors between them are determined up to equality (not just isomorphism), enabling clean reasoning about equality of functors.

- **Common proof patterns**:
  - To prove `P = Q`, construct a commuting iso `P ≅ Q` and apply `eq_of_comm`.
  - To prove `P ≤ Q`, construct a morphism `P.arrow → Q.arrow` commuting with arrows and apply `le_of_comm`.
  - To prove `F = G` for functors `F, G : Subobject X ⥤ Subobject Y`, show `F (mk f) = G (mk f)` for all `f`, then use induction.

- **Adjunctions**: Proven via `lowerAdjunction`, reducing to known adjunctions on `MonoOver`.

---

#### **5. Imports**

| Module | Role |
|--------|------|
| `Mathlib.CategoryTheory.Subobject.MonoOver` | Defines `MonoOver X`, the category of monos into `X`. |
| `Mathlib.CategoryTheory.Skeletal` | Provides `ThinSkeleton`, used to quotient `MonoOver X` by iso. |
| `Mathlib.CategoryTheory.ConcreteCategory.Basic` | For coercion `P : C` and `arrow P`. |
| `Mathlib.Tactic.ApplyFun` | For applying functors to equations. |
| `Mathlib.Tactic.CategoryTheory.Elementwise` | Enables `elementwise` attribute for `simp` lemmas. |
| `Mathlib.CategoryTheory.Limits` | For pullbacks, images, limits, etc. |

---

#### **6. Summary**

This file formalizes the **subobject classifier infrastructure** in a general category `C`, building on `MonoOver X` and using `ThinSkeleton` to obtain a *partial order* on isomorphism classes of monos. It provides:

- A clean API for subobjects (`mk`, `arrow`, `≤`, `=`, `isoOfEq`, etc.)
- Functors induced by categorical operations: `pullback`, `map`, `exists`
- Adjunctions (`map ⊣ pullback`, `exists ⊣ pullback`)
- Equivalences for isomorphic objects (`mapIsoToOrderIso`)
- Technical lemmas for manipulating inequalities and equalities via commuting diagrams.

The development is designed to be **practical for concrete categories** (e.g., `Type`, `Group`, `Top`) while remaining general, and emphasizes **elementwise reasoning** and **simp-normalization** for usability.

--- 

Let me know if you'd like a diagrammatic summary or a focus on a specific section (e.g., `pullback`, `exists`, or lattice structure).