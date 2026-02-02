# Next.js + Xata + Claude Code Starter

A production-ready starter for building AI apps with Next.js, Xata and Claude Code.

## Features

- **Zero-downtime migrations** via pgroll
- **Instant database branches** for isolated development
- **Anonymized production cloning** for debugging with real data
- **Claude Code commands** for agentic database workflows

## Prerequisites

- Node.js 18+
- A [Xata account](https://console.xata.io)
- [Xata CLI](https://xata.io/documentation/cli) installed

## Quick start

### 1. Clone and install

```bash
git clone https://github.com/xataio/nextjs-claude-code-starter
cd nextjs-claude-code-starter
npm install
```

### 2. Install Xata CLI

```bash
curl -fsSL https://xata.io/install.sh | bash
export PATH="$HOME/.config/xata/bin:$PATH"
```

### 3. Connect to Xata

```bash
xata auth login
xata init
```

Follow the prompts to select your organization, project and branch.

### 4. Set up environment

```bash
xata branch url
# Copy the connection string
cp .env.example .env.local
# Paste the connection string as DATABASE_URL
```

### 5. Run migrations

```bash
xata roll start migrations/001_create_users.yaml
xata roll complete
```

### 6. Start the app

```bash
npm run dev
```

## Claude Code commands

This starter includes Claude Code commands for Xata workflows:

| Command | Description |
|---------|-------------|
| `/project:setup` | Connect to Xata and configure the project |
| `/project:branch-create` | Create an isolated database branch |
| `/project:migration-start` | Start a zero-downtime migration |
| `/project:migration-complete` | Complete an ongoing migration |
| `/project:migration-rollback` | Roll back a failed migration |
| `/project:clone-production` | Clone production with PII anonymization |

## Project structure

```
.
├── .claude/commands/     # Claude Code workflow commands
├── migrations/           # pgroll migration files
├── src/
│   ├── app/             # Next.js app router
│   └── lib/             # Database utilities
├── .env.example
└── package.json
```

## Xata CLI reference

| Command | What it does |
|---------|--------------|
| `xata auth login` | Authenticate |
| `xata init` | Link project to folder |
| `xata branch create --name <name>` | Create isolated branch |
| `xata branch url [branch]` | Get connection string |
| `xata roll start <file>` | Begin expand phase |
| `xata roll complete` | Contract phase |
| `xata roll rollback` | Undo if needed |
| `xata clone start --source-url <url>` | Clone with anonymization |

## Learn more

- [Xata Documentation](https://xata.io/documentation)
- [pgroll on GitHub](https://github.com/xataio/pgroll)
- [Data Anonymization](https://xata.io/documentation/core-concepts/anonymization)

## License

MIT
