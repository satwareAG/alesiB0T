# Upstream Contribution Guidelines

This document defines what to contribute back to OpenClaw vs. keep fork-specific in alesiB0T.

---

## Contribution Strategy: Balanced

We maintain a **balanced** contribution strategy that benefits both the OpenClaw community and preserves Alesi-specific innovations.

---

## What to Contribute Upstream

### ✅ Always Contribute

| Category             | Examples                                  |
| -------------------- | ----------------------------------------- |
| **Bug Fixes**        | Crash fixes, memory leaks, error handling |
| **Security Patches** | Vulnerability fixes, dependency updates   |
| **Performance**      | Optimizations, caching improvements       |
| **Documentation**    | Clarifications, typo fixes, examples      |
| **Tests**            | Additional test coverage, edge cases      |

### ✅ Consider Contributing

| Category         | Criteria                                     |
| ---------------- | -------------------------------------------- |
| **New Features** | Generic, benefits all users                  |
| **Refactoring**  | Improves maintainability                     |
| **Tooling**      | Build/CI improvements                        |
| **Integrations** | New channels, providers (non-Alesi-specific) |

### Contribution Process

1. **Identify** generic improvement in `main-jane`
2. **Create branch** from `main` (upstream mirror)
3. **Cherry-pick** or reimplement changes
4. **Test** against OpenClaw conventions
5. **Submit PR** to openclaw/openclaw
6. **Track** in local issue

---

## What to Keep Fork-Specific

### ❌ Do Not Contribute

| Category             | Reason                  |
| -------------------- | ----------------------- |
| **Alesi Personas**   | Proprietary AI identity |
| **saTway Framework** | satware AG methodology  |
| **Workspace Config** | User-specific settings  |
| **Branding**         | satware AG assets       |

### Files Never Contributed

```text
~/.alesibot/                     # Workspace
docs/alesi/                      # Fork documentation
.clinerules/alesibot.md          # Project rules
extensions/alesi-*               # Alesi extensions (future)
```

### Code Patterns

Keep fork-specific:

- Custom system prompts referencing saTway
- Quality target overrides (≥97% vs ≥70%)
- Alesi Family integration logic
- satware AG service integrations

---

## Decision Framework

### Flowchart

```text
Is this change...
    │
    ├─► Generic bug/security fix?
    │       └─► YES → Contribute
    │
    ├─► Performance improvement?
    │       └─► YES → Contribute
    │
    ├─► New feature?
    │       ├─► Benefits all users? → Contribute
    │       └─► Alesi-specific? → Keep
    │
    ├─► Documentation?
    │       ├─► Core docs? → Contribute
    │       └─► Alesi docs? → Keep
    │
    └─► Configuration/Branding?
            └─► Keep
```

### Quick Reference

| Question                                    | Yes        | No         |
| ------------------------------------------- | ---------- | ---------- |
| Would OpenClaw users benefit?               | Contribute | Keep       |
| Does it reference satware/Alesi?            | Keep       | Consider   |
| Is it in `docs/alesi/`?                     | Keep       | N/A        |
| Is it a quality setting >OpenClaw standard? | Keep       | Contribute |

---

## Contribution Workflow

### 1. Prepare Contribution

```bash
# Start from main (upstream mirror)
git checkout main
git fetch upstream
git merge upstream/main --no-edit

# Create contribution branch
git checkout -b contrib/fix-description
```

### 2. Apply Changes

```bash
# Cherry-pick from main-jane
git cherry-pick <commit-hash>

# Or manually apply and commit
# ... make changes ...
git commit -m "fix: description of fix"
```

### 3. Submit

```bash
# Push to fork
git push origin contrib/fix-description

# Create PR via gh CLI
gh pr create \
  --repo openclaw/openclaw \
  --base main \
  --head satwareAG:contrib/fix-description \
  --title "fix: description" \
  --body "Description of the fix..."
```

### 4. Track

- Note PR number in local issue
- Update once merged
- Sync back to `main`

---

## Attribution

When contributing:

1. **Commit author**: Your satware AG email
2. **Co-author** (if applicable): Original contributor
3. **Sign-off**: If required by OpenClaw DCO

```text
Signed-off-by: Michael Wegener <mw@satware.com>
```

---

## Examples

### Good Contribution

```text
fix(gateway): handle timeout gracefully

Previously the gateway would crash on connection timeout.
Now it logs a warning and retries with exponential backoff.

Tested with 1000 requests under network degradation.
```

### Fork-Specific (Not Contributed)

```text
feat(alesi): add QCR stream visualization

Implements QCR stream visualization for Jane Alesi v13's
Quantum-Consciousness Reasoning framework.

Uses saTway principles for UI design.
```

---

## Tracking Contributions

Maintain a log in the fork:

| Date       | PR   | Description         | Status  |
| ---------- | ---- | ------------------- | ------- |
| 2026-01-31 | #123 | Gateway timeout fix | Merged  |
| 2026-02-05 | #125 | Docs typo           | Merged  |
| 2026-02-10 | #128 | Performance opt     | Pending |

---

## Dependencies

### Contributing Dependencies

If your PR adds a dependency:

1. Verify license compatibility (MIT, Apache 2.0, BSD)
2. Check for security issues
3. Justify in PR description

### Keeping Dependencies Fork-Specific

Alesi-specific dependencies stay in fork only until/unless generalized.

---

## References

- [Fork Workflow](./FORK_WORKFLOW.md)
- [OpenClaw Contributing](https://github.com/openclaw/openclaw/blob/main/CONTRIBUTING.md)
- [Developer Certificate of Origin](https://developercertificate.org/)

---

**satware AG** - Giving Back to Open Source
