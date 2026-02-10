### Technical Brief: Cocartesian and Strongly Cocartesian Morphisms in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsCocartesian p f φ` | `Class` extending `IsHomLift p f φ` | Expresses that `φ : a ⟶ b` is *cocartesian* over `f : R ⟶ S` w.r.t. `p : 𝒳 ⥤ 𝒮`: for any `φ' : a ⟶ b'` lying over `f`, there exists a unique lift `χ : b ⟶ b'` of `𝟙 S` such that `φ ≫ χ = φ'`. |
| `IsStronglyCocartesian p f φ` | `Class` extending `IsHomLift p f φ` | Expresses *strong cocartesianness*: for any `g : S ⟶ S'` and `φ' : a ⟶ b'` lying over `f ≫ g`, there exists a unique lift `χ : b ⟶ b'` of `g` such that `φ ≫ χ = φ'`. |
| `IsCocartesian.map` | `b ⟶ b'` | The unique morphism induced by the universal property of a cocartesian morphism. |
| `IsCocartesian.fac` | `φ ≫ map = φ'` | The defining factorization property of `map`. |
| `IsCocartesian.ext` | `(φ ≫ ψ = φ ≫ ψ') → ψ = ψ'` | Cancellation property: cocartesian morphisms are monic in the slice over `𝟙 S`. |
| `IsCocartesian.codomainUniqueUpToIso` | `b ≅ b'` | Canonical iso between codomains of two cocartesian morphisms over same `f`. |
| `IsStronglyCocartesian.universal_property` | `∃! χ, IsHomLift p g χ ∧ φ ≫ χ = φ'` | Flexible version of the universal property (handles non-defeq equalities). |
| `IsStronglyCocartesian.map` | `b ⟶ b'` | The lift induced by strong cocartesianness over `g`. |
| `IsStronglyCocartesian.map_comp_map` | `map ≫ map = map` | Compatibility of `map` with composition of base morphisms. |
| `IsStronglyCocartesian.comp` | Instance | Composite of two strongly cocartesian morphisms is strongly cocartesian. |
| `IsStronglyCocartesian.of_comp` | Instance | If `φ` and `φ ≫ ψ` are strongly cocartesian, then so is `ψ`. |
| `IsStronglyCocartesian.isIso_of_base_isIso` | `IsIso φ` | A strongly cocartesian morphism over an isomorphism is itself an isomorphism. |
| `IsStronglyCocartesian.codomainIsoOfBaseIso` | `b ≅ b'` | Canonical iso between codomains when base morphisms differ by an iso. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isCocartesian_`, `isStronglyCocartesian_`: for lemmas/instances about the respective classes.
  - `map_`: for morphisms induced by universal properties.
  - `codomain_`: for canonical isomorphisms between codomains.

- **Suffixes**:
  - `_uniq`: uniqueness lemmas (e.g., `map_uniq`).
  - `_fac`: factorization lemmas (e.g., `fac`).
  - `_self`: identity cases (e.g., `map_self`).
  - `_ext`: extensionality/cancellation lemmas (e.g., `ext`).
  - `_of_`: derived instances (e.g., `of_iso`, `of_isIso`, `of_comp`).

- **Fields**:
  - `universal_property` (for `IsCocartesian`) and `universal_property'` (for `IsStronglyCocartesian`) — the latter is the raw constructor, the former is the more flexible lemma.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `aesop_cat` | Automated category-theoretic reasoning (e.g., simplifying compositions, iso properties). |
| `simp only [...]` | Simplification with specific lemmas (e.g., `fac`, `comp_id`, `assoc`). |
| `rw [...]` | Rewriting using definitional equalities or lemmas (e.g., `assoc`, `comp_id`, `fac`). |
| `apply ...` | Applying lemmas or instances (e.g., `map_uniq`, `ext`, `universal_property'`). |
| `intro ...` | Introducing quantified variables in universal properties. |
| `refine ⟨..., ?_⟩` | Constructing existential/uniqueness pairs. |
| `subst_hom_lift` | A custom tactic (likely from `HomLift`) to simplify hypotheses of the form `IsHomLift`. |
| `rwa [...]` | Rewrite + assumption (used in `of_iso` instance). |
| `symm`, ` rfl` | Basic equality reasoning. |

---

#### **4. Proof Logic**

- **Inductive/constructive style**: Most proofs follow a pattern:
  1. Use `universal_property` / `universal_property'` to get existence/uniqueness.
  2. Construct candidate morphism (e.g., `map`, `φ'.inv ≫ ...`).
  3. Prove it satisfies required lifting condition (`IsHomLift`).
  4. Prove factorization (`fac`).
  5. Use `map_uniq` or `ext` to establish uniqueness or equality.

- **Key reasoning patterns**:
  - **Cancellation**: Use `ext` or `map_uniq` to show two lifts are equal.
  - **Iso construction**: Show both `φ ≫ ψ = 𝟙` and `ψ ≫ φ = 𝟙` (e.g., `isIso_of_base_isIso`).
  - **Composition compatibility**: Use `map_comp_map` to reduce composite maps to single `map`.
  - **Descent**: Use `of_comp` to deduce strong cocartesianness of a factor.

- **Use of classical choice**: `map` definitions use `Classical.choose`, so they are noncomputable.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.CategoryTheory.FiberedCategory.HomLift` | Provides `IsHomLift`, foundational lifting data for morphisms over functors. |
| `CategoryTheory` (via `open`) | General category theory infrastructure: `Category`, `Functor`, `Iso`, `comp`, `id`, etc. |

This module builds directly on `HomLift`, and is part of a larger effort to formalize fibered/cocartesian fibrations (cf. Stacks Project Tag [02XK](https://stacks.math.columbia.edu/tag/02XK)).

--- 

Let me know if you'd like a diagrammatic summary or a comparison with the dual `Cartesian` file.