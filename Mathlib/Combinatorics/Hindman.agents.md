### Technical Metadata Brief: Hindman’s Theorem in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `Ultrafilter.mul` | `{M} [Mul M] → Ultrafilter M → Ultrafilter M → Ultrafilter M` | Defines multiplication (or addition, via `to_additive`) of ultrafilters via pushforward of the multiplication map. |
| `Ultrafilter.eventually_mul` | `(∀ᶠ m in U * V, p m) ↔ ∀ᶠ m in U, ∀ᶠ m' in V, p (m * m')` | Characterizes the filter convergence for `U * V`. |
| `Ultrafilter.semigroup` | `[Semigroup M] → Semigroup (Ultrafilter M)` | Lifts the semigroup structure on `M` to `βM` (ultrafilters), using `mul` and proving associativity. |
| `FS` / `FP` | `Stream' M → Set M` (inductive) | `FS` (finite sums) / `FP` (finite products) — inductively defined sets of finite non-repeating sums/products of a stream. |
| `FP.mul` | `m ∈ FP a → ∃ n, ∀ m' ∈ FP (a.drop n), m * m' ∈ FP a` | Ensures closure under multiplication when second factor comes from a sufficiently late tail. |
| `exists_idempotent_ultrafilter_le_FP` | `∃ U, U * U = U ∧ ∀ᶠ m in U, m ∈ FP a` | For any stream `a`, there exists an idempotent ultrafilter `U` concentrated on `FP a`. |
| `exists_FP_of_large` | `U * U = U → s₀ ∈ U → ∃ a, FP a ⊆ s₀` | If `s₀` is `U`-large for idempotent `U`, then it contains some `FP a`. |
| `FP_partition_regular` | `FP a ⊆ ⋃₀ s → ∃ c ∈ s, ∃ b, FP b ⊆ c` | **Strong Hindman**: In any finite cover of an `FP`-set, one part contains an `FP`-set. |
| `exists_FP_of_finite_cover` | `[Nonempty M] → ⊤ ⊆ ⋃₀ s → ∃ c ∈ s, ∃ a, FP a ⊆ c` | **Weak Hindman**: In any finite cover of the whole semigroup, one part contains an `FP`-set. |
| `FP_drop_subset_FP` | `FP (a.drop n) ⊆ FP a` | Monotonicity of `FP` under dropping initial elements. |
| `FP.singleton` | `a.get i ∈ FP a` | Every term of the stream is in its own `FP` set. |
| `FP.mul_two` | `i < j → a.get i * a.get j ∈ FP a` | Binary products of stream terms (with increasing indices) lie in `FP a`. |
| `FP.finset_prod` | `[CommMonoid M] → s.nonempty → s.prod a ∈ FP a` | Finite products over arbitrary nonempty index sets (via `Finset.prod`) lie in `FP a`. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `FP_`, `FS_`: For finite product/sum related results (e.g., `FP_mul`, `FS_partition_regular`).
  - `exists_`: Existence lemmas (e.g., `exists_idempotent_ultrafilter_le_FP`, `exists_FP_of_large`).
  - `ultrafilter_`: Ultrafilter-specific constructions/properties (e.g., `ultrafilter_mul`, `ultrafilter_isClosed_basic`).
- **Suffixes**:
  - `_le_`: Indicates inclusion or domination (e.g., `exists_idempotent_ultrafilter_le_FP`).
  - `_of_`: Derivation from a premise (e.g., `exists_FP_of_large`, `FP_partition_regular`).
- **To-additive variants**: All multiplicative lemmas have additive counterparts via `to_additive`, e.g., `FP` ↔ `FS`, `*` ↔ `+`, `exists_idempotent_ultrafilter_le_FP` ↔ `exists_idempotent_ultrafilter_le_FS`.

---

#### **3. Tactic Stack**

- **Core proof automation**:
  - `simp`, `rw`, `convert`, `exact`, `refine`
