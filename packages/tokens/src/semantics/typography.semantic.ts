import type { SemanticTokenGroup } from "../types"

export const typographySemantics: SemanticTokenGroup = {
  name: "typography",

  family: {
    sans: { $value: "{font-family.sans}" },
    serif: { $value: "{font-family.serif}" },
    mono: { $value: "{font-family.mono}" },
  },

  body: {
    xs: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.xs}" },
      fontWeight: { $value: "{font-weight.normal}" },
      lineHeight: { $value: "{line-height.4}" },
      letterSpacing: { $value: "{letter-spacing.normal}" },
    },
    sm: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.sm}" },
      fontWeight: { $value: "{font-weight.normal}" },
      lineHeight: { $value: "{line-height.5}" },
      letterSpacing: { $value: "{letter-spacing.normal}" },
    },
    md: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.base}" },
      fontWeight: { $value: "{font-weight.normal}" },
      lineHeight: { $value: "{line-height.6}" },
      letterSpacing: { $value: "{letter-spacing.normal}" },
    },
    lg: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.lg}" },
      fontWeight: { $value: "{font-weight.normal}" },
      lineHeight: { $value: "{line-height.7}" },
      letterSpacing: { $value: "{letter-spacing.normal}" },
    },
    xl: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.xl}" },
      fontWeight: { $value: "{font-weight.normal}" },
      lineHeight: { $value: "{line-height.8}" },
      letterSpacing: { $value: "{letter-spacing.normal}" },
    },
  },

  heading: {
    xs: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.base}" },
      fontWeight: { $value: "{font-weight.semibold}" },
      lineHeight: { $value: "{line-height.6}" },
      letterSpacing: { $value: "{letter-spacing.tight}" },
    },
    sm: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.lg}" },
      fontWeight: { $value: "{font-weight.semibold}" },
      lineHeight: { $value: "{line-height.7}" },
      letterSpacing: { $value: "{letter-spacing.tight}" },
    },
    md: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.xl}" },
      fontWeight: { $value: "{font-weight.semibold}" },
      lineHeight: { $value: "{line-height.7}" },
      letterSpacing: { $value: "{letter-spacing.tight}" },
    },
    lg: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.2xl}" },
      fontWeight: { $value: "{font-weight.bold}" },
      lineHeight: { $value: "{line-height.8}" },
      letterSpacing: { $value: "{letter-spacing.tight}" },
    },
    xl: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.3xl}" },
      fontWeight: { $value: "{font-weight.bold}" },
      lineHeight: { $value: "{line-height.9}" },
      letterSpacing: { $value: "{letter-spacing.tight}" },
    },
    "2xl": {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.4xl}" },
      fontWeight: { $value: "{font-weight.bold}" },
      lineHeight: { $value: "{line-height.10}" },
      letterSpacing: { $value: "{letter-spacing.tight}" },
    },
  },

  display: {
    sm: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.5xl}" },
      fontWeight: { $value: "{font-weight.bold}" },
      lineHeight: { $value: "{line-height.none}" },
      letterSpacing: { $value: "{letter-spacing.tight}" },
    },
    md: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.6xl}" },
      fontWeight: { $value: "{font-weight.bold}" },
      lineHeight: { $value: "{line-height.none}" },
      letterSpacing: { $value: "{letter-spacing.tighter}" },
    },
    lg: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.7xl}" },
      fontWeight: { $value: "{font-weight.extrabold}" },
      lineHeight: { $value: "{line-height.none}" },
      letterSpacing: { $value: "{letter-spacing.tighter}" },
    },
  },

  label: {
    xs: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.xs}" },
      fontWeight: { $value: "{font-weight.medium}" },
      lineHeight: { $value: "{line-height.4}" },
      letterSpacing: { $value: "{letter-spacing.normal}" },
    },
    sm: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.sm}" },
      fontWeight: { $value: "{font-weight.medium}" },
      lineHeight: { $value: "{line-height.5}" },
      letterSpacing: { $value: "{letter-spacing.normal}" },
    },
    md: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.base}" },
      fontWeight: { $value: "{font-weight.medium}" },
      lineHeight: { $value: "{line-height.6}" },
      letterSpacing: { $value: "{letter-spacing.normal}" },
    },
    lg: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.lg}" },
      fontWeight: { $value: "{font-weight.medium}" },
      lineHeight: { $value: "{line-height.7}" },
      letterSpacing: { $value: "{letter-spacing.normal}" },
    },
  },

  control: {
    xs: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.xs}" },
      fontWeight: { $value: "{font-weight.medium}" },
      lineHeight: { $value: "{line-height.4}" },
      letterSpacing: { $value: "{letter-spacing.normal}" },
    },
    sm: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.sm}" },
      fontWeight: { $value: "{font-weight.medium}" },
      lineHeight: { $value: "{line-height.5}" },
      letterSpacing: { $value: "{letter-spacing.normal}" },
    },
    md: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.sm}" },
      fontWeight: { $value: "{font-weight.medium}" },
      lineHeight: { $value: "{line-height.5}" },
      letterSpacing: { $value: "{letter-spacing.normal}" },
    },
    lg: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.base}" },
      fontWeight: { $value: "{font-weight.medium}" },
      lineHeight: { $value: "{line-height.6}" },
      letterSpacing: { $value: "{letter-spacing.normal}" },
    },
    xl: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.base}" },
      fontWeight: { $value: "{font-weight.medium}" },
      lineHeight: { $value: "{line-height.6}" },
      letterSpacing: { $value: "{letter-spacing.normal}" },
    },
  },

  code: {
    sm: {
      fontFamily: { $value: "{typography.family.mono}" },
      fontSize: { $value: "{font-size.xs}" },
      fontWeight: { $value: "{font-weight.normal}" },
      lineHeight: { $value: "{line-height.5}" },
      letterSpacing: { $value: "{letter-spacing.normal}" },
    },
    md: {
      fontFamily: { $value: "{typography.family.mono}" },
      fontSize: { $value: "{font-size.sm}" },
      fontWeight: { $value: "{font-weight.normal}" },
      lineHeight: { $value: "{line-height.6}" },
      letterSpacing: { $value: "{letter-spacing.normal}" },
    },
    lg: {
      fontFamily: { $value: "{typography.family.mono}" },
      fontSize: { $value: "{font-size.base}" },
      fontWeight: { $value: "{font-weight.normal}" },
      lineHeight: { $value: "{line-height.7}" },
      letterSpacing: { $value: "{letter-spacing.normal}" },
    },
  },
}
