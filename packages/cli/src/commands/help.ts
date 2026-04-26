export const runHelp = (): void => {
  console.log("Neurex UI CLI\n");

  console.log("Usage:");
  console.log("  neurex-ui <command> [options]\n");

  console.log("Commands:");
  console.log("  init                 Initialize Neurex UI in the current project");
  console.log("  add <component...>   Install one or more components");
  console.log("  update <component>   Check/update installed components");
  console.log("  update --all         Check/update all installed components");
  console.log("  list                 List available registry items");
  console.log("  doctor               Check local Neurex UI setup");
  console.log("  help                 Show this help message\n");

  console.log("Options:");
  console.log("  --dry-run            Show what would happen without writing changes");
  console.log("  --help               Show this help message");
};