### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `bubble_sort_induction'` | `{n : ℕ} → {α : Type*} [LinearOrder α] → {f : Fin n → α} → {P : (Fin n → α) → Prop} → P f → (∀ σ i j, i < j → (f ∘ σ) j < (f ∘ σ) i → P (f ∘ σ) → P (f ∘ σ ∘ Equiv.swap i j)) → P (f ∘ sort f)` | A stronger induction principle for proving properties of the sorted tuple `f ∘ sort f`, assuming preservation under swaps *within permutations* of `f`. |
| `bubble_sort_induction` | Same as above, but with a weaker hypothesis: `h` applies to *any* `g : Fin n → α`, not just permutations of `f`. | Standard “bubble sort induction” principle: if `P` holds for `f` and is preserved under swapping any antitone pair `(i < j)` in any `g`, then `P` holds for the sorted version. |
| `sort f` | `Fin n → α` | The sorted version of `f`, obtained by permuting `f` via the `sort` function (from `Mathlib.Data.Fin.Tuple.Sort`). |
| `Equiv.swap i j` | `Equiv.Perm (Fin n)` | Transposition swapping indices `i` and `j`. |
| `Lex (Fin n → α)` | Type | Lexicographic ordering on functions `Fin n → α`, used to define a well-founded order on permutations of `f`. |
| `toLex` | `f ↦ toLex f` | Embedding into the lexicographically ordered type. |

#### 2. **Naming Conventions**

- **Predicate naming**: `P` is standard for a predicate over functions `Fin n → α`.
- **Function naming**:
  - `bubble_sort_*`: Indicates use of bubble-sort-like reasoning.
  - `swap`: Standard for transpositions (`Equiv.swap`).
  - `sort`: From `Mathlib.Data.Fin.Tuple.Sort`, used for sorting tuples.
- **Variable naming**:
  - `σ` for permutations (`Equiv.Perm`).
  - `i, j` for indices with `i < j`.
  - `hij₁`, `hij₂` for proofs of `i < j` and `g j < g i`, respectively.
- **Prefixes/suffixes**:
  - `'` (prime) suffix (`bubble_sort_induction'`) denotes a stronger or more general variant.
  - `antitone_pair_of_not_sorted'`: Helper lemma name (not defined here but used), indicating detection of an antitone pair when a tuple is not sorted.

#### 3. **Tactic Stack**

- `refine`: Used to construct a proof term with a hole (`?_`).
- `obtain ⟨i, j, hij₁, hij₂⟩ := ...`: Destructuring existential proof to extract indices and inequalities.
- `exact ...`: To close the final goal using the provided hypothesis.
- Implicit use of:
  - `WellFounded.induction_bot'`: From `Mathlib.Order.WellFounded`, for well-founded induction.
  - `Pi.lex_desc`: From `Mathlib.Order.PiLex`, used to show that swapping an antitone pair decreases the lexicographic rank.

#### 4. **Proof Logic**

- **High-level strategy**:
  1. Define a well-founded order on permutations of `f` via lexicographic ordering (`Lex`) on `Fin n → α`.
  2. Use `WellFounded.induction_bot'` to perform induction on permutations of `f`.
  3. For a non-sorted permutation `σ`, extract an antitone pair `(i < j)` where `(f ∘ σ) i > (f ∘ σ) j` using `antitone_pair_of_not_sorted'`.
  4. Show that swapping this pair yields a strictly smaller permutation (via `Pi.lex_desc`), and apply the induction hypothesis.
  5. Conclude that the sorted permutation (i.e., `f ∘ sort f`) satisfies `P`.

- **Key logical flow**:
  - Well-founded induction on permutations of `f`.
  - Reduction step: if not sorted, swap an antitone pair to get a smaller permutation.
  - Preservation condition ensures `P` descends through swaps.

#### 5. **Imports**

| Import | Role |
|--------|------|
| `Mathlib.Data.Fin.Tuple.Sort` | Provides `sort`, `sort_perm`, and related lemmas for sorting finite tuples. |
| `Mathlib.Order.WellFounded` | Supplies `WellFounded.induction_bot'`, used for induction on well-founded relations. |
| `Mathlib.Order.PiLex` | Defines lexicographic order on `Π i, α i`, used to compare tuples pointwise. |
| `Mathlib.Data.Finite.Prod` | May be used implicitly for finite type reasoning (e.g., `Fin n` is finite). |

---

This module formalizes a foundational induction principle for reasoning about sorted tuples, leveraging well-founded induction over a lexicographic ordering on permutations — a standard technique in formal verification of sorting algorithms.