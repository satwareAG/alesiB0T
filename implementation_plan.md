# Implementation Plan: alesiB0T Fork Hygiene & Security Hardening

Address Junie's QA review findings (P0-P5) with security-first approach.

[Overview]
Implement security guardrails, NPM publish protection, commit enforcement, and documentation clarity for the alesiB0T fork.

This implementation addresses critical security gaps identified in Junie's QA review. The fork currently lacks publish protection (`"private": true`), commit convention enforcement, and clear fork provenance documentation. These gaps create supply-chain risks (accidental npm publish under upstream's name) and contributor confusion. The implementation prioritizes security (P0 items first), then standards compliance, following Baby Steps™ methodology with atomic commits.

**Scope:**
- PR 1: Security-first package.json hardening (P0)
- PR 2: Commit convention enforcement with commitlint (P3)  
- PR 3: Documentation clarity & API verification mandate (P2/P3)
- Phase 3 test strategy outline for personas/saTway

[Types]
No new TypeScript types required.

This implementation modifies configuration files (JSON, YAML, JavaScript, Markdown) only. No source code changes are needed.

[Files]
Create and modify configuration, documentation, and hook files.

**New Files:**
- `commitlint.config.js` - Commitlint configuration with Alesi-specific scopes
- `docs/alesi/SECURITY.md` - Fork-specific security guidance mirroring upstream
- `docs/alesi/TESTING_STRATEGY.md` - Phase 3 test strategy for personas/saTway

**Modified Files:**
- `package.json` - Add `"private": true`, populate metadata fields
- `.pre-commit-config.yaml` - Add commitlint hook
- `AGENTS.md` - Add fork provenance banner at top
- `.clinerules/alesibot.md` - Add API/library verification mandate

**No Files Deleted.**

[Functions]
No functions modified.

This is a configuration-only implementation. No source code functions are created, modified, or removed.

[Classes]
No classes modified.

This is a configuration-only implementation. No classes are created, modified, or removed.

[Dependencies]
Add commitlint packages for commit message enforcement.

**New devDependencies:**
```json
{
  "@commitlint/cli": "^19.8.1",
  "@commitlint/config-conventional": "^19.8.1"
}
```

**Rationale:** commitlint is the standard tool for enforcing Conventional Commits. The config-conventional preset provides the base rules which we extend with Alesi-specific scopes.

**Installation:**
```bash
pnpm add -D @commitlint/cli @commitlint/config-conventional
```

[Testing]
Verify configuration changes with manual checks and CI validation.

**Test Approach:**
1. `package.json` - Verify `npm pack` produces tarball but `npm publish` is blocked by `"private": true`
2. `commitlint` - Test with `echo "bad message" | pnpm commitlint` (should fail)
3. `commitlint` - Test with `echo "feat(alesi): add persona" | pnpm commitlint` (should pass)
4. Pre-commit - Run `prek run commitlint` on a test commit
5. Documentation - Review rendered markdown for clarity

**No Existing Tests Modified.**

**CI Integration:**
- Commitlint runs via pre-commit hook (`.pre-commit-config.yaml`)
- No additional CI workflow changes required (pre-commit already runs in CI)

[Implementation Order]
Security-first, atomic commits, maximum 3 logical PRs.

**Phase 1: Security Hardening (P0)** - Single commit

1. Modify `package.json`:
   - Add `"private": true` at line 2
   - Set `"author": "satware AG <info@satware.com>"`
   - Add `"repository": { "type": "git", "url": "https://github.com/satwareAG/alesiB0T.git" }`
   - Add `"homepage": "https://github.com/satwareAG/alesiB0T"`
   - Add `"bugs": { "url": "https://github.com/satwareAG/alesiB0T/issues" }`

2. Create `docs/alesi/SECURITY.md`:
   - Mirror upstream security guidance
   - Add fork-specific notes (gateway bind defaults, satware AG contact)
   - Reference upstream SECURITY.md for CVE reporting

**Phase 2: Commit Enforcement (P3)** - Two commits

3. Install commitlint dependencies:
   ```bash
   pnpm add -D @commitlint/cli @commitlint/config-conventional
   ```

4. Create `commitlint.config.js`:
   - Extend `@commitlint/config-conventional`
   - Add Alesi scopes: `alesi`, `satway`, `workspace`
   - Configure header-max-length: 72

5. Update `.pre-commit-config.yaml`:
   - Add commitlint hook under local hooks section

