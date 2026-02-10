### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `imageOfDf` | `R[X] → Set (PrimeSpectrum R)` | Defines the open subset of `Spec R` where at least one coefficient of a polynomial `f` is non-vanishing. |
| `isOpen_imageOfDf` | `IsOpen (imageOfDf f)` | Proves that `imageOfDf f` is an open subset of `Spec R`. |
| `comap_C_mem_imageOfDf` | `I ∉ zeroLocus {f} → comap C I ∈ imageOfDf f` | Shows that if a prime ideal in `Spec R[X]` avoids `f`, then its image under `Spec R[X] → Spec R` lies in `imageOfDf f`. |
| `imageOfDf_eq_comap_C_compl_zeroLocus` | `imageOfDf f = comap C '' (zeroLocus {f})ᶜ` | Identifies `imageOfDf f` as the image of the complement of the vanishing set of `f` under the structural map `Spec R[X] → Spec R`. |
| `isOpenMap_comap_C` | `IsOpenMap (comap C)` | Main result: the morphism `Spec R[X] → Spec R` induced by `R → R[X]` is an open map. |

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `imageOfDf`: Named after the *discriminant-like* support of coefficients (though not the classical discriminant).
  - `comap_C`: Refers to the *comap* (preimage) along the canonical ring map `C : R → R[X]`.
  - `zeroLocus`: Standard notation for the vanishing set of a set of functions/ideals.
  - `basicOpen`: Standard in algebraic geometry for `D(f) = {p ∈ Spec A | f ∉ p}`.

- **Suffixes**:
  - `_eq_comap_C_compl_zeroLocus`: Indicates an equality involving the complement of a zero locus and a comap.
  - `_mem_imageOfDf`: Membership condition in `imageOfDf`.
  - `isOpen_`, `isOpenMap_`: Standard Lean/Stacks-style naming for openness properties.

---

#### 3. **Tactic Stack**

- **Core tactics**:
  - `rw`: Rewriting using equalities (e.g., `imageOfDf_eq_comap_C_compl_zeroLocus`, `zeroLocus_iUnion`).
  - `ext`: Extensionality for set equality.
  - `simp_rw`: Simplification with rewrite rules (used for rewriting under images).
  - `exact`: Direct proof application.
  - `cases'`: Case analysis on existential or complement hypotheses.
  - `intro`/`rintro`: Introducing hypotheses and destructuring.
  - `iUnion`, `iInter`: Handling indexed unions/intersections.
  - `mem_image_of_mem`, `mem_map_C_iff`: Lemmas for reasoning about images and maps of ideals.

- **Domain-specific automation**:
  - `isPrime_map_C_of_isPrime`: Used implicitly via `exact` to verify primality of mapped ideals.
  - `coeff_C_zero`: Simplifies coefficients of constant polynomials.

---

#### 4. **Proof Logic**

- **Structure**:
  - **Step 1**: Define `imageOfDf f` as a union of basic opens (`coeff f i ∉ p`), hence open.
  - **Step 2**: Prove equivalence between `imageOfDf f` and the image of `basicOpen f = (zeroLocus {f})ᶜ` under `comap C`.
    - Uses `exists_C_coeff_not_mem` (a standard lemma about polynomial coefficients and prime ideals).
  - **Step 3**: Prove openness of `comap C` by expressing any open set as a union of complements of zero loci, then applying the previous equivalence and stability of openness under unions.

- **Inductive/structural pattern**:
  - Not inductive; relies on *set-theoretic decomposition* of opens in the Zariski topology.
  - Key idea: Every open set in `Spec R[X]` is a union of sets of the form `(zeroLocus {f})ᶜ`, and the image of each such set is open in `Spec R`.

---

#### 5. **Imports**

| Import | Role |
|--------|------|
| `Mathlib.AlgebraicGeometry.PrimeSpectrum.Basic` | Provides `PrimeSpectrum`, `zeroLocus`, `basicOpen`, `comap`, `isOpen_basicOpen`, etc. |
| `Mathlib.RingTheory.Polynomial.Basic` | Provides `R[X]`, `coeff`, `Polynomial.C`, `map`, `isPrime_map_C_of_isPrime`, `coeff_C_zero`, etc. |

- **No heavy algebraic geometry machinery** (e.g., sheaves, topology on spectra) is imported beyond basics — the proof is elementary in the language of prime spectra and polynomial rings.

---

#### 6. **Mathematical Context**

- **Target result**: First part of [Stacks Project, Lemma 00FB](https://stacks.math.columbia.edu/tag/00FB):  
  > *The structure morphism `𝔸¹_R → Spec R` is open.*

- **Interpretation**: This is the scheme-theoretic version of the topological statement that the projection `V(f) ⊆ R^{n+1} → R^n` is open in the Zariski topology.

- **Key algebraic input**: For a prime ideal `Q ⊆ R[X]`, if `f ∉ Q`, then some coefficient of `f` is not in `Q ∩ R`. This is `exists_C_coeff_not_mem`.

--- 

Let me know if you'd like a formalized summary in Lean-style comment format or a diagrammatic proof sketch.