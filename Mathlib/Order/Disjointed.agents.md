### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `disjointed` | `ℕ → α → ℕ → α` | Constructs a pairwise disjoint sequence from `f : ℕ → α` by subtracting previous partial sups: `f 0`, `f 1 \ f 0`, `f 2 \ (f 0 ⊔ f 1)`, etc. |
| `partialSups_disjointed` | `∀ f, partialSups (disjointed f) = partialSups f` | States that `disjointed f` preserves the partial sups of `f`. |
| `disjoint_disjointed` | `∀ f, Pairwise (Disjoint on disjointed f)` | Ensures the constructed sequence is pairwise disjoint. |
| `disjointed_unique` | `∀ f d, Pairwise (Disjoint on d) → partialSups d = partialSups f → d = disjointed f` | Uniqueness: `disjointed f` is the *only* pairwise disjoint sequence with same partial sups as `f`. |
| `iSup_disjointed` | `∀ f, ⨆ n, disjointed f n = ⨆ n, f n` | Extends `partialSups_disjointed` to full suprema (i.e., countable joins). |
| `disjointed_eq_inf_compl` | `∀ f n, disjointed f n = f n ⊓ ⨅ i < n, (f i)ᶜ` | Explicit formula in a *complete* Boolean algebra: intersection of `f n` with complements of earlier `f i`. |
| `disjointedRec` | Induction principle for `disjointed` | Allows proving/defining properties of `disjointed f n` by induction on `n`, using difference steps. |
| `Monotone.disjointed_succ` | `hf : Monotone f ⇒ disjointed f (n+1) = f (n+1) \ f n` | Simplifies `disjointed` for monotone sequences (since `partialSups f n = f n`). |
| `preimage_find_eq_disjointed` | Set-theoretic characterization of `disjointed` via `Nat.find` | Connects `disjointed` to measurable selection / first-hit time constructions. |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `disjointed_`: All definitions/lemmas about the `disjointed` construction.
  - `partialSups_`: Lemmas about `partialSups` (e.g., `partialSups_zero`, `partialSups_succ`, `partialSups_eq_biSup`).
- **Suffixes**:
  - `_le`, `_subset`: Inclusion lemmas (`disjointed_le`, `disjointed_subset`).
  - `_eq`: Equality lemmas (`disjointed_zero`, `disjointed_succ`, `partialSups_disjointed`).
  - `_unique`, `_disjoint`: Structural properties (`disjointed_unique`, `disjoint_disjointed`).
- **`_rec`/`_ind`**: Recursion/induction principles (`disjointedRec`).
- **`_compl`, `_inter`**: Boolean algebra / set-theoretic variants (`disjointed_eq_inf_compl`, `disjointed_eq_inter_compl`).

#### 3. **Tactic Stack**

Frequently used tactics in proofs:
- `rw` / `simp_rw`: Rewriting definitions (`disjointed_succ`, `partialSups_succ`, etc.).
- `induction'`: Structural induction on `ℕ`, often with `ih` for induction hypothesis.
- `exact`, `intro`, `rintro`, `cases'`: Basic proof structure.
- `ext`: Extensionality for functions/sets (e.g., proving equality of sequences or unions).
- `simp`: Simplification using `@[simp]` lemmas (`disjointed_zero`, `partialSups_zero`).
- `apply`, `exact`: For applying lemmas (e.g., `disjoint_sdiff_self_right.mono_left`).
- `suffices ... from ...`: Goal splitting (e.g., in `disjointed_unique`).
- `convert`, `congr`: Congruence reasoning (e.g., in `disjointed_eq_inf_compl`).
- `aesop` not used — proofs are mostly manual and algebraic.

#### 4. **Proof Logic**

- **Inductive structure**: Most proofs proceed by induction on `n : ℕ`, especially for properties of `disjointed f n`.
- **Case analysis**: Often splits on `n = 0` vs `n = k + 1`.
- **Algebraic manipulation**: Heavy use of generalized Boolean algebra identities:
  - `sdiff_sdiff_left`, `sup_sdiff_self_right`, `sdiff_eq`, `compl_iSup`, `inf_sup_right`.
- **Disjointness reasoning**: Leverages `Disjoint` properties (e.g., `disjoint_iff`, `disjoint_sdiff_self_right`).
- **Uniqueness via extensionality**: `disjointed_unique` proves equality by `ext n` and algebraic expansion of `partialSups`.
- **Monotonicity simplification**: When `f` is monotone, `partialSups f n = f n`, simplifying `disjointed f (n+1)`.

#### 5. **Imports**

- **Core dependency**: `Mathlib.Order.PartialSups` — provides `partialSups`, `iSup`, and related lattice-theoretic infrastructure.
- **Typeclass assumptions**:
  - `[GeneralizedBooleanAlgebra α]`: For basic definitions and properties (difference, sup, disjointness).
  - `[CompleteBooleanAlgebra α]`: For infinite suprema (`iSup`) and complement-based formulas (`compl`, `iInf`).
- **Set-theoretic context**: Lemmas like `disjointed_subset`, `iUnion_disjointed`, `preimage_find_eq_disjointed` assume `α` is a type of sets (`Set β`), often with decidability (`Decidable (x ∈ s n)`).

---

This module formalizes a foundational construction in measure theory and order theory: the *disjointification* of a sequence, crucial for proving countable additivity, Carathéodory extension, and related results. It is tightly integrated with Lean’s lattice and order libraries.