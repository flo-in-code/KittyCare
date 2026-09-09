
import './App.css'
import Timeline from './components/Timeline'
import Sidebar from './components/Sidebar'
import { useEffect, useState } from 'react'

function App() {

  const [events, setEvents] = useState([])

  useEffect(() => {
    async function loadEvents() {
      const res = await fetch('http://localhost:3001/events')
      const data = await res.json()
      setEvents(data)
    }
    loadEvents()
  }, [])

  //cats
  const [cats, setCats] = useState([])

  useEffect(() => {
    async function loadCats() {
      const res = await fetch('http://localhost:3001/cats')
      const data = await res.json()
      setCats(data)
    }
    loadCats()
  }, [])

  const [selectedCatId, setSelectedCatId] = useState(null)

  const activeCatId = selectedCatId ?? cats[0]?._id

  const relevantEvents = events?.filter(event => event?.catId === activeCatId) //filter events related to only the selected cat

  console.log(`Events: ${events}`)
  console.log(`Cats: ${cats}`)


  async function addNewEvent(newEventObject){
    try{
      const response = await fetch ('http://localhost:3001/events', {
        method: 'POST', 
        headers: {'content-type':'application/json'},
        body: JSON.stringify(newEventObject)
      })

      if(!response.ok){
        throw new Error('Event rejected by server')
      }

      const savedEvent = await response.json()
      setEvents([...events, savedEvent])
    }catch (err){
      console.error('Failed to save event', err)
    }
  }

  async function deleteEvent(eventID) {
    setEvents(events.filter((event) => event._id !== eventID))

    try {
      const response = await fetch(`http://localhost:3001/events/${eventID}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Server failed to delete event')
      }

    } catch (err) {
      console.error('Failed to delete event', err)
      setEvents(events)
    }
  }

  async function addCats(newCat){
    try{
      const response = await fetch('http://localhost:3001/cats', {
        method: 'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(newCat)
      })

      if (!response.ok){
        throw new Error('New cat rejected by server')
      }
      const savedCat = await response.json()
      setCats([...cats, savedCat])
    }catch(err){
      console.error('Failed to save cat:', err)
    }
  }

  async function deleteCat(catID) {
    const isActiveCat = catID === activeCatId

    setCats(cats.filter((cat) => cat._id !== catID))
    if(isActiveCat) setSelectedCatId(null) //setSelectedCatId to null on next render

    try {
      const response = await fetch(`http://localhost:3001/cats/${catID}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Server failed to delete cat')
      }
    } catch(err){
      console.log('Failed to delete cat:', err)
      setCats(cats)
      if(isActiveCat) setSelectedCatId(selectedCatId) //the selectedCatId captured here is the cat that the user clicked on, if not null. This variable has not been changed yet
    } 
  }

  async function updateCat(catID, updates){
    try{
      const response = await fetch(`http://localhost:3001/cats/${catID}`, {
        method: 'PATCH',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(updates)
      })

      if(!response.ok){
        throw new Error('Cat update rejected by server')
      }

      const updatedCat = await response.json()
      setCats(cats.map((cat)=> {
        if (cat._id === catID){
          return updatedCat
        }else return cat
      }))
    }catch(err){
      console.error('Failed to update cat:', err)
    }
  }

  return (
    <div className=' flex min-h-screen bg-stone-100 pr-8 space-x-4'>
      <Sidebar cats={cats} selectedCatId={activeCatId} setSelectedCatId={setSelectedCatId} addCats={addCats} deleteCat={deleteCat} updateCat={updateCat} />

      {/* Timeline of Events -------------------------------------------- */}
      <div className='flex-1 py-8'>
        <h1 className='text-2xl font-bold mb-6'>Timeline of Events</h1>
        <Timeline events={relevantEvents} addEvents={addNewEvent} selectedCatId={activeCatId} deleteEvent={deleteEvent} />
      </div>
    </div>
  )
}

export default App
