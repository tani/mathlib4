### Technical Metadata Brief: Characters of Finite-Dimensional Representations in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `character` | `character (V : FDRep k G) (g : G) := LinearMap.trace k V (V.ρ g)` | Defines the character of a representation as the trace of the action of `g`. |
| `char_mul_comm` | `V.character (h * g) = V.character (g * h)` | Shows characters are invariant under swapping multiplication order (trace cyclicity). |
| `char_one` | `V.character 1 = Module.finrank k V` | Character at identity equals dimension of representation. |
| `char_tensor` | `(V ⊗ W).character = V.character * W.character` | Character of tensor product is pointwise product of characters. |
| `char_iso` | `V ≅ W ⇒ V.character = W.character` | Isomorphic representations have identical characters. |
| `char_conj` | `V.character (h * g * h⁻¹) = V.character g` | Characters are class functions (constant on conjugacy classes). |
| `char_dual` | `(dual V).character g = V.character g⁻¹` | Character of dual rep at `g` equals original at `g⁻¹`. |
| `char_linHom` | `(linHom V W).character g = V.character g⁻¹ * W.character g` | Character of internal hom is product of dual char and target char. |
| `average_char_eq_finrank_invariants` | `⅟|G| • ∑ g, V.character g = finrank k (invariants V)` | Average of character equals dimension of invariant subspace. |
| `char_orthonormal` | `⅟|G| • ∑ g, V.char g * W.char g⁻¹ = if V ≅ W then 1 else 0` | Orthogonality relation for irreducible characters over algebraically closed fields with coprime char. |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `char_`: All character-related theorems start with `char_`.
  - `is_`, `invariants_`, `average_`, `linHom_`, `dual_`: Standard module/rep-theoretic prefixes.
- **Suffixes:**
  - `_comm`: Commutativity properties (`char_mul_comm`, `trace_mul_comm`).
  - `_iso`: Behavior under isomorphism (`char_iso`, `char_dual`, `char_tensor`).
  - `_Equiv_`: Equivalences involving invariants or hom-spaces (`linHom.invariantsEquivFDRepHom`, `FDRep.endMulEquiv_comp_ρ`).
- **Function names:**
  - `character`, `invariants`, `linHom`, `dual`, `of`, `ρ`: Standard categorical/representation-theoretic notation.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp only [...]`: Simplification with explicit lemmas (e.g., `char_mul_comm`, `trace_mul_comm`).
- `rw [...]`: Rewriting using definitions or lemmas (e.g., `char_dual`, `char_tensor`, `char_iso`).
- `convert ...`: Used when equality holds up to definitional equality or known lemmas (`trace_tensorProduct'`).
- `ext g`: Extensionality for functions (proving two functions equal by extension).
- `erw [...]`: Eager rewriting (used where definitional issues arise, e.g., `linHom.invariantsEquivFDRepHom`).
- `rw_mod_cast [...]`: Rewriting with typeclass casting support (e.g., `finrank_hom_simple_simple`).
- `exact ...`, `apply ...`, `intro ...`: Basic proof automation.
- `conv_lhs => ...`: Convolution tactic for local rewriting in expressions.

---

#### **4. Proof Logic**

- **Structure of proofs:**
  - Most proofs follow a pattern: *unfold definition → apply known trace/rep-theoretic identities → simplify*.
  - For `char_orthogonality`, the proof uses:
    1. **Reduction**: Rewrite summand using `char_tensor` and `char_dual`.
    2. **Average → invariants**: Apply `average_char_eq_finrank_invariants`.
    3. **Equivariance identification**: Use `linHom.invariantsEquivFDRepHom` to identify invariants with `G`-equivariant maps.
    4. **Schur’s Lemma**: Apply `finrank_hom_simple_simple` to get Kronecker delta based on isomorphism.

- **Inductive or case-based reasoning**: Not prominent here; mostly algebraic manipulation and categorical equivalences.

- **Key logical tools**:
  - `trace_mul_comm`, `trace_transpose'`, `trace_tensorProduct'`: Trace identities.
  - `FDRep.Iso.conj_ρ`, `dualTensorIsoLinHom`: Structural isomorphisms in `FDRep`.
  - `Simple` typeclass + `Schur’s Lemma` for irreducibility.

---

#### **5. Imports**

Core dependencies defining the module’s scope:
- `Mathlib.RepresentationTheory.FDRep`: Main framework for finite-dimensional representations.
- `Mathlib.LinearAlgebra.Trace`: Trace theory and identities.
- `Mathlib.RepresentationTheory.Invariants`: Invariant subspace and average projection tools.

Additional implicit dependencies:
- `CategoryTheory.MonoidalCategory`: Tensor structure on `FDRep`.
- `CategoryTheory.Simple`: For irreducibility (`Simple V`).
- `Module`, `LinearMap`, `Group`, `Grp`: Basic algebraic structures.

---

### Summary

This file formalizes foundational character theory for finite-dimensional representations of groups over fields where the characteristic does not divide the group order. It emphasizes categorical structure (tensor, dual, hom), trace properties, and culminates in the orthogonality of irreducible characters — a cornerstone of representation theory. The proofs rely heavily on Lean’s `conv` and `rw_mod_cast` tactics to manage definitional subtleties in categorical constructions.