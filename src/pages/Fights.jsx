import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { events } from "../data/events";
import { categories } from "../data/categories";
import { isUpcoming, parseDate } from "../utils/dates";
import EventCard from "../components/EventCard";

const PREVIOUS_PAGE_SIZE = 12;

function matchesSearch(event, query) {
  if (!query) return true;
  const text = [
    event.title,
    event.promotion,
    event.location,
    event.venue,
    ...event.bouts.flatMap(bout => bout.fighters),
  ].join(" ").toLowerCase();
  return text.includes(query.toLowerCase());
}

// [["November 2026", [event, ...]], ...] in the order the events are already sorted.
function groupByMonth(list) {
  const groups = new Map();
  for (const event of list) {
    const month = parseDate(event.date).toLocaleDateString(undefined, { month: "long", year: "numeric" });
    if (!groups.has(month)) groups.set(month, []);
    groups.get(month).push(event);
  }
  return [...groups];
}

function Fights() {
  // Filters live in the URL so they survive going to an event and back.
  const [params, setParams] = useSearchParams();
  const view = params.get("view") ?? "upcoming";
  const category = params.get("category") ?? "all";
  const promotion = params.get("promotion") ?? "all";
  const query = params.get("q") ?? "";
  const [previousShown, setPreviousShown] = useState(PREVIOUS_PAGE_SIZE);

  function updateParam(key, value, defaultValue) {
    const next = new URLSearchParams(params);
    if (value === defaultValue) next.delete(key);
    else next.set(key, value);
    if (key === "category") next.delete("promotion");
    setParams(next, { replace: true });
    setPreviousShown(PREVIOUS_PAGE_SIZE);
  }

  const inView = events.filter(event =>
    view === "upcoming" ? isUpcoming(event.date) : !isUpcoming(event.date)
  );
  const inCategory = inView.filter(event => category === "all" || event.category === category);
  const promotions = [...new Set(inCategory.map(event => event.promotion).filter(Boolean))].sort();

  const filtered = inCategory
    .filter(event => promotion === "all" || event.promotion === promotion)
    .filter(event => matchesSearch(event, query))
    .sort((a, b) => view === "upcoming"
      ? parseDate(a.date) - parseDate(b.date)
      : parseDate(b.date) - parseDate(a.date)
    );

  const visible = view === "upcoming" ? filtered : filtered.slice(0, previousShown);

  const chipClass = active =>
    `shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition ${
      active ? "bg-red-600 text-white" : "bg-gray-900 text-gray-300 ring-1 ring-inset ring-gray-800 hover:bg-gray-800"
    }`;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Fight Schedule</h1>
          <p className="text-gray-400 text-sm mt-1">Boxing, UFC, MMA, influencer and RAF events in one place.</p>
        </div>

        <div className="inline-flex self-start rounded-lg bg-gray-900 p-1 ring-1 ring-inset ring-gray-800">
          {[["upcoming", "Upcoming"], ["previous", "Previous"]].map(([id, label]) => (
            <button
              key={id}
              onClick={() => updateParam("view", id, "upcoming")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
                view === id ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row mb-4">
        <input
          type="search"
          value={query}
          onChange={e => updateParam("q", e.target.value, "")}
          placeholder="Search fighter, event or location..."
          className="w-full min-w-0 flex-1 rounded-lg bg-gray-900 px-4 py-2 text-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-500 outline-none focus:ring-red-500"
        />
        {promotions.length > 1 && (
          <select
            value={promotion}
            onChange={e => updateParam("promotion", e.target.value, "all")}
            className="w-full sm:w-56 rounded-lg bg-gray-900 px-3 py-2 text-sm ring-1 ring-inset ring-gray-800 outline-none focus:ring-red-500"
          >
            <option value="all">All organisations</option>
            {promotions.map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        )}
      </div>

      {/* Scrolls sideways on small screens, wraps on larger ones */}
      <div className="no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 flex gap-2 overflow-x-auto sm:flex-wrap mb-6">
        <button onClick={() => updateParam("category", "all", "all")} className={chipClass(category === "all")}>
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => updateParam("category", cat.id, "all")}
            className={chipClass(category === cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-800 py-16 text-center text-gray-500">
          No events match these filters.
        </div>
      ) : (
        <div className="space-y-8">
          {groupByMonth(visible).map(([month, monthEvents]) => (
            <section key={month}>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
                {month} <span className="text-gray-600">· {monthEvents.length}</span>
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {monthEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {visible.length < filtered.length && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setPreviousShown(shown => shown + PREVIOUS_PAGE_SIZE)}
            className="px-5 py-2 rounded-lg bg-gray-800 text-sm font-medium hover:bg-gray-700"
          >
            Show more
          </button>
        </div>
      )}
    </div>
  );
}

export default Fights;
