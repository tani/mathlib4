### Technical Brief: Quantifier Complexity in First-Order Logic (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsAtomic φ` | `L.BoundedFormula α n → Prop` | Defines *atomic formulas*: equality or relation symbols applied to terms. Excludes `⊥`, `⊤`. |
| `IsQF φ` | `L.BoundedFormula α n → Prop` | Defines *quantifier-free formulas*: built from `⊥`, atomic formulas, and implication (hence all Boolean combinations). |
| `IsPrenex φ` | `L.BoundedFormula α n → Prop` | Defines *prenex normal form*: a block of quantifiers followed by a quantifier-free matrix. |
| `toPrenex φ` | `L.BoundedFormula α n → L.BoundedFormula α n` | Constructs a semantically equivalent prenex form for any bounded formula. |
| `realize_toPrenex` | `φ.toPrenex.Realize v xs ↔ φ.Realize v xs` | **Main result**: `toPrenex` preserves truth under realization. |
| `toPrenexImpRight` | Auxiliary def for handling `φ.imp ψ` when `φ` is QF and `ψ` is prenex. | Ensures prenex closure under implication with QF antecedent. |
| `toPrenexImp` | Auxiliary def for handling `φ.imp ψ` when both are prenex. | Ensures prenex closure under implication between prenex formulas. |
| `IsUniversal φ` | `L.BoundedFormula α n → Prop` | Universal formulas: only universal quantifiers over QF matrix. |
| `IsExistential φ` | `L.BoundedFormula α n → Prop` | Existential formulas: only existential quantifiers over QF matrix. |
| `Theory.IsUniversal T` | `L.Theory → Prop` | Theory is *universal* if all its sentences are universal. |
| `realize_embedding` lemmas | e.g., `IsQF.realize_embedding` | Preservation of truth under embeddings (for QF, universal, existential formulas). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`: Property predicates (`isAtomic`, `isQF`, `isPrenex`, `isUniversal`, `isExistential`)
  - `toPrenex`: Transformation functions (`toPrenex`, `toPrenexImp`, `toPrenexImpRight`)
  - `realize_`: Semantic properties (`realize_toPrenex`, `realize_toPrenexImp`, `realize_embedding`)
- **Suffixes**:
  - `_of_isQF`, `_of_isAtomic`: Constructors from simpler classes
  - `_liftAt`, `_castLE`, `_relabel`: Structural operations on formulas
  - `_sup`, `_inf`, `_not`: Boolean operations on formulas
- **Pattern**: `isX_of_isY`, `X_of_Y`, `realize_X_of_Y` — reflects inclusion chains (e.g., `IsAtomic → IsQF → IsPrenex`).

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `induction` | Structural induction on `IsAtomic`, `IsQF`, `IsPrenex`, `IsUniversal`, `IsExistential` |
| `cases` / `cases'` | Eliminate impossible cases (e.g., `not_all_isAtomic`, `not_ex_isAtomic`) |
| `simp only [...]` | Simplify using lemmas about `realize_*`, `liftAt`, `castLE`, `relabel`, `snoc_comp_castSucc` |
| `exact`, `refine`, `intro` | Standard proof construction |
| `rw [realize_imp, realize_all, realize_ex]` | Rewriting semantics of connectives/quantifiers |
| `forall_congr'`, `exists_congr` | Congruence for quantifiers in realizability proofs |
| `rfl` | Trivial equalities (e.g., in `toPrenexImpRight`/`toPrenexImp` simplifications) |
| `by_cases` | Split on decidability of formula realizability (e.g., `by_cases h : φ.Realize v xs`) |
| `subsingleton` reasoning | `Subsingleton.elim` for constant functions (e.g., in `models_of_embedding`) |

---

#### **4. Proof Logic**

- **Inductive Structure**: Proofs over `IsAtomic`, `IsQF`, `IsPrenex`, etc., follow *induction on the inductive definition*.
- **Semantic Preservation**: For `realize_toPrenex`, the proof proceeds by:
  1. Structural induction on `φ`
  2. For `imp`: use `realize_toPrenexImp` with lemmas `realize_toPrenexImpRight`
  3. For `all`: reduce to `forall_congr'` + induction hypothesis
- **Auxiliary Lemmas**:
  - `toPrenexImpRight`/`toPrenexImp` definitions are *recursive on the quantifier prefix* of `ψ` (or `φ`), lifting `φ` to avoid variable capture.
  - Realizability proofs use *variable shifting* (`liftAt 1 n`) and *compilation of snoc/comp* lemmas.
- **Embedding Preservation**:
  - `IsQF.realize_embedding`: Bi-implication via induction on `IsQF`, using `StrongHomClass.map_rel` and injectivity.
  - `IsUniversal.realize_embedding`: Only one direction (embeddings reflect universal truths).
  - `IsExistential.realize_embedding`: Only one direction (embeddings preserve existential truths).

---

#### **5. Imports & Scope**

- **Primary Import**:
  ```lean
  import Mathlib.ModelTheory.Equivalence
  ```
  → Indicates this file is part of the *Model Theory* library, specifically dealing with logical equivalence and semantics.

- **Scope**:
  - First-order logic over a language `L`
  - Bounded formulas (with de Bruijn indices for quantified variables)
  - Realization semantics over `L`-structures
  - Preservation under homomorphisms/embeddings/substructures

- **Key Concepts Used**:
  - `L.BoundedFormula α n`: Formulas with free variables in `α`, bounded quantifiers over `Fin n`
  - `Realize v xs`: Truth of formula under assignment `v : α → M`, `xs : Fin n → M`
  - `L.Structure M`, `L.HomClass`, `EmbeddingLike`, `StrongHomClass`: Categorical semantics

---

### Summary

This file formalizes the *quantifier hierarchy* in first-order logic within Lean 4’s Model Theory library. It provides:
- A clean inductive stratification (`IsAtomic` ⊆ `IsQF` ⊆ `IsPrenex`, and `IsUniversal`/`IsExistential` as subclasses),
- A constructive *prenex normal form* algorithm (`toPrenex`) with semantic correctness (`realize_toPrenex`),
- Preservation properties under embeddings (critical for model-theoretic applications like diagram lemmas, elementary embeddings, and substructure closure),
- Applications to *universal theories* and their closure under substructures.

The formalization is highly structured, leveraging Lean’s inductive families and typeclass inference for semantic reasoning.