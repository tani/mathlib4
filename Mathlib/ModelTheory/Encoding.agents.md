### Technical Metadata Brief: *Encodings and Cardinality of First-Order Syntax* (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `listEncode : L.Term α → List (α ⊕ (Σi, L.Functions i))` | Encodes terms as lists of variables (`α`) and function symbols (`Σi, L.Functions i`). Recursive on term structure. |
| `listDecode : List (α ⊕ (Σi, L.Functions i)) → List (L.Term α)` | Partial inverse: decodes a list into a list of terms (may fail if malformed). |
| `Term.encoding` | An `Encoding` instance for `L.Term α`, using `listEncode`/`listDecode`. Proves correctness via `decode_encode`. |
| `listDecode_encode_list` | `listDecode ∘ listEncode` is identity on lists of terms — key for encoding correctness. |
| `Term.card_le` | `#(L.Term α) ≤ max ℵ₀ #(α ⊕ Σi, L.Functions i)` — bounds term cardinality by countable union of finite-arity symbol sets. |
| `Term.card_sigma` | `#(Σn, L.Term (α ⊕ Fin n)) = max ℵ₀ #(α ⊕ Σi, L.Functions i)` — equality showing that adding finite parameter lists doesn’t increase cardinality beyond countable sup. |
| `listEncode_injective` | Injectivity of `listEncode`, derived from `encoding.encode_injective`. |
| `Encodable / Countable / Small` instances | Derived from injective encoding into countable/small types. |
| `BoundedFormula.listEncode` | Encodes bounded formulas as lists over symbols: terms (`Σk, L.Term (α ⊕ Fin k)`), relations (`Σn, L.Relations n`), and natural numbers (for arities). |
| `BoundedFormula.listDecode` | Decodes lists into bounded formulas (with structural checks, e.g., matching arities, correct quantifier usage). Termination by list length. |
| `sigmaAll`, `sigmaImp` | Helper functions for quantifier and implication on indexed formulas (`Σn, L.BoundedFormula α n`). |
| `listDecode_encode_list` (for formulas) | `listDecode ∘ listEncode` is identity on lists of formulas — foundational for encoding correctness. |
| `BoundedFormula.encoding` | `Encoding` instance for `Σn, L.BoundedFormula α n`. |
| `BoundedFormula.card_le` | `#(Σn, L.BoundedFormula α n) ≤ max ℵ₀ (lift #α + lift L.card)` — bounds formula cardinality using lifted parameters. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `listEncode` / `listDecode`: Encode/decode into *lists* (not raw `Encoding` type).
  - `sigmaAll`, `sigmaImp`: Operations on *sigma types* (`Σn, ...`).
- **Suffixes**:
  - `_list`: Applies to lists of objects (e.g., `listDecode_encode_list`).
  - `_inj`, `_injective`: Proves injectivity.
  - `_le`: Cardinal inequality upper bounds.
- **Structure**:
  - `encode`, `decode`, `decode_encode`: Standard `Encoding` interface.
  - `card_le`, `card_sigma`: Cardinal arithmetic lemmas.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `induction'` | Structural induction on terms/formulas or natural numbers. |
| `rw [...] at *` | Rewriting hypotheses using definitional equalities. |
| `simp only [...]` | Simplification with precise control (avoids over-simplification). |
| `refine ⟨...⟩` | Constructing pairs/proofs via `and`/`sigma`/`prod` elimination. |
| `have h := ...; rw [...] at h` | Intermediate lemma extraction and manipulation. |
| `simp only [length_map, length_finRange, ...]` | Arithmetic of list lengths and finite types. |
| `exact funext ...`, `funext` | Extensionality for functions. |
| `cases h` / `rcases h` | Case analysis on equalities or existential hypotheses. |
| `lift`, `lift_le`, `mk_*`, `card_*` | Cardinal arithmetic simplifications (e.g., `lift_aleph0`, `aleph0_add_aleph0`). |
| `rfl`, ` rfl` | Reflexivity for definitional equalities. |
| `aesop` (not present) | Not used — proofs are highly structured and manual. |

---

#### **4. Proof Logic**

- **Inductive Structure**:  
  Proofs of correctness (e.g., `listDecode_encode_list`) proceed by **induction on terms/formulas**, followed by **case analysis on list structure** (nil/cons).  
  - For terms: base case `var`, inductive step `func f ts`.
  - For formulas: structural induction on `falsum`, `equal`, `rel`, `imp`, `all`.

- **Cardinal Bounds**:
  - Use `Term.encoding.card_le_card_list` + `mk_list_le_max` to reduce to list cardinality.
  - `Term.card_sigma` uses `le_antisymm` with:
    - Upper bound via `mk_sigma` + `ciSup_le_iff'`.
    - Lower bound via constructing an injection from `ℕ` (or `α ⊕ Σi, L.Functions i`) into terms.

- **Decoding Correctness**:
  - Heavy use of `Option`-based decoding with `get?`, `join`, `head?`.
  - Verification relies on tracking list lengths, dropping decoded prefixes, and ensuring well-formedness via `if ... then ... else default`.

- **Injectivity**:
  - Derived from `encoding.encode_injective`, which follows from `decode_encode`.

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Computability.Encoding` | Core `Encoding` typeclass and lemmas (`card_le_card_list`, `encode_injective`). |
| `Mathlib.Logic.Small.List` | Tools for `Small`/`Countable`/`Encodable` types via list encodings. |
| `Mathlib.ModelTheory.Syntax` | First-order language, term, and formula definitions (`L.Term`, `L.BoundedFormula`). |
| `Mathlib.SetTheory/Cardinal/Arithmetic` | Cardinal arithmetic (e.g., `aleph0_add_aleph0`, `lift`, `mk_*`). |

**Domain Scope**:  
Formalization of *first-order logic syntax* with:
- Dependent type-theoretic representation of languages (`L : Language.{u, v}`).
- Parameterized terms/formulas over variable contexts (`α : Type u'`).
- Cardinality analysis for computability foundations (preparing for incompleteness results).

**Notable Design Choices**:
- Use of `Σn, L.BoundedFormula α n` to track variable context size.
- Explicit handling of arities via `Fin n`, `FinRange`, and `getElem`.
- Conservative decoding (returns `default` on malformed input) for safety.

--- 

This metadata is suitable for training a domain-specific AI agent in formalization, logic, and computability theory.