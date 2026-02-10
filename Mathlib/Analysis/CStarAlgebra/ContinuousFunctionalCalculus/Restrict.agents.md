### Technical Metadata Brief: `SpectrumRestricts` and `QuasispectrumRestricts` in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `SpectrumRestricts a f` | Predicate `a : A → C(S, R) → Prop` | Captures that the spectrum of `a` over `S` restricts along `f : C(S, R)` to a spectrum over `R`. |
| `QuasispectrumRestricts a f` | Predicate `a : A → C(S, R)₀ → Prop` | Analogous to `SpectrumRestricts`, but for *non-unital* quasispectra (used in non-unital CFC). |
| `homeomorph` | `spectrum S a ≃ₜ spectrum R a` | Homeomorphism between spectra induced by `f`, under `SpectrumRestricts`. |
| `compactSpace` | `CompactSpace (spectrum S a) → CompactSpace (spectrum R a)` | Shows compactness descends along restriction. |
| `starAlgHom` | `C(spectrum R a, R) →⋆ₐ[R] A` | Descended *-algebra homomorphism from larger CFC to smaller scalar ring. |
| `cfc` | `ContinuousFunctionalCalculus R p` | Main theorem: constructs a CFC over `R` from one over `S`, assuming spectrum restriction. |
| `cfcHom_eq_restrict` | Equality of CFC homs under restriction | Uniqueness / compatibility of restricted CFC with original. |
| `cfc_eq_restrict` | `cfc g a = cfc (g ∘ f) a` | Functional calculus commutes with scalar restriction via `f`. |
| `nonUnitalStarAlgHom` | `C(σₙ S a, S)₀ →⋆ₙₐ[S] A → C(σₙ R a, R)₀ →⋆ₙₐ[R] A` | Non-unital analog of `starAlgHom`. |
| `cfcₙ` | `NonUnitalContinuousFunctionalCalculus R p` | Non-unital version of `cfc`. |
| `cfcₙ_eq_restrict` | `cfcₙ g a = cfcₙ (g ∘ f) a` | Non-unital functional calculus respects restriction. |

---

#### **2. Naming Conventions**

- **Predicates**:  
  - `SpectrumRestricts`, `QuasispectrumRestricts` — indicate *restriction of spectrum/quasispectrum* along a map.
- **Homeomorphisms**:  
  - `homeomorph` — always returns a `≃ₜ` (homeomorphism).
- **Algebra homomorphisms**:  
  - `starAlgHom` — unital *-algebra hom (for normal elements).  
  - `nonUnitalStarAlgHom` — non-unital *-algebra hom (for self-adjoint/positive elements via quasispectrum).
- **CFC homs**:  
  - `cfcHom`, `cfcₙHom` — canonical homs from functional calculus to algebra.  
  - `cfc`, `cfcₙ` — the *entire* functional calculus structure (as a `ContinuousFunctionalCalculus` instance).
- **Properties**:  
  - `isClosedEmbedding_*`, `compactSpace_*`, `left_inv`, `rightInvOn` — standard topological/algebraic lemmas.

Prefixes/suffixes:
- `_*_restrict` → restriction of structure.
- `_*_homeomorph` → induced topological equivalence.
- `_*_id` → identity property of functional calculus.
- `_*_map_spectrum` / `_*_map_quasispectrum` → spectrum preservation.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp only [...]` — heavy use of `simp` with explicit lemmas (e.g., `SpectrumRestricts.starAlgHom_apply`, `cfcHom_map_spectrum`).
- `rw [...]` — rewriting along equivalences, homeomorphisms, and functional calculus properties.
- `convert` + `ext x` — for extensionality in function spaces.
- `obtain ⟨r, rfl⟩` — destructing existential quantifiers over spectra.
- `lift x to spectrum S a using hx` — coercion lifting via subtype.
- `exact ...` / `refine ⟨..., ?_, ?_⟩` — structured proof construction.
- `by_cases ...` — splitting on continuity or zero-preservation.
- `simpa using ...` — simplifying goals using hypotheses.
- `apply ...` / `intro ...` — standard intro/apply for implications.

No heavy automation (e.g., `aesop`, `linarith`) — proofs are largely manual and structural.

---

#### **4. Proof Logic**

**General proof pattern** (e.g., for `cfc`):
1. **Predicate setup**: Use `h : p a ↔ q a ∧ SpectrumRestricts a f` to decompose `p`.
2. **Construct candidate hom**:  
   - Use `cfcHom` (from larger CFC) → restrict scalars → precompose with `f` → get `starAlgHom`.
3. **Verify CFC axioms**:
   - `spectrum_nonempty`: pull back nonempty spectrum via `f`.
   - `compactSpace_spectrum`: use `compactSpace` lemma + `halg.isClosedEmbedding`.
   - `exists_cfc_of_predicate`: construct hom and prove:
     - `hom_isClosedEmbedding`: via `isClosedEmbedding_starAlgHom`.
     - `hom_id`: use `starAlgHom_id`.
     - `hom_map_spectrum`: set-theoretic equivalence via `left_inv`/`right_inv`.
     - `predicate_hom`: use `rightInvOn` + `left_inv`.
4. **Uniqueness**: `cfcHom_eq_restrict` uses `cfcHom_eq_of_continuous_of_map_id`.

**Non-unital case** (`cfcₙ`) mirrors this, but:
- Uses `quasispectrum` instead of `spectrum`.
- Requires `g 0 = 0` for continuity.
- Uses `ContinuousMapZero` and `nonUnitalStarAlgHom`.

---

#### **5. Imports & Scope**

**Primary imports**:
- `Mathlib.Topology.Algebra.Algebra` — algebraic topology foundations.
- `Mathlib.Analysis.CStarAlgebra.ContinuousFunctionalCalculus.NonUnital` — non-unital CFC theory.

**Domain scope**:
- **Context**: Topological *-algebras over semifields/rings.
- **Main objects**:  
  - `Spectrum` (for unital/normal elements),  
  - `Quasispectrum` (for non-unital/self-adjoint/positive elements).
- **Goal**: Derive functional calculi over subrings (e.g., `ℝ`, `ℝ≥0`) from one over `ℂ`, via spectral restriction.

**Key use case** (from docstring):
- From `ContinuousFunctionalCalculus ℂ IsStarNormal`, derive:
  - `ContinuousFunctionalCalculus ℝ IsSelfAdjoint`
  - `ContinuousFunctionalCalculus ℝ≥0 (0 ≤ ·)`
- via:
  - `IsSelfAdjoint x ↔ IsStarNormal x ∧ SpectrumRestricts Complex.re x`
  - `0 ≤ x ↔ IsSelfAdjoint x ∧ SpectrumRestricts Real.toNNReal x`

---

### Summary

This file formalizes a *restriction principle* for continuous functional calculi: if the spectrum of an element is stable under restriction to a subring `R ⊆ S`, then the CFC over `S` descends to one over `R`. It provides both unital (`cfc`) and non-unital (`cfcₙ`) variants, with explicit constructions of the restricted homomorphisms and verification of all CFC axioms. The proofs rely heavily on topological properties (homeomorphisms, compactness, embeddings) and algebraic compatibility (scalar tower, star/module structures).