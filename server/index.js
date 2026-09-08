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


app.listen(3001, () => {
    console.log('Server running on localhost 3001')
})

