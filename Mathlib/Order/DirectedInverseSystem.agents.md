Here's a structured technical metadata summary extracted from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `DirectedSystem` | `class` | Encodes functoriality of a directed system over a preorder: identity and composition preservation. |
| `InverseSystem` | `class` | Dual to `DirectedSystem`; encodes contravariant functoriality for inverse systems. |
| `DirectLimit.setoid` | `Σ i, F i → Σ i, F i → Prop` | Defines equivalence relation on disjoint union for direct limit construction. |
| `DirectLimit` | `Type _` | Quotient of `Σ i, F i` by `setoid`; represents colimit of directed system. |
| `DirectLimit.lift` | `(∀ i, F i → C) → compat → DirectLimit → C` | Universal property: constructing maps out of direct limit. |
| `DirectLimit.map` | `(∀ i, F₁ i → F₂ i) → compat → DirectLimit F₁ → DirectLimit F₂` | Functoriality of direct limit. |
| `DirectLimit.lift₂`, `map₂` | Binary analogues of `lift`, `map` | For defining binary operations on direct limits. |
| `InverseSystem.limit` | `Set (∀ l : Iio i, F l)` | Inverse limit at index `i`: compatible families over lower set `Iio i`. |
| `piLT` | `ι → Type* → ι → Type*` | `piLT X i = ∀ l : Iio i, X l`: product over elements strictly below `i`. |
| `piLTProj` | `piLT X j → piLT X i` (for `i ≤ j`) | Projection map between `piLT` types. |
| `piLTLim` | `piLT X i ≃ limit (piLTProj (X := X)) i` | At a limit ordinal `i`, `piLT X i` is the inverse limit of earlier `piLT X j`. |
| `piSplitLE` | `piLT X i × X i ≃ ∀ j : Iic i, X j` | Splits off the top element `i` from the product over `Iic i`. |
| `IsNatEquiv` | `Prop` | Naturality condition for a family of equivalences `F j ≃ piLT X j`. |
| `PEquivOn` | `structure` | Bundles: (1) partial family of equivalences, (2) naturality, (3) compatibility with `F i⁺ ≃ F i × X i`. |
| `invLimEquiv` | `limit f i ≃ limit (piLTProj (X := X)) i` | Natural family of bijections below a limit induces bijection at limit. |
| `piEquivSucc`, `piEquivLim` | `∀ j : Iic i⁺, F j ≃ piLT X j`, `∀ j : Iic i, F j ≃ piLT X j` | Extensions of natural families to successor and limit ordinals. |
| `pEquivOnGlue` | `PEquivOn f equivSucc (Iio i)` | Glues natural families over all `j < i` into one over `Iio i`, using `compat`. |
| `unique_pEquivOn` | `e₁ = e₂` | Uniqueness of `PEquivOn` on lower sets; crucial for well-definedness of gluing. |
| `pEquivOnSucc`, `pEquivOnLim` | Extensions of `PEquivOn` by one step (successor / limit) | Inductive steps in transfinite recursion. |
| `globalEquivAux`, `globalEquiv` | `F i ≃ piLT X i` | Global family of bijections constructed via transfinite recursion. |
| `globalEquiv_naturality`, `globalEquiv_compatibility` | Naturality & compatibility of `globalEquiv` | Ensures coherence of the constructed bijection with system maps. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `piLT*`: for constructions involving products over lower sets (`Iio`, `Iic`).
  - `DirectLimit.*`, `InverseSystem.*`: module-scoped definitions.
  - `pEquivOn*`: for partial equivalences with extra structure (`PEquivOn`).
  - `invLim*`, `piLTLim*`: limit-related constructions.
  - `map*`, `lift*`: universal property variants (unary/binary).
- **Suffixes**:
  - `Succ`, `Lim`: indicate successor/limit ordinal cases.
  - `glue`, `compat`: denote compatibility conditions.
  - `proj`: projection maps.
  - `split`: splitting off a factor (e.g., `piSplitLE`).
- **Variables**:
  - `i, j, k, l`: indices in preorder/well-order.
  - `F, X`: families of types.
  - `f`: transition maps (direct/inverse).
  - `equiv`, `nat`, `compat`: standard assumptions in limit/successor cases.

---

### **3. Tactic Stack**

Frequent tactics used in proofs:
- `simp_rw`, `simp`: for rewriting using definitional equalities and lemmas.
- `rw`, `apply`, `exact`: basic rewriting and application.
- `ext`, `funext`: extensionality for functions/sets.
- `cases`, `obtain`, `rcases`: destructuring hypotheses.
- `have`, `set`: intermediate lemma introduction.
- `convert`, `congr_arg`, `congr_fun`: congruence reasoning.
- `by_cases`, `split_ifs`: case analysis on decidable propositions.
- `transitivity`, `trans`: transitivity of equality/equivalence.
- `induction`, `recOn`, `hrecOn₂`, `induction₃`: structural induction on quotients.
- `aesop`: for routine automation (not explicitly used here, but `simp`-heavy proofs suggest similar).
- `conv_rhs`: for targeted rewriting in right-hand side.

---

### **4. Proof Logic**

- **Inductive/Recursive Structure**:
  - Transfinite recursion over a well-founded preorder (`WellFoundedLT ι`).
  - Base case: `Iic i` for minimal `i`.
  - Successor step: extend from `Iic i` to `Iic i⁺` using `piEquivSucc` / `pEquivOnSucc`.
  - Limit step: glue over `Iio i` using `pEquivOnGlue`, then extend to `Iic i` via `pEquivOnLim`.
- **Key Logical Moves**:
  - Use of `exists_ge_ge` to find common upper bound in directed systems.
  - Naturality (`IsNatEquiv`) ensures compatibility across maps.
  - `compat` condition in `PEquivOn` ensures uniqueness and glueability at limits.
  - `unique_pEquivOn` + `pEquivOn_apply_eq` guarantee well-definedness of glued families.
- **Limit Case Strategy**:
  - Identify `piLT X i` as inverse limit of earlier `piLT X j`.
  - Use `invLimEquiv` to get `limit f i ≃ piLT X i`.
  - Combine with `equivLim : F i ≃ limit f i` to get `F i ≃ piLT X i`.
  - Ensure naturality and `compat` hold via `isNatEquiv_piEquivLim`, `compat` proof.

---

### **5. Imports**

- `Mathlib.Order.SuccPred.Limit`: Provides tools for ordinals, successors, limits, midpoints (`IsSuccPrelimit`, `mid`).
- `Mathlib.Order.UpperLower.Basic`: Defines lower/upper sets, `Iio`, `Iic`, `IsLowerSet`, etc.

These imports indicate the formalization is grounded in order theory and ordinal recursion, with heavy use of:
- Preorders, partial orders, linear orders.
- Initial segments (`Iio`, `Iic`).
- Well-founded recursion (`SuccOrder`, `WellFoundedLT`).
- Limits and colimits in categorical terms (via `limit`, `DirectLimit`).

---

Let me know if you'd like a diagrammatic summary of the limit/successor extension steps or a formalization roadmap for similar inverse system cardinality arguments.