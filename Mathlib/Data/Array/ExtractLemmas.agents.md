**Technical Metadata Brief: `Array.extract` Lemmas (Lean 4)**

---

### 1. **Key Definitions & Theorems**

| Name | Type / Statement | Purpose |
|------|------------------|---------|
| `extract_eq_nil_of_start_eq_end` | `a.extract i i = #[]` | Shows extraction over an empty interval (start = end) yields empty array. |
| `extract_append_left` | `(a ++ b).extract i j = a.extract i j` (if `j ≤ a.size`) | Extraction from concatenated array, when end index lies in first segment, equals extraction from first array. |
| `extract_append_right` | `(a ++ b).extract i j = b.extract (i - a.size) (j - a.size)` (if `a.size ≤ i`) | Extraction from concatenated array, when start index lies beyond first segment, equals shifted extraction from second array. |
| `extract_eq_of_size_le_end` | `a.extract p l = a.extract p a.size` (if `a.size ≤ l`) | Truncates extraction at array size: extending end index beyond size has no effect. |
| `extract_extract` | `(a.extract s1 e1).extract s2 e2 = a.extract (s1 + s2) (s1 + e2)` (if `s1 + e2 ≤ e1`) | Nested extraction corresponds to a single extraction with adjusted indices (subarray-of-subarray lemma). |

All theorems use `ext` (extensionality for arrays) + `simp` + arithmetic reasoning (`omega`, `congr`, `omega`).

---

### 2. **Naming Conventions**

- **Prefixes**:
  - `extract_`: core prefix for all lemmas about `Array.extract`.
- **Descriptive suffixes**:
  - `_eq_nil_of_start_eq_end`: condition-based naming (`start = end` → `[]`).
  - `_append_left` / `_append_right`: indicates position relative to concatenation.
  - `_eq_of_size_le_end`: condition (`size ≤ end`) → equality.
  - `_extract`: nested extraction.

No abbreviations or cryptic acronyms; names are descriptive and mathematically precise.

---

### 3. **Tactic Stack**

- **Core tactics**:
  - `ext`: array extensionality (equality by size + element-wise equality).
  - `simp only [...]`: targeted simplification using `getElem_extract`, `size_extract`, arithmetic lemmas.
  - `omega`: solves linear arithmetic goals over `ℕ`.
  - `rw [...]`: rewriting using `getElem_append_left`, `getElem_append_right`, `Nat.add_assoc`, etc.
  - `congr`: used to reduce equality of subtractions to arithmetic equality (e.g., `i + k - a.size = ...`).
  - `exact ...`: for trivial hypotheses (e.g., `Nat.le_refl i`).

No heavy automation (e.g., `aesop`, `linarith`), only lightweight arithmetic and rewriting.

---

### 4. **Proof Logic**

- **General pattern**:
  1. Prove equality of arrays via `ext`:
     - First goal: prove equal sizes (via `size_extract`, `size_append`, `omega`).
     - Second goal: prove equal elements at all valid indices (via `getElem_extract`, `getElem_append_*`, arithmetic).
  2. Use `simp only` to reduce to known lemmas or arithmetic.
  3. Apply `omega` to resolve linear arithmetic constraints (e.g., `i < j`, `k < size`, etc.).
  4. For nested extraction (`extract_extract`), rely on `Nat.add_assoc` to align indices.

- **No induction** used — all proofs are direct, leveraging definitions and arithmetic properties.

---

### 5. **Imports**

- **Primary dependency**:
  - `Mathlib.Init`: provides foundational definitions, including `Array`, `Array.extract`, `getElem`, `size`, `++`, etc.
- **Implicit dependencies** (via `Mathlib.Init` and `Array` namespace):
  - `Data.Array.Basic`: core array operations.
  - `Data.Nat.Basic`: arithmetic on `ℕ`, especially `min`, `sub`, `le`, `add`.
  - `Data.Array.Def`: definition of `extract` (via `mkEmpty` + `push`/`copy` or similar).

No external libraries beyond Mathlib; fully self-contained within Lean 4 + Mathlib.

--- 

**Summary**: This module formalizes foundational algebraic properties of `Array.extract`, emphasizing how it interacts with concatenation, bounds, and nesting. Proofs are elementary but require careful index arithmetic — typical of formalized data-structure reasoning.