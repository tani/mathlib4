### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**
- **`exp_eps`**  
  - *Type*: `exp 𝕜 (eps : DualNumber R) = 1 + eps`  
  - *Purpose*: States that the exponential of the canonical nilpotent element `eps` in the dual numbers over `R` (viewed as a normed algebra over `𝕜`) reduces to `1 + eps`, since `eps^2 = 0`.  
  - *Proof*: Directly follows from `exp_inr _ _`, a general result for `TrivSqZeroExt`.

- **`exp_smul_eps`**  
  - *Type*: `exp 𝕜 (r • eps : DualNumber R) = 1 + r • eps` for `r : R`  
  - *Purpose*: Extends the previous result to scalar multiples of `eps`, showing the exponential remains linear in `r` due to nilpotence.  
  - *Proof*: Uses `eps` definition, `inr_smul`, and `exp_inr`.

- **`DualNumber`**: The type `R[ε]/(ε²)` — dual numbers over `R`, implemented as `TrivSqZeroExt R R` (trivial square-zero extension of `R` by itself).

- **`eps`**: The canonical generator of the square-zero ideal, defined as `inr 1` (or `inr _` in code), satisfying `eps^2 = 0`.

- **`TrivSqZeroExt`**: The trivial square-zero extension construction, used here to model dual numbers. Key lemmas like `exp_inr` and `inr_smul` are imported from `Mathlib.Analysis.Normed.Algebra.TrivSqZeroExt`.

#### 2. **Naming Conventions**
- **Prefixes**:
  - `exp_`: For exponential function lemmas (`exp_eps`, `exp_smul_eps`).
- **Suffixes**:
  - `_eps`: Used for properties involving the `eps` element.
  - `_smul_`: For lemmas involving scalar multiplication with `eps`.
- **`inr_`**: Standard prefix for lemmas about the right injection in `TrivSqZeroExt` (e.g., `inr_smul`, `exp_inr`).

#### 3. **Tactic Stack**
- **`simp_rw`** (implicit via `rw` + `simp` context): Used in `exp_smul_eps` to rewrite using definitions (`eps`, `inr_smul`) and apply `exp_inr`.
- **`rw`**: Basic rewriting tactic.
- **`simp`**: Likely used implicitly via `@[simp]` attribute.
- **`exact`** (via `... := ... _ _`): `exp_inr _ _` applies a lemma with two arguments.

#### 4. **Proof Logic**
- **Pattern**:  
  - For `exp_eps`: Apply the general `exp_inr` lemma for `TrivSqZeroExt`, which computes `exp(inr x) = 1 + inr x` when `x^2 = 0`.  
  - For `exp_smul_eps`:  
    1. Rewrite `r • eps` using the definition of `eps` and `inr_smul`.  
    2. Apply `exp_inr` again.  
- **Core idea**: Exploit nilpotence (`eps^2 = 0`) to truncate the exponential series at the linear term.

#### 5. **Imports**
- **`Mathlib.Algebra.DualNumber`**: Defines `DualNumber R` and basic algebraic structure.
- **`Mathlib.Analysis.Normed.Algebra.TrivSqZeroExt`**: Provides analytic results (e.g., `exp_inr`) for the trivial square-zero extension in the context of normed/algebraic structures.

---

### Summary
This file formalizes the elementary but crucial fact that the exponential map on dual numbers collapses to a linear expression due to the square-zero property of `eps`. It leverages the `TrivSqZeroExt` interface to reuse general results, maintaining a clean separation between algebraic and analytic structure. The proofs are short and rely heavily on `@[simp]`-friendly lemmas from `TrivSqZeroExt`.