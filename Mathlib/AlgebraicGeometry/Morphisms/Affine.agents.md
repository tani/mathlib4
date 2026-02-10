### Technical Metadata Brief: Affine Morphisms of Schemes (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsAffineHom` | `class IsAffineHom (f : X ⟶ Y) : Prop` | Defines a morphism `f : X → Y` as *affine* if the preimage of every affine open subset of `Y` is affine. |
| `isAffine_preimage` | `lemma` | Immediate consequence of `IsAffineHom`: preimage of an affine open under an affine morphism is affine. |
| `affinePreimage` | `def` | Constructs the preimage of an affine open as an element of `X.affineOpens`. |
| `isAffineOpen_of_isAffineOpen_basicOpen` | `lemma` | If a spanning set `s ⊆ Γ(X, U)` has all `X.basicOpen i` affine, then `U` is affine. Core technical lemma for local-to-global affineness. |
| `isAffine_of_isAffineOpen_basicOpen` | `lemma` | Global version: if `s ⊆ Γ(X, ⊤)` spans the unit ideal and all `X.basicOpen i` are affine, then `X` is affine. |
| `isAffineHom_isStableUnderBaseChange` | `lemma` | Affine morphisms are stable under base change (i.e., pullback along any morphism). |
| `instance [IsIso f] : IsAffineHom f` | `instance` | Isomorphisms are affine (preimage of affine open under iso is affine). |
| `instance [IsAffineHom f] [IsAffineHom g] : IsAffineHom (f ≫ g)` | `instance` | Composition of affine morphisms is affine. |
| `instance : MorphismProperty.IsMultiplicative @IsAffineHom` | `instance` | `IsAffineHom` is a multiplicative morphism property (contains identities, closed under composition). |
| `instance {X} (r : Γ(X, ⊤)) : IsAffineHom (X.basicOpen r).ι` | `instance` | The inclusion of a basic open subset is affine. |
| `instance : HasAffineProperty @IsAffineHom fun X _ _ _ ↦ IsAffine X` | `instance` | `IsAffineHom` satisfies the axioms of a *HasAffineProperty*, enabling stability results (e.g., base change, localness). |
| `isAffine_of_isAffineHom [IsAffineHom f] [IsAffine Y] : IsAffine X` | `lemma` | If `f : X → Y` is affine and `Y` is affine, then `X` is affine. |
| `isAffine_of_isAffine [IsAffine X] [IsAffine Y] : IsAffineHom f` | `instance` | Any morphism between affine schemes is affine. |

---

#### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `isAffine_...`: predicates or lemmas about affineness (e.g., `isAffine_of_isAffineHom`, `isAffineOpen_...`).
  - `affinePreimage`: constructs an affine open from a preimage.
  - `isStableUnder...`: stability under categorical constructions (e.g., `isStableUnderBaseChange`).
  - `..._iff`: characterizations (e.g., `isAffineHom_iff` used in `mk_iff` attribute).
  - `..._aux`: auxiliary lemmas used in main proofs (e.g., `isAffineOpen_of_isAffineOpen_basicOpen_aux`).
- **Suffixes**:
  - `_hom`: for morphism-class properties (`IsAffineHom`).
  - `_open`: for open subsets (`IsAffineOpen`, `basicOpen`).
  - `_preimage`: for preimage-related constructions.

---

#### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Role |
|--------|------|
| `rw` / `erw` | Rewriting definitions (e.g., preimage, basic open, sheaf maps). |
| `simp only` / `simp` | Simplifying using `@[simps]` lemmas and definitional equalities. |
| `apply` / `apply_fun` | Applying lemmas or functors to hypotheses. |
| `convert` | Matching goals up to definitional equality (e.g., with `congr` or `using`). |
| `exact` / `refine` | Finishing subgoals or constructing terms with holes. |
| `intro` / `intros` | Introducing hypotheses and variables. |
| `constructor` | Breaking down conjunctions or class instances. |
| `fapply` | Partial application of a lemma (e.g., when some arguments are implicit). |
| `ext1` / `ext` | Extensionality for functions/sets (e.g., proving equality of sets via extensionality). |
| `rfl` | Reflexivity proofs (definitional equality). |
| `aesop` / `ring` | Not used here — this file is mostly `simp`/`rw`-heavy with manual algebraic geometry reasoning. |
| `infer_instance` | Solving typeclass goals automatically. |

---

#### **4. Proof Logic & Strategy**

- **Inductive / structural reasoning** on open subsets and sheaf data.
- **Spanning sets & ideal theory**: key technique — using `Ideal.span s = ⊤` to reduce global properties to basic opens.
- **Local-to-global via compactness & quasi-separatedness**:
  - First prove `QuasiSeparatedSpace X` (via finite covering by quasi-compact opens).
  - Then prove `CompactSpace X` (via finite subcover of compact opens).
- **Sheaf-theoretic identifications**:
  - Use `X.basicOpen_res`, `Scheme.preimage_basicOpen`, `Scheme.Opens.ι`, and `ΓSpec.adjunction`.
- **Categorical stability arguments**:
  - Leverage `HasAffineProperty` interface to deduce base change stability.
- **Isomorphism handling**:
  - Use `isIso_ΓSpec_adjunction_unit_app_basicOpen` to show basic open inclusions are affine.
- **Case analysis on finite spans**:
  - `Ideal.span_eq_top_iff_finite` used repeatedly to extract finite subsets.

---

#### **5. Imports & Scope**

| Import | Purpose |
|--------|---------|
| `Mathlib.AlgebraicGeometry.Morphisms.QuasiSeparated` | Provides `QuasiSeparatedSpace`, `quasiSeparatedSpace_iff_affine`, and related lemmas. |
| `Mathlib.AlgebraicGeometry.Morphisms.IsIso` | Provides `IsIso`, `isIso_ΓSpec_adjunction_unit_app_basicOpen`, and isomorphism-based affineness. |

**Domain scope**:  
- Focuses on *affine morphisms* in the category of schemes (`Scheme`).  
- Builds on sheaf theory (`Opens`, `presheaf`, `Γ`), basic open subsets (`basicOpen`), and affine opens (`affineOpens`).  
- Uses categorical language (`MorphismProperty`, `HasAffineProperty`, `IsStableUnderBaseChange`).  
- Relies on algebraic facts about rings and ideals (`Ideal.span`, `map`, `top`, `finite`).  

---

### Summary

This file formalizes the foundational theory of **affine morphisms of schemes** in Lean 4, emphasizing:
- Equivalence of global and local affineness conditions (via spanning sets of sections),
- Stability under composition, base change, and isomorphisms,
- A robust interface via `HasAffineProperty` to support future developments (e.g., separatedness, properness).

The proofs are highly structured, leveraging algebraic geometry’s local nature (basic opens, sheaves) and categorical abstraction (morphism properties).