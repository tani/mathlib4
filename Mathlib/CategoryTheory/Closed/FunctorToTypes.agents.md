### Technical Metadata Brief: `CategoryTheory.FunctorToTypes`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `functorHomEquiv` | `(G H : C ⥤ Type max w v u) → (G ⟶ F.functorHom H) ≃ (F ⊗ G ⟶ H)` | Establishes the hom-isomorphism central to closedness: morphisms into the internal hom correspond to morphisms out of the tensor product. |
| `rightAdj_map` | `(f : G ⟶ H) → (c : C) → (F.functorHom G).obj c → (F.functorHom H).obj c` | Defines the action of the right adjoint on morphisms: post-composition with `f` in the internal hom. |
| `rightAdj` | `C ⥤ Type max w v u ⥤ C ⥤ Type max w v u` | The right adjoint functor to `tensorLeft F`, sending `G ↦ F ⟹ G` (internal hom), and morphisms via `rightAdj_map`. |
| `adj` | `tensorLeft F ⊣ rightAdj F` | The adjunction witnessing that tensoring with `F` has a right adjoint (i.e., internal hom exists). |
| `closed` | `Closed F` | Instance showing that `F` admits an internal hom (i.e., `tensorLeft F` has a right adjoint). |
| `monoidalClosed` | `MonoidalClosed (C ⥤ Type max w v u)` | Instance proving the functor category `C ⥤ Type max w v u` is monoidal closed. |

> **Note**: The proof relies on `Functor.functorHomEquiv`, `homObjEquiv`, and standard naturality arguments.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `functorHom_`: Relates to the internal hom functor (`F.functorHom`).
  - `rightAdj_`: Pertains to the right adjoint construction.
  - `tensorLeft`: Standard for left tensoring functor in monoidal categories.

- **Suffixes**:
  - `_equiv`: Denotes an equivalence (often a hom-isomorphism).
  - `_map`: Used for morphism parts of functors/natural transformations.
  - `_obj`: Used for object parts (though less frequent here due to `simps!`-driven definitions).

- **Pattern**:  
  `rightAdj_map`, `functorHomEquiv`, `adj`, `closed`, `monoidalClosed` follow Lean/CategoryTheory conventions:  
  - `adj` for adjunction data,  
  - `closed`/`monoidalClosed` for typeclass instances.

---

#### **3. Tactic Stack**

- **`aesop`**: Used in `naturality` proof for `rightAdj_map` to handle diagrammatic reasoning.
- **`simp` / `simp_rw`**: Implicit via `@[simps!]` and `ext _` + `simp` in `unit.naturality`.
- **`ext`**: To extend natural transformations (e.g., `ext _` after `dsimp`).
- **`change`**: To rewrite goals into equivalent forms for clarity (in `naturality`).
- **`dsimp`**: Simplify definitions before proving properties.

> No heavy automation like `ring`, `linarith`, or `interval_cases` — reasoning is diagrammatic and categorical.

---

#### **4. Proof Logic**

- **Structure**:
  1. Define the internal hom object: `F.functorHom G` (already available via `Functor.functorHom`).
  2. Construct the adjunction:
     - **Unit**: `η_G : G → F ⟹ (F ⊗ G)` via the hom-isomorphism applied to `𝟙_{F ⊗ G}`.
     - **Counit**: `ε_G : F ⊗ (F ⟹ G) → G` via the inverse of the hom-isomorphism applied to `𝟙_G`.
  3. Prove triangle identities (implicitly via `simps!` and naturality lemmas).
  4. Conclude `Closed F` and `MonoidalClosed (C ⥤ Type max w v u)`.

- **Key Lemmas Used**:
  - `Functor.functorHomEquiv`: Standard equivalence for functor categories.
  - `homObjEquiv`: Likely a reindexing equivalence (e.g., Yoneda or evaluation).
  - `naturality` lemmas for natural transformations in `Type`.

- **Induction**: Not used — all proofs are pointwise (object-wise) and naturality-based.

---

#### **5. Imports & Scope**

- **Core Imports**:
  - `Mathlib.CategoryTheory.Functor.FunctorHom`: Provides `Functor.functorHom`, `Functor.functorHomEquiv`.
  - `Mathlib.CategoryTheory.Closed.Monoidal`: Provides `Closed`, `MonoidalClosed`, `tensorLeft`, etc.

- **Scope**:
  - Universe polymorphism: `w`, `v'`, `v`, `u`, `u'`.
  - Works for any locally small category `C` (in `Type u`, morphisms in `Type v`) and target `Type max w v u`.
  - Goal: Show **monoidal closedness** of the functor category `C ⥤ Type`.

- **TODO Note**: The file currently proves *monoidal* closedness; the next step is *cartesian* closedness (i.e., using product instead of tensor).

---

### Summary

This file formalizes that the functor category `C ⥤ Type` is monoidal closed, by constructing the internal hom as `F ⟹ G := F.functorHom G`, and verifying the adjunction `tensorLeft F ⊣ (F ⟹ -)` via explicit unit/counit and naturality. The proofs are standard categorical reasoning, leveraging existing `FunctorHom` infrastructure and `simps!` for definitional equality.