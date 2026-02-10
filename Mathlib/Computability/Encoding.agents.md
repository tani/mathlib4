### Technical Brief: Encodings in Lean 4 (Computability Module)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Structure | Purpose |
|------|------------------|---------|
| `Encoding (α : Type u)` | `Structure` | Defines a pair of `encode : α → List Γ` and `decode : List Γ → Option α` with correctness (`decode_encode`). Models injective encoding into strings over alphabet `Γ`. |
| `FinEncoding (α : Type u)` | `Structure` | Extends `Encoding` with `Fintype Γ`, ensuring finite alphabet. Crucial for Turing machine models. |
| `Γ'` | `Inductive` | Standard TM alphabet: `{blank, bit b, bra, ket, comma}`. Used for realistic encodings. |
| `inclusionBoolΓ' : Bool → Γ'` | `def` | Embeds bits into TM alphabet via `bit`. |
| `sectionΓ'Bool : Γ' → Bool` | `def` | Left inverse of `inclusionBoolΓ'`, maps `bit b ↦ b`, others ↦ default. |
| `encodePosNum`, `decodePosNum` | `def`s | Binary encoding/decoding of positive binary numbers (`PosNum`). |
| `encodeNum`, `decodeNum` | `def`s | Binary encoding/decoding of `Num` (including zero). |
| `encodeNat`, `decodeNat` | `def`s | Binary encoding/decoding of `ℕ`. |
| `unaryEncodeNat`, `unaryDecodeNat` | `def`s | Unary encoding (`n ↦ [true] ^ n`) and decoding via `List.length`. |
| `encodingNatBool`, `finEncodingNatBool` | `def`s | Binary encoding of `ℕ` over `Bool`. |
| `encodingNatΓ'`, `finEncodingNatΓ'` | `def`s | Binary encoding of `ℕ` over TM alphabet `Γ'`, using `inclusionBoolΓ'` and `sectionΓ'Bool`. |
| `unaryFinEncodingNat` | `def` | Unary encoding of `ℕ` over `Bool`. |
| `finEncodingBoolBool` | `def` | Trivial encoding of `Bool` over itself (`b ↦ [b]`). |
| `Encoding.encode_injective` | `thm` | `encode` is injective (follows from `decode_encode`). |
| `Encoding.card_le_card_list` | `thm` | `#α ≤ #(List Γ)` (cardinality bound via injective `encode`). |
| `Encoding.card_le_aleph0` | `thm` | If `Γ` is countable, then `#α ≤ ℵ₀`. |
| `FinEncoding.card_le_aleph0` | `thm` | Immediate corollary for finite alphabets (`#α ≤ ℵ₀`). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `encode*` / `decode*`: Encoding/decoding functions (e.g., `encodeNat`, `decodePosNum`).
  - `unary*`: Unary encoding variants.
  - `finEncoding*`: Finite-alphabet encodings (`FinEncoding`).
  - `inclusion*` / `section*`: Embedding and retraction pairs (e.g., `inclusionBoolΓ'`, `sectionΓ'Bool`).
- **Suffixes**:
  - `*Bool`: Encodings over `Bool` alphabet.
  - `*Γ'`: Encodings over TM alphabet `Γ'`.
  - `*Nat`: Encodings targeting `ℕ`.
- **Structure names**:
  - `Encoding`, `FinEncoding`: Core abstractions.
  - `Γ'`: Standard TM alphabet.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rw`: Rewriting definitions (e.g., `decode_encodeNat`).
- `induction'`: Structural induction on `PosNum`, `Num`, `Nat`.
- `unfold`: Expanding definitions (e.g., `encodePosNum`, `decodePosNum`).
- `congr_arg`: Proving equality of function applications.
- `exact`, `rfl`: Direct proof steps.
- `if_neg`, `if_pos`: Handling `ite` (if-then-else) cases.
- `cases_type*`: Case analysis on inductive types (e.g., `Γ'`).
- `decide`: Solving decidable propositions (e.g., `Fintype` instances).
- `LeftInverse.id`: Rewriting left inverses (used in `encodingNatΓ'` proof).

---

#### **4. Proof Logic**

- **Inductive structure**: Proofs (e.g., `decode_encodePosNum`) use induction on `PosNum`:
  - Base case (`PosNum.one`): `rfl`.
  - Inductive steps (`bit0`, `bit1`): Simplify using induction hypothesis and `if_neg` to avoid degenerate cases.
- **Compositionality**: For `encodingNatΓ'`, proofs rely on:
  - `List.map_map` and `leftInverse_section_inclusion` to reduce to `decode_encodeNat`.
- **Cardinality bounds**: Use `Cardinal.lift_mk_le'` and injectivity of `encode` to derive cardinal inequalities.
- **Fintype handling**: `Fintype` instances (e.g., `Γ'.fintype`) are constructed via explicit finite sets + `decide`.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Data.Fintype.Basic`: For `Fintype`, `Fintype.card`.
- `Mathlib.Data.Num.Lemmas`: For `Num`, `PosNum`, binary arithmetic.
- `Mathlib.Data.Option.Basic`: For `Option`, `some`, `decode : List Γ → Option α`.
- `Mathlib.SetTheory/Cardinal/Basic`: For cardinal arithmetic (`#α`, `ℵ₀`, `lift`).

**Scope**:  
This module formalizes foundational concepts for computability theory in Lean 4, specifically:
- Abstract encodings (`Encoding`, `FinEncoding`).
- Concrete examples (binary/unary encodings of `ℕ`, `Bool`, `PosNum`).
- Embeddings between alphabets (`Bool ↪ Γ'`).
- Cardinality constraints for countable/finite domains.

It serves as a prerequisite for defining Turing machines and computable functions in the `Computability` namespace.

--- 

Let me know if you'd like a diagram of the encoding relationships or a summary of how these encodings interface with Turing machine formalizations.