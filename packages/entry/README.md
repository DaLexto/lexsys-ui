# lexsys

**Audience:** Users and contributors  
**Type:** Package reference

Entry point for the [Lexsys](https://github.com/DaLexto/lexsys-ui) CLI — registry-first React UI framework.

---

## Usage

```bash
npx lexsys@latest init
```

Scaffold a new project:

```bash
npx lexsys@latest create vite my-app
npx lexsys@latest create next my-app

# or run without arguments for guided setup
npx lexsys@latest create
```

Add components:

```bash
npx lexsys@latest add button
npx lexsys@latest add button dialog toast
```

All commands:

```bash
npx lexsys@latest --help
```

---

## All commands

| Command     | Alias    | Description                                       |
| ----------- | -------- | ------------------------------------------------- |
| `init`      | `create` | Initialize Lexsys or scaffold a framework starter |
| `add`       | `a`      | Install components into your project              |
| `update`    | `up`     | Update installed components                       |
| `list`      | `ls`     | List available registry items                     |
| `status`    | `st`     | Show installed component status                   |
| `uninstall` | `rm`     | Remove installed components                       |
| `doctor`    | `dr`     | Check local project setup                         |
| `registry`  | `reg`    | Inspect registry source and manifest              |
| `config`    | `cfg`    | Print or update Lexsys config                     |
| `version`   |          | Print CLI version                                 |
| `help`      |          | Show help                                         |

---

## How it works

This package is a thin entry point. All logic lives in [`@dalexto/lexsys-cli`](../cli/README.md).

## Links

- [Full documentation](../../docs/INDEX.md)
- [CLI reference](../../docs/reference/cli/CLI.md)
- [Registry](../../docs/reference/registry/REGISTRY.md)
