**Technical Brief: `Basic.lean` — Prime Spectrum of a Commutative (Semi)Ring**

---

### 1. KEY DEFINITIONS & THEOREMS

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `zeroLocus` | `Set R → Set (PrimeSpectrum R)` | Maps a subset `s ⊆ R` to the set of prime ideals containing `s`. |
| `vanishingIdeal` | `Set (PrimeSpectrum R) → Ideal R` | Maps a subset `t ⊆ PrimeSpectrum R` to the intersection of the prime ideals in `t`. |
| `primeSpectrumProd` | `PrimeSpectrum (R × S) ≃ PrimeSpectrum R ⊕ PrimeSpectrum S` | Bijection between primes of a product and disjoint union of primes. |
| `gc`, `gc_set` | `GaloisConnection` | `zeroLocus` and `vanishingIdeal` form a Galois connection (contravariant inclusion). |
| `vanishingIdeal_zeroLocus_eq_radical` | `vanishingIdeal (zeroLocus I) = I.radical` | Fundamental correspondence: vanishing ideal of zero locus = radical. |
| `nilradical_eq_iInf` | `nilradical R = ⨅ p : PrimeSpectrum R, p.asIdeal` | Nilradical = intersection of all prime ideals. |
| `zeroLocus_empty_iff_eq_top` | `zeroLocus I = ∅ ↔ I = ⊤` | Characterizes when zero locus is empty. |
| `zeroLocus_sup`, `zeroLocus_union`, `vanishingIdeal_union`, etc. | Set-theoretic identities | Encode Zariski-closed set operations algebraically (e.g., `zeroLocus(I+J) = zeroLocus I ∩ zeroLocus J`). |
| `exists_primeSpectrum_prod_le` | `∃ Z, Multiset.prod (Z.map asIdeal) ≤ I` | In Noetherian rings, every ideal contains a product of primes. |
| `isMax_iff`, `isMin_iff` | `IsMax x ↔ x.asIdeal.IsMaximal`, `IsMin x ↔ x.asIdeal ∈ minimalPrimes R` | Max/min primes correspond to max/min points in spectrum. |
| `nonempty_iff_nontrivial`, `isEmpty_iff_subsingleton` | `Nonempty (PrimeSpectrum R) ↔ Nontrivial R`, etc. | Connectivity of spectrum reflects ring structure. |

---

### 2. NAMING CONVENTIONS

- **Prefixes**:
  - `zeroLocus_`: operations on zero loci (e.g., `zeroLocus_union`, `zeroLocus_bot`)
  - `vanishingIdeal_`: operations on vanishing ideals (e.g., `vanishingIdeal_singleton`, `vanishingIdeal_iUnion`)
  - `primeSpectrum_`: constructions involving the spectrum itself (e.g., `primeSpectrumProd`, `primeSpectrumProdOfSum`)
- **Suffixes**:
  - `_iff`: characterizations via biconditionals (e.g., `zeroLocus_empty_iff_eq_top`)
  - `_singleton`: special case for singletons (e.g., `vanishingIdeal_singleton`)
  - `_radical`: interaction with radical ideals (e.g., `zeroLocus_radical`)
- **Variables**:
  - `s, s'`: subsets of the ring `R`
  - `t, t'`: subsets of `PrimeSpectrum R`
  - `I, J`: ideals
  - `x, y, p`: points (primes) in `PrimeSpectrum R`

---

### 3. TACTIC STACK

- **Core proof automation**:
  - `simp`, `rw`, `ext`, `intro`, `cases`, `rcases`, `obtain`
- **Algebraic reasoning**:
  - `ring`, `linarith`, `exact`, `apply`, `refine`, `swap`, `by_contra`
- **Ideal theory**:
  - `Ideal.mem_span_singleton_self`, `Ideal.mul_le_right`, `Ideal.mem_sup_right`, `Ideal.eq_top_iff_one`
- **Order-theoretic**:
  - `le_trans`, `le_of_eq`, `le_antisymm`, `monotone_l`, `monotone_u`
- **Galois connection machinery**:
  - `gc R`, `gc_set R`, `l_u_l_eq_l`, `l_u_le`, `u_l_u_eq_u`
- **Multiset / Noetherian induction**:
  - `IsNoetherian.induction`, `Multiset.map_add`, `Multiset.prod_add`, `mul_le_mul'`

