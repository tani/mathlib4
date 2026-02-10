### Technical Brief: Lexicographic Order on Pi Types in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `Pi.Lex r s x y` | `Prop`: Lexicographic relation on `Π i, β i`, where `r : ι → ι → Prop` orders the index type `ι`, and `s : ∀ i, β i → β i → Prop` orders each fiber. Defined as: `∃ i, (∀ j, r j i → x j = y j) ∧ s (x i) (y i)` |
| `Πₗ i, β i` | Notation for the type synonym `Π i, β i` equipped with `Pi.Lex (· < ·) (· < ·)` as the strict order. |
| `toLex`, `ofLex` | Identity functions between `Π i, β i` and `Lex (∀ i, β i)`. Proven to be inverses and satisfy `toLex_apply`, `ofLex_apply`. |
| `lex_lt_of_lt_of_preorder` | If `x < y` pointwise (in the product order), and `r` is well-founded, then `x < y` in the lexicographic order. Used to lift pointwise strict inequality to lex order. |
| `lex_lt_of_lt` | Specialization of above when each `β i` has a `PartialOrder`, using antisymmetry. |
| `isTrichotomous_lex` | Proves that if each `β i` is trichotomous and `r` is well-founded, then the lexicographic order is trichotomous. Key for constructing linear orders. |
| `instance Lex.isStrictOrder` | Shows `· < ·` on `Πₗ i, β i` is a strict order (irreflexive, transitive) under `LinearOrder ι`, `PartialOrder (β i)`, and `WellFoundedLT ι`. |
| `instance LinearOrder` | Constructs a `LinearOrder` on `Πₗ i, β i` when `ι` is linearly ordered, well-founded under `<`, and each `β i` is linearly ordered. Uses `linearOrderOfSTO` with trichotomy from `isTrichotomous_lex`. |
| `toLex_monotone`, `toLex_strictMono` | `toLex` preserves order (`Monotone`) and strict order (`StrictMono`) under the assumptions above. |
| `lt_toLex_update_self_iff`, `toLex_update_lt_self_iff`, etc. | Characterizations of how updating a single coordinate affects the lexicographic order. E.g., `toLex x < toLex (update x i a) ↔ x i < a`. |
| `instance DenselyOrdered` | If `ι` is preordered, each `β i` is densely ordered, then `Πₗ i, β i` is densely ordered. |
| `Lex.noMaxOrder'`, `NoMaxOrder`, `NoMinOrder` instances | Show that `Πₗ i, β i` inherits `NoMaxOrder`/`NoMinOrder` from fibers and index under suitable conditions (e.g., `WellFoundedLT ι`, `Nonempty ι`). |
| `lex_desc` | Swapping two indices `i ≤ j` where `f j < f i` yields a strictly smaller function in lexicographic order. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `lex_`: Relates to lexicographic properties (`lex_lt_of_lt`, `lex_desc`).
  - `toLex`, `ofLex`: Conversion functions between underlying and lex-ordered type.
  - `isTrichotomous_lex`: Property of the lex order.
- **Suffixes**:
  - `_self_iff`: When comparing a function with an updated version at the same index.
  - `_monotone`, `_strictMono`: Monotonicity/strict monotonicity of `toLex`.
  - `_of_lt`, `_of_preorder`: Deriving lex order from pointwise order.
- **Pattern**: `toLex_[op]_[self]_iff` for update-based equivalences.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp_rw`: Rewriting with simplification lemmas (e.g., `lt_toLex_update_self_iff`).
- `rcases`, `cases'`: For destructuring existential or disjunctive hypotheses.
- `intro`, `intro h`, `rintro`: Introducing hypotheses and structured destructuring.
- `contrapose!`: Contrapositive reasoning with negation simplification.
- `by_contra`: Proof by contradiction.
- `rwa`, `rw [update_self]`, `rwa [Function.update_self]`: Rewriting with update lemmas.
- `exact`, `exacts`: Direct proof construction (especially in `isTrichotomous_lex`).
- `have`, `obtain`: Intermediate lemma introduction.
- `simpa only [...] using`: Simplify goal using specific lemmas.

---

#### **4. Proof Logic**

- **Inductive/Well-founded reasoning**: Most proofs rely on `WellFounded r` to pick minimal indices where functions differ (`wf.min`, `has_min`). This is central to:
  - Proving trichotomy (`isTrichotomous_lex`)
  - Lifting pointwise inequalities (`lex_lt_of_lt_of_preorder`)
  - Showing strict monotonicity of `toLex`
- **Case analysis on index comparison**: In `lex_lt_of_lt`, `trans`, and `lex_desc`, proofs split on relative positions of indices (`lt_trichotomy`, `h₁ : i ≤ j`).
- **Update-based reasoning**: Many lemmas reduce to analyzing `update x i a`, using `update_self`, `update_of_ne`, and decidability of equality (`DecidableEq ι`) to isolate the differing index.
- **Order-theoretic lifting**: Properties like `LinearOrder`, `DenselyOrdered`, `NoMaxOrder` are lifted from components using:
  - Trichotomy + well-foundedness → linear order.
  - Density in fibers + well-founded index → density in product.
  - `exists_gt`/`exists_lt` in fibers → `NoMaxOrder`/`NoMinOrder` in lex order.

---

#### **5. Imports & Scope**

**Primary Imports**:
- `Mathlib.Order.WellFounded`: For `WellFounded`, `has_min`, `min`, etc.
- `Mathlib.Tactic.Common`: General tactics (e.g., `aesop`, `ring`, `norm_num` — though not heavily used here).

**Related Files (cited in docstring)**:
- `Data.Finset.Colex`: Colexicographic order.
- `Data.List.Lex`: Lex order on lists.
- `Data.Sigma.Order`, `Data.PSigma.Order`: Lex order on sigma types.
- `Data.Prod.Lex`: Lex order on products.

**Scope**:
- Formalizes lexicographic order on dependent products (`Π i, β i`) over a well-ordered index type.
- Builds a hierarchy of order-theoretic structures: `LT`, `Preorder`, `PartialOrder`, `LinearOrder`, `DenselyOrdered`, `BoundedOrder`, `NoMaxOrder`, `NoMinOrder`.
- Assumes classical logic (`Classical.decRel`) for linear order construction.

--- 

This module is foundational for constructing well-founded or linear orders on function spaces, especially in contexts like ordinal analysis, transfinite induction, or formalizing recursive definitions over well-ordered types.