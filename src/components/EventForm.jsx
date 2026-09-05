import { useState } from "react"

function EventForm({ addEvent, selectedCatId, closeForm }) {
    //creating one useState per field to track state changes
    const [type, setType] = useState('') //initialize type value as '', sets type field as ''
    const [date, setDate] = useState('')
    const [title, setTitle] = useState('')
    const [notes, setNotes] = useState('')
    const [severity, setSeverity] = useState('')
    const [vetPrepFlag, setVetPrepFlag] = useState(false)

    function submitHandler(e) {
        e.preventDefault() //prevents eventform from reloading after submit

        addEvent({
            id: crypto.randomUUID(), //generates unique ID
            catId: selectedCatId,
            type: type,
            title: title,
            notes: notes,
            date: new Date(date).toISOString(), //converting to ISO string to keep data uniform
            severity: severity,
            vetFlagged: vetPrepFlag
        })

        //reset the state variable after the form has been submitted
        resetForm()
        closeForm()
    }

    function resetForm() {
        setType('')
        setDate('')
        setTitle('')
        setNotes('')
        setSeverity('')
        setVetPrepFlag(false)
    }

    return (

        <div onClick={closeForm} className="fixed inset-0 bg-black/40 flex justify-center items-center">
            <form onSubmit={submitHandler} onClick={(e) => e.stopPropagation()} className="flex flex-col py-6 px-8 bg-white rounded-2xl m-12 space-y-2">
                <h1 className="text-xl font-bold ">{`Log Health Event`}</h1>
                <h4>{`for CAT NAME`}</h4>
                <div className="border-t border-stone-300"></div>
                {/* Category Selection ------------------------------- */}
                {/* control the value of the field with value - and helps clear the form after  */}
                <p className="text-sm font-semibold text-stone-700 mt-2">What happened?</p>
                <select value={type} onChange={(e) => setType(e.target.value)} className="border border-stone-300 bg-taupe-100 pl-2 py-1 rounded-md">
                    <option value="" disabled selected>Select an option</option>
                    <option value="behavior">Behavior</option>
                    <option value="diet">Diet</option>
                    <option value="coughing">Coughing</option>
                    <option value="injury">Injury</option>
                    <option value="medication">Medication</option>
                    <option value="stool">Stool</option>
                    <option value="surgery">Surgery</option>
                    <option value="vetVisit">Vet Visit</option>
                    <option value="vomiting">Vomiting</option>
                    <option value="weight">Weight</option>
                    <option value="other">Other</option>
                </select>
                {/* Date & Time -------------------------------- */}
                <label htmlFor="" className="text-sm font-semibold text-stone-700 mt-2">Date & Time</label>
                <input required type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} className="border border-stone-300 bg-taupe-100 rounded-md pl-2 py-1"></input>
                {/* Title ---------------------------------------*/}
                <label htmlFor="" className="text-sm font-semibold text-stone-700 mt-2">Title</label>
                <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Vomiting 3x in one morning" className="border border-stone-300 bg-taupe-100 rounded-md pl-2 py-1" ></input>
                {/* Notes & Details ---------------------------------------*/}
                <label className="text-sm font-semibold text-stone-700 mt-2">Notes & Details</label>
                <textarea name="" id="" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="When did it start? How often? Any other symptoms? What did you observe?"
                    className="h-32 border border-stone-300 bg-taupe-100 rounded-md pl-2 py-1"></textarea>
                {/* "Severity tag" ---------------------------------------*/}
                <label htmlFor="" className="text-sm font-semibold text-stone-700 mt-2">Severity</label>
                <div className="flex gap-2">
                    <button type="button" onClick={() => setSeverity('Mild')} className={`border ${severity === 'Mild' ? 'bg-olive-300' : ''} border-stone-300 rounded-md px-4 py-2 text-stone-700`}>Mild</button>
                    <button type="button" onClick={() => setSeverity('Moderate')} className={`border ${severity === 'Moderate' ? 'bg-stone-200' : ''} border-stone-300 rounded-md px-4 py-2 text-stone-700`}>Moderate</button>
                    <button type="button" onClick={() => setSeverity('Severe')} className={`border ${severity === 'Severe' ? 'bg-stone-200' : ''} border-stone-300 rounded-md px-4 py-2 text-stone-700`}>Severe</button>
                </div>
                {/* Vet Prep Flag ---------------------------------------*/}
                {/* checked controls whether a checkbox is checked */}
                <div className="flex gap-1 py-2 mt-2">
                    <input type="checkbox" checked={vetPrepFlag} onChange={(e) => setVetPrepFlag(e.target.checked)}></input>
                    <p className="text">Flag for vet appointment prep</p>
                </div>
                {/* Photo & Video Upload ---------------------------------------*/}
                <div>
                    <p className="text-sm font-semibold text-stone-700 py-2 mt-2">Upload photos or video</p>
                </div>
                {/* Cancel and Submit buttons --------------------------------- */}
                {/* buttons in a form default type is submit. change type to button to make it a non-submit button */}
                <div className="flex gap-2">
                    <button type="button" onClick={closeForm} className="flex-1 border border-stone-300 bg-stone-50 text-stone-700 rounded-md py-1">Cancel</button>
                    <button type="submit" className="flex-1 border border-stone-300 bg-emerald-600 text-white rounded-md py-1">Save Event</button>
                </div>

            </form>
        </div>

    )
}

export default EventForm