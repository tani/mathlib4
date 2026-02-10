### Technical Brief: `SkewMonoidAlgebra` in Lean 4

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `SkewMonoidAlgebra k G` | `structure` | Wraps `Finsupp G k` (i.e., `G →₀ k`) into a new type; intended to support a *skewed* convolution product later. Currently only adds structure over `Finsupp`. |
| `ofFinsupp` | `G →₀ k → SkewMonoidAlgebra k G` | Inclusion map (constructor); embeds finitely supported functions into the skew algebra. |
| `toFinsupp` | `SkewMonoidAlgebra k G → G →₀ k` | Projection map; extracts underlying finitely supported function. |
| `add` | `SkewMonoidAlgebra k G → SkewMonoidAlgebra k G → SkewMonoidAlgebra k G` | Pointwise addition lifted from `Finsupp`. |
| `smul` | `S → SkewMonoidAlgebra k G → SkewMonoidAlgebra k G` | Scalar multiplication lifted from `Finsupp`, assuming `SMulZeroClass S k`. |
| `instZero`, `instAdd`, `instSMulZeroClass` | `Zero`, `Add`, `SMulZeroClass` instances | Derived via `ofFinsupp`/`toFinsupp`. |
| `eta` | `ofFinsupp f.toFinsupp = f` | Shows `ofFinsupp` and `toFinsupp` are inverses (up to equality). |
| `ofFinsupp_add`, `ofFinsupp_smul`, `toFinsupp_add`, `toFinsupp_smul` | `[simp]` lemmas | Commutativity of `ofFinsupp`/`toFinsupp` with addition/scalar mult. |
| `toFinsupp_injective`, `ofFinsupp_injective` | `Function.Injective` | Both maps are injective; `toFinsupp` reflects equality. |
| `ofFinsupp_inj`, `toFinsupp_inj` | `a = b ↔ ...` | Equational characterizations of equality via underlying functions. |
| `support` | `SkewMonoidAlgebra k G → Finset G` | Defined as `p.support` where `p = toFinsupp f`. |
| `support_ofFinsupp`, `support_toFinsupp` | `support (⟨p⟩) = p.support` | Compatibility of `support` with `ofFinsupp`. |
| `support_eq_empty` | `p.support = ∅ ↔ p = 0` | Characterizes zero element via support. |
| `instAddCommMonoid` | `AddCommMonoid (SkewMonoidAlgebra k G)` | Induced from `Finsupp` via injective map `toFinsupp`. |
| `skewMonoidAlgebra` (under `IsSMulRegular`) | `IsSMulRegular k a → IsSMulRegular (SkewMonoidAlgebra k G) a` | Lifts regularity of scalar action to skew algebra. |

> **Note**: The *skewness* (i.e., nontrivial convolution product twisted by a group/monoid action) is **not yet implemented** in this file — it's deferred to future work (see PR #15878 and #10541).

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `ofFinsupp_`: for maps *from* `Finsupp` → `SkewMonoidAlgebra`.
  - `toFinsupp_`: for maps *to* `Finsupp` ← `SkewMonoidAlgebra`.
  - `support_`: for support-related lemmas.
  - `inst_`: for typeclass instances (`instZero`, `instAdd`, etc.).
- **Suffixes**:
  - `_inj`, `_injEq`: for injectivity/equality criteria.
  - `_zero`: for zero-related simplifications.
  - `_smul`, `_add`: for algebraic operations.

---

#### **3. Tactic Stack**

Frequently used tactics:
- `rw` — rewriting using lemmas (especially `← ofFinsupp_add`, etc.)
- `simp only [...]` — with explicit lemmas to avoid unfolding definitions.
- `cases` — destructuring structure fields (`⟨a⟩`, `⟨b⟩`).
- `congr_arg` — proving equality via congruence (e.g., after applying injective maps).
- `exact` / `apply` — for direct proof steps (e.g., `ha.finsupp ...`).
- `rcases` — for destructuring existential/dependent pairs (e.g., `rcases p with ⟨⟩`).
- `rw [← ...]` — often used to push operations *through* `ofFinsupp`/`toFinsupp`.

No heavy automation (e.g., `aesop`, `ring`, `linarith`) appears — proofs are mostly structural and rely on `Finsupp` properties.

---

#### **4. Proof Logic**

- **Structure-based reasoning**: Most proofs proceed by:
  1. `cases` on `f : SkewMonoidAlgebra k G` to get `⟨p⟩`.
  2. Use `ofFinsupp`/`toFinsupp` lemmas to reduce to `Finsupp` properties.
  3. Apply known facts (e.g., `Finsupp.support_eq_empty`, `smul_zero`) and lift back via `congr_arg` or `← ofFinsupp_...`.
- **Injectivity-driven equality**: Since `toFinsupp` and `ofFinsupp` are injective, equality in `SkewMonoidAlgebra` is often reduced to equality in `Finsupp`.
- **Induction not needed**: All objects are finite (via `Finsupp`), so no inductive proofs appear here.
- **Lifting properties**: `AddCommMonoid`, `SMulZeroClass`, etc., are *transported* along the injective map `toFinsupp`.

---

#### **5. Imports & Scope**

- **Core import**: `Mathlib.Data.Finsupp.Basic`
- **Assumptions**:
  - `[Zero k]` on the base semiring `k`.
  - `[AddCommMonoid k]` for additive structure.
  - `[SMulZeroClass S k]` for scalar multiplication.
  - `[Monoid S]`, `[DistribMulAction S k]` for regularity lifting.
- **Future dependencies** (not yet included):
  - `[MulSemiringAction G k]` — needed for the *skewed convolution product* (associativity).
  - `[Monoid G]` — will be required for the product to be well-defined (see comment: “`G` will need to be a monoid for most of our uses”).

---

### Summary

This file defines the *underlying additive structure* of the skew monoid algebra as a wrapper over `Finsupp`, with the intention to later equip it with a twisted convolution product. It establishes foundational properties (zero, addition, scalar multiplication, support, injectivity), all derived from `Finsupp`. The skewness (i.e., nontrivial interaction between `G` and `k`) is deferred to future work, pending the definition of the convolution product and the `MulSemiringAction` instance.

This is a clean, minimal separation of concerns — aligning with the PR goal of structural refactoring before adding complexity.