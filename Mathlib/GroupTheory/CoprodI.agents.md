### Technical Brief: `Monoid.CoprodI` in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Structure | Purpose |
|------|------------------|---------|
| `Monoid.CoprodI.Rel M` | `FreeMonoid (Σ i, M i) → FreeMonoid (Σ i, M i) → Prop` | Generates congruence relations identifying `⟨i, 1⟩ ~ 1` and `⟨i, x⟩⟨i, y⟩ ~ ⟨i, x*y⟩`. |
| `Monoid.CoprodI M` | `Quotient (conGen (Rel M))` | Free product (categorical coproduct) of monoids, defined as a quotient of the free monoid. |
| `Monoid.CoprodI.of {i} : M i →* CoprodI M` | Monoid homomorphism | Canonical inclusion of summand `M i` into the coproduct. |
| `Monoid.CoprodI.lift : (∀ i, M i →* N) ≃ (CoprodI M →* N)` | Equivalence | Universal property: maps out of the coproduct correspond to families of maps from each summand. |
| `Monoid.CoprodI.Word M` | `Type _` (structure) | Type of **reduced words**: lists over `Σ i, M i` with no `1`s and no adjacent letters from same index. |
| `Monoid.CoprodI.Word.equiv M : CoprodI M ≃ Word M` | Equivalence | Bijection between the quotient coproduct and reduced words; enables decidability and explicit reasoning. |
| `Monoid.CoprodI.NeWord M i j` | `Type _` (inductive) | Inductive type for non-empty reduced words starting in `M i` and ending in `M j`. Used for ping-pong arguments. |
| `Monoid.CoprodI.NeWord.singleton`, `append` | Constructors | Build non-empty reduced words from letters and concatenations (with index separation). |
| `Monoid.CoprodI.lift_injective_of_ping_pong` | Theorem | Ping-pong lemma: gives injectivity of `lift` under certain group actions (used for embedding free products into automorphism groups). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `of_`: inclusion of summands (`of : M i →* CoprodI M`)
  - `lift_`: universal property maps (`lift`, `lift_comp_of`, `lift_of`)
  - `prod_`: product of a word (`prod : Word M → CoprodI M`)
  - `equiv_`: bijections (`equiv`, `equivPair`, `equivPair_symm`)
  - `rcons_`: “reduced cons” — prepend letter to word while preserving reducedness
  - `cons_`: raw cons (non-reducing), used internally for `Word` construction

- **Suffixes**:
  - `_I`: indexed coproduct (`CoprodI` vs `Coprod` for binary case)
  - `_ne`: indicates non-emptiness or inequality constraints (`NeWord`, `fstIdx_ne`)
  - `_head`, `_tail`, `_last`: components of words/pairs

- **Structure fields**:
  - `toList`, `ne_one`, `chain_ne` for `Word`
  - `head`, `tail`, `fstIdx_ne` for `Pair`

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `rw`, `erw` | Rewriting with definitional equalities and quotient lifts (`erw` for higher-order rewrites) |
| `simp`, `simp only`, `simp (config := {contextual := true})` | Simplification with lemmas like `lift_of`, `prod_cons`, `of_apply`, `equivPair_symm` |
| `aesop` | Automated reasoning for simple goals (e.g., `ne_one`, `chain_ne` verification) |
| `induction ... using ...` | Structural induction on `Word`, `NeWord`, or `CoprodI` via `induction_left`/`induction_on` |
| `rcases`, `obtain`, `cases'` | Destructuring existential or conjunction goals |
| `ext`, `congr` | Extensionality for functions/monoid homs |
| `apply`, `exact`, `intro` | Basic proof scripting |
| `dsimp`, `change`, `convert` | Debugging definitional equalities in quotient contexts |
| `rfl`, ` rfl` | Reflexivity for definitional equalities |

---

#### **4. Proof Logic & Strategy**

- **Induction Principles**:
  - `CoprodI.induction_on`: Induct on elements of the coproduct using generators (`of m`) and closure under multiplication.
  - `Word.consRecOn`: Induct on `Word` by prepending letters (like list induction).
  - `NeWord` induction: via `singleton` and `append`.

- **Quotient Handling**:
  - Proofs about `CoprodI` often lift to `FreeMonoid`, then descend via `Con.lift`, `Con.eq`, or `ConGen.Rel`.
  - Use `lift` to define homs, then verify compatibility with `Rel` via `Con.conGen_le`.

- **Reduced Word Normalization**:
  - Key idea: every element of `CoprodI M` has a unique reduced word representative.
  - Prove `equiv` is inverse to `prod`, using `prod_smul`, `one_smul`, `mul_smul`, and `smul_induction`.

- **Group Case**:
  - Define inversion via `MulOpposite` and `lift` of inverse maps.
  - Prove group axioms by induction on `CoprodI`.

- **Ping-Pong Lemma**:
  - Uses `NeWord` to track support of group actions.
  - `lift_injective_of_ping_pong` shows injectivity of `lift` under suitable action assumptions.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Algebra.Group.Submonoid.Membership`
- `Mathlib.GroupTheory.Congruence.Basic` — for `conGen`, quotients, congruences
- `Mathlib.GroupTheory.FreeGroup.IsFreeGroup` — for `FreeMonoid`, universal property
- `Mathlib.SetTheory.Cardinal.Basic` — possibly for cardinality arguments
- `Mathlib.Data.Set.Pointwise.SMul` — for `MulAction` and `smul` definitions

**Scope**:
- Formalizes categorical coproducts in `MonCat` and `GrpCat`.
- Provides constructive normal forms (`Word`) for elements.
- Enables decidability (`DecidableEq`) of equality in `CoprodI M` when summands have decidable equality.
- Supports both monoid and group cases (with `Group` instance on `CoprodI G`).

---

Let me know if you'd like a formalized summary (e.g., for a module docstring or a tactic documentation generator), or a visualization of the `NeWord` induction structure.