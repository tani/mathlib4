### Technical Metadata Brief: `Function.OfArity` and `Function.FromTypes` (Currying/Uncurrying for *n*-ary Functions)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `uncurry` (`FromTypes`) | `{n : ℕ} → {p : Fin n → Type u} → {τ : Type u} → (f : FromTypes p τ) → ((i : Fin n) → p i) → τ` | Converts an *n*-ary heterogeneous function (encoded via `FromTypes`) into a function on dependent tuples (`Fin n → p i`). |
| `curry` (`FromTypes`) | `{n : ℕ} → {p : Fin n → Type u} → {τ : Type u} → (((i : Fin n) → p i) → τ) → FromTypes p τ` | Converts a function on dependent tuples back into an *n*-ary heterogeneous function. |
| `uncurry` (`OfArity`) | `Function.OfArity α β n → (Fin n → α) → β` | Special case of `FromTypes.uncurry` for homogeneous *n*-ary functions (`OfArity α β n`). |
| `curry` (`OfArity`) | `(Fin n → α) → β → Function.OfArity α β n` | Special case of `FromTypes.curry` for homogeneous *n*-ary functions. |
| `curryEquiv` (`FromTypes`) | `(((i : Fin n) → p i) → τ) ≃ FromTypes p τ` | Equivalence between dependent-tuple functions and heterogeneous *n*-ary functions. |
| `curryEquiv` (`OfArity`) | `((Fin n → α) → β) ≃ OfArity α β n` | Equivalence for homogeneous *n*-ary functions. |
| `curry_uncurry` | `curry (uncurry f) = f` | Left-inverse law: currying after uncurrying recovers original *n*-ary function. |
| `uncurry_curry` | `uncurry (curry f) = f` | Right-inverse law: uncurrying after currying recovers original tuple function. |
| `curry_two_eq_curry` | `curry f = Function.curry (f ∘ (piFinTwoEquiv p).symm)` | Relates `curry` for *n*=2 to binary `Function.curry`. |
| `uncurry_two_eq_uncurry` | `uncurry f = Function.uncurry f ∘ piFinTwoEquiv p` | Relates `uncurry` for *n*=2 to binary `Function.uncurry`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `uncurry_`, `curry_`: Standard for the two core operations.
  - `FromTypes_`, `OfArity_`: Namespace prefixes distinguishing heterogeneous vs. homogeneous cases.
- **Suffixes**:
  - `_apply_cons`, `_apply_succ`: Pattern-matching lemmas for recursive definitions (on `Fin` constructors).
  - `_two_eq_...`: Specialization lemmas for *n* = 2, linking to binary `curry`/`uncurry`.
- **Structure**:
  - `curry_uncurry`, `uncurry_curry`: Commutativity laws (inverse properties).
  - `curryEquiv`: Equivalence name (standard in Mathlib for bijective constructions).

---

#### **3. Tactic Stack**

- **Induction**: `induction n with | zero => ... | succ n ih => ...`
- **Extensionality**: `ext args` (to prove function extensionality).
- **Simplification**: `simp`, `simp only [...]`, `rfl`, `congrArg`, `congr_fun`.
- **Rewriting**: `exact ih ...`, `Eq.trans ...`, `congrArg f ...`.
- **Subsingleton reasoning**: `Subsingleton.allEq _ _` (for `n = 0` case).
- **Dependent path handling**: `Fin.cons_self_tail args`, `Fin.tail`, `Fin.succ`, `Fin.cons`.

---

#### **4. Proof Logic**

- **Inductive structure on `n`**: All proofs (e.g., `curry_uncurry`, `uncurry_curry`) proceed by induction on `n : ℕ`.
  - **Base case (`n = 0`)**: Trivial (functions on empty tuples are constants; use `isEmptyElim` or `Subsingleton.allEq`).
  - **Inductive step (`n + 1`)**:
    - Decompose input using `Fin.cons a args` (head + tail).
    - Apply IH to the tail component.
    - Use `funext` (for function extensionality) and `congrArg`/`congr_fun` to match definitions.
- **Key insight**: The recursive definitions of `curry`/`uncurry` mirror the structure of `Fin n` (via `Fin.cons`/`Fin.tail`), enabling clean inductive proofs.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Data.Fin.Tuple.Basic` | Provides `Fin n`, `Fin.cons`, `Fin.tail`, `vecCons`, `vecHead`, `vecTail`, `vecEmpty`. |
| `Mathlib.Logic.Equiv.Fin` | Provides `piFinTwoEquiv`, `finTwoArrowEquiv` (equivalences for `Fin 2`). |
| `Mathlib.Logic.Function.OfArity` | Defines `Function.OfArity` and `Function.FromTypes` (the core types being curried/uncurried). |

---

### Summary

This module formalizes *n*-ary currying/uncurrying as a generalization of binary `curry`/`uncurry`, supporting both homogeneous (`OfArity`) and heterogeneous (`FromTypes`) cases. The design leverages `Fin n`-indexed tuples and dependent types, with proofs by induction on `n`. The `curryEquiv` constructions establish that currying is an isomorphism, and the `*_two_eq_*` lemmas connect the formalism to existing binary operations.