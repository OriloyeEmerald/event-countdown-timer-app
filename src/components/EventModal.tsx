import type { Event } from "../interfaces/i-event";
import { useState, useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Event) => void;
  initialEvent?: Event | null;
}

export const EventModal = ({
  isOpen,
  onClose,
  onSave,
  initialEvent,
}: Props) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialEvent) {
      setName(initialEvent.name);
      setDate(initialEvent.date.slice(0, 16));
      setDescription(initialEvent.description || "");
    } else {
      setName("");
      setDate("");
      setDescription("");
    }
  }, [initialEvent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !date) return;

    const newEvent: Event = {
      id: initialEvent?.id || crypto.randomUUID(),
      name: name.trim(),
      date: new Date(date).toISOString(),
      description: description.trim() || undefined,
    };

    onSave(newEvent);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-card-dark w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {initialEvent ? "Edit Countdown" : "New Countdown"}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">
              Event Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-slate-50 dark:bg-background-dark/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
              placeholder="e.g. My Graduation"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">
              Date &amp; Time
            </label>
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full bg-slate-50 dark:bg-background-dark/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 dark:bg-background-dark/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all resize-none"
              placeholder="Add some details..."
              rows={3}
            />
          </div>

          <div className="flex items-center gap-2 bg-primary/5 p-3 rounded-lg border border-primary/10">
            <span className="material-symbols-outlined text-primary">info</span>
            <p className="text-xs text-primary/80 font-medium leading-relaxed">
              Cards automatically change color based on remaining time.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border border-slate-200 dark:border-white/10 font-semibold hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              {initialEvent ? "Save Changes" : "Save Countdown"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};