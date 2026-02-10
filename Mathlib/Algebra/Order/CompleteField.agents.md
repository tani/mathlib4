### Technical Brief: Conditionally Complete Linear Ordered Fields in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ConditionallyCompleteLinearOrderedField` | `class` extending `LinearOrderedField α`, `ConditionallyCompleteLinearOrder α` | Axiomatizes the reals: a linearly ordered field that is conditionally complete (i.e., every nonempty bounded-above subset has a supremum). |
| `cutMap β a` | `Set β` | For `a : α`, the image under `Rat.cast : ℚ → β` of rationals `< a`. Models “rationals below `a`” in `β`. |
| `inducedMap α β x` | `β` | `sSup (cutMap β x)`. The canonical map from an archimedean `α` to a conditionally complete `β`, defined via supremum of rational cuts. |
| `inducedAddHom α β` | `α →+ β` | Additive group homomorphism version of `inducedMap`. |
| `inducedOrderRingHom α β` | `α →+*o β` | Ordered ring homomorphism version of `inducedMap`. Constructed using `mkRingHomOfMulSelfOfTwoNeZero`. |
| `inducedOrderRingIso β γ` | `β ≃+*o γ` | Ordered ring isomorphism between two conditionally complete linearly ordered fields. |
| `inducedMap_zero`, `inducedMap_one` | `inducedMap α β 0 = 0`, `inducedMap α β 1 = 1` | Normalization of the induced map on constants. |
| `inducedMap_add` | `inducedMap α β (x + y) = inducedMap α β x + inducedMap α β y` | Additivity of the induced map. |
| `inducedMap_mono` | `x ≤ y → inducedMap x ≤ inducedMap y` | Monotonicity of the induced map. |
| `coe_lt_inducedMap_iff` | `(q : β) < inducedMap α β a ↔ (q : α) < a` | Characterizes strict inequality with rationals in codomain. |
| `inducedMap_inducedMap` | `inducedMap β γ (inducedMap α β a) = inducedMap α γ a` | Transitivity / functoriality of induced maps. |
| `inducedMap_inv_self` | `inducedMap γ β (inducedMap β γ b) = b` | Inverse property of induced maps between conditionally complete fields. |
| `le_inducedMap_mul_self_of_mem_cutMap`, `exists_mem_cutMap_mul_self_of_lt_inducedMap_mul_self` | Lemmas for multiplicativity proof | Technical lemmas to show `inducedMap(x²) = inducedMap(x)²`, needed for ring homomorphism. |
| `uniqueOrderRingHom` | `Unique (α →+*o β)` | Uniqueness of ordered ring homomorphism from archimedean `α` to conditionally complete `β`. |
| `uniqueOrderRingIso` | `Unique (β ≃+*o γ)` | Uniqueness of ordered ring isomorphism between two conditionally complete linearly ordered fields. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `cutMap_`: Relates to rational cut construction.
  - `inducedMap_`, `inducedAddHom`, `inducedOrderRingHom`, `inducedOrderRingIso`: Hierarchy of bundled structures built from `inducedMap`.
  - `coe_`, `mem_`, `nonempty`, `bddAbove`: Standard set-theoretic properties.
  - `mul_self_`, `sq_`, `pow_`: Used in proofs involving squares and powers (e.g., `mul_self_lt_mul_self₀`).
- **Suffixes**:
  - `_iff`: Biconditional characterizations (`mem_cutMap_iff`, `coe_lt_inducedMap_iff`, etc.).
  - `_mono`: Monotonicity lemmas.
  - `_self`: Identity or idempotence lemmas (`inducedMap_self`, `inducedOrderRingIso_self`).
  - `_rat`: Specialization to rational inputs (`inducedMap_rat`, `cutMap_coe`).
- **Other**:
  - `two_ne_zero`: Used in proofs involving squares (e.g., `exists_rat_pow_btwn two_ne_zero`).
  - `mod_cast`, `push_cast`: Tactics for coercions between `ℚ`, `α`, `β`.

---

#### **3. Tactic Stack**

Frequently used tactics in this file:

