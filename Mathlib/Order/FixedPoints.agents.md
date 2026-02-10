Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: Fixed Points in Complete Lattices (Lean 4)**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `lfp` | `(f : α →o α) → α` | Least fixed point of monotone `f`, defined as `sInf { a | f a ≤ a }` |
| `gfp` | `(f : α →o α) → α` | Greatest fixed point of monotone `f`, defined as `sSup { a | a ≤ f a }` |
| `prevFixed` | `(x : α) → f x ≤ x → fixedPoints f` | Greatest fixed point ≤ `x`, when `f x ≤ x` |
| `nextFixed` | `(x : α) → x ≤ f x → fixedPoints f` | Least fixed point ≥ `x`, when `x ≤ f x` |
| `fixedPoints.completeLattice` | `CompleteLattice (fixedPoints f)` | **Knaster–Tarski Theorem**: fixed points of monotone `f` form a complete lattice |
| `lfp_eq_sSup_iterate` | `ωScottContinuous f → f.lfp = ⨆ n, f^[n] ⊥` | **Kleene’s Fixed Point Theorem**: least fixed point = sup of iterates from bottom |
| `gfp_eq_sInf_iterate` | `ωScottContinuous f.dual → f.gfp = ⨅ n, f^[n] ⊤` | Dual of Kleene’s theorem for greatest fixed point |
| `map_lfp_comp` | `f (g.comp f).lfp = (f.comp g).lfp` | “Rolling rule” for lfp under composition |
| `lfp_lfp` | `(lfp ∘ h).lfp = h.onDiag.lfp` | “Diagonal rule” for iterated lfp |
| `lfp_induction` | Induction principle for `lfp` | Enables inductive proofs over the least fixed point |
| `isLeast_lfp` / `isGreatest_gfp` | `IsLeast (fixedPoints f) f.lfp`, `IsGreatest (fixedPoints f) f.gfp` | Characterize lfp/gfp as extremal fixed points |

#### **2. Naming Conventions**

- **Prefixes**:
  - `lfp_`, `gfp_`: properties of least/greatest fixed points.
  - `prevFixed_`, `nextFixed_`: properties of relative fixed points.
  - `map_`: behavior of `f` applied to fixed points (e.g., `map_lfp`, `map_gfp`).
  - `isLeast_`, `isGreatest_`: extremality statements.
- **Suffixes**:
  - `_le`, `_le_iff`: inequalities or equivalences involving ≤.
  - `_induction`: induction principles.
  - `_fixedPoints`: constructions on the type `fixedPoints f`.
- **Duality**:
  - `f.dual` used to derive gfp results from lfp ones (e.g., `f.dual.isFixedPt_lfp` ⇒ `isFixedPt_gfp`).
  - `dualIso`, `OrderDual` used for dual constructions.

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `aesop` / `aesop_simp`: for automated reasoning with monotonicity, lattice laws.
- `simp_rw`, `simp`: for rewriting using `map_lfp`, `map_gfp`, `lfp_le`, etc.
- `exact`, `assumption`, `apply`: standard proof construction.
- `le_antisymm`: central for proving equalities in posets.
- `calc`: for chaining inequalities (especially in `lfp_induction`, `map_lfp_comp`).
- `set` + `specialize` + `have`: for structured induction proofs (e.g., `lfp_induction`).
- `Subtype.coe_le_coe.1`: to reduce inequalities in `fixedPoints f` to base type.

#### **4. Proof Logic & Strategy**

- **Inductive proofs** (e.g., `lfp_induction`, `gfp_induction`) follow standard pattern:
  - Define predicate `s := { a | a ≤ f.lfp ∧ p a }`.
  - Show `sSup s = f.lfp` via double inequality.
  - Use monotonicity and induction hypothesis to show closure under `f`.
- **Duality principle**: Most gfp results are derived by applying lfp results to `f.dual`.
- **Extremality arguments**: Prove `x = y` by showing `x ≤ y` and `y ≤ x` using:
  - `lfp_le` / `le_lfp` (for lfp),
  - `gfp_le` / `le_gfp` (for gfp).
- **Set-theoretic constructions**:
  - Fixed points are defined via sup/inf over subsets (`{ a | f a ≤ a }`, etc.).
  - Instances for `SemilatticeSup`, `CompleteSemilatticeInf`, etc., use `nextFixed`/`prevFixed` to lift lattice operations.

#### **5. Imports & Dependencies**

- **Core imports**:
  - `Mathlib.Dynamics.FixedPoints.Basic`: basic fixed point theory (`fixedPoints`, `IsFixedPt`).
  - `Mathlib.Order.Hom.Order`: bundled order-preserving maps (`→o`).
  - `Mathlib.Order.OmegaCompletePartialOrder`: ω-Scott continuity, used in Kleene’s theorem.
- **Key typeclasses**:
  - `[CompleteLattice α]`: required throughout.
  - `[ωScottContinuous f]`: for Kleene’s theorem.
- **Structures used**:
  - `fixedPoints f`: subtype `{ a // f a = a }`.
  - `OrderDual`: for dualizing constructions.

---

This file formalizes foundational fixed-point theory in order theory, with emphasis on constructive and dualizable reasoning in complete lattices. It serves as a basis for more advanced applications (e.g., denotational semantics, program verification).