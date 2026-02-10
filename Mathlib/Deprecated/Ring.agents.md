### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsSemiringHom` | `structure (f : α → β) : Prop` | Predicate for unbundled semiring homomorphisms (deprecated). Requires preservation of `0`, `1`, `+`, `*`. |
| `IsRingHom` | `structure (f : α → β) : Prop` | Predicate for unbundled ring homomorphisms (deprecated). Requires preservation of `1`, `*`, `+`. Note: `map_zero` is *derivable*, not assumed. |
| `IsSemiringHom.id` | `IsSemiringHom (@id α)` | Identity map is a semiring homomorphism. |
| `IsSemiringHom.comp` | `IsSemiringHom f → IsSemiringHom g → IsSemiringHom (g ∘ f)` | Composition of semiring homomorphisms is a semiring homomorphism. |
| `IsSemiringHom.to_isAddMonoidHom` | `IsSemiringHom f → IsAddMonoidHom f` | Forgets multiplicative structure; yields additive monoid homomorphism. |
| `IsSemiringHom.to_isMonoidHom` | `IsSemiringHom f → IsMonoidHom f` | Forgets additive structure; yields monoid homomorphism. |
| `IsRingHom.of_semiring` | `IsSemiringHom f → IsRingHom f` | Every semiring homomorphism between rings is a ring homomorphism. |
| `IsRingHom.map_zero` | `IsRingHom f → f 0 = 0` | Derives preservation of `0` from other axioms (since rings may lack `0`-preservation as an axiom). |
| `IsRingHom.map_neg` | `IsRingHom f → f (-x) = -f x` | Derives preservation of additive inverses. |
| `IsRingHom.map_sub` | `IsRingHom f → f (x - y) = f x - f y` | Derives preservation of subtraction. |
| `IsRingHom.id` | `IsRingHom (@id α)` | Identity is a ring homomorphism. |
| `IsRingHom.comp` | `IsRingHom f → IsRingHom g → IsRingHom (g ∘ f)` | Composition of ring homomorphisms is a ring homomorphism. |
| `IsRingHom.to_isSemiringHom` | `IsRingHom f → IsSemiringHom f` | Every ring homomorphism is a semiring homomorphism (adds `map_zero`). |
| `IsRingHom.to_isAddGroupHom` | `IsRingHom f → IsAddGroupHom f` | Ring homomorphisms are additive group homomorphisms. |
| `RingHom.of` | `IsSemiringHom f → α →+* β` | Bundles an unbundled semiring homomorphism into a `RingHom`. |
| `RingHom.coe_of` | `⇑(of hf) = f` | The underlying function of the bundled homomorphism equals `f`. |
| `RingHom.to_isSemiringHom` | `α →+* β → IsSemiringHom f` | Unbundling a `RingHom` yields a semiring homomorphism predicate. |
| `RingHom.to_isRingHom` | `α →+* γ → IsRingHom f` | Unbundling a `RingHom` between rings yields a ring homomorphism predicate. |

---

#### 2. **Naming Conventions**

- **Predicate structures**: `IsSemiringHom`, `IsRingHom` — standard Lean pattern for *unbundled* homomorphism predicates.
- **Theorems**:
  - `id`, `comp`: Standard categorical properties.
  - `to_*`: Conversion *from* predicate to bundled homomorphism components (`to_isAddMonoidHom`, `to_isMonoidHom`, `to_isSemiringHom`, `to_isAddGroupHom`).
  - `of_*`: Conversion *to* predicate or bundled form (`of_semiring`, `of`).
  - `map_*`: Preservation properties (`map_zero`, `map_one`, `map_add`, `map_mul`, `map_neg`, `map_sub`).
- **Prefixes**:
  - `map_`: Indicates preservation of an operation.
  - `to_`: Indicates a forgetful or conversion morphism.
  - `of_`: Indicates construction *from* a predicate or structure.

---

#### 3. **Tactic Stack**

- **Core tactics**:
  - `rfl`: Reflexivity for definitional equalities.
  - `simp` / `simp only [...]`: Simplification using lemmas (especially `map_*` hypotheses).
  - `rw`: Rewriting using equalities (e.g., `hf.map_add`).
  - `calc`: Chain of equalities (used in `map_zero`, `map_neg`, `map_sub`).
  - `constructor`: For introducing structure proofs (e.g., `IsSemiringHom`).
  - `intros`: Intro all variables/assumptions.
  - `simpa [h] using h'`: Simplify using `h` and apply `h'`.
  - `fun {x y} => ...`: Anonymous lambda with implicit arguments.

- **Notable absence**: No heavy automation (e.g., `linarith`, `ring`, `abel`) — proofs are mostly direct and rely on `simp` + rewriting.

---

#### 4. **Proof Logic**

- **Structure proofs**: Use `constructor` to introduce each field (`map_zero`, `map_one`, etc.).
- **Inductive/derivation style**:
  - For `IsRingHom`, `map_zero` is *not* an axiom but *derived* via `map_add` and cancellation.
  - Similarly, `map_neg` and `map_sub` are derived from `map_add` and `map_zero`.
- **Composition proofs**: Use `simp` with `Function.comp_apply` and the corresponding `map_*` lemmas for `f` and `g`.
- **Conversion lemmas**:
  - `of` constructs a `RingHom` by combining `MonoidHom.of` and `AddMonoidHom.of`.
  - `to_*` lemmas repackage the same function with fewer properties (e.g., `to_isSemiringHom` adds `map_zero` to a `RingHom`).

---

#### 5. **Imports**

- **Primary dependency**: `Mathlib.Deprecated.Group`
  - Provides deprecated unbundled homomorphism predicates like `IsAddMonoidHom`, `IsMonoidHom`, `IsAddGroupHom`, etc., which are used in `to_*` conversions.
- **Implicit imports** (via `Mathlib` hierarchy):
  - `Algebra.Ring.Basic`, `Algebra.Hom.Ring` (for `RingHom`, `→+*`, bundled morphisms).
  - `Data.Function.Basic` (for `id`, `Function.comp`).
  - `Algebra.Semiring.Basic`, `Algebra.Ring.Basic` (for `[Semiring α]`, `[Ring β]` instances).

> **Note**: This file is explicitly **deprecated**. The recommended modern approach is to use `RingHom` (`α →+* β`) from `Algebra.Hom.Ring`. This file exists only for backward compatibility and legacy code.

--- 

Let me know if you'd like a migration guide from `IsSemiringHom`/`IsRingHom` to `RingHom`.