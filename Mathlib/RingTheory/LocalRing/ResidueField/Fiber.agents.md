**Technical Brief: `Fiber.lean` — Fiber of a Ring Homomorphism at a Prime Ideal**

---

### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Ideal.Fiber` | `p.Fiber S := κ(p) ⊗[R] S` | Defines the *fiber ring* over a prime ideal `p ⊆ R` in an `R`-algebra `S`, where `κ(p) = Frac(R/p)` is the residue field. |
| `Ideal.ResidueField.exists_smul_eq_tmul_one` | `∀ x : S ⊗[R] κ(p), ∃ r ∉ p, ∃ s, r • x = s ⊗ₜ 1` | Technical lemma enabling localization at elements outside `p`; used to reduce tensor expressions. |
| `Ideal.Fiber.exists_smul_eq_one_tmul` | `∀ x : p.Fiber S, ∃ r ∉ p, ∃ s, r • x = 1 ⊗ₜ s` | Variant of above for the fiber ring itself; crucial for proving bijections on spectra. |
| `PrimeSpectrum.preimageEquivFiber` | `comap (algebraMap R S) ⁻¹' {p} ≃ PrimeSpectrum (p.Fiber S)` | Set-theoretic bijection between primes in `S` lying over `p` and primes in the fiber ring. |
| `PrimeSpectrum.preimageOrderIsoFiber` | `comap (algebraMap R S) ⁻¹' {p} ≃o PrimeSpectrum (p.Fiber S)` | Order isomorphism (preserves inclusion) between fibers of prime spectra. |
| `PrimeSpectrum.primesOverOrderIsoFiber` | `p.primesOver S ≃o PrimeSpectrum (p.Fiber S)` | Explicit reformulation for `p.primesOver S`, the type of primes in `S` lying over `p`. |
| `PrimeSpectrum.preimageHomeomorphFiber` | `comap (algebraMap R S) ⁻¹' {p} ≃ₜ PrimeSpectrum (p.Fiber S)` | Topological homeomorphism (i.e., spectral space isomorphism) between the fiber and `Spec(p.Fiber S)`. |
| `IsLocalRing.instance` | `IsLocalRing (κ(p) ⊗[R] S)` under local assumptions | Shows the fiber ring is local when `R`, `S` are local and the map is local — used to control maximal ideals. |

---

### 2. **Naming Conventions**

- **Prefixes**:
  - `Fiber`: for constructions over a fixed prime `p`.
  - `preimage`: for fibers of `PrimeSpectrum S → PrimeSpectrum R`.
  - `residueField_`, `residue_surjective`: related to residue fields and their universal properties.
  - `smul_eq_tmul`: pattern for lemmas about expressing tensors via scalar multiplication.

- **Suffixes**:
  - `_equiv_`: set-theoretic equivalence.
  - `_orderIso_`: order-theoretic (inclusion-preserving) equivalence.
  - `_homeomorph_`: topological homeomorphism.
  - `_tensorProduct_`, `_comm`: for symmetry/commutativity of tensor products.

- **Notable abbreviations**:
  - `p.Fiber S` (not `Ideal.Fiber p S`) — infix style for readability.
  - `p.asIdeal` — coercion from `PrimeSpectrum R` to `Ideal R`.

---

### 3. **Tactic Stack**

| Tactic | Usage Frequency | Purpose |
|--------|-----------------|---------|
| `simp` / `simp only` | Very High | Simplify using algebraic identities, `smul`, `tmul`, `comap`, `algHom` properties. |
| `rw` | High | Rewrite using equivalences, e.g., `← Algebra.smul_def`, `e`, `residueField_comap`. |
| `obtain ⟨…⟩ :=` | High | Extract witnesses from existential lemmas (e.g., `exists_smul_eq_tmul_one`). |
| `ext` | Medium | Extensionality for functions/ideals/primes. |
| `convert` | Medium | Match goals up to definitional equality (e.g., with `Homeomorph.prodUnique`). |
| `have := @PrimeSpectrum.isPrime` | Medium | Temporarily assert primality of kernel (used to apply ideal-theoretic criteria). |
| `ring`, `aesop` | Low | Not used — heavy reliance on algebraic lemmas and manual simplification. |
| `exact`, `refine`, `simpa` | High | Finish proofs with precise arguments, especially after `obtain`. |

---

### 4. **Proof Logic**

The logical flow follows a standard *localization + tensor product* strategy:

