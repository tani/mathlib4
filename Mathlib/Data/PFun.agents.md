### Technical Brief: `Mathlib.Data.PFun` (Partial Functions in Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `PFun α β` | `Type u → Type v → Type (max u v)` | Type of partial functions from `α` to `β`, defined as `α → Part β`. |
| `Dom f` | `Set α` | Domain of definition of partial function `f`. |
| `fn f a h` | `Dom f a → β` | Evaluation of `f` at `a`, given proof `h : a ∈ Dom f`. |
| `evalOpt f x` | `Option β` | Decidable-domain version: returns `some b` if `f x = some b`, else `none`. |
| `lift f` | `α →. β` | Embeds total function `f : α → β` as a partial function. |
| `id α` | `α →. α` | Identity partial function: `a ↦ some a`. |
| `comp f g` | `β →. γ → α →. β → α →. γ` | Composition: `(f.comp g) a = g a >>= f`. |
| `restrict f h` | `p ⊆ Dom f → α →. β` | Restricts domain of `f` to subset `p`. |
| `res f s` | `α →. β` | Total function `f` restricted to domain `s`. |
| `bind f g` | `α →. β → (β → α →. γ) → α →. γ` | Monad bind: pointwise `Part.bind`. |
| `pure x` | `α →. β` | Constant partial function returning `some x`. |
| `map f g` | `(β → γ) → α →. β → α →. γ` | Monad map: pointwise `Part.map`. |
| `fix f` | `α →. β ⊕ α → α →. β` | First-return map: iterates `f` until hitting `β`, if possible. |
| `mem_fix_iff` | `b ∈ f.fix a ↔ Sum.inl b ∈ f a ∨ ∃ a', Sum.inr a' ∈ f a ∧ b ∈ f.fix a'` | Characterizes membership in `fix`. |
| `fix_stop` / `fix_fwd_eq` | `Sum.inl b ∈ f a → b ∈ f.fix a` / `Sum.inr a' ∈ f a → f.fix a = f.fix a'` | Basic behavior lemmas for `fix`. |
| `fixInduction` / `fixInduction'` | Recursion principles for `fix`. | Structural induction on the iteration path of `fix`. |
| `graph f` | `Set (α × β)` | Graph as set of pairs `(a, b)` with `b ∈ f a`. |
| `graph' f` | `Rel α β` | Graph as a relation: `graph' f a b ↔ b ∈ f a`. |
| `image f s` | `Set β` | `{ b | ∃ a ∈ s, b ∈ f a }`. |
| `preimage f s` | `Set α` | `{ a | ∃ b ∈ s, b ∈ f a }`. |
| `core f s` | `Set α` | `{ a | f a ⊆ s }` (if defined, values land in `s`). |
| `prodLift f g` | `α →. β × γ` | Pairing of two partial functions on same domain. |
| `prodMap f g` | `α × β →. γ × δ` | Product of partial functions on product domain. |
| `equivSubtype` | `(α →. β) ≃ Σ p, Subtype p → β` | Equivalence between partial functions and dependent pairs `(p, f : Subtype p → β)`. |

