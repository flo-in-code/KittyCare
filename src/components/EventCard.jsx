// import React from 'react'

function EventCard({ event }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <p className="text-stone-500">{event.date}</p>
      <div className="flex justify-between items-end">
        <h3 className="font-semibold text-stone-800">{event.title}</h3>
        <span className="text-xs">{event.type}</span>
      </div>

    </div>
  )
}

export default EventCard