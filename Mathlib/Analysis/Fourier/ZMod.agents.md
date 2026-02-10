Here's a structured technical metadata summary extracted from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `auxDFT` | `private noncomputable def auxDFT (Φ : ZMod N → E) (k : ZMod N) : E`<br>Private discrete Fourier transform (unbundled), defined as `∑ j, stdAddChar (-(j * k)) • Φ j`. Used internally to construct `dft`. |
| `dft` | `noncomputable def dft : (ZMod N → E) ≃ₗ[ℂ] (ZMod N → E)`<br>Bundled linear equivalence (Fourier transform), with inverse given explicitly. Notation `𝓕`. |
| `𝓕` | Notation for `dft`. Scoped in `ZMod`. |
| `𝓕⁻` | Notation for inverse Fourier transform (`LinearEquiv.symm dft`). |
| `invDFT_apply` | `𝓕⁻ Ψ k = (N : ℂ)⁻¹ • ∑ j, stdAddChar (j * k) • Ψ j`<br>Explicit formula for inverse DFT. |
| `dft_apply` | `𝓕 Φ k = ∑ j, stdAddChar (-(j * k)) • Φ j`<br>Application of DFT to a function at point `k`. |
| `dft_dft` | `𝓕 (𝓕 Φ) = fun j ↦ (N : ℂ) • Φ (-j)`<br>Fourier inversion formula (discrete case). |
| `dft_comp_neg` | `𝓕 (fun j ↦ Φ (-j)) = fun k ↦ 𝓕 Φ (-k)`<br>Compatibility of DFT with precomposition by negation. |
| `dft_even_iff` | `(𝓕 Φ).Even ↔ Φ.Even`<br>DFT preserves evenness. |
| `dft_odd_iff` | `(𝓕 Φ).Odd ↔ Φ.Odd`<br>DFT preserves oddness. |
| `dft_const_smul`, `dft_smul_const`, `dft_const_mul`, `dft_mul_const` | Lemmas about DFT commuting with scalar multiplication (by elements of rings/modules over `ℂ`). |
| `dft_comp_unitMul` | `𝓕 (fun j ↦ Φ (u.val * j)) k = 𝓕 Φ (u⁻¹.val * k)`<br>Behavior under multiplication by a unit `u ∈ (ZMod N)ˣ`. |
| `fourierTransform_eq_gaussSum_mulShift` | `𝓕 χ k = gaussSum χ (stdAddChar.mulShift (-k))`<br>Fourier transform of a Dirichlet character expressed via Gauss sum and shift. |
| `IsPrimitive.fourierTransform_eq_inv_mul_gaussSum` | `𝓕 χ k = χ⁻¹ (-k) * gaussSum χ stdAddChar`<br>For primitive `χ`, DFT is scalar multiple of inverse character; scalar = Gauss sum. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `auxDFT_`: private helper lemmas (e.g., `auxDFT_neg`, `auxDFT_auxDFT`, `auxDFT_smul`).
  - `dft_`: main DFT lemmas (e.g., `dft_apply`, `dft_def`, `dft_comp_neg`, `dft_even_iff`).
  - `invDFT_`: inverse DFT lemmas (e.g., `invDFT_apply`, `invDFT_def`, `invDFT_apply'`).
  - `fourierTransform_`: Dirichlet character-specific DFT lemmas (e.g., `fourierTransform_eq_gaussSum_mulShift`).
  - `IsPrimitive.`: conditional lemmas assuming primitivity.

- **Suffixes**:
  - `_apply`: function application version of a definition/lemma.
  - `_def`: function definition version (often `funext`-equivalent of `_apply`).
  - `_iff`: biconditional characterizations (e.g., `dft_even_iff`, `dft_odd_iff`).
  - `_mul`, `_smul`, `_const`: indicate interaction with multiplication/scalar multiplication.

- **Notation**:
  - `𝓕` for DFT (`dft`), scoped in `ZMod`.
  - `𝓕⁻` for inverse DFT.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp only [...]` | Simplification with explicit lemmas (especially for sums, `stdAddChar`, `smul`, `neg`, etc.). |
| `ext1`, `ext` | Extensionality for functions. |
| `rw [...]` | Rewriting using equalities (e.g., `mul_comm`, `neg_mul`, `inv_mul_cancel₀`). |
| `simp only [h1, h2, ite_smul, ...]` | Case analysis on `if`-expressions (`ite_*` lemmas). |
| `have h1 (t) : ... := by ...` | Local lemma introduction, often with `split_ifs`, `sum_eq_zero_of_ne_one`, `sum_const`. |
| `exact`, `refine`, `congr` | Proof construction (e.g., `congr 1 with j` for pointwise equality). |
| `ring`, `aesop` | Not present in this file — proofs are mostly manual simplification + algebraic manipulation. |
| `sum_comm`, `sum_smul`, `sum_add_distrib` | Used implicitly via `simp` or explicit `rw`. |

---

### **4. Proof Logic**

- **Structure**:
  - **Private helper lemmas** (`auxDFT_*`) are proven first, establishing basic properties (linearity, inversion, behavior under negation/scalar mult).
  - **Main `dft`** is defined as a `LinearEquiv` using `auxDFT`, with inverse explicitly given.
  - **Lemmas about `dft`** are derived from `auxDFT_*` and properties of `stdAddChar`.
  - **Dirichlet character lemmas** use `fourierTransform_eq_gaussSum_mulShift` and `gaussSum_mulShift_of_isPrimitive`.

- **Common proof patterns**:
  - **Pointwise equality**: Prove `𝓕 Φ₁ = 𝓕 Φ₂` by `ext k; ...`.
  - **Summation manipulation**: Use `sum_comm`, `sum_smul`, `sum_add_distrib`, and `smul_sum`.
  - **Character orthogonality**: `sum_eq_zero_of_ne_one` + `isPrimitive_stdAddChar` for key orthogonality of additive characters.
  - **Inversion**: `dft_dft` proven via double sum and orthogonality of `stdAddChar`.
  - **Even/odd**: Reduce to `dft_comp_neg` and use `dft_dft` to cancel scaling by `N`.

---

### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.Group.EvenFunction` | Definitions of `Even`/`Odd` functions. |
| `Mathlib.Analysis.SpecialFunctions.Complex.CircleAddChar` | `stdAddChar`, additive characters on `ZMod N`. |
| `Mathlib.Analysis.Fourier.FourierTransform` | General Fourier transform (used in `dft_eq_fourier`). |
| `Mathlib.NumberTheory.DirichletCharacter.GaussSum` | Gauss sums, `gaussSum`, `mulShift`, primitivity. |
| `MeasureTheory`, `Finset`, `AddChar`, `ZMod` | Basic infrastructure for integration, finite sums, additive characters. |

---

### **Domain-Specific AI Agent Notes**

- **Target domain**: Discrete Fourier analysis on finite cyclic groups (`ZMod N`), with applications to Dirichlet characters and Gauss sums.
- **Key mathematical objects**: Additive characters (`stdAddChar`), Gauss sums, Dirichlet characters, linear equivalences.
- **Proof style**: Constructive, explicit formulas, heavy use of summation identities and character orthogonality.
- **Scoping**: Notations `𝓕`, `𝓕⁻` scoped in `ZMod`; lemmas often assume `[NeZero N]` to avoid division by zero.

--- 

Let me know if you'd like this exported as JSON or YAML for ingestion into a knowledge base.