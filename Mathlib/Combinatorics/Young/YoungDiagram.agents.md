Here's a structured technical metadata summary of the provided Lean 4 file on **Young diagrams**, extracted for use in building a domain-specific AI agent:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `YoungDiagram` | `Type` (structure) | Represents finite up-left-justified diagrams as finite lower sets in `ℕ × ℕ`. |
| `cells : YoungDiagram → Finset (ℕ × ℕ)` | projection | Extracts the finite set of cells. |
| `isLowerSet` | `IsLowerSet (cells : Set (ℕ × ℕ))` | Ensures up-left closure: if `(i,j) ∈ μ` and `(i',j') ≤ (i,j)`, then `(i',j') ∈ μ`. |
| `card` | `YoungDiagram → ℕ` | Number of cells (`μ.cells.card`). |
| `row i μ` | `Finset (ℕ × ℕ)` | `i`-th row: cells with first coordinate `i`. |
| `rowLen i μ` | `ℕ` | Length of `i`-th row: smallest `j` s.t. `(i,j) ∉ μ`. |
| `col j μ` | `Finset (ℕ × ℕ)` | `j`-th column: cells with second coordinate `j`. |
| `colLen j μ` | `ℕ` | Length of `j`-th column: smallest `i` s.t. `(i,j) ∉ μ`. |
| `transpose μ` | `YoungDiagram` | Swaps coordinates: `(i,j) ↦ (j,i)`. |
| `rowLens μ` | `List ℕ` | List of row lengths: `μ.rowLen 0, μ.rowLen 1, …, μ.rowLen (μ.colLen 0 - 1)`. |
| `ofRowLens w hw` | `YoungDiagram` | Constructs diagram from weakly decreasing list `w`. |
| `equivListRowLens` | `YoungDiagram ≃ { w // w.Sorted (· ≥ ·) ∧ ∀ x ∈ w, 0 < x }` | Equivalence between Young diagrams and positive weakly decreasing lists. |
| `up_left_mem` | `i1 ≤ i2 → j1 ≤ j2 → (i2,j2) ∈ μ → (i1,j1) ∈ μ` | Formalizes up-left closure. |
| `mem_iff_lt_rowLen` | `(i,j) ∈ μ ↔ j < μ.rowLen i` | Characterizes membership via row lengths. |
| `mem_iff_lt_colLen` | `(i,j) ∈ μ ↔ i < μ.colLen j` | Characterizes membership via column lengths. |
| `transpose_le_iff` | `μ.transpose ≤ ν.transpose ↔ μ ≤ ν` | Transposition is an order isomorphism. |
| `rowLen_anti` | `i1 ≤ i2 → μ.rowLen i2 ≤ μ.rowLen i1` | Row lengths are weakly decreasing down rows. |
| `colLen_anti` | `j1 ≤ j2 → μ.colLen j2 ≤ μ.colLen j1` | Column lengths are weakly decreasing rightward. |
| `rowLens_sorted` | `μ.rowLens.Sorted (· ≥ ·)` | Row lengths form a weakly decreasing list. |
| `rowLens_ofRowLens_eq_self` | Right inverse of `equivListRowLens`. | |
| `ofRowLens_to_rowLens_eq_self` | Left inverse of `equivListRowLens`. | |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `row`, `col`, `rowLen`, `colLen`, `rowLens`: for row/column-related operations.
  - `transpose`: for diagram transpose.
  - `ofRowLens`, `cellsOfRowLens`: construction from lists.
- **Suffixes**:
  - `_iff`: characterizations of membership (`mem_iff_lt_rowLen`, `mem_iff_lt_colLen`).
  - `_mono`, `_anti`: monotonicity/antitonicity (`rowLen_anti`, `transpose_mono`).
  - `_eq_self`: inverse properties (`ofRowLens_to_rowLens_eq_self`, `rowLens_ofRowLens_eq_self`).
- **`coe_` / `norm_cast`**: for coercion lemmas (`coe_sup`, `coe_inf`, `coe_bot`).
- **`mem_`**: membership lemmas (`mem_sup`, `mem_inf`, `mem_transpose`, `mem_row_iff`, etc.).
- **`cells_`**: lemmas about `cells` projection (`cells_subset_iff`, `cells_sup`, `cells_bot`).

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only`: for simplification using definitional equalities and lemmas.
- `rw`: rewriting using equivalences and lemmas (e.g., `mem_iff_lt_rowLen`).
- `exact`, `intro`, `rfl`, `refine`: basic proof construction.
- `convert`: for partial equality proofs (e.g., `transpose_le_iff`).
- `by_contra!`: for contradiction arguments (e.g., `rowLen_anti`).
- `push_neg`: to push negations inward (e.g., in `mem_iff_lt_rowLen`).
- `ext`: extensionality for sets/Finsets.
- `cases`, `rcases`: destructuring hypotheses.
- `induction'`: induction on lists (e.g., `mem_cellsOfRowLens`).
- `rwa`, `rintro`, `rintro rfl`: advanced intro/rewrite combos.
- `aesop` not used here — proofs are mostly manual and structured.

---

### **4. Proof Logic**

- **Structure**: Definitions are built incrementally: first `YoungDiagram`, then lattice structure, then transpose, rows/columns, and finally the equivalence with lists.
- **Induction**: Used in `mem_cellsOfRowLens` and `isLowerSet` for `ofRowLens`.
- **Case analysis**: On inequalities (`eq_or_lt_of_le`) and list structure (`[]`, `::`).
- **Equivalence proofs**: Use `ext` + `simp` + `simpa` to reduce to membership characterizations.
- **Monotonicity/antitonicity**: Often proven via `convert` + `transpose` or direct use of `up_left_mem`.
- **Characterization lemmas**: Prove `↔` by two implications, often using `Nat.lt_find_iff` and `push_neg`.

---

### **5. Imports**

- `Mathlib.Order.UpperLower.Basic`: Provides `IsLowerSet`, used to enforce up-left closure.
- `Mathlib.Data.Finset.Preimage`: Used in `exists_not_mem_row` to show rows are finite.

---

### **Domain-Specific AI Agent Notes**

- **Core domain**: Combinatorics / algebraic combinatorics (partitions, symmetric groups, representation theory).
- **Key abstractions**: Finite lower sets in `ℕ × ℕ`, order-theoretic view of Young diagrams.
- **API design pattern**: Strongly typed, with explicit lattice and order structure; equivalence with lists enables computational use.
- **Typical queries**: “What is the transpose of this Young diagram?”, “What is the row length list?”, “Is this diagram contained in that one?”, “Construct diagram from partition [5,3,3,1]”.

Let me know if you'd like a formalized query interface spec or a tactic suggestion module for this domain.