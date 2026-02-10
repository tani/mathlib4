### Technical Brief: Multiplicative Operations on Fréchet Derivatives (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `HasStrictFDerivAt` | Generalized Fréchet differentiability at a point with strictness condition. Used for local derivative existence and uniqueness. |
| `HasFDerivAt`, `HasFDerivWithinAt` | Standard Fréchet differentiability (global / within a set). |
| `DifferentiableAt`, `DifferentiableWithinAt`, `DifferentiableOn`, `Differentiable` | Regularity properties (local / within set / on domain / global differentiability). |
| `fderiv`, `fderivWithin` | The actual derivative (as a continuous linear map) when differentiability holds. |
| `compL`, `apply`, `mul`, `smulRight`, `flip`, `flipMultilinear` | Continuous bilinear / multilinear maps used to encode multiplication, application, and composition. |
| `proj`, `smulRight`, `mul'`, `const_mul`, `mul_const`, `smul`, `mul`, `pow`, `list_prod`, `multiset_prod` | Derived operations encoding product rules. |

##### **Core Product Rule Theorems**
| Theorem | Statement (simplified) |
|---------|------------------------|
| `HasStrictFDerivAt.smul` | Derivative of `c • f` is `c • f' + c'.smulRight (f x)` |
| `HasStrictFDerivAt.mul'` | Derivative of `a * b` is `a • b' + a'.smulRight (b x)` |
| `HasStrictFDerivAt.mul` | Commutative version: `c * d` derivative is `c • d' + d • c'` |
| `HasStrictFDerivAt.clm_apply` | Derivative of `(c y) (u y)` is `(c x).comp u' + c'.flip (u x)` |
| `HasStrictFDerivAt.clm_comp` | Derivative of `(c y).comp (d y)` is `(compL (c x)).comp d' + (compL.flip (d x)).comp c'` |
| `hasStrictFDerivAt_list_prod'` | Derivative of product of list of functions: sum over positions of left product × derivative × right product |
| `hasStrictFDerivAt_multiset_prod` (incomplete in input) | Extends list product rule to multisets (used for finite products). |

##### **Auxiliary Operators**
- `smulRight f x`: `λ h, h • f x`
- `flip f x y := f y x`
- `compL 𝕜 F G H c := λ d, c ∘ d`
- `ContinuousMultilinearMap.apply`: application of multilinear map to arguments
- `proj i`: projection from product space to component `i`

---

#### **2. Naming Conventions**

| Prefix / Suffix | Meaning / Usage |
|-----------------|-----------------|
| `has*FDerivAt` | Derivative existence (strict / non-strict, global / within) |
| `differentiable*At` | Regularity (strict / non-strict, global / within) |
| `fderiv*` | Actual derivative value (when differentiable) |
| `*mul`, `*smul`, `*const_mul`, `*mul_const` | Product rules for scalar multiplication, multiplication, left/right multiplication |
| `*clm_*`, `*continuousMultilinear_*` | Application/comp of continuous linear/multilinear maps |
| `*list_*`, `*multiset_*` | Product rules for finite lists/multisets of functions |
| `*flip`, `*proj`, `*smulRight` | Helper operators for manipulating bilinear/multilinear forms |

---

#### **3. Tactic Stack**

| Tactic | Role |
|--------|------|
| `exact` | Used to close goals directly (especially in `HasFDerivAt`/`WithinAt` variants) |
| `convert` | Used to align goal with known theorem (e.g., `mul` vs `mul'`) and then prove equality via extensionality |
| `ext` + `apply mul_comm` | Prove equality of linear maps by extensionality and commutativity of multiplication |
| `simp only [...]` | Simplify using definitional equalities (e.g., `pow_zero`, `pow_succ'`, `prod_cons`) |
| `induction` | Structural induction on lists (e.g., `list_prod'`) |
| `congr_fderiv` | Congruence for derivatives (used to replace derivative with equivalent expression) |
| `simpa only [...] using` | Simplify and apply a hypothesis (e.g., `smul_zero`, `zero_add`) |
| `eq.symm` + `Finset.sum_equiv` | Reindex sums via equivalence of finite types (e.g., `finCongr`, `List.length_attach`) |

---

#### **4. Proof Logic**

- **Inductive structure**: Proofs for list/multiset products use induction on list structure.
- **Bilinear map composition**: Most product rules reduce to applying `hasStrictFDerivAt` for bilinear maps (`isBoundedBilinearMap_*`) composed with product of derivatives (`hc.prod hd`).
- **Extensionality**: To show two linear maps are equal, `ext z; apply ...` is used (e.g., to show `mul` and `mul'` variants agree).
- **Congruence & rewriting**: `congr_fderiv` and `congr` lemmas allow substitution of derivatives under sum expressions.
- **Differentiability propagation**: `fun_prop` instances allow chaining differentiability via composition rules.
- **Unification fixes**: Many proofs use `by exact` or `simpa only [...] using` to avoid Lean 4 unification issues (noted in `adaptation_note`).

---

#### **5. Imports & Scope**

| Import | Purpose |
|--------|---------|
| `Mathlib.Analysis.Analytic.Constructions` | Analytic constructions (e.g., power series, composition) |
| `Mathlib.Analysis.Calculus.FDeriv.Analytic` | Analyticity and differentiability interplay |
| `Mathlib.Analysis.Calculus.FDeriv.Bilinear` | Bilinear map differentiability (core for product rules) |

**Scope**:  
- General Fréchet calculus over normed spaces over a nontrivially normed field `𝕜`.  
- Works for scalar multiplication (`𝕜` or algebra `𝕜'`), multiplication in normed rings/algebras (`𝔸`, `𝔸'`), and application of continuous linear/multilinear maps.  
- Supports both local (`At`) and relative (`WithinAt`) differentiability, with chain rules and product rules.

---

Let me know if you'd like a formalized summary of the `list_prod` derivative rule or a tactic-level sketch of the `mul` proof.