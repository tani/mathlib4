Here's a structured technical brief extracted from the provided Lean 4 file on **linear independence**:

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `LinearIndependent R v` | `Prop` | States that the family `v : ι → M` is linearly independent over semiring/ring `R`, defined as `Function.Injective (Finsupp.linearCombination R v)` |
| `linearIndependent_iff_injective_linearCombination` | `↔` | Equivalence between `LinearIndependent` and injectivity of `Finsupp.linearCombination` |
| `linearIndependent_iff_ker` | `↔` | For rings: `LinearIndependent R v ↔ ker(Finsupp.linearCombination R v) = ⊥` |
| `linearIndependent_iff` | `↔` | Characterization: `∀ l, Finsupp.linearCombination R v l = 0 → l = 0` |
| `linearIndependent_iff'` | `↔` | Finite-sum version: `∀ s : Finset ι, ∀ g, ∑ i ∈ s, g i • v i = 0 → ∀ i ∈ s, g i = 0` |
| `linearIndependent_iff''` | `↔` | Extended finite-sum version with support condition |
| `not_linearIndependent_iff` | `↔` | Negation: existence of a nontrivial linear combination vanishing |
| `Fintype.linearIndependent_iff` | `↔` | For finite index types: simplifies to `∀ g : ι → R, ∑ i, g i • v i = 0 → ∀ i, g i = 0` |
| `LinearIndependent.repr hv x` | `M →ₗ[R] ι →₀ R` | Returns the unique linear combination representing `x` in `span R (range v)` using `hv : LinearIndependent R v` |
| `LinearIndependent.pair_iff` | `↔` | Two vectors `x, y` are linearly independent iff `s • x + t • y = 0 ⇒ s = t = 0` |
| `linearIndependent_iff_finset_linearIndependent` | `↔` | Global independence ⇔ all finite subfamilies independent |
| `LinearIndependent.map` | `→` | Maps independent families via linear maps with kernel disjoint from span of family |
| `LinearIndependent.map'` | `→` | Special case: injective linear maps preserve independence |
| `LinearIndependent.of_comp` | `→` | If `f ∘ v` is independent and `f` linear, then `v` is independent |
| `LinearIndependent.injective` | `→` | If `R` nontrivial and `v` independent, then `v` is injective as a function |
| `LinearIndependent.group_smul`, `LinearIndependent.units_smul` | `→` | Independence preserved under group/unit actions on coefficients/vectors |
| `LinearIndependent.linear_combination_pair_of_det_ne_zero` | `→` | Linear combinations of two independent vectors remain independent if determinant ≠ 0 |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `linearIndependent_...`: general lemmas about independence.
  - `LinearIndependent...`: methods/operations on proofs of independence (e.g., `.injective`, `.map`, `.mono`, `.comp`, `.restrict_scalars`, `.of_comp`, `.pair_iff`, etc.)
- **Suffixes**:
  - `_iff`: characterizations/equivalences.
  - `_subtype`, `_subtype_range`, `_image`, `_comp`, `_union`, `_insert`, `_singleton`, `_pair`, `_fin_cons`, `_fin_succ`: for specific indexing structures or set operations.
  - `_disjoint`, `_of_injective_injective`, `_of_surjective_injective`: for mapping lemmas with kernel conditions.
- **Special**:
  - `repr`: inverse of linear combination map (uses choice).
  - `eq_zero_of_pair`, `eq_of_pair`, `pair_iff`: for binary cases.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp_rw`: simplification with definitional lemmas (especially `Finsupp` lemmas).
- `rw`: rewriting using equivalences (`linearIndependent_iff_*`).
- `intro`, `intro h`, `rintro`: introduction of hypotheses/variables.
- `apply`, `exact`, `refine`: forward reasoning.
- `convert`: for approximate unification (e.g., in determinant-based proofs).
- `linear_combination`: solving linear algebraic identities (e.g., in `linear_combination_pair_of_det_ne_zero`).
- `module`: tactic for module arithmetic (e.g., simplifying expressions involving `•`, `+`, `0`).
- `fin_cases`: case analysis on `Fin n`.
- `aesop`, `ring`, `noncomm_ring`: for ring-theoretic simplifications.
- `ext`, `funext`: extensionality for functions/maps.
- `convert`, `congr`, `congr'`: congruence reasoning.

---

### **4. Proof Logic**

- **Core Strategy**: Prove equivalence between injectivity of `Finsupp.linearCombination` and vanishing of only trivial linear combinations.
- **Typical Flow**:
  1. Reduce to `linearIndependent_iff'` or `linearIndependent_iff''`.
  2. Use `Finsupp` lemmas (`sum_mapDomain_index`, `subtypeDomain_eq_zero`, etc.) to manipulate sums.
  3. Apply `Fintype.linearIndependent_iff` when index type is finite.
  4. For mapping lemmas: relate `ker(Finsupp.linearCombination (f ∘ v))` to `ker(Finsupp.linearCombination v)` via `LinearMap.ker_comp`, `map_inf_eq_map_inf_comap`, etc.
  5. Use `disjoint_iff_inf_le` to handle kernel-span disjointness.
  6. For determinant-based results: expand linear combination, apply independence of original pair, solve linear system using `linear_combination`.
- **Induction**: Not common; most proofs are direct or via equivalence chains.
- **Case Analysis**: Used for finite types (`Fin n`) and set operations (`insert`, `union`, `singleton`).

---

### **5. Imports**

Core dependencies defining the module’s scope:

| Import | Purpose |
|--------|---------|
| `Mathlib.Algebra.BigOperators.Fin` | Summation over finite types (`Finset`, `Fin`) |
| `Mathlib.Data.Set.Subsingleton` | Subsingleton reasoning (e.g., for empty types) |
| `Mathlib.Lean.Expr.ExtraRecognizers` | Delaborator for pretty-printing |
| `Mathlib.LinearAlgebra.Prod`, `Pi`, `Finsupp.LinearCombination` | Product, pi, and finitely supported function spaces; linear combinations |
| `Mathlib.Tactic.FinCases`, `LinearCombination`, `Module`, `NoncommRing` | Tactics for case analysis, linear algebra, module arithmetic |
| `Mathlib.LinearAlgebra.Prod`, `Pi` | Product and function space modules |

---

Let me know if you'd like a visual dependency graph or a summary of the TODO items.