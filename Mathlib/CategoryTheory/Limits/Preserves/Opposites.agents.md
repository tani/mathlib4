### Technical Brief: Limit/Colimit Preservation Properties of Opposite Functors in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `preservesLimit_op` | `PreservesColimit K.leftOp F → PreservesLimit K F.op`<br>Relates preservation of *colimits* under `F` to preservation of *limits* under `F.op`. |
| `preservesLimit_of_op` | `PreservesColimit K.op F.op → PreservesLimit K F`<br>Converse direction: if `F.op` preserves colimits of `K.op`, then `F` preserves limits of `K`. |
| `preservesLimit_leftOp`, `preservesLimit_of_leftOp` | Analogous to above for `F.leftOp : Cᵒᵖ ⥤ D`. |
| `preservesLimit_rightOp`, `preservesLimit_of_rightOp` | Analogous for `F.rightOp : C ⥤ Dᵒᵖ`. |
| `preservesLimit_unop`, `preservesLimit_of_unop` | Analogous for `F.unop : C ⥤ D`. |
| `preservesColimit_op`, `preservesColimit_of_op`, etc. | Dual statements: relate preservation of *limits* under `F` to *colimits* under `F.op`, `F.leftOp`, etc. |
| `preservesLimitsOfShape_op`, `preservesColimitsOfShape_op`, etc. | Shape-level versions: if `F` preserves colimits of shape `Jᵒᵖ`, then `F.op` preserves limits of shape `J`. |
| `preservesLimitsOfSize_op`, `preservesColimitsOfSize_op`, etc. | Size-level versions: if `F` preserves colimits (of any size), then `F.op` preserves limits (of same size). |
| `preservesLimits_op`, `preservesColimits_op`, etc. | Full preservation versions (all shapes/sizes). |
| `preservesFiniteLimits_op`, `preservesFiniteColimits_op`, etc. | Finite versions: finite colimits ↔ finite limits under opposite constructions. |
| `preservesFiniteProducts_op`, `preservesFiniteCoproducts_op`, etc. | Specialized to finite products/coproducts (using `Discrete.opposite J`). |

**Core Logical Equivalence Pattern**:
> Preservation of *colimits* by `F` ⇔ Preservation of *limits* by `F.op`, `F.leftOp`, `F.rightOp`, or `F.unop`, depending on variance.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `preserves[Finite][Limits|Colimits]_[of_]`: Standard naming for preservation properties.
  - `op`, `leftOp`, `rightOp`, `unop`: Indicate which derived functor is involved.
- **Suffixes**:
  - `_op`, `_leftOp`, `_rightOp`, `_unop`: For implications *from* `F` *to* its variants.
  - `_of_op`, `_of_leftOp`, etc.: For implications *from* the variant *back to* `F`.
- **Shape/Size Modifiers**:
  - `OfShape`: For a fixed diagram shape `J`.
  - `OfSize`: For preservation across all shapes of a given universe level.
  - `Finite`: Restricts to finite diagrams.

**Example**:  
`preservesFiniteProducts_leftOp` = "If `F` preserves finite coproducts, then `F.leftOp` preserves finite products."

---

#### **3. Tactic Stack**

- **Primary Tactics**:
  - `apply`: Used repeatedly to apply lemmas like `preservesLimit_op`.
  - `exact`: To close goals with direct evidence.
  - `by apply ...`: Often used inline in `where` blocks.
  - `config := { allowSynthFailures := true }`: Used in finite product/coproduct proofs to allow typeclass inference to fail gracefully (e.g., when constructing equivalence-based limits).
  - `equiv`-based reasoning: `preservesColimitsOfShape_of_equiv` used to transfer preservation across equivalent diagram shapes (e.g., `Discrete.opposite J ≌ Discrete Jᵒᵖ`).

- **No heavy automation** (e.g., `aesop`, `ring`, `simp_rw`) — proofs are mostly *structural*, relying on categorical definitions and existing lemmas.

---

#### **4. Proof Logic**

- **Pattern**:
  1. **Unfold definitions**: Use `preservesLimit`, `preservesColimit`, etc., to reduce to cone/cocone conditions.
  2. **Apply known equivalences**:
     - `isLimitConeRightOpOfCocone`, `isColimitCoconeLeftOpOfCone`, etc., bridge between cones/cocones in `C` and `Cᵒᵖ`.
     - `IsLimit.op`, `IsColimit.op`, `isLimitOfOp`, `isColimitOfOp` for duality.
  3. **Leverage hypothesis**: Use `[PreservesColimit K.leftOp F]` or `[PreservesLimit K.op F.op]` to get the required limit/colimit preservation.
  4. **Construct witness**: Build the limiting cone/cocone using the image under the functor and the hypothesis.

- **Induction?** None — all proofs are *direct*, relying on universal properties and functoriality.

- **Key Insight**: The proofs exploit the *definition* of opposite/unop/leftOp/rightOp functors and how they act on cones/cocones and limits/colimits.

---

#### **5. Imports**

- `Mathlib.CategoryTheory.Limits.Opposites`: Core definitions of `op`, `unop`, `leftOp`, `rightOp`, and their actions on cones/cocones.
- `Mathlib.CategoryTheory.Limits.Preserves.Finite`: Definitions of finite preservation (`PreservesFiniteLimits`, `PreservesFiniteCoproducts`, etc.).

**Scope**: This file is part of the *limits* hierarchy in Mathlib, specifically dealing with *preservation properties* under categorical dualities.

---

### Summary

This file formalizes a *comprehensive duality principle* for limit/colimit preservation across four derived functors (`op`, `leftOp`, `rightOp`, `unop`). The structure is highly symmetric and systematic, with lemmas organized by:
- **Preservation type** (limit/colimit),
- **Shape/size** (finite, shape-specific, full),
- **Direction** (`F → F.op`, `F.op → F`, etc.).

It serves as a foundational reference for reasoning about how dualizing functors interact with (co)limit preservation — crucial for advanced categorical constructions (e.g., adjoint functor theorems, Grothendieck constructions).