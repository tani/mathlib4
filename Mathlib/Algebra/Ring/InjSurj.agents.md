### Technical Brief: Pullback and Pushforward of Ring Structures Along Injective/Surjective Maps

---

#### **1. Key Definitions & Theorems**

| Name | Type | Purpose |
|------|------|---------|
| `leftDistribClass` (injective) | `∀ f hf add mul, LeftDistribClass β` | Pulls back left distributivity along injective `f` preserving `+` and `*`. |
| `rightDistribClass` (injective) | `∀ f hf add mul, RightDistribClass β` | Pulls back right distributivity along injective `f`. |
| `distrib` (injective) | `∀ f hf add mul, Distrib β` | Pulls back full distributivity (left + right). |
| `hasDistribNeg` (injective) | `∀ f hf neg mul, HasDistribNeg β` | Pulls back distributive negation structure. |
| `nonUnitalNonAssocSemiring`, `nonUnitalSemiring`, `nonAssocSemiring`, `semiring` (injective) | Various ring-like structures on `β` | Pullbacks of increasingly structured semirings/rings. |
| `nonUnitalNonAssocRing`, `nonUnitalRing`, `nonAssocRing`, `ring` (injective) | Ring-like structures on `β` | Pullbacks of rings (with additive group structure). |
| `nonUnitalNonAssocCommSemiring`, `nonUnitalCommSemiring`, `commSemiring` (injective) | Commutative semiring pullbacks. |
| `nonUnitalNonAssocCommRing`, `nonUnitalCommRing`, `commRing` (injective) | Commutative ring pullbacks. |
| `leftDistribClass` (surjective) | `∀ f hf add mul, LeftDistribClass β` | Pushes forward left distributivity along surjective `f`. |
| `rightDistribClass` (surjective) | `∀ f hf add mul, RightDistribClass β` | Pushes forward right distributivity. |
| `distrib` (surjective) | `∀ f hf add mul, Distrib β` | Pushes forward full distributivity. |
| `hasDistribNeg` (surjective) | `∀ f hf neg mul, HasDistribNeg β` | Pushes forward distributive negation. |
| `nonUnitalNonAssocSemiring`, ..., `commRing` (surjective) | Analogous to injective case, but for surjective `f`. |
| `AddOpposite.instHasDistribNeg` | `HasDistribNeg αᵃᵒᵖ` | Uses injectivity of `unop` to pull back `HasDistribNeg` to opposite type. |

**Note**: All `abbrev` definitions are *reducible non-instances* (see Lean note), meaning they define structures without making them typeclass instances automatically.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `left_`, `right_`: For left/right distributivity.
  - `nonUnital`, `nonAssoc`, `comm`: Denote algebraic properties (no unit, non-associative multiplication, commutative multiplication).
  - `hasDistribNeg`: For structures where negation distributes over multiplication.
- **Suffixes**:
  - `_class`: For basic algebraic laws (e.g., `LeftDistribClass`).
  - `_semiring`, `_ring`: For full algebraic structures.
- **Function names**:
  - `leftDistribClass`, `right_distrib`, `neg_mul`, `mul_neg`, `npow`, `natCast`, `intCast`, `nsmul`, `zsmul`: Standard notation for operations and their preservation under `f`.

---

#### **3. Tactic Stack**

- **`simp only [*]`**: Used repeatedly to simplify goals using hypotheses and definitions.
- **`rw [...]`**: Rewriting using preservation lemmas (`add`, `mul`, `neg`, etc.).
- **`hf.<?>`**: Applying injectivity/surjectivity lemmas:
  - `hf.leftDistribClass`, `hf.forall₂.2`, `hf.forall₃.2`, `hf.involutiveNeg`, etc.
- **`swap`**: Used to reorder arguments in `nsmul`, `zsmul` when passing to helper lemmas.
- **`hf.<?> f ...`**: Applying helper lemmas from `Function.Injective`/`Function.Surjective` namespaces.

---

#### **4. Proof Logic**

- **Injective case**:
  - Use injectivity `hf` to *transport* equalities from `α` to `β`.
  - Prove laws in `β` by showing their images under `f` hold in `α`, then apply `hf`.
  - E.g., `left_distrib x y z` in `β` is proven by:
    ```lean
    hf <| by simp only [*, left_distrib]
    ```
    i.e., show `f(x * (y + z)) = f(x * y + x * z)` using preservation and `left_distrib` in `α`.

- **Surjective case**:
  - Use surjectivity `hf` to *lift* elements from `β` to `α`.
  - Prove laws in `β` by choosing preimages and using preservation.
  - E.g., `left_distrib` in `β`:
    ```lean
    hf.forall₃.2 fun x y z => by rw [← add, ← mul, left_distrib]
    ```
    i.e., for all `x,y,z ∈ β`, pick preimages in `α`, apply `left_distrib`, then push forward.

- **Structure composition**:
  - Higher-level structures (e.g., `semiring`, `ring`) are built by combining lower-level ones (`distrib`, `addCommMonoid`, `mulZeroClass`, etc.).
  - Often use `hf.<structure> f ...` to delegate to helper lemmas.

---

#### **5. Imports**

- `Mathlib.Algebra.Ring.Defs`: Core ring definitions.
- `Mathlib.Algebra.Opposites`: Opposite types (used for `αᵃᵒᵖ`).
- `Mathlib.Algebra.GroupWithZero.InjSurj`: General lemmas about injective/surjective maps preserving algebraic structures (e.g., `addCommMonoid`, `mulZeroClass`, `monoidWithZero`, etc.).

These imports provide the foundational infrastructure for pulling/pushing algebraic structures along maps.

---

#### **6. Observations**

- **Redundancy**: Many theorems follow the same pattern — structure is defined by lifting operations and laws via `f`.
- **Symmetry**: Injective and surjective cases mirror each other, differing only in how they handle quantifiers (injective: `hf`, surjective: `hf.forallₙ.2`).
- **Use of `swap`**: Needed because some helper lemmas expect arguments in reversed order (e.g., `nsmul : ℕ → β → β` vs `nsmul : β → ℕ → β`).
- **`unop_injective`**: Key instance used at the end to pull back `HasDistribNeg` to opposite type.

--- 

Let me know if you'd like a diagram of the structure hierarchy or a formalization of a specific pullback/pushforward.