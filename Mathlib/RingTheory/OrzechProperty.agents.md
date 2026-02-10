### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `OrzechProperty R` | `class Prop` | Defines that for any finitely generated `R`-module `M`, any surjective endomorphism from a submodule of `M` to `M` is injective. |
| `injective_of_surjective_of_submodule'` | `∀ {M} [AddCommMonoid M] [Module R M] [Module.Finite R M] {N : Submodule R M} (f : N →ₗ[R] M), Surjective f → Injective f` | Core axiom of the Orzech property: surjective maps from submodules are injective. |
| `injective_of_surjective_of_injective` | `{N : Type w} [AddCommMonoid N] [Module R N] → (i f : N →ₗ[R] M) → Injective i → Surjective f → Injective f` | Generalizes the property to arbitrary domain `N` via embedding `i`. |
| `injective_of_surjective_of_submodule` | `{N : Submodule R M} → (f : N →ₗ[R] M) → Surjective f → Injective f` | Direct corollary of the main axiom, applied to submodule inclusions. |
| `injective_of_surjective_endomorphism` | `(f : M →ₗ[R] M) → Surjective f → Injective f` | Special case where domain = codomain = `M`. |
| `bijective_of_surjective_endomorphism` | `(f : M →ₗ[R] M) → Surjective f → Bijective f` | Combines injectivity and surjectivity for endomorphisms. |

#### 2. **Naming Conventions**

- **Prefixes**:
  - `injective_of_surjective_of_...`: Indicates the logical implication being formalized — surjectivity implies injectivity under certain conditions.
  - `submodule`, `injective`, `endomorphism`: Describes the structural context (domain/codomain type).
- **Suffixes**:
  - `'` (prime): Used for the foundational class axiom (`injective_of_surjective_of_submodule'`), distinguishing it from derived theorems.
- **Structure**:
  - `X_of_Y_of_Z`: Standard Lean pattern for implications with multiple hypotheses.

#### 3. **Tactic Stack**

Frequently used tactics in proofs:
- `obtain ⟨n, g, hg⟩ := ...`: To extract existential data (e.g., finite generation witness).
- `haveI := ...`: To introduce instances (e.g., `small_of_surjective`, `Equiv.addCommMonoid`, `Equiv.module`).
- `letI := ...`: To define new instances via equivalence transport.
- `replace hi / hf : ... := by simpa [...] using ...`: To refine hypotheses using simplification and existing lemmas.
- `simpa [...] using ...`: To discharge goals using simplification with given lemmas.
- `equivShrink`, `linearEquiv`, `Equiv.linearEquiv`: Leveraging equivalence-based transport for universe polymorphism.

#### 4. **Proof Logic**

- **High-level strategy**:
  - Reduce the general case (arbitrary `N`) to the submodule case via embedding `i : N ↪ M`.
  - Use finite generation to shrink `M` to a `Shrink.{u} M` (a type in universe `u`), enabling use of the class axiom.
  - Transport structures along equivalences (`equivShrink`, `linearEquiv`) to work in a universe-consistent setting.
  - Apply the core axiom (`injective_of_surjective_of_submodule'`) to the transformed map `f'`.
  - Pull back injectivity through equivalences and compositions.

- **Typical flow**:
  1. Use finite generation to get a surjection from `Fin n → M`.
  2. Transport module structure to `Shrink M`.
  3. Define transformed maps `i'`, `f'` on `Shrink M`.
  4. Apply class axiom to `f'`.
  5. Conclude injectivity of original `f` via equivalence properties.

#### 5. **Imports**

- `Mathlib.Algebra.Equiv.TransferInstance`: For transferring algebraic structures along equivalences (e.g., `Equiv.addCommMonoid`, `Equiv.module`).
- `Mathlib.RingTheory.Finiteness.Cardinality`: Provides tools for finite generation, notably `Module.Finite.exists_fin'` and `small_of_surjective`.

These imports indicate the module focuses on **finite generation**, **module transport**, and **cardinality arguments** in ring/module theory.

--- 

This metadata is suitable for building a domain-specific AI agent capable of reasoning about module-theoretic properties, especially in the context of the Orzech property, IBN, and rank conditions.