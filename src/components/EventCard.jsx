// import React from 'react'

function EventCard({ event }) {
  const eventDate = new Date(event.date) //turn event.date (ISO string) into a date object

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <p className="text-stone-500">
        {eventDate.toLocaleDateString("en-US", {month: "short", day: "numeric"})} 
        {" - "}
        {eventDate.toLocaleTimeString("en-US", {hour: "numeric", minute: "2-digit"})}
        {/* processes the date object into formatted date and time */}
      </p>
      <div className="flex justify-between items-end">
        <h3 className="font-semibold text-stone-800">{event.title}</h3>
        <span className="text-xs">{event.type}</span>
      </div>

    </div>
  )
}

export default EventCard