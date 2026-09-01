
import './App.css'
import { sampleEvents } from './data/sampleEvents'
import EventCard from './components/EventCard'
import Timeline from './components/Timeline'

function App() {

  return (
    <div className='min-h-screen bg-stone-100 p-8'>
      <h1 className='text-2xl font-bold mb-6'>KittyCare</h1>
      <Timeline events={sampleEvents}/>
    </div>
  )
}

export default App
