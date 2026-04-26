export const runHelp = (): void => {
  console.log("Neurex UI CLI\n");

  console.log("Usage:");
  console.log("  neurex-ui <command> [options]\n");

  console.log("Commands:");
  console.log(
    "  init                 Initialize Neurex UI in the current project",
  );
  console.log("  add <component...>   Install one or more components");
  console.log("  update <component>   Check/update installed components");
  console.log("  update --all         Check/update all installed components");
  console.log("  list                 List available registry items");
  console.log("  list --json          List available registry items as JSON");
  console.log("  doctor               Check local Neurex UI setup");
  console.log("  config               Print active Neurex UI config");
  console.log("  config --path        Print active config file path");
  console.log("  status               Show installed component status");
  console.log("  registry             Print raw registry metadata for debugging");  
  console.log("  registry --summary   Print debug summary");
  console.log("  version              Show CLI version");
  console.log("  help                 Show this help message\n");

  console.log("Options:");
  console.log(
    "  --dry-run            Show what would happen without writing changes",
  );
  console.log("  --help               Show this help message");
};
