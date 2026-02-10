Here's a structured technical brief extracted from the provided Lean 4 file:

---

### **Technical Brief: ω-Complete Partial Orders (ωCPOs) in Lean 4**

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Chain α` | `ℕ →o α` | Monotone sequences (i.e., order-preserving maps from `ℕ`) |
| `Chain.map c f` | `Chain α → (α →o β) → Chain β` | Apply an order homomorphism pointwise to a chain |
| `Chain.zip c₀ c₁` | `Chain α → Chain β → Chain (α × β)` | Pair two chains index-wise |
| `Chain.pair a b hab` | `a ≤ b → Chain α` | A 2-step chain: `a, b, b, b, ...` |
| `OmegaCompletePartialOrder α` | `class` | A partial order with `ωSup : Chain α → α`, satisfying: <br> • `∀ c i, c i ≤ ωSup c` <br> • `∀ c x, (∀ i, c i ≤ x) → ωSup c ≤ x` |
| `ωSup` | `Chain α → α` | Supremum of an ω-chain (countable increasing sequence) |
| `ωScottContinuous f` | `f : α → β → Prop` | `f` is monotone and preserves ω-suprema: `f (ωSup c) = ωSup (c.map f)` |
| `ContinuousHom α β` | `structure` | Bundled monotone functions `α →o β` that are ωScott-continuous |
| `α →𝒄 β` | Notation for `ContinuousHom α β` | Hom-objects in the category of ωCPOs and continuous maps |
| `subtype` | `(p : α → Prop) → (∀ c, (∀ i ∈ c, p i) → p (ωSup c)) → OmegaCompletePartialOrder (Subtype p)` | Induces ωCPO structure on subsets closed under ω-suprema |
| `lift` | `lift f ωSup₀ h h'` | Transfer ωCPO structure along a strictly monotone embedding |

**Key Theorems:**
- `ωSup_le_iff`: `ωSup c ≤ x ↔ ∀ i, c i ≤ x`
- `isLUB_range_ωSup`: `ωSup c` is the least upper bound of `range c`
- `ωScottContinuous_iff_map_ωSup_of_orderHom`: For `f : α →o β`, ωScott continuity ⇔ `f (ωSup c) = ωSup (c.map f)`
- `ωScottContinuous.comp`, `.id`, `.const`: Closure under composition, identity, constants
- `ωScottContinuous.iSup`, `.sSup`, `.sup`, `.top`, `.bot`: Closure under arbitrary/suprema in function spaces (when codomain is a complete lattice)

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `ωSup` / `ωScottContinuous`: Core ωCPO concepts.
  - `isLUB`, `directed`, `isChain`: Order-theoretic properties.
  - `mem_`, `range_`, `map_`, `zip_`, `pair_`: Set-theoretic operations on chains.
- **Suffixes:**
  - `_le`, `_iff`, `_of_le`, `_comp`, `_id`: Logical or structural properties.
  - `continuous'`, `Continuous'`: Deprecated aliases for `ωScottContinuous`.
- **Type constructors:**
  - `Chain`, `OmegaCompletePartialOrder`, `ContinuousHom`, `Part`, `Prod`, `Pi`, `OrderHom`, `CompleteLattice`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `aesop`: For simple monotonicity and order reasoning.
- `simp` / `simp only`: Simplification with definitional lemmas (e.g., `map_coe`, `mem_ωSup`).
- `rw`: Rewriting using `ωSup_le_iff`, `map_ωSup`, etc.
- `exact`, `assumption`, `intro`, `cases'`: Basic proof structure.
- `convert`: For equational reasoning with partial matches.
- `ext`: Extensionality for functions/relations.
- `congr_fun`, `congr_arg`: For functional extensionality and congruence.
- `le_antisymm`, `le_trans`, `le_of_le_of_le`: Order reasoning.
- `split_ifs`: Handling `if ... then ... else ...` cases.
- `Classical.choose`, `Classical.choose_spec`: For noncomputable definitions (e.g., `Part.ωSup`).

---

#### **4. Proof Logic & Strategy**

- **Inductive/constructive reasoning on chains**: Proofs often proceed by:
  - Unfolding definitions (`map_coe`, `ωSup`, `mem_ωSup`).
  - Using `ωSup_le_iff` to reduce to pointwise bounds.
  - Applying monotonicity and chain properties (`isChain_range`, `directed`).
- **Noncomputable definitions**: For `Part`, `ωSup` is defined via classical choice (`Classical.choose`).
- **Bundling/unbundling**: Switching between `ωScottContinuous f : Prop` and `⟨f, hf⟩ : α →o β` (via `OrderHom`).
- **Lifting structures**: Using `lift` or `subtype` to transfer ωCPOs along embeddings or subtypes.
- **Equational reasoning**: Many lemmas (e.g., `ωSup_zip`, `ωSup_eq_of_isLUB`) use `eq_of_forall_ge_iff` to prove equality via universal bounds.

---

#### **5. Imports & Dependencies**

**Core imports:**
- `Mathlib.Control.Monad.Basic`: For `Part` monad operations.
- `Mathlib.Dynamics.FixedPoints.Basic`: Related to fixed-point semantics (used in semantics of recursion).
- `Mathlib.Order.*`: Extensive order theory:
  - `Chain`, `Order.Hom.Order`, `Order.Iterate`, `Order.Part`, `Order.ScottContinuity`.

**Key dependencies:**
- `Preorder`, `PartialOrder`, `Directed`, `IsChain`, `ScottContinuous`, `OrderHom`, `Part`, `Subtype`, `Pi`, `Prod`.
- `CompleteLattice` (for lifting ωCPOs from complete lattices).
- `Classical` (for noncomputable definitions like `Part.ωSup`).

---

#### **6. Notable Instances & Examples**

| Type | Instance | Notes |
|------|----------|-------|
| `Part α` | `OmegaCompletePartialOrder` | Noncomputable `ωSup` via choice |
| `α × β` | `OmegaCompletePartialOrder` | Pointwise ω-suprema |
| `∀ a, β a` | `OmegaCompletePartialOrder` | Pointwise ω-suprema (pi types) |
| `α →o β` | `OmegaCompletePartialOrder` | Pointwise ω-suprema over monotone functions |
| `α →𝒄 β` | `OmegaCompletePartialOrder` | Continuous functions inherit ωCPO structure |
| `CompleteLattice α` | `OmegaCompletePartialOrder` | ω-suprema as special case of arbitrary suprema |

---

#### **7. Deprecations & Migration Notes**

- `Continuous`, `Continuous'` → replaced by `ωScottContinuous`.
- `continuous_*`, `Continuous'_*` → use `ωScottContinuous.*`.
- `continuous'_coe` → use `ωScottContinuous_iff_map_ωSup_of_orderHom`.
- `flip₁_continuous'`, `flip₂_continuous'` → use `ωScottContinuous.apply₂`, `ωScottContinuous.of_apply₂`.

---

This brief captures the formal structure, conventions, and proof patterns of the ωCPO library in Lean 4, suitable for domain-specific AI agent training or formal verification tooling.