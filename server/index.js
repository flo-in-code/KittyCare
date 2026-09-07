import express from 'express'
import cors from 'cors'

const app = express()
//creates an application object. app is the whole server and everything else (defining routes, starting up) is a method called upon this app object

app.use(express.json()) //middleware to read json data sent over routes
app.use(cors()) //middleware to allow browser to read responses from the server on client-side

const cats = [
    { id: 1, name: 'Mochi', breed: 'Scottish Fold' },
    { id: 2, name: 'Duchess', breed: 'Persian' }
]

const events = [
    { id: 1, catId: 1, type: 'vetVisit', title: 'Annual Check Up', date: '2026-06-01T10:00:00.000Z', notes: 'Routine checkup, all clear.', severity: 'Mild', vetFlagged: false },
    { id: 2, catId: 1, type: 'coughing', title: 'Coughing 5 times in a row', date: '2026-06-15T14:30:00.000Z', notes: 'Started this morning.', severity: 'Moderate', vetFlagged: true },
    { id: 3, catId: 2, type: 'weight', title: 'Weight check', date: '2026-06-20T09:00:00.000Z', notes: '', severity: 'Mild', vetFlagged: false }
]

app.get('/', (req, res) => {
    res.send('Hello from the server!')
})
//This is a GET route. the route: a pairing of a HTTP method (GET) and a URL path ('/') to a handler function
//req - everything about the incoming request
//res - tool for sending something back  res.send('...') sends back plain text and res.json({...}) sends data structures 


app.get('/cats', (req, res) => {
    res.json(cats)
})
// the route 'localhost:3001/cats' gives us the cat data

app.post('/cats', (req, res) => {
    const newCat = req.body

    if(!newCat || !newCat.name){
        return res.status(400).json({error: 'missing required cat field'})
    }

    cats.push(newCat)
    res.status(201).json(newCat)
})

app.delete('/cats/:id', (req, res) =>{
    const {id} = req.params
    const index = cats.findIndex((cat) => cat.id === id)
    
    if (index === -1){
        return res.status(404).json({error: 'Cat not found'})
    }
    cats.splice(index, 1)
    return res.status(204).end()
})

//events routes
app.get('/events', (req, res) => {
    res.json(events)
})

app.post('/events', (req, res) => {
    const newEvent = req.body//req.body is where Express puts the data sent from the client (our app)

    if(!newEvent || !newEvent.title || !newEvent.date){
        //guarding against missing data in the request body
        return res.status(400).json({error:'Missing required event field(s)'})
        //status 400 means bad request
    }

    events.push(newEvent) //add new event to array by directly mutating it
    res.status(201).json(newEvent) //send back the new event back as a response to confirm what got saved, instead of res.send('ok')
    // status 200 means 'ok', status 201 means 'created' - response.ok is true for status codes 200-299
})

app.delete('/events/:id', (req, res) => {
    const {id} = req.params
    const index = events.findIndex(event => event.id === id) //findIndex finds the array index where the items is in the array

    if (index === -1){ //find index returns -1 if the item is not found
        return res.status(404).json({error: 'event not found'}) // status 404 means 'not found'
    }
    events.splice(index, 1) //splice is removing exactly 1 element starting at index, mutating the array in place
    res.status(204).end() //status 204 is a successful response for no content //.end() sends the response with an empty body

})


app.listen(3001, () => {
    console.log('Server running on localhost 3001')
})
//this actually starts the server, telling it to sit and listen for incoming requests on port 3001.
//the console log is for startup confirmation
