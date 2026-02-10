Here is the **technical metadata** extracted from the provided Lean 4 file, formatted as a structured technical brief for use in building a Domain-Specific AI Agent (e.g., for formal verification, proof planning, or automated reasoning in algebraic geometry):

---

### 🔹 **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `IsAffineOpen.fromSpecStalk` | `Spec (𝒪_{X,x}) ⟶ X` — canonical morphism defined via an affine neighborhood `U ∋ x`. |
| `Scheme.fromSpecStalk` | `Spec (𝒪_{X,x}) ⟶ X` — global canonical morphism, independent of choice of `U`. |
| `Opens.fromSpecStalkOfMem` | `Spec (𝒪_{X,x}) ⟶ U` — factorization through an open `U ∋ x`. |
| `stalkClosedPointIso` | `(Spec R).presheaf.stalk (closedPoint R) ≅ R` — isomorphism for local ring `R`. |
| `stalkClosedPointTo` | `𝒪_{X, f(𝔪)} ⟶ R` — induced local ring homomorphism from `f : Spec R → X`. |
| `SpecToEquivOfLocalRing` | `(Spec R ⟶ X) ≃ Σ x, (𝒪_{X,x} → R)_{\text{local}}` — core equivalence: morphisms `Spec R → X` ↔ pairs `(x, local hom)` |
| `range_fromSpecStalk` | `range ((X.fromSpecStalk x).base) = { y | y ⤳ x }` — image is the specialization closure of `x`. |
| `fromSpecStalk_closedPoint` | `(X.fromSpecStalk x).base (closedPoint) = x` — closed point maps to `x`. |
| `Spec_map_stalkSpecializes_fromSpecStalk` | `Spec.map (stalkSpecializes h) ≫ X.fromSpecStalk y = X.fromSpecStalk x` for `x ⤳ y`. |
| `Spec_map_stalkMap_fromSpecStalk` | `Spec.map (f.stalkMap x) ≫ Y.fromSpecStalk = X.fromSpecStalk x ≫ f` — naturality of `fromSpecStalk`. |
| `fromSpecStalk_toSpecΓ` | `X.fromSpecStalk x ≫ X.toSpecΓ = Spec.map (germ ⊤ x)` — relation to global sections. |
| `germ_stalkClosedPointTo_Spec_fromSpecStalk` | Compatibility of germs with `stalkClosedPointTo` and `Spec.map`. |

---

### 🔹 **2. Naming Conventions**

| Pattern | Meaning / Example |
|--------|-------------------|
| `fromSpecStalk` | Canonical morphism `Spec(𝒪_{X,x}) → X` or `→ U`. |
| `stalkClosedPoint*` | Related to stalk at the closed point of `Spec R` for local `R`. |
| `Spec_map_*` | Maps induced on spectra by ring maps (e.g., `Spec.map (f)`). |
| `germ_*` | Germs of the structure sheaf at points. |
| `IsAffineOpen.*` | Definitions/lemmas depending on an affine open `U`. |
| `Opens.*` | Definitions/lemmas for open subsets `U ⊆ X`. |
| `*To*` | Maps going *to* a stalk or ring (e.g., `stalkClosedPointTo`). |
| `*Iso` | Isomorphisms (e.g., `stalkClosedPointIso`, `ΓSpecIso`). |
| `*Hom` / `IsLocalHom` | Local ring homomorphisms. |
| `*app`, `*base` | Component functions of a scheme morphism (`app`: sheaf level; `base`: topological level). |

---

### 🔹 **3. Tactic Stack**

| Tactic | Usage Frequency / Purpose |
|--------|----------------------------|
| `rw` / `erw` | Very frequent — rewriting along equalities, especially naturality, stalk maps, and germs. |
| `simp` / `simp_rw` | Frequent — simplifying using `simp` lemmas (e.g., `fromSpecStalk_closedPoint`, `Spec_map_comp`). |
| `delta` | Used to unfold definitions (e.g., `fromSpecStalk`, `fromSpecStalkOfMem`). |
| `transitivity`, `trans` | For chaining equalities of morphisms. |
| `obtain`, `rcases` | Existential elimination (e.g., finding affine opens containing points). |
| `ext` | Extensionality for sets/functions (e.g., proving equality of sets via `ext y`). |
| `congr` | Congruence reasoning (e.g., `congr 1` for functoriality). |
| `have`, `suffices` | Intermediate lemma introduction. |
| `apply`, `exact` | Direct proof steps (e.g., `apply IsPreimmersion.comp`). |
| `aesop` | Not present — this file is highly structured and manual. |
| `ring` / `abel` | Not used — algebra is handled via `Algebra`, `Localization`, `IsLocalization`. |

---

### 🔹 **4. Proof Logic & Strategy**

- **Induction / Case Analysis**: Not used directly; instead, proofs rely on:
  - **Affine basis reduction**: Many proofs reduce to the affine case using `isBasis_affine_open`.
  - **Naturality & Functoriality**: Core strategy: use `Spec.map`, `germ`, `stalkMap`, and `ΓSpecIso` naturality.
  - **Stalk-level reasoning**: Proofs often go through stalks and germs, using:
    - `TopCat.Presheaf.germ_res`, `germ_stalkSpecializes`
    - `stalkClosedPointIso` to identify stalks with rings.
  - **Abstraction preservation**: Avoid breaking abstraction (e.g., `Spec_fromSpecStalk` vs `Spec_fromSpecStalk'`).
  - **Equivalence proofs**: Use `ext`, `SpecToEquivOfLocalRing_eq_iff`, and `TopCat.Presheaf.stalk_hom_ext`.

---

### 🔹 **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.AlgebraicGeometry.AffineScheme` | Affine schemes, `Spec`, `ΓSpecIso`, structure sheaf. |
| `Mathlib.AlgebraicGeometry.Morphisms.Preimmersion` | `IsPreimmersion`, used to prove `fromSpecStalk` is a preimmersion. |

**Domain Scope**:  
- **Algebraic Geometry over schemes**  
- **Local ring theory** (stalks, local homomorphisms, closed points)  
- **Specialization preorder** (`⤳`) on topological spaces  
- **Sheaf theory** (germs, stalks, presheaves, structure sheaf)  
- **Categorical reasoning** (functors, natural transformations, over-categories)

---

Let me know if you'd like a **proof outline** of `SpecToEquivOfLocalRing`, or a **dependency graph** of definitions/lemmas.