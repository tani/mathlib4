Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Factorization of Sheaf Morphisms**

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `locallyInjective` | `MorphismProperty (Sheaf J A)` — defines the class of *locally injective* sheaf morphisms via `IsLocallyInjective`. |
| `locallySurjective` | `MorphismProperty (Sheaf J A)` — defines the class of *locally surjective* sheaf morphisms via `IsLocallySurjective`. |
| `functorialLocallySurjectiveInjectiveFactorization` | Constructs a *functorial factorization* of any sheaf morphism as a locally surjective morphism followed by a locally injective one, using a given factorization in the base concrete category `A`. |
| `isLocallySurjective_iff_epi'` | Under additional assumptions (`[Balanced (Sheaf J A)]`, `[HasSheafify J A]`, `[J.HasSheafCompose (forget A)]`), this lemma proves: <br> `IsLocallySurjective φ ↔ Epi φ`. That is, locally surjective morphisms are precisely the epimorphisms in `Sheaf J A`. |

#### **2. Naming Conventions**

- **Prefixes**:
  - `isLocally...`: Predicate naming for properties of morphisms (`isLocallyInjective`, `isLocallySurjective`).
  - `locally...`: Property classes (`locallyInjective`, `locallySurjective`).
- **Suffixes**:
  - `fac`: Abbreviation for *factorization* (e.g., `fac`, `factorizationData`).
  - `i`, `p`: Standard notation for the *initial* (injective-like) and *projective* (projective-like / surjective-like) maps in a factorization.
- **Adjectives**:
  - `functorial...`: Indicates a *functorial* construction (e.g., `functorialLocallySurjectiveInjectiveFactorization`).
  - `sheafToPresheaf`, `presheafToSheaf`: Functors between sheaves and presheaves.
  - `sheafificationAdjunction`: Refers to the adjunction between sheafification and inclusion.

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `ext`: Extensionality for morphisms/natural transformations.
- `dsimp`, `simp only`: Simplification with specific lemmas.
- `rw`: Rewriting using equalities or equivalences.
- `apply`: To apply lemmas or instances.
- `exact`: To finish a goal with a given term.
- `infer_instance`: To discharge typeclass goals automatically.
- `simp only [...]`: Heavy use of `simp` with explicit lemmas, especially involving:
  - `assoc`, `Functor.map_comp`, `NatIso.isIso_inv_app`, `IsIso.inv_comp_eq`.
  - Sheaf/presheaf transfer lemmas like `isLocallySurjective_sheafToPresheaf_map_iff`.

#### **4. Proof Logic**

- **Main construction** (`functorialLocallySurjectiveInjectiveFactorization`):
  - Uses the given *functorial surjective/injective factorization* in `A` (via `data`).
  - Lifts it to sheaves via:
    - Mapping to presheaves (`sheafToPresheaf`),
    - Applying the factorization in presheaves (`data.functorCategory`),
    - Returning to sheaves (`presheafToSheaf`).
  - Verification of factorization (`fac`) uses naturality of the sheafification counit.
  - Verification of `hi` (locally surjective) and `hp` (locally injective) uses:
    - Transfer lemmas between sheaf and presheaf notions (`isLocallySurjective_sheafToPresheaf_map_iff`, etc.).
    - The corresponding properties in presheaves (`Presheaf.isLocallySurjective_of_surjective`, etc.).

- **Epimorphism/monomorphism properties**:
  - Follows from `isLocallySurjective → Epi` and `isLocallyInjective → Mono`, via `epi_of_isLocallySurjective`, `mono_of_isLocallyInjective`.

- **Equivalence `IsLocallySurjective ↔ Epi`**:
  - Uses balancedness of `Sheaf J A` (epi + mono ⇒ iso).
  - Factorizes `φ`, shows the injective part is both mono and epi ⇒ iso.
  - Concludes that `φ` is epi iff its surjective part is epi, i.e., locally surjective.

#### **5. Imports & Dependencies**

- **Core imports**:
  - `Mathlib.CategoryTheory.MorphismProperty.Concrete`: For `MorphismProperty`, `FunctorialFactorizationData`, etc.
  - `Mathlib.CategoryTheory.Sites.LocallyBijective`: For `J.WEqualsLocallyBijective`, linking weak equivalences to locally bijective maps.

- **Assumptions on `A`**:
  - `[ConcreteCategory.{w} A]`
  - `[HasFunctorialSurjectiveInjectiveFactorization A]`: Ensures factorization in base category.
  - `[J.WEqualsLocallyBijective A]`: Links weak equivalences to locally bijective maps.

- **Assumptions on `J` and sheaf category**:
  - `[HasWeakSheafify J A]`, `[J.HasSheafCompose (forget A)]`, `[Balanced (Sheaf J A)]`: For final equivalence lemma.

---

Let me know if you'd like a diagrammatic summary or a formalized summary in a specific format (e.g., for documentation or AI training).