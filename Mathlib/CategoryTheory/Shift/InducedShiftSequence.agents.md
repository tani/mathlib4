Here is the **technical metadata** extracted from the provided Lean 4 file, formatted as a structured technical brief for use in building a domain-specific AI agent:

---

### 🔹 **Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `induced.isoZero` | `F' 0 ≅ F` — The isomorphism induced at zero shift, using `e' 0`, `G.isoShiftZero`, and `e.symm`. |
| `induced.shiftIso` | `shiftFunctor D n ⋙ F' a ≅ F' a'` for `n + a = a'` — Induced shift isomorphisms via coherence with `L.commShiftIso`, `e'`, and `G.shiftIso`. |
| `induced` | `F.ShiftSequence M` — Main construction: a shift sequence on `F` induced from one on `G`, assuming `L` is fully faithful. |
| `induced_isoShiftZero_hom_app_obj` | `simp`-friendly lemma describing the component of `F.isoShiftZero` at `L.obj X`. |
| `induced_shiftIso_hom_app_obj` | Component-wise description of `F.shiftIso` at `L.obj X`. |
| `induced_shiftMap` | Describes how `F.shiftMap` acts on morphisms in terms of `G.shiftMap` and the isomorphisms `e'`. |

---

### 🔹 **Naming Conventions**

- **Prefixes / Suffixes**:
  - `isoZero`, `shiftIso`: Standard fields of a `ShiftSequence`.
  - `induced.*`: All definitions/lemmas in the `induced` namespace.
  - `hom_app`, `inv_app`: Used in lemmas describing components of natural transformations or isomorphisms.
  - `obj`: Used when evaluating at an object `X : C`.
  - `naturality`, `assoc`, `comp_map`, `map_id`, etc.: Standard Lean category theory suffixes for naturality/associativity lemmas.

- **Variable naming**:
  - `L : C ⥤ D`, `F : D ⥤ A`, `G : C ⥤ A`: Functors forming a factorization up to iso.
  - `e : L ⋙ F ≅ G`, `e' : ∀ m, L ⋙ F' m ≅ G.shift m`: Isomorphisms mediating the relationship.
  - `n, a, a' : M`: Elements of the monoid indexing shifts.

---

### 🔹 **Tactic Stack**

| Tactic | Usage Frequency | Purpose |
|--------|------------------|---------|
| `ext1`, `ext` | High | To prove equality of natural transformations/isomorphisms by extensionality. |
| `simp only [...]` | Very High | To simplify using a precise list of lemmas (e.g., `induced.shiftIso_hom_app_obj`, `L.commShiftIso_zero`, etc.). |
| `rw [...]` | Medium | Rewriting using naturality, associativity, or definition lemmas. |
| `dsimp` | Medium | Simplifying definitions before `simp`. |
| `apply ((whiskeringLeft ...).obj L).map_injective` | Medium | Leveraging full faithfulness of `L` to reduce proofs to `C`. |
| `rfl`, `simp` | Medium | For trivial or definitional equalities. |
| `nth_rw` | Low | To rewrite at a specific position. |

---

### 🔹 **Proof Logic**

- **Strategy**:
  1. **Extensionality**: Prove equality of natural transformations/isomorphisms by applying `ext1` and reducing to components at `L.obj X`.
  2. **Full Faithfulness**: Use injectivity of `L_* = (whiskeringLeft ...).obj L` to reduce proofs to the domain `C`.
  3. **Simplification via coherence**: Apply lemmas like `induced.shiftIso_hom_app_obj`, `G.shiftIso_add_hom_app`, and `L.commShiftIso_add` to unfold and simplify.
  4. **Naturality & associativity**: Use `natuality`, `assoc`, `comp_map`, and `Functor.map_comp` to rearrange compositions.
  5. **Definitional simplification**: Use `dsimp` + `simp only` with explicit lemmas to collapse complex expressions.

- **Induction / recursion**: Not used here — proofs are direct coherence arguments.

---

### 🔹 **Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Shift.CommShift` | Provides `CommShift`, `commShiftIso`, and coherence for functors commuting with shifts. |
| `Mathlib.CategoryTheory.Shift.ShiftSequence` | Defines `ShiftSequence`, `shiftIso`, `isoShiftZero`, `shiftMap`, and their coherence axioms. |
| `CategoryTheory` (open) | Standard category theory utilities (e.g., `comp`, `assoc`, `Functor`, `Iso`, `NatTrans`). |

---

### 🔹 **Domain Context**

- **Mathematical area**: Homological algebra / category theory.
- **Goal**: Construct induced shift sequences along fully faithful functors, especially to apply to homology functors on homotopy/derived categories.
- **Key assumptions**:
  - `L : C ⥤ D` is fully faithful.
  - `G : C ⥤ A` has a shift sequence over monoid `M`.
  - `F' : M → D ⥤ A` approximates `F` via `e' : L ⋙ F' m ≅ G.shift m`.
  - `L` commutes with shifts (`L.CommShift M`), and `D` has a shift.

---

Let me know if you'd like a **diagrammatic summary**, **proof sketch**, or **formalization recommendations** for downstream applications (e.g., homology on homotopy category).