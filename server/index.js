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

//events routes
app.get('/events', (req, res) => {
    res.json(events)
})

app.post('/events', (req, res) => {
    const newEvent = req.body
    events.push(newEvent)
    res.json(newEvent)
})
//


app.listen(3001, () => {
    console.log('Server running on localhost 3001')
})
//this actually starts the server, telling it to sit and listen for incoming requests on port 3001.
//the console log is for startup confirmation
