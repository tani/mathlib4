### Technical Brief: `eqToHom` and `eqToIso` in Category Theory (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `eqToHom` | `{X Y : C} → X = Y → X ⟶ Y` | Converts an equality of objects into a morphism. Avoids `eq.rec` pitfalls. |
| `eqToIso` | `{X Y : C} → X = Y → X ≅ Y` | Converts an equality into an isomorphism (with inverse `eqToHom p.symm`). |
| `eqToHom_refl` | `eqToHom (rfl : X = X) = 𝟙 X` | Identity case: equality of an object with itself yields identity morphism. |
| `eqToHom_trans` | `eqToHom p ≫ eqToHom q = eqToHom (p.trans q)` | Compatibility with transitivity of equality. |
| `eqToIso.hom`, `eqToIso.inv` | `(eqToIso p).hom = eqToHom p`, `(eqToIso p).inv = eqToHom p.symm` | Extract components of the isomorphism. |
| `eqToIso_trans` | `eqToIso p ≪≫ eqToIso q = eqToIso (p.trans q)` | Isomorphism version of `eqToHom_trans`. |
| `eqToHom_map` | `F.map (eqToHom p) = eqToHom (congr_arg F.obj p)` | Functoriality of `eqToHom`. |
| `eqToHom_app` | `(eqToHom h : F ⟶ G).app X = eqToHom (Functor.congr_obj h X)` | Component of identity natural transformation induced by `F = G`. |
| `conj_eqToHom_iff_heq` | `f = eqToHom h ≫ g ≫ eqToHom h'.symm ↔ HEq f g` | Links heterogeneous equality of morphisms to conjugation by `eqToHom`. |
| `congrArg_mpr_hom_left/right` | `(congrArg (fun W => W ⟶ Z) p).mpr q = eqToHom p ≫ q` | Rewriting on source/target of morphism yields `eqToHom`-composition. |
| `eqToHom_naturality` | `z j ≫ eqToHom w = eqToHom w ≫ z j'` | Naturality of a family of morphisms w.r.t. equality of indices. |
| `Functor.ext` | `(∀ X, F.obj X = G.obj X) → (∀ f, F.map f = eqToHom ... ≫ G.map f ...) → F = G` | Extensionality for functors using `eqToHom`. |
| `NatTrans.congr` | `α.app X = F.map (eqToHom h) ≫ α.app Y ≫ G.map (eqToHom h.symm)` | Naturality condition expressed via `eqToHom`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `eqToHom_`, `eqToIso_`: Core operations converting equalities to morphisms/isomorphisms.
  - `congrArg_`: Rewriting-induced morphisms (`mpr`, `cast`).
  - `heq_`, `conj_`: Heterogeneous equality and conjugation.
  - `naturality`: Naturality conditions involving `eqToHom`.

- **Suffixes**:
  - `_hom`, `_inv`: For components of isomorphisms.
  - `_trans`, `_refl`: Structural properties (transitivity, reflexivity).
  - `_op`, `_unop`: Interaction with opposite categories.
  - `_iff`: Logical equivalences (↔) involving `eqToHom`.

- **Pattern**:
  - `eqToHom p ≫ ...` or `... ≫ eqToHom p.symm` appears repeatedly in conjugation and naturality.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `cases`: Eliminating equalities (`p`, `q`, `h`, etc.) via `eq.rec`-style reasoning.
  - `simp`: Heavy use of `simp` lemmas (e.g., `eqToHom_refl`, `eqToHom_trans`, `congrArg_cast_*`).
  - `aesop_cat`: For categorical reasoning (e.g., `inv_eqToHom`, `eqToIso_trans`).
  - `rw`: Rewriting equalities (especially in `congrArg_mpr_*` proofs).
  - `rfl`, `congr`, `funext`: For extensionality and definitional equality.

- **Notable patterns**:
  - `by aesop_cat`: Used for routine categorical identities.
  - `cases p; simp`: Standard pattern for proving `eqToHom` properties.
  - `⟨...⟩`: Constructing isomorphisms/natural transformations.

---

#### **4. Proof Logic**

- **Inductive/Case Analysis Style**:
  - Proofs of `eqToHom` lemmas almost universally proceed by `cases p` (eliminating the equality), reducing to `rfl` or `simp`.
  - E.g., `eqToHom_trans`, `eqToHom_map`, `congrArg_mpr_hom_left`.

- **Heterogeneous Equality Reasoning**:
  - `HEq` is used to avoid dependent type issues.
  - `conj_eqToHom_iff_heq` is central: it bridges `HEq` and `eqToHom`-conjugation.
  - `heq_*` lemmas (e.g., `heq_comp`, `eqToHom_comp_heq`) formalize stability of composition under `HEq`.

- **Functor/Natural Transformation Equality**:
  - `Functor.ext` and `hext` reduce functor equality to object- and map-level equalities.
  - `NatTrans.congr` expresses naturality in terms of `eqToHom`, enabling `simp`-based simplification.

- **Opposite Categories**:
  - `eqToHom_op`, `eqToHom_unop` handle how `eqToHom` behaves under `op`/`unop`, using `congr_arg`.

---

#### **5. Imports**

- **Primary dependency**:
  - `Mathlib.CategoryTheory.Opposites`: Provides `Opposite`, `op`, `unop`, and related infrastructure.

- **Implicit dependencies** (via `CategoryTheory` namespace and `Category` typeclass):
  - `Mathlib.CategoryTheory.Category.Basic`: Defines categories, morphisms, identity, composition.
  - `Mathlib.CategoryTheory.Functor`: Functors, natural transformations, composition.
  - `Mathlib.CategoryTheory.Iso`: Isomorphisms, `Iso.refl`, `Iso.inv`, etc.
  - `Mathlib.Logic.HEq`: Heterogeneous equality (`HEq`).

- **Notable features used**:
  - `@[reassoc (attr := simp)]`: Custom `simp`-reassociation lemmas.
  - `nolint simpNF`: Suppresses linter warnings for lemmas that may not normalize but are useful in `simp`.

---

### Summary

This file formalizes the foundational calculus of **equality-induced morphisms** (`eqToHom`) and **isomorphisms** (`eqToIso`) in category theory. It provides a suite of `simp`-friendly lemmas to manage dependent type issues when reasoning about equalities between objects. The design prioritizes **practical simplification** over theoretical minimality, with heavy reliance on `HEq` and naturality conditions to keep goals tractable. It serves as a critical infrastructure layer for higher-level category theory in Mathlib.