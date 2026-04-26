export const runHelp = (): void => {
  console.log(`
Neurex UI CLI

Usage:
  neurex-ui <command> [options]

Commands:
  init                 Initialize Neurex UI in the current project
  add <component...>   Install one or more components
  update <component>   Check/update installed components
  update --all         Check/update all installed components
  update --dry-run     Preview update without writing files
  list                 List available registry items
  list --json          List registry items as JSON
  status               Show installed component status
  doctor               Check local Neurex UI setup
  config               Print active config
  config --path        Print config file path
  config --exists      Check if config exists
  registry             Print raw registry metadata (debug)
  registry --summary   Print registry summary (debug)
  version              Show CLI version
  help                 Show this help message

Options:
  --dry-run            Show what would happen without making changes
  --force              Reserved for future conflict overwrite flow
  --help, -h           Show help

Examples:
  neurex-ui init
  neurex-ui add button
  neurex-ui add button dialog --dry-run
  neurex-ui update button --dry-run
  neurex-ui update --all
  neurex-ui list --json
  neurex-ui config --path
`);
};