import React from 'react'
import EventCard from './EventCard'

function groupByMonth(events) {
    //we need to sort the event objects from sampleEvents.js by month
    const eventsByMonth = [...events].sort((a, b) => new Date(b.date) - new Date(a.date))
    //we need [...events] to rebuild the array of event objects so React will notice a change in reference
    //the eventsByMonth are sorted in descending order (we want newest at the top)

    const groups = {}
    for (let event of eventsByMonth) {
        const monthYearLabel = new Date(event.date).toLocaleDateString("en-US", { month: "long", year: "numeric" }) //for each event, we want to get a month and year from event.date
        console.log(`${event.title}: ${monthYearLabel}`)
        if (!groups[monthYearLabel]) { //if groups["july 2026"] doesn't exist, create it and initialize it as a list
            groups[monthYearLabel] = []
        }
        groups[monthYearLabel].push(event) //pushes the event object into the groups[label] array.
        // this data will look like this {july 2026: [{id: 1, type: "injury", title: "Limping....}, {id: 5, type: "vaccine", title: "FCVRP....}], october 2026:[{id: 3, type: "sneezing", title: "Sneezing fits....}]}
    }
    return groups
}



function Timeline({ events }) {
    const groupedEvents = groupByMonth(events)
    console.log(groupedEvents)
    return (
        <div className='space-y-12'>
            {events.length===0 && <p>No Events Yet</p>}
            {/* Object.entries(obj) turns event data into an array of arrays: [[july 2026: [{id: 1, type: "injury", title: "Limping....}, {id: 5, type: "vaccine", title: "FCVRP....}]], [october 2026:[{id: 3, type: "sneezing", title: "Sneezing fits....}]] ] */}
            {/* There are two items in the inner array month-year and array of objects */}
            {Object.entries(groupedEvents).map(([monthYear, monthEvents]) => {
                return <div key={monthYear}>
                    {/* each month-year section will generate the associated events */}
                    <h2 className='flex uppercase font-semibold tracking-wide items-center '>
                        <span className='flex-1 border-t border-stone-300'></span>
                        <span className='p-2 text-stone-500'>{monthYear}</span>
                        <span className='flex-1 border-t border-stone-300'></span> 
                    </h2>
                    <div className='text-center text-stone-500'>{`events: ${monthEvents.length}`}</div>
                    <div>{monthEvents.map((event => <EventCard key={event.id} event={event} />))}</div>
                </div>
            })}




        </div>
    )
}

export default Timeline