**Technical Metadata Brief: Lean 4 File — `Mathlib.Lean.Expr.ReplaceRec`**

---

### 1. **Key Definitions & Theorems**

- **`Expr.ReplaceRec`**  
  *Type:* `Expr → Expr → Expr → Expr`  
  *Purpose:* Recursively replaces all occurrences of a subexpression `old` with `new` in a given expression `e`, respecting binding structure (i.e., avoids capture via α-conversion). Implements a *structural substitution* over expressions.

- **`Expr.replaceRec`** *(likely the main exported definition)*  
  *Type:* Same as above  
  *Purpose:* Public-facing wrapper or definition of the recursive replacement operation; used for metaprogramming and tactic writing where safe substitution is needed.

> *Note:* The file name and imports suggest this module formalizes a *recursive expression replacement* utility, likely foundational for metaprogramming (e.g., in tactic automation, normalization by evaluation, or term rewriting).

---

### 2. **Naming Conventions**

- **Prefixes:**
  - `replaceRec` — indicates *recursive* replacement (as opposed to `replace`, which may be non-recursive or shallow).
  - `Expr.` — namespace for expression-related utilities in `Mathlib.Lean.Expr.*`.

- **Suffixes:**
  - `Rec` — commonly used in Lean 4 to denote *recursive* variants of operations (e.g., `replaceRec`, `replaceRecOn`, `foldRec`, `mapRec`).

- **Pattern:**  
  `Expr.[Operation][Rec]` — e.g., `replaceRec`, possibly followed by helper lemmas like `replaceRec_eq`, `replaceRec_congr`, etc. (not visible in snippet but typical).

---

### 3. **Tactic Stack**

- **Likely tactics used in proofs/definitions (inferred from Lean 4 Mathlib style):**
  - `simp` / `simp only` — for simplifying expressions using definitional equalities.
  - `congr` / `congr'` — to prove equality of expressions by congruence.
  - `induction` — on structure of `Expr` (e.g., `expr.induction_on`).
  - `aesop` — for automated reasoning in metaprogramming contexts.
  - `rw [replaceRec]` — rewriting using the definition.
  - `ext` — extensionality for lambda/forall terms.
  - `alpha` — for α-equivalence reasoning (binding structure).

> *Note:* The file itself is low-level (imports `Expr.Basic`, `Expr.ReplaceRec`), so it likely contains *definitions* and *lemmas*, not tactic scripts — but supporting lemmas may use these tactics.

---

### 4. **Proof Logic**

- **Structure of proofs/definitions:**
  - **Structural recursion** on `Expr` (via `Expr.recOn` or `Expr.fold`).
  - **Case analysis** on expression form: `const`, `fvar`, `bvar`, `app`, `lam`, `letE`, `mvar`, `proj`, etc.
  - **Binding-aware handling:** For `lam`/`letE`, rename bound variables if necessary to avoid capture (handled internally by `replaceRec`).
  - **Lemmas** (e.g., `replaceRec_id`, `replaceRec_comp`, `replaceRec_commute`) proven by induction on expression structure, using α-equivalence and substitution lemmas.

- **Typical proof flow:**
  ```text
  induction e generalizing x y,
  · repeat { cases e; try { simp [replaceRec] } },
  · use α-conversion or fresh variable trick for binders,
  · apply congr_arg / congr_fun for function/application cases.
  ```

---

### 5. **Imports**

- **`Mathlib.Lean.Expr.Basic`**  
  → Core `Expr` type, constructors, basic operations (`isApp`, `isLambda`, etc.), and utilities.

- **`Mathlib.Lean.Expr.ReplaceRec`**  
  → This file itself — suggests a self-contained module, possibly re-exporting or refining earlier definitions.

> *Note:* The import structure implies this is part of the *Lean metaprogramming infrastructure* in Mathlib, likely used by higher-level tactic libraries (e.g., `tactic.interactive`, `tactic.norm_num`, or `meta.interactive`).

---

### Summary

This file formalizes a **safe, recursive expression substitution** mechanism (`replaceRec`) for Lean’s internal `Expr` type — a critical primitive for metaprogramming, term rewriting, and tactic construction. It follows Lean 4’s naming and recursion conventions, and its correctness relies on careful handling of binding structure (α-equivalence). The module is foundational and likely used indirectly by many higher-level tactics.