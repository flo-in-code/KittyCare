import { useState } from "react"


function CatSelector({ cats, selectedCatId, setSelectedCatId }) {
    const [dropdownState, setDropdownState] = useState(false)

    const selectedCat = cats.find((cat) => cat.id === selectedCatId)


    return (
        <div className="">
            <h2 className="uppercase text-xs font-semibold tracking-wide text-stone-500 my-2 text-center">Active cat</h2>

            <button onClick={() => setDropdownState(!dropdownState)} className="w-full flex justify-between border border-stone-300 rounded-lg">
                <div className={`flex-1 text-left px-3 py-1 `}>
                    <p className="font-semibold">{selectedCat.name}</p>
                    <p className='text-sm opacity-60'> {selectedCat.breed} </p>
                </div>
                <span className="pr-3 text-sm opacity-40 content-center">v</span>
            </button>

            {/* Dropdown opens below when the user clicks on the button above */}
            {dropdownState && (
                <>
                    {/* add a layer across the screen so users can close the dropdown by clicking outside */}
                    <div onClick={() => setDropdownState(false)} className="fixed inset-0"></div>

                    <div className=" border border-stone-300 rounded-lg my-2">
                        <p className="text-sm opacity-50 pl-3 pt-1 ">Select a cat: </p>
                        <div className="flex flex-col">
                            {cats.map((cat) => {
                                return <button key={cat.id} onClick={() => setSelectedCatId(cat.id)} className={`flex justify-center px-3 py-2 ${selectedCatId === cat.id ? 'bg-emerald-700 text-white' : 'bg-taupe-100 hover:bg-stone-500'}  rounded-lg  m-3`}>
                                    {/* <img src="" alt="" /> */}
                                    <div>
                                        <p>{cat.name}</p>
                                        <p className='text-sm opacity-60'>{cat.breed}</p>
                                    </div>
                                </button>
                            })}
                        </div>

                    </div>
                </>
            )}

        </div>
    )
}

export default CatSelector