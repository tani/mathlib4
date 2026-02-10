### Technical Brief: Shift Functors in Lean 4 (Category Theory)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `HasShift C A` | `Class` | Asserts existence of a monoidal functor `Discrete A ⥤ C ⥤ C`, i.e., a shift indexed by additive monoid `A`. |
| `shiftFunctor C i` | `C ⥤ C` | The shift functor associated to `i : A`. |
| `shiftFunctorZero C A` | `shiftFunctor C 0 ≅ 𝟭 C` | Isomorphism expressing shift by `0` is identity. |
| `shiftFunctorAdd C i j` | `shiftFunctor C (i + j) ≅ shiftFunctor C i ⋙ shiftFunctor C j` | Compatibility of shift with addition. |
| `shiftFunctorAdd' C i j k h` | `h : i + j = k ⇒ shiftFunctor C k ≅ shiftFunctor C i ⋙ shiftFunctor C j` | Variant of `shiftFunctorAdd` for explicit equality `h`. |
| `shiftEquiv' C i j h` | `i + j = 0 ⇒ C ≌ C` | Equivalence induced by shifts `i`, `j` when they sum to zero. |
| `shiftEquiv C n` | `C ≌ C` | Special case: shift by `n` and `-n` form an equivalence. |
| `shiftFunctorComm C i j` | `shiftFunctor C i ⋙ shiftFunctor C j ≅ shiftFunctor C j ⋙ shiftFunctor C i` | Commutativity of shifts when indexing monoid is commutative. |
| `shiftComm X i j` | `X⟦i⟧⟦j⟧ ≅ X⟦j⟧⟦i⟧` | Object-level version of `shiftFunctorComm`. |
| `shiftFunctorCompIsoId C i j h` | `i + j = 0 ⇒ shiftFunctor C i ⋙ shiftFunctor C j ≅ 𝟭 C` | Isomorphism showing composition of inverse shifts is identity. |

**Notation:**
- `X⟦n⟧` = `(shiftFunctor _ n).obj X`
- `f⟦n⟧'` = `(shiftFunctor _ n).map f`

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `shiftFunctor*`: Core shift functors and natural isomorphisms.
  - `shift*`: Object/morphism-level shift operations (`shiftAdd`, `shiftZero`, `shiftEquiv`, `shiftComm`, `shiftShiftNeg`, etc.).
  - `shiftFunctorCompIsoId*`: Isomorphisms for inverse shifts.

- **Suffixes:**
  - `'` (e.g., `shiftFunctorAdd'`): Variant with explicit equality hypothesis.
  - `_hom_app`, `_inv_app`: Component-wise hom/inv application lemmas.
  - `_assoc`, `_zero_add`, `_add_zero`: Coherence laws for associativity/unitality.
  - `_symm`: Symmetry of isomorphisms (e.g., `shiftFunctorComm_symm`).

- **Structure fields:**
  - `F`, `zero`, `add`, `assoc_hom_app`, `zero_add_hom_app`, `add_zero_hom_app`: In `ShiftMkCore`.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `aesop_cat`: For categorical reasoning (especially naturality, coherence).
- `simp` / `dsimp`: Simplification using `@[simp]` lemmas (e.g., `eqToHom_map`, `Functor.map_id`, `Iso.hom_inv_id_app`).
- `rw`: Rewriting using equalities and isomorphism laws.
- `ext`: Extensionality for natural transformations/isomorphisms.
- `convert`, `congr`: For equational reasoning with dependent types.
- `cancel_mono`, `cancel_epi`: Cancellation lemmas in monic/epic contexts.
- `erw`: Eager rewriting (used for `δ_μ_app_assoc`, etc.).
- `all_goals`: Applied after `convert` in `shiftEquiv'`.

---

#### **4. Proof Logic**

- **Structure of proofs:**
  - Most proofs follow a pattern:  
    `ext X` → `dsimp [definitions]` → `simp only [...]` → `rfl` or `congr`.
  - Coherence lemmas (e.g., `shiftFunctorAdd'_assoc`) are proven by:
    - Extending to objects `X : C`
    - Unfolding definitions (`shiftFunctorAdd'`, `shiftFunctorAdd`, etc.)
    - Applying `simp` with monoidal functor coherence laws (`Discrete.addMonoidal_associator`, `δ_μ_app`, etc.)
    - Using `eqToHom_trans`, `eqToHom_refl`, `Iso.hom_inv_id_app`, etc.

- **Inductive/structural reasoning:**
  - Not induction on `A`, but structural reasoning over:
    - Additive structure (`add_assoc`, `zero_add`, `add_zero`)
    - Group structure (`add_neg_cancel`, `neg_add_cancel`)
    - Commutativity (`add_comm`)

- **Equivalence proofs:**
  - `shiftEquiv'` uses `equivOfTensorIsoUnit` from monoidal functor theory.
  - Triangle identities verified via naturality and coherence.

- **Zero morphism compatibility:**
  - `shift_zero_eq_zero` uses `Functor.map_zero`.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Algebra.Group.Basic` | Basic group/monoid arithmetic (used for `AddMonoid`, `AddGroup`, `AddCommMonoid`). |
| `Mathlib.CategoryTheory.Limits.Preserves.Shapes.Zero` | For `HasZeroMorphisms` and `map_zero`. |
| `Mathlib.CategoryTheory.Monoidal.End` | Monoidal structure on endofunctor category `C ⥤ C`. |
| `Mathlib.CategoryTheory.Monoidal.Discrete` | Monoidal structure on `Discrete A` (discrete category with monoid homs). |

---

#### **Summary**

This file formalizes *shift functors* as monoidal functors from a discrete monoid `Discrete A` into the endofunctor category `C ⥤ C`. It provides a rich API for manipulating shifts, including:
- Coherence laws for addition/unitality/associativity,
- Equivalences when `A` is a group (e.g., `n` and `-n`),
- Commutativity when `A` is commutative,
- Compatibility with zero morphisms.

The design leverages Lean’s typeclass inference and monoidal functor machinery, while exposing a clean, object/morphism-level interface via notation (`X⟦n⟧`, `f⟦n⟧'`). Proofs rely heavily on categorical coherence and `simp`-based automation.