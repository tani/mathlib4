Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: t-Structures on (Pre)triangulated Categories**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `TStructure C` | `Type _ → Type _` (structure) | Defines a t-structure on a pretriangulated category `C`: pair of predicates `LE n`, `GE n` on objects, closed under isomorphisms, compatible with shifts, satisfying vanishing (`Hom(LE0, GE1) = 0`), monotonicity (`LE0 ⊆ LE1`, `GE1 ⊆ GE0`), and existence of distinguished triangles splitting objects into `LE0` and `GE1` parts. |
| `t.LE n X` | `C → ℤ → Prop` | Predicate: object `X` is *≤ n* for t-structure `t`. |
| `t.GE n X` | `C → ℤ → Prop` | Predicate: object `X` is *≥ n* for t-structure `t`. |
| `t.IsLE X n` | `Prop` (class) | Wrapper for `t.LE n X`, used for typeclass inference. |
| `t.IsGE X n` | `Prop` (class) | Wrapper for `t.GE n X`, used for typeclass inference. |
| `t.exists_triangle` | `∀ A n₀ n₁, n₀ + 1 = n₁ → ∃ triangle ...` | Generalization of `exists_triangle_zero_one`: any object `A` fits into a distinguished triangle with `LE n₀` and `GE n₁` parts. |
| `t.predicateShift_LE` | `PredicateShift (t.LE n) a = t.LE (a + n)` | Shift compatibility: shifting an object preserves the `LE` predicate at shifted degree. |
| `t.predicateShift_GE` | `PredicateShift (t.GE n) a = t.GE (a + n)` | Analogous to above for `GE`. |
| `t.LE_monotone` | `Monotone t.LE` | `LE` is monotone in degree: if `n ≤ m`, then `LE n ⊆ LE m`. |
| `t.GE_antitone` | `Antitone t.GE` | `GE` is antitone in degree: if `n ≤ m`, then `GE m ⊆ GE n`. |
| `mem_of_isLE`, `mem_of_isGE` | `[t.IsLE X n] → t.LE n X` | Projection lemmas from class instances to underlying predicates. |

---

#### **2. Naming Conventions**

- **Predicates**: `LE`, `GE` (for “less/equal” and “greater/equal”).
- **Class names**: `IsLE`, `IsGE` — follow Lean’s convention for property classes.
- **Lemma prefixes**:
  - `predicateShift_`: lemmas about compatibility with shift functors.
  - `LE_`, `GE_`: lemmas about monotonicity/antitonicity or closure properties.
  - `exists_triangle`: existence of truncation triangles.
- **Variables**: `t` for a t-structure, `X`, `Y` for objects, `n`, `n₀`, `n₁`, `a`, `n'` for integers.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `intro`, `exact`, `refine`, `obtain`, `cases` — basic proof construction.
- `rw`, `simp`, `dsimp` — rewriting and simplification (especially with `predicateShift_iff`, `shiftEquiv`, `Triangle.shift_distinguished`).
- `induction'` — structural induction on `ℕ` (for monotonicity/antitonicity proofs).
- `omega` — solving linear integer arithmetic goals (e.g., `a + n' = n`, `n₁ = n₀ + a`).
- `all_goals`, `simp only`, `funext` — for extensionality and uniform tactic application.
- `isomorphic_distinguished`, `Triangle.isoMk` — for manipulating distinguished triangles and triangle isomorphisms.

---

#### **4. Proof Logic**

- **Monotonicity/Antitonicity proofs**:
  - Define inductive property `H a` over `a : ℕ`.
  - Prove base case (`a = 0`) and step (`a = 1`) using shift compatibility and axioms `LE_zero_le`, `GE_one_le`.
  - Use induction + additive decomposition (`a + b = c`) to extend to all `a : ℕ`.
  - Translate integer inequality `n₀ ≤ n₁` into `n₁ = n₀ + a` for `a ≥ 0`.

- **Triangle existence**:
  - Reduce to `exists_triangle_zero_one` via shift: apply to `A⟦n₀⟧`, then shift triangle back using `Triangle.shiftFunctor` and unit isomorphism of shift equivalence.

- **Predicate shift lemmas**:
  - Use `mem_iff_of_iso` + shift unit isomorphism to relate shifted objects.
  - Apply closure under isomorphisms and shift compatibility axioms (`LE_shift`, `GE_shift`).

---

#### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.CategoryTheory.Shift.Predicate` — defines `PredicateShift`, shift compatibility.
  - `Mathlib.CategoryTheory.Triangulated.Pretriangulated` — defines pretriangulated categories, shift functors, distinguished triangles.

- **Assumptions on `C`**:
  - `[Category C]`, `[Preadditive C]`, `[HasZeroObject C]`, `[HasShift C ℤ]`
  - `[∀ n, (shiftFunctor C n).Additive]`
  - `[Pretriangulated C]`

- **Scope**:
  - Formalization of t-structures in the context of *pretriangulated* (not necessarily triangulated) categories.
  - Type-theoretic design: t-structure is a *structure*, not a typeclass, to allow multiple t-structures on the same category.

---

Let me know if you'd like a formalized summary in a specific format (e.g., for documentation, AI training, or proof planning).