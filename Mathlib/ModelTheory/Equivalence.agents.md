### Technical Brief: Equivalence of Formulas in First-Order Logic (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Imp` | `T.Imp φ ψ := T ⊨ᵇ φ.imp ψ` | Semantic implication: `φ` implies `ψ` in all models of `T`. |
| `Iff` | `T.Iff φ ψ := T ⊨ᵇ φ.iff ψ` | Semantic equivalence: `φ` and `ψ` have identical truth values in all models of `T`. |
| `iff_iff_imp_and_imp` | `(φ ⇔[T] ψ) ↔ (φ ⟹[T] ψ) ∧ (ψ ⟹[T] φ)` | Connects semantic equivalence to mutual implication. |
| `imp_antisymm` | `(φ ⟹[T] ψ) → (ψ ⟹[T] φ) → φ ⇔[T] ψ` | Antisymmetry of implication under equivalence. |
| `iffSetoid` | `T.Iff` forms a `Setoid` on `L.BoundedFormula α n` | Enables quotient construction (TODO: Boolean algebra structure). |
| `realize_bd_iff`, `realize_iff`, `models_sentence_iff` | Equivalence of realizability under `h : φ ⇔[T] ψ` | Ensures semantic equivalence preserves truth in models. |
| `Iff.all`, `Iff.ex`, `Iff.not`, `Iff.imp` | Closure of `⇔[T]` under quantifiers and connectives | Shows `⇔[T]` is a congruence for first-order syntax. |
| `BoundedFormula.iff_not_not`, `BoundedFormula.imp_iff_not_sup`, etc. | Classical tautologies lifted to semantic equivalence | Enables Boolean algebra reasoning modulo `T`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_` (e.g., `IsRefl`, `IsSymm`, `IsTrans`) — used for typeclass instances encoding relational properties.
  - `realize_` (e.g., `realize_imp`, `realize_iff`) — for semantics of formulas in structures.
  - `imp_`, `inf_`, `sup_`, `not_`, `all_`, `ex_` — for operations on formulas (implication, meet, join, negation, universal/existential closure).
- **Suffixes**:
  - `_iff` — equivalence between two statements (e.g., `sup_imp_iff`, `inf_imp_iff`).
  - `_left`, `_right` — projection lemmas for binary operations (e.g., `inf_imp_left`, `sup_imp_right`).
  - `_liftAt`, `_all`, `_ex` — for formula transformations and quantifier binding.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `simp only [...]` | Simplify using definitional equalities and lemmas (e.g., `BoundedFormula.realize_*`). |
| `rw [...]` | Rewrite using equivalences like `realize_iff`, `realize_all`, etc. |
| `exact ...` | Directly apply hypotheses or previously proven lemmas. |
| `intro ...` / `intros` | Introduce variables and hypotheses in implication/forall proofs. |
| `fun M v xs => ...` | Lambda abstraction over models and assignments (standard in semantics). |
| `forall_congr'`, `exists_congr` | Congruence rules for quantifiers under equivalence. |
| `not_congr` | Propagate equivalence through negation. |
| `apply ...` / `exact ...` | For constructing functions/proofs in implication chains. |
| `aesop` (not present here, but implied by `simp`-heavy style) | Likely used in more complex automation (absent in this file). |

---

#### **4. Proof Logic**

- **Semantic reasoning**: Proofs are *model-theoretic* — they reason about realizability in arbitrary models `M ⊨ T`.
- **Structure of proofs**:
  - Most lemmas follow the pattern:  
    `fun M v xs => [simplify using realizability lemmas]`
  - Quantifier lemmas (`all`, `ex`) use `forall_congr'` / `exists_congr` + `realize_bd_iff`.
  - Congruence lemmas (`Iff.imp`, `Iff.not`, etc.) rely on propositional congruences (`imp_congr`, `not_congr`) and semantic equivalence.
- **Equivalence relation proofs**:
  - Reflexivity: `fun _ _ _ => id` or `by rw [realize_iff]`
  - Symmetry: `rw [comm]` + `← realize_iff`
  - Transitivity: compose implications via function composition or logical chaining.

---

#### **5. Imports & Scope**

- **Primary import**:  
  `import Mathlib.ModelTheory.Satisfiability`  
  → Provides `ModelsBoundedFormula`, `⊨ᵇ`, and semantics of formulas/sentences.

- **Key open namespaces**:
  - `Cardinal`, `CategoryTheory`, `FirstOrder`, `FirstOrder.Language`, `FirstOrder.Language.Theory`
  - `BoundedFormula`, `Formula` — for syntax-level operations.

- **Scope notation**:
  - `φ ⟹[T] ψ`, `φ ⇔[T] ψ` — scoped under `FirstOrder` for readability.

---

#### **6. TODO & Future Work**

- Define `L.BoundedFormula α n / ⇔[T]` and prove it carries a Boolean algebra structure.
- Extend to `L.Formula α` (unbounded formulas) — currently mostly duplicated via `BoundedFormula` lifts.
- Connect to proof-theoretic equivalence (e.g., derivability in a deductive system).

--- 

This file formalizes *semantic* logical equivalence and implication in first-order logic, laying groundwork for model-theoretic reasoning and algebraic structures on formulas modulo equivalence.