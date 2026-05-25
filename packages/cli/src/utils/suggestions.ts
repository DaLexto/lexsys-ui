export const calculateLevenshteinDistance = (
  firstValue: string,
  secondValue: string,
): number => {
  const firstLength = firstValue.length
  const secondLength = secondValue.length

  const matrix = Array.from({ length: firstLength + 1 }, () =>
    Array.from({ length: secondLength + 1 }, () => 0),
  )

  for (let firstIndex = 0; firstIndex <= firstLength; firstIndex += 1) {
    matrix[firstIndex][0] = firstIndex
  }

  for (let secondIndex = 0; secondIndex <= secondLength; secondIndex += 1) {
    matrix[0][secondIndex] = secondIndex
  }

  for (let firstIndex = 1; firstIndex <= firstLength; firstIndex += 1) {
    for (let secondIndex = 1; secondIndex <= secondLength; secondIndex += 1) {
      const cost =
        firstValue[firstIndex - 1] === secondValue[secondIndex - 1] ? 0 : 1

      matrix[firstIndex][secondIndex] = Math.min(
        matrix[firstIndex - 1][secondIndex] + 1,
        matrix[firstIndex][secondIndex - 1] + 1,
        matrix[firstIndex - 1][secondIndex - 1] + cost,
      )
    }
  }

  return matrix[firstLength][secondLength]
}

export const findClosestValue = (
  input: string,
  values: string[],
): string | undefined => {
  const normalizedInput = input.toLowerCase()

  const ranked = values
    .map((value) => ({
      value,
      distance: calculateLevenshteinDistance(
        normalizedInput,
        value.toLowerCase(),
      ),
    }))
    .sort((first, second) => first.distance - second.distance)

  const closest = ranked[0]

  if (!closest || closest.distance > 3) {
    return undefined
  }

  return closest.value
}
