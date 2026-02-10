### Technical Metadata Brief: `Mathlib.Data.Array.Basic` (Porting Note & `Array'`/`DArray` Lemmas)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `DArray` | `Type u`-indexed dependent array (abstract) | Underlying representation for arrays with dependent length (`Fin n → Type`). Currently unused in this file (commented out). |
| `Array' n α` | Non-dependent array of fixed length `n` over type `α` | Core data structure for reasoning about arrays with static length. Implemented via `DArray`. |
| `a.toList : List α` | Converts `Array' n α` → `List α` | Enables use of `List` lemmas on arrays. |
| `a.revList : List α` | Reverse of `toList`, computed via `revIterateAux` | Optimized reverse; satisfies `revList.reverse = toList`. |
| `a.foldl b f` | Left fold over array | Defined via `iterateAux`; relates to `foldr` on `revList`. |
| `a.read i` | Access element at index `i : Fin n` | Primitive array lookup. |
| `a.write i v` | Update element at index `i` with value `v` | Returns new array; `toList` version is `set`. |
| `a.pushBack v` | Append `v` to end of array | Increases length by 1; `toList` becomes `++ [v]`. |
| `foreach a f` | Apply function `f i (a.read i)` pointwise | Generalized map; `read (foreach a f) i = f i (a.read i)`. |
| `a.map f` | Map function over array elements | Special case of `foreach`; `read (map f a) i = f (a.read i)`. |
| `map₂ f a₁ a₂` | Binary pointwise map | `read (map₂ f a₁ a₂) i = f (a₁.read i) (a₂.read i)`. |

**Key Theorems (Simplified):**
- `mem_toList : v ∈ a.toList ↔ ∃ i, a.read i = v`
- `mem_revList : v ∈ a.revList ↔ v ∈ a.toList`
- `toList_reverse : a.toList.reverse = a.revList`
- `revList_foldr : a.revList.foldr f b = a.foldl b f`
- `toList_foldl : a.toList.foldl f b = a.foldl b (Function.swap f)`
- `toList_length : a.toList.length = n`
- `toList_nthLe : List.nthLe a.toList i h = a.read ⟨i, h⟩`
- `pushBack_toList : (a.pushBack v).toList = a.toList ++ [v]`
- `read_pushBack_left / right`: Behavior of `read` after `pushBack`.

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `toList_`, `revList_`, `pushBack_`, `read_`, `mem_`, `foldr_`, `foldl_`, `nthLe_`, `enum_`, `toArray_`, `foreach_`, `map_`, `map₂_`
  - `rev_list_` (auxiliary lemmas for `revList`)
- **Suffixes:**
  - `_aux`: Intermediate lemmas used in proofs of main theorems (e.g., `rev_list_reverse_aux`, `mem_rev_list_aux`)
  - `_left`, `_right`: For symmetric properties (e.g., `read_pushBack_left`, `read_pushBack_right`)
- **Pattern:**
  - `@[simp]` theorems often match structural laws: `toList_reverse`, `toList_length`, `mem_toList`, `toList_nthLe`, etc.
  - `hEq`-based reasoning used in `toArray_toList`/`toList_toArray`.

---

#### **3. Tactic Stack**

Frequent tactics in proofs:
- `simp` / `dsimp` (especially with `DArray.iterateAux`, `read`, `push_back`)
- `rw` (rewriting with lemmas like `toList_nthLe`, `rev_list_reverse`)
- `induction` (on natural numbers, e.g., `rev_list_length_aux`)
- `cases'` (on `Fin` indices, `h : i ≤ n`, or `List.Mem`)
- `congr_arg`, `ext`, `List.ext_nthLe` (extensionality for lists/arrays)
- `have H : ... := ...` + `rwa` (to substitute equalities like `j = ⟨i, h⟩`)
- `exact`, `apply`, `intro`, `cases` (standard intro/elim)
- `cc` (congruence closure) for arithmetic goals
- `aesop` (not present here — likely due to porting constraints or older style)

---

#### **4. Proof Logic**

- **Inductive structure**: Most proofs proceed by induction on `i : ℕ` (e.g., `rev_list_length_aux`, `rev_list_foldr_aux`, `to_list_nthLe_aux`).
- **Case analysis** on:
  - `i = 0` vs `i + 1`
  - `j < i` vs `j = i` (in `mem_rev_list_aux`)
  - `i = j` vs `i ≠ j` (in `write_toList`)
- **Dependent equality reasoning**:
  - Use of `Fin.eq_of_veq`, `Fin.ext_iff`, `hEq`-based conversions (`hEq_of_hEq_of_eq`, `Eq.drecOn`)
- **Equational reasoning**:
  - Often chains `rw [def]`, `dsimp`, `congr_arg`, and `simp` to reduce array operations to list/array primitives.
- **Bidirectional equivalences**:
  - `↔` proofs via `⟨fun h => ..., fun h => ...⟩` or `Iff.intro` + `simp`.

---

#### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.Group.Fin.Basic` | Provides `Fin` type and basic properties (e.g., `Fin.last`, `Fin.castSucc`, `Fin.ext_iff`) |
| `Mathlib.Data.List.Basic` | Core list operations (`reverse`, `foldr`, `foldl`, `nthLe`, `get?`, `set`, `enum`, `length`) |

> **Note**: The file is a *porting stub* — all definitions/lemmas are commented out. It serves as a reference for translating Lean 3 `array.lean` to future `Array'`/`DArray` implementations in Batteries. No active code is compiled.

--- 

**Summary**: This file formalizes the *interface* between `Array'` (fixed-length arrays) and `List`, with emphasis on correctness of conversions (`toList`, `revList`), fold equivalences, indexing, and updates. It uses standard Lean 4 tactics and depends on `Fin` and `List` basics. The porting note indicates it is awaiting Batteries’ `Array`/`DArray` stabilization before active development resumes.