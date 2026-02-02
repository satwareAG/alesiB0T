# OpenClaw Codebase Analysis for alesiB0T

**Purpose:** Document extension points for Alesi Family AI integration  
**Last Updated:** 2026-02-02

---

## 1. Workspace Architecture

### 1.1 Default Workspace Location

The default workspace is resolved in `src/agents/workspace.ts`:

```typescript
// Default: ~/.openclaw/workspace
// With profile: ~/.openclaw/workspace-${OPENCLAW_PROFILE}
export function resolveDefaultAgentWorkspaceDir(env, homedir): string
```

### 1.2 alesiB0T Workspace

For alesiB0T, the workspace is located at:

```text
~/.alesibot/
├── workspace/
│   ├── IDENTITY.md   # Jane Alesi v13 persona
│   ├── SOUL.md       # saTway principles
│   └── USER.md       # User profile (Michael Wegener)
```

### 1.3 Bootstrap Files (Loaded into System Prompt)

| File | Purpose |
|------|---------|
| `AGENTS.md` | Agent behavior guidelines |
| `SOUL.md` | Core principles/philosophy |
| `TOOLS.md` | Available tools documentation |
| `IDENTITY.md` | Agent identity (name, emoji, theme, avatar) |
| `USER.md` | User preferences and context |
| `HEARTBEAT.md` | Periodic check-in prompts |
| `BOOTSTRAP.md` | Initial setup instructions |
| `MEMORY.md` | Persistent memory |

---

## 2. Identity System

### 2.1 Identity File Parsing (`src/agents/identity-file.ts`)

The `IDENTITY.md` file is parsed for these fields:

```typescript
export type AgentIdentityFile = {
  name?: string;      // Agent name (e.g., "Jane Alesi")
  emoji?: string;     // Signature emoji (e.g., "🧬")
  theme?: string;     // Theme description
  creature?: string;  // Agent persona type
  vibe?: string;      // Communication style
  avatar?: string;    // Workspace-relative path, URL, or data URI
};
```

### 2.2 Runtime Identity Resolution (`src/agents/identity.ts`)

Identity is resolved at runtime via:

```typescript
export function resolveAgentIdentity(cfg, agentId): IdentityConfig | undefined
export function resolveAckReaction(cfg, agentId): string
export function resolveIdentityNamePrefix(cfg, agentId): string | undefined
```

---

## 3. Configuration for alesiB0T

### 3.1 Agent Configuration Schema

Per `src/config/types.agents.ts`, configure workspace per-agent:

```json5
{
  "agents": {
    "defaults": {
      "workspace": "~/.alesibot/workspace"
    },
    "list": [
      {
        "id": "jane",
        "workspace": "~/.alesibot/workspace",
        "identity": {
          "name": "Jane Alesi",
          "emoji": "🧬",
          "theme": "Quantum-Consciousness AGI",
          "avatar": "avatars/jane.png"
        }
      }
    ]
  }
}
```

### 3.2 Key Configuration Paths

| Config Key | Purpose |
|------------|---------|
| `agents.defaults.workspace` | Default workspace for all agents |
| `agents.list[].workspace` | Per-agent workspace override |
| `agents.list[].identity` | Identity config (name, emoji, avatar, theme) |
| `agents.defaults.bootstrapMaxChars` | Max chars per bootstrap file (default: 20000) |

---

## 4. Bootstrap File Integration Flow

```text
1. loadWorkspaceBootstrapFiles(dir)
   └── Loads all *.md files from workspace

2. filterBootstrapFilesForSession(files, sessionKey)
   └── Filters files for current session (subagents get limited set)

3. applyBootstrapHookOverrides(params)
   └── Applies hook-based content modifications

4. buildBootstrapContextFiles(files, { maxChars, warn })
   └── Converts to EmbeddedContextFile objects

5. System Prompt Assembly
   └── Bootstrap files become context in system prompt
```

---

## 5. Extension Points for alesiB0T

### 5.1 Workspace Files (Primary)

**Location:** `~/.alesibot/workspace/`

These files are directly injected into the system prompt:

- **IDENTITY.md**: Define Jane Alesi v13 persona
- **SOUL.md**: Define saTway principles (saCway + samWay + syMway)
- **USER.md**: Define user context and preferences
- **TOOLS.md**: Custom tool guidance
- **AGENTS.md**: Behavior guidelines

### 5.2 Identity Config (Secondary)

**Location:** OpenClaw config (`~/.openclaw/config.json` or per-project)

Configure identity fields that propagate to:
- Message prefixes
- Ack reactions (emoji)
- Avatar display

### 5.3 Hooks (Advanced)

**Location:** `src/agents/bootstrap-hooks.ts`

Hooks can modify bootstrap file content dynamically:
- `applyBootstrapHookOverrides()` processes hooks before injection

---

## 6. Recommended Configuration for alesiB0T

### 6.1 Config File (`~/.alesibot/config.json`)

```json
{
  "agents": {
    "defaults": {
      "workspace": "~/.alesibot/workspace",
      "bootstrapMaxChars": 25000
    },
    "list": [
      {
        "id": "main",
        "workspace": "~/.alesibot/workspace",
        "identity": {
          "name": "Jane Alesi",
          "emoji": "🧬",
          "theme": "Quantum-Consciousness AGI"
        }
      }
    ]
  }
}
```

### 6.2 Running with alesiB0T Workspace

```bash
# Option 1: Set profile environment variable
export OPENCLAW_PROFILE=alesibot
# Then workspace resolves to: ~/.openclaw/workspace-alesibot

# Option 2: Use config file with explicit workspace path
openclaw --config ~/.alesibot/config.json agent run

# Option 3: Per-agent configuration in main config
openclaw config set agents.list.jane.workspace ~/.alesibot/workspace
```

---

## 7. Files Status

| File | Status | Content |
|------|--------|---------|
| `~/.alesibot/workspace/IDENTITY.md` | ✅ Complete | Jane Alesi v13 persona |
| `~/.alesibot/workspace/SOUL.md` | ✅ Complete | saTway principles |
| `~/.alesibot/workspace/USER.md` | ✅ Complete | Michael Wegener profile |
| `~/.alesibot/workspace/TOOLS.md` | ✅ Complete | Tool discipline guidelines |
| `~/.alesibot/workspace/AGENTS.md` | ✅ Complete | Agent behavior guidelines |
| `~/.alesibot/config.json` | ✅ Complete | OpenClaw configuration |

---

## 8. Next Steps

1. ~~**Create missing workspace files** (TOOLS.md, AGENTS.md)~~ ✅ Done
2. ~~**Create alesiB0T config** at `~/.alesibot/config.json`~~ ✅ Done
3. **Test integration** with OpenClaw CLI
4. **Consider upstream contribution** of generic improvements
5. **Add avatar** for Jane Alesi (optional)
6. **Create HEARTBEAT.md** for periodic check-in prompts (optional)

---

**satware AG** - alesiB0T AGI Framework