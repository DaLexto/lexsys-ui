import { brandTokens } from "../types/authoring"

export const neurexBrand = brandTokens("brand", {
  $description: "Brand tokens for Neurex.",

  color: {
    $type: "color",
    primary: {
      base: { $value: "{color.orange.500}" },
      hover: { $value: "{color.orange.600}" },
      active: { $value: "{color.orange.700}" },
      disabled: { $value: "{color.neutral.300}" },
    },

    accent: {
      $description: "Space indigo secondary accent for Neurex.",
      base: { $value: "{color.spaceIndigo.500}" },
      hover: { $value: "{color.spaceIndigo.700}" },
      active: { $value: "{color.spaceIndigo.900}" },
      disabled: { $value: "{color.neutral.200}" },
    },
  },
})
