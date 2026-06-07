/**
 * DashboardShell.variants.ts
 *
 * Variant classes for the DashboardShell template.
 */

export const dashboardShellClasses = (): string => {
  return [
    "lex-dashboard-shell flex min-h-full flex-col",
    "bg-(--lex-dashboard-shell-root-background) text-(--lex-dashboard-shell-root-foreground)",
    "md:flex-row",
  ].join(" ")
}

export const dashboardShellSidebarClasses = (): string => {
  return "lex-dashboard-shell__sidebar shrink-0"
}

export const dashboardShellMainClasses = (): string => {
  return [
    "lex-dashboard-shell__main flex min-h-full flex-1 flex-col",
    "bg-(--lex-dashboard-shell-main-background)",
  ].join(" ")
}

export const dashboardShellHeaderClasses = (): string => {
  return [
    "lex-dashboard-shell__header border-b border-(--lex-dashboard-shell-header-border-color)",
    "bg-(--lex-dashboard-shell-header-background)",
    "px-(--lex-dashboard-shell-header-padding-x) py-(--lex-dashboard-shell-header-padding-y)",
  ].join(" ")
}

export const dashboardShellContentClasses = (): string => {
  return [
    "lex-dashboard-shell__content flex-1",
    "bg-(--lex-dashboard-shell-content-background)",
    "p-(--lex-dashboard-shell-content-padding)",
  ].join(" ")
}
