export const runHelp = (): void => {
  console.log(`
Neurex UI CLI

Usage
  neurex-ui <command> [options]
  neurex-ui add <component...>

Commands
  init                         Create neurex.config.json and default folders
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
  add
    --dry-run                  Preview files, dependencies, and install paths
    --no-fallback              Fail instead of falling back to local registry

  update
    --all                      Update all tracked components
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
  neurex-ui init
  neurex-ui add button
  neurex-ui add button --dry-run
  neurex-ui add button --cwd ./apps/web
  neurex-ui update button --dry-run
  neurex-ui update --all
  neurex-ui list --json
  neurex-ui config --set-registry-url https://example.com/registry.json
  neurex-ui registry --summary
  neurex-ui registry --remote --source
`)
}
