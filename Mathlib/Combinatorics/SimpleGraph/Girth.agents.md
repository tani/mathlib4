### Technical Metadata Brief: Girth and Extended Girth of a Simple Graph (Lean 4)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `egirth` | `SimpleGraph α → ℕ∞` | Defines the *extended girth* as the infimum of lengths of all cycles (or `∞` if acyclic). |
| `girth` | `SimpleGraph α → ℕ` | Defines the *girth* as `egirth.toNat`, i.e., the minimal cycle length, or `0` if acyclic. |
| `le_egirth` | `n ≤ G.egirth ↔ ∀ a (w : G.Walk a a), w.IsCycle → n ≤ w.length` | Characterizes the ordering into `egirth`. |
| `egirth_eq_top` | `G.egirth = ⊤ ↔ G.IsAcyclic` | Links acyclicity with extended girth being top (`∞`). |
| `egirth_anti` | `Antitone (egirth)` | Monotonicity: if `G ≤ H`, then `egirth H ≤ egirth G`. |
| `exists_egirth_eq_length` | `(∃ a w, w.IsCycle ∧ G.egirth = w.length) ↔ ¬ G.IsAcyclic` | Ensures existence of a minimal cycle when not acyclic. |
| `three_le_egirth` | `3 ≤ G.egirth` | Every cycle has length ≥ 3 (no loops or multiedges). |
| `egirth_bot` | `egirth ⊥ = ⊤` | Empty graph has infinite extended girth (acyclic). |
| `girth_eq_zero` | `G.girth = 0 ↔ G.IsAcyclic` | Girth is zero iff graph is acyclic. |
| `three_le_girth` | `¬ G.IsAcyclic → 3 ≤ G.girth` | Non-acyclic graphs have girth ≥ 3. |
| `girth_anti` | `G ≤ G' ∧ ¬ G.IsAcyclic ⇒ G'.girth ≤ G.girth` | Monotonicity of girth under subgraph inclusion (for non-acyclic graphs). |
| `exists_girth_eq_length` | `(∃ a w, w.IsCycle ∧ G.girth = w.length) ↔ ¬ G.IsAcyclic` | Existence of a minimal-length cycle in non-acyclic graphs. |
| `girth_bot` | `girth ⊥ = 0` | Empty graph has girth 0. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `egirth_`, `girth_`: for lemmas about extended girth and girth respectively.
  - `is_...`: used in `IsAcyclic`, `IsCycle` — standard predicate naming.
- **Suffixes**:
  - `_eq_top`, `_eq_zero`: lemmas characterizing when girth/extended girth equals canonical values.
  - `_anti`: for antitone/monotonicity properties.
  - `_bot`: for behavior on the bottom (empty) graph.
- **Aliases**:
  - `⟨_, IsAcyclic.egirth_eq_top⟩`, `⟨_, IsAcyclic.girth_eq_zero⟩`: provide backward compatibility via `protected alias`.

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp_rw`: for rewriting using definitional equalities and lemmas (e.g., `simp [girth]`, `simp_rw [← egirth_eq_top]`).
- `rw`: for explicit rewriting using equivalences or equalities.
- `by_cases`: to split on decidability (e.g., acyclicity).
- `tauto`: for propositional logic reasoning (especially in `exists_girth_eq_length`).
- `exact`, `intro`, `apply`: basic proof construction.
- `omega`: for arithmetic reasoning (e.g., handling `3 ≤ G.girth` implications).
- `ciInf_mem _`: used to extract a minimizing witness from an infimum over a nonempty type.

---

#### **4. Proof Logic**

- **General Strategy**:
  - Prove properties about `egirth` first (as it lives in `ℕ∞`, which is better behaved for infima).
  - Derive corresponding `girth` properties via `toNat` and equivalence `girth = egirth.toNat`.
- **Typical Flow**:
  1. Use `simp` to unfold definitions (`egirth`, `girth`, `IsAcyclic`).
  2. Apply `iInf_mono`, `iInf₂_mono'`, or `ciInf_mem` to handle infima.
  3. Use `exists_egirth_eq_length` to extract minimal cycles when needed.
  4. Translate between `ℕ∞` and `ℕ` using `ENat.toNat_le_toNat`, `egirth_eq_top`, etc.
  5. For lower bounds (e.g., `3 ≤ girth`), use `Walk.IsCycle.three_le_length` and `omega`.
- **Induction**: Not used here — relies on lattice-theoretic properties of `ℕ∞` and `ENat`.

---

#### **5. Imports**

- `Mathlib.Combinatorics.SimpleGraph.Acyclic`: Provides `SimpleGraph.IsAcyclic`, `SimpleGraph.Walk.IsCycle`, and related infrastructure.
- `Mathlib.Data.ENat.Lattice`: Provides `ℕ∞` (extended naturals), its lattice structure, `iInf`, `toNat`, and arithmetic lemmas.

These imports define the foundational structures for reasoning about cycles, acyclicity, and extended natural numbers — essential for formalizing girth.

--- 

Let me know if you'd like a dependency graph or a summary of how this module fits into the broader `Mathlib` graph theory hierarchy.