import type { ComponentTokenGroup } from "../types/index.js"
import { badgeComponentTokens } from "./badge.js"
import { buttonComponentTokens } from "./button.js"
import { cardComponentTokens } from "./card.js"

export { badgeComponentTokens } from "./badge.js"
export { buttonComponentTokens } from "./button.js"
export { cardComponentTokens } from "./card.js"

export const componentTokens: ComponentTokenGroup[] = [
  badgeComponentTokens,
  buttonComponentTokens,
  cardComponentTokens,
]
