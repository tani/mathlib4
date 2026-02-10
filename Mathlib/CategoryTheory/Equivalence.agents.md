Here's a structured technical metadata summary extracted from the provided Lean 4 file on *Equivalence of Categories*:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Equivalence` | `structure` | Bundled *half-adjoint equivalence*: `(F, G, η, ε)` with triangle law `Fη ≫ εF = 1`. |
| `unit`, `counit`, `unitInv`, `counitInv` | `abbrev` | Projections of an equivalence: unit/counit and their inverses. |
| `adjointifyη` | `def` | Refines a natural isomorphism `η : 1 ≅ F ⋙ G` to satisfy the half-adjoint condition. |
| `Equivalence.mk` | `def` | Constructs a half-adjoint equivalence from any pair of functors with invertible unit/counit. |
| `refl`, `symm`, `trans` | `def` | Identity, symmetry, and composition of equivalences. |
| `funInvIdAssoc`, `invFunIdAssoc` | `def` | Natural isomorphisms showing composition with equivalence functors is invertible. |
| `congrLeft`, `congrRight` | `def` | Induced equivalences on functor categories: `C ⥤ E ≌ D ⥤ E` and `E ⥤ C ≌ E ⥤ D`. |
| `fullyFaithfulFunctor`, `fullyFaithfulInverse` | `def` | Construct full faithfulness from equivalence data. |
| `changeFunctor`, `changeInverse` | `def` | Modify equivalence data along functor/inverse isomorphisms. |
| `Functor.IsEquivalence` | `class` | Typeclass for functors that are *faithful*, *full*, and *essentially surjective*. |
| `Functor.inv` | `noncomputable def` | Quasi-inverse functor for an equivalence (uses choice). |
| `Functor.asEquivalence` | `noncomputable def` | Converts an `IsEquivalence F` into a bundled `Equivalence`. |
| `unit_inverse_comp` | `thm` | Proves the *other* triangle law: `ηG ≫ Gε = 1`, making the equivalence *adjoint*. |
| `isEquivalence_iff_of_iso` | `lemma` | If `F ≅ G`, then `F` is an equivalence iff `G` is. |
| `isEquivalence_of_comp_right/left` | `lemma` | Cancellation lemmas: if `F ⋙ G` and one of `F`, `G` is an equivalence, so is the other. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `unit_`, `counit_`, `unitInv_`, `counitInv_`: for components of the equivalence.
  - `fun_`, `inv_`, `funInv_`, `invFun_`: for constructions involving `F` and its quasi-inverse.
  - `change_`: modifying equivalence data via isomorphisms.
  - `essSurj_`, `fullyFaithful_`, `faithful_`, `full_`: properties of functors.
  - `adjointify_`: refinement of unit to satisfy triangle law.

- **Suffixes**:
  - `_assoc`: for associativity-adjusted naturality or cancellation lemmas.
  - `_app`: for component-wise equations (e.g., `unit.app X`).
  - `_Iso`: for natural isomorphisms (e.g., `unitIso`, `counitIso`).
  - `_comp`: for compositions involving unit/counit.

- **Infix**:
  - `C ≌ D` (`\backcong`) for `Equivalence C D`.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `aesop_cat` | Category-theoretic simplifier (handles associativity, unit laws, naturality). |
| `rw`, `erw` | Rewriting using equations or definitional equalities. |
| `simp only [...]` | Simplification with explicit lemmas (often for `simp`-lemmas). |
| `dsimp` | Definitional simplification (e.g., unfolding `adjointifyη`). |
| `ext` | Extensionality for natural transformations/natural isomorphisms. |
| `slice_lhs ... => ...` | Localized rewriting in subterms (used in `unit_inverse_comp`). |
| `calc` | Chain of equalities (e.g., in `adjointifyη`). |
| `exact`, `rfl`, `reflexivity` | Trivial proofs. |
| `have := ...; dsimp at this; rw [this]; clear this` | Standard pattern for naturality-based reasoning. |

---

### **4. Proof Logic**

- **Structure of proofs**:
  - Most proofs follow a *diagram-chasing* pattern: expand definitions, apply naturality, use triangle identities, simplify with `simp`.
  - `unit_inverse_comp` uses a *slice-based* proof: rewrites subterms step-by-step using naturality and iso properties.
  - `adjointify_η_ε` uses a chain of iso whiskerings and simplifications.
  - `Equivalence.mk` leverages `adjointifyη` to upgrade a non-adjoint equivalence to a half-adjoint one.
  - `asEquivalence` constructs equivalence data from `IsEquivalence` using choice (`objPreimage`, `preimageIso`).
  - Cancellation lemmas (`isEquivalence_of_comp_right/left`) use `isEquivalence_iff_of_iso` + `changeFunctor` to reduce to known equivalences.

- **Induction/Recursion**: Not used here (no inductive types involved).

- **Choice**: Used in `Functor.inv` and `asEquivalence` (noncomputable definitions).

---

### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.CategoryTheory.Functor.FullyFaithful` | Full faithfulness definitions & properties. |
| `Mathlib.CategoryTheory.FullSubcategory` | Full subcategories (used implicitly via `EssSurj`). |
| `Mathlib.CategoryTheory.Whiskering` | Whiskering of natural transformations & iso. |
| `Mathlib.CategoryTheory.EssentialImage` | Essential image & essential surjectivity. |
| `Mathlib.Tactic.CategoryTheory.Slice` | Tactics for slice reasoning (e.g., `slice_lhs`). |

---

### **Summary**

This file formalizes the modern (half-adjoint) definition of *equivalence of categories*, proves its equivalence to the classical notion (full, faithful, essentially surjective), and develops a rich algebra of equivalences: symmetry, transitivity, functoriality, and interaction with natural isomorphisms. The proofs rely heavily on naturality, iso calculus, and `aesop_cat`-style simplification, with occasional use of `slice` tactics for diagrammatic reasoning.

Let me know if you'd like a dependency graph or a classification of lemmas by usage (e.g., in `CategoryTheory.Slice`, `Limits`, etc.).