**Theorems of Note**:
- `ext`: Extensionality: `∀ a b, b ∈ f a ↔ b ∈ g a → f = g`.
- `lift_injective`: `lift` is injective.
- `dom_coe`, `dom_comp`, `dom_prodLift`, etc.: Domain computations.
- `preimage_eq`, `core_eq`, `preimage_asSubtype`: Relations between `preimage`, `core`, and `Dom`.
- `monad`, `lawfulMonad`: `PFun α` is a monad (with `pure`, `bind`, `map`).
- `fixInduction_spec`, `fixInduction'_stop`, `fixInduction'_fwd`: Computational behavior of induction principles.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`, `mem_`, `dom_`, `graph_`, `preimage_`, `core_`, `image_`, `lift_`, `res_`, `fix_`, `prodLift_`, `prodMap_`, `comp_`, `bind_`, `pure_`, `map_`, `equivSubtype_`, `asSubtype_`, `toSubtype_`, `evalOpt_`.
- **Suffixes**:
  - `_apply`: Evaluation lemmas (`fn_apply`, `bind_apply`, `comp_apply`, `prodLift_apply`, etc.).
  - `_def`: Definition simplifications (`image_def`, `Preimage_def`, `core_def`, `graph_def`).
  - `_mono`: Monotonicity (`image_mono`, `preimage_mono`, `core_mono`).
  - `_iff`: Biconditional characterizations (`mem_dom`, `mem_preimage`, `mem_fix_iff`, `mem_prodLift`, etc.).
  - `_spec`: Specification lemmas for eliminators (`fixInduction_spec`, `fixInduction'_stop`, `fixInduction'_fwd`).
- **Infix**:
  - `→.` for `PFun`.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `simp` / `simp_rw`: Dominant simplifier, especially with `← exists_and_right`, `and_comm`, `exists_comm`.
- `ext`: Extensionality (for functions, sets, relations).
- `cases`: Case analysis on `Part`, `Sum`, `∃`, `∧`.
- `rw`: Rewriting using lemmas like `Part.mem_bind_iff`, `Part.mem_mk_iff`, `Part.get_eq_of_mem`.
- `subst`: Substitution after `injection` or `Part.mem_unique`.
- `exact`, `refine`, `apply`: Goal-directed proof construction.
- `induction`: Well-founded induction on `Acc` for `fix`-related lemmas.
- `dsimp`, `unfold`: For unfolding definitions (e.g., `fix`, `bind`, `comp`).
- `congr`: Congruence for function equality.
- `aesop`: Not explicitly used here, but `tidy?`-derived proofs suggest similar automation.
- `generalize_proofs`: Used in `fixInduction` to manage proof terms.

---

#### **4. Proof Logic**

- **Inductive/Recursive Proofs**:
  - `fix` and its induction principles (`fixInduction`, `fixInduction'`) rely on **well-founded induction** on the accessibility predicate `Acc (fun x y => Sum.inr x ∈ f y)`.
  - Proofs often split on `e : (f a).get h = Sum.inl b | Sum.inr a'`.
- **Set-Theoretic Reasoning**:
  - Many lemmas (e.g., `preimage_eq`, `core_eq`, `image_union`) use `Set.ext` + `simp` with membership characterizations.
- **Extensionality**:
  - `ext` and `ext'` are standard for proving `f = g` via pointwise equivalence of definitions.
- **Equational Reasoning**:
  - Heavy use of `Part.mem_*` lemmas and `Part.get_mem`, `Part.mem_unique` to reason about equality of values.
- **Monadic Structure**:
  - Proofs of monad laws (e.g., `bind_assoc`, `pure_bind`) reduce to `Part` lemmas via `funext` and `simp`.

---

#### **5. Imports & Dependencies**

| Module | Purpose |
|--------|---------|
| `Mathlib.Data.Part` | Core theory of `Part α` (partial values), used to define `PFun`. |
| `Mathlib.Data.Rel` | General relational calculus (`image`, `preimage`, `core`, `graph` as `Rel` operations). |
| `Batteries.WF` | Well-founded recursion (`Acc`, `WellFounded.fixF`, `WellFounded.fixFEq`). |
| `Function` | Opened namespace for `Function.comp`, etc. |

**Scope**: This module formalizes partial functions as `α → Part β`, with rich structure:
- Set-theoretic semantics (domain, image, preimage, core, graph).
- Monadic interface (with lawful monad instance).
- Iteration semantics via `fix` (for halting recursion on `β ⊕ α`).
- Equivalence with subtype-valued functions (`equivSubtype`).

It serves as a foundational library for reasoning about *partiality*, *non-determinism*, and *partial evaluation* in dependent type theory.

--- 

Let me know if you'd like a diagram of the hierarchy or a summary of how `fix` relates to operational semantics.