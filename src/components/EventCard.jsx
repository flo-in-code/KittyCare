import { useState } from "react"

// import React from 'react'
const typeStyles = {
  injury: "bg-blue-50 text-blue-700",
  medication: "bg-purple-50 text-purple-700",
  vomiting: "bg-red-50 text-red-700",
  coughing: "bg-amber-50 text-amber-700",
  sneezing: "bg-fuchsia-50 text-fuchsia-700",
  weight: "bg-stone-50 text-stone-700",
  stool: "<bg-taupe-50 text-taupe-700",
  vet: "bg-green-50 text-green-700",
  surgery: "bg-purple-50 text-purple-700",
  vaccine: "bg-emerald-50 text-emerald-700",
  behavior: "bg-yellow-50 text-yellow-700",
  diet: "bg-lime-50 text-lime-700",
  other: "bg-slate-50 text-slate-700"
}



function EventCard({ event, deleteEvent }) {
  const eventDate = new Date(event.date) //turn event.date (ISO string) into a date object

  const [isViewingComments, setIsViewingComments] = useState(false)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 m-2">
      <div className="flex justify-between">
        <p className="text-stone-500">
          {eventDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          {" - "}
          {eventDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
          {/* processes the date object into formatted date and time */}
        </p>
        <div className="flex space-x-8">
          {/* trash icon */}
          {/* delete event using event.id */}
          <div onClick={() => deleteEvent(event.id)} className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#607d8b"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 7l16 0" />
              <path d="M10 11l0 6" />
              <path d="M14 11l0 6" />
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>

          </div>
          {/* expand icon */}
          <div onClick={() => setIsViewingComments(!isViewingComments)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#607d8b"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 18v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
              <path d="M4 9h16" />
              <path d="M10 14l2 2l2 -2" />
            </svg>
          </div>
        </div>

      </div>

      <div className="flex justify-between items-end pb-4">
        <h3 className="font-semibold text-stone-800">{event.title}</h3>
        <span className={`text-xs py-2 px-2 rounded-full ${typeStyles[event.type]}`}>{event.type}</span>
      </div>

      {/* Comments */}
      {isViewingComments && (
        <>
          <p className="pt-4 border-t border-stone-300 font-semibold">Notes:</p>
          <div className="">{event.notes}</div>
        </>

      )}

    </div>
  )
}

export default EventCard