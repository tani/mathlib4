Here's a **structured technical brief** extracted from the provided Lean 4 file, focusing on the formalization of *circular orders* and related hierarchy:

---

### 🔑 **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Btw (α : Type*)` | `class Btw α where btw : α → α → α → Prop` | Syntax typeclass for a ternary *betweenness* relation. |
| `SBtw (α : Type*)` | `class SBtw α where sbtw : α → α → α → Prop` | Syntax typeclass for a *strict betweenness* relation. |
| `CircularPreorder α` | `class CircularPreorder α extends Btw α, SBtw α` | Weakest structure: `btw` is reflexive & cyclic; `sbtw` is transitive and defined as `btw ∧ ¬btw⁻¹`. |
| `CircularPartialOrder α` | `class CircularPartialOrder α extends CircularPreorder α` | Adds *antisymmetry*: `btw a b c ∧ btw c b a → a = b ∨ b = c ∨ c = a`. |
| `CircularOrder α` | `class CircularOrder α extends CircularPartialOrder α` | Adds *totality*: `btw a b c ∨ btw c b a` for all `a b c`. |
| `cIcc a b` | `def Set.cIcc (a b : α) : Set α := {x | btw a x b}` | Closed-closed circular interval. |
| `cIoo a b` | `def Set.cIoo (a b : α) : Set α := {x | sbtw a x b}` | Open-open circular interval. |
| `LE.toBtw α` | `abbrev LE.toBtw (α : Type*) [LE α] : Btw α` | Embeds linear orders into circular preorders via cyclic wrapping. |
| `LT.toSBtw α` | `abbrev LT.toSBtw (α : Type*) [LT α] : SBtw α` | Strict version of above. |
| `Preorder.toCircularPreorder α` | `abbrev Preorder.toCircularPreorder (α : Type*) [Preorder α] : CircularPreorder α` | Circularizes a preorder. |
| `PartialOrder.toCircularPartialOrder α` | `abbrev PartialOrder.toCircularPartialOrder (α : Type*) [PartialOrder α] : CircularPartialOrder α` | Circularizes a partial order. |
| `LinearOrder.toCircularOrder α` | `abbrev LinearOrder.toCircularOrder (α : Type*) [LinearOrder α] : CircularOrder α` | Circularizes a linear order. |
| `OrderDual.btw`, `sbtw`, etc. | `instance`s for dualizing circular structures | Enables `αᵒᵈ` to inherit circular structure via reversal of arguments. |

**Notable Theorems**:
- `btw_cyclic {a b c} : btw a b c ↔ btw c a b`
- `sbtw_cyclic {a b c} : sbtw a b c ↔ sbtw c a b`
- `sbtw_iff_btw_not_btw {a b c} : sbtw a b c ↔ btw a b c ∧ ¬btw c b a`
- `btw_total : ∀ a b c, btw a b c ∨ btw c b a` (for `CircularOrder`)
- `compl_cIcc : (cIcc a b)ᶜ = cIoo b a`
- `compl_cIoo : (cIoo a b)ᶜ = cIcc b a`

---

### 📝 **Naming Conventions**

- **Prefixes**:
  - `btw_`: properties of non-strict betweenness (`btw_refl`, `btw_cyclic_left`, `btw_antisymm`, `btw_total`)
  - `sbtw_`: properties of strict betweenness (`sbtw_trans_left`, `sbtw_asymm`, `sbtw_irrefl`)
  - `cI`: circular intervals (`cIcc`, `cIoo`)
  - `toCircular`: conversion functions from linear-like orders to circular ones (`LE.toBtw`, `Preorder.toCircularPreorder`, etc.)

- **Suffixes**:
  - `_left`, `_right`: indicate direction of cyclic permutation or transitivity application.
  - `_rfl`, `_refl`: reflexive cases.
  - `not_`, `iff_not`: logical negation/iff with negation (e.g., `not_btw_of_sbtw`, `btw_iff_not_sbtw`)

- **Aliases**:
  - Many theorems have aliases like `Btw.btw.cyclic_left`, `SBtw.sbtw.trans_left`, etc., for dot-notation usage.

---

### ⚙️ **Tactic Stack**

Frequent tactics used in proofs:
- `rwa`: rewrite + assumption (common in `Preorder.toCircularPreorder`)
- `simp_rw`: simplification with rewrite rules (e.g., `lt_iff_le_not_le`)
- `by_cases`: case analysis on propositional hypotheses
- `intro` / `rintro`: introduce hypotheses
- `exact`, `assumption`, `apply`: basic proof steps
- `ext`: extensionality for set equality
- `rfl`, ` rfl`: definitional equality
- `tauto` (replaced by manual case analysis in `Preorder.toCircularPreorder`)

---

### 🧠 **Proof Logic & Strategy**

- **Inductive-style reasoning**: Proofs often proceed by case analysis on disjunctions (`or`) from totality or definitions.
- **Cyclic symmetry exploitation**: Many proofs use `btw_cyclic`/`sbtw_cyclic` to rotate terms into a canonical form.
- **Reduction to linear order properties**: In `Preorder.toCircularPreorder`, transitivity and antisymmetry are reduced to properties of `≤` and `<`, using `le_trans`, `lt_iff_le_not_le`, and case analysis on all 6 possible orderings.
- **Set complement duality**: Interval complement lemmas (`compl_cIcc`, `compl_cIoo`) use `sbtw_iff_btw_not_btw` and `btw_iff_not_sbtw` to flip between open/closed intervals.
- **Dualization via argument reversal**: `OrderDual` instances reverse the order of arguments in `btw`/`sbtw`, and proofs adapt accordingly (e.g., `btw_cyclic_right` becomes `btw_cyclic_left` in dual).

---

### 📦 **Imports & Dependencies**

- **Core dependency**: `Mathlib.Data.Set.Basic`
- **Implicit dependencies** (via typeclasses):
  - `Preorder`, `PartialOrder`, `LinearOrder`, `LE`, `LT`
  - `OrderDual`, `Set`, basic set operations (`mem_compl_iff`, `Set.ext`)
- **Notable absence**: No explicit use of `OrderTheory` or `Algebra` imports — this file is self-contained for the hierarchy.

---

### 🧩 **Open Issues & TODOs**

- **Diamond problem** on `OrderDual α`: two ways to define `Btw αᵒᵈ` are propositionally equal but not definitionally equal.
- **Missing interval types**: `cIco`, `cIoc` not defined due to weak antisymmetry.
- **"Rolling the necklace open"**: Not fully formalized; conjectured for `α × β` where `α` is circular and `β` linear.
- **Circular groups**: Future work on `ZMod n`, `Circle`, `RootsOfUnity M`.
- **Homomorphisms**: Suggested notation `α →c β` for circular order-preserving maps.

---

Let me know if you'd like a visual diagram of the hierarchy or a summary of how `LinearOrder → CircularOrder` works in practice.