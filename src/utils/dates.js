// "YYYY-MM-DD" strings are parsed as local dates. new Date("2026-05-02") would
// read them as midnight UTC, which shifts the day for anyone west of UTC.
export function parseDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function isUpcoming(dateString) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return parseDate(dateString) >= today;
}

export function formatDate(dateString) {
  return parseDate(dateString).toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// "Today", "Tomorrow", "In 5 days", or null for past dates.
export function countdown(dateString) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Math.round((parseDate(dateString) - today) / 86400000);
  if (days < 0) return null;
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  return `In ${days} days`;
}
