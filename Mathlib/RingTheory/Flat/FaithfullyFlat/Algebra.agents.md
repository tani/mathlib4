**Technical Brief: Algebra.lean — Faithfully Flat Algebras in Lean 4**

---

### 1. KEY DEFINITIONS & THEOREMS

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Module.FaithfullyFlat.of_comap_surjective` | `[Flat A B] → Function.Surjective (PrimeSpectrum.comap (algebraMap A B)) → Module.FaithfullyFlat A B` | Characterizes faithful flatness via surjectivity on prime spectra (for flat algebras). |
| `Module.FaithfullyFlat.of_flat_of_isLocalHom` | `[IsLocalRing A] → [IsLocalRing B] → [Flat A B] → [IsLocalHom (algebraMap A B)] → Module.FaithfullyFlat A B` | Shows flat + local homomorphism ⇒ faithfully flat. |
| `Module.FaithfullyFlat.tensorProduct_mk_injective` | `Function.Injective (TensorProduct.mk A B M 1)` | Canonical map $M \to B \otimes_A M$ is injective for any $A$-module $M$. |
| `Ideal.comap_map_eq_self_of_faithfullyFlat` | `(I : Ideal A) → (I.map f).comap f = I` | Contraction of extension of any ideal returns the original ideal. |
| `Ideal.comap_surjective_of_faithfullyFlat` | `Function.Surjective (Ideal.comap f)` | Every ideal in $A$ is the contraction of some ideal in $B$. |
| `Ideal.exists_isPrime_liesOver_of_faithfullyFlat` | `∃ P : Ideal B, P.IsPrime ∧ P.LiesOver p` | Every prime ideal in $A$ lies under some prime in $B$. |
| `PrimeSpectrum.comap_surjective_of_faithfullyFlat` | `Function.Surjective (PrimeSpectrum.comap f)` | Surjectivity of the induced map on prime spectra. |
| `Module.FaithfullyFlat.faithfulSMul` | `FaithfulSMul A B` | Scalar multiplication by $A$ on $B$ is faithful. |

> Notation: $f := \texttt{algebraMap A B}$.

---

### 2. NAMING CONVENTIONS

- **Prefixes**:
  - `of_`: Constructs a `Module.FaithfullyFlat` instance from other properties (`of_comap_surjective`, `of_flat_of_isLocalHom`).
  - `tensorProduct_`: Relates to tensor product constructions (`tensorProduct_mk_injective`).
  - `comap_`: Concerning contraction of ideals or spectra (`comap_map_eq_self_of_`, `comap_surjective_of_`).
- **Suffixes**:
  - `_of_faithfullyFlat`: Applies when $B$ is known to be faithfully flat over $A$.
  - `_injective`, `_surjective`: Indicates injectivity/surjectivity of a canonical map.
- **Aliases**:
  - Deprecated aliases use `alias` and `deprecated` attributes (e.g., `of_specComap_surjective`, `specComap_surjective_of_faithfullyFlat`).

---

### 3. TACTIC STACK

Frequently used tactics in proofs:
- `rw`: Rewriting using equalities/definitions (especially `Ideal.comap_map_eq_self`, `TensorProduct.mk_apply`, `smul_top_eq_map`).
- `simp`: Simplification with algebraic properties (e.g., `TensorProduct.mk`, `smul_eq_mul`, `algebraMap_eq_smul_one`).
- `apply`: Introducing lemmas or injectivity/surjectivity facts.
- `exact`: Closing goals directly with given hypotheses.
- `intro`: Introducing variables/hypotheses in implication-style goals.
- `by_contra`: Contradiction-based reasoning (e.g., in `of_flat_of_isLocalHom`).
- `convert`, `ext'`, `apply TensorProduct.ext'`: For proving equality of tensor maps.
- `have`, `obtain`: Intermediate lemma construction.
- `rw [← ...]`: Rewriting with reversed equalities to match goal structure.

---

### 4. PROOF LOGIC

**General proof strategy**:
- **Forward direction** (from faithful flatness to properties):
  - Use injectivity of $M \to B \otimes_A M$ (via `tensorProduct_mk_injective`) to deduce ideal-theoretic or spectral properties.
  - For ideals: Use equivalence between $I \cong B \otimes_A (A/I)$ and the quotient map.
  - For primes: Lift via `Ideal.comap_map_eq_self_iff_of_isPrime` or `PrimeSpectrum.mem_range_comap_iff`.

- **Reverse direction** (from spectral/ideal surjectivity to faithful flatness):
  - Reduce to module-theoretic faithful flatness via `Module.FaithfullyFlat.lTensor_injective_iff_injective`.
  - Use properties of local rings (e.g., maximal ideal behavior under local homs) to rule out non-faithfulness.

**Typical flow**:
1. Assume flatness + extra condition (e.g., surjectivity on $\operatorname{Spec}$).
2. Show injectivity of $M \to B \otimes_A M$ for all $M$, or surjectivity of contraction.
3. Conclude faithful flatness or derive ideal/spectrum properties.

---

### 5. IMPORTS

Core dependencies defining the module’s scope:

```lean
Mathlib.RingTheory.Flat.FaithfullyFlat.Basic
Mathlib.RingTheory.Ideal.Over
Mathlib.RingTheory.LocalRing.RingHom.Basic
Mathlib.RingTheory.Spectrum.Prime.RingHom
Mathlib.RingTheory.TensorProduct.Quotient
```

These indicate the file sits at the intersection of:
- **Flat and faithfully flat modules/algebras**
- **Ideal theory (extension/contraction, lying over)**
- **Local ring theory (local homomorphisms)**
- **Prime spectrum and its functoriality**
- **Tensor products and quotients**

---

### 6. MERMAID DIAGRAMS

#### Dependency Graph (High-Level)

```mermaid
graph TD
  A[CommRing A, B] --> B[Algebra A B]
  B --> C[Flat A B]
  B --> D[PrimeSpectrum.comap f]
  C --> E[Module.FaithfullyFlat A B]
  D --> E
  E --> F[Ideal.comap_map_eq_self]
  E --> G[TensorProduct.mk_injective]
  E --> H[PrimeSpectrum.comap_surjective]
  C & [IsLocalRing A] & [IsLocalRing B] & [IsLocalHom f] --> I[Module.FaithfullyFlat.of_flat_of_isLocalHom]
