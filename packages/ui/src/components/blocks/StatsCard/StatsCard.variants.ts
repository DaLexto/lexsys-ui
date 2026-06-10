/**
 * StatsCard.variants.ts
 *
 * Variant classes for the StatsCard block.
 */

export const statsCardClasses = (): string => {
  return "lex-stats-card";
};

export const statsCardValueClasses = (): string => {
  return [
    "lex-stats-card__value",
    "text-(length:--lex-stats-card-value-font-size)",
    "font-(--lex-stats-card-value-font-weight)",
    "leading-(--lex-stats-card-value-font-line-height)",
    "text-(--lex-stats-card-value-foreground)",
    "m-0",
  ].join(" ");
};

export const statsCardTrendClasses = (): string => {
  return [
    "lex-stats-card__trend",
    "text-(length:--lex-stats-card-trend-font-size)",
    "leading-(--lex-stats-card-trend-font-line-height)",
    "text-(--lex-stats-card-trend-foreground)",
  ].join(" ");
};
