const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()


let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]


morgan.token('data', function (req) {
  return JSON.stringify(req.body)
})


app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))


app.post('/api/persons', (request, response) => {
    const id = Math.floor(Math.random() * 1000000)
    const person = request.body
    
    person.id = id

    switch (true) {
      case persons.map(personList => personList.name).includes(person.name): 
          console.log(`error: 'name must be unique'`)
          response.status(409).end()
          break
      case person.name === "":
        console.log(`error: 'name is missing!`)
          response.status(406).end()
          break
      case person.number === "":
        console.log(`error: 'number is missing!`)
        response.status(406).end()
        break
      default:
        persons = persons.concat(person)
        response.json(person)
    }
  })


app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${Date()}</p>`
    )
})

app.get('/api/persons/:id', (request,response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
    response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    
    response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})