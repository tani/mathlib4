Here's a structured technical brief extracted from the provided Lean 4 file on **UV-compressions**, suitable for building a domain-specific AI agent in combinatorics (especially extremal set theory):

---

### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `compress u v a` | `α → α → α → α` | UV-compresses element `a` along `u, v`: replaces `v ∩ a` with `u` if `Disjoint u a ∧ v ≤ a`; otherwise returns `a`. |
| `compression u v s` | `α → α → Finset α → Finset α` | UV-compresses a set family `s`: includes elements whose compression stays in `s`, and adds compressions of elements whose image is new (to preserve cardinality). |
| `IsCompressed u v s` | `Prop` | States that `s` is invariant under `u,v`-compression: `𝓒 u v s = s`. |
| `compress_injOn` | `Set.InjOn (compress u v) ↑{a ∈ s | compress u v a ∉ s}` | Injectivity of compression on elements that *move* under compression. |
| `card_compression` | `#(𝓒 u v s) = #s` | Compression preserves cardinality of the family. |
| `mem_compression` | `a ∈ 𝓒 u v s ↔ ...` | Characterizes membership in compressed family: either already in `s` with compression in `s`, or compression of something in `s` not in `s`. |
| `shadow_compression_subset_compression_shadow` | `∂ (𝓒 u v 𝒜) ⊆ 𝓒 u v (∂ 𝒜)` | Key inequality for Kruskal–Katona: shadow of compressed family is contained in compression of shadow (under hypothesis of local compressibility). |
| `card_shadow_compression_le` | `#(∂ (𝓒 u v 𝒜)) ≤ #(∂ 𝒜)` | Immediate corollary: compression does not increase shadow size under same hypothesis. |
| `compress_idem` | `compress u v (compress u v a) = compress u v a` | Idempotence of element-wise compression. |
| `compression_idem` | `𝓒 u v (𝓒 u v s) = 𝓒 u v s` | Idempotence of family compression. |
| `compress_self` | `compress u u a = a` | Compression along identical elements is identity. |
| `compression_self` | `𝓒 u u s = s` | Family compression along identical elements is identity. |
| `card_compress` | `#(compress u v a) = #a` (under `#u = #v`) | Size-preserving on individual sets. |

---

### **2. Naming Conventions**

- **Prefixes**:
  - `compress_`: element-level compression (e.g., `compress_of_disjoint_of_le`, `compress_idem`)
  - `compression_`: family-level compression (e.g., `compression_idem`, `card_compression`)
  - `isCompressed_`: predicate for invariance under compression (`isCompressed_self`)
  - `mem_compression`: membership characterization
  - `le_of_mem_compression_of_not_mem`, `disjoint_of_mem_compression_of_not_mem`, etc.: structural properties of compressed families.

- **Suffixes**:
  - `_of_`: conditional version (e.g., `compress_of_disjoint_of_le`)
  - `_of_not_mem`: when analyzing elements not originally in the family
  - `_of_mem_compression`: when analyzing elements in the compressed family

- **Notation**:
  - `𝓒` (typed `\MCC`) for `UV.compression`, scoped in `FinsetFamily`.

---

### **3. Tactic Stack**

Frequently used tactics in proofs:

| Tactic | Usage |
|--------|-------|
| `split_ifs` | Handling `if ... then ... else ...` definitions (`compress`, `compression`) |
| `rw [...]` / `rwa [...]` | Rewriting using lemmas, often with `mem_compression`, `compress_idem`, etc. |
| `simp_rw` / `simp only` | Simplifying with rewrite rules, especially for `mem_compression`, `card_compression`, `shadow_compression_subset_compression_subset` |
| `exact`, `refine`, `convert` | Constructing proofs, often with `using 1` for partial matching |
| `obtain ⟨...⟩` / `cases ... with ...` | Destructuring existential/unions/`or` in `mem_compression`, `mem_shadow_iff`, etc. |
| `ext` | Extensionality for sets/finssets |
| `apply`, `intro`, `intro h` | Standard natural deduction |
| `rwa [...]` | Rewrite + assumption, especially for `hxy.eq`, `hvs`, `hvu` |
| `aesop` (not present here) | Not used — proofs are highly manual and case-driven |
| `ring`, `linarith` | Not used — arithmetic is mostly on `Finset.card`, handled via `card_*` lemmas |

