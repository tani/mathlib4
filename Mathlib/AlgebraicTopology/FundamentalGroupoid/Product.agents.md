### Technical Metadata Brief: *Fundamental Groupoid Preserves Products* (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `proj` | `πₓ (TopCat.of (∀ i, X i)) ⥤ πₓ (X i)` | Functor induced by projection `Π i, X i → X i` on fundamental groupoids. |
| `proj_map` | `∀ i x₀ x₁ p, (proj X i).map p = Path.Homotopic.proj p` | Identifies `proj`'s action on morphisms with `Path.Homotopic.proj`. |
| `piToPiTop` | `(∀ i, πₓ (X i)) ⥤ πₓ (TopCat.of (∀ i, X i))` | Candidate functor from product of groupoids to groupoid of product space; not yet known iso. |
| `piIso` | `Grpd.of (∀ i, πₓ (X i)) ≅ πₓ (TopCat.of (∀ i, X i))` | **Main iso**: fundamental groupoid preserves arbitrary products. |
| `piTopToPiCone` | `Fan.mk (πₓ (TopCat.of (∀ i, X i))) (proj X) ⟶ Grpd.piLimitFan (πₓ ∘ X)` | Cone morphism version of `piIso.inv`. |
| `coneDiscreteComp` | `Cone (Discrete.functor X ⋙ π) ≌ Cone (Discrete.functor (π ∘ X))` | Equivalence of cone categories used to relate topological and categorical limits. |
| `preservesProduct` | `Limits.PreservesLimit (Discrete.functor X) π` | **Theorem**: `π` preserves all products (i.e., is a limit-preserving functor). |
| `projLeft`, `projRight` | `πₓ (A × B) ⥤ πₓ A`, `πₓ (A × B) ⥤ πₓ B` | Functors induced by left/right projections `A × B → A`, `A × B → B`. |
| `prodToProdTop` | `πₓ A × πₓ B ⥤ πₓ (A × B)` | Functor from product of groupoids to groupoid of product space. |
| `prodIso` | `Grpd.of (πₓ A × πₓ B) ≅ πₓ (A × B)` | **Binary case iso**: fundamental groupoid preserves binary products. |

---

#### **2. Naming Conventions**

- **Functor names**:
  - `proj`, `projLeft`, `projRight`: induced by projections in `Top`.
  - `piToPiTop`, `prodToProdTop`: “to top” suffix indicates direction from product of groupoids → groupoid of product space.
- **Isomorphism names**:
  - `piIso`, `prodIso`: `Iso` suffix for isomorphisms between groupoid products and groupoid of product.
- **Map names**:
  - `proj_map`, `projLeft_map`, `projRight_map`: specify action on morphisms.
  - `prodToProdTop_map`, `piToPiTop_map`: specify action on morphisms (though `map` is often implicit via `@[simps]`).
- **Cone-related**:
  - `coneDiscreteComp`, `piTopToPiCone`: use `cone`, `Fan`, `Limit` terminology for categorical limit machinery.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` / `simp only` | Simplifying hom-sets, objects, and functor actions (especially with `@[simps]` lemmas). |
| `rfl` | Proving definitional equalities (e.g., `proj_map`, `map_id`). |
| `ext` | Extensionality for functions, products, and functors (`Functor.ext`, `Prod.ext`). |
| `apply CategoryTheory.Functor.ext` / `hext` | Proving functor equality by checking objects and morphisms. |
| `change`, `suffices ... by ...` | Rewriting goals to match known lemmas (e.g., `Path.Homotopic` lemmas). |
| `rw`, `apply`, `exact` | Standard proof scripting. |
| `have` / `haveI` | Introducing intermediate facts (e.g., `have : Path.Homotopic.projLeft ... = _`). |
| `apply IsIso.of_hom_iso` / `asIso` | Proving isomorphisms via cone morphisms. |
| `apply Limits.IsLimit.ofIsoLimit` | Leveraging known limit cones via isomorphism. |

---

#### **4. Proof Logic**

- **Structure**:
  1. **Define candidate functors** (`piToPiTop`, `prodToProdTop`) that go *from* product of groupoids *to* groupoid of product.
  2. **Construct inverses** using projections (`proj`, `projLeft`, `projRight`) and product of functors (`pi'`, `prod'`).
  3. **Verify inverse laws**:
     - `hom_inv_id`: Show composition `piToPiTop ⋙ piIso.inv = id` using `Functor.ext` + `Path.Homotopic` lemmas (`pi_lift`, `projLeft_prod`, etc.).
     - `inv_hom_id`: Show reverse composition using `Path.Homotopic.prod_projLeft_projRight`, `comp_pi_eq_pi_comp`, etc.
  4. **Cone-level argument** for general products:
     - Use `coneDiscreteComp` to relate cones over `X` in `Top` and cones over `πX` in `Grpd`.
     - Show `piTopToPiCone` is an iso of cones.
     - Apply `preservesLimit_of_preserves_limit_cone` with `TopCat.piFanIsLimit` and `Grpd.piLimitFanIsLimit`.
- **Key lemmas used**:
  - `Path.Homotopic.pi_lift`, `comp_pi_eq_pi_comp`, `projLeft_prod`, `projRight_prod`, `prod_projLeft_projRight`.
  - `FundamentalGroupoid.id_eq_path_refl`, `ext`, `as_path_homotopic`.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Groupoid` | Basic theory of groupoids and `Grpd`. |
| `Mathlib.AlgebraicTopology.FundamentalGroupoid.Basic` | Core definitions: `πₓ`, `πₘ`, `Path.Homotopic`, `as`. |
| `Mathlib.Topology.Category.TopCat.Limits.Products` | Product cones/fans in `TopCat`, `piFan`, `piFanIsLimit`. |
| `Mathlib.Topology.Homotopy.Product` | Product structure on paths/homotopies: `prod`, `projLeft`, `projRight`. |

**Scopes & Notation**:
- `scoped FundamentalGroupoid`: Enables `πₓ`, `πₘ`, etc., as shorthand.
- `CategoryTheory`: Enables `𝟭`, `prod'`, `pi'`, `Fan`, `Cone`, `Grpd.piLimitFan`, etc.

---

### Summary

This file establishes that the **fundamental groupoid functor** `π : TopCat → Grpd` preserves all products — both binary (`prodIso`) and arbitrary (`piIso`, `preservesProduct`). The proofs rely heavily on:
- Explicit constructions of functors and natural isomorphisms,
- Properties of path homotopy classes under product/projection (`Path.Homotopic.*`),
- Categorical limit preservation criteria via cone equivalences.

The structure is highly modular, with binary case (`Prod`) as a special instance of the general `Pi` case.