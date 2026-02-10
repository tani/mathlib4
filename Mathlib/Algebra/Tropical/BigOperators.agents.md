### Technical Brief: Tropicalization of Finitary Operations in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `trop` | `R → Tropical R` | Canonical embedding of a type `R` into its tropicalization; maps addition to multiplication (i.e., `trop (a + b) = trop a * trop b`). |
| `untrop` | `Tropical R → R` | Inverse of `trop` on its image; maps multiplication back to addition (i.e., `untrop (trop a * trop b) = a + b`). |
| `List.trop_sum` | `[AddMonoid R] → l : List R → trop l.sum = List.prod (l.map trop)` | Tropicalization commutes with list sum → product. |
| `Multiset.trop_sum` | `[AddCommMonoid R] → s : Multiset R → trop s.sum = Multiset.prod (s.map trop)` | Same as above for multisets. |
| `trop_sum` | `[AddCommMonoid R] → s : Finset S → f : S → R → trop (∑ i ∈ s, f i) = ∏ i ∈ s, trop (f i)` | Big-op version: tropicalization of a finite sum is the product of tropicalizations. |
| `List.untrop_prod` | `[AddMonoid R] → l : List (Tropical R) → untrop l.prod = List.sum (l.map untrop)` | Untropicalization of a list product is the sum of untropicalizations. |
| `Multiset.untrop_prod` | `[AddCommMonoid R] → s : Multiset (Tropical R) → untrop s.prod = Multiset.sum (s.map untrop)` | Multiset version of above. |
| `untrop_prod` | `[AddCommMonoid R] → s : Finset S → f : S → Tropical R → untrop (∏ i ∈ s, f i) = ∑ i ∈ s, untrop (f i)` | Big-op version: untropicalization of a finite product is the sum of untropicalizations. |
| `List.trop_minimum` | `[LinearOrder R] → l : List R → trop l.minimum = List.sum (l.map (trop ∘ WithTop.some))` | Tropicalization of list minimum equals sum of `trop ∘ some`. |
| `Multiset.trop_inf` | `[LinearOrder R] [OrderTop R] → s : Multiset R → trop s.inf = Multiset.sum (s.map trop)` | Tropicalization of multiset inf equals sum of tropicalizations. |
| `Finset.trop_inf` | `[LinearOrder R] [OrderTop R] → s : Finset S → f : S → R → trop (s.inf f) = ∑ i ∈ s, trop (f i)` | Finite inf over a function equals sum of tropicalizations. |
| `trop_sInf_image` | `[ConditionallyCompleteLinearOrder R] → s : Finset S → f : S → WithTop R → trop (sInf (f '' s)) = ∑ i ∈ s, trop (f i)` | Extends `trop_inf` to conditionally complete lattices using `sInf`. |
| `trop_iInf` | `[ConditionallyCompleteLinearOrder R] [Fintype S] → f : S → WithTop R → trop (⨅ i, f i) = ∑ i, trop (f i)` | Infinite infimum over a fintype becomes finite sum via `trop`. |
| `Multiset.untrop_sum` | `[LinearOrder R] [OrderTop R] → s : Multiset (Tropical R) → untrop s.sum = Multiset.inf (s.map untrop)` | Untropicalization of multiset sum equals multiset inf of untropicalizations. |
| `Finset.untrop_sum'` | `[LinearOrder R] [OrderTop R] → s : Finset S → f : S → Tropical R → untrop (∑ i ∈ s, f i) = s.inf (untrop ∘ f)` | Finite sum of tropical elements untropicalizes to finite inf of underlying values. |
| `untrop_sum_eq_sInf_image` | `[ConditionallyCompleteLinearOrder R] → s : Finset S → f : S → Tropical (WithTop R) → untrop (∑ i ∈ s, f i) = sInf (untrop ∘ f '' s)` | Untropicalization of finite sum over tropical values equals inf over image of untropicalizations. |
| `untrop_sum` | `[ConditionallyCompleteLinearOrder R] [Fintype S] → f : S → Tropical (WithTop R) → untrop (∑ i, f i) = ⨅ i, untrop (f i)` | Infinite sum over fintype untropicalizes to inf over all indices. |
| `Finset.untrop_sum` | `[ConditionallyCompleteLinearOrder R] → s : Finset S → f : S → Tropical (WithTop R) → untrop (∑ i ∈ s, f i) = ⨅ i : s, untrop (f i)` | Refined version of `untrop_sum` for indexed sums over finsets; uses subtype `i : s` to avoid issues with conditionally complete lattices. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `trop_`: tropicalization of an operation (e.g., `trop_sum`, `trop_inf`, `trop_sInf_image`)
  - `untrop_`: untropicalization (e.g., `untrop_prod`, `untrop_sum`, `untrop_sum_eq_sInf_image`)
