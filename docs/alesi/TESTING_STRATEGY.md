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