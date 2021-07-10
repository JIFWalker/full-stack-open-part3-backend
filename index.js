require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const Contact = require('./models/Contact')
morgan.token('data', function (req) {
  return JSON.stringify(req.body)
})

// Middleware
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

//Gets all contact data from database
app.get('/api/persons', (request, response) => {
  Contact.find({}).then(contacts => {
    response.json(contacts)
  })
})


// Adds person to database
app.post('/api/persons', (request, response) => {
    const id = Math.floor(Math.random() * 1000000)
    const body = request.body

    const person = new Contact({
      _id: id,
      name: body.name,
      number: body.number
    })

    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  })


// Displays number of contacts and the current local date
app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${Date()}</p>`
    )
})


// Gets a specific contact's data from their ID
app.get('/api/persons/:id', (request,response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
    response.json(person)
    } else {
        response.status(404).end()
    }
})

// Deletes a contact from the phonebook
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    
    response.status(204).end()
})


// Port configuration
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})