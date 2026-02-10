### Technical Brief: Minimal/Maximal and Bottom/Top Elements in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `IsBot` | `α → Prop` | `a` is *bottom* if `∀ b, a ≤ b`. |
| `IsTop` | `α → Prop` | `a` is *top* if `∀ b, b ≤ a`. |
| `IsMin` | `α → Prop` | `a` is *minimal* if `∀ b, b ≤ a → a ≤ b` (i.e., no strictly smaller element). |
| `IsMax` | `α → Prop` | `a` is *maximal* if `∀ b, a ≤ b → b ≤ a` (i.e., no strictly larger element). |
| `NoBotOrder` | `class` | Every element has a strictly smaller or incomparable element: `∃ b, ¬a ≤ b`. |
| `NoTopOrder` | `class` | Every element has a strictly larger or incomparable element: `∃ b, ¬b ≤ a`. |
| `NoMinOrder` | `class` | Every element has a strictly smaller element: `∃ b, b < a`. |
| `NoMaxOrder` | `class` | Every element has a strictly larger element: `∃ b, a < b`. |
| `not_isBot`, `not_isTop`, `not_isMin`, `not_isMax` | `¬Is… a` | In orders without bottom/top/min/max, no element satisfies the respective predicate. |
| `isMin_iff_forall_not_lt`, `isMax_iff_forall_not_lt` | `IsMin a ↔ ∀ b, ¬b < a` | Equivalence between `IsMin`/`IsMax` and absence of strict comparisons. |
| `not_isMin_iff`, `not_isMax_iff` | `¬IsMin a ↔ ∃ b, b < a` | Characterization of negated minimality/maximality via existence of strict successors/predecessors. |
| `NoBotOrder.to_noMinOrder`, `NoTopOrder.to_noMaxOrder` | `NoBotOrder α → NoMinOrder α` (for `LinearOrder α`) | In linear orders, no bottom ⇔ no minimal; no top ⇔ no maximal. |
| `noBotOrder_iff_noMinOrder`, `noTopOrder_iff_noMaxOrder` | `NoBotOrder α ↔ NoMinOrder α` (for `LinearOrder α`) | Full equivalence in linear orders. |
| `IsBot.isMin`, `IsTop.isMax` | `IsBot a → IsMin a` | Bottom ⇒ minimal; top ⇒ maximal. |
| `IsMin.not_lt`, `IsMax.not_lt` | `IsMin a → ¬b < a` | Minimal/maximal elements have no strict predecessors/successors. |
| `Prod.isBot_iff`, `Prod.isMin_iff`, etc. | `Is… (a, b) ↔ Is… a ∧ Is… b` | Product behavior: predicates lift/reflect componentwise. |

---

#### **2. Naming Conventions**

- **Predicates**:
  - `Is…`: `IsBot`, `IsTop`, `IsMin`, `IsMax` — unary predicates on elements.
- **Typeclasses**:
  - `No…Order`: `NoBotOrder`, `NoTopOrder`, `NoMinOrder`, `NoMaxOrder` — global absence of certain elements.
- **Duality**:
  - `toDual`/`ofDual`: `isBot_toDual_iff`, `isMin_toDual_iff`, etc., reflect duality between bottom/top and min/max.
- **Properties**:
  - `.mono`, `.fst`, `.snd`, `.prod_mk`, `.eq_of_le`, `.lt_of_ne` — structural lemmas for monotonicity, projections, products, equality consequences.
- **Simp lemmas**:
  - `not_is…`, `is…_iff`, `is…_toDual_iff`, `is…_ofDual_iff`, `Prod.is…_iff` — designed for `simp`/`aesop`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp_rw`: To rewrite using `simp` lemmas (e.g., `not_isMin_iff`, `isMin_iff_forall_not_lt`).
- `exact`, `intro`, `cases`, `obtain`: Standard intro/case analysis.
- `by simpa [not_le] using …`: To convert between `≤` and `<` using `LinearOrder` assumptions.
- `lt_of_not_le`, `le_antisymm`, `le_antisymm_iff`: For ordering reasoning.
- `Prod.mk_lt_mk_iff_left/right`: To reason about product order.
- `Classical.arbitrary`, `Classical.choice`: In dependent product instances.
- `aesop`: Likely used in simpler goals (not explicit here, but implied by `simp` + `aesop` style).
- `convert`: Used in porting notes (e.g., `NoBotOrder.to_noMinOrder`).

---

#### **4. Proof Logic**

- **Inductive/constructive style**: Most proofs are direct constructions using `exists` and `not` elimination.
- **Duality via `OrderDual`**: Many results are mirrored using `toDual`/`ofDual`, reducing proof effort.
- **Case analysis on `LinearOrder`**: Key equivalences (`noBotOrder_iff_noMinOrder`) rely on linearity to convert `¬a ≤ b` to `b < a`.
- **Product structure**: Proofs for `α × β` decompose into component-wise reasoning using `Prod.mk_lt_mk_iff_*`.
- **Subsingleton reasoning**: Trivial due to uniqueness of comparisons.
- **Nonemptiness/Nontriviality**: Used to derive contradictions (e.g., `IsBot.not_isMax` uses `exists_ne`).

---

#### **5. Imports**

- `Mathlib.Order.Synonym`: Provides dual order infrastructure (`OrderDual`, `toDual`, `ofDual`).
- Implicit imports from `Preorder`, `PartialOrder`, `LinearOrder`, `Subsingleton`, `Nontrivial`, `Prod`, `Function`, `Logic` (via Lean core).

---

### Summary

This file formalizes foundational order-theoretic notions of extremal elements (bottom/top/min/max) and their absence (via typeclasses). It emphasizes:
- **Duality** (via `OrderDual`),
- **Equivalence in linear orders** (e.g., `NoBotOrder ↔ NoMinOrder`),
- **Product behavior** (componentwise preservation),
- **Simp-friendly lemmas** for automation.

The structure is typical of Mathlib: modular, dual-aware, and heavily optimized for `simp`-based reasoning.