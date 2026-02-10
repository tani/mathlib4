### Technical Metadata Brief: Floating-Point Implementation in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Int.shift2` | `ℕ → ℕ → ℤ → ℕ × ℕ` | Scales numerator/denominator pair by powers of two, used for binary exponent handling. |
| `FloatCfg` | `Type` (class) | Configuration for floating-point format: precision `prec`, max exponent `emax`, with constraints `0 < prec ≤ emax`. |
| `emin` | `ℤ` | Minimal exponent: `1 - emax`. |
| `ValidFinite e m` | `Prop` | Conditions ensuring `(e, m)` represents a valid finite floating-point number: bounds on `e + prec - 1`, and normalization condition `e = max (e + m.size - prec) emin`. |
| `Float` | `Type` | Inductive type representing extended floating-point values: `inf Bool`, `nan`, or `finite Bool ℤ ℕ ValidFinite`. |
| `Float.isFinite` | `Float → Bool` | Predicate checking if a float is finite (not `inf` or `nan`). |
| `toRat` | `∀ f : Float, f.isFinite → ℚ` | Converts a finite float to a rational number using `Int.shift2`. |
| `Float.Zero.valid` | `ValidFinite emin 0` | Proof that `(emin, 0)` is a valid finite representation (zero). |
| `Float.zero` | `Bool → Float` | Constructs a zero float with given sign. |
| `Float.sign'`, `Float.sign` | `Float → Semiquot Bool`, `Float → Bool` | Extract sign bit; `sign'` handles NaN as top (undefined). |
| `Float.isZero` | `Float → Bool` | Checks if float is zero (only finite with mantissa 0). |
| `Float.neg` | `Float → Float` | Negates sign bit; preserves `inf`, `nan`, and finite structure. |
| `divNatLtTwoPow` | `ℕ → ℕ → ℤ → Bool` | Compares `n < d * 2^e`, used in rounding logic. |
| `ofPosRatDn` | `ℕ+ → ℕ+ → Float × Bool` *(unsafe)* | Converts positive rational to float via scaling and floor; returns `(float, exact?)`. |
| `nextUpPos`, `nextDnPos` | `ValidFinite e m → Float` *(unsafe)* | Computes next representable float upward/downward for positive values. |
| `nextUp`, `nextDn` | `Float → Float` *(unsafe)* | Generalized next-up/down for all floats, handling signs. |
| `ofRatUp`, `ofRatDn`, `ofRat` | `RMode → ℚ → Float` *(unsafe)* | Converts rational to float with rounding modes (NE = round-to-nearest-even). |
| `Float.add`, `Float.sub`, `Float.mul`, `Float.div` | `Float → Float → Float` *(unsafe)* | Binary operations implemented via rational conversion + rounding. |

> **Note**: All arithmetic operations are marked `unsafe` due to incomplete proofs (`lcProof`, `lcProof`-like placeholders), per porting notes.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `is_`: Boolean predicates (`isFinite`, `isZero`)
  - `of_`: Conversions *into* the type (`ofRat`, `ofPosRatDn`)
  - `next_`: Successor/predecessor in representable set (`nextUp`, `nextDn`)
  - `sign'`, `sign`: Sign extraction (with/without partiality)
- **Suffixes**:
  - `'`: Variant with extra semantics (e.g., `sign'` returns `Semiquot` for NaN)
  - `Pos`: Positive-only variant (`nextUpPos`, `nextDnPos`)
  - `Dn`/`Up`: Downward/Upward rounding (`ofRatDn`, `ofRatUp`)
- **Type/Class**:
  - `FloatCfg`: Configuration class (suffix `Cfg`)
  - `RMode`: Rounding mode enum (`NE`, `down`, etc.)

---

#### **3. Tactic Stack**

Frequently used tactics in proofs/definitions:
- `unfold`, `rw`, `simp`, `omega` (for arithmetic inequalities)
- `apply`, `exact`, `refine` (for constructing proofs)
- `cases'` (for destructuring `Int`, `ℕ+`, products)
- `infer_instance` (for decidability proofs)
- `set_option linter.unusedVariables false` (workaround for incomplete proofs)

> **Notable absence**: No heavy automation (`aesop`, `ring`, `linarith`) — proofs are mostly manual or rely on `omega`.

---

#### **4. Proof Logic**

- **Inductive structure**: Proofs often proceed by case analysis on `Float` constructors (`finite`, `inf`, `nan`) or `Int` forms (`Int.ofNat`, `Int.negSucc`).
- **Normalization checks**: `ValidFinite` proofs require verifying bounds on `e + prec - 1` and normalization condition via `max` and `size`.
- **Rational conversion**: `toRat` uses `Int.shift2` to compute numerator/denominator as `n / 2^e`, then applies `mkRat`.
- **Rounding logic**: `ofRat` with `RMode.NE` compares distance to adjacent floats (`low`, `high`) and uses parity of mantissa for tie-breaking.
- **Safety assumptions**: Many proofs are deferred (`lcProof`, `?_`), relying on `unsafe` annotations and `set_option linter.unusedVariables false`.

---

#### **5. Imports & Scope**

**Primary Dependencies**:
- `Mathlib.Data.Semiquot`: For partial values (`Semiquot Bool`).
- `Mathlib.Data.Nat.Size`: Bit-length (`m.size`).
- `Batteries.Data.Rat.Basic`: Rational numbers (`mkRat`, `ℚ`).
- `Mathlib.Data.PNat.Defs`: Positive naturals (`ℕ+`, `succPNat`).
- `Mathlib.Data.Rat.Init`: Initialization for `ℚ`.
- `Mathlib.Algebra.Ring.Int.Defs`: Integers (`Int.ofNat`, `Int.negSucc`).
- `Mathlib.Algebra.Order.Group.Unbundled.Basic`: Ordered groups (used for `emin`/`emax` reasoning).

**Scope**: Experimental floating-point arithmetic, focused on *representation*, *validity*, and *rounding* — not full IEEE-754 compliance or numerical analysis.

--- 

**Summary**: This module defines a foundational floating-point type with configurable precision/exponent range, supporting finite/infinite/NaN values, sign extraction, and basic arithmetic via rational emulation and rounding. It prioritizes formal correctness of representation over performance or full standard compliance, with many operations marked `unsafe` pending proof completion.