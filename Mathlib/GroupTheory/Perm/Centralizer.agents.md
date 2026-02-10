**Technical Brief: `Centralizer.lean` — Centralizers and Conjugacy Classes in Symmetric Groups**

---

### 1. KEY DEFINITIONS & THEOREMS

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `g.cycleType : Multiset ℕ` | `g : Perm α → Multiset ℕ` | Encodes cycle lengths of a permutation `g`. |
| `g.cycleFactorsFinset : Finset (Perm α)` | `g : Perm α → Finset (Perm α)` | Finite set of disjoint cycles (factors) of `g`. |
| `Subgroup.centralizer {g}` | `Subgroup (Perm α)` | Centralizer subgroup: permutations commuting with `g`. |
| `OnCycleFactors.toPermHom g : centralizer {g} →* Perm (g.cycleFactorsFinset)` | `→*` denotes group homomorphism | Action of centralizer on cycle factors by conjugation. |
| `OnCycleFactors.range_toPermHom' g` | `Subgroup (Perm (g.cycleFactorsFinset))` | Subgroup of permutations preserving cycle lengths (i.e., `#(τ c).support = #c.support`). |
| `Basis.g` | `Structure` | Choice of a basepoint in each cycle of `g`. |
| `Basis.ofPermHom a τ` | `range_toPermHom' g →* Perm α` | Right inverse to `toPermHom g`, constructed via basis `a`. |
| `Basis.toCentralizer a` | `range_toPermHom' g →* centralizer {g}` | Embeds `range_toPermHom' g` into the centralizer. |
| `OnCycleFactors.mem_ker_toPermHom_iff` | `k ∈ (toPermHom g).ker ↔ ∀ c ∈ g.cycleFactorsFinset, Commute k c` | Kernel characterization: permutations commuting with each cycle. |
| `OnCycleFactors.kerParam g` | `(Perm (fixedPoints g)) × (∀ c, zpowers c) →* Perm α` | Parametrization of kernel of `toPermHom g`. |
| `OnCycleFactors.kerParam_injective g` | `Function.Injective (kerParam g)` | Injectivity of kernel parametrization. |
| `OnCycleFactors.kerParam_range_eq` | `(kerParam g).range = (toPermHom g).ker.map (subtype _)` | Kernel description as image of `kerParam`. |
| `OnCycleFactors.nat_card_range_toPermHom` | `#range(toPermHom g) = ∏_{n ∈ g.cycleType.toFinset} (g.cycleType.count n)!` | Cardinality of image of `toPermHom g`. |
| `OnCycleFactors.kerParam_range_card g` | `#(kerParam g).range = (|α| - |g.cycleType|)! * g.cycleType.prod` | Cardinality of kernel. |
| `nat_card_centralizer g` | `#centralizer {g} = (|α| - |g.cycleType|)! * g.cycleType.prod * ∏_{n ∈ g.cycleType.toFinset} (g.cycleType.count n)!` | Final formula for centralizer size. |
| `card_isConj_eq g` | `#conjugacy_class(g) = |α|! / ((|α| - |g.cycleType|)! * g.cycleType.prod * ∏_{n ∈ g.cycleType.toFinset} (g.cycleType.count n)!)` | Size of conjugacy class of `g`. |
| `card_of_cycleType_eq_zero_iff m` | `#{g | g.cycleType = m} = 0 ↔ ¬(m.sum ≤ |α| ∧ ∀ a ∈ m, 2 ≤ a)` | When cycle-type class is empty. |
| `card_of_cycleType_mul_eq m` | Product formula for number of permutations with given cycle type. | Generalization of `card_isConj_eq` to arbitrary multiset `m`. |

---

### 2. NAMING CONVENTIONS

- **Prefixes**:
  - `cycleType_`, `cycleFactorsFinset_`, `centralizer_`, `OnCycleFactors_`, `kerParam_`, `toPermHom_`, `ofPermHom_`, `toCentralizer_`, `sign_`, `nat_card_`, `card_isConj_`, `card_of_cycleType_`.
- **Suffixes**:
  - `_eq`: equality lemmas (e.g., `mem_ker_toPermHom_iff`).
  - `_iff`: biconditional lemmas (e.g., `mem_ker_toPermHom_iff`).
  - `_def`: definitions (e.g., `toPermHom`, `range_toPermHom'`).
  - `_mem_`: membership criteria (e.g., `mem_ker_toPermHom_iff`).
  - `_apply`: evaluation of functions (e.g., `toPermHom_apply`, `ofPermHom_apply`).
  - `_support`, `_fixedPoints`: properties about support or fixed points.

---

### 3. TACTIC STACK

Frequently used tactics:
- `simp`, `rw`, `conv`, `ext`, `apply`, `exact`, `intro`, `cases`, `split_ifs`, `aesop`, `ring`, `linarith`, `convert`, `congr`, `apply_fun`, `push_neg`, `swap`, `by_cases`, `exact?`, `assumption`, `refine'`, `have`, `suffices`, `induction`, `rcases`, `obtain`, `set`, `funext`, `apply_congr`, `change`, `clear`, `revert`, `subst`, `rename_i`, `generalize_hyp`, `specialize`, `revert`, `clear`, `rename_i`, `generalize_hyp`, `specialize`, `subst`, `rename_i`, `generalize_hyp`, `specialize`.

