### Technical Metadata Brief

#### 1. **Key Definitions & Theorems**
- **`getAllFiles`**  
  - **Type**: `Bool → String → IO (Array System.FilePath)`  
  - **Purpose**: Recursively collects all `.lean` files under a given directory (`ml`), optionally using `git ls-files` (if `git = true`) or manual directory traversal (`walkDir`). Filters out non-existent files and the root module file (e.g., `Mathlib.lean`).

- **`getAllModulesSorted`**  
  - **Type**: `Bool → String → IO (Array String)`  
  - **Purpose**: Converts file paths from `getAllFiles` into Lean module names (e.g., `Mathlib.Algebra.Algebra.Basic`) using `moduleNameOfFileName`, then returns them sorted lexicographically.

- **`moduleNameOfFileName`** *(imported from `Lean.Util.Path`)*  
  - **Type**: `FilePath → Option String → IO String`  
  - **Purpose**: Converts a `.lean` file path to its corresponding Lean module name (e.g., `src/Algebra/Basic.lean` → `"Mathlib.Algebra.Basic"`), handling namespace prefixes.

#### 2. **Naming Conventions**
- **Prefixes**:
  - `get*`: Indicates IO actions that retrieve data (`getAllFiles`, `getAllModulesSorted`).
- **Suffixes**:
  - `Files`: Denotes raw file paths.
  - `Modules`: Denotes Lean module names (namespaced strings).
- **Variables**:
  - `ml`: Short for "module list" or "main library"; used as the base directory name (e.g., `"Mathlib"`).
  - `git`: Boolean flag controlling file discovery strategy.

#### 3. **Tactic & Proof-Like Logic Stack**
- **IO & Monadic Flow**:
  - Heavy use of `do`-notation for sequencing `IO` actions.
  - `filterMapM`, `mapM`, `qsort`, `erase`, `push`, `addExtension`, `splitOn`, `dropRightWhile`, `extension`, `pathExists`.
- **No proof tactics** (e.g., `rw`, `simp`, `induction`) — this is a *utility script*, not a theorem prover.

#### 4. **Proof Logic / Control Flow**
- **`getAllFiles`**:
  1. Construct root module path (`ml.lean`).
  2. If `git = true`:  
     - Run `git ls-files ml/*.lean`, parse output into `FilePath`s.
  3. Else:  
     - Recursively walk directory (`walkDir`), filter by `.lean` extension.
  4. Remove `ml.lean` (root file).
  5. Filter out non-existent files via `pathExists`.

- **`getAllModulesSorted`**:
  1. Call `getAllFiles`.
  2. Map each `FilePath` to its module name via `moduleNameOfFileName`.
  3. Sort resulting strings lexicographically.

#### 5. **Imports**
- **`Mathlib.Init`**: Standard Lean 4 prelude (likely for basic types, `IO`, `Array`, etc.).
- **`Lean.Util.Path`**: Provides `moduleNameOfFileName`, `walkDir`, and path utilities (`addExtension`, `extension`, `push`, `pathExists`).

#### Notes
- **Hard-coded dependency handling**: The `TODO` highlights that `getLeanLibs` (not shown here) has brittle logic for dependency selection — a known limitation in project-scanning tools.
- **Platform independence**: Sorting via `qsort (· < ·)` ensures consistent ordering across OSes (e.g., case sensitivity differences).

--- 

This module is a *build-time utility* for project introspection — critical for tooling like `lake`, documentation generators, or CI scripts that need to enumerate Lean sources.