### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `Tor (n : ℕ)` | `C ⥤ C ⥤ C` | Left-derived functor of tensor product in the **second** argument: `X ⊗ -` derived in the second variable. |
| `Tor' (n : ℕ)` | `C ⥤ C ⥤ C` | Alternative definition: left-derived in the **first** argument: `- ⊗ Y`, via `Functor.flip`. |
| `Tor'_map_app'` | `((Tor' C n).map f).app Z = ...` | Simplification lemma for the action of `Tor'` on morphisms (ensures no leakage of internal `NatTrans.leftDerived` structure). |
| `Tor'_obj_map` | `((Tor' C n).obj Z).map f = ...` | Simplification lemma for the action of `Tor'` on morphisms in the object component. |
| `isZero_Tor_succ_of_projective` | `IsZero (((Tor C (n + 1)).obj X).obj Y)` | Higher Tor vanishes when second argument is projective. |
| `isZero_Tor'_succ_of_projective` | `IsZero (((Tor' C (n + 1)).obj X).obj Y)` | Higher Tor′ vanishes when first argument is projective. |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `Tor`, `Tor'`: Main functors.
  - `isZero_...`: Lemmas asserting vanishing of objects in abelian categories.
- **Suffixes**:
  - `_of_projective`: Indicates projectivity assumption on an argument.
  - `_map_app`, `_obj_map`: Distinguish between morphism-level and object-level behavior.
- **Structure**:
  - `Functor.leftDerived F n`: Standard pattern for left-derived functors.
  - `tensoringLeft`, `tensoringRight`: Monoidal structure components used to index derived functors.

#### 3. **Tactic Stack**

- **Core tactics**:
  - `rfl`: Used in `@[simp]` lemmas to prove definitional equalities.
  - `apply ..._projective_succ`: Leverages existing lemmas about derived functors and projectives.
- **No heavy automation** (e.g., `aesop`, `ring`, `simp_rw`) appears—proofs are mostly direct applications of library lemmas.

#### 4. **Proof Logic**

- **Structure**:
  - Definitions are given via `@[simps]` to automatically generate projection lemmas.
  - Lemmas about `Tor`/`Tor'` reduce to known properties of `Functor.leftDerived` and `NatTrans.leftDerived`.
  - Vanishing lemmas use `apply Functor.isZero_leftDerived_obj_projective_succ`, which is a standard result in homological algebra: left-derived functors vanish in positive degrees on projective objects.
- **No induction or case analysis** is needed beyond leveraging existing library results.

#### 5. **Imports**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Abelian.LeftDerived` | Provides `Functor.leftDerived`, `NatTrans.leftDerived`, and key lemmas like `isZero_leftDerived_obj_projective_succ`. |
| `Mathlib.CategoryTheory.Monoidal.Preadditive` | Supplies `MonoidalPreadditive`, needed to ensure tensor product is additive (required for derived functors in abelian settings). |

#### Additional Notes

- The file assumes:
  - `C` is a **monoidal abelian category** with **projective resolutions** (i.e., enough projectives).
  - Tensor product is **preadditive**, ensuring the hom-sets are abelian groups and composition is bilinear.
- The comment highlights a **future goal**: proving `Tor ≅ Tor'`, likely via a δ-functor uniqueness argument (requires more homological theory, e.g., acyclic models or Grothendieck spectral sequences).