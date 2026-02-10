### Technical Metadata Brief: Type Spaces in First-Order Model Theory (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `CompleteType` | `structure` | Represents a *complete type* over theory `T` with variables in `α`: a maximally consistent extension of `T` in the language expanded with constants for `α`. |
| `typeOf (v : α → M)` | `T.CompleteType α` | The *type of a tuple* `v` in a model `M`, i.e., the set of sentences true of `v`. |
| `realizedTypes (M : Model)` | `Set (T.CompleteType α)` | The set of types in `T.CompleteType α` realized by some tuple in `M`. |
| `isMaximal` | `p : T.CompleteType α → IsMaximal p` | Every complete type is maximally consistent (i.e., complete and consistent). |
| `mem_or_not_mem` | `φ ∈ p ∨ φ.not ∈ p` | Completeness: for any sentence `φ`, either `φ` or its negation is in `p`. |
| `nonempty_iff` | `Nonempty (T.CompleteType α) ↔ T.IsSatisfiable` | The space of complete types is nonempty iff the theory is satisfiable. |
| `exists_modelType_is_realized_in` | `∀ p, ∃ M, p ∈ realizedTypes M α` | Every complete type is realized in *some* model (completeness of first-order logic via Henkin construction). |
| `setOf_mem_eq_univ_iff` | `{ p | φ ∈ p } = univ ↔ T ⊨ᵇ φ` | A sentence is provable from `T` iff it holds in *all* complete types over `T`. |
| `setOf_subset_eq_empty_iff` | `{ p | S ⊆ p } = ∅ ↔ ¬S ∪ T is satisfiable` | A set of sentences `S` is inconsistent with `T` iff no complete type extends `T ∪ S`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isMaximal'`, `subset'`: internal structure field projections (prime suffix for fields).
  - `mem_`, `not_mem_`, `setOf_`: membership and set-builder constructions.
  - `typeOf`, `realizedTypes`: semantic constructions tied to models.
- **Suffixes**:
  - `'` (prime): used for projections from structures (e.g., `toTheory'` → `toTheory` via `coe`).
  - `'_iff` / `'_eq_univ_iff`: characterizations via logical equivalence (`↔`).
- **Functional naming**:
  - `onTheory`, `completeTheory`, `typeOf`, `realizedTypes`: standard model-theoretic operations.
  - `lhomWithConstants`, `constantsOn`: language homomorphisms adding constants for variables.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `simp` / `simp_rw` | Simplification using definitional equalities and lemmas (e.g., `mem_completeTheory`, `realize_equivSentence_symm`). |
| `rw` / `ext` | Rewriting and extensionality (especially for set equality). |
| `cases` | Destructuring `structure` or `exists` goals. |
| `exact`, `refine`, `intro` | Goal-directed proof construction. |
| `aesop` (implicit via `rintro`, `intro` patterns) | Automated reasoning for propositional logic and set membership. |
| `convert`, `rfl` | Equality reasoning, especially for structure fields. |
| `unfold`, `dsimp` | Unfolding definitions (e.g., `realizedTypes`, `typeOf`). |

---

#### **4. Proof Logic**

- **General Strategy**:
  - **Induction/Case analysis** on `p : T.CompleteType α` (via `cases p`).
  - **Reduction to satisfiability**: many results (e.g., `nonempty_iff`, `setOf_subset_eq_empty_iff`) reduce to checking satisfiability of `T ∪ S`.
  - **Henkin-style construction** in `exists_modelType_is_realized_in`: use maximality to extract a model from a complete type.
  - **Duality between syntax and semantics**:
    - `mem_typeOf` ↔ realizability.
    - `setOf_mem_eq_univ_iff` ↔ completeness theorem.
- **Key Logical Flow**:
  1. Use `isMaximal'` to get completeness (`mem_or_not_mem`) and consistency.
  2. Translate formula satisfaction (`Realize`) to sentence membership via `equivSentence`.
  3. Use model-theoretic characterizations (`models_iff`, `completeTheory`) to bridge syntax and semantics.

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.ModelTheory.Satisfiability` | Core definitions: satisfiability, models, completeness, `completeTheory`. |
| `Cardinal`, `Set`, `FirstOrder` | Universe management, set-theoretic operations, first-order logic infrastructure. |
| `FirstOrder.Language` | Language homomorphisms (`lhomWithConstants`), expanded languages (`L[[α]]`), constants expansion (`constantsOn`). |
| `Sentence`, `Formula`, `Structure`, `Model` | Semantic infrastructure (realizability, satisfaction). |

---

#### **6. Implementation Notes**

- **Complete types as theories**: Implemented as `L[[α]].Theory` (not as sets of formulas), leveraging `SetLike` for coercion.
- **Equivalence with formula sets**: `CompleteType` is definitionally equivalent to maximal consistent *sentence* sets; connection to formula sets is via `equivSentence`.
- **Henkin completeness**: `exists_modelType_is_realized_in` constructs a model from a complete type using subtheory restriction and reduct.
- **Topological flavor**: Sets `{ p | φ ∈ p }` form a basis for the Stone space topology (not formalized here, but groundwork laid via `setOf_mem_eq_univ_iff`).

---

This metadata reflects the formalization of *Stone spaces of types* in Lean 4, emphasizing the syntactic–semantic bridge via maximally consistent extensions.