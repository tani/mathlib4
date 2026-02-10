### Technical Brief: `Mathlib.Analysis.Asymptotics.Theta`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsTheta` | `IsTheta (l : Filter α) (f : α → E) (g : α → F) : Prop` | Defines asymptotic equivalence up to constant factors: `f = Θ(g)` along filter `l` iff `f = O(g)` and `g = O(f)`. |
| `IsBigO.antisymm` | `f =O[l] g → g =O[l] f → f =Θ[l] g` | Constructs `Θ` from mutual `O` bounds. |
| `isTheta_refl` | `f =Θ[l] f` | Reflexivity of `Θ`. |
| `IsTheta.symm` | `f =Θ[l] g → g =Θ[l] f` | Symmetry of `Θ`. |
| `IsTheta.trans` | `f =Θ[l] g → g =Θ[l] k → f =Θ[l] k` | Transitivity of `Θ`. |
| `isTheta_comm` | `f =Θ[l] g ↔ g =Θ[l] f` | Equivalence form of symmetry. |
| `isTheta_bot` | `f =Θ[⊥] g` | Trivial equivalence under bottom filter. |
| `isTheta_zero_left` / `isTheta_zero_right` | `(0 =Θ[l] g) ↔ g =ᶠ[l] 0` | Characterizes zero equivalence via eventual vanishing. |
| `isTheta_const_const` | `c₁ ≠ 0 ∧ c₂ ≠ 0 → (λ _ ↦ c₁) =Θ[l] (λ _ ↦ c₂)` | Nonzero constant functions are `Θ`-equivalent. |
| `isTheta_const_const_iff` | `[NeBot l] ⇒ ((λ _ ↦ c₁) =Θ[l] (λ _ ↦ c₂)) ↔ (c₁ = 0 ↔ c₂ = 0)` | Full characterization for constant functions under nontrivial filter. |
| `isTheta_norm_left` / `isTheta_norm_right` | `(‖f‖ =Θ[l] g) ↔ f =Θ[l] g` | Equivalence with norm in one argument. |
| `isTheta_of_norm_eventuallyEq` | `(‖f‖ =ᶠ[l] ‖g‖) → f =Θ[l] g` | If norms are eventually equal, functions are `Θ`-equivalent. |
| `IsTheta.isLittleO_congr_left/right` | `f =Θ[l] g ⇒ (f =o[l] h ↔ g =o[l] h)` | `Θ`-equivalence preserves `o`-asymptotics. |
| `IsTheta.isBigO_congr_left/right` | `f =Θ[l] g ⇒ (f =O[l] h ↔ g =O[l] h)` | `Θ`-equivalence preserves `O`-asymptotics. |
| `IsTheta.smul`, `IsTheta.mul`, `IsTheta.inv`, `IsTheta.div`, `IsTheta.pow`, `IsTheta.zpow` | Various algebraic operations preserve `Θ` | Closure under scalar multiplication, multiplication, inversion, division, powers (natural/integer). |
| `IsTheta.add_isLittleO`, `IsLittleO.add_isTheta` | `f₁ =Θ[l] g ∧ f₂ =o[l] g ⇒ f₁ + f₂ =Θ[l] g` | Dominant term in sum determines `Θ` class. |
| `IsTheta.fiberwise_right/left`, `comp_fst/snd` | Fiberwise and product-space behavior | `Θ`-equivalence lifts to product filters and sections. |
| `ContinuousOn.isTheta_principal` | Compact continuity + nonzero ⇒ `Θ`-equivalence to constant | Applies `Θ`-analysis on compact sets via principal filter. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `isTheta_`: Properties of `Θ` (e.g., `isTheta_refl`, `isTheta_bot`, `isTheta_zero_left`).
  - `IsTheta.`: Methods/lemmas about `Θ` as a relation (e.g., `IsTheta.symm`, `IsTheta.trans`, `IsTheta.smul`).
  - `isBigO_`, `isLittleO_`: Analogous for `O`/`o`.
- **Suffixes**:
  - `_left` / `_right`: Argument position in binary relation (e.g., `isTheta_norm_left`, `isTheta_const_mul_left`).
  - `_congr_left` / `_congr_right`: Congruence properties (e.g., `isLittleO_congr_left`).
  - `_iff`: Biconditional characterizations (e.g., `isTheta_zero_left`, `isTheta_const_const_iff`).
- **Aliases**:
  - `⟨IsTheta.of_..., IsTheta....⟩ := ...` — provides forward/backward directions.

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `simp only [...]` — heavily used for rewriting definitions and simplifying goals.
- `by simpa only [...] using ...` — targeted simplification with `using` for precise substitution.
- `exact`, `intro`, `cases`, `apply`, `refine` — standard proof construction.
- `and_congr` — for splitting biconditionals over conjunctions.
- `mono` — monotonicity for filters (e.g., `h.mono hl`).
- `add_comm`, `mul_comm`, etc. — rewriting commutative operations.
- `eq_zero_imp`, `eq_zero_imp.mono` — reasoning about zero sets.
- `tendsto_zero_iff`, `tendsto_norm_atTop_iff` — rewrites using known equivalences.

No heavy automation (e.g., `aesop`, `linarith`) is used — proofs are mostly structural and definition-driven.

---

#### **4. Proof Logic**

- **Structure**: Proofs follow a *definition-first* approach:
  1. Unfold `IsTheta` as `IsBigO ∧ IsBigO`.
  2. Prove each component separately (e.g., `h.1.trans h₂.1`).
  3. Use existing lemmas (`isBigO_refl`, `isBigO.trans`, `isBigO.mono`, etc.).
- **Symmetry/Transitivity**: Proven via pairing of `O`-properties.
- **Congruence**: Often proven via `isBigO_congr_left/right`, leveraging `Θ`’s definition.
- **Algebraic closure**: Proven by lifting operations to `O` and `o` (e.g., `smul`, `mul`, `inv`).
- **Filter manipulation**: Use of `mono`, `sup`, `fiberwise`, `comp_fst/snd` to handle product filters and sections.
- **Zero/norm cases**: Rely on `eq_zero_imp`, `eventuallyEq`, and norm-specific lemmas (`isTheta_norm_left`, `isTheta_of_norm_eventuallyEq`).

---

#### **5. Imports**

- `Mathlib.Analysis.Asymptotics.Asymptotics`: Core definitions (`IsBigO`, `IsLittleO`, `Tendsto`, etc.).
- `Mathlib.Analysis.Normed.Module.Basic`: Normed spaces, seminormed groups/rings, scalar multiplication.

**Scope**: This module formalizes *asymptotic equivalence up to constant factors* (`Θ`) in the context of normed spaces over filters, building on big-O and little-o asymptotics. It is foundational for complexity analysis, asymptotic expansions, and comparison of growth rates in analysis and computer science.

--- 

Let me know if you'd like a dependency graph or a summary of how this fits into the broader `Mathlib` asymptotics hierarchy.