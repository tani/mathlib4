### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `SemiconjBy` | `SemiconjBy : R → R → R → Prop` | Defines the *semiconjugacy* relation: `SemiconjBy a x y` means `a * x = y * a`. (Defined in `Mathlib.Algebra.Group.Semiconj.Defs`, imported here.) |
| `add_right` | `[Distrib R] → SemiconjBy a x y → SemiconjBy a x' y' → SemiconjBy a (x + x') (y + y')` | Shows semiconjugacy is preserved under addition on the right argument. |
| `add_left` | `[Distrib R] → SemiconjBy a x y → SemiconjBy b x y → SemiconjBy (a + b) x y` | Shows semiconjugacy is preserved under addition on the left argument. |
| `neg_right` | `[Mul R] [HasDistribNeg R] → SemiconjBy a x y → SemiconjBy a (-x) (-y)` | Negation of the right argument preserves semiconjugacy. |
| `neg_right_iff` | `SemiconjBy a (-x) (-y) ↔ SemiconjBy a x y` | Equivalence for negation on the right (bidirectional). |
| `neg_left` | `[Mul R] [HasDistribNeg R] → SemiconjBy a x y → SemiconjBy (-a) x y` | Negation of the left argument preserves semiconjugacy. |
| `neg_left_iff` | `SemiconjBy (-a) x y ↔ SemiconjBy a x y` | Equivalence for negation on the left. |
| `neg_one_right` | `[MulOneClass R] [HasDistribNeg R] → SemiconjBy a (-1) (-1)` | `-1` semiconjugates any `a` to itself. |
| `neg_one_left` | `[MulOneClass R] [HasDistribNeg R] → SemiconjBy (-1) x x` | `-1` is self-semiconjugating on any `x`. |
| `sub_right` | `[NonUnitalNonAssocRing R] → SemiconjBy a x y → SemiconjBy a x' y' → SemiconjBy a (x - x') (y - y')` | Subtraction on the right is preserved (via `sub_eq_add_neg` + `neg_right`). |
| `sub_left` | `[NonUnitalNonAssocRing R] → SemiconjBy a x y → SemiconjBy b x y → SemiconjBy (a - b) x y` | Subtraction on the left is preserved. |

#### 2. **Naming Conventions**
- **Prefixes**:
  - `add_`, `neg_`, `sub_`: indicate operation being preserved (addition, negation, subtraction).
  - `_right`, `_left`: indicate which argument (right or left of `*`) is being operated on.
- **Suffixes**:
  - `_iff`: indicates a biconditional equivalence (↔), often with symmetric behavior (e.g., `neg_right_iff`).
- **Special constants**:
  - `neg_one_`: for properties involving `-1`.

#### 3. **Tactic Stack**
- `simp only [...]`: heavily used to rewrite using `SemiconjBy`, distributivity, negation laws (`neg_mul`, `mul_neg`), and definitions.
- `simpa only [...] using ...`: used to simplify the goal using a given proof term (e.g., `h.add_right h'.neg_right`).
- `ring` is *not* used here — arithmetic is handled via `simp` with explicit lemmas.
- No induction or `linarith`/`omega` — purely algebraic rewriting.

#### 4. **Proof Logic**
- **Pattern**: Most proofs follow a *direct rewriting* strategy:
  1. Unfold `SemiconjBy` (via `simp only [SemiconjBy, ...]`).
  2. Apply distributivity (`left_distrib`, `right_distrib`) or negation identities (`neg_mul`, `mul_neg`).
  3. Replace using the hypothesis (`h.eq`, `h'.eq`, etc.).
- For equivalences (`_iff`), proofs use:
  - `⟨fun h => ..., fun h => ...⟩` or
  - `⟨fun h => ..., SemiconjBy.*⟩` when one direction is trivial.
- Subtraction lemmas reuse existing `add`/`neg` lemmas via `sub_eq_add_neg`.

#### 5. **Imports**
- `Mathlib.Algebra.Group.Semiconj.Defs`: defines `SemiconjBy` itself.
- `Mathlib.Algebra.Ring.Defs`: provides foundational ring/semiring class definitions (`Distrib`, `MulOneClass`, `HasDistribNeg`, `NonUnitalNonAssocRing`, etc.).

> **Note**: This file focuses on *interaction* of addition, negation, and multiplication w.r.t. semiconjugacy — complementary to `Mathlib.Algebra.Group.Basic`, which treats `+` and `*` separately. The assumptions (`[Distrib R]`, `[HasDistribNeg R]`, etc.) reflect minimal algebraic structure needed for each lemma.