import { useState } from 'react'
import EventCard from './EventCard'
import EventForm from './EventForm'

function groupByMonth(events) {
    const eventsByMonth = [...events].sort((a, b) => new Date(b.date) - new Date(a.date))

    const groups = {}
    for (let event of eventsByMonth) {
        const monthYearLabel = new Date(event.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })
        console.log(`${event.title}: ${monthYearLabel}`)
        if (!groups[monthYearLabel]) { 
            groups[monthYearLabel] = []
        }
        groups[monthYearLabel].push(event)
    }
    return groups
}



function Timeline({ events, addEvents, selectedCatId, deleteEvent }) {
    const groupedEvents = groupByMonth(events)
    console.log(groupedEvents)
    const [isAddingEvent, setIsAddingEvent] = useState(false)

    return (
        <div className='space-y-12'>
            <div className=''>
                {events.length === 0 && <p>No Events Yet</p>}
                
                {Object.entries(groupedEvents).map(([monthYear, monthEvents]) => {
                    return <div key={monthYear} className=''>
                        <h2 className='flex uppercase font-semibold tracking-wide items-center '>
                            <span className='flex-1 border-t border-stone-300'></span>
                            <span className='p-2 text-stone-500'>{monthYear}</span>
                            <span className='flex-1 border-t border-stone-300'></span>
                        </h2>
                        <div className='text-center text-stone-500'>{`events: ${monthEvents.length}`}</div>
                        <div>{monthEvents.map((event => <EventCard key={event._id} event={event} deleteEvent={deleteEvent} />))}</div>
                    </div>
                })}
            </div>

            {/* Add event button */}
            <div onClick={() => setIsAddingEvent(true)} className='sticky bottom-0 flex justify-center bg-emerald-700 text-white text-xl font-semibold rounded-lg m-2 py-4'>
                Log New Event
            </div>

            {isAddingEvent && <EventForm selectedCatId={selectedCatId} addEvent={addEvents} closeForm={() => setIsAddingEvent(false)} />}

        </div>
    )
}

export default Timeline