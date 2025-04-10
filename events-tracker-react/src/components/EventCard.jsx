export default function EventCard({ event, onClick }) {
    return (
      <div
        className="bg-white p-4 rounded shadow transition duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer"
        onClick={onClick}
      >
        <h3 className="text-lg font-bold text-blue-700 mb-1">{event.title}</h3>
        <p className="text-sm text-gray-700 mb-1">
          <strong>{event.date}</strong> @ {event.time}
        </p>
        <p className="text-sm text-gray-600">{event.location}</p>
        <p className="text-sm text-gray-500 italic">
  Posted by: {event.createdBy}
</p>

      </div>
    );
  }
  