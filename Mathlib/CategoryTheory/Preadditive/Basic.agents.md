### Technical Metadata Brief: `CategoryTheory.Preadditive` (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `Preadditive` | Class: A category `C` is *preadditive* if each hom-set `P ⟶ Q` carries an `AddCommGroup` structure, and composition is bilinear (`add_comp`, `comp_add`). |
| `leftComp R f` | `g ↦ f ≫ g` is an `AddMonoidHom` from `Q ⟶ R` to `P ⟶ R`. |
| `rightComp P g` | `f ↦ f ≫ g` is an `AddMonoidHom` from `P ⟶ Q` to `P ⟶ R`. |
| `compHom` | Bilinear group homomorphism: `(P ⟶ Q) →+ (Q ⟶ R) →+ (P ⟶ R)`. |
| `sub_comp`, `comp_sub`, `neg_comp`, `comp_neg`, `neg_comp_neg` | Simplification rules for composition with subtraction/negation (e.g., `(-f) ≫ (-g) = f ≫ g`). |
| `nsmul_comp`, `comp_nsmul`, `zsmul_comp`, `comp_zsmul` | Compatibility of scalar multiplication (ℕ, ℤ) with composition. |
| `comp_sum`, `sum_comp` | Composition distributes over finite sums. |
| `mono_of_cancel_zero`, `mono_iff_cancel_zero` | Characterization of monos via kernel-like cancellation: `f` mono ⇔ `g ≫ f = 0 ⇒ g = 0`. |
| `epi_of_cancel_zero`, `epi_iff_cancel_zero` | Dual characterization for epimorphisms. |
| `mono_of_kernel_zero`, `epi_of_cokernel_zero` | If kernel/cokernel morphism is zero, then `f` is mono/epi. |
| `forkOfKernelFork`, `kernelForkOfFork` | Equivalence between kernels of `f - g` and equalizers of `f, g`. |
| `isLimitForkOfKernelFork`, `isLimitKernelForkOfFork` | Prove that kernel of `f - g` ⇔ equalizer of `f, g`. |
| `hasEqualizer_of_hasKernel`, `hasKernel_of_hasEqualizer` | In preadditive categories, existence of kernels for `f - g` ⇔ existence of equalizers for `f, g`. |
| `hasEqualizers_of_hasKernels`, `hasCoequalizers_of_hasCokernels` | If all kernels (resp. cokernels) exist, then all equalizers (resp. coequalizers) exist. |
| `instance Semiring (End X)`, `Ring (End X)` | Endomorphism ring structure on `End X = X ⟶ X`. |
| `instance Module (End Y) (X ⟶ Y)` | Right module structure over endomorphism ring. |
| `instance SMul (Units ℤ) (X ≅ Y)`, `Neg (X ≅ Y)` | Action of units of ℤ (i.e., ±1) and negation on isomorphisms. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `leftComp`, `rightComp`: Composition as a homomorphism in left/right argument.
  - `mono_of_`, `epi_of_`: Implication lemmas for mono/epi via cancellation.
  - `hasEqualizer_of_hasKernel`, `hasCoequalizer_of_hasCokernel`: Implication lemmas linking limits/colimits.
  - `forkOfKernelFork`, `kernelForkOfFork`: Constructions between related diagram cones.
- **Suffixes**:
  - `_comp`, `_sub`, `_neg`, `_sum`: Composition with arithmetic operations.
  - `_iff_cancel_zero`: Biconditional characterizations.
  - `_zero`: Conditions involving zero morphisms or zero objects.
- **`isLimit_`, `isColimit_`**: Proofs that a constructed cone/cocone is universal.

---

#### **3. Tactic Stack**

- **`aesop_cat`**: Used in class proofs (`add_comp`, `comp_add`) to automate category-theoretic reasoning.
- **`simp` / `simp only`**: Heavily used for simplifying compositions, negations, sums, and zero morphism interactions.
- **`rwa`**: Rewriting with assumptions and applying `zero_of_*`, `cancel_*`, `sub_eq_zero`, etc.
- **`apply`, `exact`, `intro`**: Standard intro/apply for constructing morphisms and proving equalities.
- **`dsimp`, `unfold`**: Used to simplify definitions like `End`, `mul`, `zero`.
- **`aesop_cat`**: For category-specific simplification and proof search.
- **`apply Fork.IsLimit.hom_ext` / `Cofork.IsColimit.hom_ext`**: Uniqueness arguments for universal cones.

---

#### **4. Proof Logic**

- **Induction / Case Analysis**: Not common; most proofs are direct algebraic manipulations using abelian group structure.
- **Standard Pattern**:
  1. **Unfold definitions** (e.g., `End`, `mono`, `zero`).
  2. **Rewrite using group homomorphism properties** (`map_sub`, `map_neg`, `map_sum`).
  3. **Apply cancellation lemmas** (`cancel_mono`, `cancel_epi`, `neg_inj`).
  4. **Use universal properties** (e.g., `kernel.lift_ι`, `cokernel.π_desc`) to reduce to known equalities.
- **Equivalence Proofs**:
  - For `mono_iff_cancel_zero`, prove both directions:
    - `Mono f → ...`: Use `zero_of_comp_mono`.
    - `... → Mono f`: Construct right-cancellation using `sub_eq_zero`.
- **Limit/Colimit Constructions**:
  - Use `HasLimit.mk` / `HasColimit.mk` with explicit cones.
  - Prove universality via `IsLimit.mk'` / `IsColimit.mk'`, using `lift`/`desc` from existing limits.

---

#### **5. Imports & Scope**

| Import | Purpose |
|--------|---------|
| `Mathlib.Algebra.BigOperators.Group.Finset` | Finite sums over abelian groups (`sum_comp`, `comp_sum`). |
| `Mathlib.Algebra.Group.Hom.Defs` | `AddMonoidHom`, `mk'`, `map_*` lemmas. |
| `Mathlib.Algebra.GroupWithZero.Action.Units` | Action of `Units ℤ` on isomorphisms. |
| `Mathlib.Algebra.Module.End` | Endomorphism ring/module structure. |
| `Mathlib.CategoryTheory.Endomorphism` | Definition of `End X`. |
| `Mathlib.CategoryTheory.Limits.Shapes.Kernels` | Kernels, equalizers, cokernels, coequalizers. |

**Scope**: This file formalizes the foundational theory of *preadditive categories* — categories enriched over `Ab`, i.e., hom-sets are abelian groups with bilinear composition. It connects additive structure with categorical limits/colimits (equalizers ↔ kernels of differences), and builds algebraic structures on endomorphisms and hom-sets.

---

Let me know if you'd like a dependency graph or a summary of how this fits into the broader `CategoryTheory` hierarchy (e.g., relation to `Additive`, `Abelian` categories).