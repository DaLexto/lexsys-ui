import type { SidebarNavActiveOptions } from "./Sidebar.types.js"

const stripSidebarNavPath = (value: string): string => {
  const withoutQuery = value.split(/[?#]/u)[0] ?? value
  const withLeadingSlash = withoutQuery.startsWith("/")
    ? withoutQuery
    : `/${withoutQuery}`

  if (withLeadingSlash.length > 1 && withLeadingSlash.endsWith("/")) {
    return withLeadingSlash.slice(0, -1)
  }

  return withLeadingSlash
}

/**
 * Router-agnostic matcher for Sidebar `active` props.
 * Mirrors React Router `NavLink` `end` semantics without a router dependency.
 */
export const isSidebarNavActive = (
  pathname: string,
  href: string,
  options: SidebarNavActiveOptions = {},
): boolean => {
  const path = stripSidebarNavPath(pathname)
  const target = stripSidebarNavPath(href)
  const end = options.end ?? true

  if (end) {
    return path === target
  }

  return path === target || path.startsWith(`${target}/`)
}
