### Technical Brief: `TypeVec` Module in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `TypeVec n` | `ℕ → Type u` | An `n`-tuple of types, modeled as `Fin2 n → Type*`. |
| `Arrow α β` | `α ⟹ β := ∀ i, α i → β i` | Morphisms (natural transformations) between `TypeVec`s. |
| `comp f g` | `β ⟹ γ → α ⟹ β → α ⟹ γ` | Pointwise composition of arrows. |
| `id` | `α ⟹ α` | Identity arrow (pointwise identity function). |
| `append1 α β` | `TypeVec n → Type* → TypeVec (n+1)` | Append type `β` to the end of an `n`-tuple. Notation: `α ::: β`. |
| `drop α` | `TypeVec (n+1) → TypeVec n` | Drop last component of an `(n+1)`-tuple. |
| `last α` | `TypeVec (n+1) → Type*` | Extract last component of an `(n+1)`-tuple. |
| `appendFun f g` | `α ⟹ α' → β → β' → (α ::: β) ⟹ (α' ::: β')` | Extend arrow `f` with function `g`. Notation: `f ::: g`. |
| `dropFun f` | `α ⟹ β → drop α ⟹ drop β` | Restrict arrow to prefix. |
| `lastFun f` | `α ⟹ β → last α → last β` | Extract last component of arrow. |
| `splitFun f g` | `drop α ⟹ drop β → last α → last β → α ⟹ β` | Construct arrow from prefix + last parts. |
| `repeat n t` | `ℕ → Type* → TypeVec n` | Constant vector of length `n` with all entries `t`. |
| `prod α β` | `TypeVec n → TypeVec n → TypeVec n` | Pointwise product of vectors. Notation: `α ⊗ β`. |
| `prod.map f g` | `α ⟹ β → α' ⟹ β' → α ⊗ α' ⟹ β ⊗ β'` | Functorial action of `prod`. Notation: `f ⊗' g`. |
| `repeatEq α` | `α ⊗ α ⟹ repeat _ Prop` | Equality predicate vector (pointwise equality). |
| `Subtype_ p` | `(α ⟹ repeat _ Prop) → TypeVec n` | Vector of subtypes defined by predicate `p`. |
| `diagSub` | `α ⟹ Subtype_ (repeatEq α)` | Diagonal embedding into equality subtype. |
| `toSubtype / ofSubtype` | `Subtype_ p ↔ fun i => {x // p i x}` | Equivalence between subtype-of-vector and vector-of-subtypes. |
| `append1_drop_last` | `append1 (drop α) (last α) = α` | Structural decomposition of `(n+1)`-vectors. |
| `split_dropFun_lastFun` | `splitFun (dropFun f) (lastFun f) = f` | Arrow decomposition lemma. |
| `eq_of_drop_last_eq` | `(dropFun f = dropFun g) → (lastFun f = lastFun g) → f = g` | Extensionality for arrows. |

**Key Theorems (Proof Structure Highlights)**  
- `comp_assoc`, `id_comp`, `comp_id`: Category laws for `TypeVec n`.  
- `appendFun_comp`: `appendFun` respects composition: `(f₁ ⊚ f₀) ::: (g₁ ∘ g₀) = (f₁ ::: g₁) ⊚ (f₀ ::: g₀)`.  
- `dropFun_comp`, `lastFun_comp`: `dropFun` and `lastFun` preserve composition.  
- `subtypeVal_toSubtype`, `toSubtype_of_subtype`: Retractions between `Subtype_ p` and `fun i => {x // p i x}`.  
- `repeatEq_iff_eq`: `repeatEq α` encodes equality: `ofRepeat (repeatEq α i (prod.mk x y)) ↔ x = y`.

---

#### **2. Naming Conventions**

