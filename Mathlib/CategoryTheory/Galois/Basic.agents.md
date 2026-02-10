Here's a structured **technical metadata brief** extracted from the provided Lean 4 file on *Galois categories*, suitable for building a domain-specific AI agent in formal mathematics (especially category theory and Galois theory):

---

### 🔑 **Key Definitions & Theorems**

| Name | Type / Class | Purpose |
|------|--------------|---------|
| `PreGaloisCategory` | `class` | A category satisfying axioms (G1)–(G3) of SGA1: terminal objects, pullbacks, finite coproducts, quotients by finite groups, and monos split via colimits. |
| `FiberFunctor` | `class` | A functor `F : C ⥤ FintypeCat` preserving limits (terminal, pullbacks), finite coproducts, epis, quotients by finite groups, and reflecting isos. |
| `GaloisCategory` | `class` | A `PreGaloisCategory` that admits *some* fiber functor. |
| `IsConnected` | `class` | An object is connected if it’s not initial and has no non-trivial monos (i.e., every mono from a non-initial object is iso). |
| `PreservesIsConnected` | `class` | A functor preserves connectedness if it maps connected objects to connected ones. |
| `evaluation_injective_of_isConnected` | `lemma` | For connected `A`, evaluation at a point `a : F.obj A` is injective on `Hom(A, X)`. |
| `isIso_of_mono_of_eq_card_fiber` | `lemma` | A mono between objects with equal fiber cardinalities is an iso. |
| `card_hom_le_card_fiber_of_connected` | `lemma` | For connected `A`, `|Hom(A, X)| ≤ |F.obj X|`. |
| `initial_iff_fiber_empty` | `lemma` | `X` is initial iff `F.obj X` is empty. |
| `fiberEqualizerEquiv`, `fiberPullbackEquiv`, `fiberBinaryProductEquiv` | `noncomputable def` | Fiber of (co)limits ≅ (co)limits of fibers in `FintypeCat`. |
| `GaloisCategory.getFiberFunctor` | `noncomputable def` | Chooses a fiber functor for a Galois category (using choice). |

---

### 📝 **Naming Conventions**

- **Prefixes**:
  - `isIso_`, `isInitial_`, `isConnected_`, `mono_`, `epi_`, `preserves_`, `reflects_`, `nonempty_`, `card_`, `fiber_`, `evaluation_`
- **Suffixes**:
  - `_of_`, `_for_`, `_iff_`, `_eq_`, `_le_`, `_lt_`, `_surjective_`, `_injective_`, `_equiv_`, `_iso_`
- **Pattern**:
  - `isX_of_Y` (e.g., `isIso_of_mono_of_eq_card_fiber`)
  - `X_of_Y` (e.g., `fiberPullbackEquiv`, `evaluation_injective_of_isConnected`)
  - `X_iff_Y` (e.g., `initial_iff_fiber_empty`)
  - `X_of_Y_of_Z` (e.g., `epi_of_nonempty_of_isConnected`)

---

### 🛠️ **Tactic Stack**

Frequently used tactics in proofs:
- `rw`, `erw` (rewriting with lemmas, especially naturality/simp lemmas)
- `simp`, `simp only`, `simp_rw`
- `exact`, `apply`, `intro`, `cases`, `contrapose!`
- `infer_instance`, `obtain ⟨…⟩`, `nontriviality` (via `by_contra`, `not_nonempty_iff`)
- `convert`, `congr`, `ext`, `funext`
- `haveI : IsIso …`, `haveI : Mono …`, `haveI : Epi …` (typeclass inference)
- `exact_mod_cast`, `change`, `erw`, `rw [← …]`
- `finite`, `finite_of_injective`, `finite_of_surjective`
- `apply_fun`, `congr_fun`, `congr_arg`

---

### 🧠 **Proof Logic & Strategy**

- **Inductive/structural reasoning** on categorical constructions (limits/colimits).
- **Typeclass inference** heavily used to derive existence of (co)limits, monos, epis, etc.
- **Equivalence of fibers and (co)limits**: use `PreservesLimit/Colimit.iso` + concrete descriptions in `FintypeCat`.
- **Cardinality arguments**:
  - Injectivity ⇒ cardinal bound (`Nat.card_le_card_of_injective`)
  - Surjectivity ⇒ surjection on fibers (`surjective_of_epi`)
  - Mono + equal cardinality ⇒ iso (`isIso_of_mono_of_eq_card_fiber`)
- **Evaluation map injectivity** is central for bounding `|Hom(A, X)|` and `|Aut(A)|`.
- **Choice-based constructions**: `Classical.choose`, `Classical.choice` for fiber functors in Galois categories.

---

### 📦 **Imports & Dependencies**

| Import | Purpose |
|--------|---------|
| `Mathlib.CategoryTheory.Limits.Constructions.LimitsOfProductsAndEqualizers` | Derives finite limits from pullbacks & equalizers. |
| `Mathlib.CategoryTheory.Limits.FintypeCat` | Structure of finite types as a category. |
| `Mathlib.CategoryTheory.Limits.MonoCoprod` | Monos in coproducts. |
| `Mathlib.CategoryTheory.Limits.Shapes.ConcreteCategory` | Concrete category structure (e.g., `forget FintypeCat`). |
| `Mathlib.CategoryTheory.Limits.Shapes.Diagonal` | Diagonal maps, equalizers, kernel pairs. |
| `Mathlib.CategoryTheory.SingleObj` | Single-object category from a monoid/group. |
| `Mathlib.Data.Finite.Card` | Cardinal arithmetic for finite types. |
| `Mathlib.Algebra.Equiv.TransferInstance` | Transfer algebraic structures along equivalences. |

---

### 📚 **References (in comments)**

- **SGA1**: Grothendieck’s Séminaire de Géométrie Algébrique, Exp. V.
- **Lenstra, *Galois theory for schemes***: Def 3.1, 3.12.

---

Let me know if you'd like a **Lean4 tactic recommendation map**, **proof sketch templates**, or a **domain ontology** for Galois categories.