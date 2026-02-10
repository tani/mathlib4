### Technical Brief: Nakayama’s Lemma in Lean 4 (Mathlib)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `eq_smul_of_le_smul_of_le_jacobson` | `{I J : Ideal R} {N : Submodule R M} → N.FG → N ≤ I • N → I ≤ jacobson J → N = J • N` | Generalized version of (2) in Stacks 00DV: if a finitely generated submodule is stable under multiplication by an ideal `I` contained in the Jacobson radical of `J`, then it equals `J • N`. |
| `eq_bot_of_le_smul_of_le_jacobson_bot` | `(I : Ideal R) (N : Submodule R M) → N.FG → N ≤ I • N → I ≤ jacobson ⊥ → N = ⊥` | Special case of above when `J = ⊥`, i.e., `I ≤ jacobson 0`. Used to prove nilpotency or triviality under Jacobson radical conditions. |
| `sup_smul_eq_sup_smul_of_le_smul_of_le_jacobson` | `{I J : Ideal R} {N N' : Submodule R M} → N'.FG → I ≤ jacobson J → N' ≤ N ⊔ I • N' → N ⊔ I • N' = N ⊔ J • N'` | Generalized version of (4) in Stacks 00DV: under stability condition, replacing `I` with `J` in the sum does not change the result. |
| `smul_le_of_le_smul_of_le_jacobson_bot` | `{I : Ideal R} {N N' : Submodule R M} → N'.FG → I ≤ jacobson ⊥ → N' ≤ N ⊔ I • N' → I • N' ≤ N` | Special case of (4) when `J = ⊥`; deduces containment of `I • N'` in `N`. |
| `le_of_le_smul_of_le_jacobson_bot` | `{I : Ideal R} {N N' : Submodule R M} → N'.FG → I ≤ jacobson ⊥ → N' ≤ N ⊔ I • N' → N' ≤ N` | Immediate corollary of previous: under same assumptions, `N' ≤ N`. |
| `eq_bot_of_eq_ideal_smul_of_le_jacobson_annihilator` | `{I : Ideal R} {N : Submodule R M} → N.FG → N = I • N → I ≤ N.annihilator.jacobson → N = ⊥` | Variant of Nakayama using annihilator: if `N` is fixed by `I` and `I` lies in Jacobson radical of annihilator, then `N = 0`. |
| `eq_bot_of_eq_pointwise_smul_of_mem_jacobson_annihilator` | `{r : R} {N : Submodule R M} → N.FG → N = r • N → r ∈ N.annihilator.jacobson → N = ⊥` | Pointwise version: scalar multiplication invariance implies triviality under Jacobson condition on `r`. |
| `eq_bot_of_set_smul_eq_of_subset_jacobson_annihilator` | `{s : Set R} {N : Submodule R M} → N.FG → N = s • N → s ⊆ N.annihilator.jacobson → N = ⊥` | Set-based generalization of above. |
| `top_ne_ideal_smul_of_le_jacobson_annihilator` | `[Nontrivial M] [Module.Finite R M] → I ≤ annihilator R M.jacobson → ⊤ ≠ I • ⊤` | Contrapositive: if `I` lies in Jacobson radical of annihilator, then `I • ⊤ ≠ ⊤`. |
| `exists_sub_one_mem_and_smul_le_of_fg_of_le_sup` | `{I : Ideal R} {N N' P : Submodule R M} → N'.FG → N' ≤ P → P ≤ N ⊔ I • N' → ∃ r, r - 1 ∈ I ∧ r • P ≤ N` | Key technical lemma used in proofs of Nakayama variants; constructs `r ≡ 1 mod I` killing quotient. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `eq_...`: equality conclusions (e.g., `eq_smul`, `eq_bot`)
  - `sup_...`: statements involving supremum (`⊔`) of submodules
  - `smul_le_of_...`: containment conclusions involving scalar multiplication
  - `top_ne_...`: inequality conclusions for top submodule under Jacobson action
  - `exists_...`: existence lemmas (often intermediate steps)