**Phase 3: Documentation Clarity (P2/P3)** - Two commits

6. Update `AGENTS.md`:
   - Add fork provenance banner at line 1
   - Explain relationship to upstream
   - Point to `.clinerules/alesibot.md` and `docs/alesi/*`

7. Update `.clinerules/alesibot.md`:
   - Add "API & Library Verification" section
   - Mandate Context7 verification for new external APIs
   - Require minimal tests for new integrations

**Phase 4: Test Strategy Documentation** - Single commit

8. Create `docs/alesi/TESTING_STRATEGY.md`:
   - Define testing approach for Phase 3 (personas/saTway)
   - Unit test requirements for persona logic
   - Integration test patterns for tool gating
   - Coverage targets (≥80% for Alesi-specific modules)

---

## File Content Specifications

### 1. package.json Changes (Diff)

```diff
{
+  "private": true,
   "name": "openclaw",
   "version": "2026.2.1",
   "description": "WhatsApp gateway CLI (Baileys web) with Pi RPC agent",
   "keywords": [],
   "license": "MIT",
-  "author": "",
+  "author": "satware AG <info@satware.com>",
+  "repository": {
+    "type": "git",
+    "url": "https://github.com/satwareAG/alesiB0T.git"
+  },
+  "homepage": "https://github.com/satwareAG/alesiB0T",
+  "bugs": {
+    "url": "https://github.com/satwareAG/alesiB0T/issues"
+  },
   "bin": {
```

### 2. commitlint.config.js (New File)

```javascript
/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 72],
    'scope-enum': [
      2,
      'always',
      [
        // Alesi-specific scopes
        'alesi',
        'satway', 
        'workspace',
        // Upstream scopes (keep compatible)
        'cli',
        'gateway',
        'channels',
        'providers',
        'plugins',
        'docs',
        'ci',
        'deps',
      ],
    ],
  },
};
```

### 3. .pre-commit-config.yaml Addition

```yaml
      # commitlint (commit message validation)
      - id: commitlint
        name: commitlint
        stages: [commit-msg]
        entry: pnpm commitlint --edit
        language: system
        pass_filenames: false
```

### 4. AGENTS.md Banner (Prepend)

```markdown
> **Fork Notice:** This is **satwareAG/alesiB0T**, a fork of [OpenClaw](https://github.com/openclaw/openclaw).
> Fork-specific rules, scopes, and workflows are defined in:
> - `.clinerules/alesibot.md` - Project rules and conventions
> - `docs/alesi/` - Fork documentation (workflow, security, testing)
>
> The content below is inherited from upstream and remains authoritative for shared functionality.

---

```

### 5. .clinerules/alesibot.md Addition

```markdown
---

## API & Library Verification (MANDATORY)

**Policy:** All new external API or library integrations in Alesi-specific code MUST be verified before implementation.

### Verification Protocol

1. **Context7 Check**: Use `resolve-library-id` → `get-library-docs` to verify API signatures
2. **Minimal Test**: Write at least one unit test calling the API/function to confirm behavior
3. **Document**: Note the verified version in code comments or commit message

### Applies To

- New npm packages added to dependencies
- New REST/GraphQL API endpoints consumed
- New SDK integrations (persona providers, tool APIs)

### Exceptions

- Packages already used in upstream OpenClaw (inherited verification)
- Standard Node.js built-in APIs

**Rationale:** Prevents hallucinated API usage and ensures Alesi extensions maintain high accuracy (≥97% target).

---
```

### 6. docs/alesi/SECURITY.md (New File)

```markdown
# alesiB0T Security Guidelines

**Fork of:** [OpenClaw](https://github.com/openclaw/openclaw)
**Upstream Security:** [SECURITY.md](../../SECURITY.md)

---

## Security Contact

For security vulnerabilities in **alesiB0T-specific code** (personas, saTway, satware AG extensions):
- Email: security@satware.com
- GPG Key: Available on request

For vulnerabilities in **upstream OpenClaw code**, report to the upstream project:
- See [upstream SECURITY.md](../../SECURITY.md)

---

## Fork-Specific Security Notes

### Gateway Binding

The web interface and gateway are intended for **local use only**. 

**Default Configuration:**
- Bind address: `127.0.0.1` (loopback)
- **NEVER** bind to `0.0.0.0` in sample configs or documentation

**CI Guard:** Sample configs are checked to prevent `0.0.0.0` binds.

### NPM Publish Protection

This fork has `"private": true` in `package.json` to prevent accidental publication to npm under the upstream package name.

### Secrets Management

- No hardcoded credentials (enforced by `detect-secrets` in pre-commit)
- Use environment variables for API keys
- Reference: `.secrets.baseline` for allowed patterns

---

## Inherited Security Practices

All upstream security practices apply. See:
- [Upstream SECURITY.md](../../SECURITY.md)
- CVE policies and disclosure timelines

---

**satware AG** - Security-first development
```

