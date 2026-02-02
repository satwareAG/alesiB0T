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