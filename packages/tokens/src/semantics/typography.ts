import { semanticTokens } from "../types/authoring"

export const typographySemantics = semanticTokens("typography", {
  family: {
    $type: "fontFamily",
    sans: { $value: "{font-family.sans}" },
    serif: { $value: "{font-family.serif}" },
    mono: { $value: "{font-family.mono}" },
  },

  body: {
    $type: "typography",
    xs: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.xs}" },
      fontWeight: { $value: "{font-weight.normal}" },
      lineHeight: { $value: "{line-height.normal}" },
      letterSpacing: { $value: "{letter-spacing.normal}" },
    },
    sm: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.sm}" },
      fontWeight: { $value: "{font-weight.normal}" },
      lineHeight: { $value: "{line-height.normal}" },
      letterSpacing: { $value: "{letter-spacing.normal}" },
    },
    md: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.base}" },
      fontWeight: { $value: "{font-weight.normal}" },
      lineHeight: { $value: "{line-height.normal}" },
      letterSpacing: { $value: "{letter-spacing.normal}" },
    },
    lg: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.lg}" },
      fontWeight: { $value: "{font-weight.normal}" },
      lineHeight: { $value: "{line-height.relaxed}" },
      letterSpacing: { $value: "{letter-spacing.normal}" },
    },
    xl: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.xl}" },
      fontWeight: { $value: "{font-weight.normal}" },
      lineHeight: { $value: "{line-height.relaxed}" },
      letterSpacing: { $value: "{letter-spacing.normal}" },
    },
  },

  heading: {
    $type: "typography",
    xs: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.base}" },
      fontWeight: { $value: "{font-weight.semibold}" },
      lineHeight: { $value: "{line-height.tight}" },
      letterSpacing: { $value: "{letter-spacing.tight}" },
    },
    sm: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.lg}" },
      fontWeight: { $value: "{font-weight.semibold}" },
      lineHeight: { $value: "{line-height.tight}" },
      letterSpacing: { $value: "{letter-spacing.tight}" },
    },
    md: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.xl}" },
      fontWeight: { $value: "{font-weight.semibold}" },
      lineHeight: { $value: "{line-height.tight}" },
      letterSpacing: { $value: "{letter-spacing.tight}" },
    },
    lg: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.2xl}" },
      fontWeight: { $value: "{font-weight.bold}" },
      lineHeight: { $value: "{line-height.tight}" },
      letterSpacing: { $value: "{letter-spacing.tight}" },
    },
    xl: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.3xl}" },
      fontWeight: { $value: "{font-weight.bold}" },
      lineHeight: { $value: "{line-height.tight}" },
      letterSpacing: { $value: "{letter-spacing.tight}" },
    },
    "2xl": {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.4xl}" },
      fontWeight: { $value: "{font-weight.bold}" },
      lineHeight: { $value: "{line-height.tight}" },
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
      lineHeight: { $value: "{line-height.tight}" },
      letterSpacing: { $value: "{letter-spacing.normal}" },
    },
    sm: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.sm}" },
      fontWeight: { $value: "{font-weight.medium}" },
      lineHeight: { $value: "{line-height.tight}" },
      letterSpacing: { $value: "{letter-spacing.normal}" },
    },
    md: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.base}" },
      fontWeight: { $value: "{font-weight.medium}" },
      lineHeight: { $value: "{line-height.snug}" },
      letterSpacing: { $value: "{letter-spacing.normal}" },
    },
    lg: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.lg}" },
      fontWeight: { $value: "{font-weight.medium}" },
      lineHeight: { $value: "{line-height.snug}" },
      letterSpacing: { $value: "{letter-spacing.normal}" },
    },
  },

  control: {
    xs: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.xs}" },
      fontWeight: { $value: "{font-weight.medium}" },
      lineHeight: { $value: "{line-height.tight}" },
      letterSpacing: { $value: "{letter-spacing.normal}" },
    },
    sm: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.sm}" },
      fontWeight: { $value: "{font-weight.medium}" },
      lineHeight: { $value: "{line-height.tight}" },
      letterSpacing: { $value: "{letter-spacing.normal}" },
    },
    md: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.sm}" },
      fontWeight: { $value: "{font-weight.medium}" },
      lineHeight: { $value: "{line-height.tight}" },
      letterSpacing: { $value: "{letter-spacing.normal}" },
    },
    lg: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.base}" },
      fontWeight: { $value: "{font-weight.medium}" },
      lineHeight: { $value: "{line-height.snug}" },
      letterSpacing: { $value: "{letter-spacing.normal}" },
    },
    xl: {
      fontFamily: { $value: "{typography.family.sans}" },
      fontSize: { $value: "{font-size.base}" },
      fontWeight: { $value: "{font-weight.medium}" },
      lineHeight: { $value: "{line-height.snug}" },
      letterSpacing: { $value: "{letter-spacing.normal}" },
    },
  },

  code: {
    sm: {
      fontFamily: { $value: "{typography.family.mono}" },
      fontSize: { $value: "{font-size.xs}" },
      fontWeight: { $value: "{font-weight.normal}" },
      lineHeight: { $value: "{line-height.normal}" },
      letterSpacing: { $value: "{letter-spacing.normal}" },
    },
    md: {
      fontFamily: { $value: "{typography.family.mono}" },
      fontSize: { $value: "{font-size.sm}" },
      fontWeight: { $value: "{font-weight.normal}" },
      lineHeight: { $value: "{line-height.normal}" },
      letterSpacing: { $value: "{letter-spacing.normal}" },
    },
    lg: {
      fontFamily: { $value: "{typography.family.mono}" },
      fontSize: { $value: "{font-size.base}" },
      fontWeight: { $value: "{font-weight.normal}" },
      lineHeight: { $value: "{line-height.relaxed}" },
      letterSpacing: { $value: "{letter-spacing.normal}" },
    },
  },

})
