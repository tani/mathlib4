### Technical Brief: `Extr.lean` — Local Maxima in Normed Spaces

---

#### **1. Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `IsMaxFilter` | `Filter α → α → Prop` | `IsMaxFilter g l c` means $g$ attains a maximum along filter $l$ at point $c$. |
| `IsMaxOn` | `Set α → α → Prop` | `IsMaxOn g s c` means $g$ attains a maximum on set $s$ at point $c$. |
| `IsLocalMaxOn` | `Set α → α → Prop` | `IsLocalMaxOn g s c` means $g$ has a local maximum on $s$ at $c$. |
| `IsLocalMax` | `α → Prop` | `IsLocalMax g c` means $g$ has a local maximum at $c$. |
| `SameRay ℝ x y` | `Prop` | $x, y \in E$ lie on the same ray over $\mathbb{R}$: $\exists r \ge 0,\ y = r \cdot x$. |
| `norm_add_sameRay` | `IsMaxFilter (norm ∘ f) l c → SameRay ℝ (f c) y → IsMaxFilter (fun x ↦ ‖f x + y‖) l c` | Core lemma: adding a vector on the same ray as $f(c)$ preserves maximality of the norm along a filter. |
| `norm_add_self` | `IsMaxFilter (norm ∘ f) l c → IsMaxFilter (fun x ↦ ‖f x + f c‖) l c` | Special case of `norm_add_sameRay` with $y = f(c)$. |
| `IsMaxOn.norm_add_sameRay`, `IsMaxOn.norm_add_self`, `IsLocalMaxOn.norm_add_sameRay`, `IsLocalMaxOn.norm_add_self`, `IsLocalMax.norm_add_sameRay`, `IsLocalMax.norm_add_self` | Analogous specializations of `norm_add_sameRay` / `norm_add_self` to `IsMaxOn`, `IsLocalMaxOn`, `IsLocalMax`. | Extend the core lemma to set-based and point-based local maxima. |

---

#### **2. Naming Conventions**

- **Prefixes**:
  - `IsMaxFilter`, `IsMaxOn`, `IsLocalMaxOn`, `IsLocalMax`: indicate the *type* of maximum.
  - `norm_`: indicates the function involves the norm (e.g., `norm_add_self`).
- **Suffixes**:
  - `_sameRay`: indicates the added vector lies on the same ray as $f(c)$.
  - `_self`: indicates the added vector is $f(c)$ itself.

---

#### **3. Tactic Stack**

- `grw`: used for rewriting using `gcongr`-style lemmas (e.g., `hy.norm_add`).
- `simp_rw`: implied via `grw` (Lean’s `grw` is a variant of `simp_rw` for congruence).
- `norm_add_le`: used as a lemma in the proof to apply triangle inequality.
- `dsimp`: simplifies definitions at goal and hypothesis.
- `mono`: monotonicity tactic for filters (used to lift inequalities along filters).

---

#### **4. Proof Logic**

- **Core idea**: Use the triangle inequality and the fact that for $y$ on the same ray as $f(c)$, equality holds in the triangle inequality at $c$:  
  $$
  \|f(c) + y\| = \|f(c)\| + \|y\|
  $$
  This ensures that adding $y$ does not decrease the norm at $c$, and the inequality $\|f(x) + y\| \le \|f(c) + y\|$ follows from maximality of $\|f(c)\|$ and ray alignment.

- **Proof pattern**:
  1. Assume `h : IsMaxFilter (norm ∘ f) l c`, i.e., $\|f(x)\| \le \|f(c)\|$ eventually along $l$.
  2. Use `hy : SameRay ℝ (f c) y` to get `hy.norm_add : ‖f x + y‖ = ‖f x‖ + ‖y‖` when $f(x)$ and $y$ are on the same ray — but more generally, `hy.norm_add` gives an inequality or equality used to compare $\|f(x)+y\|$ and $\|f(c)+y\|$.
  3. Apply `norm_add_le` and `hx : ‖f x‖ ≤ ‖f c‖` to conclude $\|f(x)+y\| \le \|f(c)+y\|$.
  4. Use `mono` to lift this pointwise inequality to the filter-level statement.

- **Specializations** follow by:
  - Interpreting `IsMaxOn`, `IsLocalMaxOn`, `IsLocalMax` as `IsMaxFilter` w.r.t. appropriate filters (`pure c $ s`, `neBot (𝓝[s] c)`, `𝓝 c`).
  - Reusing `norm_add_sameRay` / `norm_add_self`.

---

#### **5. Imports**

- `Mathlib.Analysis.Normed.Module.Ray`: defines `SameRay`, properties of rays in normed modules.
- `Mathlib.Topology.Order.LocalExtr`: defines `IsMaxFilter`, `IsMaxOn`, `IsLocalMaxOn`, `IsLocalMax`.

These imports provide:
- The notion of *same ray* and its algebraic/analytic consequences (e.g., `SameRay.norm_add`).
- The order-theoretic/topological framework for local extrema in filters and sets.

---

#### **6. Mermaid Diagrams**

##### **Dependency Graph (Theorems & Concepts)**

```mermaid
graph TD
  A[SameRay ℝ (f c) y] --> B[hy.norm_add]
  C[IsMaxFilter (norm ∘ f) l c] --> D[h.mono]
  B --> D
  D --> E[IsMaxFilter (fun x ↦ ‖f x + y‖) l c]

  E --> F[IsMaxOn.norm_add_sameRay]
  E --> G[IsLocalMaxOn.norm_add_sameRay]
  E --> H[IsLocalMax.norm_add_sameRay]

  C --> I[IsMaxFilter.norm_add_self]
  I --> J[IsMaxOn.norm_add_self]
  I --> K[IsLocalMaxOn.norm_add_self]
  I --> L[IsLocalMax.norm_add_self]
```

##### **Overview of File Structure**

```mermaid
flowchart LR
  subgraph Theory
    A[Ray Geometry] --> B[SameRay ℝ (f c) y]
    C[Filter Maxima] --> D[IsMaxFilter]
    D --> E[IsMaxOn]
    D --> F[IsLocalMaxOn]
    D --> G[IsLocalMax]
  end

  subgraph Core Lemma
    B --> H[IsMaxFilter.norm_add_sameRay]
    C --> H
  end

  subgraph Specializations
    H --> I[IsMaxOn.norm_add_sameRay]
    H --> J[IsLocalMaxOn.norm_add_sameRay]
    H --> K[IsLocalMax.norm_add_sameRay]
    C --> L[IsMaxFilter.norm_add_self]
    L --> M[IsMaxOn.norm_add_self]
    L --> N[IsLocalMaxOn.norm_add_self]
    L --> O[IsLocalMax.norm_add_self]
  end

  style A fill:#f9f,stroke:#333
  style C fill:#bbf,stroke:#333
  style H fill:#9f9,stroke:#333
```

---

#### **7. Summary**

This file formalizes a key geometric fact: *if the norm of a function achieves a maximum at a point, then adding any vector on the same ray as the function’s value at that point preserves the maximum*. This is used repeatedly in optimization and analysis in normed spaces, especially when dealing with directional behavior or radial extensions.

The structure is clean and modular: one core lemma (`norm_add_sameRay`) is proved for filters, then specialized to all standard notions of maxima (`IsMaxOn`, `IsLocalMaxOn`, `IsLocalMax`) and to the self-sum case (`y = f(c)`), using standard filter-theoretic reductions and triangle inequality reasoning.

--- 

Let me know if you'd like a formalized dependency graph for the entire `Mathlib.Analysis.Normed.Module` hierarchy or a proof sketch in natural deduction style.
