// import React from 'react'
const typeStyles ={
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
  behaviour: "bg-yellow-50 text-yellow-700",
  diet: "bg-lime-50 text-lime-700", 
  other: "bg-slate-50 text-slate-700"
}



function EventCard({ event }) {
  const eventDate = new Date(event.date) //turn event.date (ISO string) into a date object

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 m-2">
      <p className="text-stone-500">
        {eventDate.toLocaleDateString("en-US", {month: "short", day: "numeric"})} 
        {" - "}
        {eventDate.toLocaleTimeString("en-US", {hour: "numeric", minute: "2-digit"})}
        {/* processes the date object into formatted date and time */}
      </p>
      <div className="flex justify-between items-end">
        <h3 className="font-semibold text-stone-800">{event.title}</h3>
        <span className={`text-xs py-2 px-2 rounded-full ${typeStyles[event.type]}`}>{event.type}</span>
      </div>

    </div>
  )
}

export default EventCard