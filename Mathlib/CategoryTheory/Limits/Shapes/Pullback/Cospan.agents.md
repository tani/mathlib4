### Technical Brief: Cospan & Span in Lean 4 / Mathlib

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `WalkingCospan` | `Type` — Index category for pullback diagrams (wide pullback over `WalkingPair`). Objects: `left`, `right`, `one`. |
| `WalkingSpan` | `Type` — Index category for pushout diagrams (wide pushout over `WalkingPair`). Objects: `left`, `right`, `zero`. |
| `WalkingCospan.Hom` | Hom-family: `left ⟶ one`, `right ⟶ one`, identities. Subsingleton homs. |
| `WalkingSpan.Hom` | Hom-family: `zero ⟶ left`, `zero ⟶ right`, identities. Subsingleton homs. |
| `cospan f g` | Functor `WalkingCospan ⥤ C` sending `left ↦ X`, `right ↦ Y`, `one ↦ Z`, and arrows to `f`, `g`. |
| `span f g` | Functor `WalkingSpan ⥤ C` sending `left ↦ Y`, `right ↦ Z`, `zero ↦ X`, and arrows to `f`, `g`. |
| `WalkingCospan.ext` | Isomorphism extension lemma: cone iso over `WalkingCospan` determined by iso on apex commuting with legs to `left` and `right`. |
| `WalkingSpan.ext` | Cocone iso extension lemma: cocone iso over `WalkingSpan` determined by iso on apex commuting with legs from `left` and `right`. |
| `diagramIsoCospan` | Natural isomorphism `F ≅ cospan (F.map inl) (F.map inr)` — every pullback-shaped diagram is equal (up to iso) to a `cospan`. |
| `diagramIsoSpan` | Natural isomorphism `F ≅ span (F.map fst) (F.map snd)` — every pushout-shaped diagram is equal (up to iso) to a `span`. |
| `cospanCompIso` | `cospan f g ⋙ F ≅ cospan (F.map f) (F.map g)` — compatibility of `cospan` with functor composition. |
| `spanCompIso` | `span f g ⋙ F ≅ span (F.map f) (F.map g)` — compatibility of `span` with functor composition. |
| `cospanExt` | Isomorphism of cospans induced by component isos `iX`, `iY`, `iZ` commuting with structure maps (`wf`, `wg`). |
| `spanExt` | Isomorphism of spans induced by component isos commuting with structure maps. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `WalkingCospan.` / `WalkingSpan.` — for index categories and their structure.
  - `Hom.` — for morphisms in walking (co)spans: `inl`, `inr`, `id`, `fst`, `snd`.
  - `cospan_` / `span_` — for constructions and lemmas about (co)spans.
- **Suffixes**:
  - `_app_*` — for components of natural isomorphisms at specific objects (`left`, `right`, `one`, `zero`).
  - `_hom_app_*` / `_inv_app_*` — for components of forward/inverse parts of isomorphisms.
  - `_map_*` — for action of `cospan`/`span` on morphisms (`map_inl`, `map_fst`, etc.).
- **Pattern matches**:
  - `some WalkingPair.left/right`, `none` — encoding of `WidePullbackShape`/`WidePushoutShape`.
  - `⟨⟩ | ⟨⟨⟩⟩` — pattern matching on `WalkingPair` and `WalkingCospan`/`WalkingSpan` elements.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `rfl`, `simp`, `simp_rw`, `dsimp`
  - `intro`, `intro h`, `rintro`, `cases`, `rcases`
  - `apply`, `exact`, `refine`
- **Category-theoretic helpers**:
  - `Cones.ext`, `Cocones.ext` — extension lemmas for (co)cones.
  - `NatIso.ofComponents` — constructing natural isomorphisms from components.
  - `eqToIso` — converting equalities to isomorphisms.
- **Simplification & automation**:
  - `simp only [...]` — for targeted simplification using known lemmas.
  - `simp_rw` — for rewriting with equations involving `comp`, `id`, `assoc`.
  - `cases f <;> dsimp <;> simp` — standard pattern for handling morphism cases in small diagrams.

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - **Induction/Case analysis** on objects/morphisms of `WalkingCospan`/`WalkingSpan` (3 objects, ≤1 morphism per hom-set).
  - Use of **naturality squares** (e.g., `s.π.naturality inl`) to relate cone/cocone components.
  - **Subsingleton homs** → equality of morphisms follows from typeclass instance.
  - **Isomorphism extension lemmas** (`ext`) reduce isomorphism proofs to checking apex and legs.
  - **`simps!`**-style definitions ensure all components are definitionally equal where possible.

- **Typical proof flow**:
  1. Construct candidate iso (e.g., via `Cones.ext` or `NatIso.ofComponents`).
  2. Prove commutativity using naturality and given equations (`wf`, `wg`).
  3. Simplify using `simp only`, `dsimp`, and `assoc`/`id` lemmas.
  4. Use `ext` lemmas to conclude isomorphism.

---

#### **5. Imports & Scope**

- **Primary imports**:
  - `Mathlib.CategoryTheory.Limits.Shapes.WidePullbacks`
  - `Mathlib.CategoryTheory.Limits.Shapes.BinaryProducts`
- **Scope**:
  - Defines *walking* (co)spans as index categories for (co)limits.
  - Provides tools to reason about diagrams shaped like pullback/pushout squares.
  - Enables abstraction over arbitrary pullback/pushout diagrams via `cospan`/`span`.
- **Universe polymorphism**:
  - Universes `w v₁ v₂ v u u₂` — supports arbitrary large/small categories.

---

This module serves as a foundational building block for reasoning about pullbacks and pushouts in category theory, especially in the context of limits/colimits and their universal properties. It is designed for reuse in higher-level constructions (e.g., pullback squares, base change, fiber products).