- **Structure-specific suffixes**:
  - `_list`, `_multiset`, `_finset`: indicate the container type (`List`, `Multiset`, `Finset`)
  - `'` (prime): alternate or refined version (e.g., `untrop_sum'` vs `untrop_sum`)
- **Logical suffixes**:
  - `_image`: when dealing with image of a function under a set/map
  - `_iInf`, `_sInf`: for infinite infima (`iInf`) vs set-based infima (`sInf`)

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Role |
|--------|------|
| `induction'` | Structural induction on lists/multisets (e.g., `induction' l with hd tl IH`) |
| `simp` | Simplification using definitional equalities and lemmas (e.g., `simp`, `simp only [...]`, `simpa [...]`) |
| `convert` | Align goals up to definitional equality (e.g., `convert Multiset.trop_sum (s.val.map f)`) |
| `rw` | Rewrite using equalities (e.g., `rw [iInf, ← Set.image_univ]`) |
| `rcases` | Case analysis on existential/disjunction (e.g., `rcases s.eq_empty_or_nonempty with (rfl | h)`) |
| `rfl` | Reflexivity (used in trivial equalities) |
| `simp only [...]` | Selective simplification (avoids unwanted rewrites) |
| `simpa [...] using ...` | Simplify using a given proof term |

---

#### **4. Proof Logic**

- **Inductive structure**: Proofs for lists/multisets use induction on the structure (e.g., `induction' l with hd tl IH`).
- **Quotient lifting**: For multisets/finsets, proofs often reduce to the list case via `Quotient.inductionOn`.
- **Image-based reasoning**: Many theorems relate finite sums/products over sets to infima/suprema via image sets (`f '' s`), especially when moving to conditionally complete lattices.
- **Subtype handling**: In conditionally complete lattices, indexing over `i : s` (subtype) is preferred over `i ∈ s` to avoid issues with empty sets or undefined infima.
- **Duality**: Pairs like `trop_sum`/`untrop_prod` and `Multiset.trop_inf`/`Multiset.untrop_sum` reflect the duality between addition/multiplication and infimum/sum under tropicalization.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Algebra.BigOperators.Group.Finset` | Provides `∑`, `∏`, and big-op theory over finsets in additive/multiplicative contexts. |
| `Mathlib.Data.List.MinMax` | Defines `List.minimum`, `List.maximum`, and related lemmas. |
| `Mathlib.Algebra.Tropical.Basic` | Core tropical algebra definitions: `Tropical R`, `trop`, `untrop`, and basic properties. |
| `Mathlib.Order.ConditionallyCompleteLattice.Finset` | Provides `sInf`, `iInf`, and related infrastructure for conditionally complete lattices. |

---

#### **Domain-Specific Insight**

This module formalizes the **bridge between classical arithmetic and tropical arithmetic** for finitary operations. It enables:
- Automatic translation of polynomial evaluations over `ℝ` (or `ℚ`, `EReal`, etc.) into piecewise-linear tropical polynomials.
- Reasoning about min-plus algebra via familiar sum/product notation.
- Seamless lifting from finite to infinite (fintype-indexed) settings using conditionally complete lattices.

The careful use of `WithTop R`, `sInf`, and subtype indexing (`i : s`) ensures correctness in edge cases (e.g., empty sets), which is critical for formal verification of tropical geometry constructions.