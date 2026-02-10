### Technical Metadata Brief: Kernel Pairs in Lean 4 (CategoryTheory)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsKernelPair` | `abbrev IsKernelPair := IsPullback a b f f` | Expresses that `(a, b)` is a kernel pair of `f`: i.e., the square `R ⇉ X → Y` is a pullback and `a ≫ f = b ≫ f`. |
| `lift` | `S ⟶ R` | Universal property: given `p, q : S ⟶ X` with `p ≫ f = q ≫ f`, factors uniquely through the kernel pair. |
| `lift_fst`, `lift_snd` | `k.lift p q w ≫ a = p`, `k.lift p q w ≫ b = q` | Projection properties of the lift. |
| `lift'` | `{ t // t ≫ a = p ∧ t ≫ b = q }` | Dependent version of `lift`, packaging the factorization with its properties. |
| `cancel_right` | `(a ≫ f₁ = b ≫ f₁) → IsKernelPair (f₁ ≫ f₂) a b → IsKernelPair f₁ a b` | If `(a, b)` is a kernel pair of `f₁ ≫ f₂` and commutes with `f₁`, then it's already a kernel pair of `f₁`. |
| `cancel_right_of_mono` | `[Mono f₂] → IsKernelPair (f₁ ≫ f₂) a b → IsKernelPair f₁ a b` | Special case of `cancel_right` using monomorphism cancellation. |
| `comp_of_mono` | `[Mono f₂] → IsKernelPair f₁ a b → IsKernelPair (f₁ ≫ f₂) a b` | Converse: extending kernel pair along a monomorphism. |
| `toCoequalizer` | `[RegularEpi f] → IsColimit (Cofork.ofπ f k.w)` | If `f` is a regular epimorphism and `(a, b)` is its kernel pair, then `f` coequalizes `a, b`. |
| `pullback` | `IsKernelPair g a₁ a₂ → IsKernelPair (pullback.fst f g) (pullback.map … a₁) (pullback.map … a₂)` | Stability of kernel pairs under pullback. |
| `mono_of_isIso_fst` | `[IsIso a] → Mono f` | If one leg of a kernel pair is iso, then `f` is mono. |
| `isIso_of_mono` | `[Mono f] → IsIso a` | If `f` is mono, then the legs of its kernel pair are iso. |
| `of_isIso_of_mono` | `[IsIso a] [Mono f] → IsKernelPair f a a` | Characterization when both legs are iso and `f` mono. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`: e.g., `isIso`, `isLimit`, `isPullback`, `IsKernelPair` — typeclass-like predicates.
  - `lift`, `lift'`: universal morphisms from universal properties.
  - `cancel_`, `comp_`: indicate structural manipulation of factorizations.
  - `of_`: constructing data from assumptions (e.g., `of_isIso_of_mono`).
- **Suffixes**:
  - `_fst`, `_snd`: projections from pullback cones.
  - `_assoc`: for associativity rewrites (e.g., `w_assoc`, `lift_fst_assoc`).
  - `_ext`: extensionality lemmas (e.g., `equalizer_ext`, `hom_ext`).
- **Reassoc attribute**: `@[reassoc (attr := simp)]` used on `lift_fst`, `lift_snd` — indicates they interact well with `reassoc` simplifier.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` / `simp_rw` | Simplifying pullback conditions, identities, and `w` assumptions. |
| `rw` / `apply` / `exact` | Rewriting using `w`, `assoc`, `id_comp`, etc. |
| `ext` | Extensionality for pullback cones / morphisms. |
| `apply ... hom_ext` | Hom-extensionality for limits/colimits. |
| `apply ... equalizer_ext` | Equalizer extensionality (used in `cancel_right`). |
| `cases` / `obtain` / `refine` | Destructuring limits/colimits data. |
| `symm` | Flipping equalities (noted as a porting note). |
| `infer_instance` | Instantiating typeclass instances (e.g., `IsIso`). |
| `#adaptation_note` | Manual adaptation hints (e.g., for Lean version changes). |

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - Most proofs follow a *limit/colimit universal property* pattern:
    1. Construct a cone/cocone.
    2. Use `isLimit.lift` / `isColimit.desc` to get the mediating morphism.
    3. Prove uniqueness via `hom_ext` or `equalizer_ext`.
  - For kernel pair equivalences (`cancel_right`, `comp_of_mono`), the key is:
    - Showing the square commutes (`w`).
    - Proving the pullback condition via `isLimitAux'` or `isLimitAux`.
  - For `toCoequalizer`, the logic is:
    - Use regular epi property of `f` to get a coequalizer.
    - Show `f` coequalizes `a, b` via `k.w`.
    - Use lift to construct the coequalizer morphism and verify uniqueness.

- **Inductive/structural reasoning**:
  - Heavy use of *pullback universal property* and *equalizer extensionality*.
  - No explicit induction; reasoning is categorical (via universal properties).

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.CategoryTheory.Limits.Shapes.Equalizers` | For equalizer extensionality (`equalizer_ext`) and related lemmas. |
| `Mathlib.CategoryTheory.Limits.Shapes.Pullback.CommSq` | For `IsPullback`, pullback cones, and commutative squares. |
| `Mathlib.CategoryTheory.Limits.Shapes.RegularMono` | For regular monos/epis, used in `toCoequalizer`. |

**Scope**: This module lies in the *limits* and *factorization systems* area of category theory, focusing on kernel pairs as pullbacks and their interaction with monos, isos, and coequalizers.

---

Let me know if you'd like a diagrammatic summary or a formalization roadmap for internal equivalence relations (mentioned in TODO).