### Technical Brief: `Linear R C` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Linear R C` | `class Linear (R : Type w) [Semiring R] (C : Type u) [Category C] [Preadditive C]` | Defines an **`R`-linear category**: morphism sets `X ⟶ Y` are `R`-modules, and composition is `R`-bilinear. |
| `Linear.homModule` | `∀ X Y, Module R (X ⟶ Y)` | Instance giving the `R`-module structure on hom-sets. |
| `Linear.smul_comp` | `∀ r f g, (r • f) ≫ g = r • (f ≫ g)` | Compatibility of scalar multiplication with **post-composition**. |
| `Linear.comp_smul` | `∀ f r g, f ≫ (r • g) = r • (f ≫ g)` | Compatibility of scalar multiplication with **pre-composition**. |
| `preadditiveNatLinear` | `Linear ℕ C` | Every preadditive category is naturally `ℕ`-linear (via `nsmul`). |
| `preadditiveIntLinear` | `Linear ℤ C` | Every preadditive category is naturally `ℤ`-linear (via `zsmul`). |
| `leftComp Z f` | `(Y ⟶ Z) →ₗ[R] X ⟶ Z` | Post-composition by fixed `f : X ⟶ Y`, as an `R`-linear map. |
| `rightComp X g` | `(X ⟶ Y) →ₗ[R] X ⟶ Z` | Pre-composition by fixed `g : Y ⟶ Z`, as an `R`-linear map. |
| `comp X Y Z` | `(X ⟶ Y) →ₗ[S] (Y ⟶ Z) →ₗ[S] X ⟶ Z` | Composition as a **bilinear** map over a commutative semiring `S`. |
| `homCongr f₁ f₂` | `(X ⟶ W) ≃ₗ[k] Y ⟶ Z` | Given isomorphisms `X ≅ Y`, `W ≅ Z`, induces a `k`-linear isomorphism on hom-sets. |
| `units_smul_comp`, `comp_units_smul` | `[Invertible r] ⇒ (r • f) ≫ g = r • (f ≫ g)` | Specialization of `smul_comp`/`comp_smul` to units `r : Rˣ`. |
| `Epi (r • f)`, `Mono (r • f)` | `[Epi f] [Invertible r] ⇒ Epi (r • f)` | Scalar multiplication by a unit preserves epimorphisms/monomorphisms. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `homModule`, `smul_comp`, `comp_smul`: reflect structure (module, scalar multiplication, composition).
  - `leftComp`, `rightComp`: indicate which side of composition is fixed.
  - `preadditive*Linear`: indicates derived linearity from preadditivity (e.g., `preadditiveNatLinear`).
  - `units_*`: for lemmas specialized to invertible scalars.

- **Suffixes**:
  - `*Congr`: for isomorphisms induced by categorical equivalences (`homCongr`).
  - `*Apply`/`*SymmApply`: for explicit formulas for `homCongr` and its inverse.

- **Pattern**:  
  `smul_comp` / `comp_smul` — order reflects *which argument* the scalar multiplies *before* composition.

---

#### **3. Tactic Stack**

- **`aesop_cat`**: Used in class field definitions (`smul_comp`, `comp_smul`) — a custom tactic for category-theoretic reasoning (likely `aesop` + category lemmas).
- **`simp`**: Dominates proofs in `leftComp`, `rightComp`, `homCongr`, and lemmas like `units_smul_comp`.
- **`ext` + `simp`**: For proving linearity of `leftComp`/`rightComp`/`comp`.
- **`rw [...] at H` + `simpa [...] using ...`**: In `Epi (r • f)` / `Mono (r • f)` proofs — uses invertibility and cancellation.
- **`dsimp [End]`**: To simplify `End X = X ⟶ X` when inferring module/algebra structures.

---

#### **4. Proof Logic**

- **Structure inference**:  
  Linearity is built on top of `Preadditive C` (i.e., hom-sets are abelian groups with additive composition).  
  → `Linear R C` adds `Module R (X ⟶ Y)` and bilinearity of `≫`.

- **Common proof patterns**:
  - **Induction/definition reuse**: For `preadditiveNatLinear`/`preadditiveIntLinear`, reuse `map_nsmul`/`map_zsmul` from `Preadditive`.
  - **Simplification via `simp`**: Most lemmas reduce to `simp`-friendly definitions (`leftComp_apply`, `rightComp_apply`, `homCongr_apply`).
  - **Cancellation + invertibility**: For `Epi (r • f)`/`Mono (r • f)`, multiply by `⅟ r` to reduce to original `f`.
  - **Isomorphism symmetry**: `homCongr` proofs use `Iso.hom_inv_id`, `Iso.inv_hom_id`, and associativity.

- **Induced structures**:  
  For `InducedCategory`, `FullSubcategory`, `End`, the `Linear` instance is *inherited* by projecting to the ambient category.

---

#### **5. Imports & Scope**

- **Core dependencies**:
  - `Mathlib.Algebra.Algebra.Defs` — for `Algebra`/`Module` infrastructure.
  - `Mathlib.Algebra.Group.Invertible.Defs` — for `Invertible`, `⅟ r`.
  - `Mathlib.Algebra.Module.Equiv.Defs` — for `Equiv`-based linear maps (`≃ₗ`).
  - `Mathlib.CategoryTheory.Preadditive.Basic` — prerequisite for `Linear`.

- **Category-theoretic context**:
  - `CategoryTheory.Limits` (via `open LinearMap`, `open CategoryTheory.Limits`) — used for `End`, `Iso`, `Epi`, `Mono`.
  - Universe polymorphism: `universe w v u` supports `Category.{v} C`, `Linear.{w, v} R D`.

- **Scope**:  
  This file formalizes the foundational theory of **enrichment over `Module R`**, though not yet as a full enriched category framework (see "Future work").

---

### Summary

This module formalizes **`R`-linear categories** as categories enriched in `R`-modules, with bilinear composition. It leverages `Preadditive` as a base, builds `leftComp`/`rightComp` as linear maps, and derives key properties (e.g., stability of monos/epis under unit scalars, hom-isomorphisms from object isomorphisms). The proofs rely heavily on `simp`-based simplification and cancellation arguments using invertibility. The design anticipates future enrichment-theoretic generalizations.