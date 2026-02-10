### Technical Brief: `zify` Tactic in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `zify` tactic | Syntax rule: `"zify" (simpArgs)? (location)? : tactic` — shifts propositions over `ℕ` to `ℤ`, leveraging `push_cast` and `zify_simps`. |
| `mkZifyContext` | `Option (Syntax.TSepArray ...) → TacticM MkSimpContextResult` — constructs the simplifier context used by `zify`, including `zify_simps`, `push_cast`, and user-provided lemmas. |
| `applySimpResultToProp'` | `Expr → Expr → Simp.Result → MetaM (Expr × Expr)` — transforms a proof and proposition using a simplifier result, preserving logical equivalence. |
| `zifyProof` | `Option ... → Expr → Expr → TacticM (Expr × Expr)` — applies `zify` to a given proof and proposition, returning the transformed pair. |
| `@[zify_simps] natCast_eq` | `a = b ↔ (a : ℤ) = (b : ℤ)` — enables rewriting equality across `ℕ` and `ℤ`. |
| `@[zify_simps] natCast_le` | `a ≤ b ↔ (a : ℤ) ≤ (b : ℤ)` — enables lifting order relations. |
| `@[zify_simps] natCast_lt` | `a < b ↔ (a : ℤ) < (b : ℤ)` — enables lifting strict order. |
| `@[zify_simps] natCast_ne` | `a ≠ b ↔ (a : ℤ) ≠ (b : ℤ)` — enables lifting inequality. |
| `@[zify_simps] natCast_dvd` | `a ∣ b ↔ (a : ℤ) ∣ (b : ℤ)` — enables lifting divisibility. |
| `Nat.cast_sub_of_add_le` | `m + k ≤ n → ((n - m : ℕ) : R) = n - m` — ensures `zify` can push cast through `ℕ` subtraction when a supporting inequality holds. |
| `Nat.cast_sub_of_lt` | `m < n → ((n - m : ℕ) : R) = n - m` — similar, for strict inequality. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `natCast_`: for lemmas translating `ℕ`-relations to `ℤ`-relations.
  - `zify_`: for internal functions (`zifyProof`, `mkZifyContext`).
- **Attribute**:
  - `@[zify_simps]`: tags lemmas used by `zify` to rewrite propositions.
- **Tactic name**:
  - `zify`: main tactic name (no suffix/prefix beyond the name itself).
- **Aliases**:
  - `nat_cast_dvd` (deprecated alias for `natCast_dvd`).

---

#### **3. Tactic Stack**

- **Core tactics used**:
  - `simp`: primary workhorse, with `-decide only [...]`.
  - `push_cast`: used to simplify casts (e.g., `↑(a - b)` → `↑a - ↑b`).
  - `simpArgs` parsing: supports optional user-provided lemmas via `zify [h1, h2]`.
- **Meta-level helpers**:
  - `mkSimpContext`, `mkExpectedTypeHint`, `mkEqMP`, `applySimpResultToProp'`.

---

#### **4. Proof Logic / Strategy**

- **High-level flow**:
  1. Parse tactic arguments (`simpArgs`, `at`-location).
  2. Construct a simplifier context using `mkZifyContext`, including:
     - `zify_simps` lemmas (for proposition lifting),
     - `push_cast` (for expression simplification),
     - user-provided lemmas (e.g., `hab : b ≤ a`).
  3. Apply `simp` to the target or hypothesis (depending on `at` location).
  4. Use `applySimpResultToProp'` to propagate the simplification to the proof term.
- **Key insight**:
  - `zify` does **not** change variable types (unlike `lift`), only reinterprets propositions over `ℕ` as propositions over `ℤ`.
  - Leverages `norm_cast`-style lemmas (`Nat.cast_sub_of_lt`, `Nat.cast_sub_of_add_le`) to handle subtraction in `ℕ`.

---

#### **5. Imports & Scope**

- **Core dependencies**:
  - `Mathlib.Tactic.Basic`
  - `Mathlib.Tactic.Attr.Register`
  - `Mathlib.Data.Int.Cast.Basic`
  - `Mathlib.Order.Basic`
- **Scope**:
  - Part of `Mathlib.Tactic.Zify` namespace.
  - Designed for use in tactic scripts over `Nat`-based goals where `Int`-arithmetic (especially subtraction) is beneficial.

---

### Summary

The `zify` tactic is a *proposition-level embedding* of `ℕ`-statements into `ℤ`, enabling more natural reasoning about subtraction and other `Int`-friendly operations. It is tightly integrated with `push_cast` and a custom `zify_simps` database, and supports user-provided lemmas to guide simplification. Its design reflects Lean’s cast-aware simplification infrastructure, with careful handling of proofs and type coercions.