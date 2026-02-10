Here's a structured technical brief extracted from the provided Lean 4 file, focusing on formal metadata relevant for building a domain-specific AI agent in algebraic geometry:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `AffineSpace n S` | `Scheme` | Defines affine `n`-space over a base scheme `S` as a pullback: `𝔸(n; S) = pullback (S → *) → (* ← Spec ℤ[n])`. |
| `coord i` | `Γ(𝔸(n; S), ⊤)` | Standard coordinate functions (global sections) on affine space indexed by `i : n`. |
| `toSpecMvPolyIntEquiv n` | `(X ⟶ Spec ℤ[n]) ≃ (n → Γ(X, ⊤))` | Equivalence between morphisms into `Spec ℤ[n]` and `n`-tuples of global sections. Core representability result. |
| `homOfVector f v` | `X ⟶ 𝔸(n; S)` | Morphism into affine space determined by a base morphism `f : X → S` and `v : n → Γ(X, ⊤)`. |
| `homOverEquiv` | `{f : X ⟶ 𝔸(n; S) // f.IsOver S} ≃ (n → Γ(X, ⊤))` | Universal property: `S`-morphisms into affine space correspond to `n` global sections. |
| `isoOfIsAffine [IsAffine S]` | `𝔸(n; S) ≅ Spec (MvPolynomial n Γ(S, ⊤))` | Affine space over an affine base is affine, with coordinate ring the multivariate polynomial ring. |
| `SpecIso n R` | `𝔸(n; Spec R) ≅ Spec (MvPolynomial n R)` | Explicit isomorphism for affine base `Spec R`. |
| `map f` | `𝔸(n; S) ⟶ 𝔸(n; T)` | Functoriality of affine space in the base `S → T`. |
| `reindex i S` | `𝔸(n; S) ⟶ 𝔸(m; S)` | Functoriality in the index type `i : m → n`. |
| `functor` | `(Type v)ᵒᵖ ⥤ Scheme ⥤ Scheme` | Affine space as a bifunctor: contravariant in index, covariant in base. |

**Key Lemmas:**
- `hom_ext`: Morphisms into affine space are determined by their composition with the structure map and their action on coordinates.
- `homOfVector_appTop_coord`: Evaluation of `homOfVector` on coordinates recovers the vector `v`.
- `map_Spec_map`: Compatibility of `map` with `Spec`-functor and polynomial ring maps.
- `reindex_comp`, `reindex_id`: `reindex` defines a contravariant action of functions between index types.

---

### **2. Naming Conventions**

- **Prefixes:**
  - `homOfVector`, `homOverEquiv`, `toSpecMvPoly`: Descriptive compound names indicating construction or equivalence.
  - `coord`, `map`, `reindex`: Short, action-oriented names for core operations.
- **Suffixes:**
  - `Int`: Indicates use of `ℤ[n]` (e.g., `toSpecMvPolyIntEquiv`).
  - `Iso`: For isomorphisms (`SpecIso`, `isoOfIsAffine`).
  - `over`: For structure maps (`homOfVector_over`, `map_over`).
  - `appTop`: For action on global sections (`homOfVector_appTop_coord`, `map_appTop_coord`).
- **Notation:**
  - `𝔸(n; S)` for `AffineSpace n S`.
  - `ℤ[n]`, `ℤ[n].{u}` for `MvPolynomial n (ULift ℤ)` and its lift.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only`: Dominant for simplification, especially with `@[simp]` lemmas.
- `ext`: Extensionality for morphisms and ring homomorphisms (`ringHom_ext'`, `DFunLike.congr_fun`).
- `rw`: Rewriting using equivalences, naturality squares, and isomorphism laws.
- `apply`: Often with injectivity/surjectivity lemmas (e.g., `injective`, `hom_ext`).
- `congr`: For proving equality of composite morphisms via diagram chasing.
- `dsimp`, `convert`: For definitional simplification and partial unification.
- `aesop`: Not present — proofs are largely manual or `simp`-driven.
- `ring`, `abel`: Absent — ring reasoning handled via `eval₂Hom`, `MvPolynomial` lemmas.

---

### **4. Proof Logic & Strategy**

- **Representability Core:** Most results derive from the universal property of `Spec ℤ[n]` and the adjunction `Γ ⊣ Spec`.
- **Morphism Extensionality:** Proofs often use `hom_ext`, which reduces equality of morphisms to:
  - Equality of structure maps (`f ≫ S↘S = g ≫ S↘S`), and
  - Equality on coordinates (`∀ i, f.appTop (coord i) = g.appTop (coord i)`).
- **Isomorphism Construction:** For `isoOfIsAffine` and `SpecIso`, proofs use:
  - Explicit `hom`/`inv` definitions via `homOfVector` and `toSpecΓ`.
  - Verification via `hom_ext` and ring homomorphism extensionality (`ringHom_ext'`, `eval₂_X`).
- **Functoriality:** Proven by `ext` + `simp`, leveraging naturality of `coord` and `homOfVector`.
- **Index Reindexing:** Contravariance handled via composition with `coord S ∘ i`, verified using `hom_ext`.

---

### **5. Imports & Scope**

**Primary Dependencies:**
- `Mathlib.Algebra.MvPolynomial.Monad`: For `MvPolynomial`, `eval₂Hom`, `X`, `C`, and ring homomorphism constructions.
- `Mathlib.AlgebraicGeometry.Limits`: For pullbacks, terminal objects, and diagrammatic constructions.
- Implicit: `Mathlib.AlgebraicGeometry.Scheme` (via `Scheme`, `Γ`, `toSpecΓ`, `Spec`, `Iso`, `IsAffine`).
- Implicit: `Mathlib.CategoryTheory` (functors, natural transformations, adjunctions, limits).

**Domain Scope:**
- **Algebraic Geometry**: Schemes, morphisms, global sections, affine schemes.
- **Commutative Algebra**: Multivariate polynomial rings, ring homomorphisms, evaluation maps.
- **Category Theory**: Limits (pullbacks), representability, functor categories, isomorphisms of arrows.

---

Let me know if you'd like this exported as JSON/YAML for ingestion by an AI agent, or if you'd like a dependency graph of definitions.