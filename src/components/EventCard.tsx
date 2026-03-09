import type { Event } from "../interfaces/i-event";
import { useCountdown } from "../hooks/useCountdown";

interface Props {
  event: Event;
  onDelete: (event: Event) => void;
  onEdit: (event: Event) => void;
}

export const EventCard = ({ event, onDelete, onEdit }: Props) => {
  const { timeLeft, urgencyColor, progress, isExpired } = useCountdown(
    event.date,
  );

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (isExpired) {
    return (
      <div className="bg-white/70 dark:bg-card-dark/70 rounded-xl border-l-4 border-red-600 p-6 shadow-xl flex flex-col gap-6 relative overflow-hidden opacity-75">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold px-3 py-1 rounded-full mb-2">
              <span className="material-symbols-outlined text-sm">
                event_busy
              </span>
              EXPIRED
            </div>
            <h3 className="text-xl font-bold mb-1 line-through">
              {event.name}
            </h3>
            {event.description && (
              <p className="text-sm text-slate-500 dark:text-slate-400 line-through">
                {event.description}
              </p>
            )}
          </div>

          <div className="relative w-16 h-16 flex-shrink-0">
            <svg className="w-16 h-16" viewBox="0 0 64 64">
              <circle
                className="text-slate-200 dark:text-white/5"
                cx="32"
                cy="32"
                fill="transparent"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
              />
              <circle
                className="text-red-600"
                cx="32"
                cy="32"
                fill="transparent"
                r="28"
                stroke="currentColor"
                strokeDasharray="175.9"
                strokeDashoffset="0"
                strokeLinecap="round"
                strokeWidth="4"
                style={{
                  transform: "rotate(-90deg)",
                  transformOrigin: "50% 50%",
                }}
              />
            </svg>
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-red-600">
              100%
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-white/5">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">
              calendar_today
            </span>
            {formattedDate}
          </span>

          <button
            onClick={() => onDelete(event)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl font-semibold transition-all shadow-lg shadow-red-600/20"
          >
            <span className="material-symbols-outlined text-lg">delete</span>
            Delete
          </button>
        </div>
      </div>
    );
  }


  const borderColorClass =
    urgencyColor === "primary"
      ? "border-primary"
      : urgencyColor === "accent-orange"
        ? "border-accent-orange"
        : "border-accent-green";

  const textColorClass =
    urgencyColor === "primary"
      ? "text-primary"
      : urgencyColor === "accent-orange"
        ? "text-accent-orange"
        : "text-accent-green";

  const bgColorClass =
    urgencyColor === "primary"
      ? "bg-primary/5"
      : urgencyColor === "accent-orange"
        ? "bg-accent-orange/5"
        : "bg-accent-green/5";

  const borderLightClass =
    urgencyColor === "primary"
      ? "border-primary/10"
      : urgencyColor === "accent-orange"
        ? "border-accent-orange/10"
        : "border-accent-green/10";

  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={`bg-white dark:bg-card-dark rounded-xl border-l-4 ${borderColorClass} p-6 shadow-xl shadow-black/5 flex flex-col gap-6 relative overflow-hidden group`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-1">{event.name}</h3>
          {event.description && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {event.description}
            </p>
          )}
        </div>

        <div className="relative w-16 h-16 flex-shrink-0">
          <svg className="w-16 h-16" viewBox="0 0 64 64">
            <circle
              className="text-slate-200 dark:text-white/5"
              cx="32"
              cy="32"
              fill="transparent"
              r={radius}
              stroke="currentColor"
              strokeWidth="4"
            />
            <circle
              className={textColorClass}
              cx="32"
              cy="32"
              fill="transparent"
              r={radius}
              stroke="currentColor"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              strokeWidth="4"
              style={{
                transform: "rotate(-90deg)",
                transformOrigin: "50% 50%",
              }}
            />
          </svg>
          <span
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold ${textColorClass}`}
          >
            {progress}%
          </span>
        </div>
      </div>

      <div className="flex gap-2 justify-between items-center py-4">
        {[
          { value: timeLeft.days, label: "DAYS" },
          { value: timeLeft.hours, label: "HOURS" },
          { value: timeLeft.minutes, label: "MINS" },
          { value: timeLeft.seconds, label: "SECS" },
        ].map((item, i) => (
          <div
            key={i}
            className={`flex-1 flex flex-col items-center ${bgColorClass} rounded-lg py-3 border ${borderLightClass}`}
          >
            <span className={`text-2xl font-black ${textColorClass}`}>
              {item.value.toString().padStart(2, "0")}
            </span>
            <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-500 dark:text-slate-400">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-white/5">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">
            calendar_today
          </span>
          {formattedDate}
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(event)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">edit</span>
          </button>
          <button
            onClick={() => onDelete(event)}
            className="p-2 rounded-lg hover:bg-primary/10 text-primary/60 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-lg">delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};