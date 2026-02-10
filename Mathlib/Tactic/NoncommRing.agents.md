### Technical Metadata Brief: `noncomm_ring` Tactic (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `nat_lit_mul_eq_nsmul` | `∀ {R : Type*} [NonAssocSemiring R] (r : R) (n : ℕ) [n.AtLeastTwo], (↑n : R) * r = n • r`<br>→ Converts left multiplication by a natural numeral to scalar multiplication (`nsmul`). |
| `mul_nat_lit_eq_nsmul` | `∀ {R : Type*} [NonAssocSemiring R] (r : R) (n : ℕ) [n.AtLeastTwo], r * (↑n : R) = n • r`<br>→ Converts right multiplication by a natural numeral to scalar multiplication. |
| `noncomm_ring` tactic | Syntax-driven tactic for simplifying ring identities in *noncommutative* rings.<br>→ Uses `simp only [...]` with a curated set of lemmas, then calls `abel1` or `abel_nf`. |

> **Note**: `no_index (OfNat.ofNat n)` is the internal representation of the numeral `n` in a semiring/ring; `↑n` is its coercion to `R`.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `nat_lit_` / `mul_nat_lit_`: For lemmas handling multiplication with *numeric literals* (natural numbers).
- **Suffixes**:
  - `_eq_nsmul`: Indicates conversion to `nsmul` (natural scalar multiplication).
- **Tactic-level**:
  - `noncomm_ring`: Main tactic name; no internal naming pattern beyond descriptive intent.

---

#### **3. Tactic Stack**

| Tactic | Role |
|--------|------|
| `simp only [...]` | Core simplifier phase: unfolds products, powers, numerals, and rewrites using a *fixed* list of lemmas. |
| `abel1` | First attempt to close the goal using abelian group reasoning (optimized, non-failing). |
| `abel_nf` | Fallback: computes a normal form in the abelian group of the ring (more robust, may be slower). |
| `repeat1` | Applied *only* when user-provided rewrite rules (`[h]`) are present — to reapply tactic after each rewrite. |
| `first | ... | fail` | Ensures failure if `simp` doesn’t apply (i.e., no lemmas match). |

> **Key lemmas in `simp` set**:
> - `add_mul`, `mul_add`, `sub_eq_add_neg` — distributivity & subtraction handling  
> - `mul_assoc` — right-associates products  
> - `pow_one`, `pow_zero`, `pow_succ` — expands powers (⚠️ may cause recursion depth issues)  
> - `one_mul`, `mul_one`, `zero_mul`, `mul_zero` — numeral multiplication normalization  
> - `nat_lit_mul_eq_nsmul`, `mul_nat_lit_eq_nsmul` — numeral → `nsmul` conversion  
> - `mul_smul_comm`, `smul_mul_assoc` — reorders scalar multiplication for `abel` visibility  
> - `neg_mul`, `mul_neg` — handles negation distribution  

---

#### **4. Proof Logic / Strategy**

1. **Preprocessing via `simp only`**:
   - Fully expands terms using ring axioms and numeral lemmas.
   - Converts all numeric literals (`2`, `3`, etc.) into `n • r` (scalar multiplication).
   - Reassociates products (`a * (b * c) → (a * b) * c`) and rewrites subtractions as `+ (-b)`.

2. **Abelian Group Normalization**:
   - `abel1`: Tries to solve the goal by reducing to a trivial equality in the additive group (fast path).
   - If `abel1` fails, falls back to `abel_nf`, which computes a canonical normal form (e.g., `a + b - a = b`).

3. **User Rule Integration**:
   - If user provides rewrite rules (e.g., `noncomm_ring [h]`), wraps the tactic in `repeat1` to reapply after each rewrite, enabling iterative simplification.

> **Design Philosophy**: Prioritize *speed* and *simplicity* over completeness. Avoids heavy automation (e.g., no induction, no Groebner bases). Works best for *linear* or *low-degree* noncommutative identities.

---

#### **5. Imports & Dependencies**

| Import | Purpose |
|--------|---------|
| `Mathlib.Algebra.Group.Action.Defs` | Provides `nsmul`, `smul`, and basic module-like actions over semirings. |
| `Mathlib.Tactic.Abel` | Supplies `abel1`, `abel_nf`, and the core abelian group simplifier machinery. |

> **Note**: No `Ring` assumption in lemmas — only `NonAssocSemiring` needed for numeral lemmas. The tactic itself accepts `[Ring R]` (or `[Semiring R]`), but `abel` requires additive commutativity (hence the use of `abel`/`abel_nf`).

---

### Summary

The `noncomm_ring` tactic is a *lightweight, ad-hoc* solver for identities in noncommutative rings, leveraging:
- **Structural rewriting** (via `simp only`) to normalize terms into a form where additive abelian reasoning applies,
- **`abel`-based normalization** to finish,
- **User extensibility** via optional rewrite rules.

It exemplifies Lean’s “tactic as macro” pattern: a high-level tactic built from low-level primitives (`simp`, `abel`) with domain-specific tuning.

--- 

Let me know if you'd like a formalized signature or a trace of a sample execution.