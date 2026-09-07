
import './App.css'
import { sampleEvents } from './data/sampleEvents'
import { sampleCatProfiles } from './data/sampleCats'
import EventCard from './components/EventCard'
import Timeline from './components/Timeline'
import Sidebar from './components/Sidebar'
import EventForm from './components/EventForm'
import { useEffect, useState } from 'react'
import AddCatForm from './components/AddCatForm'
import FetchTest from './components/FetchTest'

function App() {
  //events
  // const [events, setEvents] = useState(sampleEvents) //useState (right-side) returns [currentValue, setterFunction] with currentValue being sampleEvents
  //left side of the statement is destructuring useState(sampleEvents) into an array, which is [sampleEvents, setterFunction]
  //so we assign events = currentValue = sampleEvents (**This is only true for the 1st render)  and  setEvents=setterFunction - this state's memory of events is stored outside of the App component
  //setEvents is able to access the memory slot of events outside of the component and can reassign the list with a new one. React notices the difference in references and re-renders App

  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('events')
    return savedEvents ? JSON.parse(savedEvents) : sampleEvents
  })
  //using an arrow function as a lazy initializer to grab events from localstorage. Without the arrow function, useState(localStorage.getItem('events') would call on every render)
  //localStorage only stores things in strings, so we need JSON.parse to turn it into JS data (an array of objects)
  //on first load, React will read whatever is saved in local storage and use it as the starting state instead of starting from a data file

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events))
  }, [events])
  //useStates, JSX, renders runs inside React. localStorage is a browser API that exists outside of React. useEffect is used to synchronize React components with things outside of react like the DOM, a timer, browser's storage, etc.
  // useEffect takes 2 arguments: 1) a function containing the outside-of-react work and 2) a dependency array telling React when to rerun that function.

  //cats
  // const [cats, setCats] = useState(sampleCatProfiles)
  const [cats, setCats] = useState([])

  useEffect(() => {
    async function loadCats(){
      const res = await fetch('http://localhost:3001/cats')
      const data = await res.json()
      setCats(data)
    }
    loadCats()
  }, [])
  //cats has already been assigned by the time useEffect runs

  // const [selectedCatId, setSelectedCatId] = useState(cats[0]?.id)
  const [selectedCatId, setSelectedCatId] = useState(null)

  console.log(`cat log: ${cats}`)
  const activeCatId = selectedCatId ?? cats[0]?.id
  //need activeCatId to derive the active cat from the selectedCatId state because we should not use setSelectedCatId within the render, or we could run into problems with inifinite renders
  console.log(`active cat id: ${activeCatId}`)


  const relevantEvents = events.filter(event => event.catId === activeCatId) //filter events related to only the selected cat

  console.log(`Events: ${events}`) //log events here - fresh after each render
  console.log(events)
  console.log(`Cats: ${cats}`)
  console.log(cats)



  function addNewEvent(newEventObject) {
    setEvents([...events, newEventObject])  // [...events, newEventObject] is re-building a new array with the events, then it's adding newEventObject at the end of the array
    //setEvents updates the memory slot of events to the array we passed in as an argument, then React will re-render because it notices a change in states due to the difference of references between the old and new array.
    //do not log events here because in here, React hasn't refreshed yet so you will not be logging the event after the newEventObject is added
  }

  function deleteEvent(eventID) {
    setEvents(events.filter((event) => event.id !== eventID))
  }

  function addCats(newCat) {
    setCats([...cats, newCat])
  }



  return (
    <div className=' flex min-h-screen bg-stone-100 pr-8 space-x-4'>
      <Sidebar cats={cats} selectedCatId={activeCatId} setSelectedCatId={setSelectedCatId} addCats={addCats} />


      {/* <EventForm addEvent={addNewEvent} />  */}
      {/* React packages the props into an object where the keys are the attribute names {addEvent: addNewEvent}*/}
      {/* the addNewEvent function is being passed as a prop to EventForm. The EventForm component will unpack the props object receive it as addEvent*/}

      {/* Timeline of Events -------------------------------------------- */}
      <div className='flex-1 py-8'>
        <h1 className='text-2xl font-bold mb-6'>Timeline of Events</h1>
        <Timeline events={relevantEvents} addEvents={addNewEvent} selectedCatId={activeCatId} deleteEvent={deleteEvent} />
      </div>
      {/* <AddCatForm /> */}
    </div>
  )
}

export default App
