### Technical Brief: Pullback/Pushout Squares and Bicartesian Squares in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `CommSq f g h i` | `Type u₁` | Represents a *commutative square* `f ≫ h = g ≫ i`. |
| `IsPullback fst snd f g` | `Prop` | States that the square with legs `fst`, `snd`, `f`, `g` is a *pullback* (limit cone). |
| `IsPushout f g inl inr` | `Prop` | States that the square with legs `f`, `g`, `inl`, `inr` is a *pushout* (colimit cocone). |
| `BicartesianSq f g h i` | `Prop` | A square that is both a pullback and a pushout. |
| `cone s`, `cocone s` | `PullbackCone h i`, `PushoutCocone f g` | Extracts the underlying cone/cocone from a `CommSq`. |
| `IsPullback.cone h`, `IsPushout.cocone h` | `PullbackCone f g`, `PushoutCocone f g` | Extracts the *limiting* cone/cocone from an `IsPullback`/`IsPushout`. |
| `IsPullback.lift hP h k w` | `W ⟶ P` | Universal morphism into the pullback object. |
| `IsPushout.desc hP h k w` | `P ⟶ W` | Universal morphism out of the pushout object. |
| `IsPullback.isoIsPullback h h'` | `P ≅ P'` | Uniqueness of pullback objects up to iso. |
| `IsPullback.isoPullback h` | `P ≅ pullback f g` | Identification of any pullback with the one from `HasPullback`. |
| `IsPullback.of_hasPullback` | `IsPullback (pullback.fst f g) (pullback.snd f g) f g` | Connects `IsPullback` to the standard `HasPullback` API. |
| `IsPullback.paste_vert`, `IsPullback.paste_horiz` | `IsPullback …` | Pasting lemmas for pullbacks (vertical/horizontal composition). |
| `IsPullback.of_bot`, `IsPullback.of_right` | `IsPullback …` | “Pullback reflection” lemmas: if bottom/right square + composite is pullback, then top/left is too. |
| `IsPushout.isoIsPushout`, `IsPushout.isoPushout` | `P ≅ P'`, `P ≅ pushout f g` | Pushout analogues of pullback uniqueness/identification. |
| `IsPushout.of_hasPushout` | `IsPushout f g (pushout.inl f g) (pushout.inr f g)` | Connects `IsPushout` to `HasPushout`. |
| `BicartesianSq.of_hasBinaryProduct`, `BicartesianSq.of_hasBinaryCoproduct` | `BicartesianSq …` | Biproduct squares are bicartesian. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isLimit'`, `isColimit'`: Internal proof data (noncomputable choice).
  - `cone`, `cocone`: Extract underlying (non-limiting) cone/cocone.
  - `lift`, `desc`: Universal morphisms for pullback/pushout.
  - `isoIsPullback`, `isoIsPushout`: Uniqueness isos.
  - `of_*`: Constructions *from* known limits/colimits.
  - `paste_*`, `of_*`: Pasting/reflection lemmas.

- **Suffixes**:
  - `_hom_fst`, `_hom_snd`, `_inv_fst`, `_inv_snd`: Behavior of iso components under composition.
  - `_hom`, `_inv`: Hom/inverse parts of isomorphisms.
  - `_iff`: Equivalence statements (e.g., `flip_iff`).

- **Special**:
  - `flip`: Swaps horizontal/vertical legs (pullback ↔ pullback of flipped square).
  - `zero_left`, `zero_top`, `zero_right`, `zero_bot`: Trivial pullbacks involving zero morphisms.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `aesop_cat`, `aesop`: Automated reasoning for category theory (commutativity, iso properties).
  - `simp`, `simp_rw`: Simplification using `@[simp]` lemmas (e.g., `cone_fst`, `lift_fst`).
  - `rfl`, `refl`: Reflexivity for definitional equalities.
  - `dsimp`: Definitional simplification (e.g., unfolding `isoPullback`).
  - `subsingleton`: For proving equalities in subsingleton types (e.g., `Prop` or `IsLimit`).
  - `convert`: For flexible equality proofs using definitional equality + proof irrelevance.

- **Category-theoretic helpers**:
  - `cancel_mono`, `cancel_epi`: Monomorphism/epimorphism cancellation.
  - `reassoc`: Reassociation of compositions (used with `@[reassoc]` attribute).
  - `ext`: Extensionality lemmas for cones/cocones (`PullbackCone.ext`, `PushoutCocone.ext`).
  - `isoMk`, `isoMk.symm`: Constructing isomorphisms from cone/cocone equivalences.

---

#### **4. Proof Logic**

- **Structure of proofs**:
  1. **Construct cone/cocone** from data (`CommSq`, `PullbackCone.mk`, etc.).
  2. **Show limiting/colimiting** via `IsLimit.mk`, `IsColimit.mk`, or `of_isLimit`, `of_isColimit`.
  3. **Use universal properties** (`lift`, `desc`, `hom_ext`) to prove uniqueness/equalities.
  4. **Leverage isomorphism invariance** (`of_iso`, `of_iso_pullback`, `of_iso_pushout`) to transfer structure along isos.
  5. **Pasting/reflection**: Combine known pullbacks/pushouts using `paste_*` and `of_*` lemmas.

- **Common patterns**:
  - **Uniqueness up to iso**: Use `IsLimit.conePointUniqueUpToIso` / `IsColimit.coconePointUniqueUpToIso`.
  - **Equivalence with standard API**: `of_hasPullback`, `of_hasPushout` bridge `IsPullback`/`IsPushout` to `HasPullback`/`HasPushout`.
  - **Zero-object simplifications**: Use `HasZeroObject` + `HasZeroMorphisms` to reduce to zero morphisms (e.g., `zero_left`, `of_hasBinaryProduct`).
  - **Flipping**: Use `flip` to swap legs and reuse lemmas (e.g., `paste_horiz` via `paste_vert` on flipped squares).

---

#### **5. Imports & Scope**

- **Primary dependencies**:
  - `Mathlib.CategoryTheory.Limits.Constructions.ZeroObjects`: Zero objects, zero morphisms.
  - `Mathlib.CategoryTheory.Limits.Shapes.Biproducts`: Biproducts and their bicartesian squares.
  - `Mathlib.CategoryTheory.Limits.Shapes.Pullback.Pasting`: Pasting lemmas for pullbacks.

- **Scope**:
  - Noncomputable section (uses choice for `isLimit'`, `isColimit'`).
  - Universe polymorphism: `u₁`, `v₁`, `u₂`, `v₂`.
  - Localized to `CategoryTheory` namespace.

- **Key abstractions**:
  - `CommSq`: Unified language for commutative squares.
  - `IsPullback`/`IsPushout`: Propositional refinements of `IsLimit`/`IsColimit`.
  - `BicartesianSq`: Joint pullback + pushout squares (used for biproducts, Mayer–Vietoris, etc.).

--- 

This module provides a *practical API* for working with pullbacks/pushouts as *squares*, avoiding explicit cone/cocone manipulation, while maintaining full compatibility with the `HasLimit`/`HasColimit` infrastructure.