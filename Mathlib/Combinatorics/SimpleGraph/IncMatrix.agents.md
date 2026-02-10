### Technical Metadata Brief: `SimpleGraph.incMatrix` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `incMatrix` | `SimpleGraph.incMatrix [Zero R] [One R] : Matrix α (Sym2 α) R` | Defines the *unoriented incidence matrix* of a simple graph `G`, with rows indexed by vertices `α` and columns by unordered pairs `Sym2 α`. Entry `(a, e)` is `1` if vertex `a` is incident to edge `e`, else `0`. |
| `incMatrix_apply` | `G.incMatrix R a e = (G.incidenceSet a).indicator 1 e` | Computes the `(a, e)`-entry via set indicator. |
| `incMatrix_apply'` | Under decidable instances: `G.incMatrix R a e = if e ∈ G.incidenceSet a then 1 else 0` | Explicit computational form using `if-then-else`. |
| `incMatrix_apply_mul_incMatrix_apply` | `G.incMatrix R a e * G.incMatrix R b e = (G.incidenceSet a ∩ G.incidenceSet b).indicator 1 e` | Product of two row entries equals indicator of intersection of incidence sets. |
| `incMatrix_apply_mul_incMatrix_apply_of_not_adj` | If `a ≠ b` and `¬G.Adj a b`, then product = `0` | Off-diagonal entries vanish for non-adjacent vertices. |
| `sum_incMatrix_apply` | `∑ e, G.incMatrix R a e = G.degree a` | Sum over columns of a row = degree of vertex `a`. |
| `incMatrix_mul_transpose_diag` | `(G.incMatrix R * (G.incMatrix R)ᵀ) a a = G.degree a` | Diagonal of `MMᵀ` = degrees. |
| `incMatrix_mul_transpose_apply_of_adj` | If `G.Adj a b`, then `(MMᵀ) a b = 1` | Off-diagonal entry = `1` iff vertices adjacent. |
| `incMatrix_mul_transpose` | Full description: `MMᵀ = fun a b ↦ if a = b then deg a else if Adj a b then 1 else 0` | Complete characterization of `MMᵀ`. |
| `sum_incMatrix_apply_of_mem_edgeSet` | If `e ∈ G.edgeSet`, then `∑ a, G.incMatrix R a e = 2` | Sum over rows of a column = `2` for actual edges. |
| `sum_incMatrix_apply_of_not_mem_edgeSet` | If `e ∉ G.edgeSet`, then `∑ a, G.incMatrix R a e = 0` | Sum over rows = `0` for non-edges. |
| `incMatrix_transpose_mul_diag` | `(MᵀM) e e = if e ∈ edgeSet then 2 else 0` | Diagonal of `MᵀM` encodes edge membership. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `incMatrix_`: All definitions/theorems related to the incidence matrix.
  - `sum_`: Summation over rows/columns.
  - `mul_`: Matrix multiplication-related results.
  - `transpose_`: Results involving transpose.
- **Suffixes**:
  - `_apply`: Entry-wise evaluation.
  - `_diag`: Diagonal entries of a product.
  - `_of_adj` / `_of_not_adj`: Conditional cases based on adjacency.
  - `_of_mem_edgeSet` / `_of_not_mem_edgeSet`: Conditional on edge membership.
- **Structure**:
  - `incMatrix R a e` → matrix entry at `(a, e)`
  - `G.incidenceSet a` → set of edges incident to vertex `a`
  - `G.edgeSet` → set of actual edges (i.e., `Sym2 α` elements with both elements adjacent)

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp only [...]` — heavily used for rewriting with lemmas and simplifying indicators, `if-then-else`, and set operations.
- `rw [...]` — rewriting using definitions and previously proven equalities.
- `convert ...` — for equating expressions up to definitional equality (e.g., `card_singleton`, `Nat.cast_one`).
- `split_ifs` — to case-split on `if ... then ... else ...`.
- `ext` — extensionality for matrix equality.
- `classical` — used to enable classical reasoning (e.g., decidability assumptions).
- `induction e using Sym2.ind` — structural induction on symmetric pairs.
- `congr 2` — for proving equality of finite sums over finite types.
- `simp_all only [...]` — post-simplification with refined context.

---

#### **4. Proof Logic**

- **Structure of proofs**:
  - **Entry-wise reasoning**: Most theorems are proven by unfolding definitions (`incMatrix`, `mul_apply`, `transpose_apply`) and reducing to set-theoretic identities (e.g., intersection of incidence sets).
  - **Summation lemmas**: Use `sum_boole`, `sum_eq_zero`, and `sum_const_zero` to reduce sums over finite types.
  - **Adjacency cases**: Proofs often split into cases: `a = b`, `G.Adj a b`, and `¬G.Adj a b ∧ a ≠ b`.
  - **Sym2 induction**: For column sums, `e ∈ Sym2 α` is handled via `e.ind` (induction on symmetric pair representation `e = ⟦a, b⟧`).
  - **Cardinality arguments**: Use `card_pair`, `card_singleton`, and `coe_filter_univ` to relate set sizes to numeric values (`2`, `1`, `deg a`).

- **Key logical flow**:
  > *Unfold matrix product → reduce to sum over edges → apply indicator properties → simplify using set identities (e.g., `incidenceSet_inter_incidenceSet_of_adj`) → match against known cardinalities or degrees.*

---

#### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.Combinatorics.SimpleGraph.Finite`: Provides finiteness assumptions (`Fintype`, `neighborSet`, `degree`).
  - `Mathlib.Data.Finset.Sym`: Defines `Sym2 α`, `mk'`, `edgeSet`, `incidenceSet`.
  - `Mathlib.Data.Matrix.Mul`: Matrix multiplication, transpose, and basic operations.

- **Scope**:
  - Focuses on *unoriented* incidence matrices for *simple graphs*.
  - Works over arbitrary rings/semirings `R` with `Zero`, `One`, `MulZeroOneClass`, `NonAssocSemiring`, or `Semiring`.
  - Uses `Sym2 α` indexing (all unordered pairs), not just `edgeSet`, to uniformize types across graphs.

- **Notable design choice**:
  > Columns indexed by *all* `Sym2 α`, not just `G.edgeSet`. This ensures all incidence matrices for different graphs on same vertex type have identical type, simplifying type theory, at cost of extra zero columns.

---

#### **6. Future Work (from docstring)**

- Oriented incidence matrices for *oriented graphs*.
- Graph Laplacian via oriented incidence matrix (requires choice of orientation).
- Potential extensions: signed graphs, multigraphs, or weighted graphs.

--- 

Let me know if you'd like a formalized summary in Lean syntax or a diagram of dependencies.