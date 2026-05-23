/**
 * DashboardShell.variants.ts
 *
 * Variant classes for the DashboardShell template.
 */

export const dashboardShellVariants = (): string => {
  return "nx-dashboard-shell flex min-h-full bg-[var(--nx-color-background-base)]"
}

export const dashboardShellMainVariants = (): string => {
  return "nx-dashboard-shell__main flex min-h-full flex-1 flex-col"
}

export const dashboardShellHeaderVariants = (): string => {
  return "nx-dashboard-shell__header border-b border-[var(--nx-color-border-subtle)] px-[var(--nx-space-4)] py-[var(--nx-space-3)]"
}

export const dashboardShellContentVariants = (): string => {
  return "nx-dashboard-shell__content flex-1 p-[var(--nx-space-4)]"
}
