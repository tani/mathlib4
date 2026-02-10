### Technical Brief: Yoneda Embedding and Yoneda Lemma in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `yoneda` | `C ⥤ Cᵒᵖ ⥤ Type v₁` | The **Yoneda embedding**, sending an object `X` to the representable presheaf `Y ↦ Y ⟶ X`. |
| `coyoneda` | `Cᵒᵖ ⥤ C ⥤ Type v₁` | The **co-Yoneda embedding**, sending `X` to the copresheaf `Y ↦ X ⟶ Y`. |
| `fullyFaithful` | `yoneda.FullyFaithful` | Proves the Yoneda embedding is fully faithful (bijective on hom-sets). |
| `yoneda_full`, `yoneda_faithful` | Instances | Derived from `fullyFaithful`: Yoneda is full and faithful. |
| `yoneda.ext` | `(X Y : C) → ... → X ≅ Y` | **Yoneda extensionality**: if natural transformations between representables agree on all maps into `X`/`Y`, then `X ≅ Y`. |
| `yonedaEquiv` | `(yoneda.obj X ⟶ F) ≃ F.obj (op X)` | **Yoneda lemma (uncurried)**: natural transformations from representable presheaf to `F` correspond bijectively to elements of `F X`. |
| `yonedaLemma` | `yonedaPairing C ≅ yonedaEvaluation C` | **Yoneda lemma (functorial version)**: the pairing `(X, F) ↦ Hom(yoneda.obj X, F)` is naturally isomorphic to evaluation `(X, F) ↦ F X`. |
| `coyonedaEquiv` | `(coyoneda.obj (op X) ⟶ F) ≃ F.obj X` | Dual of `yonedaEquiv` for co-Yoneda. |
| `coyonedaLemma` | `coyonedaPairing C ≅ coyonedaEvaluation C` | Dual of `yonedaLemma`. |
| `RepresentableBy`, `CorepresentableBy` | Structures | Encode representability (resp. corepresentability) via natural bijections `(X ⟶ Y) ≃ F(op X)` (resp. `(X ⟶ Y) ≃ F Y`). |
| `isIso_of_fully_faithful` | `(f : X ⟶ Y) → IsIso (yoneda.map f) → IsIso f` | If Yoneda maps `f` to an iso, then `f` is an iso. |
| `isIso_iff_yoneda_map_bijective` | `IsIso f ↔ ∀ T, Function.Bijective (λ x ↦ x ≫ f)` | Characterization of isomorphisms via bijectivity on hom-sets (a corollary of fully faithfulness). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `yoneda_`, `coyoneda_`: for Yoneda/co-Yoneda related constructions.
  - `fullyFaithful`: for fully faithful properties.
  - `repr`, `corepr`: for representing/corepresenting objects (`reprX`, `reprx`, `coreprX`, `coreprx`).
  - `homEquiv`: for natural bijections in representability structures.
- **Suffixes**:
  - `_obj`, `_map`: for object and morphism parts of functors/natural transformations.
  - `_app`: for components of natural transformations.
  - `_equiv`, `_iso`: for equivalences/isomorphisms.
  - `_naturality`, `_comp`: for naturality and composition lemmas.
- **Case & Style**:
  - `PascalCase` for definitions (`yoneda`, `coyoneda`, `fullyFaithful`).
  - `snake_case` for lemmas (`yonedaEquiv_naturality`, `map_yonedaEquiv`).
  - `camelCase` for structures (`RepresentableBy`, `CorepresentableBy`).

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `simp` / `dsimp`: simplification of definitions (especially `yoneda`, `coyoneda`, `naturality`).
- `ext`: extensionality for natural transformations / functors.
- `rw`: rewriting using lemmas like `yonedaEquiv_apply`, `yonedaEquiv_naturality`.
- `aesop_cat`: automated reasoning for category-theoretic identities (e.g., `Category.comp_id`, associativity).
- `congr_fun`: for extensionality of function spaces.
- `Equiv.toIso`, `Iso.refl`: constructing isomorphisms from equivalences or identities.
- `apply congr_fun (e'.hom.naturality ...)`: naturality of natural transformations.
- `obtain ⟨rfl⟩`: destructuring existential or equality proofs.
- `erw`: rewrite with definitional equality hints.

---

#### **4. Proof Logic**

- **Fully Faithful Yoneda**:
  - Define `preimage f := f.app _ (𝟙 _)`.
  - Prove injectivity/surjectivity via naturality and identity laws.
  - Use `fullyFaithful.full` / `fullyFaithful.faithful` to derive instances.

- **Yoneda Lemma (`yonedaEquiv`)**:
  - `toFun η := η.app (op X) (𝟙 X)` (evaluate at identity).
  - `invFun ξ := { app := fun f ↦ F.map f.op ξ }` (precompose).
  - Prove `left_inv`/`right_inv` using naturality and identity laws.

- **Naturality of `yonedaEquiv`**:
  - Use `yonedaEquiv_naturality`: `F.map g.op (η.app _ 𝟙) = η.app _ g`.
  - Derived via naturality square for `η`.

- **Representability**:
  - Use `homEquiv_eq` to reduce to universal element (`homEquiv (𝟙 Y)`).
  - `ext` lemmas (`RepresentableBy.ext`) rely on uniqueness of natural transformations determined by universal element.

- **Isomorphism Characterization**:
  - `isIso f ↔ ∀ T, Function.Bijective (x ↦ x ≫ f)`:
    - ⇒: use `isIso_of_fully_faithful` + fully faithfulness of `yoneda`.
    - ⇐: construct inverse using surjectivity at `T = Y`.

---

#### **5. Imports**

| Module | Purpose |
|--------|---------|
| `Mathlib.CategoryTheory.Functor.Hom` | Hom-functor, natural transformations, functor categories. |
| `Mathlib.CategoryTheory.Products.Basic` | Product categories, projections, pairing. |
| `Mathlib.Data.ULift` | Universe lifting for type-level universe management. |
| `Mathlib.Logic.Function.ULift` | Utilities for `ULift`-based equivalences. |

These imports reflect the module’s focus on:
- Representable functors and presheaves (`Cᵒᵖ ⥤ Type`).
- Universe management (via `ULift` and universe polymorphism).
- Natural isomorphisms in functor categories.

---

#### **6. Notable Patterns & Idioms**

- **`yonedaEquiv` as a bridge**: Used to translate between natural transformations and elements of `F X`.
- **`𝟙 _` as universal element**: Identity morphism is central to representability and Yoneda.
- **`uliftFunctor`**: Used to handle heterogeneous universes in large functor categories.
- **Curried versions**: `curriedYonedaLemma`, `largeCurriedYonedaLemma` express Yoneda as an isomorphism of functors `Cᵒᵖ → (Cᵒᵖ ⥤ Type) ⥤ Type`.
- **`yoneda.map f` encodes precomposition**: `yoneda.map f.app _ g = g ≫ f`.

---

This summary captures the core structure and methodology of the Yoneda embedding and lemma formalization in Lean 4, suitable for building a domain-specific AI agent for category theory reasoning.