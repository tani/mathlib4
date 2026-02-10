### Technical Metadata Brief: Schur’s Lemma in Lean 4 (CategoryTheory Module)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `mono_of_nonzero_from_simple` | `{f : X ⟶ Y} → f ≠ 0 → Mono f` | In a preadditive category with kernels, any nonzero map from a simple object is monic. |
| `isIso_of_hom_simple` | `{f : X ⟶ Y} → f ≠ 0 → IsIso f` | Core part of Schur’s Lemma: nonzero morphism between simples is an isomorphism. |
| `isIso_iff_nonzero` | `IsIso f ↔ f ≠ 0` | Characterization: morphism between simples is iso iff nonzero. |
| `DivisionRing (End X)` | Instance | Endomorphism ring of a simple object is a division ring (in preadditive + HasKernels). |
| `finrank_hom_simple_simple_eq_zero_of_not_iso` | `(X ≅ Y) → False → finrank 𝕜 (X ⟶ Y) = 0` | Hom space between non-isomorphic simples is zero-dimensional (over algebraically closed field). |
| `finrank_endomorphism_eq_one` | `(IsIso f ↔ f ≠ 0) → finrank 𝕜 (X ⟶ X) = 1` | Auxiliary lemma: finite-dimensional endomorphism ring with all nonzero maps invertible ⇒ 1-dim. |
| `finrank_endomorphism_simple_eq_one` | `[Simple X] → FiniteDimensional (X ⟶ X) → finrank (X ⟶ X) = 1` | Schur’s Lemma for endomorphisms: finite-dim endomorphism ring of simple is 1-dim. |
| `endomorphism_simple_eq_smul_id` | `∃ c : 𝕜, c • 𝟙 X = f` | Every endomorphism of a finite-dim simple is scalar multiple of identity. |
| `fieldEndOfFiniteDimensional` | `Field (End X)` | If endomorphisms of simple are finite-dim, then `End X` is a field (extends division ring). |
| `finrank_hom_simple_simple_le_one` | `finrank (X ⟶ Y) ≤ 1` | Hom space between simples is at most 1-dim (under finite-dim assumptions). |
| `finrank_hom_simple_simple_eq_one_iff` | `finrank (X ⟶ Y) = 1 ↔ Nonempty (X ≅ Y)` | Precise dichotomy: 1-dim iff simples are isomorphic. |
| `finrank_hom_simple_simple_eq_zero_iff` | `finrank (X ⟶ Y) = 0 ↔ IsEmpty (X ≅ Y)` | 0-dim iff simples are non-isomorphic. |
| `finrank_hom_simple_simple` | `finrank (X ⟶ Y) = if Nonempty (X ≅ Y) then 1 else 0` | Full Schur’s Lemma: hom space dimension is 1 or 0 depending on isomorphism. |

---

#### **2. Naming Conventions**

- **`isIso_` / `mono_` / `epi_`**: Prefixes for properties of morphisms (`isIso_of_hom_simple`, `mono_of_nonzero_from_simple`).
- **`hom_simple` / `endomorphism_simple`**: Indicates morphisms/endomorphisms involving simple objects.
- **`finrank_`**: Pertains to finite-dimensional rank over a field.
- **`eq_one` / `eq_zero` / `le_one`**: Describes dimension constraints.
- **`iff` suffix**: Biconditional statements (`isIso_iff_nonzero`, `eq_one_iff`, `eq_zero_iff`).
- **`of_` prefix**: Conditions or assumptions (`of_not_iso`, `of_finiteDimensional`).
- **`nonzero`**: Used for nonzero morphisms (`mono_of_nonzero_from_simple`, `isIso_of_hom_simple`).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp only [...]` | Simplify using precise rewrite rules, especially with `isIso_iff_nonzero`, `zero_comp`, etc. |
| `rw [...]` | Rewrite using lemmas like `inv_hom_id`, `Algebra.algebraMap_eq_smul_one`. |
| `intro`, `exact`, `apply` | Basic proof construction. |
| `obtain ⟨...⟩` | Destruct existential/universal quantifiers or products. |
| `convert` | Bypass definitional equality issues (e.g., `End X` vs `X ⟶ X`). |
| `omega` | Solve linear arithmetic goals (e.g., `finrank ≤ 1`, `0 < n ≤ 1 ⇒ n = 1`). |
| `dsimp` | Simplify definitions (e.g., in `mul_inv_cancel`). |
| `classical` | Enable classical logic for `if ... then ... else ...` and choice. |
| `aesop` / `ring` / `linarith` | Not explicitly used here, but `ring`/`linarith` could appear in related code. |

---

#### **4. Proof Logic**

- **General pattern**:
  - Use `isIso_iff_nonzero` to reduce isomorphism questions to nonzero-ness.
  - Prove monicity/epicity first (via kernel/cokernel arguments in preadditive categories).
  - For linear categories over algebraically closed fields:
    - Use spectral theory: nonzero endomorphisms have eigenvalues ⇒ scalar multiples of identity.
    - Use `finrank_eq_one_iff_of_nonzero'` to deduce 1-dimensionality.
  - Dichotomy arguments via `finrank_hom_simple_simple_eq_one_iff` and `finrank_hom_simple_simple_eq_zero_iff`.
  - Use `subsingleton_or_nontrivial` + `finrank_le_one` to bound dimension.

- **Inductive/structural reasoning**:
  - Not induction-heavy; mostly case analysis on `X ≅ Y` or `f = 0`.
  - Leverages `FiniteDimensional` and `IsAlgClosed` to extract eigenvalues/scalars.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.Group.Ext` | For group-theoretic extension lemmas (e.g., `id_nonzero`). |
| `Mathlib.CategoryTheory.Simple` | Definition of simple objects. |
| `Mathlib.CategoryTheory.Linear.Basic` | Linear categories, `𝕜`-linearity of homs. |
| `Mathlib.CategoryTheory.Endomorphism` | `End X`, `End.of`, division ring structure. |
| `Mathlib.FieldTheory.IsAlgClosed.Spectrum` | Spectral theory over algebraically closed fields (eigenvalues, `spectrum.mem_iff`). |

**Scope**:  
- `CategoryTheory`, with `Preadditive`, `HasKernels`, `Linear 𝕜`, `Simple`, `FiniteDimensional`, `IsAlgClosed`.  
- Classical logic enabled via `open scoped Classical`.

---

Let me know if you'd like a diagrammatic summary or a formalized checklist for applying Schur’s Lemma in proofs.