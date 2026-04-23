---
name: project-build
description: 'Build, run, test, and lint the OctoCAT Supply Chain monorepo. Use when: building the project, starting dev servers, running tests, linting code, initializing the database, Docker deployment, troubleshooting build failures, checking prerequisites, or onboarding a new developer.'
argument-hint: 'Describe what you want to build or run (e.g. "start dev servers", "build API only", "run all tests")'
---

# OctoCAT Supply Chain — Build & Run

## Prerequisites

- **Node.js** >= 18
- **npm** (latest recommended)
- **Make** (GNU Make or compatible)
- **Docker / Podman** (optional, for containerized deployment)

Verify prerequisites:

```bash
node --version   # >= 18
npm --version
make --version
```

## Project Structure

| Component | Directory | Stack | Dev Port |
|-----------|-----------|-------|----------|
| API | `api/` | Express + TypeScript + SQLite (better-sqlite3) | 3000 |
| Frontend | `frontend/` | React + Vite + Tailwind | 5173 |

The Makefile auto-detects the backend type (`nodejs` or `python`) from the `api/` directory contents. Override with `BACKEND=python make <target>` if needed.

## Step-by-Step Procedures

### 1. Install Dependencies

```bash
make install
```

Or manually:

```bash
cd api && npm install
cd frontend && npm install
```

### 2. Initialize the Database

The database auto-seeds on `make dev`, but you can also run it manually:

```bash
make db-seed        # Runs migrations + seeds sample data
make db-init        # Runs migrations only (no seed)
```

Or from `api/`:

```bash
npm run db:seed:dev   # Dev mode (tsx, no compile needed)
npm run db:seed       # Production mode (requires build first)
```

**Environment variables:**

| Variable | Default | Description |
|----------|---------|-------------|
| `DB_FILE` | `api/data/app.db` | Path to SQLite database file |
| `DB_ENABLE_WAL` | `true` | Enable WAL journal mode |
| `DB_FOREIGN_KEYS` | `true` | Enforce foreign key constraints |
| `DB_TIMEOUT` | `30000` | Busy timeout in milliseconds |

### 3. Build

```bash
make build            # Build both API and Frontend
make build-api        # Build API only (tsc)
make build-frontend   # Build Frontend only (tsc -b && vite build)
```

**VS Code tasks** (Ctrl+Shift+B for default build):
- `Build All` — builds both
- `Build API` — API only
- `Build Frontend` — Frontend only

### 4. Run in Development Mode

```bash
make dev              # Start both API (port 3000) + Frontend (port 5173)
make dev-api          # API only with hot reload (tsx)
make dev-frontend     # Frontend only with Vite HMR
```

The API dev server uses `tsx` for TypeScript execution without a compile step. The frontend dev server uses Vite with HMR.

**VS Code debugger**: Select `Start API & Frontend` from the Debug panel (Ctrl+Shift+D) and press F5.

### 5. Run in Production Mode

```bash
make build            # Compile first
make start            # Start production API server (node dist/index.js)
```

### 6. Run Tests

```bash
make test             # Run all tests (API + Frontend)
make test-api         # API tests only (vitest)
make test-frontend    # Frontend tests only (vitest)
make test-e2e         # Playwright end-to-end tests
make test-coverage    # Tests with coverage report
```

### 7. Lint & Format

```bash
make lint             # Check lint errors (eslint)
make lint-fix         # Auto-fix lint issues
make format           # Format with prettier
```

### 8. Docker Deployment

```bash
docker-compose build          # Build images
docker-compose up             # Start containers (API:3000, Frontend:3001)
docker-compose up --build     # Build + start in one step
```

Docker maps: API → port 3000, Frontend → port 3001 (nginx).

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| `make: *** No rule to make target` | Wrong working directory | Run from repo root |
| `Cannot find module` on API start | Dependencies not installed or not built | `make install && make build` |
| CORS errors in browser | API port not public in Codespaces | Set port 3000 visibility to **public** |
| `SQLITE_BUSY` errors | DB locked by another process | Stop other dev servers; check `DB_TIMEOUT` |
| Frontend can't reach API | Wrong `VITE_API_URL` | Set `VITE_API_URL=http://localhost:3000` |
| `tsc` type errors | TypeScript version mismatch | `npm install` in the failing workspace |
| E2E tests fail | Dev servers not running | Start `make dev` before `make test-e2e` |

## Validation Checklist

After a build, verify:

- [ ] `make build` exits with code 0 (no TypeScript errors)
- [ ] `make lint` passes with no errors
- [ ] `make test` passes all unit tests
- [ ] `make dev` starts both servers and the frontend loads at http://localhost:5173
- [ ] API Swagger docs accessible at http://localhost:3000/api-docs
