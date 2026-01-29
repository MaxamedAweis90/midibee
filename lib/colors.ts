export type ColorDefinition = {
  tailwindClass: string;
  hex: string;
  isDark: boolean; // true if the color is dark (requiring light text)
};

export const DEFAULT_COLOR: ColorDefinition = {
  tailwindClass: "bg-zinc-50 dark:bg-zinc-900", // Default neutral
  hex: "#fafafa",
  isDark: false,
};

export const COLOR_MAP: Record<string, ColorDefinition> = {
  // Red (Casaan)
  casaan: { tailwindClass: "bg-red-600", hex: "#dc2626", isDark: true },
  gaduud: { tailwindClass: "bg-red-600", hex: "#dc2626", isDark: true },
  guduud: { tailwindClass: "bg-red-600", hex: "#dc2626", isDark: true },
  cas: { tailwindClass: "bg-red-600", hex: "#dc2626", isDark: true },

  // Black (Madow)
  madow: { tailwindClass: "bg-black", hex: "#000000", isDark: true },
  madhow: { tailwindClass: "bg-black", hex: "#000000", isDark: true },
  madoo: { tailwindClass: "bg-black", hex: "#000000", isDark: true },
  madaw: { tailwindClass: "bg-black", hex: "#000000", isDark: true },

  // Blue (Buluug)
  buluug: { tailwindClass: "bg-blue-600", hex: "#2563eb", isDark: true },
  buluugga: { tailwindClass: "bg-blue-600", hex: "#2563eb", isDark: true },
  // buluug a: { tailwindClass: 'bg-blue-600', hex: '#2563eb', isDark: true },

  // Green (Cagaar)
  cagaar: { tailwindClass: "bg-green-600", hex: "#16a34a", isDark: true },
  doog: { tailwindClass: "bg-green-600", hex: "#16a34a", isDark: true },
  cagaaran: { tailwindClass: "bg-green-600", hex: "#16a34a", isDark: true },

  // Yellow (Huruud/Jaalle)
  huruud: { tailwindClass: "bg-yellow-400", hex: "#facc15", isDark: false },
  jaalle: { tailwindClass: "bg-yellow-400", hex: "#facc15", isDark: false },
  jaale: { tailwindClass: "bg-yellow-400", hex: "#facc15", isDark: false },
  jaalo: { tailwindClass: "bg-yellow-400", hex: "#facc15", isDark: false },
  jalle: { tailwindClass: "bg-yellow-400", hex: "#facc15", isDark: false },

  // White (Caddaan)
  cadaan: { tailwindClass: "bg-white", hex: "#ffffff", isDark: false },
  cad: { tailwindClass: "bg-white", hex: "#ffffff", isDark: false },
  caddaan: { tailwindClass: "bg-white", hex: "#ffffff", isDark: false },

  // Orange (Oranji)
  oranje: { tailwindClass: "bg-orange-500", hex: "#f97316", isDark: true },
  biliiliq: { tailwindClass: "bg-orange-500", hex: "#f97316", isDark: true }, // Sometimes used for orange/sparkle? Stick to oranji.

  // Purple (Buni/Violet - approximation)
  // Somali color naming is often less granular for purple/pink without loan words or specific context.
  // Using generic "basal" (onion) for pink/purple range or loan words.
  basal: { tailwindClass: "bg-pink-400", hex: "#f472b6", isDark: false }, // Pink
  "guduud huruud": {
    tailwindClass: "bg-orange-500",
    hex: "#f97316",
    isDark: true,
  }, // Red-Yellow?

  // Grey (Cawl)
  cawl: { tailwindClass: "bg-gray-500", hex: "#6b7280", isDark: true },
  dambas: { tailwindClass: "bg-gray-400", hex: "#9ca3af", isDark: false }, // Ash color
};

export function getColor(input: string): ColorDefinition | null {
  const normalized = input.toLowerCase().trim();
  return COLOR_MAP[normalized] || null;
}
