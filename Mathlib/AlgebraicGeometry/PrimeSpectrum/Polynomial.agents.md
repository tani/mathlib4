### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `isNilpotent_tensor_residueField_iff` | `(f : A) (I : Ideal R) [I.IsPrime] → IsNilpotent (algebraMap A (A ⊗[R] I.ResidueField) f) ↔ ∀ i < finrank R A, (Algebra.lmul R A f).charpoly.coeff i ∈ I` | Relates nilpotence of multiplication by `f` over the residue field tensor product to membership of non-leading coefficients of the characteristic polynomial in the prime ideal `I`. Central to understanding how nilpotence descends to base change. |
| `mem_image_comap_zeroLocus_sdiff` | `(f : A) (s : Set A) (x) → x ∈ comap (algebraMap R A) '' (zeroLocus s \ zeroLocus {f}) ↔ ¬ IsNilpotent (algebraMap A ((A ⧸ Ideal.span s) ⊗[R] x.asIdeal.ResidueField) f)` | Characterizes when a prime `𝔭 ∈ Spec R` lies in the image of a constructible subset `Z(I) ∩ D(f)` via the structure map `Spec A → Spec R`, using nilpotence over residue field extensions. |
| `mem_image_comap_basicOpen` | `(f : A) (x) → x ∈ comap (algebraMap R A) '' basicOpen f ↔ ¬ IsNilpotent (algebraMap A (A ⊗[R] x.asIdeal.ResidueField) f)` | Special case of above for basic opens `D(f)`. Key for openness proofs. |
| `exists_image_comap_of_finite_of_free` | `(f : A) (s : Set A) [Module.Finite R (A ⧸ Ideal.span s)] [Module.Free R (A ⧸ Ideal.span s)] → ∃ t : Finset R, comap (algebraMap R A) '' (zeroLocus s \ zeroLocus {f}) = (zeroLocus t)ᶜ` | Shows that images of constructible sets under `Spec A → Spec R` are *constructible* (in fact, open and closed in their image) when the quotient is finite free. |
| `Polynomial.mem_image_comap_C_basicOpen` | `(f : R[X]) (x : PrimeSpectrum R) → x ∈ comap C '' basicOpen f ↔ ∃ i, f.coeff i ∉ x.asIdeal` | Concrete description of image of basic open in `Spec R[X]` under `Spec C : Spec R[X] → Spec R`. |
| `Polynomial.image_comap_C_basicOpen` | `comap C '' basicOpen f = (zeroLocus (Set.range f.coeff))ᶜ` | Describes image of basic open as complement of a closed set defined by coefficients. |
| `Polynomial.isOpenMap_comap_C` | `IsOpenMap (comap C)` | Proves that the structure map `Spec R[X] → Spec R` is open. |
| `Polynomial.exists_image_comap_of_monic` | `(f g : R[X]) (hg : g.Monic) → ∃ t : Finset R, comap C '' (zeroLocus {g} \ zeroLocus {f}) = (zeroLocus t)ᶜ` | For monic `g`, the image of `Z(g) ∩ D(f)` is constructible (open in its closure). Uses `AdjoinRoot.powerBasis'`. |
| `MvPolynomial.mem_image_comap_C_basicOpen`, `image_comap_C_basicOpen`, `isOpenMap_comap_C` | Analogues of polynomial versions for multivariate polynomials | Extend openness and constructibility results to `MvPolynomial σ R`. |

#### 2. **Naming Conventions**

- **Prefixes:**
  - `isNilpotent_...`: Properties involving nilpotence.
  - `mem_image_comap_...`: Membership in image of structure map.
  - `image_comap_...`: Explicit description of image sets.
  - `exists_image_comap_...`: Constructibility results (existence of finite sets defining image).
- **Suffixes:**
  - `_iff`: Biconditional characterizations.
  - `_basicOpen`, `_zeroLocus_sdiff`: Refers to specific subsets (`D(f)`, `Z(S) \ Z({f})`).
  - `_of_monic`, `_of_finite_of_free`: Hypothesis-driven naming (e.g., monic polynomial or finite free module).