- **Suffixes**:
  - `_of_le_smul_of_le_jacobson`: general pattern for Nakayama-style lemmas with `N ≤ I • N` and `I ≤ jacobson J`
  - `_of_le_smul_of_le_jacobson_bot`: special case where `J = ⊥`
  - `_of_fg_of_le_smul`: assumes finite generation and stability under `I`
  - `_of_subset_jacobson_annihilator`: uses subset condition on annihilator’s Jacobson radical

- **Other patterns**:
  - `map`, `comap`, `quotient`, `mkQ`: used in proofs involving quotient modules
  - `annihilator`: appears in lemmas tied to module annihilators

---

#### **3. Tactic Stack**

Frequent tactics used in proofs:

| Tactic | Usage |
|--------|-------|
| `rw` / `rwa` | Rewriting equalities, especially module actions (`•`), annihilators, quotients |
| `simp` / `simp_rw` | Simplifying module-theoretic expressions (e.g., `map_smul`, `bot_smul`, `sup_comm`) |
| `exact` / `assumption` | Closing goals directly from hypotheses |
| `cases'` / `rcases` | Extracting witnesses from existential hypotheses (e.g., `exists_sub_one_mem_and_smul_eq_zero_of_fg_of_le_smul`) |
| `apply` / `refine` | Constructing proofs stepwise, especially with `le_antisymm`, `eq_trans`, etc. |
| `conv` | Localized rewriting in complex expressions (e.g., `conv_lhs => rw [...]`) |
| `induction' ... using ...` | Structural induction on submodules (e.g., `smul_inductionOn_pointwise`) |
| `simpa` | Simplifying and discharging goals simultaneously (often with `using` clause) |
| `aesop` / `linarith` | Not explicitly visible here, but likely used in background automation (not present in this snippet) |

---

#### **4. Proof Logic**

The logical flow across most proofs follows this pattern:

1. **Finite generation assumption (`N.FG`)** is critical — used to apply foundational lemmas like `exists_sub_one_mem_and_smul_eq_zero_of_fg_of_le_smul`.
2. **Stability condition (`N ≤ I • N`)** is assumed — often rewritten as equality via `le_antisymm`.
3. **Jacobson containment (`I ≤ jacobson J`)** is leveraged via:
   - `exists_mul_sub_mem_and_mem_jacobson` or `exists_sub_one_mem_and_smul_eq_zero_of_fg_of_le_smul`
   - `mem_jacobson_iff` (implicit in `mem_jacobson` lemmas)
4. **Quotient module techniques**:
   - Map to quotient `N.mkQ` to reduce problem to simpler case (e.g., `N' ↦ N'/N ∩ N'`)
   - Use injectivity of `comap` under surjective maps (`comap_injective_of_surjective`)
5. **Inductive arguments** on scalar multiplication (`smul_inductionOn_pointwise`) for closure properties.
6. **Contrapositive reasoning** in negative statements (`top_ne_...`) — assume equality and derive contradiction.

---

#### **5. Imports & Scope**

**Primary Imports**:
- `Mathlib.RingTheory.Finiteness.Basic`: Provides `FG`, `exists_sub_one_mem_and_smul_eq_zero_of_fg_of_le_smul`
- `Mathlib.RingTheory.Finiteness.Nakayama`: Possibly re-exports or extends this file
- `Mathlib.RingTheory.Jacobson.Ideal`: Defines `jacobson I`, key radical operator

**Scope & Dependencies**:
- Assumes `CommRing R`, `AddCommGroup M`, `Module R M`
- Uses `Ideal`, `Submodule`, `Pointwise`, `Module.annihilator`, `Submodule.Quotient`
- Built on top of `Mathlib`’s module theory infrastructure (e.g., `map`, `comap`, `mkQ`, `range_mkQ`)

---

#### **Summary**

This file formalizes several equivalent formulations of **Nakayama’s Lemma** from the Stacks Project (Tag 00DV), emphasizing generalizations via the **Jacobson radical** of arbitrary ideals and annihilators. It includes both direct consequences (`eq_smul`, `sup_smul_eq_sup_smul`) and auxiliary lemmas (`exists_sub_one_mem_and_smul_le_of_fg_of_le_sup`) used in broader contexts (e.g., localization, completion). The proofs rely heavily on finite generation, quotient module techniques, and properties of the Jacobson radical.