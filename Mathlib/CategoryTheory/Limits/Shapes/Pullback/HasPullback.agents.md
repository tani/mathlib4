Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Pullbacks and Pushouts in `CategoryTheory.Limits`**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `HasPullback f g` | `abbrev HasPullback (f : X ⟶ Z) (g : Y ⟶ Z) := HasLimit (cospan f g)` | Typeclass asserting existence of a limit (pullback) for pair `(f, g)` |
| `HasPushout f g` | `abbrev HasPushout (f : X ⟶ Y) (g : X ⟶ Z) := HasColimit (span f g)` | Typeclass asserting existence of a colimit (pushout) for pair `(f, g)` |
| `pullback f g` | `abbrev pullback f g [HasPullback f g] := limit (cospan f g)` | Choice of pullback object |
| `pushout f g` | `abbrev pushout f g [HasPushout f g] := colimit (span f g)` | Choice of pushout object |
| `pullback.fst`, `pullback.snd` | `pullback f g ⟶ X`, `pullback f g ⟶ Y` | Projections from pullback |
| `pushout.inl`, `pushout.inr` | `Y ⟶ pushout f g`, `Z ⟶ pushout f g` | Inclusions into pushout |
| `pullback.lift h k w` | `W ⟶ pullback f g` | Universal map into pullback given commuting square |
| `pushout.desc h k w` | `pushout f g ⟶ W` | Universal map out of pushout given commuting square |
| `pullback.map ...` | `pullback f₁ f₂ ⟶ pullback g₁ g₂` | Induced map between pullbacks under compatible morphisms |
| `pushout.map ...` | `pushout f₁ f₂ ⟶ pushout g₁ g₂` | Induced map between pushouts under compatible morphisms |
| `pullbackComparison G f g` | `G.obj (pullback f g) ⟶ pullback (G.map f) (G.map g)` | Comparison map for preservation of pullbacks by functor `G` |
| `pushoutComparison G f g` | `pushout (G.map f) (G.map g) ⟶ G.obj (pushout f g)` | Comparison map for preservation of pushouts by functor `G` |
| `pullbackSymmetry f g` | `pullback f g ≅ pullback g f` | Symmetry isomorphism of pullback |
| `pushoutSymmetry f g` | `pushout f g ≅ pushout g f` | Symmetry isomorphism of pushout |
| `HasPullbacks` | `abbrev HasPullbacks := HasLimitsOfShape WalkingCospan C` | Class asserting all pullbacks exist |
| `HasPushouts` | `abbrev HasPushouts := HasColimitsOfShape WalkingSpan C` | Class asserting all pushouts exist |
| `pullback.hom_ext` | `{k l : W ⟶ pullback f g} → (k ≫ fst = l ≫ fst) ∧ (k ≫ snd = l ≫ snd) → k = l` | Extensionality principle for maps into pullback |
| `pushout.hom_ext` | `{k l : pushout f g ⟶ W} → (inl ≫ k = inl ≫ l) ∧ (inr ≫ k = inr ≫ l) → k = l` | Extensionality principle for maps out of pushout |

#### **2. Naming Conventions**

- **Prefixes**:
  - `pullback.` / `pushout.` — for projections, inclusions, maps, comparisons.
  - `isLimit` / `isColimit` — for cones/cocones that are (co)limits.
  - `congrHom` — for isomorphisms induced by equality of diagrams.
  - `map`, `desc`, `lift`, `comp` — standard categorical operations.
- **Suffixes**:
  - `Hom` — for isomorphisms (e.g., `congrHom`, `pullbackSymmetry`).
  - `Symmetry` — for symmetry isomorphisms.
  - `Comparison` — for canonical comparison maps between images under functors.
- **Recurring patterns**:
  - `inl`, `inr`, `fst`, `snd` — canonical morphisms.
  - `comp` — composition lemmas (e.g., `pullback.map_comp`, `pushout.mapLift_comp`).
  - `assoc` — associativity variants (e.g., `pullback.condition_assoc`).

#### **3. Tactic Stack**

- **Core tactics**:
  - `simp`, `simp only`, `simp_rw`
  - `ext` (for extensionality proofs)
  - `aesop_cat` (for categorical reasoning, especially with isomorphisms and commuting diagrams)
  - `rw`, `rewrite`, `reassoc`
  - `refine`, `exact`, `intro`, `cases`
- **Category-theoretic automation**:
  - `asIso`, `IsLimit.conePointUniqueUpToIso`, `colimit.isColimit`, `limit.isLimit`
  - `limit.lift_π`, `colimit.ι_desc`, `limit.hom_ext`, `colimit.hom_ext`

#### **4. Proof Logic**

- **Structure of proofs**:
  - Most proofs follow a **universal property** pattern:
    1. Construct candidate morphism using `lift`/`desc`.
    2. Prove required equations using `lift_fst`, `lift_snd`, `inl_desc`, `inr_desc`.
    3. Use `hom_ext` to prove uniqueness.
  - **Isomorphism proofs**:
    - Use `asIso` + `hom`/`inv` definitions.
    - Prove inverse properties via `simp` + `comp_inv_eq`.
  - **Functoriality**:
    - Prove naturality by `ext` + `simp` + `← map_comp`.
  - **Symmetry**:
    - Use `flipIsLimit`/`flipIsColimit` to reorient diagrams.
    - Apply `conePointUniqueUpToIso`/`coconePointUniqueUpToIso`.

#### **5. Imports**

- **Primary dependency**:
  - `Mathlib.CategoryTheory.Limits.Shapes.Pullback.PullbackCone`
- **Implicit dependencies** (via `CategoryTheory.Limits`):
  - `Mathlib.CategoryTheory.Limits.Shapes.Limits`
  - `Mathlib.CategoryTheory.Limits.Shapes.Colimits`
  - `Mathlib.CategoryTheory.Limits.Shapes.WidePullback`
  - `Mathlib.CategoryTheory.Limits.Preserves.Shapes.Pullbacks`
- **Shape-specific imports**:
  - `WalkingCospan`, `WalkingSpan`, `WidePullbackShape`, `WidePushoutShape`

---

This brief captures the core API, conventions, and proof patterns used in the pullback/pushout formalization in Lean 4’s Mathlib. It is suitable for building a domain-specific AI agent focused on categorical reasoning in Lean.