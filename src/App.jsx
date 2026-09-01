
import './App.css'
import { sampleEvents } from './data/sampleEvents'
import EventCard from './components/EventCard'
import Timeline from './components/Timeline'
import Sidebar from './components/Sidebar'

function App() {

  return (
    <div className=' flex min-h-screen bg-stone-100 pr-8 space-x-4'>
      <Sidebar />
      <div className='flex-1 py-8'>
        <h1 className='text-2xl font-bold mb-6'>Timeline of Events</h1>
        <Timeline events={sampleEvents} />
      </div>
    </div>
  )
}

export default App
