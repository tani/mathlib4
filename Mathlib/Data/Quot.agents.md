Here's a structured technical brief extracted from the provided Lean 4 file on **quotient types**, focusing on formalization metadata for domain-specific AI agent training:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Setoid.r` | `Setoid α → α → α → Prop` | Underlying relation of a `Setoid`; coerced to function via `CoeFun`. |
| `Setoid.ext` | `∀ {s t : Setoid α}, (∀ a b, s a b ↔ t a b) → s = t` | Extensionality for setoids. |
| `Quot.mk` | `α → Quot r` | Constructor for quotient elements (notation `⟦a⟧`). |
| `Quot.induction_on` | Eliminator for `Quot r`. | Induction principle for quotients. |
| `Quot.map` | `(α → β) → (∀ a b, r a b → s (f a) (f b)) → Quot r → Quot s` | Lifts functions to quotients. |
| `Quot.lift` | `(α → γ) → (∀ a b, r a b → f a = f b) → Quot r → γ` | Universal property: maps out of quotient. |
| `Quot.lift₂` | Lifts binary functions to quotients. | Generalizes `Quot.lift` to 2 arguments. |
| `Quot.map₂` | Lifts binary functions to quotient-valued functions. | For operations like addition on quotients. |
| `Quotient.mk` | `α → Quotient s` | Constructor for `Quotient s` (same as `Quot.mk`, but for `Setoid`). |
| `Quotient.map` | `(α → β) → (∀ a b, a ≈ b → f a ≈ f b) → Quotient s₁ → Quotient s₂` | Unary operation lift for `Setoid` quotients. |
| `Quotient.map₂` | Binary operation lift for `Setoid` quotients. | Ensures well-definedness under equivalence. |
| `Quotient.lift` / `Quotient.lift₂` | Analogous to `Quot.lift`, but for `Setoid`. | Core elimination principles for `Quotient`. |
| `Quotient.eq` | `⟦a⟧ = ⟦b⟧ ↔ r a b` | Exactness of quotient construction. |
| `Quotient.out` | `Quotient s → α` | Noncomputable choice of representative (uses `Classical.choose`). |
| `Trunc α` | `Quotient trueSetoid α` | Propositional truncation as a quotient by the trivial relation. |
| `Trunc.mk`, `Trunc.lift`, `Trunc.bind` | Monadic structure on `Trunc`. | `Trunc` is a monad; used for propositional truncation in HoTT-style reasoning. |
| `Quotient.mk''` | `α → Quotient s` (implicit `Setoid`) | Variant of `Quotient.mk` using unification instead of typeclass inference. |
| `Quotient.liftOn'`, `Quotient.map'`, etc. | `'`-variants of quotient operations. | Designed for multiple quotient structures on same type (e.g., groups, rings). |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `mk`: constructor (e.g., `mk`, `mk''`, `mk'`).
  - `lift`, `liftOn`: elimination via universal property.
  - `map`, `map₂`: lifting functions to quotients.
  - `rec`, `recOn`, `recOnSubsingleton`: recursion/induction principles.
  - `ind`, `induction_on`: induction principles.
  - `out`, `unquot`: extraction of representatives.
  - `factor`, `hrecOn`, `hrecOn₂`: higher-order or heterogeneous recursor variants.
- **Suffixes**:
  - `'`: unification-based variant (e.g., `mk''`, `liftOn'`, `map'`).
  - `₂`, `₃`: binary/ternary versions (e.g., `lift₂`, `induction_on₂`, `hrecOn₂`).
  - `eq`, `sound`, `exact`: properties of equality in quotient.
- **Notation**:
  - `⟦a⟧`: `Quot.mk r a` or `Quotient.mk s a`.
  - `≈`: equivalence relation of a `Setoid`.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rfl`: for definitional equalities (e.g., `lift_mk`, `map_mk`).
- `simp [heq_self_iff_true]`: simplifying heterogeneous equality goals.
- `funext`, `propext`, `congr_arg`: extensionality reasoning.
- `subst`, `induction_on`, `recOn`, `recOnSubsingleton`: elimination.
- `exact`, `apply`, `intro`, `cases`: basic proof structure.
- `have`, `show`, `rw`: intermediate steps and rewriting.
- `Classical.choose`, `Classical.choose_spec`: for `out`/`out_eq`.
- `Quot.induction_on`, `Quotient.induction_on`: core induction tactics.

---

### **4. Proof Logic**

- **Inductive structure**: Most proofs follow **induction on quotient elements** using `induction_on`, `recOn`, or `recOnSubsingleton`.
- **Well-definedness**: For maps (`map`, `lift`, `map₂`, `lift₂`), proofs verify compatibility with the equivalence relation (`ra a₁ a₂ → ...`).
- **Subsingleton reasoning**: Many results assume or derive `Subsingleton` to simplify equality proofs (e.g., `recOnSubsingleton`, `induction_on₂`).
- **Heterogeneous equality (`HEq`)**: Used in `hrecOn`, `hrecOn₂` to handle dependent types where equality may not be type-correct.
- **Axiom of choice**: `out` and `out_eq` rely on `Classical.choose` and ` Classical.choose_spec`.
- **Monadic structure**: `Trunc` proofs use `induction_on`, `eq`, and `bind_assoc` to verify monad laws.

---

### **5. Imports**

- `Mathlib.Logic.Relation`: For `Equivalence`, `Relation.EqvGen`.
- `Mathlib.Logic.Unique`: For `Subsingleton`, `Unique`.
- `Mathlib.Util.Notation3`: For custom notation (`notation3`).
- `Init.Core` (implicit): Core quotient definitions (`Quot`, `Setoid`).

---

### **Domain-Specific AI Agent Notes**

- **Focus areas**: Quotient types, equivalence relations, dependent elimination, propositional truncation.
- **Common patterns**: Lifting functions, proving well-definedness, using `Subsingleton` to simplify proofs.
- **Key lemmas for automation**: `lift_mk`, `map_mk`, `Quotient.eq`, `Quotient.out_eq`, `Trunc.eq`.
- **Avoid**: Confusing `Quot` (for arbitrary relations) vs `Quotient` (for `Setoid`s); use `'`-variants when multiple quotient structures coexist.

--- 

Let me know if you'd like this exported as JSON or YAML for ingestion into a formalization assistant.