import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'

mongoose.connect(process.env.MONGO_URI) 
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('MongoDB connection error:', err))

const app = express()

app.use(express.json())
app.use(cors()) 


//MongoDB Schemas
const catSchema = new mongoose.Schema({
    name: {type: String, required: true},
    breed: String,
    color: String,
    birthday: String,
    weight: Number,
    vetName: String,
    vetPhone: String,
    microchipID: String
})

const eventSchema = new mongoose.Schema({
    catId: {type: mongoose.Schema.Types.ObjectId, ref: 'Cat', required: true}, // this is how mongoose tells the ID in this field to point over to a document in another collection. ref: 'Cat' enables population feature
    type: String,
    title: {type: String, required: true},
    date: {type: Date, required: true},
    severity: String,
    vetFlagged: Boolean, 
    notes: String
})

//MongoDB models
const Cat = mongoose.model('Cat', catSchema)
const Event = mongoose.model('Event', eventSchema)

app.get('/', (req, res) => {
    res.send('Hello from the server!')
})


//cat routes - Mongoose
app.get('/cats', async(req, res) => { 
    const cats = await Cat.find()
    res.json(cats)
})

app.post('/cats', async(req, res) => {
    const newCat = req.body
    
    if(!newCat || !newCat.name){
        return res.status(400).json({error: 'missing required field'})
    }

    const createdCat = await Cat.create(newCat) 
    res.status(201).json(createdCat) 
})

app.delete('/cats/:id', async (req, res) =>{
    const {id} = req.params
    const deletedCat = await Cat.findByIdAndDelete(id) 

    if(!deletedCat){
        return res.status(404).json({error: 'Cat not found'})
    }
    return res.status(204).end()
})

app.patch('/cats/:id', async (req, res) =>{
    const {id} = req.params
    const updates = req.body //passing a plain object. mongoose treats a plain object like this as a shorthand for $set, meaning only the fields you included gets changed, and every other field on the document gets untouched. This is what mongoose does to a PATCH(partial update) rather than PUT(full replace)
    const updatedCat = await Cat.findByIdAndUpdate(id, updates, {returnDocument: 'after', runValidators: true})
    //we need the settings object {returnDocument: 'after'} or {new: true} (older version) because it controls which snapshot of the document gets handed as the return value. MongoDB applies $set: {notes: "new notes"} and saves it. 
    //without {returnDocument: 'after'}, MongoDB by default captures the snapshot of the document the instant BEFORE applying the changes and that is the default return value of findByIdAndUpdate(..), so even though mongoDB will hold the updated document, the value you're capturing by default with findByIdAndUpdate will be stale 
    //with {returnDocument: 'after'}, mongoDB hands back a snapshot taken after the changes were committed to match what's in the database after the changes were applied.
    //{runValidators: true} validates rules like required:true in the Schema. Mongoose does not run schema validation rules on updates, only on creation. So without {runValidators: true} we could patch a cat's name to an empty string and Mongoose would allow it to silently bypass the same rules that protects POST.

    if(!updatedCat){
        return res.status(404).json({error:'Cat not found'})
    }

    res.status(200).json(updatedCat)
})


// event routes - mongoose
app.get('/events', async(req, res) =>{
    const events = await Event.find()
    res.json(events)
})

app.post('/events', async(req, res) =>{
    const newEvent = req.body

    if (!newEvent || !newEvent.title || !newEvent.date) {
        return res.status(400).json({Error: 'New event is missing required fields'})
    }

    const createdEvent = await Event.create(newEvent)
    res.status(201).json(createdEvent)
})

app.delete('/events/:id', async(req, res) =>{
    const {id} = req.params
    const deletedEvent = await Event.findByIdAndDelete(id)

    if(!deletedEvent){
        return res.status(404).json({error:'Event not found'})
    }

    res.status(204).end()
})

app.patch('/events/:id', async(req, res) => {
    const {id} = req.params
    const updates = req.body
    const updatedEvent = await Event.findByIdAndUpdate(id, updates, {returnDocument: 'after', runValidators: true})

    if (!updatedEvent){
        return res.status(404).json({error: 'Event not found'})
    }

    res.status(200).json(updatedEvent)
})


app.listen(3001, () => {
    console.log('Server running on localhost 3001')
})

