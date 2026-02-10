**Technical Brief: `MultipleTransitivity.lean`**

---

### 1. KEY DEFINITIONS & THEOREMS

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `MulAction.IsMultiplyPretransitive` | `IsMultiplyPretransitive (n : ℕ) := IsPretransitive G (Fin n ↪ α)` | Defines *n*-pretransitivity: the induced action on embeddings `Fin n ↪ α` is pretransitive. |
| `MulAction.is_zero_pretransitive` | `IsMultiplyPretransitive G α 0` | Any action is 0-pretransitive (vacuously, since `Fin 0` is empty). |
| `MulAction.is_one_pretransitive_iff` | `IsMultiplyPretransitive G α 1 ↔ IsPretransitive G α` | 1-pretransitivity coincides with ordinary pretransitivity. |
| `MulAction.is_two_pretransitive_iff` | `IsMultiplyPretransitive G α 2 ↔ ∀ a b c d, a ≠ b ∧ c ≠ d → ∃ g, g • a = c ∧ g • b = d` | 2-pretransitivity ⇔ can map any ordered pair of distinct elements to any other such pair. |
| `MulAction.isPreprimitive_of_is_two_pretransitive` | `IsMultiplyPretransitive G α 2 → IsPreprimitive G α` | 2-pretransitive ⇒ primitive (no nontrivial blocks). |
| `MulAction.isMultiplyPretransitive_of_le` | `IsMultiplyPretransitive G α n → m ≤ n → n ≤ Nat.card α → IsMultiplyPretransitive G α m` | Monotonicity: higher transitivity implies lower, provided enough points. |
| `SubMulAction.ofStabilizer.isMultiplyPretransitive` | `IsPretransitive G α → IsMultiplyPretransitive G α (n+1) ↔ IsMultiplyPretransitive (stabilizer G a) (ofStabilizer G a) n` | Wielandt’s theorem: (n+1)-transitivity of `G` ⇔ n-transitivity of point stabilizer. |
| `SubMulAction.ofFixingSubgroup.isMultiplyPretransitive` | `IsMultiplyPretransitive G α n → s.ncard + m = n → IsMultiplyPretransitive (fixingSubgroup G s) (ofFixingSubgroup G s) m` | Fixator of a `d`-element subset acts `(n−d)`-transitively on complement. |
| `Equiv.Perm.isMultiplyPretransitive` | `IsMultiplyPretransitive (Perm α) α n` for all `n` | Full symmetric group is infinitely (finitely) pretransitive. |
| `Equiv.Perm.eq_top_of_isMultiplyPretransitive` | `[Finite α] → IsMultiplyPretransitive G α (Nat.card α - 1) → G = ⊤` | A subgroup of `Perm α` that is `(card α − 1)`-transitive must be the full group. |
| `alternatingGroup.isMultiplyPretransitive` | `IsMultiplyPretransitive (alternatingGroup α) α (Nat.card α - 2)` | Alternating group is `(card α − 2)`-transitive (optimal). |
| `alternatingGroup.alternatingGroup_le` | `IsMultiplyPretransitive G α (card α − 2) → alternatingGroup α ≤ G` | Any `(card α − 2)`-transitive subgroup contains the alternating group. |

---

### 2. NAMING CONVENTIONS

- **Prefixes**:
  - `is_`: predicates on actions (`is_zero_pretransitive`, `is_one_pretransitive_iff`, `is_two_pretransitive_iff`, `isPreprimitive`, `isTrivialBlock`).
  - `isMultiplyPretransitive`: for `n`-transitivity (including `isMultiplyPretransitive_of_le`, `isMultiplyPretransitive_iff`, etc.).
  - `of_`: constructions from stabilizers or fixators (`ofStabilizer`, `ofFixingSubgroup`, `ofEmbedding`, `ofSurjective`).
  - `emb_`: constructions involving embeddings (`embMap`, `embFinTwo`, `castAddEmb`).
  - `fixingSubgroup`: subgroup fixing a set pointwise.

- **Suffixes**:
  - `_iff`: characterizations (`is_one_pretransitive_iff`, `is_two_pretransitive_iff`).
  - `_of_`: implications or restrictions (`isPreprimitive_of_is_two_pretransitive`, `isMultiplyPretransitive_of_le`, `isMultiplyPretransitive_iff_of_conj`).
  - `_map`, `_embedding`: equivariant maps induced on embedding spaces.

- **Notable abbreviations**:
  - `isPretransitive`: 1-pretransitive.
  - `isPreprimitive`: no nontrivial blocks.

---

