export const runHelp = (): void => {
  console.log(`
Neurex CLI

Usage
  neurex <command> [options]
  neurex init vite [directory]
  neurex init next [directory]
  neurex add <component...>

Commands
  init                         Initialize Neurex or a framework starter
  add <component...>           Install components, utilities, styles, and deps
  update <component...>        Check or update tracked components
  list                         List available registry items
  status                       Show installed component status
  doctor                       Check local project setup
  config                       Print or update Neurex config
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
    vite [directory]           Scaffold a Vite React app and initialize Neurex
    next [directory]           Scaffold a Next.js App Router app and initialize Neurex
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
  neurex init
  neurex init vite
  neurex init vite my-app
  neurex init next
  neurex init next my-app
  neurex add button
  neurex add button --dry-run
  neurex add button --cwd ./apps/web
  neurex update button --dry-run
  neurex update --all
  neurex update --styles
  neurex update --utilities
  neurex update --all --sync --utilities --styles
  neurex list --json
  neurex config --set-registry-url https://example.com/registry.json
  neurex registry --summary
  neurex registry --remote --source
`)
}
