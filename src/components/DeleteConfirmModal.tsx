interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  eventName: string;
}

export const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  eventName,
}: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-card-dark w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-red-600 dark:text-red-400">
                delete
              </span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-center mb-2">Delete Event?</h3>
          <p className="text-slate-500 dark:text-slate-400 text-center mb-6">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              "{eventName}"
            </span>
            ?
            <br />
            This action cannot be undone.
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-white/10 font-semibold hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-all shadow-lg shadow-red-600/20"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};