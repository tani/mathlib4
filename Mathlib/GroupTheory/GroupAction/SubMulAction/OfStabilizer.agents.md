### Technical Brief: `OfStabilizer.lean`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ofStabilizer` | `def ofStabilizer (a : α) : SubMulAction (stabilizer G a) α` | Defines the natural action of the stabilizer subgroup of `a ∈ α` on the complement `{a}ᶜ`. |
| `ofStabilizer_carrier` | `(ofStabilizer G a).carrier = {a}ᶜ` | Identifies the carrier set of the action. |
| `mem_ofStabilizer_iff` | `x ∈ ofStabilizer G a ↔ x ≠ a` | Membership characterization for the complement. |
| `ENat_card_ofStabilizer_add_one_eq` | `ENat.card (ofStabilizer G a) + 1 = ENat.card α` | Relates cardinalities in the extended natural numbers. |
| `nat_card_ofStabilizer_eq` | `[Finite α] ⇒ Nat.card (ofStabilizer G a) = Nat.card α - 1` | Cardinality formula for finite types. |
| `ofStabilizer.conjMap` | `{b = g • a} → MulActionHom (stabilizerEquivStabilizer hg) (ofStabilizer G a) (ofStabilizer G b)` | Equivariant map induced by group element translating `a` to `b`. |
| `stabilizerEquivStabilizer_compTriple` | `k = h * g ⇒ CompTriple (...)` | Associativity of conjugation-induced isomorphisms between stabilizers. |
| `ofStabilizer.snoc` | `Fin n ↪ ofStabilizer G a → Fin n.succ ↪ α` | Embedding extension: append `a` to an embedding into the complement. |
| `SMul.ofStabilizer`, `MulAction.ofStabilizer` | `SMul (stabilizer G s) s`, `MulAction (stabilizer G s) s` | Action of the setwise stabilizer on the set itself. |
| `stabilizer_compl` | `stabilizer G sᶜ = stabilizer G s` | Stabilizer of a set equals stabilizer of its complement. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `ofStabilizer`: for constructions involving the stabilizer of a point or set.
  - `conjMap`: for maps induced by conjugation / group translation.
  - `snoc`: for appending an element to an embedding (from "cons" backwards).
- **Suffixes**:
  - `_eq`, `_add_one_eq`: for equalities involving cardinalities.
  - `_def`: for definitions of operations on subtypes (e.g., `smul_stabilizer_def`).
- **Structure**:
  - `SubMulAction.ofStabilizer`: action of a *sub*group (stabilizer) on a *mul*set (type with mul-action).
  - `MulActionHom`, `AddActionHom`: equivariant maps between actions.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp only`: simplification using definitional equalities and lemmas.
- `rw`: rewriting using hypotheses or lemmas (e.g., `hgx`, `hg`, `H`).
- `aesop`: for automated reasoning in set/group theory (e.g., `stabilizer_empty_eq_top`).
- `ext`: extensionality for functions/subtypes.
- `convert`: for equational reasoning with typeclass inference.
- `rwa`, `rintro`, `intro`: for structured proof decomposition.
- `dsimp`, `congr`: for definitional simplification and congruence closure.

---

#### **4. Proof Logic**

- **Inductive/structural reasoning** on embeddings (`Fin n ↪ α`) and subtypes.
- **Case analysis** on elements of `Fin n` (via `Fin.eq_castSucc_or_eq_last`).
- **Equivariance proofs** via `ext` + `simp` + `conjMap_apply`.
- **Cardinality arguments** via `ENat.card` arithmetic and `Fintype`/`Finset` lemmas.
- **Group-theoretic manipulations**:
  - Use of `stabilizerEquivStabilizer` to relate stabilizers of related points.
  - Verification of group homomorphism properties (`map_smul'`, `map_vadd'`) via `simp` and associativity.
- **Set-theoretic reasoning**:
  - Complement membership (`mem_compl_iff`, `mem_singleton_iff`).
  - Image under `subtype.val` avoids `a` (`notMem_val_image`).

---

#### **5. Imports & Dependencies**

| Module | Purpose |
|--------|---------|
| `Mathlib.GroupTheory.GroupAction.Basic` | Core definitions: `MulAction`, `stabilizer`, `MulActionHom`. |
| `Mathlib.GroupTheory.GroupAction.Embedding` | Embeddings and their interaction with actions. |
| `Mathlib.GroupTheory.GroupAction.SubMulAction` | `SubMulAction`, `SMul`, and subaction constructions. |
| `Mathlib.SetTheory.Cardinal.Finite` | Cardinal arithmetic for finite types (`ENat.card`, `Nat.card`). |
| `Mathlib.Data.Fin.Tuple.Embedding` | Embeddings `Fin n ↪ α`, `snoc`, `castSucc`, etc. |

---

#### **6. Mermaid Diagrams**

##### **Dependency Graph (Module Level)**

```mermaid
graph TD
  A[OfStabilizer.lean] --> B[Mathlib.GroupTheory.GroupAction.Basic]
  A --> C[Mathlib.GroupTheory.GroupAction.Embedding]
  A --> D[Mathlib.GroupTheory.GroupAction.SubMulAction]
  A --> E[Mathlib.SetTheory.Cardinal.Finite]
  A --> F[Mathlib.Data.Fin.Tuple.Embedding]
```

##### **Theoretical Overview (Conceptual Flow)**

```mermaid
flowchart LR
  G[Group G] -->|acts on| α[Type α]
  α --> a[a : α]
  a --> Stab[stabilizer G a]
  Stab -->|acts on| Comp[{a}ᶜ]
  Comp -->|via| ofStab[SubMulAction.ofStabilizer G a]

  a -->|translate via g| b[b = g • a]
  b --> StabB[stabilizer G b]
  Stab -->|conjMap hg| StabB

  n[Fin n ↪ ofStab] -->|snoc| αEmb[Fin n.succ ↪ α]

  s[Set s] --> StabS[stabilizer G s]
  StabS -->|acts on| s

  s --> compl[sᶜ]
  StabS -->|stabilizer_compl| StabS
```

##### **Equivariant Maps & Composition**

```mermaid
flowchart LR
  A[ofStab G a] -->|conjMap hg| B[ofStab G b]
  B -->|conjMap hh| C[ofStab G c]
  A -->|conjMap hk| C
  hk == H[h = k * g] --> comp[Composition law]
```

---

#### **7. Summary**

This module formalizes the *point stabilizer action on the complement*, a foundational tool for analyzing *multiple transitivity* in group actions. It provides:

- A canonical `SubMulAction` structure on `{a}ᶜ` via `ofStabilizer`.
- Cardinality lemmas linking `α` and its complement.
- Equivariant conjugation maps (`conjMap`) between stabilizers of related points.
- Embedding extension via `snoc`, enabling inductive arguments on embeddings.
- Dual constructions for *setwise* stabilizers (`SMul.ofStabilizer`, `stabilizer_compl`).

These results support higher-level theorems on transitivity, especially in the context of permutation group theory and combinatorics on finite sets.
