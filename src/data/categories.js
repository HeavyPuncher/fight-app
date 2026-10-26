// Full class names are spelled out so Tailwind keeps them in the build.
export const categories = [
  { id: "boxing", label: "Boxing", badge: "bg-red-600" },
  { id: "ufc", label: "UFC", badge: "bg-yellow-600" },
  { id: "mma", label: "Other MMA", badge: "bg-orange-600" },
  { id: "influencer", label: "Influencer", badge: "bg-pink-600" },
  { id: "raf", label: "RAF", badge: "bg-blue-600" },
  { id: "other", label: "Other", badge: "bg-gray-600" },
];

export function getCategory(id) {
  return categories.find(category => category.id === id) ?? categories.at(-1);
}
