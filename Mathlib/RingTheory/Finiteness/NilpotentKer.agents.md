**Technical Brief: `NilpotentKer.lean`**

---

### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Module.finite_of_surjective_of_ker_le_nilradical` | `{R S T : Type*} [CommRing R] [CommRing S] [CommRing T] [Algebra R S] [Algebra R T] [Module.Finite R T] → (f : S →ₐ[R] T) → Function.Surjective f → RingHom.ker f ≤ nilradical S → (RingHom.ker f).FG → Module.Finite R S` | Main theorem: descent of finite module structure along surjective algebra maps whose kernel is finitely generated and contained in the nilradical. |
| `Ideal.quotientKerAlgEquivOfSurjective` | `hf : Function.Surjective f → S ⧸ RingHom.ker f ≃ₐ[R] T` | Algebra isomorphism induced by first isomorphism theorem for algebras (used to transfer finiteness). |
| `Ideal.pow_le_pow_right` | `I ^ n ≤ I ^ m` if `n ≥ m` | Used to construct factor maps between successive quotients. |
| `Ideal.Quotient.factorₐ` | `I ≤ J → S ⧸ J →ₐ[S] S ⧸ I` | Factor map between quotient algebras when one ideal contains another. |
| `Submodule.liftQ` | Constructs a linear map from a quotient using universal property. |
| `TensorProduct.quotTensorEquivQuotSMul` | `(S ⧸ I) ⊗[S] M ≅ (S ⧸ I) ⊗[S] M` (used to relate tensor with quotient and submodule). |

---

### 2. **Naming Conventions**

- **Prefixes**:
  - `is_`, `fg_`, `finite_`, `nilradical_`, `quotient_`, `pow_`, `factor_`, `liftQ`, `quotTensorEquivQuotSMul`
- **Suffixes**:
  - `_surjective`, `_injective`, `_le_nilradical`, `_FG`, `_of_fg`, `_of_surjective`
- **Pattern**:
  - `Module.Finite.fg_top`, `Submodule.fg_of_fg_map_of_fg_inf_ker`, `Module.Finite.trans` — indicate structural lemmas about finite modules.
  - `Ideal.*` — ideal-theoretic operations and properties.
  - `AlgEquiv.*`, `LinearMap.*`, `TensorProduct.*` — categorical constructions.

---

### 3. **Tactic Stack**

- `intro`, `induction`, `rw`, `refine`, `convert`, `simpa`, `suffices`, `have`, `let`, `obtain`, `infer_instance`, `apply`, `exact`, ` rfl`, `simp_rw`, `aesop`, `ring`, `linarith`

**Most frequent tactics**:
- `rw`, `refine`, `have`, `simpa`, `induction`, `convert`, `simp`

---

### 4. **Proof Logic**

The proof proceeds by **induction on the nilpotency index** of the kernel ideal $ I = \ker f $:

1. **Reduction step**: Use surjectivity and finite generation of $ I $ to deduce $ I $ is nilpotent: $ I^n = 0 $ for some $ n $.
2. **Base case**: $ S / I^0 = S / 1 = 0 $, trivially finite.
3. **Inductive step**: Consider the short exact sequence:
   $$
   0 \to I^n / I^{n+1} \to S / I^{n+1} \to S / I^n \to 0
   $$
   - Show $ S / I^n $ is finite by induction hypothesis.
   - Show $ I^n / I^{n+1} $ is finite over $ R $ via isomorphism $ (S / I) \otimes_S I^n \cong I^n / I^{n+1} $, using finite generation of $ I $ and finite generation of $ S / I $ over $ R $.
   - Apply `Submodule.fg_of_fg_map_of_fg_inf_ker` (a finite module version of the "two-out-of-three" property for short exact sequences).
4. **Final step**: Use the isomorphism $ S / I^n \cong S $ when $ I^n = 0 $ to conclude $ S $ is finite over $ R $.

---

### 5. **Imports**

| Module | Purpose |
|--------|---------|
| `Mathlib.LinearAlgebra.TensorProduct.Quotient` | Tensor product with quotients, quotient tensor equivalence. |
| `Mathlib.RingTheory.Finiteness.Subalgebra` | Finiteness of algebras and subalgebras. |
| `Mathlib.RingTheory.Ideal.Quotient.Operations` | Quotient ring/ideal operations, factor maps. |
| `Mathlib.RingTheory.Noetherian.Nilpotent` | Nilpotent ideals, nilradical, FG ideals ⇒ nilpotent. |
| `Mathlib.RingTheory.TensorProduct.Finite` | Tensor products preserve finite modules. |

---

### 6. **Mermaid Diagrams**

#### **Dependency Graph (Theoretical Scope)**

```mermaid
graph TD
  A[Module.Finite R T] --> B[Algebra R S]
  A --> C[Algebra R T]
  D[RingHom.f : S →ₐ[R] T] -->|surjective| A
  D -->|ker f ≤ nilradical S| E[Nilradical S]
  D -->|ker f FG| F[FG Ideal]
  F -->|isNilpotent_iff_le_nilradical| G[I^n = 0]
  G --> H[Quotient S ⧸ I^n ≅ S]
  H --> A
  subgraph Theory
    B -- "TensorProduct.Quotient" --> I[Tensor with Quotient]
    B -- "Ideal.Quotient.Operations" --> J[Factor Maps]
    B -- "Noetherian.Nilpotent" --> K[Nilpotence]
    B -- "Finiteness.Subalgebra" --> L[Finite Algebras]
  end
```

#### **Overview of File Structure**

```mermaid
flowchart LR
  A[NilpotentKer.lean] --> B[Main Lemma]
  B --> C[Reduction to I^n = 0]
  C --> D[Induction on n]
  D --> E[Base case: I^0 = 1]
  D --> F[Inductive step: SES 0 → I^n/I^{n+1} → S/I^{n+1} → S/I^n → 0]
  F --> G[Show I^n/I^{n+1} finite via tensor]
  F --> H[Apply two-out-of-three]
  G --> I[TensorProduct.quotTensorEquivQuotSMul]
  H --> J[Module.Finite.fg_top, fg_map, fg_inf_ker]
  I --> K[FG of I^n via hf₃]
```

---

### 7. **Summary**

This file formalizes a key *descent* result: if an algebra $ S $ over $ R $ maps surjectively onto a finite $ R $-algebra $ T $, and the kernel is a **finitely generated nilpotent ideal**, then $ S $ itself is finite over $ R $. The proof leverages:
- Nilpotence of finitely generated ideals in the nilradical,
- Induction on the nilpotency index,
- Tensor product techniques to control the graded pieces $ I^n / I^{n+1} $,
- Exact sequence arguments for finite generation.

It fits into the broader theory of *finite module descent* and is foundational for results in deformation theory, local algebra, and noncommutative localization.
