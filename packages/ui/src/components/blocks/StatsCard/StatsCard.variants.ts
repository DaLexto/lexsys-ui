/**
 * StatsCard.variants.ts
 *
 * Variant classes for the StatsCard block.
 */

export const statsCardClasses = (): string => {
  return "lex-stats-card"
}

export const statsCardValueClasses = (): string => {
  return [
    "lex-stats-card__value",
    "text-(length:--lex-typography-heading-md-font-size)",
    "font-(--lex-typography-heading-md-font-weight)",
    "leading-(--lex-typography-heading-md-font-line-height)",
    "text-(--lex-color-text-primary)",
    "m-0",
  ].join(" ")
}

export const statsCardTrendClasses = (): string => {
  return [
    "lex-stats-card__trend",
    "text-(length:--lex-typography-body-xs-font-size)",
    "text-(--lex-color-text-secondary)",
  ].join(" ")
}
