import { Link } from "react-router-dom";
import { getCategory } from "../data/categories";
import { countdown, formatDate } from "../utils/dates";
import { Badge, CategoryBadge } from "./Badges";

function EventCard({ event }) {
  const category = getCategory(event.category);
  const mainEvent = event.bouts[0];
  const timeUntil = countdown(event.date);
  const extraBouts = event.bouts.length - 1;

  return (
    <Link
      to={`/events/${event.id}`}
      className="group flex flex-col h-full rounded-xl border border-gray-800 bg-gray-900 p-4 transition hover:border-gray-700 hover:bg-gray-800/60"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex flex-wrap gap-1.5">
          <CategoryBadge id={event.category} />
          {event.promotion && event.promotion !== category.label && (
            <Badge>{event.promotion}</Badge>
          )}
          {!event.confirmed && <Badge tone="warning">Unconfirmed</Badge>}
        </div>
        {timeUntil && (
          <span className="shrink-0 text-xs font-semibold text-red-400">{timeUntil}</span>
        )}
      </div>

      <h3 className="font-semibold leading-snug group-hover:text-white line-clamp-2">
        {event.title}
      </h3>

      {mainEvent && (
        <p className="mt-1 text-sm text-gray-300">
          {mainEvent.fighters[0]} <span className="text-gray-500">vs</span> {mainEvent.fighters[1]}
        </p>
      )}

      {mainEvent?.result?.winner && (
        <p className="mt-2 text-sm text-green-400">Winner: {mainEvent.result.winner}</p>
      )}

      <div className="mt-auto pt-4">
        <div className="flex items-end justify-between gap-2 border-t border-gray-800 pt-3 text-xs text-gray-400">
          <div className="min-w-0">
            <p className="text-gray-300">{formatDate(event.date)}</p>
            {event.location && <p className="truncate">{event.location}</p>}
          </div>
          {extraBouts > 0 && (
            <span className="shrink-0">+{extraBouts} {extraBouts === 1 ? "bout" : "bouts"}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default EventCard;
