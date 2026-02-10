### Technical Brief: Graph Metric Definitions in Lean 4 (`Mathlib.Combinatorics.SimpleGraph.Metric`)

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `edist` | `G.edist : V → V → ℕ∞` | Extended graph distance: length of shortest walk (or `⊤` if unreachable). |
| `dist` | `G.dist : V → V → ℕ` | Standard graph distance: `edist` cast to `ℕ`, with junk value `0` for unreachable pairs. |
| `edist_eq_sInf` | `G.edist u v = sInf (Set.range fun w ↦ w.length)` | Characterizes `edist` as infimum over walk lengths. |
| `edist_triangle` | `G.edist u w ≤ G.edist u v + G.edist v w` | Triangle inequality for extended distance. |
| `edist_comm` | `G.edist u v = G.edist v u` | Symmetry of extended distance. |
| `edist_eq_zero_iff` | `G.edist u v = 0 ↔ u = v` | Zero distance iff same vertex. |
| `edist_eq_one_iff_adj` | `G.edist u v = 1 ↔ G.Adj u v` | Unit distance iff adjacent vertices. |
| `edist_ne_top_iff_reachable` | `G.edist u v ≠ ⊤ ↔ G.Reachable u v` | Finite distance iff reachable. |
| `edist_anti` | `G ≤ G' ⇒ G'.edist u v ≤ G.edist u v` | Monotonicity w.r.t. subgraph inclusion. |
| `dist_eq_sInf` | `G.dist u v = sInf (Set.range Walk.length)` | `dist` as infimum over `ℕ`-valued walk lengths. |
| `dist_eq_zero_iff_eq_or_not_reachable` | `G.dist u v = 0 ↔ u = v ∨ ¬G.Reachable u v` | Zero `dist` iff equal or disconnected. |
| `dist_eq_one_iff_adj` | `G.dist u v = 1 ↔ G.Adj u v` | Unit `dist` iff adjacent (uses `ENat.toNat_eq_iff`). |
| `dist_triangle` | `G.Connected ⇒ G.dist u w ≤ G.dist u v + G.dist v w` | Triangle inequality for `dist`, requires connectivity. |
| `dist_comm` | `G.dist u v = G.dist v u` | Symmetry of `dist`. |
| `Walk.isPath_of_length_eq_dist` | `p.length = G.dist u v ⇒ p.IsPath` | Shortest walks are paths (no repeated vertices). |
| `exists_path_of_dist` | `G.Reachable u v ⇒ ∃ p : G.Path u v, p.length = G.dist u v` | Existence of a shortest *path* (not just walk). |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `edist_*`: Extended metric properties (`edist_triangle`, `edist_comm`, `edist_anti`).
  - `dist_*`: Natural-number metric properties (`dist_triangle`, `dist_comm`, `dist_anti`).
  - `exists_*`: Witness existence lemmas (`exists_walk_length_eq_edist`, `exists_path_of_dist`).
  - `reachable_*`, `connected_*`: Context-specific variants (e.g., `reachable.dist_eq_zero_iff`, `connected.dist_triangle`).

- **Suffixes**:
  - `_iff_*`: Biconditional characterizations (`edist_eq_zero_iff`, `dist_eq_one_iff_adj`).
  - `_of_*`: Conditional versions (`edist_pos_of_ne`, `dist_eq_zero_of_not_reachable`).
  - `_ne_*`: Negated equality cases (`edist_ne_top_iff_reachable`, `dist_ne_zero_iff_ne_and_reachable`).

- **Special**:
  - `bot`/`top`: For extremal graphs (`edist_bot`, `dist_top`).
  - `anti`: Antitone behavior under subgraph inclusion (`edist_anti`, `dist_anti`).

---

#### **3. Tactic Stack**

Frequently used tactics in proofs:
- `simp` / `simp_rw`: Simplification of definitions (`edist`, `dist`, `reachable`, `adj`).
- `rw`: Rewriting using lemmas (e.g., `← hp`, `edist_eq_sInf`).
- `cases`: Case analysis on `eq_or_ne x ⊤`, `h : u = v`, or `h : G.Reachable u v`.
- `exact` / `apply`: Direct proof steps (e.g., `edist_le _`).
- `push_neg`: Push negation inward (e.g., in `dist_ne_zero_iff_ne_and_reachable`).
- `decide`: For decidable propositions (e.g., `ENat.toNat_eq_iff`).
- `classical`: Classical reasoning for bypass properties.
- `rwa`: Rewrite + assumption (e.g., in `edist_bot_of_ne`).
- `by_cases`: Split on decidability (e.g., `u = v`).

---

#### **4. Proof Logic**

- **Induction/Case Analysis**: Proofs often split on:
  - Whether `edist u v = ⊤` (via `eq_or_ne`).
  - Whether vertices are equal (`u = v`).
  - Reachability (`reachable` vs `not_reachable`).
- **Constructive Witnesses**: Key lemmas construct walks/paths via:
  - `csInf_mem` / `sInf_mem` (for existence of minimizing walks).
  - `Walk.reverse`, `Walk.append`, `Walk.map` (for symmetry, triangle, monotonicity).
- **Path Normalization**: Shortest walks are paths via `bypass` operation:
  - Show `p.length ≤ p.bypass.length` ⇒ `p = p.bypass` ⇒ `p.IsPath`.
- **Connectivity Assumptions**: Triangle inequality for `dist` requires `G.Connected` to ensure finiteness.

---

#### **5. Imports**

- `Mathlib.Combinatorics.SimpleGraph.Path`: Core graph theory (walks, paths, reachability, connectivity).
- `Mathlib.Data.ENat.Lattice`: Extended naturals `ℕ∞` (for `edist`), with lattice structure and `iInf`/`sInf` operations.

---

#### **Summary**

This module formalizes graph-theoretic distance using two variants:
- **Extended metric** (`edist : V → V → ℕ∞`) handles disconnected graphs via `⊤`.
- **Standard metric** (`dist : V → V → ℕ`) uses `0` as junk value for unreachable pairs.

Key properties (symmetry, triangle inequality, adjacency characterization) are proven, with connectivity assumptions where needed for `dist`. The development leverages `ENat` for clean handling of infima and uses path normalization to ensure shortest walks are simple paths.