| Pattern | Meaning | Examples |
|--------|---------|----------|
| `drop*` | Prefix extraction (remove last element) | `drop`, `dropFun`, `drop_append1`, `dropFun_comp` |
| `last*` | Last-element extraction | `last`, `lastFun`, `last_append1`, `lastFun_comp` |
| `append*` | Append element/function | `append1`, `appendFun`, `append_prod_appendFun` |
| `split*` | Decompose/construct from prefix + last | `splitFun`, `split_dropFun_lastFun`, `splitFun_inj` |
| `typevecCases*` | Induction/cases principles for `TypeVec` | `casesCons`, `typevecCasesCons₃`, `typevecCasesNil₂` |
| `prod.*` | Product-related operations | `prod.fst`, `prod.snd`, `prod.diag`, `prod.map`, `prod.mk` |
| `repeat*` | Constant vector operations | `repeat`, `repeatEq`, `dropRepeat`, `ofRepeat` |
| `Subtype_*` | Subtype lifting | `Subtype_`, `subtypeVal`, `toSubtype`, `diagSub` |
| `Arrow.*` | Equality-induced arrows | `Arrow.mp`, `Arrow.mpr` |

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rfl`: For definitional equalities (e.g., `drop_append1`, `last_append1`).
- `funext`, `ext`: Extensionality for functions/arrows.
- `induction n`: Structural induction on `n : ℕ`.
- `cases i`: Case analysis on `i : Fin2 n` (using `Fin2.fs`, `Fin2.fz`).
- `simp [*, dropFun, lastFun, appendFun]`: Simplification using lemmas about `dropFun`, `lastFun`, etc.
- `rw [← append1_drop_last]`: Rewriting using structural decomposition.
- `congr_fun`, `congr_arg`: Equality reasoning for function/application.
- `cast (by simp)`: Transport along propositional equalities (e.g., in `casesCons`).
- `apply_assumption`, `aesop`: For automation in simple goals (commented in porting notes).
- `by apply Fin2.elim0 i`: Handling empty vectors (`n = 0`).

---

#### **4. Proof Logic**

**Common Proof Strategy**:
1. **Structural decomposition**: Use `append1_drop_last α` to rewrite `α` as `drop α ::: last α`.
2. **Arrow decomposition**: Apply `split_dropFun_lastFun f` to reduce `f : α ⟹ β` to `splitFun (dropFun f) (lastFun f)`.
3. **Case split on `i : Fin2 n`**: Prove pointwise equality by cases on `i = fs j` or `i = fz`.
4. **Induction on `n`**: For lemmas about `repeat`, `prod`, `Subtype_`, etc.
5. **Use `eq_of_drop_last_eq`**: To prove arrow equality by checking prefix and last parts separately.

**Example Flow** (e.g., `appendFun_comp`):
- Expand `appendFun` as `splitFun`.
- Apply `splitFun_comp` to decompose composition.
- Use `eq_of_drop_last_eq` to reduce to `dropFun` and `lastFun` equalities.
- Simplify using `dropFun_appendFun`, `lastFun_appendFun`, and `comp`.

---

#### **5. Imports & Scope**

**Primary Imports**:
- `Mathlib.Data.Fin.Fin2`: Finite types `Fin2 n` (used for indexing).
- `Mathlib.Logic.Function.Basic`: Basic function theory (`uncurry`, etc.).
- `Mathlib.Tactic.Common`: Common tactics (`aesop`, `congr`, etc.).

**Universe Parameters**:
- `universe u v w`: Generic universe levels for types and functions.
- `TypeVec.{u} n`: Universe-polymorphic.

**Scoped Notations**:
- `infixl:40 " ⟹ "` → `Arrow`
- `infixr:80 " ⊚ "` → `comp`
- `infixl:67 " ::: "` → `append1`
- `infixl:45 " ⊗ "` → `prod`
- `infixl:45 " ⊗' "` → `prod.map`

---

### Summary

This module formalizes **dependent-length tuples of types** (`TypeVec n`) as a **category**, with rich support for:
- **Structural operations** (`drop`, `last`, `append1`, `splitFun`)
- **Arrow lifting** (`appendFun`, `dropFun`, `lastFun`)
- **Product & equality lifting** (`prod`, `repeatEq`, `Subtype_`)
- **Induction principles** (`casesCons`, `typevecCasesCons₃`)

It serves as a foundational layer for reasoning about **dependent vectors** in dependent type theory, especially useful in categorical and logical formalizations (e.g., in `Mathlib`’s higher-categorical or model-theoretic developments).