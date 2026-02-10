### Technical Brief: Limits in Full Subcategories (Lean 4 Formalization)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ClosedUnderLimitsOfShape` | `∀ ⦃F : J ⥤ C⦄ ⦃c : Cone F⦄ (_hc : IsLimit c), (∀ j, P (F.obj j)) → P c.pt` | Defines that a property `P` is preserved under limits of shape `J`: if all objects in a diagram satisfy `P`, then any limit of the diagram also satisfies `P`. |
| `ClosedUnderColimitsOfShape` | `∀ ⦃F : J ⥤ C⦄ ⦃c : Cocone F⦄ (_hc : IsColimit c), (∀ j, P (F.obj j)) → P c.pt` | Dual to above: `P` preserved under colimits of shape `J`. |
| `closedUnderLimitsOfShape_of_limit` | `(h : ∀ {F}, (∀ j, P (F.obj j)) → P (limit F)) → ClosedUnderLimitsOfShape J P` | Shows that if `P` is preserved on *canonical* limits (`limit F`), and `P` is closed under isomorphisms, then `P` is closed under all limits. |
| `closedUnderColimitsOfShape_of_colimit` | `(h : ∀ {F}, (∀ j, P (F.obj j)) → P (colimit F)) → ClosedUnderColimitsOfShape J P` | Dual of above for colimits. |
| `ClosedUnderLimitsOfShape.limit` | `(h : ClosedUnderLimitsOfShape J P) → (∀ j, P (F.obj j)) → P (limit F)` | Extracts preservation of `P` on canonical limits from the general definition. |
| `ClosedUnderColimitsOfShape.colimit` | `(h : ClosedUnderColimitsOfShape J P) → (∀ j, P (F.obj j)) → P (colimit F)` | Dual of above. |
| `createsLimitFullSubcategoryInclusion'` | `(hc : IsLimit c) → P c.pt → CreatesLimit F (fullSubcategoryInclusion P)` | Constructs a limit in the full subcategory from a limiting cone in `C` whose apex satisfies `P`. |
| `createsLimitFullSubcategoryInclusion` | `[HasLimit (F ⋙ fullSubcategoryInclusion P)] → P (limit (F ⋙ fullSubcategoryInclusion P)) → CreatesLimit F ...` | Special case using the canonical limit cone. |
| `createsLimitFullSubcategoryInclusionOfClosed` | `ClosedUnderLimitsOfShape J P → CreatesLimit F ...` | Main result: if `P` is closed under limits of shape `J`, then the inclusion `FullSubcategory P ↪ C` creates such limits. |
| `createsLimitsOfShapeFullSubcategoryInclusion` | `ClosedUnderLimitsOfShape J P → CreatesLimitsOfShape J (fullSubcategoryInclusion P)` | Global version: the inclusion creates *all* limits of shape `J` if `P` is closed under them. |
| `hasLimit_of_closedUnderLimits` | `ClosedUnderLimitsOfShape J P → HasLimit (F : J ⥤ FullSubcategory P)` | If `P` is closed under limits, then any diagram in the full subcategory has a limit *in the subcategory*. |
| `hasLimitsOfShape_of_closedUnderLimits` | `ClosedUnderLimitsOfShape J P → HasLimitsOfShape J (FullSubcategory P)` | Full subcategory has all limits of shape `J` if ambient category does and `P` is closed. |
| `createsColimitFullSubcategoryInclusionOfClosed`, `hasColimit_of_closedUnderColimits`, etc. | Duals of the above for colimits. | |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `closedUnder*`: Properties about preservation of `P` under (co)limits.
  - `creates*`: Statements about the inclusion functor creating (co)limits.
  - `has*`: Existence of (co)limits in the full subcategory.
- **Suffixes**:
  - `OfShape`: Refers to limits/colimits of a specific shape `J`.
  - `Inclusion`: Refers to the inclusion `FullSubcategory P ↪ C`.
  - `OfClosed`: Assumes `P` is closed under (co)limits.
- **Other patterns**:
  - `fullSubcategoryInclusion`: Standard notation for the inclusion functor.
  - `property`: Field of an object in `FullSubcategory P`, i.e., `x : FullSubcategory P` gives `x.property : P x`.

---

#### **3. Tactic Stack**

The proofs rely heavily on:
- `intros`, `exact`, `apply`, `have`, `obtain` — basic proof structure.
- `cases` / `rcases` — for destructuring hypotheses.
- `simp` / `simp_rw` — to simplify using definitions like `FullSubcategory`, `limit`, `cone`.
- `exactI`, `applyI`, `infer_instance` — for typeclass inference (e.g., `HasLimit`, `IsLimit`).
- `mem_of_iso` — key lemma for transferring properties along isomorphisms, used in `closedUnderLimitsOfShape_of_limit`.
- `createsLimitOfFullyFaithfulOfIso'`, `createsColimitOfFullyFaithfulOfIso'` — lemmas from `Creates` module, used to lift (co)limits through fully faithful functors.
- `limit.isLimit _`, `colimit.isColimit _` — standard canonical (co)limit data.

No heavy automation like `aesop` or `ring` is used — proofs are mostly direct category-theoretic reasoning.

---

#### **4. Proof Logic**

- **Core idea**: To show that limits in `FullSubcategory P` exist (and are created by inclusion), it suffices to show that the limit cone in `C` has apex satisfying `P`.
- **Structure of main proofs**:
  1. Assume `P` is closed under limits of shape `J`.
  2. Take a diagram `F : J ⥤ FullSubcategory P`.
  3. Consider its image under inclusion: `F ⋙ fullSubcategoryInclusion P`.
  4. Assume `C` has a limit for this diagram: `limit (F ⋙ fullSubcategoryInclusion P)`.
  5. Use closure of `P` under limits to deduce `P (limit (F ⋙ fullSubcategoryInclusion P))`.
  6. Apply `createsLimitFullSubcategoryInclusion` to get that the inclusion creates the limit.
  7. Conclude existence of limit in subcategory via `hasLimit_of_created`.
- **Key logical step**: `ClosedUnderLimitsOfShape` + `HasLimit` in ambient category ⇒ `P` holds on limit apex ⇒ limit lifts to subcategory.

---

#### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.CategoryTheory.Limits.Creates`: Provides `CreatesLimit`, `CreatesColimit`, and related lemmas.
  - `Mathlib.CategoryTheory.ClosedUnderIsomorphisms`: Provides `ClosedUnderIsomorphisms` and `mem_of_iso`.
- **Scope**:
  - Universe polymorphism: `universe w' w v u`.
  - Works for arbitrary small shapes `J` and locally small categories `C`.
  - Focuses on *limits* and *colimits* in *full subcategories* defined by a predicate `P : C → Prop`.
- **Assumptions**:
  - `P` must be closed under isomorphisms (used in `closedUnderLimitsOfShape_of_limit`).
  - Ambient category `C` must have the relevant (co)limits.

---

This formalization is a clean and modular application of the general principle: *if a property is preserved under (co)limits and isomorphisms, then the full subcategory defined by it inherits those (co)limits*.