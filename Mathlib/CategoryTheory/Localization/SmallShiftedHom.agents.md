### Technical Metadata Brief: Shrinking Morphisms in Localized Categories with Shifts

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `HasSmallLocalizedShiftedHom.{w} W M X Y` | `Prop` | States that all localized morphisms `X⟦a⟧ ⟶ Y⟦b⟧` (for `a b : M`) are `w`-small. |
| `SmallShiftedHom.{w} W X Y m` | `Type w` | The "shrunk" type of morphisms from `X` to `Y⟦m⟧` in the localized category, assuming `HasSmallLocalizedShiftedHom`. |
| `SmallShiftedHom.shift` | `SmallShiftedHom W X Y a → n a' : M → a + n = a' → SmallHom W (X⟦n⟧) (Y⟦a'⟧)` | Shifts a morphism by `n`, adjusting target degree via `a + n = a'`. |
| `SmallShiftedHom.comp` | `SmallShiftedHom W X Y a → SmallShiftedHom W Y Z b → b + a = c → SmallShiftedHom W X Z c` | Defines composition in `SmallShiftedHom`, using `SmallHom.comp` and `shift`. |
| `SmallShiftedHom.mk₀` | `(m₀ : M) → m₀ = 0 → X ⟶ Y → SmallShiftedHom W X Y m₀` | Embeds original morphisms into degree-0 shifted homs. |
| `SmallShiftedHom.equiv` | `SmallShiftedHom W X Y m ≃ ShiftedHom (L.obj X) (L.obj Y) m` | Equivalence between shrunk morphisms and actual shifted homs in the localized category `D`, for localization `L`. |
| `equiv_comp` | `equiv (f.comp g h) = equiv f ≫ equiv g h` | Compatibility of `equiv` with composition. |
| `equiv_shift'` / `equiv_shift` | Describes behavior of `equiv` under `shift`. | Ensures coherence of shift with localization equivalence. |
| `equiv_mk₀` | `equiv (mk₀ f) = ShiftedHom.mk₀ (L.map f)` | Compatibility of `equiv` with embedding of original morphisms. |
| `comp_assoc` | Associativity of `comp` in `SmallShiftedHom`. | Proven via injectivity of `equiv` and associativity in `ShiftedHom`. |
| `hasSmallLocalizedShiftedHom_iff` | ↔ between smallness in `C[W⁻¹]` and in `D` via `L`. | Key equivalence linking abstract smallness to concrete sets in `D`. |
| `hasSmallLocalizedShiftedHom_iff_target/source` | Smallness preserved under `W`-morphisms (with compatibility). | Shows stability of smallness under base change along `W`. |
| `SmallHom.shift` | `SmallHom W X Y → a : M → SmallHom W (X⟦a⟧) (Y⟦a⟧)` | Shifts elements of `SmallHom`. |
| `SmallHom.equiv_shift` | Describes how `equiv` interacts with `shift`. | Ensures naturality of the equivalence w.r.t. shifts. |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `hasSmallLocalized...`: Property-level (Prop-valued) definitions.
  - `Small...`: Type-valued constructions (e.g., `SmallHom`, `SmallShiftedHom`).
  - `equiv...`: Equivalences involving localization.
  - `shift...`: Operations or lemmas involving the shift action.
  - `mk...`: Constructors (e.g., `mk₀`, `mk`).

- **Suffixes:**
  - `...₀`: Special case for degree `0`.
  - `...ₐ`, `...ₐ₁`, etc.: Indices for degrees in additive monoid `M`.
  - `..._add`, `..._zero`: Lemmas about additive structure (e.g., `shiftFunctorAdd`, `shiftFunctorZero`).

- **Notable patterns:**
  - `equiv W L f`: Equivalence map for `f : SmallHom` or `SmallShiftedHom`.
  - `L.commShiftIso a`: Natural isomorphism expressing that `L` commutes with shift by `a`.
  - `W.shift hf a`: Shift of a `W`-morphism `f`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp only [...]`: Simplification with precise lemmas (especially for `Iso`, `Functor`, `ShiftedHom`).
- `rw [...]`: Rewriting using equalities like `add_assoc`, `h : a + n = a'`.
- `erw [...]`: Rewriting with definitional equalities (e.g., for `equiv`, `shift`).
- `dsimp`: Definitional simplification (e.g., unfolding `equiv`, `mk₀`, `shift`).
- `congr`: To prove equality of equivalences or isomorphisms.
- `apply ...injective`: To reduce proofs to checking images under injective maps (e.g., `equiv W W.Q`).
- `rfl`: Reflexivity for definitional equalities (e.g., in `equiv_shift`).
- `aesop`: Likely used in background simplification (not explicit here, but standard in Mathlib).

---

#### **4. Proof Logic**

- **Structure of proofs:**
  - Most lemmas follow a pattern: unfold definitions → apply known equivalences (`equiv`, `Iso.app_hom`, etc.) → simplify using `simp only` and `erw`.
  - Key technique: **transport along equivalences** — e.g., proving a property in `SmallShiftedHom` by mapping via `equiv` to `ShiftedHom`, where properties (like associativity) are already known.
  - **Inductive/structural reasoning on `M`**: Additive monoid structure is used heavily (e.g., `a + n = a'`, `b + a = c`).
  - **Naturality arguments**: Many lemmas (`equiv_shift`, `equiv_comp`) verify naturality of `equiv` w.r.t. shift and composition.

- **Typical flow:**
  1. Unfold definitions (`equiv`, `shift`, `comp`, `mk₀`).
  2. Apply known lemmas (`SmallHom.equiv_comp`, `Iso.homToEquiv_apply`, `L.commShiftIso_add'`).
  3. Simplify using `simp only` with associativity, unit laws, and functoriality.
  4. Conclude via `rfl` or injectivity of `equiv`.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Localization.SmallHom` | Foundation for `SmallHom`, small localized homs, and `equiv W L`. |
| `Mathlib.CategoryTheory.Shift.ShiftedHom` | Defines `ShiftedHom`, shift functors, and basic properties. |
| `Mathlib.CategoryTheory.Shift.Localization` | Localization functors commuting with shifts (`CommShift`), `commShiftIso`, etc. |

**Domain scope**: Homological algebra / derived categories, specifically formalism of *localized categories with shifts* (e.g., derived categories of abelian categories with shift = translation). The framework supports constructions like derived functors, localizations at acyclic objects, and smallness conditions for homotopy colimits.

--- 

Let me know if you'd like a diagrammatic summary or a formalized summary in Lean syntax.