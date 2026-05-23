/**
 * DashboardShell.variants.ts
 *
 * Variant classes for the DashboardShell template.
 */

export const dashboardShellVariants = (): string => {
  return "nx-dashboard-shell flex min-h-full flex-col bg-[var(--nx-color-background-base)] text-[var(--nx-color-text-primary)] md:flex-row"
}

export const dashboardShellMainVariants = (): string => {
  return "nx-dashboard-shell__main flex min-h-full flex-1 flex-col bg-[var(--nx-color-background-base)]"
}

export const dashboardShellHeaderVariants = (): string => {
  return "nx-dashboard-shell__header border-b border-[var(--nx-border-default)] bg-[var(--nx-color-background-base)] px-[var(--nx-space-4)] py-[var(--nx-space-3)]"
}

export const dashboardShellContentVariants = (): string => {
  return "nx-dashboard-shell__content flex-1 bg-[var(--nx-color-background-base)] p-[var(--nx-space-4)]"
}