- **Function names:**
  - `comap`, `basicOpen`, `zeroLocus`, `algebraMap`, `ResidueField`, `tensorProduct`, `charpoly`, `coeff`, `coeff_map`, `scalarRTensorAlgEquiv`, `polyEquivTensor`, `AdjoinRoot.powerBasis'`, `Ideal.Quotient.mk`, `Ideal.span`, `finrank`.

#### 3. **Tactic Stack**

- **Core automation:**
  - `simp`, `simp_rw`, `congr`, `ext`, `rw`
- **Algebraic geometry / module theory:**
  - `rw [Module.finrank_tensorProduct]`, `rw [← IsNilpotent.map_iff ...]`, `rw [LinearMap.isNilpotent_iff_charpoly]`, `rw [← Algebra.baseChange_lmul]`, `rw [LinearMap.charpoly_baseChange]`
- **Ring theory:**
  - `rw [Ideal.span_le]`, `rw [Ideal.mem_sInf]`, `rw [nilradical_eq_sInf]`, `rw [RingHom.mem_ker]`, `rw [Ideal.ker_algebraMap_residueField]`
- **Constructibility / topology:**
  - `apply isOpen_sUnion`, `apply isCompact_iUnion`, `exact (isClosed_zeroLocus _).isOpen_compl`
- **Equivalence manipulation:**
  - `refine Algebra.TensorProduct.congr ?f AlgEquiv.refl`, `refine (e.toAlgHom.toRingHom).comp ...`, `congr!`, `ext`, `ext1`
- **Classical reasoning:**
  - `classical`, ` Classical.not_imp`, ` Classical.not_forall`

#### 4. **Proof Logic**

- **General pattern:**
  - Reduce nilpotence over residue field tensor product to coefficient conditions via characteristic polynomial (`isNilpotent_tensor_residueField_iff`).
  - Use equivalences (`polyEquivTensor`, `scalarRTensorAlgEquiv`, `Algebra.TensorProduct.comm`) to move between tensor products and polynomial rings.
  - Translate membership in image of `Spec A → Spec R` into non-nilpotence over residue fields (`mem_image_comap_basicOpen`, `mem_image_comap_zeroLocus_sdiff`).
  - For constructibility: express image as complement of zero locus of finite set of coefficients (via `charpoly.coeff` or `f.coeff`), using finite freeness to bound degree.
  - For openness: cover open sets by basic opens, use `image_comap_C_basicOpen` to write image as complement of closed set, then apply `isOpen_sUnion`.

- **Inductive/constructive steps:**
  - Often split on `i < natDegree` or `i = natDegree` to handle leading vs non-leading coefficients.
  - Use `eq_or_ne`, `lt_or_gt_of_ne`, `or_else`-style case splits to handle edge cases.
  - Use `Subsingleton.elim` when rings collapse (e.g., zero ring).

#### 5. **Imports**

| Module | Role |
|--------|------|
| `Mathlib.AlgebraicGeometry.PrimeSpectrum.Basic` | Core definitions: `Spec`, `comap`, `basicOpen`, `zeroLocus`, `PrimeSpectrum` topology. |
| `Mathlib.LinearAlgebra.Charpoly.BaseChange` | Base change behavior of characteristic polynomials (`charpoly_baseChange`). |
| `Mathlib.LinearAlgebra.Eigenspace.Zero` | Tools for nilpotence and characteristic polynomials of linear maps. |
| `Mathlib.RingTheory.AdjoinRoot` | Construction of splitting algebras; used for monic polynomials (`AdjoinRoot.powerBasis'`). |
| `Mathlib.RingTheory.LocalRing.ResidueField.Ideal` | Residue fields of prime ideals (`I.ResidueField`), algebra maps to them. |
| `Mathlib.RingTheory.TensorProduct.MvPolynomial` | Equivalence `MvPolynomial σ R ⊗ R' ≃ MvPolynomial σ R'` (`scalarRTensorAlgEquiv`). |

--- 

This metadata reflects a formalization focused on **constructibility and openness of structure maps** in relative spectra, leveraging **characteristic polynomials**, **residue field base change**, and **finite freeness** to bridge algebraic and topological properties.