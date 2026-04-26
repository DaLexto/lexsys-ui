export const runHelp = (): void => {
  console.log(`
Neurex UI CLI

Usage:
  neurex-ui <command> [options]

Commands:
  init                                      Initialize Neurex UI in the current project
  add <component...>                        Install one or more components
  update <component...>                     Check/update installed components
  --all                                     Update all installed components
  --dry-run                                 Preview update without writing files
  --force                                   Reserved for future conflict overwrite flow
  list                                      List available registry items
  list --json                               List registry items as JSON
  status                                    Show installed component status
  doctor                                    Check local Neurex UI setup
  config                                    Print active config
  config --path                             Print config file path
  config --exists                           Check if config exists
  config --set-registry-url <url>           Set registry URL
  config --clear-registry-url               Clear registry URL
  registry                                  Print raw registry metadata (debug)
  registry --summary                        Print registry summary (debug)
  uninstall <component>                     Remove tracked components
  version                                   Show CLI version
  help                                      Show this help message
        
Options:              
  --dry-run                                 Show what would happen without making changes
  --cwd <path>                              Run CLI in a different working directory
  --yes                                     Auto-confirm safe prompts where supported
  --force                                   Reserved for future conflict overwrite flow
  --help, -h                                Show help

Examples:
  neurex-ui init
  neurex-ui add button
  neurex-ui add button --yes
  neurex-ui add button dialog --dry-run
  neurex-ui update button --dry-run
  neurex-ui update button --yes
  neurex-ui update button --force
  neurex-ui update --all --dry-run
  neurex-ui list --json
  neurex-ui config --path
  neurex-ui uninstall button
  neurex-ui uninstall button --dry-run
`);
};
