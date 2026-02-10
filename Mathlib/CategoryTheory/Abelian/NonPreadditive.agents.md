### Technical Metadata Brief: `CategoryTheory.NonPreadditiveAbelian`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `NonPreadditiveAbelian` | A class extending `HasZeroMorphisms`, `NormalMonoCategory`, `NormalEpiCategory`, with existence of zero object, kernels, cokernels, finite products/coproducts. *Not assumed preadditive.* |
| `Abelian.factorThruImage f` | Canonical map `P ⟶ image f`. Instance: `Epi`. If `f` is mono, then it's an isomorphism. |
| `Abelian.factorThruCoimage f` | Canonical map `coimage f ⟶ Q`. Instance: `Mono`. If `f` is epi, then it's an isomorphism. |
| `epiIsCokernelOfKernel` | In `NonPreadditiveAbelian`, every epi is the cokernel of its kernel. |
| `monoIsKernelOfCokernel` | In `NonPreadditiveAbelian`, every mono is the kernel of its cokernel. |
| `r A` | Morphism `A ⟶ cokernel (diag A)` defined as `prod.lift (𝟙 A) 0 ≫ cokernel.π (diag A)`. Instance: `IsIso`. |
| `σ {A}` | Morphism `A ⨯ A ⟶ A`, defined as `cokernel.π (diag A) ≫ inv (r A)`. Interpreted as *subtraction* in module-like categories. |
| `diag_σ` | `diag A ≫ σ = 0`. |
| `lift_σ` | `prod.lift (𝟙 A) 0 ≫ σ = 𝟙 A`. |
| `σ_comp` | **Key identity**: `σ ≫ f = prod.map f f ≫ σ`. Ensures naturality of subtraction. |
| `hasSub`, `hasNeg`, `hasAdd` | Derived instances defining subtraction, negation, and addition on morphisms: <br> `f - g := prod.lift f g ≫ σ` <br> `-f := 0 - f` <br> `f + g := f - -g` |
| `preadditive` | Constructs a `Preadditive C` structure from `NonPreadditiveAbelian C`. Proves that all morphism sets become abelian groups with bilinear composition. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isIso_`, `mono_`, `epi_`: For instances proving categorical properties of maps.
  - `lift_`, `diag_`, `σ_`, `comp_`, `sub_`, `add_`, `neg_`: For identities involving specific constructions.
  - `factorThruImage`, `factorThruCoimage`: Canonical factorizations through image/coimage.
- **Suffixes**:
  - `_of_`: For constructions factoring through universal objects (e.g., `epiIsCokernelOfKernel`, `monoIsKernelOfCokernel`).
  - `_fac`: For factorization lemmas (e.g., `Abelian.image.fac`, `Abelian.coimage.fac`).
  - `_assoc`: For associativity rewrites (e.g., `diag_σ`, `lift_σ`).
- **Special**:
  - `σ`: Greek letter for *subtraction* (analogy to `(a, b) ↦ a - b` in modules).
  - `r`: For *retraction* or *right inverse* (since `r A` is an iso).

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Role |
|--------|------|
| `rw` / `erw` | Rewriting using definitions and lemmas (especially `sub_def`, `add_def`, `σ_comp`, `diag_σ`, `lift_σ`). |
| `simp` / `simp only` | Simplifying using `reassoc` attributes and basic category laws (`zero_comp`, `comp_zero`, `prod.lift_fst`, etc.). |
| `conv` | Structural rewriting (e.g., `congr; rw ...` for lifting equalities into products). |
| `ext` | Extensionality for product morphisms (e.g., proving equality of maps out of `A ⨯ A`). |
| `apply`, `obtain ⟨t, ht⟩` | Using universal properties (limits/colimits): kernel/cokernel lifts, factorizations. |
| `calc` | Chain of equalities (especially in epimono proofs). |
| `cancel_mono`, `cancel_epi` | Cancelling monos/epis from compositions. |
| `asIso`, `isIso_of_mono_of_epi` | Proving isomorphisms via mono + epi. |
| `normalMonoOfMono`, `normalEpiOfEpi` | Leveraging normality assumptions. |

---

#### **4. Proof Logic**

The proof strategy follows a **structured 5-step outline**:

1. **Limit/Colimit Existence & Basic Properties**  
   - Prove existence of equalizers, images, coimages, etc., using only finite (co)products, kernels, cokernels, and normality.
   - Show that `factorThruImage` and `factorThruCoimage` are epi/mono respectively.

2. **Image–Coimage Factorization**  
   - Prove that every mono is the kernel of its cokernel, and every epi is the cokernel of its kernel (`monoIsKernelOfCokernel`, `epiIsCokernelOfKernel`).

3. **Construction of Subtraction**  
   - Define `σ : A ⨯ A ⟶ A` via cokernel of diagonal and inverse of `r A`.  
   - Prove key naturality: `σ_comp`.

4. **Algebraic Identities for Subtraction**  
   - Derive basic identities: `sub_zero`, `sub_self`, `lift_sub_lift`, `neg_neg`, `neg_sub`, etc., using only `σ_comp`, `diag_σ`, `lift_σ`, and universal properties.

5. **Abelian Group + Bilinearity**  
   - Define `+`, `-`, `0` from subtraction.  
   - Prove abelian group axioms (`add_assoc`, `add_comm`, `add_zero`, `neg_add_cancel`, etc.).  
   - Prove bilinearity of composition (`comp_add`, `add_comp`).  
   - Conclude with `preadditive` instance.

**Key Insight**: All algebraic structure is *forced* by the universal properties — no preadditivity assumed.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.CategoryTheory.Limits.Shapes.FiniteProducts` | Binary products, diagonals, lifts. |
| `Mathlib.CategoryTheory.Limits.Shapes.Kernels` | Kernels, cokernels, factorization. |
| `Mathlib.CategoryTheory.Limits.Shapes.NormalMono.Equalizers` | Normal monos, equalizers. |
| `Mathlib.CategoryTheory.Abelian.Images` | Image/coimage definitions (`Abelian.image`, `Abelian.coimage`, `Abelian.factorThruImage`, etc.). |
| `Mathlib.CategoryTheory.Preadditive.Basic` | Preadditive category structure (target of construction). |

---

### Summary

This file demonstrates a deep structural result: **preadditivity is redundant** in the definition of abelian categories. Given only finite (co)products, zero object, kernels/cokernels, and normality of mono/epi, one can * canonically* reconstruct the additive structure on morphisms via a universal "subtraction" map `σ`. The construction is nontrivial, elegant, and fully formalized in Lean 4.

The core innovation is the definition of `σ` and the proof of `σ_comp`, which enables the entire abelian group structure on hom-sets. The proof is heavily reliant on categorical universal properties and normality, with tactics like `rw`, `simp`, and `conv` used extensively to manipulate morphism equations.