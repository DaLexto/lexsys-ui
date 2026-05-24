/**
 * DashboardShell.variants.ts
 *
 * Variant classes for the DashboardShell template.
 */

export const dashboardShellVariants = (): string => {
  return "lsys-dashboard-shell flex min-h-full flex-col bg-[var(--lsys-color-background-base)] text-[var(--lsys-color-text-primary)] md:flex-row"
}

export const dashboardShellSidebarVariants = (): string => {
  return "lsys-dashboard-shell__sidebar shrink-0"
}

export const dashboardShellMainVariants = (): string => {
  return "lsys-dashboard-shell__main flex min-h-full flex-1 flex-col bg-[var(--lsys-color-background-base)]"
}

export const dashboardShellHeaderVariants = (): string => {
  return "lsys-dashboard-shell__header border-b border-[var(--lsys-border-default)] bg-[var(--lsys-color-background-base)] px-[var(--lsys-space-4)] py-[var(--lsys-space-3)]"
}

export const dashboardShellContentVariants = (): string => {
  return "lsys-dashboard-shell__content flex-1 bg-[var(--lsys-color-background-base)] p-[var(--lsys-space-4)]"
}
