### Technical Brief: `DFinsupp.sigmaCurry` and `sigmaUncurry` Equivalence

---

#### **1. Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `sigmaCurry` | `[∀ i j, Zero (δ i j)] → (Π₀ (i : Σ _, _), δ i.1 i.2) → Π₀ (i) (j), δ i j` | Curries a dependent function on a `Sigma`-indexed domain into a two-argument dependent function. |
| `sigmaUncurry` | `[∀ i j, Zero (δ i j)] [DecidableEq ι] → (Π₀ (i) (j), δ i j) → Π₀ (i : Σ _, _), δ i.1 i.2` | Uncurries a two-argument dependent function into one indexed by a `Sigma` type. |
| `sigmaCurryEquiv` | `[∀ i j, Zero (δ i j)] [DecidableEq ι] → (Π₀ (i : Σ _, _), δ i.1 i.2) ≃ Π₀ (i) (j), δ i j` | Bundled equivalence (bijection) between curried and uncurried `DFinsupp` spaces. |
| `sigmaCurry_apply` | `sigmaCurry f i j = f ⟨i, j⟩` | Core computation rule: evaluation of curried function. |
| `sigmaUncurry_apply` | `sigmaUncurry f ⟨i, j⟩ = f i j` | Core computation rule: evaluation of uncurried function. |
| `sigmaCurry_single` | `sigmaCurry (single ij x) = single ij.1 (single ij.2 x)` | Behavior on `single` elements (basis vectors). |
| `sigmaUncurry_single` | `sigmaUncurry (single i (single j x)) = single ⟨i, j⟩ x` | Inverse behavior on `single`. |
| `sigmaCurry_add`, `sigmaUncurry_add` | Preserves addition | Linearity of the maps. |
| `sigmaCurry_smul`, `sigmaUncurry_smul` | Preserves scalar multiplication | Module homomorphism property. |
| `sigmaCurry_zero`, `sigmaUncurry_zero` | Maps zero to zero | Ensures basepoint preservation. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `sigmaCurry_`, `sigmaUncurry_`: Indicates direction of currying/uncurrying over `Sigma` types.
  - `single_`: For behavior on basis elements (`single`).
  - `zero`, `add`, `smul`: For algebraic structure preservation.

- **Suffixes**:
  - `_apply`: Evaluation lemma.
  - `_equiv`: Bundled equivalence (bijection).
  - `_zero`, `_add`, `_smul`: Structural compatibility lemmas.

- **Pattern**: `sigmaCurry`/`sigmaUncurry` + operation/property → e.g., `sigmaCurry_add`, `sigmaUncurry_single`.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `ext` | To prove extensionality of `DFinsupp`s (functional extensionality + support reasoning). |
| `rw` / `simp` | Rewriting using `@[simp]` lemmas like `sigmaCurry_apply`, `single_eq_same`, `zero_apply`. |
| `obtain rfl | hi := eq_or_ne i i'` | Case analysis on equality of indices (standard in `DFinsupp` proofs). |
| `dsimp only` | Simplify definitions without unfolding too much. |
| `simp [hi]`, `simpa using hj` | Simplify using hypotheses or discharge goals via known facts. |
| `Multiset.mem_bind`, `Multiset.mem_filterMap`, `Multiset.mem_map` | Reasoning about support sets (finite multisets). |
| `Decidable.or_iff_not_imp_left.mpr` | Logical manipulation for decidability. |
| `Trunc.finChoice` | Choice principle for finite support construction in `sigmaUncurry`. |

---

#### **4. Proof Logic**

- **Structure**: Proofs follow a standard pattern for `DFinsupp`:
  1. **Extensionality**: Use `ext` to reduce to pointwise equality.
  2. **Index case analysis**: Split on `i = i'` and `j = j'` using `eq_or_ne`.
  3. **Simplify using `single_eq_same` / `single_eq_of_ne`** and zero behavior.
  4. **Support reasoning** (especially for `sigmaUncurry`): Construct finite support via `bind`, `filterMap`, and `attach` on finite sets.

- **Equivalence proof** (`sigmaCurryEquiv`):
  - `left_inv`: Show `sigmaUncurry (sigmaCurry f) = f` by `ext ⟨i, j⟩` and `rw` both `apply` lemmas.
  - `right_inv`: Show `sigmaCurry (sigmaUncurry f) = f` similarly.

- **Algebraic lemmas** (`add`, `smul`): Prove via `ext` and `rfl`, or `DFunLike.coe_injective rfl` for coercion-based equality.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Data.DFinsupp.Module` | Core `DFinsupp` theory, module structure, `single`, `zero`, `add`, `smul`. |
| `Mathlib.Data.Fintype.Quotient` | Used for finite support constructions (e.g., `Trunc.finChoice`, finite sets). |

> **Note**: The file assumes `DecidableEq ι` for index equality checks and `Zero (δ i j)` for basepoint existence (required for `DFinsupp` support conditions).

---

### Summary

This file establishes a foundational equivalence between `DFinsupp` over a dependent sum (`Σ`) and iterated `DFinsupp`s — a dependent version of currying. It is critical for manipulating dependent functions with finite support in type-theoretic constructions (e.g., in sheaf theory, fibered structures, or dependent product modules). The proofs rely heavily on extensionality, index case analysis, and multiset reasoning for finite supports.