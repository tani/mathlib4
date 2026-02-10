### Technical Metadata Brief: `PerfectPairing` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `PerfectPairing` | `structure` with `toLin : M →ₗ N →ₗ R`, `bijectiveLeft`, `bijectiveRight` | Core definition: a bilinear map inducing linear isomorphisms `M ≅ Dual N` and `N ≅ Dual M`. |
| `mkOfInjective`, `mkOfInjective'` | `def` | In finite-dimensional vector spaces over a field, injectivity of `B` and `B.flip` suffices for perfection. |
| `flip` | `def` | Swaps arguments: `p.flip : PerfectPairing R N M`. |
| `toDualLeft`, `toDualRight` | `def` | Induced linear equivalences: `M ≃ₗ Dual N`, `N ≃ₗ Dual M`. |
| `restrict` | `def` | Restricts a perfect pairing to submodules under complementary annihilator conditions. |
| `restrictScalars` | `def` | Descends a perfect pairing along a subring/algebra inclusion (e.g., `L → K`). |
| `restrictScalarsField` | `def` | Special case for field extensions using finite-dimensionality. |
| `IsReflexive.toPerfectPairingDual` | `def` | Canonical perfect pairing on a reflexive module with its dual: `Dual M × M → R`. |
| `LinearEquiv.flip` | `def` | Given `e : N ≃ₗ Dual M`, produces `e.flip : M ≃ₗ Dual N`. |
| `LinearEquiv.toPerfectPairing` | `def` | Converts a linear equivalence `N ≃ Dual M` (with `M` reflexive) into a `PerfectPairing R N M`. |
| `LinearEquiv.isReflexive_of_equiv_dual_of_isReflexive` | `lemma` | If `M` is reflexive and `N ≃ Dual M`, then `N` is reflexive. |
| `PerfectPairing.dual` | `def` | Induces a perfect pairing on dual modules: `Dual M × Dual N → R`. |
| `reflexive_left`, `reflexive_right` | `theorem` | In a perfect pairing, both modules are reflexive. |
| `finrank_eq` | `theorem` | In a perfect pairing between finite free modules, ranks are equal. |
| `exists_basis_basis_of_span_eq_top_of_mem_algebraMap` | `lemma` | Under span conditions and value-in-subfield, bases lift across subfield inclusion. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `toDual*`: Induced maps to duals (`toDualLeft`, `toDualRight`).
  - `flip*`: Symmetry/swap operations (`flip`, `flip_apply`, `flip_flip`).
  - `restrict*`: Restriction to submodules/subrings (`restrict`, `restrictScalars`, `restrictScalarsField`).
  - `dual*`: Dual-space constructions (`dual`, `dualCoannihilator`, `dualAnnihilator`).
  - `isReflexive_*`: Reflexivity-related lemmas.

- **Suffixes**:
  - `_aux`: Auxiliary helper definitions (`restrictScalarsAux`).
  - `_of_*`: Constructions from weaker assumptions (`mkOfInjective`, `isReflexive_of_equiv_dual_of_isReflexive`).
  - `_symm`: Involving inverses (`toDualLeft_symm`, `symm_flip`).

- **Functional style**:
  - `apply_*`, `coe_*`, `map_*`, `comp_*`: Standard `FunLike`/`LinearMap` conventions.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rwa` | Rewrite + assumption (e.g., to apply injectivity ↔ bijectivity equivalences). |
| `simp only [...]` | Fine-grained simplification, often with `LinearEquiv`, `Dual`, `Submodule` lemmas. |
| `aesop` | Automated reasoning for basic algebraic structure (e.g., module homomorphism properties). |
| `ext` | Extensionality for functions/maps (especially `LinearMap`, `DFunLike`). |
| `congrFun`, `congrArg` | To decompose function equality. |
| `rw [← ...]` | Rewriting with equivalences (e.g., `← B.flip_injective_iff₁`). |
| `have : ... := ...` + `replace` | Intermediate lemma introduction and strengthening. |
| `refine ⟨...⟩` | Constructing structure instances (e.g., `PerfectPairing`). |
| `induction' ... using Submodule.span_induction` | Structural induction on submodules. |
| `simpa using ...` | Simplify goal using a hypothesis. |

---

#### **4. Proof Logic**

- **Inductive/structural reasoning**:
  - Proofs often proceed by:
    1. **Unfolding definitions** (`toLin`, `flip`, `toDualLeft`, etc.).
    2. **Using linear equivalence properties** (`LinearEquiv.bijective`, `symm_apply_apply`).
    3. **Applying annihilator/complement conditions** (e.g., `IsCompl`, `dualAnnihilator`).
    4. **Leveraging finite-dimensionality** (e.g., `FiniteDimensional.of_injective`, `finrank_eq`).
    5. **Base-change arguments** (e.g., basis lifting via `exists_basis_basis_of_span_eq_top_of_mem_algebraMap`).

- **Common proof patterns**:
  - **Bijectivity ↔ injectivity + finite-dimensionality**: Used in `mkOfInjective`/`mkOfInjective'`.
  - **Reflexivity via composition**: `reflexive_left` uses `toDualRight_symm_comp_toDualLeft = Dual.eval`.
  - **Restriction via annihilator complements**: `restrict_aux` proves bijectivity of restricted map using `IsCompl`.
  - **Restriction of scalars**: Uses `restrictScalarsAux` + injectivity/surjectivity lemmas tied to algebra map range.

---

#### **5. Imports & Scope**

**Primary imports**:
```lean
import Mathlib.LinearAlgebra.Dual
import Mathlib.LinearAlgebra.Matrix.Basis
import Mathlib.LinearAlgebra.Matrix.BaseChange
import Mathlib.LinearAlgebra.FreeModule.Finite.Matrix
```

**Domain scope**:
- **Algebraic setting**: Commutative rings (`CommRing R`), modules (`Module R M`, `Module R N`).
- **Reflexivity**: Central concept; many results assume or derive `IsReflexive`.
- **Finite-dimensionality**: Key for simplifications (e.g., `FiniteDimensional`, `finrank`).
- **Base change & restriction of scalars**: Handles subrings, algebras, field extensions.

**Key abstractions**:
- `LinearEquiv`, `Dual`, `Submodule`, `annihilator`, `coannihilator`, `evalEquiv`.
- `FunLike`, `EquivLike`, `LinearEquivClass`: Typeclass infrastructure for coercion and structure.

---

### Summary

This file formalizes **perfect pairings** of modules over commutative rings, with emphasis on:
- Equivalence between bilinear and linear-isomorphism definitions,
- Reflexivity consequences,
- Restriction to submodules and subrings (including field extensions),
- Interaction with duals, bases, and annihilators.

It serves as a foundational module for duality theory in homological algebra, representation theory, and algebraic geometry (e.g., Grothendieck duality, Serre duality).