---

### **4. Proof Logic & Strategy**

- **Element-level compression**:
  - Proofs often split on whether `Disjoint u a ∧ v ≤ a`.
  - Use `compress_of_disjoint_of_le` to simplify when condition holds.
  - Key lemmas: `compress_idem`, `compress_self`, `compress_sdiff_sdiff` (inverse operation).

- **Family-level compression**:
  - Decompose `compression` into two disjoint parts: *fixed* elements (`a ∈ s ∧ compress a ∈ s`) and *moved* elements (`a ∈ s ∧ compress a ∉ s`).
  - Prove injectivity on moved elements (`compress_injOn`) to show `card_compression`.
  - Use `mem_compression` to reason about membership in compressed families.

- **Shadow reduction** (main application):
  - Hypothesis: for all `x ∈ u`, ∃ `y ∈ v` s.t. `𝒜` is `(u \ {x}, v \ {y})`-compressed.
  - Goal: show `∂(𝓒 u v 𝒜) ⊆ 𝓒 u v (∂𝒜)`.
  - Strategy:
    - Take `s ∈ ∂(𝓒 u v 𝒜) \ ∂𝒜`.
    - Use `mem_shadow_iff_insert_mem` to get `x` s.t. `insert x s ∈ 𝓒 u v 𝒜`.
    - Show `u ⊆ s`, `Disjoint v s`, and `(s ∪ v) \ u ∈ ∂𝒜 \ ∂(𝓒 u v 𝒜)`.
    - Crucial sublemmas: `le_of_mem_compression_of_not_mem`, `disjoint_of_mem_compression_of_not_mem`, `sup_sdiff_mem_of_mem_compression_of_not_mem`.
    - Use local compressibility hypothesis (`huv`) to lift membership back to `𝒜`.

- **Induction / iteration**:
  - Not used directly here — instead, *local* compressibility is assumed to derive shadow inequality.
  - In full Kruskal–Katona proof, one iterates compressions to reach a compressed family minimizing shadow.

---

### **5. Imports & Dependencies**

| Import | Purpose |
|--------|---------|
| `Mathlib.Combinatorics.SetFamily.Shadow` | Defines shadow operator `∂`, `mem_shadow_iff`, `card_shadow`, etc. |
| `Finset` (via `open Finset`) | Basic set operations on finite sets: `union`, `inter`, `sdiff`, `erase`, `insert`, `card`, `Disjoint`, `≤`, etc. |
| `GeneralizedBooleanAlgebra` | General setting for `compress` (also works for `Set α`). |
| `DecidableRel (@Disjoint α)` / `DecidableRel ((· ≤ ·))` | Enables `if ... then ... else ...` in definitions. |
| `DecidableEq α` | Required for `Finset`-based definitions (`Finset α` assumes decidability). |

---

### **Domain-Specific AI Agent Notes**

- **Core domain**: Extremal combinatorics, especially **shadow minimization**, **compression techniques**, and the **Kruskal–Katona theorem**.
- **Key abstraction**: UV-compression as a *local* operation that can be iterated to minimize shadow.
- **Proof patterns**:
  - Case analysis on membership/compression status.
  - Use of `mem_compression` to decompose compressed families.
  - Leveraging `huv` (local compressibility) to lift properties from compressed to original families.
- **Tooling**: Lean 4 + Mathlib; heavy use of `rw`, `split_ifs`, `obtain`, and extensionality.

Let me know if you'd like a ** tactic cheat sheet ** or a **formalization roadmap for Kruskal–Katona** based on this file.