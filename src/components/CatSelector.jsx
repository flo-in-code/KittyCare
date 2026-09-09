import { useState } from "react"
import AddCatForm from "./AddCatForm"
import EditCatForm from "./EditCatForm"


function CatSelector({ cats, selectedCatId, setSelectedCatId, addCats, deleteCat, updateCat }) {
    const [dropdownState, setDropdownState] = useState(false)
    const [isAddingCat, setIsAddingCat] = useState(false)
    const [isEditingCat, setIsEditingCat] = useState(false)
    const [editingCat, setEditingCat] = useState('')

    const selectedCat = cats.find((cat) => cat._id === selectedCatId)


    return (
        <div className="">
            <h2 className="uppercase text-xs font-semibold tracking-wide text-stone-500 my-2 text-center">Active cat</h2>

            <button onClick={() => setDropdownState(!dropdownState)} className="w-full flex justify-between border border-stone-300 rounded-lg">
                <div className={`flex-1 text-left px-3 py-1 `}>
                    <p className="font-semibold">{selectedCat?.name}</p>
                    <p className='text-sm opacity-60'> {selectedCat?.breed} </p>
                </div>
                <span className="pr-3 text-sm opacity-40 content-center">v</span>
            </button>

            {dropdownState && (
                <>
                    <div onClick={() => setDropdownState(false)} className="fixed inset-0 z-10"></div>

                    <div className=" border border-stone-300 rounded-lg my-2">
                        <p className="text-sm opacity-50 pl-3 pt-1 ">Select a cat: </p>
                        <div className="flex flex-col">
                            {cats.map((cat) => {
                                return <div key={cat._id} onClick={() => setSelectedCatId(cat._id)} className={`flex justify-between px-3 py-2 ${selectedCatId === cat._id ? 'bg-emerald-700 text-white' : 'bg-taupe-100 hover:bg-stone-500'}  rounded-lg  m-3 z-20`}>
                                    {/* <img src="" alt="" /> */}
                                    <div>
                                        <p>{cat.name}</p>
                                        <p className='text-sm opacity-60'>{cat.breed}</p>
                                    </div>
                                    <div onClick={(e) => {e.stopPropagation(); deleteCat(cat._id)}} className="text-sm opacity-60 hover:opacity-100 hover:text-red-600">x</div>
                                </div>
                            })}
                            <button onClick={() => {setIsAddingCat(true); setDropdownState(false)}} className={`flex justify-center px-3 py-2 border border-dashed border-stone-500 rounded-lg  m-3 hover:border-emerald-700 hover:text-emerald-700 z-20`}>Add a cat</button>
                        </div>

                    </div>
                </>
            )}
            
            {isAddingCat && <AddCatForm addCats={addCats} closeForm={() => setIsAddingCat(false)} />}

        </div>
    )
}

export default CatSelector