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

  // Blue (Buluug / Ciraad)
  buluug: { tailwindClass: "bg-blue-600", hex: "#2563eb", isDark: true },
  buluugga: { tailwindClass: "bg-blue-600", hex: "#2563eb", isDark: true },
  ciraad: { tailwindClass: "bg-blue-400", hex: "#60a5fa", isDark: true }, // Sky blue
  cir: { tailwindClass: "bg-blue-400", hex: "#60a5fa", isDark: true }, // Sky blue

  // Green (Cagaar)
  cagaar: { tailwindClass: "bg-green-600", hex: "#16a34a", isDark: true },
  doog: { tailwindClass: "bg-green-600", hex: "#16a34a", isDark: true },
  cagaaran: { tailwindClass: "bg-green-600", hex: "#16a34a", isDark: true },

  // Yellow (Jaale / Huruud)
  huruud: { tailwindClass: "bg-yellow-400", hex: "#facc15", isDark: false },
  jaalle: { tailwindClass: "bg-yellow-400", hex: "#facc15", isDark: false },
  jaale: { tailwindClass: "bg-yellow-400", hex: "#facc15", isDark: false },
  jaalo: { tailwindClass: "bg-yellow-400", hex: "#facc15", isDark: false },
  jalle: { tailwindClass: "bg-yellow-400", hex: "#facc15", isDark: false },

  // White (Caddaan)
  cadaan: { tailwindClass: "bg-white", hex: "#ffffff", isDark: false },
  cad: { tailwindClass: "bg-white", hex: "#ffffff", isDark: false },
  caddaan: { tailwindClass: "bg-white", hex: "#ffffff", isDark: false },

  // Orange (Oranji / Liini / Cusbur)
  oranje: { tailwindClass: "bg-orange-500", hex: "#f97316", isDark: true },
  oranji: { tailwindClass: "bg-orange-500", hex: "#f97316", isDark: true },
  liini: { tailwindClass: "bg-orange-500", hex: "#f97316", isDark: true },
  cusbur: { tailwindClass: "bg-orange-500", hex: "#f97316", isDark: true },
  biliiliq: { tailwindClass: "bg-orange-500", hex: "#f97316", isDark: true },

  // Brown (Bunni / Qaxwe)
  bunni: { tailwindClass: "bg-amber-800", hex: "#92400e", isDark: true },
  qaxwe: { tailwindClass: "bg-amber-800", hex: "#92400e", isDark: true },

  // Pink (Basali / Mushakal)
  basal: { tailwindClass: "bg-pink-400", hex: "#f472b6", isDark: false },
  basali: { tailwindClass: "bg-pink-400", hex: "#f472b6", isDark: false },
  mushakal: { tailwindClass: "bg-pink-400", hex: "#f472b6", isDark: false },

  // Purple (Carwaajis / Fiyool / Casuus)
  carwaajis: { tailwindClass: "bg-purple-600", hex: "#9333ea", isDark: true },
  fiyool: { tailwindClass: "bg-purple-600", hex: "#9333ea", isDark: true },
  casuus: { tailwindClass: "bg-purple-600", hex: "#9333ea", isDark: true },

  // Grey (Dameeri / Sibiri / Boor)
  cawl: { tailwindClass: "bg-gray-500", hex: "#6b7280", isDark: true }, // Existing
  dambas: { tailwindClass: "bg-gray-400", hex: "#9ca3af", isDark: false }, // Existing
  dameeri: { tailwindClass: "bg-gray-500", hex: "#6b7280", isDark: true },
  sibiri: { tailwindClass: "bg-gray-400", hex: "#9ca3af", isDark: false },
  boor: { tailwindClass: "bg-gray-500", hex: "#6b7280", isDark: true },

  // Gold (Dahab)
  dahab: { tailwindClass: "bg-yellow-500", hex: "#eab308", isDark: false },

  // Silver (Qalin)
  qalin: { tailwindClass: "bg-gray-300", hex: "#d1d5db", isDark: false },
};

export function getColor(input: string): ColorDefinition | null {
  const normalized = input.toLowerCase().trim();
  return COLOR_MAP[normalized] || null;
}
