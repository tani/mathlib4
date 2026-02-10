### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ContainsIdentities` | `class (W : MorphismProperty C) : Prop` | Asserts that all identity morphisms satisfy property `W`. |
| `id_mem` | `∀ X, W (𝟙 X)` | Witness of identity membership under `ContainsIdentities`. |
| `IsStableUnderComposition` | `class (P : MorphismProperty C) : Prop` | Ensures closure under composition: `P f → P g → P (f ≫ g)`. |
| `comp_mem` | `P f → P g → P (f ≫ g)` | Application of stability under composition. |
| `StableUnderInverse` | `∀ (e : X ≅ Y), P e.hom → P e.inv` | Closure under inverses of isomorphisms. |
| `IsMultiplicative` | `class extends ContainsIdentities × IsStableUnderComposition` | Combines identity containment and composition stability. |
| `HasOfPostcompProperty` | `class (W W' : MorphismProperty C)` | If `g ∈ W'` and `f ≫ g ∈ W`, then `f ∈ W`. |
| `HasOfPrecompProperty` | `class (W W' : MorphismProperty C)` | If `f ∈ W'` and `f ≫ g ∈ W`, then `g ∈ W`. |
| `HasTwoOutOfThreeProperty` | `class extends IsStableUnderComposition × HasOfPostcompProperty × HasOfPrecompProperty` | If two of `f`, `g`, `f ≫ g` are in `W`, so is the third. |
| `naturalityProperty` | `∀ X, F₁.obj X ⟶ F₂.obj X → MorphismProperty C` | Property of morphisms `f` such that `F₁ f ≫ app = app ≫ F₂ f`. |
| `respectsIso_of_isStableUnderComposition` | `IsStableUnderComposition → (isomorphisms ≤ P) → RespectsIso P` | Derives iso-respecting from composition stability + iso containment. |
| `isomorphisms_le_of_containsIdentities` | `[ContainsIdentities] [RespectsIso] → isomorphisms ≤ P` | If `P` contains identities and respects iso, then all isos satisfy `P`. |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `is_`: e.g., `IsStableUnderComposition`, `IsMultiplicative`
  - `of_`: e.g., `of_isIso`, `of_postcomp`, `of_precomp`
  - `stableUnder`: e.g., `StableUnderInverse`
  - `contains`: e.g., `ContainsIdentities`
- **Suffixes**:
  - `_property`: e.g., `naturalityProperty`, `HasTwoOutOfThreeProperty`
  - `_mem`: e.g., `id_mem`, `comp_mem`
- **Operational patterns**:
  - `.op`, `.unop`: for dualization (e.g., `W.op.ContainsIdentities`)
  - `.inverseImage`: pullback along a functor
  - `.inf`, `.Prod`, `.Pi`: for constructing new properties from existing ones

#### 3. **Tactic Stack**

Frequent tactics used in proofs:
- `simp only [...]`: simplification with specific lemmas (e.g., `naturalityProperty`, `F.map_id`, `F.map_comp`)
- `rw [...]`: rewriting using equalities (e.g., associativity, functoriality)
- `apply ...`: e.g., `apply mono_comp`, `apply epi_comp`
- `slice_lhs`, `slice_rhs`: localized rewriting in subterms
- `cancel_epi`, `cancel_mono`: cancellation lemmas for monos/epis
- `infer_instance`: auto-inference of typeclass instances
- `by simpa using ...`: simplifies goal using a hypothesis

#### 4. **Proof Logic**

- **Inductive / structural reasoning** on morphism properties via typeclasses.
- **Instance construction** often uses `⟨...⟩` to combine proofs for product-like properties (`inf`, `Prod`, `Pi`).
- **Dualization** is handled uniformly via `op`/`unop` lemmas, often mirroring base-case proofs.
- **Functorial pullbacks** (`inverseImage`) rely on `simpa using F.map_id` or `F.map_comp`.
- **Two-out-of-three proofs** use iso cancellation lemmas (`inv`, `hom_inv_id`, etc.) and `simpa`.
- **Naturality property proofs** involve diagram chasing with `assoc`, `map_comp`, and ` Functor.map_id`.

#### 5. **Imports**

- `Mathlib.CategoryTheory.MorphismProperty.Basic`: core definitions of morphism properties, their operations (`inf`, `Prod`, `Pi`, `inverseImage`, `op`, `unop`), and basic classes (`Respects`, `RespectsIso`, etc.)

This module builds on foundational morphism property infrastructure to formalize closure properties (stability under composition, inverses), logical closure conditions (two-out-of-three), and their behavior under categorical constructions (opposites, products, functors).