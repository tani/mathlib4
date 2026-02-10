### Technical Metadata Brief: `Erased` Type in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Erased (α : Sort u)` | `Sort (max 1 u)` | A type representing erased data: classically isomorphic to `α`, but runtime representation is `0`. |
| `mk {α} (a : α) : Erased α` | `α → Erased α` | Wraps a value `a : α` into an erased container. |
| `out {α} : Erased α → α` | `Erased α → α` | Noncomputably extracts the original value (uses `Classical.choose`). |
| `OutType (a : Erased (Sort u)) : Sort u` | `Erased (Sort u) → Sort u` | Extracts the erased *type* (non-definitional). |
| `out_proof {p : Prop} (a : Erased p) : p` | `Erased p → p` | Extracts the erased *proof* (since `Prop` is a sort). |
| `equiv (α)` | `Erased α ≃ α` | Classical equivalence between `Erased α` and `α`. |
| `choice {α} (h : Nonempty α) : Erased α` | `Nonempty α → Erased α` | Produces an erased element from a proof of nonemptiness (uses `Classical.choice`). |
| `bind {α β} (a : Erased α) (f : α → Erased β) : Erased β` | `Erased α → (α → Erased β) → Erased β` | Monadic bind for `Erased`. |
| `join {α} (a : Erased (Erased α)) : Erased α` | `Erased (Erased α) → Erased α` | Flattens nested erasures. |
| `map {α β} (f : α → β) (a : Erased α) : Erased β` | `(α → β) → Erased α → Erased β` | Functorial map for `Erased`. |
| `Monad` instance | `Monad Erased` | Provides `pure`, `bind`, `map` for `Erased`. |
| `instLawfulMonad` | `LawfulMonad Erased` | Proves monad laws hold for `Erased`. |

**Key Simplification Lemmas**  
- `out_mk`: `out (mk a) = a`  
- `mk_out`: `mk (out a) = a`  
- `out_inj`: `a.out = b.out → a = b`  
- `bind_eq_out`, `join_eq_out`, `map_out`: Simplify operations via `out`.  
- `nonempty_iff`: `Nonempty (Erased α) ↔ Nonempty α`

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `mk_`: Constructor (e.g., `mk`, `mk_out`)
  - `out_`: Extraction (e.g., `out`, `out_mk`, `out_proof`, `out_inj`)
  - `bind_`, `join_`, `map_`: Monadic operations
  - `pure_def`, `bind_def`, `map_def`: Definitional equalities for instance methods

- **Suffixes**:
  - `_eq_out`: Lemmas showing equivalence via `out`
  - `_def`: Definitional equality of instance methods with their underlying definitions

- **Abbreviations**:
  - `OutType`: Abbreviation (not a theorem), used to extract erased types.

---

#### **3. Tactic Stack**

- **Core tactics**: `simp`, `congr`, `ext`, `refine'`, `intros`, `cases`, `exact`
- **Simplification**: `simp only [...]`, `simp [Functor.mapConst, Seq.seq, ...]`
- **Classical reasoning**: `Classical.choose_spec`, `Classical.choice`
- **Equality reasoning**: `cast`, `congr_fun`, `congr_arg`
- **Lawful monad proofs**: `ext; simp` pattern dominates (e.g., `by intros; ext; simp`)

---

#### **4. Proof Logic**

- **Induction/Extensionality**: Proofs of equality for `Erased α` rely on:
  - Extensionality (`ext`) via `out_inj`
  - Simplification using `out_mk` and `mk_out`
- **Classical Choice**: All noncomputable definitions (`out`, `choice`, `equiv`) use `Classical.choice` or ` Classical.choose_spec`.
- **Monadic Laws**: Verified by extensionality (`ext`) and simplification (`simp`), leveraging definitional equalities of `mk`, `bind`, `map`.
- **Equivalence proofs**: `equiv` is constructed via `⟨out, mk, mk_out, out_mk⟩`, where `mk_out` and `out_mk` are mutual inverses.

---

#### **5. Imports**

- **Primary dependency**:  
  `Mathlib.Logic.Equiv.Defs` — provides basic equivalence (`≃`) infrastructure.

- **Implicit dependencies** (via `Classical` and `Nonempty`):
  - `Mathlib.Logic.Classical`
  - `Mathlib.Logic.Nonempty`
  - `Mathlib.Init.Function` (for `Functor`, `Monad`, `Seq`)

- **No runtime dependencies**: `Erased` is designed for VM erasure, so it avoids computationally relevant constructs beyond classical choice.

---

### Summary

The `Erased` type provides a way to *track* data at the type level without storing it at runtime — crucial for proof-carrying code or when avoiding memory overhead. Its design leverages classical logic to recover the original value, and it forms a lawful monad despite being erased at runtime. The file emphasizes definitional simplicity and extensional reasoning, with heavy use of `simp` and classical choice.