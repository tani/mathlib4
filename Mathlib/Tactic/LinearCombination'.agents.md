### Technical Metadata Brief: `linear_combination'` Tactic (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `pf_add_c`, `c_add_pf`, `add_pf` | `a = b → a + c = b + c`, etc. | Structural lemmas for manipulating equalities under `+` (left/right congruence, binary). |
| `pf_sub_c`, `c_sub_pf`, `sub_pf` | `a = b → a - c = b - c`, etc. | Analogous for subtraction. |
| `neg_pf` | `a = b → -a = -b` | Congruence for negation. |
| `pf_mul_c`, `c_mul_pf`, `mul_pf` | `a = b → a * c = b * c`, etc. | Congruence for multiplication (including nonlinear combinations like `h1 * h2`). |
| `inv_pf`, `pf_div_c`, `c_div_pf`, `div_pf` | `a = b → a⁻¹ = b⁻¹`, etc. | Congruence for inversion and division (used in fields/rings with division). |
| `Expanded` | Inductive type | Represents the result of macro-expanding a linear combination expression: either a proof (`.proof`) or a constant value (`.const`). |
| `expandLinearCombo` | `Expr → Syntax.Term → TermElabM Expanded` | Macro-expands user-written linear combination syntax (e.g., `2 * h1 - h2`) into a proof term using the above lemmas. |
| `eq_trans₃` | `a = b → a = a' → b = b' → a' = b'` | Used in `linear_combination2` to split goal into two subgoals. |
| `eq_of_add` | `a = b → (a' - b') - (a - b) = 0 → a' = b'` | Core lemma for `linear_combination'`: reduces goal equality to proving difference is zero. |
| `eq_of_add_pow` | `a = b → (a' - b')^n - (a - b) = 0 → a' = b'` | Generalization for `exp := n` mode (uses `NoZeroDivisors`). |
| `elabLinearCombination'` | Main elaborator function | Implements tactic logic: builds linear combo, applies `eq_of_add`/`eq_trans₃`, runs normalization. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `pf_`: *proof* congruence — applies a known equality to a subterm (e.g., `pf_add_c` applies `p : a = b` to `+ c` on the right).
  - `c_`: *constant* congruence — applies equality to a term where the constant is on the left (e.g., `c_add_pf` for `a + b = a + c`).
  - `mul_`, `div_`, `inv_`, `neg_`, `add_`, `sub_`: indicate the operation involved.
- **Suffixes**:
  - `_pf`: indicates a lemma that lifts an equality `a = b` through an operation.
- **Tactic Names**:
  - `linear_combination'` (prime): original Lean 4 implementation, supports nonlinear ops (`*`, `/`, `⁻¹`, `←`).
  - `linear_combination2`: variant producing two subgoals (avoids subtraction, works over semirings).

---

#### **3. Tactic Stack**

Frequently used tactics in this file (both internally and in examples):

| Tactic | Role |
|--------|------|
| `ring1`, `ring_nf` | Default normalization (via `norm := tac`); `ring1` closes goals, `ring_nf` leaves subgoals. |
| `simp` | Often used after `norm := skip` (e.g., `simp` after `linear_combination' (norm := skip)`). |
| `refine` | Core tactic to inject proof terms (e.g., `refine eq_of_add $p ?a`). |
| `rw`, `rwa` | Used in proofs of `eq_of_add`/`eq_of_add_pow`. |
| `withSynthesize`, `withSynthesizeLight` | For type inference and synthesis of leaf terms. |
| `whnfR` | Weak head normal form reduction (used to detect if term is an equality). |
| `withRef`, `withMainContext`, `withFreshMacroScope` | Elaboration infrastructure. |

---

#### **4. Proof Logic / Elaboration Flow**

1. **Goal Check**: Ensure goal is an equality `a = b`.
2. **Input Parsing**:
   - If no input (`e`), default to `Eq.refl 0`.
   - Else, call `expandLinearCombo ty e` to build a proof term for a linear combination of hypotheses.
3. **Normalization**:
   - Default: `ring1`.
   - Custom: user-specified `norm := tac`.
4. **Goal Transformation**:
   - **Standard (`linear_combination'`)**:
     - Constructs `p : a' = b'` (linear combo).
     - Applies `eq_of_add p ?h`, reducing goal to `(a' - b') - (a - b) = 0`.
     - Normalizes this subgoal.
   - **Power mode (`exp := n`)**:
     - Uses `eq_of_add_pow n p ?h`, reducing to `(a' - b')^n - (a - b) = 0`.
   - **Two-goal mode (`linear_combination2`)**:
     - Uses `eq_trans₃ p ?a ?b`, splitting into `a = a'` and `b = b'`.
5. **Normalization Subgoals**:
   - Solved by `norm` tactic (e.g., `ring_nf`, `skip`, `aesop`, etc.).

---

#### **5. Imports & Dependencies**

| Import | Purpose |
|--------|---------|
| `Mathlib.Tactic.Ring` | Provides `ring1`, `ring_nf`, and ring-theoretic normalization infrastructure. |
| `Lean`, `Elab`, `Term` | Core Lean metaprogramming infrastructure for tactic elaboration. |
| `Eq`, `Sub`, `Add`, `Mul`, `Inv`, `Div`, `Ring`, `AddGroup`, `NoZeroDivisors` | Typeclass assumptions used in lemmas (e.g., `AddGroup` for subtraction, `Ring` + `NoZeroDivisors` for `eq_of_add_pow`). |

---

### Summary

The `linear_combination'` tactic is a **metaprogrammed linear algebra tool** for simplifying equality goals in `CommRing`s (and richer structures) by constructing weighted combinations of hypotheses and normalizing the residual. Its distinguishing features include:
- Support for **nonlinear operations** on hypotheses (`*`, `/`, `⁻¹`, `←`).
- Flexible normalization via `norm := tac`.
- Power mode via `exp := n`.
- Dual-mode output (`linear_combination2`) for semiring compatibility.

It is maintained for **backward compatibility**, with `linear_combination` (in a separate file) being the more restricted but cleaner modern variant.