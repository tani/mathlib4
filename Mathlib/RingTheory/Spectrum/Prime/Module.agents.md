**Technical Brief: `Module.lean` — Subsets of Prime Spectra Related to Modules**

---

### 1. **Key Definitions & Theorems**

| Name | Type / Statement | Purpose |
|------|------------------|---------|
| `Module.support R M` | `PrimeSpectrum R → Prop` (implicitly via `Ideal R → Prop`) | Support of an $R$-module $M$: the set of primes $\mathfrak{p}$ where $M_{\mathfrak{p}} \ne 0$. Defined via `mem_support_iff'`: $\mathfrak{p} \in \mathrm{Supp}(M) \iff M_{\mathfrak{p}} \ne 0$. |
| `LocalizedModule.subsingleton_iff_disjoint` | `Subsingleton (LocalizedModule (.powers f) M) ↔ Disjoint (D(f)) (Supp M)` | Characterizes when localization at $f$ kills $M$: $M[1/f] = 0$ iff $D(f) \cap \mathrm{Supp}(M) = \emptyset$. |
| `Module.isClosed_support` | `[Module.Finite R M] ⇒ IsClosed (Supp M)` | For finitely generated $M$, support is Zariski-closed (as $V(\mathrm{Ann}(M))$). |
| `Module.support_subset_preimage_comap` | `[IsScalarTower R A M] ⇒ Supp_A(M) ⊆ comap(algebraMap R A)⁻¹'(Supp_R(M))` | Compatibility of support under base change: support over $A$ maps into support over $R$ via $\mathrm{Spec}(A) \to \mathrm{Spec}(R)$. |
| `IsLocalRing.closedPoint_mem_support` | `[IsLocalRing R] [Nontrivial M] ⇒ closedPoint ∈ Supp M` | In a local ring, the unique closed point (maximal ideal) lies in the support of any nontrivial module. |

---

### 2. **Naming Conventions**

- **Prefixes**:
  - `IsLocalRing.`: for properties of local rings.
  - `Module.`: for module-theoretic lemmas.
  - `LocalizedModule.`: for localization-specific results.
- **Suffixes**:
  - `_iff_`: biconditional characterizations.
  - `_subset_`, `_preimage_`, `_comap_`: set-theoretic inclusion/composition.
- **Functional style**:
  - `mem_support_mono`: monotonicity of support under module maps.
  - `stableUnderSpecialization_`: stability under specialization topology.

---

### 3. **Tactic Stack**

Frequent tactics used in proofs:
- `rw` — rewriting using equivalences/definitions.
- `simp only [...] at hx ⊢` — targeted simplification with `mem_support_iff'`, `Ideal.mem_comap`, etc.
- `apply PrimeSpectrum.isClosed_zeroLocus` — structural application of known closed-set lemmas.
- `obtain ⟨p, hp⟩ := ...` — existential unpacking.
- `exact ...` — final step of proof.
- `intro x hx` — standard element-chasing.

No heavy automation (e.g., `aesop`, `linarith`) — proofs are mostly algebraic and topological reasoning.

---

### 4. **Proof Logic**

- **Structure**: Element-wise or set-theoretic reasoning, often via:
  - Unfolding definitions (`mem_support_iff'`, `support_eq_zeroLocus`, `basicOpen_eq_zeroLocus_compl`).
  - Using lattice-theoretic properties of prime spectrum (e.g., specialization order, closed sets $V(I)$).
- **Typical flow**:
  1. Reduce to ideal/module-theoretic condition (e.g., localization zero ⇔ annihilator contains power of $f$).
  2. Translate via known correspondences: $D(f) = \mathrm{Spec}(R)_f$, $V(I)$ closed sets.
  3. Apply monotonicity or stability lemmas (e.g., `mem_support_mono`, `stableUnderSpecialization_support`).
- **Induction**: Not used here — all results are structural or rely on existing `Mathlib` topology/algebra lemmas.

---

### 5. **Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.RingTheory.Spectrum.Prime.Topology` | Prime spectrum topology: basic opens $D(f)$, closed sets $V(I)$, specialization, quasi-compactness. |
| `Mathlib.RingTheory.Support` | Module support definition, basic properties (e.g., `support_eq_zeroLocus`, `mem_support_iff'`). |

These imports define the ambient framework: the Zariski topology on $\mathrm{Spec}(R)$, module localization, and support theory.

---

### 6. **Mermaid Diagrams**

#### **Dependency Graph (Module.lean)**

```mermaid
graph TD
  A[Module.lean] --> B[Mathlib.RingTheory.Spectrum.Prime.Topology]
  A --> C[Mathlib.RingTheory.Support]

  B --> D[PrimeSpectrum]
  B --> E[BasicOpen D(f)]
  B --> F[ZeroLocus V(I)]
  B --> G[Specialization]

  C --> H[Module.support]
  C --> I[LocalizedModule]
  C --> J[Annihilator]

  A --> K[IsLocalRing]
  A --> L[IsScalarTower]
```

#### **Overview of Theory Flow**

```mermaid
flowchart LR
  R[CommRing R] --> M[AddCommGroup M][Module R M]
  M --> Supp[Module.support R M]
  Supp --> Top[PrimeSpectrum R with Zariski topology]

  f[R] --> Loc[LocalizedModule (.powers f) M]
  Loc --> Disj[Disjoint D(f) Supp M]

  M[F.g. M] --> Closed[IsClosed Supp M]

  A[CommRing A][Algebra R A] --> IsScalarTower --> Preimage[Supp_A M ⊆ comap⁻¹ Supp_R M]
```

---

### 7. **TODO & Future Work**

- **Quasi-compactness of complement of support** for finitely presented modules:  
  `stacks#051B` — likely requires `Module.FinitePresentation`, `IsCompactOpen`, and `isClosed_support` as stepping stone.

---

### 8. **Summary**

This module formalizes foundational relationships between module support and the Zariski topology on $\mathrm{Spec}(R)$. It connects localization ($M[1/f]$), support geometry (closedness, disjointness with basic opens), and base change (compatibility under algebra maps). Proofs rely on precise algebra-topology interplay, using Lean’s `Mathlib` infrastructure for prime spectra and module theory.

--- 

*End of Technical Brief.*
