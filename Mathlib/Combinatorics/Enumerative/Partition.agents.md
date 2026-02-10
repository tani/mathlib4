### Technical Metadata Brief: `Mathlib.Combinatorics.Enumerative.Partition`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Partition n` | `Structure` | Represents a partition of `n` as a multiset of positive integers summing to `n`. |
| `ofComposition n c` | `Composition n → Partition n` | Converts a composition (ordered sum) into a partition (unordered) by forgetting order. |
| `ofSums n l hl` | `(l : Multiset ℕ) → l.sum = n → Partition n` | Constructs a partition from a multiset by filtering out zeros. |
| `ofMultiset l` | `Multiset ℕ → Partition l.sum` | Special case of `ofSums` where `hl := rfl`. |
| `ofSym s` | `Sym σ n → Partition n` | Extracts the multiplicity partition from a symmetric tuple (i.e., a multiset up to permutation). |
| `indiscrete n` | `Partition n` | The partition with a single part `n`. |
| `odds n` | `Finset (Partition n)` | Filter of partitions where all parts are odd. |
| `distincts n` | `Finset (Partition n)` | Filter of partitions with distinct parts (no repetitions). |
| `oddDistincts n` | `Finset (Partition n)` | Intersection of `odds n` and `distincts n`. |
| `ofComposition_surj` | `Function.Surjective (ofComposition n)` | Shows every partition arises from some composition. |
| `UniquePartitionZero` | `Unique (Partition 0)` | Only one partition of 0: the empty multiset. |
| `UniquePartitionOne` | `Unique (Partition 1)` | Only one partition of 1: `{1}`. |
| `count_ofSums_of_ne_zero` | `i ≠ 0 → (ofSums …).parts.count i = l.count i` | Count of nonzero `i` in constructed partition matches original multiset. |
| `Fintype (Partition n)` | `Fintype` instance | Proves finiteness via surjection from compositions. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `of_`: Conversion or construction from another structure (`ofComposition`, `ofSums`, `ofMultiset`, `ofSym`).
  - `indiscrete`: Special partition with one part.
- **Suffixes**:
  - `_parts`: Projection to the underlying multiset (e.g., `indiscrete_parts`, `partition_one_parts`).
  - `_parts_sum`, `_parts_pos`: Proof components of the structure.
- **Descriptive filters**:
  - `odds`, `distincts`, `oddDistincts`: Named after properties of parts.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only`: For simplifying multiset operations (`sum`, `count`, `filter`, `dedup`, `map`).
- `rw`: Rewriting using lemmas like `sumadd`, `filter_add_not`, `toFinset_sum_count_eq`.
- `ext`: Extensionality for proving equality of partitions/multisets.
- `congr` / `funext`: For extensional equality of functions/multisets.
- `induction … using Quotient.inductionOn`: For reasoning about quotients (e.g., compositions).
- `aesop`: Likely used for automation in simpler goals (not explicit here but common in Mathlib).
- `apply_fun`: From import, used for applying functions to equalities.

---

#### **4. Proof Logic**

- **Structure-based reasoning**: Proofs often proceed by destructuring `Partition n` into its fields (`parts`, `parts_pos`, `parts_sum`) and using multiset lemmas.
- **Surjection-based finiteness**: Fintype instance uses `ofComposition_surj` to reduce to finiteness of compositions.
- **Multiset filtering**: Many constructions (`ofSums`, `ofSym`) rely on filtering or deduplication, with proofs carefully tracking counts and sums.
- **Equivalence handling**: `ofSym_map` and `ofSymShapeEquiv` use `Sym.equivCongr`, `map`, and `count_map_eq_count'` to show invariance under equivalence of types.
- **Inductive characterizations**: Uniqueness proofs for `Partition 0`, `Partition 1` use properties like `sum_eq_zero_iff`, `le_sum_of_mem`, and `replicate`.

---

#### **5. Imports**

- `Mathlib.Combinatorics.Enumerative.Composition`: Core dependency — compositions are used to define and reason about partitions.
- `Mathlib.Tactic.ApplyFun`: Used for functional extensionality or applying functions to equalities.

---

#### **Domain-Specific AI Agent Notes**

- **Primary domain**: Enumerative combinatorics, integer partitions, symmetric powers.
- **Key abstractions**: Multisets, compositions, symmetric products (`Sym`), finsets of partitions with constraints.
- **Common proof patterns**:
  - Show two partitions equal by extensionality (`ext`) and multiset equality.
  - Reduce to known structures (e.g., compositions) via surjections/injections.
  - Use multiset arithmetic lemmas (`sum`, `count`, `filter`, `dedup`, `map`).
- **Target theorems (per TODO)**: Euler’s partition theorem (odd ↔ distinct parts), Young diagram correspondence.

Let me know if you'd like a formalized sketch of Euler’s theorem or Young diagram linking.