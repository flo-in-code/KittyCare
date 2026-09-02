
function EventForm() {
    return (
        <form className="flex flex-col">
            <h1>{`Log Health Event for CAT NAME`}</h1>
            <div>-------------------------------</div>
            {/* Category Selection ------------------------------- */}
            <h3>What happened?</h3>
            <select>
                <option>Behavior</option>
                <option>Diet</option>
                <option>Coughing</option>
                <option>Injury</option>
                <option>Medication</option>
                <option>Stool</option>
                <option>Surgery</option>
                <option>Vet Visit</option>
                <option>Vomiting</option>
                <option>Weight</option>
                <option>Other</option>
            </select>
            {/* Date & Time -------------------------------- */}
            <input></input>
            {/* Title ---------------------------------------*/}
            <label>Title</label>
            <input type="text"></input>
            {/* Notes & Details ---------------------------------------*/}
            <label>Notes & Details</label>
            <textarea name="" id=""></textarea>
            {/* "Severity tag" ---------------------------------------*/}
            <div>
                <button>Mild</button>
                <button>Moderate</button>
                <button>Severe</button>
            </div>
             {/* Vet Prep Flag ---------------------------------------*/}
            <div className="flex">
                <input type="checkbox"></input>
                <p>Flag for vet appointment prep</p>
            </div>
             {/* Photo & Video Upload ---------------------------------------*/}
            <div>
                <p>Upload photos or video</p>
            </div>

        </form>
    )
}

export default EventForm