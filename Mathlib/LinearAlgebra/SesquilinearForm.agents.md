Here's a structured technical brief extracted from the provided Lean 4 file on **sesquilinear maps and forms**, focusing on definitions, naming conventions, tactics, proof logic, and imports:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsOrtho` | `B x y = 0` | Two vectors are orthogonal w.r.t. sesquilinear map `B`. |
| `isOrtho_def` | `B.IsOrtho x y ↔ B x y = 0` | Equivalence defining orthogonality. |
| `isOrtho_zero_left/right` | `IsOrtho B 0 y`, `IsOrtho B x 0` | Zero vector is orthogonal to all vectors. |
| `isOrtho_flip` | `B.IsOrtho x y ↔ B.flip.IsOrtho y x` | Orthogonality commutes under flip. |
| `IsOrthoᵢ` | `Pairwise (B.IsOrtho on v)` | Set of vectors `v` is pairwise orthogonal. |
| `isOrthoᵢ_def` | `∀ i ≠ j, B (v i) (v j) = 0` | Explicit pairwise orthogonality condition. |
| `linearIndependent_of_isOrthoᵢ` | `(hv₁ : B.IsOrthoᵢ v) → (∀ i, ¬B.IsOrtho (v i) (v i)) → LinearIndependent v` | Orthogonal set with no self-orthogonal vectors is linearly independent. |
| `IsRefl` | `∀ x y, B x y = 0 → B y x = 0` | Reflexivity: vanishing in one argument implies vanishing in flipped argument. |
| `IsSymm` | `∀ x y, I (B x y) = B y x` | Symmetry w.r.t. ring homomorphism `I`. |
| `IsAlt` | `∀ x, B x x = 0` | Alternating: diagonal vanishes. |
| `isAlt_iff_eq_neg_flip` | `[NoZeroDivisors R][CharZero R] ⇒ B.IsAlt ↔ B = -B.flip` | Over rings with char 0 and no zero divisors, alternating ⇔ skew-symmetric. |
| `orthogonalBilin` | `Submodule R₁ M₁` | Left orthogonal complement of submodule `N` w.r.t. `B`. |
| `IsAdjointPair` | `B' (f x) y = B x (g y)` | Pair `(f, g)` is adjoint w.r.t. bilinear forms `B`, `B'`. |
| `IsOrthogonal` | `B (f x) (f y) = B x y` | Linear map `f` preserves bilinear form `B`. |
| `IsSelfAdjoint` / `IsSkewAdjoint` | `IsAdjointPair B B f f` / `IsAdjointPair B B f (-f)` | Endomorphism self-adjoint or skew-adjoint w.r.t. `B`. |
| `SeparatingLeft` / `SeparatingRight` | `∀ x, (∀ y, B x y = 0) → x = 0` / symmetric | Left/right nondegeneracy: only zero is orthogonal to everything. |
| `Nondegenerate` | `SeparatingLeft ∧ SeparatingRight` | Full nondegeneracy. |
| `separatingLeft_iff_ker_eq_bot` | `B.SeparatingLeft ↔ ker B = ⊥` | Left-separating ⇔ trivial kernel. |
| `IsRefl.nondegenerate_iff_separatingLeft` | Under reflexivity, nondegeneracy ⇔ left-separating | Reduces checking nondegeneracy for reflexive forms. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `isOrtho_`: properties of orthogonality (`isOrtho_zero_left`, `isOrtho_flip`)
  - `isRefl`, `isSymm`, `isAlt`: properties of bilinear forms
  - `ortho_`: orthogonality-related lemmas (`ortho_smul_left`, `ortho_smul_right`)
  - `separatingLeft`, `separatingRight`, `nondegenerate`: nondegeneracy conditions
  - `isAdjointPair`, `isSelfAdjoint`, `isSkewAdjoint`, `isOrthogonal`: adjointness/orthogonality of maps
  - `orthogonalBilin`: orthogonal complement construction

- **Suffixes**:
  - `_def`: definitional equivalences (`isOrtho_def`, `isOrthoᵢ_def`)
  - `_iff`: characterizations as equivalences (`isSymm_iff_eq_flip`, `separatingLeft_iff_ker_eq_bot`)
  - `_left`/`_right`: directional properties (`isOrtho_zero_left`, `separatingLeft`)
  - `_flip`: behavior under flip (`ortho_comm`, `flip_isRefl_iff`, `flip_separatingLeft`)
  - `_submodule`: submodules of endomorphisms (`selfAdjointSubmodule`, `skewAdjointSubmodule`)

---

### **3. Tactic Stack**

Frequently used tactics in proofs:

- `simp_rw`: for rewriting with definitional equivalences and simplifying under binders.
- `simp only [...]`: targeted simplification, especially with `map_add`, `map_smulₛₗ`, `zero_apply`, `smul_zero`.
- `rw`: basic rewriting, often after `dsimp only [IsOrtho]` to unfold definitions.
- `exact`, `intro`, `apply`, `cases'`: standard natural deduction.
- `convert`, `ext`, `congr_arg`: extensionality and congruence reasoning.
- `aesop`: likely used in simpler goals (not explicitly shown, but common in modern Mathlib).
- `ring`, `linarith`: for algebraic manipulations in fields/modules.
- `Finset.sum_eq_single_of_mem`, `Finset.sum_singleton`: for handling finite sums over singleton sets.

---

### **4. Proof Logic**

- **Induction & Cases**: Rarely explicit induction; instead, proofs rely on unfolding definitions and applying lemmas.
- **Equational Reasoning**: Heavy use of `rw`, `simp`, and `conv` to transform expressions step-by-step.
- **Logical Splitting**: Many proofs split into two directions (`constructor <;> intro h`), especially for `↔` goals.
- **Substitution & Rewriting**: Core strategy: unfold definitions (`dsimp only`), rewrite using lemmas like `map_add`, `map_smulₛₗ`, `zero_apply`, `smul_zero`.
- **Kernel/Orthogonal Complement Arguments**: Many results relate `ker B`, `ker B.flip`, and `orthogonalBilin`, especially under reflexivity or symmetry.
- **Field-Specific Reasoning**: Lemmas like `linearIndependent_of_isOrthoᵢ`, `span_singleton_inf_orthogonal_eq_bot`, and `isCompl_span_singleton_orthogonal` require field assumptions (e.g., `smul_eq_zero → a = 0 ∨ b = 0`).
- **Reflexivity as a Bridge**: Reflexivity (`IsRefl`) is used to relate left/right kernels and orthogonality (`ortho_comm`, `ker_eq_bot_iff_ker_flip_eq_bot`).

---

### **5. Imports**

- `Mathlib.LinearAlgebra.BilinearMap`: foundational bilinear map theory (used for `flip`, `comp`, `compl₂`, etc.)
- `Mathlib.LinearAlgebra.Basis.Basic`: basis and linear independence tools (e.g., `linearIndependent_iff'`, `span_singleton`, `orthogonalBilin` usage)

---

This file forms a foundational theory for sesquilinear forms and maps, with emphasis on orthogonality, nondegeneracy, adjointness, and symmetry/alternating properties — all in the general semilinear setting, with refinements for fields and rings.