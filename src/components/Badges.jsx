import { getCategory } from "../data/categories";

const base = "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium";

export function CategoryBadge({ id }) {
  const category = getCategory(id);
  return (
    <span className={`${base} ${category.badge} text-white uppercase tracking-wide`}>
      {category.label}
    </span>
  );
}

export function Badge({ children, tone = "neutral" }) {
  const tones = {
    neutral: "bg-gray-800 text-gray-300",
    warning: "bg-yellow-500/10 text-yellow-400 ring-1 ring-inset ring-yellow-500/30",
  };
  return <span className={`${base} ${tones[tone]}`}>{children}</span>;
}
