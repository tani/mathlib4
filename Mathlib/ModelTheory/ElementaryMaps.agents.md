### Technical Metadata Brief: `Mathlib.Data.FirstOrder.ElementaryEmbedding`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Structure | Purpose |
|------|------------------|---------|
| `ElementaryEmbedding` | `structure` | An embedding `f : M → N` such that for all formulas `φ`, `φ` is realized by `f ∘ x` in `N` iff realized by `x` in `M`. |
| `elementaryDiagram` | `L[[M]].Theory` | The set of all sentences with parameters from `M` that `M` satisfies — i.e., the complete theory of `M` with parameters. |
| `ofModelsElementaryDiagram` | `M ↪ₑ[L] N` | Canonical elementary embedding of `M` into any model `N` of its elementary diagram, assuming `N` expands the language by constants for `M`. |
| `isElementary_of_exists` (Tarski–Vaught Test) | `theorem` | Gives a sufficient condition for an embedding `f : M ↪[L] N` to be elementary: for every bounded formula `φ(x̄, y)` and `ā ∈ Mⁿ`, if `N ⊨ ∃y φ(ā, y)`, then `M ⊨ ∃y φ(ā, y)`. |
| `toElementaryEmbedding` | `def` | Bundles an embedding satisfying the Tarski–Vaught condition into an `ElementaryEmbedding`. |
| `toEmbedding`, `toHom` | `def` | Forgets elementary property to get a first-order embedding or homomorphism. |
| `refl`, `comp` | `def` | Identity and composition of elementary embeddings. |
| `elementarilyEquivalent` | `theorem` | Any elementary embedding implies elementarily equivalent structures (`M ≅[L] N`). |
| `injective` | `theorem` | Every elementary embedding is injective. |
| `map_formula`, `map_sentence`, `map_boundedFormula` | `@[simp] theorem` | Commutation of elementary embeddings with formula/ sentence/ bounded formula realization. |
| `map_fun`, `map_rel`, `map_constants` | `@[simp] theorem` | Commutation with function/ relation/ constant interpretation. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isElementary_`: Criterion for elementarity (e.g., `isElementary_of_exists`)
  - `ofModels_`: Construction from models (e.g., `ofModelsElementaryDiagram`)
  - `to_`: Forgetful or coercion-like constructions (e.g., `toEmbedding`, `toHom`, `toElementaryEmbedding`)
- **Suffixes**:
  - `_apply`: For `apply`-like lemmas (e.g., `comp_apply`)
  - `_iff`: For biconditional characterizations (e.g., `elementarilyEquivalent` uses `elementarilyEquivalent_iff`)
- **Notation**:
  - `A ↪ₑ[L] B`: Notation for `ElementaryEmbedding L A B`
  - `L[[M]]`: Language extended with constants for elements of `M`
  - `L[[M]].Theory`: Theory in expanded language

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `aesop` | Automating routine proofs (e.g., `map_fun'`, `map_rel'`, `toElementaryEmbedding`) |
| `simp_rw`, `simp only`, `erw` | Rewriting with simplification lemmas, especially for `realize_*`, `comp`, `Sum.elim`, etc. |
| `rw`, `exact`, `refine` | Standard rewriting and proof construction |
| `cases'`, `cases` | Destructuring hypotheses/structures (e.g., destructuring `hnp`, `hmn`) |
| `intro`, `intro h`, `rintro` | Introducing hypotheses and variables |
| `ext`, `funext` | Extensionality proofs (e.g., for functions) |
| `have`, `suffices`, `contrapose!` | Proof restructuring and contradiction-based reasoning |
| `erw [Unique.eq_default ...]` | Simplifying unique default values (e.g., for sentences) |
| `BoundedFormula.recOn` | Induction on bounded formulas (in Tarski–Vaught proof) |

---

#### **4. Proof Logic**

- **Inductive structure**:
  - Proofs about formulas often use **induction on formula structure** (`BoundedFormula.recOn`, `Formula.recOn`).
- **Elementarity proofs**:
  - Reduce to bounded formulas via `realize_relabel_sum_inr`.
  - Use `Unique.eq_default` to handle sentences (no free variables).
- **Tarski–Vaught test**:
  - Induction on bounded formulas.
  - For universal quantifier case: use `ih` to lift existence in `N` to existence in `M` via the Tarski–Vaught hypothesis.
  - For negation: contrapositive + use of hypothesis again.
- **Embedding properties**:
  - Injectivity proven via equality formula `x = y`.
  - Homomorphism properties (`map_fun`, `map_rel`) proven via graph/relational formulas.
- **Canonical embeddings**:
  - Use `realize_iff_of_model_completeTheory` to relate realizability in `M` and `N` when `N ⊨ elementaryDiagram M`.

---

#### **5. Imports & Scope**

| Import | Purpose |
|--------|---------|
| `Mathlib.Data.Fintype.Basic` | For `Fintype`, `equivFin`, used in handling finite index types (e.g., `Fin n`) |
| `Mathlib.ModelTheory.Substructures` | For `Substructure`, `lhomWithConstants`, `IsExpansionOn`, `completeTheory`, etc. |

**Scope**:  
- Formalizes first-order logic semantics in Lean 4 (via `FirstOrder.Language`, `Structure`, `Formula`, `BoundedFormula`, `Sentence`, `Theory.model_iff`, etc.).
- Builds category-theoretic structure on elementary embeddings (identity, composition, associativity).
- Connects to model theory via elementary diagrams and the Tarski–Vaught test.

---

Let me know if you'd like a diagram of the categorical structure or a summary of how this fits into the broader model theory library.