**Technical Brief: `Semilocal.lean`**

---

### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Module.Finite.of_isLocalized_maximal` | `∀ [Finite (MaximalSpectrum R)], (∀ P : MaxIdeal R, Module.Finite (Rₚ P) (Mₚ P)) → Module.Finite R M` | Proves finite generation of a module over a semilocal ring from finite generation of all localizations at maximal ideals. |
| `Submodule.fg_of_isLocalized_maximal` | `∀ N ≤ M, (∀ P, (N.localized' P.primeCompl).FG) → N.FG` | Submodule version: finite generation descends from localizations. |
| `Module.Finite.of_localized_maximal` | `∀ H : ∀ P, Module.Finite (Localization P.primeCompl) (LocalizedModule P.primeCompl M), Module.Finite R M` | Special case of `of_isLocalized_maximal` using canonical localization maps. |
| `Submodule.fg_of_localized_maximal` | `∀ N ≤ M, (∀ P, (N.localized P.primeCompl).FG) → N.FG` | Submodule version for canonical localizations. |
| `IsNoetherianRing.of_isLocalization_maximal` | `∀ [Finite (MaximalSpectrum R)], (∀ P, IsNoetherianRing (Rₚ P)) → IsNoetherianRing R` | A semilocal ring is Noetherian iff all its maximal localizations are Noetherian. |
| `isPrincipalIdealRing_of_isPrincipalIdealRing_isLocalization_maximal` | `[IsDomain R] → (∀ P, IsPrincipalIdealRing (Rₚ P)) → IsPrincipalIdealRing R` | A semilocal *integral domain* is a PID if all its maximal localizations are PIDs. |

---

### 2. **Naming Conventions**

- **Prefixes**:
  - `of_`: Indicates a descent property — property of localizations implies global property.
  - `is_`: Predicate-style naming for properties (e.g., `IsNoetherianRing`, `IsPrincipalIdealRing`, `IsDomain`).
  - `fg_`: For finite generation (`FG`, `fg_top`, `fg_of_...`).
  - `localized'`, `localized`: Notation for localized modules/submodules.
- **Suffixes**:
  - `_maximal`: Indicates localization at *maximal* ideals (as opposed to arbitrary primes).
  - `_isLocalization`: For versions using `IsLocalization` infrastructure (e.g., `of_isLocalization_maximal`).
- **Variables**:
  - `Rₚ`, `Mₚ`: Generic localizations of ring/module.
  - `f`: Family of localization maps.
  - `H`: Hypothesis that localizations satisfy a property.

---

### 3. **Tactic Stack**

- `classical`: Used to enable choice principles for constructing finite covers.
- `choose`: To extract finite generating sets and local fractions.
- `use`: To propose a finite generating set (via `Finset.biUnion` and `Finset.image`).
- `refine`: To reduce to a local condition via `Submodule.eq_top_of_localization_maximal`.
- `rw [eq_top_iff, ← hs, Submodule.localized'_span, Submodule.span_le]`: Rewriting to reduce to containment in span.
- `lift x to s ⟨P, hP⟩ using hx`: To lift an element to a finite set.
- `simpa using …`: To simplify using a hypothesis.
- `infer_instance`: To discharge typeclass goals (e.g., `IsLocalization`, `Module`, `IsNoetherianRing`).
- `rw [Ring.krullDimLE_one_iff_of_noZeroDivisors]`: Rewriting Krull dimension criteria.
- `have : … := ?_`: Intermediate lemma introduction.

---

### 4. **Proof Logic**

The proofs follow a **local-to-global descent strategy**, leveraging the finiteness of the maximal spectrum:

1. **Finite covering**: Use `Finite (MaximalSpectrum R)` to reduce to finitely many maximal ideals.
2. **Choice of generators & fractions**: For each maximal ideal $ \mathfrak{m} $, choose:
   - A finite generating set $ s_{\mathfrak{m}} $ of $ M_{\mathfrak{m}} $,
   - A fraction representation $ \frac{s}{t} $ for each generator in the localization.
