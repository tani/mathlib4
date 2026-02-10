**Technical Metadata Brief**

1. **Key Definitions & Theorems**  
   - `isStrictTotalOrder_of_linearOrder`:  
     - *Type*: `[LinearOrder α] → IsStrictTotalOrder α (· < ·)`  
     - *Purpose*: Constructs a `IsStrictTotalOrder` instance from a `LinearOrder`, using the strict order `<`.  
     - *Note*: Marked `@[deprecated]` since 2024-11-26; considered legacy (Lean 3 leftover), no longer needed.

2. **Naming Conventions**  
   - Prefix `is_`: Used for predicate-style typeclass instances (e.g., `isStrictTotalOrder_of_...`).  
   - Suffix `_of_`: Indicates derivation *from* another structure (e.g., `..._of_linearOrder`).  
   - Use of `· < ·` as a placeholder for the strict order relation in typeclass arguments.

3. **Tactic Stack**  
   - Minimal tactic usage:  
     - `lt_irrefl` (lemma, not a tactic)  
     - `lt_trichotomy` (lemma, not a tactic)  
   - No explicit tactics (`aesop`, `simp`, `ring`, etc.) appear in the proof term — the instance is defined by *direct application of lemmas*.

4. **Proof Logic**  
   - Instance definition is *non-constructive* in the sense of typeclass inference:  
     - Given `[LinearOrder α]`, the instance is filled by providing two fields:  
       - `irrefl := lt_irrefl`  
       - `trichotomous := lt_trichotomy`  
   - No induction, case analysis, or automation tactics are used — relies on pre-proved properties of `<` under `LinearOrder`.

5. **Imports**  
   - `Mathlib.Order.Defs.Unbundled`: Provides unbundled order relations (e.g., `IsStrictTotalOrder`).  
   - `Mathlib.Order.Defs.LinearOrder`: Defines `LinearOrder` and related lemmas (`lt_irrefl`, `lt_trichotomy`).  
   - *Scope*: Part of Mathlib’s *deprecated* order infrastructure; signals migration away from unbundled order typeclasses.

---  
*Prepared for domain-specific AI agent training — focused on Lean 4 formalization patterns, deprecation semantics, and order-theoretic typeclass usage.*