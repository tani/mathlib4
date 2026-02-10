### Technical Brief: `Rep k G` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Rep k G` | `abbrev Rep (k G : Type u) [Ring k] [Monoid G] := Action (ModuleCat k) (MonCat.of G)` | Category of *k*-linear representations of monoid *G*; objects are modules with *G*-action. |
| `ρ V` | `V : Rep k G → Representation k G V` | Unbundled action homomorphism *G →* Endₖ(V)*. |
| `of ρ` | `(ρ : G →* V →ₗ[k] V) → Rep k G` | Bundles an unbundled representation into `Rep`. |
| `trivial k G V` | `Rep k G` | Trivial representation: *g·v = v*. |
| `IsTrivial A` | `A.ρ.IsTrivial` | Predicate for trivial action. |
| `linearization k G` | `(Action (Type u) (MonCat.of G)) ⥤ Rep k G` | Free *k*-module construction on a *G*-set → representation. |
| `ofMulAction k G H` | `[MulAction G H] → Rep k G` | Representation induced by multiplicative action on *H*. |
| `leftRegular` | `Rep k G` | Regular representation: *k[G]* with left multiplication. |
| `diagonal n` | `Rep k G` | Representation on *k[Gⁿ]* via left multiplication. |
| `leftRegularHom A x` | `Rep.ofMulAction k G G ⟶ A` | Morphism sending *g ↦ ρ(g)(x)*. |
| `leftRegularHomEquiv A` | `(Rep.ofMulAction k G G ⟶ A) ≃ₗ[k] A` | Yoneda-style isomorphism: *Hom(k[G], A) ≅ A*. |
| `ihom A B` | `Rep k G` | Internal hom: *Homₖ(A, B)* with *g·f = ρ_B(g) ∘ f ∘ ρ_A(g⁻¹)*. |
| `homEquiv A B C` | `(A ⊗ B ⟶ C) ≃ (B ⟶ ihom A C)` | Currying adjunction for internal hom. |
| `MonoidalClosed.linearHomEquiv` | `(A ⊗ B ⟶ C) ≃ₗ[k] B ⟶ A ⟶[Rep k G] C` | Linear isomorphism for internal hom. |
| `toModuleMonoidAlgebra` | `Rep k G ⥤ ModuleCat (MonoidAlgebra k G)` | Functor from representations to modules over monoid algebra. |
| `ofModuleMonoidAlgebra` | `ModuleCat (MonoidAlgebra k G) ⥤ Rep k G` | Inverse functor. |
| `equivalenceModuleMonoidAlgebra` | `Rep k G ≌ ModuleCat (MonoidAlgebra k G)` | Categorical equivalence (main theorem). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `of_`: Unbundling/bundling constructions (`of`, `ofMulAction`, `ofDistribMulAction`, `ofAlgebraAut`, etc.).
  - `linearization_`: Free module constructions from actions (`linearization_obj_ρ`, `linearization_map_hom`, `linearizationTrivialIso`).
  - `leftRegular_`: Regular representation constructions (`leftRegular`, `leftRegularHom`, `leftRegularHomEquiv`).
  - `ihom_`: Internal hom constructions (`ihom_obj_ρ`, `ihom_ev_app`, `ihom_coev_app`).
  - `homEquiv_`: Hom-set adjunctions (`homEquiv_apply_hom`, `homEquiv_symm_apply_hom`).
  - `unitIso_`, `counitIso_`: Unit/counit isomorphisms in equivalence.

- **Suffixes**:
  - `_apply`: Elementwise action (e.g., `ρ_inv_self_apply`, `hom_comm_apply`).
  - `_def`: Definition simplification lemmas (e.g., `trivial_def`, `linearization_obj_ρ`).
  - `_hom`: Hom-component of a morphism (e.g., `linearization_map_hom`, `homEquiv_apply_hom`).
  - `_single`: Behavior on basis elements (e.g., `linearization_single`, `leftRegularHomEquiv_symm_single`).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `ext` | Extensionality for morphisms (especially `Action.Hom.ext`, `ModuleCat.hom_ext`). |
| `simp only [...]` | Simplify using explicit lemmas (avoids unfolding types). |
| `rw` / `erw` | Rewrite using definitional equalities; `erw` for delayed unification. |
| `rfl` | Reflexivity for definitional equalities (common in `@[simp]` lemmas). |
| `aesop_cat` | Automated category-theoretic reasoning (used in `equivalenceModuleMonoidAlgebra`). |
| `LinearMap.ext` / `Finsupp.lhom_ext'` | Prove linear maps equal by pointwise equality. |
| `TensorProduct.ext'` | Prove tensor map equal by testing on simple tensors. |
| `dsimp` / `erw` | Simplify definitions before rewriting. |
| `congrFun` / `congrArg` | For functional extensionality in naturality proofs. |

---

#### **4. Proof Logic**

- **Structure of major proofs**:
  - **Equivalence `Rep k G ≌ Module (MonoidAlgebra k G)`**:
    1. Define functors `toModuleMonoidAlgebra`, `ofModuleMonoidAlgebra`.
    2. Construct natural isomorphisms:
       - `unitIso V : V ≅ (of ∘ to)(V)` via `unitIsoAddEquiv` (additive equivalence).
       - `counitIso M : (to ∘ of)(M) ≅ M` via `counitIsoAddEquiv`.
    3. Verify naturality using `unit_iso_comm` and module compatibility.
    4. Use `NatIso.ofComponents` + `aesop_cat` to conclude equivalence.

- **Internal hom & monoidal closed structure**:
  - Define `ihom A` as functor.
  - Construct `homEquiv` via currying/uncurrying of tensor maps.
  - Prove naturality and triangle identities to get `MonoidalClosed`.

- **Elementwise reasoning**:
  - Most lemmas are proven by `ext` + `simp` on elements (e.g., `ρ_inv_self_apply`, `hom_comm_apply`).
  - Use `Finsupp` lemmas for basis elements (`single`, `lift`, `mapDomain`).

- **Induction**:
  - `MonoidAlgebra.induction_on` used in `to_Module_monoidAlgebra_map_aux`.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Algebra.Category.ModuleCat.*`: Limits, colimits, adjunctions, monoidal structure.
- `Mathlib.CategoryTheory.Elementwise`: Elementwise reasoning in categories.
- `Mathlib.CategoryTheory.Action.Monoidal`: Action-based representations.
- `Mathlib.RepresentationTheory.Basic`: Foundational representation theory.

**Scope**:
- Universe `u` for types.
- `CommRing k`, `Monoid G` (later `Group G` for inverses).
- Coercions: `Rep k G → Type u`, `V : Rep k G ⊢ AddCommGroup V`, `Module k V`.
- Monoidal structure: `⊗`, `k`, `β_`, `α_`, `ρ_`, `λ_`, `ihom`.

---

#### **6. Notable Design Patterns**

- **Bundled vs unbundled**: `Rep k G` bundles action; `Representation k G V` is unbundled.
- **Elementwise interface**: `ρ g x` for action; morphism commutes: `f (ρ g x) = ρ g (f x)`.
- **Free construction**: `linearization` lifts *G*-sets to representations.
- **Yoneda lemma for regular representation**: `leftRegularHomEquiv` is a core instance.
- **Monoidal closed**: `ihom` gives internal hom, enabling `A ⊗ - ⊣ ihom(A, -)`.

---

This summary captures the formal structure, naming, and proof methodology of `Rep k G` in Lean 4, suitable for building a domain-specific AI agent for representation theory formalization.