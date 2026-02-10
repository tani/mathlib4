### Technical Brief: Eilenberg-Moore (Co)algebras in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Structure | Purpose |
|------|------------------|---------|
| `Algebra T` | `structure` | Defines an Eilenberg–Moore algebra for a monad `T : Monad C`: an object `A : C` with structure map `a : T.obj A ⟶ A` satisfying unit and associativity axioms. |
| `Algebra.Hom A B` | `structure` | Morphism of `T`-algebras: a morphism `f : A.A ⟶ B.A` in `C` commuting with structure maps. |
| `Algebra.category` | `instance` | Equips the class of `T`-algebras with a category structure (`Hom`, `id`, `comp`). |
| `Algebra.forget T` | `def` | Forgetful functor `Algebra T ⥤ C`, sending `(A, a) ↦ A`. |
| `Algebra.free T` | `def` | Free algebra functor `C ⥤ Algebra T`, sending `X ↦ (T X, μ_X)`. |
| `Algebra.adj` | `def` | Adjunction `free ⊣ forget` for monads (Lemma 5.2.8 in Riehl). |
| `Algebra.isoMk` | `def` | Constructs algebra isomorphism from carrier isomorphism satisfying compatibility. |
| `Algebra.algebra_iso_of_iso` | `thm` | If underlying morphism is iso, then algebra morphism is iso. |
| `Algebra.forget_reflects_iso` | `instance` | Forgetful functor reflects isomorphisms. |
| `Algebra.forget_faithful` | `instance` | Forgetful functor is faithful. |
| `Algebra.algebraFunctorOfMonadHom` | `def` | Induced functor `Algebra T₁ ⥤ Algebra T₂` from monad morphism `T₂ ⟶ T₁`. |
| `Algebra.algebraEquivOfIsoMonads` | `def` | Equivalence of algebras over isomorphic monads, commuting with forgetful functors. |
| `Coalgebra G` | `structure` | Eilenberg–Moore coalgebra for comonad `G`: object `A` with `a : A ⟶ G.obj A`, satisfying counit & coassociativity. |
| `Coalgebra.Hom A B` | `structure` | Coalgebra morphism: `f : A.A ⟶ B.A` commuting with coalgebra structure. |
| `Coalgebra.category` | `instance` | Category structure on coalgebras. |
| `Coalgebra.forget G` | `def` | Forgetful functor `Coalgebra G ⥤ C`. |
| `Coalgebra.cofree G` | `def` | Cofree coalgebra functor `C ⥤ Coalgebra G`, `X ↦ (G X, δ_X)`. |
| `Coalgebra.adj` | `def` | Adjunction `forget ⊣ cofree` for comonads. |
| `Coalgebra.isoMk` | `def` | Constructs coalgebra iso from carrier iso satisfying compatibility. |
| `Coalgebra.coalgebra_iso_of_iso` | `thm` | Carrier iso ⇒ coalgebra iso. |
| `Coalgebra.forget_reflects_iso` | `instance` | Forgetful reflects isos. |
| `Coalgebra.forget_faithful` | `instance` | Forgetful is faithful. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `algebra_`, `coalgebra_`: for constructions over algebras/coalgebras.
  - `forget_`, `free_`, `cofree_`: for canonical functors.
  - `hom_`, `isoMk`: for morphism/iso constructors.
  - `of_`: e.g., `algebra_iso_of_iso`, `algebra_epi_of_epi`, `algebra_mono_of_mono`.
- **Suffixes**:
  - `_f`: projection of underlying morphism (e.g., `(f : A ⟶ B).f`).
  - `_a`: structure map (e.g., `A.a`, `B.a`).
  - `_obj`: object part of functor (e.g., `free_obj`, `forget_obj`).
- **`simps` annotations**: Used to generate projection lemmas automatically (e.g., `@[simps]`, `@[simps! unit counit]`).

---

#### **3. Tactic Stack**

| Tactic | Usage |
|--------|-------|
| `aesop_cat` | Solves diagrammatic identities (unit/assoc axioms, naturality). |
| `simp` / `dsimp` | Simplify using `simps` lemmas, definitions, and `reassoc` attributes. |
| `rw` / `reassoc` | Rewrite using associativity/unit/coassoc axioms; `reassoc` helps reassociate compositions. |
| `ext` / `ext1` | Extensionality for morphisms (especially `Hom.ext`, `Hom.ext'`). |
| `apply Category.comp_id`, `apply comp_id` | Simplify identity compositions. |
| `funext` / `ext` | Prove equality of natural transformations or morphisms. |
| `simp only [...]` | Fine-grained simplification (e.g., in `adj` proofs). |
| ` rfl`, `refl` | Reflexivity for definitional equalities. |

---

#### **4. Proof Logic**

- **Structure Proofs**:
  - **Algebra/coalgebra definitions**: Verify axioms (`unit`, `assoc`, `counit`, `coassoc`) using `aesop_cat`.
  - **Morphism definitions**: Prove compatibility (`h`) via naturality or axioms.
- **Adjunctions**:
  - Constructed via `Adjunction.mkOfHomEquiv`.
  - Hom-set bijection: `f ↦ η ≫ f` (monad) or `f ↦ a ≫ G.map f` (comonad).
  - Inverses verified using unit/counit laws and naturality.
- **Isomorphism/epi/mono lifting**:
  - Use `algebra_iso_of_iso`, `algebra_epi_of_epi`, etc.
  - Rely on `forget` reflecting or preserving properties via `epi_of_epi_map`, `mono_of_mono_map`.
- **Functoriality & naturality**:
  - Prove via `ext`, `simp`, and diagram chasing.
  - Use `reassoc` and `simp` with `naturality` lemmas (e.g., `μ.naturality`, `δ.naturality`).
- **Equivalences of algebras**:
  - Built from monad morphism compositions and identities, using `algebraFunctorOfMonadHomComp`, `Id`, etc.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Monad.Basic` | Defines monads, natural transformations, unit/counit laws. |
| `Mathlib.CategoryTheory.Adjunction.Basic` | Provides `Adjunction`, `HomEquiv`, `mkOfHomEquiv`. |
| `Mathlib.CategoryTheory.Functor.EpiMono` | Defines `Epi`, `Mono`, `IsIso`, and lifting lemmas. |

**Scope**:  
- Formalizes Eilenberg–Moore categories for **monads** and **comonads** in a locally small category `C`.
- Establishes foundational properties: category structure, adjunctions, functoriality over monad morphisms, reflection of isomorphisms/epis/monos.
- Designed for use in higher categorical constructions (e.g., monadicity, comonadicity, descent).

---

### Summary

This file formalizes the classical Eilenberg–Moore construction in Lean 4, covering both algebras over monads and coalgebras over comonads. It emphasizes **categorical structure**, **adjunctions**, and **functorial behavior**, with heavy reliance on `aesop_cat` and `simp`-based automation for diagrammatic reasoning. The naming and structure follow Mathlib conventions, prioritizing modularity and reuse (e.g., via `simps`, `reassoc`, `ext` lemmas).