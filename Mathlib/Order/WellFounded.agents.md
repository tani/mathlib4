### Technical Metadata Brief: Well-Founded Relations in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `WellFounded` | `α → α → Prop → Prop` | Predicate stating that a binary relation `r` is well-founded: every nonempty subset has an `r`-minimal element (equivalently, all elements are `r`-accessible). |
| `isAsymm` | `WellFounded r → IsAsymm α r` | Proves well-founded relations are asymmetric. |
| `isIrrefl` | `WellFounded r → IsIrrefl α r` | Proves well-founded relations are irreflexive. |
| `mono` | `(WellFounded r) → (∀ a b, r' a b → r a b) → WellFounded r'` | Monotonicity: subrelations of well-founded relations are well-founded. |
| `onFun` | `WellFounded r → WellFounded (r on f)` | Pullback of a well-founded relation along a function (`InvImage.wf`). |
| `has_min` | `WellFounded r → s.Nonempty → ∃ m ∈ s, ∀ x ∈ s, ¬r x m` | Every nonempty set has an `r`-minimal element. |
| `min` | `WellFounded r → Set α → s.Nonempty → α` | Noncomputable choice of minimal element in a nonempty set. |
| `min_mem` | `H.min s h ∈ s` | Minimality witness lies in the set. |
| `not_lt_min` | `x ∈ s → ¬r x (H.min s h)` | No element of `s` is strictly `r`-below the minimum. |
| `wellFounded_iff_has_min` | `WellFounded r ↔ ∀ s, s.Nonempty → ∃ m ∈ s, ∀ x ∈ s, ¬r x m` | Equivalence between well-foundedness and existence of minimal elements. |
| `sup` | `WellFounded r → Set α → Bounded r s → α` | Supremum of a bounded set in a well-founded order (minimal upper bound). |
| `lt_sup` | `x ∈ s → r x (wf.sup s h)` | Elements of `s` are strictly below its supremum. |
| `succ` *(deprecated)* | `WellFounded r → α → α` | Successor of `x`: minimal `y` with `r x y`, else `x`. |
| `induction_bot` | `WellFounded r → C a → (∀ b, b ≠ bot → C b → ∃ c, r c b ∧ C c) → C bot` | Induction principle to prove `C(bot)` from accessibility and descent from non-bottom elements. |
| `WellFoundedLT.toOrderBot` | `[LinearOrder α] [Nonempty α] [WellFoundedLT α] → OrderBot α` | Constructs a bottom element from well-founded `<`. |
| `argmin`, `argminOn` | `argmin : [Nonempty α] → α`, `argminOn : s.Nonempty → α` | Minimal preimage under `f : α → β` when `β` has well-founded `<`. |
| `id_le` / `le_id` | `StrictMono f → id ≤ f` / `f ≤ id` | For strictly monotone `f` on well-founded `<` or `>`, `x ≤ f(x)` or `f(x) ≤ x`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`: Properties of relations (`isAsymm`, `isIrrefl`)
  - `has_`: Existence of minimal/maximal elements (`has_min`)
  - `not_`: Negated relations (`not_lt_min`, `not_lt_argmin`)
  - `argmin`, `argminOn`: Minimal preimage under a function
  - `to_`: Construction of structures from data (`toOrderBot`, `toOrderTop`)
- **Suffixes**:
  - `_iff`: Logical equivalences (`wellFounded_iff_has_min`)
  - `_bot`, `_top`: Related to bottom/top elements (`induction_bot`, `toOrderBot`)
  - `On`: Restricted to subsets (`argminOn`, `minOn`)
- **Functional style**:
  - `onFun`, `InvImage.wf`: Pullback along functions
  - `mono`, `lt_sup`, `le_apply`: Monotonicity or order-theoretic behavior

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `Acc.recOn` | Recursion/induction on accessibility (core to well-founded induction) |
| `Classical.choose` / ` Classical.choose_spec` | Extract minimal element from existence proof |
| `not_lt.1`, `not_imp_not.1` | Negation manipulation (e.g., turning `¬(P → Q)` into `P ∧ ¬Q`) |
| `rcases`, `obtain`, `rintro` | Case analysis on existential/universal hypotheses |
| `trichotomous_of` | For linear orders: split into `<`, `=`, `>` cases |
| `eq_or_ne` | Split equality into `=` or `≠` cases |
| `rw`, `simp`, `simp_rw` | Rewriting using lemmas (e.g., `min_mem`, `not_lt_min`) |
| `aesop` / `linarith` | For order reasoning (especially in `LinearOrder` section) |
| `convert` / `congr` | Proving equality of functions/sets via extensionality |
| `ext` | Extensionality for sets/functions |

---

#### **4. Proof Logic Patterns**

- **Well-founded induction**:  
  Prove `P x` for all `x` by showing:  
  `∀ x, (∀ y, r y x → P y) → P x`.  
  Implemented via `Acc.recOn` and `WellFounded.induction_bot`.

- **Minimal element construction**:  
  Use `has_min` + `Classical.choose` to define `min`, then reason via `min_mem` and `not_lt_min`.

- **Equivalence proofs**:  
  `wellFounded_iff_has_min` uses:
  - `→`: Direct from `has_min`
  - `←`: Contrapositive: assume no minimal element → construct infinite descending chain → contradict accessibility.

- **Induction with a distinguished base (`bot`)**:  
  `induction_bot`/`induction_bot'`:
  - Assume `C a` for some `a`
  - If `C b` holds and `b ≠ bot`, descend to `c` with `r c b`
  - By well-foundedness, must reach `bot`

- **Order-theoretic reasoning**:
  - Use `trichotomous_of` + `not_lt` to handle linear orders.
  - `StrictMono.id_le` uses `has_min` on `{x | f x < x}` to derive contradiction.

---

#### **5. Imports & Scope**

**Core Imports**:
- `Mathlib.Data.Set.Function`: For set-theoretic constructions (e.g., `range`, `invImage`, `argmin`).
- `Mathlib.Order.Bounds.Defs`: For boundedness (`Bounded`), suprema/infima, and order-theoretic notions.

**Key Dependencies**:
- `WellFounded` is defined in `Mathlib.Init.WellFounded` (core), but this file extends it.
- Uses `Classical` for noncomputable definitions (`min`, `succ`, `argmin`).
- Leverages `LinearOrder`, `Preorder`, `LT`, `GT`, `WellFoundedLT`, `WellFoundedGT` typeclasses.
- Relies on `Acc` (accessibility) and `IsAsymm`, `IsIrrefl` from order theory.

**Domain Scope**:
- Formalization of **well-founded relations**, **induction/recursion**, and **order theory**.
- Applications to **strictly monotone/antitone functions**, **minimal preimages**, and **completion with bounds** (`OrderBot`, `OrderTop`).
- Supports reasoning about **fixed points**, **recursive definitions**, and **least elements** in well-founded settings.

--- 

Let me know if you'd like a diagram of dependencies or a summary of how this module integrates with `Mathlib.Order.WellFounded` or `Mathlib.Order.FixedPoints`.