1. **Localization Lemma** (`exists_smul_eq_tmul_one`):
   - Use `RingHom.SurjectiveOnStalks.exists_mul_eq_tmul` to get a denominator `r ∉ p`.
   - Lift to residue field via `IsLocalization.mk'_surjective`.
   - Clean up using `simp` with `algebraMap_residueField_eq_zero`, `mem_maximal_iff`, etc.

2. **Bijection on Spectra** (`preimageEquivFiber`):
   - **Forward direction**: Construct a prime in `κ(p) ⊗ S` as the kernel of a map built from:
     - `ResidueField.mapₐ` (induced by inclusion `R → S` and `q ∈ Spec S` over `p`).
     - Universal property of tensor product (`lift`).
   - **Inverse direction**: Pull back along `includeRight : S → κ(p) ⊗ S`.
   - **Inverse laws**: Use `exists_smul_eq_one_tmul` to reduce to checking membership after multiplying by `r ∉ p`.

3. **Order Isomorphism** (`preimageOrderIsoFiber`):
   - Reduce to checking inclusion via `Ideal.comap_mono`.
   - Again use `exists_smul_eq_one_tmul` to handle the reverse direction.

4. **Homeomorphism** (`preimageHomeomorphFiber`):
   - Prove the equivalence is a homeomorphism by showing its inverse is an embedding.
   - Use `IsEmbedding.of_comp_iff`, `Homeomorph.prodUnique`, and `isEmbedding_tensorProductTo_of_surjectiveOnStalks`.
   - Key input: `Ideal.surjectiveOnStalks_residueField` ensures the tensor map is surjective on stalks.

---

### 5. **Imports & Dependencies**

| Module | Role |
|--------|------|
| `Mathlib.RingTheory.Spectrum.Prime.RingHom` | Prime spectrum, `comap`, `map`, `asIdeal`, `PrimeSpectrum` basics. |
| `Mathlib.RingTheory.Spectrum.Prime.TensorProduct` | Tensor product of rings, induced maps on spectra, `tensorProductTo`. |
| `Mathlib.RingTheory.TensorProduct.Quotient` | Quotient–tensor isomorphisms (e.g., `TensorProduct.quotIdealMapEquivTensorQuot`). |
| `Mathlib.Topology.Homeomorph.Lemmas` | General homeomorphism lemmas (e.g., `homeomorphOfRingEquiv`, `prodUnique`). |
| `IsLocalRing`, `IsLocalization`, `NonZeroDivisors` | Local algebra tools: residue fields, localization, maximal ideals. |

---

### 6. **Mermaid Diagrams**

#### **Dependency Graph (Core Theories)**

```mermaid
graph TD
  A[CommRing R, S] --> B[Algebra R S]
  B --> C[PrimeSpectrum R]
  B --> D[PrimeSpectrum S]
  C --> E[comap (algebraMap R S)]
  D --> E
  E --> F[Fiber: p ↦ κ(p) ⊗ S]
  F --> G[PrimeSpectrum (κ(p) ⊗ S)]
  G --> H[Homeomorph / OrderIso]
  F --> I[IsLocalRing (κ(p) ⊗ S)]
  I --> J[MaximalIdeal control]
```

#### **Overview of `Fiber.lean`**

```mermaid
flowchart LR
  subgraph Setup
    R[CommRing R] --> S[CommRing S]
    S --> A[Algebra R S]
    p[Prime p ⊆ R] --> F[Fiber := κ(p) ⊗ S]
  end

  subgraph Technical Lemmas
    L1[exists_smul_eq_tmul_one] --> L2[exists_smul_eq_one_tmul]
  end

  subgraph Equivalences
    L2 --> E1[preimageEquivFiber]
    E1 --> E2[preimageOrderIsoFiber]
    E2 --> E3[primesOverOrderIsoFiber]
  end

  subgraph Topology
    E2 --> H1[preimageHomeomorphFiber]
    H1 --> T[Spec(p.Fiber S) ≃ₜ Fiber]
  end

  style F fill:#ffe4e1,stroke:#333
  style H1 fill:#e6e6fa,stroke:#333
```

---

### 7. **Summary**

This file formalizes the *scheme-theoretic fiber* of a morphism of affine schemes `Spec S → Spec R` over a point `p ∈ Spec R`. It shows:

- The fiber is *canonically* homeomorphic to `Spec(κ(p) ⊗_R S)`.
- The correspondence preserves inclusion of primes (order isomorphism).
- Under mild hypotheses (locality), the fiber ring is itself local.

This is foundational for fiber products in algebraic geometry and appears in constructions like base change, flatness criteria, and dimension theory.

--- 

*End of Technical Brief.*
