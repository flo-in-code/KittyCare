
import './App.css'
import { sampleEvents } from './data/sampleEvents'
import EventCard from './components/EventCard'
import Timeline from './components/Timeline'
import Sidebar from './components/Sidebar'
import EventForm from './components/EventForm'
import { useState } from 'react'

function App() {
  const [events, setEvents] = useState(sampleEvents) //useState (right-side) returns [currentValue, setterFunction] with currentValue being sampleEvents
  //left side of the statement is destructuring useState(sampleEvents) into an array, which is [sampleEvents, setterFunction]
  //so we assign events = currentValue = sampleEvents (**This is only true for the 1st render)  and  setEvents=setterFunction - this state's memory of events is stored outside of the App component
  //setEvents is able to access the memory slot of events outside of the component and can reassign the list with a new one. React notices the difference in references and re-renders App

  console.log(events) //log events here - fresh after each render

  function addNewEvent(newEventObject){
    setEvents([...events, newEventObject])  // [...events, newEventObject] is re-building a new array with the events, then it's adding newEventObject at the end of the array
    //setEvents updates the memory slot of events to the array we passed in as an argument, then React will re-render because it notices a change in states due to the difference of references between the old and new array.
    //do not log events here because in here, React hasn't refreshed yet so you will not be logging the event after the newEventObject is added
  }


  return (
    <div className=' flex min-h-screen bg-stone-100 pr-8 space-x-4'>
      <Sidebar />
      <EventForm addEvent={addNewEvent} /> 
      {/* React packages the props into an object where the keys are the attribute names {addEvent: addNewEvent}*/}
      {/* the addNewEvent function is being passed as a prop to EventForm. The EventForm component will unpack the props object receive it as addEvent*/}
      
      {/* Timeline of Events -------------------------------------------- */}
      {/* <div className='flex-1 py-8'>
        <h1 className='text-2xl font-bold mb-6'>Timeline of Events</h1>
        <Timeline events={sampleEvents} />
      </div> */}
    </div>
  )
}

export default App
