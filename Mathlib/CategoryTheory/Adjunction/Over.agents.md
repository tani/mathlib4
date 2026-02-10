### Technical Metadata Brief: Adjunctions in Over/Under Categories (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Over.pullback f` | `{X Y : C} → f : X ⟶ Y → Over Y ⥤ Over X` | Pullback functor along `f`, induced by universal property of pullbacks. |
| `Over.map f` | `{X Y : C} → f : X ⟶ Y → Over X ⥤ Over Y` | Direct image functor induced by post-composition with `f`. |
| `Over.mapPullbackAdj f` | `Over.map f ⊣ Over.pullback f` | Adjunction: `map f` is left adjoint to `pullback f`. |
| `Over.pullbackId` | `pullback (𝟙 X) ≅ 𝟭 (Over X)` | Identity morphism induces identity functor on over category. |
| `Over.pullbackComp` | `pullback (f ≫ g) ≅ pullback g ⋙ pullback f` | Pullback commutes with composition up to natural isomorphism. |
| `Over.star X` | `[HasBinaryProducts C] → C ⥤ Over X` | Sends object `Y` to projection `π₁ : X ⨯ Y ⟶ X`. |
| `Over.forgetAdjStar` | `forget X ⊣ star X` | Adjunction: `forget X` (evaluation at domain) is left adjoint to `star X`. |
| `Under.pushout f` | `{X Y : C} → f : X ⟶ Y → Under X ⥤ Under Y` | Pushout functor along `f`, dual to pullback. |
| `Under.mapPushoutAdj f` | `pushout f ⊣ Under.map f` | Adjunction: `pushout f` is left adjoint to `map f` in under category. |
| `Under.pushoutId`, `Under.pullbackComp` | `pushout (𝟙 X) ≅ 𝟭`, `pushout (f ≫ g) ≅ pushout f ⋙ pushout g` | Identity and composition coherence for pushout. |

> **Note**: Aliases deprecated in 2024 (e.g., `baseChange`, `mapAdjunction`, `star`, `forgetAdjStar`) redirect to namespaced versions (`Over.pullback`, `Over.mapPullbackAdj`, etc.).

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `Over.` / `Under.`: Namespace for constructions in over/under categories.
  - `pullback`, `pushout`: Functors induced by base change / cobase change.
  - `map`: Direct image along a morphism.
  - `star`: Right adjoint to `forget` (denoted `X*` in geometry/topos theory).
  - `forget`: Underlying object functor `Over X → C`.

- **Suffixes**:
  - `Adj`: Denotes an adjunction (e.g., `mapPullbackAdj`, `forgetAdjStar`).
  - `Id`: Identity case (e.g., `pullbackId`, `pushoutId`).
  - `Comp`: Composition coherence (e.g., `pullbackComp`, `pushoutComp`).
  - `IsRightAdjoint` / `IsLeftAdjoint`: Instance proofs of adjointness.

- **`[simps!]` attribute**: Used to generate `simp` lemmas for object and morphism parts (`obj_left`, `obj_hom`, `map_left`, `unit_app`, `counit_app`).

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Role |
|--------|------|
| `aesop_cat` | Automated category-theoretic reasoning (e.g., verifying naturality, triangle identities). |
| `simp`, `dsimp` | Simplification using definitional equalities and `simp` lemmas (e.g., `pullback.condition`, `assoc`). |
| `ext` | Extensionality for morphisms in over/under categories (via `homMk`). |
| `rw`, `simp only [...]` | Rewriting using specific lemmas (e.g., `Under.w`, `pushout.condition`). |
| `simpa using ...` | Simplify goal using a hypothesis. |
| `conjugateIsoEquiv` | Construct natural isomorphisms from adjunctions and isomorphisms of functors. |

---

#### **4. Proof Logic**

- **General Strategy**:
  - **Construct hom-equivalences** manually (via `Adjunction.mkOfHomEquiv`) for adjunctions.
  - **Define unit/counit** explicitly using universal properties (pullback/pushout).
  - **Verify triangle identities** using `aesop_cat` and simplification.
  - **Prove coherence laws** (identity, composition) via `conjugateIsoEquiv`, leveraging existing adjunctions and functor laws.

- **Typical Flow**:
  1. Define functor on objects/morphisms using `Over.mk`, `homMk`, `pullback.lift`, `pushout.desc`.
  2. Prove functoriality (often implicit via `simps!` or `aesop_cat`).
  3. Build hom-equivalence:
     - `toFun`: Use universal property to lift/map along pullback/pushout.
     - `invFun`: Pre/post-compose with canonical projections/injections.
  4. Check inverses:
     - `left_inv`: Use `aesop_cat` or extensionality + `simp`.
     - `right_inv`: Use `Over.w` / `Under.w` and `simp`.

- **Key Lemmas Used**:
  - `pullback.condition`, `pushout.condition`: Commutativity of pullback/pushout squares.
  - `Over.w`, `Under.w`: Commutativity condition for morphisms in over/under categories.
  - `assoc`: Associativity of composition.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
```lean
import Mathlib.CategoryTheory.Adjunction.Mates
import Mathlib.CategoryTheory.Limits.Shapes.BinaryProducts
import Mathlib.CategoryTheory.Limits.Shapes.Pullback.HasPullback
import Mathlib.CategoryTheory.Monad.Products
```

**Scope**:
- Assumes `C` is a locally small category (`[Category.{v} C]`).
- Requires:
  - `HasPullbacks C` for `Over.pullback`, `Over.mapPullbackAdj`.
  - `HasBinaryProducts C` for `Over.star`, `Over.forgetAdjStar`.
  - `HasPushouts C` for `Under.pushout`, `Under.mapPushoutAdj`.

**Universe Levels**:
- `universe v u`: Explicit handling of universe polymorphism.

**Notable Modules Used**:
- `Limits`: For pullbacks, pushouts, binary products.
- `Comonad`: For `coalgebraToOver`, `coalgebraEquivOver`.
- `Adjunction.Mates`: For `conjugateIsoEquiv`.

---

#### **6. TODO / Future Work**

- Prove `star X` has a right adjoint when `C` is cartesian closed *and* has pullbacks.
- Extend to indexed categories or fibred categories.
- Formalize dual statements for under categories in more depth (currently partial).

--- 

Let me know if you'd like a formalized summary in a specific format (e.g., for documentation, AI training, or proof planning).