| Tactic | Role |
|--------|------|
| `simp_rw` | Rewriting with definitional equalities, especially for coercions (`Rat.cast`, `coe`). |
| `norm_cast` | Simplifies coercions between `ℚ`, `α`, `β`. Often used after `rw` to resolve type mismatches. |
| `aesop` / `linarith` | For linear arithmetic over ordered structures. |
| `exact`, `refine`, `apply` | Core proof construction. |
| `csSup_eq_of_forall_le_of_forall_lt_exists_gt` | To prove equality of supremum with a candidate value. |
| `exists_rat_lt`, `exists_rat_gt`, `exists_rat_btwn`, `exists_rat_pow_btwn` | Density of ℚ in archimedean ordered fields. |
| `mod_cast`, `push_cast` | Handles coercion of arithmetic operations (e.g., `cast_add`, `cast_pow`). |
| `beta_reduce` | Forces β-reduction in problematic cases (e.g., after `rw` on definitions involving `fun`). |
| `convert` | Used to reuse proofs under definitional equality up to congruence. |
| `dsimp`, `unfold`, `simp` | Simplification of definitions (e.g., `inducedOrderRingIso`, `inducedAddHom`). |

---

#### **4. Proof Logic**

The logical flow follows a standard “construct → verify structure → prove uniqueness” pattern:

1. **Construct rational cuts** (`cutMap`):
   - Define `cutMap β a` as the set of rationals in `β` less than `a`.
   - Prove basic properties: monotonicity, nonemptiness, boundedness above (using archimedean property and density of ℚ).

2. **Define induced map** (`inducedMap`):
   - Set `inducedMap α β x := sSup (cutMap β x)`.
   - Prove:
     - Monotonicity (`inducedMap_mono`)
     - Additivity (`inducedMap_add`) via `csSup_add`
     - Rational compatibility (`inducedMap_rat`, `inducedMap_zero`, `inducedMap_one`)
     - Characterization of inequalities (`coe_lt_inducedMap_iff`, `lt_inducedMap_iff`)

3. **Upgrade to algebraic structure**:
   - `inducedAddHom`: trivial from additivity.
   - `inducedOrderRingHom`: requires multiplicativity.
     - Prove `inducedMap(x²) = inducedMap(x)²` using:
       - `le_inducedMap_mul_self_of_mem_cutMap`: shows `b ∈ cutMap(x²) ⇒ b ≤ inducedMap(x)²`
       - `exists_mem_cutMap_mul_self_of_lt_inducedMap_mul_self`: shows `b < inducedMap(x)² ⇒ ∃c ∈ cutMap(x²), b < c`
     - Then apply `mkRingHomOfMulSelfOfTwoNeZero`.

4. **Isomorphism between two conditionally complete fields**:
   - Define `inducedOrderRingIso β γ` using `inducedOrderRingHom β γ` and its inverse `inducedMap γ β`.
   - Prove inverse properties via `inducedMap_inv_self`.
   - Show uniqueness via `uniqueOfSubsingleton`.

5. **Uniqueness results**:
   - `uniqueOrderRingHom`: Any two `α →+*o β` are equal because both equal `inducedOrderRingHom α β`.
   - `uniqueOrderRingIso`: Any two `β ≃+*o γ` are equal because both equal `inducedOrderRingIso β γ`.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Algebra.Order.Archimedean.Hom` | Provides `Archimedean` class and related homomorphism lemmas. |
| `Mathlib.Algebra.Order.Group.Pointwise.CompleteLattice` | Supplies `csSup`, `BddAbove`, and lattice-theoretic tools for conditionally complete orders. |

These imports indicate the file sits at the intersection of:
- **Ordered algebra** (fields, rings, positivity, order compatibility),
- **Order theory** (suprema, completeness),
- **Archimedean properties** (density of ℚ).

---

### Summary

This file formalizes the **uniqueness of the real numbers** as the unique (up to unique ordered ring isomorphism) **conditionally complete linearly ordered field**. It constructs the canonical map from any archimedean linearly ordered field to such a field via rational cuts and supremum, proves it preserves all algebraic and order structure, and establishes uniqueness. The formalization is highly structured, leveraging Lean’s typeclass inference and bundled morphisms (`→+*o`, `≃+*o`) to ensure coherence.