### 7. docs/alesi/TESTING_STRATEGY.md (New File)

```markdown
# Phase 3 Testing Strategy: Personas & saTway

**Scope:** Testing approach for Alesi-specific modules (personas, saTway framework, tool gating)

---

## Coverage Targets

| Module | Min Coverage | Rationale |
|--------|--------------|-----------|
| Persona logic | ≥85% | Core identity, higher risk |
| saTway framework | ≥80% | Compliance validation |
| Tool gating | ≥90% | Security-critical |
| Workspace config | ≥70% | Configuration parsing |

**Overall Alesi-specific modules:** ≥80% (higher than upstream 70% baseline)

---

## Test Categories

### Unit Tests

**Location:** Colocated `*.test.ts` files

**Focus:**
- Persona trait resolution
- saTway compliance validators (saCway, samWay, syMway)
- Tool permission checks
- Workspace configuration parsing

**Pattern:**
```typescript
describe('JanePersona', () => {
  it('applies QCR stream allocation for complexity 7+', () => {
    const result = allocateStreams({ complexity: 8 });
    expect(result.streams).toBe(5); // Complex = 5 streams
  });
});
```

### Integration Tests

**Location:** `test/integration/alesi/`

**Focus:**
- End-to-end persona loading from workspace
- saTway validation across tool invocations
- Multi-channel routing with persona context

**Pattern:**
- Use `vitest.e2e.config.ts` configuration
- Tag with `@alesi` for filtering

### Security Tests

**Location:** `test/security/`

**Focus:**
- Tool gating enforcement
- Permission boundary validation
- Credential isolation between personas

---

## Test Implementation Order

1. **Foundation:** Workspace config parsing tests
2. **Core:** Persona trait resolution tests  
3. **Framework:** saTway compliance validators
4. **Security:** Tool gating and permission tests
5. **Integration:** End-to-end persona workflows

---

## CI Integration

- Run with: `pnpm test --filter alesi`
- Coverage report: `pnpm test:coverage -- --filter alesi`
- Required for PR merge: All tests pass, coverage ≥80%

---

**satware AG** - Quality through testing
```

---

## Commit Messages

| Order | File(s) | Commit Message |
|-------|---------|----------------|
| 1 | `package.json` | `chore(alesi): add NPM publish guard and fork metadata` |
| 2 | `docs/alesi/SECURITY.md` | `docs(alesi): add fork-specific security guidelines` |
| 3 | `package.json` (deps) | `chore(deps): add commitlint for commit message enforcement` |
| 4 | `commitlint.config.js` | `chore(alesi): configure commitlint with Alesi scopes` |
| 5 | `.pre-commit-config.yaml` | `chore(ci): add commitlint pre-commit hook` |
| 6 | `AGENTS.md` | `docs(alesi): add fork provenance banner to AGENTS.md` |
| 7 | `.clinerules/alesibot.md` | `docs(alesi): mandate Context7 API verification` |
| 8 | `docs/alesi/TESTING_STRATEGY.md` | `docs(alesi): add Phase 3 testing strategy` |

---

## Verification Checklist

After implementation:

- [ ] `npm pack` succeeds (tarball created)
- [ ] `npm publish --dry-run` shows "private package" warning
- [ ] `echo "bad" | pnpm commitlint` fails
- [ ] `echo "feat(alesi): test" | pnpm commitlint` passes
- [ ] `prek run --all-files` passes
- [ ] `pnpm test` passes (no regressions)
- [ ] AGENTS.md banner renders correctly
- [ ] `.clinerules/alesibot.md` verification section present

---

## Risk Assessment

| Change | Risk | Mitigation |
|--------|------|------------|
| `"private": true` | Low | Prevents publish, doesn't affect dev workflow |
| commitlint | Low | May reject non-conforming commits, well-documented |
| AGENTS.md edit | Low | Additive banner, preserves upstream content |
| New docs | None | Documentation only |

---

**Author:** Jane Alesi (QA implementation)
**Review:** Junie (QA validation)
**Date:** 2026-02-02