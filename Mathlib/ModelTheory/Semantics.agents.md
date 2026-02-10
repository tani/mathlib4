### Technical Brief: First-Order Semantics in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Term.realize` | `v : α → M → t : L.Term α ↦ M` | Evaluates an `L`-term with variables indexed by `α` under assignment `v`. |
| `BoundedFormula.Realize` | `φ : L.BoundedFormula α l → v : α → M → xs : Fin l → M → Prop` | Interprets bounded formulas (with free variables in `α` and bound variables in `Fin l`) as truth values under assignments. |
| `Formula.Realize` | `φ : L.Formula α → v : α → M → Prop` | Interprets arbitrary formulas (possibly with quantifiers) under variable assignment. |
| `Sentence.Realize` | `φ : L.Sentence → Prop` | Interprets sentences (no free variables) in a structure `M`; denoted `M ⊨ φ`. |
| `Theory.Model` | `T : L.Theory → M → Prop` | `T ⊨ M` iff all sentences in `T` are true in `M`; denoted `M ⊨ T`. |
| `ElementarilyEquivalent` | `M ≅[L] N ↔ L.completeTheory M = L.completeTheory N` | Structures satisfy the same sentences. |
| `completeTheory` | `L.Theory` | Set of all sentences true in `M`. |

**Key Theorems (Commutativity with Syntactic Operations):**

| Theorem | Statement | Significance |
|---------|-----------|--------------|
| `realize_relabel` | `(t.relabel g).realize v = t.realize (v ∘ g)` | Substitution of variables commutes with realization. |
| `realize_subst` | `(t.subst tf).realize v = t.realize (λ a ↦ (tf a).realize v)` | Simultaneous substitution commutes with evaluation. |
| `realize_liftAt` | `(φ.liftAt n' m).Realize v xs ↔ φ.Realize v (xs ∘ ...)` | Embedding variables via `liftAt` corresponds to precomposing assignment. |
| `realize_restrictFreeVar` | `(φ.restrictFreeVar f).Realize v xs ↔ φ.Realize v' xs` | Restricting free variables preserves truth under adjusted assignment. |
| `realize_onTerm`, `realize_onBoundedFormula`, `realize_onFormula`, `realize_onSentence` | `(φ.onTerm t).realize v = t.realize v`, etc. | Language homomorphisms preserve realization. |
| `realize_equivSentence` | `(equivSentence φ).Realize M ↔ φ.Realize (λ a ↦ L.con a)` | Connects formulas with constants added to sentences in expanded language. |

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `realize_`: evaluation of syntactic objects (terms, formulas, etc.) in a structure.
  - `onTerm`, `onBoundedFormula`, `onFormula`, `onSentence`: actions of language homomorphisms.
  - `bdEqual`, `boundedFormula`, `formula`: bounded vs. general formula constructors.
  - `restrictVar`, `restrictFreeVar`, `restrictVarLeft`: variable restriction operations.
  - `liftAt`, `subst`, `relabel`, `castLE`: syntactic transformations.

- **Suffixes:**
  - `_left`, `_right`: for operations on sum types (`α ⊕ γ`).
  - `_one`, `_self`: special cases (e.g., `liftAt 1`, `liftAt n`).
  - `_Equiv`, `_EquivLeft`: for equivalences (e.g., `constantsVarsEquiv`).
  - `_toVars`, `_toConstants`: conversions between constants and variables.

- **Infixes:**
  - `⊨`: for satisfaction (`M ⊨ φ`, `T ⊨ M`).

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` / `simp only` | Simplifying definitions (`realize`, `Realize`, `rel`, `equal`, etc.). |
| `induction'` | Structural induction on terms/formulas (especially `Term`, `BoundedFormula`, `Formula`). |
| `rfl` | Reflexivity for definitional equalities. |
| `congr` / `congr!` | Congruence closure for function/relational applications. |
| `ext` / `funext` | Extensionality for functions (e.g., variable assignments). |
| `rw` / `erw` | Rewriting using lemmas (especially for `map_onRelation`, `constantsOn`). |
| `tauto` / `intuition` | Logical reasoning in propositional fragments. |
| `omega` | Solving linear arithmetic goals (e.g., inequalities in `liftAt`). |
| `cases'` / `cases` | Case analysis on sums, `Fin`, or inductive types. |
| `split_ifs` | Splitting `if-then-else` expressions. |
| `rcongr` | Congruence for function composition (e.g., `v ∘ g`). |

---

#### **4. Proof Logic**

- **Inductive Structure:**  
  Proofs of `realize_*` lemmas follow *structural induction* on terms or formulas:
  - Base cases (`var`, `falsum`, `equal`, `rel`) reduce to definitions.
  - Inductive steps (`func`, `imp`, `all`) use IH + simplifications.

- **Variable Management:**  
  Key lemmas handle how syntactic operations (`relabel`, `subst`, `liftAt`, `restrictFreeVar`) interact with variable assignments:
  - Precomposition with maps (`v ∘ g`, `v ∘ Sum.map ...`) appears frequently.
  - `Fin`-indexed variables are managed via `cast`, `castAdd`, `natAdd`, `snoc`.

- **Logical Equivalences:**  
  Truth conditions for formulas are often expressed as biconditionals (`↔`) with:
  - `Realize` for bounded formulas,
  - `Realize` + `default` for general formulas,
  - `Sentence.Realize` for sentences.

- **Homomorphism Preservation:**  
  Language maps (`LHom`) preserve realization via `onTerm`, `onBoundedFormula`, etc., proven by induction and `map_onFunction`/`map_onRelation`.

---

#### **5. Imports & Scope**

**Primary Imports:**
- `Mathlib.Data.Finset.Basic`: finite sets for `varFinset`, `freeVarFinset`.
- `Mathlib.ModelTheory.Syntax`: syntax of first-order logic (`Term`, `BoundedFormula`, `Formula`, `Sentence`, `Theory`).
- `Mathlib.Data.List.ProdSigma`: list and sum operations used in `foldr_inf`, `restrictVarLeft`, etc.

**Universe Levels:**
- `u v w u' v'`: universes for language, structures, domains, and variable types.

**Key Aliases & Notations:**
- `open FirstOrder Cardinal Structure Fin`: standard namespaces.
- `infixl:51 " ⊨ "`: satisfaction notation.
- `scoped[FirstOrder] notation:25 A " ≅[" L "] " B:50`: elementary equivalence.

---

This file forms the semantic foundation for forcing and independence proofs (e.g., CH), as in the Flypitch project. It emphasizes *syntactic–semantic commutativity*, enabling robust reasoning about interpretations under variable renaming, substitution, and language expansions.