- **Filter/ultrafilter-specific**:
  - `filter_upwards`: For proving filter membership statements.
  - `ultrafilterBasis_is_basis.continuous_iff.2`: For continuity arguments.
  - `mem_pure.mpr`, `inter_mem`, `mem_of_superset`
- **Induction & case analysis**:
  - `induction' h with ...`: Structural induction on inductive predicates (`FP`, `FS`).
  - `cases' h with ...`: Case splits on existential or conjunction hypotheses.
- **Set-theoretic reasoning**:
  - `Set.mem_iInter.mp`, `Set.mem_setOf_eq`, `Set.inter_subset_left/right`
- **Topological/compactness tools**:
  - `IsCompact.nonempty_iInter_of_sequence_nonempty_isCompact_isClosed`
  - `exists_idempotent_in_compact_subsemigroup`
- **Stream operations**:
  - `Stream'.drop_drop`, `Stream'.tail_eq_drop`, `Stream'.head_drop`, `Stream'.get_drop`
- **Arithmetic/Finset**:
  - `Finset.prod_erase`, `Finset.min'_mem`, `Finset.min'_lt_of_mem_erase_min'`
  - `Nat.succ_le_of_lt`, `Nat.exists_eq_add_of_le`

---

#### **4. Proof Logic**

- **High-level strategy**:
  1. **Algebraic extension**: Extend multiplication on `M` to `βM` (ultrafilters) via `U * V = (· * ·) <$> U <*> V`.
  2. **Idempotent ultrafilters**: Use compactness + continuity to guarantee existence of idempotent `U` (i.e., `U * U = U`) in `βM`.
  3. **Large sets contain `FP`/`FS`**:
     - Show any `U`-large set (for idempotent `U`) contains some `FP a` (`exists_FP_of_large`).
     - Show any `FP a` is `U`-large for some idempotent `U` (`exists_idempotent_ultrafilter_le_FP`).
  4. **Ramsey-style partition argument**:
     - In a finite cover of a `U`-large set, one part is `U`-large (by ultrafilter property).
     - Combine with previous steps to extract an `FP`-set inside that part.

- **Inductive structure**:
  - Proofs about `FP` rely heavily on induction over the inductive definition (`head`, `tail`, `cons`).
  - Corecursive construction in `exists_FP_of_large`: builds a stream `a` such that all finite products of `a` lie in `s₀`.

- **Topological backbone**:
  - Uses properties of `βM` (Stone–Čech compactification): compact, Hausdorff, with continuous left-multiplication.
  - Key lemma: existence of idempotent in compact subsemigroups (via `exists_idempotent_in_compact_subsemigroup`).

---

#### **5. Imports & Scope**

| Import | Role |
|--------|------|
| `Mathlib.Algebra.BigOperators.Group.Finset` | For `Finset.prod`, `Finset.sum`, and related lemmas over commutative monoids/groups. |
| `Mathlib.Data.Stream.Init` | Core stream (`Stream'`) infrastructure: `head`, `tail`, `drop`, `get`, `corec`. |
| `Mathlib.Topology.Algebra.Semigroup` | Continuity of multiplication, semigroup actions, basic topological algebra. |
| `Mathlib.Topology.StoneCech` | Ultrafilter space `βM`, its topology, compactness, continuity of extended operations. |

**Domain**: Ramsey theory, combinatorial semigroup theory, topological dynamics.  
**Generalization**: Works for arbitrary semigroups `M`, not just `ℕ⁺` or `ℕ`.  
**Special case**: Instantiating `M = ℕ⁺` (with `+`) yields classical Hindman’s theorem on finite sums (`FS`).  
**Duality**: `FP` version corresponds to multiplicative version (e.g., in `ℕ⁺` under multiplication).

--- 

Let me know if you'd like a diagram of the proof dependencies or a formalized summary of the main theorem chain.