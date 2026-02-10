Here's a structured technical metadata brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Constant Sheaf in Lean 4 (Mathlib)**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `constantPresheafAdj` | `{T : C} → IsTerminal T → Functor.const Cᵒᵖ ⊣ evaluation Cᵒᵖ D (op T)` | Shows constant presheaf functor is left adjoint to evaluation at terminal object. |
| `constantSheaf` | `D ⥤ Sheaf J D` | Functor sending object `X : D` to sheafification of constant presheaf at `X`. |
| `constantSheafAdj` | `{T : C} → IsTerminal T → constantSheaf J D ⊣ sheafSections J D (op T)` | Left adjoint equivalence: constant sheaf ⊣ sections at terminal object. |
| `Sheaf.IsConstant` | `Sheaf J D → Prop` | Predicate: `F` is constant iff it lies in the essential image of `constantSheaf`. |
| `Sheaf.mem_essImage_of_isConstant` | `F ∈ (constantSheaf J D).essImage` | Witness of membership in essential image for constant sheaves. |
| `Sheaf.isConstant_congr` | `F ≅ G → IsConstant F → IsConstant G` | Isomorphism invariance of being constant. |
| `Sheaf.isConstant_iff_isIso_counit_app` | `IsConstant F ↔ IsIso (counit.app F)` | Under full faithfulness of `constantSheaf`, constancy ⇔ counit iso. |
| `Sheaf.isConstant_iff_of_equivalence` | `(sheafEquiv G J K D).inverse.obj F .IsConstant J ↔ F.IsConstant K` | Constancy is invariant under equivalence of sheaf categories (dense subsite). |
| `Sheaf.isConstant_iff_forget` | `F.IsConstant J ↔ (sheafCompose J U F).IsConstant J` | Constancy preserved under “forgetful” postcomposition `U : D → B`. |
| `equivCommuteConstant` | `constantSheaf J D ⋙ sheafEquiv.functor ≅ constantSheaf K D` | Commutativity of constant sheaf with equivalence induced by dense subsite. |
| `constantCommuteCompose` | `constantSheaf J D ⋙ sheafCompose J U ≅ U ⋙ constantSheaf J B` | Constant sheaf commutes with `sheafCompose` (postcomposition with `U`). |

---

#### **2. Naming Conventions**

- **Functor names**:  
  - `constantPresheafAdj`, `constantSheaf`, `constantSheafAdj`, `constantCommuteCompose`, `equivCommuteConstant`, `equivCommuteConstant'`  
  → Prefix `constant*` for constructions related to constant (pre)sheaves.

- **Adjointness**:  
  - `*Adj` suffix (e.g., `constantPresheafAdj`, `constantSheafAdj`) for adjunctions.

- **Equivalence/commutativity**:  
  - `equivCommute*`, `constantCommute*` for natural isomorphisms mediating interaction between functors.

- **Sheaf predicates**:  
  - `Sheaf.IsConstant` (class), `IsConstant` (instance), `mem_essImage_of_isConstant` (lemma).

- **Counit/unit**:  
  - `counit_app`, `unit_app`, `counit_app_app`, `counit_w`, `counit_app` — standard adjunction notation.

- **Iso-related**:  
  - `asIso`, `isIso_*`, `isIso_counit_app_iff_mem_essImage`, `isIso_of_reflects_iso`.

- **Sheaf operations**:  
  - `sheafify*`, `sheafToPresheaf`, `presheafToSheaf`, `sheafCompose`, `sheafSections`, `sheafEquiv`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only` — heavily used, especially with `sheafify_hom_ext`, `hom_ext`, `val`, `app`.
- `rw` — for rewriting using isomorphisms, adjunctions, naturality.
- `infer_instance` — for discharging typeclass goals (e.g., `IsIso`, `IsConstant`).
- `exact`, `constructor`, `intro`, `cases` — basic proof structure.
- `apply`, `apply isoWhiskerLeft`, `apply isoWhiskerRight` — for constructing natural isomorphisms.
- `ext` — extensionality for natural transformations / sheaf morphisms.
- `aesop` — noted as working but slow in one proof comment.
- `simp?` — used to generate large `simp only` lemmas (e.g., in `constantSheafAdj_counit_w`).

---

#### **4. Proof Logic / Strategy**

- **Adjointness proofs**:  
  Construct unit/counit explicitly (via `Functor.constCompEvaluationObj`, `IsTerminal.from`), verify naturality via `simp`.

- **Essential image characterizations**:  
  Use `essImage_eq_of_natIso` + uniqueness of left adjoints to relate different left adjoints (e.g., `constantPresheafAdj` vs `constantSheafAdj`).

- **Constancy ⇔ counit iso**:  
  - One direction: `isConstant_of_isIso_counit_app` (construct witness in essential image from iso).  
  - Other direction: `isConstant_iff_isIso_counit_app` uses full faithfulness to invert the implication.

- **Equivalence invariance**:  
  Use `equivCommuteConstant` and `equivCommuteConstant'` to transport witnesses in essential image across equivalence.

- **Forgetful functor behavior**:  
  - Show that `sheafCompose` reflects isomorphisms and preserves constancy via factorization through `constantCommuteCompose`.  
  - Use `constantSheafAdj_counit_w` to relate counits before/after `U`.

- **Inductive/structural style**:  
  Proofs are mostly *constructive* and *diagrammatic*, relying on universal properties (sheafification, limits), adjunctions, and isomorphism cancellation.

---

#### **5. Imports & Scope**

- **Core dependencies**:
  ```lean
  import Mathlib.CategoryTheory.Sites.Sheafification
  import Mathlib.CategoryTheory.Sites.DenseSubsite.SheafEquiv
  ```
- **Category-theoretic infrastructure used**:
  - `Limits`, `Opposite`, `Category`, `Functor`, `Sheaf`, `Adjunction`
  - `GrothendieckTopology`, `HasWeakSheafify`, `Sheafification`, `SheafEquiv`, `IsDenseSubsite`
  - `Terminal`, `IsTerminal`, `StructuredArrow`, `IsIso`, `essImage`, `Faithful`, `Full`, `ReflectsIsomorphisms`

- **Domain scope**:
  - General toposes / sites (`C`, `J`), target category `D` (with weak sheafification).
  - Applications to dense subsite equivalences (`G : C ⥤ C'`), and “forgetful” functors `U : D ⥤ B`.

---

Let me know if you'd like a dependency graph, a summary of assumptions for key theorems, or a formalization roadmap for extending this file.