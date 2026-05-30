const COMMAND_HELP: Record<string, string> = {
  init: `
Usage
  lexsys init [framework] [directory]
  lexsys create [framework] [directory]

Frameworks
  vite [directory]    Scaffold a Vite React app and initialize Lexsys
  next [directory]    Scaffold a Next.js App Router app and initialize Lexsys

  Run without arguments for guided setup.

Options
  --help, -h          Show this help

Examples
  lexsys create
  lexsys create vite
  lexsys create vite my-app
  lexsys create next my-app
`,
  add: `
Usage
  lexsys add <component...>
  lexsys a <component...>

Options
  --dry-run, -d       Preview files, dependencies, and install paths
  --yes, -y           Auto-confirm safe prompts
  --no-fallback       Fail instead of falling back to local registry
  --cwd, -C <path>    Run from a different project directory
  --help, -h          Show this help

Examples
  lexsys add button
  lexsys add button dialog toast
  lexsys add button --dry-run
  lexsys add button --cwd ./apps/web
`,
  update: `
Usage
  lexsys update [component...]
  lexsys up [component...]

Options
  --all, -a           Update all tracked components
  --styles, -S        Update generated token/theme CSS files
  --utilities, -u     Update shared utility files
  --sync              Refresh tracked components even when templates already match
  --dry-run, -d       Preview update without writing files
  --force, -f         Write conflicted updates after creating backups
  --yes, -y           Auto-confirm safe prompts
  --no-fallback       Fail instead of falling back to local registry
  --cwd, -C <path>    Run from a different project directory
  --help, -h          Show this help

  Run without arguments for guided update picker.

Examples
  lexsys up
  lexsys up button
  lexsys up --all
  lexsys up --styles
  lexsys up --all --sync --utilities --styles
`,
  list: `
Usage
  lexsys list
  lexsys ls

Options
  --json, -j          Print registry items as JSON
  --no-fallback       Fail instead of falling back to local registry
  --help, -h          Show this help

Examples
  lexsys ls
  lexsys ls --json
`,
  status: `
Usage
  lexsys status
  lexsys st

Options
  --no-fallback       Fail instead of falling back to local registry
  --help, -h          Show this help
`,
  reset: `
Usage
  lexsys reset [component...]

Options
  --dry-run, -d       Preview reset without writing files
  --with-deps, -w     Also reset installed registry dependencies in the closure
  --no-fallback       Fail instead of falling back to local registry
  --cwd, -C <path>    Run from a different project directory
  --help, -h          Show this help

  Run without arguments for guided reset picker.

Examples
  lexsys reset button
  lexsys reset sidebar --with-deps
  lexsys reset button --dry-run
`,
  uninstall: `
Usage
  lexsys uninstall [component...]
  lexsys rm [component...]

Options
  --dry-run, -d       Preview uninstall without removing files
  --with-deps, -w     Also remove registry-owned shared dependencies
  --help, -h          Show this help

  Run without arguments for guided uninstall picker.

Examples
  lexsys rm button
  lexsys rm button --dry-run
`,
  doctor: `
Usage
  lexsys doctor
  lexsys dr

Options
  --no-fallback       Fail instead of falling back to local registry
  --help, -h          Show this help
`,
  registry: `
Usage
  lexsys registry
  lexsys reg

Options
  --summary, -s       Print a human-readable registry summary
  --source            Print effective registry source
  --local, -l         Read only the bundled local registry
  --remote, -r        Read only the configured remote registry
  --no-fallback       Disable local fallback for default resolution
  --help, -h          Show this help

Examples
  lexsys reg --summary
  lexsys reg --remote --source
`,
  config: `
Usage
  lexsys config
  lexsys cfg

Options
  --path, -p                 Print config file path
  --exists, -e               Check whether config exists
  --set-registry-url <url>   Set remote registry URL
  --clear-registry-url       Clear remote registry URL
  --help, -h                 Show this help

Examples
  lexsys cfg --path
  lexsys cfg --set-registry-url https://example.com/registry.json
`,
}

export const runHelpFor = (command: string): void => {
  const help = COMMAND_HELP[command]
  if (help) {
    console.log(help)
  } else {
    runHelp()
  }
}

export const runHelp = (): void => {
  console.log(`
Lexsys CLI

Usage
  lexsys <command> [options]

Scaffold
  init, create              Initialize Lexsys or scaffold a framework starter
                            Alias: create  |  Run without args for guided setup

Components
  add <component...>        Install components into your project       [alias: a]
  update [component...]     Update installed components                [alias: up]
  reset [component...]      Restore components from registry templates
  uninstall [component...]  Remove installed components                [alias: rm]

Inspect
  list                      List available registry items              [alias: ls]
  status                    Show installed component status            [alias: st]
  doctor                    Check local project setup                  [alias: dr]
  registry                  Inspect registry source and manifest       [alias: reg]
  config                    Print or update Lexsys config              [alias: cfg]

Meta
  version                   Print CLI version                          [-v]
  help                      Show this help                             [-h]

Global Options
  --cwd, -C <path>          Run from a different project directory
  --yes, -y                 Auto-confirm safe prompts where supported
  --no-fallback             Disable local registry fallback
  --help, -h                Show help
  --version, -v             Show CLI version

Run \`lexsys <command> --help\` for command-specific options.
`)
}
