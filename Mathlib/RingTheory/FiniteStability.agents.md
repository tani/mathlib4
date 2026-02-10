### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `baseChangeAux_surj` | `{σ : Type*} {f : MvPolynomial σ R →ₐ[R] A} → Function.Surjective f → Function.Surjective (TensorProduct.map (AlgHom.id R B) f)` | Shows that surjectivity of an algebra map is preserved under base change via tensor product. |
| `baseChange` (instance) | `[FiniteType R A] → FiniteType B (B ⊗[R] A)` | Proves stability of `FiniteType` under base change: if `A` is finitely typed over `R`, then `B ⊗[R] A` is finitely typed over `B`. |
| `baseChange` (instance, for `FinitePresentation`) | `[FinitePresentation R A] → FinitePresentation B (B ⊗[R] A)` | Proves stability of `FinitePresentation` under base change: if `A` is finitely presented over `R`, then `B ⊗[R] A` is finitely presented over `B`. |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `baseChange`: Indicates the core operation — base change (i.e., tensoring along an algebra map `R → B`).
  - `aux`: Used for auxiliary lemmas (`baseChangeAux_surj`).
- **Suffixes**:
  - `_surj`: Denotes a lemma about surjectivity.
  - `_fg`: Used in context of finite generation (`Ideal.FG`, `Ideal.fg_ker_comp`).
- **Structure**:
  - `Algebra.TensorProduct.map (AlgHom.id B B) f`: Standard pattern for extending algebra maps along tensor product.
  - `AlgHom.comp g (MvPolynomial.algebraTensorAlgEquiv ...).symm.toAlgHom`: Standard way to transport maps across the canonical equivalence `B ⊗[R] MvPolynomial σ R ≅ MvPolynomial σ B`.

#### 3. **Tactic Stack**

- **Core tactics**:
  - `rw`: Rewriting using equivalences and definitions (e.g., `iff_quotient_mvPolynomial''`, `hker_eq`).
  - `obtain ⟨n, f, hf⟩`: Destructuring existential quantifiers.
  - `let g := ...`: Introducing intermediate definitions.
  - `have h : ..., exact ...`: Building intermediate facts.
  - `simp_all`, `simpa`: Simplification and discharge using hypotheses.
  - `refine ⟨..., ?_⟩`: Constructing structured proofs (e.g., for finite presentation).
  - `exact`, `apply`: Direct proof steps.
  - `ring`, `aesop`: Likely used implicitly (not visible in snippet but standard in such contexts).
  - `simp only [RingHom.ker_equiv]`: Fine-grained simplification.

#### 4. **Proof Logic**

- **For `FiniteType`**:
  1. Use characterization of `FiniteType` via surjection from `MvPolynomial (Fin n) R → A`.
  2. Apply tensor product to get a map `B ⊗[R] MvPolynomial (Fin n) R → B ⊗[R] A`.
  3. Show this map is surjective using `baseChangeAux_surj`.
  4. Use the equivalence `B ⊗[R] MvPolynomial (Fin n) R ≅ MvPolynomial (Fin n) B` to get a surjection from a polynomial algebra over `B`.

- **For `FinitePresentation`**:
  1. Start with presentation `MvPolynomial (Fin n) R → A` with surjective map `f` and finitely generated kernel.
  2. Tensor to get `g`, show surjectivity as before.
  3. Identify `ker(g)` with `Ideal.map includeRight (ker(f))` using `TensorProduct.lTensor_ker`.
  4. Use stability of finite generation under base change (`Ideal.FG.map`) to conclude `ker(g)` is finitely generated.
  5. Transport along the equivalence to get a presentation over `B`.

#### 5. **Imports & Scope**

- **Primary Dependencies**:
  - `Mathlib.LinearAlgebra.TensorProduct.RightExactness`: Provides `TensorProduct.map_surjective`, `lTensor_ker`.
  - `Mathlib.RingTheory.FinitePresentation`: Defines `FiniteType`, `FinitePresentation`.
  - `Mathlib.RingTheory.TensorProduct.MvPolynomial`: Contains `MvPolynomial.algebraTensorAlgEquiv`, key equivalence for moving scalars.

- **Scope**:
  - `open scoped TensorProduct`: Enables notation like `⊗[R]`.
  - Universe polymorphism over `w₁, w₂, w₃` for rings `R`, `A`, `B`.

---

This module formalizes a foundational stability result in commutative algebra: finiteness conditions (finite type, finite presentation) are preserved under base change via tensor product. It leverages the equivalence between polynomial algebras and tensor products with `MvPolynomial`, and uses right-exactness properties of the tensor product.