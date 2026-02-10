Here's a structured technical metadata brief extracted from the provided Lean 4 file:

---

### **1. Key Definitions & Theorems**

| Name | Type / Purpose |
|------|----------------|
| `fun_prop` | Tactic for proving function properties (e.g., `Continuous`, `Differentiable`, `Measurable`) by decomposing expressions into elementary components. |
| `@[fun_prop]` | Attribute used to register theorems and definitions for use by the `fun_prop` tactic. |
| `continuous_id`, `continuous_const`, `continuous_comp` | *Lambda theorems*: foundational theorems for handling identity, constants, and composition in function decomposition. |
| `continuous_fst`, `continuous_snd`, `continuous_prod_mk` | Lambda/function hybrid theorems for product types; essential for decomposing tuple-building expressions. |
| `continuous_neg`, `continuous_add` | *Function theorems*: prove continuity of basic operations (e.g., negation, addition); can be in *uncurried* or *compositional* form. |
| `continuous_clm_eval`, `continuous_clm_apply` | *Morphism theorems*: for bundled morphisms (e.g., continuous linear maps); handle coercion via `DFunLike.coe`. |
| `differentiable_continuous`, `contdiff_le` | *Transition theorems*: infer one function property from another (e.g., differentiability ⇒ continuity); used sparingly due to performance cost. |

---

### **2. Naming Conventions**

- **Prefixes / Suffixes**:
  - `continuous_`, `measurable_`, `differentiable_`, `contdiff_`: indicate the function property being proven.
  - `id`, `const`, `comp`, `fst`, `snd`, `prod_mk`: denote lambda calculus constructs.
  - `neg`, `add`, `mul`, `sub`, `inv`, `div`: denote algebraic operations.
  - `apply`, `eval`: denote function application or evaluation.
  - `clm_`, `lm_`: denote bundled morphisms (e.g., continuous linear maps).
  - `le`, `ge`, `lt`, `gt`: often used in transition theorems involving ordering (e.g., `contdiff_le`).

- **Form Indicators**:
  - *Uncurried form*: function takes arguments directly (e.g., `fun (x : X × X) => x.1 + x.2`).
  - *Compositional form*: function takes arguments as functions (e.g., `fun x => f x + g x`).

---

### **3. Tactic Stack**

Common tactics used in `fun_prop`-related proofs and setup:

| Tactic | Role |
|--------|------|
| `fun_prop` | Main tactic for decomposing and proving function properties. |
| `disch:=<tactic>` | Optional parameter to solve side goals (e.g., `disch:=assumption`, `disch:=aesop`). |
| `aesop` | Often used to discharge simple arithmetic or ordering goals (e.g., `2 ≤ ∞`). |
| `simp_rw`, `simp`, `rw` | Used in theorem proofs to normalize expressions before/after `fun_prop`. |
| `ring`, `linarith` | For algebraic simplifications in side goals. |
| `exact`, `assumption` | For trivial subgoals. |
| `trace.Meta.Tactic.fun_prop`, `trace.Meta.Tactic.fun_prop.attr` | Debugging options to inspect internal behavior. |

---

### **4. Proof Logic**

- **Decomposition Strategy**:
  - Recursively decompose the target function using *lambda theorems* (e.g., `continuous_comp`, `continuous_fst`, `continuous_snd`, `continuous_pi`) until reaching atomic operations (e.g., `Real.sin`, `+`, `-`).
  - For each atomic operation, apply registered *function theorems* (e.g., `continuous_sin`, `continuous_add`).
  - If atomic operation is a bundled morphism (e.g., `f : X →L Y`), apply *morphism theorems*.
  - If no function theorem is found, fail with diagnostic info.

- **Transition Handling**:
  - Only apply *transition theorems* when the function cannot be decomposed further (i.e., is "atomic" up to trivial compositions).
  - Limit transition depth by default (`maxTransitionDepth := 1`), configurable via `fun_prop (config:={maxTransitionDepth:=n})`.

- **Side Goal Handling**:
  - For `ContinuousAt`, `MeasurableAt`, etc., side goals (e.g., `y ≠ 0`) are discharged using the `disch:=` tactic.

---

### **5. Imports**

| Module | Purpose |
|--------|---------|
| `Mathlib.Tactic.FunProp.*` | Core infrastructure for the `fun_prop` tactic: state management, function data, theorems, elaboration, etc. |
| `Mathlib.Lean.Meta.RefinedDiscrTree` | Efficient indexing of function theorems by head symbol and argument positions. |
| *(Implicit)* `Mathlib.Data.*` | For specific function properties (e.g., `Real.sin`, `Complex.exp`) — not imported by default, must be added by user. |

---

### **Summary**

The `fun_prop` tactic is a highly structured, extensible proof automation tool for verifying function properties in analysis and measure theory. It relies on a disciplined taxonomy of theorems (lambda, function, morphism, transition), precise registration via the `@[fun_prop]` attribute, and efficient internal representation using discriminant trees. Its design prioritizes modularity, debuggability, and performance, with clear separation between core infrastructure and domain-specific theorems.

--- 

Let me know if you'd like a formalized summary in Lean or a diagram of the theorem classification.