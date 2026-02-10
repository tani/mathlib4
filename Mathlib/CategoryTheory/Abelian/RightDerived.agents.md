Here's a structured **technical metadata brief** extracted from the provided Lean 4 file, focusing on definitions, naming conventions, proof tactics, logical flow, and dependencies.

---

### 🔹 **Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `Functor.rightDerivedToHomotopyCategory F` | `C ⥤ HomotopyCategory D (ComplexShape.up ℕ)` — sends an object `X` to `F` applied to an injective resolution of `X`, up to homotopy. |
| `InjectiveResolution.isoRightDerivedToHomotopyCategoryObj I F` | Isomorphism `F.rightDerivedToHomotopyCategory.obj X ≅ (F.mapHomologicalComplex _ ⋙ HomotopyCategory.quotient _ _).obj I.cocomplex`. |
| `Functor.rightDerived F n` | `C ⥤ D` — the *n*-th right-derived functor of `F`, defined as composition with homology: `F.rightDerivedToHomotopyCategory ⋙ HomotopyCategory.homologyFunctor D _ n`. |
| `InjectiveResolution.isoRightDerivedObj I F n` | Isomorphism `(F.rightDerived n).obj X ≅ Hⁿ(F(I))`, where `Hⁿ` is homology in degree `n`. |
| `Functor.isZero_rightDerived_obj_injective_succ` | Theorem: If `X` is injective, then `(F.rightDerived (n+1)).obj X ≅ 0`. |
| `NatTrans.rightDerivedToHomotopyCategory α` | Natural transformation `F.rightDerivedToHomotopyCategory ⟶ G.rightDerivedToHomotopyCategory` induced by `α : F ⟶ G`. |
| `NatTrans.rightDerived α n` | Natural transformation `(F.rightDerived n) ⟶ (G.rightDerived n)` induced by `α`. |
| `Functor.toRightDerivedZero F` | Natural transformation `F ⟶ F.rightDerived 0`. |
| `Functor.rightDerivedZeroIsoSelf` | Isomorphism `F.rightDerived 0 ≅ F` when `F` preserves finite limits (i.e., is left exact). |
| `InjectiveResolution.toRightDerivedZero' I F` | Morphism `F.obj X ⟶ Z⁰(F(I))` to cycles in degree 0 of the complex `F(I)`. |

---

### 🔹 **Naming Conventions**

- **Prefixes**:
  - `rightDerived`: for derived functors (e.g., `rightDerived`, `rightDerivedToHomotopyCategory`).
  - `toRightDerived`: for canonical maps *into* derived functors (e.g., `toRightDerivedZero`, `toRightDerivedZero'`).
  - `isoRightDerived`: for isomorphisms identifying derived functors with homology of complexes (e.g., `isoRightDerivedObj`, `isoRightDerivedToHomotopyCategoryObj`).
  - `mapHomologicalComplex`, `mapHomotopyCategory`: for applying functors to complexes/homotopy categories.

- **Suffixes**:
  - `'` (prime): often used for auxiliary or more concrete versions (e.g., `toRightDerivedZero'` vs `toRightDerivedZero`).
  - `app`: for components of natural transformations at objects (e.g., `α.app X`).
  - `naturality`: lemmas expressing naturality of isomorphisms/natural transformations.

- **`_assoc` variants**: Used for associativity rewrites in `reassoc` lemmas (e.g., `isoRightDerivedObj_hom_naturality_assoc`).

---

### 🔹 **Tactic Stack**

The file heavily uses:

- `rw`, `erw`: for rewriting using equalities and definitional equalities.
- `dsimp`, `simp`: for simplification, especially with `reassoc` attributes.
- `rw [assoc, assoc, ...]`: to manage associativity of composition.
- `exact`, `refine`, `obtain`: for constructing proofs.
- `rw [cancel_mono _, cancel_epi _]`: to cancel monos/epis in diagrams.
- `simp only [...]`: for precise simplification with explicit lemmas.
- `infer_instance`: to discharge typeclass constraints.
- `rfl`: for definitional equalities.
- `apply isZero_zero`, `apply isZero_of_iso`: for proving objects are zero.

---

### 🔹 **Proof Logic & Strategy**

- **Inductive/constructive**: Most constructions are *noncomputable* definitions based on choosing injective resolutions.
- **Diagram chasing**: Proofs often involve:
  - Choosing resolutions `I`, `J` and maps `φ` between them lifting a morphism `f : X → Y`.
  - Using naturality of isomorphisms (`isoRightDerivedObj_hom_naturality`) and naturality of derived transformations.
  - Applying properties of homology (e.g., `HomologicalComplex.homologyπ_naturality`).
- **Zero objects & injectives**:
  - For injective objects, higher derived functors vanish via exactness of `F` on short exact sequences.
  - Proofs use `IsZero.of_iso` to reduce to known zero objects.
- **Isomorphism criteria**:
  - `isIso_of_isIso_app` for natural isomorphisms.
  - `liftCycles` for constructing maps to cycles.

---

### 🔹 **Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.Homology.Additive` | Homological algebra in additive categories: complexes, homology, mapping cones, etc. |
| `Mathlib.CategoryTheory.Abelian.InjectiveResolution` | Existence and properties of injective resolutions in abelian categories. |

**Key typeclasses assumed**:
- `[Category C]`, `[Abelian C]`, `[HasInjectiveResolutions C]`
- `[Category D]`, `[Abelian D]`
- `[F.Additive]` for functors `F : C ⥤ D`

---

Let me know if you'd like a **diagrammatic summary**, **proof outline for a specific lemma**, or **conversion to a more formal specification format** (e.g., for a domain-specific AI agent).