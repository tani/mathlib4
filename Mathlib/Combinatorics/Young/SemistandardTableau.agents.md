### Technical Metadata Brief: `SemistandardYoungTableau` in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `SemistandardYoungTableau (μ : YoungDiagram)` | `Type` (via `structure`) | Represents semistandard Young tableaux (SSYTs) of shape `μ`. Encoded as functions `ℕ → ℕ → ℕ` vanishing outside `μ`, satisfying row-weak and column-strict monotonicity. |
| `entry : SemistandardYoungTableau μ → ℕ → ℕ → ℕ` | Function field | Projection of the underlying function (i.e., the tableau entries). |
| `row_weak'` | `∀ {i j1 j2}, j1 < j2 → (i, j2) ∈ μ → entry i j1 ≤ entry i j2` | Axiom: entries weakly increase left-to-right in rows. |
| `col_strict'` | `∀ {i1 i2 j}, i1 < i2 → (i2, j) ∈ μ → entry i1 j < entry i2 j` | Axiom: entries strictly increase top-to-bottom in columns. |
| `zeros'` | `∀ {i j}, (i, j) ∉ μ → entry i j = 0` | Axiom: entries vanish outside the diagram. |
| `highestWeight (μ : YoungDiagram)` | `SemistandardYoungTableau μ` | The *highest weight* SSYT: fills each cell `(i, j) ∈ μ` with `i`. |
| `highestWeight_apply` | `highestWeight μ i j = if (i, j) ∈ μ then i else 0` | Computation lemma for `highestWeight`. |
| `instFunLike` | `FunLike (SemistandardYoungTableau μ) ℕ (ℕ → ℕ)` | Enables coercion `T i j` for `T : SSYT μ`. |
| `ext` | Extensionality principle for SSYTs | If two SSYTs agree pointwise, they are equal. |
| `copy` | Constructor for definitional equality adjustment | Allows replacing `entry` with an equal term while preserving structure. |
| `row_weak`, `col_strict`, `zeros` | Simplified versions of axioms | Derived lemmas for direct use (without primed names). |
| `row_weak_of_le`, `col_weak` | Extensions to non-strict inequalities | Use `eq_or_lt_of_le` to handle `≤`. |
| `Inhabited` instance | `⟨highestWeight μ⟩` | Guarantees existence of at least one SSYT of any shape. |

---

#### **2. Naming Conventions**

- **Axioms**: Primed suffix (`'`) for structure fields:  
  `row_weak'`, `col_strict'`, `zeros'`.
- **Derived lemmas**: Drop primes and use descriptive names:  
  `row_weak`, `col_strict`, `zeros`, `row_weak_of_le`, `col_weak`.
- **Constructors/Definitions**:  
  - `highestWeight` — named after the concept in representation theory (highest weight vector).
  - `copy` — standard Lean pattern for definitional tricks.
- **Instance names**: `instFunLike` — follows `inst` + `Typeclass` convention.
- **Simplification lemmas**: `highestWeight_apply`, `coe_copy`, `copy_eq`, `to_fun_eq_coe`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs and definitions:

| Tactic | Usage |
|--------|-------|
| `simp only` | Simplify goals using `if_pos`, `if_neg`, and membership lemmas (e.g., `μ.up_left_mem`). |
| `rwa` | Rewrite + assume hypothesis (e.g., in `col_strict'`). |
| `rw` | Rewrite using definitional equalities (`h.symm ▸ ...`). |
| `cases'` | Case analysis on `eq_or_lt_of_le` (for non-strict inequalities). |
| `congr` | Prove equality of structures by congruence (in `coe_injective'`). |
| `dfunext`, `ext` | Extensionality for dependent functions/structures. |
| `funext` | Functional extensionality (in `ext` proof). |
| `rfl` | Reflexivity for definitional equalities (e.g., `coe_copy`, `highestWeight_apply`). |

---

#### **4. Proof Logic & Strategy**

- **Structure proofs** follow standard Lean pattern:
  - Define `entry` explicitly (often via `if ... then ... else ...`).
  - Prove properties (`row_weak'`, `col_strict'`, `zeros'`) using:
    - `simp` + `if_pos`/`if_neg` for membership conditions.
    - Monotonicity of `≤`/`<` and diagram properties (e.g., `μ.up_left_mem`).
- **Induction is not used** here — the definitions are *extensional* and rely on direct verification of axioms.
- **Equality proofs** use:
  - `DFunLike.ext` / `ext` for structure equality.
  - `congr` for injectivity of coercion.
  - `copy_eq` for definitional adjustment.
- **Monotonicity extensions** (`row_weak_of_le`, `col_weak`) use case split on equality vs. strict inequality.

---

#### **5. Imports & Dependencies**

| Import | Role |
|--------|------|
| `Mathlib.Combinatorics.Young.YoungDiagram` | Defines `YoungDiagram`, its cells, and basic properties (e.g., `up_left_mem`). |
| *(Implicit)* `Mathlib.Data.Nat.Basic`, `Mathlib.Data.Product`, `Mathlib.Logic.Function.Basic` | Needed for `ℕ`, ordered pairs, `FunLike`, extensionality. |
| *(Implicit)* `Mathlib.Logic.Equivalence` | For `congr`, `eq_of_veq`, etc. |

---

#### **6. Domain-Specific Notes**

- **Semantic encoding**: SSYTs are *not* stored as finite maps or arrays; instead, they are total functions `ℕ × ℕ → ℕ` constrained to vanish outside `μ`. This supports extensionality and simplifies reasoning, at the cost of non-termination for out-of-bounds queries (handled by `zeros`).
- **Row/column indexing**: Rows indexed by `i` (top to bottom), columns by `j` (left to right), matching mathematical convention.
- **`highestWeight`**: Central in representation theory (e.g., character theory of `GL(n)`); used as default element (via `Inhabited`) and often as a base case in inductions.

--- 

Let me know if you'd like a formalization of *standard* Young tableaux, or constructions like *jeu de taquin*, *Knuth relations*, or *Schensted insertion* built on this foundation.