3. **Global generation**: Combine all such fractions into a finite set in $ M $, and show it generates $ M $ globally using the universal property of localization.
4. **Submodule case**: Reduce to module case via `Submodule.toLocalized'`.
5. **Ring-theoretic cases**:
   - *Noetherian*: Apply module finite generation to all submodules.
   - *PID*: Combine:
     - Noetherianity (via previous theorem),
     - Integrally closed (via localization),
     - Krull dimension ≤ 1 (via localization),
     - Finite maximal spectrum → Dedekind domain with finite maximal spectrum ⇒ PID.

---

### 5. **Imports**

- `Mathlib.RingTheory.DedekindDomain.PID`: Provides characterization of PIDs among Dedekind domains.
- `Mathlib.RingTheory.KrullDimension.PID`: Provides `krullDimLE_one_iff_of_noZeroDivisors`, linking Krull dimension 1 and PID structure.

These imports indicate the file sits at the intersection of:
- **Localization theory** (especially `IsLocalization`, `LocalizedModule`),
- **Noetherian and finite generation criteria**,
- **Dedekind domains and Krull dimension**.

---

### 6. **Mermaid Diagrams**

#### **Dependency Graph (Theorems)**

```mermaid
graph TD
  A[Finite (MaximalSpectrum R)] --> B[Module.Finite.of_isLocalized_maximal]
  A --> C[IsNoetherianRing.of_isLocalization_maximal]
  A --> D[isPrincipalIdealRing_of_isPrincipalIdealRing_isLocalization_maximal]

  B --> E[Submodule.fg_of_isLocalized_maximal]
  C --> F[IsNoetherianRing]
  D --> G[IsPrincipalIdealRing]

  D --> H[IsNoetherianRing.of_isLocalization_maximal]
  D --> I[IsIntegrallyClosed.of_isLocalization_maximal]
  D --> J[Ring.krullDimLE_of_isLocalization_maximal]
  D --> K[Ring.krullDimLE_one_iff_of_noZeroDivisors]
  D --> L[IsDedekindDomain]

  style A fill:#f9f,stroke:#333
  style B fill:#bbf,stroke:#333
  style C fill:#bbf,stroke:#333
  style D fill:#bfb,stroke:#333
```

#### **Overview of File Structure**

```mermaid
flowchart LR
  A[CommSemiring R, Finite MaximalSpectrum] --> B[IsLocalized section]
  B --> B1[Module.Finite.of_isLocalized_maximal]
  B --> B2[Submodule.fg_of_isLocalized_maximal]

  A --> C[Localized section]
  C --> C1[Module.Finite.of_localized_maximal]
  C --> C2[Submodule.fg_of_localized_maximal]

  A --> D[IsLocalization section]
  D --> D1[IsNoetherianRing.of_isLocalization_maximal]

  CommRing R --> E[IsLocalization section]
  E --> E1[isPrincipalIdealRing_of_isPrincipalIdealRing_isLocalization_maximal]
  E1 --> H[IsNoetherianRing]
  E1 --> I[IsIntegrallyClosed]
  E1 --> J[KrullDim ≤ 1]
  E1 --> K[DedekindDomain]
  E1 --> L[PID]

  classDef core fill:#ddf,stroke:#333;
  classDef desc fill:#f9f,stroke:#333;
  classDef ring fill:#bfb,stroke:#333;

  class A,B,C,D,E core;
  class B1,B2,C1,C2,D1,E1 desc;
  class H,I,J,K,L ring;
```

---

### 7. **Domain-Specific AI Agent Notes**

- **Key inference pattern**: *Local-to-global descent over finitely many maximal ideals*.
- **Common proof skeleton**:
  1. Use finiteness of `MaximalSpectrum` to reduce to finite case.
  2. Use `IsLocalization` infrastructure (`IsLocalizedModule`, `LocalizedModule`, `algebra`).
  3. Construct global generators from local ones.
  4. Apply `eq_top_iff` or `fg_iff` to conclude.
- **Critical typeclasses**:
  - `[Finite (MaximalSpectrum R)]`
  - `[IsLocalization.AtPrime (Rₚ P) P]`
  - `[IsLocalizedModule P.primeCompl (f P)]`
- **Domain**: Commutative algebra, especially *semilocal rings*, *localization*, *Noetherianity*, *PIDs*, *Dedekind domains*.

--- 

Let me know if you'd like a formalized summary in Lean or a visualization of the proof DAG.
