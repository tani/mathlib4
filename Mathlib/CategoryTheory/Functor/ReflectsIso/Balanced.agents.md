**Technical Brief: `Balanced.lean`**

---

### 1. KEY DEFINITIONS & THEOREMS

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `reflectsIsomorphisms_of_reflectsMonomorphisms_of_reflectsEpimorphisms` | `instance [Balanced C] (F : C ⥤ D) [ReflectsMonomorphisms F] [ReflectsEpimorphisms F] : F.ReflectsIsomorphisms` | Shows that if a functor reflects monos and epis, and the domain is balanced, then it reflects isos. |
| `Functor.balanced_of_preserves` | `lemma (F : C ⥤ D) [F.ReflectsIsomorphisms] [F.PreservesEpimorphisms] [F.PreservesMonomorphisms] [Balanced D] : Balanced C` | Proves that if a functor reflects isos and preserves monos/epis, and the codomain is balanced, then the domain is balanced. |

---

### 2. NAMING CONVENTIONS

- **Prefixes**:
  - `reflects_`: for properties of functors that *reflect* a class of morphisms (e.g., `ReflectsMonomorphisms`, `ReflectsEpimorphisms`, `ReflectsIsomorphisms`).
  - `preserves_`: for functors that *preserve* a class (e.g., `PreservesEpimorphisms`, `PreservesMonomorphisms`).
  - `isIso_of_`: for constructing isomorphisms from mono + epi in balanced categories.
- **Suffixes**:
  - `_of_`: indicates derivation from assumptions (e.g., `balanced_of_preserves`, `epi_of_epi_map`).
- **`_map` suffix**: used in lemmas like `epi_of_epi_map`, `mono_of_mono_map`, indicating that the property is pulled back via the functor.

---

### 3. TACTIC STACK

- `intro`, `exact`, `rw`, `apply`, `haveI`, `inferInstance`, `refine`, `aesop`, `simp`, `ring` (not explicitly used here, but standard in such contexts).
- **Dominant tactics**:
  - `haveI : Epi f := epi_of_epi_map F inferInstance`
  - `exact isIso_of_mono_of_epi f`
  - `rw [← isIso_iff_of_reflects_iso (F := F)]`
  - `exact isIso_of_mono_of_epi _`

---

### 4. PROOF LOGIC

- **First theorem** (`reflectsIsomorphisms_of_...`):
  - Given `f : X ⟶ Y` with `F f` iso.
  - Use `[ReflectsEpimorphisms F]` and `[ReflectsMonomorphisms F]` to deduce `f` is epi and mono.
  - Apply `[Balanced C]` (i.e., `isIso_of_mono_of_epi`) to conclude `f` is iso.

- **Second lemma** (`balanced_of_preserves`):
  - Goal: show `f` mono + epi ⇒ `f` iso in `C`.
  - Use `isIso_iff_of_reflects_iso` to reduce to showing `F f` is iso.
  - Since `F` preserves monos/epis, `F f` is mono + epi in `D`.
  - Since `D` is balanced, `F f` is iso.
  - Since `F` reflects isos, `f` is iso.

---

### 5. IMPORTS

- `Mathlib.CategoryTheory.Functor.ReflectsIso.Basic`: provides `ReflectsIsomorphisms`, `isIso_iff_of_reflects_iso`.
- `Mathlib.CategoryTheory.Balanced`: defines `Balanced` categories and `isIso_of_mono_of_epi`.
- `Mathlib.CategoryTheory.Functor.EpiMono`: provides `epi_of_epi_map`, `mono_of_mono_map`, and preservation/reflection lemmas.

---

### 6. DEPENDENCY & OVERVIEW DIAGRAM

```mermaid
graph TD
  A[CategoryTheory.Balanced] --> B[isIso_of_mono_of_epi]
  C[CategoryTheory.Functor.EpiMono] --> D[epi_of_epi_map]
  C --> E[mono_of_mono_map]
  F[CategoryTheory.Functor.ReflectsIso.Basic] --> G[isIso_iff_of_reflects_iso]
  F --> H[ReflectsIsomorphisms]

  B --> I[Balanced C]
  D --> J[Epi f ← Epi (F f)]
  E --> K[Mono f ← Mono (F f)]
  G --> L[F reflects iso ⇔ F f iso ⇒ f iso]

  I --> M[reflectsIsomorphisms_of_...]
  J & K & I --> M

  L & D & E & [Balanced D] --> N[balanced_of_preserves]
```

---

### 7. OVERVIEW OF FILE

This file establishes two foundational results connecting **balanced categories** and **functorial reflection/preservation of monos/epis**:

- In a **balanced** domain category, any functor that reflects monos and epis automatically reflects isos.
- Conversely, if a functor reflects isos and preserves monos/epis, and the codomain is balanced, then the domain must be balanced.

These results formalize the intuition that *balancedness* is closely tied to the behavior of functors with respect to mono/epi structure.

--- 

Let me know if you'd like a formalized dependency graph or a summary of related files (e.g., `EpiMono.lean`, `ReflectsIso.lean`).