---

### 4. PROOF LOGIC

- **Structure**:
  - Most proofs follow a **Galois connection–driven pattern**: reduce to `subset_zeroLocus_iff_le_vanishingIdeal`, then unfold definitions and apply ideal-theoretic lemmas.
  - **Radical ideal properties** are heavily used (e.g., `I.radical = ⋂ {p : Prime | I ≤ p}`, `f ∈ I.radical ↔ ∃ n, f^n ∈ I`).
  - **Noetherian arguments** use well-founded induction on ideals (`IsNoetherian.induction`) and ideal factorization lemmas (`Ideal.not_isPrime_iff`, `Ideal.exists_le_maximal`).
  - **Bijection proofs** (`primeSpectrumProd`) use `Equiv.ofBijective` with case analysis on `Ideal.ideal_prod_prime`.
- **Common flow**:
  1. Unfold definitions (`ext`, `rw [mem_zeroLocus]`, `rw [mem_vanishingIdeal]`)
  2. Apply Galois connection (`gc R` or `gc_set R`)
  3. Reduce to ideal membership or inclusion statements
  4. Use ideal lemmas (`mul_le`, `sup_le`, `radical_eq_sInf`, etc.)
  5. Conclude via `Ideal.ext`, `Set.ext`, or `Equiv.ext`.

---

### 5. IMPORTS & DEPENDENCIES

| Module | Purpose |
|--------|---------|
| `Mathlib.RingTheory.Ideal.MinimalPrime.Basic` | Minimal primes, `minimalPrimes R`, `IsMin` |
| `Mathlib.RingTheory.Nilpotent.Lemmas` | Nilpotent elements, nilradical properties |
| `Mathlib.RingTheory.Noetherian.Basic` | Noetherian rings, induction on ideals |
| `Mathlib.RingTheory.Spectrum.Prime.Defs` | `PrimeSpectrum R`, `asIdeal`, basic definitions |

> **Note**: This file deliberately avoids the Zariski topology (`TopologicalSpace` is not imported), reserving topology for `Topology.lean`.

---

### 6. MERMAID DIAGRAMS

#### Dependency Graph (Top-Level)

```mermaid
graph TD
  A[Basic.lean] --> B[Mathlib.RingTheory.Ideal.MinimalPrime.Basic]
  A --> C[Mathlib.RingTheory.Nilpotent.Lemmas]
  A --> D[Mathlib.RingTheory.Noetherian.Basic]
  A --> E[Mathlib.RingTheory.Spectrum.Prime.Defs]

  B --> F[MinimalPrimes]
  C --> G[Nilradical]
  D --> H[NoetherianInduction]
  E --> I[PrimeSpectrum R]

  A --> J[Mathlib.RingTheory.Spectrum.Prime.Topology] %% implied via dependency chain
```

#### Overview of Theory Flow

```mermaid
flowchart LR
  R[CommSemiring R] --> PrimeSpectrum[PrimeSpectrum R]
  PrimeSpectrum --> zeroLocus[zeroLocus : Set R → Set (PrimeSpectrum R)]
  PrimeSpectrum --> vanishingIdeal[vanishingIdeal : Set (PrimeSpectrum R) → Ideal R]

  zeroLocus & vanishingIdeal --> GC[Galois Connection]
  GC --> Radical[vanishingIdeal ∘ zeroLocus = radical]
  GC --> Topology[Zariski topology (in Topology.lean)]

  R --> Product[PrimeSpectrum(R × S) ≃ PrimeSpectrum R ⊕ PrimeSpectrum S]
  R --> Order[Order structure: ⊥, max/min]

  R[Noetherian] --> Factor[Factorization: I ⊇ ∏ primes]
```

---

### 7. SUMMARY

This file establishes the **algebraic foundation** of the prime spectrum in constructive commutative algebra. It defines the contravariant adjunction between subsets of a ring and subsets of its prime spectrum (`zeroLocus` ⊣ `vanishingIdeal`), proves key identities (especially the radical correspondence), and explores structural properties (product decomposition, order-theoretic behavior, Noetherian factorization). It serves as the algebraic precursor to the topological and sheaf-theoretic development in `Topology.lean` and `StructureSheaf`.
