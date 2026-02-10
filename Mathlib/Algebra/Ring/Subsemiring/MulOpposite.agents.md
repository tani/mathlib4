### Technical Metadata Brief: Subsemiring Opposites in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `op` | `Subsemiring R → Subsemiring Rᵐᵒᵖ` | Maps a subsemiring of `R` to its *opposite* subsemiring in `Rᵐᵒᵖ`, via `MulOpposite.op` on the underlying additive monoid. |
| `unop` | `Subsemiring Rᵐᵒᵖ → Subsemiring R` | Inverse construction: pulls back a subsemiring of `Rᵐᵒᵖ` to one of `R`. |
| `mem_op` | `x ∈ S.op ↔ x.unop ∈ S` | Membership characterization for `op`. |
| `mem_unop` | `x ∈ S.unop ↔ MulOpposite.op x ∈ S` | Membership characterization for `unop`. |
| `unop_op`, `op_unop` | `S.op.unop = S`, `S.unop.op = S` | Inverse laws: `op` and `unop` are mutual inverses. |
| `opEquiv` | `Subsemiring R ≃o Subsemiring Rᵐᵒᵖ` | Order-isomorphism (lattice equivalence) between subsemirings of `R` and `Rᵐᵒᵖ`. |
| `op_le_iff`, `le_op_iff`, `op_le_op_iff`, `unop_le_unop_iff` | Various order-theoretic equivalences | Characterize inclusion relations under `op`/`unop`. |
| `op_bot`, `op_top`, `unop_bot`, `unop_top` | Preservation of bottom/top under `op`/`unop` | Show `op` and `unop` preserve least/greatest elements. |
| `op_sup`, `unop_sup`, `op_inf`, `unop_inf` | Preservation of sup/inf (join/meet) | Show `op`/`unop` preserve binary lattice operations. |
| `op_sSup`, `unop_sSup`, `op_sInf`, `unop_sInf` | Preservation of arbitrary sup/inf | Extend above to arbitrary suprema/infima. |
| `op_iSup`, `unop_iSup`, `op_iInf`, `unop_iInf` | Preservation of indexed sup/inf | Extend to indexed suprema/infima. |
| `op_closure`, `unop_closure` | Behavior on `closure` | Relate closure of sets under `op`/`unop`. |
| `addEquivOp` | `S ≃+ S.op` | Additive equivalence between a subsemiring and its opposite. |
| `ringEquivOpMop` | `S ≃+* (S.op)ᵐᵒᵖ` | Ring equivalence between `S` and the opposite of its opposite. |
| `mopRingEquivOp` | `Sᵐᵒᵖ ≃+* S.op` | Ring equivalence between opposite of `S` and opposite subsemiring. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `op_`: for constructions going *to* the opposite semiring (`op`, `op_le_iff`, `op_sup`, etc.)
  - `unop_`: for constructions going *from* the opposite semiring (`unop`, `unop_le_unop_iff`, `unop_sup`, etc.)
- **Suffixes**:
  - `_op`, `_unop`: for equivalences or functions involving `op`/`unop` on subsemirings.
  - `_equivOp`, `_equivOpMop`: for equivalences involving `op` or `op`+`mop`.
- **`simps!` attributes**: Used to generate simplification lemmas for projections (e.g., `coe_op`, `coe_unop`).
- **`norm_cast`**: Applied to `coe_op`, `coe_unop` to help with coercion normalization.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `rfl`: For trivial equalities (e.g., `unop_op`, `op_unop`, `mem_op`, `mem_unop`).
  - `simp_rw`: For rewriting using definitional equalities and lemmas (e.g., in `op_closure`, `unop_closure`).
  - `congr`: To reduce equality goals to pointwise equality (e.g., in `op_closure`).
  - `exact`, `apply`, `intro`, `cases`: Standard proof scripting.
- **High-level automation**:
  - `simp`: Used implicitly via `simps!` and in many proofs (e.g., `op_bot`, `op_top`).
  - `rw [← op_inj, ...]`: Rewriting using injectivity or inverse laws.
  - `mul_op_surjective.forall`: Leverages surjectivity of `op`/`unop` to reduce universal statements.

---

#### **4. Proof Logic**

- **Structure**:
  - Most proofs follow a **two-step pattern**:
    1. Reduce to membership or inclusion statements using `mem_op`/`mem_unop`.
    2. Apply properties of `op`/`unop` on the underlying `MulOpposite` (e.g., `MulOpposite.op_surjective.forall`).
  - For lattice-theoretic properties (`sup`, `inf`, `sSup`, `iSup`, etc.), rely on the fact that `opEquiv` is an **order-isomorphism**, and use lemmas like `map_sup`, `map_sSup_eq_sSup_symm_preimage`, etc.
  - For closure properties, reduce to `sInf`/`sSup` definitions and use preimage under `op`/`unop`.
- **Induction**: Not used here—proofs are mostly definitional or rely on existing structure (e.g., `MulOpposite` lemmas).
- **Equational reasoning**: Heavy use of `rfl`, `congr`, and `simp` to manipulate equalities involving coercions and projections.

---

#### **5. Imports & Scope**

- **Core dependencies**:
  - `Mathlib.Algebra.Group.Submonoid.MulOpposite`: Provides `op`, `unop`, `equivOp`, and related lemmas for submonoids.
  - `Mathlib.Algebra.Ring.Subsemiring.Basic`: Defines `Subsemiring`, its lattice structure, closure, etc.
  - `Mathlib.Algebra.Ring.Opposite`: Defines `MulOpposite`, `op`, `unop`, and basic properties.

- **Scope**:
  - This file formalizes the **lattice-theoretic and algebraic equivalence** between subsemirings of a semiring `R` and those of its opposite `Rᵐᵒᵖ`.
  - It extends known results for submonoids (via `MulOpposite`) to subsemirings, preserving additive and multiplicative structure.
  - The main result is `opEquiv : Subsemiring R ≃o Subsemiring Rᵐᵒᵖ`, an order-isomorphism.

---

Let me know if you'd like a diagram of the equivalences or a formalization roadmap for related structures (e.g., subrings, subalgebras).