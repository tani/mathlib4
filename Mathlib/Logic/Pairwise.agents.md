Here's a structured technical metadata summary of the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Pairwise` | `def Pairwise (r : α → α → Prop) := ∀ ⦃i j⦄, i ≠ j → r i j` | Defines that a binary relation `r` holds for all *distinct* pairs. |
| `Set.Pairwise` | `def Set.Pairwise (s : Set α) (r : α → α → Prop) := ∀ ⦃x⦄, x ∈ s → ∀ ⦃y⦄, y ∈ s → x ≠ y → r x y` | Restricts `Pairwise r` to elements of a set `s`. |
| `Pairwise.mono` | `Pairwise r → (∀ ⦃i j⦄, r i j → p i j) → Pairwise p` | Monotonicity: if `r` holds pairwise and `r → p`, then `p` holds pairwise. |
| `Pairwise.eq` | `Pairwise r → ¬r a b → a = b` | Contrapositive: if `r` fails on `a, b`, then `a = b`. |
| `Subsingleton.pairwise` | `[Subsingleton α] → Pairwise r` | In a subsingleton, any relation holds pairwise (vacuously). |
| `Function.injective_iff_pairwise_ne` | `Injective f ↔ Pairwise ((· ≠ ·) on f)` | Characterizes injectivity via pairwise inequality of function values. |
| `Pairwise.comp_of_injective` | `Pairwise r → Injective f → Pairwise (r on f)` | Pullback of pairwise relation along injective function. |
| `Pairwise.of_comp_of_surjective` | `Pairwise (r on f) → Surjective f → Pairwise r` | Pushforward of pairwise relation along surjective function. |
| `Function.Bijective.pairwise_comp_iff` | `Bijective f → Pairwise (r on f) ↔ Pairwise r` | Equivalence for bijective functions. |
| `Set.pairwise_of_forall` | `(∀ a b, r a b) → s.Pairwise r` | If `r` holds universally, it holds pairwise on any set. |
| `Set.Pairwise.imp_on` / `imp` | Strengthening the relation on a set. | Generalizes monotonicity to set-restricted pairwise relations. |
| `Set.Pairwise.eq` | `s.Pairwise r → a ∈ s → b ∈ s → ¬r a b → a = b` | Set-restricted version of `Pairwise.eq`. |
| `Reflexive.set_pairwise_iff` | `Reflexive r → s.Pairwise r ↔ ∀ a ∈ s, ∀ b ∈ s, r a b` | For reflexive `r`, pairwise on `s` is equivalent to universal quantification over `s`. |
| `Set.Pairwise.on_injective` | `s.Pairwise r → Injective f → (∀ x, f x ∈ s) → Pairwise (r on f)` | Pullback of set-pairwise along injective function landing in `s`. |
| `Pairwise.set_pairwise` | `Pairwise r → s.Pairwise r` | Global pairwise implies pairwise on any subset. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `Pairwise.`: for lemmas about the `Pairwise` predicate.
  - `Set.Pairwise.`: for lemmas about set-restricted pairwise relations.
  - `on_`: used in `Pairwise.on_injective`, `comp_of_injective`, etc., indicating composition with a function.
- **Suffixes**:
  - `_iff`: for biconditional characterizations (e.g., `injective_iff_pairwise_ne`).
  - `_eq`: for lemmas equating inequality with failure of relation.
  - `mono`, `imp`, `imp_on`: standard monotonicity/implication lemmas.
- **`comp`**: short for *composition*, as in `Pairwise.comp_of_injective`.

---

### **3. Tactic Stack**

The file uses minimal automation but relies on standard Lean tactics:

- `fun` / `intro`: for lambda abstraction / introduction of hypotheses.
- `exact`: implicit in many proofs via `:=`.
- `not_imp_comm`, `not_imp_not`, `or_iff_not_imp_left`, `or_iff_right_of_imp`: propositional logic rewrites.
- `forall₂_congr`, `forall₄_congr`: congruence lemmas for quantifiers over 2 or 4 variables.
- `ne_of_apply_ne`: from `Function` library, to deduce `f i ≠ f j` from `i ≠ j`.
- `hf.ne`: derived from injectivity: `hf : Injective f ⇒ hf.ne : i ≠ j → f i ≠ f j`.
- `hf.surjective`, `hf.injective`: destructors for `Bijective`.
- `False.elim`, `Subsingleton.elim`: for handling subsingleton and contradiction cases.
- `Eq.ndrec`: dependent equality elimination (used in `Reflexive.set_pairwise_iff`).

No heavy automation like `aesop`, `ring`, or `simp` is used — proofs are mostly direct and propositional.

---

### **4. Proof Logic**

- **Structure**: Most proofs follow a *direct implication* pattern:
  - Assume premises (e.g., `Pairwise r`, `i ≠ j`).
  - Apply hypothesis to get `r i j`.
  - Use monotonicity or composition lemmas to derive target relation.
- **Key patterns**:
  - **Contrapositive reasoning**: `Pairwise.eq` and `Set.Pairwise.eq` use `not_imp_comm`/`of_not_not`.
  - **Quantifier manipulation**: `forall₂_congr`, `forall₄_congr` for rewriting universal statements.
  - **Function composition**: `on f` is handled via injectivity/surjectivity to transfer pairwise properties.
  - **Subsingleton handling**: vacuity via `False.elim` and `Subsingleton.elim`.

---

### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Logic.Function.Basic` | Core function theory: `Injective`, `Surjective`, `Bijective`, `on`, `ne_of_apply_ne`, etc. |
| `Mathlib.Data.Set.Defs` | Set theory basics: `Set`, `mem`, `subset`, etc. |
| `Mathlib.Tactic.Common` | Common tactics and lemmas (e.g., `not_imp_comm`, `or_iff_not_imp_left`, `forall₂_congr`, etc.). |

No heavy dependencies (e.g., algebra, order) — purely logical and set-theoretic.

---

Let me know if you'd like a dependency graph or a formalized summary in a specific format (e.g., for documentation or AI training).