### Technical Brief: Jordan-Hölder Theorem in Lean 4 (`JordanHolderLattice`)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `JordanHolderLattice` | `class JordanHolderLattice (X : Type u) [Lattice X]` | Abstract structure supporting Jordan-Hölder theorem; includes `IsMaximal`, `Iso`, and axioms (e.g., second isomorphism theorem). |
| `IsMaximal : X → X → Prop` | — | Generalized “maximal subobject” relation (e.g., $H \trianglelefteq K$ maximal normal). Axiomatized via strict inequality, sup-closure, and inf-duality. |
| `Iso : X × X → X × X → Prop` | — | Equivalence relation on factor pairs (e.g., $H/K \cong H'/K'$); symmetric, transitive, satisfies second isomorphism law. |
| `CompositionSeries X` | `abbrev CompositionSeries X := RelSeries (IsMaximal (X := X))` | Finite nonempty chain $x_0 < x_1 < \dots < x_n$ where each $x_i$ is maximal in $x_{i+1}$. Length = $n$. |
| `s.head`, `s.last` | `s 0`, `s (Fin.last _)` | Least and greatest elements of the series. |
| `Equivalent s₁ s₂` | `∃ f : Fin s₁.length ≃ Fin s₂.length, ∀ i, Iso (s₁ i, s₁ i.succ) (s₂ (f i), s₂ (f i.succ))` | Series are equivalent if their successive factor pairs are pairwise isomorphic via a bijection on indices. |
| `jordan_holder` | `s₁.head = s₂.head → s₁.last = s₂.last → Equivalent s₁ s₂` | **Main theorem**: Any two composition series with same endpoints are equivalent. |

**Auxiliary theorems**:
- `isMaximal_inf_left/right_of_isMaximal_sup`: Duality of maximality under sup/inf.
- `second_iso_of_eq`, `iso_refl`: Derived properties of `Iso`.
- `exists_last_eq_snoc_equivalent`: Refinement lemma used in induction step of `jordan_holder`.
- `length_eq`: Equivalent series have same length (follows from `Fintype.card_congr`).
- `snoc_snoc_swap`: Swapping two successive extensions yields equivalent series (key for handling non-uniqueness of extensions).

---

#### **2. Naming Conventions**

| Pattern | Examples | Meaning |
|--------|----------|---------|
| `isMaximal_*` | `isMaximal_inf_left_of_isMaximal_sup`, `isMaximal_of_eq_inf` | Properties of `IsMaximal`. |
| `*_eq_*` | `sup_eq_of_isMaximal`, `inf_eq_left`, `sup_comm` | Rewrites using lattice identities under maximality assumptions. |
| `*_of_*` | `second_iso_of_eq`, `eq_snoc_eraseLast`, `mem_eraseLast_of_ne_of_mem` | Construction or property derived from a hypothesis. |
| `*_snoc_*` | `snoc_eraseLast_last`, `snoc_snoc_swap`, `snoc` | Operations appending an element to a series. |
| `*_eraseLast_*` | `last_eraseLast_le`, `mem_eraseLast`, `eraseLast` | Operations removing the last element. |
| `*_last` | `le_last`, `head_le`, `last_mem` | Properties involving extremal elements. |
| `*_castSucc`, `*_succ` | `castSucc`, `succ`, `Fin.succ_castSucc` | Index manipulation in `Fin` types. |
| `*_Equiv_*` | `finSumFinEquiv`, `finSuccEquivLast`, `Equiv.swap` | Use of equivalence constructions for index bijections. |

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw`, `simp`, `dsimp`: Rewriting and simplification (especially with lattice and `Fin` lemmas).
- `exact`, `refine`, `convert`: Goal-directed proof construction.
- `induction'`: Structural induction on `length`, often with `generalizing`.
- `by_cases`, `by_contra`, `contradiction`: Case splits and contradiction reasoning.
- `ext`: Extensionality for functions/sets (e.g., `ext x`, `ext i`).
- `convert`, `congr_arg`: Congruence reasoning for equality of composite terms.
- `calc`: Chain of equalities (e.g., in `second_iso_of_eq`, `length_eq`).
- `Fin.lastCases`, `Fin.addCases`: Case analysis on `Fin` indices.
- `simpa using ...`: Simplify using a hypothesis.
- `have`, `set`, `obtain`: Local assumptions and destructuring.

**Notable absence**: No heavy use of `ring`, `linarith`, or `aesop`; proofs are largely algebraic/lattice-theoretic.

---

#### **4. Proof Logic**

- **Inductive structure**: Main proof of `jordan_holder` proceeds by induction on `s₁.length`.
  - **Base case (`length = 0`)**: Series are constant; equality follows from `head = last` and subsingleness.
  - **Inductive step**:
    1. Show `s₂.length > 0` (via `length_pos_of_head_eq_head_of_last_eq_last_of_length_pos`).
    2. Apply `exists_last_eq_snoc_equivalent` to `s₁` to write it as `snoc t s₁.last`.
    3. Apply induction hypothesis to `t` and `s₂.eraseLast` (same head/last, shorter length).
    4. Use `Equivalent.trans`, `snoc`, and `iso_refl` to lift equivalence back to full series.
- **Key lemmas**:
  - `exists_last_eq_snoc_equivalent`: Enables decomposition of a series into a prefix + one extension.
  - `snoc_snoc_swap`: Handles non-uniqueness of extensions (e.g., swapping two maximal extensions).
  - `second_iso`: Provides the isomorphism needed to relate different extensions (e.g., $H/(H \wedge K) \cong (H \vee K)/K$).
- **Symmetry/Transitivity**: `Iso` is made symmetric/transitive via `attribute [symm]`, `[trans]`, enabling `Equivalent.symm`, `trans`.

---

#### **5. Imports & Scope**

**Primary imports**:
- `Mathlib.Order.Lattice`: Lattice theory (sup/inf, order).
- `Mathlib.Data.List.Sort`: Sorting and `Sorted`/`Nodup` for `toList`.
- `Mathlib.Logic.Equiv.Fin`: `Fin` bijections (`finSumFinEquiv`, `finSuccEquivLast`, `Equiv.swap`).
- `Mathlib.Logic.Equiv.Functor`: `Functor.mapEquiv` for `Option`.
- `Mathlib.Data.Fintype.Card`: `Fintype.card_congr` (used in `length_eq`).
- `Mathlib.Order.RelSeries`: Defines `RelSeries R` = finite sequences where consecutive pairs satisfy `R`; used for `CompositionSeries`.

**Domain scope**:
- Abstracts over algebraic structures (groups, modules) via `JordanHolderLattice`.
- Not tied to specific algebraic theory — designed for reuse (e.g., `Subgroup G`, `Submodule R M` as instances).
- **TODO**: Clarify instance design (e.g., avoid clashes between `ModularLattice` and module-specific `JordanHolderLattice`).

---

### Summary

This file formalizes the Jordan-Hölder theorem in a highly abstract setting (`JordanHolderLattice`), enabling uniform proofs for groups and modules. The core ideas—maximality, factor isomorphism, and series refinement—are cleanly axiomatized, and the proof leverages careful index manipulation over `Fin` and lattice-theoretic duality. The design prioritizes modularity and reuse, though instance management remains an open design question.