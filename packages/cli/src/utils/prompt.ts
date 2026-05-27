import prompts from "prompts"

interface MultiselectChoice {
  title: string
  value: string
}

interface MultiselectOptions {
  min?: number
}

export const promptMultiselect = async (
  message: string,
  choices: MultiselectChoice[],
  options: MultiselectOptions = {},
): Promise<string[]> => {
  const response: unknown = await prompts({
    type: "multiselect",
    name: "selected",
    message,
    choices,
    ...(options.min !== undefined ? { min: options.min } : {}),
  })

  if (typeof response !== "object" || response === null) {
    return []
  }

  const selected = (response as { selected?: unknown }).selected

  if (!Array.isArray(selected)) {
    return []
  }

  return selected.filter((item): item is string => typeof item === "string")
}
