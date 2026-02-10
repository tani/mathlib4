### Technical Metadata Brief: `GameAdd` Relations in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Prod.GameAdd` | `inductive GameAdd : α × β → α × β → Prop` | Models one-step game moves on ordered pairs: decrease *exactly one* component via `rα` or `rβ`. |
| `Prod.gameAdd_iff` | `GameAdd rα rβ x y ↔ rα x.1 y.1 ∧ x.2 = y.2 ∨ rβ x.2 y.2 ∧ x.1 = y.1` | Characterizes `GameAdd` in terms of projections; essential for reasoning and simplification. |
| `Prod.gameAdd_swap_swap` | `GameAdd rβ rα a.swap b.swap ↔ GameAdd rα rβ a b` | Symmetry under swapping components and swapping relations. |
| `Prod.gameAdd_le_lex` | `GameAdd rα rβ ≤ Prod.Lex rα rβ` | `GameAdd` is a subrelation of lexicographic order — useful for embedding into stronger well-founded orders. |
| `Prod.rprod_le_transGen_gameAdd` | `RProd rα rβ ≤ TransGen (GameAdd rα rβ)` | Relates product closure (`RProd`) to transitive closure of `GameAdd`. |
| `Prod.Acc.prod_gameAdd` | `Acc rα a → Acc rβ b → Acc (GameAdd rα rβ) (a, b)` | Accessibility lifts to pairs under `GameAdd`. |
| `Prod.WellFounded.prod_gameAdd` | `WellFounded rα → WellFounded rβ → WellFounded (GameAdd rα rβ)` | Main result: `GameAdd` preserves well-foundedness (models well-founded game sums). |
| `Prod.GameAdd.fix` / `GameAdd.induction` | Recursive/inductive principle over `GameAdd` | Enables definition/proof by well-founded recursion on pairs with one-component descent. |
| `Sym2.GameAdd` | `def GameAdd : Sym2 α → Sym2 α → Prop` | Unordered-pair analog of `GameAdd`; models moves on multisets of size ≤2. |
| `Sym2.gameAdd_iff` | `GameAdd rα (mk x) (mk y) ↔ Prod.GameAdd rα rα x y ∨ Prod.GameAdd rα rα x.swap y` | Lifts `Prod.GameAdd` to unordered pairs via symmetry. |
| `Sym2.Acc.sym2_gameAdd` | `Acc rα a → Acc rα b → Acc (Sym2.GameAdd rα) s(a, b)` | Accessibility for unordered pairs. |
| `Sym2.WellFounded.sym2_gameAdd` | `WellFounded rα → WellFounded (Sym2.GameAdd rα)` | Well-foundedness for unordered pair addition. |
| `Sym2.GameAdd.fix` / `GameAdd.induction` | Recursive/inductive principle over `Sym2.GameAdd` | Enables reasoning on unordered pairs (e.g., game sums modulo symmetry). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `gameAdd_`: Core definitions and lemmas about `GameAdd`.
  - `prod_gameAdd`, `sym2_gameAdd`: Disambiguates between ordered and unordered variants.
  - `to_sym2`: Embedding from `Prod.GameAdd` to `Sym2.GameAdd`.
- **Suffixes**:
  - `_iff`: Biconditional characterizations (e.g., `gameAdd_iff`, `gameAdd_mk_iff`).
  - `_mk_iff`: Specialized to `mk` (constructor) arguments.
  - `_swap_swap`: Behavior under `swap`.
  - `_fix`, `_fix_eq`: Fixpoint recursion and its defining equation.
  - `_induction`: Inductive principle.
- **Other patterns**:
  - `fst`, `snd`: Constructors and lemmas for single-component descent.
  - `fst_snd`, `snd_fst`: Mixed-component moves (via symmetry in `Sym2`).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rintro` / `intro` / `introv`: Pattern matching on existentials and implications.
- `rw` / `simp`: Rewriting using `gameAdd_iff`, `swap`, symmetry lemmas.
- `exact`, `refine`, `apply`: Building proofs from lemmas.
- `induction'`: Well-founded induction (especially with `Acc` and `WellFounded`).
- `dsimp`: Simplifying definitions (e.g., unfolding `Sym2.GameAdd`, `lift₂`, `quotient_lift₂`).
- `convert`, `congr'`: For congruence-based equality proofs.
- `simp [or_comm]`, `simp [Sym2.eq_swap]`: Handling symmetry and commutativity.
- `have := ...` + `at`: Extracting intermediate facts (e.g., `have := hr.sym2_gameAdd`).

---

#### **4. Proof Logic**

- **Inductive structure**: Proofs about `GameAdd` rely heavily on:
  - **Induction on accessibility (`Acc`)**: For `Acc.prod_gameAdd`, `Acc.sym2_gameAdd`.
  - **Well-founded induction**: For `WellFounded.prod_gameAdd`, `WellFounded.sym2_gameAdd`.
  - **Case analysis on `GameAdd` constructors**: `GameAdd.fst`, `GameAdd.snd`.
- **Symmetry handling**:
  - In `Sym2`, proofs often use `Sym2.eq_swap` and symmetry of `Prod.gameAdd_swap_swap`.
  - `Sym2.lift₂` ensures definition respects equivalence relation (unordered pairs).
- **Embedding arguments**:
  - `gameAdd_le_lex` shows `GameAdd` is weaker than lexicographic order.
  - `rprod_le_transGen_gameAdd` connects to transitive closure (for multi-step moves).
- **Recursion/induction principles**:
  - Derived from `WellFounded.fix` and `WellFounded.fix_eq`.
  - `GameAdd.fix` abstracts over the recursion schema, enabling clean definitions.

---

#### **5. Imports & Scope**

- **Core imports**:
  - `Mathlib.Data.Sym.Sym2`: Defines `Sym2 α` (unordered pairs) and its universal property (`lift₂`).
  - `Mathlib.Logic.Relation`: Provides foundational relation theory (`Acc`, `WellFounded`, `TransGen`, `RProd`, `Lex`, etc.).
- **Domain scope**:
  - **Combinatorial game theory**: Models game addition (disjunctive sum), where moves occur in exactly one component.
  - **Well-founded relations**: Used to justify induction/recursion on game positions.
  - **Symmetry-aware reasoning**: `Sym2.GameAdd` handles unordered configurations (e.g., games where order of subgames is irrelevant).

---

### Summary

This file formalizes the foundational *subsequency* (one-step move) relation for **disjunctive sums** of combinatorial games, in both ordered (`Prod.GameAdd`) and unordered (`Sym2.GameAdd`) settings. It establishes key properties — especially **well-foundedness** — ensuring finite descent and enabling induction/recursion on game positions. The naming and structure follow Lean/Mathlib conventions, with heavy use of symmetry, equivalence lifting, and well-founded induction.