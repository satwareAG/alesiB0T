# alesiB0T Project Rules

**Fork:** satwareAG/alesiB0T  
**Upstream:** openclaw/openclaw  
**Working Branch:** main-jane  
**Primary Persona:** Jane Alesi v13

---

## Fork Identity

alesiB0T is an AGI framework for the Alesi Family of AIs, built on OpenClaw's foundation. It embodies saTway principles while maintaining upstream compatibility.

---

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Sync with upstream |
| `main-jane` | Working branch (Alesi development) |
| `feature/*` | Feature branches |
| `fix/*` | Bug fixes |

### Workflow

1. Develop on `main-jane` or feature branches
2. Sync upstream changes to `main` periodically
3. Merge upstream improvements into `main-jane`
4. Contribute generic improvements back to upstream

---

## Contribution Strategy (Balanced)

### Contribute to Upstream

- Generic bug fixes
- Documentation improvements
- Performance optimizations
- New features beneficial to all OpenClaw users

### Keep Fork-Specific

- Alesi persona files (IDENTITY.md, SOUL.md)
- saTway framework integration
- satware AG branding
- Custom extensions for Alesi Family

---

## Workspace Configuration

| Path | Purpose |
|------|---------|
| `~/.alesibot/` | Base directory |
| `~/.alesibot/workspace/` | Identity files |
| `~/.alesibot/workspace/IDENTITY.md` | Jane Alesi v13 persona |
| `~/.alesibot/workspace/SOUL.md` | saTway principles |
| `~/.alesibot/workspace/USER.md` | User profile |

---

## Quality Standards

### Inherited from OpenClaw

- TypeScript ESM, Node 22+
- Vitest testing (≥70% coverage)
- Oxlint/Oxfmt formatting
- pnpm package manager

### Alesi Additions

- saTway compliance (saCway + samWay + syMway)
- Jane v13 quality targets (≥97% accuracy)
- Baby Steps™ methodology
- Active Epistemic Integrity (AEI)

---

## Development Commands

```bash
# Build
pnpm build

# Test
pnpm test

# Lint
pnpm lint

# Format
pnpm format

# Sync upstream
git fetch upstream
git merge upstream/main --no-edit
```

---

## Commit Conventions

Follow OpenClaw conventions (Conventional Commits):

```text
<type>(<scope>): <description>

Types: feat, fix, docs, style, refactor, test, chore
```

### Alesi-Specific Scopes

- `alesi`: Alesi persona changes
- `satway`: saTway framework modifications
- `workspace`: Workspace configuration

---

## File Naming

| Type | Pattern |
|------|---------|
| Source | `kebab-case.ts` |
| Tests | `kebab-case.test.ts` |
| Docs | `UPPER_CASE.md` or `kebab-case.md` |
| Config | `dot-prefix` or `kebab-case.json` |

---

## Forbidden Patterns

- ❌ Direct commits to `main` (reserved for upstream sync)
- ❌ Hardcoded satware credentials in code
- ❌ OpenClaw trademark violations
- ❌ Breaking upstream compatibility without discussion

---

## Documentation Locations

| Topic | Location |
|-------|----------|
| Fork workflow | `docs/alesi/FORK_WORKFLOW.md` |
| Upstream contribution | `docs/alesi/UPSTREAM_CONTRIB.md` |
| Persona definition | `~/.alesibot/workspace/IDENTITY.md` |
| saTway principles | `~/.alesibot/workspace/SOUL.md` |

---

## Git Remotes

```bash
# Verify remotes
git remote -v

# Expected output:
# origin    https://github.com/satwareAG/alesiB0T.git
# upstream  https://github.com/openclaw/openclaw.git
```

---

**satware AG** - Alesi Family AGI Framework
