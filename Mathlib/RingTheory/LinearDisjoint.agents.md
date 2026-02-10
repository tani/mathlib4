Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Linearly Disjoint Subalgebras in Lean 4**

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `Subalgebra.LinearDisjoint A B` | `Prop`: Two subalgebras `A, B ≤ S` are *linearly disjoint* if their underlying submodules are linearly disjoint (`Submodule.LinearDisjoint`). |
| `Subalgebra.LinearDisjoint.mulMap H` | `A ⊗[R] B ≃ₐ[R] A ⊔ B`: Natural algebra isomorphism induced by multiplication in `S`, when `A` and `B` are linearly disjoint (and `S` commutative). |
| `Subalgebra.LinearDisjoint.linearIndependent_left_of_flat H [Module.Flat R B]` | If `A, B` are linearly disjoint and `B` is flat, then any `R`-linearly independent family in `A` remains `B`-linearly independent (in opposite ring). |
| `Subalgebra.LinearDisjoint.of_basis_left_op` | Converse: if a basis of `A` is `B.op`-linearly independent, then `A, B` are linearly disjoint. |
| `Subalgebra.LinearDisjoint.linearIndependent_right_of_flat H [Module.Flat R A]` | Symmetric version: `R`-lin. ind. families in `B` remain `A`-lin. ind. if `A` is flat. |
| `Subalgebra.LinearDisjoint.of_basis_right` | Converse: if a basis of `B` is `A`-lin. ind., then `A, B` are linearly disjoint. |
| `Subalgebra.LinearDisjoint.linearIndependent_mul_of_flat H (hf : Flat A ∨ Flat B)` | If `A, B` are linearly disjoint and one is flat, then products `{a_i * b_j}` of lin. ind. families remain `R`-lin. ind. |
| `Subalgebra.LinearDisjoint.of_basis_mul` | Converse: if `{a_i}`, `{b_j}` are bases and `{a_i * b_j}` is lin. ind., then `A, B` are linearly disjoint. |
| `Subalgebra.LinearDisjoint.isDomain_of_injective` | If `A, B` embed into a domain `S` with linearly disjoint images, then `A ⊗[R] B` is a domain. |
| `Subalgebra.LinearDisjoint.of_isField H` | If `A ⊗[R] B` is a field, then `A, B` are linearly disjoint. |
| `Subalgebra.LinearDisjoint.of_isField'` | Stronger: if `A ⊗[R] B` is a field, then *any* injective embeddings of `A, B` into an `R`-algebra `S` have linearly disjoint images. |
| `Algebra.TensorProduct.not_isField_of_transcendental` | If `A, B` are flat and *both* transcendental over `R`, then `A ⊗[R] B` is *not* a field. |
| `Algebra.TensorProduct.isAlgebraic_of_isField` | If `A ⊗[R] B` is a field and `A, B` are flat, then at least one of `A, B` is algebraic over `R`. |
| `Subalgebra.LinearDisjoint.sup_free_of_free` | If `A, B` are linearly disjoint and free over `R`, then their compositum `A ⊔ B` is free over `R`. |
| `Subalgebra.LinearDisjoint.rank_sup_of_free` | If `A, B` are linearly disjoint and free, then `rank(A ⊔ B) = rank(A) * rank(B)`. |
| `Subalgebra.LinearDisjoint.of_finrank_sup_of_free` | Converse: if `A, B` are free of finite rank and `finrank(A ⊔ B) = finrank(A) * finrank(B)`, then `A, B` are linearly disjoint. |
| `Subalgebra.LinearDisjoint.adjoin_rank_eq_rank_left/right` | If `A, B` are linearly disjoint, and one is free and the other flat, then `[B[A] : B] = [A : R]` (resp. `[A[B] : A] = [B : R]`). |
| `Subalgebra.LinearDisjoint.of_finrank_coprime_of_free` | If `rank(A)` and `rank(B)` are coprime (and some freeness holds), then `A, B` are linearly disjoint. |
| `Subalgebra.LinearDisjoint.inf_eq_bot_of_commute` | If `A, B` are linearly disjoint and elements commute, then `A ⊓ B = ⊥` under technical conditions. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `linearIndependent_`: Concerned with linear independence of families.
  - `of_basis_`: Characterizations using bases.
  - `of_flat`, `of_le_`, `of_finrank_`, `of_commute`: Hypothesis-driven lemmas.
  - `isDomain`, `isField`: Properties of tensor products.
  - `mulMap`, `include_range`: Constructive maps (multiplication, inclusions).
- **Suffixes**:
  - `_left`, `_right`: Asymmetric roles (e.g., flatness of left/right factor).
  - `_op`: Opposite ring/module (used for noncommutative contexts).
  - `_commute`: When commutativity of elements is required.
  - `_of_flat`, `_of_injective`: Assumption-based naming.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw`, `simp`, `simp_rw`: Rewriting and simplification (especially with `LinearIndependent`, `mulMap`, `tensorProduct`).
- `exact`, `refine`, `apply`: Direct proof construction.
- `change`, `convert`: Goal manipulation.
- `nontriviality`: To assume nontriviality of rings/modules.
- `lift_rank_le_of_injective`, `rank_mono`: Rank-based reasoning.
- `algebraize_only`: Custom tactic (likely from `Mathlib.RingTheory`) for simplifying algebraic expressions.
- `aesop`, `ring`: For commutative ring identities (implied by usage of `mul_comm`, etc.).
- `equivOfEq`, `algEquiv`, `equivOfEq`: For constructing algebra isomorphisms.

---

#### **4. Proof Logic**

- **Inductive/structural style**: Most proofs follow standard module/tensor product logic:
  - Reduce to submodule-level (`Submodule.LinearDisjoint`).
  - Use flatness to lift linear independence.
  - Apply basis criteria (`of_basis_*`) to prove/disprove disjointness.
  - Use injectivity of multiplication map (`mulMap`) ↔ linear disjointness (in commutative case).
- **Key logical flow**:
  1. **Equivalence via tensor product**: Many results hinge on `A ⊗[R] B` being a domain/field or having injective multiplication map.
  2. **Flatness + linear independence ⇒ preservation**: Flatness ensures tensoring preserves monomorphisms, enabling lifting of independence.
  3. **Basis ↔ disjointness**: Basis-based characterizations are common (forward/backward).
  4. **Symmetry via commutativity**: In noncommutative settings, symmetry requires `Commute` assumptions; in commutative rings, symmetry is automatic.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.LinearAlgebra.Basis.VectorSpace`
- `Mathlib.LinearAlgebra.Dimension.FreeAndStrongRankCondition`
- `Mathlib.LinearAlgebra.LinearDisjoint` (core linear disjointness for submodules)
- `Mathlib.LinearAlgebra.TensorProduct.Subalgebra`
- `Mathlib.RingTheory.TensorProduct.Finite`, `Nontrivial`
- `Mathlib.RingTheory.Adjoin.Dimension`
- `Mathlib.RingTheory.IntegralClosure.*`
- `Mathlib.RingTheory.Localization.FractionRing`
- `Mathlib.Algebra.Algebra.Subalgebra.*` (including `MulOpposite`, `Rank`)

**Scope**:
- Generalizes linear disjointness from modules to subalgebras.
- Bridges module-theoretic properties (flatness, freeness, rank) with ring-theoretic ones (domain, field, transcendence).
- Supports both noncommutative (via `Commute` assumptions) and commutative settings.

---

Let me know if you'd like a formalized summary (e.g., for a documentation page or a `README.md`), or a visualization of the dependency graph of the main theorems.