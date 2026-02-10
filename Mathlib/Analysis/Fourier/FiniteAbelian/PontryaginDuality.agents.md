### Technical Metadata Brief: Pontryagin Duality for Finite Abelian Groups (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `zmod` | `zmod (x : ZMod n) : AddChar (ZMod n) Circle` | Constructs the *standard character* of `ZMod n`, mapping `y ↦ exp(2πi·x·y/n)` |
| `zmodHom` | `AddChar (ZMod n) (AddChar (ZMod n) Circle)` | Bundled version of `zmod` as a group homomorphism into the dual group |
| `circleEquivComplex` | `AddChar α Circle ≃+ AddChar α ℂ` (for finite `α`) | Equivalence between circle-valued and complex-valued characters |
| `zmodAddEquiv` | `ZMod n ≃+ AddChar (ZMod n) ℂ` | Noncanonical isomorphism between `ZMod n` and its dual |
| `complexBasis` | `Basis (AddChar α ℂ) ℂ (α → ℂ)` | Shows complex characters form a basis of the function space `α → ℂ` |
| `doubleDualEmb` | `α → AddChar (AddChar α ℂ) ℂ` | Canonical embedding of `α` into its double dual |
| `doubleDualEquiv` | `α ≃+ AddChar (AddChar α ℂ) ℂ` | **Pontryagin duality isomorphism**: canonical isomorphism to double dual |
| `sum_apply_eq_ite` | `∑ ψ, ψ a = if a = 0 then |α| else 0` | Orthogonality relation: sum of characters over group |
| `exists_apply_ne_zero` | `∃ ψ, ψ a ≠ 1 ↔ a ≠ 0` | Separation of points by characters |
| `forall_apply_eq_zero` | `∀ ψ, ψ a = 1 ↔ a = 0` | Dual statement of above |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `zmod_`: Relates to characters of `ZMod n`
  - `doubleDual_`: Relates to the double dual construction
  - `circleEquivComplex`: Equivalence between circle- and complex-valued characters
  - `complexBasis`: Basis of complex characters
- **Suffixes**:
  - `_Hom`: Bundled homomorphism version (e.g., `zmodHom`)
  - `_Emb`: Embedding (e.g., `doubleDualEmb`)
  - `_Equiv`: Equivalence/isomorphism (e.g., `doubleDualEquiv`, `zmodAddEquiv`)
- **Predicates**:
  - `is_`, `mem_`, `ne_zero`, `inj`, `bijective`, `linearIndependent`, `orthogonality` (implicit via sums)

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `simp` / `simp_rw` | Simplification of character definitions, `zmod`, `map_zero`, `map_add`, etc. |
| `ext` | Extensionality for functions (e.g., proving equality of characters) |
| `rw` / `apply` | Rewriting using lemmas like `zmod_add`, `zmod_inj`, `doubleDualEmb_inj` |
| `exact` / `assumption` | Finishing goals via known hypotheses |
| `cases` | Structural cases (e.g., `cases nonempty_fintype α`) |
| `refine` / `obtain` | Constructing proofs with holes or extracting structure (e.g., `AddEquiv.ofBijective`) |
| `aesop` / `linarith` | Not heavily used here; mostly manual simplification and rewriting |
| `ring` | Implicit in simplifying expressions involving `exp`, `π`, `I`, and rational multiples |

---

#### **4. Proof Logic**

- **Structure**:
  1. **Base case (`ZMod n`)**:
     - Define `zmod` and prove injectivity (via `exp_inj` and properties of `ZMod`).
     - Construct `zmodHom` and `zmodAddEquiv`.
  2. **General finite abelian groups**:
     - Use `AddCommGroup.equiv_directSum_zmod_of_finite'` to reduce to direct sum of `ZMod`s.
     - Define `mkZModAux` for characters on direct sums.
     - Prove linear independence and cardinality equality to get `complexBasis`.
  3. **Double dual**:
     - Define `doubleDualEmb` via evaluation.
     - Prove injectivity using `exists_apply_ne_zero`.
     - Use cardinality equality to deduce bijectivity → `doubleDualEquiv`.
  4. **Orthogonality relations**:
     - Derive sum formulas via `doubleDualEmb` and basis properties.

- **Induction**: Not used directly; instead, structural decomposition via finite abelian group classification.

- **Key logical steps**:
  - `Injective + same finite cardinality ⇒ Bijective`
  - `Linear independent + correct cardinality ⇒ Basis`
  - `Evaluation map is injective ⇒ canonical embedding`
  - `Double dual embedding is bijective ⇒ Pontryagin duality`

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.DirectSum.AddChar` | Characters on direct sums of groups |
| `Mathlib.Analysis.Fourier.FiniteAbelian.Orthogonality` | Orthogonality of characters (used implicitly) |
| `Mathlib.Analysis.SpecialFunctions.Complex.Circle` | Circle group, exponential map, `exp`, `Circle` type |
| `Mathlib.GroupTheory.FiniteAbelian.Basic` | Structure theorem for finite abelian groups (`equiv_directSum_zmod_of_finite'`) |

**Domain**:  
- **Algebra**: Additive characters, dual groups, Pontryagin duality  
- **Analysis**: Complex exponentials, circle group, orthogonality  
- **Logic/Combinatorics**: Finite types, cardinality arguments, basis constructions  

**Goal**: Formalize Pontryagin duality for finite abelian groups, culminating in `doubleDualEquiv : α ≃+ AddChar (AddChar α ℂ) ℂ`.

--- 

Let me know if you'd like a dependency graph or a summary of the `TODO` items for future work.