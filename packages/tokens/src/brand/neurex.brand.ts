import type { BrandTokenGroup } from "../types"

export const neurexBrand: BrandTokenGroup = {
  name: "brand",
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
      $description: "Secondary accent color for Neurex.",
      base: { $value: "{color.blue.500}" },
      hover: { $value: "{color.blue.700}" },
      active: { $value: "{color.blue.900}" },
      disabled: { $value: "{color.neutral.200}" },
    },
  },
}
