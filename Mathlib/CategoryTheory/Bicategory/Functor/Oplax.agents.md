### Technical Metadata Brief: `CategoryTheory.Bicategory.Functor.Oplax`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Structure | Purpose |
|------|------------------|---------|
| `OplaxFunctor B C` | `Structure` | Defines an oplax functor between bicategories `B` and `C`, extending `PrelaxFunctor` with oplax unity and functoriality constraints (`mapId`, `mapComp`) and coherence laws. |
| `OplaxFunctor.toPrelaxFunctor` | `F : OplaxFunctor B C → PrelaxFunctor B C` | Forgets the oplax structure to the underlying prelax functor. |
| `OplaxFunctor.id B` | `OplaxFunctor B B` | Identity oplax functor on a bicategory `B`. |
| `OplaxFunctor.comp F G` | `OplaxFunctor B C → OplaxFunctor C D → OplaxFunctor B D` | Composition of oplax functors. |
| `OplaxFunctor.PseudoCore F` | `Structure` | Additional data to upgrade an oplax functor `F` to a pseudofunctor: invertible `mapIdIso`, `mapCompIso` coherent with `mapId`, `mapComp`. |
| `OplaxFunctor.mapComp_assoc_right` | `lemma` | Rewrites `mapComp` using associator to move composition to the right. |
| `OplaxFunctor.mapComp_assoc_left` | `lemma` | Rewrites `mapComp` using associator to move composition to the left. |

**Coherence Axioms (as lemmas/fields):**
- `mapComp_naturality_left`: naturality of `mapComp` in the left argument.
- `mapComp_naturality_right`: naturality of `mapComp` in the right argument.
- `map₂_associator`: coherence with bicategorical associator.
- `map₂_leftUnitor`: coherence with left unitor.
- `map₂_rightUnitor`: coherence with right unitor.

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `mapId`: oplax unity constraint (maps identity 1-morphisms to identities).
  - `mapComp`: oplax functoriality constraint (maps composites to composites of images).
  - `map₂`: action on 2-morphisms (inherited from `PrelaxFunctor`).
  - `PseudoCore.*`: data for pseudofunctor upgrade.

- **Suffixes:**
  - `_left`, `_right`: indicate naturality in left/right argument.
  - `_assoc[_left|_right]`: associator-based rewrites.
  - `_hom`: refers to the underlying 2-morphism (not iso) in `PseudoCore`.

- **Structure fields:**
  - `toPrelaxFunctor`: standard extension pattern (inherit prelax structure).
  - `mapId`, `mapComp`: primary oplax constraints.

---

#### **3. Tactic Stack**

- **`aesop_cat`**: used in field definitions (`mapComp_naturality_left`, `mapComp_naturality_right`, `mapIdIso_hom`, `mapCompIso_hom`) to discharge bicategorical diagrammatic reasoning.
- **`simp` / `simp only [...]`**: heavily used in proofs of `comp`, `mapComp_assoc_*`, and coherence lemmas.
- **`rw [...]`**: for rewriting using coherence laws (e.g., `map₂_associator`, `map₂_leftUnitor`).
- **`dsimp`**: simplifies definitions before `simp`.
- **`assoc`**: reassociates whiskering/composition.
- **`reassoc`, `to_app`**: custom attributes for `simp`-friendly rewriting of whiskered morphisms.

---

#### **4. Proof Logic**

- **Structure definitions** are built by extending `PrelaxFunctor` and adding oplax constraints.
- **Coherence proofs** (e.g., for `comp`) follow a standard pattern:
  1. `dsimp` to unfold definitions.
  2. Use `simp only [...]` with known coherence lemmas (`map₂_associator`, `map₂_leftUnitor`, etc.).
  3. Apply naturality and associativity lemmas (e.g., `mapComp_naturality_left`, `comp_whiskerRight`).
  4. Use `assoc` to align domain/codomain mismatches.
- **Lemmas like `mapComp_assoc_right/left`** are proven by:
  - Rewriting with `← map₂_associator`.
  - Applying `map₂_comp_assoc` and simplifying.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Bicategory.Functor.Prelax` | Provides `PrelaxFunctor`, the base structure for lax/oplax functors. |
| `Mathlib.Tactic.CategoryTheory.ToApp` | Enables `to_app` attribute for whiskering/simplification. |

---

### Summary

This file formalizes **oplax functors between bicategories**, extending prelax functors with oplax unity and functoriality constraints and their coherence laws. It includes:
- Core definitions (`OplaxFunctor`, `id`, `comp`),
- Coherence lemmas (`map₂_associator`, `map₂_leftUnitor`, etc.),
- A `PseudoCore` structure for lifting to pseudofunctors,
- A tactic-heavy proof style relying on `aesop_cat`, `simp`, and `rw`.

The formalization is consistent with Lean 4’s `CategoryTheory` library conventions, emphasizing diagrammatic reasoning and coherence in bicategories.