### 3. TACTIC STACK

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `ext` | Extensionality for functions, embeddings, equivariant maps. |
| `simp` / `simp only` | Simplification using definitional equalities, especially for `smul_apply`, `ofStabilizer.snoc`, `embFinTwo_apply_*`. |
| `rw` / `convert` | Rewriting using lemmas like `hgxy`, `hg`, `hga`, `hgb`. |
| `rcases` / `obtain` | Case analysis on disjunctions (`h | h'`), existential quantifiers (`⟨g, h⟩`), or finite sets (`⟨a, b, hab, hs⟩`). |
| `by_cases` | Splitting on equality (`a = b`) or membership (`i ∈ range x`). |
| `exact` / `assumption` | Closing goals by matching hypotheses. |
| `apply` / `intro` | Standard natural deduction. |
| `induction` | Structural induction on `k` in `index_of_fixingSubgroup_mul`. |
| `convert` + `congr` | Proving equality of composite terms via congruence. |
| `aesop` (implicit) | Used in many `rw`-based simplifications (e.g., `Finset.card_image_of_injective`). |
| `ring` / `norm_num` | Arithmetic simplifications (e.g., `Nat.sub_add_cancel`, `factorial_two`). |

---

### 4. PROOF LOGIC

**General proof strategy**:

- **Embedding-based reasoning**: Most arguments reduce to constructing equivariant maps on embedding spaces `Fin n ↪ α`. Proofs often:
  1. Lift elements `x, y : Fin n ↪ α` to larger embeddings (e.g., `snoc`, `append`).
  2. Use transitivity to get `g ∈ G` mapping one to the other.
  3. Show `g` lies in a subgroup (e.g., stabilizer, fixing subgroup) via evaluation at distinguished points (e.g., `last n`).
  4. Descend to the subgroup via quotient or restriction.

- **Stabilizer induction** (Wielandt’s theorem):
  - Prove equivalence:  
    $G$ is $(n+1)$-transitive ⇔ $\operatorname{Stab}_G(a)$ is $n$-transitive on $\operatorname{ofStabilizer}\,G\,a$.
  - Forward direction: lift embeddings, use transitivity, show $g ∈ \operatorname{Stab}(a)$.
  - Reverse direction: extend embeddings by $a$, use transitivity of stabilizer, conjugate back.

- **Index computations**:
  - Use orbit-stabilizer:  
    $|G| = |\operatorname{Orb}(s)| \cdot |\operatorname{Stab}(s)|$.
  - For fixing subgroups:  
    $[G : \operatorname{Fix}(s)] = \frac{|\alpha|!}{(|\alpha| - |s|)! \cdot |s|!} \cdot |s|! = \binom{|\alpha|}{|s|} \cdot |s|!$.

- **Alternating group arguments**:
  - Use sign homomorphism: lift transitivity from `Perm α` to `AlternatingGroup α` by correcting odd permutations via transpositions on the complement of the image (size ≥ 2).
  - For minimality: show `(card α − 2)` is best possible (alternating group is *not* `(card α − 1)`-transitive).

---

### 5. IMPORTS (PRIMARY DEPENDENCIES)

| Module | Purpose |
|--------|---------|
| `Mathlib.GroupTheory.GroupAction.Primitive` | Definitions of pretransitivity, primitivity, blocks. |
| `Mathlib.GroupTheory.SpecificGroups.Alternating` | Alternating group definition and basic properties. |
| `Mathlib.GroupTheory.GroupAction.SubMulAction.OfFixingSubgroup` | Fixing subgroups and their actions. |
| `Mathlib.SetTheory.Cardinal.Embedding` | Embeddings and cardinal arithmetic (e.g., `ENat.card`, `ncard`). |
| `Mathlib.SetTheory.Cardinal.Arithmetic` | Factorial, binomial coefficients, cardinal arithmetic lemmas. |

---

### 6. DEPENDENCY & OVERVIEW DIAGRAM

```mermaid
graph TD
  A[MultipleTransitivity.lean] --> B[Mathlib.GroupTheory.GroupAction.Primitive]
  A --> C[Mathlib.GroupTheory.SpecificGroups.Alternating]
  A --> D[Mathlib.GroupTheory.GroupAction.SubMulAction.OfFixingSubgroup]
  A --> E[Mathlib.SetTheory.Cardinal.Embedding]
  A --> F[Mathlib.SetTheory.Cardinal.Arithmetic]

  subgraph Theory
    B --> G[Pretransitivity]
    B --> H[Primitivity]
    D --> I[FixingSubgroup]
    C --> J[AlternatingGroup]
    E --> K[Embeddings Fin n ↪ α]
    F --> L[Cardinal Arithmetic]
  end

  subgraph MainResults
    G --> M[IsMultiplyPretransitive n]
    M --> N[Monotonicity (≤)]
    M --> O[Stabilizer Induction]
    M --> P[Fixator Transitivity]
    J --> Q[AlternatingGroup ≤ G]
    J --> R[AlternatingGroup (n−2)-transitive]
    K --> S[SymmetricGroup ∞-transitive]
    S --> T[eq_top_of_(n−1)-transitive]
  end

  A --> Theory
  Theory --> MainResults
```

**Overview**:

- The file formalizes *multiple transitivity* (a strengthening of group action transitivity) via embeddings `Fin n ↪ α`.
- It develops:
  - **Foundational lemmas**: 0-, 1-, 2-transitivity characterizations.
  - **Structural results**: monotonicity, stabilizer induction (Wielandt), fixator transitivity.
  - **Classification results**: full symmetric group is maximal; alternating group is maximal proper subgroup in high transitivity.
- It bridges group action theory, permutation group theory, and cardinal arithmetic.

--- 

*End of Technical Brief.*
