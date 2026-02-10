### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ManyOneReducible` | `p ≤₀ q ↔ ∃ f, Computable f ∧ ∀ a, p a ↔ q (f a)` | Defines *many-one reducibility*: a set `p` reduces to `q` via a computable function preserving membership. |
| `OneOneReducible` | `p ≤₁ q ↔ ∃ f, Computable f ∧ Injective f ∧ ∀ a, p a ↔ q (f a)` | Defines *one-one reducibility*: same as many-one, but with injective `f`. |
| `ManyOneEquiv` | `p ≡₀ q ↔ p ≤₀ q ∧ q ≤₀ p` | Many-one equivalence: mutual many-one reducibility. |
| `OneOneEquiv` | `p ≡₁ q ↔ p ≤₁ q ∧ q ≤₁ p` | One-one equivalence: mutual one-one reducibility. |
| `toNat` | `Set α → Set ℕ` | Encodes subsets of any primcodable type into subsets of `ℕ` via encodings/decodings. |
| `ManyOneDegree` | `Type := Quotient (ManyOneEquiv)` | The type of many-one degrees: equivalence classes of sets under `ManyOneEquiv`. |
| `of` | `p : α → Prop ↦ of p : ManyOneDegree` | Maps a predicate to its many-one degree. |
| `instLE` | `LE ManyOneDegree` | Defines partial order on degrees: `d₁ ≤ d₂` iff representatives satisfy `≤₀`. |
| `instAdd` / `add_of` | `+ : ManyOneDegree → ManyOneDegree → ManyOneDegree` | Join operation induced by disjoint union (`⊕'`). |
| `instSemilatticeSup` | `SemilatticeSup ManyOneDegree` | Proves degrees form a join-semilattice under `≤` and `+`. |
| `computable_of_manyOneReducible` | `p ≤₀ q → ComputablePred q → ComputablePred p` | If `q` is computable and `p ≤₀ q`, then `p` is computable. |
| `OneOneReducible.to_many_one` | `p ≤₁ q → p ≤₀ q` | One-one reducibility implies many-one reducibility. |
| `ManyOneEquiv.of_equiv` | `e.Computable → ManyOneEquiv (p ∘ e) p` | Precomposition by a computable equivalence preserves many-one equivalence. |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `manyOneReducible_`, `oneOneReducible_`: for reflexivity/transitivity proofs.
  - `manyOneEquiv_`, `oneOneEquiv_`: for equivalence relation properties (`refl`, `symm`, `trans`).
  - `computable_of_`: implications from reducibility to computability.
  - `le_`, `add_`, `sup_`: for order-theoretic properties.
- **Suffixes**:
  - `_mk`: introduction lemmas for reducibility/equivalence.
  - `_to_many_one`, `_to_one_one`: conversion lemmas between reducibility notions.
  - `_congr_left`, `_congr_right`: substitution lemmas under equivalence.
  - `_up`, `_down`: for `ULower`-related equivalences.
- **Infix Notation**:
  - `≤₀`, `≤₁`: many-one and one-one reducibility.
  - `⊕'`: local notation for `Sum.elim` (disjoint union).

#### 3. **Tactic Stack**

Frequently used tactics in proofs:
- `intro`, `cases`, `rcases`, `obtain`: for destructuring existential/universal hypotheses.
- `rw`, `erw`: rewriting using definitions and equivalences.
- `simp`, `simp_all`, `simp only [...]`: simplification with lemmas like `manyOneReducible_toNat`, `of_eq_of`.
- `assumption`, `exact`, `apply`: for direct proof steps.
- `convert`: for equational reasoning with definitional equality gaps.
- `funext`: extensionality for functions.
- `induction ... using ...`: structural induction on degrees via `ManyOneDegree.ind_on`.
- `rwa`, `apply ... <;> [ ... ]`: combined rewriting and case analysis.
- `aesop` not used here — proofs are mostly manual and definitional.

#### 4. **Proof Logic**

- **Inductive structure on degrees**: Most degree-level proofs use `induction d using ManyOneDegree.ind_on`, reducing to representatives in `Set ℕ`.
- **Equational reasoning**: Proofs of properties like `≤`, `+`, `equiv` often reduce to:
  1. Unfolding definitions (`of`, `liftOn`, `liftOn₂`, `≤₀`, `⊕'`).
  2. Applying known lemmas (`disjoin_le`, `manyOneReducible_toNat`, `of_eq_of`).
  3. Using congruence lemmas (`le_congr_left/right`, `congr_left/right`) to substitute equivalent sets.
- **Reduction chain**: Many proofs follow the pattern:
  > `p ≤₀ q` ⇔ `toNat p ≤₀ toNat q` (via `manyOneReducible_toNat_toNat`)
  > ⇒ reduce to `Set ℕ` where operations like `⊕'` and `toNat` are well-behaved.
- **Equivalence class handling**: Equality of degrees is characterized by `of_eq_of`, reducing to `ManyOneEquiv`.

#### 5. **Imports**

- `Mathlib.Computability.Halting`: Provides foundational computability theory (e.g., `Computable`, `ComputablePred`, `Primcodable`, `Encodable`, `Denumerable`).
- Implicit dependencies:
  - `Mathlib.Data.Set.Basic`, `Mathlib.Data.Sum.Basic`, `Mathlib.Data.Quotient`: for set operations, sums, and quotient constructions.
  - `Mathlib.Data.Nat.Basic`, `Mathlib.Data.Option.Basic`: for `Nat.Primrec`, `option_getD`, etc.
  - `Mathlib.Order.PartialOrder`, `Mathlib.Order.SemilatticeSup`: for lattice-theoretic structures.

---

This file formalizes the *algebraic structure* of many-one (and one-one) degrees in computability theory, establishing that degrees form a **countable join-semilattice**, with `+` induced by disjoint union and order by reducibility. It leverages encodings to reduce all reasoning to subsets of `ℕ`, ensuring compatibility across primcodable types.