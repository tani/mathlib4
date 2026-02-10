### Technical Metadata Brief: `CategoryTheory.Types.Monoidal`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `typesChosenFiniteProducts` | Instance: `Type u` has chosen finite products (binary products + terminal object), constructed via `Types.binaryProductLimitCone` and `Types.terminalLimitCone`. Enables use of `ChosenFiniteProducts` interface. |
| `tensor_apply` | Simplification lemma: `(f ⊗ g)(p) = (f p.1, g p.2)` for morphisms `f : W → X`, `g : Y → Z`, and `p : W ⊗ Y`. Describes action of tensor product of morphisms on elements. |
| `whiskerLeft_apply`, `whiskerRight_apply` | Simplification lemmas for left/right whiskering: <br>• `(X ◁ f)(p) = (p.1, f p.2)` <br>• `(f ▷ X)(p) = (f p.1, p.2)` |
| `leftUnitor_hom_apply`, `leftUnitor_inv_apply` | Describes unitors for left tensor unit `PUnit`: <br>• `λ_X.hom (p, x) = x` <br>• `λ_X.inv x = (unit, x)` |
| `rightUnitor_hom_apply`, `rightUnitor_inv_apply` | Describes unitors for right tensor unit `PUnit`: <br>• `ρ_X.hom (x, p) = x` <br>• `ρ_X.inv x = (x, unit)` |
| `associator_hom_apply`, `associator_inv_apply` | Describes associator isomorphism: <br>• `α.hom ((x,y),z) = (x,(y,z))` <br>• `α.inv (x,(y,z)) = ((x,y),z)` |
| `associator_hom_apply_*`, `associator_inv_apply_*` | Component-wise projections of associator actions (e.g., `α.hom x .1 = x.1.1`). Useful for reasoning about structure morphisms elementwise. |
| `MonoidalFunctor.mapPi` | Noncomputable isomorphism: `F.obj (Fin (n+1) → β) ≅ F.obj β ⊗ F.obj (Fin n → β)` for a monoidal functor `F : Type ⥤ C`. Encodes how monoidal functors interact with finite cartesian powers (via function types). |

---

#### **2. Naming Conventions**

- **Structure morphisms**: Use standard monoidal category notation:
  - `λ_ X`, `ρ_ X`, `α_ X Y Z` — left/right unitors and associator.
  - `.hom`, `.inv` — forward/backward direction of isomorphisms.
- **Tensor morphism application**: `tensor_apply`, `whiskerLeft_apply`, `whiskerRight_apply`.
- **Elementwise behavior**: All `*_apply` lemmas follow pattern `f_apply` or `f_apply_*`, often with subscripts like `_1`, `_2_1`, `_2_2` to denote component projections.
- **Functorial constructions**: `MonoidalFunctor.mapPi` — uses `map` + descriptive suffix (`Pi` for product over finite index type).

---

#### **3. Tactic Stack**

- **`rfl`**: Dominant tactic — used in all `@[simp]` lemmas to prove equalities by definitional equality (since tensor, unitors, associators are defined via `Π`/`Σ` types and `PUnit`).
- **`simp_rw`** (implied via `@[simp]`): Used implicitly for rewriting with simplifier lemmas.
- **`aesop`** (not present): Not used here — proofs are trivial enough to be handled by `rfl`.
- **`Functor.mapIso`, `≪≫`**: Used in definition of `mapPi` to compose isomorphisms.

---

#### **4. Proof Logic**

- **Definitional reasoning**: All proofs are by `rfl`, indicating that all structure morphisms (tensor, unitors, associator) are defined *definitionally* in terms of tuple constructions.
- **No induction or case analysis**: No complex logical structure — all lemmas are direct expansions of definitions.
- **Isomorphism composition**: In `mapPi`, isomorphisms are composed using `≪≫` (category-theoretic composition), leveraging existing API (`Fin.consEquiv`, `μIso`).

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Monoidal.Functor` | Provides `MonoidalFunctor`, `μIso`, and related infrastructure. |
| `Mathlib.CategoryTheory.ChosenFiniteProducts` | Enables `ChosenFiniteProducts` instance for `Type u`, used to define monoidal structure. |
| `Mathlib.CategoryTheory.Limits.Shapes.Types` | Supplies `Types.binaryProductLimitCone`, `Types.terminalLimitCone`, and related constructions for products in `Type`. |

---

#### **6. Domain-Specific AI Agent Insights**

- **Focus area**: Formalization of monoidal category theory over `Type`, especially cartesian monoidal structure.
- **Common patterns**:
  - Definitional equality (`rfl`) suffices for most structure morphism lemmas.
  - Use of `Fin n → β` to model finite cartesian powers.
  - Isomorphism-based reasoning via `≅` and `μIso`.
- **Gaps identified**:
  - No general API for tensor products indexed by finite ordered types (as noted in comment).
  - `mapPi` is noncomputable — suggests future work toward computational content.

--- 

Let me know if you'd like a formalized summary in Lean or a visualization of the monoidal structure on `Type`.