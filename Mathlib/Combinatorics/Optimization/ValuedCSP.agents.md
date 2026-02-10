### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `ValuedCSP` | `OrderedAddCommMonoid C ⇒ Type* → Type* → ValuedCSP D C` | Represents a *VCSP template*: a set of cost functions of arbitrary arity over domain `D` with values in ordered additive commutative monoid `C`. |
| `ValuedCSP.Term` | `Γ.Term ι` | A *term* in a VCSP instance: arity `n`, cost function `f : Fin n → D → C`, proof `inΓ : ⟨n, f⟩ ∈ Γ`, and variable assignment `app : Fin n → ι`. |
| `ValuedCSP.Term.evalSolution` | `t.evalSolution x = t.f (x ∘ t.app)` | Evaluates a term under a solution `x : ι → D`. |
| `ValuedCSP.Instance` | `Γ.Instance ι = Multiset (Γ.Term ι)` | An *instance* is a multiset of terms (i.e., a sum of cost functions over variables). |
| `ValuedCSP.Instance.evalSolution` | `I.evalSolution x = (I.map (·.evalSolution x)).sum` | Evaluates an instance by summing evaluations of all terms. |
| `ValuedCSP.Instance.IsOptimumSolution` | `I.IsOptimumSolution x = ∀ y, I.evalSolution x ≤ I.evalSolution y` | States that `x` is a *minimum* of instance `I`. |
| `Function.HasMaxCutPropertyAt` | `f.HasMaxCutPropertyAt a b` | Encodes that `f : (Fin 2 → D) → C` achieves its minimum *only* at the two assignments swapping `a` and `b`. |
| `Function.HasMaxCutProperty` | `f.HasMaxCutProperty` | `f` has Max-Cut property at *some* pair of distinct labels. |
| `FractionalOperation` | `FractionalOperation D m = Multiset ((Fin m → D) → D)` | A finite multiset of `m`-ary operations on `D`. |
| `FractionalOperation.IsValid` | `ω.IsValid ↔ ω ≠ ∅` | Non-emptiness of the fractional operation. |
| `FractionalOperation.tt` | `ω.tt x : Multiset (ι → D)` | Applies each operation in `ω` to a transposed table `x : Fin m → ι → D`. |
| `Function.AdmitsFractional` | `f.AdmitsFractional ω` | `ω` *improves* `f` in the sense of a subadditivity inequality involving `•` (scalar multiplication) and sums. |
| `FractionalOperation.IsFractionalPolymorphismFor` | `ω.IsFractionalPolymorphismFor Γ` | `ω` is a fractional polymorphism for all cost functions in template `Γ`. |
| `FractionalOperation.IsSymmetric` | `ω.IsSymmetric` | `ω` is symmetric: all operations in `ω` are symmetric w.r.t. permutations of inputs. |
| `FractionalOperation.IsSymmetricFractionalPolymorphismFor` | `ω.IsSymmetricFractionalPolymorphismFor Γ` | `ω` is both a fractional polymorphism and symmetric for `Γ`. |
| `Function.HasMaxCutPropertyAt.rows_lt_aux` | Lemma | Shows that under Max-Cut property and symmetry, any output of `ω.tt ![![a,b], ![b,a]]` yields strictly higher cost than `f ![a,b]`. |
| `Function.HasMaxCutProperty.forbids_commutativeFractionalPolymorphism` | Theorem | If `f` has Max-Cut property, then no *nonempty symmetric* fractional operation can admit `f`. |

---

#### 2. **Naming Conventions**

- **Prefixes**:
  - `is_`: e.g., `IsOptimumSolution`, `IsValid`, `IsSymmetric`, `IsFractionalPolymorphismFor`, `IsSymmetricFractionalPolymorphismFor`.
  - `has_`: e.g., `HasMaxCutProperty`, `HasMaxCutPropertyAt`.
  - `admits_`: e.g., `AdmitsFractional`.
- **Suffixes**:
  - `_For`: indicates relation to a template `Γ`, e.g., `IsFractionalPolymorphismFor`.
  - `_At`: indicates dependence on specific arguments, e.g., `HasMaxCutPropertyAt`.
- **Structure/Type Names**:
  - `Term`, `Instance`, `FractionalOperation`: standard mathematical naming.
- **Function Names**:
  - `evalSolution`: evaluation of solution.
  - `tt`: short for “transpose transpose” (applies operations to transposed input).
  - `size`, `card`: refer to multiset cardinality.

---

#### 3. **Tactic Stack**

Frequent tactics used in proofs:
- `rw`: rewriting using equalities/definitions.
- `simp`: simplification, especially with `@[simp]` lemmas like `FractionalOperation.size`.
- `apply`, `exact`, `convert`: for applying lemmas and constructing proofs.
- `obtain ⟨a, b, hab, mcfab⟩ := mcf`: destructuring existential/and proofs.
- `multiset`-specific lemmas: `Multiset.mem_map`, `Multiset.map_map`, `Multiset.sum_lt_sum`.
- `nsmul_left_comm`, `two_nsmul`, `add_lt_add`: ordered additive monoid arithmetic.
- `convert ... using 2`: for controlled unification with extra hypotheses.
- `simp only [...]`: precise simplification with `Matrix.const_fin1_eq`, `List.ofFn_inj`, etc.

---

#### 4. **Proof Logic**

- **Inductive/Case Analysis**: Often on structure of terms or multiset membership.
- **Contrapositive Reasoning**: e.g., `forbids_commutativeFractionalPolymorphism` assumes existence and derives contradiction.
- **Inequality Chaining**: Uses `lt_of_le_of_ne`, `add_lt_add`, `nsmul_left_comm`, and arithmetic in `OrderedCancelAddCommMonoid`.
- **Symmetry Exploitation**: Leverages `IsSymmetric` to equate outputs on permuted inputs.
- **Multiset Reasoning**: Heavy use of `map`, `sum`, `mem_map`, and cardinality (`card`, `size`).
- **Matrix/Fin Notation**: Uses `![a, b]` for `Fin 2 → D`, and `Function.swap` for transposition.

---

#### 5. **Imports**

| Import | Purpose |
|--------|---------|
| `Mathlib.Algebra.BigOperators.Fin` | Summation over `Fin n`, especially `Fin.sum_univ_two`. |
| `Mathlib.Algebra.Order.BigOperators.Group.Multiset` | Multiset sums, ordered monoid arithmetic, `•` scalar mult. |
| `Mathlib.Data.Fin.VecNotation` | Syntax for vectors like `![a, b]`. |
| `Mathlib.Data.Matrix.Notation` | Matrix/vector notation and `Matrix.const_fin1_eq`. |

These imports indicate the module sits at the intersection of:
- **Discrete optimization** (VCSPs),
- **Algebraic complexity theory** (fractional polymorphisms),
- **Order theory** (ordered monoids, inequalities),
- **Combinatorics** (multisets, permutations, symmetry).

--- 

Let me know if you'd like a formalized summary (e.g., for a Lean module header docstring) or a diagram of dependencies.