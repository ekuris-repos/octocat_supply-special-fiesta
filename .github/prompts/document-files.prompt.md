---
description: "Document files: use to generate concise documentation for files or folders in the repo."
name: "Document Files"
---
Task: Given a file path or folder in this repository, generate a short, structured documentation entry that includes:

- Purpose: one-sentence summary of the file/folder's responsibility.
- Key exports/types: list of exported functions, classes, or interfaces.
- Dependencies: other files/modules it interacts with (up to 5).
- Usage example: 1-2 lines showing how to call or import the primary export.
- Notes: important design patterns, caveats, or related migration/docs links.

Input: Provide a path (file or folder) relative to the repository root. Example: `api/src/repositories/suppliersRepo.ts` or `frontend/src/components`.

Output format (Markdown):

```
### [path]

- Purpose: ...
- Key exports/types:
  - `ExportName()` — description
- Dependencies:
  - `path/to/file` — reason
- Usage example:
  ```ts
  // one-line example
  ```
- Notes:
  - design pattern, links
```

When uncertain about details, clearly mark them as "(needs verification)" and suggest the command to open the file, e.g., `#tool:read`.
