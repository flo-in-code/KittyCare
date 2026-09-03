import { useState } from "react"


function CatSelector({cats, selectedCatId, setSelectedCatId}) {
    const [dropdownState, setDropdownState] = useState(false)

    const selectedCat = cats.find((cat) => cat.id === selectedCatId)


  return (
    <div className="">
        <h2 className="uppercase text-xs font-semibold tracking-wide text-stone-500 my-2 text-center">Active cat</h2>
        
        <button onClick={() => dropdownState(!dropdownState)} className="w-full flex justify-between border rounded-lg">
            <div className={`flex-1 text-left px-3 py-1 `}>
                <p className="font-semibold">{selectedCat.name}</p>
                <p className='text-sm opacity-60'> {selectedCat.breed} </p>
            </div>
            <span className="pr-3 text-sm opacity-40 content-center">v</span>
        </button>



    </div>
  )
}

export default CatSelector