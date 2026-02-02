# alesiB0T Fork Workflow

This document describes the development workflow for the alesiB0T fork of OpenClaw.

---

## Branch Strategy

```text
upstream/main ──────────────────────────────────────▶
                        │ (periodic sync)
                        ▼
origin/main ────────────────────────────────────────▶ (upstream mirror)
                        │ (merge)
                        ▼
origin/main-jane ───────────────────────────────────▶ (working branch)
                   │         │
                   ▼         ▼
              feature/*   fix/*
```

| Branch      | Purpose            | Protected |
| ----------- | ------------------ | --------- |
| `main`      | Upstream sync only | Yes       |
| `main-jane` | Active development | No        |
| `feature/*` | New features       | No        |
| `fix/*`     | Bug fixes          | No        |

---

## Daily Development

### Start Work

```bash
# Ensure on working branch
git checkout main-jane
git pull origin main-jane
```

### Create Feature Branch

```bash
git checkout -b feature/my-feature main-jane
# ... develop ...
git push -u origin feature/my-feature
```

### Submit Changes

1. Push feature branch
2. Create PR to `main-jane`
3. Review and merge
4. Delete feature branch

---

## Upstream Sync Workflow

### 1. Fetch Upstream Changes

```bash
git fetch upstream
```

### 2. Update Local Main

```bash
git checkout main
git merge upstream/main --no-edit
git push origin main
```

### 3. Merge to Working Branch

```bash
git checkout main-jane
git merge main --no-edit
# Resolve conflicts if any
git push origin main-jane
```

### Sync Frequency

| Urgency        | Frequency      |
| -------------- | -------------- |
| Security fixes | Immediate      |
| Bug fixes      | Weekly         |
| Features       | Bi-weekly      |
| Refactoring    | Monthly review |

---

## Commit Conventions

Follow OpenClaw conventions (Conventional Commits):

```text
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

| Type       | Description        |
| ---------- | ------------------ |
| `feat`     | New feature        |
| `fix`      | Bug fix            |
| `docs`     | Documentation      |
| `style`    | Formatting         |
| `refactor` | Code restructuring |
| `test`     | Tests              |
| `chore`    | Build/tools        |

### Alesi-Specific Scopes

| Scope       | Use                     |
| ----------- | ----------------------- |
| `alesi`     | Persona-related changes |
| `satway`    | saTway framework        |
| `workspace` | Workspace configuration |

### Examples

```text
feat(alesi): add QCR stream visualization
fix(satway): correct AEI confidence threshold
docs(workspace): update IDENTITY.md format
chore: sync with upstream v2026.1.30
```

---

## Testing Requirements

### Before Merge

| Check  | Command       | Required |
| ------ | ------------- | -------- |
| Build  | `pnpm build`  | ✅       |
| Tests  | `pnpm test`   | ✅       |
| Lint   | `pnpm lint`   | ✅       |
| Format | `pnpm format` | ✅       |

### Coverage Targets

| Type        | Target      |
| ----------- | ----------- |
| Unit        | ≥70%        |
| Integration | Best effort |

---

## Conflict Resolution

### Priority

1. **Upstream logic** takes precedence for core functionality
2. **Alesi additions** preserved in dedicated files
3. **Configuration** merged carefully

### Common Conflicts

| File           | Resolution                            |
| -------------- | ------------------------------------- |
| `package.json` | Keep upstream version, review scripts |
| `README.md`    | Merge, preserve Alesi section         |
| `docs/*`       | Alesi docs in separate directory      |

---

## Quality Gates

### Pre-Push Checklist

- [ ] `pnpm build` passes
- [ ] `pnpm test` passes
- [ ] `pnpm lint` clean
- [ ] Commits follow conventions
- [ ] No hardcoded credentials

### PR Requirements

- [ ] Description explains changes
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes (or documented)

---

## Emergency Procedures

### Revert Bad Merge

```bash
git checkout main-jane
git revert -m 1 <merge-commit>
git push origin main-jane
```

### Reset to Upstream

```bash
git checkout main
git reset --hard upstream/main
git push --force origin main
```

⚠️ **Warning:** Force push only to `main` for upstream sync, never to `main-jane` without team agreement.

---

## References

- [OpenClaw Contributing Guide](https://github.com/openclaw/openclaw/blob/main/CONTRIBUTING.md)
- [Upstream Contribution Guide](./UPSTREAM_CONTRIB.md)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**satware AG** - alesiB0T Fork Workflow
