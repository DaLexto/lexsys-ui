export const runHelp = (): void => {
  console.log(`
Neurex UI CLI

Usage:
  neurex-ui <command> [options]

Commands:
  init
    Initialize Neurex UI in the current project

  add <component...>
    Install one or more components

  update <component...>
    Check or update installed components
    --all         Update all installed components
    --dry-run     Preview update without writing files
    --force       Force update conflicted files after creating backups

  list
    List available registry items
    --json        Output as JSON

  status
    Show installed component status

  doctor
    Check local Neurex UI setup

  config
    Print active config
    --path                 Print config file path
    --exists               Check if config exists
    --set-registry-url     Set registry URL
    --clear-registry-url   Clear registry URL

  registry
    Debug registry
    --summary      Print registry summary
    --source       Print active registry source
    --local        Use bundled registry
    --remote       Force remote registry
    --no-fallback  Disable fallback to local registry

  uninstall <component>
    Remove tracked components

  version
    Show CLI version

  help
    Show this help message

Global Options:
  --dry-run       Show what would happen without making changes
  --cwd <path>    Run CLI in a different working directory
  --yes           Auto-confirm safe prompts
  --no-fallback   Disable local registry fallback where supported
  --help, -h      Show help

Examples:
  neurex-ui init
  neurex-ui add button
  neurex-ui add button --dry-run
  neurex-ui update button --dry-run
  neurex-ui update button --force
  neurex-ui update --all
  neurex-ui list --json
  neurex-ui status
  neurex-ui doctor
  neurex-ui registry --summary
  neurex-ui uninstall button
`)
}
