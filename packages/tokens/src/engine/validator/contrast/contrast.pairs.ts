/**
 * contrast.pairs.ts
 *
 * @layer validator
 * @description Explicit semantic foreground/background pair registry for contrast checks.
 */

import type { SemanticContrastPair } from "./contrast.types"

export const WCAG_AA_NORMAL_TEXT_RATIO = 4.5

export const SEMANTIC_CONTRAST_PAIRS: SemanticContrastPair[] = [
  {
    id: "text-primary-on-base",
    label: "Primary text on base background",
    foregroundPath: "color.text.primary",
    backgroundPath: "color.background.base",
  },
  {
    id: "text-secondary-on-base",
    label: "Secondary text on base background",
    foregroundPath: "color.text.secondary",
    backgroundPath: "color.background.base",
  },
  {
    id: "text-primary-on-surface",
    label: "Primary text on surface background",
    foregroundPath: "color.text.primary",
    backgroundPath: "color.background.surface",
  },
  {
    id: "text-secondary-on-surface",
    label: "Secondary text on surface background",
    foregroundPath: "color.text.secondary",
    backgroundPath: "color.background.surface",
  },
  {
    id: "text-primary-on-subtle",
    label: "Primary text on subtle background",
    foregroundPath: "color.text.primary",
    backgroundPath: "color.background.subtle",
  },
  {
    id: "text-inverse-on-primary-action",
    label: "Inverse text on primary action background",
    foregroundPath: "color.text.inverse",
    backgroundPath: "action.primary.base",
  },
  {
    id: "feedback-info",
    label: "Info feedback foreground on background",
    foregroundPath: "color.feedback.info.foreground",
    backgroundPath: "color.feedback.info.background",
  },
  {
    id: "feedback-success",
    label: "Success feedback foreground on background",
    foregroundPath: "color.feedback.success.foreground",
    backgroundPath: "color.feedback.success.background",
  },
  {
    id: "feedback-warning",
    label: "Warning feedback foreground on background",
    foregroundPath: "color.feedback.warning.foreground",
    backgroundPath: "color.feedback.warning.background",
  },
  {
    id: "feedback-danger",
    label: "Danger feedback foreground on background",
    foregroundPath: "color.feedback.danger.foreground",
    backgroundPath: "color.feedback.danger.background",
  },
  {
    id: "text-primary-on-overlay",
    label: "Primary text on overlay background (composited over base)",
    foregroundPath: "color.text.primary",
    backgroundPath: "color.background.overlay",
  },
]
