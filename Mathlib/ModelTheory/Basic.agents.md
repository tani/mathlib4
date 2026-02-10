### Technical Metadata Brief: `Mathlib.ModelTheory.FirstOrder.Basic`

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Language` | `Type u → Type v → Type (max u v)` | Encodes a first-order language as two families over `ℕ`: `Functions : ℕ → Type u`, `Relations : ℕ → Type v`. |
| `Structure` | `Language → Type w → Prop` | Interprets symbols of a language in a type `M`: `funMap : L.Functions n → (Fin n → M) → M`, `RelMap : L.Relations n → (Fin n → M) → Prop`. |
| `Hom` | `M →[L] N` | A homomorphism: underlying function `M → N` commuting with `funMap`, preserving relations *forward*. |
| `Embedding` | `M ↪[L] N` | An embedding: injective function commuting with `funMap`, preserving relations *bi-directionally*. |
| `Equiv` | `M ≃[L] N` | An isomorphism: equivalence commuting with `funMap`, preserving relations *bi-directionally*. |
| `IsRelational` | `Language → Prop` | Language has no function symbols: `∀ n, IsEmpty (L.Functions n)`. |
| `IsAlgebraic` | `Language → Prop` | Language has no relation symbols: `∀ n, IsEmpty (L.Relations n)`. |
| `card` | `Language → Cardinal` | Cardinality of the type of symbols: `#(Σ l, L.Functions l ⊕ Σ l, L.Relations l)`. |
| `constantMap` | `L.Constants → M` | Interpretation of a 0-ary function symbol (constant) in a structure. |
| `HomClass`, `StrongHomClass` | `Language → Type* → Type* → Prop` | Typeclasses abstracting homomorphism-like maps: `StrongHomClass` requires bi-directional relation preservation. |
| `emptyStructure` | `Language.empty.Structure M` | Unique structure on any type over the empty language. |
| `sumStructure` | `(L₁.sum L₂).Structure S` | Combines structures over two languages into one over their sum. |

**Key Theorems:**
- `card_eq_card_functions_add_card_relations`: `#Symbols = Σₗ #Functionsₗ + Σₗ #Relationsₗ`.
- `empty.nonempty_embedding_iff`: `Nonempty (M ↪[∅] N) ↔ #M ≤ #N`.
- `empty.nonempty_equiv_iff`: `Nonempty (M ≃[∅] N) ↔ #M = #N`.
- `HomClass.map_constants`: Homomorphisms fix constants.
- `ofInjective [L.IsAlgebraic]`: In algebraic languages, injective homomorphisms are embeddings.

---

#### **2. Naming Conventions**

- **Prefixes:**
  - `is_`: Properties (`IsRelational`, `IsAlgebraic`).
  - `map_`: Action on symbols (`map_fun`, `map_rel`, `map_constants`).
  - `coe_`: Coercion-related (`coe_toHom`, `coe_injective`).
  - `empty_`: For the empty language (`emptyStructure`, `emptyHom`).
  - `sum_`: For sum constructions (`sumStructure`, `funMap_sum_inl`, `relMap_sum_inr`).

- **Suffixes:**
  - `_apply`: Application of maps (`id_apply`, `comp_apply`, `refl_apply`).
  - `_toHom`, `_toEmbedding`, `_toEquiv`: Conversion to standard morphism types.
  - `_inj`, `_inj'`: Injectivity properties (`toHom_injective`, `injective`).
  - `_comp`: Composition lemmas (`comp_assoc`, `comp_id`, `comp_symm`).

- **Notation:**
  - `→[L]`, `↪[L]`, `≃[L]`: Hom, embedding, equivalence notation (scoped `FirstOrder`).

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:
- `simp`: Simplification of `funMap`, `RelMap`, coercions, and structure definitions.
- `rfl`: Reflexivity for definitional equalities (e.g., `map_fun'` proofs).
- `intros`: Introducting variables and hypotheses.
- `congr`: Congruence for function extensionality.
- `funext`: Function extensionality.
- `ext`: Extensionality for structures/morphisms (via `DFunLike.ext`, `coe_injective`).
- `rw`: Rewriting using lemmas like `map_fun`, `comp_apply`, `symm_apply_apply`.
- `exact`, `trivial`: For trivial proofs (e.g., `map_fun'` fields).
- `cases`: Case analysis on sums, sigmas, or structure fields.
- `convert`: For flexible equality proofs (e.g., `comp_right_injective`).
- `aesop` (commented out): Planned for future automation.

---

#### **4. Proof Logic**

- **Structure Proofs**: Typically involve `ext` + `funext` to reduce to pointwise equalities.
- **Homomorphism Proofs**: Use `HomClass.map_fun`, `HomClass.map_rel`, and `map_constants`.
- **Embedding/Equiv Proofs**: Leverage `StrongHomClass`, `EmbeddingLike`, `EquivLike`, and injectivity/surjectivity lemmas.
- **Induction/Case Analysis**: Rare; mostly definitional reasoning.
- **Cardinal Arguments**: Use `Cardinal.lift_mk_le'`, `lift_mk_eq'`, and properties of `#Σ`, `#⊕`.
- **Uniqueness Proofs**: Use `Unique.mk` + `ext` + `Empty.elim` (e.g., `emptyStructure` uniqueness).
- **Sum Constructions**: Use `Sum.elim` to define maps on `L₁.sum L₂`.

---

#### **5. Imports**

- `Mathlib.Data.Fin.VecNotation`: For `Fin n → M` notation (tuples).
- `Mathlib.SetTheory.Cardinal.Basic`: For cardinal arithmetic (`#`, `lift`, `sum`, `mul`, `le`, `eq`).

**Scope**: This module defines the *syntax-free* foundations of first-order model theory in Lean: languages, structures, and morphisms. It is foundational for the Flypitch project (forcing, independence of CH), and serves as the base for richer model-theoretic developments (e.g., theories, types, saturated models).

--- 

Let me know if you'd like a dependency graph or a summary of how this module fits into the broader `ModelTheory` hierarchy.