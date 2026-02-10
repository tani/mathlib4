### Technical Brief: `abel` Tactic in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `Context` | Record storing ambient type `α`, universe level, zero element `0 : α`, whether working in a group or monoid, and the instance (`AddCommGroup α` or `AddCommMonoid α`). Used to guide lemma selection. |
| `mkContext (e : Expr)` | Constructs a `Context` by synthesizing `AddCommMonoid α` and optionally `AddCommGroup α`. |
| `M := ReaderT Context AtomM` | Monadic stack for `abel` computations, carrying context and atom state. |
| `Context.app`, `Context.mkApp` | Helper functions to apply constants (e.g., lemmas) to implicit parameters from `Context`. |
| `addG : Name → Name` | Appends `"g"` to names (e.g., `term` → `termg`) to distinguish group-specific lemmas. |
| `term`, `termg` | Type synonyms for normal-form expressions: `n • x + a`, with `n : ℕ` (monoid) or `n : ℤ` (group). |
| `mkTerm`, `intToExpr` | Helpers to construct `term`/`termg` expressions and interpret integers as coefficients. |
| `NormalExpr` | Inductive normal form: `zero e` or `nterm e (n, n_val) (i, x) a`. Tracks expression `e`, coefficient `n`, atom index `i`, atom `x`, and tail `a`. |
| `NormalExpr.e`, `NormalExpr.term'`, `NormalExpr.zero'` | Projection and constructors for `NormalExpr`. |
| `evalAdd`, `evalNeg`, `evalSMul`, `evalSMul'`, `eval` | Recursive normalization functions over expressions: addition, negation, scalar multiplication, and full expression evaluation. |
| `evalAtom` | Converts an arbitrary expression into a normalized atom (e.g., `x = 1 • x + 0`). |
| `abelNFCore`, `abelNFTarget`, `abelNFLocalDecl` | Core normalization engine for `abel_nf`, supporting rewriting in goals or hypotheses. |
| `AbelMode`, `AbelNF.Config` | Configuration for `abel_nf`, including reducibility, recursion into atoms, and output mode (`term` vs `raw`). |
| `term_eq`, `termg_eq` | Definitional equalities: `term n x a = n • x + a`, `termg n x a = n • x + a`. |
| `NormalExpr.isAtom` | Predicate identifying atomic normal forms (`1 • x + 0`). |

**Key Theorems (used in proofs):**
- `const_add_term`, `term_add_const`, `term_add_term`, `zero_term`, `term_neg`, `term_smul`, `term_atom`, `unfold_sub`, `subst_into_*` lemmas (e.g., `subst_into_add`, `subst_into_smul`) — used to justify simplifications during normalization.

---

#### **2. Naming Conventions**

| Pattern | Meaning / Example |
|--------|-------------------|
| `isGroup` | Boolean flag indicating whether working in a group (`true`) or monoid (`false`). |
| `addG` suffix | Group-specific variant of a lemma/name (e.g., `termg`, `term_add_termg`). |
| `g` suffix | Group-specific variants (e.g., `termg`, `smulg`, `unfold_smulg`, `term_atomg`). |
| `eval*` prefix | Evaluation/normalization functions (`evalAdd`, `evalNeg`, `evalSMul`, `eval`, `evalAtom`). |
| `subst_into_*` | Substitution lemmas for rewriting under operators (`+`, `•`, `-`). |
| `nterm` constructor | Non-zero term in normal form: `n • x + a`. |
| `zero'`, `term'` | Constructors for `NormalExpr` (prime indicates monadic return). |

---

#### **3. Tactic Stack**

| Tactic / Utility | Usage in `abel` |
|------------------|-----------------|
| `aesop`, `simp`, `simp_rw` | Not used directly in core `abel`, but `simp` is used in proofs of helper theorems (e.g., `term_add_term`). |
| `ring`, `norm_num` | Used internally via `Mathlib.Meta.NormNum.eval` for coefficient arithmetic (e.g., `n₁ + n₂`). |
| `mkEqTrans`, `mkEqSymm`, `mkEqRefl` | Proof construction for equality chains. |
| `synthInstance`, `inferType`, `isDefEq` | Typeclass inference and type checking in `mkContext`, `eval`, etc. |
| `ReaderT`, `AtomM`, `MetaM` | Core monadic stack for stateful computation over expressions. |
| `trace[abel]`, `trace[abel.detail]` | Debug tracing for tactic execution. |

---

#### **4. Proof Logic & Normalization Flow**

1. **Context Setup**  
   - `mkContext` synthesizes `AddCommMonoid α` and checks for `AddCommGroup α`.  
   - Stores zero element `0 : α` and instance for later lemma application.

2. **Expression Parsing**  
   - `eval` recursively deconstructs input expression using `getAppFnArgs`.  
   - Handles: `+`, `-`, `•`, `neg`, `smul`, `smulg`, `0`, atoms.

3. **Normalization**  
   - Atoms (`evalAtom`) are converted to `1 • x + 0`.  
   - Sums are normalized via `evalAdd`, merging like atoms (`x`) and recursing on tails.  
   - Negation (`evalNeg`) flips coefficients and tails.  
   - Scalar multiplication (`evalSMul'`) distributes over terms, handling `ℕ`/`ℤ` coercion.

4. **Equality Checking**  
   - For `abel1`, both sides are normalized to `NormalExpr`.  
   - If `e₁' ≡ e₂'` definitionally, the goal is solved via transitivity of proofs `p₁`, `p₂`.

5. **`abel_nf` (Rewriting)**  
   - Uses `abelNFCore` to rewrite expressions into normal form.  
   - Supports `!` for aggressive reducibility, `recursive` for deep atom simplification, and `raw`/`term` output modes.

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Tactic.NormNum.Basic` | For numeric normalization (`eval`, `evalSMul`). |
| `Mathlib.Tactic.TryThis` | Used in `abel` macro fallback to `abel_nf`. |
| `Mathlib.Util.AtomM` | Manages atom ordering and fresh identifiers for normalization. |
| `Lean.*`, `Meta.*`, `Tactic.*` | Core Lean metaprogramming infrastructure. |

---

### Summary

The `abel` tactic is a **decision procedure** for equations in additive commutative monoids/groups, based on:
- **Normal form**: `∑ nᵢ • xᵢ + a`, where atoms `xᵢ` are ordered and coefficients `nᵢ ∈ ℤ` (or `ℕ`).
- **Monadic structure**: `ReaderT Context AtomM` enables context-aware normalization and atom management.
- **Proof-carrying normalization**: Each step is justified by lemmas like `term_add_term`, `term_neg`, etc.

It powers both:
- `abel1` / `abel1!`: Goal-solving tactic (fails if not provable).
- `abel_nf`: Rewriting tactic for simplifying expressions in hypotheses or goals.

The design emphasizes **efficiency** (caching, indexing atoms by `ℕ`) and **modularity** (group/monoid branching via `isGroup`).