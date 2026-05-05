import type { SemanticTokenGroup } from "../types"

export const typographySemantics: SemanticTokenGroup = {
  name: "typography",

  family: {
    sans: { value: "{font-family.sans}" },
    mono: { value: "{font-family.mono}" },
  },

  body: {
    sm: {
      fontSize: { value: "{font-size.sm}" },
      fontWeight: { value: "{font-weight.normal}" },
      lineHeight: { value: "{line-height.normal}" },
      letterSpacing: { value: "{letter-spacing.normal}" },
    },
    md: {
      fontSize: { value: "{font-size.base}" },
      fontWeight: { value: "{font-weight.normal}" },
      lineHeight: { value: "{line-height.normal}" },
      letterSpacing: { value: "{letter-spacing.normal}" },
    },
    lg: {
      fontSize: { value: "{font-size.lg}" },
      fontWeight: { value: "{font-weight.normal}" },
      lineHeight: { value: "{line-height.relaxed}" },
      letterSpacing: { value: "{letter-spacing.normal}" },
    },
  },

  heading: {
    sm: {
      fontSize: { value: "{font-size.lg}" },
      fontWeight: { value: "{font-weight.semibold}" },
      lineHeight: { value: "{line-height.tight}" },
      letterSpacing: { value: "{letter-spacing.tight}" },
    },
    md: {
      fontSize: { value: "{font-size.xl}" },
      fontWeight: { value: "{font-weight.semibold}" },
      lineHeight: { value: "{line-height.tight}" },
      letterSpacing: { value: "{letter-spacing.tight}" },
    },
    lg: {
      fontSize: { value: "{font-size.2xl}" },
      fontWeight: { value: "{font-weight.bold}" },
      lineHeight: { value: "{line-height.tight}" },
      letterSpacing: { value: "{letter-spacing.tight}" },
    },
  },

  control: {
    xs: {
      fontSize: { value: "{font-size.xs}" },
      fontWeight: { value: "{font-weight.medium}" },
      lineHeight: { value: "{line-height.none}" },
      letterSpacing: { value: "{letter-spacing.normal}" },
    },
    sm: {
      fontSize: { value: "{font-size.sm}" },
      fontWeight: { value: "{font-weight.medium}" },
      lineHeight: { value: "{line-height.none}" },
      letterSpacing: { value: "{letter-spacing.normal}" },
    },
    md: {
      fontSize: { value: "{font-size.sm}" },
      fontWeight: { value: "{font-weight.medium}" },
      lineHeight: { value: "{line-height.none}" },
      letterSpacing: { value: "{letter-spacing.normal}" },
    },
    lg: {
      fontSize: { value: "{font-size.base}" },
      fontWeight: { value: "{font-weight.medium}" },
      lineHeight: { value: "{line-height.none}" },
      letterSpacing: { value: "{letter-spacing.normal}" },
    },
    xl: {
      fontSize: { value: "{font-size.base}" },
      fontWeight: { value: "{font-weight.medium}" },
      lineHeight: { value: "{line-height.none}" },
      letterSpacing: { value: "{letter-spacing.normal}" },
    },
  },

  label: {
    sm: {
      fontSize: { value: "{font-size.xs}" },
      fontWeight: { value: "{font-weight.medium}" },
      lineHeight: { value: "{line-height.tight}" },
      letterSpacing: { value: "{letter-spacing.normal}" },
    },
    md: {
      fontSize: { value: "{font-size.sm}" },
      fontWeight: { value: "{font-weight.medium}" },
      lineHeight: { value: "{line-height.tight}" },
      letterSpacing: { value: "{letter-spacing.normal}" },
    },
  },
}