Notable use of:
- `aesop` for automated reasoning in disjointness and support arguments.
- `simp only [...]` with explicit lemmas to avoid unfolding.
- `congr` and `ext` for extensionality in permutation equality.
- `rcases`/`obtain` for destructuring existential hypotheses (e.g., `mem_zpowers_iff.mp`).
- `convert` for equational reasoning with implicit arguments.

---

### 4. PROOF LOGIC

**High-level proof strategy**:

1. **Orbit–Stabilizer Setup**:
   - Use `MulAction.card_orbit_mul_card_stabilizer_eq_card_group` for conjugation action.
   - Identify orbit = conjugacy class, stabilizer = centralizer.

2. **Centralizer Decomposition**:
   - Define action of `centralizer {g}` on `g.cycleFactorsFinset`.
   - Extract homomorphism `toPermHom g`.
   - Show image = permutations preserving cycle lengths (`range_toPermHom' g`).
   - Construct right inverse `toCentralizer` via `Basis.ofPermHom`.

3. **Kernel Analysis**:
   - Characterize kernel: permutations commuting with each cycle.
   - Parametrize kernel via `kerParam`: product of symmetric group on fixed points and product of cyclic groups (zpowers of cycles).
   - Prove injectivity, surjectivity onto kernel, and compute its cardinality.

4. **Cardinality Computation**:
   - Combine kernel and image sizes via `#G = #ker × #im`.
   - Derive centralizer size.
   - Apply orbit–stabilizer to get conjugacy class size.

5. **Cycle-Type Enumeration**:
   - Use `isConj_iff_cycleType_eq` to relate conjugacy classes and cycle types.
   - Derive formulas for number of permutations with given cycle type.

---

### 5. IMPORTS

| Module | Purpose |
|--------|---------|
| `Mathlib.Algebra.Order.BigOperators.GroupWithZero.Multiset` | Sum/product over multisets, especially for `cycleType.prod`, `cycleType.sum`. |
| `Mathlib.Algebra.Order.BigOperators.Ring.Finset` | Sum/product over finite sets (e.g., `∏ n ∈ g.cycleType.toFinset`). |
| `Mathlib.GroupTheory.NoncommCoprod` | Noncommutative coproduct for constructing `kerParam`. |
| `Mathlib.GroupTheory.Perm.ConjAct` | Conjugation action `ConjAct`, orbit-stabilizer. |
| `Mathlib.GroupTheory.Perm.Cycle.PossibleTypes` | Cycle decomposition theory, `cycleType`, `cycleFactorsFinset`. |
| `Mathlib.GroupTheory.Perm.DomMulAct` | Domain multiplication action (used in cycle support reasoning). |
| `Mathlib.GroupTheory.Rank` | Possibly for rank-related lemmas (e.g., `fixedPoints`). |

---

### 6. MERMAID DIAGRAMS

#### Dependency Graph (High-Level)

```mermaid
graph TD
  A[Orbit-Stabilizer Theorem] --> B[Conjugacy Class = Orbit]
  A --> C[Centralizer = Stabilizer]
  C --> D[Action on cycleFactorsFinset]
  D --> E[toPermHom g]
  E --> F[range_toPermHom' g]
  E --> G[ker(toPermHom g)]
  G --> H[kerParam g]
  H --> I[Perm(fixedPoints g) × ∏ zpowers]
  F --> J[nat_card_range_toPermHom]
  I --> K[kerParam_range_card]
  J & K --> L[nat_card_centralizer]
  L --> M[card_isConj_eq]
  M --> N[card_of_cycleType_eq_zero_iff]
  M --> O[card_of_cycleType_mul_eq]
```

#### Overview of File Structure

```mermaid
flowchart LR
  subgraph Setup
    A[DecidableEq α, Fintype α]
    B[g : Perm α]
    C[g.cycleType, g.cycleFactorsFinset]
  end

  subgraph CentralizerAnalysis
    D[centralizer {g}]
    E[Action on cycleFactorsFinset]
    F[toPermHom g]
    G[range_toPermHom' g]
    H[ker(toPermHom g)]
    I[kerParam g]
  end

  subgraph Cardinality
    J[nat_card_range_toPermHom]
    K[kerParam_range_card]
    L[nat_card_centralizer]
    M[card_isConj_eq]
    N[card_of_cycleType_mul_eq]
  end

  A --> B --> C --> D --> E --> F --> G & H --> I
  J & K --> L --> M --> N
```

---

### 7. SUMMARY

This file formalizes a classical algebraic proof that the size of a conjugacy class in the symmetric group $S_n$ depends only on the cycle type, and gives an explicit product formula:

$$
\frac{n!}{\prod_{i} \left( i^{m_i} \cdot m_i! \right)} = \frac{n!}{(n - \sum i m_i)! \cdot \prod_i m_i! \cdot \prod_i i^{m_i}}
$$

where $m_i$ is the multiplicity of cycle length $i$ in the cycle type. The Lean formalization uses:
- Group actions (conjugation),
- Cycle decomposition,
- Centralizer decomposition via kernel/image of a natural homomorphism,
- Basis-dependent construction of a section to compute image size.

The structure is modular, with clear separation between:
- structural lemmas (`mem_ker_toPermHom_iff`, `toPermHom_apply_toCentralizer`),
- cardinality computations (`nat_card_centralizer`, `card_isConj_eq`),
- combinatorial consequences (`card_of_cycleType_mul_eq`).
