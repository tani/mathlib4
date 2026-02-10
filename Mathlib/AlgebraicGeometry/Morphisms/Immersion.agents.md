### Technical Brief: Immersions of Schemes in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsImmersion` | `class IsImmersion (f : X ⟶ Y) extends IsPreimmersion f` | Defines a morphism of schemes to be an *immersion* iff it's a preimmersion and its base map has *locally closed range*, plus surjective stalk maps (encoded via `IsPreimmersion`). |
| `coborderRange` | `def coborderRange (f : X.Hom Y) [IsImmersion f] : Y.Opens` | Constructs the largest open subset `U ⊆ Y` containing `range f.base` such that `X` embeds *closedly* into `U`. |
| `liftCoborder` | `def liftCoborder (f : X.Hom Y) [IsImmersion f] : X ⟶ coborderRange f` | The *closed immersion* part of the canonical factorization of `f`. |
| `isImmersion_iff_exists` | `lemma isImmersion_iff_exists : IsImmersion f ↔ ∃ Z, g₁ : X ⟶ Z, g₂ : Z ⟶ Y, IsClosedImmersion g₁ ∧ IsOpenImmersion g₂ ∧ g₁ ≫ g₂ = f` | Main structural theorem: a morphism is an immersion iff it factors as a closed immersion followed by an open immersion. |
| `instance liftCoborder_isClosedImmersion` | `instance [IsImmersion f] : IsClosedImmersion (liftCoborder f)` | Proves the first factor in the factorization is indeed a *closed immersion*. |
| `instance coborderRange_ι_isDominant` | `instance [IsImmersion f] : IsDominant (coborderRange f.ι)` | Shows the open immersion part is *dominant* (i.e., dense image). |
| `instance isLocalAtTarget` | `instance : IsLocalAtTarget @IsImmersion` | Immersions form a *local property at the target*, stable under base change along open immersions and localizations. |
| `instance isStableUnderBaseChange` | `instance : MorphismProperty.IsStableUnderBaseChange @IsImmersion` | Immersions are stable under arbitrary pullbacks (i.e., base change). |
| `instance diagonal_isImmersion` | `instance : IsImmersion (pullback.diagonal f)` | The diagonal morphism of any scheme morphism is an immersion (Stacks Project [01KJ](https://stacks.math.columbia.edu/tag/01KJ)). |

---

#### **2. Naming Conventions**

- **Prefixes & Suffixes**:
  - `is_` / `isImmersion_`: Predicate definitions (`isImmersion_iff_exists`, `isImmersion_eq_inf`).
  - `coborder_`: Related to the *coboundary* or *largest open containing the image where the map is closed*.
  - `lift_`: Factorization components (`liftCoborder`).
  - `of_` / `comp_`: Logical implications and stability properties (`of_comp`, `comp_iff`, `comp_mem`).
  - `diagonal_`: Properties of diagonal morphisms (`diagonal_isImmersion`, `diagonalCoverDiagonalRange`).
  - `ι`: Standard notation for inclusion maps (e.g., `coborderRange.ι`, `Scheme.Opens.ι`).
  - `preimage`, `image`, `range`: Used in topological reasoning about base maps.

- **Suffixes**:
  - `_range`: Refers to `Set.range f.base`.
  - `_ι`: Often denotes the canonical inclusion morphism associated to an open subset.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp_rw`, `simp only`, `simp` | Rewriting definitions (`coborderRange`, `liftCoborder`, `isImmersion_iff`), simplifying compositions and ranges. |
| `rw`, `rwa` | Rewriting equalities, especially using `liftCoborder_ι`, `comp_base`, `range_comp`. |
| `convert`, `exact`, `refine` | Constructing instances (e.g., `IsClosedImmersion`, `IsDominant`) using known lemmas. |
| `apply`, `intro`, `cases` | Standard proof structure, especially in instance proofs. |
| `aesop`, `tauto` | Not present — this file avoids automation-heavy tactics; proofs are mostly manual and structural. |
| `topologically`, `MorphismProperty.*` | Used in stability proofs (e.g., `topologically_isLocalAtTarget'`, `MorphismProperty.IsMultiplicative`, `IsStableUnderBaseChange`). |
| `set_tac` / `set_simp` | Implicit in `Set.range_*`, `Set.preimage_*`, `Set.image_*` lemmas. |
| `infer_instance` | Crucial for typeclass inference (e.g., `inferInstanceAs (IsPreimmersion _)`). |

---

#### **4. Proof Logic & Strategy**

- **Factorization Proof (`isImmersion_iff_exists`)**:
  - **Forward direction**: Construct `Z := coborderRange f`, `g₁ := liftCoborder f`, `g₂ := coborderRange.ι`, then use `liftCoborder_ι` to get the factorization.
  - **Backward direction**: Use `e ▸ inferInstance` — stability under composition of immersions (via `IsPreimmersion` + locally closed range).

- **Instance Proofs**:
  - **Closed immersion of `liftCoborder`**: Show `range (liftCoborder.base)` is closed in `coborderRange`, using `isClosed_preimage_val_coborder` and injectivity of the open immersion.
  - **Dominance of `coborderRange.ι`**: Use `dense_coborder` — the coboundary is dense in its closure.

- **Stability Properties**:
  - **Local at target**: Reduce to checking `IsLocallyClosed (Set.range f)` is local at target using `topologically_isLocalAtTarget'`, leveraging behavior under pullbacks and compositions.
  - **Base change**: Use pullback diagrams, factor `g` as `g₁ ≫ g₂`, and paste pullbacks to show the base-changed morphism factors similarly.

- **Diagonal Immersion**:
  - Use affine covers to reduce to a local statement.
  - Apply `isClosedImmersion_diagonal_restrict_diagonalCoverDiagonalRange`, then use stability under restriction and iso-cancellation.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.AlgebraicGeometry.Morphisms.Preimmersion` | Provides `IsPreimmersion`, foundational class for morphisms with injective/stalk-surjective properties. |
| `Mathlib.AlgebraicGeometry.Morphisms.Separated` | Supplies tools for separated morphisms, embeddings, and related topological properties (e.g., `isClosedEmbedding`, `isLocallyClosed`). |

**Scope**: This file formalizes the theory of *immersions* in the category of schemes, building on:
- Topological properties (locally closed embeddings, open/closed immersions),
- Sheaf-theoretic conditions (surjective stalk maps via `IsPreimmersion`),
- Categorical factorization systems (closed → open),
- Stability under pullbacks and local nature.

It serves as a foundational module for further development (e.g., quasi-compact immersions, locally finitely presented immersions, or the theory of algebraic spaces).

--- 

Let me know if you'd like a diagrammatic summary or a proof sketch for a specific lemma.