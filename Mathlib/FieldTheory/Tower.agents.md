### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Module.Finite.left` | `∀ [Nontrivial A], Module.Finite F K` | In a scalar tower `F → K → A`, if `A` is nontrivial and finite over `F`, then `K` is finite over `F`. Requires `NoZeroSMulDivisors K A`, `IsScalarTower F K A`, and `IsNoetherian F A`. |
| `Module.Finite.right` | `∀ [Module.Finite F A], Module.Finite K A` | In a scalar tower `F → K → A`, if `A` is finite over `F`, then `A` is finite over `K`. Requires only `IsScalarTower F K A`. |
| `FiniteDimensional.left`, `FiniteDimensional.right` | Aliases for above theorems | Convenience aliases for use with `FiniteDimensional` (i.e., `Module.Finite`) typeclass. |

> **Note**: The `left` theorem is *not* an instance due to inference limitations on `A`.

#### 2. **Naming Conventions**

- **Prefixes**:
  - `Module.Finite.`: Standard prefix for finiteness properties of modules.
  - `left`, `right`: Reflect position in the tower `F → K → A`; `left` proves finiteness of the *lower* extension (`K/F`), `right` proves finiteness of the *upper* action (`A/K`).
- **Suffixes**:
  - None used beyond `left`/`right`.
- **Aliases**:
  - `FiniteDimensional.*` aliases map to `Module.Finite.*`, aligning with `FiniteDimensional` as a typeclass alias for `Module.Finite`.

#### 3. **Tactic Stack**

- `aesop`: Not used in this file.
- `ring`, `simp`, `simp_rw`: Not used.
- **Core tactics**:
  - `let`: To introduce intermediate definitions (`⟨x, hx⟩`, `⟨⟨b, hb⟩⟩`).
  - `exact`: Used implicitly via `⟨...⟩` constructor syntax.
  - `rw`: Used in `right` proof to rewrite using `Submodule.restrictScalars_top`, `eq_top_iff`, etc.
  - `exact Submodule.subset_span`: To show containment in span.
  - `smul_left_injective`: Used in `left` proof to establish injectivity.

#### 4. **Proof Logic**

- **`left` proof**:
  - Uses `exists_ne` to pick a nonzero element `x : A`.
  - Constructs an `F`-linear map `K → A` via `ringLmapEquivSelf K ℕ A`.symm x, then restricts scalars to `F`.
  - Shows this map is injective using `smul_left_injective` (enabled by `NoZeroSMulDivisors K A` and `x ≠ 0`).
  - Concludes `K` is finite over `F` via `Module.Finite.of_injective`.

- **`right` proof**:
  - Takes a finite spanning set `b : ι → A` for `A` over `F`.
  - Shows the same set spans `A` over `K` by proving the `K`-submodule it generates is the whole module.
  - Uses `Submodule.restrictScalars_injective` and rewrites span conditions via `Submodule.span_le`.
  - Concludes `A` is finite over `K`.

#### 5. **Imports**

- `Mathlib.RingTheory.Noetherian.Basic`: Provides `IsNoetherian`, `Module.Finite`, and related submodule lemmas.
- Standard imports implied by context:
  - `Mathlib.Algebra.Module.Basic` (for `Module`, `Submodule`, `restrictScalars`, `span`, etc.)
  - `Mathlib.Algebra.Module.LinearMap` (for `ringLmapEquivSelf`, `restrictScalars`)
  - `Mathlib.Algebra.Module.Finite` (for `Module.Finite` typeclass)
  - `Mathlib.Algebra.Module.IsScalarTower` (for `IsScalarTower`, `NoZeroSMulDivisors`)

#### 6. **Mathematical Context**

- Applies to **module towers**, especially **field extensions** (as noted: “these conditions hold when `A`, `F`, and `K` are fields”).
- Related to the **tower law for dimension**: `finrank F A = finrank F K * finrank K A`, referenced via `Module.finrank_mul_finrank`.

--- 

Let me know if you'd like a formalized summary in Lean doc-string format or a diagrammatic representation of the tower and implications.