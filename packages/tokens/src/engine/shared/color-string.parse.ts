/**
 * color-string.parse.ts
 *
 * @layer engine
 * @description Shared rgb()/hsl() string parsing for contrast normalization.
 */

export interface ParsedSrgbColor {
  components: [number, number, number]
  alpha: number
}

const clamp01 = (value: number): number => {
  return Math.min(1, Math.max(0, value))
}

const parseNumberToken = (token: string): number | null => {
  const normalized = token.trim()

  if (normalized.length === 0) {
    return null
  }

  const value = Number(normalized)

  return Number.isFinite(value) ? value : null
}

const parsePercentageToken = (token: string): number | null => {
  const normalized = token.trim()

  if (!normalized.endsWith("%")) {
    return null
  }

  const value = parseNumberToken(normalized.slice(0, -1))

  if (value === null) {
    return null
  }

  return clamp01(value / 100)
}

const parseRgbChannel = (token: string): number | null => {
  const percentage = parsePercentageToken(token)

  if (percentage !== null) {
    return percentage
  }

  const value = parseNumberToken(token)

  if (value === null) {
    return null
  }

  return clamp01(value / 255)
}

const parseHueChannel = (token: string): number | null => {
  const value = parseNumberToken(token)

  if (value === null) {
    return null
  }

  return ((value % 360) + 360) % 360
}

const parseHslSaturationLightness = (token: string): number | null => {
  const percentage = parsePercentageToken(token)

  if (percentage !== null) {
    return percentage
  }

  const value = parseNumberToken(token)

  if (value === null) {
    return null
  }

  return clamp01(value / 100)
}

const parseAlphaToken = (token: string): number | null => {
  const percentage = parsePercentageToken(token)

  if (percentage !== null) {
    return percentage
  }

  const value = parseNumberToken(token)

  if (value === null) {
    return null
  }

  return clamp01(value)
}

const splitColorFunctionArgs = (value: string): string[] | null => {
  const openIndex = value.indexOf("(")
  const closeIndex = value.lastIndexOf(")")

  if (openIndex === -1 || closeIndex === -1 || closeIndex <= openIndex) {
    return null
  }

  const args = value.slice(openIndex + 1, closeIndex).trim()

  if (args.length === 0) {
    return null
  }

  const slashIndex = args.indexOf("/")
  const colorPart =
    slashIndex === -1 ? args : args.slice(0, slashIndex).trim()
  const alphaPart =
    slashIndex === -1 ? undefined : args.slice(slashIndex + 1).trim()

  const tokens = colorPart.includes(",")
    ? colorPart.split(",").map((token) => token.trim())
    : colorPart.split(/\s+/).map((token) => token.trim())

  if (tokens.some((token) => token.length === 0)) {
    return null
  }

  if (alphaPart !== undefined) {
    tokens.push(alphaPart)
  }

  return tokens
}

const hslToSrgbComponents = (
  hue: number,
  saturation: number,
  lightness: number,
): [number, number, number] => {
  if (saturation === 0) {
    return [lightness, lightness, lightness]
  }

  const hueSegment = hue / 60
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation
  const intermediate = chroma * (1 - Math.abs((hueSegment % 2) - 1))
  let red = 0
  let green = 0
  let blue = 0

  if (hueSegment >= 0 && hueSegment < 1) {
    red = chroma
    green = intermediate
  } else if (hueSegment >= 1 && hueSegment < 2) {
    red = intermediate
    green = chroma
  } else if (hueSegment >= 2 && hueSegment < 3) {
    green = chroma
    blue = intermediate
  } else if (hueSegment >= 3 && hueSegment < 4) {
    green = intermediate
    blue = chroma
  } else if (hueSegment >= 4 && hueSegment < 5) {
    red = intermediate
    blue = chroma
  } else {
    red = chroma
    blue = intermediate
  }

  const match = lightness - chroma / 2

  return [red + match, green + match, blue + match]
}

export const parseRgbColorString = (value: string): ParsedSrgbColor | null => {
  const normalized = value.trim()
  const functionMatch = normalized.match(/^rgba?\(/i)

  if (functionMatch === null) {
    return null
  }

  const tokens = splitColorFunctionArgs(normalized)

  if (tokens === null || tokens.length < 3) {
    return null
  }

  const [redToken, greenToken, blueToken, alphaToken] = tokens
  const red = parseRgbChannel(redToken)
  const green = parseRgbChannel(greenToken)
  const blue = parseRgbChannel(blueToken)

  if (red === null || green === null || blue === null) {
    return null
  }

  const alpha =
    alphaToken === undefined ? 1 : (parseAlphaToken(alphaToken) ?? null)

  if (alpha === null) {
    return null
  }

  return {
    components: [red, green, blue],
    alpha,
  }
}

export const parseHslColorString = (value: string): ParsedSrgbColor | null => {
  const normalized = value.trim()
  const functionMatch = normalized.match(/^hsla?\(/i)

  if (functionMatch === null) {
    return null
  }

  const tokens = splitColorFunctionArgs(normalized)

  if (tokens === null || tokens.length < 3) {
    return null
  }

  const [hueToken, saturationToken, lightnessToken, alphaToken] = tokens
  const hue = parseHueChannel(hueToken)
  const saturation = parseHslSaturationLightness(saturationToken)
  const lightness = parseHslSaturationLightness(lightnessToken)

  if (hue === null || saturation === null || lightness === null) {
    return null
  }

  const alpha =
    alphaToken === undefined ? 1 : (parseAlphaToken(alphaToken) ?? null)

  if (alpha === null) {
    return null
  }

  return {
    components: hslToSrgbComponents(hue, saturation, lightness),
    alpha,
  }
}
