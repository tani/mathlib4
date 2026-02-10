Here's a structured technical metadata brief extracted from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `CoordinateRing` | `abbrev`: Coordinate ring $ R[W] = R[X,Y]/\langle W \rangle $, implemented as `AdjoinRoot W.polynomial`. |
| `FunctionField` | `abbrev`: Function field $ R(W) = \mathrm{Frac}(R[W]) $. |
| `basis` | `def`: Power basis $\{1, Y\}$ of $ R[W] $ over $ R[X] $, indexed by `Fin 2`. |
| `mk` | `abbrev`: Natural map $ R[X][Y] \to R[W] $, i.e., `AdjoinRoot.mk`. |
| `XClass x`, `YClass y` | `def`: Classes of $ X - x $, $ Y - y(X) $ in $ R[W] $. |
| `XIdeal x`, `YIdeal y`, `XYIdeal x y` | `def`: Principal / finitely generated ideals in $ R[W] $. |
| `quotientXYIdealEquiv` | `def`: $ R $-algebra iso $ R[W]/\langle X - x, Y - y \rangle \cong R $, assuming $ W(x, y(x)) = 0 $. |
| `XYIdeal'` | `def`: Nonzero fractional ideal class $ \langle X - x, Y - y \rangle \in \mathrm{Cl}(R[W])^\times $, for nonsingular points. |
| `toClassFun`, `toClass` | `def`: Map from points $ W(F) $ to additive group of class group, sending $ (x,y) \mapsto [\langle X - x, Y - y \rangle] $. |
| `XYIdeal_neg_mul` | `lemma`: For nonsingular $ (x,y) $, $ \langle X - x, Y - y \rangle \cdot \langle X - x, Y + y + a_1x + a_3 \rangle = \langle X - x \rangle $. |
| `XYIdeal_mul_XYIdeal` | `lemma`: Key identity encoding group law: product of ideals corresponding to $ P + Q $ equals product for $ R $, where $ R = P + Q $ under geometric addition. |
| `degree_norm_smul_basis` | `lemma`: For $ x = p + qY \in R[W] $, $ \deg(\mathrm{Norm}_{R[X]}(x)) = \max(2\deg p,\, 2\deg q + 3) $. |
| `degree_norm_ne_one` | `lemma`: Norm of any nonzero element in $ R[W] $ has degree ≠ 1. |
| `toClass_injective` | `lemma`: The map `toClass` is injective. |
| `instAddCommGroup` (in `Point`) | `instance`: Proves $ W(F) $ (nonsingular rational points) form an abelian group under geometric addition. |
| `XYIdeal'_mul_inv` | `lemma`: Shows $ [I] \cdot [\overline{I}] = 1 $ in class group, where $ \overline{I} $ corresponds to negated point. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `XYIdeal_`, `XIdeal_`, `YIdeal_`: Ideal constructions.
  - `XClass_`, `YClass_`: Element classes.
  - `toClass_`, `toAffine_`, `quotientXYIdeal_`: Maps / equivalences.
  - `mk_`, `map_`, `coe_`: Standard coercion / map helpers.
  - `norm_`, `degree_`, `natDegree_`: Norm / degree lemmas.

- **Suffixes**:
  - `_eq`: Equality lemmas (e.g., `XYIdeal_eq₁`, `XYIdeal_eq₂`).
  - `_mul_`, `_add_`, `_neg_`: Behavior under ring operations.
  - `_smul_`, `_basis_`: Interaction with basis / scalar mult.
  - `_inj`, `_surj`: Injectivity / surjectivity.
  - `_ne_zero`, `_eq_zero`: Nonzero / zero element properties.

- **Special macros**:
  - `C_simp`, `eval_simp`: Custom simp lemmas for constants and evaluation.

---

### **3. Tactic Stack**

Frequent tactics used:

| Tactic | Purpose |
|--------|---------|
| `simp only [...]` | Targeted simplification using explicit lemmas (e.g., `basis_zero`, `map_mk`, `C_add`, `eval_C`). |
| `ring1` | Polynomial ring simplification (especially after `C_simp`). |
| `linear_combination` | Proving polynomial identities (e.g., verifying $ W $-relation). |
| `rw [...]` | Rewriting with equalities (often long chains of ideal equalities). |
| `rcases`, `obtain`, `cases'` | Case analysis on equalities or disjunctions (e.g., $ x_1 = x_2 $). |
| `convert`, `congr_arg` | Goal-directed equality proofs (especially for ideals). |
| `field_simp`, `ring`, `norm_num1` | Field arithmetic and normalization. |
| `simp_rw` | Simplify + rewrite in one step (common in class group proofs). |
| `exact`, `refine`, `apply` | Manual proof construction. |

---

### **4. Proof Logic**

- **Structure**:
  - **Step 1**: Define coordinate ring $ R[W] $ and its algebra structure over $ R[X] $.
  - **Step 2**: Establish basis $ \{1, Y\} $ and norm properties (especially degree formula).
  - **Step 3**: Define point-associated ideals $ I_{x,y} = \langle X - x, Y - y \rangle $.
  - **Step 4**: Prove key ideal identities:
    - $ I_{x,-y} \cdot I_{x,y} = \langle X - x \rangle $ (inverse law),
    - $ I_{x_1,y_1} \cdot I_{x_2,y_2} = I_{x_3,y_3} \cdot \langle X - x_3 \rangle $ (addition law).
  - **Step 5**: Pass to class group: show $ [I_{x,y}] $ defines a group homomorphism from $ W(F) $ to $ \mathrm{Cl}(R[W]) $.
  - **Step 6**: Use injectivity (via degree norm argument) to lift abelian group structure to $ W(F) $.

- **Key logical patterns**:
  - **Ideal computations**: Explicitly construct generators for ideal products using `span_pair_mul_span_pair`, `Ideal.mul_sup`, etc.
  - **Nonsingularity**: Used to invert derivatives (e.g., $ W_X $, $ W_Y $) in ideal containment proofs.
  - **Field case**: Most heavy lifting done over fields; extends to rings via localization/injectivity.
  - **Injectivity via degree**: `degree_norm_ne_one` ensures no nontrivial point maps to zero in class group.

---

### **5. Imports**

| Import | Role |
|--------|------|
| `Mathlib.AlgebraicGeometry.EllipticCurve.Jacobian` | Jacobian coordinate model of elliptic curves. |
| `Mathlib.AlgebraicGeometry.EllipticCurve.Projective` | Projective coordinate model. |
| `Mathlib.LinearAlgebra.FreeModule.Norm` | Algebra norm over free modules (used for `Algebra.norm`). |
| `Mathlib.RingTheory.ClassGroup` | Class group of a domain, fractional ideals, group structure. |
| `Mathlib.RingTheory.Polynomial.UniqueFactorization` | UFD properties (e.g., prime ideals, factorization). |

---

Let me know if you'd like a diagram of the ideal identities or a summary of how the group law is encoded in `XYIdeal_mul_XYIdeal`.