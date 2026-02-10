### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `LawfulFix` | `class LawfulFix (α : Type*) [OmegaCompletePartialOrder α] extends Fix α where fix_eq : ∀ {f : α → α}, ωScottContinuous f → Fix.fix f = f (Fix.fix f)` | Defines a *lawful* fixed-point operator: for all **ωScott-continuous** `f`, `fix f` is a true fixed point (`fix f = f (fix f)`). |
| `approx` | `Fix.approx f i` | The `i`-th approximation of `Part.fix f`, defined inductively: `approx f 0 = f ⊥`, `approx f (n+1) = f (approx f n)`. |
| `approxChain` | `Chain ((a : _) → Part <| β a)` | The chain formed by `approx f i`, using `approx_mono` to witness monotonicity. |
| `fix_eq_ωSup` | `Part.fix f = ωSup (approxChain f)` | The fixed point equals the supremum of its approximations (in the ωCPO sense). |
| `fix_eq_of_ωScottContinuous` | `ωScottContinuous g → Part.fix g = g (Part.fix g)` | Main theorem: if `g` is ωScott-continuous, then `Part.fix g` is a fixed point of `g`. |
| `lawfulFix` (for `Part α`) | `instance lawfulFix : LawfulFix (Part α)` | Proves `Part α` has a lawful fixed-point operator by reducing to `fix_eq_of_ωScottContinuous`. |
| `lawfulFix'` (for dependent functions) | `instance lawfulFix' [LawfulFix <| (x : Sigma β) → γ x.1 x.2] : LawfulFix ((x y : _) → γ x y)` | Extends lawfulness to dependent function spaces via currying/uncurrying. |
| `monotoneCurry`, `monotoneUncurry` | Monotone (and ωScott-continuous) homs between function spaces | Enable transport of continuity/fixed-point structure across curried/uncurried representations. |
| `uncurry_curry_ωScottContinuous` | `ωScottContinuous f → ωScottContinuous (uncurry ∘ f ∘ curry)` | Ensures continuity is preserved under currying/uncurrying, crucial for lawfulness proofs in dependent settings. |

> **Note**: Deprecated aliases like `fix_eq'`, `continuous_curry`, `to_unit_cont`, etc., exist but are marked deprecated as of 2024-08-26.

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `approx_`: approximations to the fixed point (e.g., `approx_mono`, `approx_le_fix`).
  - `fix_`: fixed-point properties (e.g., `fix_eq_ωSup`, `fix_le`, `fix_eq_of_ωScottContinuous`).
  - `lawfulFix`: for instances/proofs establishing lawfulness.
  - `monotone_`: monotone functions (e.g., `monotoneCurry`, `monotoneUncurry`).
  - `ωScottContinuous_`: continuity-related lemmas (e.g., `ωScottContinuous_curry`, `ωScottContinuous_toUnitMono`).

- **Suffixes**:
  - `_eq`: equality statements (e.g., `fix_eq_ωSup`, `fix_eq_of_ωScottContinuous`).
  - `_le`: inequality or order-theoretic bounds (e.g., `fix_le`, `approx_le_fix`).
  - `_mono`: monotonicity (e.g., `approx_mono`, `approx_mono'`).
  - `_of_`: implication or derivation (e.g., `fix_eq_of_ωScottContinuous`, `lawfulFix'`).
  - `_chain`: chain-related constructions (e.g., `approxChain`).

- **`toUnitMono`**: converts a monotone endofunction on `Part α` into one on `Unit → Part α`, enabling use of `LawfulFix` on `Part α`.

---

#### 3. **Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Role |
|--------|------|
| `rw` / `erw` | Rewriting using equalities (especially `fix_eq_ωSup`, `map_ωSup`, continuity lemmas). |
| `apply` / `apply_assumption` | Applying lemmas or hypotheses (e.g., monotonicity, continuity). |
| `induction` | Structural induction on `ℕ` (e.g., for `approx_mono`, `approx_le_fix`). |
| `cases'` / `rcases` | Case analysis on existential or product hypotheses. |
| `simp only` / `simp` | Simplifying goals using definitional equalities and lemmas (e.g., `mem_iff`, `fix_def'`). |
| `apply le_antisymm` | Proving equality via order-theoretic antisymmetry (ubiquitous in ωCPO proofs). |
| `apply ωSup_le`, `apply le_ωSup_of_le` | Working with suprema in ωCPOs. |
| `ext` | Extensionality for functions/σ-types (e.g., proving equality of monotone maps). |
| `conv_lhs => ...` | Local rewriting in left-hand side of equations (used in `lawfulFix'`). |
| `wlog` | Without loss of generality (used in `mem_iff` proof). |
| `dsimp`, `rfl` | Definitional simplification and reflexivity. |

---

#### 4. **Proof Logic**

The logical flow across most proofs follows this pattern:

1. **Approximation Setup**  
   - Define `approx f i` and prove monotonicity (`approx_mono`, `approx_mono'`).
   - Construct `approxChain` as a chain in the ωCPO.

2. **Fixed Point = Supremum of Approximations**  
   - Prove `fix_eq_ωSup`: `Part.fix f = ωSup (approxChain f)` via `le_antisymm`.  
     - *Upper bound*: `approx f i ≤ Part.fix f` (`approx_le_fix`).  
     - *Lower bound*: `Part.fix f ≤ ωSup (approxChain f)` via `exists_fix_le_approx`.

3. **Continuity ⇒ Fixed Point Equation**  
   - Use `fix_eq_ωSup` + continuity (`hc.map_ωSup`) to show:  
     `Part.fix g = ωSup (approxChain g) = g (ωSup (approxChain g)) = g (Part.fix g)`.

4. **Lawfulness via Reduction**  
   - For `Part α`: reduce to `fix_eq_of_ωScottContinuous` using `toUnitMono`.  
   - For dependent functions (`Π a, Part (β a)`): use currying/uncurrying to lift continuity and apply `fix_eq_of_ωScottContinuous`.

5. **Dependent Case (Currying)**  
   - Prove `curry`/`uncurry` are ωScott-continuous (`ωScottContinuous_curry`, `ωScottContinuous_uncurry`).  
   - Show composition preserves continuity (`uncurry_curry_ωScottContinuous`).  
   - Use this to transfer lawfulness from the base space to the function space.

---

#### 5. **Imports & Scope**

| Import | Purpose |
|--------|---------|
| `Mathlib.Data.Stream.Init` | For `Stream'` and chain-related utilities (e.g., `approxChain`). |
| `Mathlib.Tactic.ApplyFun` | For applying functions to equalities/inequalities. |
| `Mathlib.Control.Fix` | Defines `Fix.fix` and `Fix.approx` (non-lawful fixed-point operator). |
| `Mathlib.Order.OmegaCompletePartialOrder` | Core theory of ωCPOs: `ωScottContinuous`, `ωSup`, chains, monotone maps. |

**Domain Scope**:  
- **Fixed-point theory** in domain theory (specifically ωCPOs).  
- **Dependent types** over `Part` and `Pi` types.  
- **Program semantics**: `Part α` models partial computations; `LawfulFix` ensures soundness of recursive definitions under continuity constraints.

--- 

This metadata reflects a formalization focused on *semantic correctness* of recursive definitions via domain-theoretic fixed points, with heavy use of order theory and continuity.