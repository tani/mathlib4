Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Pasting Lemma for Pullbacks and Pushouts in Category Theory**

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `PullbackCone.pasteHoriz` | Constructs a pullback cone over the composite span `g₁ ≫ g₂` by horizontally pasting two pullback cones `t₁`, `t₂`. Requires `i₂ = t₂.fst`. |
| `PullbackCone.pasteVert` | Constructs a pullback cone over `f₂ ≫ f₁` by vertically pasting two pullback cones `t₁`, `t₂`. Requires `i₂ = t₁.snd`. |
| `PushoutCocone.pasteHoriz` | Constructs a pushout cocone over `f₁ ≫ f₂` by horizontally pasting two pushout cocones `t₁`, `t₂`. Requires `i₂ = t₁.inr`. |
| `PushoutCocone.pasteVert` | Constructs a pushout cocone over `g₂ ≫ g₁` by vertically pasting two pushout cocones `t₁`, `t₂`. Requires `i₂ = t₁.inl`. |
| `pasteHorizIsPullback` | **Main theorem**: If both small squares are pullbacks, then the pasted (big) square is a pullback. |
| `leftSquareIsPullback` | **Main theorem**: If the right square and the big square are pullbacks, then the left square is a pullback. |
| `pasteHorizIsPullbackEquiv` | Equivalence: Given the right square is a pullback, the big square is a pullback iff the left square is. |
| `pasteVertIsPullback` | Vertical pasting lemma for pullbacks: if both small vertical squares are pullbacks, then the big square is. |
| `topSquareIsPullback` | Vertical version of `leftSquareIsPullback`: top square is pullback if bottom and big are. |
| `pasteHorizIsPushout` | Dually: if both small horizontal squares are pushouts, then the big square is. |
| `rightSquareIsPushout` | Dually: right square is pushout if left and big are. |
| `pasteHorizIsPushoutEquiv` | Equivalence: left square pushout ⇒ big square pushout ⇔ right square pushout. |
| `pasteVertIsPushout` | Vertical pasting lemma for pushouts. |
| `botSquareIsPushout` | Bottom square pushout if top and big are. |
| `pullbackRightPullbackFstIso` | Canonical iso: `W ×[X] (X ×[Z] Y) ≅ W ×[Z] Y`. |
| `pullbackLeftPullbackSndIso` | Canonical iso: `(X ×[Z] Y) ×[Y] W ≅ X ×[Z] W`. |
| `pushoutLeftPushoutInrIso` | Canonical iso: `(Y ⨿[X] Z) ⨿[Z] W ≅ Y ⨿[X] W`. |
| `pushoutRightPushoutInlIso` | Canonical iso: `W ⨿[Y] (Y ⨿[X] Z) ≅ W ⨿[X] Z`. |

#### **2. Naming Conventions**

- **Prefixes**:
  - `pasteHoriz` / `pasteVert`: indicate horizontal/vertical pasting.
  - `leftSquareIsPullback`, `rightSquareIsPushout`, `topSquareIsPullback`, `botSquareIsPushout`: indicate which square is deduced.
  - `pullback*`, `pushout*`: indicate pullback/pushout context.
- **Suffixes**:
  - `Iso`: canonical isomorphism.
  - `Equiv`: equivalence of properties (often under a hypothesis).
  - `Flip`: indicates use of duality via `flip`.
- **Notation**:
  - `fst`, `snd`, `inl`, `inr`: standard projections/inclusions for pullbacks/pushouts.
  - `cone`, `cocone`: used for underlying cones/cocones.
  - `mk`, `hom`, `inv`: constructor and component accessors for isomorphisms.

#### **3. Tactic Stack**

- **Core proof tactics**:
  - `apply PullbackCone.isLimitAux'` / `PushoutCocone.isColimitAux'`: standard induction/elimination for limits/colimits.
  - `obtain ⟨l, hl, hl'⟩ := ...`: destruct universal properties.
  - `rw [Category.assoc, reassoc_of% ...]`: associativity rewrites.
  - `simp [reassoc_of% ..., hl, hl']`: simplification using hypotheses and associativity lemmas.
  - `apply PullbackCone.IsLimit.hom_ext H`: uniqueness via universal property.
  - `IsLimit.conePointUniqueUpToIso`: for constructing canonical isos between limit objects.
  - `Iso.ext`: extensionality for isomorphisms.
  - `Subsingleton.elim _ _`: used in `Equiv` proofs to show inverses are mutual.

#### **4. Proof Logic**

- **General pattern**:
  1. **Existence**: Use universal property of one square to get an intermediate lift, then use the other square to refine it.
  2. **Compatibility**: Verify that the constructed morphism respects cone/cocone structure using the other square’s universal property.
  3. **Uniqueness**: Use hom-extension (`hom_ext`) from the universal property twice (once per square).
- **Duality**:
  - Vertical lemmas often reduce to horizontal ones via `flip` and `flipIsLimit`/`flipIsColimit`.
  - `pasteVertFlip` / `pasteVertFlip` lemmas show equivalence of pasting orders under duality.
- **Isomorphism construction**:
  - Use `conePointUniqueUpToIso` (or cocone variant) with `IsLimit`/`IsColimit` data.
  - Prove component equations via `comp_*` lemmas (e.g., `hom_comp_fst`, `inv_comp_snd`).

#### **5. Imports**

- `Mathlib.CategoryTheory.Limits.Shapes.Pullback.HasPullback`: foundational pullback API.
- Implicitly depends on:
  - `CategoryTheory.Limits.Shapes.Pullback`
  - `CategoryTheory.Limits.Shapes.Pushout`
  - `CategoryTheory.Limits.Limits` (for `HasLimit`, `HasColimit`, `IsLimit`, `IsColimit`)
  - `CategoryTheory.Category.Basic` (for `Category`, `⟦`, `≫`, `assoc`, etc.)

---

This file formalizes the *pasting lemma* for pullbacks and pushouts in an abstract categorical setting, along with canonical isomorphisms for iterated pullbacks/pushouts — a cornerstone for reasoning about limits/colimits in diagrams.