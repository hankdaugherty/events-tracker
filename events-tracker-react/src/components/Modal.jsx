export default function Modal({ event, token, user, onClose, onEdit, onDelete, children }) {
  const isEventModal = !!event;

  const handleBackgroundClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  return (
    <div
      id="modal-overlay"
      onClick={handleBackgroundClick}
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-md relative w-full max-w-md">
        {!isEventModal ? (
          <>
            <button
              onClick={onClose}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl font-bold"
            >
              &times;
            </button>
            {children}
          </>
        ) : (
          <>
            <button
              onClick={onClose}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-2">{event.title}</h2>
            <p>
              <strong>Date:</strong> {event.date}
            </p>
            <p>
              <strong>Time:</strong> {event.time}
            </p>
            <p>
              <strong>Location:</strong> {event.location}
            </p>
            {event.description && <p className="mt-2">{event.description}</p>}
            <p className="mt-4 text-sm text-gray-500">Posted by: {event.createdBy}</p>

            {user?.username === event.createdBy && (
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => onEdit(event)}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(event)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
