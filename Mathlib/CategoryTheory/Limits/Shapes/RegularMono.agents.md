### Technical Brief: Regular Monomorphisms and Epimorphisms in Lean 4 (CategoryTheory.Limits.Regular)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `RegularMono f` | `class (f : X ⟶ Y)` | Defines `f` as the equalizer of some pair `left, right : Y ⟶ Z`. |
| `RegularEpi f` | `class (f : X ⟶ Y)` | Defines `f` as the coequalizer of some pair `left, right : W ⟶ X`. |
| `RegularMono.mono` | `instance [RegularMono f] : Mono f` | Every regular mono is a mono. |
| `RegularEpi.epi` | `instance [RegularEpi f] : Epi f` | Every regular epi is an epi. |
| `equalizerRegular` | `instance` | The equalizer morphism `ι : E ⟶ X` is regular mono. |
| `coequalizerRegular` | `instance` | The coequalizer morphism `π : X ⟶ Q` is regular epi. |
| `RegularMono.ofIsSplitMono` | `instance [IsSplitMono f] : RegularMono f` | Split monos are regular monos. |
| `RegularEpi.ofSplitEpi` | `instance [IsSplitEpi f] : RegularEpi f` | Split epis are regular epis. |
| `regularOfIsPullbackSndOfRegular` | `def` | In a pullback square, if the right leg is regular mono, then the bottom leg is too. |
| `regularOfIsPullbackFstOfRegular` | `def` | Dual: if left leg is regular mono, then top leg is. |
| `regularOfIsPushoutSndOfRegular` | `def` | In a pushout square, if the right leg is regular epi, then the bottom leg is. |
| `regularOfIsPushoutFstOfRegular` | `def` | Dual: if left leg is regular epi, then top leg is. |
| `strongMono_of_regularMono` | `instance [RegularMono f] : StrongMono f` | Regular mono ⇒ strong mono. |
| `strongEpi_of_regularEpi` | `instance [RegularEpi f] : StrongEpi f` | Regular epi ⇒ strong epi. |
| `isIso_of_regularMono_of_epi` | `thm [RegularMono f] [Epi f] : IsIso f` | Regular mono + epi ⇒ iso. |
| `isIso_of_regularEpi_of_mono` | `thm [RegularEpi f] [Mono f] : IsIso f` | Regular epi + mono ⇒ iso. |
| `RegularMonoCategory` | `class` | Category where every mono is regular. |
| `RegularEpiCategory` | `class` | Category where every epi is regular. |
| `regularMonoOfMono` | `def [RegularMonoCategory C] [Mono f] : RegularMono f` | Converts mono to regular mono (non-instance). |
| `regularEpiOfEpi` | `def [RegularEpiCategory C] [Epi f] : RegularEpi f` | Converts epi to regular epi (non-instance). |
| `regularMonoCategoryOfSplitMonoCategory` | `instance` | SplitMonoCategory ⇒ RegularMonoCategory. |
| `regularEpiCategoryOfSplitEpiCategory` | `instance` | SplitEpiCategory ⇒ RegularEpiCategory. |
| `strongMonoCategory_of_regularMonoCategory` | `instance` | RegularMonoCategory ⇒ StrongMonoCategory. |
| `strongEpiCategory_of_regularEpiCategory` | `instance` | RegularEpiCategory ⇒ StrongEpiCategory. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `regularOfIsPullback*` / `regularOfIsPushout*`: constructions in pullback/pushout diagrams.
  - `*OfRegular`: implication from regularity of one leg to another.
  - `regularMonoOf*` / `regularEpiOf*`: converting structural properties (mono/epi/split) to regular ones.
  - `*OfMono` / `*OfEpi`: implications from mono/epi to stronger notions (regular/strong).
- **Suffixes**:
  - `Regular`: indicates regular mono/epi class or instance.
  - `lift'`, `desc'`: universal properties for regular mono/epi (dependent pair return).
  - `isLimit`, `isColimit`: used in class fields to assert universal property.
- **Field names in classes**:
  - `Z`, `W`: domain/codomain objects for equalizer/coequalizer diagrams.
  - `left`, `right`: parallel morphisms.
  - `w`: equality witness (e.g., `f ≫ left = f ≫ right`).

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `aesop_cat`: for category-theoretic simplification (especially `w` fields).
  - `simp`, `simp only`, `erw`: heavy use for rewriting associativity, identities, and universal properties.
  - `rw`: for rewriting equalities, especially with `assoc`, `comm`, `w`.
  - `apply`, `obtain ⟨…⟩`: for destructuring universal properties (`lift'`, `desc'`, `hom_ext`).
  - `repeat (rw …)`: for repeated associativity/whiskering steps.
  - `cancel_mono`, `cancel_epi`: to cancel monos/epis in equations.
  - `apply hom_ext` / `equalizer_ext` / `coequalizer_ext`: uniqueness in universal constructions.
  - `dsimp`, `simp only [Category.assoc]`: for normalization of whiskering/associativity.

---

#### **4. Proof Logic**

- **Inductive structure**:
  - Most proofs follow a *universal property* pattern:
    1. Use `isLimit`/`isColimit` to get a mediating morphism.
    2. Use properties of the diagram (e.g., pullback/pushout commutativity) to verify the mediating morphism satisfies required equations.
    3. Uniqueness follows from the universal property (e.g., `hom_ext`, `equalizer.hom_ext`).
- **Common proof patterns**:
  - **Regular mono ⇒ mono**: via `mono_of_isLimit_fork`.
  - **Split mono ⇒ regular mono**: construct equalizer diagram with `𝟙` and `retraction ∘ f`.
  - **Pullback/pushout stability**: lift/desc through regular mono/epi using universal property, then use pullback/pushout universal property to get the required morphism.
  - **Strong mono/epi from regular**: use definition of strong mono/epi (lifting property), and apply regular mono/epi’s universal property to solve the lifting square.
  - **Iso criterion**: combine regular mono/epi with strong mono/epi + epi/mono ⇒ iso.

---

#### **5. Imports & Scope**

- **Primary imports**:
  - `Mathlib.CategoryTheory.Limits.Shapes.Pullback.HasPullback`
  - `Mathlib.CategoryTheory.Limits.Shapes.StrongEpi`
  - `Mathlib.CategoryTheory.Limits.Shapes.Equalizers`
  - `Mathlib.Lean.Expr.Basic` (for universe polymorphism)
- **Scope**:
  - Focuses on *regular* notions of mono/epi in a general category `C`.
  - Builds on existing limits/colimits infrastructure (equalizers, pullbacks, coequalizers, pushouts).
  - Connects to:
    - `SplitMonoCategory` / `SplitEpiCategory`
    - `StrongMonoCategory` / `StrongEpiCategory`
    - `Mono` / `Epi` classes
- **Noncomputable section**: indicates that some constructions (e.g., `regularEpiOfKernelPair`) may involve noncomputable choice.

---

This module serves as a foundational reference for regular monos/epis in Lean 4’s `Mathlib`, enabling higher-level categorical reasoning (e.g., in topos theory or homological algebra).