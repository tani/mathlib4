### Technical Metadata Brief: `rify` Tactic (Lean 4 / Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `rify` tactic | Syntax definition: shifts propositions over `ℕ`, `ℤ`, or `ℚ` into `ℝ` by rewriting using `rify_simps`, `qify_simps`, `zify_simps`, and `push_cast`. |
| `ratCast_eq` | `∀ a b : ℚ, a = b ↔ (a : ℝ) = (b : ℝ)` — enables equivalence of equality after rational-to-real cast. |
| `ratCast_le` | `∀ a b : ℚ, a ≤ b ↔ (a : ℝ) ≤ (b : ℝ)` — enables equivalence of order relations after cast. |
| `ratCast_lt` | `∀ a b : ℚ, a < b ↔ (a : ℝ) < (b : ℝ)` — same for strict inequality. |
| `ratCast_ne` | `∀ a b : ℚ, a ≠ b ↔ (a : ℝ) ≠ (b : ℝ)` — for inequality (deprecated alias: `rat_cast_ne`). |
| `ofNat_rat_real` | `∀ a : ℕ, [a.AtLeastTwo], ((ofNat a : ℚ) : ℝ) = (ofNat a : ℝ)` — ensures compatibility of natural number embeddings via ℚ and ℝ (requires `a ≥ 2`, though `rfl` makes it trivially true regardless). |

> **Note**: These lemmas are tagged with `@[rify_simps]`, so they are used by `rify` during simplification to rewrite relations over ℚ into relations over ℝ.

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `ratCast_`: for lemmas about rational-to-real embeddings (`ratCast_eq`, `ratCast_le`, etc.)
  - `ofNat_...`: for natural number embeddings (`ofNat_rat_real`)
- **Suffixes**:
  - `_eq`, `_le`, `_lt`, `_ne`: indicate the kind of relation being preserved under cast.
- **Tactic name**: `rify` — follows naming pattern of `zify`, `qify`, `realize`, etc., in Mathlib for type-cast lifting.

---

#### **3. Tactic Stack**

The `rify` tactic is implemented as a macro expanding to:

```lean
simp -decide only [zify_simps, qify_simps, rify_simps, push_cast, $args,*] $[at $location]?
```

So the core tactic stack includes:

| Tactic | Role |
|--------|------|
| `simp` | Main driver: rewrites using specified lemmas and attributes. |
| `-decide` | Excludes `decide`-based simplifications (to avoid non-termination or unwanted decidability assumptions). |
| `only [...]` | Restricts rewrite set to specified lemmas and attributes. |
| `zify_simps`, `qify_simps`, `rify_simps` | Collections of lemmas for lifting propositions across casts ℤ→ℝ, ℚ→ℝ, ℚ→ℝ respectively. |
| `push_cast` | Simplifies expressions involving casts (e.g., `(a + b : ℝ) = (a : ℝ) + (b : ℝ)`). |
| `$args,*` | User-provided extra lemmas (e.g., `hab : b ≤ a`) to aid `push_cast`. |

---

#### **4. Proof Logic / Strategy**

- **High-level strategy**:  
  `rify` is a *rewrite-based lifting tactic*. It does **not** perform induction or case analysis. Instead:
  1. It rewrites hypotheses and goals using `rify_simps` (and related `qify_simps`, `zify_simps`) to replace ℚ/ℤ/ℕ relations with their ℝ counterparts.
  2. It simplifies resulting cast expressions using `push_cast`.
  3. It allows user-provided lemmas to help `push_cast` (e.g., subtraction lemmas like `b ≤ a` to rewrite `a - b`).

- **Typical usage pattern**:
  - Goal or context already involves `ℝ`.
  - Hypotheses involve `ℕ`, `ℤ`, or `ℚ`, possibly with casts.
  - After `rify`, the goal becomes amenable to `linarith`, `nlinarith`, or other real arithmetic solvers.

- **No induction or automation beyond rewriting** — it's a *preprocessing* tactic.

---

#### **5. Imports & Dependencies**

| Import | Purpose |
|--------|---------|
| `Mathlib.Data.Rat.Cast.Order` | Provides order-theoretic cast lemmas for ℚ → ℝ (e.g., `ratCast_le`, `ratCast_lt`). |
| `Mathlib.Data.Real.Basic` | Defines `ℝ`, its field structure, and basic cast infrastructure (`ofReal`, coercion from ℚ, ℤ, ℕ). |
| `Mathlib.Tactic.Qify` | Supplies infrastructure for `qify`/`zify`/`rify` (e.g., `simpArgs`, `location`, `@[qify_simps]`, etc.). |

> **Note**: `rify` piggybacks on the same infrastructure as `qify` and `zify`, reusing their attribute system (`qify_simps`, `zify_simps`, `rify_simps`) and tactic framework.

---

### Summary

The `rify` tactic is a lightweight, rewrite-based tool for lifting arithmetic propositions from countable ordered fields (`ℕ`, `ℤ`, `ℚ`) into `ℝ`, leveraging a shared infrastructure with `qify`/`zify`. It is not a decision procedure itself but prepares goals for solvers like `linarith`. Its correctness relies on the faithfulness of the canonical embedding ℚ ↪ ℝ (and hence ℤ ↪ ℝ, ℕ ↪ ℝ), formalized via the `rify_simps` lemmas.