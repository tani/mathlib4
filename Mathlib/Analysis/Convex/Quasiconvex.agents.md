### Technical Metadata Brief: Quasiconvex, Quasiconcave, and Quasilinear Functions in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `QuasiconvexOn 𝕜 s f` | `Prop` | States that all sublevel sets `{x ∈ s | f x ≤ r}` are `𝕜`-convex. |
| `QuasiconcaveOn 𝕜 s f` | `Prop` | States that all superlevel sets `{x ∈ s | r ≤ f x}` are `𝕜`-convex. |
| `QuasilinearOn 𝕜 s f` | `Prop` | `f` is both quasiconvex and quasiconcave on `s`. |
| `QuasiconvexOn.dual` | `QuasiconvexOn 𝕜 s f → QuasiconcaveOn 𝕜 s (toDual ∘ f)` | Duality via order dual: sublevels of `f` ↔ superlevels of `toDual ∘ f`. |
| `QuasiconcaveOn.dual` | `QuasiconcaveOn 𝕜 s f → QuasiconvexOn 𝕜 s (toDual ∘ f)` | Dual of the above. |
| `Convex.quasiconvexOn_of_convex_le` | `Convex 𝕜 s → (∀ r, Convex 𝕜 {x | f x ≤ r}) → QuasiconvexOn 𝕜 s f` | If `s` and all sublevel sets are convex, then `f` is quasiconvex on `s`. |
| `QuasiconvexOn.convex` | `QuasiconvexOn 𝕜 s f → Convex 𝕜 s` | Quasiconvexity implies convexity of domain (under directedness). |
| `quasiconvexOn_iff_le_max` | `QuasiconvexOn 𝕜 s f ↔ Convex 𝕜 s ∧ ∀ x y a b, … → f(a•x + b•y) ≤ max (f x) (f y)` | Equivalent pointwise characterization of quasiconvexity. |
| `quasiconcaveOn_iff_min_le` | Dual of above for quasiconcavity. |
| `quasilinearOn_iff_mem_uIcc` | `QuasilinearOn 𝕜 s f ↔ Convex 𝕜 s ∧ f(a•x + b•y) ∈ uIcc (f x) (f y)` | Quasilinearity ⇔ image lies in interval between endpoints. |
| `ConvexOn.quasiconvexOn` | `ConvexOn 𝕜 s f → QuasiconvexOn 𝕜 s f` | Convex ⇒ quasiconvex. |
| `ConcaveOn.quasiconcaveOn` | `ConcaveOn 𝕜 s f → QuasiconcaveOn 𝕜 s f` | Concave ⇒ quasiconcave. |
| `MonotoneOn.quasilinearOn` | `MonotoneOn f s → Convex 𝕜 s → QuasilinearOn 𝕜 s f` | Monotone functions on convex sets are quasilinear. |
| `AntitoneOn.quasilinearOn` | Same as above for antitone functions. |
| `QuasilinearOn.monotoneOn_or_antitoneOn` | `QuasilinearOn 𝕜 s f → MonotoneOn f s ∨ AntitoneOn f s` | On convex subsets of a linearly ordered field, quasilinear ⇒ monotone or antitone. |
| `quasilinearOn_iff_monotoneOn_or_antitoneOn` | `QuasilinearOn 𝕜 s f ↔ MonotoneOn f s ∨ AntitoneOn f s` (under convex `s`) | Full equivalence in 1D (domain in `𝕜`). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `Quasi*On`: Predicate for functions on a set (`QuasiconvexOn`, `QuasiconcaveOn`, `QuasilinearOn`).
  - `*On`: Standard Mathlib pattern for localized properties (e.g., `MonotoneOn`, `ConvexOn`).
- **Suffixes**:
  - `.dual`: Indicates duality via `OrderDual`.
  - `.convex_*`: Derives convexity of level sets or domain.
- **Operators**:
  - `⊔`, `⊔`, `⊔`: Supremum/infs used in `sup`/`inf` lemmas.
  - `uIcc`: Unit interval convex hull (`uIcc a b = Icc a b ∪ Icc b a`), used for quasilinearity.

---

#### **3. Tactic Stack**

- **Core tactics**:
  - `intro`, `exact`, `refine`, `apply`, `rw`, `simp_rw`, `simp`, `apply_fun`, `split`, `cases`, `let`, `have`, `show`, `assumption`.
- **Domain-specific**:
  - `convex_*` lemmas often use `exact`, `inter`, `segment_subset`, `mem_Icc`, `max_le`, `le_max_*`.
  - `simp_rw [Pi.sup_def, sup_le_iff, Set.sep_and]` in lattice-theoretic proofs.
  - `monotoneOn_or_antitoneOn_iff_uIcc`, `segment_eq_uIcc` in field-specific reasoning.
- **Automation**:
  - `aesop` not used here — proofs are mostly manual and structure-driven.
  - Heavy use of `simp_rw` for rewriting definitions and logical equivalences.

---

#### **4. Proof Logic**

- **Structure**:
  - Definitions are given as universal quantifications over reals/rational scalars (`∀ r`).
  - Proofs often proceed by:
    1. Unfolding definitions (`rw [QuasiconvexOn]`).
    2. Using convexity of level sets or domain.
    3. Applying lattice/linear order properties (e.g., `max_le`, `le_max_left/right`).
    4. Using duality (`toDual`) to transfer results between quasiconvex/concave.
- **Common patterns**:
  - **Equivalence proofs**: Split into `→` and `←`, often via `⟨hf.1, hf.2⟩` or `⟨hf.convex, fun … => …⟩`.
  - **Implication chains**: Use `hf _ ⟨hx, h1⟩ ⟨hy, h2⟩ ha hb hab` to apply convexity of level sets.
  - **Duality**: `hf.dual` or `hf.dual.convex_lt` to reuse lemmas.
  - **1D case**: Use `segment_eq_uIcc`, `uIcc`, and `monotoneOn_or_antitoneOn_iff_uIcc` to reduce to monotonicity.

---

#### **5. Imports & Dependencies**

- **Primary import**:
  ```lean
  import Mathlib.Analysis.Convex.Function
  ```
  - Provides foundational convex analysis: `ConvexOn`, `ConcaveOn`, `Convex`, `segment`, etc.

- **Key auxiliary imports (via Mathlib)**:
  - `Mathlib.Order.OrderDual`: For `toDual`, `OrderDual`, duality.
  - `Mathlib.Set.Basic`, `Mathlib.Set.Convex`: For `Set.sep`, `Convex`, `segment`.
  - `Mathlib.Algebra.Order.Group.Defs`, `Mathlib.Algebra.Order.Module`: For `OrderedSMul`, `OrderedAddCommMonoid`, `Module`.
  - `Mathlib.Algebra.Order.Semilattice`: For `SemilatticeSup`, `SemilatticeInf`, `⊔`, `⊔`.
  - `Mathlib.Analysis.Convex.Function`: Core definitions of convexity for functions.

- **Typeclass assumptions**:
  - `OrderedSemiring 𝕜`, `AddCommMonoid E`, `SMul 𝕜 E`, `LinearOrder β`, `OrderedSMul 𝕜 β`, `LinearOrderedField 𝕜`, etc.

---

### Summary

This file formalizes quasiconvexity, quasiconcavity, and quasilinearity in a general setting over ordered semirings and modules, with key connections to convex analysis, order theory, and 1D monotonicity. The proofs rely heavily on duality, lattice operations, and convexity of level sets, with a clean separation between general and 1D (field) cases. The naming and structure follow Mathlib conventions closely, especially for localized properties (`*On`) and duality (`*.dual`).