### Technical Metadata Brief: Disjoint Coproducts in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `CoproductDisjoint (X₁ X₂ : C)` | `Class` | Defines a *disjoint coproduct*: for any pullback over a coproduct cocone, the apex is initial, and the coprojections are monic. |
| `isInitialOfIsPullbackOfIsCoproduct` | `{pX₁ : X₁ ⟶ X} {pX₂ : X₂ ⟶ X} → IsColimit (BinaryCofan.mk pX₁ pX₂) → IsLimit PullbackCone → IsInitial Z` | Extracts initiality of the pullback apex from the disjointness assumption. |
| `isInitialOfIsPullbackOfCoproduct` | Same as above, but specialized to the *canonical* coproduct `X₁ → X₁ ⨿ X₂ ← X₂`. | Simplifies usage when working with the standard binary coproduct. |
| `isInitialOfPullbackOfIsCoproduct` | `[HasPullback pX₁ pX₂] → IsColimit (BinaryCofan.mk pX₁ pX₂) → IsInitial (pullback pX₁ pX₂)` | Instantiates the pullback object itself as initial. |
| `isInitialOfPullbackOfCoproduct` | `[HasPullback coprod.inl coprod.inr] → IsInitial (pullback coprod.inl coprod.inr)` | Special case: pullback of coproduct injections is initial. |
| `CoproductsDisjoint (C)` | `Class` | Global property: *every* binary coproduct in `C` is disjoint. |
| `initialMonoClass_of_disjoint_coproducts` | `[CoproductsDisjoint C] → InitialMonoClass C` | Main theorem: disjoint coproducts imply all morphisms from initial objects are monic. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isInitial_...`: asserts that a given object is initial.
  - `mono_...`: asserts that a morphism is monic (used internally in `CoproductDisjoint`).
  - `CoproductDisjoint.`: class methods (e.g., `CoproductDisjoint.mono_inl`).
- **Suffixes**:
  - `_of_...`: indicates derivation from a specific structure (e.g., `ofPullback`, `ofCoproduct`).
  - `_ofIs...`: emphasizes logical derivation from a property (e.g., `ofIsPullbackOfIsCoproduct`).
- **Pattern**: `isInitialOf[Condition]`, `mono_in[l|r]`, `CoproductDisjoint.[property]`.

---

#### **3. Tactic Stack**

- **Core tactics used**:
  - `aesop`: for automated reasoning about commutativity and universal properties.
  - `simp_rw`: for rewriting using definitional equalities (e.g., `id_comp`, `comp_id`).
  - `ext`: extensionality for morphisms (used in `hI.hom_ext _ _`).
  - `cases'`: implicit in `Discrete.casesOn`, `WalkingPair.casesOn`.
  - `apply`: for applying universal property lemmas (e.g., `uniq`, `fac`).
- **Pattern**: Heavy use of `simp`-based simplification + `aesop` for diagram chasing.

---

#### **4. Proof Logic**

- **Structure**:
  1. **Universal property instantiation**: Given a pullback over a coproduct, use the `CoproductDisjoint` class to deduce initiality/monomorphism.
  2. **Specialization**: Leverage `HasBinaryCoproduct` and `HasPullback` to construct canonical cones/cones.
  3. **Monomorphism proof** (in `initialMonoClass_of_disjoint_coproducts`):
     - Construct a binary cocone using the initial object’s unique morphism.
     - Use `Mono` definition: show any two parallel arrows equalizing after post-composition are equal.
     - Apply `hI.hom_ext` (initial object’s uniqueness) and simplify with `id_comp`.
- **Induction/Recursion**: Not used directly; relies on *universal properties* (colimits, limits) and extensionality.

---

#### **5. Imports & Scope**

- **Primary dependencies**:
  - `Mathlib.CategoryTheory.Limits.Shapes.BinaryProducts`: for binary products (used dually in coproducts).
  - `Mathlib.CategoryTheory.Limits.Shapes.Pullback.HasPullback`: for pullback existence and universal property.
- **Implicit imports** (via `CategoryTheory` namespace):
  - `Limits.Basic`, `Limits.Constructions.LimitsOfProducts`, `Limits.Shapes.Coproduct`, `Mono`, `Initial`.
- **Scope**: Foundational category theory — focuses on *structural properties* of coproducts, especially interaction with pullbacks and initial objects.

---

### Summary

This module formalizes **disjoint coproducts** — a key condition in topos theory (e.g., Giraud’s theorem) — by requiring that pullbacks over coproducts are initial and coprojections are monic. It establishes that such categories satisfy `InitialMonoClass`, a stepping stone toward extensive or coherent categories. The proofs are highly uniform, leveraging universal properties and tactic automation (`aesop`, `simp_rw`).