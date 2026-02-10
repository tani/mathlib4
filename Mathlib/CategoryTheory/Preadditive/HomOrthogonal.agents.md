Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Hom Orthogonal Families in Categories with Zero Morphisms and Finite Biproducts**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `HomOrthogonal` | `s : ι → C → Prop` | A family `s` is *hom orthogonal* if for all `i ≠ j`, the hom-set `(s i ⟶ s j)` is subsingleton (hence contains at most one morphism, necessarily `0` in a category with zero morphisms). |
| `HomOrthogonal.eq_zero` | `o : HomOrthogonal s → i ≠ j → f : s i ⟶ s j → f = 0` | In a hom-orthogonal family, any morphism between distinct objects is zero. |
| `matrixDecomposition` | `((⨁ f) ⟶ ⨁ g) ≃ ∀ i, Matrix (g⁻¹'{i}) (f⁻¹'{i}) (End (s i))` | Decomposes a morphism between biproducts over a hom-orthogonal family into a block-diagonal matrix of endomorphisms. |
| `matrixDecompositionAddEquiv` | `((⨁ f) ⟶ ⨁ g) ≃+ ∀ i, Matrix (g⁻¹'{i}) (f⁻¹'{i}) (End (s i))` | Refines `matrixDecomposition` to an *additive equivalence* in a preadditive category. |
| `matrixDecomposition_id` | `o.matrixDecomposition (𝟙 _) i = 1` | Identity morphism maps to identity matrices (block-diagonal with identity blocks). |
| `matrixDecomposition_comp` | `o.matrixDecomposition (z ≫ w) i = o.matrixDecomposition w i * o.matrixDecomposition z i` | `matrixDecomposition` intertwines composition with matrix multiplication. |
| `matrixDecompositionLinearEquiv` | `((⨁ f) ⟶ ⨁ g) ≃ₗ[R] ∀ i, Matrix (g⁻¹'{i}) (f⁻¹'{i}) (End (s i))` | Refines to an *`R`-linear equivalence* when `C` is `R`-linear. |
| `equiv_of_iso` | `o : HomOrthogonal s → (∀ i, InvariantBasisNumber (End (s i))) → (⨁ f ≅ ⨁ g) → ∃ e : α ≃ β, g ∘ e = f` | If biproducts over `s` are isomorphic, then multiplicities (i.e., fibers `f`, `g`) are equivalent up to bijection — uniqueness of decomposition multiplicities. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `HomOrthogonal.`: All definitions and theorems are scoped under this namespace.
  - `matrixDecomposition*`: All variants of the decomposition map.
- **Suffixes**:
  - `AddEquiv`: Additive equivalence (preserves addition).
  - `LinearEquiv`: Linear equivalence over a semiring `R`.
  - `eq_zero`, `id`, `comp`: Standard categorical properties (zero morphism, identity, composition).
- **Notable patterns**:
  - `⁻¹' {i}`: Preimage of singleton `{i}` under a function — used to index blocks.
  - `eqToHom`: Used to transport morphisms along equalities of indices (e.g., `f j = g k`).
  - `biproduct.ι`, `biproduct.π`, `biproduct.matrix`, `biproduct.components`: Standard biproduct constructors/destructors.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only`: Simplification using definitional equalities and lemmas (e.g., `biproduct.ι_π_ne`, `comp_zero`, `eqToHom_refl`).
- `split_ifs`: Handles `if ... then ... else ...` cases.
- `rcases` / `cases`: Destructure dependent pairs and equalities (e.g., `⟨k, ⟨⟩⟩`).
- `ext`: Extensionality for morphisms, functions, matrices.
- `rw [← ...]`: Rewriting using composition identities or previously proven lemmas.
- `apply o.eq_zero h`: Apply hom-orthogonality to kill off-diagonal components.
- `convert comp_zero`: (Historical note: replaced by `have ... := ...; rw [this, comp_zero]` in newer Lean).
- `aesop` / `ring`: Not explicitly used here — lean heavily on `simp` and manual reasoning.
- `exact Cardinal.eq.1 ...`: For uniqueness of cardinalities in IBN rings.

---

#### **4. Proof Logic**

- **Structure of `matrixDecomposition`**:
  - Constructed as an equivalence (`≃`) with explicit `toFun` and `invFun`.
  - `toFun`: Extracts the `(i, j, k)`-entry of the matrix via biproduct components and `eqToHom` for index transport.
  - `invFun`: Reconstructs the morphism using biproduct matrix construction, with zero elsewhere.
  - Proofs of `left_inv`/`right_inv` rely on:
    - `biproduct.matrix_π`, `biproduct.ι_desc`
    - `eqToHom` simplifications
    - `o.eq_zero` to eliminate off-diagonal terms.

- **Proof of `matrixDecomposition_comp`**:
  - Uses biproduct universal property (`biproduct.total`, `sum_comp`, `comp_sum`).
  - Reduces to showing off-diagonal components vanish via `o.eq_zero`.
  - Key lemma: `biproduct.ι ≫ w ≫ π = 0` when indices differ.

- **Proof of `equiv_of_iso`**:
  - Uses `matrixDecomposition` to convert isomorphism `i : ⨁ f ≅ ⨁ g` into invertible block-diagonal matrices.
  - For each `i`, `o.matrixDecomposition i.hom i` and `o.matrixDecomposition i.inv i` are mutual inverses ⇒ square matrices over rings with IBN ⇒ equal cardinalities of index sets.
  - Concludes existence of bijection `e : α ≃ β` preserving the indexing function (`g ∘ e = f`).

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.CategoryTheory.Linear.Basic`: Linear categories, zero morphisms.
- `Mathlib.CategoryTheory.Preadditive.Biproducts`: Biproducts in preadditive categories.
- `Mathlib.LinearAlgebra.Matrix.InvariantBasisNumber`: Invariant basis number for rings.
- `Mathlib.Data.Set.Subsingleton`: Used to define hom-orthogonality via subsingleton hom-sets.

**Universe Levels**:
- `u`, `v`: For category `C : Type u` with `v`-small homs.

**Key Assumptions**:
- `[Category.{v} C]`
- `[HasZeroMorphisms C]`
- `[HasFiniteBiproducts C]`
- `[Preadditive C]` (for additive version)
- `[Linear R C]` (for `R`-linear version)
- `[∀ i, InvariantBasisNumber (End (s i))]` (for uniqueness of multiplicities)

---

Let me know if you'd like a diagrammatic summary or a formalization roadmap for extending this to semisimple categories.