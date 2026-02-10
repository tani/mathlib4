### Technical Metadata Brief: `LinearMap.Trace` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `traceAux` | `(M →ₗ[R] M) →ₗ[R] R` | Defines trace w.r.t. a fixed basis `b` as `Matrix.trace ∘ LinearMap.toMatrix b b` |
| `trace` | `(M →ₗ[R] M) →ₗ[R] R` | Basis-independent trace: uses choice to pick a finite basis if one exists; otherwise returns `0` |
| `traceAux_eq` | `traceAux R b = traceAux R c` | Shows `traceAux` is independent of basis choice (key step toward well-definedness of `trace`) |
| `trace_eq_matrix_trace` | `trace R M f = Matrix.trace (toMatrix b b f)` | Relates abstract trace to matrix trace for any basis `b` |
| `trace_mul_comm` | `trace(f * g) = trace(g * f)` | Cyclic invariance of trace under composition (noncommutative multiplication in `End(M)`) |
| `trace_conj` | `trace(f * g * f⁻¹) = trace(g)` | Trace is invariant under conjugation by invertible endomorphisms |
| `trace_lie` | `trace([f, g]) = 0` | Trace of Lie bracket is zero (uses `trace_mul_comm`) |
| `trace_eq_contract_of_basis` | `trace ∘ dualTensorHom = contractLeft` | Identifies trace with contraction pairing under `End(M) ≅ M* ⊗ M` |
| `trace_one` / `trace_id` | `trace(1) = finrank R M` | Trace of identity is dimension (as element of `R`) |
| `trace_tensorProduct'` | `trace(f ⊗ g) = trace(f) * trace(g)` | Trace of tensor product map is product of traces |
| `trace_comp_comm'` | `trace(g ∘ f) = trace(f ∘ g)` | Cyclic invariance for composable maps (even when domains differ) |
| `trace_conj'` | `trace(e.conj f) = trace(f)` | Conjugation invariance under linear equivalence `e : M ≃ₗ N` |
| `IsProj.trace` | `trace(p) = finrank(p)` for projection `p` | Trace of a projection equals rank of its image |
| `isNilpotent_trace_of_isNilpotent` | `f` nilpotent ⇒ `trace(f)` nilpotent | Trace of nilpotent endomorphism is nilpotent in `R` |
| `trace_baseChange` | `trace(f.baseChange A) = algebraMap(trace(f))` | Trace commutes with base change of scalars |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `trace_`: core trace properties (`trace_mul_comm`, `trace_conj`, `trace_id`, etc.)
  - `trace_eq_`: equalities relating trace to other constructions (`trace_eq_matrix_trace`, `trace_eq_contract_of_basis`)
  - `trace_*'`: variants or refinements (e.g., `trace_tensorProduct'`, `trace_comp_comm'`)
  - `trace_*''`: rare; used for auxiliary lemmas (e.g., `trace_eq_contract_of_basis'`)
- **Suffixes**:
  - `_apply`: for pointwise versions (`trace_eq_contract_apply`)
  - `_of_basis`: when proof relies explicitly on a chosen basis
  - `_comm`: indicates commutativity/cyclicity (`trace_mul_comm`, `trace_comp_comm`)
  - `_conj`: conjugation invariance
  - `_tensorProduct`, `_prodMap`, `_transpose`: structural behavior under constructions

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `rw` / `simp_rw`: rewriting definitions and equalities (especially `trace_eq_matrix_trace`, `toMatrix_comp`, `trace_mul_comm`)
- `congr 1`: to reduce equality of linear maps to equality on inputs
- `cases` / `obtain` / `rintro`: handling existential quantifiers (e.g., basis existence)
- `by_cases H : ∃ s, …`: splitting on basis existence (classical choice)
- `apply Matrix.trace_mul_comm`: matrix-level cyclic property
- `ext`: extensionality for linear maps / tensors
- `simp only [...] at h`: targeted simplification in hypotheses
- `cancel_right`, `compl₁₂_inj`: for proving equalities of bilinear/linear maps via surjectivity
- `ring`: for commutative ring arithmetic (e.g., in `trace_mul_cycle`)
- `aesop`: for routine goal simplification (less frequent, but present)

---

#### **4. Proof Logic**

- **Basis independence**: Prove `traceAux` independent of basis (`traceAux_eq`), then define global `trace` via classical choice.
- **Reduction to matrices**: Most properties are proven by:
  1. Reducing to a finite basis (using `trace_eq_matrix_trace`)
  2. Applying known matrix identities (e.g., `Matrix.trace_mul_comm`)
  3. Lifting back via basis-independence
- **Tensor/categorical perspective**: For structural theorems (`trace_eq_contract_*`), use:
  - `dualTensorHom` isomorphism `End(M) ≅ M* ⊗ M`
  - `contractLeft` as the canonical pairing
  - Basis extensionality (`Basis.ext`) and simplification of tensor basis elements
- **Structural behavior**:
  - Product/tensor/transpose: Prove via naturality of `dualTensorHom` and contraction
  - Base change: Use compatibility of `toMatrix` with base change and `algebraMap`
- **Special cases**:
  - Projections: Use `IsProj.eq_conj_prodMap` + `trace_prodMap'`
  - Nilpotent elements: Reduce to matrix case + `Matrix.isNilpotent_trace_of_isNilpotent`
  - Reduced rings: Combine with `trace_mul_comm` and nilpotence criteria

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.LinearAlgebra.Contraction`: contraction pairing `contractLeft`
- `Mathlib.LinearAlgebra.Matrix.Charpoly.Coeff`: matrix trace properties (e.g., `trace_mul_comm`)
- `Mathlib.RingTheory.Finiteness.Prod`: finite modules, products
- `Mathlib.RingTheory.Finiteness.TensorProduct`: tensor products of finite modules
- `Mathlib.RingTheory.TensorProduct.Free`: bases for tensor products of free modules

**Domain Scope**:
- **Objects**: Modules over a commutative semiring/ring (`R`), especially finite/free modules
- **Maps**: Linear endomorphisms (`M →ₗ[R] M`), composable maps, tensor/product maps
- **Key structures**: Dual modules, tensor products, matrix representations, contraction pairings

---

This module formalizes the *intrinsic* trace of linear maps, emphasizing basis-independence and functorial behavior across standard constructions (tensor, product, dual, base change), while connecting to matrix theory and module-theoretic properties (rank, nilpotence, projections).