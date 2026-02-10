### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**
| Name | Type | Purpose |
|------|------|---------|
| `isOpen_re_lt_EReal` | `∀ x : EReal, IsOpen {z : ℂ | z.re < x}` | Proves that the set of complex numbers with real part strictly less than an extended real `x` is open. |
| `isOpen_re_gt_EReal` | `∀ x : EReal, IsOpen {z : ℂ | x < z.re}` | Proves openness of the right half-plane `{z | x < z.re}`. |
| `isOpen_im_lt_EReal` | `∀ x : EReal, IsOpen {z : ℂ | z.im < x}` | Proves openness of the lower half-plane `{z | z.im < x}`. |
| `isOpen_im_gt_EReal` | `∀ x : EReal, IsOpen {z : ℂ | x < z.im}` | Proves openness of the upper half-plane `{z | x < z.im}`. |

All four lemmas follow the same pattern: they express half-planes as preimages of open intervals under continuous functions (`re`, `im`) and apply `isOpen_lt`.

#### 2. **Naming Conventions**
- **Prefixes**: `isOpen_` — indicates the lemma asserts openness of a set.
- **Structure**: `isOpen_[re/im]_[lt/gt]_EReal`  
  - `re`/`im`: real/imaginary part.
  - `lt`/`gt`: strict inequality direction.
  - `_EReal`: boundary value is an `EReal`, allowing `⊥` (bottom) and `⊤` (top) to model empty/full plane cases.

#### 3. **Tactic Stack**
- `isOpen_lt` — core tactic used to prove openness of strict inequality sets.
- `EReal.continuous_coe_iff.mpr` — converts continuity of the coercion `ℝ → EReal` (or vice versa) as needed.
- `continuous_re`, `continuous_im`, `continuous_const` — basic continuity facts used as arguments to `isOpen_lt`.

No heavy automation (e.g., `aesop`, `ring`, `simp`) is used; the proofs are direct applications of continuity lemmas.

#### 4. **Proof Logic**
- Each proof follows a uniform structure:
  1. Recognize the set as `{z | f z < g z}` or `{z | g z < f z}`.
  2. Apply `isOpen_lt` with appropriate continuous functions `f`, `g`.
  3. Use `EReal.continuous_coe_iff.mpr` to lift continuity of `re`/`im` (as maps into `ℝ`) to continuity into `EReal`.
  4. Supply `continuous_const` for the constant function part.

No induction or case analysis is required — the proofs are purely topological/analytic.

#### 5. **Imports**
- `Mathlib.Analysis.Complex.Basic` — provides basic complex analysis infrastructure: `ℂ`, `re`, `im`, continuity of projections.
- `Mathlib.Topology.Instances.EReal` — provides topology on `EReal`, continuity of coercion maps, and `isOpen_lt` for `EReal`-valued functions.

These imports define the ambient setting: complex plane as a topological space, extended reals as a topological space, and continuity tools for mixed `ℝ`/`EReal` contexts.

--- 

This module is a concise, high-level formalization of openness of standard half-planes in ℂ, leveraging existing continuity infrastructure in Mathlib.