
function EventForm() {
    return (
        <form className="flex flex-col py-4 px-4 bg-white rounded-2xl m-8 space-y-2">
            <h1 className="text-xl font-bold ">{`Log Health Event`}</h1>
            <h4>{`for CAT NAME`}</h4>
            <div className="border-t border-stone-300"></div>
            {/* Category Selection ------------------------------- */}
            <p className="text-sm font-semibold text-stone-700">What happened?</p>
            <select className="border border-stone-300 bg-taupe-100 pl-2 py-1 rounded-md">
                <option value="" disabled selected>Selection an option</option>
                <option value="">Behavior</option>
                <option value="">Diet</option>
                <option value="">Coughing</option>
                <option value="">Injury</option>
                <option value="">Medication</option> 
                <option value="">Stool</option>
                <option value="">Surgery</option>
                <option value="">Vet Visit</option>
                <option value="">Vomiting</option>
                <option value="">Weight</option>
                <option value="">Other</option>
            </select>
            {/* Date & Time -------------------------------- */}
            <label htmlFor="" className="text-sm font-semibold text-stone-700">Date & Time</label>
            <input type="datetime-local" className="border border-stone-300 bg-taupe-100 rounded-md pl-2 py-1"></input>
            {/* Title ---------------------------------------*/}
            <label htmlFor="" className="text-sm font-semibold text-stone-700">Title</label>
            <input type="text" className="border border-stone-300 bg-taupe-100 rounded-md pl-2 py-1" ></input>
            {/* Notes & Details ---------------------------------------*/}
            <label className="text-sm font-semibold text-stone-700">Notes & Details</label>
            <textarea name="" id="" className="border border-stone-300 bg-taupe-100 rounded-md pl-2 py-1"></textarea>
            {/* "Severity tag" ---------------------------------------*/}
            <label htmlFor="" className="text-sm font-semibold text-stone-700">Severity</label>
            <div className="flex gap-2">
                <button className="border border-stone-300 rounded-md px-4 py-2 text-stone-700">Mild</button>
                <button className="border border-stone-300 rounded-md px-4 py-2 text-stone-700">Moderate</button>
                <button className="border border-stone-300 rounded-md px-4 py-2 text-stone-700">Severe</button>
            </div>
             {/* Vet Prep Flag ---------------------------------------*/}
            <div className="flex gap-1 py-2">
                <input type="checkbox"></input>
                <p className="text">Flag for vet appointment prep</p>
            </div>
             {/* Photo & Video Upload ---------------------------------------*/}
            <div>
                <p className="text-sm font-semibold text-stone-700 py-2">Upload photos or video</p>
            </div>

        </form>
    )
}

export default EventForm