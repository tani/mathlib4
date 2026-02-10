Here's a structured technical metadata summary of the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `Lifts F E K` | **Structure**: A pair `(carrier, emb)` where `carrier` is an intermediate field `F ≤ carrier ≤ E`, and `emb : carrier →ₐ[F] K` is an `F`-algebra homomorphism. Models *extensions of embeddings* from intermediate fields into `K`. |
| `Lifts.PartialOrder` | Defines `≤` on `Lifts`: `L₁ ≤ L₂` iff `L₁.carrier ≤ L₂.carrier` and `L₂.emb` extends `L₁.emb`. |
| `Lifts.IsExtendible σ` | **Predicate**: `σ` is *extendible* if for every finite `S ⊆ E`, there exists `τ ≥ σ` with `S ⊆ τ.carrier`. Captures the idea that `σ` can be extended to include any finite set. |
| `Lifts.union c hc` | **Definition**: Union of a chain `c` of lifts, using `iSup` on carriers and compatible algebra homs. Provides upper bounds for chains. |
| `Lifts.exists_lift_of_splits'` | **Theorem**: Given `x : Lifts F E K`, and `s ∈ E` integral over `x.carrier` whose minimal polynomial splits under `x.emb`, there exists `y ≥ x` with `s ∈ y.carrier`. Core lifting step. |
| `Lifts.exists_algHom_adjoin_of_splits'` | **Theorem**: If `f : L →ₐ[F] K` and all `s ∈ S` are integral over `L` with `minpoly L s` splitting under `f`, then `f` extends to `adjoin L S →ₐ[F] K`. |
| `Lifts.exists_algHom_of_adjoin_splits'` | **Main theorem**: If `adjoin L S = ⊤` (i.e., `E = L(S)`) and all `s ∈ S` are integral over `L` with `minpoly L s` splitting under `f`, then `f` extends to an `F`-algebra embedding `E →ₐ[F] K`. |
| `Algebra.IsAlgebraic.range_eval_eq_rootSet_minpoly_of_splits` | **Theorem**: For algebraic `K/F`, and `L` where all `minpoly F x` split, the set `{ψ(x) | ψ : K →ₐ[F] L}` equals the root set of `minpoly F x` in `L`. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `is_`: Predicate definitions (`IsExtendible`)
  - `exists_`: Existence theorems (`exists_lift_of_splits'`, `exists_algHom_of_adjoin_splits'`)
  - `nonempty_`: Nonemptiness of hom-sets (`nonempty_algHom_of_adjoin_splits`)
  - `lifts_`: Related to `Lifts` structure (`lifts.le_iff`, `lifts.union`)
- **Suffixes**:
  - `'` (prime): Variant of a theorem, often slightly more general or technical (`exists_lift_of_splits'` vs `exists_lift_of_splits`)
  - `'_of_`: Specifies conditions or context (`of_splits`, `of_adjoin_splits`, `of_aeval`)
- **Other**:
  - `adjoin`: Used for constructions involving adjunction of sets (`adjoin_le_iff`, `adjoin_simple_le_iff`)
  - `algHom`: For algebra homs (`AlgHom`, `AlgEquiv`, `aeval`, `rootOfSplits`)

---

### **3. Tactic Stack**

Frequent tactics used in proofs:
- `rw`, `simp_rw`, `simp`: Rewriting and simplification (especially with `AlgHom.ext`, `subset_adjoin`, `adjoin_le_iff`)
- `exact`, `refine`, `choose`: Constructing witnesses and applying existential hypotheses
- `cases`, `rcases`, `obtain`: Destructuring hypotheses/structures
- `wlog`: Without loss of generality (used in chain arguments)
- `aesop`: Automated reasoning (likely for routine algebraic goals)
- `ring`: For commutative ring identities (e.g., in `aeval` computations)
- `zorn_le₀`, `zorn_le_nonempty_Ici₀`: Zorn’s Lemma variants for lifting chains
- `convert`: To match goals up to definitional equality (e.g., in `minpoly` splitting arguments)

---

### **4. Proof Logic**

- **Inductive/Recursive Lifting**: Proofs proceed by constructing chains of lifts and applying Zorn’s Lemma to get a maximal extendible lift.
- **Chain Argument**: 
  - Define `union` of a chain of lifts.
  - Show `union` is an upper bound (`le_union`).
  - Prove `union` is extendible if all elements of the chain are (`union_isExtendible`).
- **Key Logical Flow**:
  1. Start with a base lift `⟨L, f⟩`.
  2. Use Zorn to get a maximal extendible lift `ϕ`.
  3. If `ϕ.carrier ≠ ⊤`, pick `α ∉ ϕ.carrier`, consider `ϕ.carrier⟮α⟯`.
  4. Use `exists_lift_of_splits'` to extend `ϕ` to include `α`, contradicting maximality.
- **Splitting ⇒ Extendability**: The core engine is `exists_lift_of_splits'`, which uses `rootOfSplits` to construct extensions when minimal polynomials split.

---

### **5. Imports**

- `Mathlib.Data.Fintype.Order`: For finite type order theory (used in chain arguments, e.g., `finiteDimensional_adjoin`).
- `Mathlib.FieldTheory.Adjoin`: Core definitions of `adjoin`, `IntermediateField`, `minpoly`, `aeval`, `algHomAdjoinIntegralEquiv`.

---

### **Domain Summary**

This file formalizes a classical result in field theory: **extension of embeddings under splitting of minimal polynomials**, following Isaacs (1980). It is foundational for Galois theory (e.g., embedding extension, normality criteria). The formalization emphasizes:
- Constructive lifting via Zorn’s Lemma,
- Control over domains via `IntermediateField`,
- Integration of algebraic structure (`isIntegral`, `minpoly`, `Splits`) with homomorphism extension.

Let me know if you'd like a diagram of the main theorem or a proof sketch in natural language.