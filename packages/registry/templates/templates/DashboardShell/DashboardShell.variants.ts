/**
 * DashboardShell.variants.ts
 *
 * Variant classes for the DashboardShell template.
 */

export const dashboardShellClasses = (): string => {
  return "lex-dashboard-shell flex min-h-full flex-col bg-[var(--lex-color-background-base)] text-[var(--lex-color-text-primary)] md:flex-row"
}

export const dashboardShellSidebarClasses = (): string => {
  return "lex-dashboard-shell__sidebar shrink-0"
}

export const dashboardShellMainClasses = (): string => {
  return "lex-dashboard-shell__main flex min-h-full flex-1 flex-col bg-[var(--lex-color-background-base)]"
}

export const dashboardShellHeaderClasses = (): string => {
  return "lex-dashboard-shell__header border-b border-[var(--lex-border-default)] bg-[var(--lex-color-background-base)] px-[var(--lex-space-4)] py-[var(--lex-space-3)]"
}

export const dashboardShellContentClasses = (): string => {
  return "lex-dashboard-shell__content flex-1 bg-[var(--lex-color-background-base)] p-[var(--lex-space-4)]"
}
