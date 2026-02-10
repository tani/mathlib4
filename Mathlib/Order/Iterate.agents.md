### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**

| Name | Type / Signature | Purpose |
|------|------------------|---------|
| `seq_le_seq` | `Monotone f → n : ℕ → x 0 ≤ y 0 → (∀ k < n, x (k+1) ≤ f (x k)) → (∀ k < n, f (y k) ≤ y (k+1)) → x n ≤ y n` | Compares two sequences under a monotone function `f`, bounding growth from above/below. |
| `seq_pos_lt_seq_of_lt_of_le` | `Monotone f → 0 < n → x 0 ≤ y 0 → (∀ k < n, x (k+1) < f (x k)) → (∀ k < n, f (y k) ≤ y (k+1)) → x n < y n` | Strict inequality version: if `x` grows *strictly slower* than `f`, and `y` grows at least as fast, then `x n < y n`. |
| `seq_lt_seq_of_lt_of_le` | `Monotone f → n → x 0 < y 0 → (∀ k < n, x (k+1) < f (x k)) → (∀ k < n, f (y k) ≤ y (k+1)) → x n < y n` | Similar to above but assumes strict initial inequality. |
| `le_iterate_comp_of_le` | `Monotone f → h ∘ g ≤ f ∘ h → n → h ∘ g^[n] ≤ f^[n] ∘ h` | Compares `h(gⁿ(x))` with `fⁿ(h(x))` when `h ∘ g ≤ f ∘ h`. |
| `iterate_le_of_le` | `Monotone f → f ≤ g → n → f^[n] ≤ g^[n]` | Monotonicity of iteration: if `f ≤ g`, then `fⁿ ≤ gⁿ`. |
| `iterate_pos_lt_of_map_lt` | `Commute f g → Monotone f → StrictMono g → f x < g x → 0 < n → f^[n] x < g^[n] x` | If `f < g` at a point and they commute, then iterates preserve strict inequality for `n > 0`. |
| `iterate_pos_lt_iff_map_lt` | `Commute f g → Monotone f → StrictMono g → 0 < n → f^[n] x < g^[n] x ↔ f x < g x` | Equivalence of strict inequality at step 1 and step `n > 0`, under commutativity and monotonicity assumptions. |
| `iterate_pos_le_iff_map_le` | `Commute f g → Monotone f → StrictMono g → 0 < n → f^[n] x ≤ g^[n] x ↔ f x ≤ g x` | Non-strict version of the above. |
| `iterate_pos_eq_iff_map_eq` | `Commute f g → Monotone f → StrictMono g → 0 < n → f^[n] x = g^[n] x ↔ f x = g x` | Equality at step 1 iff equality at step `n > 0`. |
| `monotone_iterate_of_le_map` | `Monotone f → x ≤ f x → Monotone fun n ↦ f^[n] x` | If `x ≤ f x`, then the orbit `fⁿ(x)` is monotone increasing. |
| `strictMono_iterate_of_lt_map` | `StrictMono f → x < f x → StrictMono fun n ↦ f^[n] x` | Strict version of above. |

#### 2. **Naming Conventions**

- **Prefixes:**
  - `seq_`: Relates to sequences `x : ℕ → α`.
  - `iterate_`: Relates to function iteration `f^[n]`.
  - `le_`, `lt_`, `eq_`: Indicates inequality/equality direction.
  - `pos_`: Implies `0 < n` condition.
  - `of_`: Indicates assumptions (e.g., `of_le`, `of_lt`, `of_map_le`).
- **Suffixes:**
  - `_le`, `_lt`, `_eq`: Result type (non-strict/strict equality).
  - `_comp`: Involves composition (`h ∘ g`, etc.).
  - `_dual`: Dual version (often via `αᵒᵈ` or symmetry).
  - `'_`: Variant (e.g., `iterate_pos_lt_of_map_lt'` is dual of `iterate_pos_lt_of_map_lt`).
- **Structure:**
  - `theorem_name (hypotheses) : conclusion := proof`
  - Often uses `hf`, `hg`, `h` for hypotheses about monotonicity/commutativity.

#### 3. **Tactic Stack**

- **Core tactics:**
  - `induction`: Induction on natural numbers.
  - `refine`, `exact`, `assumption`: Proof construction.
  - `rw [iterate_succ_apply']`, `simp [iterate_succ', -iterate_succ, comp_apply, id_eq, le_refl]`: Simplification using definitions of iteration and composition.
  - `cases n`: Case analysis on natural number.
  - `rcases lt_trichotomy ... with (H | H | H)`: Trichotomy case split.
  - `simpa only [...] using ...`: Simplify using a congruence or equivalence.
  - `exacts [...]`: Apply multiple `exact` goals in sequence.

#### 4. **Proof Logic**

- **Inductive structure**: Most proofs proceed by induction on `n : ℕ`, often with careful handling of the base case (`n = 0`) and inductive step.
- **Case splitting**: For strict inequalities, `cases n` or `rcases lt_trichotomy` is used to separate equality, less-than, and greater-than cases.
- **Monotonicity exploitation**: When `f` is monotone, `x ≤ y ⇒ f x ≤ f y` is used repeatedly, especially in chaining inequalities via `trans`.
- **Dualization**: Many theorems have duals (e.g., `antitone`, `StrictAnti`) obtained via order dual (`αᵒᵈ`) or symmetry of `Commute`.
- **Chain of reasoning**:
  - Base case: `x 0 ≤ y 0`
  - Inductive step: Use `hx`, `hy`, and monotonicity of `f` to show `x (n+1) ≤ f(x n) ≤ f(y n) ≤ y (n+1)`
  - For strict inequalities: Use `hx` strict at step `n`, monotonicity to lift to `f(x n) ≤ f(y n)`, then `hy` to get `y (n+1)`.

#### 5. **Imports**

- `Mathlib.Logic.Function.Iterate`: Core definitions and lemmas about function iteration (`f^[n]`).
- `Mathlib.Order.Monotone.Basic`: Definitions and basic properties of monotone/strictly monotone/antitone functions and sequences.

---

This file forms a foundational toolkit for comparing iterates of monotone (and strictly monotone) functions, especially in settings where functions commute — crucial for applications like defining rotation numbers in circle dynamics.