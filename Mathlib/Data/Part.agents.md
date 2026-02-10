Here's a structured technical brief extracted from the provided Lean 4 file `Part.lean`, focusing on formal metadata relevant for building a domain-specific AI agent:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Part α` | `Type u → Type u` | Type of *partial values* over `α`, with a propositional domain and a partial function from the domain to `α`. |
| `Dom o` | `Prop` | Domain proposition of a partial value `o : Part α`. |
| `get o h` | `h : Dom o → α` | Extracts the value of `o` given a proof `h` that `o` is defined. |
| `none : Part α` | `Part α` | The undefined partial value: domain is `False`. |
| `some a : Part α` | `α → Part α` | The total partial value with domain `True` and value `a`. |
| `toOption o [Decidable o.Dom]` | `Option α` | Converts a `Part α` with decidable domain to an `Option α`. |
| `ofOption : Option α → Part α` | `Option α → Part α` | Embeds `Option α` into `Part α`. |
| `equivOption` | `Part α ≃ Option α` | Classical equivalence between `Part α` and `Option α`. |
| `bind o f` | `Part α → (α → Part β) → Part β` | Monadic bind: sequences partial computations. |
| `map f o` | `(α → β) → Part α → Part β` | Maps the value of a partial value, preserving domain. |
| `assert p f` | `Prop → (p → Part α) → Part α` | Adds a condition `p` to the domain of a partial function. |
| `restrict p o H` | `Prop → Part α → (p → Dom o) → Part α` | Replaces domain of `o` with `p`, assuming `p → Dom o`. |
| `unwrap o` | `Part α → α` | *Unsound* function that extracts a value ignoring domain. |
| `Mem o a` | `Prop` | `a ∈ o` iff `o.Dom` and `o.get _ = a`. |
| `ext o p` | `(∀ a, a ∈ o ↔ a ∈ p) → o = p` | Extensionality: two partial values equal if they have same elements. |
| `mem_unique` | `a ∈ o → b ∈ o → a = b` | Uniqueness of values in a partial value. |
| `subsingleton` | `Set.Subsingleton {a | a ∈ o}` | The set of values in `o` is subsingleton (at most one element). |
| `Part.monad` | `Monad Part` | Monadic structure on `Part`. |
| `LawfulMonad Part` | `LawfulMonad Part` | Proves monad laws (e.g., associativity, unit). |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `is_`, `has_`, `mem_`, `dom_`, `get_`, `of_`, `to_`, `some_`, `none_`, `bind_`, `map_`, `assert_`, `restrict_`, `unwrap_`, `equiv_`, `left_`, `right_`, `mul_`, `div_`, `mod_`, `append_`, `inter_`, `union_`, `sdiff_`, `inv_`, `one_`, `pure_`, `ret_`, `seq_`, `seqLeft_`, `seqRight_`.
- **Suffixes**:
  - `_def`, `_eq`, `_iff`, `_mem`, `_dom`, `_some`, `_none`, `_left`, `_right`, `_total`, `_subsingleton`, `_lawful`, `_instance`.
- **Notation**:
  - `a ∈ o` for `Mem o a`.
  - `o.bind f`, `f <$> o`, `o >>= f`, `f <*> o`, `return a`, `pure a`, `1`, `a * b`, `a⁻¹`, etc., via typeclass instances.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only` / `dsimp`
- `rw`, `erw`
- `by_cases`, `split_ifs`
- `ext`, `ext'`
- `aesop` (for automated reasoning in algebraic lemmas)
- `congr`, `congr_arg`
- `cases`, `induction`, `rcases`
- `exact`, `refine`, `intro`, `intro h`, `intro h₁ h₂`
- `apply`, `apply funext`, `apply funext _`
- `subst`, `subst h`, `clear h`
- `unfold`, `change`, `convert`
- `classical`, ` Classical.em`
- `have`, `suffices`, `show`, `haveI`, `instance`

---

### **4. Proof Logic & Strategy**

- **Extensionality**: Prove equality of `Part α` values by showing `∀ a, a ∈ o ↔ a ∈ p`, or via `ext'` using domain equivalence + value agreement.
- **Induction**: `induction_on` pattern: split on `o = none` or `o = some a`.
- **Decidability Handling**: Use `by_cases h : o.Dom` to case-split on decidability assumptions.
- **Algebraic Laws**: Prove via `simp [def]`, `rw [def]`, and `aesop` for group-theoretic properties.
- **Monadic Reasoning**: Use `bind_assoc`, `bind_pure_comp`, `pure_bind`, and `bind_map` to rewrite nested binds/maps.
- **Subsingleton Reasoning**: Use `mem_unique` and `subsingleton` to equate elements in a `Part`.
- **Classical Reasoning**: `equivOption` uses `Classical.dec` to get decidability.

---

### **5. Imports & Dependencies**

| Import | Purpose |
|--------|---------|
| `Mathlib.Data.Set.Subsingleton` | For `Set.Subsingleton` and related lemmas. |
| `Mathlib.Logic.Equiv.Defs` | For `Equiv`, used in `equivOption`. |
| `Mathlib.Algebra.Group.Operations` | Provides algebraic operations (`*`, `/`, `%`, `++`, `∩`, `∪`, `\`, `⁻¹`, `1`) and their properties, used to define `Part α` instances. |

---

### **6. Domain-Specific Notes**

- **Use Case**: `Part α` is used to model *partial computations* where decidability of termination is not assumed (unlike `Option α`). In practice, `PartENat = Part ℕ` is used for partial minimization (`find`).
- **Classical vs Constructive**: `Part α` is *larger* than `Option α` constructively, but classically equivalent.
- **Unsoundness Warning**: `unwrap` is marked `unsafe` and should not be used in verified code.
- **Monadic Interface**: Full `Monad` instance with lawful behavior, including `seq`, `seqLeft`, `seqRight`, and `Functor`/`Applicative` instances.
- **Algebraic Instances**: `Part α` inherits algebraic structure from `α` (e.g., `Mul α → Mul (Part α)`), with lemmas like `mul_mem_mul`, `some_mul_some`, etc.

---

Let me know if you'd like a **Lean 4 AST summary**, **proof automation patterns**, or a **domain model** for AI reasoning over `Part`.