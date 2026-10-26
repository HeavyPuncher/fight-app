import { Link, useParams } from "react-router-dom";
import { getEvent } from "../data/events";
import { getCategory } from "../data/categories";
import { countdown, formatDate } from "../utils/dates";
import { Badge, CategoryBadge } from "../components/Badges";

function BackLink() {
  return (
    <Link to="/" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white">
      ← All events
    </Link>
  );
}

function Fighter({ name, won, align }) {
  return (
    <p className={`font-semibold break-words ${align} ${won ? "text-green-400" : ""}`}>
      {name}
    </p>
  );
}

function Bout({ bout, label }) {
  const winner = bout.result?.winner;
  const meta = [bout.weightClass, bout.title].filter(Boolean);

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
      {label && (
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-red-400">{label}</p>
      )}

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:text-lg">
        <Fighter name={bout.fighters[0]} won={winner === bout.fighters[0]} align="text-right" />
        <span className="text-xs font-medium uppercase text-gray-500">vs</span>
        <Fighter name={bout.fighters[1]} won={winner === bout.fighters[1]} align="text-left" />
      </div>

      {meta.length > 0 && (
        <p className="mt-2 text-center text-sm text-gray-400">{meta.join(" · ")}</p>
      )}

      {bout.result && (
        <p className="mt-3 border-t border-gray-800 pt-3 text-center text-sm">
          <span className="text-green-400">{winner} wins</span>
          {bout.result.method && <span className="text-gray-400"> · {bout.result.method}</span>}
        </p>
      )}
    </div>
  );
}

function EventDetail() {
  const { id } = useParams();
  const event = getEvent(id);

  if (!event) {
    return (
      <div className="py-16 text-center">
        <p className="mb-4 text-gray-400">Event not found.</p>
        <BackLink />
      </div>
    );
  }

  const category = getCategory(event.category);
  const timeUntil = countdown(event.date);

  const details = [
    ["Date", formatDate(event.date)],
    ["Venue", event.venue],
    ["Location", event.location],
    ["Organisation", event.promotion],
    ["Watch on", event.broadcast],
  ].filter(([, value]) => value);

  return (
    <div>
      <BackLink />

      <div className="mt-4 mb-6 sm:mb-8">
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <CategoryBadge id={event.category} />
          {event.promotion && event.promotion !== category.label && <Badge>{event.promotion}</Badge>}
          {!event.confirmed && <Badge tone="warning">Unconfirmed: date or card may change</Badge>}
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight break-words">{event.title}</h1>
        {timeUntil && <p className="mt-2 font-semibold text-red-400">{timeUntil}</p>}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <aside className="lg:col-start-3 lg:row-start-1">
          <dl className="rounded-xl border border-gray-800 bg-gray-900 divide-y divide-gray-800 lg:sticky lg:top-20">
            {details.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 px-4 py-3 text-sm">
                <dt className="text-gray-400">{label}</dt>
                <dd className="text-right">{value}</dd>
              </div>
            ))}
          </dl>
        </aside>

        <section className="lg:col-span-2 lg:row-start-1">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">Fight Card</h2>

          {event.bouts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-800 py-12 text-center text-gray-500">
              Fight card not announced yet.
            </div>
          ) : (
            <div className="space-y-3">
              {event.bouts.map((bout, index) => (
                <Bout
                  key={index}
                  bout={bout}
                  label={index === 0 ? "Main Event" : index === 1 ? "Co-Main Event" : null}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default EventDetail;
