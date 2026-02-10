### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `PrimeSpectrum.tensorProductTo` | `PrimeSpectrum (S ⊗[R] T) → PrimeSpectrum S × PrimeSpectrum T` | Canonical map induced by comaps of structure maps of the tensor product algebra. |
| `PrimeSpectrum.continuous_tensorProductTo` | `Continuous (tensorProductTo R S T)` | Proves continuity of the canonical map. |
| `PrimeSpectrum.isEmbedding_tensorProductTo_of_surjectiveOnStalks_aux` | `(p₁ p₂ : PrimeSpectrum (S ⊗[R] T)) → (tensorProductTo p₁ = tensorProductTo p₂) → p₁ ≤ p₂` | Key technical lemma: equality of images under `tensorProductTo` implies ordering; used to prove injectivity + embedding. |
| `PrimeSpectrum.isEmbedding_tensorProductTo_of_surjectiveOnStalks` | `IsEmbedding (tensorProductTo R S T)` | Main result: under surjectivity-on-stalks hypothesis, the canonical map is a topological embedding. |
| `PrimeSpectrum.embedding_tensorProductTo_of_surjectiveOnStalks` | *Deprecated alias* | Alias for the main theorem; deprecated as of 2024-10-26. |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `tensorProductTo`: indicates the canonical map from the spectrum of a tensor product.
  - `isEmbedding_...`: indicates a proof that a map is an *embedding* (i.e., a homeomorphism onto its image).
  - `continuous_...`: indicates continuity of a map on spectra.
- **Suffixes**:
  - `_of_surjectiveOnStalks`: condition on the algebra map `R → T`.
  - `_aux`: auxiliary lemmas used in the main proof.
- **Variable naming**:
  - `hRT`: hypothesis name for `algebraMap R T`.SurjectiveOnStalks.
  - `x`, `p₁`, `p₂`: generic elements of `PrimeSpectrum`.
  - `f`, `t`, `r`, `a`: elements used in the `SurjectiveOnStalks` witness.

#### 3. **Tactic Stack**

- **Core tactics**:
  - `intros`, `by_contra`, `obtain`, `rw`, `rwa`, `replace`, `exact`, `apply`, `refine`, `rintro`.
- **Algebraic geometry / ideal reasoning**:
  - `Ideal.mul_mem_left`, `Ideal.mul_mem_right`, `Ideal.primeCompl.mul_mem`, `primeCompl.mul_mem_iff_mem_or_mem`.
- **Ring / algebra**:
  - `algebraMap`, `comap`, `TensorProduct.tmul_mul_tmul`, `mul_one`, `one_mul`.
- **Topology**:
  - `continuous_tensorProductTo`, `isOpen_iff_forall_mem_open`, `basicOpen`, `isBasis_basic_opens.le_iff`.
- **Automation / simplification**:
  - `aesop` is *not* used here — proof is highly manual and ideal-theoretic.
  - `ring` / `simp` are *not* heavily used; relies on explicit rewriting.

#### 4. **Proof Logic**

- **Structure**:
  1. **Main theorem** (`isEmbedding_tensorProductTo_of_surjectiveOnStalks`) splits into two parts:
     - Continuity (already handled by `continuous_tensorProductTo`).
     - Induced topology equality: show the topology on `Spec(S ⊗ T)` is the *pullback* of the product topology.
  2. To prove injectivity + embedding:
     - Use `isEmbedding_tensorProductTo_of_surjectiveOnStalks_aux` to show `p₁ = p₂` when their images agree (via antisymmetry of `≤` on primes).
  3. For the topology part:
     - Use basis criterion: show preimage of basic opens in product topology are basic opens.
     - Apply `SurjectiveOnStalks` hypothesis to lift elements `f ∈ S` to `a ⊗ t` in the tensor product.
     - Use primality and ideal membership properties to relate openness conditions.

- **Key logical flow**:
  - Assume `tensorProductTo p₁ = tensorProductTo p₂`.
  - Show `p₁ ≤ p₂` and `p₂ ≤ p₁` using the auxiliary lemma.
  - For the topology: use basis of opens `basicOpen(f)` and express them via preimages of `basicOpen(a) × basicOpen(t)` using the witness from `SurjectiveOnStalks`.

#### 5. **Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.RingTheory.SurjectiveOnStalks` | Provides `SurjectiveOnStalks` and `exists_mul_eq_tmul`, crucial for lifting elements. |
| `Mathlib.AlgebraicGeometry.PrimeSpectrum.Basic` | Defines `PrimeSpectrum`, `comap`, `basicOpen`, continuity, and basic topology. |

---

This module sits at the intersection of **commutative algebra** and **algebraic geometry**, formalizing a foundational result about how spectra behave under tensor products when the base change is “stalkwise surjective”. The proof is highly constructive in nature, leveraging ideal-theoretic properties and the structure of the tensor product.