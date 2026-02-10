### Technical Metadata Brief: `Mathlib.Logic.Subtype`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Subtype.val` / `coe` | `Subtype p → α` | Coercion from a subtype element to its underlying value in `α`. |
| `Subtype.prop` | `∀ x : Subtype p, p x` | Extracts the proof that the coerced value satisfies the predicate `p`. |
| `Subtype.forall'` | `(∀ x h, q x h) ↔ ∀ x : Subtype p, q x x.2` | Alternative universal quantification over subtypes, useful when `q` is hard to infer. |
| `Subtype.exists'` | `(∃ x h, q x h) ↔ ∃ x : Subtype p, q x x.2` | Alternative existential quantification over subtypes. |
| `Subtype.ext_val`, `Subtype.ext_iff_val` | `a1.1 = a2.1 → a1 = a2`, `a1 = a2 ↔ a1.1 = a2.1` | Extensionality principles for subtypes: equality is determined by equality of underlying values. |
| `Subtype.mk_eq_mk` | `@mk α p a h = @mk α p a' h' ↔ a = a'` | Equality of subtype constructors reduces to equality of the underlying terms. |
| `Subtype.coe_injective` | `Injective (coe : Subtype p → α)` | Coercion is injective: distinct subtype elements have distinct values. |
| `Subtype.restrict` | `(p : α → Prop) → (∀ x, β x) → Subtype p → β x.1` | Restricts a dependent function to a subtype. |
| `Subtype.map` | `(f : α → β) → (∀ a, p a → q (f a)) → Subtype p → Subtype q` | Maps a function on `α` to a function on subtypes, preserving the predicate. |
| `Subtype.coind` | `(f : α → β) → (∀ a, p (f a)) → α → Subtype p` | “Coinduction” principle: lifts a function into a subtype if its image lies in the predicate. |
| `Subtype.map_injective`, `map_surjective`, `map_bijective` | Conditions under which `map f h` inherits injectivity/surjectivity/bijectivity from `f`. |
| `Subtype.coe_prop`, `val_prop` | `↑a ∈ S`, `a.val ∈ S` for `a : {a // a ∈ S}` | Relates subtype elements over sets to membership in the underlying set. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `coe_`: Coercion-related (e.g., `coe_eta`, `coe_injective`, `coe_eq_iff`).
  - `val_`: Value projection (e.g., `val_injective`, `val_prop`).
  - `mk_`: Constructor-related (e.g., `mk_eq_mk`, `coe_mk`).
  - `ext_`: Extensionality (e.g., `ext_val`, `ext_iff_val`).
  - `restrict_`, `map_`, `coind_`: Function manipulation on subtypes.

- **Suffixes**:
  - `'` (prime): Alternative version of a standard lemma (e.g., `forall'`, `exists'`).
  - `_iff`: Equivalence characterizations (e.g., `coe_inj`, `heq_iff_coe_eq`, `exists_eq_subtype_mk_iff`).

- **Notation**:
  - `⟨a, h⟩` or `Subtype.mk a h`: Constructor for subtype elements.
  - `{ a // p a }`: Syntax for `Subtype p`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `rfl`, `refl`: For definitional equalities.
- `rw [Subtype.ext_iff]`, `rw [Subtype.ext]`: To reduce equality of subtypes to equality of values.
- `simp only [...]`: Especially with `coe_eta`, `coe_mk`, `ext_iff_val`.
- `subst`, `cases`: For handling equality hypotheses and dependent pairs.
- `exact`, `apply`, `intro`, `rintro`, `rcases`: Basic proof structure.
- `congr_arg`: To extract equality of components from equality of pairs.
- `funext`: To prove function extensionality (e.g., in `map_id`, `restrict_def`).
- `heq_iff_eq`, `heq_iff_coe_eq`, `heq_iff_coe_heq`: For handling heterogeneous equality.

---

#### **4. Proof Logic**

- **Extensionality proofs**: Most equality proofs reduce via `Subtype.ext_iff` to equality of the first component (`a.1`).
- **Injectivity/surjectivity proofs**: Typically lift properties of `f` to `map f h` or `restrict p f` using `coe_injective` and function composition lemmas.
- **Quantifier manipulations**: Use `forall'`/`exists'` to avoid typeclass inference issues with implicit arguments.
- **Dependent function handling**: `restrict` and `map` proofs often unfold definitions (`rfl`, `simp`) and use properties of underlying functions.
- **Inductive reasoning**: Rare—subtypes are inductive in core, but proofs here are mostly equational reasoning.

---

#### **5. Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Logic.Function.Basic` | Provides basic function theory (`Injective`, `Surjective`, `Bijective`, `Involutive`, etc.). |
| `Mathlib.Tactic.AdaptationNote` | For deprecation notes and migration guidance (e.g., `map_def`). |
| `Mathlib.Tactic.Simps.Basic` | For `initialize_simps_projections` and `simps`-related infrastructure (`@simps` attribute). |

---

### Summary

This module provides foundational API for **subtypes**, emphasizing:
- **Equality and extensionality** (`ext`, `coe_injective`, `ext_iff_val`).
- **Quantifier manipulation** (`forall'`, `exists'`).
- **Function lifting and restriction** (`map`, `restrict`, `coind`).
- **Set-theoretic interpretation** (`coe_prop`, `val_prop`).

It is designed for **practical use in dependent type theory**, with attention to Lean’s type inference limitations (e.g., `forall'`, `exists'`). The file avoids heavy automation, relying instead on explicit equational reasoning and `simp`-friendly lemmas.

Let me know if you'd like a dependency graph or a formalization checklist for downstream use.