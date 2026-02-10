Here is the **technical metadata** extracted from the provided Lean 4 file, formatted as a structured technical brief for use in building a domain-specific AI agent:

---

### 🔹 **Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `SingleFunctors C D A` | A structure encoding a family of functors `functor : A → C ⥤ D`, together with coherent isomorphisms `shiftIso` relating shifted versions of these functors. Encodes compatibility with the `HasShift D A` structure. |
| `shiftIso` | Isomorphism `functor a' ⋙ shiftFunctor D n ≅ functor a` when `n + a = a'`. Central coherence data. |
| `shiftIso_zero` | A coherence law: `shiftIso 0` is the canonical isomorphism induced by `shiftFunctorZero`. |
| `shiftIso_add` | A coherence law: `shiftIso (m + n)` factors through `shiftIso m`, `shiftIso n`, and the associator + shift additivity isomorphism. |
| `Hom` | Morphisms in `SingleFunctors C D A`: natural transformations `F.functor a ⟶ G.functor a` compatible with `shiftIso`. |
| `Hom.id`, `Hom.comp` | Identity and composition in `SingleFunctors C D A`. |
| `isoMk` | Construct an isomorphism in `SingleFunctors C D A` from level-wise isomorphisms satisfying only the forward compatibility condition (inverse compatibility follows). |
| `evaluation a` | Evaluation functor `SingleFunctors C D A ⥤ C ⥤ D` at object `a : A`. |
| `postcomp G` | Given `G : D ⥤ E` commuting with shift, post-composition defines a new object in `SingleFunctors C E A`. |
| `postcompFunctor G` | The functorial action of post-composition: `SingleFunctors C D A ⥤ SingleFunctors C E A`. |
| `postcompPostcompIso` | Canonical isomorphism `(F.postcomp G).postcomp G' ≅ F.postcomp (G ⋙ G')`. |
| `postcompIsoOfIso` | Induced isomorphism `F.postcomp G ≅ F.postcomp G'` from a shift-compatible isomorphism `G ≅ G'`. |

**Lemmas (selected):**
- `shiftIso_add_hom_app`, `shiftIso_add_inv_app`: Explicit component-wise formulas for `shiftIso (m + n)`.
- `shiftIso_add'`, `shiftIso_add'_hom_app`, `shiftIso_add'_inv_app`: Variant using `shiftFunctorAdd'`.
- `hom_ext`: Extensionality for morphisms in `SingleFunctors`.
- `hom_inv_id_hom`, `inv_hom_id_hom`, etc.: Basic properties of isomorphisms in `SingleFunctors`.

---

### 🔹 **Naming Conventions**

| Pattern | Examples | Meaning |
|--------|----------|---------|
| `shiftIso_*` | `shiftIso`, `shiftIso_zero`, `shiftIso_add`, `shiftIso_add'`, `shiftIso_add'_hom_app`, etc. | All relate to the coherence isomorphisms `shiftIso`. |
| `postcomp_*` | `postcomp`, `postcompFunctor`, `postcompPostcompIso`, `postcompIsoOfIso` | Operations related to post-composition with shift-compatible functors. |
| `*_hom_app`, `*_inv_app` | `shiftIso_zero_hom_app`, `hom_inv_id_hom_app`, etc. | Component-wise (on objects `X : C`) of natural transformations / isomorphisms. |
| `*_ext` | `hom_ext` | Extensionality lemmas. |
| `isoMk` | `isoMk` | Constructor for isomorphisms (like `mkIso`, but with only forward condition). |
| `comm` | `Hom.comm` | Compatibility condition for morphisms with shift isomorphisms. |

---

### 🔹 **Tactic Stack**

Frequent tactics used in proofs and simplifications:
- `simp` / `simp only` — heavily used for simplifying expressions involving `shiftIso`, naturality, whiskering, and coherence laws.
- `rw` — rewriting using hypotheses like `ha' : n + a = a'`, `add_assoc`, etc.
- `ext` — extensionality for natural transformations / functors.
- `aesop_cat` — used in `Hom.comm` to handle categorical diagram chasing.
- `dsimp`, `simp only`, `simp [lemma]` — for simplifying definitions and unfolding `shiftIso`, `postcomp`, etc.
- `rfl`, `congr_arg`, `congr_app` — for equality reasoning.
- `cancel_mono`, `assoc`, `id_comp`, `comp_id`, ` whiskerRight_id'`, etc. — standard category-theoretic rewrites.

---

### 🔹 **Proof Logic / Strategy**

- **Inductive / structural reasoning** on additive monoid elements (`n`, `m`, `a`, etc.) and equalities like `n + a = a'`.
- **Diagrammatic reasoning** using naturality, whiskering, associators, and coherence laws for shifts (`shiftFunctorZero`, `shiftFunctorAdd`, `shiftFunctorAdd'`).
- **Verification of naturality and compatibility** for morphisms and isomorphisms in `SingleFunctors`.
- **Simplification-heavy proofs**: Most lemmas are proven by `simp`-based simplification using coherence laws and definitions.
- **Isomorphism construction**: Use `isoMk` with only forward compatibility, then derive inverse compatibility automatically.

---

### 🔹 **Imports & Dependencies**

| Import | Purpose |
|--------|---------|
| `Mathlib.CategoryTheory.Shift.CommShift` | Provides `HasShift`, `shiftFunctor`, `shiftFunctorZero`, `shiftFunctorAdd`, `CommShift`, etc. — foundational shift theory. |
| `CategoryTheory` (open) | Core category theory infrastructure: functors, natural transformations, whiskering, isoWhisker*, etc. |
| `ZeroObject`, `Limits` | Possibly used for general categorical constructions (though not directly used in this snippet). |

---

Let me know if you'd like a **diagrammatic summary**, **proof automation suggestions**, or a **formalization roadmap** for extending this file (e.g., to `CochainComplex` or `DerivedCategory`).