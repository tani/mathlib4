### Technical Metadata Brief

#### 1. Key Definitions & Theorems

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Adjunction.isAbsoluteLeftKan` | `{f : a ⟶ b} {u : b ⟶ a} → f ⊣ u → IsAbsKan (.mk u adj.unit)` | Shows that the right adjoint `u` of an adjunction `f ⊣ u` is an *absolute* left Kan extension of `id` along `f`. |
| `LeftExtension.IsKan.adjunction` | `{f : a ⟶ b} {t : LeftExtension f (𝟙 a)} → IsKan t → IsKan (t.whisker f) → f ⊣ t.extension` | Constructs an adjunction `f ⊣ t.extension` from a left Kan extension `t` of `id` along `f` such that `f` commutes with the extension. |
| `LeftExtension.IsAbsKan.adjunction` | `{f : a ⟶ b} {t : LeftExtension f (𝟙 a)} → IsAbsKan t → f ⊣ t.extension` | Special case of the above for absolute Kan extensions. |
| `isLeftAdjoint_TFAE` | `List.TFAE [IsLeftAdjoint f, HasAbsLeftKanExtension f (𝟙 a), ∃ _, Lan.CommuteWith f (𝟙 a) f]` | Equivalence of three conditions for `f` being a left adjoint: (1) directly, (2) existence of absolute left Kan extension, (3) existence of left Kan extension commuting with `f`. |
| `Adjunction.isAbsoluteLeftKanLift` | `{f : a ⟶ b} {u : b ⟶ a} → f ⊣ u → IsAbsKan (.mk f adj.unit)` | Shows that the left adjoint `f` of `f ⊣ u` is an *absolute* left Kan lift of `id` along `u`. |
| `LeftLift.IsKan.adjunction` | `{u : b ⟶ a} {t : LeftLift u (𝟙 a)} → IsKan t → IsKan (t.whisker u) → t.lift ⊣ u` | Constructs an adjunction `t.lift ⊣ u` from a left Kan lift `t` of `id` along `u` such that `u` commutes with the lift. |
| `LeftLift.IsAbsKan.adjunction` | `{u : b ⟶ a} {t : LeftLift u (𝟙 a)} → IsAbsKan t → t.lift ⊣ u` | Special case for absolute Kan lifts. |
| `isRightAdjoint_TFAE` | `List.TFAE [IsRightAdjoint u, HasAbsLeftKanLift u (𝟙 a), ∃ _, LanLift.CommuteWith u (𝟙 a) u]` | Equivalence of three conditions for `u` being a right adjoint. |
| `isKanOfWhiskerLeftAdjoint` | `{f : a ⟶ b} {g : a ⟶ c} {t : LeftExtension f g} → IsKan t → {h ⊣ u} → IsKan (t.whisker h)` | A left adjoint `h` commutes with a left Kan extension `t`: the whiskering `t.whisker h` is again a Kan extension. |
| `Lan.CommuteWith` instance | `[IsLeftAdjoint h] [HasLeftKanExtension f g] → Lan.CommuteWith f g h` | Instantiates the commuting property for left adjoints and left Kan extensions. |

---

#### 2. Naming Conventions

- **Prefixes**:
  - `isAbsoluteLeftKan`, `isAbsoluteLeftKanLift`: indicate *absolute* Kan (co)limits.
  - `isLeftAdjoint`, `isRightAdjoint`: used in TFAE statements.
  - `lanIsKan`, `lanLiftIsKan`: canonical Kan extension/lift from `HasLeftKanExtension`.
- **Suffixes**:
  - `.adjunction`: constructs an adjunction from a Kan (co)limit.
  - `.commuteWith`: indicates that a morphism commutes with a Kan extension/lift.
- **Structured Arrow Notation**:
  - `.mk`, `.homMk`, `.desc`, `.fac`, `.fac_assoc`: standard for structured arrows / Kan extensions/lifts.
- **Whiskering**:
  - `◁`, `▷`, `⊗≫`: used for horizontal composition in bicategories.
  - `whisker_extension`, `whisker_lift`, `whisker_unit`: lemmas about whiskering.

---

#### 3. Tactic Stack

- **Core proof automation**:
  - `bicategory`: main tactic for reasoning in bicategories (handles coherence, associators, unitors).
  - `rw [adj.left_triangle]`, `rw [adj.right_triangle]`: use triangle identities of adjunctions.
  - `calc`: stepwise equational reasoning.
  - `ext`: extensionality for morphisms (often after `let τ := ...`).
  - `simpa [...] using ...`: simplifies using a hypothesis and applies it.
  - `cancel_epi`, `cancel_mono`: cancellation lemmas for epis/monos.
  - `tfae_have`, `tfae_finish`: for proving equivalence of multiple statements.
  - `dsimp only [...]`: targeted simplification using definitional equalities.
  - `rw [← whisker_exchange]`: rewrites using interchange law.

---

#### 4. Proof Logic

- **Structure**:
  - Proofs are largely *constructive* and *diagrammatic*, leveraging universal properties of Kan extensions/lifts.
  - Most constructions follow the pattern:
    1. Define a candidate morphism using the universal property (`.desc`).
    2. Prove it satisfies the required equation (via `fac`, `hom_ext`, or equational reasoning).
    3. Verify naturality or unit/counit triangle identities.
- **Inductive/Recursive Reasoning**:
  - Not induction on natural numbers, but *induction on structure* of diagrams (e.g., structured arrows).
- **Key Logical Flow**:
  - **Adjunction ⇒ Kan (co)limit**: Use unit/counit to build the extension/lift and show absoluteness.
  - **Kan (co)limit ⇒ Adjunction**: Use the universal property to define unit/counit and verify triangle identities.
  - **Commutativity**: Show that whiskering with a left adjoint preserves Kan extensions via universal property and triangle identities.

---

#### 5. Imports

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Bicategory.Kan.HasKan` | Defines Kan extensions/lifts, their universality, and basic properties. |
| `Mathlib.CategoryTheory.Bicategory.Adjunction` | Defines adjunctions in bicategories, units/counits, triangle identities. |
| `Mathlib.Tactic.TFAE` | Provides `tfae_have`, `tfae_finish` for proving equivalence of multiple statements. |

---

### Summary

This file formalizes the classical categorical result that **adjunctions are precisely absolute Kan extensions/lifts of the identity**, and that **left adjoints commute with left Kan extensions**. It uses the language of bicategories and structured arrows, with heavy reliance on coherence and universal properties. The proofs are highly diagrammatic and exploit the interplay between adjunctions and Kan (co)limits. The `TFAE` theorems provide a bridge between adjointness and Kan-theoretic properties, enabling modular reasoning.