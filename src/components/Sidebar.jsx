//import {sampleCatProfiles} from '../data/sampleCats.js'
import { useState } from 'react'
import CatSelector from './CatSelector'

const navItems =[
    {id: 1, item: "Timeline"}, {id: 2, item: "Calendar"}, {id: 3, item: "Appointment"}, {id: 4, item: "Vet Prep"}
]

function Sidebar({cats, selectedCatId, setSelectedCatId}) {
    const [activeView, setActiveView] = useState('Timeline')

    return (
        <div className="bg-white py-8 w-50">
            {/* Logo and App Name ----------------------------------------- */}
            <div className="flex space-x-2 px-2 mb-2">
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#607d8b"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M20 3v10a8 8 0 1 1 -16 0v-10l3.432 3.432a7.963 7.963 0 0 1 4.568 -1.432c1.769 0 3.403 .574 4.728 1.546l3.272 -3.546z" />
                        <path d="M2 16h5l-4 4" />
                        <path d="M22 16h-5l4 4" />
                        <path d="M12 16m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                        <path d="M9 11v.01" />
                        <path d="M15 11v.01" />
                    </svg>
                </div>
                <div className="">
                    <div className="text-sm font-bold">KittyCare</div>
                    <div className="text-sm font-light tracking-tight">Cat Health Tracking App</div>
                </div>
            </div>
            {/* divider */}
            <div className="border-t border-stone-300"></div>
            {/* Active Cat ------------------------------------------------*/}
            <div className='w-full px-3 my-2'>
                <CatSelector cats={cats} selectedCatId={selectedCatId} setSelectedCatId={setSelectedCatId}/>
            </div>
            
            
            {/* <div className="">
                <h2 className="uppercase text-xs font-semibold tracking-wide text-stone-500 my-2 text-center">Active cat</h2>
                <div className="flex flex-col">
                    {cats.map((cat)=> {
                        return <button key={cat.id} onClick={() => setSelectedCatId(cat.id)} className={`flex justify-center px-3 py-2 ${selectedCatId === cat.id? 'bg-emerald-700 text-white': 'bg-taupe-100 hover:bg-stone-500'}  rounded-lg  m-3`}>
                            <img src="" alt="" />
                            <div>
                                <p>{cat.name}</p>
                                <p className='text-sm opacity-60'>{cat.breed}</p>
                            </div>
                        </button>

                    })}
                </div>
            </div> */}
            {/* divider */}
            <div className="border-t border-stone-300"></div>
            {/* Navigation buttons ----------------------------------------*/}
            <div className="flex flex-col">
                {navItems.map((nav) => {
                    return <button  key={nav.id} onClick={() => setActiveView(nav.item)} className={`px-3 py-2 m-3 rounded-lg ${activeView === nav.item? 'bg-emerald-700 text-white': 'bg-stone-200'} `}>
                        {nav.item}
                        </button>
                        // depending which button is clicked, activeView will be set to the nav.item of that button
                })}
            </div>
        </div>
    )
}

export default Sidebar