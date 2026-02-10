Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Preadditive Yoneda Embedding in Lean 4**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `preadditiveYonedaObj` | `Y : C → Cᵒᵖ ⥤ ModuleCat (End Y)` | Constructs the presheaf `X ↦ Hom(X, Y)` with natural `End(Y)`-module structure. |
| `preadditiveYoneda` | `C ⥤ Cᵒᵖ ⥤ AddCommGrp` | The preadditive Yoneda embedding: sends `Y` to the additive presheaf `X ↦ Hom(X, Y)` (viewed as an abelian group). |
| `preadditiveCoyonedaObj` | `X : Cᵒᵖ → C ⥤ ModuleCat (End X)` | Dual construction: copresheaf `Y ↦ Hom(X, Y)` with `End(X)`-module structure. |
| `preadditiveCoyoneda` | `Cᵒᵖ ⥤ C ⥤ AddCommGrp` | Dual embedding: sends `X` to additive copresheaf `Y ↦ Hom(X, Y)`. |
| `whiskering_preadditiveYoneda` | `preadditiveYoneda ⋙ forget₂ = yoneda` | Shows compatibility with classical Yoneda embedding via forgetful functor. |
| `whiskering_preadditiveCoyoneda` | `preadditiveCoyoneda ⋙ forget₂ = coyoneda` | Dual compatibility statement. |
| `full_preadditiveYoneda` | Instance: `Full preadditiveYoneda` | Proves fullness using fullness of classical Yoneda and faithfulness of forgetful functor. |
| `faithful_preadditiveYoneda` | Instance: `Faithful preadditiveYoneda` | Faithfulness follows from equality with classical Yoneda via `whiskering_preadditiveYoneda`. |
| `additive_yonedaObj`, `additive_yonedaObj'`, etc. | Instance declarations | Assert that the presheaves/copresheaves are *additive functors* (preserve finite biproducts). |

#### **2. Naming Conventions**

- **Prefixes**:
  - `preadditiveYoneda*`: Distinguishes from classical Yoneda (`yoneda`, `coyoneda`) by encoding module structure.
  - `additive_*`: Indicates that the functor is additive (preserves biproducts).
- **Suffixes**:
  - `Obj`: Refers to object-level assignment (presheaf/copresheaf at a point).
  - No suffix (e.g., `preadditiveYoneda`): Refers to the full functor (i.e., the embedding).
- **Module-related**:
  - `forget₂ _ _`: Used to forget down from `ModuleCat R` to `AddCommGrp`.
  - `ModuleCat.of`, `ModuleCat.ofHom`: Construct modules and module homs from additive maps.

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `ext`: Extensionality for morphisms in `AddCommGrp`, `ModuleCat`.
- `dsimp`, `simp`: Simplification using `@[simps]` lemmas and definitional equalities.
- `rw`, `simp_rw`: Rewriting using lemmas like `Category.assoc`, `add_comp`, `comp_add`.
- ` rfl`: For definitional equalities (e.g., `whiskering_preadditiveYoneda`).
- `exact`, `apply`, `intro`: Standard proof scripting.
- `Functor.Full.of_comp_faithful`, `Functor.Faithful.of_comp_eq`: Specialized lemmas for fullness/f faithfulness via factorization.

#### **4. Proof Logic**

- **Structure of proofs**:
  - Most proofs (e.g., `map_id`, `map_comp`) use `ext` + `dsimp` + `simp`, leveraging definitional equality of hom-sets and composition.
  - Module homomorphism properties (`map_add'`, `map_smul'`) are verified by appealing to categorical identities (`comp_add`, `assoc`).
  - Fullness/f faithfulness of `preadditiveYoneda`/`preadditiveCoyoneda` are deduced via:
    - Known fullness/f faithfulness of classical Yoneda (`yoneda_full`, `coyoneda_full`).
    - Compatibility with forgetful functor (`whiskering_*`).
    - General lemmas: `Functor.Full.of_comp_faithful`, `Functor.Faithful.of_comp_eq`.

- **Additivity proofs**:
  - Instance declarations (`additive_yonedaObj`, etc.) are left implicit (no body), relying on `Preadditive C` and module structure to ensure biproduct preservation.

#### **5. Imports & Scope**

- **Core dependencies**:
  - `CategoryTheory.Preadditive.Opposite`: Preadditive categories and opposites.
  - `ModuleCat.Basic`: Module category infrastructure (`ModuleCat.of`, `forget₂`, etc.).
  - `Grp.Preadditive`: Abelian groups as preadditive categories (used for `AddCommGrp`).
- **Scope**:
  - Universe polymorphism: `universe v u`, with `Category.{v} C`, `Preadditive C`.
  - Noncomputable section: Allows use of classical reasoning (e.g., module structures).
  - `open` namespaces: `CategoryTheory.Preadditive`, `Opposite`, `Limits`.

---

This file formalizes the *preadditive refinement* of the Yoneda embedding: enriching the classical Yoneda embedding (into presheaves of sets/groups) with module structure over endomorphism rings, while preserving fullness and faithfulness. It serves as a stepping stone toward enriched Yoneda lemmas in enriched category theory (e.g., over `AddCommGrp` or `ModuleCat ℤ`).