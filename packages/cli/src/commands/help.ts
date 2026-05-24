export const runHelp = (): void => {
  console.log(`
Lexsys CLI

Usage
  lexsys <command> [options]
  lexsys init vite [directory]
  lexsys init next [directory]
  lexsys add <component...>

Commands
  init                         Initialize Lexsys or a framework starter
  add <component...>           Install components, utilities, styles, and deps
  update <component...>        Check or update tracked components
  list                         List available registry items
  status                       Show installed component status
  doctor                       Check local project setup
  config                       Print or update Lexsys config
  registry                     Inspect registry source and manifest output
  uninstall <component...>     Show uninstall status for tracked components
  version                      Print CLI version
  help                         Show this help message

Global Options
  --cwd <path>                 Run from a different project directory
  --yes                        Auto-confirm safe prompts where supported
  --no-fallback                Disable local registry fallback where supported
  --help, -h                   Show help
  --version, -v                Show CLI version

Command Options
  init
    vite [directory]           Scaffold a Vite React app and initialize Lexsys
    next [directory]           Scaffold a Next.js App Router app and initialize Lexsys
                               Plain init offers a starter when no app is detected

  add
    --dry-run                  Preview files, dependencies, and install paths
    --no-fallback              Fail instead of falling back to local registry

  update
    --all                      Update all tracked components
    --styles                   Update generated token/theme CSS files
    --utilities                Update shared utility files (for example utils.ts)
    --sync                     Refresh tracked components even when versions match
    --dry-run                  Preview update without writing files
    --force                    Write conflicted updates after creating backups
    --yes                      Auto-confirm safe prompts
    --no-fallback              Fail instead of falling back to local registry

  list
    --json                     Print registry items as JSON
    --no-fallback              Fail instead of falling back to local registry

  config
    --path, -p                 Print config file path
    --exists, -e               Check whether config exists
    --set-registry-url <url>   Set remote registry URL
    --clear-registry-url       Clear remote registry URL

  registry
    --summary                  Print a human-readable registry summary
    --source                   Print effective registry source
    --local                    Read only the bundled local registry
    --remote                   Read only the configured remote registry
    --no-fallback              Disable local fallback for default resolution

  uninstall
    --dry-run                  Preview uninstall without removing files

Examples
  lexsys init
  lexsys init vite
  lexsys init vite my-app
  lexsys init next
  lexsys init next my-app
  lexsys add button
  lexsys add button --dry-run
  lexsys add button --cwd ./apps/web
  lexsys update button --dry-run
  lexsys update --all
  lexsys update --styles
  lexsys update --utilities
  lexsys update --all --sync --utilities --styles
  lexsys list --json
  lexsys config --set-registry-url https://example.com/registry.json
  lexsys registry --summary
  lexsys registry --remote --source
`)
}
