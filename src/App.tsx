import { useState, useEffect } from "react";
import { EventCard } from "./components/EventCard";
import { EventModal } from "./components/EventModal";
import { DeleteConfirmModal } from "./components/DeleteConfirmModal";
import type { Event } from "./interfaces/i-event";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [events, setEvents] = useLocalStorage<Event[]>("countdowns", []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev); 
  const openModal = (eventToEdit?: Event) => {
    setEditingEvent(eventToEdit || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const handleSave = (newEvent: Event) => {
    if (editingEvent) {
      setEvents(events.map((e) => (e.id === newEvent.id ? newEvent : e)));
    } else {
      setEvents([...events, newEvent]);
    }
  };

  const openDeleteModal = (event: Event) => {
    setEventToDelete(event);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (eventToDelete) {
      setEvents(events.filter((e) => e.id !== eventToDelete.id));
    }
    setDeleteModalOpen(false);
    setEventToDelete(null);
  };

  return (
    <div className={`min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display ${isDark ? 'dark' : ''}`}>
      <nav className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-2xl">timer</span>
            </div>
            <span className="text-xl font-bold tracking-tight">Countdowns</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-primary/10 transition-colors"
            >
              <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">
                {isDark ? "light_mode" : "dark_mode"}
              </span>
            </button>
            <button
              onClick={() => openModal()}
              className="hidden md:flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-all"
            >
              <span className="material-symbols-outlined">add</span>
              <span>New Event</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
              My Important Dates
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              Never miss a milestone again.
            </p>
          </div>

          <button
            onClick={() => openModal()}
            className="md:hidden w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">add</span>
            Create New Countdown
          </button>
        </header>

        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
            <div className="bg-primary/10 p-6 rounded-full mb-4">
              <span className="material-symbols-outlined text-6xl text-primary">
                hourglass_empty
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-2">No countdowns yet</h3>
            <p className="text-slate-500 max-w-xs mx-auto mb-8">
              Click the plus button to start tracking your important moments.
            </p>
            <button
              onClick={() => openModal()}
              className="bg-primary text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-primary/90"
            >
              <span className="material-symbols-outlined">add</span>
              Add Your First Event
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onDelete={openDeleteModal}
                onEdit={openModal}
              />
            ))}
          </div>
        )}
      </main>

      <button
        onClick={() => openModal()}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all md:hidden z-40"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>

      {/* Modals */}
      <EventModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
        initialEvent={editingEvent}
      />
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setEventToDelete(null);
        }}
        onConfirm={confirmDelete}
        eventName={eventToDelete?.name || ""}
      />
    </div>
  );
}

export default App;