```

#### Overview of File Structure

```mermaid
flowchart LR
  subgraph Definitions
    A[Algebra A B]
    B[Flat A B]
    C[IsLocalRing A/B]
    D[IsLocalHom]
  end

  subgraph Main Results (⇒)
    E[Module.FaithfullyFlat.tensorProduct_mk_injective]
    F[Ideal.comap_map_eq_self_of_faithfullyFlat]
    G[Ideal.comap_surjective_of_faithfullyFlat]
    H[Ideal.exists_isPrime_liesOver_of_faithfullyFlat]
    I[PrimeSpectrum.comap_surjective_of_faithfullyFlat]
  end

  subgraph Main Results (⇐)
    J[Module.FaithfullyFlat.of_comap_surjective]
    K[Module.FaithfullyFlat.of_flat_of_isLocalHom]
  end

  B --> J
  B & C & D --> K
  E --> F
  F --> G
  F --> H
  H --> I
```

---

### 7. THEORY CONTEXT

This file formalizes a cornerstone of *descent theory* in commutative algebra:  
> **Faithfully flat descent**: Properties of modules/ideals/rings over $A$ can be detected after base change to a faithfully flat $A$-algebra $B$.

Key connections:
- Links **module-theoretic** faithful flatness with **geometric** surjectivity on spectra.
- Enables “going-up” and “lying over” results for primes.
- Provides tools for checking faithful flatness in practice (e.g., via local criteria).

---

### 8. SUMMARY

This module provides a comprehensive equivalence between several characterizations of faithful flatness in the algebra setting, with emphasis on ideal-theoretic and spectral behavior. It leverages Lean’s `Mathlib` infrastructure for tensor products, localization, and prime spectra, and follows standard proof patterns in commutative algebra (e.g., reduction to module-theoretic injectivity, use of quotient-tensor isomorphisms).
