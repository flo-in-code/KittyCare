import { useState } from "react"

function AddCatForm({ addCats, closeForm }) {
    const [catName, setCatName] = useState('')
    const [catBreed, setCatBreed] = useState('')
    const [catColorMarkings, setCatColorMarkings] = useState('')
    const [catBirthday, setCatBirthday] = useState('')
    const [catWeight, setCatWeight] = useState('')
    const [vetName, setVetName] = useState('')
    const [vetPhone, setVetPhone] = useState('')
    const [microchipID, setMicrochipID] = useState('')

    function submitHandler(e) {
        e.preventDefault()
        addCats({
            id: crypto.randomUUID(),
            name: catName,
            breed: catBreed,
            color: catColorMarkings,
            birthday: catBirthday,
            weight: parseFloat(catWeight) || 0,
            vetName: vetName,
            vetPhone: vetPhone,
            microchipID: microchipID
        })

        resetForm()
        closeForm()

    }

    function resetForm(){
        setCatName('')
        setCatBreed('')
        setCatColorMarkings('')
        setCatBirthday('')
        setCatWeight('')
        setVetName('')
        setVetPhone('')
        setMicrochipID('')
    }


    return (
        <div onClick={() => closeForm()} className="fixed inset-0 z-30 bg-black/40 flex items-center justify-center">
            <form onSubmit={submitHandler} onClick={(e)=> e.stopPropagation()} className="bg-white rounded-2xl p-6 min-w-sm max-w-md space-y-4">
                <div className="flex justify-between pb-3 border-b border-stone-300">
                    <div className="font-bold text-xl text-stone-800">Add a Cat</div>
                    <div onClick={closeForm} className="text-stone-800 font-semibold">x</div>
                </div>
                {/* Name ---------------------------------------------------------------------------------- */}
                <div>
                    <label className="text-sm font-semibold text-stone-700 mt-2">Name *</label>
                    <input required type="text" value={catName} onChange={(e) => setCatName(e.target.value)} placeholder="e.g. Mochi" className="w-full border border-stone-300 bg-taupe-100 rounded-md pl-2 py-1 mt-1"></input>
                </div>
                {/* Breed ---------------------------------------------------------------------------------- */}
                <div>
                    <label className="text-sm font-semibold text-stone-700 mt-2">Breed</label>
                    <input type="text" value={catBreed} onChange={(e) => setCatBreed(e.target.value)} placeholder="e.g. Scottish Fold" className="w-full border border-stone-300 bg-taupe-100 rounded-md pl-2 py-1 mt-1"></input>
                </div>
                {/* Color/Markings ---------------------------------------------------------------------------------- */}
                <div>
                    <label className="text-sm font-semibold text-stone-700 mt-2">Color/Markings</label>
                    <input type="text" value={catColorMarkings} onChange={(e) => setCatColorMarkings(e.target.value)} placeholder="e.g. Orange Tabby" className="w-full border border-stone-300 bg-taupe-100 rounded-md pl-2 py-1 mt-1"></input>
                </div>
                {/* Birthday & Weight ---------------------------------------------------------------------------------- */}
                <div className="flex space-x-2 pb-4 border-b border-stone-300">
                    <div>
                        <label className="text-sm font-semibold text-stone-700 mt-2">Birthday</label>
                        <input type="date" value={catBirthday} onChange={(e) => setCatBirthday(e.target.value)} className="w-full border border-stone-300 bg-taupe-100 rounded-md pl-2 py-1 mt-1"></input>
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-stone-700 mt-2">{`Weight (lbs)`}</label>
                        <input type="number" value={catWeight} onChange={(e) => setCatWeight(e.target.value)} placeholder="e.g. 9.2" className="w-full border border-stone-300 bg-taupe-100 rounded-md pl-2 py-1 mt-1"></input>
                    </div>
                </div>
                {/* Veterinarian Name & Phone */}
                <div className=" pb-2">
                    <p className="text-xs text-stone-500 pb-2">{`Veterinarian (optional)`}</p>
                    <div className="flex space-x-2">
                        <div>
                            <label className="text-sm font-semibold text-stone-700 mt-2">Vet Name</label>
                            <input type="text" value={vetName} onChange={(e) => setVetName(e.target.value)} placeholder="e.g. Dr.Chen" className="w-full border border-stone-300 bg-taupe-100 rounded-md pl-2 py-1 mt-1"></input>
                        </div>
                        <div>
                            <label className="text-sm font-semibold text-stone-700 mt-2">{`Vet Phone`}</label>
                            <input type="text" value={vetPhone} onChange={(e) => setVetPhone(e.target.value)} placeholder="e.g.(415) 555-0100" className="w-full border border-stone-300 bg-taupe-100 rounded-md pl-2 py-1 mt-1"></input>
                        </div>
                    </div>

                </div>
                {/* Microchip ID ---------------------------------------------------------------------------------- */}
                <div>
                    <label className="text-sm font-semibold text-stone-700">Microchip ID</label>
                    <input type="text" value={microchipID} onChange={(e) => setMicrochipID(e.target.value)} placeholder="e.g. 21684621328545152" className="w-full border border-stone-300 bg-taupe-100 rounded-md pl-2 py-1 mt-1"></input>
                </div>
                {/* Cancel and Submit buttons --------------------------------- */}
                {/* buttons in a form default type is submit. change type to button to make it a non-submit button */}
                <div className="flex gap-2 py-2">
                    <button type="button" onClick={() => closeForm()} className="flex-1 border border-stone-300 bg-stone-50 text-stone-700 rounded-md py-1">Cancel</button>
                    <button type="submit" className="flex-1 border border-stone-300 bg-emerald-600 text-white rounded-md py-1">Save New Cat</button>
                </div>
            </form>
        </div>
    )
}

export default AddCatForm