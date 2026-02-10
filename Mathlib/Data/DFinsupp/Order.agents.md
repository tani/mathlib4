### Technical Brief: Pointwise Order on Finitely Supported Dependent Functions (`DFinsupp`)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `LE (Π₀ i, α i)` | Pointwise order: `f ≤ g ↔ ∀ i, f i ≤ g i` |
| `Preorder (Π₀ i, α i)` | Lifts pointwise preorder structure; `le_refl`, `le_trans` via pointwise reasoning |
| `PartialOrder (Π₀ i, α i)` | Lifts antisymmetry: `f = g` if `f ≤ g` and `g ≤ f` pointwise |
| `SemilatticeInf (Π₀ i, α i)` | `inf := zipWith (· ⊓ ·)`; pointwise meet |
| `SemilatticeSup (Π₀ i, α i)` | `sup := zipWith (· ⊔ ·)`; pointwise join |
| `Lattice (Π₀ i, α i)` | Combines `SemilatticeInf` and `SemilatticeSup` |
| `orderEmbeddingToFun` | Order embedding `(Π₀ i, α i) ↪o ∀ i, α i`, embedding into full function space |
| `coe_le_coe`, `coe_lt_coe` | Coercion lemmas: `⇑f ≤ g ↔ f ≤ g`, `⇑f < g ↔ f < g` |
| `support_inf_union_support_sup`, `support_sup_union_support_inf` | Support identities for `inf`/`sup` in lattices |
| `single_le_iff` | Characterization of order on singletons: `single i a ≤ f ↔ a ≤ f i` |
| `support_monotone`, `support_mono` | Monotonicity of support w.r.t. pointwise order |
| `tsub` (truncated subtraction) | `zipWith (· - n)`; truncated subtraction on canonically ordered structures |
| `OrderedAddCommMonoid`, `OrderedCancelAddCommMonoid`, `AddLeftReflectLE` | Lifted algebraic-order compatibility via pointwise proofs |
| `PosSMulMono`, `SMulPosMono`, etc. | Scalar multiplication monotonicity/reflectivity lifted via `lift` lemmas |
| `CanonicallyOrderedAddCommMonoid (Π₀ i, α i)` | Lifted canonical order: `bot := 0`, `bot_le`, `exists_add_of_le`, etc. |
| `support_inf`, `support_sup`, `disjoint_iff` | Support behavior under `inf`, `sup`, and disjointness in linearly ordered case |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `coe_`: Relates coercion `⇑f` (to function space) to order/algebraic ops.
  - `support_`: Pertains to support of `DFinsupp`.
  - `single_`: Pertains to `single i a`, the function with support `{i}`.
  - `orderEmbeddingToFun`: Standard naming for order embeddings into function spaces.
  - `inst_`, `instance`: Implicit naming for typeclass instances.

- **Suffixes**:
  - `_def`: Rare; `le_def` is an exception (definition of `≤`).
  - `_apply`: For application at index `i`, e.g., `inf_apply`, `sup_apply`, `tsub_apply`.
  - `_mono`, `_strictMono`: For monotonicity/strict monotonicity of maps.
  - `_reflect`: For reflection properties (e.g., `AddLeftReflectLE`, `PosSMulReflectLE`).
  - `_tsub`: Truncated subtraction (to distinguish from group subtraction).

- **Pattern**: `op_apply`, `op_le_coe`, `support_op`, `coe_op` for operations `op`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `ext` | Extensionality for functions/`DFinsupp`s (via `DFunLike.ext_iff`). |
| `simp` | Simplification using `coe_*`, `support_*`, `single_*`, `le_def`, `inf_apply`, etc. |
| `rw` | Rewriting with lemmas like `le_iff`, `single_le_iff`, `support_inf`, etc. |
| `exact` / `assumption` | For straightforward goals after simplification. |
| `cases` / `if H : ... then ... else ...` | Case analysis on membership in support or decidability. |
| `aesop` | Not explicitly used here, but `simp` + `rw` + `exact` suffices. |
| `ring`, `linarith` | Not used — order reasoning is mostly pointwise and logical. |
| `decide` / `decidable_of_iff` | For decidability instances (`decidableLE`). |

---

#### **4. Proof Logic**

- **General Strategy**:
  - **Pointwise reasoning**: Most proofs reduce to proving properties at each index `i`, using `ext`, `le_def`, `apply`, and `simp`.
  - **Lifting via `zipWith`**: Algebraic operations (`inf`, `sup`, `tsub`) are defined via `zipWith`, and their properties follow from componentwise properties.
  - **Support analysis**: Many lemmas about support (e.g., `support_inf`, `support_mono`) use `mem_support_iff`, `pos_iff_ne_zero`, and decidability assumptions.
  - **Induction not needed**: Since `DFinsupp` is defined as a dependent function with finite support, proofs rarely require induction — instead, they rely on extensionality and finite support reasoning.

- **Typical Proof Flow**:
  1. Introduce `i : ι`.
  2. Reduce goal to `f i ≤ g i` or similar via `le_def`.
  3. Apply hypothesis at `i`.
  4. Use `simp` with `coe_*`, `apply`, `support_*`, `single_*` lemmas.

---

#### **5. Imports & Scope**

- **Core Imports**:
  ```lean
  import Mathlib.Algebra.Order.Module.Defs
  import Mathlib.Data.DFinsupp.Module
  ```

- **Scope**:
  - **Order theory**: `LE`, `Preorder`, `PartialOrder`, `Lattice`, `SemilatticeInf`, `SemilatticeSup`.
  - **Ordered algebra**: `OrderedAddCommMonoid`, `OrderedCancelAddCommMonoid`, `CanonicallyOrderedAddCommMonoid`, `OrderedSub`.
  - **Module theory**: Scalar multiplication monotonicity/reflectivity (`PosSMulMono`, `SMulPosStrictMono`, etc.).
  - **Finite support**: Relies on `DFinsupp` (finitely supported dependent functions), with `support`, `single`, `zipWith`.

- **Key Dependencies**:
  - `DFinsupp` type and basic operations (`coe`, `support`, `single`, `zipWith`).
  - `Pi` types and their order/algebraic structures.
  - `AddCommMonoid`, `Module`, `Preorder`, `PartialOrder`, `Lattice`, `OrderedAddCommMonoid`, etc.

---

### Summary

This file formalizes the **pointwise lifting of order and algebraic structures** to the space of finitely supported dependent functions (`Π₀ i, α i`). It establishes that many order- and module-theoretic properties (preorders, lattices, ordered monoids, scalar multiplication monotonicity, canonical order) lift componentwise. The proofs are largely **pointwise**, leveraging `ext`, `simp`, and support reasoning, with careful attention to finite support and decidability where needed. The `orderEmbeddingToFun` embedding is central to relating `DFinsupp` to the full function space.