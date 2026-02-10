Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: First-Order Syntax in Lean 4 (Mathlib)**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Term` | `inductive Term (α : Type u')` | Represents `L`-terms with free variables indexed by `α`. Constructors: `var : α → Term α`, `func : (l : ℕ) → L.Functions l → (Fin l → Term α) → Term α`. |
| `BoundedFormula` | `inductive BoundedFormula : ℕ → Type max u v u'` | Formulas with `α`-indexed free variables and `n` additional *quantifiable* variables (Fin-indexed). Constructors: `falsum`, `equal`, `rel`, `imp`, `all`. |
| `Formula` | `abbrev Formula := L.BoundedFormula α 0` | Formulas with no quantifiable variables (only `α`-indexed). |
| `Sentence` | `abbrev Sentence := L.Formula Empty` | Sentences: formulas with *no* free variables. |
| `Theory` | `abbrev Theory := Set L.Sentence` | A theory is a set of sentences. |
| `Term.relabel` | `(g : α → β) → L.Term α → L.Term β` | Relabels variables in a term along a function `g`. |
| `Term.subst` | `L.Term α → (α → L.Term β) → L.Term β` | Substitutes variables in a term with other terms. |
| `Term.constantsToVars` / `varsToConstants` | `L[[γ]].Term α ↔ L.Term (γ ⊕ α)` | Bijection between terms with constants and terms with extra variables. |
| `Term.constantsVarsEquiv` | `L[[γ]].Term α ≃ L.Term (γ ⊕ α)` | Equivalence version of above. |
| `Term.liftAt` | `L.Term (α ⊕ Fin n) → L.Term (α ⊕ Fin (n + n'))` | Shifts Fin-indexed variables ≥ `m` up by `n'`. |
| `BoundedFormula.relabel` | `(g : α → β ⊕ Fin n) → L.BoundedFormula α k → L.BoundedFormula β (n + k)` | Relabels variables in bounded formulas. |
| `BoundedFormula.subst` | `L.BoundedFormula α n → (α → L.Term β) → L.BoundedFormula β n` | Substitutes free variables in a formula with terms. |
| `BoundedFormula.castLE` | `m ≤ n → L.BoundedFormula α m → L.BoundedFormula α n` | Adds more Fin-indexed variables (weakening). |
| `BoundedFormula.liftAt` | `L.BoundedFormula α n → L.BoundedFormula α (n + n')` | Lifts Fin-indexed variables ≥ `m`. |
| `BoundedFormula.mapTermRel` | `mapTermRel ft fr h` | General map on formulas induced by term/relation maps and a helper on `all`. |
| `BoundedFormula.constantsVarsEquiv` | `L[[γ]].BoundedFormula α n ≃ L.BoundedFormula (γ ⊕ α) n` | Equivalence between formulas with constants and extra variables. |
| `BoundedFormula.toFormula` | `L.BoundedFormula α n → L.Formula (α ⊕ Fin n)` | Converts bounded formula to full formula by turning Fin-variables into free ones. |
| `LHom.onTerm`, `LHom.onBoundedFormula`, `LHom.onFormula` | `L →ᴸ L'` induces maps on terms, formulas, etc. | Action of language homomorphisms on syntax. |
| `LEquiv.onBoundedFormula`, `LEquiv.onFormula` | `L ≃ᴸ L'` induces equivalences on syntax. | Action of language equivalences. |

**Key Theorems (selected):**
- `relabel_id`, `relabel_relabel`, `relabel_comp_relabel`: `relabel` respects identity and composition.
- `constantsVarsEquiv`: `constantsToVars` and `varsToConstants` are inverses.
- `castLE_rfl`, `castLE_castLE`: `castLE` is unital and transitive.
- `mapTermRel_id_id_id`, `mapTermRel_mapTermRel`: `mapTermRel` is functorial.
- `id_onTerm`, `comp_onTerm`, `id_onBoundedFormula`, `comp_onBoundedFormula`: `onTerm`/`onBoundedFormula` preserve identity and composition.

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `relabel`: variable renaming.
  - `subst`: substitution.
  - `liftAt`: shifting variable indices upward.
  - `castLE`: casting along `m ≤ n`.
  - `constantsToVars` / `varsToConstants`: switching between constants and extra variables.
  - `bdEqual`, `equal`: equality at term vs formula level.
  - `boundedFormula`, `formula`: constructors for bounded vs full formulas.
  - `rels`, `apply₁`, `apply₂`: syntactic sugar for relations/operations.

- **Suffixes:**
  - `Equiv`: when the construction is an equivalence (bijection with proof).
  - `Left`: for constructions focusing on the left summand in `α ⊕ β`.
  - `Aux`: auxiliary helper functions (e.g., `relabelAux`).
  - `Equiv`: for equivalences (e.g., `constantsVarsEquiv`, `relabelEquiv`).

- **Infixes (scoped):**
  - `='` for `bdEqual`
  - `⟹` for `imp`
  - `∀'` for `all`
  - `∼` for `not`
  - `⇔` for `iff`
  - `∃'` for `ex`

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `rfl`: for definitional equalities.
- `simp` / `simp_rw`: simplification with lemmas like `relabel_id`, `castLE`, etc.
- `induction` / `induction'`: structural induction on terms/formulas.
- `funext`: to prove function extensionality.
- `cases`, `cases'`: case analysis on sums, naturals, or inductive types.
- `subst`: substitution of equalities.
- `rw`: rewriting using lemmas or definitions.
- `exact`, `intro`, `intro h`, `intro t`: basic proof scripting.
- `aesop`: for automated reasoning (not explicitly used here, but likely in later files).
- `ring`: for algebraic simplifications (e.g., in `Fin` arithmetic).

---

#### **4. Proof Logic**

- **Inductive structure**: Proofs over `Term` and `BoundedFormula` follow standard *structural induction* on syntax:
  - Base cases: `var`, `falsum`, `equal`, `rel`.
  - Inductive steps: `func`, `imp`, `all`.
- **Relabeling proofs**: Often use `funext` + `simp` + induction, leveraging `relabel_id`, `relabel_relabel`.
- **Equivalence proofs**: Show two functions are inverses via `simp [defns]` + induction.
- **Substitution lemmas**: Use `mapTermRel` or direct induction; often rely on `subst` being a special case of `mapTermRel`.
- **Cast/Weakening lemmas**: Prove properties of `castLE` by induction, using `Fin.castLE_of_eq`, `add_assoc`, etc.
- **Language map compatibility**: Prove `onTerm`, `onBoundedFormula` commute with syntax constructors and composition.

---

#### **5. Imports**

- `Mathlib.Data.Set.Prod`: for product sets, used in `varFinset`, `restrictVar`.
- `Mathlib.Logic.Equiv.Fin`: for equivalences involving `Fin`, e.g., `finSumFinEquiv`, `natAdd`, `castAdd`.
- `Mathlib.ModelTheory.LanguageMap`: defines language homomorphisms (`→ᴸ`) and equivalences (`≃ᴸ`).
- `Mathlib.Algebra.Order.Ring.Nat`: for `Fin` arithmetic (e.g., `castAdd`, `natAdd`, `castLE`).

---

Let me know if you'd like a diagram of the syntax hierarchy or a summary of how substitution interacts with relabeling.