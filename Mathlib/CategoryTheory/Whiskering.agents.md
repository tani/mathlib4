### Technical Metadata Brief: Whiskering in Category Theory (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `whiskerLeft F α` | `F ⋙ G ⟶ F ⋙ H` | Left whiskering: precompose natural transformation `α : G ⟶ H` with functor `F : C ⥤ D`. Components: `α.app (F.obj X)`. |
| `whiskerRight α F` | `G ⋙ F ⟶ H ⋙ F` | Right whiskering: postcompose natural transformation `α : G ⟶ H` with functor `F : D ⥤ E`. Components: `F.map (α.app X)`. |
| `whiskeringLeft` | `(C ⥤ D) ⥤ (D ⥤ E) ⥤ C ⥤ E` | Curried left composition functor: maps `F ↦ (G ↦ F ⋙ G)`, `α ↦ whiskerLeft F α`. |
| `whiskeringRight` | `(D ⥤ E) ⥤ (C ⥤ D) ⥤ C ⥤ E` | Curried right composition functor: maps `F ↦ (G ↦ G ⋙ F)`, `α ↦ whiskerRight α F`. |
| `isoWhiskerLeft F α` | `F ⋙ G ≅ F ⋙ H` | Extends whiskering to natural isomorphisms `α : G ≅ H`. |
| `isoWhiskerRight α F` | `G ⋙ F ≅ H ⋙ F` | Extends right whiskering to natural isomorphisms. |
| `leftUnitor F` | `𝟭 A ⋙ F ≅ F` | Left unit law for functor composition (natural iso). |
| `rightUnitor F` | `F ⋙ 𝟭 B ≅ F` | Right unit law for functor composition (natural iso). |
| `associator F G H` | `(F ⋙ G) ⋙ H ≅ F ⋙ G ⋙ H` | Associativity constraint for functor composition (natural iso). |
| `triangle` | Identity involving associator and unitors | Verifies triangle identity for monoidal structure on functor categories. |
| `pentagon` | Identity involving only associators | Verifies pentagon identity for coherence of associators. |
| `whiskeringLeft₂`, `whiskeringLeft₃` | Higher-arity whiskering functors | Generalize whiskering to multiple functors (used for iterated composition). |
| `Functor.postcompose₃` | `(E ⥤ E') ⥤ (C₁ ⥤ C₂ ⥤ C₃ ⥤ E) ⥤ C₁ ⥤ C₂ ⥤ C₃ ⥤ E'` | Postcomposition with a functor in three arguments. |

**Theorems (Simp / Reassoc):**
- `whiskerLeft_id`, `whiskerLeft_id'`: Whiskering identity maps to identity.
- `whiskerRight_id`, `whiskerRight_id'`: Same for right whiskering.
- `whiskerLeft_comp`, `whiskerRight_comp`: Compatibility with composition.
- `whiskerLeft_twice`, `whiskerRight_twice`: Iterated whiskering = whiskering of composite.
- `whiskerRight_left`: Interchange law: `whiskerRight (whiskerLeft F α) K = whiskerLeft F (whiskerRight α K)`.
- `isIso_whiskerLeft`, `isIso_whiskerRight`: Whiskering preserves isomorphisms.
- `faithful_whiskeringRight_obj`, `fullyFaithful_whiskeringRight`: Faithful/full functors are preserved under right whiskering.

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `whiskerLeft`, `whiskerRight`: Basic whiskering operations.
  - `isoWhiskerLeft`, `isoWhiskerRight`: Isomorphism versions.
  - `whiskeringLeft`, `whiskeringRight`: Functors encoding whiskering.
  - `postcompose₃`: Higher-arity postcomposition.

- **Suffixes:**
  - `_obj`, `_map`: For components of functors/natural transformations.
  - `_iso`: Natural isomorphisms (e.g., `leftUnitor_iso`, `associator_iso`).
  - `_twice`, `_left`, `_right`: For derived identities.

- **Special:**
  - `Obj`, `Map`, `ObjObj`, `ObjObjObj`: For nested components in higher-arity whiskering.
  - `₂`, `₃`: Arity indicators (binary, ternary whiskering).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rfl`: For definitional equalities (e.g., `whiskerLeft_id`, `associator`).
- `ext`: Extensionality for natural transformations.
- `dsimp`, `simp`: Simplification with `@[simps]` lemmas.
- `rw`: Rewriting naturality/simp lemmas.
- `aesop_cat`: For categorical coherence proofs (`triangle`, `pentagon`).
- `congr_fun`, `congr_arg`: For equality of natural transformations.
- `apply hF.map_injective`: For injectivity arguments in faithfulness/fullness proofs.

---

#### **4. Proof Logic**

- **Definitional equality dominates**: Most equalities (e.g., `whiskerLeft`, `associator`) are definitionally equal (`rfl`), but explicit isomorphisms are introduced to avoid elaboration slowdown.
- **Naturality checks**: Proofs of naturality for whiskered transformations reduce to naturality of original `α`, via `Functor.comp_map` and `α.naturality`.
- **Functoriality**: Verified by constructing components and checking naturality and identity/composition preservation.
- **Isomorphism lifting**: Uses `mapIso` from functoriality of `whiskeringLeft`/`whiskeringRight`.
- **Coherence (triangle/pentagon)**: Proven via `aesop_cat`, leveraging definitional structure and naturality.

---

#### **5. Imports**

- `Mathlib.CategoryTheory.Iso`: For natural isomorphisms and `Iso` machinery.
- `Mathlib.CategoryTheory.Functor.Category`: For functor categories and natural transformations.
- `Mathlib.CategoryTheory.Functor.FullyFaithful`: For faithfulness/fullness properties and their preservation.

---

#### **Domain-Specific AI Agent Notes**

- **Focus areas**: Whiskering, functor composition coherence, preservation of properties (faithful/full), and higher-arity generalizations.
- **Common tasks**: Constructing whiskered natural transformations, verifying naturality, proving coherence laws, lifting isomorphisms.
- **Key lemmas to surface**: `whiskerLeft_comp`, `whiskerRight_comp`, `triangle`, `pentagon`, `isoWhiskerLeft_hom`, `isIso_whiskerLeft`.
- **Avoid**: Relying on definitional associativity (`rfl`) in complex proofs—use `associator` explicitly.

--- 

Let me know if you'd like a tactic suggestion database or a proof automation strategy for whiskering lemmas.