### Technical Brief: Turing Machine Formalization in Lean 4 (from `Turing.lean`)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `BlankExtends` | `List Γ → List Γ → Prop` | Partial order: `l₂` extends `l₁` by appending blanks (`default`). |
| `BlankRel` | `List Γ → List Γ → Prop` | Symmetric closure of `BlankExtends`; equivalence relation meaning “one list extends the other by blanks”. |
| `ListBlank Γ` | `Quotient (BlankRel.setoid Γ)` | Quotient of lists modulo blank extension — models infinite tapes with finite content (blanks at infinity). |
| `ListBlank.mk` | `List Γ → ListBlank Γ` | Quotient map; embeds finite lists into `ListBlank`. |
| `ListBlank.head`, `tail`, `cons`, `nth`, `modifyNth` | Functions on `ListBlank` | Well-defined operations on equivalence classes (e.g., `nth` defined for all `n : ℕ`, unlike `List`). |
| `Tape Γ` | `Structure { head : Γ, left right : ListBlank Γ }` | Tape model: current head symbol + left/right infinite halves. |
| `Dir` | `Inductive { left right }` | Directions for head movement. |
| `Tape.move` | `Dir → Tape Γ → Tape Γ` | Shifts head left/right, moving tape content accordingly. |
| `Tape.nth` | `Tape Γ → ℤ → Γ` | Integer-indexed tape content: `0` = head, negative = left, positive = right. |
| `Tape.write` | `Γ → Tape Γ → Tape Γ` | Overwrites head symbol. |
| `Tape.map` | `PointedMap Γ Γ' → Tape Γ → Tape Γ'` | Applies a pointed map to all symbols on tape. |
| `PointedMap Γ Γ'` | `Structure { f : Γ → Γ', map_pt' : f default = default }` | Maps preserving default (blank) element — essential for well-definedness on `ListBlank`. |
| `BlankRel.equivalence` | `Equivalence BlankRel` | Proves `BlankRel` is an equivalence relation. |
| `BlankRel.above`, `below` | Constructive joins/meets under `BlankExtends` | Enables lattice-like reasoning on equivalence classes. |
| `ListBlank.ext` | Extensionality: `∀ n, L₁.nth n = L₂.nth n → L₁ = L₂` | Key for proving equality of tape halves. |
| `Tape.move_left_right`, `move_right_left` | Inverses of movement | Ensures reversibility of moves. |
| `Tape.move_left_nth`, `move_right_nth` | `nth` behavior under movement | Relates tape content before/after movement: `(T.move d).nth i = T.nth (i ± 1)`. |
| `Tape.map_move`, `map_write`, `map_mk'` | Compatibility lemmas | `map` commutes with `move`, `write`, `mk'`, etc. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `BlankExtends`, `BlankRel`: Relational properties of blank extension.
  - `ListBlank.*`: Operations on the quotient type.
  - `Tape.*`: Operations on tape structures.
  - `PointedMap.*`: Functions on pointed maps.
- **Suffixes**:
  - `_mk`: Constructor or embedding into quotient (`ListBlank.mk`, `Tape.mk₁`, `Tape.mk₂`, `Tape.mk'`).
  - `_nth`, `_head`, `_tail`, `_cons`: Structural accessors.
  - `_map`, `_write`, `_move`: Action-based modifiers.
  - `_refl`, `_trans`, `_symm`: Proof of equivalence properties.
- **Variables**:
  - `Γ`, `Λ`, `σ`, `K`: Standard machine parameters (alphabet, states, memory, stack count).
  - `l`, `L`, `R`, `T`, `Tape`: Typical list/tape variables.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `induction' n with n IH`: Structural induction on natural numbers.
- `cases T`: Case analysis on inductive/structure types (`Tape`, `Dir`, `List`).
- `simp only [...]`: Simplification with explicit lemmas (avoids over-simplification).
- `rw [...]`: Rewriting using equalities (e.g., `ListBlank.nth_succ`, `Tape.move_left_nth`).
- `exact`, `refine`, `apply`: Goal-directed proof construction.
- `conv => lhs; rw [...]`: Focused rewriting in specific subterms.
- `Quotient.inductionOn'`, `Quotient.sound'`: Reasoning about quotient types.
- `wlog h : ...`: Without loss of generality for symmetry arguments.
- `suffices ... by exact ...`: Proof restructuring for `simp` compatibility.

---

#### **4. Proof Logic**

- **Quotient reasoning**: Proofs about `ListBlank` rely on lifting definitions/properties from `List Γ` using `liftOn` and verifying compatibility with `BlankExtends`.
- **Induction + case analysis**: Most structural properties (e.g., `nth_modifyNth`, `map_modifyNth`) are proven by induction on `n` or `l`, followed by case analysis on `i` or `T`.
- **Symmetry & reversibility**: Movement inverses (`move_left_right`, `move_right_left`) are proven by direct case analysis.
- **Compatibility lemmas**: Show that operations commute (e.g., `map` with `move`, `write`, `modifyNth`) using induction and simplification.
- **Extensionality**: Equality of `ListBlank`/`Tape` is shown via `nth`-based extensionality (`ListBlank.ext`, `Tape.ext` if needed).
- **Constructive joins/meets**: `BlankRel.above`, `below` use `if ... then ... else ...` on length comparisons to pick canonical representatives.

---

#### **5. Imports**

Core dependencies defining the module’s scope:
- `Mathlib.Data.Fintype.Option/Prod/Pi`: Finite type reasoning (for “essentially finite” behavior).
- `Mathlib.Data.Vector.Basic`: Finite lists with length indexing.
- `Mathlib.Data.PFun`: Partial functions (for partial evaluation semantics).
- `Mathlib.Logic.Function.Iterate`: Iterated function application (`iterate`, used for `step^[n]`).
- `Mathlib.Order.Basic`: Partial orders, lattices (for `BlankExtends`).
- `Mathlib.Tactic.ApplyFun`: Functional extensionality & functoriality.
- `Mathlib.Data.List.GetD`: Safe list indexing (`getI`, `getElem`).

---

### Summary

This file formalizes the foundational tape model for Turing machines in Lean 4, using:
- **Quotient types** (`ListBlank`) to abstract infinite tapes with finite non-blank content.
- **Pointed maps** to ensure semantic consistency under blank preservation.
- **Integer-indexed tape content** (`Tape.nth`) for precise positional reasoning.
- **Reversible movement** and **symbol modification** as core operations.

The design supports later extensions (e.g., multi-stack machines, Wang B-machines) by modular parameterization (`Γ`, `Λ`, `σ`, `K`). Proofs emphasize **constructivity**, **compatibility**, and **extensionality**, leveraging Lean’s quotient and induction mechanisms rigorously.